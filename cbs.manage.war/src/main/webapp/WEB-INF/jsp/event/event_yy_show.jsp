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
<title>显示的押押</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
<link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
<link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
<link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
<link rel="stylesheet" href="${appName}/public/css/lib/daterangepicker.css" />
<link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-timepicker.css" />
<link rel="stylesheet" href="${appName}/public/css/cbs-manage/table.css" />
<link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-select.min.css" />
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
						<li class="active">显示的押押</li>
					</ul>
					<!-- .breadcrumb -->
				</div>
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<ul id="yy_cup_wrap" class="nav nav-tabs">
								
							</ul>
							<div id="fb_table_list_navbar"
								class="message-navbar align-center clearfix">
								<div class="message-bar">
									<div class="message-infobar" id="table_infobar">
										<span class="green bigger-150">押押列表</span> <span
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
										<button id="yy_add_bt"
											class="btn btn-xs btn-success inline position-relative">
											<i class="icon-location-arrow bigger-125"></i> <span
												class="bigger-110">添加押押</span>
										</button>
										&nbsp;&nbsp;&nbsp;&nbsp;
										<button id="yy_type_add_bt"
											class="btn btn-xs btn-info inline position-relative">
											<i class="icon-signin bigger-125"></i> <span
												class="bigger-110">添加类型</span>
										</button>
									</div>
									<div class="messagebar-item-right">
										<div class="inline position-relative">
											<a href="#" data-toggle="dropdown" class="dropdown-toggle">
												筛选 &nbsp; <i class="icon-caret-down bigger-125"></i>
											</a>
											<ul
												class="dropdown-menu dropdown-lighter pull-right dropdown-100">
												<li><a href="#" id="dropdown_all"> <i
														class="icon-circle blue"></i> 全部 <i id="dropdown_all_i"
														class="icon-ok blue invisible"></i>
												</a> <a href="#" id="dropdown_not_expired"> <i
														class="icon-play green"></i> 未结束 <i
														id="dropdown_not_expired_i"
														class="icon-ok green"></i>
												</a> <a href="#" id="dropdown_finish"> <i
														class="icon-stop red"></i> 已结束 <i id="dropdown_finish_i"
														class="icon-ok red invisible"></i>
												</a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div class="table-responsive">
								<table id="yy_table" class="table table-bordered table-hover">
									<thead>
										<tr>
											<th class="width-4">多选</th>
											<th class="center">ID</th>
											<th class="width-30 center">内容</th>
											<th class="center"><i
												class="icon-time bigger-110 hidden-480"></i> 开始时间</th>
											<th class="center"><i
												class="icon-time bigger-110 hidden-480"></i> 结束时间</th>
											<th class="center">类型</th>
											<th class="center">状态</th>
											<th class="center">是否结算</th>
											<th class="center">是否精选</th>
											<th class="center">下注人数</th>
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
							<div id="modal_yy_add" class="modal fade" tabindex="-1">
								<div class="modal-dialog" style="width: 800px;">
									<div class="modal-content">
										<div class="widget-box">
											<div class="widget-header">
												<h4>添加押押</h4>
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
													<div>
														<label for="modal_add_title" class="green bigger-150">押押名称：</label>
														<input class="input-xxlarge" type="text" maxlength="32"
															id="modal_add_title" placeholder="请输入押押名称（限定32个字）" />
													</div>
													<fieldset>
														<label class="green bigger-150">押押描述：</label>
														<textarea class="form-control limited" id="modal_add_text"
															placeholder="请输入押押描述（限定256个字）" maxlength="256"></textarea>
													</fieldset>

													<br>
													<div style="position: relative;">
														<label class="green bigger-150">时间范围选择：</label>
														<div id="datepicker"
															style="position: absolute; top: 1px; left: 140px; width: 700px;"></div>
													</div>

													<br>

													<form class="form-group">

														<div class="grid3">
															<i class="green bigger-150">类型：</i>
															<select id="modal_add_type">
																<%--<option value="1">奥运会</option>--%>
																<%--<option value="2">综艺节目</option>--%>
															</select>
														</div>
														<div class="grid3">
															<i class="green bigger-150">展示类型：</i>
															<select id="modal_add_show_type" title="展示类型">
																<option selected value="0">默认</option>
																<option value="1">图片靠左</option>
															</select>
														</div>
														<div class="grid3">
															<i class="green bigger-150">是否活动：</i>
															<select id="modal_add_activity" title="展示类型">
																<option selected value="0">否</option>
																<option value="1">是</option>
															</select>
														</div>


														<%--<div class="col-sm-6">--%>
															<%--<div class="col-sm-4">--%>
																<%--<i class="green bigger-150">类型：</i>--%>
															<%--</div>--%>
															<%--<div class="col-sm-8">--%>
																<%--<select id="modal_add_type">--%>
																	<%--&lt;%&ndash;<option value="1">奥运会</option>&ndash;%&gt;--%>
																	<%--&lt;%&ndash;<option value="2">综艺节目</option>&ndash;%&gt;--%>
																<%--</select>--%>
															<%--</div>--%>
														<%--</div>--%>
														<%--<div class="col-sm-6">--%>
															<%--<div class="col-sm-6">--%>
																<%--<i class="green bigger-150">展示类型：</i>--%>
															<%--</div>--%>
															<%--<div class="col-sm-6">--%>
                                                                <%--<select id="modal_add_show_type" title="展示类型" class="form-control selectpicker">--%>
                                                                    <%--<option selected value="0">默认</option>--%>
                                                                    <%--<option value="1">图片靠左</option>--%>
                                                                <%--</select>--%>
															<%--</div>--%>
														<%--</div>--%>


													</form>

                                                    <br>
                                                    <br>


                                                    <button id="modal_add_more" type="button" class="width-20 form-control btn btn-warning">
                                                        <i class="icon-plus"></i>
                                                        添加更多选项
                                                    </button>



                                                    <div class="row" id="modal_add_yy_options">

                                                        <div class="col-xs-6 col-sm-4 pricing-box">
                                                            <div class="widget-box">
                                                                <div class="widget-header header-color-dark">
                                                                    <h5 class="bigger lighter">选项添加</h5>
                                                                </div>

                                                                <div class="widget-body">
                                                                    <div class="widget-main">
                                                                        <ul class="list-unstyled spaced2">
                                                                            <li>
                                                                                <input name="option_name" type="text" class="input-xlarge" placeholder="选项名称（限定16个字）" maxlength="16"/>
                                                                            </li>

                                                                            <li>
                                                                                <input name="option_roi" type="text" class="input-xlarge" placeholder="对应赔率"/>
                                                                            </li>

                                                                            <%--<li>--%>
                                                                                <%--<select name="option_type" title="展示类型" class="form-control selectpicker">--%>
                                                                                    <%--<option selected value="0">默认</option>--%>
                                                                                    <%--<option value="1">图片靠左</option>--%>
                                                                                <%--</select>--%>
                                                                            <%--</li>--%>

                                                                        </ul>

                                                                        <hr />
                                                                        <div>
                                                                            <button name="select_image_bt" class="btn btn-danger btn-sm">选择照片</button>
                                                                            <%--<img class="pull-right" width="60" height="40" src="http://roi.skst.cn/content/0d2/1463988639780_1e571y.jpg"/>--%>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <a href="#" class="btn btn-block btn-inverse">
                                                                            <i class="icon-remove bigger-110"></i>
                                                                            <span>移除</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>


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


													<fieldset>

														<span id="modal_add_image_span4">
															<form id="image_form4" action="#" class="dropzone"
																  method="post" enctype="multipart/form-data">
																<div class="fallback">
																	<input name="file" type="file" />
																</div>
															</form>
														</span>

													</fieldset>

													<%--<div class="form-group no-margin-bottom" >--%>
														<%--<label class="col-sm-2 control-label no-padding-right green bigger-130">选项和赔率：</label>--%>
														<%--<div id="modal_add_yy_options" class="yy-wrap">--%>
															<%--<div class="col-sm-10">--%>
																<%--<div>--%>
																	<%--<input type="text" class="col-xs-5" maxlength="18"--%>
																		<%--placeholder="输入选项名称（少于19个字符）" /> <span class="col-xs-1">……</span>--%>
																	<%--<input type="text" class="col-xs-2" placeholder="输入对应赔率" />--%>
																<%--</div>--%>
															<%--</div>--%>
														<%--</div>--%>

													<%--</div>--%>

													<%--<div class="align-right">--%>
														<%--<button id="modal_add_more" type="button"--%>
															<%--class="btn btn-minier btn-warning">--%>
															<%--<i class="icon-plus"></i> 添加更多--%>
														<%--</button>--%>
													<%--</div>--%>

													<%--<div class="space"></div>--%>

													<%--<hr />--%>
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

							<!-- yy add/.modal-dialog -->
							<div id="modal_yy_edit" class="modal fade" tabindex="-1">
								<div class="modal-dialog" style="width: 800px;">
									<div class="modal-content">
										<div class="widget-box">
											<div class="widget-header">
												<h4>修改押押</h4>
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
													<div>
														<label for="modal_edit_title" class="green bigger-150">押押名称：</label>
														<input class="input-xxlarge" type="text"
															id="modal_edit_title" placeholder="请输入押押名称（限定256个字）" />
													</div>
													<fieldset>
														<label class="green bigger-150">押押描述：</label>
														<textarea class="form-control limited"
															id="modal_edit_text" placeholder="请输入押押描述（限定512个字）"
															maxlength="512"></textarea>
													</fieldset>

													<br>
													<div style="position: relative;">
														<label class="green bigger-150">时间范围选择：</label>
														<div id="datepicker2"
															style="position: absolute; top: 1px; left: 140px; width: 700px;"></div>
													</div>

													<br>

													<form class="form-group">

														<div class="grid3">
															<i class="green bigger-150">类型：</i>
															<select id="modal_edit_type">
																<%--<option value="1">奥运会</option>--%>
																<%--<option value="2">综艺节目</option>--%>
															</select>
														</div>
														<div class="grid3">
															<i class="green bigger-150">展示类型：</i>
															<select id="modal_edit_show_type" title="展示类型">
															</select>
														</div>
														<div class="grid3">
															<i class="green bigger-150">是否活动：</i>
															<select id="modal_edit_activity" title="展示类型">
															</select>
														</div>



													</form>

													<hr />
													<%--<div class="form-group no-margin-bottom">--%>
														<%--<label class="col-md-2 control-label no-padding-right green bigger-130">选项和赔率：</label>--%>
														<%--<div id="modal_edit_yy_options" class="yy-wrap" ></div>--%>
													<%--</div>--%>

                                                    <button id="modal_edit_more" type="button" class="width-20 form-control btn btn-warning">
                                                        <i class="icon-plus"></i>
                                                        添加更多选项
                                                    </button>

                                                    <br>
                                                    <br>

                                                    <div class="row" id="modal_edit_yy_options">

                                                        <%--此处由js来append--%>

                                                    </div>


													<hr />
													<div>
														<label for="modal_edit_image"><i
																class="green bigger-140">主照片修改(经下面图片上传获取地址复制粘贴到这里，多张图片用英文逗号隔开)</i></label>
														<input class="form-control" type="text"
															   id="modal_edit_image" />
													</div>
													<div>
														<label for="modal_edit_list_image"><i
																class="green bigger-140">列表照片修改(经下面图片上传获取地址复制粘贴到这里，多张图片用英文逗号隔开)</i></label>
														<input class="form-control" type="text" id="modal_edit_list_image" />
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

												</div>
											</div>
										</div>
										<div class="modal-footer no-margin-top">
											<button class="btn btn-sm btn-danger pull-left"
												data-dismiss="modal">
												<i class="icon-remove"></i> 关闭
											</button>
											<button id="modal_edit_yy_button"
												class="btn btn-sm btn-info pull-right">
												<i class="icon-save"></i> 确认修改
											</button>
										</div>
									</div>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->





							<!-- yy add/.modal-dialog -->
							<div id="modal_yy_settle" class="modal fade" tabindex="-1">
								<div class="modal-dialog" style="width: 800px;">
									<div class="modal-content">
										<div class="widget-box">
											<div class="widget-header">
												<h4>结算押押</h4>
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
													<div>
														<label for="modal_settle_title" class="purple bigger-150">押押名称：</label>
														<label class="bigger-120" id="modal_settle_title"></label>
													</div>

													<div class="control-group" id="modal_settle_yy_options">
														<label class="control-label purple bigger-150">选项和赔率：</label>

													</div>


													<div class="control-group" id="modal_settle_yy_status">
														<label class="control-label purple bigger-150">修改状态：</label>

														<div class="radio">
															<label> <input name="modal_settle_yy_status"
																type="radio" value="-1" class="ace" /> <span
																class="lbl bigger-120"> 正常结算 </span>
															</label>
														</div>

														<div class="radio">
															<label> <input name="modal_settle_yy_status"
																type="radio" value="-10" class="ace" /> <span
																class="lbl bigger-120"> 走盘结算 </span>
															</label>
														</div>

													</div>

													<hr />

												</div>
											</div>
										</div>
										<div class="modal-footer no-margin-top">
											<button class="btn btn-sm btn-danger pull-left"
												data-dismiss="modal">
												<i class="icon-remove"></i> 关闭
											</button>
											<button id="modal_settle_yy_button"
												class="btn btn-sm btn-info pull-right">
												<i class="icon-save"></i> 确认结算
											</button>
										</div>
									</div>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->




							<!-- yy add/.modal-dialog -->
							<div id="modal_yy_add_cup" class="modal fade" tabindex="-1">
								<div class="modal-dialog" style="width: 800px;">
									<div class="modal-content">
										<div class="widget-box">
											<div class="widget-header">
												<h4>添加押押类型</h4>
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
													<div>
														<label for="modal_add_title" class="green bigger-150">押押cup名称：</label>
														<input class="input-xxlarge" type="text"
															id="modal_add_cup_name" placeholder="请输入押押cup名称（限定256个字）" />
													</div>

												</div>
											</div>
										</div>
										<div class="modal-footer no-margin-top">
											<button class="btn btn-sm btn-danger pull-left"
												data-dismiss="modal">
												<i class="icon-remove"></i> 关闭
											</button>
											<button id="modal_add_yy_cup_button"
												class="btn btn-sm btn-info pull-right">
												<i class="icon-save"></i> 确认添加
											</button>
										</div>
									</div>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->


							<!-- yy one detail /.modal-dialog -->
							<div id="modal_yy_one" class="modal fade" tabindex="-1">
								<div class="modal-dialog" style="width: 800px;">
									<div class="modal-content">

										<div class="modal-header no-padding">
											<div class="table-header">
												<button type="button" class="close" data-dismiss="modal"
													aria-hidden="true">
													<span class="white">&times;</span>
												</button>
												查看押押详情
											</div>
										</div>
										<div class="widget-box" id="modal_edit_content">
											<div class="widget-body">
												<div class="widget-main">
													<div class="profile-user-info profile-user-info-striped">
														<div class="profile-info-row">
															<div class="profile-info-name">押押照片</div>
															<div class="profile-info-value">
																<span id="modal_yy_one_images"></span>
															</div>
														</div>
														<div class="profile-info-row">
															<div class="profile-info-name">押押名称</div>
															<div class="profile-info-value">
																<span id="modal_yy_one_name"></span>
															</div>
														</div>
														<div class="profile-info-row">
															<div class="profile-info-name">押押描述</div>
															<div class="profile-info-value">
																<span id="modal_yy_one_detail"></span>
															</div>
														</div>
														<div class="profile-info-row">
															<div class="profile-info-name">押押类型</div>
															<div class="profile-info-value">
																<span id="modal_yy_one_cup_name"></span>
															</div>
														</div>
														<div class="profile-info-row">
															<div class="profile-info-name">押押状态</div>
															<div class="profile-info-value">
																<span id="modal_yy_one_status"></span>
															</div>
														</div>
														<div class="profile-info-row">
															<div class="profile-info-name">押押选项</div>
															<div class="profile-info-value">
																<span id="modal_yy_one_selection"></span>
															</div>
														</div>
														<div class="profile-info-row">
															<div class="profile-info-name">押押结果</div>
															<div class="profile-info-value">
																<span id="modal_yy_one_result"></span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="modal-footer no-margin-top">
											<button class="btn btn-sm btn-danger pull-left"
												data-dismiss="modal">
												<i class="icon-remove"></i> 关闭
											</button>
										</div>
									</div>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->











                            <div id="modal_option_image_select" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:900px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                选择选项的照片
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">



                                                <div class="row" id="option_image_select_div">


                                                    <%--<div class="pricing-span-body">--%>
                                                        <%--<div class="pricing-span">--%>
                                                            <%--<div class="widget-box pricing-box-small">--%>
                                                                <%--<div class="widget-body">--%>
                                                                    <%--<div class="widget-main no-padding">--%>
                                                                        <%--<ul class="list-unstyled list-striped pricing-table">--%>
                                                                            <%--<li>--%>
                                                                                <%--<img width="100" height="70" src="http://roi.skst.cn/content/25b/1462935881760_y97i92.jpg"/>--%>
                                                                            <%--</li>--%>
                                                                        <%--</ul>--%>

                                                                        <%--<div class="price">--%>
                                                                            <%--<span class="label label-lg label-inverse arrowed-in arrowed-in-right">--%>
                                                                                <%--名称--%>
                                                                            <%--</span>--%>
                                                                        <%--</div>--%>
                                                                    <%--</div>--%>

                                                                    <%--<div>--%>
                                                                        <%--<a href="#" class="btn btn-block btn-sm btn-danger">--%>
                                                                            <%--<span>选择</span>--%>
                                                                        <%--</a>--%>
                                                                    <%--</div>--%>
                                                                <%--</div>--%>
                                                            <%--</div>--%>
                                                        <%--</div>--%>
                                                    <%--</div>--%>


                                                </div>


                                                <div class="center">
                                                    <button id="upload_option_image" class="btn btn-info" data-toggle="modal" data-target="#modal_option_image_upload">
                                                        <i class="icon-arrow-up bigger-120"></i>
                                                        <span class="bigger-110">上传其他照片</span>
                                                    </button>
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
                                </div>
                            </div>



                            <div id="modal_option_image_upload" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:900px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                上传选项的照片
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-main">


                                                <div>
                                                    <label for="upload_option_image_name" class="green bigger-150">押押名称：</label>
                                                    <input type="text" id="upload_option_image_name" placeholder="请输入上传照片的名称" />
                                                </div>

                                                <fieldset>
														<span id="modal_add_image_span3">
															<form id="image_form3" action="#" class="dropzone"
                                                                  method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file" />
                                                                </div>
                                                            </form>
														</span>

                                                </fieldset>


                                                <div class="center">
                                                    <button id="upload_option_image_confirm" class="btn btn-info">
                                                        <i class="icon-arrow-up bigger-120"></i>
                                                        <span class="bigger-110">确认上传照片</span>
                                                    </button>
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
		seajs.use("event_yy");
	</script>
</body>
</html>
