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
    <title>下注统计</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/daterangepicker.css" />
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
                    <li class="active">下注统计</li>

                </ul><!-- .breadcrumb -->

            </div>

            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->


                    <div class='choose_wrap'>
                        <div id="datepicker"></div>
                        <div class="statselect" style="top:-5px;">             
                            <select name="" id="stattype">
                                <option value="1">折线图</option>
                                <option value="0">柱状图</option>
                            </select>
                        </div>
                    </div>
                    <div class='chart'>
                         <div id="graph"></div>
                    </div>

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
    seajs.use("statistic_bet.js");
</script>

</body>
</html>
