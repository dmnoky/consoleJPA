if (typeof(SiebelAppFacade.MKBCCSearchPersonFormAppletPR) === "undefined") {
  SiebelJS.Namespace("SiebelAppFacade.MKBCCSearchPersonFormAppletPR");
  define("siebel/custom/callcenter/MKBCCSearchPersonFormAppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.MKBCCSearchPersonFormAppletPR = (function () {

    function MKBCCSearchPersonFormAppletPR(pm) {
        SiebelAppFacade.MKBCCSearchPersonFormAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(MKBCCSearchPersonFormAppletPR, SiebelAppFacade.PhysicalRenderer);
    let oPM, oBC, oControls, $applet, oResultListAppl, fieldMap, cstmBtnIdMap, $searchBtn = null;
    let phId, customTextId = "";
    let isInited, notValidField = false;
    let $lastBtn = $(); 

    MKBCCSearchPersonFormAppletPR.prototype.Init = function () {
        SiebelAppFacade.MKBCCSearchPersonFormAppletPR.superclass.Init.apply(this, arguments);
        try {
            isInited = true;
            oPM = this.GetPM();
            oBC = this.BC;
            phId = oPM.Get('GetFullId');
            oControls = oPM.Get("GetControls");    
            $applet = this.$applet;
            cstmBtnIdMap = {FIO:`${phId}_FIO_1`,          Document:`${phId}_Doc_1`,   ClientCode:`${phId}_ABS_1`, 
                            Phone:`${phId}_Phone_Num_1`,  Serno:`${phId}_Serno_1`,    SRNum:`${phId}_SR_Num_1` };
            fieldMap = {
                $lstName:   initReqLbl($applet.find("[name='" + oControls["MKB Last Name"].GetInputName() + "']")),
                $fstName:   $applet.find("[name='" + oControls["MKB First Name"].GetInputName() + "']").closest('div .mkb__oui_field.mkb__oui_control'),
                $mddlName:  $applet.find("[name='" + oControls["MKB Middle Name"].GetInputName() + "']").closest('div .mkb__oui_field.mkb__oui_control'),
                $phoneNum:  initReqLbl($applet.find("[name='" + oControls["Phone Num"].GetInputName() + "']")),
                $srNum:     initReqLbl($applet.find("[name='" + oControls["SR Number"].GetInputName() + "']")),
                $docSer:    initReqLbl($applet.find("[name='" + oControls["MKB Doc Series"].GetInputName() + "']")),
                $docNum:    initReqLbl($applet.find("[name='" + oControls["MKB Doc Number"].GetInputName() + "']")),
                $birthDate: initReqLbl($applet.find("[name='" + oControls["MKB Birth Date"].GetInputName() + "']")),
                $cardSerno: initReqLbl($applet.find("[name='" + oControls["Card SerNo"].GetInputName() + "']")),
                $absCode:   initReqLbl($applet.find("[name='" + oControls["MKB ABS Code"].GetInputName() + "']"))
            }; 
        } catch (e) { console.error(e); }
    }

    MKBCCSearchPersonFormAppletPR.prototype.ShowUI = function () {
        try {
            if(!isInited) {//при нажатии на кнопку Показать больше/Показать меньше (на лист-апплете) - зибель перезагружает js без вызова Init на PM и PR...
                SiebelApp.S_App.GetActiveView().GetApplet('MKB CC Search Person Form Applet').GetPModel().Init();
                SiebelApp.S_App.GetActiveView().GetApplet('MKB CC Search Person Form Applet').GetPModel().GetRenderer().Init();
            }
        } catch (e) { console.error(e); }
        SiebelAppFacade.MKBCCSearchPersonFormAppletPR.superclass.ShowUI.apply(this, arguments);
        try {
            isInited = false;
            let $header = $applet.find('.siebui-applet-header');
            $header.addClass('mcb-cc-app__title_some-style mkb-cc-app__el_m-10-0-10-10');
            $('<div id="'+phId+'_custom_grp_btns_1" class="mkb-cc-app__el_pdd-unset mcb-cc-app__grp-btn-style">'+
                '<button name="FIO" id="'+cstmBtnIdMap.FIO+'">ФИО</button>'+
                '<button name="Document" id="'+cstmBtnIdMap.Document+'">Документ</button>'+
                '<button name="ClientCode" id="'+cstmBtnIdMap.ClientCode+'">Код клиента</button>'+
                '<button name="Phone" id="'+cstmBtnIdMap.Phone+'">Телефон</button>'+
                '<button name="Serno" id="'+cstmBtnIdMap.Serno+'">Серийный номер карты</button>'+
                '<button name="SRNum" id="'+cstmBtnIdMap.SRNum+'">Обращение</button></div>')
                .insertAfter($header.find('.siebui-applet-title'));

            $applet.find('.AppletButtons.siebui-applet-buttons').hide();
            $applet.find('.mkb__oui_row_num_1').addClass('mcb-cc-app__btn_some-style'); 
            $applet.find('.mkb__oui_row_num_2').addClass('mcb-cc-app__lbl_some-style'); 
            $applet.find('.mkb__oui_row_num_3').addClass('mcb-cc-app__lbl_some-style');
            $applet.find("[name='" + oControls["HTML MiniButton"].GetInputName() + "']") // кнопка "Поиск"
                .addClass('mkb-cc-app__el_ta-l mkb-cc-app__text_size-14 mkb-cc-app__el_v_align-b mkb-cc-app__el_pr-15_b mkb-cc-app__el_search-img')
                .find('span').css({'margin-left' : '1px'});
            $applet.find("[name='" + oControls["Clear Fields"].GetInputName() + "']") // кнопка "Очистить"
                .addClass('mkb-cc-app__el_ta-r mkb-cc-app__text_size-14 mkb-cc-app__el_v_align-b mkb-cc-app__el_pr-15_b mkb-cc-app__el_x_sign-img');
            updFields($("#"+cstmBtnIdMap.FIO), getFields("FIO", false, false)); // активная кнопка FIO
            $searchBtn = $applet.find("[name='" + oControls["HTML MiniButton"].GetInputName() + "']");
            oResultListAppl = SiebelApp.S_App.GetActiveView().GetAppletMap()["MKB CC Search Person Result List Applet"];
        } catch (e) { console.error(e); }
    }

    MKBCCSearchPersonFormAppletPR.prototype.BindEvents = function () {
        SiebelAppFacade.MKBCCSearchPersonFormAppletPR.superclass.BindEvents.apply(this, arguments);
        oPM.AddMethod("CanInvokeMethod", (method, args) => {
            try {
                if(method === "WriteRecord") { // аналог UP: CanInvokeMethod: WriteRecord = FALSE
                    args[consts.get( "SWE_EXTN_CANCEL_ORIG_OP" )] = true; //CancelOperation
                    args[consts.get( "SWE_EXTN_STOP_PROP_OP" )] = true; //прерывание прочего кастома
                    return false;
                }
            } catch (e) { console.error(e); }
        }, { sequence : true, scope: this } );
        oPM.AttachEventHandler(consts.get("PHYEVENT_ENTER_KEY_PRESS"), function(control) { // Enter
            try {
                $applet.find("[name='" + control.GetInputName() + "']").blur(); // шагаем в PHYEVENT_CONTROL_BLUR
                $searchBtn.click(); // шагаем в PHYEVENT_INVOKE_CONTROL.DoSearch
                arguments[arguments.length - 1][consts.get( "SWE_EXTN_CANCEL_ORIG_OP" )] = true; //CancelOperation
                arguments[arguments.length - 1][consts.get( "SWE_EXTN_STOP_PROP_OP" )] = true; //прерывание прочего кастома
                return true;
            } catch (e) { console.error(e); }
        });
        oPM.AttachEventHandler(consts.get("PHYEVENT_CONTROL_BLUR"), function(control, value) { // аналог BusComp_PreSetFieldValue
            try {
                if(!validateField(control.GetFieldName(), value)) {
                    notValidField = true;
                    arguments[arguments.length - 1][consts.get( "SWE_EXTN_CANCEL_ORIG_OP" )] = true; //CancelOperation
                    arguments[arguments.length - 1][consts.get( "SWE_EXTN_STOP_PROP_OP" )] = true; //прерывание прочего кастома
                }
                let errorMsg = "";
                $.each(getFields($lastBtn.attr('name'), false, true), function(key, val) {
                    let title = val.attr('title');
                    if(title) errorMsg += title + ". ";
                });          
                if(errorMsg.length) customTextUpd(errorMsg, true);
                else {
                    notValidField = false;
                    resetCustomText();
                }
            } catch (e) { console.error(e); }
        });
        oPM.AttachEventHandler(consts.get("PHYEVENT_INVOKE_CONTROL"), function(method, inputPS, ai) {
            try {
                let StartSvcBtn = $('#CCSubjStartSvcDiv');
				if(method === "DoSearch") { // кнопка Поиск
                    if(!notValidField && !requiredFieldsIsEmpty()) return true;
                    arguments[arguments.length - 1][consts.get( "SWE_EXTN_CANCEL_ORIG_OP" )] = true; //CancelOperation
                    arguments[arguments.length - 1][consts.get( "SWE_EXTN_STOP_PROP_OP" )] = true; //прерывание прочего кастома
                    return false;
                }
                else if(method === "DoReset") { // кнопка Очистить
					if (StartSvcBtn.length) StartSvcBtn.addClass("mkb-cc-app__el_hidden");
					$lastBtn.click();
                    SiebelAppFacade.MKBUtils.setProfileAttrs({
                        'MKBCCSearchPersonPhoneNum' : ''
                    });
                    if($lastBtn.attr('name') === 'FIO') fieldMap.$phoneNum.hide(); // случай с 'Уточните параметры поиска'
                }
            } catch (e) { console.error(e); }
        });
        oPM.AttachPreProxyExecuteBinding("DoSearch", function(methodName, inputPS, outputPS) {
            try { // RaiseErrorText с ServScript апплета после нажатия на кнопку Поиск
                let profAttrs = SiebelAppFacade.MKBUtils.getProfileAttrs(['MKBCCSearchPersonCount', 'MKBCCCurrentSubjectId', 'ActiveViewName']);
				let count = profAttrs["MKBCCSearchPersonCount"];
                if(profAttrs["MKBCCCurrentSubjectId"] !== "" && oResultListAppl?.GetNumRows() === 1 &&
                        (SiebelAppFacade.MKBCCSubjectFormAppletNewPR && !SiebelAppFacade.MKBCCSubjectFormAppletNewPR.NotClient()) ||
                        (SiebelAppFacade.MKBCCCurrentSubjectFormAppletPR && !SiebelAppFacade.MKBCCCurrentSubjectFormAppletPR.NotClient())) {
                    SiebelAppFacade.MKBUtils.startServiceSimpl('Workflow Process Manager', 'RunProcess', {
                        ProcessName: 'MKB CC Start Service',
                        RowId: 'MKBCC',
                        'Subject Id': SiebelApp.S_App.GetActiveView().GetApplet("MKB CC Current Subject Form Applet")?.GetBusComp().GetRecordSet()[0]["Subject Id"]
                    });
                }
                else if(count == 0 && oResultListAppl?.GetNumRows() === 0) customTextUpd("По введенным данным соответствий в системе не найдено.", false);
                else if(count > 1) {
                    let StartSvcBtn = $('#CCSubjStartSvcDiv');
					if (profAttrs["MKBCCCurrentSubjectId"] !== "" && profAttrs["ActiveViewName"] === "MKB CC Service Client View" && StartSvcBtn.length)
						StartSvcBtn.removeClass("mkb-cc-app__el_hidden");
					fieldMap.$phoneNum.show().find('input').prop('required', false);
                    let tmpTxt = count + " совпадений";
                    if(count < 5) tmpTxt = count + " совпадения";
                    else if(count > 20) tmpTxt = "более 20 совпадений"; 
                    customTextUpd("Найдено " + tmpTxt + ". Уточните параметры поиска.", false);
                }
                else if ($lastBtn.attr('name') === 'FIO' && fieldMap.$phoneNum.find('input').val() === "") fieldMap.$phoneNum.hide(); // случай с 'Уточните параметры поиска'
            } catch (e) { console.error(e); }
        }); 
        if(oResultListAppl) oResultListAppl.GetPModel().AttachNotificationHandler(consts.get("SWE_PROP_BC_NOTI_NEW_ACTIVE_ROW"), function () {
            try {
                let tmp = oResultListAppl.GetControlValueByName("MKB First Name");
                oBC.SetFieldValue("MKB First Name", tmp ? tmp[0] : '');
                tmp = oResultListAppl.GetControlValueByName("MKB Middle Name");
                oBC.SetFieldValue("MKB Middle Name", tmp ? tmp[0] : '');
                tmp = oResultListAppl.GetControlValueByName("MKB Last Name");
                oBC.SetFieldValue("MKB Last Name", tmp ? tmp[0] : '');
                tmp = oResultListAppl.GetControlValueByName("MKB Birth Date").split('.');
                if (tmp.length === 3) oBC.SetFieldValue("MKB Birth Date", tmp[1] + "/" + tmp[0] + "/" + tmp[2]);
            } catch (e) { console.error(e); }
        });
        /* кастомные кнопки */
        $("#"+cstmBtnIdMap.FIO).click(function(event) { updFields($(this), getFields("FIO", false, false)); });	 
        $("#"+cstmBtnIdMap.Document).click(function(event) { updFields($(this), getFields("Document", false)); });
        $("#"+cstmBtnIdMap.ClientCode).click(function(event) { updFields($(this), getFields("ClientCode", false)); });
        $("#"+cstmBtnIdMap.Phone).click(function(event) {
            updFields($(this), getFields("Phone", false));
            fieldMap.$phoneNum.find('input').prop("required", "true");
        });
        $("#"+cstmBtnIdMap.Serno).click(function(event) { updFields($(this), getFields("Serno", false)); });
        $("#"+cstmBtnIdMap.SRNum).click(function(event) { updFields($(this), getFields("SRNum", false)); });
        /* транслит */
        fieldMap.$lstName.find('input').on("input", function(event) { translitInputText($(this), event) });
        fieldMap.$fstName.find('input').on("input", function(event) { translitInputText($(this), event) });
        fieldMap.$mddlName.find('input').on("input", function(event) { translitInputText($(this), event) });
    }

    MKBCCSearchPersonFormAppletPR.prototype.BindData = function () {
        SiebelAppFacade.MKBCCSearchPersonFormAppletPR.superclass.BindData.apply(this, arguments);
        try {
            let profAttrs = SiebelAppFacade.MKBUtils.getProfileAttrs(['MKBCCSearchPersonPhoneNum', 'MKBCCSearchPersonCount']);
            let phoneNum = profAttrs["MKBCCSearchPersonPhoneNum"];
            if(phoneNum !== "") {
                oBC.SetFieldValue("Phone Num", "");
                if(profAttrs["MKBCCSearchPersonCount"] > 0 && oResultListAppl?.GetNumRows() > 0)
                    fieldMap.$phoneNum.show().find('input').prop('required', false);
                else customTextUpd("По номеру телефона соответствии в системе не найдено.", false);
            } else if ($lastBtn.attr('name') === 'FIO' && fieldMap.$phoneNum.find('input').val() === "") fieldMap.$phoneNum.hide();
        } catch (e) {
            console.error(e);
        } finally {
            SiebelAppFacade.MKBUtils.setProfileAttrs({ 'MKBCCSearchPersonPhoneNum' : '' }); // инит в bs MKB CC Call API.CallRinging
        }
    }

    MKBCCSearchPersonFormAppletPR.prototype.EndLife = function () {
        SiebelAppFacade.MKBUtils.setProfileAttrs({
            'MKBCCSearchPersonPhoneNum' : '', 
            'MKBCCSearchPersonCount': ''
        });
        SiebelAppFacade.MKBCCSearchPersonFormAppletPR.superclass.EndLife.apply(this, arguments);
    }
    
    function requiredFieldsIsEmpty() {
        let result = false;
        try {
            $.each(getFields($lastBtn.attr('name'), true), function(key, val) {
                if(val.length && val.find('input').val() === "") { 
                    result = true;
                    return false;
                }
            });
            if(result) customTextUpd("Заполните обязательные поля", true);
            else resetCustomText();
        } catch (e) { console.error(e); }
        return result;
    }

    function customTextUpd(text, isError) {
        let title = "", actName = $lastBtn.attr('name')
        if(text.length > 70) {
            title = text;
            text = text.substring(0, 70) + "...";
        }
        if(!customTextId) {
            customTextId = phId+"_custom_text";
            $applet.find(`div.mkb__oui_row.mkb__oui_row_num_${actName === 'FIO' || actName === 'Phone' ? 3 : 2} div.mkb__oui_column.mkb__oui_column-num-${actName === 'FIO' ? 2 : 3} div.mkb__oui_fields`).append(
                `<div id="${customTextId}" style="position: absolute;" class="mkb__oui_field mkb__oui_control" title="${title}"><div style="padding-top: 19px;">
                    <div class="${isError ? 'mkb-cc-app__el_error-img' : 'mkb-cc-app__el_alert-img'} mkb-cc-app__el_v_align-b mkb-cc-app__img_size-24 
                        mkb-cc-app__img_mr-10 mkb__oui_fieldvalue mkb-cc-app__el_mt-5">
                        <span class="${isError ? 'mkb-cc-app__el_error-font' : 'mkb-cc-app__el_alert-font'}">${text}</span></div></div></div>`);
        } else {
            let tmp = $('#'+customTextId).attr("title", title).find('div.mkb__oui_fieldvalue');
            if(isError) {
                if(!tmp.hasClass('mkb-cc-app__el_error-img')) tmp.removeClass('mkb-cc-app__el_alert-img').addClass('mkb-cc-app__el_error-img')
                        .find('span').removeClass('mkb-cc-app__el_alert-font').addClass('mkb-cc-app__el_error-font');   
            } else {
                if(!tmp.hasClass('mkb-cc-app__el_alert-img')) tmp.removeClass('mkb-cc-app__el_error-img').addClass('mkb-cc-app__el_alert-img')
                        .find('span').removeClass('mkb-cc-app__el_error-font').addClass('mkb-cc-app__el_alert-font');
            }
            tmp.find('span').text(text);
        }
    }

    function resetCustomText() {
        try {
            if(customTextId) {
                $('#'+customTextId).remove();
                customTextId = "";
            }
        } catch (e) { console.error(e); }
    }

    function updFields($activeBtn, showFldArray) {
        try {
            notValidField = false;
            resetCustomText();
            $lastBtn.removeAttr('style');
            $lastBtn = $activeBtn;
            $lastBtn.css({'font-weight' : 'bold', 'border-bottom': '1px solid #dd0a34'});
            $.each(fieldMap, function(key, val) {
                val.hide().removeAttr('title');
            });
            $.each(oControls, function(key, val) {
                oBC.SetFieldValue(key, "");
            });
            $.each(showFldArray, function(key, val) {
                val.show();
            });
        } catch (e) { console.error(e); }
    }

    function initReqLbl($lbl) {
        return $lbl.prop('required', true).parent().addClass('mkb-cc-app__fld_req').closest('div .mkb__oui_field.mkb__oui_control');
    }

    function getFields(key, onlyRequired, withPhone) {
        switch (key) {
            case "FIO":
                if(onlyRequired) return [fieldMap.$lstName, fieldMap.$birthDate];
                else if(withPhone) return [fieldMap.$lstName, fieldMap.$birthDate, fieldMap.$fstName, fieldMap.$mddlName, fieldMap.$phoneNum];
                else return [fieldMap.$lstName, fieldMap.$birthDate, fieldMap.$fstName, fieldMap.$mddlName];
            case "Document": return [fieldMap.$docSer, fieldMap.$docNum];
            case "ClientCode": return [fieldMap.$absCode];
            case "Phone": return [fieldMap.$phoneNum];
            case "Serno": return [fieldMap.$cardSerno];
            case "SRNum": return [fieldMap.$srNum];
        }
        return [];
    }

    function validateField(fieldName, value) {
        switch (fieldName) {
            case "MKB First Name":
                if(value !== "" && value.search("^[-а-яА-ЯёЁ\.\']+(\\s?[-а-яА-ЯёЁ\.\'\-])*$") === -1) { //|^[-a-zA-Z\.\'\-]+(\\s?[-a-zA-Z\.\'])*$
                    fieldMap.$fstName.attr("title", "Имя содержит некорректные символы");
                    return false;
                } else fieldMap.$fstName.removeAttr("title");
                break;
            case "MKB Last Name":
                if(value !== "" && value.search("^[-а-яА-ЯёЁ\.\']+(\\s?[-а-яА-ЯёЁ\.\'])*$") === -1) { //|^[-a-zA-Z\.\']+(\\s?[-a-zA-Z\.\'])*$
                    fieldMap.$lstName.attr("title", "Фамилия содержит некорректные символы");
                    return false;
                } else fieldMap.$lstName.removeAttr("title");
                break;
            case "MKB Middle Name":
                if(value !== "" && value.search("^[-а-яА-ЯёЁ\.\']+(\\s?[-а-яА-ЯёЁ\.\'])*$") === -1) { //|^[-a-zA-Z\.\']+(\\s?[-a-zA-Z\.\'])*$
                    fieldMap.$mddlName.attr("title", "Отчество содержит некорректные символы");
                    return false;
                } else fieldMap.$mddlName.removeAttr("title");
                break;
            case "MKB ABS Code":
                if(value !== "" && value.match(/^[0-9]+$/g) === null) {
                    fieldMap.$absCode.attr("title", "Поле «Код клиента АБС» должно содержать только цифры");
                    return false;
                } else fieldMap.$absCode.removeAttr("title");
                break;
            case "Phone Num":
                if(value !== "" && value.match(/^[0-9]{10}$/g) === null) {
                    fieldMap.$phoneNum.attr("title", "Поле «Телефон» должно содержать 10 цифр");
                    return false;
                } else fieldMap.$phoneNum.removeAttr("title");
                break;
            case "MKB Birth Date":
                if(value !== "" && value.match(/^(0?[1-9]|[12][0-9]|3[01])([- /.,])?(0?[1-9]|1[012])([- /.,])?(\d{2}|(18|19|20)[0-9]{2})$/g) === null) { 
                    fieldMap.$birthDate.attr("title", value+": дата некорректна, ожидаемый формат - «DD.MM.YYYY»");
                    return false;
                } else fieldMap.$birthDate.removeAttr("title");
                break;
        } 
        return true;
    }

    function translitInputText($input, event) {
        let inputKey = event.originalEvent.data;
        if (inputKey) { // !== null
            let txt = $input.val();
            if (txt.length > 0) {
                let translitKey = translit(inputKey);
                if (translitKey.length) { 
                    let tmpNum = txt.indexOf(inputKey) + 1;
                    let tmpArr = txt.split(inputKey);
                    txt = tmpArr[0] + translitKey + tmpArr[1];
                    $input.val(txt)[0].setSelectionRange(tmpNum, tmpNum);
                }
            } 
            else $input.val(translit(inputKey));
        } else if (event.originalEvent.inputType === "insertFromPaste") $input.val(translit($input.val()));      
    }
    // функция для перевода с английской раскладки на русскую
    function translit(word) {
        if (word.length > 0) {
            let engKeybord = ['`', '~', 'q', 'Q', 'w', 'W', 'e', 'E', 'r', 'R', 't', 'T', 'y', 'Y', 'u', 'U', 'i', 'I', 'o', 'O', 'p', 'P', '[', '{', ']', '}', 'a', 'A', 's', 'S', 'd', 'D', 'f', 'F', 'g', 'G', 'h', 'H', 'j', 'J', 'k', 'K', 'l', 'L', ';', ':', '\'', '"', 'z', 'Z', 'x', 'X', 'c', 'C', 'v', 'V', 'b', 'B', 'n', 'N', 'm', 'M', ',', '<', '.', '>'];
            let rusKeybord = ['ё', 'Ё', 'й', 'Й', 'ц', 'Ц', 'у', 'У', 'к', 'К', 'е', 'Е', 'н', 'Н', 'г', 'Г', 'ш', 'Ш', 'щ', 'Щ', 'з', 'З', 'х', 'Х', 'ъ', 'Ъ', 'ф', 'Ф', 'ы', 'Ы', 'в', 'В', 'а', 'А', 'п', 'П', 'р', 'Р', 'о', 'О', 'л', 'Л', 'д', 'Д', 'ж', 'Ж', 'э', 'Э', 'я', 'Я', 'ч', 'Ч', 'с', 'С', 'м', 'М', 'и', 'И', 'т', 'Т', 'ь', 'Ь', 'б', 'Б', 'ю', 'Ю'];
            if (word.length === 1) {
                let index = engKeybord.indexOf(word);
                if (index !== -1) return rusKeybord[index];
            } else {
                let translitWord = '';
                for (let i = 0; i < word.length; i++) {
                    translitWord += (engKeybord.indexOf(word[i]) >= 0) ? rusKeybord[engKeybord.indexOf(word[i])] : word[i];
                }
                return translitWord;
            }
        }
        return "";
    }
    
    return MKBCCSearchPersonFormAppletPR;
   }());
   return "SiebelAppFacade.MKBCCSearchPersonFormAppletPR";
 })
}
   
