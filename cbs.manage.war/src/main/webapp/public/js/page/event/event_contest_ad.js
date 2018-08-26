define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/datepicker.zh-CN.js");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/bootstrap-timepicker.min.js");
    require("../../modules/lib/datepicker");
    require("../../modules/plugin/bootstrap-select.min.js");

    //图片的前缀
    var image_url = "http://roi.skst.cn/";
    var upload_photos = "";
    var contest_type = null;
    var start_id;
    //是否隐藏
    var hide_flag = true;
    
    var ad_id;

    getData();
    
    //模态窗口打开
    $("#ad_add_bt").on("click", function () {
        $("#modal_ad_add").modal({backdrop: 'static'});
    });
    
    function getData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/contest/ad/list",
            data: {contestType: contest_type, startId: start_id, hideFlag: hide_flag},
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {

                    	start_id = data.startId;
                    	
                    	//加载数据
                        $.each(data.ads, function (index, bean) {
                            var htmlStr = showData(bean.id, bean.contestId,bean.contestType,bean.title, bean.text, bean.images, bean.hideFlag,bean.createTime);
                            $("#contest_ad_table tbody").append(htmlStr);
                        });
                        
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
    
    
    function showData(id, contestId,contestType,title, text, images, hideFlag,createTime) {
    	var contestTypeHtml ="";
        if (title.length > 15) {
            title = title.substr(0, 13) + "……";
        }
        if (text.length > 40) {
            text = text.substr(0, 38) + "……";
        }
        createTime = new Date(createTime).pattern("yy-MM-dd HH:mm");
        var btn_html = '<button class="btn btn-xs btn-edit">编辑</button>  ';
        if (contestType == 0) {
        	contestTypeHtml = '足球';
        } else if (contestType == 1) {
        	contestTypeHtml = '篮球';
        } else if (contestType == 10) {
        	contestTypeHtml = '押押';
        } 
        
        if(hideFlag){
        	btn_html+='<button class="btn btn-xs btn-hidden">隐藏</button>';
        } else{
        	btn_html+='<button class="btn btn-xs btn-display">显示</button>';
        }
        
        var html = '<tr>\
            <td class="center">' + id + '</td>\
            <td>\
            <div class="col-sm-3">\
                <img width="80" height="60" src="' + image_url + images + '"></div>\
                <div class="col-sm-9">\
                    <b>' + title + '</b>\
                    <p class="smaller-80">' + text + '</p>\
                </div>\
            </td>\
            <td class="center">' + contestTypeHtml + '</td>\
            <td class="center">' + contestId + '</td>\
            <td class="center">' + createTime + '</td>\
            <td class="center" id="' + id + '"><div>\
                    ' + btn_html + '</div>\
            </td></tr>';
        return html;
    }
    
    
    
    $("#dropdown_all").on("click", function (e) {
        e.preventDefault();
        hide_flag="";
        $("#contest_ad_table tbody tr").remove();
        $("#dropdown_all_i").removeClass("invisible");
        $("#dropdown_hide_i").addClass("invisible");
        $("#dropdown_display_i").addClass("invisible");
        getData();
    });

    $("#dropdown_hide").on("click", function (e) {
        e.preventDefault();
        hide_flag=false;
        start_id="";
        $("#contest_ad_table tbody tr").remove();
        $("#dropdown_all_i").addClass("invisible");
        $("#dropdown_hide_i").removeClass("invisible");
        $("#dropdown_display_i").addClass("invisible");
        getData();
    });

    $("#dropdown_display").on("click", function (e) {
        e.preventDefault();
        hide_flag=true;
        start_id="";
        $("#contest_ad_table tbody tr").remove();
        $("#dropdown_all_i").addClass("invisible");
        $("#dropdown_hide_i").addClass("invisible");
        $("#dropdown_display_i").removeClass("invisible");
        getData();
    });
    
    
    $("#modal_add_yy_button").on("click", function () {
        //获得输入的值
        var ad_title = $("#modal_add_title").val();
        var ad_text = $("#modal_add_text").val();

        var ad_contest_type = $('input[name="modal_contest_type"]').filter(':checked').val();
        
        var ad_contest_id = $("#modal_add_contest_id").val();
        
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

        //赛事广告添加
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/contest/ad/add",
            data: {title: ad_title, text: ad_text, images: photos, contestType:ad_contest_type,contestId:ad_contest_id},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '添加成功，刷新数据即可看到！',
                        time: 2000,
                        class_name: 'gritter-info gritter-light'
                    });
                    $("#contest_ad_table tbody").html("");
                    getData();
                    $("#modal_ad_add").modal("hide");
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
            url: appName + "/event/contest/ad/add/image",
            maxFiles: 10,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            uploadMultiple: true,
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传押押照片</span> \
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
            url: appName + "/event/contest/ad/add/image",
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
                        
                        $("#modal_edit_image").val(res.key);
                        
                    }
                });
            }
        });
    }

    try {
        addImage();
        addImage2();
    } catch (e) {
        alert('Dropzone.js does not support older browsers!');
    }

    /**
     * ======================================================
     * 添加押押照片 end
     * */

    $('#contest_ad_table tbody').on('click', 'button.btn-display',function () {
        var td = $(this).closest("td");
        ad_id = td.attr("id");

        bootbox.confirm("确定显示该广告?", function (result) {
            if (result) {
                //确认隐藏
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/event/contest/ad/edit",
                    data: {id: ad_id, hideFlag: true},
                    success: function (data) {
                        if (data.code == 200) {
                            //修改成功后，去掉该行记录
                            td.closest("tr").remove();
                            $.gritter.add({
                                title: '隐藏成功',
                                time: 2000,
                                class_name: 'gritter-info gritter-light'
                            });
                            $("#contest_ad_table tbody").html("");
                            start_id="";
                            getData();
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
    }).on('click', 'button.btn-hidden',function () {
        var td = $(this).closest("td");
        ad_id = td.attr("id");

        bootbox.confirm("确定隐藏该广告?", function (result) {
            if (result) {
                //确认隐藏
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/event/contest/ad/edit",
                    data: {id: ad_id, hideFlag: false},
                    success: function (data) {
                        if (data.code == 200) {
                            //修改成功后，去掉该行记录
                            td.closest("tr").remove();
                            $.gritter.add({
                                title: '显示成功',
                                time: 2000,
                                class_name: 'gritter-info gritter-light'
                            });
                            $("#contest_ad_table tbody").html("");
                            start_id="";
                            getData();
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
    }).on('click', 'button.btn-edit', function () {
        var td = $(this).closest("td");
        ad_id = td.attr("id");
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/contest/ad/one",
            data: {id: ad_id},
            success: function (data) {
                if (data.code == 200) {
                    $("#modal_edit_id").val(data.ad.id);
                    $("#modal_edit_title").val(data.ad.title);
                    $("#modal_edit_text").val(data.ad.text);
                    $("#modal_edit_contest_id").val(data.ad.contestId);
                    $("#modal_edit_images").val(data.ad.images);
                    
                    $("input[name='modal_edit_contest_type'][value="+data.ad.contestType+"]").attr("checked",true); 
                    
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

        $("#modal_ad_edit").modal({backdrop: 'static'});

    });

    
    $("#modal_add_ad_button").on("click", function () {

    	 //获得输入的值
    	var ad_id = $("#modal_edit_id").val();
        var ad_title = $("#modal_edit_title").val();
        var ad_text = $("#modal_edit_text").val();

        var ad_contest_type = $('input[name="modal_edit_contest_type"]').filter(':checked').val();
        
        var ad_contest_id = $("#modal_edit_contest_id").val();
        
        var ad_contest_images = $("#modal_edit_images").val();
        
        var photos = $("#modal_edit_image").val();
        
        if(photos){
        	ad_contest_images = photos;
        }
        
        $.ajax({
        	 type: 'POST',
             dataType: 'json',
             url: appName + "/event/contest/ad/update",
             data: {id:ad_id,title: ad_title, text: ad_text, images: ad_contest_images, contestType:ad_contest_type,contestId:ad_contest_id},
             success: function (data) {
                 if (data.code == 200) {
                     $.gritter.add({
                         title: '添加成功，刷新数据即可看到！',
                         time: 2000,
                         class_name: 'gritter-info gritter-light'
                     });
                     $("#contest_ad_table tbody").html("");
                     $("#modal_ad_edit").modal("hide");
                     start_id="";
                     getData();
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
    
    //继续加载数据
    $('#yy_data_more,#yy_data_hide_more').on(ace.click_event, function () {
        getData();
    });
});