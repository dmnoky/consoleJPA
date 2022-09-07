 /**
     * Вызов бизнес-сервиса
     * @param {String} BS название сервиса
     * @param {String} methodName название метода
     * @param {JSON} input Входные параметры
     * @param {Object} inputConfig асинхронный ли вызов?
     */
    startServiceSimpl(BS, methodName, input, inputConfig = null) {
      if (!BS) throw 'Ошибка! Не передан BS';
      if (!methodName) throw 'Ошибка! Не передано название метода';
      let oUtilsScope = this;
      const oService = SiebelApp.S_App.GetService(BS);
      let result = {};
      if (oService) {
        const oInputPS = this.json2ps(input);
        let config = {
          'async': false,
          'scope': this,
          'selfbusy': true
        };
        if (inputConfig) {
          if (typeof (inputConfig.async) != "undefined") config.async = inputConfig.async;
          if (typeof (inputConfig.scope) != "undefined") config.scope = inputConfig.scope;
          if (typeof (inputConfig.selfbusy) != "undefined") config.selfbusy = inputConfig.selfbusy;
        }
        config.cb = function () {
          const oOutPS = arguments[2];
          if (oOutPS) {
            const oResultSet = oOutPS.GetChildByType("ResultSet");
            if (oResultSet) {
              result = oUtilsScope.ps2json(oResultSet);

              if (inputConfig) {
                if (inputConfig.cb && typeof (inputConfig.cb) === "function") {
                  if (inputConfig.respFormat === "propSet") {
                    inputConfig.cb.apply(config.scope, [ResultSet]);
                  }
                  else {
                    inputConfig.cb.apply(config.scope, [result]);
                  }
                }
              }
            }
          }
        }
        oService.InvokeMethod(methodName, oInputPS, config);
      }
      return result;
    }
ChromeNotification(title, body, Method, RecId) {
      function CreateNotification(title, body, Method, RecId) {
        let options =
        {
          'title': title,
          'body': body,
          'icon': "files/LogoOracleSiebel.png"
        };
        let notification = new Notification(options.title, options);
        arr.push(notification);
        switch (Method) {
          case "GoBackToEO":
            notification.addEventListener('click', function () { SiebelAppFacade.MKBUtils.startServiceSimpl('Workflow Process Manager', 'RunProcess', { ProcessName: 'MKB CC Call Ended Go Back To EO Proccess', RowId: 'MKBCC', ActId: RecId }); });
            break;
        }
        function CloseNotifications() {
          arr.forEach(function (item, i) { arr[i].close(); });
          window.removeEventListener('beforeunload', CloseNotifications);
        }
        window.addEventListener('beforeunload', CloseNotifications);

      }
      let { permission } = Notification;
      if (permission === "denied") {
        alert(title + "\n" + body + "\nДля отображения уведомлений необходимо в разделе браузера 'Настройки-->Конфеденциальность и безопасность-->Настройки сайтов-->Уведомления' проставить галочку 'Сайты могут запрашивать разрешения на отправку уведомлений'. Удостоверьтесь, что сайт https://crm8web.mcb.ru/ не находится в разделе 'Запретить сайтам показывать уведомления'");
      }
      else if (permission === "default") {
        Notification.requestPermission().then(function () { CreateNotification(title, body, Method, RecId); });
      }
      else {
        CreateNotification(title, body, Method, RecId);
      }
    }
/**
     * Трансформировать PS в JSON
     * @param {PropertySet} PS
     * @return {*} JSON
     */
    ps2json(PS) {
      const json = {};

      const value = PS.GetValue();

      const childsCount = PS.GetChildCount();
      const propertiesCount = PS.GetPropertyCount();
      const valueLength = value.length;

      // Вернуть свойство value как строку, если нет ничего другого
      if (childsCount === 0 && propertiesCount === 0 && valueLength > 0) {
        return value;
      }

      // Парсим дочерние PS
      if (childsCount > 0) {
        for (let i = 0; i < childsCount; i++) {
          const childps = PS.GetChild(i);
          let childtype = childps.GetType();
          if (childtype == '') {
            childtype = i;
          }
          if (!json[childtype]) {
            json[childtype] = this.ps2json(childps);
          } else {
            if (json[childtype].constructor !== Array) {
              json[childtype] = [json[childtype]];
            }
            json[childtype].push(this.ps2json(childps));
          }
        }
      }

      // Парсим все свойства
      if (propertiesCount > 0) {
        for (let prop = PS.GetFirstProperty(); prop; prop = PS.GetNextProperty()) {
          json[prop] = PS.GetProperty(prop);
        }
      }

      // Парсим свойство value
      if (valueLength > 0) {
        json['<Value>'] = value;
      }
      return json;
    }
/**
     * Трансформировать JSON в PS
     * @param {*} JSON
     * @return {PropertySet} PS
     */
    json2ps(json) {
      let oResultPS = SiebelApp.S_App.NewPropertySet();
      for (let key in json) {
        let value = json[key];
        if (typeof (value) == "undefined" || value == null) {
          value = "";
        }
        if (typeof (value) === "string" || typeof (value) === "number") {
          if (key === "<Value>") {
            oResultPS.SetValue(value);
          } else {
            oResultPS.SetProperty(key, value);
          }
        } else if (typeof (value.push) != "undefined") {
          for (let i = 0; i < value.length; i++) {
            let oTmpPS = this.json2ps(value[i]);
            oTmpPS.SetType(key);
            oResultPS.AddChild(oTmpPS);
          }
        } else if (typeof (value) === "object") {
          let oTmpPS = this.json2ps(value);
          oTmpPS.SetType(key);
          oResultPS.AddChild(oTmpPS);
        }
      }
      return oResultPS;
    }