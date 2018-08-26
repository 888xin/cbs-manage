<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8" />
    <title>登录页面 - 大赢家后台管理系统</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css"/>
    <%--<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300" />--%>
</head>
<body class="login-layout">
<div class="main-container">
    <div class="main-content">
        <div class="row">
            <div class="col-sm-10 col-sm-offset-1">
                <div class="login-container">
                    <div class="center">
                        <h1>
                            <i class="icon-leaf green"></i>
                            <span class="red">大赢家</span>
                            <span class="white">管理后台</span>
                        </h1>
                        <h4 class="blue">&copy; 立方网</h4>
                    </div>
                    <div class="space-6"></div>
                    <div class="position-relative">
                        <div id="login-box" class="login-box visible widget-box no-border">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <h4 class="header blue lighter bigger">
                                        <i class="icon-coffee green"></i>
                                        请输入您的登录信息
                                    </h4>
                                    <div class="space-6"></div>
                                    <form name="loginForm" method="post" action="${appName}/role/check">
                                        <i class="red">${error}</i>
                                        <fieldset>
                                            <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
                                                            <input type="text" id="username" name="username" class="form-control" placeholder="账户名" />
                                                            <i class="icon-user"></i>
                                                        </span>
                                            </label>
                                            <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
                                                            <input type="password" id="password" name="password" class="form-control" placeholder="密码" />
                                                            <i class="icon-lock"></i>
                                                        </span>
                                            </label>
                                            <div class="space"></div>
                                            <div class="clearfix">
                                                <label class="inline">
                                                    <input type="checkbox" class="ace" id="remember_me"/>
                                                    <span class="lbl"> 记住我</span>
                                                </label>
                                                <button id="login" type="button" class="width-35 pull-right btn btn-sm btn-primary">
                                                    <i class="icon-key"></i>
                                                    登录
                                                </button>
                                            </div>
                                            <div class="space-4"></div>
                                        </fieldset>
                                    </form>
                                </div><!-- /widget-main -->
                                <div class="toolbar clearfix">
                                    <div>
                                        <a href="#"  class="forgot-password-link">
                                            <i class="icon-arrow-left"></i>
                                            忘记密码
                                        </a>
                                    </div>
                                    <div>
                                        <a href="#" class="user-signup-link">
                                            注册
                                            <i class="icon-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div><!-- /widget-body -->
                        </div><!-- /login-box -->
                        <div id="forgot-box" class="forgot-box widget-box no-border">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <h4 class="header red lighter bigger">
                                        <i class="icon-key"></i>
                                        Retrieve Password
                                    </h4>
                                    <div class="space-6"></div>
                                    <p>
                                        Enter your email and to receive instructions
                                    </p>
                                    <form>
                                        <fieldset>
                                            <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
                                                            <input type="email" class="form-control" placeholder="Email" />
                                                            <i class="icon-envelope"></i>
                                                        </span>
                                            </label>
                                            <div class="clearfix">
                                                <button type="button" class="width-35 pull-right btn btn-sm btn-danger">
                                                    <i class="icon-lightbulb"></i>
                                                    Send Me!
                                                </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div><!-- /widget-main -->
                                <div class="toolbar center">
                                    <a href="#" class="back-to-login-link">
                                        回到登陆页
                                        <i class="icon-arrow-right"></i>
                                    </a>
                                </div>
                            </div><!-- /widget-body -->
                        </div><!-- /forgot-box -->
                        <div id="signup-box" class="signup-box widget-box no-border">
                            <div class="widget-body">
                                <div class="widget-main">
                                    <h4 class="header green lighter bigger">
                                        <i class="icon-group blue"></i>
                                        新用户注册
                                    </h4>
                                    <div class="space-6"></div>
                                    <p> 请输入您的注册信息: </p>
                                    <form>
                                        <fieldset>
                                            <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
                                                            <input id="new_username" type="text" class="form-control" placeholder="用户名" />
                                                            <i class="icon-user"></i>
                                                        </span>
                                            </label>
                                            <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
                                                            <input id="new_password" type="password" class="form-control" placeholder="密码" />
                                                            <i class="icon-lock"></i>
                                                        </span>
                                            </label>
                                            <label class="block clearfix">
                                                        <span class="block input-icon input-icon-right">
                                                            <input id="new_repassword" type="password" class="form-control" placeholder="确认密码" />
                                                            <i class="icon-retweet"></i>
                                                        </span>
                                            </label>
                                            <label class="block">
                                                <input id="protocol" type="checkbox" class="ace" />
                                                        <span class="lbl">
                                                            我接受
                                                            <a href="#">用户协议</a>
                                                        </span>
                                            </label>
                                            <div class="space-24"></div>
                                            <div class="clearfix">
                                                <button type="reset" class="width-30 pull-left btn btn-sm">
                                                    <i class="icon-refresh"></i>
                                                    重置
                                                </button>
                                                <button type="button" class="width-65 pull-right btn btn-sm btn-success" id="register_bt">
                                                    确认注册
                                                    <i class="icon-arrow-right icon-on-right"></i>
                                                </button>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div class="toolbar center">
                                    <a href="#" class="back-to-login-link">
                                        <i class="icon-arrow-left"></i>
                                        回到登陆页
                                    </a>
                                </div>
                            </div><!-- /widget-body -->
                        </div><!-- /signup-box -->
                    </div><!-- /position-relative -->
                </div>
            </div><!-- /.col -->
        </div><!-- /.row -->
    </div>
</div><!-- /.main-container -->
<script type="text/javascript">
var appName="${appName}";
</script>
<script src='${appName}/public/js/lib/jquery-2.0.3.min.js'></script>
<script src='${appName}/public/js/sea/seajs.min.js'></script>
<script type="text/javascript">
seajs.config({base:prefix+"login/"});
seajs.use("login");
</script>
</body>
</html>
