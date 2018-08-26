<%--
  Created by IntelliJ IDEA.
  User: Lifeix
  Date: 15-12-29
  Time: 上午9:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8"/>
    <title>球员管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
     <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
     <link rel="stylesheet" href="${appName}/public/css/common.css" />
     <link rel="stylesheet" href="${appName}/public/css/cbs-manage/inner_settle.css" />
</head>
<body class="skin-3" onkeydown='onEnterDown();'>
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
                    <li class="active">球员管理</li>
                </ul><!-- .breadcrumb -->
            </div>
            <div class="page-content">

                <div class="row">

                    <div class="col-xs-12">
                        <label class="pull-left inline">
                            <select id="teamId" name="teamId">
                                <option value="0">根据球队搜索</option>
                                <option value="139">热火</option>
                                <option value="140">鹈鹕</option>
                                <option value="158">骑士</option>
                                <option value="160">猛龙</option>
                                <option value="161">国王</option>
                                <option value="162">公牛</option>
                                <option value="163">奇才</option>
                                <option value="164">凯尔特人</option>
                                <option value="165">76人</option>
                                <option value="166">湖人</option>
                                <option value="167">掘金</option>
                                <option value="168">老鹰</option>
                                <option value="171">步行者</option>
                                <option value="172">森林狼</option>
                                <option value="173">魔术</option>
                                <option value="174">活塞</option>
                                <option value="175">篮网</option>
                                <option value="176">小牛</option>
                                <option value="177">火箭</option>
                                <option value="178">爵士</option>
                                <option value="179">开拓者</option>
                                <option value="180">快船</option>
                                <option value="181">勇士</option>
                                <option value="182">黄蜂</option>
                                <option value="183">雄鹿</option>
                                <option value="184">灰熊</option>
                                <option value="185">尼克斯</option>
                                <option value="186">太阳</option>
                                <option value="188">雷霆</option>
                                <option value="207">马刺</option>
                            </select>
                        </label>
                        <!-- PAGE CONTENT BEGINS -->
                        <i class="bigger-140 bolder green">查询球员：</i><span class="input-icon">
                                    <input type="text" placeholder="请输入球员名" class="nav-search-input" id="player_name" autocomplete="off" name="team_name" style="width:200px;"/>
                                    <i class="icon-search nav-search-icon"></i>
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                        <a href="#" id="search_player" role="button" class="bigger-140 bolder blue"> 查找 </a>
                        <div class="hr hr-18 dotted hr-double"></div> 
                        <table id="player_table" class="table table-striped table-bordered table-hover">
                             <thead>
                                    <tr>
                                        <th>主键</th>
                                        <th>雷达球员ID</th>
                                        <th>球员全名</th>
                                        <th>所属球队</th>
                                        <th style="display:none">first_name</th>
                                        <th style="display:none">last_name</th>
                                        <th>更改</th>
                                    </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>     
                        <div id="modal_player_edit" class="modal fade" tabindex="-1">
                            <div class="modal-dialog" style="width:800px;">
                                <div class="modal-content">
                                    <div class="widget-box" id="modal_content">
                                        <div class="widget-header">
                                            <h4>修改球员</h4>
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
                                                        <div class="profile-info-value" id="player_id"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>所属球队</i></div>
                                                        <div class="profile-info-value" id="player_team"></div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>球员名字</i></div>
                                                        <div class="profile-info-value">
                                                        	<input type="text"  id="edit_name" name="player_name"/>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>姓</i></div>
                                                        <div class="profile-info-value">
                                                            <input type="text" id="player_first" name="player_first"/>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"><i>名</i></div>
                                                        <div class="profile-info-value">
                                                            <input type="text" id="player_last" name="player_last"/>
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
                                        <button id="modal_player_edit_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
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
    <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
        <i class="icon-double-angle-up icon-only bigger-110"></i>
    </a>
</div>
<script type="text/javascript">
    seajs.config({base: prefix+"event/"});
    seajs.use("event_player_edit");
    function onEnterDown(){ 
		 if(window.event.keyCode == 13){ 
		 onButOk(); 
		 } 
		 } 
		 function onButOk(){ 
		    //按下enter按钮后，触发事件
			 $('#search_player').click();
		 } 
	 
</script>
</body>
</html>
