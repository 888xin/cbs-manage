/**
 * Created by lhx on 2016/8/1.
 */
define(function (require, exports, module) {
    require("../common/common");

//    var html = '<li class="purple">\
//    <a data-toggle="dropdown" class="dropdown-toggle" href="#">\
//        <i class="icon-bell-alt icon-animated-bell"></i>\
//        <span class="badge badge-important" id="header_num">0</span>\
//    </a>\
//        <ul class="pull-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-close">\
//            <li class="dropdown-header" id="header_name">\
//                <i class="icon-warning-sign"></i>\
//            </li>\
//            <li>\
//                <a href='+appName+'"/event/yy/show">\
//                    <div class="clearfix">\
//                        <span class="pull-left">\
//                            <i class="btn btn-xs no-hover btn-pink icon-pinterest"></i>\
//                        应结算押押\
//                        </span>\
//                        <span class="pull-right badge badge-info" id="yy_num">+0</span>\
//                    </div>\
//                </a>\
//            </li>\
//            <li>\
//                <a href='+appName+'"/event/yy/show">\
//                去结算押押\
//                    <i class="icon-arrow-right"></i>\
//                </a>\
//            </li>\
//        </ul>\
//    </li>';


//    if (yy_operate != undefined && yy_operate == 1){
//        $.ajax({
//            type: 'POST',
//            dataType: 'json',
//            url: appName + "/event/yy/get/settle/num",
//            success: function (data) {
//                if (data.code == 200) {
//
//                    var num = data.number ;
//
//                    $("#ace_nav_ul").prepend(html);
//                    $("#header_name").text(num + "条通知");
//                    $("#header_num").html(num);
//                    $("#yy_num").html("+"+num);
//
//                } else {
//                    if (data.msg != "") {
//
//                    }
//                }
//            },
//            error: function (XMLHttpRequest) {
//                $.gritter.add({
//                    title: XMLHttpRequest.status,
//                    text: XMLHttpRequest.statusText,
//                    time: 2000,
//                    class_name: 'gritter-error gritter-center'
//                });
//            }
//        });
//    }

    $("#validate_bt").on("click",function(){
        var code = $("#validate_code").val();
        if (!code){
            $.bootstrapGrowl("请输入手机号");
            return ;
        } else {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/role/phone",
                data: {
                    code: code
                },

                success: function (data) {
                    if (data.flag) {
                        $.bootstrapGrowl('验证成功', {
                            type: 'success' // (null, 'info', 'error', 'success')
                        });

                        $("#validate_box").remove();

                    } else {
                        if (data.msg != "") {
                            $.bootstrapGrowl(data.msg);
                        }
                    }
                },
                error: function (XMLHttpRequest) {
                    $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
                }
            });
        }
    });


    $("#fb_same_bt").on("click",function(){
        var number = $("#fb_same_num").text();
        if (number > 0){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/statistic/same/view/0",
                success: function (data) {
                    if (data.code == 200) {
                        if (data.info.length > 0){
                            var html = '<div class="space-6"></div>\
                            <div class="alert alert-danger">\
                            <button class="close" data-dismiss="alert">\
                            <i class="icon-remove"></i></button>\
                            <h3>足球</h3>';
                            var tmp = '';
                            $.each(data.info, function (index, value) {
                                tmp += '<h4>'+value+'</h4>';
                            });
                            html += tmp ;
                            html += '</div>';
                            $("#append_info").append(html);
                        } else {
                            $.bootstrapGrowl("无信息！");
                        }
                    } else {
                        if (data.msg != "") {
                            $.bootstrapGrowl(data.msg);
                        }
                    }
                },
                error: function (XMLHttpRequest) {
                    $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
                }
            });
        }
    });


    $("#bb_same_bt").on("click",function(){
        var number = $("#bb_same_num").text();
        if (number > 0){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/statistic/same/view/1",
                success: function (data) {
                    if (data.code == 200) {
                        if (data.info.length > 0){
                            var html = '<div class="space-6"></div>\
                            <div class="alert alert-info">\
                            <button class="close" data-dismiss="alert">\
                            <i class="icon-remove"></i></button>\
                            <h3>篮球</h3>';
                            var tmp = '';
                            $.each(data.info, function (index, value) {
                                tmp += '<h4>'+value+'</h4>';
                            });
                            html += tmp ;
                            html += '</div>';
                            $("#append_info").append(html);
                        } else {
                            $.bootstrapGrowl("无信息！");
                        }
                    } else {
                        if (data.msg != "") {
                            $.bootstrapGrowl(data.msg);
                        }
                    }
                },
                error: function (XMLHttpRequest) {
                    $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
                }
            });
        }
    });


    $("#much_money_bt").on("click",function(){
        var number = $("#much_money_num").text();
        if (number > 0){
            var html = '<div class="space-6"></div>\
                            <div class="alert alert-warning">\
                            <button class="close" data-dismiss="alert">\
                            <i class="icon-remove"></i></button>\
                            <h3>超额下注</h3>';
            var tmp = '';
            $.each(bet_much, function (index, value) {
                var values = value.split("-");
                var pre_html = "";
                var play_type = Number(values[1]);
                var support = Number(values[2]);
                switch (play_type){
                    case 1:
                        pre_html = "足球胜平负";
                        break;
                    case 2:
                        pre_html = "足球让球胜平负";
                        break;
                    case 4:
                        pre_html = "足球大小球";
                        break;
                    case 6:
                        pre_html = "篮球胜平负";
                        break;
                    case 7:
                        pre_html = "篮球让球胜平负";
                        break;
                    case 9:
                        pre_html = "篮球大小球";
                        break;
                    default:
                        pre_html = "出错";
                        break;
                }
                var suff_html = "";
                switch (support){
                    case 0:
                        suff_html = "主胜";
                        break;
                    case 1:
                        suff_html = "客胜";
                        break;
                    case 2:
                        suff_html = "平局";
                        break;
                    default:
                        suff_html = "出错";
                        break;
                }
                tmp += '<h4>赛事:'+values[4]+'VS'+values[5]+'&nbsp;&nbsp;&nbsp;&nbsp;赛事ID:'+values[0]+'&nbsp;&nbsp;&nbsp;&nbsp;玩法:'+pre_html+
                    '&nbsp;&nbsp;&nbsp;&nbsp;下注方:'+suff_html+'&nbsp;&nbsp;&nbsp;&nbsp;开赛时间:'+new Date(values[3]).pattern("yyyy-MM-dd")+'</h4>';

            });


            html += tmp ;
            html += '</div>';

            $("#append_info").append(html);
        }
    });



    $("#fb_same_refresh").on("click",function(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/statistic/same/refresh/0",
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl("刷新成功！");
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl(data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }
        });
    });

    $("#bb_same_refresh").on("click",function(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/statistic/same/refresh/1",
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl("刷新成功！");
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl(data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }
        });
    });
    
    $("#much_money_refresh").on("click",function(){
        $.bootstrapGrowl("刷新时间可能会比较漫长，请等待……");
        $.ajax({
            type: 'POST',
            dataType: 'json',
            timeout : 10000, //超时时间设置，单位毫秒
            url: appName + "/statistic/much/money/refresh",
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl("刷新成功！");
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl(data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                //$.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }
        });
    });



    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/statistic/same/view/num",
        success: function (data) {
            if (data.code == 200) {

                $("#fb_same_num").text(data.nums[0]);
                $("#bb_same_num").text(data.nums[1]);

            } else {
                if (data.msg != "") {
                    $.bootstrapGrowl(data.msg);
                }
            }
        },
        error: function (XMLHttpRequest) {
            $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
        }
    });

    var bet_much ;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/statistic/much/money",
        success: function (data) {
            if (data.code == 200) {

                bet_much = data.bets ;
                $("#much_money_num").text(bet_much.length);

            } else {
                if (data.msg != "") {
                    $.bootstrapGrowl(data.msg);
                }
            }
        },
        error: function (XMLHttpRequest) {
            $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
        }
    });
    
    
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/statistic/bet/un/num",
        success: function (data) {
            if (data.code == 200) {

                $("#contest_un_settle_num").text(data.num);

            } else {
                if (data.msg != "") {
                    $.bootstrapGrowl(data.msg);
                }
            }
        },
        error: function (XMLHttpRequest) {
            $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
        }
    });


});
