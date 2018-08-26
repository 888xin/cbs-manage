<%--
  Created by IntelliJ IDEA.
  User: Lifeix
  Date: 15-10-15
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8"/>
    <title>举报管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
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
                        <a href="#">内容管理</a>
                    </li>
                    <li class="active">举报管理</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="tabbable">
                            <ul class="nav nav-tabs" id="inform_tab">
                                 <li class="active">
                                    <a data-toggle="tab" href="#comment_inform_tab">
                                        <i class="bigger-110"></i>
                                        评论举报
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#content_inform_tab">
                                        <i class="bigger-110"></i>
                                        吐槽举报
                                    </a>
                                </li> 
                                <li>
                                    <a data-toggle="tab" href="#im_inform_tab">
                                        <i class="bigger-110"></i>
                       im举报
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#user_inform_tab">
                                        <i class="bigger-110"></i>
                       	用户举报
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#news_inform_tab">
                                        <i class="bigger-110"></i>
                       	新闻评论举报
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#news_main_inform_tab">
                                        <i class="bigger-110"></i>
                       	新闻举报
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <!-- comment_tab BEGINS -->
                                <div id="comment_inform_tab" class="tab-pane in active">
	                                <div id="comment_table_list_navbar" class="message-navbar align-center clearfix">
	                                    <div class="message-bar">
	                                        <div class="message-infobar" id="comment_table_infobar">
	                                            <span id="comment_title" class="green bigger-150">评论举报列表</span>
	                                        </div>
	                                    </div>
	                                    <div>
	                                         <div class="messagebar-item-left">
	                                            <label class="inline middle">
	                                                <input type="checkbox" id="comment_toggle_all" class="ace" />
	                                                <span class="lbl"></span>
	                                            </label>
                                                <div class="inline position-relative">
                                                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                        <span id="comment_filter_title">过滤</span> &nbsp;
                                                        <i class="icon-caret-down bigger-125"></i>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-lighter pull-right dropdown-100">
                                                        <li>
                                                            <a id="comment-status-unchecked" href="#">未处理</a>
                                                        </li>
                                                        <li>
                                                            <a id="comment-status-shielded" href="#">已屏蔽</a>
                                                        </li>
                                                        <li>
                                                            <a id="comment-status-ignored" href="#">已忽略</a>
                                                        </li>
                                                    </ul>
                                                </div>
	                                        </div> 
	                                        
	                                         <!-- <div class="messagebar-item-right">
											 <button class='btn btn-xs btn-danger comment_all_sheild'>一键屏蔽</button>&nbsp;
	        				<button class='btn btn-xs btn-success comment_all_ignore'>一键忽略</button>
											 

	                                        </div> --> 
	
	                                    </div>
	                                </div>
	                                <div class="table-responsive">
	                                    <table id="comment_inform_table" class="table1 table-hover">
	                                        <thead>
	                                        <tr>
	                                             <th class="width-4 center">复选框</th>
	                                            <th class='center'>ID</th>
	                                            <th class='center'>评论ID</th>
	                                            <th class='center'>首位举报者</th>
	                                            <th class='center'>评论内容</th>
	                                            <th class='center'>被举报者</th>
	                                            <th class='center'>举报类型</th>
	                                            <th class='center'>举报理由</th>
	                                            <th class='center'>举报次数</th>
	                                            <th class='center'>
	                                                <i class="icon-time bigger-110 hidden-480"></i>
	                                                                                       举报时间
	                                            </th>
	                                            <th style="display:none">dispose_info</th>
	                                            <th class="center">操作</th>
	                                        </tr>
	                                        </thead>
	                                        <tbody>
	                                        </tbody>
	                                    </table>
	                                </div>
	                                 <p class="align-center">
	                                                        <span id="comment_more" class="btn bt1n-small btn-pink no-border">
	                                                            <i class="icon-arrow-down bigger-130"></i>
	                                                            <span class="bigger-110">继续加载</span>
	                                                        </span>
	                                </p> 
                                </div>
                                <!-- comment_tab END -->
                                
                                
                                
                                
                                <!-- content_tab BEGINS -->
                                <div id="content_inform_tab" class="tab-pane">
 									<div id="content_table_list_navbar" class="message-navbar align-center clearfix">
	                                    <div class="message-bar">
	                                        <div class="message-infobar" id="content_table_infobar">
	                                            <span id="content_title" class="green bigger-150">吐槽举报列表</span>
	                                        </div>
	                                    </div>
	                                    <div>
	                                         <div class="messagebar-item-left">
	                                            <label class="inline middle">
	                                                <input type="checkbox" id="content_toggle_all" class="ace" />
	                                                <span class="lbl"></span>
	                                            </label>
                                                <div class="inline position-relative">
                                                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                        <span id="comment_filter_title">过滤</span> &nbsp;
                                                        <i class="icon-caret-down bigger-125"></i>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-lighter pull-right dropdown-100">
                                                        <li>
                                                            <a id="content-status-unchecked" href="#">未处理</a>
                                                        </li>
                                                        <li>
                                                            <a id="content-status-shielded" href="#">已屏蔽</a>
                                                        </li>
                                                        <li>
                                                            <a id="content-status-ignored" href="#">已忽略</a>
                                                        </li>
                                                    </ul>
                                                </div>
	                                        </div> 
	                                        
	                                         <!-- <div class="messagebar-item-right">
											 <button class='btn btn-xs btn-danger content_all_sheild'>一键屏蔽</button>&nbsp;
	        				<button class='btn btn-xs btn-success content_all_ignore'>一键忽略</button>
											 

	                                        </div>  -->
	
	                                    </div>
	                                </div>
	                                <div class="table-responsive">
	                                    <table id="content_inform_table" class="table1 table-hover">
	                                        <thead>
	                                        <tr>
	                                             <th class="width-4 center">复选框</th>
	                                            <th class='center'>ID</th>
	                                            <th class='center'>吐槽ID</th>
	                                            <th class='center'>首位举报者</th>
	                                            <th class='center'>吐槽内容</th>
	                                            <th class='center'>被举报者</th>
	                                            <th class='center'>举报类型</th>
	                                            <th class='center'>举报理由</th>
	                                            <th class='center'>举报次数</th>
	                                            <th class='center'>
	                                                <i class="icon-time bigger-110 hidden-480"></i>
	                                                                                       举报时间
	                                            </th>
	                                            <th style="display:none">dispose_info</th>
	                                            <th class="center">操作</th>
	                                        </tr>
	                                        </thead>
	                                        <tbody>
	                                        </tbody>
	                                    </table>
	                                </div>
	                                 <p class="align-center">
	                                                        <span id="content_more" class="btn bt1n-small btn-pink no-border">
	                                                            <i class="icon-arrow-down bigger-130"></i>
	                                                            <span class="bigger-110">继续加载</span>
	                                                        </span>
	                                </p> 
                                </div> <!-- content_tab END -->
                                
                                
                                		
                                <!-- im_tab BEGINS -->
                                <div id="im_inform_tab" class="tab-pane">
 										<div id="im_table_list_navbar" class="message-navbar align-center clearfix">
	                                    <div class="message-bar">
	                                        <div class="message-infobar" id="im_table_infobar">
	                                            <span id="im_title" class="green bigger-150">im举报列表</span>
	                                        </div>
	                                    </div>
	                                    <div>
	                                         <div class="messagebar-item-left">
	                                            <label class="inline middle">
	                                                <input type="checkbox" id="im_toggle_all" class="ace" />
	                                                <span class="lbl"></span>
	                                            </label>
                                                <div class="inline position-relative">
                                                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                        <span id="im_filter_title">过滤</span> &nbsp;
                                                        <i class="icon-caret-down bigger-125"></i>
                                                    </a>
                                                        <ul class="dropdown-menu dropdown-lighter pull-right dropdown-100">
                                                            <li>
                                                                <a id="im-status-unchecked" href="#">未处理</a>
                                                            </li>
                                                            <li>
                                                                <a id="im-status-shielded" href="#">已屏蔽</a>
                                                            </li>
                                                            <li>
                                                                <a id="im-status-gag" href="#">已禁言</a>
                                                            </li>
                                                            <li>
                                                                <a id="im-status-ignored" href="#">已忽略</a>
                                                            </li>
                                                        </ul>
                                                </div>
	                                        </div> 
	                                        
	                                         <div class="messagebar-item-right">
											 <!-- <button class='btn btn-xs btn-danger im_all_sheild'>一键屏蔽</button>&nbsp; -->
	        				<!-- <button class='btn btn-xs btn-success im_all_ignore'>一键忽略</button> -->
											 

	                                        </div> 
	
	                                    </div>
	                                </div>
	                                <div class="table-responsive">
	                                    <table id="im_inform_table" class="table1 table-hover">
	                                        <thead>
	                                        <tr>
	                                             <th class="width-4 center">复选框</th>
	                                            <th class='center'>ID</th>
	                                            <th class='center'>IMID</th>
	                                            <th class='center'>首位举报者</th>
	                                            <th class='center'>IM内容</th>
	                                            <th class='center'>被举报者</th>
	                                            <th class='center'>举报类型</th>
	                                            <th class='center'>举报理由</th>
	                                            <th class='center'>举报次数</th>

	                                            <th class='center'>
	                                                <i class="icon-time bigger-110 hidden-480"></i>
	                                                                                       举报时间
	                                            </th>
	                                            <th style="display:none">dispose_info</th>
	                                            <th class="center">操作</th>
                                                <th style="display:none">user_id</th>
	                                        </tr>
	                                        </thead>
	                                        <tbody>
	                                        </tbody>
	                                    </table>
	                                </div><!-- /.table-responsive -->
	                                 <p class="align-center">
	                                                        <span id="im_more" class="btn bt1n-small btn-pink no-border">
	                                                            <i class="icon-arrow-down bigger-130"></i>
	                                                            <span class="bigger-110">继续加载</span>
	                                                        </span>
	                                </p> 
                                </div><!-- im_tab END -->
                                
                                
                                
                                
                                <!-- user_tab BEGIN -->
                                	<div id="user_inform_tab" class="tab-pane">
 										<div id="im_table_list_navbar" class="message-navbar align-center clearfix">
	                                    <div class="message-bar">
	                                        <div class="message-infobar" id="im_table_infobar">
	                                            <span id="user_title" class="green bigger-150">用户举报列表</span>
	                                        </div>
	                                    </div>
	                                    <div>
	                                         <div class="messagebar-item-left">
	                                            <label class="inline middle">
	                                                <input type="checkbox" id="user_toggle_all" class="ace" />
	                                                <span class="lbl"></span>
	                                            </label>
                                                <div class="inline position-relative">
                                                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                        <span id="user_filter_title">过滤</span> &nbsp;
                                                        <i class="icon-caret-down bigger-125"></i>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-lighter pull-right dropdown-100">
                                                        <li>
                                                            <a id="user-status-unchecked" href="#">未处理</a>
                                                        </li>
                                                        <li>
                                                            <a id="user-status-shielded" href="#">已屏蔽</a>
                                                        </li>
                                                        <li>
                                                            <a id="user-status-gag" href="#">已禁言</a>
                                                        </li>
                                                        <li>
                                                            <a id="user-status-ignored" href="#">已忽略</a>
                                                        </li>
                                                    </ul>
                                                </div>
	                                        </div> 
	                                        
	                                         <div class="messagebar-item-right">
											 <!-- <button class='btn btn-xs btn-danger user_all_sheild'>一键屏蔽</button>&nbsp; -->
	        				<!-- <button class='btn btn-xs btn-success user_all_ignore'>一键忽略</button> -->
											 

	                                        </div> 
	
	                                    </div>
	                                </div>
	                                <div class="table-responsive">
	                                    <table id="user_inform_table" class="table1 table-hover">
	                                        <thead>
	                                        <tr>
	                                             <th class="width-4 center">复选框</th>
	                                            <th class='center'>ID</th>
	                                            <th class='center'>被举报者ID</th>
	                                            <th class='center'>被举报者</th>
	                                            <th class='center'>首位举报者</th>
	                                            <th class='center'>举报类型</th>
	                                            <th class='center'>举报理由</th>
	                                            <th class='center'>举报次数</th>
	                                            <th class='center'>
	                                                <i class="icon-time bigger-110 hidden-480"></i>
	                                                                                       举报时间
	                                            </th>
	                                            <th style="display:none">dispose_info</th>
	                                            <th class="center">操作</th>
	                                        </tr>
	                                        </thead>
	                                        <tbody>
	                                        </tbody>
	                                    </table>
	                                </div><!-- /.table-responsive -->
	                                 <p class="align-center">
	                                                        <span id="user_more" class="btn bt1n-small btn-pink no-border">
	                                                            <i class="icon-arrow-down bigger-130"></i>
	                                                            <span class="bigger-110">继续加载</span>
	                                                        </span>
	                                </p> 
                                </div>
                                <!-- user_tab END -->
                                
                                <!-- news_tab BEGIN -->
                                	<div id="news_inform_tab" class="tab-pane">
 										<div id="news_table_list_navbar" class="message-navbar align-center clearfix">
	                                    <div class="message-bar">
	                                        <div class="message-infobar" id="im_table_infobar">
	                                            <span id="news_title" class="green bigger-150">新闻评论举报列表</span>
	                                        </div>
	                                    </div>
	                                    <div>
	                                         <div class="messagebar-item-left">
	                                            <label class="inline middle">
	                                                <input type="checkbox" id="user_toggle_all" class="ace" />
	                                                <span class="lbl"></span>
	                                            </label>
                                                <div class="inline position-relative">
                                                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                        <span id="news_filter_title">过滤</span> &nbsp;
                                                        <i class="icon-caret-down bigger-125"></i>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-lighter pull-right dropdown-100">
                                                        <li>
                                                            <a id="news-status-unchecked" href="#">未处理</a>
                                                        </li>
                                                        <li>
                                                            <a id="news-status-shielded" href="#">已屏蔽</a>
                                                        </li>
                                                        <li>
                                                            <a id="news-status-ignored" href="#">已忽略</a>
                                                        </li>
                                                    </ul>
                                                </div>
	                                        </div> 
	                                        
	                                         <div class="messagebar-item-right">
											 <!-- <button class='btn btn-xs btn-danger user_all_sheild'>一键屏蔽</button>&nbsp; -->
	        				<!-- <button class='btn btn-xs btn-success user_all_ignore'>一键忽略</button> -->
											 

	                                        </div> 
	
	                                    </div>
	                                </div>
	                                <div class="table-responsive">
	                                    <table id="news_inform_table" class="table1 table-hover">
	                                        <thead>
	                                        <tr>
	                                             <th class="width-4 center">复选框</th>
	                                            <th class='center'>ID</th>
	                                            <th class='center'>评论ID</th>
	                                            <th class='center'>内容</th>
	                                            <th class='center'>被举报者</th>
	                                            <th class='center'>首位举报者</th>
	                                            <th class='center'>举报类型</th>
	                                            <th class='center'>举报次数</th>
	                                            <th class='center'>
	                                                <i class="icon-time bigger-110 hidden-480"></i>
	                                                                                       举报时间
	                                            </th>
	                                            <th style="display:none">status</th>
	                                            <th style="display:none">dispose_info</th>
	                                            <th class="center">操作</th>
	                                        </tr>
	                                        </thead>
	                                        <tbody>
	                                        </tbody>
	                                    </table>
	                                </div><!-- /.table-responsive -->
	                                 <p class="align-center">
	                                                        <span id="news_more" class="btn bt1n-small btn-pink no-border">
	                                                            <i class="icon-arrow-down bigger-130"></i>
	                                                            <span class="bigger-110">继续加载</span>
	                                                        </span>
	                                </p> 
                                </div>
                                <!-- news_tab END -->
                                
                                <!-- news_main_tab BEGIN -->
                                	<div id="news_main_inform_tab" class="tab-pane">
 										<div id="news_table_list_navbar" class="message-navbar align-center clearfix">
	                                    <div class="message-bar">
	                                        <div class="message-infobar" id="im_table_infobar">
	                                            <span id="news_title" class="green bigger-150">新闻举报列表</span>
	                                        </div>
	                                    </div>
	                                    <div>
	                                         <div class="messagebar-item-left">
	                                            <label class="inline middle">
	                                                <input type="checkbox" id="user_toggle_all" class="ace" />
	                                                <span class="lbl"></span>
	                                            </label>
                                                <div class="inline position-relative">
                                                    <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                        <span id="news_main_filter_title">过滤</span> &nbsp;
                                                        <i class="icon-caret-down bigger-125"></i>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-lighter pull-right dropdown-100">
                                                        <li>
                                                            <a id="news-main-status-unchecked" href="#">未处理</a>
                                                        </li>
                                                        <li>
                                                            <a id="news-main-status-shielded" href="#">已屏蔽</a>
                                                        </li>
                                                        <li>
                                                            <a id="news-main-status-ignored" href="#">已忽略</a>
                                                        </li>
                                                    </ul>
                                                </div>
	                                        </div> 
	                                        
	                                         <div class="messagebar-item-right">
											 <!-- <button class='btn btn-xs btn-danger user_all_sheild'>一键屏蔽</button>&nbsp; -->
	        				<!-- <button class='btn btn-xs btn-success user_all_ignore'>一键忽略</button> -->
											 

	                                        </div> 
	
	                                    </div>
	                                </div>
	                                <div class="table-responsive">
	                                    <table id="news_main_inform_table" class="table1 table-hover">
	                                        <thead>
	                                        <tr>
	                                             <th class="width-4 center">复选框</th>
	                                            <th class='center'>ID</th>
	                                            <th class='center'>新闻ID</th>
	                                            <th class='center'>标题</th>
	                                            <th class='center'>被举报者</th>
	                                            <th class='center'>链接</th>
	                                            <th class='center'>首位举报者</th>
	                                            <th class='center'>举报类型</th>
	                                            <th class='center'>举报次数</th>
	                                            <th class='center'>
	                                                <i class="icon-time bigger-110 hidden-480"></i>
	                                                                                       举报时间
	                                            </th>
	                                            <th style="display:none">status</th>
	                                            <th style="display:none">dispose_info</th>
	                                            <th class="center">操作</th>
	                                        </tr>
	                                        </thead>
	                                        <tbody>
	                                        </tbody>
	                                    </table>
	                                </div><!-- /.table-responsive -->
	                                 <p class="align-center">
	                                                        <span id="news_main_more" class="btn bt1n-small btn-pink no-border">
	                                                            <i class="icon-arrow-down bigger-130"></i>
	                                                            <span class="bigger-110">继续加载</span>
	                                                        </span>
	                                </p> 
                                </div>
                                <!-- news_main_tab END -->                        
                                
                            </div>
                        </div>
                        
                        <!-- 单独处理    解禁 -->
                        <div id="modal_ungag" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_content">
                                        <div class="widget-header">
                                            <h4 id="ungag_title">解禁处理</h4>
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
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>ID</i></div>
                                                        <div class="profile-info-value" id="ungag_id"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>被举报者ID</i></div>
                                                        <div class="profile-info-value" id="ungag_user_id"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>被举报者</i></div>
                                                        <div class="profile-info-value" id="ungag_name"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>内容</i></div>
                                                        <div class="profile-info-value" id="ungag_contain"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>举报理由</i></div>
                                                        <div class="profile-info-value" id="ungag_inform_reason"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>处理信息</i></div>
                                                        <div class="profile-info-value"><textarea  rows="3" cols="20" maxLength="70" id="ungag_info" name="ungag_info" placeholder="长度少于70"></textarea></div>
                                                    </div>

                                                    <input type="text"  style="display:none" id="ungag_type"/>


                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="modal_ungag_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                            <i class="icon-check"></i>
                                            确认提交
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                        
                        
                           <!-- 单独处理 -->
                        <div id="modal_inform" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_content">
                                        <div class="widget-header">
                                            <h4 id="inform_title">举报处理</h4>
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
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>ID</i></div>
                                                        <div class="profile-info-value" id="id"></div>
                                                    </div>
                                                    <div class="profile-info-row" id="modal_user_id">
                                                        <div class="profile-info-name"><i>被举报者ID</i></div>
                                                        <div class="profile-info-value" id="user_id"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>被举报者</i></div>
                                                        <div class="profile-info-value" id="user_name"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>内容</i></div>
                                                        <div class="profile-info-value" id="contain"></div>
                                                    </div>
                                                    <div class="profile-info-row" id="modal_inform_reason">
                                                        <div class="profile-info-name"><i>举报理由</i></div>
                                                        <div class="profile-info-value" id="inform_reason"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>处理信息</i></div>
                                                        <div class="profile-info-value"><textarea  rows="3" cols="20" maxLength="70" id="dispose_info" name="dispose_info" placeholder="长度少于70"></textarea></div>
                                                    </div>
                                                    <div class="profile-info-row" id="inform_time_div">
                                                        <div class="profile-info-name"><i>处理时长</i></div>
                                                        <div class="profile-info-value">
                                                            <select id="last_time" name="last_time">
                                                                <option value="600">10分钟</option>
                                                                <option value="3600">1小时</option>
                                                                <option value="86400">24小时</option>
                                                                <option value="604800">一周</option>
                                                                <option value="0">永久</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <input type="text"  style="display:none" id="status"/>
                                                    <input type="text"  style="display:none" id="type"/>


                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="modal_dispose_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                            <i class="icon-check"></i>
                                            确认提交
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->    
                        
