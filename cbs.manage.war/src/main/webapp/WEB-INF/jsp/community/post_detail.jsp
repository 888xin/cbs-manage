<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-11-17
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="utf-8" />
<title>Post详情界面</title>
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
						<li><a href="./../show">帖子管理</a></li>
						<li class="active">Post详情</li>
					</ul>
				</div>
				<!-- 面包屑 End-->
				<!-- Detail -->
				<div style="margin-left: 20px">
					<div style="overflow: auto">
						<div style="float: right">
							<!-- Id 设置为PostId的形式，便于注册事件 -->
							<button id="${post.id}" name="addCommentBtn">添加评论</button>
						</div>
						<!-- Title Start -->
						<div>
							<h1 id="post_detail_title">
								<b>${post.title}</b>
							</h1>
						</div>
						<!-- Title End -->
						<!-- Description Start -->
						<div>
							<h2 id="post_detail_description">${post.description}</h2>
						</div>
						<!-- Description End -->
						<!-- 帖子图片 Start -->
						<div>
							<c:forEach items="${post.images}" var="image">
									<img width='300' height='300' class="nav-user-photo"
										src="http://7xl7ku.com2.z0.glb.qiniucdn.com/${image}" />
							</c:forEach>
						</div>
						<!-- 帖子图片 End -->
						
						<c:if test="${not empty post.videos}">
								<video src="http://7xl7ku.com2.z0.glb.qiniucdn.com/${post.videos[0]}" controls=\"controls\" height='400' width='800'>your browser does not support the video tag</video>
						</c:if>	
								
						<!-- Content Start -->
						<div style="margin-left: 5px">
							<p id="post_detail_content">${post.content}</p>
						</div>
						<!-- Content End -->
					</div>

					<!-- Comment Start -->
					<div>
						<c:forEach items="${comments}" var="comment">
							<hr>
							<div style="overflow: auto">
								<div style="float: right">
									<button onclick="window.location.href='../showReplies?postId=${post.id}&commentId=${comment.id}&page=1'">查看所有回复</button>
									<!-- Id 设置为评论Id+用户Id的形式，便于注册事件 -->
									<button id="${comment.id}+${comment.userId}" name="addReplyBtn">添加回复</button>
								</div>
								<!-- 用户信息  -->
								<div>
									<!-- 用户头像  -->
									<div>
										<img style="float: left; margin-right: 20px" width='50'
											height='50'
											src="http://7xavvq.com2.z0.glb.qiniucdn.com/${comment.user.avatarUrl}" />
										<h3>${comment.user.nickname}</h3>
									</div>
									<div>${comment.floorNum}楼  <fmt:formatDate pattern="yyyy-MM-dd hh:mm:ss" value="${comment.createTime}" /></div>
								</div>
							</div>
							<!-- 评论内容 -->
							<div style="margin-left: 75px">
								<!-- 评论图片 -->
								<c:forEach items="${comment.images}" var="image">
									<img width='100' height='100'
										src="http://7xl7ku.com2.z0.glb.qiniucdn.com/${image}" />
								</c:forEach>
								<!-- 评论内容 -->
								<div>
									<h3>
										<b>${comment.content}</b>
									</h3>
								</div>
								<!-- 回复 Start-->
								<c:if test="${not empty comment.replies}">
									<hr>
									<c:forEach items="${comment.replies}" var="reply">
										<div>
											<a id="${comment.id}+${reply.user.id}+${reply.id}" name="replyUserBtn" href="javascript:void(0);">${reply.user.nickname}</a>:
											<c:if test="${not empty reply.toUser}">
												回复  ${reply.toUser.nickname}
											</c:if>
											: ${reply.content}
										</div>
									</c:forEach>
								</c:if>
								<!-- 回复 End-->
							</div>
						</c:forEach>
						<hr>
					</div>

					<!-- More Start -->
					<div>
						<div class="dataTables_paginate paging_bootstrap">
							<ul class="pagination">
								<li class="prev disabled"><a href="./${post.id}?page=1"><i class="icon-double-angle-left"></i></a></li>
								<c:forEach var="i" begin="1" end="${pageTotal}">
									<li>
										<a href="./${post.id}?page=${i}" 
											<c:if test="${page==i}">
												class="active"
											</c:if>	
										>${i}
										</a>
									</li>
								</c:forEach>
								<li class="next"><a href="./${post.id}?page=${pageTotal}"><i class="icon-double-angle-right"></i></a></li>
							</ul>
						</div>
					</div>
					</br>
					</br>
					<!-- More End -->

					<!-- Add Comment Start-->
					<div id="modal_comment_add" class="modal fade" tabindex="-1">
						<div class="modal-dialog" style="width: 800px;">
							<div class="modal-content">
								<div class="widget-box">
									<div class="widget-header">
										<h4>添加评论</h4>
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
											<form id="model_comment_add_form" method="post"
												enctype="multipart/form-data" action="../addComment">
												<fieldset>
													<legend> 添加评论 </legend>
													<div>
														<input id="addcommentform_postId" name="postId" value="${post.id}" type="hidden"/> 
														<input id="addcommentform_toUserId" name="toUserId" value="${post.author.id}" type="hidden"/> 
														<!-- 哪一个用户 Start -->
														<label>马甲</label> <select id="addcommentform_userId" name="userId">
															<c:forEach items="${users}" var="user">
																<option value="${user.id}">${user.nickname}</option>
															</c:forEach>
														</select><br>
														<!-- 哪一个用户 End -->
													</div>
													<div>
														<!-- 图片 Start -->
														<label>图片</label> 
														<input name="comment_add_images1" class="file" type="file"/>
														<input name="comment_add_images2" class="file" type="file"/>
														<input name="comment_add_images3" class="file" type="file"/>
														<!-- 图片 End -->
													</div>
													<div>
														<!-- 内容 Start -->
														<label>内容</label> 
														<textarea id="addcommentform_content" name="content" rows="5" cols="80" placeholder="200以内字符"  maxlength ="200"></textarea>
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
									<button id="modal_comment_add_confirm_btn"
										class="btn btn-sm btn-info pull-right">
										<i class="icon-save"></i> 确认
									</button>
								</div>
							</div>
						</div>
					</div>
					<!-- Add Comment End-->
					
					
					<!-- AddReply -->
					<div id="modal_reply_add" class="modal fade" tabindex="-1">
						<div class="modal-dialog" style="width: 800px;">
							<div class="modal-content">
								<div class="widget-box">
									<div class="widget-header">
										<h4>添加回复</h4>
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
											<form id="model_reply_add_form" method="post"
												enctype="multipart/form-data" action="./addReply">
												<fieldset>
													<legend> 添加回复 </legend>
													<input id="addreplyform_postId" name="postId" value="${post.id}" type="hidden" />
													<input id="addreplyform_toUserId" name="toUserId" value="" type="hidden" />
													<input id="addreplyform_commentId" name="commentId" value="" type="hidden"/>
													<input id="addreplyform_replyId" name="replyId" value="" type="hidden" />  
													<div>
														<!-- 哪一个用户 Start -->
														<label>马甲</label> <select id="addreplyform_userId" name="userId">
															<c:forEach items="${users}" var="user">
																<option value="${user.id}">${user.nickname}</option>
															</c:forEach>
														</select><br>
														<!-- 哪一个用户 End -->
													</div>
													<div>
														<!-- 内容 Start -->
														<label>内容</label>
														<textarea id="addreplyform_content" name="content" rows="10" cols="80"
															placeholder="200以内字符" maxlength="200"></textarea>
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
									<button id="modal_reply_add_confirm_btn"
										class="btn btn-sm btn-info pull-right">
										<i class="icon-save"></i> 确认
									</button>
								</div>
							</div>
						</div>
					</div>
					<!-- AddReply -->
				</div>
			</div>
			<!-- Main Content End -->
		</div>
	</div>


	<script type="text/javascript">
		seajs.config({
			base : prefix + "community"
		});
		seajs.use("posts_detail.js");
	</script>
</body>
</html>
