/**
 * Created by lhx on 2016/7/14.
 */
define(function (require) {
    require("../common/common");
    require("../../modules/plugin/jquery.bootstrap-growl.min");

    var ip = 0 ;
    $("#memcache_machine input[value=0]").get(0).checked = true;
    $("#memcache_machine input").on("click", function (e) {
        ip = $(this).val();
    });

    $("#key_name").on("click",function () {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/memcache/get/1",
            success: function (data) {
                if (data.code == 200) {
                    var list = data.list ;
                    if (list.length > 0){
                        var html = "";
                        $.each(list, function (index, value) {
                            html += '<option value="'+value+'">';
                        });
                        $("#name_list *").remove();
                        $("#name_list").append(html);
                    }
                }
            }
        });
    });


    $("#key_rang").on("click",function () {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/memcache/get/2",
            success: function (data) {
                if (data.code == 200) {
                    var list = data.list ;
                    if (list.length > 0){
                        var html = "";
                        $.each(list, function (index, value) {
                            html += '<option value="'+value+'">';
                        });
                        $("#rang_list *").remove();
                        $("#rang_list").append(html);
                    }
                }
            }
        });
    });

    $("#key_full_name").on("click",function () {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/memcache/get/3",
            success: function (data) {
                if (data.code == 200) {
                    var list = data.list ;
                    if (list.length > 0){
                        var html = "";
                        $.each(list, function (index, value) {
                            html += '<option value="'+value+'">';
                        });
                        $("#full_name_list *").remove();
                        $("#full_name_list").append(html);
                    }
                }
            }
        });
    });

    $("#delete").on("click", function () {
        var name = $("#key_name").val();
        var ids = $("#ids").val();
        if (!name || !ids) {
            $.bootstrapGrowl("类路径和id不能缺少！");
            return;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/memcache/delete/local/1",
            data: {
                name: name,
                ids: ids,
                ip:ip
            },
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl(data.msg, {
                        align: 'right', // ('left', 'right', or 'center')
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
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


    $("#delete_rang").on("click", function () {
        var name = $("#key_rang").val();
        var id_start = $("#id_start").val();
        var id_end = $("#id_end").val();
        if (!name || !id_start || !id_end) {
            $.bootstrapGrowl("填入的信息不完整！");
            return;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/memcache/delete/local/2",
            data: {
                name: name,
                idStart: id_start,
                idEnd: id_end,
                ip:ip
            },
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl(data.msg, {
                        align: 'right', // ('left', 'right', or 'center')
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
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


    $("#delete_key").on("click", function () {
        var name = $("#key_full_name").val();
        if (!name) {
            $.bootstrapGrowl("填入的信息不完整！");
            return;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/memcache/delete/local/3",
            data: {
                name: name,
                ip:ip
            },
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl(data.msg, {
                        align: 'right', // ('left', 'right', or 'center')
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
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



});