<!--                         一键处理
<div id="modal_inform_all" class="modal fade" tabindex="-1">
    <div class="modal-dialog" style="width:800px;">
        <div class="modal-content">
            <div class="widget-box" id="modal_content">
                <div class="widget-header">
                    <h4 id="inform_title_all">举报处理</h4>
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
                            
                            <div class="profile-info-row">
                                <div class="profile-info-name"><i>处理信息</i></div>
                                <div class="profile-info-value"><textarea  rows="3" cols="20" maxLength="70" id="dispose_info_all" name="dispose_info_all" placeholder="长度少于70"></textarea></div>
                            </div>

                            <input type="text"  style="display:none" id="ids"/>

                            <input type="text"  style="display:none" id="status_all"/>
                            
                            <input type="text"  style="display:none" id="type"/>


                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer no-margin-top">
                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                    <i class="icon-remove"></i>
                    关闭
                </button>
                <button id="modal_dispose_all_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                    <i class="icon-check"></i>
                    确认提交
                </button>
            </div>
        </div>
    </div>/.modal-content
</div>/.modal-dialog   -->
                        
<!--                         处理信息
 <div id="modal_dispose" class="modal fade" tabindex="-1">
     <div class="modal-dialog" style="width:300px;">
         <div class="modal-content">
             <div class="widget-box" id="modal_content">
                 <div class="widget-header">
                     <h4>处理信息</h4>
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
                             
                             <div class="profile-info-row" id="dispose_info_reason">
                                 
                             </div>
 
 
 
                         </form>
                     </div>
                 </div>
             </div>
             <div class="modal-footer no-margin-top">
                 <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                     <i class="icon-remove"></i>
                     关闭
                 </button>
             </div>
         </div>
     </div>/.modal-content
 </div>/.modal-dialog  --> 
                        
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
	seajs.config({base: prefix+"inform"});
    seajs.use("inform_manage"); 
</script>
</body>
</html>
