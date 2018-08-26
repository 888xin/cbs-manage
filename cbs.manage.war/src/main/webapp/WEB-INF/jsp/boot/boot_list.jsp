<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 16-02-25
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="utf-8" />
<title>广告管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link type="image/x-icon" rel="shortcut icon"
	href="${appName}/public/images/favicon.ico" />
<link rel="stylesheet" href="${appName}/public/css/common.css" />
<link rel="stylesheet" href="${appName}/public/css/cbs-manage/table.css" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
<link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/bootstrap-select.min.css" />
<link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
<link rel="stylesheet" href="${appName}/public/css/lib/daterangepicker.css" />
<link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-timepicker.css" />
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

						<li><a href="#">广告位管理</a></li>
						<li class="active">广告位列表</li>
					</ul>
					<!-- .breadcrumb -->
				</div>
				<span class="label label-lg label-success"><a id="alert_add_boot" href="#" data-toggle="modal" data-target="#modal_boot_add" class="white">添加动画</a></span>
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->

							<div class="row">
								<div class="col-xs-12">

									<div class="table-header">开机动画</div>
									<div class="table-responsive">
										<table id="boots_table"
											class="table table-striped table-bordered table-hover">
											<thead>
												<tr>
													<th class="center">ID</th>
													<th class="width-25">图片</th>
													<th class="center">跳转时间(毫秒)</th>
													<th class="center">跳转类型</th>
													<th class="center">跳转链接</th>
													<th><i class="icon-time bigger-110 hidden-480"></i>创建时间</th>
													<th class="center">状态</th>
													<th class="center">操作</th>
												</tr>
											</thead>
											<tbody>

											</tbody>
										</table>
									</div>

								</div>
								<!-- /span -->
							</div>

							<div class="center">
								<button id="data_more" class="btn btn-info">
									<i class="icon-arrow-down bigger-120"></i> <span
										class="bigger-110">继续加载</span>
								</button>
							</div>

							<!-- modal-dialog 编辑按钮-->

							<div id="modal_boot_add" class="modal fade" tabindex="-1">
								<div class="modal-dialog" style="width: 800px;">
									<div class="modal-content">
										<div class="modal-header no-padding">
											<div class="table-header">
												<button type="button" class="close" data-dismiss="modal"
													aria-hidden="true">
													<span class="white">&times;</span>
												</button>
												添加广告
											</div>
										</div>
										<div class="widget-box">
											<div class="widget-body">
												<div class="space-4"></div>

												<fieldset id="modal_add_contest">

													<div class="grid2">
														<div>
															<label class="green bigger-150">跳转链接：</label> <input
																type="text" id="modal_add_boot_link" placeholder="请输入跳转的链接" />
														</div>
													</div>
													<div class="grid2">
														<div class="form-group">
															<label
																class="col-sm-4 control-label no-padding-right green bigger-140">跳转类型：</label>
															<!-- 1.文章 2.足球比赛 3.篮球比赛 4.押押 5.公告 -->
															<div class="col-sm-8" id="modal_add_boot_type">
																<label> <input name="modal_add_boot_type"
																	value="1" type="radio" class="ace" /> <span
																	class="lbl"> 文章 </span>
																</label> <label> <input name="modal_add_boot_type"
																	value="2" type="radio" class="ace" /> <span
																	class="lbl"> 足球比赛</span>
																</label> <label> <input name="modal_add_boot_type"
																	value="3" type="radio" class="ace" /> <span
																	class="lbl"> 篮球比赛 </span>
																</label> <label> <input name="modal_add_boot_type"
																	value="4" type="radio" class="ace" /> <span
																	class="lbl"> 押押 </span>
																</label> <label> <input name="modal_add_boot_type"
																	value="5" type="radio" class="ace" /> <span
																	class="lbl"> 公告</span>
																</label>
															</div>
														</div>
													</div>
												</fieldset>

                                                  <div class="grid2">
														<div>
															<label class="green bigger-150">跳转时间：</label> <input
																type="text" id="modal_add_time" placeholder="请输入跳转的时间，单位毫秒，1秒==1000毫米" />
														</div>
													</div>
												<input class="form-control" type="text" id="new_boot_image1" />		
													

												<fieldset>
													<label class="green bigger-150">上传图片:</label> <span
														id="image_form_after_add">
														<form id="image_form" action="#" class="dropzone"
															method="post" enctype="multipart/form-data">
															<div class="fallback">
																<input name="file" type="file" />
															</div>
														</form>
													</span>
												</fieldset>

											</div>
										</div>
										<div class="modal-footer no-margin-top">
											<button class="btn btn-sm btn-danger pull-left"
												data-dismiss="modal">
												<i class="icon-remove"></i> 关闭
											</button>
											<button id="modal_add_bt"
												class="btn btn-sm btn-info pull-right">
												<i class="icon-save"></i> 确认添加
											</button>
										</div>
									</div>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->




							<div id="modal_boot_edit" class="modal fade" tabindex="-1">
								<div class="modal-dialog" style="width: 800px;">
									<div class="modal-content">
										<div class="modal-header no-padding">
											<div class="table-header">
												<button type="button" class="close" data-dismiss="modal"
													aria-hidden="true">
													<span class="white">&times;</span>
												</button>
												编辑赛事新闻
											</div>
										</div>
										<div class="widget-box">
											<div class="widget-body">
                                                <div class="space-4"></div>
                                              <fieldset id="modal_edit_contest">
                                                <div class="grid2">
                                                    <input class="form-control" type="hidden" id="edit_boot_id" />
													<div class="profile-info-row">
														<div class="profile-info-name">跳转链接</div>
														<div class="profile-info-value">
															<input class="editable" id="modal_edit_boot_link"/>
														</div>
													</div>
													</div>
													<div class="grid2">
													  <div class="form-group">
														<label
																class="col-sm-4 control-label no-padding-right green bigger-140">跳转类型：</label>
															
															<!-- 1.文章 2.足球比赛 3.篮球比赛 4.押押 5.公告 -->
															<div class="col-sm-8" id="modal_edit_boot_type">
																<label> <input name="modal_edit_boot_type"
																	value="1" type="radio" class="ace" /> <span
																	class="lbl"> 文章 </span>
																</label> <label> <input name="modal_edit_boot_type"
																	value="2" type="radio" class="ace" /> <span
																	class="lbl"> 足球比赛</span>
																</label> <label> <input name="modal_edit_boot_type"
																	value="3" type="radio" class="ace" /> <span
																	class="lbl"> 篮球比赛 </span>
																</label> <label> <input name="modal_edit_boot_type"
																	value="4" type="radio" class="ace" /> <span
																	class="lbl"> 押押 </span>
																</label> <label> <input name="modal_edit_boot_type"
																	value="5" type="radio" class="ace" /> <span
																	class="lbl"> 公告</span>
																</label>
															</div>
														
														</div>
													</div>
													</fieldset>
													<div class="grid2">
														<label class="green bigger-150">跳转时间：</label>
															<input type="text" class="editable" id="modal_edit_boot_time"/>
													</div>
													
											    <input class="form-control" type="hidden" id="new_boot_image2" />		
												
                                                 <fieldset>
													<div class="profile-info-row">
														<label class="green bigger-150">上传新图片:</label>
															<span id="image_form_after_add2">
																<form id="image_form2" action="#" class="dropzone"
																	method="post" enctype="multipart/form-data">
																	<div class="fallback">
																		<input name="file" type="file" />
																	</div>
																</form>
															</span>
													</div>
													</fieldset>

											</div>
										</div>
										<div class="modal-footer no-margin-top">
											<button class="btn btn-sm btn-danger pull-left"
												data-dismiss="modal">
												<i class="icon-remove"></i> 关闭
											</button>
											<button id="modal_edit_bt"
												class="btn btn-sm btn-info pull-right">
												<i class="icon-save"></i> 确认修改
											</button>
										</div>
									</div>
								</div>
							</div>

							<!-- PAGE CONTENT ENDS -->
						</div>
						<!-- /.col -->
					</div>
					<!-- /.row -->
				</div>
				<!-- /.page-content -->
			</div>
		</div>
		<a href="#" id="btn-scroll-up"
			class="btn-scroll-up btn btn-sm btn-inverse"> <i
			class="icon-double-angle-up icon-only bigger-110"></i>
		</a>
	</div>
	<script type="text/javascript">
		seajs.config({
			base : prefix + "boot/"
		});
		seajs.use("boot_list");
	</script>
</body>
</html>
