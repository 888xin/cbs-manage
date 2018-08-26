define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min.js");
    require("../../modules/plugin/x-editable/ace-editable.min.js");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/fuelux/fuelux.wizard.min.js");
    require("../../modules/plugin/jquery.hotkeys.min");
    require("../../modules/plugin/bootstrap-wysiwyg.min");
    require("../../modules/plugin/jquery.validate.min.js");
    require("../../modules/plugin/bootstrap-select.min.js");
    require("../../modules/plugin/jquery.bootstrap-growl.min");
    require("../../modules/plugin/swiper.min.js");
    
    
    getData();
    var card_id;
    var delFlag=0;
    $("#coupons_valid_a").on("click", function (e) {

        e.preventDefault();
        $(this).find("i").removeClass("invisible");
        $("#coupons_invalid_a").find("i").addClass("invisible");
        delFlag = 0;
        $("#data_table tbody tr").remove();
        getData();

    });

    $("#coupons_invalid_a").on("click", function (e) {

        e.preventDefault();
        $(this).find("i").removeClass("invisible");
        $("#coupons_valid_a").find("i").addClass("invisible");
        delFlag = 1;
        $("#data_table tbody tr").remove();
        getData();

    });
    

    function getData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/moneycard/data",
            data: {
            	deleteFlag: delFlag
            },
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {
                    	$("#data_table tbody").html("");
                        //加载数据
                        $.each(data.moneycards, function (index, moneycard) {
                        	
                            var htmlStr = showData(moneycard.id, moneycard.name, moneycard.detail, moneycard.price, moneycard.amount, moneycard.type,moneycard.handsel, moneycard.create_time);
                            $("#data_table tbody").append(htmlStr);
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


    function showData(id, name, detail, price, amount, type,handsel, create_time) {
        var create_time_html = new Date(create_time).pattern("yyyy-MM-dd");
        var type_html;
        if (type == 0) {
            type_html = '龙筹';
        } else if (type == 1) {
            type_html = '龙币';
        } 
        
        var detail_html ="";
        if(detail){
        	detail_html =detail;
        }

        var op_html="";
        if(delFlag==0){
        	op_html = '<button class="btn btn-xs btn-info" > 修改 </button> <button class="btn btn-xs btn-danger" > 失效  </button>';
        } else {
        	op_html = '<button class="btn btn-xs btn-info" > 修改 </button> <button class="btn btn-xs btn-danger" > 生效  </button>';
        }
        
        var html = '<tr>\
            <td class="center">' + id + '</td>\
            <td class="center">' + name + '</td>\
            <td class="center">' + price + '</td>\
            <td class="center">' + amount + '</td>\
            <td class="center">' + type_html + '</td>\
            <td class="center">' + handsel + '</td>\
            <td class="center">' + detail_html + '</td>\
            <td class="center">' + create_time_html + '</td>\
            <td class="center" title="' + id + '"><div>\
                    ' + op_html + '</div>\
            </td></tr>';
        return html;
    }
    
    $("#bean_add_bt").click(function(){
    	card_id=0;
    	 $("#cardid").val("");
         $("#cardname").val("");
         $("#cardprice").val("");
         $("#cardamount").val("");
         $("#type1").attr("checked","checked");
         $("#cardhandsel").val("");
         $("#carddetail").val("");
         $("#modal_coupons_add").modal({backdrop: 'static'});
    });
    
    $('#data_table tbody').on('click', 'button.btn-danger', function () {
        var td = $(this).closest("td");
        var tr = $(this).closest("tr");
        card_id = tr.find("td:eq(0)").html();

        bootbox.confirm("确定重置该充值卡状态？", function (result) {
            if (result) {
            	var deleteFlag =0;
            	if(delFlag==0){
            		deleteFlag=1;
            	}
                //确认删除
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/moneycard/delete",
                    data: {id: card_id,deleteFlag:deleteFlag},
                    success: function (data) {
                        if (data.flag) {
                            $.bootstrapGrowl("状态重置成功");
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
        card_id = tr.find("td:eq(0)").html();
        $("#cardid").val(card_id);
        
        
        var name = tr.find("td:eq(1)").html();
        $("#cardname").val(name);
        
        var price = tr.find("td:eq(2)").html();
        $("#cardprice").val(price);
        
        var amount = tr.find("td:eq(3)").html();
        $("#cardamount").val(amount);
        
        var type = tr.find("td:eq(4)").html();
        $("#type").val(type);
        
        if(type==1){
        	 $("#type1").attr("checked","checked");
        } else if(type==2) {
        	$("#type2").attr("checked","checked");
        }
        
        var handsel = tr.find("td:eq(5)").html();
        $("#cardhandsel").val(handsel);
        
        var detail = tr.find("td:eq(6)").html();
        $("#carddetail").val(detail);

        $("#modal_coupons_add").modal({backdrop: 'static'});

    });
    
    
    $("#modal_confirm_bt").on("click", function () {
        var cardname = $("#cardname").val().trim();
        var cardprice = $("#cardprice").val().trim();
        var cardamount = $("#cardamount").val().trim();
        
        var cardtype = $('#cardtype input:checked').val();
        
        
        var cardhandsel = $("#cardhandsel").val().trim();
        var carddetail = $("#carddetail").val().trim();
        
        if (!cardprice || isNaN(cardprice) || !cardamount || isNaN(cardamount)|| !cardhandsel || isNaN(cardhandsel)) {
            $.bootstrapGrowl("请输入整数");
            return;
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/moneycard/edit",
            data: {
            	id:card_id,
            	name:cardname,
            	price:cardprice,
            	amount:cardamount,
            	type:cardtype,
            	handsel:cardhandsel,
                detail:carddetail
            },
            success: function (data) {
            	if (data.code == 200) {
            		 getData();
                    $.bootstrapGrowl('编辑成功！', {
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

});