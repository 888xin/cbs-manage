<%--
  Created by IntelliJ IDEA.
  User: JJ
  Date: 16-4-19
  Time: 下午06:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8"/>
    <title>比赛模式管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/cbs-manage/table.css" />
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
                    <li class="active">比赛模式管理</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->

                                <label class="control-label purple bigger-150">当前模式：</label><span class="lbl bigger-120" id="mode"></span>
                                <hr/>

                                <div class="control-group" id="module_value">
                                        <div><label class="control-label purple bigger-150">修改模式：</label></div>

                                        <div class="radio">
                                        <label> <input name="module_value"
                                        type="radio" value="0" class="ace" /> <span
                                        class="lbl bigger-120"> 实时比分（默认） </span>
                                        </label>
                                        </div>

                                        <div class="radio">
                                        <label> <input name="module_value"
                                        type="radio" value="1" class="ace" /> <span
                                        class="lbl bigger-120"> 文字直播接管 </span>
                                        </label>
                                        </div>
                                </div>

                                <button id="change_module_button" class="btn btn-sm btn-info pull-left">
                                <i class="icon-save"></i> 确认修改
                                </button>
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
<script type="text/javascript">
    seajs.config({base: prefix+"event/"});
    seajs.use("event_module");
</script>
</body>
</html>
