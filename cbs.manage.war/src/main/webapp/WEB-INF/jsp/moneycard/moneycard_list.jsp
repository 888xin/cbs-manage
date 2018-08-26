<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
    <head>
        <meta charset="utf-8" />
        <title>充值卡管理</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/common.css" />
        <link rel="stylesheet" href="${appName}/public/css/cbs-manage/table.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-select.min.css" />
	    <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-editable.css"/>
    	<link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css"/>
    
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
                                <a href="${appName}/gotopage/main.do"">主页</a>
                            </li>
                            <li>
                                <a href="#">用戶管理</a>
                            </li>
                            <li>
                                <a href="#">充值卡管理</a>
                            </li>
                            <li class="active">充值卡列表</li>
                        </ul><!-- .breadcrumb -->
                    </div>
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">

                                <h4 class="pull-left">
                                    <div class="btn-group">
                                        <button id="bean_add_bt" class="btn btn-sm btn-success position-relative">
                                            添加充值卡
                                            <span class="icon-upload-alt icon-on-right"></span>
                                        </button>
                                    </div>
                                    
                                     <div class="btn-group">
                                        <button data-toggle="dropdown" class="btn btn-sm btn-warning position-relative">
                                           充值卡状态
                                            <span class="icon-caret-down icon-on-right"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-warning">
                                            <li>
                                                <a id="coupons_valid_a" href="#">
                                                    <i class="icon-ok green"></i>
                                                    已激活
                                                </a>
                                            </li>
                                            <li>
                                                <a id="coupons_invalid_a" href="#">
                                                    <i class="icon-ok green invisible"></i>
                                                    已失效
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </h4>

                                <div class="row">
                                    <div class="col-xs-12">

                                        <div class="table-header">
                                           充值卡
                                        </div>
                                        <div class="table-responsive">
                                            <table id="data_table" class="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="center">序号</th>
                                                        <th class="center">名称</th>
                                                        <th class="center">价格</th>
                                                        <th class="center">龙币金额</th>
                                                        <th class="center">赠送类型</th>
                                                        <th class="center">赠送金额</th>
                                                         <th class="center">描述</th>
                                                        <th class="center">创建日期</th>
                                                        <th class="center">操作</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                    <!-- /span -->
                                </div>

                                <!-- modal-dialog -->
                      			<div id="modal_coupons_add" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog" style="width:800px;">
                                        <div class="modal-content">

                                            <div class="modal-header no-padding">
                                                <div class="table-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        <span class="white">&times;</span>
                                                    </button>
                                                    编辑充值卡
                                                </div>
                                            </div>

                                            <div class="widget-box">
                                                <div class="widget-body">
                                                    <div class="widget-main">
                                                        <div>
                                                            <label for="modal_coupons_name" class="green bigger-150">名称：</label>
                                                            <input class="form-control" type="hidden" id="cardid"  />
                                                            <input class="form-control" type="text" id="cardname" maxlength="64" placeholder="填入名称（最多64字）" />
                                                        </div>
                                                        <div>
                                                            <label for="modal_coupons_value" class="green bigger-150">价格：</label>
                                                            <input class="form-control" type="text" id="cardprice" placeholder="填入对应的充值金额" />
                                                        </div>

                                                        <div>
                                                            <label for="modal_coupons_hour" class="green bigger-150">龙币金额：</label>
                                                            <input class="form-control" type="text" id="cardamount" placeholder="填入对应的额度（龙筹，整数）" />
                                                        </div>
                                                        <div>
                                                            <label for="modal_coupons_proportion" class="green bigger-150">赠送类型：</label>
                                                        	<div class="radio" id="cardtype">
                                                                        <label>
                                                                            <input name="typeredio" id="type1" type="radio" checked="checked" value="0" class="ace"/>
                                                                            <span class="lbl bigger-120">龙筹 </span>
                                                                        </label>
                                                                        <label>
                                                                            <input name="typeredio" id="type2" type="radio" value="1" class="ace"/>
                                                                            <span class="lbl bigger-120">龙币</span>
                                                                        </label>
                                                                            	
                                                                    </div>
                                                        </div>
                                                        <div>
                                                            <label for="modal_coupons_descr" class="green bigger-150">赠送金额：</label>
                                                            <input type="text" class="form-control" id="cardhandsel" value="0" />
                                                        </div>
                                                        <div>
                                                            <label for="modal_coupons_sum" class="green bigger-150">描述：</label>
                                                            <input type="text" class="form-control"  id="carddetail" placeholder="填入描述（最多128字）" maxlength="128" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer no-margin-top">
                                                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i>
                                                    关闭
                                                </button>
                                                <button id="modal_confirm_bt" class="btn btn-sm btn-info pull-right">
                                                    <i class="icon-save"></i>
                                                    确认
                                                </button>
                                            </div>
                                        </div>
                                    </div><!-- /.modal-content -->
                                </div><!-- /.modal-dialog -->

                                <!-- PAGE CONTENT ENDS -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.page-content -->
                </div>
            </div>
            <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
                <i class="icon-double-angle-up icon-only bigger-110"></i>
            </a>
        </div>
         <script type="text/javascript">
            seajs.config({base: prefix+"moneycard/"});
            seajs.use("moneycard_list");
        </script>
    </body>
</html>
