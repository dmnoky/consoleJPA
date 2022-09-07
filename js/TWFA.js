    //BindData
    const oRS = oApplet.GetRecordSet();
    if (oRS && oRS.length > 0) {
      oRS.filter((map, i) => { // визуал строк у лист-апплета
        if (map["Class Id"] === '2') $applet.find(`#${i+1}`).addClass('mkb-cc-app__el_hf-green-bc').find('td').css({'background': 'none'});
        else if (map["Class Id"] === '0') {
          if (map["Alert Num"] !== '0') $applet.find(`#${i+1}`).addClass('mkb-cc-app__el_hf-red-bc').find('td').css({'background': 'none'}); 
        }
        else $applet.find(`#${i+1}`).addClass('mkb-cc-app__el_hf-red-bc').find('td').css({'background': 'none'});
      });
    }
    /** Поиск по SearchSpec */
    function refreshData(SearchSpec = "") {
      if (!oApplet.IsInQueryMode()) oApplet.InvokeMethod("NewQuery");
      oApplet.SetQuerySubMode("Exit_From_User_Query");
      oApplet.GetBusComp().SetFieldSearchSpec("Class Id", SearchSpec);
      oApplet.InvokeMethod("ExecuteQuery");
    }

    /** Клиент прошел экран аутентификации? */
    function checkAuthClient() {
      let oSubjectRS = oView.GetApplet('MKB CC Current Subject Form Applet')?.GetBusComp().GetRecordSet()[0];
      return oSubjectRS && oSubjectRS.hasOwnProperty('MKB Subject Verification Code') && oSubjectRS['MKB Subject Verification Code'] > 0;
    }
    
    function showMessage(status, statusMessage = "", titleMessage = "") {
      if (!$customInfoTextDiv) $customInfoTextDiv = $(`<div id="${phId}_Custom_Txt" 
            class="mkb-cc-app__el_v_align-m mkb-cc-app__img_size-24 mkb-cc-app__img_mr-5"><span name="a-content">
            <span name="bfr-img"><span name="dnc-text" style="line-height: 28px"></span></span></div>`
        ).insertAfter($applet.find(".siebui-applet-title").first());
      let $textSpan;
      switch (status) {
        case "SUCCESS": 
          $textSpan = $customInfoTextDiv.find('span[name="a-content"]').removeClass().addClass('mkb-cc-app__el_ok-font')
            .find('span[name="bfr-img"]').removeClass().addClass('mkb-cc-app__el_ok-img').find('span[name="dnc-text"]');
          break;
        case "ERROR": 
          $textSpan = $customInfoTextDiv.find('span[name="a-content"]').removeClass().addClass('mkb-cc-app__el_error-font')
            .find('span[name="bfr-img"]').removeClass().addClass('mkb-cc-app__el_error-img').find('span[name="dnc-text"]');
          break;    
        case "ALERT":
          $textSpan = $customInfoTextDiv.find('span[name="a-content"]').removeClass().addClass('mkb-cc-app__el_alert-font')
            .find('span[name="bfr-img"]').removeClass().addClass('mkb-cc-app__el_alert-img').find('span[name="dnc-text"]');
          statusMessage = "Операция выполняется. Дождитесь ответа";
      }
      setTimeout(() => $textSpan.attr('title', titleMessage).text(statusMessage), 0);