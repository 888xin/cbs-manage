
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>

    <meta charset="utf-8"/>
    <title>评论管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/cbs-manage/circle_comment.css" />

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
                        <a href="#">内容管理</a>
                    </li>
                    <li class="active">评论管理</li>

                </ul><!-- .breadcrumb -->

            </div>

            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="tabbable">
                   
                            <div class="tab-content">
                                <div id="frontpages_content_tab" class="tab-pane in active">

                                    <div class="table-header">
                                        猜友圈评论列表
                                        <a href="javascript:void(0);" id="shield_by_key" class="btn btn-danger btn-xs pull-right">一键屏蔽</a>
                                    </div>
                                    <div class="table-responsive">
                                        <table id="frontpages_content_table" class="table table-striped table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th class="center width-4">
                                                    <label>
                                                        <input id="selectAll" type="checkbox" class="ace"/>
                                                        <span class="lbl"></span>全选
                                                    </label>
                                                </th>
                                                <th class="center">内容ID</th>
                                                <th class="width-10 center">发布人</th>
                                                <th class="width-30 center">内容</th>
                                                <th class="center">
                                                    <i class="icon-time bigger-110 hidden-480"></i>
                                                    创建时间
                                                </th>
                                                <th class="width-10 center">操作</th>
                                            </tr>
                                            </thead>
                                            <tbody class='tbody'>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p class="align-center">
                                        <span id="comment_data_more" class="btn btn-pink no-border">
                                            <i class="icon-arrow-down bigger-130"></i>
                                            <span class="bigger-110">继续加载</span>
                                        </span>
                                    </p>
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
    seajs.config({base: prefix+"content"});
    seajs.use("circlecomment.js");
</script>

</body>
</html>
