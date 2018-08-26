define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/datepicker.zh-CN.js");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/bootstrap-timepicker.min.js");
    require("../../modules/lib/datepicker");
    require("../../modules/plugin/bootstrap-select.min.js");


    //变量
    //上传的图片路径
    var upload_photos = "";
    //图片的前缀
    var image_url = "http://roi.skst.cn/";
    //展示列表的数量
    var data_number = 0;
    //点击按钮赋值的押押id
    var yy_id;
    //赛事类型选项
    var option_html = "";
    //押押列表类型(默认显示未结束)
    var yy_type = false;
    //押押start_id
    var start_id_show;
    var start_id_hide;
    //是否隐藏
    var hide_flag = false;
    //是否打开了隐藏押押的tab
    var is_open_hide_yy = false;
    //结算按钮
    var settle_bt ;
    //列表照片
    var list_image ;

  var cup_id=-1;

    //basic initializations
    $('#yy_table tr input[type=checkbox]').removeAttr('checked');
    $('#yy_table').on('click', 'tr input[type=checkbox]', function () {
        if (this.checked) {
            tablebox.display_bar(1);
            $(this).closest('tr').addClass('selected2');
        } else {
            tablebox.display_bar($('#placard_table tr input[type=checkbox]:checked').length);
            $(this).closest('tr').removeClass('selected2');
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


    //check/uncheck all tr
    $('#toggle_all').removeAttr('checked').on('click', function () {
        if (this.checked) {
            tablebox.select_all();
        } else tablebox.select_none();
    });

    $('#yy_hide_select_all').removeAttr('checked').on('click', function () {
        if (this.checked) {

            $('#yy_hide_table tr input[type=checkbox]').each(function () {
                this.checked = true;
            });
            $('#yy_hide_select_all').get(0).checked = true;

        } else {
            $('#yy_hide_table tr input[type=checkbox]').removeAttr('checked');
            $('#yy_hide_select_all').get(0).checked = false;
        }
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
            $('#yy_table tr input[type=checkbox]').each(function () {
                this.checked = true;
                $(this).closest('tr').addClass('selected2');
                count++;
            });

            $('#toggle_all').get(0).checked = true;

            tablebox.display_bar(count);
        },
        select_none: function () {
            $('#yy_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected2');
            $('#toggle_all').get(0).checked = false;
            tablebox.display_bar(0);
        }

    }

    $('#toolbar_yy_edit_h').on('click', function () {

        var ids = new Array();
        $("#yy_table tbody").find('tr').each(function () {

            var checked = $(this).find("td:eq(0) input[type=checkbox]").prop('checked');

            if (checked) {
                var tr_id = $(this).find("td:last-child").attr("id");
                ids.push(tr_id);
            }
        });
        if (ids.length > 1) {
            $.gritter.add({
                title: "暂时只支持编辑一个选中选",
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        }

        yy_id = ids[0];

        getOne();

    });


    $('#toolbar_yy_settle_h').on('click', function () {

        var ids = new Array();
        $("#yy_table tbody").find('tr').each(function () {

            var checked = $(this).find("td:eq(0) input[type=checkbox]").prop('checked');

            if (checked) {
                var tr_id = $(this).find("td:last-child").attr("id");
                ids.push(tr_id);
            }
        });
        if (ids.length > 1) {
            $.gritter.add({
                title: "暂时只支持结算一个选中选",
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        }

        yy_id = ids[0];

        settleOne();

    });

    /**
     * ===================
     * 打开页面异步加载数据 Start
     * */


    if(yy_jsp_show){
        getCupDate();
        getData();
    } else {
        hide_flag = true;
        yy_type = null;
        getData();
    }

    /*请求押押类型*/
    function getCupDate(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/cup",
            success: function (data) {
                if (data.code == 200) {
                    if (data.cups) {
                        var cup_arr = [];
            cup_arr.push('<li class="active">');
                        cup_arr.push('<a data-toggle="tab" class="cup-a" href="#" data-id="-1" ><i class="green icon-circle bigger-110"></i>所有</a>');
                        cup_arr.push('</li>');
                        $.each(data.cups, function (index, cup) {
                            option_html += "<option value='" + cup.cup_id + "'>" + cup.cup_name + "</option>";
                            cup_arr.push('<li>');
                            cup_arr.push('<a data-toggle="tab"  class="cup-a" href="#" data-id="' + cup.cup_id + '" ><i class="green icon-circle bigger-110"></i>' + cup.cup_name + '</a>');
                            cup_arr.push('</li>');
                        });
                        $("#modal_add_type").append(option_html);
                        $("#modal_edit_type").append(option_html);
                        $("#yy_cup_wrap").append(cup_arr.join(""));
            $("#yy_cup_wrap a.cup-a").click(function(){
              cup_id = $(this).attr("data-id");
              start_id_show = null;
              start_id_hide = null;
              $("#yy_table tbody").empty();
              getData();
            });

                    }
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


    /**
     * 打开页面异步加载数据 end
     * ===================
     * */


    /**
     * toolbar start
     * ===================
     * */

  // 批量操作
  $("#one_hide_select").on("click", function (e) {
    var checkData = $("input.ace[type='checkbox'][data-id]:checked");
    if(checkData.size() > 0){
    bootbox.confirm("确定隐藏所有选中的赛事?", function (result) {
      if (result) { //确认隐藏
        checkData.each(function(){
          hideYY($(this).attr("data-id"), true);
        });
      }
    });     
    }
  });


    $("#dropdown_all").on("click", function (e) {
        e.preventDefault();
        $("#yy_table tbody tr").remove();
        yy_type = null;
        start_id_show = null;
        data_number = 0;
        $("#dropdown_all_i").removeClass("invisible");
        $("#dropdown_not_expired_i").addClass("invisible");
        $("#dropdown_finish_i").addClass("invisible");
        getData();
    });

    $("#dropdown_not_expired").on("click", function (e) {
        e.preventDefault();
        $("#yy_table tbody tr").remove();
        yy_type = false;
        start_id_show = null;
        data_number = 0;
        $("#dropdown_all_i").addClass("invisible");
        $("#dropdown_not_expired_i").removeClass("invisible");
        $("#dropdown_finish_i").addClass("invisible");
        getData();
    });

    $("#dropdown_finish").on("click", function (e) {
        e.preventDefault();
        $("#yy_table tbody tr").remove();
        yy_type = true;
        start_id_show = null;
        data_number = 0;
        $("#dropdown_all_i").addClass("invisible");
        $("#dropdown_not_expired_i").addClass("invisible");
        $("#dropdown_finish_i").removeClass("invisible");
        getData();
    });

    /**
     * toolbar start
     * ===================
     * */


    /*tooltip提示 start*/
    $("#yy_table").tooltip({
        hide: {
            delay: 100
        }
    });
    //tooltip提示 end


    /**
     * ====================================================
     * 获取押押列表 start
     **/

    function getData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/list",
            data: {type: yy_type, cupId: cup_id, startIdShow: start_id_show,  startIdHide: start_id_hide, hideFlag: hide_flag},
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.yys, function (index, yy) {
                            var htmlStr = showData(yy.id, yy.title, yy.text, yy.images, yy.start_time, yy.end_time, yy.cup_name, yy.status, yy.hide_flag, yy.settle, yy.total, yy.init_count, yy.good);
                            if (hide_flag) {
                                start_id_hide = yy.id;
                                $("#yy_hide_table tbody").append(htmlStr);
                            } else {
                                start_id_show = yy.id;
                                $("#yy_table tbody").append(htmlStr);
                            }
                        });
                        if (!hide_flag) {
                            data_number += data.number;
                            $("#toolbar_yy_num").html(data_number);
                        }
                    } else {
                        $.gritter.add({
                            title: '服务器无数据返回！',
                            time: 2000,
                            class_name: 'gritter-info gritter-light'
                        });
                    }
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


    function showData(id, title, text, image, start_time, end_time, cup, status, hide_flag, settle, total, init_count, good) {
        if (title.length > 15) {
            title = title.substr(0, 13) + "……";
        }
        if (text.length > 40) {
            text = text.substr(0, 38) + "……";
        }
        var images = image.split(",");
        start_time = new Date(start_time).pattern("yy-MM-dd HH:mm");
        end_time = new Date(end_time).pattern("yy-MM-dd HH:mm");
        var btn_html = "";
        if (status == 0) {
            status = '<span class="label label-grey">初始状态</span>';
            if(!hide_flag){
                btn_html = '<button class="btn btn-xs btn-info">编辑</button> <button class="btn btn-xs btn-purple">结算</button> ';
            } else {
        btn_html = '<button class="applyBtn btn btn-xs btn-success">查看</button> ';
      }
        } else if (status == -1) {
            status = '<span class="label label-success">正常结算</span>';
            btn_html = '<button class="applyBtn btn btn-xs btn-success">查看</button> ';
        } else if (status == -10) {
            status = '<span class="label label-danger">走盘结算</span>';
            btn_html = '<button class="applyBtn btn btn-xs btn-success">查看</button> ';
        }
        if (settle) {
            settle = '<i class="icon-ok-sign bigger-120 green" data-toggle="tooltip" title="已经结算"></i>';
        } else {
            settle = '<i class="icon-remove-sign bigger-120 grey" data-toggle="tooltip" title="未结算"></i>';
        }
        if (good){
            good = '<i class="icon-ok-sign bigger-120 green"></i>';
            btn_html += '<button class="choiceYy btn btn-xs">精选撤销</button> ';
        } else {
            good = '<i class="icon-remove-sign bigger-120 grey"></i>';
            btn_html += '<button class="choiceYy btn btn-xs btn-inverse">精选推荐</button> ';
        }
        if (hide_flag) {
            btn_html += '<button class="btn btn-xs btn-warning">显示</button>';
        } else {
            btn_html += '<button class="btn btn-xs btn-danger">隐藏</button>';
        }
        if ((total-init_count) > 0){
            btn_html += ' <button class="btn btn-xs btn-primary">下注详情</button>';
        }
        
        var htmlArray = [];
        htmlArray.push('<tr id="yy_wrap_' + id + '">');
        htmlArray.push('<td><label class="inline"><input type="checkbox" class="ace"  data-id="' + id + '" /><span class="lbl"></span></label></td>');
        htmlArray.push('<td class="center">' + id + '</td>');
        htmlArray.push('<td>');
        htmlArray.push('<div class="col-sm-3"><img width="80" height="60" src="' + image_url + images[0] + '" /></div>');
        htmlArray.push('<div class="col-sm-9"><b>' + title + '</b><p class="smaller-80">' + text + '</p></div>');
        htmlArray.push('</td>');
        htmlArray.push('<td class="center">' + start_time + '</td>');
        htmlArray.push('<td class="center">' + end_time + '</td>');
        htmlArray.push('<td class="center">' + cup + '</td>');
        htmlArray.push('<td class="center">' + status + '</td>');
        htmlArray.push('<td class="center">' + settle + '</td>');
        htmlArray.push('<td class="center">' + good + '</td>');
        htmlArray.push('<td class="center">' + total + '</td>');
        htmlArray.push('<td class="left" id="' + id + '"><div>' + btn_html + '</div></td>');
        htmlArray.push('</tr>');
        return htmlArray.join("");
    }

    /**
     * ====================================================
     * 获取押押列表 end
     **/


    /**
     * ====================================================
     * 押押添加 start
     **/

    $("#datepicker").dateInit({
        settings: {
            single: false,
            dayLimit: 3650,
            format: "YYYY-MM-DD HH:mm:ss",
            timepicker: true,
            increment: 1,
            dropdown: false
        },
        height: 30,
        width: 350
    });



    //模态窗口打开
    $("#yy_add_bt").on("click", function () {
        $("#modal_yy_add").modal({backdrop: 'static'});
    });

    $("#modal_add_yy_button").on("click", function () {
        //获得输入的值
        var yy_title = $("#modal_add_title").val();
        var yy_text = $("#modal_add_text").val();
        //var yy_longbi = $('#modal_add_longbi').prop('checked');
        //var init_count = $("#modal_add_init_count").val();
        var yy_time = $("#reservation").val();
        var yy_cup_id = $("#modal_add_type").val();
        var yy_show_type = $("#modal_add_show_type").val();
        var yy_activity = $("#modal_add_activity").val() != 0;

        if (yy_time.length != 41) {
            $.gritter.add({
                title: "必需有开始时间和结束时间",
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        } else {
            var yy_starttime = yy_time.substring(0, 19);
            var yy_endtime = yy_time.substring(22, 41);
        }
        var photos = "";
        if (upload_photos) {
            photos = upload_photos.substr(0, upload_photos.length - 1);
        } else {
            $.gritter.add({
                title: "至少需要一张图片",
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        }
        var options_flag = true;
        var options_value_flag = true;
        var options_list = new Array();
        var n = 1;
//        $("#modal_add_yy_options").find('.col-sm-10').each(function () {
//            var key = $(this).find('.col-xs-5').val();
//            var value = $(this).find('.col-xs-2').val();
//            if ((key && !value) || (!key && value)) {
//                options_flag = false;
//                return;
//            }
//            if (isNaN(value)) {
//                options_value_flag = false;
//                return;
//            }
//            var option = new Object();
//            option.i = n;
//            option.n = key;
//            option.r = value;
//            options_list.push(option);
//            n++;
//        });

        $("#modal_add_yy_options").find('.widget-main').each(function () {
            var name = $(this).find('input[name=option_name]').val();
            var roi = $(this).find('input[name=option_roi]').val();
//            var type = $(this).find('select[name=option_type]').val();
            var image = $(this).find('img').attr("src");

            if ((name && !roi) || (!name && roi)) {
                options_flag = false;
                return;
            }
            if (isNaN(roi)) {
                options_value_flag = false;
                return;
            }
            var option = new Object();
            option.i = n;
            option.n = name;
            option.r = roi;
            if (image){
                option.p = image.substr(19);
            }
            options_list.push(option);
            n++;
        });


        var options = JSON.stringify(options_list);
        if (!options_flag) {
            $.gritter.add({
                title: "选项和赔率缺一不可！",
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        }
        if (!options_value_flag) {
            $.gritter.add({
                title: "赔率必须是数字！",
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        }
//        if (isNaN(init_count)){
//            $.gritter.add({
//                title: "初始化的数量必须是数字！",
//                time: 2000,
//                class_name: 'gritter-warning gritter-center'
//            });
//            return;
//        } else if (!init_count){
//            init_count = 0 ;
//        }

        //押押添加
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/add",
            data: {title: yy_title, text: yy_text, images: photos, options: options, cup_id: yy_cup_id, start_time: yy_starttime, end_time: yy_endtime, show_type: yy_show_type, activity_flag: yy_activity, list_image: list_image},
            success: function (data) {
                if (data.code == 200) {
                    //添加成功后，往表格添加新数据
                    //var htmlStr = showData(yy.id, yy.title, yy.text, yy.images, yy.start_time, yy.end_time, yy.cup_name, yy.status, yy.is_longbi);
                    //$("#yy_table tbody").append(htmlStr);
                    $.gritter.add({
                        title: '添加成功，刷新数据即可看到！',
                        time: 2000,
                        class_name: 'gritter-info gritter-light'
                    });
                    $("#modal_yy_add").modal("hide");
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
    });

    $("#modal_yy_add").on("hidden.bs.modal", function () {
        upload_photos = "";
        list_image = "";
        //清空原来的内容
        $("#image_form").remove();
        var photo_html = "<form id='image_form' action='#' class='dropzone' method='post' enctype='multipart/form-data'>" +
            "<div class='fallback'><input name='file' type='file'/></div></form>";
        $("#modal_add_image_span").append(photo_html);
        addImage();
        $("#image_form4").remove();
        var photo_html4 = "<form id='image_form4' action='#' class='dropzone' method='post' enctype='multipart/form-data'>" +
            "<div class='fallback'><input name='file' type='file'/></div></form>";
        $("#modal_add_image_span4").append(photo_html4);
        addImage4();
    });

//    //添加更多选项
//    $('#modal_add_more').on('click', function () {
//        $("#modal_add_yy_options").append('<div class="col-sm-10">\
//            <div><input type="text" class="col-xs-5" maxlength="18" placeholder="输入选项名称（少于19个字符）"/><span class="col-xs-1">……</span>\
//            <input type="text" class="col-xs-2" placeholder="输入对应赔率"/>\
//            <span class="col-xs-1"><a href="#" data-action="delete" class="middle">\
//            <i class="icon-trash red bigger-150 middle"></i></a></span></div></div>')
//            .find('a[data-action=delete]').on('click', function (e) {
//                e.preventDefault();
//                $(this).closest('.col-sm-10').hide(300, function () {
//                    $(this).remove();
//                });
//            });
//    });


    //模态窗口打开
    $("#yy_type_add_bt").on("click", function () {
        $("#modal_yy_add_cup").modal({backdrop: 'static'});
    });

    $("#modal_add_yy_cup_button").on("click", function () {
        //获得输入的值
        var yy_cup_name = $("#modal_add_cup_name").val().trim();
        if (!yy_cup_name) {
            $.gritter.add({
                title: "名字不能为空",
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        }

        //押押添加
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/add/cup",
            data: {cupName: yy_cup_name},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '添加成功!',
                        time: 2000,
                        class_name: 'gritter-success gritter-light'
                    });
                    $("#modal_yy_add_cup").modal("hide");
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
    });

    $("#modal_yy_add_cup").on("hidden.bs.modal", function () {
        $("#modal_add_cup_name").val("");
    });


    /**
     * =====================================================
     * 押押添加 end
     **/


    /**
     * ======================================================
     * 添加押押照片 start
     * */

    function addImage() {
        $("#image_form").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 100, // MB
            url: appName + "/event/yy/add/image",
            maxFiles: 10,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            uploadMultiple: true,
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传押押单篇图片</span><span class="smaller-80 grey">(拖曳或者直接点击上传 750x460)</span><br /><i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传十张照片！',
            dictFileTooBig: '只能上传不超过100M的照片！',
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
                                title: "照片上传成功！",
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
                            });

                            upload_photos += res.key + ",";
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
            }
        });
    }

    function addImage2() {
        $("#image_form2").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 100, // MB
            url: appName + "/event/yy/add/image",
            maxFiles: 10,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            uploadMultiple: true,
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传押押照片获取地址进行修改</span> \
            <span class="smaller-80 grey">(拖曳或者直接点击上传)</span> <br /> \
            <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传十张照片！',
            dictFileTooBig: '只能上传不超过100M的照片！',
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
                                text: "图片地址：" + res.key,
                                sticky: true,
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
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
            }
        });
    }



    function addImage3() {
        $("#image_form3").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 100, // MB
            url: appName + "/event/yy/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            uploadMultiple: true,
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传押押选项照片</span> \
            <span class="smaller-80 grey">(拖曳或者直接点击上传)</span> <br /> \
            <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传一张张照片！',
            dictFileTooBig: '只能上传不超过100M的照片！',
            dictInvalidInputType: '只能是jpg/jpeg/bmp/gif/png格式的照片！',

            //change the previewTemplate to use Bootstrap progress bars
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
            init: function () {
                this.on("success", function (data) {
                    //当上传完成后的事件，接受的数据为JSON格式
                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                        var res = eval('(' + data.xhr.responseText + ')');
                        if (res.flag) {
                            upload_option_image = res.key;
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
            }
        });
    }

    function addImage4() {
        $("#image_form4").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 100, // MB
            url: appName + "/event/yy/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            uploadMultiple: true,
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传押押列表图片</span><span class="smaller-80 grey">(未上传则默认为单篇图片 718x270)</span><br /><i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传一张张照片！',
            dictFileTooBig: '只能上传不超过100M的照片！',
            dictInvalidInputType: '只能是jpg/jpeg/bmp/gif/png格式的照片！',

            //change the previewTemplate to use Bootstrap progress bars
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
            init: function () {
                this.on("success", function (data) {
                    //当上传完成后的事件，接受的数据为JSON格式
                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                        var res = eval('(' + data.xhr.responseText + ')');
                        if (res.flag) {
                            list_image = res.key;
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
            }
        });
    }


    try {
        addImage();
        addImage2();
        addImage3();
        addImage4();
    } catch (e) {
        alert('Dropzone.js does not support older browsers!');
    }

    /**
     * ======================================================
     * 添加押押照片 end
     * */


    /**
     * ======================================================
     * 押押按钮功能 start
     **/

    /*获取一个押押赛事，显示编辑modal*/
    function getOne() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/one",
            data: {id: yy_id},
            success: function (data) {
                if (data.code == 200) {
                    $("#modal_edit_title").val(data.yy.title);
                    $("#modal_edit_text").val(data.yy.text);
                    $("#modal_edit_image").val(data.yy.images);
                    $("#modal_edit_list_image").val(data.yy.list_image);
                    var start_time = new Date(data.yy.start_time).pattern("yyyy-MM-dd HH:mm:ss");
                    var end_time = new Date(data.yy.end_time).pattern("yyyy-MM-dd HH:mm:ss");
                    //var edit_time = start_time + " - " + end_time;
                    $("#datepicker2").dateInit({
                        settings: {
                            single: false,
                            dayLimit: 3650,
                            format: "YYYY-MM-DD HH:mm:ss",
                            timepicker: true,
                            increment: 1,
                            dropdown: false,
                            startDate:start_time,
                            endDate:end_time
                        },
                        defTime:start_time + " - " + end_time,
                        iptId: "#edit_time",
                        height: 30,
                        width: 350
                    });
                    //$("#edit_time").val(edit_time);
                    $('#modal_edit_type').find("option[value=" + data.yy.cup_id + "]").attr("selected", true);

                    if (data.yy.show_type == 0){
                        $('#modal_edit_show_type').append('<option selected value="0">默认</option><option value="1">图片靠左</option>');
                    } else if (data.yy.show_type == 1){
                        $('#modal_edit_show_type').append('<option value="0">默认</option><option selected value="1">图片靠左</option>');
                    }
                    if (data.yy.activity_flag){
                        $('#modal_edit_activity').append('<option value="0">否</option><option selected value="1">是</option>');
                    } else {
                        $('#modal_edit_activity').append('<option selected value="0">否</option><option value="1">是</option>');
                    }
//                    console.log(data.yy.show_type);
//                    $("#modal_edit_show_type").selectpicker({
//                        style: 'btn-success'
//                    });

//                    if (data.yy.init_count) {
//                        $('#modal_edit_init_count').val(data.yy.init_count);
//                    }
//                    $('#modal_edit_init_count').val(data.yy.init_count);
                    var option_data = data.yy.option_data;
                    $.each(option_data, function (index, option) {
//                        var htmlStr = '<div class="col-md-10"><div>\
//                            <input type="text" class="col-sm-4" value="' + option.name + '" placeholder="输入选项名称"/>\
//                            <span class="col-sm-2">对应赔率</span>\
//                            <input type="text" class="col-sm-3" value="' + option.roi + '" placeholder="输入对应赔率" />\
//                            <span class="col-sm-2">投注人数</span>\
//                            <input type="text" class="col-sm-1" value="' + option.count + '" placeholder="输入对应人数" />\
//                            </div></div>';
//                        $("#modal_edit_yy_options").append(htmlStr);

                        var html = append_edit_option_html_fn(option.name, option.roi, option.count, option.image, option.type);
                        $("#modal_edit_yy_options").append(html);
                    });
                    $("#modal_edit_yy_options select").selectpicker({
                        style: 'btn-success'
                    });
                    reload_image_select();

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

        $("#modal_yy_edit").modal({backdrop: 'static'});
    }

    /*结算一个押押赛事，显示结算modal*/
    function settleOne() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/one",
            data: {id: yy_id},
            success: function (data) {
                if (data.code == 200) {
                    $("#modal_settle_title").html(data.yy.title);

                    var option_data = data.yy.option_data;
                    $.each(option_data, function (index, option) {
                        var htmlStr = '<div class="radio"><label>\
                            <input name="modal_settle_yy_radio" type="radio" value="' + option.index + '" class="ace" />\
                            <span class="lbl bigger-120">' + option.name + ' ' + option.roi + '</span></label></div>';
                        $("#modal_settle_yy_options").append(htmlStr);
                        $("#modal_settle_yy_options input[value=1]").get(0).checked = true;
                    });

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

        $("#modal_yy_settle").modal({backdrop: 'static'});
    }

    $('#yy_table tbody, #yy_hide_table tbody').on('click', 'button.btn-info',function () {
        var td = $(this).closest("td");
        yy_id = td.attr("id");

        getOne();

    }).on('click', 'button.btn-purple',function () {
        settle_bt = $(this) ;
        var td = $(this).closest("td");
        yy_id = td.attr("id");
        settleOne();

    }).on('click', 'button.btn-danger',function () {
        var td = $(this).closest("td");
        yy_id = td.attr("id");

        bootbox.confirm("确定隐藏该赛事?", function (result) {
            if (result) {
                hideYY(yy_id, true);
            }
        });
    }).on('click', 'button.btn-warning',function () {
        var td = $(this).closest("td");
        yy_id = td.attr("id");

        bootbox.confirm("确定显示该赛事?", function (result) {
            if (result) {
                hideYY(yy_id, false);
            }
        });
    }).on('click', 'button.applyBtn', function () {
        var td = $(this).closest("td");
        yy_id = td.attr("id");
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/one",
            data: {id: yy_id},
            success: function (data) {
                if (data.code == 200) {
                    $("#modal_yy_one_name").html(data.yy.title);
                    if (data.yy.text){
                        $("#modal_yy_one_detail").html(data.yy.text);
                    } else {
                        $("#modal_yy_one_detail").html("无");
                    }

                    $("#modal_yy_one_cup_name").html(data.yy.cup_name);
                    if (data.yy.status == -1) {
                        $("#modal_yy_one_status").html("正常结算");
                    } else if (data.yy.status == -10) {
                        $("#modal_yy_one_status").html("走盘结算");
                    }
                    var option_data = data.yy.option_data ;
                    var option_html = "";
                    if(option_data){
                        $.each(option_data, function (index, option) {
                            option_html += option.name + "<br>"  ;
                        });
                    }
                    $("#modal_yy_one_selection").html(option_html);
                    $("#modal_yy_one_result").html(option_data[data.yy.winner - 1].name);
                    var images = data.yy.images;
                    if (images) {
                        var images_tmp = images.split(",");
                        var images_html = "";
                        for (var i = 0; i < images_tmp.length; i++) {
                            images_html += "<img width='180' height='120' src='" + image_url + images_tmp[i] + "' /> ";
                        }
                        $("#modal_yy_one_images").html(images_html);
                    }
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

        $("#modal_yy_one").modal({backdrop: 'static'});

    }).on('click', 'button.btn-primary',function () {
        settle_bt = $(this) ;
        var td = $(this).closest("td");
        yy_id = td.attr("id");

        window.location.href = appName + "/event/yy/show/bet?id=" + yy_id ;

    }).on('click', 'button.choiceYy',function () {
        settle_bt = $(this) ;
        var td = settle_bt.closest("td");
        yy_id = td.attr("id");
        var bt_text = settle_bt.text();
        if (bt_text == "精选撤销"){
            yy_id = -yy_id;
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/edit/good",
            data: {yyId: yy_id},
            success: function (data) {
                if (data.code == 200) {
                    if (yy_id>0){
                        $.gritter.add({
                            title: '精选推荐成功！',
                            time: 2000,
                            class_name: 'gritter-success gritter-light'
                        });
                        settle_bt.html("精选撤销");
            settle_bt.removeClass("btn-inverse");
                        td.prev().prev().html('<i class="icon-ok-sign bigger-120 green"></i>');
                    } else {
                        $.gritter.add({
                            title: '精选撤销成功！',
                            time: 2000,
                            class_name: 'gritter-success gritter-light'
                        });
                        settle_bt.html("精选推荐");
                  settle_bt.addClass("btn-inverse");
                        td.prev().prev().html('<i class="icon-remove-sign bigger-120 grey"></i>');
                    }
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

    });


    //编辑提交
    $("#modal_edit_yy_button").on("click", function () {

        //获得输入的值
        var yy_title = $("#modal_edit_title").val();
        var yy_text = $("#modal_edit_text").val();
        //var init_count = $('#modal_edit_init_count').val();
        var yy_time = $("#edit_time").val();
        var yy_cup_id = $("#modal_edit_type").val();
        var yy_show_type = $("#modal_edit_show_type").val();
        var yy_activity = $("#modal_edit_activity").val() != 0;
        var yy_list_image = $("#modal_edit_list_image").val();

        if (yy_time.length != 41) {
            $.gritter.add({
                title: "必需有开始时间和结束时间",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        } else {
            var yy_starttime = yy_time.substring(0, 19);
            var yy_endtime = yy_time.substring(22, 41);
        }
        var photos = $("#modal_edit_image").val();
        if (!photos) {
            $.gritter.add({
                title: "必须有图片信息",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        var options_flag = true;
        var options_list = new Array();
        var n = 1;
//        $("#modal_edit_yy_options").find('.col-md-10').each(function () {
//            var key = $(this).find('.col-sm-4').val();
//            var value = $(this).find('.col-sm-3').val();
//            var count = $(this).find('.col-sm-1').val();
//            if ((key && !value) || (!key && value)) {
//                options_flag = false;
//                return;
//            }
//
//            var option = new Object();
//            option.i = n;
//            option.n = key;
//            option.r = value;
//            option.c = count;
//            options_list.push(option);
//            n++;
//        });

        $("#modal_edit_yy_options").find('.widget-main').each(function () {
            var name = $(this).find('input[name=option_name]').val();
            var roi = $(this).find('input[name=option_roi]').val();
            var people = $(this).find('input[name=option_people]').val();
            var image = $(this).find('img').attr("src");

            if ((name && !roi) || (!name && roi)) {
                options_flag = false;
                return;
            }
            if (isNaN(roi)) {
                options_flag = false;
                return;
            }
            var option = new Object();
            option.i = n;
            option.n = name;
            option.r = roi;
            option.c = people;
            if (image){
                option.p = image.substr(19);
            }
            options_list.push(option);
            n++;
        });


        var options = JSON.stringify(options_list);
        if (!options_flag) {
            $.gritter.add({
                title: "输入有误或者缺失！",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
//        if (isNaN(init_count)){
//            $.gritter.add({
//                title: "投注人数必须是整数！",
//                time: 2000,
//                class_name: 'gritter-warning gritter-center'
//            });
//            return;
//        } else if (!init_count){
//            init_count = 0 ;
//        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/edit",
            data: {id: yy_id, title: yy_title, text: yy_text, images: photos, options: options, cup_id: yy_cup_id, start_time: yy_starttime, end_time: yy_endtime, show_type: yy_show_type, activity_flag: yy_activity, list_image: yy_list_image},
            success: function (data) {
                if (data.code == 200) {
                    //修改成功后，往表格添加新数据
                    //var htmlStr = showData(yy.id, yy.title, yy.text, yy.images, yy.start_time, yy.end_time, yy.cup_name, yy.status, yy.is_longbi);
                    //$("#yy_table tbody").append(htmlStr);
                    $.gritter.add({
                        title: '修改成功，刷新数据即可看到！',
                        time: 2000,
                        class_name: 'gritter-info gritter-light'
                    });
                    $("#modal_yy_edit").modal("hide");
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
    });

    $("#modal_yy_edit").on("hidden.bs.modal", function () {

        $('#modal_edit_type').children("option").remove();
        $("#modal_edit_type").append(option_html);


        $("#modal_edit_show_type *").remove();
        $("#modal_edit_activity *").remove();
        $("#modal_edit_yy_options *").remove();

        $('#modal_edit_yy_options').children(".col-md-10").remove();

        //upload_photos = "";
//        $("#modal_add_yy_options").find(".col-sm-10").remove();
//        $("#modal_add_yy_options").append('<div class="col-sm-10"><div>\
//            <input type="text" class="col-xs-5" placeholder="输入选项名称"/> \
//            <span class="col-xs-1">……</span>\
//            <input type="text" class="col-xs-2" placeholder="输入对应赔率" /></div></div>');
        //清空原来的内容
        $("#image_form2").remove();
        var photo_html = "<form id='image_form2' action='#' class='dropzone' method='post' enctype='multipart/form-data'>" +
            "<div class='fallback'><input name='file' type='file'/></div></form>";
        $("#modal_add_image_span2").append(photo_html);
        addImage2();
    });


    //结算提交
    $("#modal_settle_yy_button").on("click", function () {

        var options = $('#modal_settle_yy_options input[name="modal_settle_yy_radio"]:checked ').val();
        var options_html = $('#modal_settle_yy_options input[name="modal_settle_yy_radio"]:checked ').next("span").html();
        var status = $('#modal_settle_yy_status input[name="modal_settle_yy_status"]:checked ').val();
        var status_html = $('#modal_settle_yy_status input[name="modal_settle_yy_status"]:checked ').next("span").html();
        if (!status) {
            $.gritter.add({
                title: "状态必须有选择！",
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return;
        } else {
            if (status == -1) {
                if (!options) {
                    $.gritter.add({
                        title: "选项必须有选择！",
                        time: 2000,
                        class_name: 'gritter-warning gritter-center'
                    });
                    return;
                }
            }
        }

        bootbox.confirm("您选择的选项是：<b class='blue bigger-120'>" + options_html + "</b>, 结算选项是：<b class='blue bigger-120'>" + status_html +
            "</b>。 是否确认结算？一旦确认，系统马上派奖，不可恢复，望<b class='red bigger-180'>谨慎</b>！",
            function (result) {
                if (result) {

                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/event/yy/settle",
                        data: {contest_id: yy_id, support: options, status: status},
                        success: function (data) {
                            if (data.code == 200) {
                                $.gritter.add({
                                    title: '成功结算',
                                    time: 2000,
                                    class_name: 'gritter-success gritter-light'
                                });
                                //修改成功后，刷新数据
//                                $("#yy_table tbody tr").remove();
//                                start_id_show = null;
//                                data_number = 0;
//                                tablebox.display_bar(0);
//                                getData();
                                settle_bt.prev().remove();
                                settle_bt.remove();
                                settle_bt = null ;
                                var header_num = $("#header_num");
                                var yy_un_settle_num = header_num.html();
                                header_num.html(--yy_un_settle_num);
                                $("#yy_num").html("+" + yy_un_settle_num);
                                $("#modal_yy_settle").modal("hide");

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

    $("#modal_yy_settle").on("hidden.bs.modal", function () {
        $('#modal_settle_yy_options .radio').remove();

    });


    /**
     * ======================================================
     * 押押按钮功能 end
     **/





        //继续加载数据
    $('#yy_data_more,#yy_data_hide_more').on(ace.click_event, function () {
        getData();
    });


//    $('#yy_tab a').click(function (e) {
//        e.preventDefault();//阻止a链接的跳转行为
//        var href = $(this).attr("href");
//        if (href == "#yy_show_tab") {
//            hide_flag = false;
//        } else if (href == "#yy_hide_tab") {
//            hide_flag = true;
//            //切换到了篮球tab
//            if (!is_open_hide_yy) {
//                is_open_hide_yy = true;
//                getData();
//            }
//        }
//    });



    var header_color = new Array("header-color-orange","header-color-dark","header-color-blue","header-color-green","header-color-grey","header-color-purple","header-color-pink");
    var btn_color = new Array("btn-warning","btn-inverse","btn-primary","btn-success","btn-grey","btn-purple","btn-pink");
    var label_color = new Array("label-warning","label-inverse","label-primary","label-success","label-grey","label-purple","label-pink");

    var upload_option_image ;
    var option_image_tmp ;


//    $("#modal_add_show_type").selectpicker({
//        style: 'btn-success'
//    });


    $("#modal_option_image_select").on("shown.bs.modal", function () {

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/get/option/image",
            success: function (data) {
                if (data.code == 200) {
                    var images = data.images;
                    if (images){
                        var image = images.split(",");
                        $.each(image, function (index, value) {
                            var html = show_image_select(value);
                            $("#option_image_select_div").append(html);
                        });
                    }

                    show_option_image();

                    delete_option_image();

                }
            }
        });
    });

    function show_option_image(){
        $("#option_image_select_div a").on("click",function(){
            var scr = $(this).closest("div").prev().find("img").attr("src");
            var tmp = option_image_tmp.closest("div");
            tmp.find("img").remove();
            tmp.append('<img class="pull-right" width="60" height="40" src="'+scr+'"/>');
            //改变按钮功能
            option_image_tmp.text("去除照片");
            option_image_tmp.removeClass("btn-danger").addClass("btn-purple");
            $("#modal_option_image_select").modal('hide');
        });
    }

    function show_image_select(value){
        var values = value.split(":");
        var index = Math.floor(Math.random()*btn_color.length);
        var html = '<div class="pricing-span-body">\
            <div class="pricing-span">\
            <div class="widget-box pricing-box-small">\
                <div class="widget-body">\
                    <div class="widget-main no-padding">\
                        <ul class="list-unstyled list-striped pricing-table">\
                            <li>\
                                <img width="100" height="70" src="'+image_url+values[1]+'"/>\
                            </li>\
                        </ul>\
                        <div class="price">\
                            <span name="option_delete_span" class="label label-lg '+label_color[index]+' arrowed-in arrowed-in-right">'+values[0]+'\
                            </span>\
                        </div>\
                    </div>\
                    <div>\
                        <a href="#" class="btn btn-block btn-sm '+btn_color[index]+'">\
                            <span>选择</span>\
                        </a>\
                    </div>\
                </div>\
            </div>\
            </div>\
        </div>';
        return html;
    }

    $("#modal_option_image_select").on("hidden.bs.modal", function () {
        $("#option_image_select_div *").remove();
    });

    $("#upload_option_image_confirm").on("click", function(){

        var name = $("#upload_option_image_name").val();
        if (!name){
            $.gritter.add({
                title: "请输入名称",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/add/option/image",
            data: {name: name, path:upload_option_image},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '成功添加',
                        time: 2000,
                        class_name: 'gritter-success gritter-light'
                    });

                    //数据回显
                    var image_info = name+":"+upload_option_image;
                    var html = show_image_select(image_info);
                    $("#option_image_select_div").append(html);
                    show_option_image();
                    delete_option_image();

                    $("#modal_option_image_upload").modal("hide");
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

    });



    $("#modal_option_image_upload").on("hidden.bs.modal", function () {
        upload_option_image = "";
        //清空原来的内容
        $("#image_form3").remove();
        var photo_html = "<form id='image_form3' action='#' class='dropzone' method='post' enctype='multipart/form-data'>" +
            "<div class='fallback'><input name='file' type='file'/></div></form>";
        $("#modal_add_image_span3").append(photo_html);
        addImage3();
    });


    function delete_option_image(){
        $("#option_image_select_div span[name=option_delete_span]").on("click",function(){
            var name = $(this).text().trim();
            var pricing_span_body = $(this).closest(".pricing-span-body");
            bootbox.confirm("确认删除该照片？", function (result) {
                if (result) {
                    //确认
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/event/yy/delete/option/image",
                        data: {name: name},
                        success: function (data) {
                            if (data.code == 200) {
                                $.gritter.add({
                                    title: '照片删除成功！',
                                    time: 2000,
                                    class_name: 'gritter-success gritter-light'
                                });
                                pricing_span_body.remove();
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
    }



    $("#modal_add_more").on("click",function(){
        var index = Math.floor(Math.random()*header_color.length);
        var html = append_option_html_fn(index);
        $("#modal_add_yy_options").append(html)
            .find('a[name=option_remove_a]').on('click', function (e) {
                e.preventDefault();
                $(this).closest('.pricing-box').hide(300, function () {
                    $(this).remove();
                });
            });

//        $("#modal_add_yy_options select").selectpicker({
//            style: 'btn-success'
//        });

        reload_image_select();

    });

    $("#modal_edit_more").on("click",function(){
        var index = Math.floor(Math.random()*header_color.length);
        var html = append_option_html_fn(index);
        $("#modal_edit_yy_options").append(html)
            .find('a[name=option_remove_a]').on('click', function (e) {
                e.preventDefault();
                $(this).closest('.pricing-box').hide(300, function () {
                    $(this).remove();
                });
            });

//        $("#modal_edit_yy_options select").selectpicker({
//            style: 'btn-success'
//        });

        reload_image_select();

    });

    function append_edit_option_html_fn(name,roi,people,image,type){
        var index = Math.floor(Math.random()*header_color.length);
//        var select_html = "";
//        if (type == 0){
//            select_html = '<option selected value="0">默认</option><option value="1">图片靠左</option>';
//        } else if (type == 1){
//            select_html = '<option value="0">默认</option><option selected value="1">图片靠左</option>';
//        }
        var image_html = "";
        if (image){
            image_html = '<button name="select_image_bt" class="btn btn-purple btn-sm">去除照片</button><img class="pull-right" width="60" height="40" src="'+image_url+image+'"/>';
        } else {
            image_html = '<button name="select_image_bt" class="btn btn-danger btn-sm">选择照片</button>';
        }
        return '<div class="col-xs-6 col-sm-4 pricing-box">\
            <div class="widget-box">\
            <div class="widget-header '+header_color[index]+'">\
                <h5 class="bigger lighter">选项修改</h5>\
            </div>\
            <div class="widget-body">\
            <div class="widget-main">\
                <ul class="list-unstyled spaced2">\
                    <li>\
                        <input name="option_name" type="text" value="'+name+'" class="input-xlarge" placeholder="选项名称"/>\
                    </li>\
                    <li>\
                        <input name="option_roi" type="text" value="'+roi+'" class="input-xlarge" placeholder="对应赔率"/>\
                    </li>\
                    <li>\
                        <input name="option_people" type="text" value="'+people+'" class="input-xlarge" placeholder="投注人数"/>\
                    </li>\
                </ul>\
                <hr />\
                <div>'+image_html+'</div>\
                </div>\
                <div>\
                    <a name="option_remove_a" href="#" class="btn btn-block '+btn_color[index]+'">\
                        <i class="icon-remove bigger-110"></i>\
                        <span>移除</span>\
                    </a>\
                </div>\
            </div>\
            </div>\
        </div>';
    }


    function append_option_html_fn(index){
        return '<div class="col-xs-6 col-sm-4 pricing-box">\
            <div class="widget-box">\
            <div class="widget-header '+header_color[index]+'">\
                <h5 class="bigger lighter">选项添加</h5>\
            </div>\
            <div class="widget-body">\
            <div class="widget-main">\
                <ul class="list-unstyled spaced2">\
                    <li>\
                        <input name="option_name" type="text" class="input-xlarge" placeholder="选项名称（限定16个字）" maxlength="16"/>\
                    </li>\
                    <li>\
                        <input name="option_roi" type="text" class="input-xlarge" placeholder="对应赔率"/>\
                    </li>\
                </ul>\
                <hr />\
                <div>\
                    <button name="select_image_bt" class="btn btn-danger btn-sm">选择照片</button>\
                    </div>\
                </div>\
                <div>\
                    <a name="option_remove_a" href="#" class="btn btn-block '+btn_color[index]+'">\
                        <i class="icon-remove bigger-110"></i>\
                        <span>移除</span>\
                    </a>\
                </div>\
            </div>\
            </div>\
        </div>';
    }

    function reload_image_select(){
        $("#modal_add_yy_options button[name=select_image_bt], #modal_edit_yy_options button[name=select_image_bt]").on("click", function(){
            option_image_tmp = $(this);
            var text = option_image_tmp.text();
            if ("去除照片" == text){
                option_image_tmp.closest("div").find("img").remove();
                option_image_tmp.text("选择照片");
                option_image_tmp.addClass("btn-danger").removeClass("btn-purple");
            } else {
                $("#modal_option_image_select").modal({backdrop: 'static'});
            }

        });
    }

  // 隐藏押押
  function hideYY(id, hideFlag){
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: appName + "/event/yy/edit",
      data: {id: id, hide_flag: hideFlag},
      success: function (data) {
        if (data.code == 200) {
          //修改成功后，去掉该行记录
          $("#yy_wrap_" + id).hide(300);
          $("#toolbar_yy_num").html(--data_number);
          $.gritter.add({
            title: '操作成功',
            time: 800,
            class_name: 'gritter-info gritter-light'
          });
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

  reload_image_select();

});