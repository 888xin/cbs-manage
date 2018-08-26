/**
 * Created by lhx on 16-4-20.
 */
define(function (require) {
    require("../common/common");
    require("../../modules/plugin/bootstrap-select.min");
    require("../../modules/plugin/datepicker.zh-CN.js");
    require("../../modules/plugin/bootbox.min");

    //变量
    var date ;
    var head_url = "http://proxy.dev.xy.l99.com/image.php?type=avatar90&ifile=";


    $('#date_search').datepicker({
        changeYear: true,          // 年下拉菜单
            changeMonth: true,             // 月下拉菜单
            showButtonPanel: true,         // 显示按钮面板
            showMonthAfterYear: true,  // 月份显示在年后面
            currentText: "本月",         // 当前日期按钮提示文字
            closeText: "确认",           // 关闭按钮提示文字
            dateFormat: "yy-mm",       // 日期格式
            onClose: function(dateText, inst) {// 关闭事件
                var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).datepicker('setDate', new Date(year, month, 1));
                date = year.substring(2,4) + (Number(month) + 1) ;
                getData();
            }

    });

    $("#path_key").selectpicker({
        style: 'btn-success'
    });

    $("#path_value").selectpicker({
        style: 'btn-success'
    });


    getData();


    function getData() {
        if(!date){
            var myDate = new Date();
            var year = myDate.getFullYear() + "";
            var month = myDate.getMonth()+1;
            date = year.substring(2,4) + month ;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/statistic/user/login/get",
            data: {date: date},
            success: function (data) {
                if (data.code == 200) {
                    $("#user_login_statistic_table tbody tr").remove();
                    if (data.user_login.length > 0) {
                        //加载数据
                        $.each(data.user_login, function (index, login) {
                            var htmlStr = showData(login.user.user_id,login.user.long_no,login.user.name,login.user.head,login.day);
                            $("#user_login_statistic_table tbody").append(htmlStr);
                        });
                    } else {
                        $.bootstrapGrowl('服务器无数据返回！',{
                            type: 'success' // (null, 'info', 'error', 'success')
                        });
                    }
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl("错误code：" + data.code + ",错误信息：" + data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错："+XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }

        });
    }

    function showData(user_id,long_no,name,head,day){
        head = '<img width="40" height="40" class="nav-user-photo" src="' + head_url + head + '" />' ;
        var html = '<tr>\
            <td class="center">' + user_id + '</td>\
            <td class="center">' + long_no + '</td>\
            <td class="center">' + name + '</td>\
            <td class="center">' + head + '</td>\
            <td class="center">' + day + '</td></tr>';
        return html;
    }


    $("#edit_path_bt").on("click", function(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/statistic/user/login/path",
            data: {date: date},
            success: function (data) {
                if (data.code == 200) {
                    if (data.path){
                        $("#old_path_key").html(data.path.gold_days);
                        $("#old_path_value").html(data.path.amounts);
                    }
                }
            }
        });
    });

    $("#edit_submit_button").on("click", function(){

        var path_key = $("#path_key").val();
        var path_value = $("#path_value").val();
        if (path_key.length != path_value.length){
            $.bootstrapGrowl("设置的天数必需有对应的筹码！",{
                align: 'right'
            });
            return ;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/statistic/user/login/set/path",
            data: {key: path_key+"",value:path_value+""},
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl('更新成功！',{
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                    $("#modal_edit_path").modal("hide");
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl("错误code：" + data.code + ",错误信息：" + data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错："+XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }

        });
    });


    $("#edit_user_submit_button").on("click", function(){

        var user_longno = $("#user_longno").val();
        var user_day = $("#user_day").val();
        if (!user_day || isNaN(user_day)){
            $.bootstrapGrowl("设置的天数必须为整数！",{
                align: 'right'
            });
            return ;
        } else {
            var myDate = new Date();
            var today = myDate.getDate();        //获取当前日(1-31)
            if (user_day >= today){
                $.bootstrapGrowl("设置的天数必须小于今天的号数！",{
                    align: 'right'
                });
                return ;
            }
            if (user_day < 0){
                $.bootstrapGrowl("设置的天数不能小于0！",{
                    align: 'right'
                });
                return ;
            }
        }
        if (!user_longno){
            $.bootstrapGrowl("必须输入用户的龙号！",{
                align: 'right'
            });
            return ;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/statistic/user/login/set/day",
            data: {longNo: user_longno,day:user_day},
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl('更新成功！',{
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                    $("#modal_edit_user").modal("hide");
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl("错误code：" + data.code + ",错误信息：" + data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错："+XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }

        });
    });


    $("#edit_user_expire_bt").on("click",function(){
        bootbox.confirm("<b class='red bigger-180'>该功能是为了防止昨天的用户登录记录无法在凌晨自动删除导致用户今天领不到登陆奖励所设定。如不了解该功能，请不要随意点击确认按钮！</b>",
            function (result) {
                if (result) {

                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/statistic/user/login/expire",
                        success: function (data) {
                            if (data.code == 200) {
                                $.bootstrapGrowl('删除成功！',{
                                    type: 'success' // (null, 'info', 'error', 'success')
                                });
                            } else {
                                if (data.msg != "") {
                                    $.bootstrapGrowl("错误code：" + data.code + ",错误信息：" + data.msg);
                                }
                            }
                        },
                        error: function (XMLHttpRequest) {
                            $.bootstrapGrowl("服务器出错："+XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
                        }

                    });

                }
            });
    });

});