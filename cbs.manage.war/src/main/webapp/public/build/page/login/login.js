define("jquery.gritter.min",function(e,t,r){!function(e){e.gritter={},e.gritter.options={position:"",class_name:"",fade_in_speed:"medium",fade_out_speed:1e3,time:6e3},e.gritter.add=function(e){try{return t.add(e||{})}catch(r){var i="Gritter Error: "+r;"undefined"!=typeof console&&console.error?console.error(i,e):alert(i)}},e.gritter.remove=function(e,r){t.removeSpecific(e,r||{})},e.gritter.removeAll=function(e){t.stop(e||{})};var t={position:"",fade_in_speed:"",fade_out_speed:"",time:"",_custom_timer:0,_item_count:0,_is_setup:0,_tpl_close:'<div class="gritter-close"></div>',_tpl_title:'<span class="gritter-title">[[title]]</span>',_tpl_item:'<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>',_tpl_wrap:'<div id="gritter-notice-wrapper"></div>',add:function(r){if("string"==typeof r&&(r={text:r}),null===r.text)throw'You must supply "text" parameter.';this._is_setup||this._runSetup();var i=r.title,o=r.text,s=r.image||"",n=r.sticky||!1,a=r.class_name||e.gritter.options.class_name,l=e.gritter.options.position,c=r.time||"";this._verifyWrapper(),this._item_count++;var m=this._item_count,u=this._tpl_item;e(["before_open","after_open","before_close","after_close"]).each(function(i,o){t["_"+o+"_"+m]=e.isFunction(r[o])?r[o]:function(){}}),this._custom_timer=0,c&&(this._custom_timer=c);var g=""!=s?'<img src="'+s+'" class="gritter-image" />':"",_=""!=s?"gritter-with-image":"gritter-without-image";if(i=i?this._str_replace("[[title]]",i,this._tpl_title):"",u=this._str_replace(["[[title]]","[[text]]","[[close]]","[[image]]","[[number]]","[[class_name]]","[[item_class]]"],[i,o,this._tpl_close,g,this._item_count,_,a],u),this["_before_open_"+m]()===!1)return!1;e("#gritter-notice-wrapper").addClass(l).append(u);var d=e("#gritter-item-"+this._item_count);return d.fadeIn(this.fade_in_speed,function(){t["_after_open_"+m](e(this))}),n||this._setFadeTimer(d,m),e(d).bind("mouseenter mouseleave",function(r){"mouseenter"==r.type?n||t._restoreItemIfFading(e(this),m):n||t._setFadeTimer(e(this),m),t._hoverState(e(this),r.type)}),e(d).find(".gritter-close").click(function(){t.removeSpecific(m,{},null,!0)}),m},_countRemoveWrapper:function(t,r,i){r.remove(),this["_after_close_"+t](r,i),0==e(".gritter-item-wrapper").length&&e("#gritter-notice-wrapper").remove()},_fade:function(e,r,i,o){var i=i||{},s="undefined"!=typeof i.fade?i.fade:!0,n=i.speed||this.fade_out_speed,a=o;this["_before_close_"+r](e,a),o&&e.unbind("mouseenter mouseleave"),s?e.animate({opacity:0},n,function(){e.animate({height:0},300,function(){t._countRemoveWrapper(r,e,a)})}):this._countRemoveWrapper(r,e)},_hoverState:function(e,t){"mouseenter"==t?(e.addClass("hover"),e.find(".gritter-close").show()):(e.removeClass("hover"),e.find(".gritter-close").hide())},removeSpecific:function(t,r,i,o){if(!i)var i=e("#gritter-item-"+t);this._fade(i,t,r||{},o)},_restoreItemIfFading:function(e,t){clearTimeout(this["_int_id_"+t]),e.stop().css({opacity:"",height:""})},_runSetup:function(){for(opt in e.gritter.options)this[opt]=e.gritter.options[opt];this._is_setup=1},_setFadeTimer:function(e,r){var i=this._custom_timer?this._custom_timer:this.time;this["_int_id_"+r]=setTimeout(function(){t._fade(e,r)},i)},stop:function(t){var r=e.isFunction(t.before_close)?t.before_close:function(){},i=e.isFunction(t.after_close)?t.after_close:function(){},o=e("#gritter-notice-wrapper");r(o),o.fadeOut(function(){e(this).remove(),i()})},_str_replace:function(e,t,r,i){var o=0,s=0,n="",a="",l=0,c=0,m=[].concat(e),u=[].concat(t),g=r,_=u instanceof Array,d=g instanceof Array;for(g=[].concat(g),i&&(this.window[i]=0),o=0,l=g.length;l>o;o++)if(""!==g[o])for(s=0,c=m.length;c>s;s++)n=g[o]+"",a=_?void 0!==u[s]?u[s]:"":u[0],g[o]=n.split(m[s]).join(a),i&&g[o]!==n&&(this.window[i]+=(n.length-g[o].length)/m[s].length);return d?g:g[0]},_verifyWrapper:function(){0==e("#gritter-notice-wrapper").length&&e("body").append(this._tpl_wrap)}}}(jQuery)}),define("login",["jquery.gritter.min"],function(e,t,r){function i(e){jQuery(".widget-box.visible").removeClass("visible"),jQuery("#"+e).addClass("visible")}function o(){var e=$("#username").val().trim(),t=$("#password").val().trim();if(""==e||""==t)return alert("用户名或密码不能为空"),!1;var r=document.getElementById("remember_me").checked;r?(localStorage.setItem("userName",e),localStorage.setItem("userPassword",t),localStorage.setItem("auto_login",1)):(localStorage.setItem("userName",null),localStorage.setItem("userPassword",null),localStorage.setItem("auto_login",0)),localStorage.setItem("login_time",(new Date).getTime()),document.loginForm.submit()}e("jquery.gritter.min"),$("#login").click(function(){o()}),$(".forgot-password-link").click(function(){return i("forgot-box"),!1}),$(".user-signup-link").click(function(){return i("signup-box"),!1}),$(".back-to-login-link").click(function(){return i("login-box"),!1}),$(document).keypress(function(e){13==e.which&&o()});var s=localStorage.getItem("login_time"),n=localStorage.getItem("auto_login");if(null==s||0==n)localStorage.setItem("login_time",(new Date).getTime()),$("#username").val(""),$("#password").val(""),document.getElementById("remember_me").checked=!1;else{document.getElementById("remember_me").checked=!0;var a=(new Date).getTime()-s,l=a/6048e5;if(7>l){var c=localStorage.getItem("userName"),m=localStorage.getItem("userPassword");console.log(c),console.log(m),$("#username").val(c),$("#password").val(m),localStorage.setItem("login_time",(new Date).getTime())}else localStorage.setItem("userName",null),localStorage.setItem("userPassword",null),localStorage.setItem("login_time",null)}$("#register_bt").on("click",function(){var e=$("#protocol").get(0).checked;if(!e)return void $.gritter.add({title:"请接受用户协议",time:2e3,class_name:"gritter-warning gritter-center"});var t=$("#new_username").val().trim(),r=$("#new_password").val().trim(),i=$("#new_repassword").val().trim();return""==t?void $.gritter.add({title:"用户名不能为空",time:2e3,class_name:"gritter-error gritter-center"}):""==r?void $.gritter.add({title:"密码不能为空",time:2e3,class_name:"gritter-error gritter-center"}):r!=i?void $.gritter.add({title:"密码与确认密码不相同",time:2e3,class_name:"gritter-error gritter-center"}):void $.ajax({type:"POST",dataType:"json",url:appName+"/role/register",data:{username:t,password:r},success:function(e){1==e.flag?($.gritter.add({title:"恭喜您，注册成功！",text:'<h4><b class="green">3秒后主动登陆到主页，如果没有跳转，请点击此<a href="#" class="blue">链接</a></b></h4>',time:2e3,class_name:"gritter-success gritter-center gritter-light"}),$("#username").val(t),$("#password").val(r),localStorage.setItem("userName",null),localStorage.setItem("userPassword",null),localStorage.setItem("login_time",null),setTimeout(function(){document.loginForm.submit()},3e3)):""!=e.msg?$.gritter.add({title:e.msg,time:2e3,class_name:"gritter-error gritter-center"}):$.gritter.add({title:"注册失败，请联系管理员！",time:2e3,class_name:"gritter-error gritter-center"})},error:function(e){$.gritter.add({title:e.status,text:e.statusText,time:2e3,class_name:"gritter-error gritter-center"})}})})});