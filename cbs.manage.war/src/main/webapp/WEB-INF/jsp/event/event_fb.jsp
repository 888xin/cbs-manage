<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-9-23
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>足球赛事管理</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
        <link rel="stylesheet" href="${appName}/public/css/common.css" />
        <link rel="stylesheet" href="${appName}/public/css/cbs-manage/table.css" />
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
                            <a href="#">赛事管理</a>
                        </li>
                        <li class="active">足球赛事</li>
                    </ul><!-- .breadcrumb -->
                    <div class="nav-search" id="nav-search">
                        <span class="input-icon">
                            <input type="text" placeholder="全局赛事搜索 ..." class="nav-search-input" id="event_find" autocomplete="off" />
                            <i class="icon-search nav-search-icon"></i>
                        </span>
                    </div><!-- #nav-search -->
                </div>
                <div class="page-content">
                    <div class="row">
                        <div class="col-xs-12">
                            <!-- PAGE CONTENT BEGINS -->
                            <button class="btn btn-xs btn-info" id="yesterday_data">
                                <i class="icon-arrow-left icon-on-left"></i>
                                前一天
                                <i class="icon-eye-open"></i>
                            </button>
                            <i id="current_date" class="bigger-140 bolder green"></i>
                            <button class="btn btn-xs btn-info" id="tomorrow_date">
                                <i class="icon-eye-open"></i>
                                后一天
                                <i class="icon-arrow-right icon-on-right"></i>
                            </button>
                            <i class="bigger-140 bolder green">
                                查询某天记录
                                <i class="icon-hand-right icon-animated-hand-pointer red"></i>
                            </i>
                            <input id="date_picker_fb" type="text" />
                            <i class="icon-calendar bigger-110"></i>
                            <div class="row">
                                    <div class="col-xs-12">
                                        <h3 class="row header smaller lighter blue">
                                                    <span class="col-sm-6">
                                                        <i class="icon-list-alt"></i>
                                                        <span id="fb_table_head_title">一级赛事列表</span>
                                                        <span id="toolbar_info" class="grey smaller-80">(赛事总计：<b id="fb_num_i" class="red">0</b> 场)</span>
                                                    </span><!-- /span -->
                                                    <span class="col-sm-6">
                                                        <label class="inline">
                                                            <div class="nav-search1">
                                                                <span class="input-icon">
                                                                    <input type="text" placeholder="局部赛事过滤 ..." class="nav-search-input" id="search_input" autocomplete="off" />
                                                                    <i class="icon-search nav-search-icon"></i>
                                                                </span>
                                                            </div><!-- #nav-search -->
                                                        </label>
                                                        <label class="pull-right inline">
                                                            <button data-toggle="dropdown" class="btn btn-sm dropdown-toggle">
                                                                <i id="fb_dropdown_type">赛事类型</i>
                                                                <i class="icon-angle-down icon-on-right"></i>
                                                            </button>
                                                            <ul class="dropdown-menu dropdown-default">
                                                                <li>
                                                                    <a id="fb_dropdown_first" href="#">一级赛事</a>
                                                                </li>
                                                                <li>
                                                                    <a id="fb_dropdown_important" href="#">重要赛事</a>
                                                                </li>
                                                                <li>
                                                                    <a id="fb_dropdown_all" href="#">全部赛事</a>
                                                                </li>
                                                                <li>
                                                                    <a id="fb_dropdown_no_start" href="#">未开始</a>
                                                                </li>
                                                                <li>
                                                                    <a id="fb_dropdown_no_settle" href="#">未结算</a>
                                                                </li>
                                                                <li>
                                                                    <a id="fb_dropdown_unlock" href="#">未锁定</a>
                                                                </li>
                                                                <li>
                                                                    <a id="fb_dropdown_no_plate" href="#">未封盘</a>
                                                                </li>
                                                                <li class="divider"></li>
                                                                <li>
                                                                    <a id="fb_dropdown_abnormal" href="#">异常赛事</a>
                                                                </li>
                                                            </ul>
                                                        </label>
                                                    </span><!-- /span -->
                                        </h3>
                                    <div class="table-responsive">
                                        <table id="fb-table" class="table1 table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>类型</th>
                                                    <th class="width-20">比赛</th>
                                                    <th class="center">
                                                        <i class="icon-time bigger-110 hidden-480"></i>
                                                        开赛时间
                                                    </th>
                                                    <th class="center">比分</th>
                                                    <th>结果</th>
                                                    <th class="center">真实下注数</th>
                                                    <th class="center">初始下注数</th>
                                                    <th class="center">结算</th>
                                                    <th class="center">锁定</th>
                                                    <th class="center width-4">等级</th>
                                                    <th class="center width-15">操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <%--<tr>--%>
                                                <%--<td colspan="11">23</td>--%>
                                            <%--</tr>--%>
                                            </tbody>
                                        </table>
                                    </div><!-- /.table-responsive -->
                                </div><!-- /span -->
                            </div><!-- /row -->
                            <p id="more_data_p" class="align-center hidden">
                                                            <span class="btn bt1n-small btn-pink no-border">
                                                                <i class="icon-arrow-down bigger-130"></i>
                                                                <span class="bigger-110">继续加载</span>
                                                            </span>
                            </p>
                            <p id="more_data_search" class="align-center hidden">
                                <button class="btn btn-purple">
                                    <i class="icon-arrow-down align-top bigger-125"></i>
                                    继续加载
                                </button>
                            </p>
                            <!-- fb edit/.modal-dialog -->
                            <div id="modal_fb_edit" class="modal fade" tabindex="-1">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                更新足球赛事
                                            </div>
                                        </div>
                                        <div class="widget-box" id="modal_content">
                                        </div>
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i>
                                                关闭
                                            </button>
                                            <button id="edit_submit_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                                <i class="icon-check"></i>
                                                确认更新
                                            </button>
                                        </div>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->
                            <!-- fb odds/.modal-dialog -->
                            <div id="modal_fb_odds" class="modal fade" tabindex="-1">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                赔率信息
                                            </div>
                                        </div>
                                        <div class="widget-box" id="odds_modal_content">
                                            <div>
                                                <h2>
                                                    <div class="clearfix">
                                                        <div class="grid3">
                                                            <p class="align-left red" id="odds_modal_home_p">中国</p>
                                                        </div>
                                                        <div class="grid3">
                                                            <p class="center bolder" id="odds_modal_scores_p">--:--</p>
                                                        </div>
                                                        <div class="grid3">
                                                            <i class="align-right green" id="odds_modal_away_p">巴西</i>
                                                        </div>
                                                    </div>
                                                </h2>
                                            </div>
                                            <div class="widget-body">
                                                <div class="widget-main">
                                                    <h4 class="header green">胜平负</h4>
                                                    <div class="clearfix">
                                                        <div class="grid3">
                                                            <p class="center">主胜</p>
                                                            <p class="center" ><input type="text" id="h_odds_op_win_spinner" /></p>
                                                            <div class="space-6"></div>
                                                            <button class="btn btn-minier btn-primary pull-left" id="odds_modal_op_history_bt">
                                                                赔率历史
                                                            </button>
                                                        </div>
                                                        <div class="grid3">
                                                            <p class="center">平</p>
                                                            <p class="center" ><input type="text" id="h_odds_op_draw_spinner" /></p>
                                                            <div class="space-6"></div>
                                                        </div>
                                                        <div class="grid3">
                                                            <p class="center">客胜</p>
                                                            <p class="center" ><input type="text" id="h_odds_op_lost_spinner" /></p>
                                                            <div class="space-6"></div>
                                                            <button class="btn btn-minier btn-danger pull-right" id="odds_modal_op_edit_bt">
                                                                修改
                                                            </button>
                                                            <button class="btn btn-minier btn-danger pull-right" id="odds_modal_op_add_bt">
                                                                添加
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <h4 class="header red">让球胜平负</h4>
                                                    <div class="clearfix" id="odds_modal_jc_clearfix">
                                                        <div class="grid4">
                                                            <p class="center">主胜</p>
                                                            <p class="center" ><input type="text" id="h_odds_jc_win_spinner" /></p>
                                                            <div class="space-6"></div>
                                                            <button class="btn btn-minier btn-primary pull-left" id="odds_modal_jc_history_bt">
                                                                赔率历史
                                                            </button>
                                                        </div>
                                                        <div class="grid4">
                                                            <p class="center">平</p>
                                                            <p class="center" ><input type="text" placeholder="平" id="h_odds_jc_draw_spinner" /></p>
                                                            <div class="space-6"></div>
                                                        </div>
                                                        <div class="grid4">
                                                            <p class="center">客胜</p>
                                                            <p class="center" ><input type="text" id="h_odds_jc_lost_spinner" /></p>
                                                            <div class="space-6"></div>
                                                        </div>
                                                        <div class="grid4">
                                                            <p class="center">盘口</p>
                                                            <p class="center" ><input type="text" id="h_odds_jc_handicap_spinner" /></p>
                                                            <div class="space-6"></div>

                                                            <input type="text"  style="display:none" id="modal_contest_id"/>
                                                            <button class="btn btn-minier btn-danger pull-right" id="odds_modal_jc_edit_bt">
                                                                修改
                                                            </button>
                                                            <button class="btn btn-minier btn-danger pull-right" id="odds_modal_jc_add_bt">
                                                                添加
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <h4 class="header red">大小球</h4>
                                                    <div class="clearfix" id="odds_modal_size_clearfix">
                                                        <div class="grid3">
                                                            <p class="center">大球</p>
                                                            <p class="center" ><input type="text" id="h_odds_size_win_spinner" /></p>
                                                            <div class="space-6"></div>
                                                            <button class="btn btn-minier btn-primary pull-left" id="odds_modal_size_history_bt">
                                                                赔率历史
                                                            </button>
                                                        </div>
                                                        <div class="grid3">
                                                            <p class="center">客胜</p>
                                                            <p class="center" ><input type="text" id="h_odds_size_lost_spinner" /></p>
                                                            <div class="space-6"></div>
                                                        </div>
                                                        <div class="grid3">
                                                            <p class="center">盘口</p>
                                                            <p class="center" ><input type="text" id="h_odds_size_handicap_spinner" /></p>
                                                            <div class="space-6"></div>
                                                            <button class="btn btn-minier btn-danger pull-right" id="odds_modal_size_edit_bt">
                                                                修改
                                                            </button>
                                                            <button class="btn btn-minier btn-danger pull-right" id="odds_modal_size_add_bt">
                                                                添加
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div><!-- /widget-main -->
                                            </div><!-- /widget-body -->
                                        </div><!-- /widget-box -->
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i>
                                                关闭
                                            </button>
                                        </div>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- fb odds/.modal-dialog -->
                            <!-- fb odds history/.modal-dialog -->
                            <div id="modal_fb_odds_history" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:1000px; height: 1000px">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                赔率历史
                                            </div>
                                        </div>
                                        <div class="modal-body no-padding">
                                            <div class='chart'>
                                                 <div id="graph1" style="display:none;width:900px"></div>
                                                 <div id="graph2" style="display:none;width:900px"></div>
                                            </div>
                                            <table id="modal_odds_history" class="table table-striped table-bordered table-hover no-margin-bottom no-border-top">
                                                <thead>
                                                <tr>
                                                    <th id="table_handicap" class="center">让球</th>
                                                    <th class="center">主胜</th>
                                                    <th class="center">平</th>
                                                    <th class="center">客胜</th>
                                                    <th class="center">公司</th>
                                                    <th class="center">时间</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i>
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- fb odds history/.modal-dialog -->
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
        seajs.config({base: prefix+"event/"});
        seajs.use("event_fb");
    </script>
    </body>
</html>
