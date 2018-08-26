<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-11-17
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>商品订单</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
        <link rel="stylesheet" href="${appName}/public/css/common.css" />
    </head>
    <body class="skin-3">
        <%@ include file="../common/manage_head.jsp"%>
        <div class="main-container" id="main-container">
            <div class="main-container-inner">
                <a class="menu-toggler" id="menu-toggler" href="#">
                    <span class="menu-text"></span>
                </a>
                <%@ include file="../common/manage_menu.jsp"%>
                <div class="main-content">
                    <div class="breadcrumbs" id="breadcrumbs">
                        <ul class="breadcrumb">
                            <li class="active">
                                <i class="icon-home home-icon"></i>
                                <a href="${appName}/gotopage/main.do">主页</a>
                            </li>
                            <li>
                                <a href="#">商品管理</a>
                            </li>
                            <li class="active">商品订单</li>
                        </ul><!-- .breadcrumb -->
                    </div>
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- PAGE CONTENT BEGINS -->
                                <div class="table-header">商品订单列表 </div>
                                <div class="table-responsive">
                                    <table id="orders_table" class="table table-striped table-bordered table-hover">
                                        <thead>
                                        	<tr>
                                            <th class='center'>订单Id</th>
                                            <th class='center'>商品信息</th>
                                            <th class='center'>数量</th>
                                            <th class='center'>总价</th>
                                            <th class='center'>用户信息</th>
                                            <th class='center'>
                                                <i class="icon-time bigger-110 hidden-480"></i>
                                               	下单时间
                                            </th>
                                            <th class='center'>状态</th>
                                            <th class='center'>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <div class="center">
                                    <button id="data_more" class="btn btn-info">
                                        <i class="icon-arrow-down bigger-120"></i>
                                        <span class="bigger-110">继续加载</span>
                                    </button>
                                </div>
                                
                                
                                <!-- goods order info/.modal-dialog -->
                                <div id="modal_order_info" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog" style="width:800px;">
                                        <div class="modal-content">
                                            <div class="widget-box">
                                                <div class="widget-header">
                                                    <h4>订单详细信息</h4>
                                                    <div class="widget-toolbar">
                                                        <a href="#" data-action="collapse">
                                                            <i class="icon-chevron-up"></i>
                                                        </a>
                                                        <a href="#" data-dismiss="modal" aria-hidden="true">
                                                            <i class="icon-remove light-red"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="widget-body">
                                                    <div class="widget-main">
                                                        <div class="profile-user-info profile-user-info-striped">
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 订单编号 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_id"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 用户ID </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_user_id"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 用户龙号 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_longno"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 商品ID </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_goods_id"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 商品名称 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_goods_name"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 商品属性 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_goods_type"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 额外属性 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_goods_exprop"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 商品单价 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_goods_price"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 商品数量 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_goods_num"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 商品总价 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_goods_amount"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 商品照片 </div>
                                                                <div class="profile-info-value">
                                                                <span class="profile-picture">
                                                                    <img width="100" height="100" id="modal_order_info_goods_photo" />
                                                                </span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 地址信息 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_address"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 买家留言 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_user_remark"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 订单状态 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_status"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 创建时间 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_create_time"></span>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name" id="modal_order_info_update_title"> 更新时间 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="modal_order_info_update_time"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer no-margin-top">
                                                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i>
                                                    关闭
                                                </button>
                                            </div>
                                        </div>
                                    </div><!-- /.modal-content -->
                                </div><!-- /.modal-dialog -->


                                <!-- goods order phone look/.modal-dialog -->
                                <div id="modal_order_phone" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="widget-box">
                                                <div class="widget-header">
                                                    <h4>充值信息</h4>
                                                    <div class="widget-toolbar">
                                                        <a href="#" data-action="collapse">
                                                            <i class="icon-chevron-up"></i>
                                                        </a>
                                                        <a href="#" data-dismiss="modal" aria-hidden="true">
                                                            <i class="icon-remove light-red"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="widget-body">
                                                    <div class="widget-main">
                                                    
                                                    <div class="profile-info-row">
                                                                <div class="profile-info-name"> 订单ID </div>
                                                                <div class="profile-info-value" id="modal_phone_order_id">
                                                                    
                                                                </div>
                                                    </div>
                                                    
                                                    <div class="profile-info-row">
                                                                <div class="profile-info-name"> 充值信息 </div>
                                                                <div class="profile-info-value" id="modal_phone_info">
                                                                    
                                                                </div>
                                                    </div>
                                                    
                                                    

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer no-margin-top">
                                                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i>
                                                    关闭
                                                </button>
                                                <button id="modal_order_confirm_phone" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                                    <i class="icon-save"></i>
                                                    确认订单
                                                </button>
                                            </div>
                                        </div>
                                    </div><!-- /.modal-content -->
                                </div><!-- /.modal-dialog -->

                                <!-- goods order edit add/.modal-dialog -->
                                <div id="modal_order_edit" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog" style="width:800px;">
                                        <div class="modal-content">
                                            <div class="widget-box">
                                                <div class="widget-header">
                                                    <h4>确认订单信息</h4>
                                                    <div class="widget-toolbar">
                                                        <a href="#" data-action="collapse">
                                                            <i class="icon-chevron-up"></i>
                                                        </a>
                                                        <a href="#" data-dismiss="modal" aria-hidden="true">
                                                            <i class="icon-remove light-red"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="widget-body">
                                                    <div class="widget-main">
                                                    	<div class="profile-info-row">
                                                                <div class="profile-info-name"> 订单ID： </div>
                                                                <div class="profile-info-value" id="modal_order_id">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 快递公司： </div>
                                                                <div class="profile-info-value">
                                                                    <select id="express_type" name="express_type">
			                                                        	<option value="1">顺丰</option>
		                                                                <option value="2">圆通</option>
		                                                                <option value="3">申通</option>
		                                                                <option value="4">韵达</option>
		                                                                <option value="5">中通</option>
		                                                                <option value="6">EMS</option>
		                                                                <option value="7">德邦</option>
		                                                                <option value="8">FEDEX</option>
			                                                        	
			                                                        </select>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 快递单号： </div>
                                                                <div class="profile-info-value">
                                                                    <input class="form-control" type="text" id="modal_order_edit_express_no" placeholder="填入对应的快递单号"  style="width:200px;"/>
                                                                </div>
                                                            </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer no-margin-top">
                                                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i>
                                                    	关闭
                                                </button>
                                                <button id="modal_order_edit_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                                    <i class="icon-save"></i>
                                                    	确认订单
                                                </button>
                                            </div>
                                        </div>
                                    </div><!-- /.modal-content -->
                                </div><!-- /.modal-dialog -->
                                
                                
                                
                                <!-- goods order express info/.modal-dialog -->
                                <div id="modal_order_express_info" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog" style="width:800px;">
                                        <div class="modal-content">
                                            <div class="widget-box">
                                                <div class="widget-header">
                                                    <h4>订单物流信息</h4>
                                                    <div class="widget-toolbar">
                                                        <a href="#" data-action="collapse">
                                                            <i class="icon-chevron-up"></i>
                                                        </a>
                                                        <a href="#" data-dismiss="modal" aria-hidden="true">
                                                            <i class="icon-remove light-red"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="widget-body">
                                                    <div class="widget-main">
                                                    		<div class="profile-info-row">
                                                                <div class="profile-info-name"> 订单ID： </div>
                                                                <div class="profile-info-value" id="modal_express_order_id">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 物流状态： </div>
                                                                <div class="profile-info-value" id="modal_express_order_expressState">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 快递公司： </div>
                                                                <div class="profile-info-value" id="modal_express_order_company">
                                                                    
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 快递单号： </div>
                                                                <div class="profile-info-value"  id="modal_express_order_expressNo">
                                                                    
                                                                </div>
                                                            </div>
                                                        	<div class="profile-info-row">
                                                                <div class="profile-info-name"> 物流信息： </div>
                                                                <div class="profile-info-value"  id="modal_express_order_expressInfo">
                                                                    
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer no-margin-top">
                                                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i>
                                                    	关闭
                                                </button>
                                            </div>
                                        </div>
                                    </div><!-- /.modal-content -->
                                </div><!-- /.modal-dialog -->

                                <!-- PAGE CONTENT ENDS -->
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.page-content -->
                </div><!-- /.main-content -->
                <!-- /.main-content -->
            </div>
            <!-- /.main-container-inner -->
            <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
                <i class="icon-double-angle-up icon-only bigger-110"></i>
            </a>
        </div>

        <script type="text/javascript">
            var xin_previous = false ;
            var xin_next = false ;
            var xin_skip = 0 ;
            seajs.config({base: prefix+"goods"});
            seajs.use("goods_order.js");
        </script>
    </body>
</html>
