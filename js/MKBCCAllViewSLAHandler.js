if(typeof (SiebelApp.MKBCCAllViewSLAHandler) === "undefined") {
    SiebelJS.Namespace("SiebelApp.MKBCCAllViewSLAHandler");
	define("siebel/custom/callcenter/MKBCCAllViewSLAHandler", [], function () {
		let oUtils, lastRequestId, lastViewName;

		SiebelApp.EventManager.addListner("postload", () => setTimeout(SiebelApp.MKBCCAllViewSLAHandler.OnPostload(), 0), this);

		SiebelApp.MKBCCAllViewSLAHandler.OnPostload = () => {
			SiebelApp.MKBCCAllViewSLAHandler.Init();
			closeNonAuthSLA();
			closeCCWebimChatSwitchingSLA();
			if (lastRequestId && lastRequestId.length && SiebelApp.S_App.GetActiveView().GetName() !== lastViewName) { 
				SiebelApp.MKBCCAllViewSLAHandler.closeSLA(lastRequestId, "", "1", "Экран был покинут до выполнения операции");
				SiebelApp.MKBCCAllViewSLAHandler.setLastRequestId("", "");
			}
		}

		//инит в bs MKB CC Call API
		function closeMKBCCCallRingingSLA() {
			try {
				let profAttrs = oUtils.getProfileAttrs(["MKBCCCallRingingSLAId"]);
				if (profAttrs["MKBCCCallRingingSLAId"]) {
					SiebelApp.MKBCCAllViewSLAHandler.closeSLA(profAttrs["MKBCCCallRingingSLAId"], '');
					oUtils.setProfileAttrs({ "MKBCCCallRingingSLAId" : '' });
				}
			} catch(e) { console.error(e); }
		}

		/**@see createCCWebimChatSwitchingSLA siebel/custom/MKBWebImCommon.js */
		function closeCCWebimChatSwitchingSLA() {
			try {
				if (SiebelAppFacade.MKBWebImCommon) {
					let mapId = SiebelAppFacade.MKBWebImCommon.getCCWebimChatSwitchingSLAId();
					SiebelApp.MKBCCAllViewSLAHandler.closeSLA(mapId["requestId"], mapId["contextId"]);
					SiebelAppFacade.MKBWebImCommon.setCCWebimChatSwitchingSLAId('', '');
				}
			} catch(e) { console.error(e); }
		}

		SiebelApp.MKBCCAllViewSLAHandler.closeSLA = (RequestId, ContextId, ErrorCode, ErrorText) => {
			if (!RequestId && !ContextId) return;
			oUtils.startServiceSimpl("MKB OUI Utils", "CreateSLALogRecord", {
				RequestId: RequestId,
				ContextId: ContextId,
				Context: '',
				ErrorCode: ErrorCode,
				ErrorMsg: ErrorText
			});
		}
		
		SiebelApp.MKBCCAllViewSLAHandler.Init = () => {
			oUtils = SiebelAppFacade.MKBUtils;
		}
		/** Для асинх процессов. Если создали SLA, но покинули экран до его закрытия */
		SiebelApp.MKBCCAllViewSLAHandler.setLastRequestId = function(requestId, lstViewName = SiebelApp.S_App.GetActiveView().GetName()) { 
			lastRequestId = requestId;
			lastViewName = lstViewName; 
		} 

		return "SiebelAppFacade.MKBCCAllViewSLAHandler";
	});
}