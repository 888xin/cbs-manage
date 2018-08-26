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
        <title>投注回滚</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
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
                                    <a href="#">赛事管理</a>
                                </li>
                                <li class="active">投注回滚</li>
                            </ul>
                            <!-- .breadcrumb -->
                        </div>
                        <div class="page-content">
                            <div class="row">
                                <div class="col-xs-12">
                                    <!-- PAGE CONTENT BEGINS -->
                                    <div class="alert alert-danger">
                                        <i class="icon-hand-right"></i> 请谨慎操作！
                                        <button class="close" data-dismiss="alert">
                                            <i class="icon-remove"></i>
                                        </button>
                                    </div>





                                    <div class="widget-box">
                                        <div class="widget-header widget-header-flat widget-header-small">
                                            <h5>
                                                <i class="icon-retweet"></i>
                                                投注回滚
                                            </h5>
                                        </div>

                                        <div class="widget-body">
                                            <div class="widget-main" id="rollback_main">

                                                    <div class="radio">
                                                        <label>
                                                            <input name="contest_type" type="radio" value="0" class="ace" />
                                                            <span class="lbl bigger-120"> 足球 </span>
                                                        </label>
                                                    </div>
                                                    <div class="radio">
                                                        <label>
                                                            <input name="contest_type" type="radio" value="1" class="ace" />
                                                            <span class="lbl bigger-120"> 篮球 </span>
                                                        </label>
                                                    </div>

                                                    <span class="lbl bigger-120"></span>

                                                    <div class="radio">
                                                        <label for="contest_id" class="green bigger-150">赛事ID：</label>
                                                        <input type="text" id="contest_id" placeholder="请输入赛事ID" />
                                                    </div>
                                                    <span class="lbl bigger-120"></span>

                                                    <div class="radio">
                                                        <button id="contest_rollback_bt" class="btn btn-danger btn-xs">
                                                            <i class="icon-reply"></i>
                                                            回滚
                                                        </button>
                                                    </div>
                                            </div><!-- /widget-main -->
                                        </div><!-- /widget-body -->
                                    </div><!-- /widget-box -->




                                    <!-- PAGE CONTENT ENDS -->
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
         seajs.config({base: prefix+"event/"});
        seajs.use("event_rollback");
        </script>
    </body>
</html>
