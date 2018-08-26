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
        <title>押押下注记录</title>
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
                                <a href="#">赛事管理</a>
                            </li>
                            <li>
                                <a href="#">押押管理</a>
                            </li>
                            <li class="active">下注的记录</li>
                        </ul><!-- .breadcrumb -->
                    </div>
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- PAGE CONTENT BEGINS -->
                                <h4 class="pink">
                                    <span class="input-icon">
                                        <input type="text" placeholder="请输入押押赛事ID" class="nav-search-input" id="bet_search" autocomplete="off" />
                                        <i class="icon-list-ol nav-search-icon"></i>
                                    </span>
                                    <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                                    <a href="#" id="bet_search_a" role="button" class="red">
                                        查询该押押的下注记录
                                    </a>
                                </h4>

                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="table-header">
                                            下注记录
                                        </div>
                                        <div class="table-responsive">
                                            <table id="yy_bet_table" class="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="center">序号</th>
                                                        <th class="center">头像</th>
                                                        <th class="center">用户名</th>
                                                        <th class="center">龙号</th>
                                                        <th class="center">下注选项</th>
                                                        <th class="center">下注金额</th>
                                                        <th class="center">返奖金额</th>
                                                        <th class="center">赔率</th>
                                                        <th class="center">
                                                            <i class="icon-time bigger-110 hidden-480"></i>
                                                            下注时间
                                                        </th>
                                                        <th class="center">微信openId</th>
                                                         <th class="center">微信appId</th>
                                                        <th class="center">状态</th>
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
                                        <span id="yy_bet_data_more" class="btn btn-info">
                                            <i class="icon-arrow-down bigger-120"></i>
                                            <span class="bigger-110">继续加载</span>
                                        </span>
                                </p>


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
            var yy_bet_id = ${yy_id}
            seajs.config({base: prefix+"event/"});
            seajs.use("event_yy_bets");
        </script>
    </body>
</html>
