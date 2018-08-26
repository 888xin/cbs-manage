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
<title>禁言屏蔽管理</title>
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
						<li class="active">禁言屏蔽管理</li>
					</ul>
				</div>
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<div id="fb_table_list_navbar"
								class="message-navbar align-center clearfix">
								<div class="message-bar">
									<div class="message-infobar" id="table_infobar">
										<span class="green bigger-150">被禁言屏蔽列表</span>
									</div>

								</div>
								<div>
									<div class="messagebar-item-left">
										<button class="btn btn-xs btn-info" id="gagUser">
											屏蔽/禁言用户
										</button>

									</div>
									<div class="messagebar-item-right">

										<select id="status">
	                                    	<option value="3">禁言</option>
	                                    	<option value="1">屏蔽</option>
                                		</select>
									</div>
								</div>
							</div>
							<div class="table-responsive">
								<table id="banned_table"
									class="table table-striped table-bordered table-hover">
									<thead>
										<tr>
											<th class="center">用户头像</th>
											<th class="center">用户信息</th>
											<th class="center">状态</th>
											<th class="center">解禁时间</th>
											<th class="hidden">userid</th>
											<th class="hidden">id</th>
											<th class="center"><i
												class="icon-cogs bigger-110 hidden-480"></i> 操作</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
							<!-- /.table-responsive -->

	<div id="modal_inform" class="modal fade" tabindex="-1">
	<div class="modal-dialog" style="width:800px;">
	<div class="modal-content">
	<div class="widget-box" id="modal_content">
	<div class="widget-header">
	<h4 id="inform_title">禁言/屏蔽用户</h4>
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
	<div class="profile-info-name"><i>用户龙号</i></div>
	<div class="profile-info-value"><input type="text" id="long_no" name="long_no"></div>
	</div>
	<div class="profile-info-row">
	<div class="profile-info-name"><i>处理方式</i></div>
	<div class="profile-info-value">
	<select id="level" name="level">
	<option value="1">禁言</option>
	<option value="2">屏蔽</option>
	</select>
	</div>
	</div>
	<div class="profile-info-row" id="inform_time_div">
	<div class="profile-info-name"><i>处理时长</i></div>
	<div class="profile-info-value">
	<select id="seconds" name="seconds">
	<option value="600">10分钟</option>
	<option value="3600">1小时</option>
	<option value="86400">24小时</option>
	<option value="604800">一周</option>
	<option value="0">永久</option>
	</select>
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
	<button id="modal_gag_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
	<i class="icon-check"></i>
	确认提交
	</button>
	</div>
	</div>
	</div><!-- /.modal-content -->
	</div><!-- /.modal-dialog -->
							
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
		seajs.use("banned_list");
	</script>
</body>
</html>
