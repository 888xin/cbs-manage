<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-12-22
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>

    <meta charset="utf-8"/>
    <title>用户每月登陆</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-select.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />

    <style type="text/css">
        .ui-datepicker-calendar {
            display: none; /*不显示日期面板*/
        }
    </style>

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
                        <a href="#">统计管理</a>
                    </li>
                    <li class="active">每月登陆</li>

                </ul><!-- .breadcrumb -->

            </div>

            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->


                        <h4>

                            <label class="green bigger-110">
                                请选择要查询的月份
                            </label>
                            <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                            <span class="input-icon">
                                <input type="text" readonly class="nav-search-input" id="date_search" autocomplete="off" />
                                <i class="icon-time nav-search-icon"></i>
                            </span>
                            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                            <button id="edit_path_bt" class="btn btn-purple btn-sm" data-toggle="modal" data-target="#modal_edit_path">
                                设置登陆奖励
                                <i class="icon-wrench align-top bigger-120 icon-on-right dark"></i>
                            </button>
                            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                            <button id="edit_user_set_bt" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#modal_edit_user">
                                设置用户累计登陆天数
                                <i class="icon-heart align-top bigger-120 icon-on-right red"></i>
                            </button>
                            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                            <button id="edit_user_expire_bt" class="btn btn-danger btn-sm">
                                删除所有用户一天登陆记录
                                <i class="icon-bolt align-top bigger-120 icon-on-right brown"></i>
                            </button>

                        </h4>


                        <div class="row">
                            <div class="col-xs-12">
                                <div class="table-header">
                                    用户当月登陆累计天数
                                </div>
                                <div class="table-responsive">
                                    <table id="user_login_statistic_table" class="table table-striped table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th class="center">用户ID</th>
                                            <th class="center">龙号</th>
                                            <th class="center">用户名</th>
                                            <th class="center">头像</th>
                                            <th class="center">累计天数</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>



                        <div id="modal_edit_path" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:1200px;">
                                <div class="modal-content">
                                    <div class="modal-header no-padding">
                                        <div class="table-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                <span class="white">&times;</span>
                                            </button>
                                            设置每日登录奖励
                                        </div>
                                    </div>
                                    <div class="widget-box">
                                        <div class="widget-main">

                                            <div class="form-group">
                                                <label class="col-sm-4 control-label no-padding-right bigger-180">原先的设置数据：</label>

                                                <label id="old_path_key" class="col-sm-4 control-label no-padding-right bigger-180">无：</label>

                                                <label id="old_path_value" class="col-sm-4 control-label no-padding-right bigger-180">无：</label>

                                            </div>


                                            <div class="form-group">
                                                <label class="col-sm-2 control-label no-padding-right bigger-180">设置新数据：</label>


                                                <div class="col-sm-10">
                                                    <select title="请选择可领取到筹码的累计天数" id="path_key" class="width-45 show-menu-arrow form-control" multiple>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                        <option value="13">13</option>
                                                        <option value="14">14</option>
                                                        <option value="15">15</option>
                                                        <option value="16">16</option>
                                                        <option value="17">17</option>
                                                        <option value="18">18</option>
                                                        <option value="19">19</option>
                                                        <option value="20">20</option>
                                                        <option value="21">21</option>
                                                        <option value="22">22</option>
                                                        <option value="23">23</option>
                                                        <option value="24">24</option>
                                                        <option value="25">25</option>
                                                        <option value="26">26</option>
                                                        <option value="27">27</option>
                                                        <option value="28">28</option>
                                                        <option value="29">29</option>
                                                        <option value="30">30</option>
                                                        <option value="31">31</option>
                                                    </select>

                                                    <select title="请选择对应的筹码" id="path_value" class="width-45 show-menu-arrow form-control" multiple>
                                                        <option value="5">5</option>
                                                        <option value="5">5</option>
                                                        <option value="5">5</option>
                                                        <option value="5">5</option>
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="10">10</option>
                                                        <option value="10">10</option>
                                                        <option value="10">10</option>
                                                        <option value="20">20</option>
                                                        <option value="20">20</option>
                                                        <option value="20">20</option>
                                                        <option value="50">50</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                    </select>

                                                </div>

                                            </div>

                                            <div class="space-32"></div>
                                            <div class="space-32"></div>


                                        </div>


                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="edit_submit_button" class="btn btn-sm btn-info pull-right">
                                            <i class="icon-check"></i>
                                            确认更新
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->



                        <div id="modal_edit_user" class="modal fade" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header no-padding">
                                        <div class="table-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                <span class="white">&times;</span>
                                            </button>
                                            设置用户登录天数（不包括今天）
                                        </div>
                                    </div>
                                    <div class="widget-box">
                                        <div class="widget-main">

                                            <div class="form-group">
                                                <label class="col-sm-3 control-label no-padding-right red">用户和天数：</label>

                                                <div class="col-sm-9">
                                                    <span class="input-icon">
                                                        <input type="text" id="user_longno" placeholder="用户龙号"/>
                                                        <i class="icon-user blue"></i>
                                                    </span>

                                                    <span class="input-icon">
                                                        <input type="text" id="user_day" placeholder="天数"/>
                                                        <i class="icon-adjust green"></i>
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="space-16"></div>


                                        </div>


                                    </div>
                                    <div class="modal-footer no-margin-top">
                                        <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                            <i class="icon-remove"></i>
                                            关闭
                                        </button>
                                        <button id="edit_user_submit_button" class="btn btn-sm btn-info pull-right">
                                            <i class="icon-check"></i>
                                            确认更新
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
<!-- /.main-container -->



<script type="text/javascript">
    seajs.config({base: prefix+"statistic"});
    seajs.use("statistic_user_login.js");
</script>

</body>
</html>
