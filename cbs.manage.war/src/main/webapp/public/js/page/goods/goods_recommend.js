define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min.js");
    require("../../modules/plugin/x-editable/ace-editable.min.js");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/jquery.bootstrap-growl.min");
    require("../../modules/plugin/bootstrap-select.min.js");
    require("../../modules/plugin/bootbox.min");



    //常量设置
    var head_url = "http://roi.skst.cn/";
    var upload_photo_key;
    var ids;


    getData();


    function getData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/recommend/list",
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.recommends, function (index, recommend) {
                            var htmlStr = showData(recommend.id, recommend.image, recommend.title, recommend.type, recommend.link, recommend.sort, recommend.create_time);
                            $("#mall_goods_table tbody").append(htmlStr);
                        });
                    } else {
                        $.bootstrapGrowl('服务器无数据返回！', {
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
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }

        });
    }


    function showData(id, image, title, type, link, sort, create_time) {
        var create_time_html = new Date(create_time).pattern("yyyy-MM-dd HH:mm");
        var type_html;
        if (type == 0) {
            type_html = '商品';
        } else if (type == 2) {
            type_html = '分类';
        } else if (type == 3) {
            type_html = '资讯';
        }

        var html = '<tr>\
            <td class="center">' + title + '</td>\
            <td class="center"><img width="160" height="90" src="' + head_url + image + '"/></td>\
            <td class="center">' + type_html + '</td>\
            <td class="center">' + link + '</td>\
            <td class="center">' + sort + '</td>\
            <td class="center">' + create_time_html + '</td>\
            <td class="center" title="' + id + '"><button class="btn btn-xs btn-info" > 修改 </button> <button class="btn btn-xs btn-danger" > 删除 </button>\
            </td></tr>';
        return html;
    }

    $('#mall_goods_table tbody').on('click', 'button.btn-danger', function () {
        var td = $(this).closest("td");
        var tr = $(this).closest("tr");
        ids = td.attr("title");

        bootbox.confirm("确定删除该导航？", function (result) {
            if (result) {
                //确认删除
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/goods/recommend/delete",
                    data: {id: ids},
                    success: function (data) {
                        if (data.flag) {
                            $.bootstrapGrowl("删除成功");
                            tr.remove();
                        }
                    },
                    error: function (XMLHttpRequest) {
                        $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
                    }

                });
            }
        });
    }).on('click', 'button.btn-info', function () {
        var td = $(this).closest("td");
        var tr = $(this).closest("tr");
        ids = td.attr("title");
        var title = tr.find("td:eq(0)").html();
        $("#modal_edit_goods_recommend_title").val(title);
        var type = tr.find("td:eq(2)").html();
        $("#modal_edit_goods_recommend_type").val(type);
        var link = tr.find("td:eq(3)").html();
        $("#modal_edit_goods_recommend_link").val(link);
        var sort = tr.find("td:eq(4)").html();
        $("#modal_edit_goods_recommend_sort").val(sort);

        $("#modal_goods_recommend_edit").modal({backdrop: 'static'});

    });


    function addImage() {
        $("#image_form").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/goods/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
//            uploadMultiple:false,
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传商品主图（一张）</span> \
                <span class="smaller-80 grey">(拖曳或者直接点击上传)</span> <br /> \
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
                            $.bootstrapGrowl("恭喜，已成功上传" + res.image_num + "张照片！");
                            upload_photo_key = res.key;
                        }
                        else {
                            $.bootstrapGrowl("上传失败，失败的原因是：" + res.msg);
                        }
                    }
                });
                this.on("addedfile", function (file) {
                });
                this.on("complete", function (data) {
                });
                this.on("removedfile", function (data) {
                    //如果是成功上传的照片，就进行相关的操作
                    if (data.accepted) {
                    }
                });
            }
        });
    }


    function addImage2() {
        $("#image_form2").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 15, // MB
            url: appName + "/goods/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-120 bolder"><i class="icon-caret-right red"></i> 上传图片替代原有的图片</span>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传十张照片，把已经上传的清除掉就能继续上传了',
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
                            //修改原有的图片
                            $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                url: appName + "/goods/recommend/edit",
                                data: {
                                    id: ids,
                                    oper:'edit',
                                    image: res.key
                                },
                                success: function (data) {
                                    if (data.code == 200) {
                                        $.bootstrapGrowl('恭喜您，修改成功！', {
                                            type: 'success' // (null, 'info', 'error', 'success')
                                        });
                                    } else {
                                        if (data.msg != "") {
                                            $.bootstrapGrowl(data.code + ":" + data.msg);
                                        } else {
                                            $.bootstrapGrowl('修改失败，请联系管理员！');
                                        }
                                    }
                                },
                                error: function (XMLHttpRequest) {
                                    $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
                                }
                            });
                        }
                        else {
                            $.bootstrapGrowl("上传失败，失败的原因是：" + res.msg);
                        }
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


    //修改标题

    $('#goods_recommend_title_bt').on("click",function(){
        var value = $('#modal_edit_goods_recommend_title').val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/recommend/edit",
            data: {
                id: ids,
                oper:'edit',
                title: value
            },
            success: function (data) {
                if (data.flag) {
                    $.bootstrapGrowl('恭喜您，修改成功！', {
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl('修改失败，请联系管理员！');
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }
        });
    });
//    $('#modal_edit_goods_recommend_title').editable({
//        type: 'text',
//        name: 'title',
//        success: function (response, newValue) {
//
//            newValue = newValue.trim();
//            //修改提交
//            $.ajax({
//                type: 'POST',
//                dataType: 'json',
//                url: appName + "/goods/recommend/edit",
//                data: {
//                    id: ids,
//                    oper:'edit',
//                    title: newValue
//                },
//                success: function (data) {
//                    if (data.code == 200) {
//                        $.bootstrapGrowl('恭喜您，修改成功！', {
//                            type: 'success' // (null, 'info', 'error', 'success')
//                        });
//                    } else {
//                        if (data.msg != "") {
//                            $.bootstrapGrowl(data.code + ":" + data.msg);
//                        } else {
//                            $.bootstrapGrowl('修改失败，请联系管理员！');
//                        }
//                    }
//                },
//                error: function (XMLHttpRequest) {
//                    $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
//                }
//            });
//        }
//
//    });

    //修改链接
//    $('#modal_edit_goods_recommend_link').editable({
//        type: 'text',
//        name: 'title',
//        success: function (response, newValue) {
//
//            newValue = newValue.trim();
//            //修改提交
//            $.ajax({
//                type: 'POST',
//                dataType: 'json',
//                url: appName + "/goods/recommend/edit",
//                data: {
//                    id: ids,
//                    oper:'edit',
//                    link: newValue
//                },
//                success: function (data) {
//                    if (data.code == 200) {
//                        $.bootstrapGrowl('恭喜您，修改成功！', {
//                            type: 'success' // (null, 'info', 'error', 'success')
//                        });
//                    } else {
//                        if (data.msg != "") {
//                            $.bootstrapGrowl(data.code + ":" + data.msg);
//                        } else {
//                            $.bootstrapGrowl('修改失败，请联系管理员！');
//                        }
//                    }
//                },
//                error: function (XMLHttpRequest) {
//                    $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
//                }
//            });
//        }
//
//    });

    $('#goods_recommend_link_bt').on("click",function(){
        var value = $('#modal_edit_goods_recommend_link').val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/recommend/edit",
            data: {
                id: ids,
                oper:'edit',
                link: value
            },
            success: function (data) {
                if (data.flag) {
                    $.bootstrapGrowl('恭喜您，修改成功！', {
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl('修改失败，请联系管理员！');
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }
        });
    });


    $('#goods_recommend_sort_bt').on("click",function(){
        var value = $('#modal_edit_goods_recommend_sort').val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/recommend/edit",
            data: {
                id: ids,
                oper:'edit',
                sort: value
            },
            success: function (data) {
                if (data.flag) {
                    $.bootstrapGrowl('恭喜您，修改成功！', {
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl('修改失败，请联系管理员！');
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }
        });
    });

    //修改排序
//    $('#modal_edit_goods_recommend_sort').editable({
//        type: 'text',
//        name: 'number',
//        success: function (response, newValue) {
//
//            newValue = newValue.trim();
//            if (isNaN(newValue)) {
//                $.gritter.add({
//                    title: '请输入数字！',
//                    time: 2000,
//                    class_name: 'gritter-error gritter-center'
//                });
//                return;
//            }
//            //修改提交
//            $.ajax({
//                type: 'POST',
//                dataType: 'json',
//                url: appName + "/goods/recommend/edit",
//                data: {
//                    id: ids,
//                    oper:'edit',
//                    sort: newValue
//                },
//                success: function (data) {
//                    if (data.code == 200) {
//                        $.bootstrapGrowl('恭喜您，修改成功！', {
//                            type: 'success' // (null, 'info', 'error', 'success')
//                        });
//                    } else {
//                        if (data.msg != "") {
//                            $.bootstrapGrowl(data.code + ":" + data.msg);
//                        } else {
//                            $.bootstrapGrowl('修改失败，请联系管理员！');
//                        }
//                    }
//                },
//                error: function (XMLHttpRequest) {
//                    $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
//                }
//            });
//        }
//
//    });



    $("#goods_recommend_type_select").selectpicker({
        style: 'btn-success'
    });

    $("#edit_main span.editable-clear-x").on("click",function(){
       $(this).prev().val("");
    });

    $('#goods_recommend_type_bt').on("click",function(){
        var value = $('#goods_recommend_type_select').val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/recommend/edit",
            data: {
                id: ids,
                oper:'edit',
                type: value
            },
            success: function (data) {
                if (data.flag) {
                    $.bootstrapGrowl('恭喜您，修改成功！', {
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl('修改失败，请联系管理员！');
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }
        });
    });

    //修改类型
//    var goods_recommend_type = [];
//    $.each({ "0": "商品", "2": "分类", "3": "资讯"}, function (k, v) {
//        goods_recommend_type.push({id: k, text: v});
//    });
//
//    $('#modal_edit_goods_recommend_type').editable({
//        type: 'select',
//        source: goods_recommend_type,
//        success: function (response, newValue) {
//            var init_goods_recommend_type = 0;
//            if (newValue == "分类") {
//                init_goods_recommend_type = 2;
//            } else if (newValue == "商品"){
//                init_goods_recommend_type = 0;
//            } else if (newValue == "资讯"){
//                init_goods_recommend_type = 3;
//            }
//            //修改提交
//            $.ajax({
//                type: 'POST',
//                dataType: 'json',
//                url: appName + "/goods/recommend/edit",
//                data: {
//                    id: ids,
//                    oper:'edit',
//                    type: init_goods_recommend_type
//                },
//                success: function (data) {
//                    if (data.code == 200) {
//                        $.bootstrapGrowl('恭喜您，修改成功！', {
//                            type: 'success' // (null, 'info', 'error', 'success')
//                        });
//                    } else {
//                        if (data.msg != "") {
//                            $.bootstrapGrowl(data.code + ":" + data.msg);
//                        } else {
//                            $.bootstrapGrowl('修改失败，请联系管理员！');
//                        }
//                    }
//                },
//                error: function (XMLHttpRequest) {
//                    $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
//                }
//            });
//        }
//    });


    $("#upload").on('click', function () {

        var goods_title = $("#goods_title").val();
        var optionsRadios = $('#optionsRadios input:checked').val();
        var addresslink;
        if (optionsRadios == 2) {
            addresslink = $("#link_data select").val();
        } else {
            addresslink = $("#addresslink").val();
        }
        var sort = $("#sort").val();
        if (!sort) {
            sort = 0;
        }
        if (!upload_photo_key || !goods_title || !optionsRadios || !addresslink || !sort) {
            $.bootstrapGrowl("5个值都必须有！");
            return ;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/recommend/edit",
            data: {
                image: upload_photo_key,
                title: goods_title,
                type: optionsRadios,
                link: addresslink,
                sort: sort,
                oper: 'add'
            },
            success: function (data) {
                if (data.flag) {
                    $.bootstrapGrowl("添加成功");
                    window.location.reload(true);
                    //关闭modal窗口
                    //$("#modal_goods_edit").modal('hide');
                } else {
                    $.bootstrapGrowl(data.code + ":" + data.msg);
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }

        });
    });


    var category_html;

    $("#optionsRadios input").on("change", function () {


        var value = $(this).val();
        if (value == 2) {

            if (!category_html) {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/goods/get/categorys",
                    success: function (data) {
                        if (data.code == 200) {

                            var values = "";
                            if (data.number > 0) {
                                $.each(data.categoryList, function (index, value) {
                                    values += '<option value="' + value.id + '">' + value.name + '</option>';
                                });
                                category_html = '<select title="请选择分类名称" class="width-40 form-control selectpicker">' + values + '</select>';

                                $("#link_data input").remove();
                                $("#link_data").append(category_html);
                                $("#link_data select").selectpicker({
                                    style: 'btn-success'
                                });
                            }


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
            } else {
                $("#link_data input").remove();
                $("#link_data").append(category_html);
                $("#link_data select").selectpicker({
                    style: 'btn-success'
                });
            }
        } else {
            $("#link_data *").remove();
            $("#link_data").append('<input type="text" class="form-control" name="link" id="addresslink">');
        }

    });





});