/**
 * Created by neoyin on 16/2/26.
 */

define(function (require) {
    require("../common/common");
    require("../../modules/plugin/bootbox.min");

    //常量设置


});
var image_prefix = "http://7xl7ku.com2.z0.glb.qiniucdn.com/";

/**
 * 修改社区信息
 * @param id
 * @param name
 * @param iconUrl
 * @param bgUrl
 */
function show(id,name,iconUrl,bgUrl){

    var message = $("#update_community_c").html();
    message = message.replace("ReplayId",id);
    message = message.replace("ReplayId",id);
    message = message.replace("ReplayName",name);
    message = message.replace("ReplayIconUrl",image_prefix+iconUrl);
    message = message.replace("ReplayBackgroundUrl",image_prefix+bgUrl);

    bootbox.confirm({
        title:"修改社区信息",
        message:message,
        callback:function(result){
            if(result){
                $("#form_"+id).submit();
            }
        }
    });
}
/**
 * 删除社区
 * @param id
 */
function delCommunity(id,e){
    bootbox.confirm("确定要删除此社区吗?", function(result) {
        if(result){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/community/delcommunity",
                data: {communityId:id},
                success: function (data) {
                    if (data.code == 200) {
                        $(e).parents("tr").hide();
                    } else {
                        if (data.msg != "") {

                        }
                    }
                }
            });
        }
    });
}

/**
 * 更新分类排序
 * @param categoryId
 * @param e
 */
function updateIndex(categoryId,e){
    //alert(categoryId);
    //alert($(e).val());
    var indexId = $(e).val();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/community/category/changeindex",
        data: {categoryId:categoryId,indexId:indexId},
        success: function (data) {
            if (data.code == 200) {
                alert("修改排序成功")
            } else {
                if (data.msg != "") {

                }
            }
        }
    });
}
/**
 * 社区添加到分类
 * @param categoryId
 * @param communityId
 * @param e
 */
function addCategory(categoryId,communityId,e){
    var c = $(e).text();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/community/addcategory",
        data: {categoryId:categoryId,communityId:communityId},
        success: function (data) {
            if (data.code == 200) {
                alert("已添加至"+c);
            } else {
                if (data.msg != "") {

                }
            }
        }
    });
}

/**
 * 将社区从分类中去除
 * @param categoryId
 * @param communityId
 * @param e
 */
function removeCommunity(categoryId,communityId,e){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/community/category/removecommunity",
        data: {categoryId:categoryId,communityId:communityId},
        success: function (data) {
            if (data.code == 200) {
                $(e).parents("tr.success").hide();
            } else {
                if (data.msg != "") {

                }
            }
        }
    });
}
/**
 * 推荐到社区
 * @param communityId
 * @param recommend
 * @param e
 */
function recommend(communityId,recommend,e){
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/community/recommend",
        data: {communityId:communityId,recommend:recommend},
        success: function (data) {
            if (data.code == 200) {
                if(recommend){
                    $(e).removeClass("btn-primary").html("推荐成功");
                }else{
                    $(e).removeClass("bnt-inverse").html("去除成功");
                }

            } else {
                if (data.msg != "") {

                }
            }
        }
    });
}
/**
 * 修改分类信息
 * @param id
 */
function showUpdateCat(id){
    $("#s_"+id).hide();
    $("#d_"+id).show();
}
/**
 * 修改分类信息
 * @param id
 * @param e
 */
function updateCategoryName(id,e){
    var name = $("#i_"+id).val();
    if (name.length<1) return;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/community/category/updatename",
        data: {categoryId:id,categoryName:name},
        success: function (data) {
            if (data.code == 200) {
                $(e).html("修改成功");
                $("#d_"+id).hide(1000);
                $("#s_"+id).html(name).show();
            } else {
                if (data.msg != "") {

                }
            }
        }
    });
}
/**
 * 创建分类
 * @returns {boolean}
 */
function createCategory(){

    var name = $("#cat_i_name").val();
    var index = $("#cat_s_index").val();

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/community/category/add",
        data: {categoryName:name,indexId:index},
        success: function (data) {
            if (data.code == 200) {

                $("#cat_t_list").prepend("<tr><td>列表</td><td>"+data.data.name+"</td><td>"+data.data.index_id+"</td><td>添加成功</td></tr>");
            } else {
                if (data.msg != "") {

                }
            }
        }
    });

    return false;
}
/**
 * 删除分类
 * @param id
 * @param e
 */
function removeCategory(id,e){
    if(confirm("确定要删除此分类吗？")){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/community/category/del",
            data: {categoryId:id},
            success: function (data) {
                if (data.code == 200) {
                    $(e).parents("tr").hide();
                } else {
                    if (data.msg != "") {

                    }
                }
            }
        });
    }
}

function updateCategoryBelong(id,e){
    var app = $(e).val();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/community/category/changecategorybelong",
        data: {categoryId:id,app:app},
        success: function (data) {
            if (data.code == 200) {
                alert("修改排序成功")
            } else {
                if (data.msg != "") {

                }
            }
        }
    });
}

function updateCommunityBelong(id,e){
    var app = $(e).val();
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: appName + "/community/changecommunitybelong",
        data: {communityId:id,app:app},
        success: function (data) {
            if (data.code == 200) {
                alert("修改排序成功")
            } else {
                if (data.msg != "") {

                }
            }
        }
    });
}
