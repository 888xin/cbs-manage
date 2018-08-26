/**
 * Created by lhx on 16-2-25.
 */
define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min");
    require("../../modules/plugin/jquery.validate.min.js");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/jquery.bootstrap-growl.min");
    require("../../modules/plugin/jquery.gritter.min");



    //变量

    var valid;
    var start_id;
    var siblings;
    var content_image = "http://roi.skst.cn/";
     //默认选中文章
    $("#modal_add_boot_type input[value=1]").get(0).checked = true;
    
    
    $("#alert_add_boot").on("click", function () {
        $("#modal_boot_add").modal({backdrop: 'static'});
    });

    $("#modal_add_bt").on("click", function () {
    	//先判断是否有没输入字段
    	if($("#modal_add_boot_link").val()==null || $("#modal_add_boot_link").val()==""){
    		alert("请输入跳转链接");
    		return false;
    	}
    	if($("#modal_add_time").val()==null || $("#modal_add_time").val()==""){
    		alert("请输入跳转停留时间");
    		return false;
    	}
    	//添加开机动画，获取各个字段
        var modal_add_boot_link = $("#modal_add_boot_link").val().trim(); //跳转的链接
        var modal_add_boot_type = $('#modal_add_boot_type input:checked').val();  //链接类型的value
        var modal_add_time = $("#modal_add_time").val().trim();
        var image_add_path = $("#new_boot_image1").val();
        if(image_add_path==null||image_add_path==""){
        	alert("请选择图片");
        	return false;
        }
        
        //添加上传的图片路径 to do

        //发送添加开机动画请求
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/boot/add",
            data: {
            	info_key: image_add_path,
            	type: modal_add_boot_type,
            	adv_time: modal_add_time,
            	data_link:modal_add_boot_link
            },

            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl('添加成功！', {
                        align: 'right', // ('left', 'right', or 'center')
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                    $("#modal_boot_add").modal("hide");
                    //重新刷新一下页面
                    window.location.reload();
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
    
    //修改
    $("#modal_edit_bt").on("click", function () {
    	//先判断是否有没输入字段
    	if($("#modal_edit_boot_link").val()==null || $("#modal_edit_boot_link").val()==""){
    		alert("请输入跳转链接");
    		return false;
    	}
    	if($("#modal_edit_boot_time").val()==null || $("#modal_edit_boot_time").val()==""){
    		alert("请输入跳转停留时间");
    		return false;
    	}
    	//添加开机动画，获取各个字段
        var modal_edit_boot_link = $("#modal_edit_boot_link").val().trim(); //跳转的链接
        var modal_edit_boot_type = $('#modal_edit_boot_type input:checked').val();  //链接类型的value
        var modal_edit_time = $("#modal_edit_boot_time").val().trim();
        var image_edit_path = $("#new_boot_image2").val();
        var edit_boot_id = $("#edit_boot_id").val();
        if(image_edit_path==null||image_edit_path==""){
        	alert("请选择图片");
        	return false;
        }
        
        //添加上传的图片路径 to do

        //发送添加开机动画请求
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/boot/edit",
            data: {
            	info_key: image_edit_path,
            	type: modal_edit_boot_type,
            	adv_time: modal_edit_time,
            	data_link:modal_edit_boot_link,
            	id:edit_boot_id
            },

            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl('添加成功！', {
                        align: 'right', // ('left', 'right', or 'center')
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                    $("#modal_boot_edit").modal("hide");
                    //重新刷新一下页面
                    window.location.reload();
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

    getData();  //加载数据


    function getData() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: appName + "/boot/data",
            data: {
            	start_id: start_id
            },
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.boots, function (index, boot) {
                            var htmlStr = showData(boot.id, boot.info_key, boot.enable_flag, boot.create_time, boot.type,boot.data_link, boot.adv_time);                            		
                            $("#boots_table tbody").append(htmlStr);
                            start_id = boot.id;
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
    //组转加载更多模块
    function showData(id, info_key, enable_flag, create_time, type,data_link, adv_time) {
       
        var type_html = "";
        if(type==1){
        	type_html = "文章";
        }
        if(type==2){
        	type_html = "足球";
        }
        if(type==3){
        	type_html = "篮球";
        }
        if(type==4){
        	type_html = "押押";
        }
        if(type==5){
        	type_html = "公告";
        }
        var  oper_html = "";
        var status_html ="";
        if (enable_flag) { //显示禁用按钮
        	status_html ="已启用";
        	oper_html = '<button class="btn btn-xs btn-warning">编辑</button> <button class="btn btn-xs btn-info-disable">禁用</button> <button class="btn btn-xs btn-danger">删除</button>';
        } else if (!enable_flag) {//显示启用按钮
        	status_html ="已禁用";
        	oper_html = '<button class="btn btn-xs btn-warning">编辑</button> <button class="btn btn-xs btn-info btn-info-able">启用</button> <button class="btn btn-xs btn-danger">删除</button>';
        }
        
       var  image_html = "<img width='100'  class=\"nav-user-photo\" src='" + content_image + info_key + "'/>";
       
        var html = '<tr>\
            <td class="center">' + id + '</td>\
            <td class="center">' + image_html + '</td>\
            <td class="center">' + adv_time + '</td>\
            <td class="center">' + type_html + '</td>\
            <td class="center">' + data_link + '</td>\
            <td class="center">' + create_time + '</td>\
            <td class="center">' + status_html + '</td>\
            <td class="center" id="' + id + '">' + oper_html + '</td>\
            </tr>';
        return html;
    }

    //向下加载更多
    $("#data_more").on("click", function (e) {
        e.preventDefault();
        getData();
    });

    //点击列表中的不同按钮触发不同<button btn-warning=编辑  btn-info=禁用 btn-danger=删除
    $('#boots_table tbody').on('click', 'button.btn-danger',function () {

        var td = $(this).closest("td");
        var tr_tmp = $(this).closest("tr");
        var boot_id = td.attr("id");

        bootbox.confirm("确定对删除该开机动画？", function (result) {
            if (result) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/boot/drop",
                    data: {id: boot_id},
                    success: function (data) {
                        if (data.code == 200) {
                            tr_tmp.remove();
                            $.bootstrapGrowl('成功失效！', {
                                align: 'right', // ('left', 'right', or 'center')
                                type: 'success' // (null, 'info', 'error', 'success')
                            });
                            //重新刷新一下页面
                            window.location.reload();
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
    }).on('click', 'button.btn-info-disable',function () {   //这是禁用
    	 var td = $(this).closest("td");
         var tr_tmp = $(this).closest("tr");
         var boot_id = td.attr("id");
    	
    	  bootbox.confirm("确定禁用开机动画？", function (result) {
              if (result) {

                  $.ajax({
                      type: 'POST',
                      dataType: 'json',
                      url: appName + "/boot/disable",
                      data: {id: boot_id},
                      success: function (data) {
                          if (data.code == 200) {
                              tr_tmp.remove();
                              $.bootstrapGrowl('成功失效！', {
                                  align: 'right', // ('left', 'right', or 'center')
                                  type: 'success' // (null, 'info', 'error', 'success')
                              });
                              //重新刷新一下页面
                              window.location.reload();
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
    }).on('click', 'button.btn-info-able',function () {   //这是启用
    	 var td = $(this).closest("td");
         var tr_tmp = $(this).closest("tr");
         var boot_id = td.attr("id");
    	
  	  bootbox.confirm("确定启用开机动画？", function (result) {
            if (result) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/boot/able",
                    data: {id: boot_id},
                    success: function (data) {
                        if (data.code == 200) {
                            tr_tmp.remove();
                            $.bootstrapGrowl('成功失效！', {
                                align: 'right', // ('left', 'right', or 'center')
                                type: 'success' // (null, 'info', 'error', 'success')
                            });
                            //重新刷新一下页面
                            window.location.reload();
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
  }).on('click', 'button.btn-warning',function () { //编辑事件
        var td = $(this).closest("td");
        var tr_tmp = $(this).closest("tr");
        var bootId = td.attr("id");
    
        //读取数据
        getOne(bootId);
    });
    
    
    
    function getOne(bootId) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: appName + "/boot/view",
            data: {id: bootId},
            success: function (data) {
                if (data.code == 200) {
                	//填充读取到的数据
                	//boot.id, boot.info_key, boot.enable_flag, boot.create_time, boot.type,boot.data_link, boot.adv_time
                	
                    $("#modal_edit_boot_link").val(data.boot.data_link);
                    
                    //跳转类型
                    $('#modal_edit_boot_type').find("input[value=" + data.boot.type + "]").prop("checked", true);
                    $("#modal_edit_boot_time").val(data.boot.adv_time);
                    $("#new_boot_image2").val(data.boot.info_key);
                    $("#edit_boot_id").val(data.boot.id);

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

        //显示编辑框
        $("#modal_boot_edit").modal({backdrop: 'static'});
    }
    
    
    /**
     * ======================================================
     * 添加照片 start
     * */


    function addImage() {
        $("#image_form").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/frontpage/add/image",
            maxFiles: 1,
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
                                title: "恭喜，已成功上传" + res.image_num + "张照片！",
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
                            });

                           var  imagePath = res.key;
                           
                           //把图片路径填充new_boot_image1
                           $("#new_boot_image1").val(imagePath);
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

    function addImage2() {
        $("#image_form2").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/frontpage/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 上传图片成功后自动修改图片</span>',
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
                        	var imagePath =  res.key;
                        	  //把图片路径填充new_boot_image1
                            $("#new_boot_image2").val(imagePath);
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
        addImage2();
    } catch (e) {
        alert('Dropzone.js does not support older browsers!');
    }

    /**
     * ======================================================
     * 添加照片 end
     * */
  

    //编辑确认
    $("#modal_coupons_edit_confirm").on("click", function () {

        if (!$('#validation-form').valid()) {
            //$.bootstrapGrowl("文本框不能为空");
            return false;
        }

        var coupons_hour = null;
        var coupons_sum = null;
        var coupons_proportion = null;

        //是否是活动龙筹券
        if (active_coupon) {
            coupons_hour = $("#modal_edit_coupon_time").val();
            coupons_sum = $("#modal_edit_coupon_sum").val();
            coupons_proportion = $("#modal_edit_coupon_proportion").val();
        } else {
            coupons_proportion = $("#modal_edit_coupon_proportion").val();
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/coupons/edit",
            data: {
                id: coupons_id,
                hour: coupons_hour,
                sum: coupons_sum,
                proportion: coupons_proportion
            },

            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl('修改成功！', {
                        align: 'right', // ('left', 'right', or 'center')
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                    //回显数据
                    if (active_coupon) {
                        siblings.eq(7).html(coupons_proportion);
                        siblings.eq(3).html(coupons_hour + "小时");
                        siblings.eq(5).html(coupons_sum);
                        siblings = null;
                    } else {
                        siblings.eq(7).html(coupons_proportion);
                        siblings = null;
                    }
                    $("#modal_coupons_edit").modal("hide");
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

    jQuery.validator.addMethod("positive_number", function (value, element) {
//        return this.optional(element) || /^[0-9]{1,}$/.test(value);
        return this.optional(element) || /^[\d]+(\.\d{1,2}?)?$/.test(value);
    }, "请输入正整数或小数点后最多两位的小数");


    jQuery.validator.addMethod("positive_integer", function (value, element) {
        return this.optional(element) || /^[0-9]{1,}$/.test(value);
    }, "请输入正整数");


    $('#validation-form').validate({
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        rules: {
            modal_edit_coupon_sum: {
                required: true,
                positive_integer: true //验证是否为正整数
            },
            modal_edit_coupon_proportion: {
                required: true,
                positive_number: true //正整数或小数点后最多两位的小数
            },
            modal_edit_coupon_time: {
                required: true,
                positive_number: true //正整数或小数点后最多两位的小数
            }
        },

        messages: {
            modal_edit_coupon_proportion: {
                required: "兑换比例必须有值"
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


});