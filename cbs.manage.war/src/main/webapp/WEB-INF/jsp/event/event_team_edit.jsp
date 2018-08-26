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
<title>球队管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link type="image/x-icon" rel="shortcut icon"
	href="${appName}/public/images/favicon.ico" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/jquery.gritter.css" />
<link rel="stylesheet" href="${appName}/public/css/common.css" />
</head>
<body class="skin-3" onkeydown='onEnterDown();'>
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
						<li class="active">球队管理</li>
					</ul>
					<!-- .breadcrumb -->
				</div>
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<i class="bigger-140 bolder green">查询球队：</i><span
								class="input-icon"> <input type="text"
								placeholder="请输入球队名或球队ID" class="nav-search-input"
								id="team_name" autocomplete="off" name="team_name"
								style="width: 200px;" /> <i class="icon-search nav-search-icon"></i>
							</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <select id="type"
								name="type">
								<option value="0">足球</option>
								<option value="1">篮球</option>
							</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i
								class="icon-hand-right icon-animated-hand-pointer blue"></i> <a
								href="#" id="search_team" role="button"
								class="bigger-140 bolder blue"> 查找 </a>
							<div class="hr hr-18 dotted hr-double"></div>
							<table id="team_table"
								class="table table-striped table-bordered table-hover">
								<thead>
									<tr>
										<th class="hidden">ID</th>
										<th>targetId</th>
										<th>球队名</th>
										<th>Logo</th>
										<th>英文名</th>
										<th>更改球队名</th>
										<th>更改球队图片</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>


							<div id="modal_logo_edit" class="modal fade" tabindex="-1">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="widget-box">
											<div class="widget-header">
												<h4>选择图片</h4>
												<div class="widget-toolbar">
													<a href="#" data-action="collapse"> <i
														class="icon-chevron-up"></i>
													</a> <a href="#" data-dismiss="modal" aria-hidden="true"> <i
														class="icon-remove light-red"></i>
													</a>
												</div>
											</div>
											<div class="widget-body">
												<div class="widget-main" id="edit_main">



													<form name="formlogo" method="post"
														ENCTYPE="multipart/form-data" style="width: 400px;">
														<input type="hidden" name="logo_name" id="logo_name"
															value="" /> 
														<input type="hidden" name="team_id"
															id="team_id" value="" />
														<input type="hidden" name="team_name"
															id="team_name_logo" value="" />
														<input type="hidden" name="logo_name"
															id="logo_name_new" value="" />
														<p>选择球队logo图片：</p>
														<iframe name="hidden_frame" id="hidden_frame"
															style="display: none; width: 1px;"></iframe>
														<div class="profile-info-row">
															<div class="profile-info-value">
																<span id="image_form_after_add2">
																	<div class="dropzone">
																		<div class="fallback">
																			<input type="file" name="updatePic" id="updatePic"
																				onchange="checkUpdate()" style="width: 60%;"
																				style="margin-left:120px; on" />
																		</div>
																	</div>
																</span>
															</div>
														</div>

														<div style="width: 100%; text-align: center;"></div>
													</form>

												</div>
											</div>
										</div>
										<div class="modal-footer no-margin-top">
											<button id="logo_close" class="btn btn-sm btn-danger pull-left"
												data-dismiss="modal">
												<i class="icon-remove"></i> 关闭
											</button>
										</div>
									</div>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->



							<div id="modal_team_edit" class="modal fade" tabindex="-1">
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
																<i>ID</i>
															</div>
															<div class="profile-info-value" id="team_id_show"></div>
														</div>
														<div class="profile-info-row">
															<div class="profile-info-name">
																<i>Logo</i>
															</div>
															<div class="profile-info-value" id="team_logo"></div>
														</div>
														<div class="profile-info-row">
															<div class="profile-info-name">
																<i>球队名</i>
															</div>
															<div class="profile-info-value">
																<input type="text" id="team_name_edit"
																	name="team_name_edit" />
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
											<div style="display:none;">
												<button type="hidden" id="updateImgButton"></button>
											</div>
											<button id="modal_team_edit_button"
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
		seajs.use("event_team_edit");
		
		function checkUpdate() {
			var upContent = document.getElementById("updatePic").value;
			var logo_name = $("#logo_name").val();
			if (upContent == '') {
				alert("请选择要更换的图片！");
				return false;
			} else {
				document.formlogo.action = appName
						+ "/frontpage/add/logo?logo_name=" + logo_name;
				document.formlogo.target = "hidden_frame";
				/** 此form的target值为以下iframe的name属性值 */
				document.formlogo.submit();
			}
		}

		/** 回调本函数，用于清空文件上传框和显示后台信息*/
		var image_url = "http://roi.skst.cn/logo/";
		function callback(msg) {
			if (msg != '' && msg.indexOf("fail") > -1) {
				alert(msg);
			}

			//获得输入的值
			var type = $("#type").val();
			var team_id = $("#team_id_show").html();

			
			
			$('#target-box').empty();
			$('#target-box').append("<img id='target1' alt='原图'/>");
			//图片显示出来，关闭弹框
			//通过id来获取显示图片的地方
			$("#team_logo").find("img").attr("src");
			$("#logo_name_new").val(msg.replace("logo/", ""));
			
			document.getElementById("updateImgButton").click();
			$('#logo_close').click();
		}

		function closeIframe() {
			$('.fade').hide();
			$('#modal_logo_edit').hide();
		}

		function checklogoForm() {
			var oInput = document.getElementById('updatePic');
			oInput.onchange = function() {
				if (this.value == '') {
					alert('请选择上传图片');
				}
			}
		}

		function onEnterDown() {
			if (window.event.keyCode == 13) {
				onButOk();
			}
		}
		function onButOk() {
			//按下enter按钮后，触发事件
			$('#search_team').click();
		}
		
		
	</script>
</body>
</html>
