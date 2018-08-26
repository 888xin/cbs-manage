<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-10-19
  Time: 下午7:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8"/>
    <title>公告管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
     <link rel="stylesheet" href="${appName}/public/css/cbs-manage/placard_list.css" />
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
                    <li class="active">公告管理</li>
                </ul><!-- .breadcrumb -->
                <div class="nav-search" id="nav-search">
                    <span class="input-icon">
                        <input type="text" placeholder="公告过滤 ..." class="nav-search-input" id="search_input" autocomplete="off" />
                        <i class="icon-search nav-search-icon"></i>
                    </span>
                </div><!-- #nav-search -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div id="fb_table_list_navbar" class="message-navbar align-center clearfix">
                            <div class="message-bar">
                                <div class="message-infobar" id="table_infobar">
                                    <span class="green bigger-150">公告列表</span>
                                    <span class="grey bigger-110">(剩余 <i id="toolbar_placard_num" class="green"></i> 条公告可启用)</span>
                                </div>
                                <div class="message-toolbar hide" id="table_toolbar">
                                    <div class="inline position-relative align-left">
                                        <button class="btn btn-xs btn-warning dropdown-toggle" data-toggle="dropdown">
                                            <span class="bigger-110">操作</span>
                                            <i class="icon-caret-down icon-on-right"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-warning dropdown-caret dropdown-125">
                                            <li>
                                                <a id="toolbar_placard_edit_h" href="#">
                                                    <i class="icon-edit blue"></i>
                                                    &nbsp; 编辑
                                                </a>
                                            </li>
                                            <li class="divider"></li>
                                            <li>
                                                <a id="toolbar_placard_push_h" href="#">
                                                    <i class="icon-bullhorn green bigger-110"></i>
                                                    &nbsp; 通知
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <button class="btn btn-xs btn-warning" id="one_delete_select">
                                        <i class="icon-trash bigger-125"></i>
                                        <span class="bigger-110">一键删除</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div class="messagebar-item-left">
                                    <label class="inline middle">
                                        <input type="checkbox" id="toggle_all" class="ace" />
                                        <span class="lbl"></span>
                                    </label>
                                    &nbsp;
                                    <div class="inline position-relative">
                                        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                            <i class="icon-caret-down bigger-125 middle"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-lighter dropdown-100">
                                            <li>
                                                <a id="select_item_all" href="#">全选</a>
                                            </li>
                                            <li>
                                                <a id="select_item_none" href="#">全不选</a>
                                            </li>
                                            <li class="divider"></li>
                                            <li>
                                                <a id="select_item_new_createtime" href="#">最新创建</a>
                                            </li>
                                            <li>
                                                <a id="select_item_latest_endime" href="#">最迟截止时间</a>
                                            </li>
                                        </ul>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button id="placard_add_bt" class="btn btn-xs btn-success inline position-relative">
                                        <i class="icon-location-arrow bigger-125"></i>
                                        <span class="bigger-110">添加公告</span>
                                    </button>
                                </div>
                                <div class="messagebar-item-right">
                                    <div class="inline position-relative">
                                        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                            排序 &nbsp;
                                            <i class="icon-caret-down bigger-125"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-lighter pull-right dropdown-100">
                                            <li>
                                                <a href="#">
                                                    <i class="icon-eye-open green"></i>
                                                    创建时间
                                                </a>
                                                <a href="#">
                                                    <i class="icon-eye-close blue"></i>
                                                    截止时间
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table id="placard_table" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th class="width-4">复选框</th>
                                    <th class="center">ID</th>
                                    <th class="center width-25">标题</th>
                                    <th class="center">
                                        <i class="icon-time bigger-110 hidden-480"></i>
                                        创建时间
                                    </th>
                                    <th class="center">
                                        <i class="icon-time bigger-110 hidden-480"></i>
                                        截止时间
                                    </th>
                                    <th class="center width-7">类型</th>
                                    <th class="center">数据</th>
                                    <th class="center">统计</th>
                                    <th class="center">启用</th>
                                    <th class="center width-20">
                                        <i class="icon-cogs bigger-110 hidden-480"></i>
                                        操作
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div><!-- /.table-responsive -->
                        <p class="align-center">
                            <span id="placard_data_more" class="btn bt1n-small btn-pink no-border">
                                <i class="icon-arrow-down bigger-130"></i>
                                <span class="bigger-110">继续加载</span>
                            </span>
                        </p>
                        <!-- placard add/.modal-dialog -->
                        <div id="modal_placard_add" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:830px;">
                                <div class="modal-content">
                                        <div class="widget-box" id="modal_add_content">
                                            <div class="widget-header">
                                                <h4>添加公告</h4>
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
                                                        <label for="modal_add_placard_title"><i class="green bigger-150">标题：</i></label>
                                                        <input data-toggle="tooltip" title="输入公告的标题" data-placement="bottom" class="form-control" type="text" id="modal_add_placard_title" placeholder="标题（30个字）" />
                                                    </div>
                                                    <div>
                                                        <h4 class="header green clearfix">
                                                            正文（暂时不支持图片直接上传，如果要插入图片，点击插入图片按钮，输入图片链接代替）：
                                                        </h4>
                                                        <div class="wysiwyg-editor" id="modal_add_spacard_editor"></div>
                                                    </div>
                                                    <form class="form-group">
                                                        <div class="col-sm-6">
                                                            <div class="col-sm-4"><i class="green bigger-150">截止时间:</i></div>
                                                            <div class="col-sm-8"><input id="modal_add_placard_endtime" readonly="" type="text" /></div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="col-sm-4"><i class="green bigger-150">类型：</i></div>
                                                            <div class="col-sm-8">
                                                                <select id="modal_add_placard_type" data-placeholder="请选择链接类型">
                                                                    <option value="2">内容</option>
                                                                    <option value="1">网页</option>
                                                                    <option value="3">足球赛事</option>
                                                                    <option value="4">篮球赛事</option>
                                                                    <option value="5">锦标赛</option>
                                                                    <option value="6">送龙筹券</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    <hr />
                                                    <form class="form-group">
                                                        <div class="col-sm-6">
                                                            <div class="col-sm-4"><i class="green bigger-150">链接:</i></div>
                                                            <div class="col-sm-8"><input data-toggle="tooltip" title="输入针对类型对应的数据(选择“内容”不输，“足球篮球锦标赛”输入赛事ID，“网页”输入网址，“送龙筹券”输入龙筹券ID)" data-placement="bottom" id="modal_add_placard_link_data" type="text" /></div>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <div class="col-sm-4"><i class="green bigger-150">启用：</i></div>
                                                            <div class="col-sm-8">
                                                                <label>
                                                                    <input name="modal_placard_disable_switch" id="modal_add_placard_disable" class="ace ace-switch ace-switch-6" type="checkbox" />
                                                                    <span class="lbl"></span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </form>

                                                    <div class="space-32"></div>

                                                    <fieldset>
                                                        <%--<label class="green bigger-150">上传图片:</label>--%>
                                                        <span id="image_form_after_add">
                                                            <form id="image_form" action="#" class="dropzone" method="post"
                                                                  enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file"/>
                                                                </div>
                                                            </form>
                                                        </span>
                                                    </fieldset>

                                                    <%--<hr />--%>
                                                    <%--<hr />--%>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="modal_add_placard_edit_button" class="btn btn-sm btn-info pull-right">
                                            <i class="icon-save"></i>
                                            确认添加
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                        <!-- placard edit/.modal-dialog -->
                        <div id="modal_placard_edit" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:830px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_content">
                                        <div class="widget-header">
                                            <h4>编辑公告</h4>
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
                                                    <label for="modal_placard_title"><i class="green bigger-150">标题：</i></label>
                                                    <input data-toggle="tooltip" title="输入公告的标题" data-placement="bottom" class="form-control" type="text" id="modal_placard_title" placeholder="标题（30个字）" />
                                                </div>
                                                <div>
                                                    <h4 class="header green clearfix">
                                                        正文：
                                                    </h4>
                                                    <div class="wysiwyg-editor" id="modal_spacard_editor"></div>
                                                </div>
                                                <form class="form-group">
                                                    <div class="col-sm-6">
                                                        <div class="col-sm-4"><i class="green bigger-150">截止时间:</i></div>
                                                        <div class="col-sm-8"><input id="modal_placard_endtime" readonly="" type="text" /></div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="col-sm-4"><i class="green bigger-150">类型：</i></div>
                                                        <div class="col-sm-8">
                                                            <select id="modal_placard_type" data-placeholder="请选择链接类型">
                                                                <option value="2">内容</option>
                                                                <option value="1">网页</option>
                                                                <option value="3">足球赛事</option>
                                                                <option value="4">篮球赛事</option>
                                                                <option value="5">锦标赛</option>
                                                                <option value="6">送龙筹券</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </form>
                                                <hr />
                                                <form class="form-group">
                                                    <div class="col-sm-6">
                                                        <div class="col-sm-4"><i class="green bigger-150">链接:</i></div>
                                                        <div class="col-sm-8"><input data-toggle="tooltip" title="输入针对链接类型对应的数据" data-placement="bottom" id="modal_placard_link_data" type="text" /></div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="col-sm-4"><i class="green bigger-150">启用：</i></div>
                                                        <div class="col-sm-8">
                                                            <label>
                                                                <input name="modal_placard_disable_switch" id="modal_placard_disable" class="ace ace-switch ace-switch-6" type="checkbox" />
                                                                <span class="lbl"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </form>
                                                <hr />
                                                <form class="form-group">
                                                    <div class="col-sm-6">
                                                        <div class="col-sm-4"><i class="green bigger-150">ID:</i></div>
                                                        <div class="col-sm-8"><i id="modal_placard_id" class="red bigger-150"></i></div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="col-sm-4"><i class="green bigger-150">统计:</i></div>
                                                        <div class="col-sm-8"><i id="modal_placard_count" class="red bigger-150">23</i></div>
                                                    </div>
                                                </form>
                                                <hr />
                                                <hr />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="modal_placard_delete_button"class="btn btn-sm btn-inverse pull-left">
                                            <i class="icon-trash"></i>
                                            删除
                                        </button>
                                        <button id="modal_placard_edit_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                            <i class="icon-check"></i>
                                            确认提交
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->


                        <div id="modal_placard_view" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:830px;">
                                <div class="modal-content">
                                    <div class="widget-box">
                                        <div class="widget-header">
                                            <h4>预览公告</h4>
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
                                                <article id="info_con">
                                                     <div class="app-header"><img src="https://b.yzcdn.cn/v2/image/widget/showcase/iphone_head.png"/></div>
                                                    <p class="con_title"></p>
                                                    <p class="con_time"></p>
                                                    <div class="con_main"></div>
                                                    <a href="javascript:void(0)" class="con_btn none">参与竞猜</a>
                                                </article>
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
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
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
    seajs.config({base: prefix+"content/"});
    seajs.use("placard_list");
</script>
</body>
</html>
