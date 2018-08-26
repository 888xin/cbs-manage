<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-11-24
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>用户下注记录</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/daterangepicker.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/cbs-manage/inner_settle.css"/>
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
                        <a href="#">用户管理</a>
                    </li>
                    <li class="active">下注管理</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="tabbable">
                            <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="bet_tab">
                                <li class="active">
                                    <a data-toggle="tab" href="javascript:void(0)" data-type="1" >足球（胜平负）</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="javascript:void(0)" data-type="2" >足球（让球胜平负）</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="javascript:void(0)" data-type="4">足球（大小球）</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="javascript:void(0)" data-type="5">足球（单双数）</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="javascript:void(0)" data-type="6">篮球（胜负）</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="javascript:void(0)" data-type="7">篮球（让球胜负）</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="javascript:void(0)" data-type="9">篮球（大小球）</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="javascript:void(0)" data-type="10">篮球（单双数）</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane in active">
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">龙号：</label>
                                            <div class="col-sm-8">
                                                <input class="input-medium" type="text" placeholder="请输入用户龙号" id="long_no_input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">赛事：</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="input-medium" placeholder="请输入赛事ID" id="contest_id_input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">时间范围选择：</label>
                                            <div class="col-sm-8">
                                                <div id="datepicker"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <button id="search_bt" class="btn btn-xs btn-purple align-left">
                                            <i class="icon-search align-top bigger-125"></i>条件查询
                                        </button>
                                    </div>
                                    <div class="col-sm-2">
                                        <button id="search_all_bt" class="btn btn-xs btn-success align-left">
                                            <i class="icon-search align-top bigger-125"></i>全部最新
                                        </button>
                                    </div>
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>下注ID</th>
                                            <th>用户信息</th>
                                            <th>竞猜信息</th>
                                            <th>比赛信息</th>
                                            <th>赛事时间</th>
                                            <th>竞猜结果</th>
                                            <th>下注时间</th>
                                            <th>下注状态</th>
                                            <th>结算日志</th>
                                            <th>取消下注</th>
                                            <th>下注修复</th>
                                        </tr>
                                        </thead>
                                        <tbody id="bet_data_wrap">
                                        <script type="text/template" id="bet_html">
											{%_.each(data, function(item){%}
												<tr>
													<td>{{item.b_id}}</td>
													<td>
														<ul class="list-info">
														  <li><span class="title">龙号：</span><span class="value">{{item.long_no}}</span></li>
														  <li><span class="title">用户ID：</span><span class="value">{{item.user_id}}</span></li>
														  <li><span class="title">用户名：</span><span class="value">{{item.user_name}}</span></li>
														</ul>
													</td>
													<td>
														<ul class="list-info">
															{%if(type == 1 ||　type == 6){%}
																{%if(item.support == 0){%}
																	<li><span class="title">胜平负：</span><span class="value">主胜</span></li>
																	<li><span class="title">赔率：</span><span class="value">{{item.home_roi}}</span></li>
																{%} else if(item.support == 1) {%}	
																	<li><span class="title">胜平负：</span><span class="value">客胜</span></li>
																	<li><span class="title">赔率：</span><span class="value">{{item.away_roi}}</span></li>
																{%} else if(item.support == 2) {%}	
																	<li><span class="title">胜平负：</span><span class="value">平局</span></li>
																	<li><span class="title">赔率：</span><span class="value">{{item.draw_roi}}</span></li>
																{%}%}
															{%} else if(type == 2 ||　type == 7) {%}	
																{%if(item.support == 0){%}
																	<li><span class="title">让球胜平负：</span><span class="value">主胜({{item.handicap}})</span></li>
																	<li><span class="title">赔率：</span><span class="value">{{item.home_roi}}</span></li>
																{%} else if(item.support == 1) {%}	
																	<li><span class="title">让球胜平负：</span><span class="value">客胜({{item.handicap}})</span></li>
																	<li><span class="title">赔率：</span><span class="value">{{item.away_roi}}</span></li>
																{%} else if(item.support == 2) {%}	
																	<li><span class="title">让球胜平负：</span><span class="value">平局({{item.handicap}})</span></li>
																	<li><span class="title">赔率：</span><span class="value">{{item.draw_roi}}</span></li>
																{%}%}
															{%} else if(type == 4 || type == 9) {%}	
																{%if(item.support == 0){%}
																	<li><span class="title">大小球：</span><span class="value">大球({{item.handicap}})</span></li>
																	<li><span class="title">赔率：</span><span class="value">{{item.home_roi}}</span></li>
																{%} else if(item.support == 1) {%}	
																	<li><span class="title">大小球：</span><span class="value">小球({{item.handicap}})</span></li>
																	<li><span class="title">赔率：</span><span class="value">{{item.away_roi}}</span></li>
																{%}%}
															{%} else if(type == 5 || type == 10) {%}	
																{%if(item.support == 0){%}
																	<li><span class="title">单双数：</span><span class="value">单数</span></li>
																	<li><span class="title">赔率：</span><span class="value">{{item.home_roi}}</span></li>
																{%} else if(item.support == 1) {%}	
																	<li><span class="title">单双数：</span><span class="value">双数</span></li>
																	<li><span class="title">赔率：</span><span class="value">{{item.away_roi}}</span></li>
																{%}%}
															{%}%}
															<li>
																<span class="title">下单：</span>
																<span class="value">
																	{%if (item.longbi) {%}
																		{%if (item.coupon > 0){%}
																			<i class="smaller-90 green">{{item.coupon}}龙筹</i>
																			<i class="smaller-90 red">{{item.bet - item.coupon}}龙币</i>
																		{%} else {%}
																			<i class="smaller-90 red">{{item.bet}}龙币</i>
																		{%}%}	
																	{%} else {%}
																		<i class="smaller-90 green">{{item.bet}}龙筹</i>
																	{%}%}
																</span>
															</li>			
														</ul>
													</td>
													<td>
														<div class="result_contest">
															<div class="team team_host">
																<img src="http://roi.skst.cn/logo/{{item.contest.h_t.logo}}" />
																<p>{{item.contest.h_t.name}}</p>
															</div>
															<div class="team team_away">
																<img src="http://roi.skst.cn/logo/{{item.contest.a_t.logo}}" />
																<p>{{item.contest.a_t.name}}</p>
															</div>
															<div class="contest_info">
																<p>{{item.contest.cup_name}}</p>
																<p class="versus">{{item.contest.home_scores}} : {{item.contest.away_scores}}</p>
															</div>
														</div>
													</td>
													<td>	
														<ul class="list-info">
															<li><span class="title">赛事ID：</span><span class="value">[{{item.contest.contest_id}}]</span></li>
														  	<li><span class="title">赛事类型：</span>
																<span class="value">
																{%if (type > 5){%}
																	篮球
																{%} else {%}
																	足球
																{%}%}
																</span>
														  	</li>
														  	<li><span class="title">赛事时间：</span><span class="value">{{moment(item.contest.start_time).format('MM-DD HH:mm')}}</span></li>
														</ul>
													<td>
														{%if (item.status != 0) {%}
															{%if (item.longbi) {%}
																<span class="smaller-90 red">{{item.back}}龙币</span>
															{%} else {%}
																<span class="smaller-90 green">{{item.back}}龙筹</span>
															{%}%}
														{%}%}
													</td>
													<td>{{moment(item.create_time).format('MM-DD HH:mm')}}</td>
													<td id="bet_status_{{item.b_id}}">
														{%if (item.status == 0){ %}
															<span class="label label-primary">初始</span>
														{%} else if (item.status == 1){ %}
															<span class="label label-success">赢</span>
														{%} else if (item.status == 2){ %}
															<span class="label label-danger">输</span>
														{%} else if (item.status == -1){ %}
															<span class="label label-default">走</span>
														{%}%}
													</td>
													<td>
														{%if (item.status != 0){ %}
															<button title="跳转到结算页面" data-placement="top" data-toggle="tooltip" class="btn btn-xs btn-success" data-contest="{{item.contest_id}}" data-user="{{item.user_id}}"	data-support="{{item.support}}" >
																<i class="icon-th-large bigger-150"></i>
															</button>
														{%} %}
													</td>
													<td>
														{%if (item.status == 0){ %}
															<button class="cancel_bet btn btn-xs" data-toggle="tooltip" data-placement="top" title="取消下注" data-id="{{item.b_id}}" data-type="{{type}}">
																<i class="icon-share-alt bigger-150"></i>
															</button>
														{%} %}
													</td>
                                                    <td>
                                                        <button class="btn btn-xs btn-warning" title="下注修复" data-id="{{item.b_id}}" data-type="{{type}}">
                                                            <i class="icon-tags bigger-150"></i>
                                                        </button>
													</td>
												</tr>
											{%})%}
	        							</script>
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- 取消下注弹出框 -->
                        <div id="bet_cancel_edit" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_content">
                                        <div class="widget-header">
                                            <h4>填写取消下注理由</h4>
                                            <div class="widget-toolbar">
                                                <a href="#" data-action="collapse">
                                                    <i class="icon-chevron-up"></i>
                                                </a>
                                                <a href="#" data-dismiss="modal" aria-hidden="true">
                                                    <i class="icon-remove light-red"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                
                                                <form class="form-group">
                                                    <!-- 把下注类型和下注id填充到隐藏 处 -->
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>下注类型</i></div>
                                                        <div class="profile-info-value"  id="bet_cancel_type_show"></div>
                                                        <input type="hidden" id="bet_cancel_type">
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>下注id</i></div>
                                                        <div class="profile-info-value" id="bet_cancel_id"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                       <div class="profile-info-name"><i>取消理由</i></div>                                                   
                                                        <div class="profile-info-value">
                                                        <textarea style="margin: 0px; width: 326px; height: 110px;" id="cancel_reason" name="cancel_reason"></textarea>
                                                        </div>
                                                    </div>       
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>关闭
                                        </button>
                                        <button id="cancel_bet_edit_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                            <i class="icon-check"></i>确认提交
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div id="modal_repair" class="modal fade" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header no-padding">
                                        <div class="table-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                <span class="white">&times;</span>
                                            </button>
                                            下注修复
                                        </div>
                                    </div>
                                    <div class="widget-box">
                                        <div class="widget-main">

                                            <div>
                                                <label for="repair_roi" class="green bigger-150">修改后的赔率：</label>
                                                <input class="form-control" type="text" id="repair_roi" placeholder="填入修改后的赔率" />
                                            </div>

                                            <div>
                                                <label for="repair_reason" class="green bigger-150">原因（会发给用户作为提醒）：</label>
                                                <textarea class="form-control" id="repair_reason" placeholder="填入对应的修改原因（最多125字）" maxlength="500"></textarea>
                                            </div>

                                        </div>

                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="repair_submit_bt" class="btn btn-sm btn-info pull-right">
                                            <i class="icon-check"></i>
                                            确认修复
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->


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
	seajs.config({base: prefix+"user/"});
	seajs.use("bet_list.js");
</script>
</body>
</html>