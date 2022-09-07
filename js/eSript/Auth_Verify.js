function WebApplet_PreInvokeMethod (MethodName)
{
	if(MethodName == "Verify")
	{
		try
		{	 
			var oApp: Application = TheApplication();
			var oBC: BusComp = this.BusComp();
			var sCodeword: chars = oBC.GetFieldValue("MKB Codeword");

			if (sCodeword == "") oApp.RaiseErrorText("Введите кодовое слово.");

			var nAttempts: float = ToNumber(oBC.GetFieldValue("MKB Codeword Attempts"));
			var svc: Service = oApp.GetService("Workflow Process Manager");
			var Input: PropertySet = oApp.NewPropertySet();
			var Output: PropertySet = oApp.NewPropertySet();
			
			oBC.WriteRecord();
			Input.SetProperty("ProcessName", "MKB CheckCodeWord Integration");
			Input.SetProperty("Object Id", oBC.GetFieldValue("Activity Id"));//##ONDRIN MKB-142055 02112020 old:Id
			Input.SetProperty("CodeWord", sCodeword);	
			svc.InvokeMethod("RunProcess", Input, Output);
			oBC.InvokeMethod("RefreshBusComp");
			nAttempts -= ToNumber(Output.GetProperty("Result")) == 0 ? 1 : 0; //NOVIKOVDK MKB-264119 17122021
			oBC.SetFieldValue("MKB Codeword Attempts",nAttempts);
			oBC.WriteRecord();
			oBC.InvokeMethod("RefreshBusComp");	
			if (nAttempts == 0) oApp.RaiseErrorText("Аутентификация по кодовому слову не пройдена, количество попыток ввода исчерпано.");			
		}
		finally
		{
			svc = null;
			Input = null;
			Output = null;
			oBC = null;
			oApp = null;	
		}
		return(CancelOperation);
	}
	if (MethodName == "RefreshAuthApplet")
	{
		this.BusComp().InvokeMethod("RefreshBusComp");
		return (CancelOperation);
	}

	return (ContinueOperation);
}