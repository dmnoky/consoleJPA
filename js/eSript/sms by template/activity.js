//Администрирование коммуникации - Все шаблоны - Простой
//ALIRZAEVA 27112020 MKB-146551 Создание активности перед отправкой смс
function CreateActivity(sReason, sCardId, sPhone)
{ 
	try
	{
		var boAction:BusObject = TheApplication().GetBusObject("MKB Action Lite");
		var bcAction:BusComp = boAction.GetBusComp("MKB Action Lite");
		var boPhone:BusObject = TheApplication().GetBusObject("MKB FIN Contact Phone");
		var bcPhone:BusComp = boPhone.GetBusComp("FIN Contact Phone"); 
		var boActCon:BusObject = TheApplication().GetBusObject("Action Contact");
		var bcActCon:BusComp = boActCon.GetBusComp("Action Contact"); 
		var sMnemo:String = "";
		var sText:String = "";
	
		// BOBYLEV 08122020 MKB-149129
		var svc:Service = TheApplication().GetService("Workflow Process Manager");
		var psInput:PropertySet = TheApplication().NewPropertySet();
		var psOutput:PropertySet = TheApplication().NewPropertySet();
		if (sCardId!="")
		{
			psInput.SetProperty("ProcessName", "MKB CC Get Block Card SMS");
			psInput.SetProperty("Record Id", sCardId);
			psInput.SetProperty("Reason", sReason);
			svc.InvokeMethod("RunProcess", psInput, psOutput);
			sText = psOutput.GetProperty("Text");
			sMnemo = psOutput.GetProperty("Mnemo");
		}

		/* sCard = sCard.substr(sCard.length - 4);
		if(sReason == TheApplication().InvokeMethod("LookupValue", "CC_BLOCK_REASON", "8")){
			sMnemo = "CALLCENTER04";
			sText = "Карта *"+sCard+" заблокирована на основании Вашего заявления.";
		}
		else if(sReason == TheApplication().InvokeMethod("LookupValue", "CC_BLOCK_REASON", "")){//Указать код для причины  "Утеря/кража карты (КЦ)"
			sMnemo = "CALLCENTER03";
			sText = "Ваша карта *"+sCard+" заблокирована в связи с потерей. Перевыпустить карту возможно в Интернет банке или в любом отделении банка.";
		}
		else{
			sMnemo = "CALLCENTER02";
			sText = "Ваша карта *"+sCard+" заблокирована в связи с компрометацией данных.";
		}*/

		var cPhoneAct:String = TheApplication().InvokeMethod("LookupValue","MKB_PHONE_STATUS","Actual"); 
		var cTypeCell:String = TheApplication().InvokeMethod("LookupValue","FIN_PHONE_TYPE","Cell phone");
		var sStatus:String = TheApplication().InvokeMethod("LookupValue","EVENT_STATUS","In Progress");//ALIRZAEVA 18122020 MKB-152313
		var sRes:String = TheApplication().InvokeMethod("LookupValue","SR_RESOLUTION","10");
	
		if(sPhone == "")
		{
		    bcPhone.ActivateField("Phone Number");
		    bcPhone.SetViewMode(AllView);
		    bcPhone.ClearToQuery();
		    bcPhone.SetSearchExpr("[Contact Id] = '"+cConId+"' AND [MKB Sms Phone] = 'Y' AND [Type] = '"+cTypeCell+"' AND [Status] = '"+cPhoneAct+"'");
		    bcPhone.ExecuteQuery(ForwardOnly);
		    if (bcPhone.FirstRecord())
				sPhone = bcPhone.GetFieldValue("Phone Number");
			else{
				bcPhone.ClearToQuery();
			    bcPhone.SetSearchExpr("[Contact Id] = '"+cConId+"' AND [MKB Sms Phone] = 'N' AND [Type] = '"+cTypeCell+"' AND [Status] = '"+cPhoneAct+"'");
			    bcPhone.SetSortSpec("Created(DESCENDING)")
				bcPhone.ExecuteQuery(ForwardOnly);
			    if (bcPhone.FirstRecord())
					sPhone = bcPhone.GetFieldValue("Phone Number");
				else{
					sRes = TheApplication().InvokeMethod("LookupValue","SR_RESOLUTION","Number Not Found");
					sStatus = TheApplication().InvokeMethod("LookupValue","EVENT_STATUS","Done");//ALIRZAEVA 18122020 MKB-152313
				}
			}	
		}

		bcAction.ActivateField("Type");
		bcAction.ActivateField("Sub Type");
		bcAction.ActivateField("Resolution Code");
		bcAction.ActivateField("Comment");
		bcAction.ActivateField("MKB Type Mnemo");
		bcAction.ActivateField("Primary Contact Id");
		bcAction.ActivateField("DNIS");
		bcAction.ActivateField("Status");			
		bcAction.NewRecord(NewAfter);
		bcAction.SetFieldValue("Type", TheApplication().InvokeMethod("LookupValue","TODO_TYPE","97"));
		bcAction.SetFieldValue("Sub Type", TheApplication().InvokeMethod("LookupValue","TODO_TYPE","CC_BLOCK_CARD"));
		bcAction.SetFieldValue("Resolution Code", sRes);		
		bcAction.SetFieldValue("Comment", sText);
		bcAction.SetFieldValue("MKB Type Mnemo", sMnemo); 
		bcAction.SetFieldValue("DNIS", sPhone);
		bcAction.SetFieldValue("Status", sStatus);
		bcAction.SetFieldValue("Primary Contact Id", cConId);
		bcAction.WriteRecord();	

		if(sRes != TheApplication().InvokeMethod("LookupValue","SR_RESOLUTION","Number Not Found"))
			sActId = "[Id]='"+bcAction.GetFieldValue("Id")+"' OR "+sActId;
	
		bcActCon.ActivateField("Activity Id");
		bcActCon.ActivateField("Contact Id");			
		bcActCon.NewRecord(NewAfter);
		bcActCon.SetFieldValue("Activity Id", bcAction.GetFieldValue("Id"));
		bcActCon.SetFieldValue("Contact Id", cConId);
		bcActCon.WriteRecord();	
	}
	catch (e)
	{
		throw e;
	}
	finally
	{
		bcActCon = null;
		boActCon = null;
		bcPhone = null;
		boPhone = null;
		bcAction = null;
		boAction = null;
		svc = null;
		psInput = null;
		psOutput = null;
	}
}