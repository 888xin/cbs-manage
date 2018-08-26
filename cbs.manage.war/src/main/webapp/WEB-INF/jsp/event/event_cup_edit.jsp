<%--
  Created by IntelliJ IDEA.
  User: Lifeix
  Date: 15-10-26
  Time: 上午10:21
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="utf-8" />
<title>联赛管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link type="image/x-icon" rel="shortcut icon"
	href="${appName}/public/images/favicon.ico" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/jquery.gritter.css" />
<link rel="stylesheet" href="${appName}/public/css/common.css" />
</head>
<body class="skin-3" onload="loadCupList()">
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
						<li class="active">联赛管理</li>
					</ul>
					<!-- .breadcrumb -->
				</div>
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<select id="type" name="type">
								<option value="0">足球</option>
								<option value="1">篮球</option>
							</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i
								class="icon-hand-right icon-animated-hand-pointer blue"></i> <a
								href="#" id="search_cup" role="button"
								class="bigger-140 bolder blue"> 确定 </a>
							<div class="hr hr-18 dotted hr-double"></div>
							<table id="cup_table"
								class="table table-striped table-bordered table-hover">
								<thead>
									<tr>
										<th>cupID</th>
										<th>targetId</th>
										<th>球队名</th>
										<th>球队全称</th>
										<th>英文名称</th>
										<th>更改联赛名</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
							
							<div id="modal_cup_edit" class="modal fade" tabindex="-1">
								<div class="modal-dialog" style="width: 800px;">
									<div class="modal-content">
										<div class="widget-box" id="modal_content">
											<div class="widget-header">
												<h4>修改球队名</h4>
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

													<form class="form-group">
														<div class="profile-info-row">
															<div class="profile-info-name">
																<i>cupID</i>
															</div>
															<div class="profile-info-value" id="cup_id_show"></div>
														</div>
														
														<div class="profile-info-row">
															<div class="profile-info-name">
																<i>新球队名</i>
															</div>
															<div class="profile-info-value">
																<input type="text" id="cup_name_edit"
																	name="cup_name_edit" />
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
										<div class="modal-footer no-margin-top">
											<button class="btn btn-sm btn-danger pull-left"
												data-dismiss="modal">
												<i class="icon-remove"></i> 关闭
											</button>
											<button id="modal_cup_edit_button"
												class="btn btn-sm btn-info pull-right" data-dismiss="modal">
												<i class="icon-check"></i> 确认提交
											</button>
										</div>
									</div>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->
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
			base : prefix + "event/"
		});
		seajs.use("event_cup_edit");
		
		function loadCupList(){
			$('#search_cup').click();
		}
	</script>
</body>
</html>
