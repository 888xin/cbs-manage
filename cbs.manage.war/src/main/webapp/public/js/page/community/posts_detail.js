define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min.js");
    require("../../modules/plugin/jquery.dataTables.bootstrap");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");

  // 常量定义
	var image_url = "http://7xl7ku.com2.z0.glb.qiniucdn.com/";
  
   function init(){
	   /**
	    * 注册回复评论事件
	    */
	   var addCommentBtn = $('[name="addCommentBtn"]');
	   addCommentBtn.on("click", function() {
		   $("#modal_comment_add").modal({
				backdrop : 'static'
			});
		});
	   $("#postId").val(addCommentBtn.attr("id"));
	   
	   /**
	    * 注册回复一级评论事件
	    */
	   $('[name="addReplyBtn"]').each(function() {
		   var ids = this.id.split("+");
		   var commentId = ids[0] ;
		   var toUserId = ids[1];
//		   console.log(commentId+";"+toUserId);
		   $(this).on("click", function() {
			   $("#addreplyform_toUserId").val(toUserId);
			   $("#addreplyform_commentId").val(commentId);
			   $("#modal_reply_add").modal({
					backdrop : 'static'
				});
			});
		});
	   
	   /**
	    * 注册回复用户事件
	    */
	   $('[name="replyUserBtn"]').each(function() {
		   var ids = this.id.split("+");
		   var commentId = ids[0] ;
		   var toUserId = ids[1];
		   var toReplyId = ids[2];
//		   console.log("回复用户"+commentId+";"+toUserId+";"+toReplyId);
		   $(this).on("click", function() {
			   $("#addreplyform_toUserId").val(toUserId);
			   $("#addreplyform_commentId").val(commentId);
			   $("#addreplyform_replyId").val(toReplyId);
			   $("#modal_reply_add").modal({
					backdrop : 'static'
				});
			});
		});
	   
   }
   /**
    * 注册添加评论确认事件
    */
   $("#modal_comment_add_confirm_btn").on("click", function() {
	   $("#model_comment_add_form").submit();
	});
   
   /**
    * 注册添加回复确认事件
    */
   $("#modal_reply_add_confirm_btn").on("click", function() {
		var commentId = $("#addreplyform_commentId").val();
		var toUserId = $("#addreplyform_toUserId").val();
		var content = $("#addreplyform_content").val();
		var userId = $("#addreplyform_userId").val();
		var postId = $("#addreplyform_postId").val();
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : appName + "/community/posts/addReply",
			data : {
				commentId : commentId,
				content : content,
				toUserId : toUserId,
				userId : userId
			},
			success : function(data) {
				if (data.code == 200) {
					$.gritter.add({
						title : "添加成功",
						time : 1000,
						class_name : 'gritter-success gritter-center gritter-light'
					});
					$("#modal_reply_add").modal('hide');
					//刷新页面
					window.location.href='./'+postId; 
				} else {
					$("#modal_reply_add").modal('hide');
				}
			},
			error : function(XMLHttpRequest) {
				$.gritter.add({
					title : "添加失败",
					time : 1000,
					class_name : 'gritter-success gritter-center gritter-light'
				});
				$("#modal_reply_add").modal('hide');
			}
		});
	});
   
   init();
})