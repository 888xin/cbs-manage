define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min.js");
    require("../../modules/plugin/jquery.dataTables.bootstrap");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");

    var operateTr;
    
    var operateTr1 = "<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">"
		+ "<button class=\"detail btn btn-minier btn-info\" href=\"#\" data-toggle='tooltip' title='查看详情'>查看详情</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
		+ "<button class=\"deactive btn btn-minier btn-warning\" href=\"#\" data-toggle='tooltip' title='屏蔽评论'>屏蔽评论</button>"
		+ "</div>";
    
    var operateTr2 = "<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">"
		+ "<button class=\"detail btn btn-minier btn-info\" href=\"#\" data-toggle='tooltip' title='查看详情'>查看详情</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"
		+ "</div>";
    
    
    
    var userId=null;
    var postId=null;
    var commentId=null;
    var orderItem=null;
    var comments_table;
    var baseSrc="http://7xl7ku.com2.z0.glb.qiniucdn.com/";
    var avatarSrc="http://pic3.l99.com/";
    
    comments_table = $('#comments_table').dataTable({
        "bAutoWidth": true,
        "bProcessing": true,
        "bServerSide": true,
        "bStateSave": false, //是否保存cookie数据
        "bFilter": false,
        "aLengthMenu": [10,20,40],
        "iDisplayLength": 10,//每页显示个数
        "sAjaxDataProp" : "comments",
		"sAjaxSource" : appName + '/community/comments/list',
        "fnServerParams": function (aoData) {  //查询条件
            aoData.push(
                    { "name": "userId", "value": userId },
                    { "name": "postId", "value": postId },
                    { "name": "commentId", "value": commentId},
                    { "name": "orderItem", "value": orderItem}
            );
        },
        "oLanguage": {
            "sProcessing": "正在加载中......",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "没有数据！",
            "sEmptyTable": "表中无数据存在！",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoEmpty": "显示0到0条记录",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
            //"sInfoFiltered": "",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "末页"
            }
        },
        "aoColumnDefs": [
            {
                sDefaultContent: '',
                aTargets: [ '_all' ]
            }
        ],
        "aoColumns": [
						{
							"bSortable" : false,
							"sClass" : "center",
							"fnRender" : function(obj) {
								var sReturn = "<label><input type=\"checkbox\" class=\"ace\"/><span class=\"lbl\"></span></label>";
								return sReturn;
							}
						},
						{
							"mDataProp" : "postId",
							"bSortable" : false
						},
						{
							"mDataProp" : "id",
							"bSortable" : false
						},
						{
							"mDataProp" : "floorNum",
							"bSortable" : false
						},
						{
							"mDataProp" : "userId",
							"bSortable" : false
						},
						{
							"mDataProp" : "user.nickname",
							"bSortable" : false
						},
						{
							"mDataProp" : "content",
							"bSortable" : false
						},
						{
							"mDataProp" : "images",
							"bSortable" : false
						},
						{
							"mDataProp" : "createTime",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var dataFormat = new Date(obj.aData.createTime).toLocaleString();
								return dataFormat;
							}
						},
						{
							"mDataProp" : "status",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var sReturn = "";
								if (obj.aData.status == 1) {
									operateTr=operateTr1;
									sReturn = "<span class=\"label label-sm label-warning\">正常</span>";
								} else if (obj.aData.status == 0) {
									operateTr=operateTr2;
									sReturn = "<span class=\"label label-sm label-primary\">已屏蔽</span>";
								} 
								return sReturn;
							}
						}, {
							"bSortable" : false,
							"fnRender" : function(obj) {
								return operateTr;
							}
						}
				  ],
        fnDrawCallback: function () {
        }
    });
    

    $("#comments_table tbody").tooltip({
        hide: {
            delay: 100
        }
    });
    
    
    $("#comments_order").on("change", function () { //触发reports_table_status重新请求服务器
        orderItem = $(this).val();
        comments_table.fnDraw();
    });
    
    
    
    
    $("#search-comments_modal").bind('click', function () {
        var comment_id = $("#search-comments-id").val().trim();
        var user_id = $("#search-user-id").val().trim();
        var post_id = $("#search-posts-id").val().trim();
    	userId=user_id;
    	postId=post_id;
    	commentId=comment_id;
        comments_table.fnDraw();
    });
    
    //详情
    $('#comments_table tbody').on('click', 'button.detail', function () {
        var tmpTr = $(this).closest("tr");
        var commentId=tmpTr.find("td:eq(2)").html();
        //ajax请求
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: appName + "/community/comments/detail",
            data: {commentId:commentId},
            success: function (data) {
                if (data.code == 200) {
                	var comment=data.comment;
                	//comment_user
                	var nickname=comment.user.nickname;
                	var avatarUrl=comment.user.avatarUrl;
                	var time=new Date(comment.createTime).toLocaleString();
                	var html_comment_user='<div>'+nickname+':<br/><img src='+avatarSrc+avatarUrl+'!50x50 style="width:150px;height:150px;" ></img><br/>'+time+'</div>';
                	$("#comment_user").html(html_comment_user);
                	//comment_content
                	var content=comment.content;
                	var images=comment.images;
                	var html_images='';
                	var html_content='';
                	if(images instanceof Array){
                		for (var i=0;i<images.length;i++){
                			html_images+='<img src='+baseSrc+images[i]+' style="width:150px;height:150px;"></img><br/>';
                		}
                	}
                	 html_content='<div>'+content+'<br/>'+html_images+'</div>';
                	 $("#comment_content").html(html_content);
                	//comment_replies
                	var replies=comment.replies;
                	var html_replies='<div>';
                	if(replies instanceof Array){
                		for (var i=0;i<replies.length;i++){
                			html_replies+='&nbsp&nbsp&nbsp&nbsp'+replies[i].user.nickname+'	回复	'+replies[i].toUser.nickname+replies[i].content+'<br/>';
                		}
                	}
                	html_replies+='</div>';
                	$("#comment_replies").html(html_replies);
                } else {
                	$.bootstrapGrowl("出现" + data.code + "异常");
                    if (data.msg != "") {
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl("出现未知异常");
                    }
                }
            }
        });
        $("#modal_comment").modal({backdrop: 'static'});
    });
    
    
    $('#comments_table tbody').on('click', 'button.deactive', function () {
    	 var tmpTr = $(this).closest("tr");
         var commentId=tmpTr.find("td:eq(2)").html();
         deactiveCommentStatus(commentId);
    });
    
    $("#deactive").on('click', function () {
    	var comment_Ids='';
    	if($("#comments_table tbody tr").length>1){
            $("#comments_table tbody tr").each(function(){
                //checkbox 的值只有两种情况：选中和没选中，对应的值为：true false;
                var bool = $(this).children("td").eq(0).find("input:checkbox").prop("checked");
                if(bool){
                	comment_Ids+=$(this).children("td").eq(2).text()+',';
                }
            })
        }
    	deactiveCommentStatus(comment_Ids.substring(0,comment_Ids.length-1));
    });
    
    function deactiveCommentStatus(commentIds){
    	console.log(commentIds);
    	$.ajax({
            type: 'GET',
            dataType: 'json',
            url: appName + "/community/comments/deactive",
            data: {commentIds:commentIds},
            success: function (data) {
            	if ("success" == data) {
                	//刷新界面
                	comments_table.fnDraw();
                } else {
                	$.bootstrapGrowl("出现" + data.code + "异常");
                    if (data.msg != "") {
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl("出现未知异常");
                    }
                }
            }
        });
    }
    //全选 反选
    $("#checkall").on('click', function () {
    	console.log(this.checked);
    	if (this.checked == true) {
			$(".ace").each(function() {
				this.checked = true;
			});
		} else {
			$(".ace").each(function() {
				this.checked = false;
			});
    	} 
    });
    
    
})