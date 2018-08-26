<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 16-02-25
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
    <head>
        <meta charset="utf-8" />
        <title>用户龙筹券管理</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/common.css" />
        <link rel="stylesheet" href="${appName}/public/css/cbs-manage/table.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
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
                                <a href="${appName}/gotopage/main">主页</a>
                            </li>
                            <li>
                                <a href="#">活动管理</a>
                            </li>
                            <li>
                                <a href="#">筹码管理</a>
                            </li>
                            <li class="active">筹码列表</li>
                        </ul><!-- .breadcrumb -->
                    </div>
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- PAGE CONTENT BEGINS -->


                                <h4 class="pull-left">
                                    <div class="btn-group">
                                        <button id="goods_add_bt" data-toggle="modal" data-target="#modal_coupons_add" class="btn btn-sm btn-success position-relative">
                                            添加筹码
                                            <span class="icon-upload-alt icon-on-right"></span>
                                        </button>
                                    </div>
                                    <div class="btn-group">
                                        <button data-toggle="dropdown" class="btn btn-sm btn-warning position-relative">
                                            筹码状态
                                            <span class="icon-caret-down icon-on-right"></span>
                                        </button>
                                        <ul class="dropdown-menu dropdown-warning">
                                            <li>
                                                <a id="coupons_valid_a" href="#">
                                                    <i class="icon-ok green"></i>
                                                    已激活
                                                </a>
                                            </li>
                                            <li>
                                                <a id="coupons_invalid_a" href="#">
                                                    <i class="icon-ok green invisible"></i>
                                                    已失效
                                                </a>
                                            </li>
                                        </ul>
                                    </div><!-- /btn-group -->


                                </h4>

                                <div class="row">
                                    <div class="col-xs-12">

                                        <div class="table-header">
                                            筹码记录
                                        </div>
                                        <div class="table-responsive">
                                            <table id="coupons_table" class="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="center">序号</th>
                                                        <th class="center">名称</th>
                                                        <th class="center">额度</th>
                                                        <th class="center">有效时长</th>
                                                        <th class="center">类型</th>
                                                        <th class="center">总量</th>
                                                        <th class="center">已用</th>
                                                        <th class="center">兑换比例</th>
                                                        <th class="center">使用范围</th>
                                                        <th class="center">范围值</th>
                                                        <th class="width-20 center">描述</th>
                                                        <th class="center">操作</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                    <!-- /span -->
                                </div>

                                <div class="center">
                                    <button id="data_more" class="btn btn-info">
                                        <i class="icon-arrow-down bigger-120"></i>
                                        <span class="bigger-110">继续加载</span>
                                    </button>
                                </div>


                                <!-- modal-dialog -->
                                <div id="modal_coupons_add" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog" style="width:800px;">
                                        <div class="modal-content">

                                            <div class="modal-header no-padding">
                                                <div class="table-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        <span class="white">&times;</span>
                                                    </button>
                                                    添加活动龙筹券
                                                </div>
                                            </div>

                                            <div class="widget-box">
                                                <div class="widget-body">
                                                    <div class="widget-main">
                                                        <div>
                                                            <label for="modal_coupons_name" class="green bigger-150">名称：</label>
                                                            <input class="form-control" type="text" id="modal_coupons_name" placeholder="填入名称（最多128字）" />
                                                        </div>
                                                        <div>
                                                            <label for="modal_coupons_value" class="green bigger-150">额度：</label>
                                                            <input class="form-control" type="text" id="modal_coupons_value" placeholder="填入对应的额度（龙筹，整数）" />
                                                        </div>


                                                        <%--<div class="control-group" id="modal_coupons_type">--%>
                                                            <%--<label class="control-label green bigger-150">类型：</label>--%>

                                                            <%--<div class="radio">--%>
                                                                <%--<label>--%>
                                                                    <%--<input name="modal_coupons_type" type="radio" value="0" class="ace" />--%>
                                                                    <%--<span class="lbl bigger-120"> 系统 </span>--%>
                                                                <%--</label>--%>
                                                            <%--</div>--%>

                                                            <%--<div class="radio">--%>
                                                                <%--<label>--%>
                                                                    <%--<input name="modal_coupons_type" type="radio" value="1" class="ace" />--%>
                                                                    <%--<span class="lbl bigger-120"> 活动 </span>--%>
                                                                <%--</label>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>
                                                        <div>
                                                            <label for="modal_coupons_hour" class="green bigger-150">有效时长：</label>
                                                            <input class="form-control" type="text" id="modal_coupons_hour" placeholder="填入对应的时长（小数或整数，单位：小时）" />
                                                        </div>
                                                        <div>
                                                            <label for="modal_coupons_proportion" class="green bigger-150">兑换比例：</label>
                                                            <input class="form-control" type="text" id="modal_coupons_proportion" placeholder="填入对应的兑换比例（小数或整数）" />
                                                        </div>
                                                        <div>
                                                            <label for="modal_coupons_descr" class="green bigger-150">描述：</label>
                                                            <textarea class="form-control" id="modal_coupons_descr" placeholder="填入对应的描述信息（最多500字）" maxlength="500"></textarea>
                                                        </div>
                                                        <div>
                                                            <label for="modal_coupons_sum" class="green bigger-150">总量：</label>
                                                            <input class="form-control" type="text" id="modal_coupons_sum" placeholder="填入对应的总量（整数）" />
                                                        </div>
                                                        <div id="modal_coupons_range_key">
                                                            <label class="control-label green bigger-150">使用范围：</label>
                                                            <fieldset>
                                                                <div class="grid3">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input name="modal_coupons_range_key" type="radio" value="90" class="ace"/>
                                                                            <span class="lbl bigger-120"> 默认优惠券 </span>
                                                                        </label>
                                                                        <label>
                                                                            <input name="modal_coupons_range_key" type="radio" value="30" class="ace"/>
                                                                            <span class="lbl bigger-120"> 押押优惠券 </span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div class="grid3">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input name="modal_coupons_range_key" type="radio" value="10" class="ace"/>
                                                                            <span class="lbl bigger-120"> 足球赛事优惠券 </span>
                                                                        </label>
                                                                        <label>
                                                                            <input name="modal_coupons_range_key" type="radio" value="11" class="ace"/>
                                                                            <span class="lbl bigger-120"> 篮球赛事优惠券 </span>
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div class="grid3">
                                                                    <div class="radio">
                                                                        <label>
                                                                            <input name="modal_coupons_range_key" type="radio" value="20" class="ace"/>
                                                                            <span class="lbl bigger-120"> 足球联赛优惠券 </span>
                                                                        </label>
                                                                        <label>
                                                                            <input name="modal_coupons_range_key" type="radio" value="21" class="ace"/>
                                                                            <span class="lbl bigger-120"> 篮球联赛优惠券 </span>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                            </fieldset>
                                                        </div>

                                                        <div id="modal_coupons_range_value_div">
                                                            <%--<label for="modal_coupons_range_value" class="green bigger-150">对应范围内可使用的杯赛名称：</label>--%>
                                                            <%--<input class="form-control" type="text" id="modal_coupons_range_value" placeholder="填入对应的范围值（限制ids，多个id用英文逗号隔开）" />--%>

                                                                <%--<select id="modal_coupons_range_value" class="show-menu-arrow form-control" multiple>--%>
                                                                    <%--<option value="17">NBA季前赛</option>--%>
                                                                    <%--<option value="24">NBA</option>--%>
                                                                    <%--<option value="277">欧洲杯</option>--%>
                                                                    <%--<option value="296">世界杯</option>--%>
                                                                <%--</select>--%>
                                                        </div>

                                                        <div class="space-2"></div>
                                                        <div class="space-2"></div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer no-margin-top">
                                                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i>
                                                    关闭
                                                </button>
                                                <button id="modal_coupons_confirm_bt" class="btn btn-sm btn-info pull-right">
                                                    <i class="icon-save"></i>
                                                    确认
                                                </button>
                                            </div>
                                        </div>
                                    </div><!-- /.modal-content -->
                                </div><!-- /.modal-dialog -->


                                <!-- modal-dialog -->
                                <div id="modal_coupons_give" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog" style="width:800px;">
                                        <div class="modal-content">

                                            <div class="modal-header no-padding">
                                                <div class="table-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        <span class="white">&times;</span>
                                                    </button>
                                                    发送筹码
                                                </div>
                                            </div>

                                            <div class="widget-box">
                                                <div class="widget-body">
                                                    <div class="widget-main">

                                                        <div class="control-group" id="modal_coupons_give_type">
                                                            <label class="control-label green bigger-150">发送对象：</label>

                                                            <div class="radio">
                                                                <label>
                                                                    <input name="modal_coupons_give_type" type="radio" value="1" class="ace" />
                                                                    <span class="lbl bigger-120"> 输入龙号发送 </span>
                                                                </label>
                                                            </div>

                                                            <div class="radio">
                                                                <label>
                                                                    <input name="modal_coupons_give_type" type="radio" value="0" class="ace" />
                                                                    <span class="lbl bigger-120"> 输入AccountId发送 </span>
                                                                </label>
                                                            </div>
                                                        </div>


                                                        <div>
                                                            <label for="modal_coupons_give_num" class="green bigger-150">数量：</label>
                                                            <input type="text" class="form-control" id="modal_coupons_give_num" value="1" placeholder="发送数量，必须是正整数"/>
                                                        </div>

                                                        <div>
                                                            <label for="modal_coupons_give_no" class="green bigger-150">用户龙号或AccountId：</label>
                                                            <textarea class="form-control" id="modal_coupons_give_no" placeholder="填入龙号或AccountId，多个值用英文逗号隔开"></textarea>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>



                                            <div class="modal-footer no-margin-top">
                                                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i>
                                                    关闭
                                                </button>
                                                <button id="modal_coupons_give_confirm" class="btn btn-sm btn-info pull-right">
                                                    <i class="icon-truck"></i>
                                                    发送
                                                </button>
                                            </div>
                                        </div>
                                    </div><!-- /.modal-content -->
                                </div><!-- /.modal-dialog -->



                                <!-- modal-dialog -->
                                <div id="modal_coupons_edit" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">

                                            <div class="modal-header no-padding">
                                                <div class="table-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        <span class="white">&times;</span>
                                                    </button>
                                                    修改筹码
                                                </div>
                                            </div>

                                            <div class="widget-box">
                                                <div class="widget-body">
                                                    <div class="widget-main">



                                                        <form class="form-horizontal" id="validation-form" method="get">

                                                            <div class="form-group">
                                                                <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="modal_edit_coupon_time">有效时长：</label>

                                                                <div class="col-xs-12 col-sm-9">
                                                                    <div class="clearfix">
                                                                        <input type="text" name="modal_edit_coupon_time" id="modal_edit_coupon_time" class="col-xs-12 col-sm-8" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="form-group">
                                                                <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="modal_edit_coupon_sum">总量：</label>

                                                                <div class="col-xs-12 col-sm-9">
                                                                    <div class="clearfix">
                                                                        <input type="text" name="modal_edit_coupon_sum" id="modal_edit_coupon_sum" class="col-xs-12 col-sm-8" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div class="form-group">
                                                                <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="modal_edit_coupon_proportion">兑换比例：</label>

                                                                <div class="col-xs-12 col-sm-9">
                                                                    <div class="clearfix">
                                                                        <input type="text" name="modal_edit_coupon_proportion" id="modal_edit_coupon_proportion" class="col-xs-12 col-sm-8" />
                                                                    </div>
                                                                </div>
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
                                                <button id="modal_coupons_edit_confirm" class="btn btn-sm btn-info pull-right">
                                                    <i class="icon-ok"></i>
                                                    确认
                                                </button>
                                            </div>
                                        </div>
                                    </div><!-- /.modal-content -->
                                </div><!-- /.modal-dialog -->


                                <!-- PAGE CONTENT ENDS -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.page-content -->
                </div>
            </div>
            <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
                <i class="icon-double-angle-up icon-only bigger-110"></i>
            </a>
        </div>
        <script type="text/javascript">
            seajs.config({base: prefix+"coupons/"});
            seajs.use("coupons_list");
        </script>
    </body>
</html>
