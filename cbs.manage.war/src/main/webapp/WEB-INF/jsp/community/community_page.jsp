
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}"/>
<c:set var="img_prefix" value="http://7xl7ku.com2.z0.glb.qiniucdn.com/"/>
<html>
<head>
    <meta charset="utf-8"/>
    <title>社区管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="image/x-icon" rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery-ui-1.10.3.full.min.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/jquery.gritter.css" />
    <link rel="stylesheet" href="${appName}/public/css/lib/dropzone.css" />
    <link rel="stylesheet" href="${appName}/public/css/common.css" />
    <link rel="stylesheet" href="${appName}/public/css/cbs-manage/circle_comment.css" />
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

                    <li class="active">
                        社区管理
                    </li>

                </ul><!-- .breadcrumb -->

            </div>

            <div class="page-content">

                <ul id="myTab" class="nav nav-tabs">
                    <li class="active"><a href="#community" data-toggle="tab">所有社区</a></li>
                    <li class=""><a href="#category" data-toggle="tab">所有分类</a></li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    <div class="tab-pane fade active in" id="community">

                        <div class="alert alert-info">
                            <button class="close" data-dismiss="alert">
                                <i class="icon-remove"></i>
                            </button>
                            <form method="post" enctype="multipart/form-data" action="${appName}/community/addcommunity">
                                <fieldset>
                                    <legend>
                                        创建社区
                                    </legend>
                                    <label>社区名称
                                        <input type="text" name="communityName" placeholder="添加社区名称" required />
                                    </label>
                                    <div class="control-group">
                                        <label>社区icon140x140</label><input name="communityIcon" class="file" type="file" required/>
                                        <label>社区背景480x260</label> <input name="communityBg" type="file" required/>
                                    </div>
                                    <label class="checkbox">
                                        <input name="recommend" type="checkbox" /> 添加到推荐
                                    </label>
                                    <button type="submit" class="btn">提交</button>
                                </fieldset>
                            </form>
                        </div>


                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>社区名称</th>
                                <th>社区icon</th>
                                <th>社区背景</th>
                                <th>属于App</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                                <c:forEach var="c" items="${communityList}">
                                    <tr>
                                        <td  onclick="show('${c.id}','${c.name}','${c.iconUrl}','${c.backgroundUrl}');">${c.name}</td>
                                        <td onclick="show('${c.id}','${c.name}','${c.iconUrl}','${c.backgroundUrl}');">
                                            <img data-src="" alt="140x140" src="${img_prefix}${c.iconUrl}!co140x140" style="width: 140px; height: 140px;">
                                        </td>
                                        <td onclick="show('${c.id}','${c.name}','${c.iconUrl}','${c.backgroundUrl}');">
                                            <img data-src="" alt="480x260" src="${img_prefix}${c.backgroundUrl}!co480bg" style="width: 240px; height: 130px;">
                                        </td>
                                        <td>
                                            <select class="span1" onchange="updateCommunityBelong('${c.id}',this)">
                                                <option value="0" <c:if test="${c.belongApp==0}" >selected</c:if>>大赢家</option>
                                                <option value="1" <c:if test="${c.belongApp==1}" >selected</c:if>>体育头条</option>
                                                <option value="99" <c:if test="${c.belongApp==99}" >selected</c:if>>所有</option>
                                            </select>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                                    添加到分类
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <c:forEach var="category" varStatus="st" items="${categoryList}">
                                                        <li><a href="javascript:void(0)" onclick="addCategory('${category.id}','${c.id}',this);">${category.name}</a></li>
                                                    </c:forEach>
                                                </ul>
                                            </div>
                                            <c:if test="${c.recommend == true}">
                                                <button type="button" class="btn btn-inverse" onclick="recommend('${c.id}',false,this);">去除推荐</button>
                                            </c:if>
                                            <c:if test="${c.recommend == false || c.recommend ==null}">
                                                <button type="button" class="btn btn-primary" onclick="recommend('${c.id}',true,this);">推荐</button>
                                            </c:if>

                                            <button type="button" class="btn btn-danger" onclick="delCommunity('${c.id}',this)">删除</button>
                                        </td>
                                    </tr>
                                </c:forEach>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="category">

                        <div class="alert alert-info">
                            <button class="close" data-dismiss="alert">
                                <i class="icon-remove"></i>
                            </button>

                            <form class="form-inline">
                                <legend>
                                    添加社区分类
                                </legend>
                                <input id="cat_i_name" type="text" class="input-small" placeholder="分类名称" required>
                                <select id="cat_s_index">
                                    <option>1</option>
                                    <c:forEach varStatus="st" items="${categoryList}">
                                        <option>${st.index+2}</option>
                                    </c:forEach>
                                </select>
                                <button type="submit" class="btn" onclick="return createCategory();">添加分类</button>
                            </form>

                        </div>


                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>社区列表</th>
                                <th>分类名称</th>
                                <th>分类排序</th>
                                <th>属于App</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody id="cat_t_list">
                                <c:forEach var="cat" varStatus="st" items="${categoryList}">
                                    <tr>
                                        <td>
                                            <a class="accordion-toggle" data-toggle="collapse" data-target="#c_${cat.id}">
                                                    展开${cat.name}列表
                                            </a>

                                            <div id="c_${cat.id}" class="collapse">
                                                <table class="table table-striped">
                                                    <c:forEach var="co" items="${cat.communities}">
                                                        <tr class="success">
                                                        <td>${co.name}</td>
                                                        <td>
                                                            专属
                                                            <c:if test="${co.belongApp==0}" >大赢家</c:if>
                                                            <c:if test="${co.belongApp==1}" >体育头条</c:if>
                                                            <c:if test="${co.belongApp==99}" >所有</c:if>
                                                            社区
                                                        </td>
                                                        <td><a href="javascript:void(0)" onclick="removeCommunity('${cat.id}','${co.id}',this)">去除</a></td>
                                                        </tr>
                                                    </c:forEach>
                                                </table>
                                            </div>
                                        </td>
                                        <td>
                                            <span  id="s_${cat.id}" onclick="showUpdateCat('${cat.id}')">${cat.name}</span>
                                            <div id="d_${cat.id}" style="display: none">
                                                <input id="i_${cat.id}" type="text" value="${cat.name}" />
                                                <button class="btn btn-info btn-small pull-right" type="button" onclick="updateCategoryName('${cat.id}',this)">修改</button>
                                            </div>

                                        </td>
                                        <td>
                                            <select class="span1" onchange="updateIndex('${cat.id}',this)">
                                                <c:forEach varStatus="st" items="${categoryList}">
                                                    <option <c:if test="${cat.indexId==(st.index+1)}" >selected</c:if>>${st.index+1}</option>
                                                </c:forEach>
                                            </select>

                                        </td>
                                        <td>
                                            <select class="span1" onchange="updateCategoryBelong('${cat.id}',this)">
                                                <option value="0" <c:if test="${cat.belongApp==0}" >selected</c:if>>大赢家</option>
                                                <option value="1" <c:if test="${cat.belongApp==1}" >selected</c:if>>体育头条</option>
                                                <option value="99" <c:if test="${cat.belongApp==99}" >selected</c:if>>所有</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-danger" onclick="removeCategory('${cat.id}',this);">删除</button>
                                        </td>
                                    </tr>
                                </c:forEach>
                            </tbody>
                        </table>
                    </div>

                </div>
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

<div id="update_community_c" class="hide">
    <form id="form_ReplayId" method="post" enctype="multipart/form-data" action="${appName}/community/updateCommunity">
        <input name="communityId" type="hidden" value="ReplayId" />
        <table class="table table-bordered">
        <tr>
            <th>社区名称<input type="text" name="communityName" value="ReplayName" required/></th>
            <th>
                <img data-src="" alt="140x140" src="ReplayIconUrl" style="width: 140px; height: 140px;">
                <input type="file" name="iconUrl" style="width: 140px" />
            </th>
            <th>
                <img data-src="" alt="480x260" src="ReplayBackgroundUrl" style="width: 480px; height: 260px;">
                <input name="backgroundUrl" type="file" />
            </th>
        </tr>
        </table>
    </form>
</div>




<script type="text/javascript">

    appName = "${pageContext.request.contextPath}";

    seajs.config({base: prefix+"community"});
    seajs.use("community.js");
</script>

</body>
</html>
