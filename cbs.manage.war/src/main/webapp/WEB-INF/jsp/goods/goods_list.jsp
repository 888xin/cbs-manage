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
    <title>商品展示</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/chosen.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/colorbox.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-editable.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/cbs-manage/goods.css" />
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
                    <li class="active">商品展示</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="page-header">
                    <h1>
                        <span id="goods_title_name">全部上架商品列表</span>
                        <small>
                            <i class="icon-double-angle-right"></i>
                            商品详细列表，鼠标放到图片上点击进行图文操作，右上角显示商品是否置顶滚播
                        </small>
                        <%--<label class="pull-right inline">--%>
                            <%--<div class="btn-group">--%>
                                <%--<button id="goods_add_bt" data-toggle="dropdown" class="btn btn-sm btn-success position-relative">--%>
                                    <%--添加商品--%>
                                    <%--<span class="icon-upload-alt icon-on-right"></span>--%>
                                <%--</button>--%>
                            <%--</div>--%>
                        <%--</label>--%>
                        <label class="pull-right inline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <label class="pull-right inline">
                            <div class="btn-group">
                                <button data-toggle="dropdown" class="btn btn-sm btn-warning position-relative">
                                    商品状态
                                    <span class="icon-caret-down icon-on-right"></span>
                                </button>
                                <ul class="dropdown-menu dropdown-warning">
                                    <li>
                                        <a id="goods_title_up_a" href="#">
                                            <i id="goods_title_up" class="icon-ok green"></i>
                                            上架
                                        </a>
                                    </li>
                                    <li>
                                        <a id="goods_title_down_a" href="#">
                                            <i id="goods_title_down" class="icon-ok green invisible"></i>
                                            下架
                                        </a>
                                    </li>
                                    <li>
                                        <a id="goods_title_all_a" href="#">
                                            <i id="goods_title_all" class="icon-ok green invisible"></i>
                                            全部
                                        </a>
                                    </li>
                                </ul>
                            </div><!-- /btn-group -->
                        </label>
                        <%--<label class="pull-right inline">&nbsp;</label>--%>
                        <%--<label class="pull-right inline">&nbsp;</label>--%>
                        <%--<label class="pull-right inline">--%>
                            <%--<div class="btn-group">--%>
                                <%--<button data-toggle="dropdown" class="btn btn-sm btn-info position-relative">--%>
                                    <%--商品排序--%>
                                    <%--<span class="icon-caret-down icon-on-right"></span>--%>
                                <%--</button>--%>
                                <%--<ul class="dropdown-menu dropdown-info">--%>
                                    <%--<li>--%>
                                        <%--<a id="goods_time_up_a" href="#">--%>
                                            <%--<i id="goods_time_up" class="icon-ok red invisible"></i>--%>
                                            <%--按更新时间升序--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                    <%--<li>--%>
                                        <%--<a id="goods_time_down_a" href="#">--%>
                                            <%--<i id="goods_time_down" class="icon-ok red invisible"></i>--%>
                                            <%--按更新时间降序--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                    <%--<li>--%>
                                        <%--<a id="goods_num_up_a" href="#">--%>
                                            <%--<i id="goods_num_up" class="icon-ok red invisible"></i>--%>
                                            <%--按销量升序--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                    <%--<li>--%>
                                        <%--<a id="goods_num_down_a" href="#">--%>
                                            <%--<i id="goods_num_down" class="icon-ok red invisible"></i>--%>
                                            <%--按销量降序--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                    <%--<li>--%>
                                        <%--<a id="goods_price_up_a" href="#">--%>
                                            <%--<i id="goods_price_up" class="icon-ok red invisible"></i>--%>
                                            <%--按价格升序--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                    <%--<li>--%>
                                        <%--<a id="goods_price_down_a" href="#">--%>
                                            <%--<i id="goods_price_down" class="icon-ok red"></i>--%>
                                            <%--按价格降序--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                <%--</ul>--%>
                            <%--</div><!-- /btn-group -->--%>
                        <%--</label>--%>
                        <label class="pull-right inline">&nbsp;</label>
                        <label class="pull-right inline">&nbsp;</label>
                        <label class="pull-right inline">
                            <div class="btn-group">
                                <button data-toggle="dropdown" class="btn btn-sm btn-success position-relative">
                                    商品类别
                                    <span class="icon-caret-down icon-on-right"></span>
                                </button>
                                <ul class="dropdown-menu dropdown-success" id="dropdown_menu_category">
                                    <%--<li>--%>
                                        <%--<a id="goods_category_1_a" href="#">--%>
                                            <%--<i id="goods_category_1" class="icon-ok green invisible"></i>--%>
                                            <%--球鞋--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                    <%--<li>--%>
                                        <%--<a id="goods_category_2_a" href="#">--%>
                                            <%--<i id="goods_category_2" class="icon-ok green invisible"></i>--%>
                                            <%--球衣--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                    <%--<li>--%>
                                        <%--<a id="goods_category_3_a" href="#">--%>
                                            <%--<i id="goods_category_3" class="icon-ok green invisible"></i>--%>
                                            <%--运动智能产品--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                    <%--<li>--%>
                                        <%--<a id="goods_category_4_a" href="#">--%>
                                            <%--<i id="goods_category_4" class="icon-ok green invisible"></i>--%>
                                            <%--时尚电子产品--%>
                                        <%--</a>--%>
                                    <%--</li>--%>
                                    <li>
                                        <a id="goods_category_all_a" href="#">
                                            <i id="goods_category_all" class="icon-ok green"></i>
                                            全部
                                        </a>
                                    </li>
                                </ul>
                            </div><!-- /btn-group -->
                        </label>
                    </h1>
                </div><!-- /.page-header -->
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div class="row-fluid">
                            <ul class="ace-thumbnails" id="goods_thumbnails">
                            </ul>
                        </div>
                        <!-- goods add/.modal-dialog -->
                        <div id="modal_goods_add" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:1200px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_add_content">
                                        <div class="widget-header">
                                            <h4>添加商品</h4>
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
                                                    <label for="modal_add_goods_title" class="green bigger-150">商品名称：</label>
                                                    <input class="input-xxlarge" type="text" id="modal_add_goods_title" placeholder="请输入商品名称（限定64个字）" />
                                                </div>
                                                <fieldset>
                                                    <label class="green bigger-150">商品描述（不支持图片直传，插入图片需点击插入图片按钮，输入图片地址。或者点右下方上传商品介绍图，照片会回显到内容区）</label>
                                                    <div class="wysiwyg-editor" id="modal_add_goods_editor"></div>
                                                </fieldset>
                                                <div class="space-4"></div>
                                                <fieldset>
                                                    <div class="grid3">
                                                        <label class="green bigger-150">商品单价:&nbsp;&nbsp;&nbsp;</label>
                                                        <input type="text" id="modal_add_goods_price"/>
                                                    </div>
                                                    <div class="grid3">
                                                        <label class="green bigger-150">商品原价:&nbsp;&nbsp;&nbsp;</label>
                                                        <input type="text" id="modal_add_goods_original_price"/>
                                                    </div>
                                                    <div class="grid3">
                                                        <label class="green bigger-150">商品库存量:</label>
                                                        <input type="text" id="modal_add_goods_stock"/>
                                                    </div>

                                                </fieldset>
                                                <fieldset>
                                                    <div class="grid3">
                                                        <label class="green bigger-150">价格类型：&nbsp;&nbsp;</label>
                                                        <select id="modal_add_goods_price_type">
                                                            <option value="0">龙筹购买</option>
                                                            <option value="1">龙币购买</option>
                                                        </select>
                                                    </div>
                                                    <div class="grid3">
                                                        <label class="green bigger-150">商品类型：&nbsp;&nbsp;</label>
                                                        <select id="modal_add_goods_type">
                                                            <option value="0">实物商品</option>
                                                            <option value="1">龙筹换龙币</option>
                                                            <option value="2">手机充值卡</option>
                                                        </select>
                                                    </div>
                                                    <div class="grid3">
                                                        <label class="green bigger-120">邮费（不包邮填写）</label>
                                                        <input type="text" id="modal_add_goods_postage"/>
                                                    </div>
                                                </fieldset>

                                                <fieldset>
                                                    <div class="grid3">
                                                        <%--<label class="green bigger-150">上传商品主图（一张）:</label>--%>
                                                        <span id="image_form_after_add">
                                                            <form id="image_form" action="#" class="dropzone" method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file"/>
                                                                </div>
                                                            </form>
                                                        </span>
                                                    </div>
                                                    <div class="grid3">
                                                        <%--<label class="green bigger-150">上传商品滚播图（最多五张）:</label>--%>
                                                        <span id="image_form_after_add2">
                                                            <form id="image_form2" action="#" class="dropzone"
                                                                  method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file"/>
                                                                </div>
                                                            </form>
                                                        </span>
                                                    </div>
                                                    <div class="grid3">
                                                        <%--<label class="green bigger-150">上传商品介绍图（最多十张）:</label>--%>
                                                        <span id="image_form_after_add3">
                                                            <form id="image_form3" action="#" class="dropzone"
                                                                  method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file"/>
                                                                </div>
                                                            </form>
                                                        </span>
                                                    </div>

                                                </fieldset>


                                                <div class="form-group no-margin-bottom" id="modal_add_goods_prop">
                                                    <label class="col-sm-2 control-label no-padding-right green bigger-150">商品额外参数：</label>

                                                    <div class="col-sm-10">
                                                        <div>
                                                            <input type="text" class="col-xs-4" placeholder="商品属性名称（比如：尺寸 颜色）"/>
                                                            <span class="col-xs-1"></span>
                                                            <input type="text" class="col-xs-5" placeholder="商品属性值，多个值用英文逗号隔开（比如：红色,蓝色,绿色）" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="align-right">
                                                    <button id="id-add-attachment" type="button" class="btn btn-minier btn-danger">
                                                        <i class="icon-paper-clip bigger-140"></i>
                                                        添加更多参数
                                                    </button>
                                                </div>

                                                <div class="space"></div>
                                                <div class="space"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="modal_add_goods_button" class="btn btn-sm btn-info pull-right">
                                            <i class="icon-save"></i>
                                            确认添加
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                        <!-- goods edit/.modal-dialog -->
                        <div id="modal_goods_edit" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_edit_content">
                                        <div class="widget-header">
                                            <h4>修改商品</h4>
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
                                                <div class="profile-user-info profile-user-info-striped">

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品照片 </div>
                                                        <div class="profile-info-value">
                                                            <span class="profile-picture">
                                                                <img id="modal_edit_photo" class="editable img-responsive" />
                                                            </span>
                                                            <br>
                                                            <span class="editable" id="modal_edit_image">输入图片相对路径</span>
                                                        </div>
                                                    </div>

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品分类 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_goods_category"></span>
                                                        </div>
                                                    </div>

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品名称 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_name"></span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品价格 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_price"></span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品原价 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_original"></span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品邮费 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_postage"></span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品类型 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_goods_type"></span>
                                                        </div>
                                                    </div>
                                                    <%--<div class="profile-info-row">--%>
                                                        <%--<div class="profile-info-name"> 价格类型 </div>--%>
                                                        <%--<div class="profile-info-value">--%>
                                                            <%--<span class="editable" id="modal_edit_type"></span>--%>
                                                        <%--</div>--%>
                                                    <%--</div>--%>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品销量 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_sales"></span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品库存 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_stock"></span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品排序值 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_sort_index"></span>
                                                        </div>
                                                    </div>
                                                    <%--<div id="modal_edit_exchange_d" class="profile-info-row hidden">--%>
                                                        <%--<div class="profile-info-name"> 虚拟兑换量 </div>--%>
                                                        <%--<div class="profile-info-value">--%>
                                                            <%--<span class="editable" id="modal_edit_exchange"></span>--%>
                                                        <%--</div>--%>
                                                    <%--</div>--%>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 商品参数 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_exprop">
                                                                修改商品参数，示例：颜色:红色,绿色;尺寸:23,24,25  严格按照这种格式修改，参数名跟着英文冒号跟着参数值，两者缺一不可，多个参数值用英文逗号隔开，不同参数类型用英文分号隔开。输入0，取消全部参数。
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <%--<div class="profile-info-row">--%>
                                                        <%--<div class="profile-info-name"> 商品属性 </div>--%>
                                                        <%--<div class="profile-info-value">--%>
                                                            <%--<span class="editable" id="modal_edit_exparam">--%>
                                                                <%--修改商品属性，示例：{"original_price":20199,"postage":99}，严格按照这种格式修改，original_price代表原价，postage代表邮费，暂时只能修改添加这两种属性，后续需添加其他，请联系程序员。输入0，取消全部属性。--%>
                                                            <%--</span>--%>
                                                        <%--</div>--%>
                                                    <%--</div>--%>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 轮播照片展示 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_eximage_show">无</span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 轮播照片修改 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_eximage">修改商品轮播照片,多张照片以英文逗号隔开</span>
                                                        </div>
                                                    </div>
                                                    <%--<div class="profile-info-row">--%>
                                                        <%--<div class="profile-info-name"> 首页轮播添加 </div>--%>
                                                        <%--<div class="profile-info-value">--%>
                                                            <%--<span class="editable" id="modal_edit_queue">输入图片相对路径</span>--%>
                                                        <%--</div>--%>
                                                    <%--</div>--%>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 图片上传 </div>
                                                        <div class="profile-info-value">
                                                            <span id="image_form_after_add5">
                                                            <form id="image_form5" action="#" class="dropzone"
                                                                  method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file"/>
                                                                </div>
                                                            </form>
                                                        </span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 推荐到主页 </div>
                                                        <div class="profile-info-value">
                                                            <button id="modal_recommend_bt" class="btn btn-minier btn-pink">推荐</button>
                                                            <button id="modal_recommend_delete_bt" class="btn btn-minier btn-warning">撤销推荐</button>
                                                            <button id="modal_goods_delete_bt" class="btn btn-minier btn-danger disabled">删除商品</button>
                                                        </div>
                                                    </div>
                                                    <%--<div class="profile-info-row">--%>
                                                        <%--<div class="profile-info-name"> 商品删除 </div>--%>
                                                        <%--<div class="profile-info-value">--%>
                                                            <%--<button id="modal_edit_delete" class="btn btn-minier btn-danger">删除</button>--%>
                                                        <%--</div>--%>
                                                    <%--</div>--%>
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


                        <!-- goods edit content/.modal-dialog -->
                        <div id="modal_goods_edit_content" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:1000px;">
                                <div class="modal-content">
                                    <div class="widget-box">
                                        <div class="widget-header">
                                            <h4>修改商品详情（不支持图片直接上传，需上传图片获得地址后，点击插入图片按钮，输入图片地址）</h4>
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
                                                    <div class="wysiwyg-editor" style="max-height: 450px;height: 450px;" id="modal_edit_goods_content"></div>
                                                </div>

                                                <span id="image_form_after_add4">
                                                    <form id="image_form4" action="#" class="dropzone" method="post" enctype="multipart/form-data">
                                                        <div class="fallback">
                                                            <input name="file" type="file"/>
                                                        </div>
                                                    </form>
                                                </span>


                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="modal_edit_goods_content_button" class="btn btn-sm btn-info pull-right">
                                            <i class="icon-save"></i>
                                            确认修改
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
    seajs.config({base: prefix+"goods"});
    seajs.use("goods_list.js");
</script>
</body>
</html>
