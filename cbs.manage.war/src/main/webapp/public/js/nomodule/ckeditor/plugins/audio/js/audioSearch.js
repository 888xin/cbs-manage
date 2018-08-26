
var MUSIC_SEARCH;
(function ($) {
	var FINAL_VALUE = {RETURN:13, LEFT:37, UP:38, RIGHT:39, DOWN:40, TAB:9, ESC:27, PAGEUP:33, PAGEDOWN:34, CTRL:17, ALT:18, MUSIC_URL:"http://www.l99.com/SearchMusic.action?searchKey=$key&nowPage=$page"};
	var option = {searchObject:null, boxObject:null, musicObject:null, footerObject:null, prviewObject:null, loadObject:null, searchKey:"", pageFocus:1, musicFocus:0, maxFocus:0, lastTime:0};
	$.fn.musicSearch = function () {
		option.searchObject = $(this);
		option.boxObject = $("<div class='music-content' style='display:none;' ></div>");
		option.musicObject = $("<ul></ul>");
		option.footerObject = $("<div class='music-result-footer'></div>");
		option.boxObject.append(option.musicObject).append(option.footerObject);
		option.searchObject.parent().append(option.boxObject);
		option.prviewObject = $(".music-preview");
		option.loadObject = option.prviewObject.next();
		MUSIC_SEARCH = option.boxObject;

		option.boxObject.searchMuiscHandler = function (key, page) {
			if (option.searchKey == key && option.pageFocus == page) {
				return;
			}
			option.lastTime = new Date().getTime();
			option.loadObject.show();
			option.searchKey = key;
			option.pageFocus = page;
			var url = FINAL_VALUE.MUSIC_URL.replace("$key", key).replace("$page", page);
			$.get(url, option.boxObject.buildMuiscHandler, "json");
		};
		/*option.boxObject.buildMuiscHandler = function (data) {
			option.musicFocus = 0;
			option.maxFocus = data.results.length;
			var info1 = [];
			var info2 = [];
			info2.push("<div class='music-result-count'>\u5171<span>" + data.total + "</span>\u9996\u548c\u201c" + option.searchKey + "\u201d\u76f8\u5173\u7684\u6b4c\u66f2</div>");
			if (data.total > 0) {
				for (var i = 0; i < data.results.length; i = i + 1) {
					var t = data.results[i];
					var bg = i % 2 == 1 ? "" : "class='graybg'";
					info1.push("<li " + bg + " data='" + JSON.stringify(t).replace(/'/g,"`") + "' >");
					info1.push("<span class='music-song'>" + decodeURIComponent(t.song_name) + "</span>");
					info1.push("<span class='separator'>--</span>");
					info1.push("<span class='music-artist'>" + decodeURIComponent(t.artist_name) + "</span></li>");
				}
				info2.push("<div class='music-result-pager'>");
				if (option.pageFocus > 1) {
					info2.push("<a href='javascript:MUSIC_SEARCH.searchMuiscHandler(\"" + option.searchKey + "\"," + (option.pageFocus - 1) + ");'>\u4e0a\u4e00\u9875</a>");
				}
				info2.push("&nbsp;");
				if (option.pageFocus < Math.ceil(data.total / 8)) {
					info2.push("<a href='javascript:MUSIC_SEARCH.searchMuiscHandler(\"" + option.searchKey + "\"," + (option.pageFocus + 1) + ");'>\u4e0b\u4e00\u9875</a>");
				}
				info2.push("</div>");
			}
			option.musicObject.html(info1.join(""));
			option.footerObject.html(info2.join(""));
			option.loadObject.hide();
			option.boxObject.show();
			option.musicObject.children("li").mouseover(option.boxObject.mouseMuiscHandler).click(option.boxObject.chooseMuiscHandler);
		};*/
		option.boxObject.buildMuiscHandler = function(data){
			if(data.status == 1 && data.data != null){
				var muData = data.data;
				option.musicFocus = 0;
				option.maxFocus = muData.songs.length;
				var info1 = [];
				var info2 = [];
				if(muData.total_number == null) muData.total_number= 0;
				info2.push("<div class='music-result-count'>共<span>" + muData.total_number + "</span>首和“" + option.searchKey + "”相关的歌曲</div>");
				if(muData.total_number > 0){
					for(var i=0;i<muData.songs.length;i=i+1){
						var t = muData.songs[i];
						var bg = i%2==1 ? "" : "class='graybg'";
						info1.push("<li " + bg + " data='" + JSON.stringify(t).replace(/'/g,"`") + "' >");
						info1.push("<span class='music-song'>" + decodeURIComponent(t.song_name) + "</span>");
						info1.push("<span class='separator'>--</span>");
						info1.push("<span class='music-artist'>" + decodeURIComponent(t.artist_name) + "</span></li>");
					}
					info2.push("<div class='music-result-pager'>");
					if(option.pageFocus > 1){
						info2.push("<a href='javascript:MUSIC_SEARCH.searchMuiscHandler(\"" + option.searchKey + "\"," + (option.pageFocus - 1) + ");'>上一页</a>");				
					}
					info2.push("&nbsp;");
					if(option.pageFocus < Math.ceil(muData.total_number/8)){
						info2.push("<a href='javascript:MUSIC_SEARCH.searchMuiscHandler(\"" + option.searchKey + "\"," + (option.pageFocus + 1) + ");'>下一页</a>");				
					}
					info2.push("</div>");
				}
				option.musicObject.html(info1.join(""));
				option.footerObject.html(info2.join(""));
				option.loadObject.hide();
				option.boxObject.show();
				option.musicObject.children("li").mouseover(option.boxObject.mouseMuiscHandler).click(option.boxObject.chooseMuiscHandler);
			}
		}
		option.boxObject.mouseMuiscHandler = function (e) {
			var t;
			if (typeof e == "undefined") {
				t = option.musicObject.children("li").eq(option.musicFocus - 1);
			} else {
				t = $(this);
			}
			t.addClass("selected").siblings().removeClass("selected");
		};
		option.boxObject.chooseMuiscHandler = function (e) {
			var t;
			if (typeof e == "undefined") {
				t = option.musicObject.children("li").eq(option.musicFocus - 1);
			} else {
				t = $(this);
			}
			var tmpdata = JSON.parse(t.attr("data"));
			option.prviewObject.children(".post_music").children(".icon").attr("src", tmpdata.album_logo);
			var muiscdata = [];
			muiscdata.push("<embed width='257' height='33' wmode='transparent' type='application/x-shockwave-flash' src='http://www.xiami.com/widget/0_" + tmpdata.song_id + "/singlePlayer.swf'>");
			muiscdata.push("<input type='hidden' name='music.sourceType' value='1' />");
			muiscdata.push("<input type='hidden' name='music.songId' value='" + tmpdata.song_id + "' />");
			muiscdata.push("<input type='hidden' name='music.musicName' value='" + decodeURIComponent(tmpdata.song_name) + "' />");
			muiscdata.push("<input type='hidden' name='music.artistId' value='" + tmpdata.artist_id + "' />");
			muiscdata.push("<input type='hidden' name='music.artistName' value='" + decodeURIComponent(tmpdata.artist_name) + "' />");
			muiscdata.push("<input type='hidden' name='music.albumId' value='" + tmpdata.album_id + "' />");
			muiscdata.push("<input type='hidden' name='music.albumName' value='" + decodeURIComponent(tmpdata.album_name) + "' />");
			muiscdata.push("<input type='hidden' name='music.albumLogo' value='" + tmpdata.album_logo + "' />");
			option.prviewObject.children(".post_music").children(".player").html(muiscdata.join(""));
			//option.searchObject.hide();
			option.boxObject.hide();
			option.prviewObject.show();
			enableInserButton();
		};
		function enableInserButton(){
			$("#insert").removeClass("disable-button");
		}
		function disableInserButton(){
			$("#insert").addClass("disable-button");
		}
		option.searchObject.keyup(function (event) {
			if ((event.keyCode == FINAL_VALUE.UP || event.keyCode == FINAL_VALUE.DOWN) && option.boxObject.is(":visible") && option.maxFocus > 1) {
				if (event.keyCode == FINAL_VALUE.UP) {
					if (option.musicFocus == 1) {
						option.musicFocus = option.maxFocus;
					} else {
						option.musicFocus = option.musicFocus - 1;
					}
				} else {
					if (option.musicFocus == option.maxFocus) {
						option.musicFocus = 1;
					} else {
						option.musicFocus = option.musicFocus + 1;
					}
				}
				option.boxObject.mouseMuiscHandler();
				return;
			} else {
				if (event.keyCode == FINAL_VALUE.ESC && option.boxObject.is(":visible")) {
					option.boxObject.hide();
					return;
				} else {
					if (event.keyCode == FINAL_VALUE.RETURN && option.boxObject.is(":visible") && option.maxFocus > 1) {
						option.boxObject.chooseMuiscHandler();
						return;
					} else {
						if (event.keyCode == FINAL_VALUE.RETURN || event.keyCode == FINAL_VALUE.ESC || event.keyCode == FINAL_VALUE.UP || event.keyCode == FINAL_VALUE.DOWN || event.keyCode == FINAL_VALUE.LEFT || event.keyCode == FINAL_VALUE.RIGHT || event.keyCode == FINAL_VALUE.TAB || event.keyCode == FINAL_VALUE.PAGEUP || event.keyCode == FINAL_VALUE.PAGEDOWN || event.keyCode == FINAL_VALUE.CTRL || event.keyCode == FINAL_VALUE.ALT || event.keyCode == FINAL_VALUE.PAGEUP || event.keyCode == FINAL_VALUE.PAGEDOWN || event.keyCode == FINAL_VALUE.CTRL) {
				//这些按键触发事件取消
							return;
						}
					}
				}
			}
			if (new Date().getTime() - option.lastTime < 200) {
				//频繁事件间隔不能小于 500 毫秒
				return;
			}
			var v = $.trim(this.value);
			if (v == "") {
				option.searchKey = "";
				option.boxObject.hide();
				return;
			}
			option.boxObject.searchMuiscHandler(v, 1);
		}).keypress(function (event) {
		});
		option.prviewObject.children(".close").click(function () {
			option.prviewObject.children(".post_music").children(".music").empty();
			option.searchObject.val("");
			option.prviewObject.find("embed").removeAttr("src","");
			option.prviewObject.hide();
			option.searchObject.show().focus();
			disableInserButton();
		}).focus();
	};
})(jQuery);

