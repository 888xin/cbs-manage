<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-11-17
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>

    <meta charset="utf-8"/>
    <title>头版管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-editable.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />

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
                    <li class="active">头版管理</li>

                </ul><!-- .breadcrumb -->

            </div>

            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->


                        <div class="tabbable">
                            <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="frontpages_tab">
                                <li class="active">
                                    <a data-toggle="tab" href="#frontpages_content_tab">内容区</a>
                                </li>

                                <li>
                                    <a data-toggle="tab" href="#frontpages_ad_tab">广告区</a>
                                </li>

                            </ul>

                            <div class="tab-content">
                                <div id="frontpages_content_tab" class="tab-pane in active">


                                    <div class="table-header">
                                        内容区列表
                                    </div>
                                    <div class="table-responsive">
                                        <table id="frontpages_content_table" class="table table-striped table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th class="center">
                                                    <label>
                                                        <input type="checkbox" class="ace"/>
                                                        <span class="lbl"></span>
                                                    </label>
                                                </th>
                                                <th class="width-7">姓名</th>
                                                <th>头像</th>
                                                <th>龙号</th>
                                                <th class="width-25">内容</th>
                                                <th>内容ID/URL</th>
                                                <th>类型</th>
                                                <th>
                                                    <i class="icon-time bigger-110 hidden-480"></i>
                                                    创建时间
                                                </th>
                                                <th class="width-4">状态</th>
                                                <th class="width-15">操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>


                                </div>

                                <div id="frontpages_ad_tab" class="tab-pane">


                                    <div class="table-header">
                                        广告区列表
                                    </div>
                                    <div class="table-responsive">
                                        <table id="frontpages_ad_table" class="table table-striped table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th class="center">
                                                    <label>
                                                        <input type="checkbox" class="ace"/>
                                                        <span class="lbl"></span>
                                                    </label>
                                                </th>
                                                <th class="width-7">姓名</th>
                                                <th>头像</th>
                                                <th>龙号</th>
                                                <th class="width-35">内容</th>
                                                <th>内容ID/URL</th>
                                                <th>类型</th>
                                                <th>
                                                    <i class="icon-time bigger-110 hidden-480"></i>
                                                    创建时间
                                                </th>
                                                <th>状态</th>
                                                <th class="width-10">操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>













                        <!-- frontpage content add/.modal-dialog -->
                        <div id="frontpage_add_modal" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box">
                                        <div class="widget-header">
                                            <h4>添加头版内容区信息</h4>
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
                                                <div>
                                                    <label for="modal_add_frontpage_title" class="green bigger-150">标题：</label>
                                                    <input class="form-control" type="text" id="modal_add_frontpage_title" placeholder="请输入标题（限定64个字）" />
                                                </div>
                                                <fieldset>
                                                    <label class="green bigger-150">描述（限定256个字数）：</label>
                                                    <textarea class="form-control limited" id="modal_add_frontpage_content" placeholder="请输入详细描述（限定256个字）"maxlength="256"></textarea>
                                                </fieldset>

                                                <fieldset>
                                                    <label for="modal_add_frontpage_type" class="green bigger-150">类型：</label>
                                                    <div id="modal_add_frontpage_type">
                                                        <div class="grid3">
                                                            <div class="radio">
                                                                <label>
                                                                    <input name="modal_add_frontpage_type" type="radio" value="4" class="ace"/>
                                                                    <span class="lbl bigger-120"> 推荐资讯 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="grid3">
                                                            <div class="radio">
                                                                <label>
                                                                    <input name="modal_add_frontpage_type" type="radio" value="5" class="ace"/>
                                                                    <span class="lbl bigger-120"> 推荐比赛 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="grid3">
                                                            <div class="radio">
                                                                <label>
                                                                    <input name="modal_add_frontpage_type" type="radio" value="6" class="ace"/>
                                                                    <span class="lbl bigger-120"> 网页链接 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>


                                                <div>
                                                    <label for="modal_add_frontpage_content_id" class="green bigger-150">资讯ID：</label>
                                                    <input class="input-xxlarge" type="text" id="modal_add_frontpage_content_id" placeholder="请输入资讯ID" />
                                                    <button id="modal_add_frontpage_load_content" class="btn btn-minier btn-success">加载内容</button>
                                                </div>

                                                <div class="space-4"></div>

                                                <div>
                                                    <label for="modal_add_frontpage_is_inner_contest" class="green bigger-150">是否同时发布赛事新闻：</label>
                                                    <label>
                                                        <input id="modal_add_frontpage_is_inner_contest" class="ace ace-switch ace-switch-6" type="checkbox" />
                                                        <span class="lbl"></span>
                                                    </label>
                                                </div>

                                                <div class="space-4"></div>

                                                <fieldset class="hide" id="modal_add_frontpage_inner_fieldset">

                                                    <div class="grid2">
                                                        <div>
                                                            <label class="green bigger-150">赛事ID：</label>
                                                            <input type="text" id="modal_add_frontpage_inner_contest_id" placeholder="请输入赛事ID" />
                                                        </div>
                                                    </div>
                                                    <div class="grid2">
                                                        <div class="form-group">
                                                            <label class="col-sm-4 control-label no-padding-right green bigger-140">赛事类型：</label>

                                                            <div class="col-sm-8" id="modal_add_frontpage_inner_contest_type">
                                                                <label>
                                                                    <input name="modal_add_frontpage_inner_contest_type" value="0" type="radio" class="ace" />
                                                                    <span class="lbl"> 足球 </span>
                                                                </label>

                                                                <label>
                                                                    <input name="modal_add_frontpage_inner_contest_type" value="1" type="radio" class="ace" />
                                                                    <span class="lbl"> 篮球 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <div class="hide">
                                                    <label for="modal_add_frontpage_url" class="green bigger-150">URL：</label>
                                                    <input class="form-control" type="text" id="modal_add_frontpage_url" placeholder="请输入网页URL" />
                                                </div>

                                                <div class="space-4"></div>

                                                <fieldset class="hide" id="modal_add_frontpage_contest_fieldset">

                                                    <%--<div class="grid2">--%>
                                                        <%--<div>--%>
                                                            <%--<label class="green bigger-150">赛事ID：&nbsp;&nbsp;</label>--%>
                                                            <%--<input type="text" id="modal_add_frontpage_contest_id" placeholder="请输入赛事ID" />--%>
                                                        <%--</div>--%>
                                                    <%--</div>--%>
                                                    <%--<div class="grid2">--%>
                                                        <%--<label class="green bigger-150">赛事类型：&nbsp;</label>--%>
                                                        <%--<select id="modal_add_frontpage_contest_type">--%>
                                                            <%--<option value="0">足球</option>--%>
                                                            <%--<option value="1">篮球</option>--%>
                                                        <%--</select>--%>
                                                    <%--</div>--%>
                                                    <div class="grid2">
                                                        <div>
                                                            <label class="green bigger-150">赛事ID：</label>
                                                            <input type="text" id="modal_add_frontpage_contest_id" placeholder="请输入赛事ID" />
                                                        </div>
                                                    </div>
                                                    <div class="grid2">
                                                        <div class="form-group">
                                                            <label class="col-sm-4 control-label no-padding-right green bigger-140">赛事类型：</label>

                                                            <div class="col-sm-8" id="modal_add_frontpage_contest_type">
                                                                <label>
                                                                    <input name="modal_add_frontpage_contest_type" value="0" type="radio" class="ace" />
                                                                    <span class="lbl"> 足球 </span>
                                                                </label>

                                                                <label>
                                                                    <input name="modal_add_frontpage_contest_type" value="1" type="radio" class="ace" />
                                                                    <span class="lbl"> 篮球 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>



                                                <div class="space-4"></div>

                                                <fieldset>
                                                    <div id="show_img" class="profile-users clearfix">

                                                        <%--<div class="profile-users clearfix">--%>
                                                            <%--<div class="itemdiv memberdiv">--%>
                                                                <%--<div class="inline position-relative">--%>
                                                                    <%--<div class="user1">--%>
                                                                        <%--<a href="#">--%>
                                                                            <%--<img src="http://roi.skst.cn/goods/c24/1452156831190_b8i8ez.jpg"/>--%>
                                                                        <%--</a>--%>
                                                                    <%--</div>--%>

                                                                    <%--<div class="body">--%>
                                                                        <%--<div class="name">--%>
                                                                            <%--<a href="#">--%>
                                                                                <%--<i class="icon-remove-circle icon-only bigger-150"></i>--%>
                                                                            <%--</a>--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>

                                                    </div>
                                                </fieldset>


                                                <fieldset>
                                                    <label class="green bigger-150">上传图片:</label>
                                                    <span id="image_form_after_add">
                                                        <form id="image_form" action="#" class="dropzone" method="post"
                                                              enctype="multipart/form-data">
                                                            <div class="fallback">
                                                                <input name="file" type="file"/>
                                                            </div>
                                                        </form>
                                                    </span>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="modal_add_frontpage_button" class="btn btn-sm btn-info pull-right">
                                            <i class="icon-save"></i>
                                            确认添加
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->




                        <!-- frontpage ad add/.modal-dialog -->
                        <div id="frontpage_ad_add_modal" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box">
                                        <div class="widget-header">
                                            <h4>添加头版广告区信息</h4>
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
                                                <div>
                                                    <label for="modal_add_frontpage_ad_title" class="green bigger-150">标题：</label>
                                                    <input class="form-control" type="text" id="modal_add_frontpage_ad_title" placeholder="请输入标题（限定64个字）" />
                                                </div>
                                                <fieldset>
                                                    <label class="green bigger-150">描述（限定256个字数）：</label>
                                                    <textarea class="form-control limited" id="modal_add_frontpage_ad_content" placeholder="请输入详细描述（限定256个字）"maxlength="256"></textarea>
                                                </fieldset>

                                                <fieldset>
                                                    <div id="modal_add_frontpage_ad_type">
                                                        <div class="grid3">
                                                            <div class="radio">
                                                                <label>
                                                                    <input name="modal_add_frontpage_ad_type" type="radio" value="-4" class="ace"/>
                                                                    <span class="lbl bigger-120"> 推荐资讯 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="grid3">
                                                            <div class="radio">
                                                                <label>
                                                                    <input name="modal_add_frontpage_ad_type" type="radio" value="-5" class="ace"/>
                                                                    <span class="lbl bigger-120"> 推荐比赛 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div class="grid3">
                                                            <div class="radio">
                                                                <label>
                                                                    <input name="modal_add_frontpage_ad_type" type="radio" value="-6" class="ace"/>
                                                                    <span class="lbl bigger-120"> 网页链接 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <div>
                                                    <label for="modal_add_frontpage_ad_content_id" class="green bigger-150">资讯ID：</label>
                                                    <input class="input-xxlarge" type="text" id="modal_add_frontpage_ad_content_id" placeholder="请输入资讯ID" />
                                                    <button id="modal_add_frontpage_ad_load_content" class="btn btn-minier btn-success">加载内容</button>
                                                </div>


                                                <div class="space-4"></div>

                                                <div>
                                                    <label for="modal_add_frontpage_ad_is_inner_contest" class="green bigger-150">是否同时发布赛事新闻：</label>
                                                    <label>
                                                        <input id="modal_add_frontpage_ad_is_inner_contest" class="ace ace-switch ace-switch-6" type="checkbox" />
                                                        <span class="lbl"></span>
                                                    </label>
                                                </div>

                                                <div class="space-4"></div>

                                                <fieldset class="hide" id="modal_add_frontpage_ad_inner_fieldset">

                                                    <div class="grid2">
                                                        <div>
                                                            <label class="green bigger-150">赛事ID：</label>
                                                            <input type="text" id="modal_add_frontpage_ad_inner_contest_id" placeholder="请输入赛事ID" />
                                                        </div>
                                                    </div>
                                                    <div class="grid2">
                                                        <div class="form-group">
                                                            <label class="col-sm-4 control-label no-padding-right green bigger-140">赛事类型：</label>

                                                            <div class="col-sm-8" id="modal_add_frontpage_ad_inner_contest_type">
                                                                <label>
                                                                    <input name="modal_add_frontpage_ad_inner_contest_type" value="0" type="radio" class="ace" />
                                                                    <span class="lbl"> 足球 </span>
                                                                </label>

                                                                <label>
                                                                    <input name="modal_add_frontpage_ad_inner_contest_type" value="1" type="radio" class="ace" />
                                                                    <span class="lbl"> 篮球 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <div class="hide">
                                                    <label for="modal_add_frontpage_ad_url" class="green bigger-150">网页URL：</label>
                                                    <input class="form-control" type="text" id="modal_add_frontpage_ad_url" placeholder="请输入网页URL" />
                                                </div>

                                                <div class="space-4"></div>

                                                <fieldset class="hide" id="modal_add_frontpage_ad_contest_fieldset">

                                                    <div class="grid2">
                                                        <div>
                                                            <label class="green bigger-150">赛事ID：</label>
                                                            <input type="text" id="modal_add_frontpage_ad_contest_id" placeholder="请输入赛事ID" />
                                                        </div>
                                                    </div>
                                                    <div class="grid2">
                                                        <div class="form-group">
                                                            <label class="col-sm-4 control-label no-padding-right green bigger-140">赛事类型：</label>

                                                            <div class="col-sm-8" id="modal_add_frontpage_ad_contest_type">
                                                                <label>
                                                                    <input name="modal_add_frontpage_ad_contest_type" value="0" type="radio" class="ace" />
                                                                    <span class="lbl"> 足球 </span>
                                                                </label>

                                                                <label>
                                                                    <input name="modal_add_frontpage_ad_contest_type" value="1" type="radio" class="ace" />
                                                                    <span class="lbl"> 篮球 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>

                                                <fieldset>
                                                    <label class="green bigger-150">上传图片:</label>
                                                    <span id="image_form_after_ad_add">
                                                        <form id="image_form_ad" action="#" class="dropzone" method="post"
                                                              enctype="multipart/form-data">
                                                            <div class="fallback">
                                                                <input name="file" type="file"/>
                                                            </div>
                                                        </form>
                                                    </span>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="modal_add_frontpage_ad_button" class="btn btn-sm btn-info pull-right">
                                            <i class="icon-save"></i>
                                            确认添加
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->





                        <div id="modal_edit" class="modal fade" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header no-padding">
                                        <div class="table-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                <span class="white">&times;</span>
                                            </button>
                                            编辑头版内容区
                                        </div>
                                    </div>
                                    <div class="widget-box">
                                        <div class="widget-body">


                                            <div class="profile-user-info profile-user-info-striped">

                                                <%--<div class="profile-info-row">--%>
                                                    <%--<div class="profile-info-name"> 商品照片 </div>--%>
                                                    <%--<div class="profile-info-value">--%>
                                                            <%--<span class="profile-picture">--%>
                                                                <%--<img id="modal_edit_photo" class="editable img-responsive" />--%>
                                                            <%--</span>--%>
                                                        <%--<br>--%>
                                                        <%--<span class="editable" id="modal_edit_image">输入图片相对路径</span>--%>
                                                    <%--</div>--%>
                                                <%--</div>--%>

                                                <%--<div class="profile-info-row">--%>
                                                    <%--<div class="profile-info-name"> 商品分类 </div>--%>
                                                    <%--<div class="profile-info-value">--%>
                                                        <%--<span class="editable" id="modal_edit_goods_category"></span>--%>
                                                    <%--</div>--%>
                                                <%--</div>--%>

                                                <div class="profile-info-row">
                                                    <div class="profile-info-name"> 头版标题 </div>
                                                    <div class="profile-info-value">
                                                        <span class="editable" id="modal_edit_title"></span>
                                                    </div>
                                                </div>
                                                <div class="profile-info-row">
                                                    <div class="profile-info-name"> 头版内容 </div>
                                                    <div class="profile-info-value">
                                                        <span class="editable" id="modal_edit_content"></span>
                                                    </div>
                                                </div>
                                                <div class="profile-info-row">
                                                    <div class="profile-info-name"> 资讯ID </div>
                                                    <div class="profile-info-value">
                                                        <span class="editable" id="modal_edit_content_id"></span>
                                                    </div>
                                                </div>
                                                <div class="profile-info-row">
                                                    <div class="profile-info-name"> 内嵌赛事ID </div>
                                                    <div class="profile-info-value">
                                                        <span class="editable" id="modal_edit_inner_contest_id"></span>
                                                    </div>
                                                </div>
                                                <div class="profile-info-row">
                                                    <div class="profile-info-name"> 内嵌赛事类型 </div>
                                                    <div class="profile-info-value">
                                                        <span class="editable" id="modal_edit_inner_contest_type"></span>
                                                    </div>
                                                </div>
                                                <div class="profile-info-row">
                                                    <div class="profile-info-name"> URL </div>
                                                    <div class="profile-info-value">
                                                        <span class="editable" id="modal_edit_url"></span>
                                                    </div>
                                                </div>
                                                <div class="profile-info-row">
                                                    <div class="profile-info-name"> 赛事ID </div>
                                                    <div class="profile-info-value">
                                                        <span class="editable" id="modal_edit_contest_id"></span>
                                                    </div>
                                                </div>
                                                <div class="profile-info-row">
                                                    <div class="profile-info-name"> 赛事类型 </div>
                                                    <div class="profile-info-value">
                                                        <span class="editable" id="modal_edit_contest_type"></span>
                                                    </div>
                                                </div>

                                                <div class="profile-info-row">
                                                    <div class="profile-info-name"> 图片修改 </div>
                                                    <div class="profile-info-value">
                                                        <span id="image_form_after_add2">
                                                            <form id="image_form2" action="#" class="dropzone"
                                                                  method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file"/>
                                                                </div>
                                                            </form>
                                                        </span>
                                                        <button class="btn btn-info btn-minier" id="modal_edit_image_bt">确定修改图片</button>
                                                    </div>
                                                </div>


                                            </div>




                                        </div>
                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i> 关闭
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- /.modal-content -->
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
<!-- /.main-container -->





<script type="text/javascript">
    var xin_previous = false ;
    var xin_next = false ;
    var xin_skip = 0 ;
    seajs.config({base: prefix+"content"});
    seajs.use("frontpage.js");
</script>

</body>
</html>
