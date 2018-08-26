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
        <title>社区评论管理</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
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
                            <li class="active">社区评论管理</li>
                        </ul>
                    </div>
					<!-- 面包屑 End-->

					<!--Comment列表 Start-->
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                            	<!-- 搜索区域 -->
                                <h4 class="pink">
                                	<span class="label label-lg label-danger">排序：</span>
                                    <select id="comments_order">
	                                    <option value="postId">按帖子id进行排序</option>
           								<option value="createTime">按最新评论时间排序</option>
          							</select>
                                
                                	<span class="input-icon">
                                        <input placeholder="请输入UserId" class="nav-search-input" id="search-user-id" autocomplete="off" type="text">
                                        <i class="icon-user nav-search-icon"></i>
                                        <input placeholder="请输入PosttId" class="nav-search-input" id="search-posts-id" autocomplete="off" type="text">
                                        <i class="icon-user nav-search-icon"></i>
                                        <input placeholder="请输入CommentId" class="nav-search-input" id="search-comments-id" autocomplete="off" type="text">
                                        <i class="icon-user nav-search-icon"></i>
                                    </span>
                                    <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                                    <a href="#" id="search-comments_modal" role="button" class="green">
                                        		搜索
                                    </a>
                                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                    <span class="label label-lg label-success"><a href="#" class="white" id="deactive" >一键屏蔽</a></span>
                                    
                                </h4>
                                <!-- PAGE CONTENT BEGINS -->
                                <div class="table-header">
                                   	 社区评论列表
                                </div>
                                
                                <div class="table-responsive">
                                    <table id="comments_table" class="table table-striped table-bordered table-hover">
                                        <thead>
                                        <tr>
                                        	  <th class="center">
                                                  <label>
                                                      <input type="checkbox" class="ace" id="checkall"/>
                                                      <span class="lbl"></span>
                                                  </label>
                                              </th>
                                              <th class="width-7">帖子ID</th>
                                              <th class="width-7">评论ID</th>
                                              <th>楼层</th>
                                              <th>评论人ID</th>
                                              <th>评论人</th>
                                              <th class="width-10">评论内容</th>
                                              <th class="width-15">评论图片</th>
                                              <th>
                                              <i class="icon-time bigger-110 hidden-480"></i>
                                             		  评论时间
                                              </th>
                                              <th>状态</th>
                                              <th class="width-10">操作</th>
                                        
                                        </tr>
                                        </thead>
                                        <tbody id="comments_list">
                                        </tbody>
                                    </table>
                                </div>     
                                <!-- PAGE CONTENT ENDS -->
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
					<!-- Comment列表 End -->
				
                </div>
				<!-- Main Content End -->
            </div>
            <!-- /.main-container-inner -->
            <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
                <i class="icon-double-angle-up icon-only bigger-110"></i>
            </a>
        </div>
        
        
        
        
        <div id="modal_comment" class="modal fade" tabindex="-1">
             <div class="modal-dialog" style="width:800px;">
                <div class="modal-content">
                    <div class="widget-box" id="modal_content">
                        <div class="widget-header">
                            <h4 id="report_title">评论详情</h4>
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
                            	<div id="comment_detail">
									<div id="comment_user">
									</div>
									<div id="comment_content" class="center">
									</div>
									<div id="comment_replies" class="center">
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
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog --> 
        
        
        
        
        
        
        

        <script type="text/javascript">
            var xin_previous = false ;
            var xin_next = false ;
            var xin_skip = 0 ;
            seajs.config({base: prefix+"community"});
            seajs.use("comments.js");
        </script>
    </body>
</html>
