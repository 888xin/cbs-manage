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
<title>Reply详情界面</title>
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
						<li><a href="./show">社区管理</a></li>
						<li><a href="./detail/${postId}">帖子详情</a></li>
						<li class="active">回复列表</li>
					</ul>
				</div>
				<!-- 面包屑 End-->
				<!-- Detail -->
				<div style="margin-left: 20px">
					<!-- 回复 Start-->
					<c:if test="${not empty replies}">
						<hr>
						<c:forEach items="${replies}" var="reply">
							<div>
								<a id="${commentId}+${reply.user.id}+${reply.id}" name="replyUserBtn" href="javascript:void(0);">${reply.user.nickname}</a>:
											<c:if test="${not empty reply.toUser}">
												回复  ${reply.toUser.nickname}
											</c:if>
											: ${reply.content}
							</div>
						</c:forEach>
					</c:if>
					<hr>
					<!-- 回复 End-->
					<!-- More Start -->
				</div>
				
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
													<input id="addreplyform_postId" name="postId" value="${postId}" type="hidden" />
													<input id="addreplyform_toUserId" name="toUserId" value="" type="hidden" />
													<input id="addreplyform_commentId" name="commentId" value="" type="hidden"/>
													<input id="addreplyform_replyId" name="replyId" value="" type="hidden" />  
													<div>
														<!-- 哪一个用户 Start -->
														<label>用户</label> <select id="addreplyform_userId" name="userId">
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
			<!-- Main Content End -->
		</div>
	</div>


	<script type="text/javascript">
		seajs.config({
			base : prefix + "community"
		});
		seajs.use("replies_detail.js");
	</script>
</body>
</html>
