//MKB CC Client Cards Popup Applet ALIRZAEVA 27112020 MKB-146551 Отправка смс
function SendSMS(sCon)
{
	try
	{
		var oBO: BusObject = TheApplication().GetBusObject("MKB Action Lite");
		var oBC: BusComp = oBO.GetBusComp("MKB Action Lite");
		var boCon: BusObject = TheApplication().GetBusObject("MKB Contact Light");
		var bcCon: BusComp = boCon.GetBusComp("MKB Contact Light");
		var bRecord : bool = false;
		var svc:Service = TheApplication().GetService("EAI Dispatch Service");
		var Input:PropertySet = TheApplication().NewPropertySet();
		var Output:PropertySet = TheApplication().NewPropertySet();
		var sABS = "";
		sActId = sActId.substr(0,sActId.length - 4);
		
		if(sActId != "")
		{
			with (bcCon)
			{
				ClearToQuery();
				ActivateField("MKB ABS Code");
				SetSearchExpr("[Id] = '" + cConId + "'");
				ExecuteQuery(ForwardOnly);
				if(FirstRecord())
					sABS = GetFieldValue("MKB ABS Code");
			}
	
			with (oBC)
			{
				ClearToQuery();
				ActivateField("MKB Type Mnemo");
				ActivateField("DNIS");
				ActivateField("Comment");
				SetSearchExpr(sActId);
				ExecuteQuery(ForwardOnly);
				bRecord = FirstRecord();
				while(bRecord)
				{
					Input.SetProperty("ServiceMethod", "BT_SendMessage_BatchSMS");	
					Input.SetProperty("RuleSet", "MKB Execute Process Rule Set");
					Input.SetProperty("Attrib03", GetFieldValue("MKB Type Mnemo"));
					Input.SetProperty("Attrib04", "CARD_NUM");
					Input.SetProperty("OutMap", "MKB Batch SMS Response");//ALIRZAEVA 18122020 MKB-152313
					Input.SetProperty("Attrib10", GetFieldValue("Id"));//ALIRZAEVA 18122020 MKB-152313
					Input.SetProperty("Attrib05", GetFieldValue("Comment").substr(ToNumber(GetFieldValue("Comment").indexOf("*"))+1, 4));
					Input.SetProperty("Attrib09", GetFieldValue("DNIS"));
					Input.SetProperty("Attrib08", sABS);
					Input.SetProperty("Contact Id", cConId);			
					svc.InvokeMethod("Dispatch", Input, Output);
					bRecord = NextRecord(); 
				}
			}
		}
	}
	catch(e)
	{
		throw e;
	}
	finally
	{
		oBC = null;
		oBO = null;
		bcCon = null;
		boCon = null;
		svc = null;
		Input = null;
		Output = null;
	}				
}