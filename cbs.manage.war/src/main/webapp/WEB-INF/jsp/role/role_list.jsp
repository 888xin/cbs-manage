<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 15-9-23
  Time: 上午11:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
    <head>
        <meta charset="utf-8" />
        <title>角色列表</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/common.css" />
        <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-select.min.css" />
    </head>
    <body class="skin-3">
        <%@ include file="../common/manage_head.jsp"%>
        <div class="main-container" id="main-container">
            <div class="main-container-inner">
                <a class="menu-toggler" id="menu-toggler" href="#">
                    <span class="menu-text"></span>
                </a>
                <%@ include file="../common/manage_menu.jsp"%>
                <div class="main-content">
                    <div class="breadcrumbs" id="breadcrumbs">
                        <ul class="breadcrumb">
                            <li class="active">
                                <i class="icon-home home-icon"></i>
                                <a href="${appName}/gotopage/main">主页</a>
                            </li>
                            <li>
                                <a href="#">权限相关</a>
                            </li>
                            <li class="active">角色管理</li>
                        </ul>
                        <!-- .breadcrumb -->
                    </div>
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- PAGE CONTENT BEGINS -->
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="table-header">
                                            角色列表
                                        </div>
                                        <div class="table-responsive">
                                            <table id="sample-table-1" class="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>账户</th>
                                                        <th class="width-25">
                                                            管理员权限
                                                        </th>
                                                        <th>
                                                            <i class="icon-time hidden-480"></i> 注册时间
                                                        </th>
                                                        <th class="hidden-480">状态</th>
                                                        <th>
                                                            <i class="bigger-120"></i> 描述
                                                        </th>
                                                        <th class="hidden-480">手机</th>
                                                        <th>操作</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <c:forEach var="role" items="${roleList}">
                                                        <tr id="role-${role.roleId}">
                                                            <td id="rolename-${role.roleId}">${role.rolename}</td>
                                                            <td>${role.resourceResKeys}</td>
                                                            <td>${role.registerTimeStr}</td>
                                                            <td class="hidden-480">
                                                                <c:choose>
                                                                    <c:when test="${role.status==0}">
                                                                        <span class="label label-sm label-warning">审核</span>
                                                                    </c:when>
                                                                    <c:when test="${role.status==1}">
                                                                        <span class="label label-sm label-success">正常</span>
                                                                    </c:when>
                                                                    <c:when test="${role.status==2}">
                                                                        <span class="label label-sm label-inverse">屏蔽</span>
                                                                    </c:when>
                                                                    <c:otherwise>
                                                                        <span class="label label-sm label-inverse">删除</span>
                                                                    </c:otherwise>
                                                                </c:choose>
                                                            </td>
                                                            <td>${role.description}</td>
                                                            <td>${role.phone}</td>
                                                            <td>
                                                                <div class="visible-md visible-lg hidden-sm hidden-xs btn-group">
                                                                    <button class="btn btn-xs btn-info" data-toggle="modal" data-target="#modal-table">
                                                                        <i class="icon-edit bigger-120"></i>
                                                                    </button>
                                                                    <button id="role_set_ok_${role.roleId}" class="btn btn-xs btn-success" data-toggle="tooltip" title="审核通过">
                                                                        <i class="icon-ok bigger-120"></i>
                                                                    </button>
                                                                    <button id="role_set_delete_${role.roleId}" class="btn btn-xs btn-grey" data-toggle="tooltip" title="审核未通过">
                                                                        <i class="icon-remove bigger-120"></i>
                                                                    </button>
                                                                    <button id="role_delete_${role.roleId}" class="btn btn-xs btn-danger" data-toggle="tooltip" title="删除">
                                                                        <i class="icon-trash bigger-120"></i>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </c:forEach>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <!-- /span -->
                                </div>
                                <!-- /row -->
                                <div id="modal-table" class="modal fade" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header no-padding">
                                                <div class="table-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                        <span class="white">&times;</span>
                                                    </button>
                                                    编辑用户权限
                                                </div>
                                            </div>
                                            <div class="widget-box">
                                                <div class="widget-body">
                                                    <div class="widget-main padding-8">

                                                        <div id="modal_item_div">
                                                            <%--<label for="modal_item_value" class="green bigger-150">选择对该用户可见的条目：</label>--%>
                                                            <%--<select id="modal_item_value" class="show-menu-arrow form-control" multiple>--%>
                                                                <%--<option value="17" selected>NBA季前赛</option>--%>
                                                                <%--<option value="24">NBA</option>--%>
                                                                <%--<option value="277">欧洲杯</option>--%>
                                                                <%--<option value="296">世界杯</option>--%>
                                                            <%--</select>--%>
                                                        </div>

                                                        <div class="space-2"></div>

                                                        <div id="treeview" class="tree"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer no-margin-top">
                                                <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                    <i class="icon-remove"></i> 关闭
                                                </button>
                                                <button id="tree_submit_button" class="btn btn-sm btn-info pull-right" data-dismiss="modal">
                                                    <i class="icon-check"></i> 确认
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
            </div>
            <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
                <i class="icon-double-angle-up icon-only bigger-110"></i>
            </a>
        </div>
        <script type="text/javascript">
        seajs.config({base: prefix+"role/"});
             seajs.use("role_list");
        </script>
    </body>
</html>
