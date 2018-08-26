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
        <title>用户推荐管理</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
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
                                <a href="${appName}/gotopage/main">主页</a>
                            </li>
                            <li>
                                <a href="#">用户管理</a>
                            </li>
                            <li class="active">用户推荐</li>
                        </ul><!-- .breadcrumb -->
                    </div>
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- PAGE CONTENT BEGINS -->
                                <h4 class="pull-right">
                                    <button class="btn btn-sm btn-success" style="border-radius: 32px !important;" data-toggle="modal" data-target="#modal_user_star">添加推荐</button>
                                    <button class="btn btn-sm btn-warning" style="border-radius: 32px !important;" id="togger_user_bt">用户隐藏列表</button>
                                </h4>

                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="table-header">
                                            推荐记录
                                        </div>
                                        <div class="table-responsive">
                                            <table id="star_table" class="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="center">序号</th>
                                                        <th class="center">用户名</th>
                                                        <th class="center">龙号</th>
                                                        <th class="center">排名</th>
                                                        <th class="center">赢率</th>
                                                        <th class="center">展示计数</th>
                                                        <th class="center">点击计数</th>
                                                        <th class="center">因子</th>
                                                        <th class="center">
                                                            <i class="icon-time bigger-110 hidden-480"></i>
                                                            创建时间
                                                        </th>
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

                                <p class="center">
                                        <span id="star_data_more" class="btn btn-info" style="border-radius: 32px !important;">
                                            <i class="icon-arrow-down bigger-120"></i>
                                            <span class="bigger-110">继续加载</span>
                                        </span>
                                </p>



                                <!-- modal-dialog -->
                                <div id="modal_user_star" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog" style="width:800px;">
                                        <div class="modal-content">

                                            <div class="modal-header no-padding">
                                                <div class="table-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        <span class="white">&times;</span>
                                                    </button>
                                                    添加信息
                                                </div>
                                            </div>

                                            <div class="widget-box">
                                                <div class="widget-body">
                                                    <div class="widget-main">
                                                        <div>
                                                            <label for="modal_user_star_long_no" class="green bigger-150">龙号：</label>
                                                            <input class="form-control" type="text" id="modal_user_star_long_no" placeholder="填入龙号" />
                                                        </div>
                                                        <div>
                                                            <label for="modal_user_star_value" class="green bigger-150">数值：</label>
                                                            <input class="form-control" type="text" id="modal_user_star_value" placeholder="填入对应的数值（整数）" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer no-margin-top">
                                                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i>
                                                    关闭
                                                </button>
                                                <button id="modal_user_star_bt" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
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
            seajs.config({base: prefix+"user/"});
            seajs.use("user_star");
        </script>
    </body>
</html>
