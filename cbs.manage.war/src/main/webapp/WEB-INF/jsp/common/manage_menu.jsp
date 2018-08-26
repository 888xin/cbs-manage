<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-9-24
  Time: 下午12:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<div class="sidebar" id="sidebar">
	<script type="text/javascript">
		try {
			ace.settings.check('sidebar', 'fixed')
		} catch (e) {
		}
	</script>

	<div class="sidebar-shortcuts" id="sidebar-shortcuts">
		<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
			<button class="btn btn-success">
				<i class="icon-signal"></i>
			</button>

			<button class="btn btn-info">
				<i class="icon-pencil"></i>
			</button>

			<button id="menu_setting" class="btn btn-warning">
				<i class="icon-cogs"></i>
			</button>

            <button id="menu_logout" class="btn btn-danger">
                <i class="icon-off"></i>
            </button>
		</div>

		<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
			<span class="btn btn-success"></span> <span class="btn btn-info"></span>

			<span class="btn btn-warning"></span> <span class="btn btn-danger"></span>
		</div>
	</div>
	<!-- #sidebar-shortcuts -->

	<ul id="menu_list" class="nav nav-list">

		<li id="main"><a href="${appName}/gotopage/main"> <i
				class="icon-home"></i> <span class="menu-text"> 欢迎页面 </span>
		</a></li>


        <c:forEach items="${sessionScope.resKeys}" var="resKey">
            <c:if test="${resKey == 'sys_all' || resKey == 'sys_role'}">

                <li id="authority_item">
                    <a href="#" class="dropdown-toggle">
                        <i class="icon-group"></i>
                        <span class="menu-text"> 角色管理 </span>
                        <b class="arrow icon-angle-down"></b>
                    </a>

                    <ul class="submenu">

                        <li id="authority">
                            <a href="${appName}/authority/getlist">
                                <i class="icon-double-angle-right"></i>
                                权限管理
                            </a>
                        </li>

                        <li id="role">
                            <a href="${appName}/role/getlist">
                                <i class="icon-double-angle-right"></i>
                                角色列表
                            </a>
                        </li>


                        <li id="role_log">
                            <a href="${appName}/role/log/show">
                                <i class="icon-double-angle-right"></i>
                                登陆日志
                            </a>
                        </li>


                        <li id="aliases">
                            <a href="${appName}/aliases/show">
                                <i class="icon-double-angle-right"></i>
                                马甲管理
                            </a>
                        </li>

                    </ul>
                </li>

            </c:if>
        </c:forEach>

        <c:forEach items="${sessionScope.resKeys}" var="resKey">
            <c:if test="${resKey == 'sys_all' || resKey == 'sys_event'}">


                <li id="event_item">
                    <a href="#" class="dropdown-toggle">
                        <i class="icon-bar-chart"></i>
                        <span class="menu-text"> 赛事管理 </span>
                        <b class="arrow icon-angle-down"></b>
                    </a>

                    <ul class="submenu">


                        <li id="event_fb"><a href="${appName}/event/football/show">
                            <i class="icon-double-angle-right"></i> 足球赛事
                        </a></li>



                        <li id="event_bb"><a href="${appName}/event/basketball/show">
                            <i class="icon-double-angle-right"></i> 篮球赛事
                        </a></li>



                        <li id="event_settle"><a
                                href="${appName}/gotopage/show/settle"> <i
                                class="icon-double-angle-right"></i> 赛事结算
                        </a></li>


                        <li id="event_odds_manage"><a
                                href="${appName}/gotopage/show/odds"> <i
                                class="icon-double-angle-right"></i> 赔率管理
                        </a></li>



                        <li id="event_rollback">
                            <a href="${appName}/event/restore/rollback/show">
                                <i class="icon-double-angle-right"></i>
                                投注回滚
                            </a>
                        </li>

                        <li id="event_team_edit"><a href="${appName}/event/editteam/show">
                            <i class="icon-double-angle-right"></i> 球队管理
                        </a></li>

                        <li id="event_cup_edit"><a href="${appName}/event/cup/show">
                            <i class="icon-double-angle-right"></i> 联赛管理
                        </a></li>


                        <li id="event_player_edit"><a href="${appName}/event/player/show">
                            <i class="icon-double-angle-right"></i> 球员管理
                        </a></li>

                        <li id="event_module"><a href="${appName}/event/match/module/show">
                            <i class="icon-double-angle-right"></i> 比分模式管理
                        </a></li>


                        <li id="event_yy_item">
                            <a href="#" class="dropdown-toggle">
                                <i class="icon-double-angle-right"></i>
                                押押管理
                                <b class="arrow icon-angle-down"></b>
                            </a>

                            <ul class="submenu">
                                <li id="event_yy_show">
                                    <a href="${appName}/event/yy/show">
                                        <i class="red icon-pinterest"></i>
                                        显示的押押
                                    </a>
                                </li>

                                <li id="event_yy_hide">
                                    <a href="${appName}/event/yy/show/hide">
                                        <i class="red icon-list-ol"></i>
                                        隐藏的押押
                                    </a>
                                </li>

                                <li id="event_yy_bet">
                                    <a href="${appName}/event/yy/show/bet">
                                        <i class="red icon-trophy"></i>
                                        下注的记录
                                    </a>
                                </li>


                            </ul>
                        </li>
