<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-10-15
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8"/>
    <title>投注修复管理</title>
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
                    <li class="active">投注修复</li>
                </ul><!-- .breadcrumb -->
                <div class="nav-search" id="nav-search">
                    <form class="form-search">
                                <span class="input-icon">
                                    <input type="text" placeholder="赛事过滤 ..." class="nav-search-input" id="search_input" autocomplete="off" />
                                    <i class="icon-search nav-search-icon"></i>
                                </span>
                    </form>
                </div><!-- #nav-search -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <div id="fb_table_list_navbar" class="message-navbar align-center clearfix">
                            <div class="message-bar">
                                <div class="message-infobar" id="fb_table_infobar">
                                    <span class="green bigger-150">赛事投注修复</span>
                                    <span class="grey bigger-110">(剩余 <i class="green">2</i> 场比赛投注未修复)</span>
                                </div>
                                <div class="message-toolbar hide" id="fb_table_toolbar">
                                    <div class="inline position-relative align-left">
                                        <button class="btn btn-xs btn-warning dropdown-toggle" data-toggle="dropdown">
                                            <span class="bigger-110">操作</span>
                                            <i class="icon-caret-down icon-on-right"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-warning dropdown-caret dropdown-125">
                                            <li>
                                                <a href="#">
                                                    <i class="icon-edit blue"></i>
                                                    &nbsp; 编辑
                                                </a>
                                            </li>
                                            <li class="divider"></li>
                                            <li>
                                                <a href="#">
                                                    <i class="icon-trash red bigger-110"></i>
                                                    &nbsp; 删除
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <button class="btn btn-xs btn-warning" id="one_restore_a">
                                        <i class="icon-trash bigger-125"></i>
                                        <span class="bigger-110">一键修复</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div class="messagebar-item-left">
                                    <label class="inline middle">
                                        <input type="checkbox" id="fb_toggle_all" class="ace" />
                                        <span class="lbl"></span>
                                    </label>
                                    &nbsp;
                                    <div class="inline position-relative">
                                        <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                            <i class="icon-caret-down bigger-125 middle"></i>
                                        </a>
                                        <ul class="dropdown-menu dropdown-lighter dropdown-100">
                                            <li>
                                                <a id="fb_select_item_all" href="#">全选</a>
                                            </li>
                                            <li>
                                                <a id="fb_select_item_none" href="#">全不选</a>
                                            </li>
                                            <li class="divider"></li>
                                            <li>
                                                <a id="id-select-message-unread" href="#">足球</a>
                                            </li>
                                            <li>
                                                <a id="id-select-message-read" href="#">篮球</a>
                                            </li>
                                        </ul>
                                    </div>
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
                                                    <i class="icon-ok green"></i>
                                                    时间
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="nav-search minimized">
                                    <form class="form-search">
                                        <span class="input-icon">
                                            <input type="text" autocomplete="off" class="input-small nav-search-input" id="fb_search_input" placeholder="赛事搜索" />
                                            <i class="icon-search nav-search-icon"></i>
                                        </span>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table id="fb_settle_table" class="table1 table-hover">
                                <thead>
                                <tr>
                                    <th class="width-4">复选框</th>
                                    <th class="center">用户</th>
                                    <th class="center">联赛</th>
                                    <th class="center">比赛ID</th>
                                    <th class="center">赛事类型</th>
                                    <th class="center">下注</th>
                                    <th class="center">比分</th>
                                    <th class="center">结果</th>
                                    <th class="center">赔率</th>
                                    <th class="center">
                                        <i class="icon-credit-card bigger-110 hidden-480"></i>
                                        下注额
                                    </th>
                                    <th class="center">
                                        <i class="icon-credit-card bigger-110 hidden-480"></i>
                                        返回金额
                                    </th>
                                    <th class="center">
                                        <i class="icon-cogs bigger-110 hidden-480"></i>
                                        操作
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <label class="inline">
                                            <input type="checkbox" class="ace"/>
                                            <span class="lbl"></span>
                                        </label>
                                    </td>
                                    <td class="center">453454</td>
                                    <td class="center">
                                        <span style="background-color: #999 !important;" class="label">世界杯</span>
                                    </td>
                                    <td class="center">100002</td>
                                    <td class="center">足球</td>
                                    <td class="center">2</td>
                                    <td class="center">3 ： 2</td>
                                    <td class="center">主胜</td>
                                    <td class="center">
                                        <b class="red">3.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.19</b>
                                    </td>
                                    <td class="center">￥4.00</td>
                                    <td class="center">￥12.00</td>
                                    <td class="center">
                                        <div>
                                            <button class="btn btn-xs btn-info" data-toggle="tooltip"
                                                    data-placement="top" title="编辑">
                                                <i class="icon-edit bigger-150"></i>
                                            </button>
                                            <button class="btn btn-xs btn-danger" data-toggle="tooltip"
                                                    data-placement="top" title="删除">
                                                <i class="icon-trash bigger-150"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label class="inline">
                                            <input type="checkbox" class="ace"/>
                                            <span class="lbl"></span>
                                        </label>
                                    </td>
                                    <td class="center">453454</td>
                                    <td class="center">
                                        <span style="background-color: #999 !important;" class="label">世界杯</span>
                                    </td>
                                    <td class="center">100002</td>
                                    <td class="center">足球</td>
                                    <td class="center">2</td>
                                    <td class="center">3 ： 2</td>
                                    <td class="center">主胜</td>
                                    <td class="center">
                                        <b class="red">3.2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.19</b>
                                    </td>
                                    <td class="center">￥4.00</td>
                                    <td class="center">￥12.00</td>
                                    <td class="center">
                                        <div>
                                            <button class="btn btn-xs btn-info" data-toggle="tooltip"
                                                    data-placement="top" title="编辑">
                                                <i class="icon-edit bigger-150"></i>
                                            </button>
                                            <button class="btn btn-xs btn-danger" data-toggle="tooltip"
                                                    data-placement="top" title="删除">
                                                <i class="icon-trash bigger-150"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div><!-- /.table-responsive -->
                        <p class="align-center">
                            <span id="fb_data_more" class="btn bt1n-small btn-pink no-border">
                                <i class="icon-arrow-down bigger-130"></i>
                                <span class="bigger-110">继续加载</span>
                            </span>
                        </p>
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
    seajs.use("event_restore");
</script>
</body>
</html>
