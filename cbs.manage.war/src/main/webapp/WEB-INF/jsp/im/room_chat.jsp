<%--
  Created by IntelliJ IDEA.
  User: Lifeix
  Date: 15-10-19
  Time: 下午7:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="utf-8" />
<title>聊天记录管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link type="image/x-icon" rel="shortcut icon"
	href="${appName}/public/images/favicon.ico" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/jquery.gritter.css" />
<link rel="stylesheet" href="${appName}/public/css/common.css" />
<link rel="stylesheet" href="${appName}/public/css/im/im.css" />
<link rel="stylesheet" href="${appName}/public/css/cbs-manage/table.css" />


</head>
<body class="skin-3">
	<%@ include file="../common/manage_head.jsp"%>
	<div class="main-container" id="main-container">
		<div class="main-container-inner">
			<a class="menu-toggler" id="menu-toggler" href="#"> <span
				class="menu-text"></span>
			</a>
			<%@ include file="../common/manage_menu.jsp"%>
			<div class="main-content">
				<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li class="active"><i class="icon-home home-icon"></i> <a
							href="${appName}/gotopage/main.do">主页</a></li>
						<li class="active">聊天记录管理</li>
					</ul>
					<!-- .breadcrumb -->
					<!-- <div class="nav-search" id="nav-search">
                    <span class="input-icon">
                        <input type="text" placeholder="公告过滤 ..." class="nav-search-input" id="search_input" autocomplete="off" />
                        <i class="icon-search nav-search-icon"></i>
                    </span>
                </div> -->
					<!-- #nav-search -->
				</div>
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<div id="fb_table_list_navbar"
								class="message-navbar align-center clearfix">
								
								
								<div id="contestInfo">
								
								</div>
								
								<div id="sortCondition">
								
								</div>
								
								<div class="message-bar">
								
									<div class="message-infobar" id="table_infobar">
										<span class="green bigger-150">聊天列表</span>
									</div>
									
								</div>
							</div>
							<div class="table-responsive">
								<table id="chat_table"
									class="table table-striped table-bordered table-hover">
									<thead>
										<tr>
											<th class="center width-15">消息ID</th>
											<th class="center width-10">发送者</th>
											<th class="left">内容</th>
											<th class="center width-10">状态</th>
										    <th class="center width-20">操作</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<a href="#" id="btn-scroll-up"
			class="btn-scroll-up btn btn-sm btn-inverse"> <i
			class="icon-double-angle-up icon-only bigger-110"></i>
		</a>
	</div>
	<script type="text/javascript">
	var roomId='${roomId}';
	var senderId='${senderId}';
		seajs.config({
			base : prefix + "im/"
		});
		seajs.use("room_chat");
	</script>
</body>
</html>
