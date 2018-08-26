<%--
  Created by IntelliJ IDEA.
  User: Lifeix
  Date: 15-9-23
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>用户龙币明细</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/daterangepicker.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/cbs-manage/gold_detail.css"/>
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
                        <a href="#">用户管理</a>
                    </li>
                    <li class="active">用户龙币明细</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <h3 class="header smaller lighter blue">龙币收支流水</h3>
                        <div class="choose">
                            <div class='date'>
                                <div id="datepicker"></div>
                            </div>

							<label class="lab_long">
								<span>请输入用户龙号:</span>
								<input type="text" value="" name="longNo" id="user_long_no">
							</label>
                            
                            <div class="select">
									<label>
										<input name="income" type="checkbox" class="ace" value="33" checked="true">
                                        <span class="lbl"> 用户消费 </span>
									</label>
                                    <label>
                                        <input name="income" type="checkbox" class="ace" value="34" checked="true">
                                        <span class="lbl"> 系统扣除 </span>
                                    </label>
									<label>
                                        <input name="out" type="checkbox" class="ace" value="31" checked="true">
                                        <span class="lbl"> 用户充值 </span>
                                    </label>
                                    <label>
                                        <input name="out" type="checkbox" class="ace" value="32" checked="true">
                                        <span class="lbl"> 系统充值 </span>
                                    </label>
                                    <label>
                                        <input name="out" type="checkbox" class="ace" value="38" checked="true">
                                        <span class="lbl"> 用户赚取</span>
                                    </label>
                                <button class="btn btn-minier btn-info sure">确定</button>
                            </div>
                            <button id="missing_log" class="btn btn-xs btn-info inline position-relative" style=" margin-left:400px;">
									<i class="icon-signin bigger-125"></i> <span class="bigger-110">异常结算记录</span>
							</button>
                        </div>
                        <div class="table-responsive">
                            <table id="sample-table-2" class="table table-striped table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th width='10%'>记录ID</th>
                                        <th width='10%'>用户名</th>
                                        <th width='10%'>金额</th>
                                        <th width='40%'>内容</th>
                                        <th width='15%'>操作时间</th>
                                        <th width='15%'>IP</th>
                                    </tr>
                                </thead>
                                <tbody class='tbody'>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="modal_missing_log" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:1000px; height: 1000px">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                异常结算记录
                                            </div>
                                        </div>
                                        <div class="modal-body no-padding">
	                                        <label class="pull-left inline" style="margin-left:25px; margin-top:3px; margin-bottom:3px;">
	                                        	<select id="filter">
				                                    <option value="0">未处理</option>
				                                    <option value="1">所有</option>
				                                </select>
				                            </label>
                                            <table id="modal_missing" class="table table-striped table-bordered table-hover no-margin-bottom no-border-top">
                                                <thead>
                                                <tr>
                                                    <th class="center" width='5%'>id</th>
                                                    <th class="center" width='10%'>用户id</th>
                                                    <th class="center" width='10%'>操作类型</th>
                                                    <th class="center" width='10%'>操作数据</th>
                                                    <th class="center" width='5%'>涉及金额</th>
                                                    <th class="center" width='25%'>描述</th>
                                                    <th class="center" width='10%'>状态</th>
                                                    <th class="center" width='10%'>创建时间</th>
                                                    <th class="center" width='15%'>操作</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i>
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- fb odds history/.modal-dialog -->
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
seajs.config({base: prefix+"statistic/"});
seajs.use("statistic_money_detail");
</script>
</body>
</html>
