<%--
  Created by IntelliJ IDEA.
  User: Lifeix
  Date: 15-10-26
  Time: 上午10:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8"/>
    <title>用户搜索</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/daterangepicker.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/cbs-manage/cbs_users.css"/>
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
                    <li class="active">用户搜索</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">
                <div class="row">
                    <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->
                        <h4 class="pink">
                        <span class="input-icon">
                                    <input type="text" placeholder="支持龙号、手机号、姓名搜索" class="nav-search-input" id="search_user" autocomplete="off" name="searchKey" style="width:230px;"/>
                                    <i class="icon-search nav-search-icon"></i>
                                </span>
                            <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                            <a href="#" id="search_user_modal" role="button" class="green"> 查找用户 </a>   
                        </h4>
                        <div class="hr hr-18 dotted hr-double"></div>
                        <table id="user_table" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>用户龙号</th>
                                <th>用户名称</th>
                                <th class="hidden-480">状态</th>
                                <th>性别</th>
                                <th>用户拼音</th>
                                <th>增加龙筹</th>
                                <th>扣除龙筹</th>
                                <th>增加龙币</th>
                                <th>扣除龙币</th>
                                <th>个人统计</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        </table>
                        
                        
                           <div id="modal_stat" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:1100px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_content">
                                        <div class="widget-header">
                                            <h4>个人用户统计图</h4>
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
                                                <div id="datepicker"></div>
                                                <div class="statselect">             
                                                    <select name="" id="stattype">
                                                        <option value="0">输赢、胜率</option>
                                                        <option value="1">收支盈利</option>
                                                    </select>
                                                </div>
                                            <div class='chart'>
                                                <div id="win" class="stat"></div>
                                                <div id="gold" style="display:none;" class="stat"></div>
                                                <div id="num" style="display:none;" class="stat"></div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->    
                        
                        <div id="modal_money_add" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_content">
                                        <div class="widget-header">
                                            <h4>添加龙币</h4>
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
                                                
                                                <form class="form-group">
                                                    <div class="profile-info-row">
                                                        <h5 style=" color:#ff0000;">此为增加龙币，请谨慎操作</h5>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>ID</i></div>
                                                        <div class="profile-info-value" id="user_id_money"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>用户龙号</i></div>
                                                        <div class="profile-info-value" id="long_no_money">
                                                            
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>用户名称</i></div>
                                                        <div class="profile-info-value" id="name_money"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>添加龙币</i></div>
                                                        <div class="profile-info-value"><input type="text" id="amount_money" name="amount_money" value="0"/></div>
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
                                        <button id="modal_money_edit_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                            <i class="icon-check"></i>
                                            确认提交
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->  
                        
                        <div id="modal_money_deduct" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_content">
                                        <div class="widget-header">
                                            <h4>扣除龙币</h4>
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
                                                
                                                <form class="form-group">
                                                    <div class="profile-info-row">
                                                        <h5 style=" color:#ff0000;">此为扣除龙币，请谨慎操作</h5>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>ID</i></div>
                                                        <div class="profile-info-value" id="user_id_money_deduct"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>用户龙号</i></div>
                                                        <div class="profile-info-value" id="long_no_money_deduct">
                                                            
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>用户名称</i></div>
                                                        <div class="profile-info-value" id="name_money_deduct"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>扣除龙币</i></div>
                                                        <div class="profile-info-value"><input type="text" id="amount_money_deduct" name="amount_money" value="0"/></div>
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
                                        <button id="modal_money_deduct_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                            <i class="icon-check"></i>
                                            确认提交
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog --> 
                        
                         <div id="modal_gold_edit" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_content">
                                        <div class="widget-header">
                                            <h4>添加龙筹</h4>
                                            
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
                                                
                                                <form class="form-group">
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>ID</i></div>
                                                        <div class="profile-info-value" id="user_id_gold"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>用户龙号</i></div>
                                                        <div class="profile-info-value" id="long_no_gold">
                                                            
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>用户名称</i></div>
                                                        <div class="profile-info-value" id="name_gold"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>添加龙筹</i></div>
                                                        <div class="profile-info-value"><input type="text" id="amount_gold" name="amount_gold" value="0"/></div>
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
                                        <button id="modal_gold_edit_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                            <i class="icon-check"></i>
                                            确认提交
                                        </button>
                                    </div>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                        <div id="modal_gold_deduct" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_content">
                                        <div class="widget-header">
                                            <h4>扣除龙筹</h4>
                                            
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
                                                
                                                <form class="form-group">
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>ID</i></div>
                                                        <div class="profile-info-value" id="user_id_gold_deduct"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>用户龙号</i></div>
                                                        <div class="profile-info-value" id="long_no_gold_deduct">
                                                            
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>用户名称</i></div>
                                                        <div class="profile-info-value" id="name_gold_deduct"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>扣除龙筹</i></div>
                                                        <div class="profile-info-value"><input type="text" id="amount_gold_deduct" name="amount_gold" value="0"/></div>
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
                                        <button id="modal_gold_dedeuct_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                            <i class="icon-check"></i>
                                            确认提交
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
</div>
<!-- /.main-container -->
<script type="text/javascript">
seajs.config({base: prefix+"user/"});
seajs.use("cbs_users");
</script>
</body>
</html>
