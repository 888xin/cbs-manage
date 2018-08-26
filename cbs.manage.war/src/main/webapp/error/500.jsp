<%--
  Created by IntelliJ IDEA.
  User: Lifeix
  Date: 15-9-30
  Time: 下午3:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
    <head>
        <meta charset="utf-8" />
        <title>500错误页面</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="${appName}/public/css/common.css" rel="stylesheet" />
    </head>
    <body>
        <div class="navbar navbar-default" id="navbar">
            <div class="navbar-container" id="navbar-container">
                <div class="navbar-header pull-left">
                    <a href="#" class="navbar-brand">
                    <small>
                        <i class="icon-leaf"></i>
                        大赢家后台管理系统
                    </small>
                    </a>
                </div>
            </div>
        </div>
        <div class="main-container" id="main-container">
            <div class="main-content-error">
                <div class="breadcrumbs" id="breadcrumbs">
                    <ul class="breadcrumb">
                        <li class="active">
                            <i class="icon-home home-icon"></i>
                            <a href="${appName}/gotopage/main.do">主页</a>
                        </li>
                        <li class="active">500错误</li>
                    </ul>
                    <!-- .breadcrumb -->
                </div>
                <div class="page-content">
                    <div class="row">
                        <div class="col-xs-12">
                            <!-- PAGE CONTENT BEGINS -->
                            <div class="error-container">
                                <div class="well">
                                    <h1 class="grey lighter smaller">
                                    <span class="blue bigger-125">
                                        <i class="icon-random"></i>
                                        500
                                    </span>
                                            服务器内部错误
                                        </h1>
                                    <hr />
                                    <h3 class="lighter smaller">
                                    我们正在急速修复
                                    <i class="icon-wrench icon-animated-wrench bigger-125"></i>
                                    稍安勿躁！
                                   </h3>
                                    <div class="space"></div>
                                    <div>
                                        <h4 class="lighter smaller">当然，你也可以尝试点击：</h4>
                                        <ul class="list-unstyled spaced inline bigger-110 margin-15">
                                            <li>
                                                <i class="icon-hand-right blue"></i>
                                                <a href="#">回到首页</a>
                                            </li>
                                            <li>
                                                <i class="icon-hand-right blue"></i>
                                                <a href="#">查看管理后台操作文档</a>
                                            </li>
                                            <li>
                                                <i class="icon-hand-right blue"></i>
                                                <a href="#">联系我们，把问题反馈！</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr />
                                    <div class="space"></div>
                                    <div class="center">
                                        <a href="javascript:void(0);" onclick="history.go(-1)" class="btn btn-grey">
                                            <i class="icon-arrow-left"></i> Go Back
                                        </a>
                                        <a href="#" class="btn btn-primary">
                                            <i class="icon-dashboard"></i> Dashboard
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
            <i class="icon-double-angle-up icon-only bigger-110"></i>
        </a>
        </div>
        <!-- /.main-container -->
    </body>
</html>
