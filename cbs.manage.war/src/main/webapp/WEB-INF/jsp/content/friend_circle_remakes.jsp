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
    <title>猜友圈吐槽</title>
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
						<li class="active">吐槽管理</li>

					</ul>
					<!-- .breadcrumb -->

				</div>

				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->


							<div class="table-header">吐槽列表</div>
							<div class="table-responsive">
								<table id="friend_circle_remakes_table"	class="table table-striped table-bordered table-hover">
									<thead>
										<tr>
											<th>ID</th>
                                            <th>用户信息</th>
											<th class="width-30">内容</th>
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
		seajs.use("friend_circle_remakes.js");
	</script>

</body>
</html>
