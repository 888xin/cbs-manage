<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 16-3-22
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>商品添加</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
         <link rel="stylesheet" href="${appName}/public/css/lib/swiper.min.css" />
        <link rel="stylesheet" href="${appName}/public/css/common.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-select.min.css" />
        <link rel="stylesheet" href="${appName}/public/css/cbs-manage/goods_add.css" />

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
                            <li class="active">商品添加</li>
                        </ul><!-- .breadcrumb -->
                    </div>
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- PAGE CONTENT BEGINS -->









                                <div class="row-fluid">
                                    <div class="span12">
                                        <div class="widget-box">
                                            <div class="widget-header widget-header-blue widget-header-flat">
                                                <h4 class="lighter">商品添加</h4>
                                            </div>

                                            <div class="widget-body">
                                                <div class="widget-main">
                                                    <div id="fuelux-wizard" class="row-fluid" data-target="#step-container">
                                                        <ul class="wizard-steps">
                                                            <li data-target="#step1" class="active">
                                                                <span class="step">1</span>
                                                                <span class="title">选择商品分类</span>
                                                            </li>

                                                            <li data-target="#step2">
                                                                <span class="step">2</span>
                                                                <span class="title">编辑基本信息</span>
                                                            </li>

                                                            <li data-target="#step3">
                                                                <span class="step">3</span>
                                                                <span class="title">编辑商品详情</span>
                                                            </li>
                                                        </ul>
                                                    </div>

                                                    <hr />
                                                    <div class="step-content row-fluid position-relative" id="step-container">
                                                        <div class="step-pane active" id="step1">
                                                            <%--<h3 class="lighter block green">商品类目及类目添加</h3>--%>

                                                            <%--<div class="btn-group">--%>
                                                                <%--<button type="button" class="btn btn-app btn-success btn-large radius-4">--%>
                                                                    <%--球鞋--%>
                                                                    <%--<span class="badge badge-transparent">--%>
													                    <%--<i class="light-red icon-ok"></i>--%>
												                    <%--</span>--%>
                                                                <%--</button>--%>
                                                                <%--<button type="button" class="btn btn-app btn-success btn-large radius-4">--%>
                                                                    <%--球衣--%>
                                                                    <%--<span class="badge badge-transparent">--%>
													                    <%--<i class="light-red icon-remove"></i>--%>
												                    <%--</span>--%>
                                                                <%--</button>--%>
                                                                <%--<button type="button" class="btn btn-app btn-success btn-large radius-4">--%>
                                                                    <%--运动智能产品--%>
                                                                    <%--<span class="badge badge-transparent">--%>
													                    <%--<i class="light-red icon-remove"></i>--%>
												                    <%--</span>--%>
                                                                <%--</button>--%>
                                                                <%--<button type="button" class="btn btn-app btn-success btn-large radius-4">--%>
                                                                    <%--时尚电子产品--%>
                                                                    <%--<span class="badge badge-transparent">--%>
													                    <%--<i class="light-red icon-remove"></i>--%>
												                    <%--</span>--%>
                                                                <%--</button>--%>
                                                            <%--</div>--%>



                                                            <fieldset id="goods_category">

                                                                <%--<div>--%>

                                                                    <%--<div class="grid4">--%>
                                                                        <%--<div class="radio">--%>
                                                                            <%--<label>--%>
                                                                                <%--<input name="goods_category" type="radio" value="1" title="球鞋" class="ace"/>--%>
                                                                                <%--<span class="lbl bigger-120"> 球鞋 </span>--%>
                                                                            <%--</label>--%>
                                                                            <%--<img width="90" height="60" src="http://img002.21cnimg.com/photos/album/20140430/m600/FB8A38F4F3939B9C8011DBC2B0D98FB9.jpeg">--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>
                                                                    <%--<div class="grid4">--%>
                                                                        <%--<div class="radio">--%>
                                                                            <%--<label>--%>
                                                                                <%--<input name="goods_category" type="radio" value="2" title="球衣" class="ace"/>--%>
                                                                                <%--<span class="lbl bigger-120"> 球衣 </span>--%>
                                                                            <%--</label>--%>
                                                                            <%--<img width="90" height="60" src="http://img002.21cnimg.com/photos/album/20140430/m600/FB8A38F4F3939B9C8011DBC2B0D98FB9.jpeg">--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>
                                                                    <%--<div class="grid4">--%>
                                                                        <%--<div class="radio">--%>
                                                                            <%--<label>--%>
                                                                                <%--<input name="goods_category" type="radio" value="3" title="运动智能产品" class="ace"/>--%>
                                                                                <%--<span class="lbl bigger-120"> 运动智能产品 </span>--%>
                                                                            <%--</label>--%>
                                                                            <%--<img width="90" height="60" src="http://img002.21cnimg.com/photos/album/20140430/m600/FB8A38F4F3939B9C8011DBC2B0D98FB9.jpeg">--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>
                                                                    <%--<div class="grid4">--%>
                                                                        <%--<div class="radio">--%>
                                                                            <%--<label>--%>
                                                                                <%--<input name="goods_category" type="radio" value="4" title="时尚电子产品" class="ace"/>--%>
                                                                                <%--<span class="lbl bigger-120"> 时尚电子产品 </span>--%>
                                                                            <%--</label>--%>
                                                                            <%--<img width="90" height="60" src="http://img002.21cnimg.com/photos/album/20140430/m600/FB8A38F4F3939B9C8011DBC2B0D98FB9.jpeg">--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>

                                                                <%--</div>--%>

                                                                <%--<div>--%>

                                                                    <%--<div class="grid4">--%>
                                                                        <%--<div class="radio">--%>
                                                                            <%--<label>--%>
                                                                                <%--<input name="goods_category" type="radio" value="1" title="球鞋" class="ace"/>--%>
                                                                                <%--<span class="lbl bigger-120"> 球鞋 </span>--%>
                                                                            <%--</label>--%>
                                                                            <%--<img width="90" height="60" src="http://img002.21cnimg.com/photos/album/20140430/m600/FB8A38F4F3939B9C8011DBC2B0D98FB9.jpeg">--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>
                                                                    <%--<div class="grid4">--%>
                                                                        <%--<div class="radio">--%>
                                                                            <%--<label>--%>
                                                                                <%--<input name="goods_category" type="radio" value="2" title="球衣" class="ace"/>--%>
                                                                                <%--<span class="lbl bigger-120"> 球衣 </span>--%>
                                                                            <%--</label>--%>
                                                                            <%--<img width="90" height="60" src="http://img002.21cnimg.com/photos/album/20140430/m600/FB8A38F4F3939B9C8011DBC2B0D98FB9.jpeg">--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>
                                                                    <%--<div class="grid4">--%>
                                                                        <%--<div class="radio">--%>
                                                                            <%--<label>--%>
                                                                                <%--<input name="goods_category" type="radio" value="3" title="运动智能产品" class="ace"/>--%>
                                                                                <%--<span class="lbl bigger-120"> 运动智能产品 </span>--%>
                                                                            <%--</label>--%>
                                                                            <%--<img width="90" height="60" src="http://img002.21cnimg.com/photos/album/20140430/m600/FB8A38F4F3939B9C8011DBC2B0D98FB9.jpeg">--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>
                                                                    <%--<div class="grid4">--%>
                                                                        <%--<div class="radio">--%>
                                                                            <%--<label>--%>
                                                                                <%--<input name="goods_category" type="radio" value="4" title="时尚电子产品" class="ace"/>--%>
                                                                                <%--<span class="lbl bigger-120"> 时尚电子产品 </span>--%>
                                                                            <%--</label>--%>
                                                                            <%--<img width="90" height="60" src="http://img002.21cnimg.com/photos/album/20140430/m600/FB8A38F4F3939B9C8011DBC2B0D98FB9.jpeg">--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>

                                                                <%--</div>--%>


                                                            </fieldset>

                                                            <br>
                                                            <br>
                                                            <div class="hr hr-dotted"></div>


                                                            <form class="form-horizontal" >
                                                                <div class="form-group center">
                                                                    <%--<label for="category_value" class="col-xs-12 col-sm-3 control-label no-padding-right">--%>
                                                                        <%--自定义添加--%>
                                                                    <%--</label>--%>

                                                                    <%--<div class="col-xs-12 col-sm-5">--%>
																		<%--<span class="block input-icon input-icon-right">--%>
																			<%--<input type="text" id="category_value" class="width-100" />--%>
																			<%--<i class="icon-leaf"></i>--%>
																		<%--</span>--%>
                                                                    <%--</div>--%>

                                                                    <div class="help-block col-xs-12 col-sm-reset inline">
                                                                        <button class="btn btn-danger btn-minier" data-toggle="modal" data-target="#category_add_modal">
                                                                            修改或自定义添加
                                                                        </button>
                                                                    </div>
                                                                    <div class="help-block col-xs-12 col-sm-reset inline" id="select_delete_bt">
                                                                        <button class="btn btn-warning btn-minier">
                                                                            一键隐藏所选
                                                                        </button>
                                                                    </div>
                                                                    <div class="help-block col-xs-12 col-sm-reset inline" id="select_show_bt">
                                                                        <button class="btn btn-success btn-minier">
                                                                            一键恢复所选
                                                                        </button>
                                                                    </div>


                                                                </div>

                                                            </form>




                                                        </div>

                                                        <div class="step-pane" id="step2">






                                                            <form class="form-horizontal" id="validation-form" method="get">

                                                                <h3 class="header smaller lighter green">基本信息</h3>


                                                                <div class="form-group">
                                                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right">商品类别：</label>

                                                                    <div class="col-xs-12 col-sm-9">
                                                                        <div class="clearfix">
                                                                            <span id="goods_category_span" class="bigger-120">球衣</span>
                                                                        </div>
                                                                    </div>
                                                                </div>




                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label no-padding-right">商品类型：</label>

                                                                    <div class="col-sm-9" id="goods_type">
                                                                        <label>
                                                                            <input name="goods_type" value="0" type="radio" class="ace" />
                                                                            <span class="lbl"> 实物（物流发货） </span>
                                                                        </label>

                                                                        <label>
                                                                            <input name="goods_type" value="1" type="radio" class="ace" />
                                                                            <span class="lbl"> 虚拟（无需物流） </span>
                                                                        </label>
                                                                    </div>
                                                                </div>




                                                                <h3 class="header smaller lighter green">库存/规格</h3>


                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="control-label col-xs-12 col-sm-3 no-padding-right red" for="goods_stock">总库存：</label>--%>

                                                                    <%--<div class="col-xs-12 col-sm-9">--%>
                                                                        <%--<div class="clearfix">--%>
                                                                            <%--<input type="text" name="goods_stock" id="goods_stock" class="col-xs-12 col-sm-4" />--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>
                                                                <%--</div>--%>

                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label no-padding-right red">总库存：</label>

                                                                    <div class="col-sm-9">
                                                                        <span class="input-icon">
                                                                            <input type="text" id="goods_stock" name="goods_stock"/>
                                                                            <i class="icon-beaker red"></i>
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div class="space-2"></div>


                                                                <div id="goods_standard">

                                                                    <div class="form-group">
                                                                        <label class="col-sm-3 control-label no-padding-right">商品规格：</label>


                                                                        <div class="col-sm-9">
                                                                            <button id="modal_add_more_spec" type="button" class="width-20 form-control btn btn-info">
                                                                                <i class="icon-plus"></i>
                                                                                添加规格项目
                                                                            </button>
                                                                        </div>

                                                                        <%--<div class="col-sm-9">--%>
                                                                            <%--<select title="请选择规格名称" name="standard_key" class="width-30 form-control selectpicker" data-mobile="true">--%>
                                                                                <%--<option value="颜色">颜色</option>--%>
                                                                                <%--<option value="尺寸">尺寸</option>--%>
                                                                                <%--<option value="尺码">尺码</option>--%>
                                                                                <%--<option value="规格">规格</option>--%>
                                                                                <%--<option value="款式">款式</option>--%>
                                                                                <%--<option value="材质">材质</option>--%>
                                                                                <%--<option value="净含量">净含量</option>--%>
                                                                                <%--<option value="种类">种类</option>--%>
                                                                            <%--</select>--%>

                                                                            <%--<select name="standard_value" class="width-30 show-menu-arrow form-control" multiple>--%>
                                                                                <%--<option value="17">17</option>--%>
                                                                                <%--<option value="18">18</option>--%>
                                                                                <%--<option value="19">19</option>--%>
                                                                                <%--<option value="20">20</option>--%>
                                                                            <%--</select>--%>

                                                                            <%--<a href="#" data-action="delete" class="middle">--%>
                                                                                <%--<i class="icon-trash red bigger-150 middle"></i>--%>
                                                                            <%--</a>--%>

                                                                        <%--</div>--%>

                                                                    </div>


                                                                    <%--<div class="form-group">--%>
                                                                        <%--<label class="col-sm-3 control-label no-padding-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>--%>

                                                                        <%--<div class="col-sm-9">--%>
                                                                            <%--<select title="请选择规格名称" name="standard_key" class="width-30 form-control selectpicker" data-mobile="true">--%>
                                                                                <%--<option value="颜色">颜色</option>--%>
                                                                                <%--<option value="尺寸">尺寸</option>--%>
                                                                                <%--<option value="尺码">尺码</option>--%>
                                                                                <%--<option value="规格">规格</option>--%>
                                                                                <%--<option value="款式">款式</option>--%>
                                                                                <%--<option value="材质">材质</option>--%>
                                                                                <%--<option value="净含量">净含量</option>--%>
                                                                                <%--<option value="种类">种类</option>--%>
                                                                            <%--</select>--%>

                                                                            <%--<select name="standard_value" class="width-30 show-menu-arrow form-control" multiple>--%>
                                                                                <%--<option value="红色">红色</option>--%>
                                                                                <%--<option value="蓝色">蓝色</option>--%>
                                                                                <%--<option value="绿色">绿色</option>--%>
                                                                                <%--<option value="黄色">黄色</option>--%>
                                                                            <%--</select>--%>

                                                                            <%--<a href="#" data-action="delete" class="middle">--%>
                                                                                <%--<i class="icon-trash red bigger-150 middle"></i>--%>
                                                                            <%--</a>--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>

                                                                </div>





                                                                <div class="space-2"></div>


                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label no-padding-right">存储商品规格</label>

                                                                    <div class="col-sm-9">
                                                                                <span class="input-icon">
                                                                                    <input type="text" id="goods_standard_key" placeholder="添加规格项目"/>
                                                                                    <i class="icon-indent-right blue"></i>
                                                                                </span>

                                                                                <span class="input-icon">
                                                                                    <input type="text" class="input-xxlarge" id="goods_standard_value" placeholder="添加项目值"/>
                                                                                    <i class="icon-align-center green"></i>
                                                                                </span>

                                                                        <button id="goods_standard_save_bt" type="button" class="btn btn-minier btn-danger">
                                                                            <i class="icon-plus"></i>
                                                                            存储规格
                                                                        </button>
                                                                    </div>

                                                                </div>



                                                                <h3 class="header smaller lighter green">商品信息</h3>

                                                                <div class="form-group">
                                                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right red" for="goods_name">商品名：</label>

                                                                    <div class="col-xs-12 col-sm-9">
                                                                        <div class="clearfix">
                                                                            <input type="text" name="goods_name" id="goods_name" class="col-xs-12 col-sm-8" />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div class="space-2"></div>


                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label no-padding-right red">价格：</label>

                                                                    <div class="col-sm-9">
                                                                                <span class="input-icon">
                                                                                    <input type="text" name="goods_price" id="goods_price" placeholder="售价"/>
                                                                                    <i class="icon-dollar blue"></i>
                                                                                </span>

                                                                                <span class="input-icon">
                                                                                    <input type="text" id="goods_original" name="goods_original" placeholder="原价"/>
                                                                                    <i class="icon-dollar green"></i>
                                                                                </span>
                                                                    </div>
                                                                </div>



                                                                <div class="space-2"></div>


                                                                <div class="form-group">
                                                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right">商品主图：</label>

                                                                    <button class="btn btn-app btn-purple btn-sm"
                                                                            data-toggle="modal"
                                                                            data-target="#modal_add_main_photo">
                                                                        <i class="icon-cloud-upload bigger-200"></i>
                                                                        上传
                                                                    </button>
                                                                    <div class="show_img show_img2">
                                                                        <!--  <div>
                                                                             <img src="http://roi.skst.cn/goods/c24/1452156831190_b8i8ez.jpg"/>
                                                                             <i>-</i>
                                                                         </div>
                                                                         <div>
                                                                             <img src="http://roi.skst.cn/goods/fac/1452158628077_3hp5s0.jpg"/>
                                                                             <i>-</i>
                                                                         </div> -->
                                                                    </div>

                                                                </div>


                                                                <div class="space-2"></div>


                                                                <div class="form-group">
                                                                    <label class="control-label col-xs-12 col-sm-3 no-padding-right">商品轮播图：</label>

                                                                        <button class="btn btn-app btn-purple btn-sm" data-toggle="modal" data-target="#modal_add_roll_photo">
                                                                            <i class="icon-cloud-upload bigger-200"></i>
                                                                            上传
                                                                        </button>
                                                                        <div class="show_img show_img3">
                                                                        </div>
                                                                </div>



                                                                <h3 class="header smaller lighter green">物流/其它</h3>

                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="col-sm-3 control-label no-padding-right">运费设置：</label>--%>

                                                                    <%--<div class="col-sm-9">--%>
                                                                        <%--<span class="input-icon">--%>
                                                                            <%--<input type="text" id="goods_postage" value="0.00"/>--%>
                                                                            <%--<i class="icon-dollar blue"></i>--%>
                                                                        <%--</span>--%>

                                                                    <%--</div>--%>
                                                                <%--</div>--%>

                                                                <div class="form-group">
                                                                    <label for="goods_postage" class="col-xs-12 col-sm-3 control-label no-padding-right">运费设置：</label>

                                                                    <div class="col-xs-12 col-sm-5">
                                                                        <span class="block input-icon input-icon-right">
                                                                            <input type="text" id="goods_postage" value="0" class="width-100" />
                                                                        </span>
                                                                    </div>
                                                                    <div class="help-block col-xs-12 col-sm-reset inline"> 0 代表包邮 </div>
                                                                </div>

                                                                <div class="space-2"></div>


                                                                <%--<div class="form-group">--%>
                                                                    <%--<label class="col-sm-3 control-label no-padding-right">排序值：</label>--%>

                                                                    <%--<div class="col-sm-9">--%>
                                                                        <%--<span class="input-icon">--%>
                                                                            <%--<input type="text" id="goods_sort_index" value="1" placeholder="商品根据排序值排序"/>--%>
                                                                            <%--<i class="icon-sort blue"></i>--%>
                                                                        <%--</span>--%>

                                                                    <%--</div>--%>
                                                                <%--</div>--%>

                                                                <div class="form-group">
                                                                    <label for="goods_sort_index" class="col-xs-12 col-sm-3 control-label no-padding-right">排序值：</label>

                                                                    <div class="col-xs-12 col-sm-5">
                                                                                <span class="block input-icon input-icon-right">
                                                                                    <input type="text" id="goods_sort_index" name="goods_sort_index"
                                                                                           placeholder="商品根据排序值排序（排序值越大就越排在前面）" class="width-100" />
                                                                                </span>
                                                                    </div>
                                                                </div>

                                                                <div class="space-2"></div>


                                                                <div class="form-group">
                                                                    <label for="inputInfo" class="col-xs-12 col-sm-3 control-label no-padding-right">每人限购：</label>

                                                                    <div class="col-xs-12 col-sm-5">
                                                                                <span class="block input-icon input-icon-right">
                                                                                    <input type="text" id="inputInfo" value="0" class="width-100" />
                                                                                </span>
                                                                    </div>
                                                                    <div class="help-block col-xs-12 col-sm-reset inline"> 0 代表不限购 </div>
                                                                </div>

                                                                <div class="space-2"></div>

                                                                <div class="form-group" id="goods_status">
                                                                    <label class="col-sm-3 control-label no-padding-right">开售时间：</label>

                                                                    <div class="col-sm-9">
                                                                        <label>
                                                                            <input name="goods_status" value="1" type="radio" class="ace"/>
                                                                            <span class="lbl"> 立即开售 </span>
                                                                        </label>
                                                                        <label>
                                                                            <input name="goods_status" value="0" type="radio" class="ace"/>
                                                                            <span class="lbl"> 延迟开售 </span>
                                                                        </label>
                                                                    </div>

                                                                    <div class="col-sm-9">
                                                                        <label>
                                                                            <input name="goods_status" value="0" type="radio" class="ace" />
                                                                            <span class="lbl"> 定时开售</span>
                                                                        </label>

                                                                            <span class="input-icon">
                                                                                    <input type="text" id="form-field-ic-2" />
                                                                                    <i class="icon-time green"></i>
                                                                                </span>
                                                                    </div>
                                                                </div>

                                                                <div class="form-group">
                                                                    <label class="col-sm-3 control-label no-padding-right">推荐到主页：</label>

                                                                    <div class="col-sm-9" id="goods_recommend">
                                                                        <label>
                                                                            <input name="goods_recommend" value="1" type="radio" class="ace" />
                                                                            <span class="lbl"> 立即推荐（需满足立即开售） </span>
                                                                        </label>

                                                                        <label>
                                                                            <input name="goods_recommend" value="0" type="radio" class="ace" />
                                                                            <span class="lbl"> 稍后推荐 </span>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <%--<div class="space-2"></div>--%>


                                                                <%--<div class="form-group" id="goods_bill">--%>
                                                                    <%--<label class="col-sm-3 control-label no-padding-right">发票：</label>--%>

                                                                    <%--<div class="col-sm-9">--%>
                                                                        <%--<label>--%>
                                                                            <%--<input name="goods_bill" value="0" type="radio" class="ace" />--%>
                                                                            <%--<span class="lbl"> 有 </span>--%>
                                                                        <%--</label>--%>

                                                                        <%--<label>--%>
                                                                            <%--<input name="goods_bill" value="1" type="radio" class="ace" />--%>
                                                                            <%--<span class="lbl"> 无 </span>--%>
                                                                        <%--</label>--%>
                                                                    <%--</div>--%>
                                                                <%--</div>--%>

                                                                <%--<div class="space-2"></div>--%>

                                                                <%--<div class="form-group" id="goods_repair">--%>
                                                                    <%--<label class="col-sm-3 control-label no-padding-right">保修：</label>--%>

                                                                    <%--<div class="col-sm-9">--%>
                                                                        <%--<label>--%>
                                                                            <%--<input name="goods_repair" value="0" type="radio" class="ace" />--%>
                                                                            <%--<span class="lbl"> 有 </span>--%>
                                                                        <%--</label>--%>

                                                                        <%--<label>--%>
                                                                            <%--<input name="goods_repair" value="1" type="radio" class="ace" />--%>
                                                                            <%--<span class="lbl"> 无 </span>--%>
                                                                        <%--</label>--%>
                                                                    <%--</div>--%>
                                                                <%--</div>--%>

                                                            </form>


                                                        </div>





                                                        <div class="step-pane" id="step3">
                                                            <div class="row">
                                                                <div class="col-xs-7 good_add_left">
                                                                    <div class="form-group h200">
                                                                        <label class="control-label col-xs-12 col-sm-3 no-padding-right text-right" for="elm1">商品描述</label>
                                                                        <div class="col-xs-12 col-sm-9 goods_descri">
                                                                            <textarea class="wide ckeditor" id="elm1" name="elm1"></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-xs-5 mobile_wrap good_add_right">
                                                                    <div class="moli">
                                                                        <div class="app-header"></div>
                                                                        <div class="mobile">
                                                                            <img src="${appName}/public/images/mobile.png">
                                                                            <div class="first-page">
                                                                                    <div class="giftDetail-warp" id="giftDetail-warp">
                                                                                                <div class="swiper-container">
                                                                                                    <div class="swiper-wrapper">
                                                                                                    </div>
                                                                                                    <div class="swiper-pagination"></div>
                                                                                                </div>
                                                                                        <div class="singer"></div>
                                                                                    </div>
                                                                                <section class="exchange-warp">
                                                                                    <div class="detail">
                                                                                        <div><span class="giftName">灌篮高手周边 双肩包</span></div>
                                                                                        <div class="clearfix">
                                                                                            <div class="price fl"><span>6800</span>龙筹</div>
                                                                                            <div class="orgin_price fl none"><del></del></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="dec">
                                                                                        <p>商品介绍</p>
                                                                                        <div class="giftDes" id="goods_desc">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="exchange-rule">
                                                                                        <p>&gt;兑换规则</p>
                                                                                        <div class="rule-words">
                                                                                            <p>1、用户可通过签到领取、参与竞猜、充值等方式获取龙筹/龙币。</p>
                                                                                            <p>2、用户可用已有龙筹/龙币进行兑换活动，礼品一旦兑换成功，不可退回。</p>
                                                                                            <p>3、请确保订单提交时收货人信息填写完整，若因用户本人填写有误而导致的损失，均由用户本人承担。</p>
                                                                                            <p>4、兑换订单提交后我们将在7个工作日内完成寄送。实物礼品仅包邮中国大陆地区，超出邮寄范围礼品将不予发送。</p>
                                                                                            <p>5、用户通过非法途径所获得的活动礼品我司有权追回并追求其法律责任。</p>
                                                                                            <p>6、体验过程中您有任何问题和建议都可加入官方交流QQ群：318085703。</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </section>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                           </div>
                                                        </div>






                                                    </div>

                                                    <hr />
                                                    <div class="row-fluid wizard-actions">
                                                        <button class="btn btn-prev">
                                                            <i class="icon-arrow-left"></i>
                                                            上一步
                                                        </button>

                                                        <button class="btn btn-success btn-next" data-last="完成">
                                                            下一步
                                                            <i class="icon-arrow-right icon-on-right"></i>
                                                        </button>
                                                    </div>
                                                </div><!-- /widget-main -->
                                            </div><!-- /widget-body -->
                                        </div>
                                    </div>
                                </div>




                                <div id="modal_add_main_photo" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header no-padding">
                                                <div class="table-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        <span class="white">&times;</span>
                                                    </button>
                                                    添加商品主图
                                                </div>
                                            </div>
                                            <div class="widget-box">
                                                <div class="widget-body">
                                                    <div class="widget-main padding-8">


                                                        <%--<div class="form-group">--%>
                                                            <%--<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="goods_name">手动输入图片地址：</label>--%>

                                                            <%--<div class="col-xs-12 col-sm-9">--%>
                                                                <%--<div class="clearfix">--%>
                                                                    <%--<input type="text" id="" class="col-xs-12 col-sm-8" />--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>

                                                        <%--<br>--%>
                                                        <%--<br>--%>

                                                        <div class="form-group">

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
                                            <div class="modal-footer no-margin-top">
                                                <span class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i> 关闭
                                                </span>
                                                <%--<span id="main_photo_submit_bt" class="btn btn-sm btn-info pull-right" data-dismiss="modal">--%>
                                                    <%--<i class="icon-check"></i> 确认--%>
                                                <%--</span>--%>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.modal-content -->
                                </div>



                                <div id="modal_add_roll_photo" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header no-padding">
                                                <div class="table-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        <span class="white">&times;</span>
                                                    </button>
                                                    添加商品轮播图
                                                </div>
                                            </div>
                                            <div class="widget-box">
                                                <div class="widget-body">
                                                    <div class="widget-main padding-8">


                                                        <%--<div class="form-group">--%>
                                                            <%--<label class="control-label col-xs-12 col-sm-3 no-padding-right" for="goods_name">手动输入图片地址：</label>--%>

                                                            <%--<div class="col-xs-12 col-sm-9">--%>
                                                                <%--<div class="clearfix">--%>
                                                                    <%--<input type="text" id="23332" class="col-xs-12 col-sm-8" />--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>

                                                        <%--<br>--%>
                                                        <%--<br>--%>

                                                        <div class="form-group">

                                                            <span id="image_form_after_add3">
                                                                <form id="image_form3" action="#" class="dropzone"
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
                                            <div class="modal-footer no-margin-top">
                                                <span class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i> 关闭
                                                </span>
                                                <%--<span id="roll_photo_submit_bt" class="btn btn-sm btn-info pull-right" data-dismiss="modal">--%>
                                                    <%--<i class="icon-check"></i> 确认--%>
                                                <%--</span>--%>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.modal-content -->
                                </div>



                                <div id="category_add_modal" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="widget-box">
                                                <div class="widget-header">
                                                    <h4>修改或添加商品分类</h4>
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
                                                                <div class="profile-info-name"> 分类名称 </div>
                                                                <div class="profile-info-value">
                                                                    <input id="category_name" type="text" />
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 分类描述 </div>
                                                                <div class="profile-info-value">
                                                                    <textarea id="category_descr"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 分类排序值 </div>
                                                                <div class="profile-info-value">
                                                                    <input id="category_sort" type="text" />
                                                                </div>
                                                            </div>

                                                            <div class="profile-info-row">
                                                                <div class="profile-info-name"> 图片上传 </div>
                                                                <div class="profile-info-value">
                                                                    <span id="image_form_after_add1">
                                                                        <form id="image_form1" action="#" class="dropzone"
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
                                                <button id="category_add_bt" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                                    <i class="icon-check"></i>
                                                    确认添加
                                                </button>
                                                <button id="category_edit_bt" class="btn btn-sm btn-success pull-right disabled" data-dismiss="modal">
                                                    <i class="icon-edit"></i>
                                                    确认修改
                                                </button>
                                                <button id="category_delete_bt" class="btn btn-sm btn-danger pull-right disabled">
                                                    <i class="icon-check"></i>
                                                    确认删除
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
		<script type="text/javascript" src="${appName}/public/js/nomodule/ckeditor/ckeditor.js"></script>
		<script type="text/javascript" src="${appName}/public/js/nomodule/ckeditor/ckeditor-medal-util.src.js"></script>
        <script type="text/javascript">
            seajs.config({base: prefix+"goods"});
            seajs.use("goods_add.js");
			function initEditor() {
				if (CKEDITOR.instances['elm1']) {
					CKEDITOR.instances['elm1'].destroy();
				}
				CKEDITOR.replace('elm1');
				CKEDITOR.projectPath = "${appName}";
			}

			$("document").ready(function(){
				initEditor();
                setInterval(function(){
                    var cnt_html = CKEDITOR.instances.elm1.getData();
                    $(".giftDes").html(cnt_html);
                },1000);
			})
        </script>
    </body>
</html>
