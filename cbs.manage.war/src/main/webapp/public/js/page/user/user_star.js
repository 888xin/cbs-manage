/**
 * Created by lhx on 16-2-5.
 */
define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/jquery.bootstrap-growl.min");


    //变量

    var hide_flag = false ;
    var start_id ;
    var user_id ;



    $("#modal_user_star_bt").on("click",function(){
        var long_no = $("#modal_user_star_long_no").val().trim();
        var value = $("#modal_user_star_value").val().trim();

        if (long_no && value){

            if (isNaN(value)){
                $.bootstrapGrowl("请输入整数");
                return ;
            }
            if (isNaN(long_no)){
                $.bootstrapGrowl("请输入有效的龙号整数");
                return ;
            }
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/user/star/put",
                data: {longNO: long_no, factor: value},
                success: function (data) {
                    if (data.code == 200) {
                        $.bootstrapGrowl('添加成功！',{
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

        } else {
            $.bootstrapGrowl("龙号或者数值不能为空");
        }
    });



    getData();


    function getData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/user/star/data",
            data: {hideFlag: hide_flag, startId: start_id},
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.stars, function (index, star) {
                            var htmlStr = showData(star.id,star.user.name,star.user.long_no,star.rank,star.winning,star.show_num,star.hit_num,star.factor,star.hide_flag,star.create_time,star.user_id);
                            $("#star_table tbody").append(htmlStr);
                            start_id = star.id ;
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

    function showData(id,name,long_no,rank,winning,show_num,hit_num,factor,hide_flag,create_time,user_id){
        if (hide_flag){
            hide_flag = '<button class="btn btn-xs btn-success">显示</button>';
        } else {
            hide_flag = '<button class="btn btn-xs btn-danger">隐藏</button>';
        }
        if (create_time){
            create_time = new Date(create_time).pattern("yyyy-MM-dd HH:mm:ss");
        } else {
            create_time = "无";
        }
        winning = winning*100 + "%";
        var html = '<tr>\
            <td class="center">' + id + '</td>\
            <td class="center">' + name + '</td>\
            <td class="center">' + long_no + '</td>\
            <td class="center">' + rank + '</td>\
            <td class="center">' + winning + '</td>\
            <td class="center">' + show_num + '</td>\
            <td class="center">' + hit_num + '</td>\
            <td class="center">' + factor + '</td>\
            <td class="center">' + create_time + '</td>\
            <td class="center" id="' + user_id + '"><div>\
                    ' + hide_flag + '</div>\
            </td></tr>';
        return html;
    }

    $("#togger_user_bt").on("click",function(){

        if (hide_flag){
            //上一次是隐藏用户
            $(this).html("用户隐藏列表");
            $(this).removeClass("btn-info").addClass("btn-warning");
            hide_flag = false ;
            start_id = null ;
            $("#star_table tbody tr").remove();
            getData();
        } else {
            //上一次是显示用户
            $(this).html("用户显示列表");
            $(this).removeClass("btn-warning").addClass("btn-info");
            hide_flag = true ;
            start_id = null ;
            $("#star_table tbody tr").remove();
            getData();
        }
    });

    //加载更多
    $("#star_data_more").on("click",function(){
        getData();
    });



    $('#star_table tbody').on('click', 'button.btn-danger',function () {
        var td = $(this).closest("td");
        var tr_tmp = $(this).closest("tr");
        user_id = td.attr("id");

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/user/star/onoff",
            data: {userId: user_id, hideFlag: true},
            success: function (data) {
                if (data.code == 200) {
                    tr_tmp.remove();
                    $.bootstrapGrowl('添加成功！',{
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
    }).on('click', 'button.btn-success',function () {
        var td = $(this).closest("td");
        var tr_tmp = $(this).closest("tr");
        user_id = td.attr("id");

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/user/star/onoff",
            data: {userId: user_id, hideFlag: false},
            success: function (data) {
                if (data.code == 200) {
                    tr_tmp.remove();
                    $.bootstrapGrowl('添加成功！',{
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
    });

});