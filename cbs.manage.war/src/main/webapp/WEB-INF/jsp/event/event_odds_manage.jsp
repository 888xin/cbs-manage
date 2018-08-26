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
    <title>赔率管理</title>
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
                    <li class="active">赔率管理</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="tabbable">
                            <ul class="nav nav-tabs" id="odd_tab">
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
                                
                                <li>
                                    <a data-toggle="tab" href="#odds_tab">
                                        <i class="blue icon-circle-blank bigger-110"></i>
                                        异常赔率
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <!-- fb_tab BEGINS -->
                                <div id="fb_tab" class="tab-pane in active">
                                    <div id="fb_table_list_navbar" class="message-navbar align-center clearfix">
                                        <div class="message-bar">
                                            <div class="message-infobar" id="fb_table_infobar">
                                                <span id="fb_title" class="green bigger-150">足球五大联赛赔率列表</span>
                                                <span class="grey bigger-110">(剩余 <i id="fb_odd_remainder_i" class="green"></i> 场比赛赔率未锁定)</span>
                                            </div>
                                            <div class="message-toolbar hide" id="fb_table_toolbar">
                                                <div class="inline position-relative align-left">
                                                    <a href="#" class="btn-message btn btn-xs dropdown-toggle" data-toggle="dropdown">
                                                        <span class="bigger-110">操作</span>
                                                        <i class="icon-caret-down icon-on-right"></i>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125">
                                                        <li>
                                                            <a href="#">
                                                                <i class="icon-edit blue"></i>
                                                                &nbsp; 编辑
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i class="icon-pencil purple"></i>
                                                                &nbsp; 锁定
                                                            </a>
                                                        </li>
                                                        <li class="divider"></li>
                                                        <li>
                                                            <a href="#">
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
                                                            <a id="fb_select_item_order_cid" href="#">
                                                                <i id="fb_select_item_order_cid_i" class="icon-ok green"></i>
                                                                按赛事ID降序
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a id="fb_select_item_order_oid" href="#">
                                                                <i id="fb_select_item_order_oid_i" class="icon-ok green invisible"></i>
                                                                按赔率ID降序
                                                            </a>
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
                                                <form class="form-search position-relative">
                                                    <!-- btn-group -->
                                                    <div class="btn-group inline position-relative">
                                                        <button data-toggle="dropdown" class="btn btn-primary btn-sm dropdown-toggle">
                                                            <i id="fb_dropdown_info">赔率（默认胜平负）</i>
                                                            <i class="icon-angle-down icon-on-right"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li>
                                                                <a id="fb_dropdown_op" href="#">胜平负</a>
                                                            </li>
                                                            <li>
                                                                <a id="fb_dropdown_jc" href="#">让球胜平负</a>
                                                            </li>
                                                        </ul>
                                                    </div><!-- /btn-group -->
                                                            <span class="input-icon">
                                                                <input type="text" autocomplete="off" class="input-small nav-search-input" id="fb_search_input" placeholder="赛事搜索" />
                                                                <i class="icon-search nav-search-icon"></i>
                                                            </span>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table id="fb_odd_op_table" class="table1 table-hover">
                                            <thead>
                                            <tr>
                                                <th class="width-4">复选框</th>
                                                <th>ID</th>
                                                <th>类型</th>
                                                <th>赛事ID</th>
                                                <th class="width-20">比赛</th>
                                                <th>
                                                    <i class="icon-time bigger-110 hidden-480"></i>
                                                    开赛时间
                                                </th>
                                                <th class="center">即时赔率</th>
                                                <th class="center">初盘赔率</th>
                                                <th class="center">公司</th>
                                                <th class="center">封盘</th>
                                                <th class="center">锁定</th>
                                                <th class="center">操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                        <table id="fb_odd_jc_table" class="table1 table-hover" hidden>
                                            <thead>
                                            <tr>
                                                <th class="width-4">复选框</th>
                                                <th>ID</th>
                                                <th>类型</th>
                                                <th>赛事ID</th>
                                                <th class="width-20">比赛</th>
                                                <th>
                                                    <i class="icon-time bigger-110 hidden-480"></i>
                                                    开赛时间
                                                </th>
                                                <th class="center">即时赔率</th>
                                                <th class="center">初盘赔率</th>
                                                <th class="center">即时盘口</th>
                                                <th class="center">初盘盘口</th>
                                                <th class="center">公司</th>
                                                <th class="center">封盘</th>
                                                <th class="center">锁定</th>
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
                                                <span id="bb_title" class="red bigger-150">篮球五大联赛赔率列表</span>
                                                <span class="grey bigger-110">(剩余 <i class="red">4</i> 场比赛赔率未锁定)</span>
                                            </div>
                                            <div class="message-toolbar hide" id="bb_table_toolbar">
                                                <div class="inline position-relative align-left">
                                                    <a href="#" class="btn-message btn btn-xs dropdown-toggle" data-toggle="dropdown">
                                                        <span class="bigger-110">操作</span>
                                                        <i class="icon-caret-down icon-on-right"></i>
                                                    </a>
                                                    <ul class="dropdown-menu dropdown-lighter dropdown-caret dropdown-125">
                                                        <li>
                                                            <a href="#">
                                                                <i class="icon-edit blue"></i>
                                                                &nbsp; 编辑
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                <i class="icon-pencil purple"></i>
                                                                &nbsp; 锁定
                                                            </a>
                                                        </li>
                                                        <li class="divider"></li>
                                                        <li>
                                                            <a href="#">
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
                                                            <a id="bb_select_item_order_cid" href="#">
                                                                <i id="bb_select_item_order_cid_i" class="icon-ok green"></i>
                                                                按赛事ID降序
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a id="bb_select_item_order_oid" href="#">
                                                                <i id="bb_select_item_order_oid_i" class="icon-ok green invisible"></i>
                                                                按赔率ID降序
                                                            </a>
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
                                                                <i id="bb_item_condition_all_class" class="icon-ok green invisible"></i>
                                                                全部赛事
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="nav-search minimized">
                                                <form class="form-search position-relative">
                                                    <!-- btn-group -->
                                                    <div class="btn-group inline position-relative">
                                                        <button data-toggle="dropdown" class="btn btn-primary btn-sm dropdown-toggle">
                                                            <i id="bb_dropdown_info">赔率（默认胜平负）</i>
                                                            <i class="icon-angle-down icon-on-right"></i>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            <li>
                                                                <a id="bb_dropdown_op" href="#">胜平负</a>
                                                            </li>
                                                            <li>
                                                                <a id="bb_dropdown_jc" href="#">让球胜平负</a>
                                                            </li>
                                                        </ul>
                                                    </div><!-- /btn-group -->
                                                            <span class="input-icon">
                                                                <input type="text" autocomplete="off" class="input-small nav-search-input" id="bb_search_input" placeholder="赛事搜索" />
                                                                <i class="icon-search nav-search-icon"></i>
                                                            </span>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table id="bb_odd_op_table" class="table1 table-hover">
                                            <thead>
                                            <tr>
                                                <th class="width-4">复选框</th>
                                                <th>ID</th>
                                                <th>类型</th>
                                                <th>赛事ID</th>
                                                <th class="width-20">比赛</th>
                                                <th>
                                                    <i class="icon-time bigger-110 hidden-480"></i>
                                                    开赛时间
                                                </th>
                                                <th class="center">即时赔率</th>
                                                <th class="center">初盘赔率</th>
                                                <th class="center">公司</th>
                                                <th class="center">封盘</th>
                                                <th class="center">锁定</th>
                                                <th class="center">操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                        <table id="bb_odd_jc_table" class="table1 table-hover" hidden>
                                            <thead>
                                            <tr>
                                                <th class="width-4">复选框</th>
                                                <th>ID</th>
                                                <th>类型</th>
                                                <th>赛事ID</th>
                                                <th class="width-20">比赛</th>
                                                <th>
                                                    <i class="icon-time bigger-110 hidden-480"></i>
                                                    开赛时间
                                                </th>
                                                <th class="center">即时赔率</th>
                                                <th class="center">初盘赔率</th>
                                                <th class="center">即时盘口</th>
                                                <th class="center">初盘盘口</th>
                                                <th class="center">公司</th>
                                                <th class="center">封盘</th>
                                                <th class="center">锁定</th>
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
                                
                                
                                <!-- odds_tab BEGINS -->
                                <div id="odds_tab" class="tab-pane">
                                    <div id="odds_table_list_navbar" class="message-navbar align-center clearfix">
                                        <div class="message-bar">
                                            <div class="message-infobar" id="fb_table_infobar">
                                                <span id="odds_title" class="green bigger-150">异常赔率列表</span>
                                                <span class="grey bigger-110"><!-- (剩余 <i id="warn_odds_remainder_i" class="green"></i> 场异常赔率未处理) --></span>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="messagebar-item-left">
                                                
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <div class="table-responsive">
                                        <table id="odds_warn_table" class="table1 table-hover">
                                            <thead>
                                            <tr>
                                                <th class="hidden">ID</th>
                                                <th class="center">赛事</th>
                                                <th class="center">比赛ID</th>
                                                <th class="width-20 center">比赛</th>
                                                <th class="center">
                                                    <i class="icon-time bigger-110 hidden-480"></i> 开赛时间
                                                </th>
                                                <th class="center">玩法</th>
                                                <th class="center">盘口信息</th>
                                                <th class="center">赔率信息</th>
                                                <th class="center">公司</th>
                                                <th class="center">创建时间</th>
                                                <th class="center">操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                        
                                    </div><!-- /.table-responsive -->
                                    <p class="align-center">
                                        <span id="odds_data_more" class="btn bt1n-small btn-pink no-border">
                                            <i class="icon-arrow-down bigger-130"></i>
                                            <span class="bigger-110">继续加载</span>
                                        </span>
                                    </p>
                                </div><!-- odds_tab END -->
                                
                                
                            </div>
                        </div>
                        <!-- fb op odds/.modal-dialog -->
                        <div id="modal_fb_odds_op" class="modal fade" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header no-padding">
                                        <div class="table-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                <span class="white">&times;</span>
                                            </button>
                                            足球胜平负赔率信息
                                        </div>
                                    </div>
                                    <div class="widget-box">
                                        <div>
                                            <h2>
                                                <div class="clearfix">
                                                    <div class="grid3">
                                                        <p class="align-left red" id="odds_modal_home_p">中国</p>
                                                    </div>
                                                    <div class="grid3">
                                                        <p class="center bolder" id="odds_modal_scores_p">--:--</p>
                                                    </div>
                                                    <div class="grid3">
                                                        <i class="align-right green" id="odds_modal_away_p">巴西</i>
                                                    </div>
                                                </div>
                                            </h2>
                                        </div>
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <h4 class="header green">胜平负</h4>
                                                <div class="clearfix" >
                                                    <div class="grid3">
                                                        <p class="center">主胜</p>
                                                        <p class="center" ><input type="text" id="fb_odds_op_home_spinner" /></p>
                                                        <div class="space-6"></div>
                                                        <button class="btn btn-minier btn-primary pull-left" id="fb_odds_op_history_bt">
                                                            赔率历史
                                                        </button>
                                                    </div>
                                                    <div class="grid3">
                                                        <p class="center">平</p>
                                                        <p class="center" ><input type="text" id="fb_odds_op_draw_spinner" /></p>
                                                        <div class="space-6"></div>
                                                    </div>
                                                    <div class="grid3">
                                                        <p class="center">客胜</p>
                                                        <p class="center" ><input type="text" id="fb_odds_op_away_spinner" /></p>
                                                        <div class="space-6"></div>
                                                        <button class="btn btn-minier btn-danger pull-right" id="fb_odds_op_edit_bt">
                                                            修改
                                                        </button>
                                                        <button class="btn btn-minier btn-danger pull-right" id="fb_odds_op_add_bt">
                                                            添加
                                                        </button>
                                                    </div>
                                                </div>
                                            </div><!-- /widget-main -->
                                        </div><!-- /widget-body -->
                                    </div><!-- /widget-box -->
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- fb op odds/.modal-dialog -->
                        <!-- fb jc odds/.modal-dialog -->
                        <div id="modal_fb_odds_jc" class="modal fade" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header no-padding">
                                        <div class="table-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                <span class="white">&times;</span>
                                            </button>
                                            足球让球胜平负赔率信息
                                        </div>
                                    </div>
                                    <div class="widget-box">
                                        <div>
                                            <h2>
                                                <div class="clearfix">
                                                    <div class="grid3">
                                                        <p class="align-left red" id="modal_fb_odds_jc_home_p">中国</p>
                                                    </div>
                                                    <div class="grid3">
                                                        <p class="center bolder" id="modal_fb_odds_jc_scores_p">--:--</p>
                                                    </div>
                                                    <div class="grid3">
                                                        <i class="align-right green" id="modal_fb_odds_jc_away_p">巴西</i>
                                                    </div>
                                                </div>
                                            </h2>
                                        </div>
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <h4 class="header red">让球胜平负</h4>
                                                <div class="clearfix">
                                                    <div class="grid4">
                                                        <p class="center">主胜</p>
                                                        <p class="center" ><input type="text" id="fb_odds_jc_home_spinner" /></p>
                                                        <div class="space-6"></div>
                                                        <button class="btn btn-minier btn-primary pull-left" id="fb_odds_jc_history_bt">
                                                            赔率历史
                                                        </button>
                                                    </div>
                                                    <div class="grid4">
                                                        <p class="center">平</p>
                                                        <p class="center" ><input type="text" placeholder="平" id="fb_odds_jc_draw_spinner" /></p>
                                                        <div class="space-6"></div>
                                                    </div>
                                                    <div class="grid4">
                                                        <p class="center">客胜</p>
                                                        <p class="center" ><input type="text" id="fb_odds_jc_away_spinner" /></p>
                                                        <div class="space-6"></div>
                                                    </div>
                                                    <div class="grid4">
                                                        <p class="center">盘口</p>
                                                        <p class="center" ><input type="text" id="fb_odds_jc_handicap_spinner" /></p>
                                                        <div class="space-6"></div>
                                                        <button class="btn btn-minier btn-danger pull-right" id="fb_odds_jc_edit_bt">
                                                            修改
                                                        </button>
                                                        <button class="btn btn-minier btn-danger pull-right" id="fb_odds_jc_add_bt">
                                                            添加
                                                        </button>
                                                    </div>
                                                </div>
                                            </div><!-- /widget-main -->
                                        </div><!-- /widget-body -->
                                    </div><!-- /widget-box -->
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- fb jc odds/.modal-dialog -->
                        <!-- bb odds/.modal-dialog -->
                        <div id="modal_bb_odds_op" class="modal fade" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header no-padding">
                                        <div class="table-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                <span class="white">&times;</span>
                                            </button>
                                            篮球胜平负赔率信息
                                        </div>
                                    </div>
                                    <div class="widget-box">
                                        <div>
                                            <h2>
                                                <div class="clearfix">
                                                    <div class="grid3">
                                                        <p class="align-left red" id="modal_bb_odds_op_home_p">中国</p>
                                                    </div>
                                                    <div class="grid3">
                                                        <p class="center bolder" id="modal_bb_odds_op_scores_p">--:--</p>
                                                    </div>
                                                    <div class="grid3">
                                                        <i class="align-right green" id="modal_bb_odds_op_away_p">巴西</i>
                                                    </div>
                                                </div>
                                            </h2>
                                        </div>
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <h4 class="header green">胜平负</h4>
                                                <div class="clearfix">
                                                    <div class="grid2">
                                                        <p class="center">主胜</p>
                                                        <p class="center" ><input type="text" id="bb_odds_op_home_spinner" /></p>
                                                        <div class="space-6"></div>
                                                        <button class="btn btn-minier btn-primary pull-left" id="bb_odds_op_history_bt">
                                                            赔率历史
                                                        </button>
                                                    </div>
                                                    <div class="grid2">
                                                        <p class="center">客胜</p>
                                                        <p class="center" ><input type="text" id="bb_odds_op_away_spinner" /></p>
                                                        <div class="space-6"></div>
                                                        <button class="btn btn-minier btn-danger pull-right" id="bb_odds_op_edit_bt">
                                                            修改
                                                        </button>
                                                        <button class="btn btn-minier btn-danger pull-right" id="bb_odds_op_add_bt">
                                                            添加
                                                        </button>
                                                    </div>
                                                </div>
                                            </div><!-- /widget-main -->
                                        </div><!-- /widget-body -->
                                    </div><!-- /widget-box -->
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- bb odds/.modal-dialog -->
                        <!-- bb jc odds/.modal-dialog -->
                        <div id="modal_bb_odds_jc" class="modal fade" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header no-padding">
                                        <div class="table-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                <span class="white">&times;</span>
                                            </button>
                                            篮球让球胜平负赔率信息
                                        </div>
                                    </div>
                                    <div class="widget-box">
                                        <div>
                                            <h2>
                                                <div class="clearfix">
                                                    <div class="grid3">
                                                        <p class="align-left red" id="modal_bb_odds_jc_home_p">中国</p>
                                                    </div>
                                                    <div class="grid3">
                                                        <p class="center bolder" id="modal_bb_odds_jc_scores_p">--:--</p>
                                                    </div>
                                                    <div class="grid3">
                                                        <i class="align-right green" id="modal_bb_odds_jc_away_p">巴西</i>
                                                    </div>
                                                </div>
                                            </h2>
                                        </div>
                                        <div class="widget-body">
                                            <div class="widget-main">
                                                <h4 class="header red">让球胜平负</h4>
                                                <div class="clearfix">
                                                    <div class="grid3">
                                                        <p class="center">主胜</p>
                                                        <p class="center" ><input type="text" id="bb_odds_jc_home_spinner" /></p>
                                                        <div class="space-6"></div>
                                                        <button class="btn btn-minier btn-primary pull-left" id="bb_odds_jc_history_bt">
                                                            赔率历史
                                                        </button>
                                                    </div>
                                                    <div class="grid3">
                                                        <p class="center">客胜</p>
                                                        <p class="center" ><input type="text" id="bb_odds_jc_away_spinner" /></p>
                                                        <div class="space-6"></div>
                                                    </div>
                                                    <div class="grid3">
                                                        <p class="center">盘口</p>
                                                        <p class="center" ><input type="text" id="bb_odds_jc_handicap_spinner" /></p>
                                                        <div class="space-6"></div>
                                                        <button class="btn btn-minier btn-danger pull-right" id="bb_odds_jc_edit_bt">
                                                            修改
                                                        </button>
                                                        <button class="btn btn-minier btn-danger pull-right" id="bb_odds_jc_add_bt">
                                                            添加
                                                        </button>
                                                    </div>
                                                </div>
                                            </div><!-- /widget-main -->
                                        </div><!-- /widget-body -->
                                    </div><!-- /widget-box -->
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- bb jc odds/.modal-dialog -->
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
    seajs.use("event_odds_manage");
</script>
</body>
</html>
