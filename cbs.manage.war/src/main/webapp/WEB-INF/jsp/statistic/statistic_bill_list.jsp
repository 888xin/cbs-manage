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
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>账单对账</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link type="image/x-icon" rel="shortcut icon"
	href="${appName}/public/images/favicon.ico" />
<link rel="stylesheet"
	href="${appName}/public/css/lib/daterangepicker.css" />
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
						<li class="active">账单查看</li>
					</ul>
					<!-- .breadcrumb -->
				</div>
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							<!-- PAGE CONTENT BEGINS -->
							<i class="bigger-140 bolder green">来源：</i> <select
								id="source_type" name="source_type">
								<option value="">全部</option>
								<option value="CBS">大赢家</option>
								<option value="BEDLONGBI">床上</option>
								<option value="WEB">立方网</option>
							</select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <i
								class="bigger-140 bolder green">时间范围：</i> <span
								class="input-icon">
								<div id="datepicker"
									style="display: inline-table; padding-right: 400px;"></div>
							</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<div style="float: right;">
								<i class="icon-hand-right icon-animated-hand-pointer blue"></i>
								
								<a href="javascript:void(0)"  id="buttonExportData" class="ui-btn ui-btn-inline ui-mini ui-shadow ui-corner-all">导出excel</a>
							</div>
							<div class="hr hr-18 dotted hr-double"></div>
							<table id="team_table"
								class="table table-striped table-bordered table-hover">
								<thead>
									<tr>
										<th>龙号</th>
										<th>用户名</th>
										<th>支付方式</th>
										<th>商户订单号</th>
										<th>账号</th>
										<th>金额</th>
										<th>订单号</th>
										<th>交易时间</th>
										<th>来源</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
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
			base : prefix + "statistic"
		});
		seajs.use("statistic_bill.js");
	</script>
	
</body>
</html>
