<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 16-01-05
  Time: 下午7:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="utf-8" />
<title>赛事广告</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link type="image/x-icon" rel="shortcut icon"
	href="${appName}/public/images/favicon.ico" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/jquery.gritter.css" />
<link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/daterangepicker.css" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/bootstrap-timepicker.css" />
<link rel="stylesheet" href="${appName}/public/css/cbs-manage/table.css" />
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
							href="${appName}/gotopage/main">主页</a></li>
						<li><a href="#">赛事管理</a></li>
						<li><a href="#">押押管理</a></li>
						<li class="active">赛事广告</li>
					</ul>
					<!-- .breadcrumb -->
				</div>
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->

							<div id="fb_table_list_navbar"
								class="message-navbar align-center clearfix">
								<div class="message-bar">
									<div class="message-infobar" id="table_infobar">
										<span class="green bigger-150">赛事广告列表</span> <span
											class="grey bigger-110">(共计 <i id="toolbar_yy_num"
											class="green"></i> 条记录)
										</span>
									</div>
									<div class="message-toolbar hide" id="table_toolbar">
										<div class="inline position-relative align-left">
											<button class="btn btn-xs btn-warning dropdown-toggle"
												data-toggle="dropdown">
												<span class="bigger-110">操作</span> <i
													class="icon-caret-down icon-on-right"></i>
											</button>
											<ul
												class="dropdown-menu dropdown-warning dropdown-caret dropdown-125">
												<li><a id="toolbar_yy_edit_h" href="#"> <i
														class="icon-edit blue"></i> &nbsp; 编辑
												</a></li>
												<li class="divider"></li>
												<li><a id="toolbar_yy_settle_h" href="#"> <i
														class="icon-briefcase purple bigger-110"></i> &nbsp; 结算
												</a></li>
											</ul>
										</div>
										<button class="btn btn-xs btn-warning" id="one_hide_select">
											<i class="icon-eye-close bigger-125"></i> <span
												class="bigger-110">一键隐藏</span>
										</button>
									</div>
								</div>
								<div>
									<div class="messagebar-item-left">
										<label class="inline middle"> <input type="checkbox"
											id="toggle_all" class="ace" /> <span class="lbl"></span>
										</label> &nbsp;
										<div class="inline position-relative">
											<a href="#" data-toggle="dropdown" class="dropdown-toggle">
												<i class="icon-caret-down bigger-125 middle"></i>
											</a>
											<ul class="dropdown-menu dropdown-lighter dropdown-100">
												<li><a id="select_item_all" href="#">全选</a></li>
												<li><a id="select_item_none" href="#">全不选</a></li>
											</ul>
										</div>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<button id="ad_add_bt"
											class="btn btn-xs btn-success inline position-relative">
											<i class="icon-location-arrow bigger-125"></i> <span
												class="bigger-110">添加赛事广告</span>
										</button>
									</div>
									<div class="messagebar-item-right">
										<div class="inline position-relative">
											<a href="#" data-toggle="dropdown" class="dropdown-toggle">
												状态&nbsp; <i class="icon-caret-down bigger-125"></i>
											</a>
											<ul
												class="dropdown-menu dropdown-lighter pull-right dropdown-100">
												<li><a href="#" id="dropdown_hide"> <i
														class="icon-play green"></i> 隐藏 <i
														id="dropdown_hide_i"
														class="icon-ok green invisible"></i>
												</a> <a href="#" id="dropdown_display"> <i
														class="icon-stop red"></i> 显示 <i id="dropdown_display_i"
														class="icon-ok red"></i>
												</a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div class="table-responsive">
								<table id="contest_ad_table" class="table table-bordered table-hover">
									<thead>
										<tr>
											<th class="center">ID</th>
											<th class="width-30 center">内容</th>
											<th class="center">赛事类型</th>
											<th class="center">赛事ID</th>
											<th class="center"><i
												class="icon-time bigger-110 hidden-480"></i> 创建时间</th>
											<th class="center"><i
												class="icon-cogs bigger-110 hidden-480"></i> 操作</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
							<!-- /.table-responsive -->
							<p class="center">
								<span id="yy_data_more" class="btn btn-inverse"> <i
									class="icon-arrow-down bigger-130"></i> <span
									class="bigger-110">继续加载</span>
								</span>
							</p>
							<!-- yy add/.modal-dialog -->
							<div id="modal_ad_add" class="modal fade" tabindex="-1">
								<div class="modal-dialog" style="width: 800px;">
									<div class="modal-content">
										<div class="widget-box">
											<div class="widget-header">
												<h4>添加赛事广告</h4>
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
														<div>
															<label for="modal_add_title" class="green bigger-150">广告名称：</label>
															<input class="input-xxlarge" type="text"
																id="modal_add_title" placeholder="请输入广告名称（限定256个字）" />
														</div>
														<fieldset>
															<label class="green bigger-150">广告描述：</label>
															<textarea class="form-control limited"
																id="modal_add_text" placeholder="请输入广告描述（限定512个字）"
																maxlength="256"></textarea>
														</fieldset>

														<br>
															
														<div id="modal_contest_ad_key">
                                                            <label class="control-label green bigger-150">关联赛事类型：</label>
                                                            <fieldset>
                                                                        <label>
                                                                            <input name="modal_contest_type" type="radio" checked value="10" class="ace"/>
                                                                            <span class="lbl bigger-120"> 押押 </span>
                                                                        </label>
                                                                        <label>
                                                                            <input name=modal_contest_type type="radio" value="0" class="ace"/>
                                                                            <span class="lbl bigger-120"> 足球赛事 </span>
                                                                        </label>
                                                                        <label>
                                                                            <input name="modal_contest_type" type="radio" value="1" class="ace"/>
                                                                            <span class="lbl bigger-120"> 篮球赛事</span>
                                                                        </label>
                                                                </div>
                                                            </fieldset>
                                                        </div>														
														<br>
														
														<div>
															<label for="modal_add_contest_id" class="green bigger-150">关联的赛事ID：</label>
															<input class="input-xxlarge" type="text"
																id="modal_add_contest_id"type="text" />
														</div>

													</form>
													<hr />
													<fieldset>

														<span id="modal_add_image_span">
															<form id="image_form" action="#" class="dropzone"
																method="post" enctype="multipart/form-data">
																<div class="fallback">
																	<input name="file" type="file" />
																</div>
															</form>
														</span>
													</fieldset>
													<div class="space"></div>
													<hr />
												</div>
											</div>
										</div>
										<div class="modal-footer no-margin-top">
											<button class="btn btn-sm btn-danger pull-left"
												data-dismiss="modal">
												<i class="icon-remove"></i> 关闭
											</button>
											<button id="modal_add_yy_button"
												class="btn btn-sm btn-info pull-right">
												<i class="icon-save"></i> 确认添加
											</button>
										</div>
									</div>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->

							<div id="modal_ad_edit" class="modal fade" tabindex="-1">
								<div class="modal-dialog" style="width: 800px;">
									<div class="modal-content">
										<div class="widget-box">
											<div class="widget-header">
												<h4>修改赛事广告</h4>
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
														<div>
															<label for="modal_edit_title" class="green bigger-150">广告名称：</label>
															<input class="input-xxlarge" type="text"
																id="modal_edit_title" />
															<input class="input-xxlarge" type="hidden"
																id="modal_edit_id" />
															<input class="input-xxlarge" type="hidden"
																id="modal_edit_images" />
														</div>
														<fieldset>
															<label class="green bigger-150">广告描述：</label>
															<textarea class="form-control limited"
																id="modal_edit_text" maxlength="256"></textarea>
														</fieldset>

														<br>
															
														<div id="modal_edit_contest_ad_key">
                                                            <label class="control-label green bigger-150">关联赛事类型：</label>
                                                            <fieldset>
                                                                        <label>
                                                                            <input name="modal_edit_contest_type" type="radio" value="10" class="ace"/>
                                                                            <span class="lbl bigger-120"> 押押 </span>
                                                                        </label>
                                                                        <label>
                                                                            <input name="modal_edit_contest_type" type="radio" value="0" class="ace"/>
                                                                            <span class="lbl bigger-120"> 足球赛事 </span>
                                                                        </label>
                                                                        <label>
                                                                            <input name="modal_edit_contest_type" type="radio" value="1" class="ace"/>
                                                                            <span class="lbl bigger-120"> 篮球赛事</span>
                                                                        </label>
                                                                </div>
                                                            </fieldset>
                                                        </div>														
														<br>
														
														<div>
															<label for="modal_edit_contest_id" class="green bigger-150">关联的赛事ID：</label>
															<input class="input-xxlarge" type="text"
																id="modal_edit_contest_id" type="text" />
														</div>

													</form>
													<hr />
													<div>
														<label for="modal_edit_image"><i
															class="green bigger-150">照片修改(经下面图片上传获取地址复制粘贴到这里，多张图片用英文逗号隔开)</i></label>
														<input class="form-control" type="text"
															id="modal_edit_image" />
													</div>
													<fieldset>
														<span id="modal_add_image_span2">
															<form id="image_form2" action="#" class="dropzone"
																method="post" enctype="multipart/form-data">
																<div class="fallback">
																	<input name="file" type="file" />
																</div>
															</form>
														</span>

													</fieldset>
													<div class="space"></div>
													<hr />
												</div>
											</div>
										</div>
										<div class="modal-footer no-margin-top">
											<button class="btn btn-sm btn-danger pull-left"
												data-dismiss="modal">
												<i class="icon-remove"></i> 关闭
											</button>
											<button id="modal_add_ad_button"
												class="btn btn-sm btn-info pull-right">
												<i class="icon-edit"></i> 修改
											</button>
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
		var yy_jsp_show = true;
		seajs.config({
			base : prefix + "event/"
		});
		seajs.use("event_contest_ad");
	</script>
</body>
</html>
