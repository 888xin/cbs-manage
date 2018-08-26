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
                                    <a data-toggle="tab" href="#fb_op_tab">足球（胜平负）</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#fb_jc_tab">足球（让球胜平负）</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#bb_op_tab">篮球（胜负）</a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#bb_jc_tab">篮球（让球胜负）</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div id="fb_op_tab" class="tab-pane in active">
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">龙号：</label>
                                            <div class="col-sm-8">
                                                <input class="input-medium" type="text" placeholder="请输入用户龙号" id="fb_op_long_no_input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">赛事：</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="input-medium" placeholder="请输入赛事ID" id="fb_op_contest_id_input" />
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
                                        <button id="fb_op_search_bt" class="btn btn-xs btn-purple align-left">
                                            <i class="icon-search align-top bigger-125"></i>条件查询
                                        </button>
                                    </div>
                                        <div class="col-sm-2">
                                            <button id="fb_op_search_all_bt" class="btn btn-xs btn-success align-left">
                                                <i class="icon-search align-top bigger-125"></i>全部最新
                                            </button>
                                        </div>
                                    <br>
                                    <br>
                                    <table id="fb_bet_op_table" class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>下注ID</th>
                                                <th>赛事ID</th>
                                                <th>用户信息</th>
                                                <th>比赛信息</th>
                                                <th>赛事开始时间</th>
                                                <th>下注信息</th>
                                                <th>下注时间</th>
                                                <th>状态</th>
                                                <th>操作</th>
                                                <th>取消下注</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                        <p id="fb_bet_op_more_data_search" class="align-center">
                                            <button class="btn btn-inverse">
                                                <i class="icon-arrow-down align-top bigger-125"></i>继续加载
                                            </button>
                                        </p>
                                </div>
                                <div id="fb_jc_tab" class="tab-pane">
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">龙号：</label>
                                            <div class="col-sm-8">
                                                <input class="input-medium" type="text" placeholder="请输入用户龙号" id="fb_jc_long_no_input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">赛事：</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="input-medium" placeholder="请输入赛事ID" id="fb_jc_contest_id_input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">时间范围选择：</label>
                                            <div class="col-sm-8">
                                                <div id="fb_jc_datepicker"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <button id="fb_jc_search_bt" class="btn btn-xs btn-purple align-left">
                                            <i class="icon-search align-top bigger-125"></i>
                                            条件查询
                                        </button>
                                    </div>
                                    <div class="col-sm-2">
                                        <button id="fb_jc_search_all_bt" class="btn btn-xs btn-success align-left">
                                            <i class="icon-search align-top bigger-125"></i>
                                            全部最新
                                        </button>
                                    </div>
                                    <br>
                                    <br>
                                    <table id="fb_bet_jc_table" class="table table-striped table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>下注ID</th>
                                            <th>赛事ID</th>
                                            <th>用户信息</th>
                                            <th>比赛信息</th>
                                            <th>赛事开始时间</th>
                                            <th>下注信息</th>
                                            <th>下注时间</th>
                                            <th>状态</th>
                                            <th>操作</th>
                                            <th>取消下注</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <p id="fb_bet_jc_more_data_search" class="align-center">
                                        <button class="btn btn-inverse">
                                            <i class="icon-arrow-down align-top bigger-125"></i>继续加载
                                        </button>
                                    </p>
                                </div>
                                <div id="bb_op_tab" class="tab-pane">
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">龙号：</label>
                                            <div class="col-sm-8">
                                                <input class="input-medium" type="text" placeholder="请输入用户龙号" id="bb_op_long_no_input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">赛事：</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="input-medium" placeholder="请输入赛事ID" id="bb_op_contest_id_input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">时间范围选择：</label>
                                            <div class="col-sm-8">
                                                <div id="bb_op_datepicker"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <button id="bb_op_search_bt" class="btn btn-xs btn-purple align-left">
                                            <i class="icon-search align-top bigger-125"></i>条件查询
                                        </button>
                                    </div>
                                    <div class="col-sm-2">
                                        <button id="bb_op_search_all_bt" class="btn btn-xs btn-success align-left">
                                            <i class="icon-search align-top bigger-125"></i>全部最新
                                        </button>
                                    </div>
                                    <br>
                                    <br>
                                    <table id="bb_bet_op_table" class="table table-striped table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>下注ID</th>
                                            <th>赛事ID</th>
                                            <th>用户信息</th>
                                            <th>比赛信息</th>
                                            <th>赛事开始时间</th>
                                            <th>下注信息</th>
                                            <th>下注时间</th>
                                            <th>状态</th>
                                            <th>操作</th>
                                            <th>取消下注</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <p id="bb_bet_op_more_data_search" class="align-center">
                                        <button class="btn btn-inverse">
                                            <i class="icon-arrow-down align-top bigger-125"></i>继续加载
                                        </button>
                                    </p>
                                </div>
                                <div id="bb_jc_tab" class="tab-pane">
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">龙号：</label>
                                            <div class="col-sm-8">
                                                <input class="input-medium" type="text" placeholder="请输入用户龙号" id="bb_jc_long_no_input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">赛事：</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="input-medium" placeholder="请输入赛事ID" id="bb_jc_contest_id_input" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label class="col-sm-4 control-label no-padding-right bigger-110">时间范围选择：</label>
                                            <div class="col-sm-8">
                                                <div id="bb_jc_datepicker"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-2">
                                        <button id="bb_jc_search_bt" class="btn btn-xs btn-purple align-left">
                                            <i class="icon-search align-top bigger-125"></i>条件查询
                                        </button>
                                    </div>
                                    <div class="col-sm-2">
                                        <button id="bb_jc_search_all_bt" class="btn btn-xs btn-success align-left">
                                            <i class="icon-search align-top bigger-125"></i>全部最新
                                        </button>
                                    </div>
                                    <br>
                                    <br>
                                    <table id="bb_bet_jc_table" class="table table-striped table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>下注ID</th>
                                            <th>赛事ID</th>
                                            <th>用户信息</th>
                                            <th>比赛信息</th>
                                            <th>赛事开始时间</th>
                                            <th>下注信息</th>
                                            <th>下注时间</th>
                                            <th>状态</th>
                                            <th>操作</th>
                                            <th>取消下注</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    <p id="bb_bet_jc_more_data_search" class="align-center">
                                        <button class="btn btn-inverse">
                                        	<i class="icon-arrow-down align-top bigger-125"></i>继续加载
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- PAGE CONTENT ENDS -->
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
seajs.use("inner_bet.js");
</script>
</body>
</html>
