if(typeof (SiebelApp.MKBCCPortalFrameMainDraggable) === "undefined") {
    SiebelJS.Namespace("SiebelApp.MKBCCPortalFrameMainDraggable");
	define("siebel/custom/callcenter/MKBCCPortalFrameMainDraggable", [], function () {
		let $CCPortal, $iFramePortal = null;

		if ((window.location.href.toUpperCase().match(/FINSCC_RUS/) 
			|| window.location.href.toUpperCase().match(/CHAT_RUS/) 
			)
		) SiebelApp.EventManager.addListner("postload", () => setTimeout(SiebelApp.MKBCCPortalFrameMainDraggable.OnPostload(), 200), this);

		/**@see callcenter/MKBCCSubjectFormAppletNewPR.js, MKBCCCurrentSubjectFormAppletPR.js */
		SiebelApp.MKBCCPortalFrameMainDraggable.OnPostload = () => {
			try {
				$CCPortal = $("#CC-portal");
				let iFrameURL = SiebelAppFacade.MKBUtils.getProfileAttrs(['MKBCCCurrentSubjectURL'])['MKBCCCurrentSubjectURL']; // получение адреса iFrame 
				if (iFrameURL) {
					loadCss("files/custom/MKBCCDragPortalCSS.css");
					if (!$CCPortal.length) initPortal(iFrameURL);
					else {
						$iFramePortal.removeClass('siebui-busy'); // unlock frame
						if ($iFramePortal.attr("src") !== iFrameURL) $iFramePortal.attr("src", iFrameURL); // update frame content	
					}
					$(window).on("resize", () => { // при уменьшении окна браузера, портал будет в границах окна браузера
						if ($('#CC-portal-show-btn').css("display") === "none") updatePortalSizeByWindowSize();
					});
				} else if ($CCPortal.length) {
					$CCPortal.remove(); // clear ALL
					$('#CC-portal-show-btn').remove(); // outside button
				}
			} catch(e) { console.error(e); }
		}

		/**@param iFrameURL - основная ссылка iFrame */
		function initPortal(iFrameURL) {
			let $SWEView = $("#_sweview");
			let defaultClass = "mkb-cc-app__img_size-18 mkb-cc-app__el_cursor-p mkb-cc-app__img_clr_blue mkb-cc-app__img_p-lr-5 mkb-cc-app__el_display-ir";
			$SWEView.after(`<div id="CC-portal" class="CC-portal-drag"><div class="CC-portal-title">
					<div id="CC-portal-title-txt" class="mkb-cc-app__text_size-18 mkb-cc-app__el_float-l">Портал знаний</div>
					<div id="CC-portal-hide-btn" title="Скрыть (Alt + Ё)" class="mkb-cc-app__el_disp-center-img mkb-cc-app__el_float-r ${defaultClass}"><span class="mkb-cc-app__el_display-br"></span></div>
					<div id="CC-portal-resize-btn" title="Задать максимальный размер (Alt + 1)" class="mkb-cc-app__el_expand-arw-img mkb-cc-app__el_float-r ${defaultClass}"><span class="mkb-cc-app__el_display-br"></span></div>
				</div><iframe id="iFrame-Portal" class="iFrame-Portal" src="${iFrameURL}" loading="lazy" frameborder="0" align="right"></iframe>
				<div class="ui-resizable-handle ui-resizable-nw" id="nw-cc-portal"></div> <div class="ui-resizable-handle ui-resizable-ne" id="ne-cc-portal"></div>
				<div class="ui-resizable-handle ui-resizable-sw" id="sw-cc-portal"></div> <div class="ui-resizable-handle ui-resizable-se" id="se-cc-portal"></div>
				<div class="ui-resizable-handle ui-resizable-n" id="n-cc-portal"></div> <div class="ui-resizable-handle ui-resizable-s" id="s-cc-portal"></div>
				<div class="ui-resizable-handle ui-resizable-e" id="e-cc-portal"></div> <div class="ui-resizable-handle ui-resizable-w" id="w-cc-portal"></div></div>`);
			$('#siebui-toolbar-settings').parent().prepend(`<div id="CC-portal-show-btn" title="Показать (Alt + Ё)" class=" mkb-cc-app__el_cursor-p mkb-cc-app__img_clr_blue mkb-cc-app__img_size-24 mkb-cc-app__el_float-r mkb-cc-app__el_mb-auto mkb-cc-app__el_mt-auto mkb-cc-app__el_mr-10 mkb-cc-app__el_disp-full-img mkb-cc-app__el_v_align-m"><span class="mkb-cc-app__el_display-br"></span></div>`);
			$CCPortal = $("#CC-portal");
$iFramePortal = $CCPortal.find('#iFrame-Portal');
			/* +++ PORTAL +++ */
			$CCPortal.draggable({containment: "parent", handle: ".CC-portal-title", stop: (event, ui) => {
				$iFramePortal.removeClass('siebui-busy'); // unlock frame
				if($btnResize.hasClass('mkb-cc-app__el_expand-arw-img')) savePortalSize(ui.position.top+"px", ui.position.left+"px", $CCPortal.css("width"), $CCPortal.css("height"));
				}, drag: (event, ui) => $iFramePortal.addClass('siebui-busy') }); // lock frame
			$CCPortal.resizable({containment: "parent", minWidth: $CCPortal.css("min-width"), minHeight: $CCPortal.css("min-height"), handles: { 
				'nw': '#nw-cc-portal', 'n': '#n-cc-portal', 'ne': '#ne-cc-portal', 'e': '#e-cc-portal',
				'se': '#se-cc-portal', 's': '#s-cc-portal', 'sw': '#sw-cc-portal', 'w': '#w-cc-portal'
				}, stop: (event, ui) => {
					$iFramePortal.removeClass('siebui-busy'); // unlock frame
					if(ui.position.top < 0) $CCPortal.css({"top": 0, "height": $SWEView.height()});
					if(ui.position.left < 0) $CCPortal.css({"left": 0, "width": $SWEView.width()});
					if(parseFloat($CCPortal.css("right")) < 0) $CCPortal.css({"right": 0, "width": $SWEView.width()});
					if(parseFloat($CCPortal.css("bottom")) < 0) $CCPortal.css({"bottom": 0, "height": $SWEView.height()});		
					savePortalSize(ui.position.top+"px", ui.position.left+"px", $CCPortal.css("width"), $CCPortal.css("height"));
					resetBtnResize();
				}, resize: (event, ui) => $iFramePortal.addClass('siebui-busy') });	// lock frame						
			updatePortalSize();
			/* --- PORTAL --- */
			/* +++ BUTTONS +++ */
			let $btnHide = $('#CC-portal-hide-btn'), $btnShow = $('#CC-portal-show-btn'), $btnResize = $('#CC-portal-resize-btn');
			let portalRightCss, portalTopCss, viewParentTopCss = parseFloat($('#_swecontent').css('top'));
			let animateIsReady = true;
			$btnHide.click(() => {
				animateIsReady = false;
				$btnHide.hide();
				portalRightCss = parseFloat($CCPortal.css('right'));
				portalTopCss = parseFloat($CCPortal.css('top')) + viewParentTopCss;
				$CCPortal.animate({
					opacity: 0.25,
					left: "+=" + portalRightCss,
					top: "-=" + portalTopCss,
					height: "toggle",
					opacity: "toggle"
				}, 500, () => { $btnShow.show(); animateIsReady = true; });
			});
			$btnShow.hide().click(() => {
				animateIsReady = false;
				$btnShow.hide();
				$CCPortal.animate({
					opacity: 1,
					left: "-=" + portalRightCss,
					top: "+=" + portalTopCss,
					height: "show",
					opacity: "show"
				}, 500, () => { 
					updatePortalSizeByWindowSize();
					$btnHide.show(); 
					animateIsReady = true; 
				});
			});
			$btnResize.click(() => {
				if($btnResize.hasClass('mkb-cc-app__el_expand-arw-img')) {
					$CCPortal.css({
						"inset": "0 auto auto auto",
						"width": "100%",
						"height": "100%"
					});
					$btnResize.removeClass('mkb-cc-app__el_expand-arw-img').addClass('mkb-cc-app__el_contract-arw-img').attr('title', "Вернуть размер (Alt + 1)");
				} else {
					updatePortalSize();
					resetBtnResize();
				}
			});
			// hotkeys
			$(document).keyup(function(event) { // alt key
				if (event.keyCode === 18) $iFramePortal.removeClass('siebui-busy');
			});
			$(document).keydown(function(event) {
				if(event.altKey) {
					$iFramePortal.addClass('siebui-busy');
					switch (event.which) {
						case 192: // alt+ё
							if(animateIsReady) $btnShow.css("display") === "none" ? $btnHide.click() : $btnShow.click();
							break;
						case 49: // alt+1
							if($btnShow.css("display") === "none") $btnResize.click();
							break;
						case 50: // alt+2
							savePortalSize("5%", "58%", "40%", "90%"); // reset
							updatePortalSize();
							break;
					}
				}
			});
			function resetBtnResize() { $btnResize.removeClass('mkb-cc-app__el_contract-arw-img').addClass('mkb-cc-app__el_expand-arw-img').attr('title', "Задать максимальный размер (Alt + 1)"); }
			/* --- BUTTONS --- */
		}
		function updatePortalSize() {
			if($.cookie('CCPortalTop')) {
					$CCPortal.css({
					"inset": `${$.cookie('CCPortalTop')} 
							  ${parseFloat($.cookie('CCPortalWidth')) + parseFloat($.cookie('CCPortalLeft'))}px 
							  ${parseFloat($.cookie('CCPortalHeight')) + parseFloat($.cookie('CCPortalTop'))}px 
							  ${$.cookie('CCPortalLeft')}`,
					"width":  $.cookie('CCPortalWidth'),
					"height": $.cookie('CCPortalHeight')
				})
				updatePortalSizeByWindowSize();
			} else $CCPortal.css({
				"inset": "5% auto auto 58%",
				"width": "40%",
				"height": "90%"
			});
		}

		function updatePortalSizeByWindowSize() {
			let right = parseFloat($CCPortal.css("right")), bottom = parseFloat($CCPortal.css("bottom")),
				width = parseFloat($CCPortal.parent().css('width')), height = parseFloat($CCPortal.parent().css('height'));
			//left+right
			if (right < 0) $CCPortal.css({"left": parseFloat($CCPortal.css("left")) + right});
			if (parseFloat($CCPortal.css("left")) > width) $CCPortal.css({"left": width - parseFloat($CCPortal.css("width"))});
			if (parseFloat($CCPortal.css("left")) < 0) $CCPortal.css({"left": 0, "width":  width});
			if (parseFloat($CCPortal.css("width")) > width) $CCPortal.css({"width": width});
			//height+bottom
			if (bottom < 0) $CCPortal.css({"top": parseFloat($CCPortal.css("top")) + bottom});
			if (parseFloat($CCPortal.css("top")) > height) $CCPortal.css({"top": height - parseFloat($CCPortal.css("height"))});
			if (parseFloat($CCPortal.css("top")) < 0) $CCPortal.css({"top": 0, "height":  height});
			if (parseFloat($CCPortal.css("height")) > height) $CCPortal.css({"height": height});
		}

		/**@params - css: CCPortal.position, CCPortal.size */
		function savePortalSize(top, left, width, height) {
			$.cookie('CCPortalTop', top, { expires: 365 });
			$.cookie('CCPortalLeft', left, { expires: 365 });
			$.cookie('CCPortalWidth', width, { expires: 365 });
			$.cookie('CCPortalHeight', height, { expires: 365 });
		}

		/**@param url - css path */
		function loadCss(url) {
			if (!url) return false;
			if (!Array.isArray(url)) url = new Array(url);
			for (let i = 0; i < url.length; i++) {
				let link = document.createElement("link");
				link.type = "text/css";
				link.rel = "stylesheet";
				link.id = "css_ccportal";
				link.href = url[i];
				document.querySelector("head").appendChild(link);
			}
		}

		return "SiebelAppFacade.MKBCCPortalFrameMainDraggable";
	});
}
