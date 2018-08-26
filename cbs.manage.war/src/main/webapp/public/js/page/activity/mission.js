/**
 * Created by lhx on 16-4-20.
 */
define(function (require) {
    require("../common/common");
    require("../../modules/plugin/jquery.bootstrap-growl.min");
    require("../../modules/plugin/datepicker.zh-CN.js");
    require("../../modules/plugin/jquery.validate.min.js");
    require("../../modules/plugin/bootbox.min");

    //变量
    var page ;
    var day_user_id ;
    var search_focus = false ;
    var head_url = "http://proxy.dev.xy.l99.com/image.php?type=avatar90&ifile=";


    var day = new Date().pattern("yyyy-MM-dd");

    $('#date_picker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        dateFormat: "yy-mm-dd",       // 日期格式
        onSelect: function (dateText) {
            $("#day_table tbody *").remove();
            getUserDayData(dateText);
        }
    });


    //向下加载更多
    $("#data_more").on("click", function (e) {
        e.preventDefault();
        getData();
    });

    getData();


    function getData() {

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/mission/list",
            data: {page: page},
            success: function (data) {
                if (data.code == 200) {
                    if (data.missions.length > 0) {
                        //加载数据
                        $.each(data.missions, function (index, mission) {
                            var htmlStr = showData(mission.user.user_id,mission.user.long_no,mission.user.name,mission.value,mission.amount);
                            $("#table tbody").append(htmlStr);
                        });
                        page = data.page;
                    } else {
                        $.bootstrapGrowl('服务器无数据返回！',{
                            type: 'success' // (null, 'info', 'error', 'success')
                        });
                    }
                } else {
                    if (data.msg) {
                        $.bootstrapGrowl(data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错："+XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }

        });
    }

    function getUserData(no) {

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/mission/user",
            data: {userLongno: no},
            success: function (data) {
                if (data.code == 200) {
                    var mission = data.mission ;
                    if (data.mission) {
                        //加载数据
                        var htmlStr = showData(mission.user.user_id,mission.user.long_no,mission.user.name,mission.value,mission.amount);
                        $("#table tbody").append(htmlStr);
                        page = 0;
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



    function showData(user_id,long_no,name,value,amount){
        var btn_html = '<button class="btn btn-minier btn-info">查看每日任务</button>';
        var mission1 = '<i class="icon-remove-sign bigger-120 grey"></i>';
        var mission2 = '<i class="icon-remove-sign bigger-120 grey"></i>';
        var mission4 = '<i class="icon-remove-sign bigger-120 grey"></i>';
        var mission8 = '<i class="icon-remove-sign bigger-120 grey"></i>';
        if (1 & value){
            mission1 = '<i class="icon-ok-sign bigger-120 green"></i>';
        }
        if (2 & value){
            mission2 = '<i class="icon-ok-sign bigger-120 green"></i>';
        }
        if (4 & value){
            mission4 = '<i class="icon-ok-sign bigger-120 green"></i>';
        }
        if (8 & value){
            mission8 = '<i class="icon-ok-sign bigger-120 green"></i>';
        }
        html = '<tr>\
            <td class="center">'+user_id+'</td>\
            <td class="center">'+long_no+'</td>\
            <td class="center">'+name+'</td>\
            <td class="center">'+amount+'</td>\
            <td class="center">'+mission1+'</td>\
            <td class="center">'+mission2+'</td>\
            <td class="center">'+mission4+'</td>\
            <td class="center">'+mission8+'</td>\
            <td class="center">'+btn_html+'</td>\
            </tr>';
        return html;
    }

    function showDayData(value){
        var mission1 = '<i class="icon-remove-sign bigger-120 grey"></i>';
        var mission2 = '<i class="icon-remove-sign bigger-120 grey"></i>';
        var mission4 = '<i class="icon-remove-sign bigger-120 grey"></i>';
        var mission8 = '<i class="icon-remove-sign bigger-120 grey"></i>';
        var mission16 = '<i class="icon-remove-sign bigger-120 grey"></i>';
        if (1 & value){
            mission1 = '<i class="icon-ok-sign bigger-120 green"></i>';
        }
        if (2 & value){
            mission2 = '<i class="icon-ok-sign bigger-120 green"></i>';
        }
        if (4 & value){
            mission4 = '<i class="icon-ok-sign bigger-120 green"></i>';
        }
        if (8 & value){
            mission8 = '<i class="icon-ok-sign bigger-120 green"></i>';
        }
        if (16 & value){
            mission16 = '<i class="icon-ok-sign bigger-120 green"></i>';
        }
        html = '<tr>\
            <td class="center">'+mission1+'</td>\
            <td class="center">'+mission2+'</td>\
            <td class="center">'+mission4+'</td>\
            <td class="center">'+mission8+'</td>\
            <td class="center">'+mission16+'</td>\
            </tr>';
        return html;
    }





    $('#table tbody').on('click', 'button.btn-info', function () {
        //修改

        var tmpTr = $(this).closest("tr");
        day_user_id = tmpTr.find("td:eq(0)").html();

        $("#day_table tbody *").remove();
        getUserDayData(day);


    });


    function getUserDayData(day_time) {

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/mission/day/user",
            data: {day: day_time, userId:day_user_id},
            success: function (data) {
                if (data.code == 200) {
                    var mission = data.mission;
                    if(mission){


                        var htmlStr = showDayData(mission.value);
                        $("#day_table tbody").append(htmlStr);


                        $("#modal_day_user").modal({backdrop: 'static'});



                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl(XMLHttpRequest.status + ":" + XMLHttpRequest.statusText,{
                    align: 'right'
                });
            }
        });
    }



    $("#modal_day_user").on("shown.bs.modal", function () {
        $('#date_picker').val(day);
    });





    //搜索赛事
    $("#user_search").on("focus",function () {
        //获得焦点
        search_focus = true ;
    }).on("blur", function () {
        //失去焦点
        search_focus = false ;
    });

    //按回车键搜索
    $(document).keypress(function (e) {
        if (e.which == 13){
            if (search_focus){
                $("#table tbody *").remove();
                var search_key = $("#user_search").val();
                if (search_key){
                    getUserData(search_key);
                } else {
                    page = 0 ;
                    getData();
                }
            }
        }
    });




    function showCancelDayData(name, point, value, finish){
        var btn_html = '<button class="btn btn-minier btn-warning">撤销</button>';
        if (finish){
            btn_html = '<button class="btn btn-minier btn-success">恢复</button>';
        }
        html = '<tr>\
            <td class="hidden">'+value+'</td>\
            <td class="center">'+name+'</td>\
            <td class="center">'+point+'</td>\
            <td class="center">'+btn_html+'</td>\
            </tr>';
        return html;
    }



    $("#edit_day_mission").on("click", function(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/mission/day/cancel",
            success: function (data) {
                if (data.code == 200) {
                    var missions = data.cancel ;
                    if (missions) {
                        //加载数据
                        $.each(missions, function (index, mission) {
                            var htmlStr = showCancelDayData(mission.name, mission.point, mission.type, mission.finish);
                            $("#day_cancel_table tbody").append(htmlStr);
                        });
                    } else {
                        $.bootstrapGrowl('服务器无数据返回！',{
                            type: 'success' // (null, 'info', 'error', 'success')
                        });
                    }
                    $("#modal_edit_day").modal({backdrop: 'static'});
                }
            }
        });
    });


    $('#day_cancel_table tbody').on('click', 'button.btn-warning', function () {
        //撤销该每日任务

        var tmpTr = $(this).closest("tr");
        var value = tmpTr.find("td:eq(0)").html();
        tmpTr.find("td:eq(3)").html('<button class="btn btn-minier btn-success">恢复</button>');
        editDayMission(value);

    }).on('click', 'button.btn-success', function () {
        //恢复该每日任务

        var tmpTr = $(this).closest("tr");
        var value = tmpTr.find("td:eq(0)").html();
        tmpTr.find("td:eq(3)").html('<button class="btn btn-minier btn-warning">撤销</button>');
        editDayMission(-value);

    });


    function editDayMission(value) {

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/mission/day/edit",
            data: {value: value},
            success: function (data) {
                if (data.code == 200) {
                    if (value > 0){
                        $.bootstrapGrowl('撤销成功！',{
                            align: 'right',
                            type: 'success' // (null, 'info', 'error', 'success')
                        });
                    } else {
                        $.bootstrapGrowl('恢复成功！',{
                            align: 'right',
                            type: 'success' // (null, 'info', 'error', 'success')
                        });
                    }

                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl(XMLHttpRequest.status + ":" + XMLHttpRequest.statusText,{
                    align: 'right'
                });
            }
        });
    }





    $("#edit_point_to_gold").on("click", function(){


        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/mission/point/list",
            success: function (data) {
                if (data.code == 200) {
                    var points = data.points ;
                    if (points) {
                        //加载数据
                        $.each(points, function (index, point) {
                            var htmlStr = showPointListData(point.id, point.point, point.gold);
                            $("#point_table tbody").append(htmlStr);
                        });
                    } else {
                        $.bootstrapGrowl('服务器无数据返回！',{
                            type: 'success' // (null, 'info', 'error', 'success')
                        });
                    }

                    click_fn();

                    $("#modal_edit_point").modal({backdrop: 'static'});
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


    function showPointListData(id, point, gold){
        var btn_html = '<button class="btn btn-minier btn-danger">删除</button>';
        html = '<tr>\
            <td class="hidden">'+id+'</td>\
            <td class="center">'+point+'</td>\
            <td class="center">'+gold+'</td>\
            <td class="center">'+btn_html+'</td>\
            </tr>';
        return html;
    }


    $('#validation-form').validate({
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        rules: {
            modal_add_point_num: {
                required: true,
                positive_integer: true //验证是否为正整数
            },
            modal_add_gold_num: {
                required: true,
                positive_integer: true //验证是否为正整数
            }
        },

        messages: {
            modal_add_point_num: {
                required: "积分必须有值"
            },
            modal_add_gold_num: {
                required: "龙筹必须有值"
            }
        },

        invalidHandler: function (event, validator) { //display error alert on form submit
            $('.alert-danger', $('.login-form')).show();
        },

        highlight: function (e) {
            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
        },

        success: function (e) {
            $(e).closest('.form-group').removeClass('has-error').addClass('has-info');
            $(e).remove();
        },

        errorPlacement: function (error, element) {
            if (element.is(':checkbox') || element.is(':radio')) {
                var controls = element.closest('div[class*="col-"]');
                if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
                else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
            }
            else if (element.is('.select2')) {
                error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
            }
            else if (element.is('.chosen-select')) {
                error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
            }
            else error.insertAfter(element.parent());
        },

        submitHandler: function (form) {
        },
        invalidHandler: function (form) {
        }
    });

    jQuery.validator.addMethod("positive_integer", function (value, element) {
        return this.optional(element) || /^[0-9]{1,}$/.test(value);
    }, "请输入正整数");



    $("#add_submit_button").on("click", function () {

        if (!$('#validation-form').valid()) {
            return false;
        }

        var point = $("#modal_add_point_num").val();
        var gold = $("#modal_add_gold_num").val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/mission/edit/point/gold",
            data: {
                point: point,
                gold: gold
            },

            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl('添加成功！', {
                        align: 'right', // ('left', 'right', or 'center')
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                    //回显数据
                    var point = data.point ;
                    var htmlStr = showPointListData(point.id, point.point, point.gold);
                    $("#point_table tbody").append(htmlStr);

                    click_fn();

                    $("#modal_add_point").modal("hide");
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl("错误code：" + data.code + ",错误信息：" + data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }
        });
    });

    $('#point_table tbody').on('click', 'button.btn-danger', function () {
        //删除积分换龙筹该每日任务

        var tmpTr = $(this).closest("tr");
        var point_id = tmpTr.find("td:eq(0)").html();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/mission/delete/point/gold",
            data: {id: point_id},
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl('删除成功！', {
                        align: 'right', // ('left', 'right', or 'center')
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                    //回显数据
                    tmpTr.remove();
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl("错误code：" + data.code + ",错误信息：" + data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }
        });

    });


    function click_fn(){

        $('#point_table tbody tr').find('td:eq(1)').on('click', function () {
            var tmp = $(this);
            var point = $(this).html();
            var tmpTr = $(this).closest("tr");
            var point_id = tmpTr.find("td:eq(0)").html();

            var form = $("<span><label>修改积分量 &nbsp;</label></span>");
            form.append("<input id='point_update_input' class='middle' autocomplete=off type=text value='" + point + "' /> ");
            form.append("<button id='point_update_bt' class='btn btn-sm btn-success'><i class='icon-ok'></i> 修改</button>");

            bootbox.dialog({
                message: form,

                buttons: {
                    "close": {
                        "label": "<i class='icon-remove'></i> 关闭",
                        "className": "btn-sm"
                    }
                }

            });

            $("#point_update_bt").on("click", function () {
                var input_val = $("#point_update_input").val();
                if (point == input_val) {
                    return;
                } else {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/mission/edit/point/gold",
                        data: {
                            id: point_id,
                            point: input_val
                        },
                        success: function (data) {
                            tmp.html(input_val);
                            $.bootstrapGrowl("修改成功");
                            bootbox.hideAll();
                        }
                    });
                }
            })
        });

        $('#point_table tbody tr').find('td:eq(2)').on('click', function () {
            var tmp = $(this);
            var gold = $(this).html();
            var tmpTr = $(this).closest("tr");
            var point_id = tmpTr.find("td:eq(0)").html();

            var form = $("<span><label>修改龙筹面值 &nbsp;</label></span>");
            form.append("<input id='gold_update_input' class='middle' autocomplete=off type=text value='" + gold + "' /> ");
            form.append("<button id='gold_update_bt' class='btn btn-sm btn-success'><i class='icon-ok'></i> 修改</button>");

            bootbox.dialog({
                message: form,
                buttons: {
                    "close": {
                        "label": "<i class='icon-remove'></i> 关闭",
                        "className": "btn-sm"
                    }
                }

            });

            $("#gold_update_bt").on("click", function () {
                var input_val = $("#gold_update_input").val();
                if (gold == input_val) {
                    return;
                } else {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/mission/edit/point/gold",
                        data: {
                            id: point_id,
                            gold: input_val
                        },
                        success: function (data) {
                            tmp.html(input_val);
                            $.bootstrapGrowl("修改成功");
                            bootbox.hideAll();
                        }
                    });
                }
            })
        });
    }




});