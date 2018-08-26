<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-9-23
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>主页</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/common.css"/>
    </head>
    <body class="skin-3">
        <%@ include file="manage_head.jsp"%>
        <div class="main-container" id="main-container">
            <div class="main-container-inner">
                <a class="menu-toggler" id="menu-toggler" href="#">
                    <span class="menu-text"></span>
                </a>
                <%@ include file="manage_menu.jsp"%>
                <div class="main-content">
                    <div class="breadcrumbs" id="breadcrumbs">
                        <ul class="breadcrumb">
                            <li class="active">
                                <i class="icon-home home-icon"></i>
                                <a href="${appName}/gotopage/main">主页</a>
                            </li>
                        </ul><!-- .breadcrumb -->
                    </div>
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12" id="append_info">
                                <!-- PAGE CONTENT BEGINS -->



                                <div class="alert alert-info">
                                    <i class="icon-hand-right"></i>
                                    欢迎来到大赢家管理后台
                                    <button class="close" data-dismiss="alert">
                                        <i class="icon-remove"></i>
                                    </button>
                                </div>



                                <c:if test="${PHONE == 0}">

                                    <div class="widget-box" id="validate_box">
                                        <div class="widget-header widget-header-flat widget-header-small">
                                            <h5>
                                                <i class="icon-phone"></i>
                                                外网登陆输入手机验证码
                                            </h5>
                                        </div>

                                        <div class="widget-body">
                                            <div class="widget-main" id="rollback_main">


                                                <div class="radio">
                                                    <label for="validate_code" class="green bigger-150">验证码</label>
                                                    <input type="text" id="validate_code" placeholder="请输入验证码" />
                                                </div>
                                                <span class="lbl bigger-120"></span>

                                                <div class="radio">
                                                    <button id="validate_bt" class="btn btn-danger btn-xs">
                                                        <i class="icon-bolt"></i>
                                                        验证
                                                    </button>
                                                </div>

                                            </div><!-- /widget-main -->
                                        </div><!-- /widget-body -->
                                    </div><!-- /widget-box -->

                                </c:if>



                                <div class="infobox-container">

                                    <div class="infobox infobox-red">
                                        <div class="infobox-icon">
                                            <i class="icon-sun"></i>
                                        </div>
                                        <div class="infobox-data">
                                            <span class="infobox-data-number" id="fb_same_num">0</span>
                                            <div class="infobox-content">足球出现两次相同的球队</div>
                                        </div>
                                        <div class="xin">
                                            <button class="btn btn-danger btn-minier" id="fb_same_bt">详情</button>
                                            <button class="btn btn-danger btn-minier" id="fb_same_refresh">刷新</button>
                                        </div>
                                    </div>

                                    <div class="infobox infobox-blue">
                                        <div class="infobox-icon">
                                            <i class="icon-moon"></i>
                                        </div>
                                        <div class="infobox-data">
                                            <span class="infobox-data-number" id="bb_same_num">0</span>
                                            <div class="infobox-content">篮球出现两次相同的球队</div>
                                        </div>
                                        <div class="xin">
                                            <button class="btn btn-info btn-minier" id="bb_same_bt">详情</button>
                                            <button class="btn btn-info btn-minier" id="bb_same_refresh">刷新</button>
                                        </div>
                                    </div>

                                    <div class="infobox infobox-orange">
                                        <div class="infobox-icon">
                                            <i class="icon-yen"></i>
                                        </div>
                                        <div class="infobox-data">
                                            <span class="infobox-data-number" id="much_money_num">0</span>
                                            <div class="infobox-content">下注超过一千块的支持方</div>
                                        </div>
                                        <div class="xin">
                                            <button class="btn btn-warning btn-minier" id="much_money_bt">详情</button>
                                            <button class="btn btn-warning btn-minier" id="much_money_refresh">刷新</button>
                                        </div>
                                    </div>


                                    <div class="infobox infobox-purple">
                                        <div class="infobox-icon">
                                            <i class="icon-sitemap"></i>
                                        </div>
                                        <div class="infobox-data">
                                            <span class="infobox-data-number" id="contest_un_settle_num">0</span>
                                            <div class="infobox-content">赛事异常结算记录</div>
                                        </div>
                                    </div>

                                </div>

                                <%--<div class="space-6"></div>--%>
                                <%--<div class="alert alert-danger">--%>
                                    <%--欢迎来到大赢家管理后台--%>
                                    <%--<button class="close" data-dismiss="alert">--%>
                                        <%--<i class="icon-remove"></i>--%>
                                    <%--</button>--%>
                                <%--</div>--%>

                                <%--<div class="space-6"></div>--%>
                                <%--<div class="alert alert-success">--%>
                                    <%--<button class="close" data-dismiss="alert">--%>
                                        <%--<i class="icon-remove"></i>--%>
                                    <%--</button>--%>
                                    <%--<h4>欢迎来到大赢家管理后台</h4>--%>
                                    <%--<h4>欢迎来到大赢家管理后台</h4>--%>
                                <%--</div>--%>

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
            seajs.config({base: prefix+"common/"});
            seajs.use("manage_main");
        </script>
    </body>
</html>
