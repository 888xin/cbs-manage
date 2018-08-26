define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/datepicker.zh-CN.js");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/jquery.hotkeys.min");
    require("../../modules/plugin/bootstrap-wysiwyg.min");


    //常量
    var start_id ;

    //basic initializations
    $('#placard_table tr input[type=checkbox]').removeAttr('checked');
    $('#placard_table').on('click', 'tr input[type=checkbox]', function () {
//        var checkbox_tmp = $(this).find('input[type=checkbox]');
//        console.log(!checkbox_tmp.checked);
//        if(!checkbox_tmp.checked) {
//            checkbox_tmp.attr("checked","checked");
//        } else {
//
//            checkbox_tmp.removeAttr('checked');
//        }

        if (this.checked) {
            tablebox.display_bar(1);
            $(this).closest('tr').addClass('selected1');
        } else {
            tablebox.display_bar($('#placard_table tr input[type=checkbox]:checked').length);
            $(this).closest('tr').removeClass('selected1');
        }
    });


    //select all
    $('#select_item_all').on('click', function (e) {
        e.preventDefault();
        tablebox.select_all();
    });

    //select none
    $('#select_item_none').on('click', function (e) {
        e.preventDefault();
        tablebox.select_none();
    });

    //select newest createtime tr
    $("#select_item_new_createtime").on("click", function (e) {
        e.preventDefault();
        tablebox.select_newest();
    });

    //select latest endtime tr
    $("#select_item_latest_endime").on("click", function (e) {
        e.preventDefault();
        tablebox.select_latest();
    });

    /////////


    //check/uncheck all tr
    $('#toggle_all').removeAttr('checked').on('click', function () {
        if (this.checked) {
            tablebox.select_all();
        } else tablebox.select_none();
    });

    var tablebox = {
        //displays a toolbar according to the number of selected messages
        display_bar: function (count) {
            if (count == 0) {
                $('#toggle_all').removeAttr('checked');
                $('#table_toolbar').addClass('hide');
                $('#table_infobar').removeClass('hide');
            }
            else {
                $('#table_infobar').addClass('hide');
                $('#table_toolbar').removeClass('hide');
            }
        },
        select_all: function () {
            var count = 0;
            $('tr input[type=checkbox]').each(function () {
                this.checked = true;
                $(this).closest('tr').addClass('selected1');
                count++;
            });

            $('#toggle_all').get(0).checked = true;

            tablebox.display_bar(count);
        },
        select_none: function () {
            $('tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
            $('#toggle_all').get(0).checked = false;

            tablebox.display_bar(0);
        },
        select_newest: function () {
            $('tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');

            var count = 0;
            $("#placard_table tbody").find('tr').each(function () {
                var starttime = $(this).find("td:eq(4)").html();
                if (starttime == new_createtime) {
                    $(this).addClass('selected1');
                    $(this).find("td:eq(1) input[type=checkbox]").prop('checked', true);
                    count++;
                }
            });
            tablebox.display_bar(count);
        },
        select_latest: function () {
            $('tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');

            var count = 0;
            $("#placard_table tbody").find('tr').each(function () {
                var endtime = $(this).find("td:eq(5)").html();
                if (endtime == latest_endime) {
                    $(this).addClass('selected1');
                    $(this).find("td:eq(1) input[type=checkbox]").prop('checked', true);
                    count++;
                }
            });
            tablebox.display_bar(count);
        }

    }


    //公告过滤
    $("#search_input").keyup(function () {
        $("#placard_table tbody tr").hide().filter(":contains('" + ( $(this).val() ) + "')").show();
    }).keyup();


    //继续加载数据
    $('#placard_data_more').on(ace.click_event, function (e) {
//        $.gritter.add({
//            title: '该功能尚未开发，快告诉程序员大哥来完成吧！',
//            time: 2000,
//            class_name: 'gritter-success gritter-light'
//        });
//        return false;
        e.preventDefault();
        getData();
    });


    //一键删除
    $('#one_delete_select').on('click', function () {
        bootbox.confirm("确定一键删除所选公告？", function (result) {
            if (result) {
                $.gritter.add({
                    title: '该功能尚未开发，快告诉程序员大哥来完成吧！',
                    time: 2000,
                    class_name: 'gritter-success gritter-light'
                });
            }
        });
    });

    /**
     * ===================
     * 打开页面异步加载数据 Start
     * */
    //最新创建
    var new_createtime = "2014-01-01";
    //最迟截止时间
    var latest_endime = "2014-01-02";

    getData();

    function getData(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/placard/getAsyData",
            data: {startId: start_id},
            success: function (data) {
                if (data.code == 200) {
                    //清空原有的数据
                    //$("#placard_table tbody tr").remove();
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.placards, function (index, placard) {
                            start_id = placard.templet_id;
                            var htmlStr = showPlacardData(placard.content, placard.templet_id, placard.title, placard.create_time, placard.end_time, placard.link_type, placard.link_data, placard.placard_count, placard.disable_flag);
                            $("#placard_table tbody").append(htmlStr);
                            $("#toolbar_placard_num").html(data.number);
                            if (placard.create_time > new_createtime) {
                                new_createtime = placard.create_time
                            }
                            if (placard.end_time > latest_endime) {
                                latest_endime = placard.end_time
                            }
                        });
                    } else {
                        $.gritter.add({
                            title: '服务器无数据返回！',
                            time: 2000,
                            class_name: 'gritter-info gritter-light'
                        });
                    }
                } else {
                    $.gritter.add({
                        title: "出现" + data.code + "异常",
                        time: 2000,
                        class_name: 'gritter-error gritter-light'
                    });
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    } else {
                        $.gritter.add({
                            title: "出现未知异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.gritter.add({
                    title: XMLHttpRequest.status,
                    text: XMLHttpRequest.statusText,
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
            }

        });
    }

    //动态加载公告数据
    function showPlacardData(placard_content, placard_id, placard_title, placard_createtime, placard_endtime, placard_link_type, placard_link_content, placard_count, placard_disable) {

        placard_createtime = new Date(placard_createtime).toLocaleString();
        placard_endtime = new Date(placard_endtime).pattern("yyyy-MM-dd");
        var link_type;
        if (placard_link_type == 1) {
            link_type = "网页"
        } else if (placard_link_type == 2) {
            link_type = "内容"
        } else if (placard_link_type == 3) {
            link_type = "足球赛事"
        } else if (placard_link_type == 4) {
            link_type = "篮球赛事"
        } else if (placard_link_type == 5) {
            link_type = "锦标赛"
        } else if (placard_link_type == 6) {
            link_type = "送龙筹券"
        } else {
            link_type = "其他"
        }
        var disable;
        if (placard_disable) {
            disable = "<i class=\"icon-ok green bigger-150\"></i>";
        } else {
            disable = "<i class=\"icon-remove red bigger-150\"></i>";
        }
        var bt;
        if (new Date() > new Date(placard_endtime)) {
            bt = " <button class='btn btn-xs btn-yellow disabled'><i class='icon-bullhorn bigger-150'></i>通知</button>";
        } else {
            bt = " <button class='btn btn-xs btn-yellow'><i class='icon-bullhorn bigger-150'></i>通知</button>";
        }
        var htmlStr = "<tr id='table_placard_" + placard_id + "'><td hidden=\"true\">" + placard_content + "</td>" +
            "                                    <td>" +
            "                                        <label class=\"inline\">" +
            "                                            <input type=\"checkbox\" class=\"ace\"/>" +
            "                                            <span class=\"lbl\"></span>" +
            "                                        </label>" +
            "                                    </td>" +
            "                                    <td class=\"center\">" + placard_id + "</td>" +
            "                                    <td class=\"center\">" +
            placard_title +
            "</td>" +
            "                                    <td class=\"center\">" + placard_createtime + "</td>" +
            "                                    <td class=\"center\">" + placard_endtime + "</td>" +
            "                                    <td class=\"center\">" + link_type + "</td>" +
            "                                    <td class=\"center\">" +
            placard_link_content +
            "</td>" +
            "                                    <td class=\"center\">" + placard_count + "</td>" +
            "                                    <td class=\"center\">" +
            disable +
            "</td>" +
            "                                    <td class=\"center\">" +
            "                                        <div>" +
            "                                            <button class=\"btn btn-xs btn-info\">" +
            "                                                <i class=\"icon-edit bigger-150\"></i>" +
            "                                                编辑" +
            "                                            </button>" +
            bt +
            "                                            <button class=\"btn btn-xs btn-purple\">" +
            "                                                <i class=\"icon-eye-open bigger-150\"></i>" +
            "                                                预览" +
            "                                            </button>" +
            "                                        </div>" +
            "                                    </td>" +
            "                                </tr>";
        return htmlStr;
    }

    /**
     * 打开页面异步加载数据 end
     * ===================
     * */


    /**
     * 公告编辑 start
     * =============================
     **/
    //变量放到外面，提交编辑成功好更新该行数据
    var placard_starttime;
    var placard_count
    //打开modal窗口
    $('#placard_table tbody').on('click', 'button.btn-info', function () {
        var tmpTr = $(this).closest("tr");
        var placard_content = tmpTr.find("td:eq(0)").html();
        var placard_id = tmpTr.find("td:eq(2)").html();
        var placard_title = tmpTr.find("td:eq(3)").html();
        placard_starttime = tmpTr.find("td:eq(4)").html();
        var placard_endtime = tmpTr.find("td:eq(5)").html();
        var placard_type = tmpTr.find("td:eq(6)").html();
        var placard_link_data = tmpTr.find("td:eq(7)").html();
        placard_count = tmpTr.find("td:eq(8)").html();
        var placard_disable = tmpTr.find("td:eq(9)").html();
        //附加数据到modal中
        $("#modal_placard_title").val(placard_title);
        $("#modal_spacard_editor").html(placard_content);
        $("#modal_placard_endtime").val(placard_endtime);
        var type = 2;
        if (placard_type == "网页") {
            type = 1;
        } else if (placard_type == "足球赛事") {
            type = 3;
        } else if (placard_type == "篮球赛事") {
            type = 4;
        } else if (placard_type == "锦标赛") {
            type = 5;
        } else if (placard_type == "送龙筹券") {
            type = 6;
        }
        $('#modal_placard_type').find("option[value=" + type + "]").prop("selected", true);
        $("#modal_placard_link_data").val(placard_link_data);
        if (placard_disable == "<i class=\"icon-ok green bigger-150\"></i>") {
            $("#modal_placard_disable").prop('checked', true);
        } else {
            $("#modal_placard_disable").prop('checked', false);
        }
        $("#modal_placard_id").html(placard_id);
        $("#modal_placard_count").html(placard_count);
        if (placard_id == -1) {
            $.gritter.add({
                title: '新添加的数据没有指定ID值，需刷新页面后才能修改数据！',
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
        } else {
            //弹出modal窗口
            $("#modal_placard_edit").modal({backdrop: 'static'});
        }

    }).on('click', 'button.btn-purple', function () {

        var tmpTr = $(this).closest("tr");
        var placard_content = tmpTr.find("td:eq(0)").html();
        var placard_title = tmpTr.find("td:eq(3)").html();
        var palcard_time=tmpTr.find("td:eq(4)").html();
        var placard_type = tmpTr.find("td:eq(6)").html();
        var placard_link_data = tmpTr.find("td:eq(7)").html();
        $(".con_title").html(placard_title);
        $(".con_main").html(placard_content);
        $(".con_time").html(palcard_time);
        var type = 2;
        if (placard_type == "网页") {
            type = 1;
        } else if (placard_type == "足球赛事") {
            type = 3;
             $(".con_btn").removeClass("none").text("参与竞猜");
        } else if (placard_type == "篮球赛事") {
            type = 4;
             $(".con_btn").removeClass("none").text("参与竞猜");
        } else if (placard_type == "锦标赛") {
            type = 5;
             $(".con_btn").removeClass("none").text("参与竞猜");
        } else if (placard_type == "送龙筹券") {
            type = 6;
            $(".con_btn").removeClass("none").text("领取龙筹");
        }
        //弹出modal窗口
        $("#modal_placard_view").modal({backdrop: 'static'});

    });


    //公告编辑提交
    $("#modal_placard_edit_button").on("click", function () {
        var placard_content = $("#modal_spacard_editor").html();
        var placard_title = $("#modal_placard_title").val();
        var placard_endtime = $("#modal_placard_endtime").val();
        var placard_type = $("#modal_placard_type").val();
        var placard_link_data = $("#modal_placard_link_data").val();
        var placard_disable = $("#modal_placard_disable").prop('checked');
        var placard_id = $("#modal_placard_id").html();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/placard/edit",
            data: {templet_id: placard_id, title: placard_title, content: placard_content, end_time: placard_endtime, link_type: placard_type, link_data: placard_link_data, disable_flag: placard_disable},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '修改成功！',
                        time: 2000,
                        class_name: 'gritter-info gritter-light'
                    });
                    //修改成功后，在表格里面移除该行记录，再添加新的
                    $("#table_placard_" + placard_id).remove();
                    var htmlStr = showPlacardData(placard_content, placard_id, placard_title, placard_starttime, placard_endtime, placard_type, placard_link_data, placard_count, placard_disable);
                    $("#placard_table tbody").prepend(htmlStr);
                } else {
                    $.gritter.add({
                        title: "出现" + data.code + "异常",
                        time: 2000,
                        class_name: 'gritter-error gritter-light'
                    });
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    } else {
                        $.gritter.add({
                            title: "出现未知异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.gritter.add({
                    title: XMLHttpRequest.status,
                    text: XMLHttpRequest.statusText,
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
            }

        });
    });

    //公告硬删除
    $("#modal_placard_delete_button").on("click", function () {
        bootbox.confirm("删除该公告会无法恢复，确认删除？", function (result) {
            if (result) {
                var placard_id = $("#modal_placard_id").html();
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/placard/delete",
                    data: {templet_id: placard_id},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '删除成功！',
                                time: 2000,
                                class_name: 'gritter-info gritter-light'
                            });
                            //修改成功后，modal消失
                            $("#table_placard_"+placard_id).remove();
                            $("#modal_placard_edit").modal('hide');
                        } else {
                            if (data.msg != "") {
                                $.gritter.add({
                                    title: "错误code：" + data.code + ",错误信息：" + data.msg,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-center'
                                });
                            }
                        }
                    },
                    error: function (XMLHttpRequest) {
                        $.gritter.add({
                            title: XMLHttpRequest.status,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }
                });
            }
        });
    });

    //toolbar的编辑按钮
    $("#toolbar_placard_edit_h").on("click", function () {

        var num = 0;
        var placard_id;
        var placard_content;
        var placard_title;
        var placard_endtime;
        var placard_type;
        var placard_link_data;
        var placard_disable;
        $("#placard_table tbody").find('tr').each(function () {
            //获取所选的行
            var checked = $(this).find("td:eq(1) input[type=checkbox]").prop('checked');
            if (checked) {
                placard_id = $(this).find("td:eq(2)").html();
                placard_content = $(this).find("td:eq(0)").html();
                placard_title = $(this).find("td:eq(3)").html();
                placard_starttime = $(this).find("td:eq(4)").html();
                placard_endtime = $(this).find("td:eq(5)").html();
                placard_type = $(this).find("td:eq(6)").html();
                placard_link_data = $(this).find("td:eq(7)").html();
                placard_count = $(this).find("td:eq(8)").html();
                placard_disable = $(this).find("td:eq(9)").html();
                num++;
            }
        });
        if (num > 1) {
            $.gritter.add({
                title: '只能选择一项！',
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
        } else {
            if (placard_id == -1) {
                $.gritter.add({
                    title: '新添加的数据没有指定ID值，需刷新页面后才能修改数据！',
                    time: 2000,
                    class_name: 'gritter-warning gritter-center'
                });
                return;
            }
            //附加数据到modal中
            $("#modal_placard_title").val(placard_title);
            $("#modal_spacard_editor").html(placard_content);
            $("#modal_placard_endtime").val(placard_endtime);
            var type = 2;
            if (placard_type == "网页") {
                type = 1;
            } else if (placard_type == "足球赛事") {
                type = 3;
            } else if (placard_type == "篮球赛事") {
                type = 4;
            } else if (placard_type == "锦标赛") {
                type = 5;
            }
            $('#modal_placard_type').find("option[value=" + type + "]").prop("selected", true);

            $("#modal_placard_link_data").val(placard_link_data);

            if (placard_disable == "<i class=\"icon-ok green bigger-150\"></i>") {
                $("#modal_placard_disable").prop('checked', true);
            } else {
                $("#modal_placard_disable").prop('checked', false);
            }
            $("#modal_placard_id").html(placard_id);
            $("#modal_placard_count").html(placard_count);

            $("#modal_placard_edit").modal({backdrop: 'static'});
        }
    });

    /**
     * 公告编辑 end
     * =============================
     **/


    /**
     * 公告添加 start
     **/
        //模态窗口打开
    $("#placard_add_bt").on("click", function () {
        $("#modal_placard_add").modal({backdrop: 'static'});
    });

    $("#modal_add_placard_edit_button").on("click", function () {
        //获得输入的值
        var placard_content = $("#modal_add_spacard_editor").html();
        var placard_title = $("#modal_add_placard_title").val().trim();
        if (!placard_title){
            $.gritter.add({
                title: '标题不能为空！',
                time: 2000,
                class_name: 'gritter-warning gritter-light gritter-center'
            });
            return ;
        }
        var placard_endtime = $("#modal_add_placard_endtime").val();
        if (!placard_endtime){
            $.gritter.add({
                title: '截止时间不能为空！',
                time: 2000,
                class_name: 'gritter-warning gritter-light gritter-center'
            });
            return ;
        }
        var placard_type = $("#modal_add_placard_type").val();
        var placard_link_data = $("#modal_add_placard_link_data").val();
        var placard_add_checked = $('#modal_add_placard_disable').prop('checked');
        //异步提交
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/placard/edit",
            data: {title: placard_title, content: placard_content, end_time: placard_endtime, link_type: placard_type, link_data: placard_link_data, disable_flag: placard_add_checked},
            success: function (data) {
                if (data.code == 200) {
                    //添加成功后，往表格添加新数据
                    //var htmlStr = showPlacardData(placard_content, -1, placard_title, new Date().getTime(), placard_endtime, placard_type, placard_link_data, 0, placard_add_checked);
                    //$("#placard_table tbody").append(htmlStr);
                    $("#modal_placard_add").modal('hide');
                    $.gritter.add({
                        title: '添加成功！',
                        time: 2000,
                        class_name: 'gritter-info gritter-light'
                    });
                    window.location.reload(true);
                } else {
                    $.gritter.add({
                        title: "出现" + data.code + "异常",
                        time: 2000,
                        class_name: 'gritter-error gritter-light'
                    });
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    } else {
                        $.gritter.add({
                            title: "出现未知异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.gritter.add({
                    title: XMLHttpRequest.status,
                    text: XMLHttpRequest.statusText,
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
            }

        });
    });


    /**
     * 公告添加 end
     **/



    function showErrorAlert(reason, detail) {
        var msg = '';
        if (reason === 'unsupported-file-type') {
            msg = "Unsupported format " + detail;
        }
        else {
            console.log("error uploading file", reason, detail);
        }
        $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
            '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
    }

    //$('#modal_spacard_editor').ace_wysiwyg();//this will create the default editor will all buttons

    //but we want to change a few buttons colors for the third style
    $('#modal_spacard_editor').ace_wysiwyg({
        toolbar: [
            'font',
            null,
            'fontSize',
            null,
            {name: 'bold', className: 'btn-info'},
            {name: 'italic', className: 'btn-info'},
            {name: 'strikethrough', className: 'btn-info'},
            {name: 'underline', className: 'btn-info'},
            null,
            {name: 'insertunorderedlist', className: 'btn-success'},
            {name: 'insertorderedlist', className: 'btn-success'},
            {name: 'outdent', className: 'btn-purple'},
            {name: 'indent', className: 'btn-purple'},
            null,
            {name: 'justifyleft', className: 'btn-primary'},
            {name: 'justifycenter', className: 'btn-primary'},
            {name: 'justifyright', className: 'btn-primary'},
            {name: 'justifyfull', className: 'btn-inverse'},
            null,
            {name: 'createLink', className: 'btn-pink'},
            {name: 'unlink', className: 'btn-pink'},
            null,
            {name: 'insertImage', className: 'btn-success'},
            null,
            'foreColor',
            null,
            {name: 'undo', className: 'btn-grey'},
            {name: 'redo', className: 'btn-grey'}
        ],
        'wysiwyg': {
            fileUploadError: showErrorAlert
        }
    }).prev().addClass('wysiwyg-style3');


    $('#modal_add_spacard_editor').ace_wysiwyg({
        toolbar: [
            'font',
            null,
            'fontSize',
            null,
            {name: 'bold', className: 'btn-info'},
            {name: 'italic', className: 'btn-info'},
            {name: 'strikethrough', className: 'btn-info'},
            {name: 'underline', className: 'btn-info'},
            null,
            {name: 'insertunorderedlist', className: 'btn-success'},
            {name: 'insertorderedlist', className: 'btn-success'},
            {name: 'outdent', className: 'btn-purple'},
            {name: 'indent', className: 'btn-purple'},
            null,
            {name: 'justifyleft', className: 'btn-primary'},
            {name: 'justifycenter', className: 'btn-primary'},
            {name: 'justifyright', className: 'btn-primary'},
            {name: 'justifyfull', className: 'btn-inverse'},
            null,
            {name: 'createLink', className: 'btn-pink'},
            {name: 'unlink', className: 'btn-pink'},
            null,
            {name: 'insertImage', className: 'btn-success'},
            null,
            'foreColor',
            null,
            {name: 'undo', className: 'btn-grey'},
            {name: 'redo', className: 'btn-grey'}
        ],
        'wysiwyg': {
            fileUploadError: showErrorAlert
        }
    }).prev().addClass('wysiwyg-style3');


    //Add Image Resize Functionality to Chrome and Safari
    //webkit browsers don't have image resize functionality when content is editable
    //so let's add something using jQuery UI resizable
    //another option would be opening a dialog for user to enter dimensions.
    if (typeof jQuery.ui !== 'undefined' && /applewebkit/.test(navigator.userAgent.toLowerCase())) {

        var lastResizableImg = null;

        function destroyResizable() {
            if (lastResizableImg == null) return;
            lastResizableImg.resizable("destroy");
            lastResizableImg.removeData('resizable');
            lastResizableImg = null;
        }

        var enableImageResize = function () {
            $('.wysiwyg-editor')
                .on('mousedown', function (e) {
                    var target = $(e.target);
                    if (e.target instanceof HTMLImageElement) {
                        if (!target.data('resizable')) {
                            target.resizable({
                                aspectRatio: e.target.width / e.target.height
                            });
                            target.data('resizable', true);

                            if (lastResizableImg != null) {//disable previous resizable image
                                lastResizableImg.resizable("destroy");
                                lastResizableImg.removeData('resizable');
                            }
                            lastResizableImg = target;
                        }
                    }
                })
                .on('click', function (e) {
                    if (lastResizableImg != null && !(e.target instanceof HTMLImageElement)) {
                        destroyResizable();
                    }
                })
                .on('keydown', function () {
                    destroyResizable();
                });
        }

        enableImageResize();

        /**
         //or we can load the jQuery UI dynamically only if needed
         if (typeof jQuery.ui !== 'undefined') enableImageResize();
         else {//load jQuery UI if not loaded
            $.getScript($path_assets+"/js/jquery-ui-1.10.3.custom.min.js", function(data, textStatus, jqxhr) {
                if('ontouchend' in document) {//also load touch-punch for touch devices
                    $.getScript($path_assets+"/js/jquery.ui.touch-punch.min.js", function(data, textStatus, jqxhr) {
                        enableImageResize();
                    });
                } else  enableImageResize();
            });
        }
         */
    }


    $('#modal_placard_endtime,#modal_add_placard_endtime').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        onSelect: function (dateText) {
            var date = new Date(dateText);
//                getAsyData(date.getTime(), 0);
        }
    });
    $('#modal_placard_endtime,#modal_add_placard_endtime').datepicker('option', {dateFormat: "yy-mm-dd" });


    //tooltip提示 start
    $("#modal_placard_title,#modal_placard_link_data,#modal_add_placard_title,#modal_add_placard_link_data").tooltip({
        hide: {
            delay: 100
        }
    });
    //tooltip提示 end


    /**
     * 公告通知（push） start
     * =============================
     **/
        //push按钮
    $('#placard_table tbody').on('click', 'button.btn-yellow', function () {
        var tmpTr = $(this).closest("tr");
        var placard_id = tmpTr.find("td:eq(2)").html();
        var placard_title = tmpTr.find("td:eq(3)").html();
        if (placard_id == -1) {
            $.gritter.add({
                title: '新添加的数据没有指定ID值，需刷新页面后才能通知该条公告！',
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        }
        bootbox.confirm("确定推送标题为：“" + placard_title + "”这条公告吗？", function (result) {
            if (result) {
                //确认推送
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/placard/push",
                    data: {templetId: placard_id},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '推送成功！',
                                time: 2000,
                                class_name: 'gritter-info gritter-center gritter-light'
                            });
                        } else {
                            $.gritter.add({
                                title: "出现" + data.code + "异常",
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                            if (data.msg != "") {
                                $.gritter.add({
                                    title: data.msg,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-light'
                                });
                            } else {
                                $.gritter.add({
                                    title: "出现未知异常",
                                    time: 2000,
                                    class_name: 'gritter-error gritter-light'
                                });
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $.gritter.add({
                            title: XMLHttpRequest.status,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }

                });
            }
        });
    });


    $("#toolbar_placard_push_h").on("click", function () {

        var num = 0;
        var idStr = "";
        var is_no_id = false;
        $("#placard_table tbody").find('tr').each(function () {
            //获取所选的行
            var checked = $(this).find("td:eq(1) input[type=checkbox]").prop('checked');
            if (checked) {
                var placard_id = $(this).find("td:eq(2)").html();
                if (placard_id == -1) {
                    is_no_id = true;
                }
                idStr += placard_id + ",";
                num++;
            }
        });
        if (is_no_id) {
            $.gritter.add({
                title: '新添加的数据没有指定ID值，需刷新页面后才能通知该条公告！',
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        }
        bootbox.confirm("确定推送所选的" + num + "条公告吗？", function (result) {
            if (result) {
                //确认推送
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/placard/push",
                    data: {templetIdStr: idStr},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '推送成功！',
                                time: 2000,
                                class_name: 'gritter-info gritter-center gritter-light'
                            });
                        } else {
                            $.gritter.add({
                                title: "出现" + data.code + "异常",
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                            if (data.msg != "") {
                                $.gritter.add({
                                    title: data.msg,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-light'
                                });
                            } else {
                                $.gritter.add({
                                    title: "出现未知异常",
                                    time: 2000,
                                    class_name: 'gritter-error gritter-light'
                                });
                            }
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $.gritter.add({
                            title: XMLHttpRequest.status,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }

                });
            }
        });
    });

    /**
     * 公告通知（push） end
     * =============================
     **/




    /**
     * ======================================================
     * 添加照片 start
     * */


    function addImage() {
        $("#image_form").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 100, // MB
            url: appName + "/frontpage/add/image",
            maxFiles: 20,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 拖曳图片到此框内</span> 上传 \
                <span class="smaller-80 grey">(或者直接点击)</span> <br /> \
                <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传一张照片！',
            dictFileTooBig: '只能上传不超过10M的照片！',
            dictInvalidInputType: '只能是jpg/jpeg/bmp/gif/png格式的照片！',

            //change the previewTemplate to use Bootstrap progress bars
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
            init: function () {
                this.on("success", function (data) {
                    //当上传完成后的事件，接受的数据为JSON格式
                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                        var res = eval('(' + data.xhr.responseText + ')');
                        if (res.flag) {
                            $.gritter.add({
                                title: "恭喜，已成功上传照片！",
                                text: "图片地址：http://roi.skst.cn/" + res.key,
                                sticky: true,
                                time: 2000,
                                class_name: 'gritter-success'
                            });
                        }
                        else {
                            $.gritter.add({
                                title: "上传失败，失败的原因是：" + res.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        }
                    }
                });
                this.on("addedfile", function (file) {
                });
                this.on("complete", function (data) {
                });
                this.on("removedfile", function (data) {
                    //如果是成功上传的照片，就对七牛云上的照片进行删除
                    if (data.accepted) {

                    }
                });
            }
        });
    }

    try {
        addImage();
    } catch (e) {
        alert('Dropzone.js does not support older browsers!');
    }

    /**
     * ======================================================
     * 添加照片 end
     * */


});