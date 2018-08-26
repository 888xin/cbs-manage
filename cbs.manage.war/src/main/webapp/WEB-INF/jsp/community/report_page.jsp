<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-11-17
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>

    <meta charset="utf-8"/>
    <title>社区举报管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />

</head>

<body class="skin-3">
<%@ include file="../common/manage_head.jsp"%>
        <div class="main-container" id="main-container">
            <div class="main-container-inner">
                <a class="menu-toggler" id="menu-toggler" href="#">
                    <span class="menu-text"></span>
                </a>
				<!-- 导航栏 Start-->
                <%@ include file="../common/manage_menu.jsp"%>
				<!-- 导航栏 End-->

				<!-- Main Content Start -->
                <div class="main-content">
                	<!-- 面包屑 Start-->
                    <div class="breadcrumbs" id="breadcrumbs">
                        <ul class="breadcrumb">
                            <li class="active">
                                <i class="icon-home home-icon"></i>
                                <a href="${appName}/gotopage/main.do">主页</a>
                            </li>
                            <li>
                                <a href="#">社区管理</a>
                            </li>
                            <li class="active">社区举报管理</li>
                        </ul>
                    </div>
					<!-- 面包屑 End-->

					<!--Post列表 Start-->
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- PAGE CONTENT BEGINS -->
                                <div class="tabbable">
		                            <ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="reports_tab">
		                                <li class="active">
		                                    <a data-toggle="tab" href="#reports_post_tab">帖子区</a>
		                                </li>
		
		                                <li>
		                                    <a data-toggle="tab" href="#reports_comment_tab">评论区</a>
		                                </li>
		
		                            </ul>
                                
                              <div class="tab-content">  
                              	<div id="reports_post_tab" class="tab-pane in active">
		                                 <!-- 搜索区域 -->
		                                <h4 class="pink">
		                                    <span class="label label-lg label-danger">筛选：</span>
		                                    <select id="reports_post_table_status">
			                                    <option value="2" selected="selected">全部</option>
			                                    <option value="0">未处理</option>
	            								<option value="1">已处理</option>
            								</select>
            								&nbsp;&nbsp;&nbsp;
		                                </h4>
		                                <div class="table-header">
		                                    	被举报的帖子
		                                </div>
		                                <div class="table-responsive">
                                    <table id="reports_post_table" class="table table-striped table-bordered table-hover">
                                        <thead>
                                          <tr>
                                              <th class="center">
                                                  <label>
                                                      <input type="checkbox" class="ace"/>
                                                      <span class="lbl"></span>
                                                  </label>
                                              </th>
                                              <th class="width-7">ID</th>
                                              <th class="width-7">帖子ID</th>
                                              <th>举报人</th>
                                              <th>
                                              	<i class="icon-time bigger-110 hidden-480"></i>
                                              	举报时间
                                              </th>
                                              <th class="width-30">举报原因</th>
                                              <th>
                                              <i class="icon-time bigger-110 hidden-480"></i>
                                             		 回复时间
                                              </th>
                                              <th>回复概要</th>
                                              <th>状态</th>
                                              <th class="width-10">操作</th>
                                           </tr>
                                        </thead>
                                        <tbody id="posts_list">
                                        </tbody>
                                    </table>
                                </div>     
                                <!-- PAGE CONTENT ENDS -->
                                </div>
                                <!--REPORTS_POST_TAB ENDS -->
                                
                                
                                <div id="reports_comment_tab" class="tab-pane">
                                		 <!-- 搜索区域 -->
		                                <h4 class="pink">
		                                    <span class="label label-lg label-danger">筛选：</span>
		                                    <select id="reports_comment_table_status">
			                                    <option value="2" selected="selected">全部</option>
			                                    <option value="0">未处理</option>
	            								<option value="1">已处理</option>
            								</select>
            								&nbsp;&nbsp;&nbsp;
		                                </h4>
		                                <div class="table-header">
		                                    	被举报的评论
		                                </div>
		                                <div class="table-responsive">
                                    <table id="reports_comment_table" class="table table-striped table-bordered table-hover">
                                        <thead>
                                          <tr>
                                              <th class="center">
                                                  <label>
                                                      <input type="checkbox" class="ace"/>
                                                      <span class="lbl"></span>
                                                  </label>
                                              </th>
                                              <th class="width-7">ID</th>
                                              <th class="width-7">评论ID</th>
                                              <th>举报人</th>
                                              <th>
                                              	<i class="icon-time bigger-110 hidden-480"></i>
                                              	举报时间
                                              </th>
                                              <th class="width-30">举报原因</th>
                                              <th>
                                              <i class="icon-time bigger-110 hidden-480"></i>
                                             		 回复时间
                                              </th>
                                              <th>回复概要</th>
                                              <th>状态</th>
                                              <th class="width-10">操作</th>
                                           </tr>
                                        </thead>
                                        <tbody id="comment_list">
                                        </tbody>
                                    </table>
                                </div>     
                                <!-- PAGE CONTENT ENDS -->
                                </div>
                                <!--REPORTS_POST_TAB ENDS -->
                                
                                
                              </div>
                                <!--TAB-CONTENT ENDS  -->
                                <div>
                                <!--TABBABLE ENDS -->
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    	<!-- <div class="row">
                    		<div class="col-sm-6">
                    			<div id="orders_table_info" class="dataTables_info">当前显示 1 到 20 条，共 404 条记录</div>
                    		</div>
                    		<div class="col-sm-6">
                    			<div class="dataTables_paginate paging_bootstrap">
                    				<ul class="pagination">
                    					<li class="prev disabled">
                    						<a href="#"><i class="icon-double-angle-left"></i></a>
                    					</li>
                    					<li class="active"><a href="#">1</a></li>
                    					<li><a href="#">2</a></li>
                    					<li class="next"><a href="#"><i class="icon-double-angle-right"></i></a></li>
                    				</ul>
                    			</div>
                    		</div>
                    	</div> -->
                    </div>
					<!-- reports_post列表 End -->
				
                </div>
				<!-- Main Content End -->
            </div>
            <!-- /.main-container-inner -->
            <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
                <i class="icon-double-angle-up icon-only bigger-110"></i>
            </a>
        </div>
        
        
        
        
        <div id="modal_reply" class="modal fade" tabindex="-1">
             <div class="modal-dialog" style="width:800px;">
                <div class="modal-content">
                    <div class="widget-box" id="modal_content">
                        <div class="widget-header">
                            <h4 id="report_title">社区举报处理</h4>
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
                                
                                <form class="form-group" id="modal_form">
                                	<div class="profile-info-row">
                                        <div class="profile-info-name"><i>ID</i></div>
                                        <div class="profile-info-value" id="id"></div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"><i>帖子ID</i></div>
                                        <div class="profile-info-value" id="element_id"></div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"><i>report_type</i></div>
                                        <div class="profile-info-value" id="report_type"></div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"><i>举报用户</i></div>
                                        <div class="profile-info-value" id="user_name"></div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"><i>举报时间</i></div>
                                        <div class="profile-info-value" id="report_time"></div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"><i>原因</i></div>
                                        <div class="profile-info-value" id="reply_reason"></div>
                                    </div>
                                    <div class="profile-info-row">
                                        <div class="profile-info-name"><i>回复内容</i></div>
                                        <div class="profile-info-value">
                                        	<textarea rows="15" cols="50" id="reply_reply">
                                        	
                                        	</textarea>
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
                        <button id="modal_submit_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                            <i class="icon-check"></i>
                            确认提交
                        </button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog --> 
        
        
        
        

        <script type="text/javascript">
            var xin_previous = false ;
            var xin_next = false ;
            var xin_skip = 0 ;
            seajs.config({base: prefix+"community"});
            seajs.use("reports.js");
        </script>
</body>
</html>
