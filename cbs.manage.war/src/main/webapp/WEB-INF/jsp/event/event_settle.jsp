<%--
  Created by IntelliJ IDEA.
  User: Lhx
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
    <title>赛事结算管理</title>
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
                    <li class="active">赛事结算</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="tabbable">
                            <ul class="nav nav-tabs" id="settle_tab">
                                <li class="active">
                                    <a data-toggle="tab" href="#fb_tab">
                                        <i class="green icon-circle bigger-110"></i>
                                        足球
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#bb_tab">
                                        <i class="red icon-circle-blank bigger-110"></i>
                                        篮球
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <!-- fb_tab BEGINS -->
                                <div id="fb_tab" class="tab-pane in active">
                                <div id="fb_table_list_navbar" class="message-navbar align-center clearfix">
                                    <div class="message-bar">
                                        <div class="message-infobar" id="fb_table_infobar">
                                            <span id="fb_title" class="green bigger-150">足球五大联赛结算</span>
                                            <span class="grey bigger-110">(剩余 <i id="fb_remainder_i" class="green"></i> 场比赛未结算)</span>
                                        </div>
                                        <div class="message-toolbar hide" id="fb_table_toolbar">
                                            <div class="inline position-relative align-left">
                                                <a href="#" class="btn-message btn btn-xs dropdown-toggle" data-toggle="dropdown">
                                                    <span class="bigger-110">操作</span>
                                                    <i class="icon-caret-down icon-on-right"></i>
                                                </a>
                                                <ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125">
                                                    <li>
                                                        <a id="fb_edit_toolbar" href="#">
                                                            <i class="icon-edit blue"></i>
                                                            &nbsp; 编辑
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a id="fb_settle_toolbar" href="#">
                                                            <i class="icon-shopping-cart purple"></i>
                                                            &nbsp; 结算
                                                        </a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <a id="fb_delete_toolbar" href="#">
                                                            <i class="icon-trash red bigger-110"></i>
                                                            &nbsp; 删除
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-xs btn-message">
                                                <i class="icon-trash bigger-125"></i>
                                                <span class="bigger-110">删除所选</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="messagebar-item-left">
                                            <label class="inline middle">
                                                <input type="checkbox" id="fb_toggle_all" class="ace" />
                                                <span class="lbl"></span>
                                            </label>
                                            &nbsp;
                                            <div class="inline position-relative">
                                                <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                    <i class="icon-caret-down bigger-125 middle"></i>
                                                </a>
                                                <ul class="dropdown-menu dropdown-lighter dropdown-100">
                                                    <li>
                                                        <a id="fb_select_item_all" href="#">全选</a>
                                                    </li>
                                                    <li>
                                                        <a id="fb_select_item_none" href="#">全不选</a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <a id="id-select-message-unread" href="#">未结算</a>
                                                    </li>
                                                    <li>
                                                        <a id="id-select-message-read" href="#">已结算</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="messagebar-item-right">
                                            <div class="inline position-relative">
                                                <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                    <span id="fb_item_filter_title">过滤</span> &nbsp;
                                                    <i class="icon-caret-down bigger-125"></i>
                                                </a>
                                                <ul class="dropdown-menu dropdown-lighter pull-right dropdown-100">
                                                    <li>
                                                        <a id="fb_item_condition_five" href="#">
                                                            <i id="fb_item_condition_five_class" class="icon-ok green"></i>
                                                            五大联赛
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a id="fb_item_condition_all" href="#">
                                                            <i id="fb_item_condition_all_class" class="icon-ok green invisible"></i>
                                                            全部赛事
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="nav-search minimized">
                                            <form class="form-search">
                                                <span class="input-icon">
                                                    <input type="text" autocomplete="off" class="input-small nav-search-input" id="fb_search_input" placeholder="足球赛事搜索" />
                                                    <i class="icon-search nav-search-icon"></i>
                                                </span>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table id="fb_settle_table" class="table1 table-hover">
                                        <thead>
                                        <tr>
                                            <th class="width-4">复选框</th>
                                            <th>ID</th>
                                            <th>类型</th>
                                            <th>赛事ID</th>
                                            <th>比赛</th>
                                            <th>
                                                <i class="icon-time bigger-110 hidden-480"></i>
                                                开赛时间
                                            </th>
                                            <th class="center">比分</th>
                                            <th>结果</th>
                                            <th class="center">下注数</th>
                                            <th class="center">结算状态</th>
                                            <th>
                                                <i class="icon-time bigger-110 hidden-480"></i>
                                                结算时间
                                            </th>
                                            <th class="center">操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div><!-- /.table-responsive -->
                                <p class="align-center">
                                                        <span id="fb_data_more" class="btn bt1n-small btn-pink no-border">
                                                            <i class="icon-arrow-down bigger-130"></i>
                                                            <span class="bigger-110">继续加载</span>
                                                        </span>
                                </p>
                                </div><!-- fb_tab END -->
                                <!-- bb_tab BEGINS -->
                                <div id="bb_tab" class="tab-pane">
                                <div id="bb_table_list_navbar" class="message-navbar align-center clearfix">
                                    <div class="message-bar">
                                        <div class="message-infobar" id="bb_table_infobar">
                                            <span id="bb_title" class="red bigger-150">篮球五大联赛结算</span>
                                            <span class="grey bigger-110">(剩余 <i id="bb_remainder_i" class="red"></i> 场比赛未结算)</span>
                                        </div>
                                        <div class="message-toolbar hide" id="bb_table_toolbar">
                                            <div class="inline position-relative align-left">
                                                <a href="#" class="btn-message btn btn-xs dropdown-toggle" data-toggle="dropdown">
                                                    <span class="bigger-110">操作</span>
                                                    <i class="icon-caret-down icon-on-right"></i>
                                                </a>
                                                <ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125">
                                                    <li>
                                                        <a id="bb_edit_toolbar" href="#">
                                                            <i class="icon-edit blue"></i>
                                                            &nbsp; 编辑
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a id="bb_settle_toolbar" href="#">
                                                            <i class="icon-shopping-cart purple"></i>
                                                            &nbsp; 结算
                                                        </a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <a id="bb_delete_toolbar" href="#">
                                                            <i class="icon-trash red bigger-110"></i>
                                                            &nbsp; 删除
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <a href="#" class="btn btn-xs btn-message">
                                                <i class="icon-trash bigger-125"></i>
                                                <span class="bigger-110">删除所选</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="messagebar-item-left">
                                            <label class="inline middle">
                                                <input type="checkbox" id="bb_toggle_all" class="ace" />
                                                <span class="lbl"></span>
                                            </label>
                                            &nbsp;
                                            <div class="inline position-relative">
                                                <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                    <i class="icon-caret-down bigger-125 middle"></i>
                                                </a>
                                                <ul class="dropdown-menu dropdown-lighter dropdown-100">
                                                    <li>
                                                        <a id="bb_select_item_all" href="#">全选</a>
                                                    </li>
                                                    <li>
                                                        <a id="bb_select_item_none" href="#">全不选</a>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <a id="bb_select_settle_no" href="#">未结算</a>
                                                    </li>
                                                    <li>
                                                        <a id="bb_select_settle_ok" href="#">已结算</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="messagebar-item-right">
                                            <div class="inline position-relative">
                                                <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                    <span id="bb_item_filter_title">过滤</span> &nbsp;
                                                    <i class="icon-caret-down bigger-125"></i>
                                                </a>
                                                <ul class="dropdown-menu dropdown-lighter pull-right dropdown-100">
                                                    <li>
                                                        <a id="bb_item_condition_five" href="#">
                                                            <i id="bb_item_condition_five_class" class="icon-ok green"></i>
                                                            五大联赛
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a id="bb_item_condition_all" href="#">
                                                            <i id="bb_item_condition_all_class" class="icon-ok invisible"></i>
                                                            全部赛事
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="nav-search minimized">
                                            <form class="form-search">
                                                    <span class="input-icon">
                                                        <input type="text" autocomplete="off" class="input-small nav-search-input" id="bb_search_input" placeholder="篮球赛事搜索" />
                                                        <i class="icon-search nav-search-icon"></i>
                                                    </span>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table id="bb_settle_table" class="table1 table-hover">
                                        <thead>
                                        <tr>
                                            <th>复选框</th>
                                            <th>ID</th>
                                            <th>类型</th>
                                            <th>赛事ID</th>
                                            <th>比赛</th>
                                            <th>
                                                <i class="icon-time bigger-110 hidden-480"></i>
                                                开赛时间
                                            </th>
                                            <th class="center">比分</th>
                                            <th>结果</th>
                                            <th class="center">下注数</th>
                                            <th class="center">结算状态</th>
                                            <th>
                                                <i class="icon-time bigger-110 hidden-480"></i>
                                                结算时间
                                            </th>
                                            <th class="center">操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div><!-- /.table-responsive -->
                                <p class="align-center">
                                    <span id="bb_data_more" class="btn bt1n-small btn-pink no-border">
                                        <i class="icon-arrow-down bigger-130"></i>
                                        <span class="bigger-110">继续加载</span>
                                    </span>
                                </p>
                                </div><!-- bb_tab END -->
                            </div>
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
    seajs.use("event_settle");
</script>
</body>
</html>
