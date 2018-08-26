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
<title>短信余量</title>
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
						<li class="active">短信余量查询</li>
					</ul>
				</div>
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
							 <i class="bigger-140 bolder green">梦网余量：</i><span class="input-icon">
                                    <input type="text" readonly class="nav-search-input" id="remainMW" autocomplete="off"  style="width:200px;"/>
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                        	<a href="#" id="search_balance_MW" role="button" class="bigger-140 bolder blue"> 重新获取 </a>
							 </br>
							 <i class="bigger-140 bolder green">微网余量：</i><span class="input-icon">
                                    <input type="text" readonly class="nav-search-input" id="remainWW" autocomplete="off"  style="width:200px;"/>
                                </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <i class="icon-hand-right icon-animated-hand-pointer blue"></i>
                        	<a href="#" id="search_balance_WW" role="button" class="bigger-140 bolder blue"> 重新获取 </a>
							 
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
		seajs.use("statistic_message.js");
	</script>
	
</body>
</html>
