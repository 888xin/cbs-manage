<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-11-05
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8"/>
    <title>商品导航</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico"/>
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css"/>
    <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-select.min.css"/>
    <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-editable.css"/>
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css"/>
    <link rel="stylesheet" href="${appName}/public/css/common.css"/>
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
                        <a href="#">商品管理</a>
                    </li>
                    <li class="active">商品导航</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">

                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->


                        <div class="row">
                            <div class="col-xs-12">
                                <div class="table-header">

                                    商品导航

                                    <button id="search_aliases_modal" class="btn btn-sm btn-success pull-right"
                                            data-toggle="modal" data-target="#modal-table">
                                        添加
                                        <span class="icon-upload-alt icon-on-right"></span>
                                    </button>

                                </div>

                                <div class="table-responsive">
                                    <table id="mall_goods_table"
                                           class="table table-striped table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>标题</th>
                                            <th class="width-20">图片</th>
                                            <th>类型</th>
                                            <th>链接</th>
                                            <th>排序</th>
                                            <th>创建时间</th>
                                            <th>操作</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>



                        <div id="modal-table" class="modal fade" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header no-padding">
                                        <div class="table-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                <span class="white">&times;</span>
                                            </button>
                                            添加商品导航
                                        </div>
                                    </div>
                                    <div class="widget-box">
                                        <div class="widget-body">
                                            <div class="widget-main padding-8">

                                                <div class="profile-user-info profile-user-info-striped">

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 标题</div>
                                                        <div class="profile-info-value">
                                                            <input id="goods_title" type="text" class="form-control" name="title">
                                                        </div>
                                                    </div>

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 图片</div>
                                                        <div class="profile-info-value">
                                                                    <span id="image_form_after_add">
                                                                        <form id="image_form" action="#"
                                                                              class="dropzone" method="post"
                                                                              enctype="multipart/form-data">
                                                                            <div class="fallback">
                                                                                <input name="file" type="file"/>
                                                                            </div>
                                                                        </form>
                                                                    </span>
                                                        </div>
                                                    </div>

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 类型</div>
                                                        <div class="profile-info-value" id="optionsRadios">

                                                            <label>
                                                                <input name="optionsRadios" type="radio" value="0" class="ace"/>
                                                                <span class="lbl bigger-120"> 商品 </span>
                                                            </label>
                                                            <label>
                                                                <input name="optionsRadios" type="radio" value="2" class="ace"/>
                                                                <span class="lbl bigger-120"> 分类 </span>
                                                            </label>
                                                            <label>
                                                                <input name="optionsRadios" type="radio" value="3" class="ace"/>
                                                                <span class="lbl bigger-120"> 资讯 </span>
                                                            </label>

                                                        </div>
                                                    </div>

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 链接</div>
                                                        <div class="profile-info-value">
                                                            <div id="link_data">
                                                                <input type="text" class="form-control" name="link" id="addresslink">
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 排序</div>
                                                        <div class="profile-info-value">
                                                            <input type="text" class="form-control" name="sort" id="sort" value="0">
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i> 取消
                                        </button>
                                        <button id="upload" class="btn btn-sm btn-info pull-right">
                                            <i class="icon-check"></i> 确认
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div id="modal_goods_recommend_edit" class="modal fade" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="widget-box">
                                        <div class="widget-header">
                                            <h4>修改导航</h4>
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
                                            <div class="widget-main" id="edit_main">

                                                <div class="profile-user-info profile-user-info-striped">


                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 标题 </div>
                                                        <div class="profile-info-value">
                                                            <%--<span class="editable" id="modal_edit_goods_recommend_title">无</span>--%>
                                                                <div class="control-group">
                                                                    <div>
                                                                        <div class="editable-input" style="position: relative;">
                                                                            <input type="text" id="modal_edit_goods_recommend_title" style="padding-right: 24px;" class="input-medium">
                                                                            <span class="editable-clear-x"></span>
                                                                        </div>
                                                                        <div class="editable-buttons">
                                                                            <button class="btn btn-info" id="goods_recommend_title_bt">
                                                                                <i class="icon-ok icon-white"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                        </div>
                                                    </div>

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 类型 </div>
                                                        <div class="profile-info-value">
                                                            <%--<span class="editable" id="modal_edit_goods_recommend_type">无</span>--%>

                                                                <form class="form-inline editableform" style="">
                                                                    <div class="control-group">
                                                                        <div>
                                                                            <div class="editable-input" style="position: relative;">
                                                                                <select title="请选择类型" class="width-200 form-control selectpicker" id="goods_recommend_type_select">
                                                                                    <option value="0">商品</option>
                                                                                    <option value="2">分类</option>
                                                                                    <option value="3">资讯</option>
                                                                                </select>
                                                                            </div>
                                                                            <div class="editable-buttons">
                                                                                <button class="btn btn-info editable-submit" id="goods_recommend_type_bt">
                                                                                    <i class="icon-ok icon-white"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 链接 </div>
                                                        <div class="profile-info-value">
                                                            <%--<span class="editable" id="modal_edit_goods_recommend_link">无</span>--%>
                                                                <form class="form-inline editableform" style="">
                                                                    <div class="control-group">
                                                                        <div>
                                                                            <div class="editable-input" style="position: relative;">
                                                                                <input type="text" id="modal_edit_goods_recommend_link" style="padding-right: 24px;" class="input-medium">
                                                                                <span class="editable-clear-x"></span>
                                                                            </div>
                                                                            <div class="editable-buttons">
                                                                                <button class="btn btn-info editable-submit" id="goods_recommend_link_bt">
                                                                                    <i class="icon-ok icon-white"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 排序 </div>
                                                        <div class="profile-info-value">
                                                            <%--<span class="editable" id="modal_edit_goods_recommend_sort">无</span>--%>
                                                                <form class="form-inline editableform" style="">
                                                                    <div class="control-group">
                                                                        <div>
                                                                            <div class="editable-input" style="position: relative;">
                                                                                <input type="text" id="modal_edit_goods_recommend_sort" style="padding-right: 24px;" class="input-medium">
                                                                                <span class="editable-clear-x"></span>
                                                                            </div>
                                                                            <div class="editable-buttons">
                                                                                <button class="btn btn-info editable-submit" id="goods_recommend_sort_bt">
                                                                                    <i class="icon-ok icon-white"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 图片 </div>
                                                        <div class="profile-info-value">
                                                            <span id="image_form_after_add2">
                                                            <form id="image_form2" action="#" class="dropzone"
                                                                  method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file"/>
                                                                </div>
                                                            </form>
                                                        </span>
                                                        </div>
                                                    </div>
                                                </div>
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
    seajs.config({base: prefix + "goods/"});
    seajs.use("goods_recommend");
</script>
</body>
</html>
