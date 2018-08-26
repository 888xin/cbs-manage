define(function(require, exports, module) {
	require("../common/common");
	require("../../modules/plugin/jquery-ui-1.10.3.full.min.js");
	require("../../modules/lib/jquery-2.0.3.min");
	require("../../modules/plugin/jquery.dataTables.bootstrap");
	require("../../modules/plugin/jquery.gritter.min");
	require("../../modules/plugin/bootbox.min");

	// 常量定义
	var image_url = "http://7xl7ku.com2.z0.glb.qiniucdn.com/";
	// 变量定义
	var plusImageSrc = $('#post_add_images1').attr("src");
	var id = null;
	var status = null;
	var app = null;
	var type = null;
	var hot = null;
	var communityId = null;
	var title = null;
	var orderBy = "commenttime_desc";
	var timeRange = null;
	var editId = null;

	var orders_table;
	orders_table = $('#posts_table').dataTable(
			{
				"bAutoWidth" : true,
				"bProcessing" : true,
				"bServerSide" : true,
				"bStateSave" : false, // 是否保存cookie数据
				"bFilter" : false,
				// "aLengthMenu" : [ 20 ],
				// "iDisplayLength" : 20,// 每页显示个数
				"sAjaxDataProp" : "posts",
				"sAjaxSource" : appName + '/community/posts/list',
				"fnServerParams" : function(aoData) { // 查询条件
					aoData.push({
						"name" : "id",
						"value" : id
					}, {
						"name" : "status",
						"value" : status
					}, {
						"name" : "app",
						"value" : app
					}, {
						"name" : "type",
						"value" : type
					}, {
						"name" : "hot",
						"value" : hot
					}, {
						"name" : "communityId",
						"value" : communityId
					}, {
						"name" : "title",
						"value" : title
					}, {
						"name" : "orderBy",
						"value" : orderBy
					});
				},
				"oLanguage" : {
					"sProcessing" : "正在加载中......",
					"sLengthMenu" : "每页显示 _MENU_ 条记录",
					"sZeroRecords" : "没有数据！",
					"sEmptyTable" : "表中无数据存在！",
					"sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
					"sInfoEmpty" : "显示0到0条记录",
					"sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
					// "sInfoFiltered": "",
					"oPaginate" : {
						"sFirst" : "首页",
						"sPrevious" : "上一页",
						"sNext" : "下一页",
						"sLast" : "末页"
					}
				},
				"aoColumnDefs" : [ {
					sDefaultContent : '',
					aTargets : [ '_all' ]
				} ],
				"aoColumns" : [
						{
							"mDataProp" : "id",
							"sClass" : "center",
							"bSortable" : false
						},
						{
							"mDataProp" : "status",
							"sClass" : "center",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var post = obj.aData;
								var status = post.status;
								if (status == 1) {
									return "有效";
								} else {
									return "无效";
								}
							}
						},
						{
							"mDataProp" : "type",
							"sClass" : "center",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var post = obj.aData;
								var type = post.type;
								if (type == 1) {
									return "置顶";
								} else if (type == 2) {
									return "加精";
								} else {
									return "普通";
								}
							}
						},
						{
							"mDataProp" : "hot",
							"sClass" : "center",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var post = obj.aData;
								var hot = post.hot;
								if (hot == true) {
									return "热帖";
								} else {
									return "否";
								}
							}
						},
						{
							"mDataProp" : "community.name",
							"bSortable" : false,
						},
						{
							"mDataProp" : "community.belongApp",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var post = obj.aData;
								var belongApp = post.community.belongApp;
								if (belongApp == 1) {
									return "体育头条";
								} else if (belongApp == 0) {
									return "大赢家";
								} else {
									return "所有";
								}
							}
						},
						{
							"mDataProp" : "title",
							"sClass" : "center",
							"bSortable" : false,
						},
						{
							"mDataProp" : "videoPreviewUrl",
							"sClass" : "center",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var image = obj.aData.videoPreviewUrl;
								if (image == null || image.length == 0) {
									return "";
								}
								return "<img width='140' height='140' class=\"nav-user-photo\" src='" + image_url + image + "' />";
							}
						},
						{
							"mDataProp" : "videos",
							"sClass" : "center",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var videos = obj.aData.videos;
								if (videos == null || videos.length == 0) {
									return "";
								}
								var video = videos[0];
								return "<video src='" + image_url + video + "' controls=\"controls\" height='100' width='200'>your browser does not support the video tag</video>";
							}
						},
						{
							"mDataProp" : "images",
							"sClass" : "center",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var images = obj.aData.images;
								if (images == null || images.length == 0) {
									return "";
								}
								var image = images[0];
								return "<img width='140' height='140' class=\"nav-user-photo\" src='" + image_url + image + "' />";
							}
						},
						{
							"mDataProp" : "likeNum",
							"sClass" : "center",
							"bSortable" : false
						},
						{
							"mDataProp" : "commentNum",
							"sClass" : "center",
							"bSortable" : false
						},
						{
							"mDataProp" : "createTime",
							"sClass" : "center",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var dataFormat = new Date(obj.aData.createTime).pattern("yyyy-MM-dd HH:mm:ss");
								return dataFormat;
							}
						},
						{
							"mDataProp" : "commentTime",
							"sClass" : "center",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var dataFormat = new Date(obj.aData.commentTime).pattern("yyyy-MM-dd HH:mm:ss");
								return dataFormat;
							}
						},
						{
							"sClass" : "center",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var post = obj.aData;
								var detailString = "<a id='post_detail_" + post.id + "'class=\"post_detail\" target=\"_blank\" href=\"./detail/" + post.id
										+ "\" data-toggle='tooltip' title='详情'><i class=\"icon-zoom-in bigger-130\"></i></a>";
								var deteleteString = "<a id='goods_delete_" + post.id
										+ "'class=\"post_delete\" href=\"#\" data-toggle='tooltip' title='删除'><i class=\"icon-remove-circle bigger-130\"></i></a>";
								var hotString = "<a id='goods_hot_" + post.id
										+ "'class=\"post_hot\" href=\"#\" data-toggle='tooltip' title='设置热帖'><i class=\"icon-cog bigger-130\"></i></a>";
								var typeString = "<a id='post_type_" + post.id
										+ "'class=\"post_type\" href=\"#\" data-toggle='tooltip' title='设置类型'><i class=\"icon-cog bigger-130\"></i></a>";
								return detailString + deteleteString + hotString + typeString;
							}
						} ],
				fnDrawCallback : function() {
				}
			});

	/**
	 * 删除帖子
	 */
	var deleteId = null;
	orders_table.on('click', 'a.post_delete', function(e) {
		e.preventDefault();
		deleteId = $(this).attr("id").substring(13);
		$("#modal_post_delete").modal({
			backdrop : 'static'
		});
	});
	$("#modal_post_delete_confirm_btn").on("click", function() {
		var hot = $("#post_edit_hot").val();
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : appName + "/community/posts/delete",
			data : {
				id : deleteId
			},
			success : function(data) {
				if (data.code == 200) {
					$.gritter.add({
						title : "删除成功",
						time : 1000,
						class_name : 'gritter-success gritter-center gritter-light'
					});
					$("#modal_post_delete").modal('hide');
					// 重新刷新
					orders_table.fnDraw();
				} else {
					$("#modal_post_delete").modal('hide');
				}
			},
			error : function(XMLHttpRequest) {
				$("#modal_post_delete").modal('hide');
			}
		});
	});
	/**
	 * 修改热帖
	 */
	orders_table.on('click', 'a.post_hot', function(e) {
		e.preventDefault();
		editId = $(this).attr("id").substring(10);
		$("#modal_post_edit_hot").modal({
			backdrop : 'static'
		});
	});
	$("#modal_post_edit_hot_confirm_btn").on("click", function() {
		var hot = $("#post_edit_hot").val();
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : appName + "/community/posts/hot",
			data : {
				id : editId,
				hot : hot
			},
			success : function(data) {
				if (data.code == 200) {
					$.gritter.add({
						title : "修改成功",
						time : 1000,
						class_name : 'gritter-success gritter-center gritter-light'
					});
					$("#modal_post_edit_hot").modal('hide');
					// 重新刷新
					orders_table.fnDraw();
				} else {
					$("#modal_post_edit_hot").modal('hide');
				}
			},
			error : function(XMLHttpRequest) {
				$("#modal_post_edit_hot").modal('hide');
			}
		});
	});
	/**
	 * 修改Post类型
	 */
	orders_table.on('click', 'a.post_type', function(e) {
		e.preventDefault();
		editId = $(this).attr("id").substring(10);
		$("#modal_post_edit_type").modal({
			backdrop : 'static'
		});
	});
	$("#modal_post_edit_type_confirm_btn").on("click", function() {
		var type = $("#post_edit_type").val();
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : appName + "/community/posts/type",
			data : {
				id : editId,
				type : type
			},
			success : function(data) {
				if (data.code == 200) {
					$.gritter.add({
						title : "修改成功",
						time : 1000,
						class_name : 'gritter-success gritter-center gritter-light'
					});
					$("#modal_post_edit_type").modal('hide');
					// 重新刷新
					orders_table.fnDraw();
				} else {
					$("#modal_post_edit_type").modal('hide');
				}
			},
			error : function(XMLHttpRequest) {
				$("#modal_post_edit_type").modal('hide');
			}
		});
	});

	/**
	 * 搜索框点击事件
	 */
	function refreshPage() {
		id = $("#post_id").val().trim();
		title = $("#post_title").val().trim();
		communityId = $("#post_communityid").val();
		status = $("#post_status").val();
		app = $("#post_app").val();
		type = $("#post_type").val();
		hot = $("#post_hot").val();
		timeRange = "2014.12.12 20:30:30";
		orderBy = $("#post_orderBy").val();
		// 页面重新出刷新
		orders_table.fnDraw();
	}

	/**
	 * 注册搜索框点击事件
	 */
	$("#post_seachbar").click(function() {
		refreshPage();
	});
	/**
	 * 注册搜索框点击事件
	 */
	$("#post_chongzhi").click(function() {
		orders_table.fnDraw();
	});
	/**
	 * 注册Status OnChange事件
	 */
	$("#post_status").on('change', function() {
		refreshPage();
	});
	/**
	 * 注册App OnChange事件
	 */
	$("#post_app").on('change', function() {
		refreshPage();
	});
	/**
	 * 注册OrderBy OnChange事件
	 */
	$("#post_orderBy").on('change', function() {
		refreshPage();
	});
	/**
	 * 注册Type OnChange事件
	 */
	$("#post_type").on('change', function() {
		refreshPage();
	});
	/**
	 * 注册Community OnChange事件
	 */
	$("#post_communityid").on('change', function() {
		refreshPage();
	});
	/**
	 * 注册OrderBy OnChange事件
	 */
	$("#post_orderBy").on('change', function() {
		refreshPage();
	});
	/**
	 * 注册Hot OnChange事件
	 */
	$("#post_hot").on('change', function() {
		refreshPage();
	});
	/**
	 * 注册add Form事件
	 */
	$("#app").on('change', function() {
		var tempApp = $("#app").val();
		$.ajax({
			type : 'POST',
			dataType : 'json',
			url : appName + "/community/posts/communities",
			data : {
				app : tempApp,
			},
			success : function(data) {
				if (data.code == 200) {
					$("#communityId").html("");
					$.each(eval(data.communities), function(i, item) {
						$("<option value='" + item.id + "'>" + item.name + "</option>").appendTo($("#communityId"));
					});
				} else {
					$("#modal_post_add").modal('hide');
					$.gritter.add({
						title : "获得社区失败",
						time : 1000,
						class_name : 'gritter-success gritter-center gritter-light'
					});
				}
			},
			error : function(XMLHttpRequest) {
				$("#modal_post_add").modal('hide');
				$.gritter.add({
					title : "获得社区失败",
					time : 1000,
					class_name : 'gritter-success gritter-center gritter-light'
				});
			}
		});
	});

	/**
	 * 打开创建界面
	 */
	/**
	 * 注册搜索框点击事件
	 */
	$("#post_add").click(function() {
		$("#modal_post_add").modal({
			backdrop : 'static'
		});
	});

	/**
	 * 注册添加Post 保存确认事件
	 */
	$("#modal_post_add_confirm_btn").on("click", function() {
		var title = $("#title").val().trim();
		if (title.length < 5 || title.length > 40) {
			$.gritter.add({
				title : "请输入合法的标题:标题长度5-40个字符",
				time : 1000,
				class_name : 'gritter-success gritter-center gritter-light'
			});
			return;
		}
		var content = $("#content").val().trim();
		if (content.length > 5000) {
			$.gritter.add({
				title : "请输入合法的内容:内容最大长度5000个字符",
				time : 1000,
				class_name : 'gritter-success gritter-center gritter-light'
			});
			return;
		}

		var mediaType = $("#mediaType").val().trim();
		if (mediaType == 0) {// 图片
		// var filesize = 0 ;
		// $('[name="post_add_files"]').each(function() {
		// });
		// if (filesize > 10 ) {
		// $.gritter.add({
		// title : "文件大小："+filesize,
		// time : 1000,
		// class_name : 'gritter-success gritter-center gritter-light'
		// });
		// return;
		// }

			var num = 0;
			$('[name="post_add_images"]').each(function() {
				var image = $(this).attr("src");
				if (image.length > 0) {
					num = num + 1;
				}
			});
			if (num == 0) {
				$.gritter.add({
					title : "没有上传图片文件",
					time : 1000,
					class_name : 'gritter-success gritter-center gritter-light'
				});
				return;
			}

			var imagefit = 1 ;
			$('[name="post_add_files"]').each(function() {
				var imageName = $(this).val().split(/\\\//).pop();
				console.log("image"+imageName);
				if(imageName.length == 0){
					return ;
				}
				if(checkImage(imageName) == 0){
					imagefit = imagefit -1;
				}
			});
			if (imagefit < 1) {
				$.gritter.add({
					title : "仅支持jpg|jpeg|png|gif，请校验是否有不符合格式的图片类型",
					time : 1000,
					class_name : 'gritter-success gritter-center gritter-light'
				});
				return ;
			}

		} else {// 视频
			var fileName = $("#videoFile").val().split(/\\\//).pop();
			if (fileName.length == 0) {
				$.gritter.add({
					title : "请上传视频",
					time : 1000,
					class_name : 'gritter-success gritter-center gritter-light'
				});
				return;
			}
			var ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
			if (ext != 'mp4') {
				$.gritter.add({
					title : "只支持mp4格式的视频",
					time : 1000,
					class_name : 'gritter-success gritter-center gritter-light'
				});
				return;
			}

			var videoPreviewImage = $("#videoPreviewImage").attr("src").trim();
			if (videoPreviewImage.length == 0) {
				$.gritter.add({
					title : "请输入视频预览图片",
					time : 1000,
					class_name : 'gritter-success gritter-center gritter-light'
				});
				return;
			}
			var videoPreviewFile = $("#videoPreviewFile").val().split(/\\\//).pop();
			if(checkImage(videoPreviewFile)== 0){
				$.gritter.add({
					title : "视频截图仅支持jpg|jpeg|png|gif，请校验是否有不符合格式的图片类型",
					time : 1000,
					class_name : 'gritter-success gritter-center gritter-light'
				});
				return;
			}
		}

		 var formData = new FormData($('#model_post_add_form')[0]);
		 if (mediaType == 0) {// 图片
			 formData.append("post_add_images", post_add_images);
		 }else{
			 formData.append("videoFile", videoFile.files[0]);
			 formData.append("videoPreviewFile", videoPreviewFile);
		 }
		 // Main magic with files here
		 
		 $.ajax({
			    url: './addPost',
			    data: formData,
			    processData: false,
			    contentType: false,
			    type: 'POST',
			    success: function(data){
			    	$('#model_post_add_form')[0].reset();
			    	$('[name="post_add_images"]').each(function() {
			    		this.src="";
			    	});
			      	$('#videoPreviewImage').attr("src", "")
			      	
			    	$("#modal_post_add").modal('hide');
			    	refreshPage();
			    	$.gritter.add({
						title : "上传成功",
						time : 1000,
						class_name : 'gritter-success gritter-center gritter-light'
					});
					return;
			    },
			    error : function(XMLHttpRequest) {
					$.gritter.add({
						title : "上传失败",
						time : 1000,
						class_name : 'gritter-success gritter-center gritter-light'
					});
					return ;
				}
			  });
	});

	$("#orders_table tbody").tooltip({
		hide : {
			delay : 100
		}
	});

	function checkImage(str) {
		var ext = str.substring(str.lastIndexOf(".") + 1).toLowerCase();
		if (ext != 'png' && ext != 'jpg' && ext != 'jpeg' && ext != 'gif') {
			return 0;
		} else {
			return 1;
		}
	}

	/**
	 * 注册回复用户事件
	 */
	$('[name="post_add_files"]').each(function() {
		var fileId = this.id;
		var fileIds = fileId.split("+");
		var index = fileIds[1];
		$(this).on("change", function() {
			var imageId = "post_add_images" + index;
			onImageChange(fileId, imageId);
		});
	});

	function onImageChange(fileId, imageId) {
		var pic = document.getElementById(imageId);
		var file = document.getElementById(fileId);
		var ext = file.value.substring(file.value.lastIndexOf(".") + 1).toLowerCase();
		if (ext == "") {
			var pic = document.getElementById(imageId);
			pic.src = plusImageSrc;
			return;
		}
		// gif在IE浏览器暂时无法显示
		if (ext != 'png' && ext != 'jpg' && ext != 'jpeg' && ext != 'gif') {
			$.gritter.add({
				title : "仅支持jpg|jpeg|png|gif",
				time : 1000,
				class_name : 'gritter-success gritter-center gritter-light'
			});
			return;
		}
		// IE浏览器
		html5Reader(file, imageId);
	}

	function html5Reader(file, imageId) {
		var file = file.files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function(e) {
			var pic = document.getElementById(imageId);
			pic.src = this.result;
		}
	}

	$("#videoPreviewFile").on("change", function() {
		var imageId = "videoPreviewImage";
		onImageChange("videoPreviewFile", imageId);
	});

	function onVideoChange(fileId, imageId) {
		var pic = document.getElementById(imageId);
		var file = document.getElementById(fileId);
		var ext = file.value.substring(file.value.lastIndexOf(".") + 1).toLowerCase();
		if (ext == "") {
			var pic = document.getElementById(imageId);
			pic.src = "";
			return;
		}
		// gif在IE浏览器暂时无法显示
		if (ext != 'mp4' && ext != 'flv' && ext != 'avi') {
			alert("只支持MP4,FLV,AVI");
			return;
		}
		// IE浏览器
		html5Reader(file, imageId);
	}

	$("#videoFile").on("change", function() {
		// onVideoChange("videoFile","video");
	});

	/**
	 * 注册Hot OnChange事件
	 */
	$("#mediaType").on('change', function() {
		var mediaType = $("#mediaType").val();
		if (mediaType == "0") {
			$("#videoDiv").hide();
			$("#imageDiv").show();
		} else {
			$("#videoDiv").show();
			$("#imageDiv").hide();
		}
	});

	$("#videoDiv").hide();
	$("#imageDiv").show();
})