define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min.js");
    require("../../modules/plugin/jquery.dataTables.bootstrap");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/bootbox.min");

    
    var operateTr = "<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">"
		+ " <button class=\"reply\" href=\"#\" data-toggle='tooltip' title='回复'><i class=\"icon-edit bigger-130\"></i></button>"
		+ "</div>";
    
    
    //常量设置
    var reportTimeDesc=true;
    var reports_status = 2;
    var reports_post_table;
    var reports_comment_table

    reports_post_table = $('#reports_post_table').dataTable({
        "bAutoWidth": true,
        "bProcessing": true,
        "bServerSide": true,
        "bStateSave": false, //是否保存cookie数据
        "bFilter": false,
        "aLengthMenu": [10,20],
        "iDisplayLength": 10,//每页显示个数
        "sAjaxDataProp" : "reports",
		"sAjaxSource" : appName + '/community/reports/posts/list',
        "fnServerParams": function (aoData) {  //查询条件
            aoData.push(
                    { "name": "reportTimeDesc", "value": true },
                    { "name": "status", "value": reports_status }
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
							"mDataProp" : "id",
							"bSortable" : false
						},
						{
							"mDataProp" : "elementId",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var postUrl =appName + '/community/posts/detail/'+obj.aData.elementId;
								return '<a href="'+postUrl+'">'+obj.aData.elementId+'</a>';
							}
						},
						{
							"mDataProp" : "reportUser.nickname",
							"bSortable" : false
						},
						{
							"mDataProp" : "reportTime",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var dataFormat = new Date(obj.aData.reportTime).toLocaleString();
								return dataFormat;
							}
						},
						{
							"mDataProp" : "reason",
							"bSortable" : false
						},
						{
							"mDataProp" : "replyTime",
							"bSortable" : false,
							"fnRender" : function(obj) {
								if(obj.aData.replyTime){
									var dataFormat = new Date(obj.aData.replyTime).toLocaleString();
									return dataFormat;
								}
							}
						},
						{
							"mDataProp" : "reply",
							"bSortable" : false
						},
						{
							"mDataProp" : "status",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var sReturn = "";
								if (obj.aData.status == 1) {
									sReturn = "<span class=\"label label-sm label-warning\">已回复</span>";
								} else if (obj.aData.status == 0) {
									sReturn = "<span class=\"label label-sm label-primary\">未回复</span>";
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
    

    $("#reports_post_table tbody").tooltip({
        hide: {
            delay: 100
        }
    });
    
    
    
    reports_comment_table = $('#reports_comment_table').dataTable({
        "bAutoWidth": true,
        "bProcessing": true,
        "bServerSide": true,
        "bStateSave": false, //是否保存cookie数据
        "bFilter": false,
        "aLengthMenu": [10,20],
        "iDisplayLength": 10,//每页显示个数
        "sAjaxDataProp" : "reports",
		"sAjaxSource" : appName + '/community/reports/comments/list',
        "fnServerParams": function (aoData) {  //查询条件
            aoData.push(
                { "name": "reportTimeDesc", "value": true },
                { "name": "status", "value": reports_status }
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
							"mDataProp" : "id",
							"bSortable" : false
						},
						{
							"mDataProp" : "elementId",
							"bSortable" : false
						},
						{
							"mDataProp" : "reportUser.nickname",
							"bSortable" : false
						},
						{
							"mDataProp" : "reportTime",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var dataFormat = new Date(obj.aData.reportTime).toLocaleString();
								return dataFormat;
							}
						},
						{
							"mDataProp" : "reason",
							"bSortable" : false
						},
						{
							"mDataProp" : "replyTime",
							"bSortable" : false,
							"fnRender" : function(obj) {
								if(obj.aData.replyTime){
									var dataFormat = new Date(obj.aData.replyTime).toLocaleString();
									return dataFormat;
								}
							}
						},
						{
							"mDataProp" : "reply",
							"bSortable" : false
						},
						{
							"mDataProp" : "status",
							"bSortable" : false,
							"fnRender" : function(obj) {
								var sReturn = "";
								if (obj.aData.status == 1) {
									sReturn = "<span class=\"label label-sm label-warning\">已回复</span>";
								} else if (obj.aData.status == 0) {
									sReturn = "<span class=\"label label-sm label-primary\">未回复</span>";
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
        fnPreDrawCallback: function () {
        	return true;
        }
    });
    

    $("#reports_comment_table tbody").tooltip({
        hide: {
            delay: 100
        }
    });
    
    $("#reports_post_table_status").on("change", function () { //触发reports_table_status重新请求服务器
        reports_status = $(this).val();
        reports_post_table.fnDraw();
    });
    
    $("#reports_comment_table_status").on("change", function () { //触发reports_table_status重新请求服务器
        reports_status = $(this).val();
        reports_comment_table.fnDraw();
    });
    
    
    //回复
    $('#reports_post_table tbody').on('click', 'button.reply', function () {
        $('#modal_form')[0].reset();  
    	
        var tmpTr = $(this).closest("tr");
        var id=tmpTr.find("td:eq(1)").html();
        var elmentId=tmpTr.find("td:eq(2)").html();
        var userName=tmpTr.find("td:eq(3)").html();
        var reportTime=tmpTr.find("td:eq(4)").html();
        var reason=tmpTr.find("td:eq(5)").html();
        $("#id").html(id);
        $("#element_id").html(elmentId);
        $("#user_name").html(userName);
        $("#report_time").html(reportTime);
        $("#reply_reason").html(reason);
        $("#report_type").html("post");
        $("#modal_reply").modal({backdrop: 'static'});
    });
    
    
    $('#reports_comment_table tbody').on('click', 'button.reply', function () {
    	 $('#modal_form')[0].reset();  
    	
        var tmpTr = $(this).closest("tr");
        var id=tmpTr.find("td:eq(1)").html();
        var elmentId=tmpTr.find("td:eq(2)").html();
        var userName=tmpTr.find("td:eq(3)").html();
        var reportTime=tmpTr.find("td:eq(4)").html();
        var reason=tmpTr.find("td:eq(5)").html();
        $("#id").html(id);
        $("#element_id").html(elmentId);
        $("#user_name").html(userName);
        $("#report_time").html(reportTime);
        $("#reply_reason").html(reason);
        $("#report_type").html("comment");
        $("#modal_reply").modal({backdrop: 'static'});
    });
    
    
    //处理提交
    $('#modal_submit_button').on('click', function () {
    	var id=$("#id").html();
        var reply=$("#reply_reply").val().trim();
        var reportType=$("#report_type").html();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/community/reports/reply",
            data: {id:id,reply:reply},
            success: function (data) {
                if (data.code == 200) {
                    if(reportType=="post"){
                    	reports_post_table.fnDraw();
                    }else{
                    	reports_comment_table.fnDraw();
                    }
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
        
    	
    });
    
    
    

})