<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-9-24
  Time: 上午11:31
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<c:set var="appName" value="${pageContext.request.contextPath}" />
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
        <!-- /.navbar-header -->
        <div class="navbar-header pull-right" role="navigation">
            <ul class="nav ace-nav" id="ace_nav_ul">

                <li class="purple">
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                        <i class="icon-bell-alt icon-animated-bell"></i>
                        <span class="badge badge-important" id="header_num">0</span>
                    </a>
                    <ul class="pull-right dropdown-navbar navbar-pink dropdown-menu dropdown-caret dropdown-close">
                        <li class="dropdown-header" id="header_name">
                            <i class="icon-warning-sign"></i>
                            1条通知
                        </li>
                        <li>
                            <a href="${appName}/event/yy/show">
                            <div class="clearfix">
                                <span class="pull-left">
                                    <i class="btn btn-xs no-hover btn-pink icon-pinterest"></i>
                                应结算押押
                                </span>
                                <span class="pull-right badge badge-info" id="yy_num">+0</span>
                            </div>
                            </a>
                        </li>
                        <li>
                            <a href="${appName}/event/yy/show">
                            去结算押押
                            <i class="icon-arrow-right"></i>
                            </a>
                        </li>
                    </ul>
                </li>



                <%--<li class="green">--%>
                    <%--<a data-toggle="dropdown" class="dropdown-toggle" href="#">--%>
                        <%--<i class="icon-envelope icon-animated-vertical"></i>--%>
                        <%--<span class="badge badge-success" id="header_bet_num">0</span>--%>
                    <%--</a>--%>

                    <%--<ul class="pull-right dropdown-navbar dropdown-menu dropdown-caret dropdown-close">--%>

                        <%--<li class="dropdown-header">--%>
                            <%--<i class="icon-envelope-alt"></i>--%>
                            <%--1条消息--%>
                        <%--</li>--%>

                        <%--<li>--%>
                            <%--<a href="${appName}/statistic/money/detail">--%>
                                <%--<div class="clearfix">--%>
                                <%--<span class="pull-left">--%>
                                    <%--<i class="btn btn-xs no-hover btn-success icon-pinterest"></i>--%>
                                <%--异常结算记录--%>
                                <%--</span>--%>
                                    <%--<span class="pull-right badge badge-success" id="bet_num">+0</span>--%>
                                <%--</div>--%>
                            <%--</a>--%>
                        <%--</li>--%>

                        <%--&lt;%&ndash;<li>&ndash;%&gt;--%>
                            <%--&lt;%&ndash;<a href="${appName}/statistic/money/detail">&ndash;%&gt;--%>
                                <%--&lt;%&ndash;<div class="clearfix">&ndash;%&gt;--%>
                                <%--&lt;%&ndash;<span class="pull-left">&ndash;%&gt;--%>
                                    <%--&lt;%&ndash;<i class="btn btn-xs no-hover btn-success icon-pinterest"></i>&ndash;%&gt;--%>
                                <%--&lt;%&ndash;同一天相同赛事队伍&ndash;%&gt;--%>
                                <%--&lt;%&ndash;</span>&ndash;%&gt;--%>
                                    <%--&lt;%&ndash;<span class="pull-right badge badge-success" id="same_num">+0</span>&ndash;%&gt;--%>
                                <%--&lt;%&ndash;</div>&ndash;%&gt;--%>
                            <%--&lt;%&ndash;</a>&ndash;%&gt;--%>
                        <%--&lt;%&ndash;</li>&ndash;%&gt;--%>

                        <%--<li>--%>
                            <%--<a href="${appName}/statistic/money/detail">--%>
                                <%--获取异常结算记录--%>
                                <%--<i class="icon-arrow-right"></i>--%>
                            <%--</a>--%>
                        <%--</li>--%>

                    <%--</ul>--%>
                <%--</li>--%>


                <li class="light-blue">
                <%--<li class="red">--%>
                    <a data-toggle="dropdown" href="#" class="dropdown-toggle">
                        <img class="nav-user-photo" src="http://roi.skst.cn/${sessionScope.roleSession.path}"/>
                        <span class="user-info">
                            <small>欢迎光临,</small>
                            ${sessionScope.roleSession.rolename}
                        </span>
                        <i class="icon-caret-down"></i>
                    </a>
                    <ul class="user-menu pull-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
                        <li>
                            <a href="${appName}/gotopage/setting">
                                <i class="icon-cog"></i> 设置
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon-user"></i> 个人资料
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a href="${appName}/role/logout">
                                <i class="icon-off"></i> 退出
                            </a>
                        </li>
                    </ul>
                </li>




            </ul>
        </div>
    </div>
</div>
<script type="text/javascript">
var appName = "${appName}";
var yy_un_settle_num = "${yy_un_settle_num}";
</script>
<script src='${appName}/public/js/lib/jquery-2.0.3.min.js'></script>
<script src='${appName}/public/js/sea/seajs.min.js'></script>