<li id="event_contest_ad_list"><a href="${appName}/event/contest/ad/show">
                            <i class="icon-double-angle-right"></i> 赛事广告
                        </a></li>
                    </ul>
                </li>

            </c:if>
        </c:forEach>

        <c:forEach items="${sessionScope.resKeys}" var="resKey">
            <c:if test="${resKey == 'sys_all' || resKey == 'sys_rank'}">


                <li id="rank_item">
                    <a href="#" class="dropdown-toggle">
                        <i class="icon-calendar"></i>
                        <span class="menu-text"> 榜单管理 </span>
                        <b class="arrow icon-angle-down"></b>
                    </a>

                    <ul class="submenu">

                        <li id="rankwinning">
                            <a href="${appName}/rank/rankshow/winning">
                                <i class="icon-double-angle-right"></i>
                                胜率榜
                            </a>
                        </li>

                        <li id="rankroi">
                            <a href="${appName}/rank/rankshow/roi">
                                <i class="icon-double-angle-right"></i>
                                盈利榜
                            </a>
                        </li>


                    </ul>
                </li>

            </c:if>
        </c:forEach>

        <c:forEach items="${sessionScope.resKeys}" var="resKey">
            <c:if test="${resKey == 'sys_all' || resKey == 'sys_user'}">

                <li id="cbs_user_item">
                    <a href="#" class="dropdown-toggle">
                        <i class="icon-user"></i>
                        <span class="menu-text"> 用户管理 </span>
                        <b class="arrow icon-angle-down"></b>
                    </a>
                    <ul class="submenu">

                        <li id="event_inner_gold">
                            <a href="${appName}/user/show">
                                <i class="icon-double-angle-right"></i> 搜索
                            </a>
                        </li>

                        <li id="event_inner_bet">
                            <a href="${appName}/bet/show">
                                <i class="icon-double-angle-right"></i>
                                下注记录
                            </a>
                        </li>


                        <li id="event_inner_settle">
                            <a href="${appName}/rank/innersettleshow">
                                <i class="icon-double-angle-right"></i> 结算记录
                            </a>
                        </li>
                        
						<li id="event_friend_circle_settle">
                            <a href="${appName}/fircirsettle/show">
                                <i class="icon-double-angle-right"></i> 朋友圈结算
                            </a>
                        </li>

                        <li id="user_gold_detail">
                            <a href="${appName}/statistic/gold/detail">
                                <i class="icon-double-angle-right"></i> 龙筹明细
                            </a>
                        </li>

                        <li id="user_money_detail">
                            <a href="${appName}/statistic/money/detail">
                                <i class="icon-double-angle-right"></i> 龙币明细
                            </a>
                        </li>


                        <li id="user_star">
                            <a href="${appName}/user/star/show">
                                <i class="icon-double-angle-right"></i>
                                推荐记录
                            </a>
                        </li>

                        <li id="user_coupons">
                            <a href="${appName}/coupons/show">
                                <i class="icon-double-angle-right"></i>
                                龙筹券管理
                            </a>
                        </li>

                        <li id="user_moneycard">
                            <a href="${appName}/moneycard/show">
                                <i class="icon-double-angle-right"></i>
                                充值卡管理
                            </a>
                        </li>

                    </ul>
                </li>

            </c:if>
        </c:forEach>

        <c:forEach items="${sessionScope.resKeys}" var="resKey">
            <c:if test="${resKey == 'sys_all' || resKey == 'sys_statistic'}">

                <li id="statistic_item">
                    <a href="#" class="dropdown-toggle">
                        <i class="icon-tasks"></i>
                        <span class="menu-text">统计管理</span>
                        <b class="arrow icon-angle-down"></b>
                    </a>

                    <ul class="submenu">

                        <li id="statistic_gold">
                            <a href="${appName}/statistic/show">
                                <i class="icon-double-angle-right"></i>
                                龙筹/龙币统计
                            </a>
                        </li>

                        <li id="statistic_bet">
                            <a href="${appName}/statistic/bet/show">
                                <i class="icon-double-angle-right"></i>
                                下注统计
                            </a>
                        </li>

                        <li id="statistic_user_money">
                            <a href="${appName}/statistic/user/money/show">
                                <i class="icon-double-angle-right"></i>
                                龙币明细
                            </a>
                        </li>

                        <li id="statistic_user_login">
                            <a href="${appName}/statistic/user/login/show">
                                <i class="icon-double-angle-right"></i>
                                每月登陆
                            </a>
                        </li>
                        
                                <li id="statistic_bill">
                            <a href="${appName}/statistic/bill/show">
                                <i class="icon-double-angle-right"></i>
                                账单对账
                            </a>
                        </li>
                        
                          <li id="statistic_message">
                            <a href="${appName}/statistic/massage/show"><i class="icon-double-angle-right"></i>短信余量</a>
                        </li>

                    </ul>
                </li>

            </c:if>
        </c:forEach>

        <c:forEach items="${sessionScope.resKeys}" var="resKey">
            <c:if test="${resKey == 'sys_all' || resKey == 'sys_goods'}">

                <li id="goods_item">
                    <a href="#" class="dropdown-toggle">
                        <i class="icon-gift"></i>
                        <span class="menu-text"> 商品管理 </span>
                        <b class="arrow icon-angle-down"></b>
                    </a>

                    <ul class="submenu">

                        <li id="goods">
                            <a href="${appName}/goods/show">
                                <i class="icon-double-angle-right"></i>
                                商品展示
                            </a>
                        </li>

                        <li id="goods_order">
                            <a href="${appName}/goods/order/show">
                                <i class="icon-double-angle-right"></i>
                                商品订单
                            </a>
                        </li>

                        <li id="goods_add">
                            <a href="${appName}/goods/show/add">
                                <i class="icon-double-angle-right"></i>
                                商品添加
                            </a>
                        </li>

                        <li id="goods_nav">
                            <a href="${appName}/goods/recommend/show">
                                <i class="icon-double-angle-right"></i>
                                商品导航
                            </a>
                        </li>

                    </ul>
                </li>

            </c:if>
        </c:forEach>

        <c:forEach items="${sessionScope.resKeys}" var="resKey">
            <c:if test="${resKey == 'sys_all' || resKey == 'sys_content'}">

                <li id="content_item">
                    <a href="#" class="dropdown-toggle">
                        <i class="icon-list-alt"></i>
                        <span class="menu-text"> 内容管理 </span>
                        <b class="arrow icon-angle-down"></b>
                    </a>

                    <ul class="submenu">

                        <li id="placard">
                            <a href="${appName}/placard/show">
                                <i class="icon-double-angle-right"></i>
                                公告管理
                            </a>
                        </li>


                        <li id="front_page">
                            <a href="${appName}/frontpage/show">
                                <i class="icon-double-angle-right"></i>
                                头版管理
                            </a>
                        </li>

                        <li id="inform">
                            <a href="${appName}/inform/show">
                                <i class="icon-double-angle-right"></i>
                                举报管理
                            </a>
                        </li>
                        <li id="commend">
                            <a href="${appName}/circlecomment/show">
                                <i class="icon-double-angle-right"></i>
                                评论管理
                            </a>
                        </li>

                        <li id="friend_circle">
                            <a href="${appName}/friend/circle/show">
                                <i class="icon-double-angle-right"></i>
                                猜友圈管理
                            </a>
                        </li>

                        <li id="contest_news">
                            <a href="${appName}/contest/news/show">
                                <i class="icon-double-angle-right"></i>
                                赛事新闻
                            </a>
                        </li>



                        <li id="content_recommed_item">
                            <a href="#" class="dropdown-toggle">
                                <i class="icon-double-angle-right"></i>
                                推荐管理
                                <b class="arrow icon-angle-down"></b>
                            </a>

                            <ul class="submenu">
                                <li id="friend_circle_reason">
                                    <a href="${appName}/friend/circle/reason/show">
                                        <i class="orange icon-columns"></i>
                                        投注理由
                                    </a>
                                </li>

                                <li id="friend_circle_remakes">
                                    <a href="${appName}/friend/circle/remakes/show">
                                        <i class="orange icon-comments"></i>
                                        用户吐槽
                                    </a>
                                </li>

                            </ul>
                        </li>

                        <li id="boot_info">
                            <a href="${appName}/boot/list">
                                <i class="icon-double-angle-right"></i>
                                广告管理
                            </a>
                        </li>

                        <li id="memcache">
                            <a href="${appName}/memcache/show">
                                <i class="icon-double-angle-right"></i>
                                缓存清理
                            </a>
                        </li>


                    </ul>
                </li>

            </c:if>
        </c:forEach>

        <c:forEach items="${sessionScope.resKeys}" var="resKey">
            <c:if test="${resKey == 'sys_all' || resKey == 'sys_im'}">

                <li id="im_item">
                    <a href="#" class="dropdown-toggle">
                        <i class="icon-weibo"></i>
                        <span class="menu-text"> IM管理 </span>
                        <b class="arrow icon-angle-down"></b>
                    </a>
                    <ul class="submenu">

                        <li id="im_room">
                            <a href="${appName}/im/roomlist">
                                <i class="icon-double-angle-right"></i>
                                房间管理
                            </a>
                        </li>
                        <li id="im_chat">
                            <a href="${appName}/im/message">
                                <i class="icon-double-angle-right"></i>
                                消息管理
                            </a>
                        </li>
                        <li id="im_banned">
                            <a href="${appName}/im/banned">
                                <i class="icon-double-angle-right"></i>
                                禁言管理
                            </a>
                        </li>
                    </ul>
                </li>

            </c:if>
        </c:forEach>

        <c:forEach items="${sessionScope.resKeys}" var="resKey">
            <c:if test="${resKey == 'sys_all' || resKey == 'sys_community'}">

                <li id="community_item">
                    <a href="#" class="dropdown-toggle">
                        <i class="icon-globe"></i>
                        <span class="menu-text"> 社区管理 </span>
                        <b class="arrow icon-angle-down"></b>
                    </a>
                    <ul class="submenu">
                        <li id="community_list">
                            <a href="${appName}/community/list">
                                <i class="icon-double-angle-right"></i>
                                社区及分类管理
                            </a>
                        </li>
                        <li id="community_report">
                            <a href="${appName}/community/reports/show">
                                <i class="icon-double-angle-right"></i>
                                社区举报管理
                            </a>
                        </li>
                        <li id="community_post">
                            <a href="${appName}/community/posts/show">
                                <i class="icon-double-angle-right"></i>
                                帖子管理
                            </a>
                        </li>
                        <li id="community_comment">
                            <a href="${appName}/community/comments/show">
                                <i class="icon-double-angle-right"></i>
                                社区评论管理
                            </a>
                        </li>
                    </ul>
                </li>
            </c:if>
        </c:forEach>



        <c:forEach items="${sessionScope.resKeys}" var="resKey">
            <c:if test="${resKey == 'sys_all' || resKey == 'sys_activity'}">

                <li id="activity_item">
                    <a href="#" class="dropdown-toggle">
                        <i class="icon-trophy"></i>
                        <span class="menu-text"> 活动管理 </span>
                        <b class="arrow icon-angle-down"></b>
                    </a>
                    <ul class="submenu">
                        <li id="bunch">
                            <a href="${appName}/bunch/show">
                                <i class="icon-double-angle-right"></i>
                                赛事串
                            </a>
                        </li>

                        <li id="mission">
                            <a href="${appName}/mission/show">
                                <i class="icon-double-angle-right"></i>
                                任务积分
                            </a>
                        </li>

                    </ul>
                </li>

            </c:if>
        </c:forEach>





	</ul>
	<!-- /.nav-list -->

	<div class="sidebar-collapse" id="sidebar-collapse">
		<i class="icon-double-angle-left" data-icon1="icon-double-angle-left"
			data-icon2="icon-double-angle-right"></i>
	</div>

	<script type="text/javascript">
		try {
			ace.settings.check('sidebar', 'collapsed')
		} catch (e) {
		}

        var setting = document.getElementById("menu_setting");
        setting.onclick = function() {
            window.location.href="${appName}/gotopage/setting";
        }

        var logout = document.getElementById("menu_logout");
        logout.onclick = function() {
            window.location.href="${appName}/role/logout";
        }
	</script>
</div>
