<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-11-17
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="utf-8" />
<title>帖子管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link type="image/x-icon" rel="shortcut icon"
	href="${appName}/public/images/favicon.ico" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/jquery.gritter.css" />
<link rel="stylesheet" href="${appName}/public/css/common.css" />
</head>
<body class="skin-3">
	<%@ include file="../common/manage_head.jsp"%>
	<div class="main-container" id="main-container">
		<div class="main-container-inner">
			<a class="menu-toggler" id="menu-toggler" href="#"> <span
				class="menu-text"></span>
			</a>
			<!-- 导航栏 Start-->
			<%@ include file="../common/manage_menu.jsp"%>
			<!-- 导航栏 End-->

			<!-- Main Content Start -->
			<div class="main-content">
				<!-- 面包屑 Start-->
				<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li class="active"><i class="icon-home home-icon"></i> <a
							href="${appName}/gotopage/main.do">主页</a></li>
						<li><a href="#">社区管理</a></li>
						<li class="active">帖子管理</li>
					</ul>
				</div>
				<!-- 面包屑 End-->
				<!--Post列表 Start-->
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<div class="table-header">Post列表</div>
							<!-- 搜索区域 -->
							<h4 class="pink">
								<!-- 状态 Start -->
								<label>帖子状态</label> <select id="post_status">
									<option value="" selected="selected">全部</option>
									<option value="1">有效</option>
									<option value="0">失效</option>
								</select>
								<!-- 状态 END -->
								<!-- 帖子类型 Start -->
								<label>APP</label> <select id="post_app">
									<option value="" selected="selected">全部</option>
									<option value="0">猜比赛</option>
									<option value="1">体育头条</option>
								</select>
								<!-- 状态 END -->
								<!-- 帖子类型 Start -->
								<label>帖子类型</label> <select id="post_type">
									<option value="" selected="selected">全部</option>
									<option value="0">普通</option>
									<option value="1">置顶</option>
									<option value="2">加精</option>
								</select>
								<!-- 状态 END -->
								<!-- 热帖 Start -->
								<label>热帖</label> <select id="post_hot">
									<option value="" selected="selected">全部</option>
									<option value="1">是</option>
									<option value="0">否</option>
								</select>
								<!-- 热帖 END -->
								<!-- Community -->
								<label>社区</label> <span class="input-icon"> <select
									id="post_communityid">
										<option value="" selected="selected">全部</option>
										<c:forEach items="${communities}" var="community">
											<option value="${community.id}">${community.name}</option>
										</c:forEach>
								</select>
								</span>
								<!-- 排序方式 Start -->
								<label>排序</label> <select id="post_orderBy">
									<option value="commenttime_desc" selected="selected">按评论时间降序</option>
									<option value="commenttime_asc">按评论时间升序</option>
									<option value="createtime_desc">按创建时间降序</option>
									<option value="createtime_asc">按创建时间升序</option>
								</select>
								<!-- 排序方式 END -->
								<!-- Id -->
								<span class="input-icon"> <input placeholder="请输入PostId"
									class="nav-search-input" id="post_id" autocomplete="off"
									type="text">
								</span>
								<!-- Title -->
								<span class="input-icon"> <input placeholder="请输入Title"
									class="nav-search-input" id="post_title" autocomplete="off"
									type="text">
								</span>
								<!-- 创建Post -->
								<i class="icon-hand-right icon-animated-hand-pointer blue"></i>
								<a href="#" id="post_add" role="button" class="red"> 创建Post
								</a>
								<!-- 搜索框 -->
								<i class="icon-hand-right icon-animated-hand-pointer blue"></i>
								<a href="#" id="post_seachbar" role="button" class="green">
									搜索 </a>
								<!-- 归零 -->
								<!-- <a href="#" id="post_chongzhi" role="button" class="green">重置</a> -->
							</h4>

							<div class="table-responsive">
								<table id="posts_table"
									class="table table-striped table-bordered table-hover">
									<thead>
										<tr>
											<th>帖子Id</th>
											<th>状态</th>
											<th>类型</th>
											<th>热帖</th>
											<th>社区</th>
											<th>适用APP</th>
											<th>标题/副标题</th>
											<th>视频预览图</th>
											<th>视频</th>
											<th>图片</th>
											<th>喜欢数</th>
											<th>评论数</th>
											<th><i class="icon-time bigger-110 hidden-480"></i> 创建时间
											</th>
											<th><i class="icon-time bigger-110 hidden-480"></i> 评论时间
											</th>
											<th>操作</th>
										</tr>
									</thead>
									<tbody id="posts_list">
									</tbody>
								</table>
							</div>
							<!-- PAGE CONTENT ENDS -->
						</div>
						<!-- /.col -->
					</div>
					<!-- /.row -->
					<!-- Post列表 End -->
					<!-- 修改Post 热帖状态 -->
					<div id="modal_post_edit_hot" class="modal fade" tabindex="-1">
						<div class="modal-dialog" style="width: 300px;">
							<div class="modal-content">
								<div class="widget-box">
									<div class="widget-header">
										<h4>修改帖子类型</h4>
										<div class="widget-toolbar">
											<a href="#" data-action="collapse"> <i
												class="icon-chevron-up"></i>
											</a> <a href="#" data-dismiss="modal" aria-hidden="true"> <i
												class="icon-remove light-red"></i>
											</a>
										</div>
									</div>
									<div class="widget-body">
										<div class="widget-main">
											<!-- 热帖 Start -->
											<label>热帖</label> <select id="post_edit_hot">
												<option value="1" selected="selected">是</option>
												<option value="0">否</option>
											</select>
											<!-- 热帖 END -->
										</div>
									</div>
								</div>
								<div class="modal-footer no-margin-top">
									<button class="btn btn-sm btn-danger pull-left"
										data-dismiss="modal">
										<i class="icon-remove"></i> 关闭
									</button>
									<button id="modal_post_edit_hot_confirm_btn"
										class="btn btn-sm btn-info pull-right">
										<i class="icon-save"></i> 确认
									</button>
								</div>
							</div>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- /.modal-dialog -->

					<!-- 修改Post类型 satrt-->
					<div id="modal_post_edit_type" class="modal fade" tabindex="-1">
						<div class="modal-dialog" style="width: 300px;">
							<div class="modal-content">
								<div class="widget-box">
									<div class="widget-header">
										<h4>修改帖子类型</h4>
										<div class="widget-toolbar">
											<a href="#" data-action="collapse"> <i
												class="icon-chevron-up"></i>
											</a> <a href="#" data-dismiss="modal" aria-hidden="true"> <i
												class="icon-remove light-red"></i>
											</a>
										</div>
									</div>
									<div class="widget-body">
										<div class="widget-main">
											<!-- 热帖 Start -->
											<label>帖子类型</label> <select id="post_edit_type">
												<option value="0" selected="selected">普通</option>
												<option value="1">置顶</option>
												<option value="2">加精</option>
											</select>
											<!-- 热帖 END -->
										</div>
									</div>
								</div>
								<div class="modal-footer no-margin-top">
									<button class="btn btn-sm btn-danger pull-left"
										data-dismiss="modal">
										<i class="icon-remove"></i> 关闭
									</button>
									<button id="modal_post_edit_type_confirm_btn"
										class="btn btn-sm btn-info pull-right">
										<i class="icon-save"></i> 确认
									</button>
								</div>
							</div>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- 修改Post类型 End -->

					<!-- delete Post Start-->
					<div id="modal_post_delete" class="modal fade" tabindex="-1">
						<div class="modal-dialog" style="width: 300px;">
							<div class="modal-content">
								<div class="widget-box">
									<div class="widget-header">
										<h4>删除帖子</h4>
										<div class="widget-toolbar">
											<a href="#" data-action="collapse"> <i
												class="icon-chevron-up"></i>
											</a> <a href="#" data-dismiss="modal" aria-hidden="true"> <i
												class="icon-remove light-red"></i>
											</a>
										</div>
									</div>
									<div class="widget-body"></div>
								</div>
								<div class="modal-footer no-margin-top">
									<button class="btn btn-sm btn-danger pull-left"
										data-dismiss="modal">
										<i class="icon-remove"></i> 关闭
									</button>
									<button id="modal_post_delete_confirm_btn"
										class="btn btn-sm btn-info pull-right">
										<i class="icon-save"></i> 确认
									</button>
								</div>
							</div>
						</div>
					</div>
					<!-- delete Post End-->

					<!-- Add Post Start-->
					<div id="modal_post_add" class="modal fade" tabindex="-1">
						<div class="modal-dialog" style="width: 1080px;">
							<div class="modal-content">
								<div class="widget-box">
									<div class="widget-header">
										<h4>新建帖子</h4>
										<div class="widget-toolbar">
											<a href="#" data-action="collapse"> <i
												class="icon-chevron-up"></i>
											</a> <a href="#" data-dismiss="modal" aria-hidden="true"> <i
												class="icon-remove light-red"></i>
											</a>
										</div>
									</div>
									<div class="widget-body">
										<div class="widget-main">
											<form id="model_post_add_form" method="post"
												enctype="multipart/form-data" action="./addPost">
												<fieldset>
													<legend> 创建帖子 </legend>
													<h1 id="add_error" style="color: red"></h1>
														<label>媒体类型</label> <select id="mediaType"
															name="mediaType">
															<option value="0" selected="selected">图片</option>
															<option value="1">视频</option>
														</select>
													<!-- 哪一个App Start -->
														<label>App</label> <select id="app" name="app">
															<option value="0" selected="selected">猜比赛</option>
															<option value="1">体育头条</option>
														</select>
													<!-- 哪一个App End -->
													<!-- 哪一个社区 Start -->
														<label>社区</label> <select id="communityId"
															name="communityId">
															<c:forEach items="${addCommunities}" var="community">
																<option value="${community.id}">${community.name}</option>
															</c:forEach>
														</select>
													<!-- 哪一个社区 End -->
														<!-- 哪一个用户 Start -->
														<label>马甲</label> <select id="userId" name="userId">
															<c:forEach items="${users}" var="user">
																<option value="${user.id}">${user.nickname}</option>
															</c:forEach>
														</select><br>
														<!-- 哪一个用户 End -->
														</br>
													<div>
														<!-- Title Start -->
														<label>标题</label> <input id="title" name="title"
															type="text" placeholder="文章标题:标题长度5-40个字符" size="40"
															maxlength="40" required="required" /><br>
														<!-- Title End -->
													</div>
													<div id="imageDiv">
														<!-- 图片 Start -->
														<label><h3 style="color:red">图片（仅支持png|jpg|jpeg|gif）</h3></label>
														<c:forEach var="i" begin="1" end="9">
															<input name="post_add_files" id="post_add_files+${i}"
																type="file"></input>
															<!-- <a name="post_add_btn" id="post_add_btn+${i}" href="javascript:void(0);">清空</a> -->
														</c:forEach>
														<div>
														<label><h3 style="color:red">9张图片大小总计不能超过8M,单张照片大小不能超过1M</h3></label>
														</div>
														<c:forEach var="i" begin="1" end="9">
															<img name="post_add_images" id="post_add_images${i}"
																width="200" height="200" src="" />
														</c:forEach>
														</br>
														<!-- 图片 End -->
													</div>
													<div id="videoDiv">
														<!-- 视频 Start -->
														<label><h3 style="color:red">视频（仅支持mp4）,视频截图和视频总大小不能超过32M</h3></label>
														<input name="videoFile" id="videoFile" type="file"></input><br>
														<label><h3 style="color:red">视频截图（仅支持png|jpg|jpeg|gif）,视频截图大小不能超过1M</h3></label>
														<input
															name="videoPreviewFile" id="videoPreviewFile" type="file"></input>
														<img id="videoPreviewImage" width="300" height="200"
															src="" /></br>
														<!-- 视频 End -->
													</div>
													<div>
														<!-- 内容 Start -->
														<label>内容</label>
														<textarea id="content" name="content" rows="20" cols="120"
															placeholder="文章 内容:长度30-5000个字符" maxlength="5000"></textarea>
														<!-- 内容 End -->
													</div>
													<div id="errorinfo"></div>
												</fieldset>
											</form>
										</div>
									</div>
								</div>
								<div class="modal-footer no-margin-top">
									<button class="btn btn-sm btn-danger pull-left"
										data-dismiss="modal">
										<i class="icon-remove"></i> 关闭
									</button>
									<button id="modal_post_add_confirm_btn"
										class="btn btn-sm btn-info pull-right">
										<i class="icon-save"></i> 确认
									</button>
								</div>
							</div>
						</div>
					</div>
					<!-- Add Post End-->
				</div>
			</div>
			<!-- Main Content End -->
		</div>
		<a href="#" id="btn-scroll-up"
			class="btn-scroll-up btn btn-sm btn-inverse"> <i
			class="icon-double-angle-up icon-only bigger-110"></i>
		</a>
	</div>

	<script type="text/javascript">
		var xin_previous = false;
		var xin_next = false;
		var xin_skip = 0;
		seajs.config({
			base : prefix + "community"
		});
		seajs.use("posts.js");
	</script>
</body>
</html>
