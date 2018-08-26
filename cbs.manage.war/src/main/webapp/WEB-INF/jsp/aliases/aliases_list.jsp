<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-9-23
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
    <head>
        <meta charset="utf-8" />
        <title>马甲管理</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/common.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
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
                                <a href="${appName}/gotopage/main">主页</a>
                            </li>
                            <li class="active">马甲管理</li>
                        </ul>
                        <!-- .breadcrumb -->
                    </div>
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- PAGE CONTENT BEGINS -->
                                <%--<div class="hr hr-18 dotted hr-double"></div>--%>
                                <h4 class="pink">
                                    <span class="input-icon">
                                        <input type="text" placeholder="请输入马甲龙号" class="nav-search-input" id="search-aliases" autocomplete="off" />
                                        <i class="icon-user nav-search-icon"></i>
                                    </span>
                                    <span class="input-icon">
                                        <input type="password" placeholder="请输入密码（查询不出用户尝试）" class="nav-search-input input-xlarge" id="search-aliases-password" autocomplete="off" />
                                        <i class="icon-lock nav-search-icon"></i>
                                    </span>
                                    <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                                    <a href="#" id="search_aliases_modal" role="button" class="green">
                                        添加马甲
                                    </a>
                                </h4>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <h3 class="header smaller lighter blue">马甲管理区域</h3>
                                        <div class="table-header">
                                            马甲用户列表
                                        </div>
                                        <div class="table-responsive">
                                            <table id="aliases_table" class="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="center width-4">
                                                            <label>
                                                                <input type="checkbox" class="ace" />
                                                                <span class="lbl"></span>
                                                            </label>
                                                        </th>
                                                        <th>用户Id</th>
                                                        <th>龙号</th>
                                                        <th>名称</th>
                                                        <th>头像</th>
                                                        <th>
                                                            <i class="icon-time bigger-110 hidden-480"></i> 加入时间
                                                        </th>
                                                        <th>状态</th>
                                                        <th>操作</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div id="modal-info" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header no-padding">
                                                <div class="table-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        <span class="white">&times;</span>
                                                    </button>
                                                    马甲信息
                                                </div>
                                            </div>
                                            <div class="widget-box" id="modal_content">
                                            </div>
                                            <div class="modal-footer no-margin-top">
                                                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i> 关闭
                                                </button>
                                                <button id="tree_submit_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                                    <i class="icon-check"></i> 确认添加
                                                </button>
                                            </div>
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
        <script type="text/javascript">
            seajs.config({base: prefix+"aliases/"});
            seajs.use("aliases_list");
        </script>
    </body>
</html>
