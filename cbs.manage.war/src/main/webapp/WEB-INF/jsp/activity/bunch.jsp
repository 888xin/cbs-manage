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
    <title>赛事串</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-select.min.css" />
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
                            <a href="#">活动管理</a>
                        </li>
                        <li class="active">赛事串管理</li>
                    </ul><!-- .breadcrumb -->

                </div>

                <div class="page-content">
                    <div class="row">
                        <div class="col-xs-12">
                            <!-- PAGE CONTENT BEGINS -->


                            <div class="message-navbar align-center clearfix">
                                <div class="message-bar">
                                    <div class="message-infobar" id="table_infobar">
                                        <span class="green bigger-150">串列表</span>
                                    </div>
                                </div>
                                <div>
                                    <div class="messagebar-item-left">

                                        <button class="btn btn-xs btn-default inline position-relative" data-toggle="modal" data-target="#modal_bunch_add">
                                            <i class="icon-location-arrow bigger-125"></i>
                                            <span class="bigger-110">添加串</span>
                                        </button>
                                    </div>
                                    <div class="messagebar-item-right">
                                        <div class="inline position-relative">
                                            <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                                过滤 &nbsp;
                                                <i class="icon-caret-down bigger-125"></i>
                                            </a>
                                            <ul class="dropdown-menu dropdown-lighter pull-right dropdown-100">
                                                <li>
                                                    <a href="#">
                                                        <i class="icon-eye-open green"></i>
                                                        可下注
                                                    </a>
                                                    <a href="#">
                                                        <i class="icon-eye-close blue"></i>
                                                        结算中
                                                    </a>
                                                    <a href="#">
                                                        <i class="icon-eye-close orange2"></i>
                                                        已结算
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="table-responsive">
                                <table id="bunch_table" class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th class="center">ID</th>
                                            <th class="center width-25">标题</th>
                                            <th class="center">主图</th>
                                            <th class="center">花费</th>
                                            <th class="center">货币类型</th>
                                            <th class="center">下注人数</th>
                                            <th class="center">状态</th>
                                            <th class="center">
                                                <i class="icon-time bigger-110 hidden-480"></i>
                                                开始时间
                                            </th>
                                            <th class="center">
                                                <i class="icon-time bigger-110 hidden-480"></i>
                                                预计结束时间
                                            </th>
                                            <th class="center width-20">
                                                <i class="icon-cogs bigger-110 hidden-480"></i>
                                                操作
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <%--<tr>--%>
                                            <%--<td class="center">23</td>--%>
                                            <%--<td class="center">dsafasfdfdsa</td>--%>
                                            <%--<td class="center">--%>
                                                <%--<img width="85" height="50" src="http://roi.skst.cn/content/57f/1464233995255_w316gu.jpg">--%>
                                            <%--</td>--%>
                                            <%--<td class="center">0</td>--%>
                                            <%--<td class="center">longbi</td>--%>
                                            <%--<td class="center">123</td>--%>
                                            <%--<td class="center"><span class='label label-lg label-info'>正常</span></td>--%>
                                            <%--<td class="center">1982</td>--%>
                                            <%--<td class="center">1986</td>--%>
                                            <%--<td class="center">--%>
                                                <%--<button class="btn btn-info btn-sm">编辑赛事</button>--%>
                                                <%--<button class="btn btn-success btn-sm">编辑奖品</button>--%>
                                            <%--</td>--%>
                                        <%--</tr>--%>
                                    </tbody>
                                </table>
                            </div><!-- /.table-responsive -->
                            <p class="align-center">
                            <span id="bunch_data_more" class="btn bt1n-small btn-purple no-border">
                                <i class="icon-arrow-down bigger-130"></i>
                                <span class="bigger-110">继续加载</span>
                            </span>
                            </p>





                            <div id="modal_bunch_add" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:900px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                添加串
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">

                                                <div>
                                                    <label for="bunch_name" class="green bigger-150">串名称：</label>
                                                    <input class="form-control" type="text" id="bunch_name" placeholder="填入名称（最多65字）" />
                                                </div>

                                                <br>

                                                <div class="form-group">
                                                    <div class="col-sm-6">
                                                        <div class="col-sm-4"><i class="green bigger-150">下注额:</i></div>
                                                        <div class="col-sm-8"><input placeholder="为0表示免费" id="bunch_cost" value="0" type="text" /></div>
                                                    </div>
                                                    <div class="col-sm-6">
                                                        <div class="col-sm-4"><i class="green bigger-150">是否龙币：</i></div>
                                                        <div class="col-sm-8">
                                                            <label>
                                                                <input id="bunch_longbi" class="ace ace-switch ace-switch-6" type="checkbox" />
                                                                <span class="lbl"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <br>

                                                <button id="bunch_contest_more_bn" type="button" class="width-20 form-control btn btn-info">
                                                    <i class="icon-plus"></i>
                                                    添加更多赛事
                                                </button>

                                                <br>
                                                <br>

                                                <div id="bunch_contest_add_div">

                                                    <div class="form-group">

                                                        <input type="text" class="input-sm" placeholder="赛事ID"/>

                                                        <select name="bunch_contest_type" title="赛事类型" class="width-30 form-control selectpicker">
                                                            <option selected value="0">足球</option>
                                                            <option value="1">篮球</option>
                                                        </select>

                                                        <select name="bunch_contest_play_type" title="请选择玩法" class="width-40 form-control selectpicker">
                                                            <option selected value="1">胜平负</option>
                                                            <option value="2">让球胜平负</option>
                                                            <option value="4">大小球</option>
                                                            <option value="5">单双数</option>
                                                        </select>

                                                    </div>

                                                </div>

                                                <button id="bunch_prize_more_bn" type="button" class="width-20 form-control btn btn-warning">
                                                    <i class="icon-plus"></i>
                                                    添加更多奖品
                                                </button>

                                                <br>
                                                <br>

                                                <%--<div id="bunch_prize_add_div">--%>


                                                    <%--<div class="form-group">--%>

                                                        <%--<input name="prize_name" type="text" class="input-large" placeholder="奖品名称"/>--%>

                                                        <%--<select name="prize_type" title="奖品类型" class="width-20 form-control selectpicker">--%>
                                                            <%--<option selected value="0">龙筹</option>--%>
                                                            <%--<option value="1">龙币</option>--%>
                                                            <%--<option value="2">实物</option>--%>
                                                        <%--</select>--%>

                                                        <%--<input name="prize_price" type="text" class="input-sm" placeholder="面值（整数），实物为0"/>--%>

                                                        <%--<input name="prize_num" type="text" class="input-sm" placeholder="发放数量"/>--%>

                                                        <%--<input name="prize_win_num" type="text" class="input-sm" placeholder="需要赢的场数"/>--%>

                                                    <%--</div>--%>

                                                <%--</div>--%>


                                                <div class="row" id="bunch_prize_add_div">

                                                    <div class="col-xs-6 col-sm-4 pricing-box">
                                                        <div class="widget-box">
                                                            <div class="widget-header header-color-dark">
                                                                <h5 class="bigger lighter">奖品添加</h5>
                                                            </div>

                                                            <div class="widget-body">
                                                                <div class="widget-main">
                                                                    <ul class="list-unstyled spaced2">
                                                                        <li>
                                                                            <input name="prize_name" type="text" class="input-xlarge" placeholder="奖品名称"/>
                                                                        </li>

                                                                        <li>
                                                                            <select name="prize_type" title="奖品类型" class="form-control selectpicker">
                                                                                <option selected value="0">龙筹</option>
                                                                                <option value="1">龙币</option>
                                                                                <option value="2">实物</option>
                                                                            </select>
                                                                        </li>

                                                                        <li>
                                                                            <input name="prize_price" type="text" class="input-xlarge" placeholder="面值（整数），实物为0"/>
                                                                        </li>

                                                                        <li>
                                                                            <input name="prize_num" type="text" class="input-xlarge" placeholder="发放数量"/>
                                                                        </li>

                                                                        <li>
                                                                            <input name="prize_win_num" type="text" class="input-xlarge" placeholder="需要赢的场数"/>
                                                                        </li>

                                                                    </ul>

                                                                    <hr />
                                                                    <div>
                                                                        <button name="select_image_bt" class="btn btn-danger btn-sm">选择照片</button>
                                                                        <%--<img class="pull-right" width="60" height="40" src="http://roi.skst.cn/content/0d2/1463988639780_1e571y.jpg"/>--%>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <a href="#" class="btn btn-block btn-inverse">
                                                                        <i class="icon-remove bigger-110"></i>
                                                                        <span>移除</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <fieldset>

														<span id="modal_add_image_span">
															<form id="image_form" action="#" class="dropzone"
                                                                  method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file" />
                                                                </div>
                                                            </form>
														</span>

                                                </fieldset>

                                            </div>

                                        </div>
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i>
                                                关闭
                                            </button>
                                            <button id="add_submit_bt" class="btn btn-sm btn-info pull-right">
                                                <i class="icon-check"></i>
                                                确认添加
                                            </button>
                                        </div>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->






                            <div id="modal_bunch_edit" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:900px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                修改串
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">

                                                <div>
                                                    <label for="bunch_image" class="green bigger-150">照片：</label>
                                                    <img width="100" height="80" id="bunch_image">
                                                </div>

                                                <div>
                                                    <label for="bunch_name_edit" class="green bigger-150">串名称：</label>
                                                    <input class="form-control" type="text" id="bunch_name_edit" placeholder="填入名称（最多65字）" />
                                                </div>



                                                <br>

                                                <div class="form-group">
                                                    <div class="col-sm-4">
                                                        <div class="col-sm-5"><i class="green bigger-150">下注额:</i></div>
                                                        <div class="col-sm-7"><input placeholder="为0表示免费" id="bunch_cost_edit" value="0" type="text" /></div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="col-sm-6"><i class="green bigger-150">是否龙币：</i></div>
                                                        <div class="col-sm-6">
                                                            <label>
                                                                <input id="bunch_longbi_edit" class="ace ace-switch ace-switch-6" type="checkbox" />
                                                                <span class="lbl"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-sm-4">
                                                        <div class="col-sm-5"><i class="green bigger-150">下注人数:</i></div>
                                                        <div class="col-sm-7"><input placeholder="为0表示不修改" id="bunch_people_edit" value="0" type="text" /></div>
                                                    </div>
                                                </div>

                                                <br>

                                                <button id="bunch_contest_more_bn_edit" type="button" class="width-20 form-control btn btn-info">
                                                    <i class="icon-plus"></i>
                                                    添加更多赛事
                                                </button>

                                                <br>
                                                <br>

                                                <div id="bunch_contest_edit_div">

                                                    <%--<div class="form-group">--%>
                                                        <%--<input type="text" class="input-sm" placeholder="赛事ID"/>--%>
                                                        <%--<select name="bunch_contest_type" title="赛事类型" class="width-30 form-control selectpicker">--%>
                                                            <%--<option selected value="0">足球</option>--%>
                                                            <%--<option value="1">篮球</option>--%>
                                                        <%--</select>--%>
                                                        <%--<select name="bunch_contest_play_type" title="请选择玩法" class="width-40 form-control selectpicker">--%>
                                                            <%--<option selected value="1">胜平负</option>--%>
                                                            <%--<option value="2">让球胜平负</option>--%>
                                                            <%--<option value="4">大小球</option>--%>
                                                            <%--<option value="5">单双数</option>--%>
                                                        <%--</select>--%>
                                                    <%--</div>--%>

                                                </div>


                                                <fieldset>

														<span id="modal_add_image_span3">
															<form id="image_form3" action="#" class="dropzone"
                                                                  method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file" />
                                                                </div>
                                                            </form>
														</span>

                                                </fieldset>

                                            </div>

                                        </div>
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i>
                                                关闭
                                            </button>
                                            <button id="edit_submit_bt" class="btn btn-sm btn-info pull-right">
                                                <i class="icon-check"></i>
                                                确认修改
                                            </button>
                                        </div>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->



                            <div id="modal_bunch_prize_edit" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:900px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                修改奖品
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">


                                                <div class="row" id="bunch_prize_edit_div">

                                                    <%--<div class="col-xs-6 col-sm-4 pricing-box">--%>
                                                        <%--<div class="widget-box">--%>
                                                            <%--<div class="widget-header header-color-dark">--%>
                                                                <%--<h5 class="bigger lighter">奖品修改</h5>--%>
                                                            <%--</div>--%>

                                                            <%--<div class="widget-body">--%>
                                                                <%--<div class="widget-main">--%>

                                                                    <%--<ul class="list-unstyled spaced2">--%>
                                                                        <%--<li>--%>
                                                                            <%--<input name="prize_name" type="text" class="input-xlarge" placeholder="奖品名称"/>--%>
                                                                        <%--</li>--%>

                                                                        <%--<li>--%>
                                                                            <%--<select name="prize_type" title="奖品类型" class="form-control selectpicker">--%>
                                                                                <%--<option selected value="0">龙筹</option>--%>
                                                                                <%--<option value="1">龙币</option>--%>
                                                                                <%--<option value="2">实物</option>--%>
                                                                            <%--</select>--%>
                                                                        <%--</li>--%>

                                                                        <%--<li>--%>
                                                                            <%--<input name="prize_price" type="text" class="input-xlarge" placeholder="面值（整数），实物为0"/>--%>
                                                                        <%--</li>--%>

                                                                        <%--<li>--%>
                                                                            <%--<input name="prize_num" type="text" class="input-xlarge" placeholder="发放数量"/>--%>
                                                                        <%--</li>--%>

                                                                        <%--<li>--%>
                                                                            <%--<input name="prize_win_num" type="text" class="input-xlarge" placeholder="需要赢的场数"/>--%>
                                                                        <%--</li>--%>

                                                                    <%--</ul>--%>

                                                                    <%--<hr />--%>
                                                                    <%--<div>--%>
                                                                        <%--<button name="select_image_bt" class="btn btn-danger btn-sm">选择照片</button>--%>
                                                                    <%--</div>--%>
                                                                <%--</div>--%>

                                                                <%--<div>--%>
                                                                    <%--<a href="#" class="btn btn-block btn-inverse">--%>
                                                                        <%--<i class="icon-edit bigger-110"></i>--%>
                                                                        <%--<span>修改</span>--%>
                                                                    <%--</a>--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>
                                                    <%--</div>--%>

                                                </div>



                                            </div>

                                        </div>
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i>
                                                关闭
                                            </button>
                                            <%--<button id="edit_prize_submit_bt" class="btn btn-sm btn-info pull-right">--%>
                                                <%--<i class="icon-check"></i>--%>
                                                <%--确认修改--%>
                                            <%--</button>--%>
                                        </div>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->



                            <div id="modal_award_send" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:900px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                发送奖品
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">

                                                <div id="user_award">
                                                    <%--<div>--%>
                                                        <%--<label class="red bigger-150">奖品：美女</label>--%>
                                                    <%--</div>--%>
                                                    <%--<div>--%>
                                                        <%--<label class="red bigger-150">需要赢的场数：'+prize.win_num+'</label>--%>
                                                    <%--</div>--%>
                                                    <%--<div>--%>
                                                        <%--<label class="red bigger-150">奖品数量：3</label>--%>
                                                    <%--</div>--%>
                                                    <%--<div>--%>
                                                        <%--<label class="red bigger-150">全部中奖ID：3</label>--%>
                                                    <%--</div>--%>
                                                    <%--<div>--%>
                                                        <%--<label class="red bigger-150">随机抽取的中奖ID：</label>--%>
                                                    <%--</div>--%>
                                                    <%--<div>--%>
                                                        <%--<textarea class="form-control"></textarea>--%>
                                                    <%--</div>--%>
                                                </div>


                                                <div>
                                                    <button class="btn btn-info btn-sm" id="send_bn">确认发送</button>
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




                            <div id="modal_bunch_prize_image" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:900px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                选择奖品的照片
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">



                                                <div class="row" id="bunch_prize_image_div">


                                                    <%--<div class="pricing-span-body">--%>
                                                        <%--<div class="pricing-span">--%>
                                                            <%--<div class="widget-box pricing-box-small">--%>
                                                                <%--<div class="widget-body">--%>
                                                                    <%--<div class="widget-main no-padding">--%>
                                                                        <%--<ul class="list-unstyled list-striped pricing-table">--%>
                                                                            <%--<li>--%>
                                                                                <%--<img width="100" height="100" src="http://roi.skst.cn/content/25b/1462935881760_y97i92.jpg"/>--%>
                                                                            <%--</li>--%>
                                                                        <%--</ul>--%>

                                                                        <%--<div class="price">--%>
                                                                            <%--<span class="label label-lg label-inverse arrowed-in arrowed-in-right">--%>
                                                                                <%--照片--%>
                                                                            <%--</span>--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>

                                                                    <%--<div>--%>
                                                                        <%--<a href="#" class="btn btn-block btn-sm btn-danger">--%>
                                                                            <%--<span>选择</span>--%>
                                                                        <%--</a>--%>
                                                                    <%--</div>--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>
                                                    <%--</div>--%>


                                                </div>



                                                <fieldset>

														<span id="modal_add_image_span2">
															<form id="image_form2" action="#" class="dropzone"
                                                                  method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file" />
                                                                </div>
                                                            </form>
														</span>

                                                </fieldset>

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




                            <div id="modal_bunch_prize_user_view" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:900px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                用户中奖信息
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">




                                                <div class="table-responsive">
                                                    <table id="bunch_prize_user_table" class="table table-striped table-bordered table-hover">
                                                        <thead>
                                                        <tr>
                                                            <th class="center">ID</th>
                                                            <th class="center">用户名</th>
                                                            <th class="center">用户龙号</th>
                                                            <th class="center">猜赢场数</th>
                                                            <th class="center">状态</th>
                                                            <th class="center">奖品</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <%--<tr>--%>
                                                            <%--<td class="center">23</td>--%>
                                                            <%--<td class="center">dsafasfdfdsa</td>--%>
                                                            <%--<td class="center">234343</td>--%>
                                                            <%--<td class="center">3</td>--%>
                                                            <%--<td class="center">娃娃</td>--%>
                                                        <%--</tr>--%>
                                                        </tbody>
                                                    </table>
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

        </div><!-- /.main-container-inner -->

        <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
            <i class="icon-double-angle-up icon-only bigger-110"></i>
        </a>
    </div>
    <script type="text/javascript">
        seajs.config({base: prefix+"activity/"});
        seajs.use("bunch");
    </script>
</body>
</html>
