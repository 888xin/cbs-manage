<%--
  Created by IntelliJ IDEA.
  User: Lifeix
  Date: 15-10-26
  Time: 上午10:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>用户结算记录</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/daterangepicker.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/ui.jqgrid.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/cbs-manage/inner_settle.css"/>
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
                    <li class="active">用户结算记录</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <i class="bigger-140 bolder green">查询用户：</i><span class="input-icon">
                                    <input type="text" placeholder="请输入用户龙号" class="nav-search-input" id="long_no" autocomplete="off" name="long_no" style="width:150px;"/>
                                    <i class="icon-search nav-search-icon"></i>
                                </span><i class="bigger-140 bolder green">&nbsp;在</i><div id="datepicker" class="dateSpecial"></div><i class="bigger-140 bolder green">的记录&nbsp;</i> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                        <a href="#" id="search_log" role="button" class="bigger-140 bolder blue"> 查找 </a>
                        <div class="hr hr-18 dotted hr-double"></div>                 
                        <table id="settle_table" class="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th style="display:none">pay_log_id</th>
                                    <th>ID</th>
                                    <th>用户信息</th>
                                    <th>比赛类型</th>
                                    <th>比赛信息</th>
                                    <th>赛事开始时间</th>
                                    <th>玩法</th>
                                    <th>下注信息</th>
                                    <th>结算信息</th>
                                    <th>结算时间</th>
                                    <th>结算明细</th>
                                </tr>
                            </thead>
                        <tbody>
                        </tbody>
                        </table>
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
var appName='${appName}';
var startTime='${start_time}';
var endTime='${end_time}';
var long_no='${long_no}';
var userId='${userId}';
var type='${type}';
var contestId='${contestId}';
var playId='${playId}';
var support='${support}';
seajs.config({base: prefix+"user/"});
seajs.use("inner_settle");
</script>
</body>
</html>
