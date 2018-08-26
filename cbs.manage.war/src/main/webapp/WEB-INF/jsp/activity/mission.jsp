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
    <title>任务积分</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
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
                            <a href="#">活动管理</a>
                        </li>
                        <li class="active">积分管理</li>
                    </ul><!-- .breadcrumb -->

                </div>

                <div class="page-content">
                    <div class="row">
                        <div class="col-xs-12">
                            <!-- PAGE CONTENT BEGINS -->


                            <h4>

                                <button id="edit_day_mission" class="btn btn-purple btn-sm">
                                    设置每日任务
                                    <i class="icon-wrench align-top bigger-120 icon-on-right dark"></i>
                                </button>
                                <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                                <button id="edit_point_to_gold" class="btn btn-warning btn-sm">
                                    设置积分兑换龙筹
                                    <i class="icon-heart align-top bigger-120 icon-on-right red"></i>
                                </button>
                                <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                                <label class="green bigger-110">
                                    请选择要查询的用户
                                </label>
                                <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                                <span class="input-icon">
                                    <input type="text" class="nav-search-input" id="user_search" placeholder="输入用户龙号" />
                                    <i class="icon-user nav-search-icon"></i>
                                </span>

                            </h4>


                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="table-header">
                                        用户积分明细
                                    </div>
                                    <div class="table-responsive">
                                        <table id="table" class="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th class="center">用户ID</th>
                                                    <th class="center">龙号</th>
                                                    <th class="center">用户名</th>
                                                    <th class="center">积分</th>
                                                    <th class="center">首次充值</th>
                                                    <th class="center">首次上传头像</th>
                                                    <th class="center">粉丝20</th>
                                                    <th class="center">关注20</th>
                                                    <th class="center">操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <%--<tr>--%>
                                                    <%--<td class="center">234</td>--%>
                                                    <%--<td class="center">2234342</td>--%>
                                                    <%--<td class="center">xin</td>--%>
                                                    <%--<td class="center">--%>
                                                        <%--<i class="icon-ok-sign bigger-120 green"></i>--%>
                                                    <%--</td>--%>
                                                    <%--<td class="center">--%>
                                                        <%--<i class="icon-remove-sign bigger-120 grey"></i>--%>
                                                    <%--</td>--%>
                                                    <%--<td class="center">--%>
                                                        <%--<i class="icon-remove-sign bigger-120 grey"></i>--%>
                                                    <%--</td>--%>
                                                    <%--<td class="center">--%>
                                                        <%--<i class="icon-remove-sign bigger-120 grey"></i>--%>
                                                    <%--</td>--%>
                                                    <%--<td class="center">--%>
                                                        <%--<button class="btn btn-minier btn-info">查看每日任务</button>--%>
                                                    <%--</td>--%>
                                                <%--</tr>--%>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="center">
                                <button id="data_more" class="btn btn-info">
                                    <i class="icon-arrow-down bigger-120"></i>
                                    <span class="bigger-110">继续加载</span>
                                </button>
                            </div>



                            <div id="modal_edit_day" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:1200px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                设置每日任务
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">


                                                <div class="table-responsive">
                                                    <table id="day_cancel_table" class="table table-striped table-bordered table-hover">
                                                        <thead>
                                                        <tr>
                                                            <th class="center">任务名称</th>
                                                            <th class="center">任务积分</th>
                                                            <th class="center">操作</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>

                                                            <%--<tr>--%>
                                                                <%--<td class="hidden">1</td>--%>
                                                                <%--<td class="center">士大夫</td>--%>
                                                                <%--<td class="center">345</td>--%>
                                                                <%--<td class="center">--%>
                                                                    <%--<button class="btn btn-minier btn-warning">撤销</button>--%>
                                                                <%--</td>--%>
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



                            <div id="modal_edit_point" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:1200px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                设置积分兑换龙筹
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">


                                                <div class="table-responsive">
                                                    <table id="point_table" class="table table-striped table-bordered table-hover">
                                                        <thead>
                                                        <tr>
                                                            <th class="center">积分</th>
                                                            <th class="center">龙筹面值</th>
                                                            <th class="center">操作</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>


                                                        </tbody>
                                                    </table>
                                                </div>

                                                <div class="center">
                                                    <button class="btn btn-minier btn-primary" data-toggle="modal" data-target="#modal_add_point">添加</button>
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


                            <div id="modal_add_point" class="modal fade" tabindex="-1">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                添加积分兑换龙筹
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">


                                                <form class="form-horizontal" id="validation-form" method="get">

                                                    <div class="form-group">
                                                        <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="modal_add_point_num">兑换的积分量：</label>

                                                        <div class="col-xs-12 col-sm-9">
                                                            <div class="clearfix">
                                                                <input type="text" name="modal_add_point_num" id="modal_add_point_num" class="col-xs-12 col-sm-8" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label class="control-label col-xs-12 col-sm-3 no-padding-right" for="modal_add_gold_num">兑换的龙筹面值：</label>

                                                        <div class="col-xs-12 col-sm-9">
                                                            <div class="clearfix">
                                                                <input type="text" name="modal_add_gold_num" id="modal_add_gold_num" class="col-xs-12 col-sm-8" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>

                                            </div>


                                        </div>
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i>
                                                关闭
                                            </button>
                                            <button id="add_submit_button" class="btn btn-sm btn-info pull-right">
                                                <i class="icon-check"></i>
                                                确认添加
                                            </button>
                                        </div>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->



                            <div id="modal_day_user" class="modal fade" tabindex="-1">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                用户每日任务
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">

                                                <h4>
                                                    <label class="green bigger-110">
                                                        请选择要查询的日期
                                                    </label>
                                                    <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                                                    <span class="input-icon">
                                                        <input id="date_picker" type="text" readonly />
                                                        <i class="icon-time nav-search-icon"></i>
                                                    </span>
                                                </h4>


                                                <div class="table-responsive">
                                                    <table id="day_table" class="table table-striped table-bordered table-hover">
                                                        <thead>
                                                        <tr>
                                                            <th class="center">登录</th>
                                                            <th class="center">分享到微信</th>
                                                            <th class="center">发表下单理由</th>
                                                            <th class="center">比赛页面评论</th>
                                                            <th class="center">评论下单理由</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>

                                                            <%--<tr>--%>
                                                                <%--<td class="center">--%>
                                                                    <%--<i class="icon-ok-sign bigger-120 green"></i>--%>
                                                                <%--</td>--%>
                                                                <%--<td class="center">--%>
                                                                    <%--<i class="icon-remove-sign bigger-120 grey"></i>--%>
                                                                <%--</td>--%>
                                                                <%--<td class="center">--%>
                                                                    <%--<i class="icon-remove-sign bigger-120 grey"></i>--%>
                                                                <%--</td>--%>
                                                                <%--<td class="center">--%>
                                                                    <%--<i class="icon-remove-sign bigger-120 grey"></i>--%>
                                                                <%--</td>--%>
                                                                <%--<td class="center">--%>
                                                                    <%--<i class="icon-remove-sign bigger-120 grey"></i>--%>
                                                                <%--</td>--%>
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
        seajs.use("mission");
    </script>
</body>
</html>
