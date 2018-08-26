define(function(require, exports, module) {
	require("../common/common");
	require("../../modules/plugin/jquery.gritter.min");
	var image_url = "http://roi.skst.cn/logo/";
	$("#search_team")
			.on(
					"click",
					function() {
						var team_name = $("#team_name").val().trim();
						var type = $("#type").val();
						if (team_name == "") {
							$.gritter.add({
								title : "请输入球队名或ID",
								time : 2000,
								class_name : 'gritter-error gritter-light'
							});
						} else {
							$
									.ajax({
										type : 'POST',
										dataType : 'json',
										url : appName
												+ "/event/editteam/search",
										data : {
											key : team_name,
											type : type
										},
										success : function(data) {
											if (data.code == 200) {
												//清空原有的数据
												$("#team_table tbody tr")
														.remove();
												if (data.number > 0) {
													//加载数据
													$
															.each(
																	data.teamList,
																	function(
																			index,
																			team) {
																		var htmlStr = showTeamData(
																				team.t_id,
																				team.target_id,
																				team.name,
																				team.logo,
																				team.name_en);
																		$(
																				"#team_table tbody")
																				.append(
																						htmlStr);
																	});
												} else {
													$.gritter
															.add({
																title : '服务器无数据返回！',
																time : 2000,
																class_name : 'gritter-info gritter-light'
															});
												}
											} else {
												$.gritter
														.add({
															title : "出现"
																	+ data.code
																	+ "异常",
															time : 2000,
															class_name : 'gritter-error gritter-light'
														});
												if (data.msg != "") {
													$.gritter
															.add({
																title : data.msg,
																time : 2000,
																class_name : 'gritter-error gritter-light'
															});
												} else {
													$.gritter
															.add({
																title : "出现未知异常",
																time : 2000,
																class_name : 'gritter-error gritter-light'
															});
												}
											}
										},
										error : function(XMLHttpRequest,
												textStatus, errorThrown) {
											$.gritter
													.add({
														title : XMLHttpRequest.status,
														text : XMLHttpRequest.statusText,
														time : 2000,
														class_name : 'gritter-error gritter-center'
													});
										}

									});
						}

					});

	function showTeamData(t_id, targetId, name, logo, name_en) {

		var htmlStr = "<tr class='list_class'>" + "<td class='hidden'>"
				+ t_id
				+ "</td>"
				+ "<td >"
				+ targetId
				+ "</td>"
				+ "<td>"
				+ name
				+ "</td>"
				+ "<td id='t_id"
				+ t_id
				+ "'>"
				+ "<img class=\"nav-user-photo\"  src='"
				+ image_url
				+ logo
				+ "' />"
				+ "</td>"
				+ "<td>"
				+ name_en
				+ "</td>"
				+ "<td><button class=\"btn btn-xs btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"编辑\"> <i class=\"icon-edit bigger-150\"></i></button></td>"
				+ "<td><button class=\"btn btn-xs btn-info-logo\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"logo编辑\"> <i class=\"icon-edit bigger-150\"></i></button></td>"
				+ "</tr>";
		return htmlStr;
	}

	$('#team_table tbody').on('click', 'button.btn-info', function() {
		var tmpTr = $(this).closest("tr");
		var team_id = tmpTr.find("td:eq(0)").html();
		var team_logo = tmpTr.find("td:eq(3)").html();
		var team_name = tmpTr.find("td:eq(2)").html();
		$("#team_logo").html(team_logo);
		$("#team_name_edit").val(team_name);
		$("#team_id_show").html(team_id);
		$("#modal_team_edit").modal({
			backdrop : 'static'
		});

	});

	$('#team_table tbody').on('click', 'button.btn-info-logo', function() {
		var tmpTr = $(this).closest("tr");
		var team_id = tmpTr.find("td:eq(0)").html();
		var team_name = tmpTr.find("td:eq(2)").html();
		var team_logo = tmpTr.find("td:eq(3)");
		var url = team_logo.find("img").attr("src");
		//获取到logo的名字id=logo_name
		var team_logo = url.replace("http://roi.skst.cn/logo/", "");//文件名
		$("#team_id").val(team_id);
		$("#team_name_logo").val(team_name);
		$("#logo_name").val(team_logo);
		$("#modal_logo_edit").modal({
			backdrop : 'static'
		});

	});

	function getTeam(id, type) {
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : appName + "/event/editteam/search",
			data : {
				key : id,
				type : type
			},
			success : function(data) {
				if (data.code == 200) {
					//清空原有的数据
					$("#team_table tbody tr").remove();
					if (data.number > 0) {
						//加载数据
						$.each(data.teamList, function(index, team) {
							var htmlStr = showTeamData(team.t_id,
									team.target_id, team.name, team.logo,
									team.name_en);

							$("#team_table tbody").append(htmlStr);
						});
					} else {
						$.gritter.add({
							title : '服务器无数据返回！',
							time : 2000,
							class_name : 'gritter-info gritter-light'
						});
					}
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

	$("#updateImgButton").on("click", function() {
		//获得输入的值
		var type = $("#type").val();
		var team_id = $("#team_id").val();
		var team_name = $("#team_name_logo").val();
		var team_img =  $("#logo_name_new").val();
		
		update(type, team_id, team_name, team_img);
	});
	
	//更改球队名字
	$("#modal_team_edit_button").on("click", function() {
		//获得输入的值
		var type = $("#type").val();
		var team_id = $("#team_id_show").html();
		var team_name = $("#team_name_edit").val();
		
		
		
		var url = $("#team_logo").find("img").attr("src");
		//获取到logo的名字id=logo_name
		var team_img = url.replace("http://roi.skst.cn/logo/", "");//文件名
		
		update(type, team_id, team_name, team_img);
	});

	
	function update(type, team_id, team_name, team_logo) {
		//异步提交
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : appName + "/event/editteam/edit",
			data : {
				type : type,
				id : team_id,
				name : team_name,
				logo : team_logo
			},
			success : function(data) {
				if (data.code == 200) {
					$.gritter.add({
						title : '修改成功！',
						time : 2000,
						class_name : 'gritter-info gritter-light'
					});
					$("#team_name").val(team_id);
					$("#type").val(type);
					getTeam(team_id, type);
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
});
