<%--
  Created by IntelliJ IDEA.
  User: Lifeix
  Date: 16-4-15
  Time: 下午2:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<html>
<head>

    <meta charset="utf-8"/>
    <title>赛事新闻</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/bootstrap-editable.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
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
                        <li class="active">赛事新闻</li>

                    </ul><!-- .breadcrumb -->

                </div>

                <div class="page-content">
                    <div class="row">
                        <div class="col-xs-12">
                        <!-- PAGE CONTENT BEGINS -->



                            <div class="table-header">
                                新闻列表
                            </div>
                            <div class="table-responsive">
                                <table id="contest_news_table" class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th class="width-25">主图和标题</th>
                                            <th class="width-25">摘要</th>
                                            <th>赛事ID</th>
                                            <th>资讯ID</th>
                                            <th>
                                                <i class="icon-time bigger-110 hidden-480"></i>
                                                创建时间
                                            </th>
                                            <th class="width-4">状态</th>
                                            <th class="width-15">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>







                            <div id="modal_news_add" class="modal fade" tabindex="-1">
                                <div class="modal-dialog" style="width:800px;">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                添加赛事新闻
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-body">


                                                <div>
                                                    <label for="modal_add_title" class="green bigger-150">标题：</label>
                                                    <input class="form-control" type="text" id="modal_add_title" placeholder="请输入标题（限定64个字）" />
                                                </div>

                                                <div>
                                                    <label for="modal_add_desc" class="green bigger-150">摘要：</label>
                                                    <textarea class="form-control" id="modal_add_desc" placeholder="请输入描述（限定256个字）" ></textarea>
                                                </div>

                                                <div>
                                                    <label for="modal_add_content_id" class="green bigger-150">资讯ID：</label>
                                                    <input class="form-control" type="text" id="modal_add_content_id" placeholder="请输入资讯ID" />
                                                </div>

                                                <div class="space-4"></div>

                                                <fieldset id="modal_add_contest">

                                                    <div class="grid2">
                                                        <div>
                                                            <label class="green bigger-150">赛事ID：</label>
                                                            <input type="text" id="modal_add_contest_id" placeholder="请输入赛事ID" />
                                                        </div>
                                                    </div>
                                                    <div class="grid2">
                                                        <div class="form-group">
                                                            <label class="col-sm-4 control-label no-padding-right green bigger-140">赛事类型：</label>

                                                            <div class="col-sm-8" id="modal_add_contest_type">
                                                                <label>
                                                                    <input name="modal_add_contest_type" value="0" type="radio" class="ace" />
                                                                    <span class="lbl"> 足球 </span>
                                                                </label>

                                                                <label>
                                                                    <input name="modal_add_contest_type" value="1" type="radio" class="ace" />
                                                                    <span class="lbl"> 篮球 </span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>


                                                <fieldset>
                                                    <label class="green bigger-150">上传图片:</label>
                                                        <span id="image_form_after_add">
                                                            <form id="image_form" action="#" class="dropzone" method="post"
                                                                  enctype="multipart/form-data">
                                                                <div class="fallback">
                                                                    <input name="file" type="file"/>
                                                                </div>
                                                            </form>
                                                        </span>
                                                </fieldset>

                                            </div>
                                        </div>
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i>
                                                关闭
                                            </button>
                                            <button id="modal_add_bt" class="btn btn-sm btn-info pull-right">
                                                <i class="icon-save"></i>
                                                确认添加
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <!-- /.modal-content -->
                            </div>


                            <div id="modal_edit" class="modal fade" tabindex="-1">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header no-padding">
                                            <div class="table-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                    <span class="white">&times;</span>
                                                </button>
                                                编辑赛事新闻
                                            </div>
                                        </div>
                                        <div class="widget-box">
                                            <div class="widget-body">


                                                <div class="profile-user-info profile-user-info-striped">

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 标题 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_title"></span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 描述 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_desc"></span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 资讯ID </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_content_id"></span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 赛事ID </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_contest_id"></span>
                                                        </div>
                                                    </div>
                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 赛事类型 </div>
                                                        <div class="profile-info-value">
                                                            <span class="editable" id="modal_edit_contest_type"></span>
                                                        </div>
                                                    </div>

                                                    <div class="profile-info-row">
                                                        <div class="profile-info-name"> 图片修改 </div>
                                                        <div class="profile-info-value">
                                                                <span id="image_form_after_add2">
                                                                <form id="image_form2" action="#" class="dropzone"
                                                                      method="post" enctype="multipart/form-data">
                                                                    <div class="fallback">
                                                                        <input name="file" type="file"/>
                                                                    </div>
                                                                </form>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="modal-footer no-margin-top">
                                            <button class="btn btn-sm btn-danger pull-left" data-dismiss="modal">
                                                <i class="icon-remove"></i> 关闭
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>





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
    <!-- /.main-container -->


    <script type="text/javascript">
        var xin_previous = false ;
        var xin_next = false ;
        var xin_skip = 0 ;
        seajs.config({base: prefix+"content"});
        seajs.use("contest_news.js");
    </script>

</body>
</html>
