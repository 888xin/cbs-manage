<%--
  Created by IntelliJ IDEA.
  User: Lhx
  Date: 2016/7/14
  Time: 15:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>缓存清理</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
        <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
        <link rel="stylesheet" href="${appName}/public/css/common.css" />

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
                                <a href="${appName}/gotopage/main.do">主页</a>
                            </li>
                            <li>
                                <a href="#">内容管理</a>
                            </li>
                            <li class="active">缓存清理</li>
                        </ul><!-- .breadcrumb -->
                    </div>
                    <div class="page-content">
                        <div class="row">
                            <div class="col-xs-12">
                                <!-- PAGE CONTENT BEGINS -->




                                <form class="form-horizontal" id="validation-form" method="get">

                                    <h3 class="header smaller lighter green">基本操作</h3>



                                    <div class="form-group" id="memcache_machine">
                                        <label class="col-sm-2 control-label no-padding-right">服务器选择：</label>

                                        <div class="col-sm-10">
                                            <label>
                                                <input name="machine_radio" value="0" type="radio" class="ace"/>
                                                <span class="lbl"> 大赢家 </span>
                                            </label>
                                            <label>
                                                <input name="machine_radio" value="1" type="radio" class="ace"/>
                                                <span class="lbl"> 体育头条 </span>
                                            </label>
                                        </div>

                                    </div>


                                    <div class="form-group">
                                        <label class="col-sm-2 control-label no-padding-right">类路径和id：</label>

                                        <div class="col-sm-10">

                                            <span class="input-icon">
                                                <input list="name_list" type="text" class="input-xxlarge" id="key_name" placeholder="输入类全称（包括路径）"/>
                                                <datalist id="name_list">
                                                </datalist>
                                                <i class="icon-question-sign blue"></i>
                                            </span>


                                            <span class="input-icon">
                                                <input type="text" class="input-xxlarge" id="ids" placeholder="输入id（多个id用英文逗号隔开）"/>
                                                <i class="icon-question-sign blue"></i>
                                            </span>


                                            <button id="delete" type="button" class="btn btn-minier btn-danger">
                                                <i class="icon-trash"></i>
                                                清理
                                            </button>
                                        </div>

                                    </div>


                                    <div class="form-group">
                                        <label class="col-sm-2 control-label no-padding-right">类路径和范围ids：</label>

                                        <div class="col-sm-10">

                                            <span class="input-icon">
                                                <input list="rang_list" type="text" class="input-xxlarge" id="key_rang" placeholder="输入类全称（包括路径）"/>
                                                <datalist id="rang_list">
                                                    <%--<option value="com.lifeix.cbs.contest.dao.fb.impl.FbContestDaoImpl">--%>
                                                    <%--<option value="com.lifeix.cbs.contest.dao.bb.impl.BbContestDaoImpl">--%>
                                                </datalist>
                                                <i class="icon-question-sign blue"></i>
                                            </span>


                                            <span class="input-icon">
                                                <input type="text" class="input-medium" id="id_start" placeholder="输入起始id值"/>
                                                <i class="icon-question-sign blue"></i>
                                            </span>

                                            <span class="input-icon">
                                                <input type="text" class="input-medium" id="id_end" placeholder="输入结束id值"/>
                                                <i class="icon-question-sign blue"></i>
                                            </span>

                                            <button id="delete_rang" type="button" class="btn btn-minier btn-danger">
                                                <i class="icon-trash"></i>
                                                清理
                                            </button>
                                        </div>

                                    </div>


                                    <div class="form-group">
                                        <label class="col-sm-2 control-label no-padding-right" for="key_full_name">全名称：</label>

                                        <div class="col-sm-10">

                                            <span class="input-icon">
                                                <input list="full_name_list" class="input-xxlarge" type="text" id="key_full_name" placeholder="输入要清理memcache的key值" />
                                                <datalist id="full_name_list">
                                                </datalist>
                                                <i class="icon-key green"></i>
                                            </span>

                                            <button id="delete_key" type="button" class="btn btn-minier btn-danger">
                                                <i class="icon-trash"></i>
                                                清理
                                            </button>

                                        </div>
                                    </div>


                                </form>


                                <!-- PAGE CONTENT ENDS -->
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.page-content -->
                </div><!-- /.main-content -->
                <!-- /.main-content -->
            </div>
            <!-- /.main-container-inner -->
            <a href="#" id="btn-scroll-up" class="btn-scroll-up btn btn-sm btn-inverse">
                <i class="icon-double-angle-up icon-only bigger-110"></i>
            </a>
        </div>
        <script type="text/javascript">
            seajs.config({base: prefix+"content"});
            seajs.use("memcache_delete.js");
        </script>
    </body>
</html>
