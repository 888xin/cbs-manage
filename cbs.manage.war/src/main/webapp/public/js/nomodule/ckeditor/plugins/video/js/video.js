
var VIDEO_SEARCH;
(function ($) {
	var VIDEO_FINAL_VALUE = {RETURN:13, LEFT:37, UP:38, RIGHT:39, DOWN:40, TAB:9, ESC:27, PAGEUP:33, PAGEDOWN:34, CTRL:17, ALT:18, VERIFI_URL:"http://www.l99.com/EditVideo_verifi.action?jsoncallback=?", SEARCH_URL:"http://www.l99.com/EditVideo_search.action?jsoncallback=?", DETAIL_URL:"http://www.l99.com/EditVideo_detail.action?jsoncallback=?"};
	var option = {inputObject:null, prviewObject:null, boxObject:null, loadObject:null, titleObject:null, fileObject:null, imageObject:null, typeObject:null, lastPost:null, searchFlag:false, inFlag:false, tempKey:null, searchKey:null, searchObject:null, searchLoadObject:null, contentObject:null, videoObject:null, footerObject:null, addressInput:null, videoInput:null, showNum:12, videoFocus:0, maxFocus:0, sto:null};
	$.fn.videoVerifi = function (options) {
		$.extend(option, options);
		option.inputObject = $(this);
		option.prviewObject = $("#video_preview");
		option.boxObject = $("#video_wrap");
		option.titleObject = $("#video_title");
		option.fileObject = $("#video_file");
		option.imageObject = $("#video_logo");
		option.typeObject = $("#video_type");
		option.addressInput = $("#video_address_input");
		option.rightAddr = false;
		option.loadObject = option.inputObject.next();
		option.inputObject.blur(function () {
			var o = $(this);
			var v = $.trim(o.val());
			
			if (v == "") {
				return;
			}
			if (option.rightAddr && v == option.lastPost) {
				if (option.fileObject.val() != "") {
					option.prviewObject.show();
					$("#insert").removeClass("disable-button")
					option.addressInput.hide();
				}
				return;
			}
			option.loadObject.show();
			$.get(VIDEO_FINAL_VALUE.VERIFI_URL, {"videoUrl":v}, function (data) {
				//check whether displayed flash-preview
				var emb = $("#prev embed");
				
				if( emb.attr("src") ){
					if(data.msg.u == emb.attr("src")){		
						return;
					}	
				}

				option.lastPost = v;
				option.loadObject.hide();
				if (data == null || data.status == "0") {
					option.rightAddr = false;					
					alert("\u65e0\u6cd5\u8bc6\u522b\u8be5\u89c6\u9891\u5730\u5740\uff0c\u8bf7\u68c0\u67e5\u3002");					
					option.prviewObject.hide();
					option.addressInput.show();
					o.val("");
					validInsert.insert = false;
					$("#insert").addClass("disable-button")					
					return;
				}

				option.rightAddr = true;
				option.buildVideoHandler(data.msg);
				option.addressInput.hide();
				validInsert.insert = true;
				$("#insert").removeClass("disable-button")
			}, "json");
		});
		option.buildVideoHandler = function (data) {
			var info = [];
			info.push("<div title=\"" + data.t + "\" class=\"post_video_thumbnail\" >");
			info.push("<a href=\"#\" class=\"video_play_mark\" rel=\"" + data.u + "\" rev=\"false\" videotype=\"" + data.y + "\" title=\"\u70b9\u51fb\u64ad\u653e\u89c6\u9891\">");
			info.push("<img class=\"icon\" src=\"" + data.i + "\" />");
			info.push("<img class=\"play\" src=\"http://static.l99.com/skin/lifeix/images/video/video_play_60.png\" />");
			info.push("</a>");
			info.push("</div>");
			info.push("<div title=\"" + data.t + "\" class=\"hidden post_video\">");
			info.push("<div class=\"post_video_file file_mark\"></div>");
			info.push("<a href=\"#\" class=\"post_video_close video_close_mark\" >");
			info.push("<img src=\"http://static.l99.com/skin/lifeix/images/timeline/guide_bg.png\" />");
			info.push("</a>");
			info.push("</div>");
			option.boxObject.html(info.join(""));
			option.boxObject.find(".video_play_mark").videoplay();
			option.boxObject.find(".video_close_mark").videoclose();
			if (typeof data.t != "undefined") {
				option.titleObject.val(data.t);
			}
			option.fileObject.val(data.u);
			option.imageObject.val(data.i);
		
			$("#insert").removeClass("disable-button")			
			option.typeObject.val(data.y);
			option.inputObject.val(data.s);
			option.prviewObject.show();
			validInsert.search = true; 			
		};
		option.prviewObject.children(".close").click(function () {
			option.prviewObject.hide();
			if (option.inFlag) {
				option.addressInput.show();
				option.inputObject.focus();
			} else {
				option.videoInput.show();
				option.contentObject.show();
				option.searchObject.focus();
			}
			validInsert.search = false;
			$("#insert").addClass("disable-button");			
		}).focus();
		if (option.searchFlag) {
			option.searchObject = $("#video_search_val");
			option.contentObject = $("#video_search_input > .video-content");
			option.videoObject = $("<ul></ul>");
			option.footerObject = $("<div class='video-result-footer'></div>");
			option.contentObject.append(option.videoObject).append(option.footerObject);
			option.searchLoadObject = option.searchObject.next();
			option.videoInput = $("#video_search_input");
			option.searchObject.keyup(function (event) {
				if ((event.keyCode == VIDEO_FINAL_VALUE.UP || event.keyCode == VIDEO_FINAL_VALUE.DOWN) && option.contentObject.is(":visible") && option.maxFocus > 0) {
					if (event.keyCode == VIDEO_FINAL_VALUE.UP) {
						if (option.videoFocus == 1) {
							option.videoFocus = option.maxFocus;
						} else {
							option.videoFocus = option.videoFocus - 1;
						}
					} else {
						if (option.videoFocus == option.maxFocus) {
							option.videoFocus = 1;
						} else {
							option.videoFocus = option.videoFocus + 1;
						}
					}
					option.contentObject.mouseVideoHandler();
					return;
				} else {
					if (event.keyCode == VIDEO_FINAL_VALUE.ESC && option.contentObject.is(":visible")) {
						option.contentObject.hide();
						if (event) {
							event.stopPropagation();
						} else {
							window.event.cancelBubble = true;
						}
						return;
					} else {
						if (event.keyCode == VIDEO_FINAL_VALUE.RETURN && option.contentObject.is(":visible") && option.maxFocus > 0) {
							option.contentObject.chooseVideoHandler();
							if (event) {
								event.stopPropagation();
							} else {
								window.event.cancelBubble = true;
							}
							return;
						} else {
							if (event.keyCode == VIDEO_FINAL_VALUE.RETURN || event.keyCode == VIDEO_FINAL_VALUE.ESC || event.keyCode == VIDEO_FINAL_VALUE.UP || event.keyCode == VIDEO_FINAL_VALUE.DOWN || event.keyCode == VIDEO_FINAL_VALUE.LEFT || event.keyCode == VIDEO_FINAL_VALUE.RIGHT || event.keyCode == VIDEO_FINAL_VALUE.TAB || event.keyCode == VIDEO_FINAL_VALUE.PAGEUP || event.keyCode == VIDEO_FINAL_VALUE.PAGEDOWN || event.keyCode == VIDEO_FINAL_VALUE.CTRL || event.keyCode == VIDEO_FINAL_VALUE.ALT || event.keyCode == VIDEO_FINAL_VALUE.PAGEUP || event.keyCode == VIDEO_FINAL_VALUE.PAGEDOWN || event.keyCode == VIDEO_FINAL_VALUE.CTRL) {
					//这些按键触发事件取消
								return;
							}
						}
					}
				}
				if (option.sto != null) {
					clearTimeout(option.sto);
					option.sto = null;
				}
				option.tempKey = $.trim(this.value);
				if (option.tempKey == "" && option.searchKey == null) {
					return;
				}
				option.sto = setTimeout(function () {
					option.contentObject.searchVideoHandler(option.tempKey, 1);
				}, 900);
			}).dblclick(function () {
				if (option.contentObject.is(":hidden") && option.sto == null) {
					if ($.trim(option.searchObject.val()) != "") {
						option.contentObject.show();
						return;
					}
					option.tempKey = "";
					option.searchKey = null;
					option.sto = setTimeout(function () {
						option.contentObject.searchVideoHandler(option.tempKey, 1);
					}, 900);
				}
			}).focus(function () {
				if (this.value == "\u8f93\u5165\u89c6\u9891\u540d\u79f0\u641c\u7d22") {
					$(this).val("");
					$(this).removeClass("searchTips");
				}
			}).blur(function () {
				if (this.value == "") {
					$(this).val("\u8f93\u5165\u89c6\u9891\u540d\u79f0\u641c\u7d22");
					$(this).addClass("searchTips");
				}
			});
			option.contentObject.searchVideoHandler = function (key, page) {
				if (option.searchKey == key && option.pageFocus == page) {
					return;
				}
				option.lastTime = new Date().getTime();
				option.searchLoadObject.show();
				option.searchKey = key;
				option.pageFocus = page;
				option.sto = null;
				$.get(VIDEO_FINAL_VALUE.SEARCH_URL, {"key":encodeURIComponent(option.tempKey), "nowPage":option.pageFocus, "num":option.showNum}, option.contentObject.buildVideoHandler, "json");
			};
			option.contentObject.buildVideoHandler = function (data) {
				if (data.status == "0") {
					option.searchLoadObject.hide();
					option.videoObject.text(data.msg);
					option.contentObject.show();
					option.eto = setTimeout(function () {
						option.contentObject.hide();
					}, 3000);
					return;
				}
				data = data.msg;
				option.videoFocus = 0;
				option.maxFocus = data.v.length;
				var info1 = [];
				var info2 = [];
				if (option.searchKey == "") {
					info2.push("<div class='video-result-count'><span>\u70ed\u95e8\u89c6\u9891</span>\u5171<span>" + data.t + "</span>\u4e2a</div>");
				} else {
					info2.push("<div class='video-result-count'>\u5171<span>" + data.t + "</span>\u4e2a\u548c<span>" + option.tempKey + "</span>\u76f8\u5173\u7684\u89c6\u9891</div>");
				}
				if (data.t > 0) {
					for (var i = 0; i < data.v.length; i = i + 1) {
						var t = data.v[i];
						var bg = (i % 4 == 1 || i % 4 == 2) ? "" : "class='graybg'";
						info1.push("<li " + bg + " data='" + JSON.stringify(t) + "' title='" + t.t + "' >");
						info1.push("<div class='video-ret-img'>");
						info1.push("<img src='" + t.i + "' />");
						info1.push("</div>");
						info1.push("<div class='video-ret-content'>");
						info1.push("<div class='video-ret-title'>" + t.t + "</div>");
						info1.push("<div class='video-ret-desc'>" + t.d + "</div>");
						info1.push("</div>");
						info1.push("</li>");
					}
					info2.push("<div class='video-result-pager'>");
					if (option.pageFocus > 1) {
						info2.push("<a href='javascript:VIDEO_SEARCH.searchVideoHandler(\"" + option.tempKey + "\"," + (option.pageFocus - 1) + ");'>\u4e0a\u4e00\u9875</a>");
					}
					info2.push("&nbsp;");
					if (option.pageFocus < Math.ceil(data.t / option.showNum)) {
						info2.push("<a href='javascript:VIDEO_SEARCH.searchVideoHandler(\"" + option.tempKey + "\"," + (option.pageFocus + 1) + ");'>\u4e0b\u4e00\u9875</a>");
					}
					info2.push("</div>");
				}
				option.videoObject.html(info1.join(""));
				option.footerObject.html(info2.join(""));
				option.searchLoadObject.hide();
				option.contentObject.show();
				option.videoObject.children("li").mouseover(option.contentObject.mouseVideoHandler).click(option.contentObject.chooseVideoHandler);
			};
			option.contentObject.mouseVideoHandler = function (e) {
				var t;
				if (typeof e == "undefined") {
					t = option.videoObject.children("li").eq(option.videoFocus - 1);
				} else {
					t = $(this);
				}
				t.addClass("selected").siblings().removeClass("selected");
			};
			option.contentObject.chooseVideoHandler = function (e) {
				var t;
				if (typeof e == "undefined") {
					t = option.videoObject.children("li").eq(option.videoFocus - 1);
				} else {
					t = $(this);
				}
				var tmpdata = JSON.parse(t.attr("data"));
				
				// 搜索结果不返回视频文件的地址,需要单独查询视频信息
				$.get(VIDEO_FINAL_VALUE.DETAIL_URL, {videoIdStr:tmpdata.id}, function(data){
					if(data.status == 1){
						option.buildVideoHandler(data.msg);
						option.videoInput.hide();
						option.contentObject.hide();
						validInsert.search = true;
						$("#insert").removeClass("disable-button");
					}else{
						alert("无法获得视频信息.");
					}
				}, "json");
				
				
				
			};
			function enableInserButton(){
				$("#insert").removeClass("disable-button");
			}
			function disableInserButton(){
				$("#insert").addClass("disable-button");
			}				
			$("html").keyup(function (event) {
				if (option.contentObject.is(":visible")) {
					if (event.keyCode == VIDEO_FINAL_VALUE.RETURN && option.maxFocus > 0) {
						option.contentObject.chooseVideoHandler();
					} else {
						if (event.keyCode == VIDEO_FINAL_VALUE.ESC) {
							option.contentObject.hide();
						}
					}
				}
			});
			$("#video_address").click(function () {
				$("#video_search").removeClass("select");
				$("#video_search_tips").hide();
				option.videoInput.hide();
				$("#video_address").addClass("select");
				$("#video_address_tips").show();
				option.addressInput.show();
				option.prviewObject.hide();
				option.inFlag = true;
			});
			$("#video_search").click(function () {
				$("#video_address").removeClass("select");
				$("#video_address_tips").hide();
				option.addressInput.hide();
				$("#video_search").addClass("select");
				$("#video_search_tips").show();
				option.videoInput.show();
				option.prviewObject.hide();
				option.inFlag = false;
			});
			VIDEO_SEARCH = option.contentObject;
		}
	};
})(jQuery);
/*wangfj*/
//tinyMCEPopup.requireLangPack();

