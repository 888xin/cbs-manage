/**
 * Created by lhx on 16-3-22.
 */
define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min.js");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/fuelux/fuelux.wizard.min.js");
    require("../../modules/plugin/jquery.hotkeys.min");
    require("../../modules/plugin/bootstrap-wysiwyg.min");
    require("../../modules/plugin/jquery.validate.min.js");
    require("../../modules/plugin/bootstrap-select.min.js");
    require("../../modules/plugin/swiper.min.js");


    var category_main_photo;
    var image_url = "http://roi.skst.cn/";
    var goods_roll_image;
    var goods_main_image;
    var category_id = null;

    function gridDiv(id, name, path, status) {
        var color_html = '<span class="lbl bigger-120"> ' + name + ' </span>';
        if (status != 0) {
            color_html = '<span class="lbl bigger-120 orange2">' + name + ' </span>';
        }
        var html = '<div class="grid4">\
                        <div class="radio">\
                            <label>\
                                <input name="goods_category" type="checkbox" value="' + id + '" title="' + name + '" class="ace ace-checkbox-2"/>\
                                ' + color_html + '\
                            </label>\
                            <img width="90" height="60" src="' + image_url + path + '">\
                        </div>\
                     </div>';
        return html;
    }


    function categorys(category) {
        var html = "";
        $.each(category, function (index, value) {

            //index从0开始

            var num = index % 4;
            if (num == 0) {
                html += ('<div>' + gridDiv(value.id, value.name, value.path, value.status));
            } else if (num == 3) {
                html += (gridDiv(value.id, value.name, value.path, value.status) + '<div>');
            } else {
                html += gridDiv(value.id, value.name, value.path, value.status);
            }
        });
        return html;

    }

    getCategorys();

    function getCategorys() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/get/categorys",
            success: function (data) {
                if (data.code == 200) {

                    if (data.number > 0) {
                        var html = categorys(data.categoryList);
                        $("#goods_category").append(html);
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

    $("#category_name").on("blur", function () {
        var name = $(this).val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/get/category",
            data: {
                name: name
            },
            success: function (data) {
                if (data.code == 200) {

                    if (!category_id && data.category.id) {
                        category_id = data.category.id;
                        $("#category_descr").val(data.category.descr);
                        $("#category_sort").val(data.category.sort_index);
                        $("#category_add_bt").addClass("disabled");
                        $("#category_edit_bt").removeClass("disabled");
                        $("#category_delete_bt").removeClass("disabled");
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

    });

//    $("#goods_standard select[name='standard_value']").selectpicker({
//        style: 'btn-success'
//    });


    function img_link_arr() {
        var img_arr = [];
        $(".giftDes img").each(function () {
            img_arr.push($(this).attr("data-src"));
        });
        img_arr = img_arr.join(",");
        return img_arr;
    }

    $("#select_delete_bt").on("click",function () {
        var category_ids = "";
        $("#goods_category input:checked").each(function () {
            var checked = $(this).val();
            category_ids += checked + ",";
            $(this).next("span").addClass("orange2");
        });
        if (category_ids){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/batch/category",
                data: {
                    ids: category_ids,
                    status: -1
                },
                success: function (data) {
                    if (data.code == 200) {
                        $.bootstrapGrowl('添加成功！', {
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
        }
        return false ;
    });

    $("#select_show_bt").on("click",function () {
        var category_ids = "";
        $("#goods_category input:checked").each(function () {
            var checked = $(this).val();
            category_ids += checked + ",";
            $(this).next("span").removeClass("orange2");
        });
        if (category_ids){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/batch/category",
                data: {
                    ids: category_ids,
                    status: 0
                },
                success: function (data) {
                    if (data.code == 200) {
                        $.bootstrapGrowl('添加成功！', {
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
        }
        return false ;
    });


    $('#fuelux-wizard').ace_wizard().on('change', function (e, info) {
        if (info.step == 1) {
            //步骤一触发
            var check_box = $('#goods_category input:checked');
            if (check_box.length > 1){
                $.gritter.add({
                    title: "商品只能选择一个分类",
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return false;
            }
            if (check_box.next("span").hasClass("orange2")){
                $.gritter.add({
                    title: "请选择黑色字体的分类，橙色字体的分类为隐藏分类，在应用页面不会显示",
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return false;
            }
            var goods_category = check_box.attr("title");
            if (!goods_category) {
                $.gritter.add({
                    title: "商品必须选择一个分类",
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return false;
            }
            $('#goods_category_span').html(goods_category);
        }
        if (info.step == 2) {
            //步骤二触发

            if (!$('#validation-form').valid()) {
                return false;
            } else {
                $(".exchange-warp .price span").text($('#goods_price').val());
                $(".exchange-warp .giftName").text($('#goods_name').val());
                var roll_image = [];
                var main_image = $(".show_img2>div img").attr("data-src");
                ;
                $(".show_img3>div").each(function () {
                    roll_image.push($(this).find("img").attr("data-src"));
                });
                if (!main_image) {
                    $.gritter.add({
                        title: "商品必须有主图",
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
                    return false;
                }
                goods_main_image = main_image;
                goods_roll_image = "";
                if (roll_image.length != 0) {
                    if (roll_image.length == 1) {
                        $(".swiper-container").hide();
                        $(".singer").html("<img src='http://roi.skst.cn/" + roll_image[0] + "'/>");
                        $(".singer img").height("320px");
                        goods_roll_image = roll_image[0];
                    } else {
                        $(".swiper-container").show();
                        $(".swiper-wrapper,.singer").html("")
                        $.each(roll_image, function (k, v) {
                            var roll_html = "<div class='swiper-slide'><img src='http://roi.skst.cn/" + v + "'/></div>"

                            goods_roll_image += v + ",";
                            $(".swiper-wrapper").append(roll_html);
                        });
                        //去掉最后的逗号
                        goods_roll_image = goods_roll_image.substring(0, goods_roll_image.length - 1);
                        $(".swiper-slide img").height("320px");
                        setTimeout(function () {
                            s = new Swiper('.swiper-container', {
                                pagination: '.swiper-pagination',
                                paginationClickable: true,
                                observer: true,
                                loop: true
                            });
                        }, 1000);
                    }
                } else {
                    $(".swiper-container").hide();
                    $(".singer").html("<img src='http://roi.skst.cn/" + main_image + "'/>");
                    $(".singer img").height("320px");
                    goods_roll_image = main_image;
                }
            }
        }
    }).on('finished', function (e) {
        //整个流程完成触发


        //提交信息

        var goods_category = $('#goods_category input:checked').val();
        var goods_type = $('#goods_type input:checked').val();
        var goods_status = $('#goods_status input:checked').val();

        var goods_props = "";
        var flag = false;
        var num = 1;
        $("#goods_standard").find(".col-sm-9").each(function () {
            if (num) {
                num = 0;
                return true;
            }
            var key = $(this).find("select[title='请选择规格名称']").val();
            var value = $(this).find("select[name='standard_value']").val();
            if (!key || !value) {
                flag = true;
                return false;
            }
            goods_props += key + ":" + value + ";";
        });
        if (goods_props) {
            goods_props = goods_props.substring(0, goods_props.length - 1);
        }
        if (flag) {
            $.gritter.add({
                title: "额外参数名或值不能缺一！",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }

        var goods_name = $('#goods_name').val();
        var goods_price = $('#goods_price').val();
        var goods_original = $('#goods_original').val();
        var goods_stock = $('#goods_stock').val();
        var goods_postage = $('#goods_postage').val();
        var goods_sort_index = $('#goods_sort_index').val();
        var goods_desc = $('#goods_desc').html();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/edit",
            data: {
                category_id: goods_category,
                name: goods_name,
                descr: goods_desc,
                path: goods_main_image,
                path_more: goods_roll_image,
                price: goods_price,
                original: goods_original,
                postage: goods_postage,
                type: goods_type,
                stock: goods_stock,
                ex_prop: goods_props,
                status: goods_status,
                sort_index: goods_sort_index
            },
            success: function (data) {
                if (data.code == 200) {
                    bootbox.dialog({
                        message: "运营的伙伴！你又成功添加了一件商品，使我们的商城更火热了，继续加油！",
                        buttons: {
                            "success": {
                                "label": "好的",
                                "className": "btn-sm btn-primary"
                            }
                        }
                    });
                    $('#goods_name').val("");
                    $('#fuelux-wizard li[data-target="#step1"]').trigger("click");

                    var goods_recommend = $('#goods_recommend input:checked').val();
                    if (goods_recommend == 1) {
                        if (goods_status == 1) {
                            //满足立即开售条件
                            //立即推荐
                            var goods_id = data.goods.id;
                            if (goods_id) {
                                $.ajax({
                                    type: 'POST',
                                    dataType: 'json',
                                    url: appName + "/goods/save/recommendId",
                                    data: {id: goods_id}
                                });
                            }
                        }
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


    }).on('stepclick', function (e) {
        //return false;//prevent clicking on steps
        //点击已经完成的圆圈触发
    });


    $("#goods_status input").on("click", function () {
        var value = $(this).val();
        if (value == 1) {
            //推荐可用
            $("#goods_recommend label:eq(0)").removeClass("hide");
        } else {
            //推荐不可用
            $("#goods_recommend label:eq(0)").addClass("hide");
            $("#goods_recommend input[value=0]").get(0).checked = true;
        }
    });


    $('#validation-form').validate({
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        rules: {
            email: {
                required: true,
                email: true
            },
            password2: {
                required: true,
                minlength: 5,
                equalTo: "#password"
            },
            goods_stock: {
                required: true,
                digits: true //验证是否为整数
            },
            goods_price: {
                required: true,
                number: true //验证是否为数字
            },
            goods_original: {
                required: true,
                number: true //验证是否为数字
            },
            goods_sort_index: {
                required: true,
                digits: true //验证是否为整数
            },
            goods_name: 'required'
        },

        messages: {
            goods_stock: {
                required: "总库存必须有数量",
                digits: "总库存数量必须是整数"
            },
            goods_price: {
                required: "商品售价必须添加",
                number: "商品售价必须是数字"
            },
            goods_original: {
                required: "商品原价必须添加",
                number: "商品原价必须是数字"
            },
            goods_sort_index: {
                required: "商品排序值必须添加",
                digits: "商品排序值必须是整数"
            },
            goods_name: "商品名不能为空"
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


    $('#modal-wizard .modal-header').ace_wizard();
    $('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');

    function addImage2() {
        $("#image_form2").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/goods/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传商品主图（一张）</span> \
            <span class="smaller-80 grey">(主图显示在商品列表中)</span> <br /> \
            <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传一张照片！',
            dictFileTooBig: '只能上传不超过10M的照片！',
            dictInvalidInputType: '只能是jpg/jpeg/bmp/gif/png格式的照片！',

            //change the previewTemplate to use Bootstrap progress bars
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
            init: function () {
                var upload_photo_key;
                this.on("success", function (data) {
                    //当上传完成后的事件，接受的数据为JSON格式
                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                        var res = eval('(' + data.xhr.responseText + ')');
                        if (res.flag) {
                            $.gritter.add({
                                title: "恭喜，已成功上传" + res.image_num + "张照片！",
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
                            });

                            upload_photo_key = res.key;
                            var show_image = "<img data-src='" + res.key + "' src='http://roi.skst.cn/" + res.key + "'/>"
                            $(".show_img2").append("<div>" + show_image + "</div>");
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
                    data.url = upload_photo_key
                });
                this.on("removedfile", function (data) {
                    //如果是成功上传的照片，就进行相关的操作
                    if (data.accepted) {
                        if (data.url == $(".show_img2>div img").attr("data-src")) {
                            $(".show_img2>div").remove();
                        }
                    }
                });
            }
        });
    }


    function addImage1() {
        $("#image_form1").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/goods/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传商品分类图（一张）</span> \
            <span class="smaller-80 grey">(拖曳或者直接点击上传)</span> <br /> \
            <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传一张照片！',
            dictFileTooBig: '只能上传不超过10M的照片！',
            dictInvalidInputType: '只能是jpg/jpeg/bmp/gif/png格式的照片！',

            //change the previewTemplate to use Bootstrap progress bars
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
            init: function () {
                var upload_photo_key;
                this.on("success", function (data) {
                    //当上传完成后的事件，接受的数据为JSON格式
                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                        var res = eval('(' + data.xhr.responseText + ')');
                        if (res.flag) {
                            $.gritter.add({
                                title: "恭喜，已成功上传" + res.image_num + "张照片！",
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
                            });

                            category_main_photo = res.key;
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
                    //如果是成功上传的照片，就进行相关的操作
                });
            }
        });
    }


    function addImage3() {
        $("#image_form3").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/goods/add/image",
            maxFiles: 5,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传商品轮播图（五张）</span> \
            <span class="smaller-80 grey">(轮播图用于商品详情页面显示在页眉)</span> <br /> \
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
                                title: "恭喜，已成功上传" + res.image_num + "张照片！",
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
                            });

                            upload_photo_key = res.key;
                            var show_image = "<img data-src='" + res.key + "' src='http://roi.skst.cn/" + res.key + "'/>"
                            $(".show_img3").append("<div>" + show_image + "</div>");
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
                    data.url = upload_photo_key;
                });
                this.on("removedfile", function (data) {
                    //如果是成功上传的照片，就进行相关的操作
                    if (data.accepted) {
                        $(".show_img3>div").each(function () {
                            if (data.url == $(this).find("img").attr("data-src")) {
                                $(this).remove();
                            }
                        });
                    }
                });
            }
        });
    }


    try {
        addImage1();
        addImage2();
        addImage3();
    } catch (e) {
        alert('Dropzone.js does not support older browsers!');
    }


    /**
     * add by lhx on 16-3-25
     */

    $("#goods_recommend input[value=0]").get(0).checked = true;
    $("#goods_type input[value=0]").get(0).checked = true;
    $("#goods_status input[value=1]").get(0).checked = true;


    $("#category_add_bt").on("click", function () {

        var category_name = $("#category_name").val();
        var category_descr = $("#category_descr").val();
        var category_sort = $("#category_sort").val();
        if (!category_name || !category_main_photo || !category_descr || !category_sort) {
            $.gritter.add({
                title: "四个值不能有一个为空",
                time: 2000,
                class_name: 'gritter-warning gritter-center'
            });
            return false;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/edit/category",
            data: {
                id: category_id,
                name: category_name,
                path: category_main_photo,
                descr: category_descr,
                sortIndex: category_sort
            },
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl('添加成功！', {
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


    $("#category_edit_bt").on("click", function () {

        var category_name = $("#category_name").val();
        var category_descr = $("#category_descr").val();
        var category_sort = $("#category_sort").val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/edit/category",
            data: {
                id: category_id,
                name: category_name,
                path: category_main_photo,
                descr: category_descr,
                sortIndex: category_sort
            },
            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl('修改成功！', {
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


    $("#category_delete_bt").on("click", function () {

        bootbox.confirm("要删除该类别，请先确认该类别下的所有商品已经下架，否则会删除失败！删除该类别后无法恢复！", function (result) {
            if (result) {
                //确认删除
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/goods/delete/category",
                    data: {
                        id: category_id
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            $.bootstrapGrowl('删除成功！', {
                                type: 'success' // (null, 'info', 'error', 'success')
                            });
                            $("#category_add_modal").modal("hide");
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
        });

    });

    $("#category_add_modal").on("hidden.bs.modal", function () {
        category_id = null;
        $("#category_name").val("");
        $("#category_descr").val("");
        $("#category_sort").val("");
        $("#category_add_bt").removeClass("disabled");
        $("#category_edit_bt").addClass("disabled");
        $("#category_delete_bt").addClass("disabled");
    });

    $("#category_add_modal").on("shown.bs.modal", function () {
        $("#category_name").val("");
        //（需要修改的话请输入已经存在的分类名，再点击其他地方，按钮可用，便可修改）
        $.gritter.add({
            title: '温馨提示',
            text: '需要修改的话请输入已经存在的分类名，再点击其他地方，修改按钮变为可用，便可修改提交。修改按钮已变为可用的话，关闭弹出的窗口，重新点击添加按钮便可添加。',
            image: appName + '/public/images/dog.gif',
            time: '6000',
            class_name: 'gritter-info'
        });
    });


    $("#modal_add_more_spec").on("click", function () {

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/get/spec/keys",

            success: function (data) {
                if (data.code == 200) {

                    var keys = data.keys;
                    var values = "";
                    if (keys) {
                        $.each(keys, function (index, key) {
                            values += '<option value="' + key + '">' + key + '</option>';
                        });
                    }

                    var num = Math.random() * 1000;
                    $("#goods_standard").append('<div class="form-group">\
                        <label class="col-sm-3 control-label no-padding-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>\
                        <div class="col-sm-9">\
                            <select title="请选择规格名称" name="' + num + '" class="width-30 form-control selectpicker" data-mobile="true">\
                                ' + values + '\
                            </select>\
                            <a href="#" data-action="delete" class="middle">\
                                <i class="icon-trash red bigger-150 middle"></i>\
                            </a>\
                        </div></div>')
                        .find('a[data-action=delete]').on('click', function (e) {
                        e.preventDefault();
                        $(this).closest('.form-group').hide(300, function () {
                            $(this).remove();
                        });
                    });

                    $("#goods_standard select[name='" + num + "']").selectpicker({
                        style: 'btn-success'
                    });

                    change_key(num);


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


    function change_key(num) {

        $("#goods_standard select[name='" + num + "']").on("change", function () {
            var key = $(this).val();
            var tmp = $(this).closest(".col-sm-9");

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/get/spec",

                data: {
                    key: key
                },
                success: function (data) {
                    if (data.code == 200) {

                        tmp.find("select[name='standard_value']").remove();
                        tmp.find(".show-menu-arrow").remove();
                        tmp.find("a[data-action=delete]").remove();

                        var values = data.values;
                        var values_html = "";
                        if (values) {
                            $.each(values, function (index, value) {
                                values_html += '<option value="' + value + '">' + value + '</option>';
                            });
                        }

                        tmp.append('<select name="standard_value" class="width-30 show-menu-arrow form-control" multiple>\
                        ' + values_html + '</select><a href="#" data-action="delete" class="middle">\
                            <i class="icon-trash red bigger-150 middle"></i>\
                        </a>').find('a[data-action=delete]').on('click', function (e) {
                            e.preventDefault();
                            $(this).closest('.form-group').hide(300, function () {
                                $(this).remove();
                            });
                        });

                        $("#goods_standard select[name='standard_value']").selectpicker({
                            style: 'btn-success'
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

    }


    $("#goods_standard_value").on("focus", function () {
        var tmp = $(this);
        var goods_standard_key = $("#goods_standard_key").val();
        if (!goods_standard_key) {
            return;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/get/spec",

            data: {
                key: goods_standard_key
            },
            success: function (data) {
                if (data.code == 200) {

                    var values = data.values;
                    if (values) {
                        tmp.val(values);
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

    });


    $("#goods_standard_save_bt").on("click", function () {
        var goods_standard_key = $("#goods_standard_key").val();
        var goods_standard_value = $("#goods_standard_value").val();
        if (!goods_standard_value || !goods_standard_key) {
            $.bootstrapGrowl("规格项目和对应的项目值都不能为空！");
            return;
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/save/spec",

            data: {
                key: goods_standard_key,
                value: goods_standard_value
            },
            success: function (data) {
                if (data.code == 200) {

                    $.bootstrapGrowl('添加成功！', {
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