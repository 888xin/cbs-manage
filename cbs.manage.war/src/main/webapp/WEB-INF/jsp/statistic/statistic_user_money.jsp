<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-12-22
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8"/>
    <title>用户每日龙币明细</title>
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
                        <a href="#">统计管理</a>
                    </li>
                    <li class="active">龙币明细</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <h4>
                            <label class="green bigger-110">请选择要查询的日期</label>
                            <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                            <span class="input-icon">
                                <input type="text" readonly class="nav-search-input" id="date_search" autocomplete="off" />
                                <i class="icon-time nav-search-icon"></i>
                            </span>

                            <label class="pull-right inline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <label class="pull-right inline">
                                <select id="filter">
                                    <option value="1">过滤机器人</option>
                                    <option value="2">不过滤机器人</option>
                                </select>
                                <div class="btn-group">
                                    <button data-toggle="dropdown" class="btn btn-sm btn-warning position-relative">排序
                                        <span class="icon-caret-down icon-on-right"></span>
                                    </button>
                                    <ul class="dropdown-menu dropdown-warning">
                                        <li>
                                            <a id="money_income_down_a" href="#">
                                                <i id="money_income_down" class="icon-ok green"></i>收入降序
                                            </a>
                                        </li>
                                        <li>
                                            <a id="money_income_up_a" href="#">
                                                <i id="money_income_up" class="icon-ok green invisible"></i>收入升序
                                            </a>
                                        </li>
                                        <li>
                                            <a id="money_out_down_a" href="#">
                                                <i id="money_out_down" class="icon-ok green invisible"></i>支出降序
                                            </a>
                                        </li>
                                        <li>
                                            <a id="money_out_up_a" href="#">
                                                <i id="money_out_up" class="icon-ok green invisible"></i>支出升序
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </label>
                        </h4>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="table-header">
									用户当日龙币收支明细
                                </div>
                                <div class="table-responsive">
                                    <table id="user_money_statistic_table" class="table table-striped table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th class="center">序号</th>
                                            <th class="center">用户ID</th>
                                            <th class="center">龙号</th>
                                            <th class="center">用户名</th>
                                            <th class="center">头像</th>
                                            <th class="center">用户总收入</th>
                                            <th class="center">用户总支出</th>
                                            <th class="center">用户下注支出</th>
                                            <th class="center">用户下注收入</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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
<!-- /.main-container -->

<script type="text/javascript">
    seajs.config({base: prefix+"statistic"});
    seajs.use("statistic_user_money.js");
</script>

</body>
</html>
