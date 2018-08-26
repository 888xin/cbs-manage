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
<title>im房间管理</title>
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
			<%@ include file="../common/manage_menu.jsp"%>
			<div class="main-content">
				<div class="breadcrumbs" id="breadcrumbs">
					<ul class="breadcrumb">
						<li class="active"><i class="icon-home home-icon"></i> <a
							href="${appName}/gotopage/main.do">主页</a></li>
						<li class="active">房间管理</li>
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
								<div class="message-bar">
									<div class="message-infobar" id="table_infobar">
										<span class="green bigger-150">房间列表</span>
										<!--                                     <span class="grey bigger-110">(剩余 <i id="toolbar_placard_num" class="green"></i> 条公告可启用)</span>
 -->
									</div>
									<!-- 选中后显示操作 -->
									<div class="message-toolbar hide" id="table_toolbar">
										<div class="inline position-relative align-left">
											<button class="btn btn-xs btn-warning dropdown-toggle"
												data-toggle="dropdown">
												<span class="bigger-110">操作</span> <i
													class="icon-caret-down icon-on-right"></i>
											</button>
											<ul
												class="dropdown-menu dropdown-warning dropdown-caret dropdown-125">
												<li><a id="toolbar_placard_edit_h" href="#"> <i
														class="icon-edit blue"></i> &nbsp; 编辑
												</a></li>
												<li class="divider"></li>
												<li><a id="toolbar_placard_push_h" href="#"> <i
														class="icon-bullhorn green bigger-110"></i> &nbsp; 通知
												</a></li>
											</ul>
										</div>
										<button class="btn btn-xs btn-warning" id="one_delete_select">
											<i class="icon-trash bigger-125"></i> <span
												class="bigger-110">一键删除</span>
										</button>
									</div>
									<!-- 选中后显示操作 end-->
								</div>
								<div>
									<div class="messagebar-item-right">
										
									</div>
								</div>
							</div>
							<div class="table-responsive">
								<table id="placard_table"
									class="table table-striped table-bordered table-hover">
									<thead>
										<tr>
											
											<th class="center">房间编号</th>
											<th class="center">房间名</th>
											<th class="center">房间人数</th>
											<th class="center"><i
												class="icon-time bigger-110 hidden-480"></i> 更新时间</th>
											<th class="center"><i
												class="icon-cogs bigger-110 hidden-480"></i> 操作</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
							<!-- /.table-responsive -->
							<!-- PAGE CONTENT ENDS -->
						</div>
						<!-- /.col -->
					</div>
					<!-- /.row -->
				</div>
				<!-- /.page-content -->
			</div>
			<!-- /.main-content -->
			<!-- /.main-content -->
		</div>
		<!-- /.main-container-inner -->
		<a href="#" id="btn-scroll-up"
			class="btn-scroll-up btn btn-sm btn-inverse"> <i
			class="icon-double-angle-up icon-only bigger-110"></i>
		</a>
	</div>
	<script type="text/javascript">
		seajs.config({
			base : prefix + "im/"
		});
		seajs.use("room_list");
	</script>
</body>
</html>
