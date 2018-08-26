define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min.js");
    require("../../modules/plugin/jquery.dataTables.bootstrap");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");

    //常量设置
    var xin_start = null;
    var xin_end = null;
    var order_status = null;
    var image_url = "http://roi.skst.cn/";
    var status_td_tmp = "";
    var order_id = "";
    var tr_tmp ;
    var order_display_num = 0 ;
	var startId = null;
	var userId = null;
	var status = -1;


    getData();

    function getData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/order/list",
            data: {
            	userId:userId,
                status: status,
                startId:startId
            },
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.orders, function (index, order) {
                            var htmlStr = showData(order);
                            $("#orders_table tbody").append(htmlStr);
                            startId = order.id ;
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

    function showData(order) {
    	var buttomArr = [];
    	buttomArr.push('<tr>');
    	buttomArr.push('<td class="center">' + order.id + '</td>');
    	buttomArr.push('<td class="center" style="max-width: 230px; "><img src="' + image_url + order.goods.path + '!icon" style="float: left; padding-left: 40px;"/>&nbsp;'+order.goods.name + '</td>');
        buttomArr.push('<td class="center">' + order.goods_num + '</td>');
    	buttomArr.push('<td class="center">￥' + order.amount + '</td>');
        buttomArr.push("<td class='center'><p><span class='gray'>龙号：</span>"+order.user.long_no +"</p><p><span class='gray'>用户名：</span><span class='name' >"+ order.user.name + "</span></p>  </td>");
    	buttomArr.push('<td class="center">' + new Date(order.create_time).pattern("yyyy-MM-dd HH:mm:ss") + '</td>');
    	if(order.status == 0){
    		buttomArr.push('<td class="center"><span class=\"label label-grey\">未支付</span></td>');	
    	} else if(order.status == 1){
    		buttomArr.push('<td class="center"><span class=\"label label-info\">未发货</span></td>');	
    	} else if(order.status == 2){
    		buttomArr.push('<td class="center"><span class=\"label label-warning\">已发货</span></td>');	
    	} else if(order.status == 3){
    		buttomArr.push('<td class="center"><span class=\"label label-success\">已完成</span></td>');	
    	} else if(order.status == 10){
    		buttomArr.push('<td class="center"><span class=\"label label-darger\">已取消</span></td>');	
    	}
        var type=order.goods.type;
    	buttomArr.push('<td class="center" id="' + order.id + '">');
    	buttomArr.push('<div>');
    	buttomArr.push("<a id='goods_more_" + order.id + "' class=\"blue\" href=\"#\" data-toggle='tooltip' title='查看详情'>");
    	buttomArr.push("<i class=\"icon-zoom-in bigger-130\"></i>");
    	buttomArr.push("</a>");
    	if(order.status == 1){ // 未发货
            if(type>0){//虚拟商品
                buttomArr.push("&nbsp;<a id='goods_edit_" + order.id + "'class=\"green phone\" href=\"#\" data-toggle='tooltip' title='确认订单'>");
                buttomArr.push("<i class=\"icon-ok-circle bigger-130\"></i>");
                buttomArr.push("</a>");
            }else{
                buttomArr.push("&nbsp;<a id='goods_edit_" + order.id + "'class=\"green express\" href=\"#\" data-toggle='tooltip' title='确认订单'>");
                buttomArr.push("<i class=\"icon-ok-circle bigger-130\"></i>");
                buttomArr.push("</a>");
            }
    	}
        if(order.status == 2&&type==0){ // 已发货，需修改快递信息，非虚拟商品
            buttomArr.push("&nbsp;<a id='goods_edit_" + order.id + "'class=\"orange\" href=\"#\" data-toggle='tooltip' title='修改物流信息'>");
            buttomArr.push("<i class=\"icon-ok-circle bigger-130\"></i>");
            buttomArr.push("</a>");
        }
    	if(order.status != 3 && order.status != 10 ){
    		buttomArr.push("&nbsp;<a id='goods_delete_" + order.id + "'class=\"red\" href=\"#\" data-toggle='tooltip' title='取消订单'>");
    		buttomArr.push("<i class=\"icon-remove-circle bigger-130\"></i>");
    		buttomArr.push("</a>");	
    	}
        if(order.status ==2||order.status ==3 ){//已发货或已完成，可查看物流信息
            if(type==0){
                buttomArr.push("<hr><button class='btn btn-xs btn-success express_info'>物流信息</button>");
            }
        }
    	buttomArr.push('</div>');
    	buttomArr.push('</td>');
    	buttomArr.push('</tr>');
        return buttomArr.join("");
    }

    //向下加载更多
    $("#data_more").on("click", function (e) {
        e.preventDefault();
        getData();
    });
    
    //查看详情
    $('#orders_table tbody').on('click', 'a.blue', function (e) {
    	
    	e.preventDefault();
        order_id = $(this).attr("id").substring(11);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/order/view",
            data: {orderId: order_id},
            success: function (data) {
                if (data.code == 200) {
                    var order = data.order;
                    //显示数据到模态窗口
                    $("#modal_order_info_id").html(order.id);
                    $("#modal_order_info_user_id").html(order.user_id);
                    $("#modal_order_info_longno").html(order.user.long_no);
                    $("#modal_order_info_goods_id").html(order.goods.id);
                    $("#modal_order_info_goods_name").html(order.goods.name);
                    var goods_type_html = "";
                    if (order.goods.type > 0) {
                        goods_type_html = "虚拟商品"
                    } else {
                        goods_type_html = "实物商品"
                    }
                    $("#modal_order_info_goods_type").html(goods_type_html);
                    if (order.goods_pro!=null&&order.goods_pro!=""){
                        $("#modal_order_info_goods_exprop").html(order.goods_pro);
                    } else {
                        $("#modal_order_info_goods_exprop").html("无");
                    }
                    var price_html = "";
                    var amount_html = "";
                    price_html =  "￥"+order.goods_price;
                    amount_html = "￥"+ order.amount;
                    if (order.user_remark!=null&&order.user_remark!=""){
                        $("#modal_order_user_remark").html(order.user_remark);
                    } else {
                        $("#modal_order_user_remark").html("无");
                    }
                    $("#modal_order_info_goods_price").html(price_html);
                    $("#modal_order_info_goods_num").html(order.goods_num);
                    $("#modal_order_info_goods_amount").html(amount_html);
                    $("#modal_order_info_goods_photo").attr("src", image_url + order.goods.path);
                    $("#modal_order_info_address").html(order.order_address);
                    var order_status_html = "";
                    if (order.status == 0) {
                        order_status_html = "未付款"
                    } else if (order.status == 1) {
                        order_status_html = "未发货"
                    } else if (order.status == 2) {
                        order_status_html = "已发货"
                    }else if (order.status == 3) {
                        order_status_html = "已完成"
                    }else if (order.status == 10) {
                        order_status_html = "已取消"
                    }
                    $("#modal_order_info_status").html(order_status_html);
                    var create_time_html = new Date(order.create_time).pattern("yyyy-MM-dd HH:mm:ss");
                    var update_time_html = "";
                    if(order.done_time!=null){
                    	update_time_html=new Date(order.done_time).pattern("yyyy-MM-dd HH:mm:ss");
                    	$("#modal_order_info_update_title").html("完成时间");
                    }else if(order.shop_time!=null){
                    	update_time_html=new Date(order.shop_time).pattern("yyyy-MM-dd HH:mm:ss");
                    	$("#modal_order_info_update_title").html("发货时间");
                    }else{
                        update_time_html="无";
                    }
                    $("#modal_order_info_create_time").html(create_time_html);
                    $("#modal_order_info_update_time").html(update_time_html);
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
        //打开模态窗口
        $("#modal_order_info").modal({backdrop: 'static'});
    });
    
    //发货（实物）
    $('#orders_table tbody').on('click', 'a.express', function (e) {
        e.preventDefault();
        var order_id = $(this).attr("id").substring(11);
        $("#modal_order_id").html(order_id);
        $("#express_type").val(1);
        $("#modal_order_edit_express_no").val("");
        $("#modal_order_edit").modal({backdrop: 'static'});
    });

    //发货（虚拟）
    $('#orders_table tbody').on('click', 'a.phone', function (e) {
        e.preventDefault();
        var order_id = $(this).attr("id").substring(11);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/order/view",
            data: {orderId: order_id},
            success: function (data) {
                if (data.code == 200) {
                    var order = data.order;
                    //显示数据到模态窗口
                    $("#modal_phone_order_id").html(order.id);
                    $("#modal_phone_info").html(order.goods_pro);
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
        $("#modal_order_phone").modal({backdrop: 'static'});
    });

    //修改物流
    $('#orders_table tbody').on('click', 'a.orange', function (e) {
        e.preventDefault();
        var order_id = $(this).attr("id").substring(11);
        $("#modal_order_id").html(order_id);
        getExpress(order_id);
        $("#modal_express_info_title").html("修改物流信息");
        $("#modal_order_edit_button").html("修改物流");
        $("#modal_order_edit").modal({backdrop: 'static'});
    });

    //查看物流信息
    $('#orders_table tbody').on('click', 'button.express_info', function (e) {
        e.preventDefault();
        var tmpTr = $(this).closest("tr");
        var orderId =  tmpTr.find("td:eq(0)").html();
        getExpress(orderId);
        $("#modal_express_order_id").html(orderId);
        $("#modal_order_express_info").modal({backdrop: 'static'});
    });



    //取消订单
    $('#orders_table tbody').on('click', 'a.red', function (e) {
        e.preventDefault();
        var orderId = $(this).attr("id").substring(13);
        bootbox.confirm("确定取消该订单？", function (result) {
            if (result) {
                //确认取消
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/goods/order/cancel",
                    data: {orderId: orderId},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: "订单取消成功！",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                        	startId = null;
                        	userId = null;
                        	status = -1;
                            $("#orders_table tbody tr").remove();
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
    });


    $('#modal_order_edit_button').on('click', function (e) {
        e.preventDefault();
        var orderId = $("#modal_order_id").html();
        var expressType=$("#express_type").val();
        var expressNO=$("#modal_order_edit_express_no").val();
        addExpress(orderId,expressType,expressNO);
    });

    //获取物流信息
    function getExpress(orderId){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/order/express",
            data: {orderId: orderId},
            success: function (data) {
                if (data.code == 200) {
                    var orderExpress=data.orderExpress;
                    //显示数据
                    var state="";
                    if(orderExpress.state==1){//无物流信息
                    	state="尚无物流信息";
                    }else if(orderExpress.state==2){//途中
                    	state="运送途中";
                    }else if(orderExpress.state==3){//已签收
                    	state="已签收";
                    }else if(orderExpress.state==4){//问题件
                    	state="问题件";
                    }
                    $("#modal_express_order_company").html(data.expressCompany);
                    $("#modal_express_order_expressNo").html(orderExpress.expressNO);
                    $("#modal_express_order_expressState").html(state);
                    $("#modal_express_order_expressInfo").html(data.expressInfo);
                    $("#express_type").val(orderExpress.expressType);
                    $("#modal_order_edit_express_no").val(orderExpress.expressNO);
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



    //物流信息添加
    function addExpress(orderId,expressType,expressNO){
        if (expressNO == "") {
            $.gritter.add({
                title: "请输入快递单号",
                time: 2000,
                class_name: 'gritter-error gritter-light'
            });
        }else{
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/order/send",
                data: {orderId: orderId,expressType:expressType,expressNo:expressNO},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "操作成功",
                            time: 2000,
                            class_name: 'gritter-success gritter-light'
                        });
                        startId = null;
                    	userId = null;
                    	status = -1;
                        $("#orders_table tbody tr").remove();
                        getData();
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
    }

    //确认充值
    $("#modal_order_confirm_phone").on("click", function () {
        var orderId=$("#modal_phone_order_id").html();
        confirmPhone(orderId);
    });

    function confirmPhone(orderId){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/order/send",
            data: {orderId: orderId},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "订单确认成功！",
                        time: 2000,
                        class_name: 'gritter-success gritter-center gritter-light'
                    });
                    startId = null;
                    userId = null;
                    status = -1;
                    $("#orders_table tbody tr").remove();
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
    
    /**

    var orders_table;

    orders_table = $('#orders_table').dataTable({
        "bAutoWidth": true,
        "bProcessing": true,
        "bServerSide": true,
        "bStateSave": false, //是否保存cookie数据
        "bFilter": true,
        "aLengthMenu": [20, 40, 80],
        "iDisplayLength": 20,//每页显示个数
        "sAjaxDataProp": "orders",
        "sAjaxSource": appName + '/goods/order/list',
        "fnServerParams": function (aoData) {  //查询条件
            aoData.push(
                { "name": "status", "value": order_status },
                { "name": "previous", "value": xin_previous },
                { "name": "next", "value": xin_next },
                { "name": "endId", "value": xin_end },
                { "name": "startId", "value": xin_start },
                { "name": "skip", "value": xin_skip }
            );
        },
        "oLanguage": {
            "sProcessing": "正在加载中......",
            "sSearch": '<span class="label label-danger">条件选择：</span><select id="orders_table_condition"><option value="" selected="selected">全部</option><option value="0">等待确认</option>' +
                '<option value="1">已处理</option><option value="3">已取消</option></select><span class="label label-success">输入龙号查询订单：</span>',
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "没有数据！",
            "sEmptyTable": "表中无数据存在！",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoEmpty": "显示0到0条记录",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
            //"sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "末页"
            }
        },
        "aoColumnDefs": [
            {
                sDefaultContent: '',
                aTargets: [ '_all' ]
            }
        ],
        "aoColumns": [
            {
                "mDataProp": "order_id",
                "sClass": "center",
                "bSortable": true,
                "fnRender": function (obj) {
                    if (order_display_num == 0) {
                        xin_end = obj.aData.order_id;
                    }
                    xin_start = obj.aData.order_id;
                    order_display_num++;
                    return obj.aData.order_id;
                }
            },
            {
                "mDataProp": "name",
                "sClass": "center",
                "bSortable": false
            },
            {
                "mDataProp": "long_no",
                "sClass": "center",
                "bSortable": false
            },
            {
                "mDataProp": "user_name",
                "sClass": "center",
                "bSortable": false
            },
            {
                "mDataProp": "amount",
                "bSortable": false,
                "fnRender": function (obj) {
                    if (obj.aData.price_type == 0) {
                        return "<span class='light-red'>龙筹</span> " + obj.aData.amount;
                    } else if (obj.aData.price_type == 1) {
                        return "<span class='orange2'>龙币</span> " + obj.aData.amount;
                    }
                }
            },
            {
                "mDataProp": "num",
                "sClass": "center",
                "bSortable": false
            },
            {
                "mDataProp": "image",
                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    return "<img width='40' height='40' class=\"nav-user-photo\" src='" + image_url + obj.aData.image + "' />";
                }
            },
            {
                "mDataProp": "createTime",
                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    var dataFormat = new Date(obj.aData.createTime).pattern("yyyy-MM-dd HH:mm:ss");
                    //var dataFormat = new Date(obj.aData.createTime).toLocaleString();
                    return dataFormat;
                }
            },
            {
                "mDataProp": "status",
                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    var sReturn = "";
                    if (obj.aData.status == 0) {
                        sReturn = "<span class=\"label label-warning\">等待确认</span>";
                    } else if (obj.aData.status == 1) {
                        sReturn = "<span class=\"label label-success\">已处理</span>";
                    } else if (obj.aData.status == 3) {
                        sReturn = "<span class=\"label label-danger\">已取消</span>";
                    }
                    return sReturn;
                }
            },
            { "bSortable": false,
                "sClass": "center",
                "fnRender": function (obj) {
                    return bt_fn(obj.aData.order_id, obj.aData.status, obj.aData.order_type);
                }
            }
        ],
        fnDrawCallback: function () {
            xin_next = false;
            xin_previous = false;
            order_display_num = 0 ;
            xin_skip = 0 ;
        }
    }).on('click', 'a.blue',function (e) {
        e.preventDefault();
        tr_tmp = $(this).closest("tr");
        //查看详情
        order_id = $(this).attr("id").substring(11);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/order/view",
            data: {orderId: order_id},
            success: function (data) {
                if (data.code == 200) {
                    var order = data.order;
                    //显示数据到模态窗口
                    $("#modal_order_info_id").html(order.order_id);
                    $("#modal_order_info_user_id").html(order.account_id);
                    $("#modal_order_info_longno").html(order.long_no);
                    $("#modal_order_info_goods_id").html(order.itemId);
                    $("#modal_order_info_goods_name").html(order.name);
                    var goods_type_html = "";
                    if (order.order_type > 0) {
                        goods_type_html = "虚拟商品"
                    } else {
                        goods_type_html = "实物商品"
                    }
                    $("#modal_order_info_goods_type").html(goods_type_html);
                    if (order.ex_prop){
                        $("#modal_order_info_goods_exprop").html(order.ex_prop);
                    } else {
                        $("#modal_order_info_goods_exprop").html("无");
                    }
                    var price_html = "";
                    var amount_html = "";
                    if (order.price_type == 0) {
                        price_html = "龙筹：" + order.price;
                        amount_html = "龙筹：" + order.amount;
                    } else if (order.price_type == 1) {
                        price_html = "龙币：" + order.price;
                        amount_html = "龙币：" + order.amount;
                    }
                    $("#modal_order_info_goods_price").html(price_html);
                    $("#modal_order_info_goods_num").html(order.num);
                    $("#modal_order_info_goods_amount").html(amount_html);
                    $("#modal_order_info_goods_photo").attr("src", image_url + order.image);
                    $("#modal_order_info_address").html(order.address);
                    var express_name_html = order.express_type;
                    if (express_name_html == null || express_name_html == "") {
                        express_name_html = "无";
                    }
                    $("#modal_order_info_express_name").html(express_name_html);
                    var express_no_html = order.express_no;
                    if (express_no_html == null || express_no_html == "") {
                        express_no_html = "无";
                    }
                    $("#modal_order_info_express_no").html(express_no_html);
                    var order_status_html = "";
                    if (order.status == 0) {
                        order_status_html = "等待确认"
                    } else if (order.status == 1) {
                        order_status_html = "已处理"
                    } else if (order.status == 3) {
                        order_status_html = "已取消"
                    }
                    $("#modal_order_info_status").html(order_status_html);
                    var create_time_html = new Date(order.createTime).pattern("yyyy-MM-dd HH:mm:ss");
                    var update_time_html = new Date(order.updateTime).pattern("yyyy-MM-dd HH:mm:ss");
                    $("#modal_order_info_create_time").html(create_time_html);
                    $("#modal_order_info_update_time").html(update_time_html);
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
        //打开模态窗口
        $("#modal_order_info").modal({backdrop: 'static'});
    }).on('click', 'a.orange',function (e) {
        e.preventDefault();
        //添加快递信息
        order_id = $(this).attr("id").substring(11);
        //打开模态窗口
        $("#modal_order_edit").modal({backdrop: 'static'});
        status_td_tmp = $(this).closest('td').prev();
    }).on('click', 'a.green',function (e) {
        e.preventDefault();
        //修改快递信息
        order_id = $(this).attr("id").substring(11);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/order/view",
            data: {orderId: order_id},
            success: function (data) {
                if (data.code == 200) {
                    var order = data.order;
                    //显示数据到模态窗口
                    $("#modal_order_edit_express").val(order.express_type);
                    $("#modal_order_edit_express_no").val(order.express_no);
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
        //打开模态窗口
        $("#modal_order_edit").modal({backdrop: 'static'});
        status_td_tmp = $(this).closest('td').prev();
    }).on('click', 'a.red', function (e) {
        e.preventDefault();
        //取消订单
        order_id = $(this).attr("id").substring(13);
        var status_td = $(this).closest('td').prev();
        bootbox.confirm("确定取消该订单？", function (result) {
            if (result) {
                //确认取消
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/goods/order/cancel",
                    data: {orderId: order_id},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: "订单取消成功！",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                            //表格改变样式
                            status_td.html("<span class=\"label label-sm label-danger\">已取消</span>");
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
    }).on('click', 'a.orange2',function (e) {
        e.preventDefault();
        //显示充值号码
        order_id = $(this).attr("id").substring(11);
        status_td_tmp = $(this).closest('td').prev();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/order/view",
            data: {orderId: order_id},
            success: function (data) {
                if (data.code == 200) {
                    var order = data.order;
                    //显示数据到模态窗口
                    $("#modal_phone_info").html(order.ex_prop);
                    //打开模态窗口
                    $("#modal_order_phone").modal({backdrop: 'static'});
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
    $("#orders_table_condition").on("change", function () { //触发orders_table重新请求服务器
        order_status = $(this).val()
        orders_table.fnDraw();
    });

    //确认添加快递单号
    $("#modal_order_edit_button").on("click", function () {
        var express_name = $("#modal_order_edit_express").val();
        var express_no = $("#modal_order_edit_express_no").val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/order/add/express",
            data: {orderId: order_id, expressType: express_name, expressNo: express_no},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "恭喜您，订单确认成功！",
                        time: 2000,
                        class_name: 'gritter-success gritter-center gritter-light'
                    });
                    $("#modal_order_edit").modal('hide');
                    //表格改变样式
                    status_td_tmp.html("<span class=\"label label-success\">已处理</span>");
                    //改变图标
                    $("#goods_edit_" + order_id).removeClass("orange").addClass("green").find('i').removeClass("icon-cog").addClass("icon-pencil");
                    status_td_tmp = "";
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

    //确认充值
    $("#modal_order_confirm_phone").on("click", function () {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/order/add/express",
            data: {orderId: order_id},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "订单确认成功！",
                        time: 2000,
                        class_name: 'gritter-success gritter-center gritter-light'
                    });
                    //表格改变样式
                    status_td_tmp.html("<span class=\"label label-success\">已处理</span>");
                    //去除图标
                    $("#goods_edit_" + order_id).remove();
                    status_td_tmp = "";
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


    //编辑窗口关闭后清空
    $("#modal_order_edit").on('hidden.bs.modal', function () {
        $("#modal_order_edit_express").val("");
        $("#modal_order_edit_express_no").val("");
    });
    $('table th input:checkbox').on('click', function () {
        var that = this;
        $(this).closest('table').find('tr > td:first-child input:checkbox')
            .each(function () {
                this.checked = that.checked;
                $(this).closest('tr').toggleClass('selected');
            });
    });
    $("#orders_table tbody").tooltip({
        hide: {
            delay: 100
        }
    });

    //订单硬删除
    $("#modal_order_delete").on("click",function(){
        bootbox.confirm("删除该订单后将无法恢复，确定删除该订单？", function (result) {
            if (result) {
                //确认取消
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/goods/order/delete",
                    data: {orderId: order_id},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: "订单删除成功！",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                            //orders_table.fnDraw();
                            tr_tmp.remove();
                            $("#modal_order_info").modal('hide');
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
    
    **/
})