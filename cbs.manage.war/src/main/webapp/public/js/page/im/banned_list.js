define(function(require, exports, module) {
	require("../common/common");
	require("../../modules/plugin/datepicker.zh-CN.js");
	require("../../modules/plugin/jquery.gritter.min");
	require("../../modules/plugin/bootbox.min");
	require("../../modules/plugin/jquery.hotkeys.min");
	require("../../modules/plugin/bootstrap-wysiwyg.min");
	
	var status=3;

	getBanneds();
	
    $("#status").on('change', function() {
    	status=$("#status").val();
    	getBanneds();
    });

	// 聊天室聊天记录
	function getBanneds() {
		$.ajax({
			type : 'get',
			dataType : 'json',
			url : appName + "/im/getAsyBanned",
			data : {status:status},
			success : function(data) {
				if (data != null) {
					//清空原有的数据
					$("#banned_table tbody tr").remove();
					if (data.blocks.length > 0) {

						// 加载数据
						$.each(data.blocks, function(index, block) {
							var htmlStr = null;
							htmlStr = showBanned(block.userResponse.accountId,
									block.userResponse.name, block.userResponse.photoPath,
									block.userResponse.longNO, block.status,
									block.remove_time,block.id);

							$("#banned_table tbody").append(htmlStr);
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
					$.gritter.add({
						title : "出现" + data.code + "异常",
						time : 2000,
						class_name : 'gritter-error gritter-light'
					});
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

	// 聊天记录
	function showBanned(user_id,name,photoPath,long_no,status,remove_time,id) {

		var btn_html_release = "<button id='user_release"
				+ user_id
				+ "' class=\"btn btn-xs btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"解开\"><i class=\"icon-trash bigger-150\">解开</i></button>";
		// 3禁言  1屏蔽
		if (status == 3) {  //禁言
			status = "禁言";
		}else if (status==1){//屏蔽
			status = "屏蔽";
		}
		remove_time=new Date(remove_time).pattern("yyyy-MM-dd HH:mm:ss");
		var user_info="<div>用户id："+user_id+"</div><div>龙号："+long_no+"</div><div>用户名："+name+"</div>";
		var htmlStr = "<tr>"
				+"<td class=\"center\"><img width='80' height='80' class=\"nav-user-photo\" src='" +"http://proxy.dev.xy.l99.com/image.php?type=avatar50&amp;ifile="+ photoPath + "'/></td>"
				+ "<td class=\"center\">"+ user_info + "</td>"
				+ "<td class=\"center\">"+ status + "</td>"
				+ "<td class=\"center\">"+ remove_time + "</td>"
				+ "<td class=\"hidden\">"+ user_id + "</td>"
				+ "<td class=\"hidden\">"+ id + "</td>"
				// 编辑按钮
				+"<td class=\"center\"><div>"+btn_html_release+ "</div></td>"
				+ "</tr>";
		return htmlStr;
	}

	// 解除被 （禁言与屏蔽） 的用户
	$('#banned_table tbody').on(
			'click',
			'button.btn-info',
			function() {
				var tmpTr = $(this).closest("tr");
				// 获取记录id
				var id = tmpTr.find("td:eq(5)").html();
				// roomId
				// 请求赔率数据
				$.ajax({
					type : 'POST',
					dataType : 'json',
					url : appName + "/im/unGagUser",
					data : {
						"id" : id
					}, // level==1表示禁言
					success : function(data) {
						if (data.code == 200) {
							$.gritter.add({
								title : '解除成功！',
								time : 2000,
								class_name : 'gritter-info gritter-center'
							});
							location.reload();
						} else {
							$.gritter.add({
								title : data.msg,
								time : 2000,
								class_name : 'gritter-error gritter-center'
							});
						}
					},
					error : function(XMLHttpRequest) {
						$.bootstrapGrowl("出现" + XMLHttpRequest.status + "错误："
								+ XMLHttpRequest.statusText);
					}
				});
			});

			//单独用户屏蔽禁言
			$("#gagUser").on("click",function(){
				$("#long_no").val("");
				$("#modal_inform").modal({backdrop: 'static'});
			});

			$("#modal_gag_button").on("click",function(){
				var long_no=$("#long_no").val().trim();
				var level=$("#level").val();
				var seconds=$("#seconds").val();
				if(long_no==""){
					$.bootstrapGrowl("请输入龙号",{
						align: 'right'
					});
					return ;
				}
				if(window.confirm('确定要处理龙号为：'+long_no+'的用户？')){
					$.ajax({
						type : 'POST',
						dataType : 'json',
						url : appName + "/im/gagByLongNo",
						data : {
							"longno" : long_no,
							"level" : level,
							"seconds" : seconds,
						},
						success : function(data) {
							if (data.code == 200) {
								$.gritter.add({
									title : '成功！',
									time : 2000,
									class_name : 'gritter-info gritter-center'
								});
								status=3;
								$("#status").val(status);
								getBanneds();
							} else {
								$.gritter.add({
									title : data.msg,
									time : 2000,
									class_name : 'gritter-error gritter-center'
								});
							}
						},
						error : function(XMLHttpRequest) {
							$.bootstrapGrowl("出现" + XMLHttpRequest.status + "错误："
									+ XMLHttpRequest.statusText);
						}
					});
				}


			});


});