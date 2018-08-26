define(function(require, exports, module) {
	require("../common/common");
	require("../../modules/plugin/datepicker.zh-CN.js");
	require("../../modules/plugin/jquery.gritter.min");
	require("../../modules/plugin/bootbox.min");
	require("../../modules/plugin/jquery.hotkeys.min");
	require("../../modules/plugin/bootstrap-wysiwyg.min");

	
	getChat(roomId,senderId);
	

	// 聊天室聊天记录或者个人聊天信息
	function getChat(roomId,senderId) {
			$.ajax({
				type : 'get',
				dataType : 'json',
				url : appName + "/im/view",
				data : {
					room_id : roomId,
					sender_id:senderId
					
				},
				success : function(data) {
					
					
					//显示赛事信息
					if(data.contest!=null){
					var contestHtmlStr = buildContestHtml(data.contest);
					$("#contestInfo").html(contestHtmlStr);
					}
					
					//显示过滤按钮
					var sortHtmlStr = buldSortHtml(data.sender_id,data.room_id,appName);
					$("#sortCondition").html(sortHtmlStr);
					
					//显示聊天记录
					if (data.chats != null) {
						if (data.chats.length > 0) {
							
							
							
							// 加载数据
							$.each(data.chats, function(index, chat) {
								var htmlStr = null;
								htmlStr = buildChatHtml(chat,appName);
								$("#chat_table tbody").append(htmlStr);
							});

						} else {
							$.gritter.add({
								title : '无数据！',
								time : 2000,
								class_name : 'gritter-info gritter-light'
							});
						}
						loadFlag = false;
					} else {
						if(data.code != null){
							$.gritter.add({
								title : "出现" + data.code + "异常",
								time : 2000,
								class_name : 'gritter-error gritter-light'
							});	
						}
						if (data.msg != "") {
							$.gritter.add({
								title : data.msg,
								time : 2000,
								class_name : 'gritter-error gritter-light'
							});
						} else {
							$.gritter.add({
								title : "出现未知异常",
								time : 2000,
								class_name : 'gritter-error gritter-light'
							});
						}
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$.gritter.add({
						title : XMLHttpRequest.status,
						text : XMLHttpRequest.statusText,
						time : 2000,
						class_name : 'gritter-error gritter-center'
					});
				}
			});
	}
	//筛选按钮
	function buldSortHtml(sender_id,room_id,appName) {
		
		  var htmlArray = [];
//		  if(room_id!=-1){//点击进入所以聊天记录
//			  htmlArray.push(" <button type=\"button\">");
//				htmlArray.push("<a href="+appName+"/im/chat?"+"roomId="+-1+">");
//				htmlArray.push("全部");
//				htmlArray.push("</a>");
//			  htmlArray.push(" </button>");
//		  }
		 
		  if(room_id>0&&sender_id!=null){  //点击删除该按钮，查看整个房间消息
			  htmlArray.push("<button type=\"button\" class=\"btn btn-default\">");
			  htmlArray.push("<a style=\"text-decoration:none\" href="+appName+"/im/chat?"+"room_id="+room_id+">");
				htmlArray.push("用户"+room_id);
				htmlArray.push("&nbsp;&nbsp;");
				htmlArray.push("<button type=\"button\" style=\"color:red; text-align:center\">X</button>");
				htmlArray.push("</a>");
				 htmlArray.push("</button>");
		  }
		  if(room_id>0&&sender_id!=null){  //删除该条件，查看个人的所有聊天记录
			  htmlArray.push("<button type=\"button\" class=\"btn btn-default\">");
			  htmlArray.push("<a style=\"text-decoration:none\" href="+appName+"/im/chat?"+"sender_id="+sender_id+">");
				htmlArray.push("房间"+room_id);
				htmlArray.push("&nbsp;&nbsp;");
				htmlArray.push("<button type=\"button\" style=\"color:red; text-align:center\">X</button>");
				htmlArray.push("</a>");
				 htmlArray.push("</button>");
		  }
		  if(room_id>0&&sender_id==null){  //点击删除该按钮，显示所有聊天记录
			  htmlArray.push("<button type=\"button\" class=\"btn btn-default\">");
			  htmlArray.push("<a style=\"text-decoration:none\" href="+appName+"/im/chat?"+"room_id="+-1+">");
				htmlArray.push("房间"+room_id);
				htmlArray.push("&nbsp;&nbsp;");
				htmlArray.push("<button type=\"button\" style=\"color:red; text-align:center\">X</button>");
				htmlArray.push("</a>");
			 htmlArray.push("</button>");
		  }
		  
		/*  if(room_id==null&&sender_id!=null){  //点击删除该按钮，显示所有聊天记录
			  
			  htmlArray.push("<button type=\"button\" class=\"btn btn-default\">");
			  htmlArray.push("<a style=\"text-decoration:none\" href="+appName+"/im/chat?"+"room_id="+-1+">");
				htmlArray.push("房间"+room_id);
				htmlArray.push("&nbsp;&nbsp;");
				htmlArray.push("<button type=\"button\" style=\"color:red; text-align:center\">X</button>");
				htmlArray.push("</a>");
			  htmlArray.push("</button>");
		  }*/
		  
		return   htmlArray.join("");
		}
		
	
	// 赛事信息记录
	function buildContestHtml(contest) {
		
	  var htmlArray = [];
	  
	  htmlArray.push("<table class=\"table table-striped table-bordered table-hover\">");
	  htmlArray.push("<thead>");
	  htmlArray.push("<tr>");
	  htmlArray.push("<th class=\"center width-10\">类型</th>");
	  htmlArray.push("<th class=\"center width-10\">赛事id</th>");
	  htmlArray.push("<th class=\"center width-10\">联赛</th>");
	  htmlArray.push("<th class=\"center width-10\">主队</th>");
	  htmlArray.push("<th class=\"center width-10\">客队</th>");
	  htmlArray.push("<th class=\"center width-10\">开始时间</th>");

	  htmlArray.push("</tr>");
	  htmlArray.push("</thead>");
	  htmlArray.push("<tbody>");
	  htmlArray.push("<tr id='contest" + contest.contest_id + "'>");
	  
	  
	  if(contest.contest_type == 1){ //篮球
		  htmlArray.push("<td class='center'>");
		  htmlArray.push("篮球");
		  htmlArray.push("</td>");
	  }else if(contest.contest_type == 0){
		  htmlArray.push("<td class='center'>");
		  htmlArray.push("足球");
		  htmlArray.push("</td>");
	  }
	  
	  htmlArray.push("<td class='center'>");
	  htmlArray.push(contest.contest_id);
	  htmlArray.push("</td>");
	  
	  htmlArray.push("<td class='center'>");
	  htmlArray.push(contest.cup_name);
	  htmlArray.push("</td>");
	  
	  htmlArray.push("<td class='center'>");
	  htmlArray.push(contest.h_t.name);
	  htmlArray.push("</td>");
	  
	  htmlArray.push("<td class='center'>");
	  htmlArray.push(contest.a_t.name);
	  htmlArray.push("</td>");
	  
	  
	  htmlArray.push("<td class='center'>");
	  htmlArray.push(contest.start_time);
	  htmlArray.push("</td>");
	  
	 
	  htmlArray.push("</tr>");
	  htmlArray.push("</tbody>");
	  htmlArray.push("</table>");
	return   htmlArray.join("");
	}
	
	

	// 聊天记录
	function buildChatHtml(chat,appName) {
		
		var btn_html_pin = "<li>屏蔽<ul class=\"ul-left\">"
			+ "<li><button "
			+ " class=\"btn btn-xs ping-yi-fen btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"屏蔽\" value=\"600\"><i class=\"icon-share-alt bigger-150\">屏蔽10分</i></button></li>"
			+ "<li><button "
			+ " class=\"btn btn-xs ping-yi-h btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"屏蔽\" value=\"3600\"><i class=\"icon-share-alt bigger-150\">屏蔽1时</i></button></li>"
			+ "<li><button "
			+ " class=\"btn btn-xs ping-yi-day btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"屏蔽\" value=\"86400\"><i class=\"icon-share-alt bigger-150\">屏蔽1天</i></button></li>"
			+ "<li><button "
			+ " class=\"btn btn-xs ping-yi-week btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"屏蔽\" value=\"604800\"><i class=\"icon-share-alt bigger-150\">屏蔽1周</i></button></li>"
			
			+ "<li><button "
			+ " class=\"btn btn-xs ping-yi-week btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"屏蔽\" value=\"0\"><i class=\"icon-share-alt bigger-150\">永久屏蔽</i></button></li>"
			
			+"</ul></li>";

			
		var btn_html_jin = "<li>禁言<ul class=\"ul-rigth\">"
			    + "<li><button "
				+ " class=\"btn btn-xs  btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"禁言\" value=\"600\"><i class=\"icon-share-alt bigger-150\">禁言10分</i></button></li>"
		        + "<li><button "
				+ " class=\"btn btn-xs  btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"禁言\" value=\"3600\"><i class=\"icon-share-alt bigger-150\">禁言1时</i></button></li>"
		        + "<li><button "
				+ " class=\"btn btn-xs  btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"禁言\" value=\"86400\"><i class=\"icon-share-alt bigger-150\">禁言1天</i></button></li>"
		        + "<li><button "
				+ " class=\"btn btn-xs  btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"禁言\" value=\"604800\"><i class=\"icon-share-alt bigger-150\">禁言1周</i></button></li>"
				 + "<li><button "
					+ " class=\"btn btn-xs  btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"禁言\" value=\"0\"><i class=\"icon-share-alt bigger-150\">永久禁言</i></button></li>"
				
		        +"</ul></li>";
		var btn_html_del = "<button id='room_chat_del"
				+ chat.msgId
				+ "' class=\"btn btn-xs btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"删除\"><i class=\"icon-trash bigger-150\">删除</i></button>";
		// 1表示被禁言
		if (chat.userStatu == 0) {
			btn_html_pin = 
				      "<li><button "
					+ " class=\"btn btn-xs  btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"解除屏蔽\"><i class=\"icon-share-alt bigger-150\">解除禁言</i></button></li>";
		}
		
		var htmlArray = [];
		
		htmlArray.push("<tr id='msg" + chat.msgId + "'>");
		htmlArray.push("<td class='center'>");
		htmlArray.push(chat.msgId);
		htmlArray.push("</td>");
		htmlArray.push("<td class='center'>");
		if(chat.gender == 1){
			htmlArray.push("<i class='icon-male blue'></i>");	
		} else if(chat.gender == 2){
			htmlArray.push("<i class='icon-female red'></i>");
		} else {
			htmlArray.push("<i class='icon-heart-empty gray'></i>");
		}
		//添加a链接，可以点击进去个人聊天纪录
		htmlArray.push("<a href="+appName+"/im/chat?"+"room_id="+chat.receiverId+"&sender_id="+chat.senderId+">");
			
		htmlArray.push("&nbsp;" + chat.name + "<span class='smaller-80'>[" + chat.senderId + "]</span>");
		
		htmlArray.push("</a>");
		
		htmlArray.push("</td>");
		htmlArray.push("<td class='left imContain'>");
		htmlArray.push(chat.body);
		htmlArray.push("</td>");
		htmlArray.push("<td class='center'>");
		if(chat.receiverId == 101){
			htmlArray.push("发送者错误");	
		} else if(chat.receiverId == 102){
			htmlArray.push("用户被屏蔽");	
		} else if(chat.receiverId == 103){
			htmlArray.push("房间已关闭");	
		} else if(chat.receiverId == 104){
			htmlArray.push("房间已删除");	
		} else {
			//点击房间，进入带有赛事信息的房间了解记录
			htmlArray.push("<a href="+appName+"/im/chat?"+"room_id="+chat.receiverId+">");
			htmlArray.push("房间[" + chat.receiverId + "]");
			htmlArray.push("</a>");
		}
		htmlArray.push("</td>");
		htmlArray.push("<td class='center'>");
		htmlArray.push("<div>");
		htmlArray.push("<ul class=\"im-out-ul\">");
		htmlArray.push(btn_html_pin);
		htmlArray.push(btn_html_jin);
		htmlArray.push(btn_html_del);
		htmlArray.push("</ul>");
		htmlArray.push("</div>");
		htmlArray.push("</td>");
		
		return htmlArray.join("");
	}

	// 删除
	$('#chat_table tbody').on(
			'click',
			'button.btn-danger',
			function() {
				var tmpTr = $(this).closest("tr");
				// 获取记录id
				var msg_id = tmpTr.find("td:eq(0)").html();
				// roomId
				// 请求赔率数据
				$.ajax({
					type : 'POST',
					dataType : 'json',
					url : appName + "/im/delete",
					data : {
						"msg_id" : msg_id,
						"room_id" : roomId
					},
					success : function(data) {
						if (data.code == 200) {
							 $.gritter.add({
					              title: '删除成功！',
					              time:2000,
					              class_name: 'gritter-info gritter-center'
					          });
							location.reload();
						} else {
							$.gritter.add({
					              title: '删除失败！',
					              time:2000,
					              class_name: 'gritter-error gritter-center'
					          });
						}
					},
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                    $.gritter.add({
	                        title: XMLHttpRequest.status,
	                        text: XMLHttpRequest.statusText,
	                        time: 2000,
	                        class_name: 'gritter-error gritter-center'
	                    });
	                }
				});
			});
	// 屏蔽用户
	$('#chat_table tbody').on(
			'click',
			'button.btn-warning',
			function() {
				var tmpTr = $(this).closest("tr");
				// 获取记录id
				var idText = tmpTr.find("td:eq(1)").html();
				var userId = idText.substring(idText.indexOf("[")+1,idText.indexOf("]"));;
				var seconds = this.value;
				// roomId
				// 请求赔率数据
				$.ajax({
					type : 'POST',
					dataType : 'json',
					url : appName + "/im/gagUser",
					data : {
						"id" : userId,
						"level" : 2,
						"seconds" : seconds
					},
					success : function(data) {
						if (data.code == 200) {
							 $.gritter.add({
					              title: '屏蔽成功！',
					              time:2000,
					              class_name: 'gritter-info gritter-center'
					          });
						} else {
							 $.gritter.add({
					              title: '屏蔽失败！',
					              time:2000,
					              class_name: 'gritter-error gritter-center'
					          });
						}
					},
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                    $.gritter.add({
	                        title: XMLHttpRequest.status,
	                        text: XMLHttpRequest.statusText,
	                        time: 2000,
	                        class_name: 'gritter-error gritter-center'
	                    });
	                }
				});
			});

	// 解除屏蔽用户
	$('#chat_table tbody').on(
			'click',
			'button.btn-success',
			function() {
				var tmpTr = $(this).closest("tr");
				// 获取记录id
				var idText = tmpTr.find("td:eq(1)").html();
				var userId = idText.substring(idText.indexOf("[")+1,idText.indexOf("]"));;
				// roomId
				// 请求赔率数据
				$.ajax({
					type : 'POST',
					dataType : 'json',
					url : appName + "/im/unGagUser",
					data : {
						"id" : userId
					},
					success : function(data) {
						if (data.code == 200) {
							 $.gritter.add({
					              title: '解除屏蔽成功！',
					              time:2000,
					              class_name: 'gritter-info gritter-center'
					          });
							 location.reload();
						} else {
							 $.gritter.add({
					              title: '解除屏蔽失败！',
					              time:2000,
					              class_name: 'gritter-error gritter-center'
					          });
						}
					},
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                    $.gritter.add({
	                        title: XMLHttpRequest.status,
	                        text: XMLHttpRequest.statusText,
	                        time: 2000,
	                        class_name: 'gritter-error gritter-center'
	                    });
	                }
				});
			});

	// 禁言用户
	$('#chat_table tbody').on(
			'click',
			'button.btn-info',
			function() {
				var tmpTr = $(this).closest("tr");
				// 获取记录id
				var idText = tmpTr.find("td:eq(1)").html();
				var userId = idText.substring(idText.indexOf("[")+1,idText.indexOf("]"));;
				var seconds = this.value;
				// roomId
				// 请求赔率数据
				$.ajax({
					type : 'POST',
					dataType : 'json',
					url : appName + "/im/gagUser",
					data : {
						"id" : userId,
						"level" : 1,
						"seconds" : seconds
					}, // level==1表示禁言
					success : function(data) {
						if (data.code == 200) {
							 $.gritter.add({
					              title: '禁言成功！',
					              time:2000,
					              class_name: 'gritter-info gritter-center'
					          });
							 location.reload();
						} else {
							 $.gritter.add({
					              title: data.msg,
					              time:2000,
					              class_name: 'gritter-error gritter-center'
					          });
						}
					},
	                error: function (XMLHttpRequest, textStatus, errorThrown) {
	                    $.gritter.add({
	                        title: XMLHttpRequest.status,
	                        text: XMLHttpRequest.statusText,
	                        time: 2000,
	                        class_name: 'gritter-error gritter-center'
	                    });
	                }
				});
			});
});