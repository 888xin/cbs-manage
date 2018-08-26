/**
 * Created by lhx on 16-2-25.
 */
define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min");
    require("../../modules/plugin/jquery.validate.min.js");
    require("../../modules/plugin/bootstrap-select.min");


    //变量

    var valid;
    var coupons_id;
    var start_id;
    //是否是活动龙筹券
    var active_coupon = true;
    var siblings;

    $("#modal_coupons_range_key input[value=90]").get(0).checked = true;

    $("#modal_coupons_confirm_bt").on("click", function () {
        var coupons_name = $("#modal_coupons_name").val().trim();
        var coupons_value = $("#modal_coupons_value").val().trim();
        //var coupons_type = $('#modal_coupons_type input:checked').val();
        var coupons_hour = $("#modal_coupons_hour").val().trim();
        var coupons_proportion = $("#modal_coupons_proportion").val().trim();
        var coupons_descr = $("#modal_coupons_descr").val().trim();
        var coupons_sum = $("#modal_coupons_sum").val().trim();
        if (!coupons_name || !coupons_proportion) {
            $.bootstrapGrowl("请输入有效内容");
            return;
        }
        if (!coupons_sum || isNaN(coupons_sum) || !coupons_hour || isNaN(coupons_hour)) {
            $.bootstrapGrowl("请输入整数");
            return;
        }
        var coupons_range_key = $('#modal_coupons_range_key input:checked').val();
        var coupons_range_value = "";
        if (coupons_range_key == 20 || coupons_range_key == 21) {
            $("#modal_coupons_range_value option:checked").each(function () {
                coupons_range_value += $(this).val() + ",";
            });
            if (!coupons_range_value) {
                $.bootstrapGrowl("必需选择至少一种杯赛的名称");
                return;
            } else {
                coupons_range_value = coupons_range_value.substring(0, coupons_range_value.length - 1);
            }
        } else if (coupons_range_key == 10 || coupons_range_key == 11 || coupons_range_key == 30) {
            coupons_range_value = $("#modal_coupons_range_value").val().trim();
            if (!coupons_range_value) {
                $.bootstrapGrowl("必须输入赛事ID！");
                return;
            }
        }


        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/coupons/edit",
            data: {
                type: 1,
                hour: coupons_hour,
                name: coupons_name,
                price: coupons_value,
                range_key: coupons_range_key,
                range_value: coupons_range_value,
                sum: coupons_sum,
                proportion: coupons_proportion,
                descr: coupons_descr
            },

            success: function (data) {
                if (data.code == 200) {
                    $.bootstrapGrowl('添加成功！', {
                        align: 'right', // ('left', 'right', or 'center')
                        type: 'success' // (null, 'info', 'error', 'success')
                    });
                    $("#modal_coupons_add").modal("hide");
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

    //$("#modal_coupons_type input[value=0]").get(0).checked = true;
    $("#modal_coupons_give_type input[value=1]").get(0).checked = true;
    //$("#modal_coupons_range_key input[value=0]").get(0).checked = true;

//    $("#modal_coupons_type input").on("click", function () {
//        if ($(this).val() == 1) {
//            $("#modal_coupons_sum").parent("div").removeClass("hidden");
//            $("#modal_coupons_range_key").removeClass("hidden");
//            $("#modal_coupons_range_value_div").removeClass("hidden");
//        } else {
//            $("#modal_coupons_sum").parent("div").addClass("hidden");
//            $("#modal_coupons_range_key").addClass("hidden");
//            $("#modal_coupons_range_value_div").addClass("hidden");
//        }
//    });


    $("#modal_coupons_range_key input").on("click", function () {
        $("#modal_coupons_range_value_div *").remove();
        var value = $(this).val();
        if (value == 20) {
            getCupName(0, 1);
        } else if (value == 21) {
            getCupName(1, 1);
        } else if (value == 10 || value == 11 || value == 30) {
            var html = '<label for="modal_coupons_range_value" class="green bigger-150">对应范围内可使用的赛事ID：</label>\
                        <input id="modal_coupons_range_value" type="text" class="form-control" />';
            $("#modal_coupons_range_value_div").append(html);
        }
    });

    function getCupName(type, level) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/coupons/cup",
            data: {
                type: type,
                level: level
            },
            success: function (data) {
                if (data.number > 0) {
                    var html = '<label for="modal_coupons_range_value" class="green bigger-150">对应范围内可使用的杯赛名称：</label>\
                        <select id="modal_coupons_range_value" class="show-menu-arrow form-control" multiple></select>';
                    $("#modal_coupons_range_value_div").append(html);
                    var option_html = "";
                    $.each(data.cups, function (index, cup) {
                        option_html += "<option value='" + cup.target_id + "'>" + cup.name + "</option>";
                    });
                    $("#modal_coupons_range_value").append(option_html).selectpicker({
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
    }


    getData();


    function getData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/coupons/data",
            data: {
                valid: valid,
                startId: start_id
            },
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.coupons, function (index, coupon) {
                            var htmlStr = showData(coupon.id, coupon.type, coupon.hour, coupon.name, coupon.price,
                                coupon.range_key, coupon.range_value, coupon.sum, coupon.num, coupon.proportion, coupon.descr, coupon.valid);
                            $("#coupons_table tbody").append(htmlStr);
                            start_id = coupon.id;
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

    function showData(id, type, hour, name, price, range_key, range_value, sum, num, proportion, descr, valid) {
        hour += "小时";
        price += "龙筹";
        var type_html = "";
        if (type) {
            type_html = "<span class='label label-sm label-warning'>活动</span>";
            if (range_key == 90) {
                range_key = "通用";
            } else if (range_key == 10 || range_key == 11) {
                range_key = "赛事";
            } else if (range_key == 20 || range_key == 21) {
                range_key = "联赛";
            } else if (range_key == 30) {
                range_key = "押押";
            } else {
                range_key = "其他";
            }
            if (!range_value) {
                range_value = "全部";
            }
            if (!descr) {
                descr = "无";
            }
        } else {
            type_html = "<span class='label label-sm label-info'>系统</span>";
            sum = "不限量";
            range_key = "无";
            range_value = "无";
        }

        if (valid && type) {
            valid = '<button class="btn btn-xs btn-warning">发放</button> <button class="btn btn-xs btn-info">编辑</button> <button class="btn btn-xs btn-danger">失效</button>';
        } else if (valid) {
            valid = '<button class="btn btn-xs btn-warning">发放</button> <button class="btn btn-xs btn-info">编辑</button>';
        } else {
            valid = '<button class="btn btn-xs btn-success">激活</button> <button class="btn btn-xs btn-info">编辑</button>';
        }
        var html = '<tr>\
            <td class="center">' + id + '</td>\
            <td class="center">' + name + '</td>\
            <td class="center">' + price + '</td>\
            <td class="center">' + hour + '</td>\
            <td class="center">' + type_html + '</td>\
            <td class="center">' + sum + '</td>\
            <td class="center">' + num + '</td>\
            <td class="center">' + proportion + '</td>\
            <td class="center">' + range_key + '</td>\
            <td class="center">' + range_value + '</td>\
            <td class="center">' + descr + '</td>\
            <td class="center" id="' + id + '"><div>\
                    ' + valid + '</div>\
            </td></tr>';
        return html;
    }

    //向下加载更多
    $("#data_more").on("click", function (e) {
        e.preventDefault();
        getData();
    });

    $("#coupons_valid_a").on("click", function (e) {

        e.preventDefault();
        $(this).find("i").removeClass("invisible");
        $("#coupons_invalid_a").find("i").addClass("invisible");
        valid = true;
        start_id = null;
        $("#coupons_table tbody tr").remove();
        getData();

    });

    $("#coupons_invalid_a").on("click", function (e) {

        e.preventDefault();
        $(this).find("i").removeClass("invisible");
        $("#coupons_valid_a").find("i").addClass("invisible");
        valid = false;
        start_id = null;
        $("#coupons_table tbody tr").remove();
        getData();

    });

//    $( "#modal_coupons_value" ).spinner({
//        min:0,
//        step: 5,
//        numberFormat: "n",
//        create: function( event, ui ) {
//            //add custom classes and icons
//            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
//                .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
//            //larger buttons on touch devices
//            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
//        }
//    });


    $('#coupons_table tbody').on('click', 'button.btn-danger',function () {

        var td = $(this).closest("td");
        var tr_tmp = $(this).closest("tr");
        coupons_id = td.attr("id");

        bootbox.confirm("确定对该筹码失效？", function (result) {
            if (result) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/coupons/invalid",
                    data: {id: coupons_id, valid: false},
                    success: function (data) {
                        if (data.code == 200) {
                            tr_tmp.remove();
                            $.bootstrapGrowl('成功失效！', {
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

            }
        });
    }).on('click', 'button.btn-warning',function () {
        var td = $(this).closest("td");
        coupons_id = td.attr("id");
        //是否是活动龙筹
        active_coupon = td.has(".btn-danger").length;
        $("#modal_coupons_give").modal({backdrop: 'static'});
    }).on('click', 'button.btn-info',function () {
        var td = $(this).closest("td");
        coupons_id = td.attr("id");
        //是否是活动龙筹
        active_coupon = td.has(".btn-danger").length;
        siblings = td.siblings();
        var proportion = siblings.eq(7).html();
        var form = $("#validation-form");
        if (active_coupon) {
            form.find(".form-group:eq(0)").removeClass("hide");
            form.find(".form-group:eq(1)").removeClass("hide");
            var time = siblings.eq(3).html();
            time = time.substring(0, time.length - 2);
            var sum = siblings.eq(5).html();
            $("#modal_edit_coupon_time").val(time);
            $("#modal_edit_coupon_sum").val(sum);
            $("#modal_edit_coupon_proportion").val(proportion);
        } else {
            form.find(".form-group:eq(0)").addClass("hide");
            form.find(".form-group:eq(1)").addClass("hide");
            $("#modal_edit_coupon_proportion").val(proportion);
        }
        $("#modal_coupons_edit").modal({backdrop: 'static'});
    }).on('click', 'button.btn-success',function () {
        var td = $(this).closest("td");
        var tr_tmp = $(this).closest("tr");
        coupons_id = td.attr("id");

        bootbox.confirm("确定对该筹码激活使用？", function (result) {
            if (result) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/coupons/invalid",
                    data: {id: coupons_id, valid: true},
                    success: function (data) {
                        if (data.code == 200) {
                            tr_tmp.remove();
                            $.bootstrapGrowl('成功激活！', {
                                align: 'right', // ('left', 'right', or 'center')
                                type: 'success'
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
        });
    }).on('click', 'button.btn-inverse', function () {
        var td = $(this).closest("td");
        var tr_tmp = $(this).closest("tr");
        coupons_id = td.attr("id");

        bootbox.confirm("确定删除该筹码？一经删除，就无法恢复！", function (result) {
            if (result) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/coupons/delete",
                    data: {id: coupons_id},
                    success: function (data) {
                        if (data.code == 200) {
                            tr_tmp.remove();
                            $.bootstrapGrowl('成功删除！', {
                                align: 'right', // ('left', 'right', or 'center')
                                type: 'success'
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
        });
    });

    $("#modal_coupons_give_confirm").on("click", function () {
        var coupons_give_type = $('#modal_coupons_give_type input:checked').val();

        var coupons_give_no = $("#modal_coupons_give_no").val();
        var modal_coupons_give_num = $("#modal_coupons_give_num").val();

        if (!/^[0-9]{1,}$/.test(modal_coupons_give_num)) {
            $.bootstrapGrowl("发送数量必须是正整数");
            return;
        }
        if (active_coupon) {
            if (modal_coupons_give_num > 1) {
                $.bootstrapGrowl("活动龙筹券只能拥有一张");
                return;
            }
        }

        if (coupons_give_no) {

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/coupons/give",
                data: {
                    id: coupons_id,
                    userIds: coupons_give_no,
                    num: modal_coupons_give_num,
                    isLongNo: coupons_give_type
                },
                success: function (data) {
                    if (data.code == 200) {
                        $.bootstrapGrowl('发送成功！', {
                            align: 'right', // ('left', 'right', or 'center')
                            type: 'success' // (null, 'info', 'error', 'success')
                        });
                        $("#modal_coupons_give").modal("hide");
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
            $.bootstrapGrowl("文本框不能为空");
        }
    });


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