<%--
  Created by IntelliJ IDEA.
  User: Lifeix
  Date: 15-12-07
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
<head>

    <meta charset="utf-8" />
    <title>猜友圈投注理由</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link type="image/x-icon" rel="shortcut icon"
        href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet"
        href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet"
        href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/cbs-manage/inner_settle.css"/>

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

						<li><a href="#">内容管理</a></li>
						<li class="active">投注理由管理</li>

					</ul>
					<!-- .breadcrumb -->

				</div>

				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->


							<div class="table-header">投注理由列表</div>
							<div class="table-responsive">
								<table id="friend_circle_reason_table"	class="table table-striped table-bordered table-hover">
									<thead>
										<tr>
											<th>ID</th>
                                            <th>用户信息</th>
											<th class="width-30">内容</th>
                                            <th>比赛类型</th>
                                            <th>比赛信息</th>
                                            <th>下注信息</th>
											<th>
                                                <i class="icon-time bigger-110 hidden-480"></i>
                                                创建时间
											</th>
											<th class="width-10">操作</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>





                            <!-- add/.modal-dialog -->
                            <div id="modal_add" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:800px;">
                                    <div class="modal-content">
                                        <div class="widget-box">
                                            <div class="widget-header">
                                                <h4>添加到头版</h4>
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
                                                    <div>
                                                        <label for="modal_user_id" class="green bigger-150">用户龙号：</label>
                                                        <input class="input-xxlarge" type="text" id="modal_user_id" placeholder="请输入用户龙号" />
                                                    </div>

                                                    <fieldset>
                                                        <label class="green bigger-150">文字描述：</label>
                                                        <textarea class="form-control limited" id="modal_text" placeholder="请输入文字描述（限定512个字）" maxlength="512" ></textarea>
                                                    </fieldset>

                                                    <div class="control-group" id="modal_content_type">
                                                        <label class="control-label green bigger-150">吐槽还是理由（投注理由需填猜友圈ID，不可上传图片）：</label>

                                                        <div class="radio">
                                                            <label>
                                                                <input name="modal_content_type" type="radio" value="1" class="ace" />
                                                            <span class="lbl bigger-120">
                                                                吐槽
                                                            </span>
                                                            </label>
                                                        </div>

                                                        <div class="radio">
                                                            <label>
                                                                <input name="modal_content_type" type="radio" value="2" class="ace" />
                                                            <span class="lbl bigger-120">
                                                                投注理由
                                                            </span>
                                                            </label>
                                                        </div>

                                                    </div>

                                                    <div class="control-group" id="modal_type">
                                                        <label class="control-label green bigger-150">发到头版哪里：</label>

                                                        <div class="radio">
                                                            <label>
                                                                <input name="modal_type" type="radio" value="100" class="ace" />
                                                            <span class="lbl bigger-120">
                                                                内容区
                                                            </span>
                                                            </label>
                                                        </div>

                                                        <div class="radio">
                                                            <label>
                                                                <input name="modal_type" type="radio" value="-100" class="ace" />
                                                            <span class="lbl bigger-120">
                                                                广告区
                                                            </span>
                                                            </label>
                                                        </div>

                                                    </div>


                                                    <div>
                                                        <label for="modal_user_id" class="green bigger-150">猜友圈ID：</label>
                                                        <input class="input-xxlarge" type="text" id="modal_friend_circle_id" placeholder="请输入猜友圈Id" />
                                                    </div>

                                                    <fieldset>

                                                        <span id="modal_add_image_span">
                                                            <form id="image_form" action="#" class="dropzone" method="post" enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file"/>
                                                                </div>
                                                            </form>
                                                        </span>

                                                    </fieldset>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i>
                                                关闭
                                            </button>
                                            <button id="modal_add_button" class="btn btn-sm btn-info pull-right">
                                                <i class="icon-save"></i>
                                                确认添加
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
	<!-- /.main-container -->



	<script type="text/javascript">
		var xin_previous = false;
		var xin_next = false;
        var xin_skip = 0 ;
		seajs.config({
			base : prefix + "content"
		});
		seajs.use("friend_circle_reason.js");
	</script>

</body>
</html>
