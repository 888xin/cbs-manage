<%--
  Created by IntelliJ IDEA.
  User: Lhx
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
    <title>用户设置</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.custom.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/select2.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-editable.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/fakeLoader.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
</head>
<body class="skin-3">
    <%@ include file="../common/manage_head.jsp"%>
    <div class="fakeLoader"></div>
    <!-- /.navbar-header -->
    <div class="main-container" id="main-container">
        <div class="main-content-error">
            <div class="breadcrumbs" id="breadcrumbs">
                <ul class="breadcrumb">
                    <li class="active">
                        <i class="icon-home home-icon"></i>
                        <a href="${appName}/gotopage/main.do">主页</a>
                    </li>
                    <li class="active">用户设置</li>
                </ul>
                <!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div id="user-profile-1" class="user-profile row">
                            <div class="col-xs-12 col-sm-3 center">
                                <div>
                                    <span class="profile-picture">
                                    <img id="avatar" class="editable img-responsive" alt="Alex's Avatar" src="http://roi.skst.cn/${sessionScope.roleSession.path}" />
                                    </span>
                                    <div class="space-4"></div>
                                    <div class="width-80 label label-info label-xlg arrowed-in arrowed-in-right">
                                        <div class="inline position-relative">
                                            <a href="#" class="user-title-label dropdown-toggle" data-toggle="dropdown">
                                                <i class="icon-circle light-green middle"></i> &nbsp;
                                                <span class="white">${sessionScope.roleSession.rolename}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-9">
                                <div class="space-12"></div>
                                <div class="profile-user-info profile-user-info-striped">
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> 帐户名 </div>
                                        <div class="profile-info-value">
                                            <span class="editable" id="username">${sessionScope.roleSession.rolename}</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> 地址 </div>
                                        <div class="profile-info-value">
                                            <i class="icon-map-marker light-orange bigger-110"></i>
                                            <span class="editable" id="country">广东</span>
                                            <span class="editable" id="city">深圳</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> 年龄 </div>
                                        <div class="profile-info-value">
                                            <span class="editable" id="age">28</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> 注册时间 </div>
                                        <div class="profile-info-value">
                                            <span class="editable" id="signup">${sessionScope.roleSession.registerTime}</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> 上一次登陆时间 </div>
                                        <div class="profile-info-value">
                                            <span class="editable" id="login">3 hours ago</span>
                                        </div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"> 密码 </div>
                                        <div class="profile-info-value">
                                            <span class="editable" id="password">******</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-6"></div>
                                <div class="center">
                                    <button id="back_main" class="btn btn-sm btn-primary">
                                        <i class="icon-arrow-left"></i> 返回主页
                                    </button>
                                </div>
                                <div class="space-20"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- PAGE CONTENT ENDS -->
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.main-container-inner -->
    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="icon-double-angle-up icon-only bigger-110"></i>
    </a>
    <!-- /.main-container -->
      <script type="text/javascript">
        var roleId = '${sessionScope.roleSession.roleId}';
        seajs.config({base: prefix+"role/"});
        seajs.use("role_setting");
      </script>
</body>
</html>
