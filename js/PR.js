//PR
IcoMoon (import project MKBCCFontsProject.json, import icons -> generate Font, out: selection.json, icomoon.ttf -- MKBCCFonts)
https://icomoon.io/app/#/select

https://docs.oracle.com/cd/E63029_01/books/ConfigOpenUI/appendix_a_api002.htm#i1374398
https://docs.oracle.com/cd/E14004_01/books/PortalFrame/PortalFrameDelConExtWebApps29.html
https://docs.oracle.com/cd/E74890_01/books/ConfigOpenUI/appendix_b_reference002.htm

MKBCCCardLimitsListAppletPR.prototype.BindEvents = function () {
	//https://docs.oracle.com/cd/E74890_01/books/ConfigOpenUI/appendix_b_reference002.htm
	this.GetPM().AttachNotificationHandler(consts.get("SWE_PROP_BC_NOTI_GENERIC"), function (propSet){
		let type = propSet.GetProperty(consts.get("SWE_PROP_NOTI_TYPE"));
		console.log(type);
		console.log(propSet);
	});

	//https://docs.oracle.com/cd/E14004_01/books/PortalFrame/PortalFrameDelConExtWebApps30.html
	this.GetPM().AttachPostProxyExecuteBinding("ALL", function(methodName, inputPS, outputPS) {
		console.log(methodName);
		console.log(inputPS);
		console.log(outputPS);
        let tmp = outputPS.childArray[0].childArray[0];
	});	
	/* OVERRIDE */
	//this.GetPM().AddMethod("CanInvokeMethod", function(method){ console.log(method) }, {override : true});
    this.GetPM().AddMethod("CanInvokeMethod", (method, args) => { 
	    if(method === "WriteRecord") {
	        args[consts.get( "SWE_EXTN_CANCEL_ORIG_OP" )] = true; //CancelOperation
	        args[consts.get( "SWE_EXTN_STOP_PROP_OP" )] = true; //прерывание прочего кастома
	        return false;
	    }
	}, { sequence : true, scope: this } );
	this.GetPM().AddMethod("InvokeMethod", (method, propSet, call, flag, args) => { 
        console.log(method);
        console.log(propSet);
        console.log(call);
        console.log(flag);
        console.log(args);
        if (method === "ExecuteQuery") {
          //oBC.SetSearchSpec("[Class Id] <> '0' OR [Alert Num] <> '0'");
          //console.log(oBC.GetSearchSpec());
          	args["CancelOperation"] = true;
			args["StopCustomPropagationOperation"] = true;
			args["CancelPost"] = true;
			args["ReturnValue"] = false;
          return false;
        }
    }, { sequence : true, scope: this } );
	/************************************************************************************************************/
	//https://docs.oracle.com/cd/E74890_01/books/ConfigOpenUI/appendix_b_reference002.htm#i1185191
	this.GetPM().AttachNotificationHandler(consts.get("SWE_PROP_BC_NOTI_STATE_CHANGED"), function (propSet){
		if(propSet.GetProperty("value")==0) {  //0 = закончил, 1 = в процессе
		  console.log(propSet.GetProperty("type"))
		} 
	});
	//[MKB CC NK Product Name] пик лист
	this.GetPM().AttachPostProxyExecuteBinding("PostChanges", function(methodName, inputPS, outputPS) {
		console.log(methodName); console.log(inputPS); 
		if(inputPS.propArray['SWEPOC'] === 'MKB CC NK Product Name') console.log("pick list field name")
	  });	

	//https://docs.oracle.com/cd/E95904_01/books/ConfigOpenUI/appendix_b_reference17.html
	this.GetPM().AttachEventHandler(consts.get("PHYEVENT_INVOKE_CONTROL"), function(method, inputPS, ai) {
        console.log("AttachEventHandler");
		console.log(method);
		console.log(inputPS);
		console.log(ai.scope);
		console.log(ai.scope.GetRenderer().BC.GetRecordSet()[0]);
		if(method === "Verify" && oRS.hasOwnProperty("MKB Codeword") && oRS["MKB Codeword"]==="123") {
			console.log(arguments[arguments.length - 1]);
			arguments[arguments.length - 1][consts.get( "SWE_EXTN_CANCEL_ORIG_OP" )] = true; //CancelOperation
			arguments[arguments.length - 1][consts.get( "SWE_EXTN_STOP_PROP_OP" )] = true; //прерывание прочего кастома
			//arguments[arguments.length - 1][consts.get("SWE_EXTN_RETVAL") ] = return_value;
			return false;
		}
    });
}

$(document.documentElement).addClass('siebui-busy')
<div id="maskoverlay" class="siebui-mask-overlay" style="width: 100%; height: 100%; top: 0px; left: 0px; position: absolute; display: block;"> 
<div id="mask-img" class="siebui-mask-outer" style="">   <div class="siebui-mask-inner"></div> </div></div>
*/
/**https://git.mcb.ru/siebeloui/siebel_oui/-/blob/dev/23048/scripts/siebel/applicationcontext.js 	bh.GetBusComp().HandleQuery(bo) */
function refreshData(SSpec) {
  let propSet = new JSSPropertySet({axObj: null, childArray: [], childEnum: 0, propArray: [], propArrayLen: 0, type: "", value: ""});
  let scope = oPR.applet;
  if (!scope.IsInQueryMode()) scope.InvokeMethod("NewQuery");
  scope.SetQuerySubMode("Exit_From_User_Query");
  scope.GetBusComp().SetFieldSearchSpec("Class Id", SSpec);
  scope.InvokeMethod("ExecuteQuery"/*, propSet, {async: true, methodName: "OnEnterKey", psInputArgs: propSet, scope}, undefined, {CancelOperation: false, CancelPost: false, ReturnValue: undefined}*/);
  /*SiebelAppFacade.MKBUtils.startServiceSimpl('MKB OUI Utils', 'QueryActiveContext', {
    ActiveBC: 'MKB CC Client TWFA Transaction', 
    SearchSpec: SSpec
  });*/
  oApplet.OnClickSort("MKB Operation Dt", "desc");
}