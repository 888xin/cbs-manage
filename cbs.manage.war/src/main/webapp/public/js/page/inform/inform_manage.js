define(function (require) {
    require("../common/common");
    require("../../modules/plugin/jquery.dataTables.bootstrap");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/bootbox.min");


    var content_image = "http://roi.skst.cn/";

	//对应窗口是否打开
	var commentOpen=false;
	var contentOpen=false;
	var imOpen=false;
	var userOpen=false;
    var newsOpen=false;
    var newsMainOpen=false;

	//page
	var comment_page=0;
	var content_page=0;
	var im_page=0;
	var user_page=0;
    var news_page=0;
    var news_main_page=0;

    var ids=null;
    var id=null;

    //status
	var comment_status=0;//默认显示未处理的举报
	var content_status=0;
	var im_status=0;
	var user_status=0;
    var news_status=0;
    var news_main_status=0;
	
	//type
	var type_comment=1;
	var type_content=2;
	var type_im=3;
    var type_news=4;
    var type_news_main=5;
	var type_user=10;
	
    jQuery(function ($) {
    	
    	//页面加载读取评论举报列表
        getCommentInformData(comment_status);
        
    	/*getIMInformData(im_status);*/
        
        $('#inform_tab a').click(function (e) {
            e.preventDefault();//阻止a链接的跳转行为
            var href = $(this).attr("href");
            if (href == "#comment_inform_tab"){
            	comment_status=0;//重置待处理状态
            	comment_page=0;
            	$("#comment_more").removeClass("hidden");
            	//切换到评论tab加载数据
            	getCommentInformData();
            } else if (href == "#content_inform_tab"){
            	content_status=0;//重置待处理状态
            	content_page=0;
            	$("#content_more").removeClass("hidden");
                //切换到吐槽tab加载数据
                getContentInformData();
            } else if (href == "#im_inform_tab"){
            	im_status=0;//重置待处理状态
            	im_page=0;
            	$("#im_more").removeClass("hidden");
                //切换到imtab加载数据
                getIMInformData();
            } else if (href == "#user_inform_tab"){
            	user_status=0;//重置待处理状态
            	$("#user_more").removeClass("hidden");
                //切换到用户tab加载数据
            	user_page=0;
                getUserInformData();
            } else if (href == "#news_inform_tab"){
                news_status=0;//重置待处理状态
                $("#news_more").removeClass("hidden");
                //切换到用户tab加载数据
                news_page=0;
                getNewsInformData();
            } else if (href == "#news_main_inform_tab"){
                news_main_status=0;//重置待处理状态
                $("#news_main_more").removeClass("hidden");
                //切换到用户tab加载数据
                news_main_page=0;
                getNewsMainInformData(news_main_status);
            }

            $(this).tab('show');//显示当前选中的链接及关联的content

        });
        
        //暂时只做im和user处理
        /**
         * 处理
         */
        function userGag(id,user_id,status,dispose_info,type,last_time){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/inform/gagUser",
                data:{id:id,status:status,dispose_info:dispose_info,type:type,last_time:last_time,user_id:user_id},
                success: function (data) {
                    if (data.code == 200) {
                    	$.gritter.add({
                            title: "操作成功",
                            time: 2000,
                            class_name: 'gritter-success gritter-light'
                        });
						switch (type){
                            case 3:
                                im_status=0;//重置待处理状态
                                im_page=0;
                                getIMInformData();
                                break;
                            case 10:
                                user_status=0;//重置待处理状态
                                user_page=0;
                                getUserInformData();
                                break;
                        }

                    } else {
                        $.gritter.add({
                            title: "出现" + data.code + "异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                        } else {
                            $.gritter.add({
                                title: "出现未知异常",
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                        }
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
        }
        
        function ungag(id,user_id,dispose_info,type){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/inform/unGagUser",
                data:{id:id,type:type,dispose_info:dispose_info,user_id:user_id},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "操作成功",
                            time: 2000,
                            class_name: 'gritter-success gritter-light'
                        });
                        switch (type){
                            case 3:
                                im_status=0;//重置待处理状态
                                im_page=0;
                                getIMInformData();
                                break;
                            case 10:
                                user_status=0;//重置待处理状态
                                user_page=0;
                                getUserInformData();
                                break;
                        }

                    } else {
                        $.gritter.add({
                            title: "出现" + data.code + "异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                        } else {
                            $.gritter.add({
                                title: "出现未知异常",
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                        }
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
        }

        /**
         * 评论，吐槽，新闻评论处理
         */
        function updateStatus(id,status,dispose_info,type){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/inform/updatestatus",
                data:{id:id,status:status,dispose_info:dispose_info,type:type},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "操作成功",
                            time: 2000,
                            class_name: 'gritter-success gritter-light'
                        });
                        switch (type){
                            case 1:
                                comment_status=0;//重置待处理状态
                                comment_page=0;
                                getCommentInformData();
                                break;
                            case 2:
                                content_status=0;//重置待处理状态
                                content_page=0;
                                getContentInformData();
                                break;
                            case 4:
                                news_status=0;//重置待处理状态
                                news_page=0;
                                getNewsInformData();
                                break;
                            case 5:
                                news_main_status=0;//重置待处理状态
                                news_main_page=0;
                                getNewsMainInformData(news_main_status);
                                break;
                        }

                    } else {
                        $.gritter.add({
                            title: "出现" + data.code + "异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                        } else {
                            $.gritter.add({
                                title: "出现未知异常",
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                        }
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
        }
        
/*        //一键处理提交
        $('#modal_dispose_all_button').on('click', function () {
            ids = $("#ids").val();
            var status=$("#status_all").val();
            var dispose_info=$("#dispose_info_all").val();
            var type=$("#type").val();
            updateStatus(id,status,dispose_info,ids,type);
        });*/
        //单独处理提交
        $('#modal_dispose_button').on('click', function () {
            var id=$("#id").html();
            var user_id=$("#user_id").html();
            var dispose_info=$("#dispose_info").val();
            var status=$("#status").val();
            var type=$("#type").val();
            var last_time=$("#last_time").val();
            if(type==type_comment||type==type_content||type==type_news||type==type_news_main){
                updateStatus(id,status,dispose_info,type);
            }else if(type==type_im||type==type_user){
                userGag(id,user_id,status,dispose_info,type,last_time);
            }

        });
        //单独处理提交    解禁
        $('#modal_ungag_button').on('click', function () {
            var id=$("#ungag_id").html();
            var user_id=$("#ungag_user_id").html();
            var dispose_info=$("#ungag_info").val();
            var type=$("#ungag_type").val();
            ungag(id,user_id,dispose_info,type)
        });
        

        /**
		 * comment start
		 */
    	
        /**
         * 评论举报多选框点击事件 start
         */

        $('#comment_inform_table tr input[type=checkbox]').removeAttr('checked');
        $('#comment_inform_table').on('click', 'tr input[type=checkbox]', function() {
            if(this.checked){
                $(this).closest('tr').addClass('selected1');
            } else {
                comment_tablebox.display_bar($('#comment_inform_table tr input[type=checkbox]:checked').length);
                $(this).closest('tr').removeClass('selected1');
            }
        });


        //comment select all
        $('#comment_item_all').on('click', function(e) {
            e.preventDefault();
            comment_tablebox.select_all();
        });

        //comment select none
        $('#comment_item_none').on('click', function(e) {
            e.preventDefault();
            comment_tablebox.select_none();
        });



        //check/uncheck all tr
        $('#comment_toggle_all').removeAttr('checked').on('click', function(){
            if(this.checked) {
                comment_tablebox.select_all();
            } else comment_tablebox.select_none();
        });

        var comment_tablebox = {
            select_all : function() {
                var count = 0;
                $('#comment_inform_table tr input[type=checkbox]').each(function(){
                    this.checked = true;
                    $(this).closest('tr').addClass('selected1');
                    count++;
                });

                $('#comment_toggle_all').get(0).checked = true;


            }
            ,
            select_none : function() {
                $('#comment_inform_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
                $('#comment_toggle_all').get(0).checked = false;

                comment_tablebox.display_bar(0);
            }
        }
        /**
         * 评论多选框点击事件 end
         */



        //未处理
        $("#comment-status-unchecked").on("click",function(){
        	comment_status=0;
            comment_page=0;
            $("#comment_more").removeClass("hidden");
            getCommentInformData(comment_status);
        });
        //已屏蔽
        $("#comment-status-shielded").on("click",function(){
        	comment_status=1;
            comment_page=0;
            $("#comment_more").removeClass("hidden");
            getCommentInformData(comment_status);
        });
        //已忽略
        $("#comment-status-ignored").on("click",function(){
        	comment_status=2;
            comment_page=0;
            $("#comment_more").removeClass("hidden");
            getCommentInformData(comment_status);
        });



        /**
         * 异步加载数据 评论举报 Start
         */

        function getCommentInformData(){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/inform/comment/list",
                data:{status:comment_status,page:comment_page},
                success: function (data) {
                    if (data.code == 200) {
                        //清空原有的数据
                        $("#comment_inform_table tbody tr").remove();
                        if (data.number > 0) {
                        	comment_page = data.now_page ;
                            //加载数据
                            $.each(data.commInformList, function (index, inform) {
                                var htmlStr = showCommentInformData(inform.id,
                                		inform.contain_id,
                                		inform.informer_name,
                                		inform.contain,
                                		inform.user_name,
                                		inform.inform_type,
                                		inform.inform_reason,
                                		inform.total,
                                		inform.update_time,
                                		inform.status,
                                		inform.dispose_info);
                                $("#comment_inform_table tbody").append(htmlStr);
                            });
                        } else {
                            $.gritter.add({
                                title: '无数据',
                                time: 2000,
                                class_name: 'gritter-info gritter-light'
                            });
                        }
                    } else {
                        $.gritter.add({
                            title: "出现" + data.code + "异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                        } else {
                            $.gritter.add({
                                title: "出现未知异常",
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                        }
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
        }

        function showCommentInformData(id,
            contain_id,
            informer_name,
            contain,
            user_name,
            inform_type,
            inform_reason,
            total,
            update_time,
            status,
            dispose_info
            ) {
        	update_time=new Date(update_time).pattern("yyyy-MM-dd HH:mm:ss");
        	if(inform_reason==""||inform_reason==null){
        		inform_reason="无";
        	}
        	switch(inform_type){
	        	case 0:
	        		inform_type="其他";
                    break;
	        	case 1:
	        		inform_type="淫秽色情";
                    break;
	        	case 2:
	        		inform_type="垃圾广告";
                    break;
	        	case 3:
	        		inform_type="恶意咒骂";
                    break;
	        	case 4:
	        		inform_type="政治敏感";
                    break;
        	}
        	if(status==1){
        		status="<button class='btn btn-xs btn-danger comment_sheild_dispose'>已屏蔽</button>";
        	}else if(status==2) {
        		status="<button class='btn btn-xs btn-success comment_ignore_dispose'>已忽略</button>";
        	}else if(status==-1){
        		status="<button class='btn btn-xs btn-danger'>已删除</button>";
        	}else{
        		status="<button class='btn btn-xs btn-danger comment_sheild'>屏蔽</button>&nbsp;" +
				"<button class='btn btn-xs btn-success comment_ignore'>忽略</button>"
        	}
            var htmlStr = "<tr>"+
                    "<td class='center'>"+
                    "                                        <label class='inline'>"+
                    "                                            <input type='checkbox' class='ace'/>"+
                    "                                            <span class='lbl'></span>"+
                    "                                        </label>"+
                    "                                    </td>"+
                    "<td class='center'>"+id+"</td>"+
                    "<td class='center'>"+contain_id+"</td>"+
                    "<td class='center'>"+informer_name+"</td>"+
                    "<td class='center contain'>"+contain+"</td>"+
                    "<td class='center'>"+user_name+"</td>"+
                    "<td class='center'>"+inform_type+"</td>"+
                    "<td class='center inform_reason'>"+inform_reason+"</td>"+
                    "<td class='center'>"+total+"</td>"+
                    "<td class='center'>"+update_time+"</td>"+
                    "<td class='center'>"+status+"</td>"+
                    "<td style='display:none'>"+dispose_info+"</td>"+
                    
                    "</tr>" ;
            return htmlStr ;
        }

        /**
         * 打开页面异步加载数据 评论举报 end
         */




        //向下加载评论举报数据
        $('#comment_more').on(ace.click_event, function(){
            if(comment_page>0){
            	$.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/inform/comment/list",
                    data:{start_id:comment_page,status:comment_status},
                    success: function (data) {
                        if (data.code == 200) {
                            if (data.number > 0) {
                            	comment_page = data.now_page;
                                //加载数据
                                $.each(data.commInformList, function (index, inform) {
                                    var htmlStr = showCommentInformData(inform.id,
                                    		inform.contain_id,
                                    		inform.informer_name,
                                    		inform.contain,
                                    		inform.user_name,
                                    		inform.inform_type,
                                    		inform.inform_reason,
                                    		inform.total,
                                    		inform.update_time,
                                    		inform.status,
                                    		inform.dispose_info);
                                    $("#comment_inform_table tbody").append(htmlStr);
                                });
                            } else {
                                $.gritter.add({
                                    title: '无更多举报信息',
                                    time: 2000,
                                    class_name: 'gritter-info gritter-light'
                                });
                                //设置加载按钮消失
                                $("#comment_more").addClass("hidden");
                            }
                        } else {
                            $.gritter.add({
                                title: "出现" + data.code + "异常",
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                            if (data.msg != "") {
                                $.gritter.add({
                                    title: data.msg,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-light'
                                });
                            } else {
                                $.gritter.add({
                                    title: "出现未知异常",
                                    time: 2000,
                                    class_name: 'gritter-error gritter-light'
                                });
                            }
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
            }else{
            	$.gritter.add({
                    title: '无更多举报信息',
                    time: 2000,
                    class_name: 'gritter-info gritter-light'
                });
                //设置加载按钮消失
                $("#comment_more").addClass("hidden");
            }

            return false;
        });
        
        //屏蔽
        $('#comment_inform_table tbody').on('click', 'button.comment_sheild', function () {
            var tmpTr = $(this).closest("tr");
            var id =  tmpTr.find("td:eq(1)").html();
            var inform_reason=tmpTr.find("td:eq(7)").html();
            var user_name=tmpTr.find("td:eq(5)").html();
            var contain=tmpTr.find("td:eq(4)").html();
            var status=1;
            $("#inform_title").html("举报屏蔽处理");
            $("#id").html(id);
            $("#user_name").html(user_name);
            $("#contain").html(contain);
            $("#inform_reason").html(inform_reason);
            $("#status").val(status);
            $("#type").val(type_comment);
            $("#modal_inform").modal({backdrop: 'static'});
        });
        //忽略
        $('#comment_inform_table tbody').on('click', 'button.comment_ignore', function () {
            var tmpTr = $(this).closest("tr");
            var id =  tmpTr.find("td:eq(1)").html();
            var inform_reason=tmpTr.find("td:eq(7)").html();
            var user_name=tmpTr.find("td:eq(5)").html();
            var contain=tmpTr.find("td:eq(4)").html();
            var status=2;

            $("#inform_title").html("举报忽略处理");
            $("#id").html(id);
            $("#user_name").html(user_name);
            $("#contain").html(contain);
            $("#inform_reason").html(inform_reason);
            $("#status").val(status);
            $("#type").val(type_comment);
            $("#modal_inform").modal({backdrop: 'static'});
        });
        

        
        //显示处理信息
        $('#comment_inform_table tbody').on('click', 'button.comment_sheild_dispose', function () {
            var tmpTr = $(this).closest("tr");
            var dispose_info =  tmpTr.find("td:eq(11)").html();
            $("#dispose_info_reason").html(dispose_info);
            $("#modal_dispose").modal({backdrop: 'static'});
        });
        $('#comment_inform_table tbody').on('click', 'button.comment_ignore_dispose', function () {
            var tmpTr = $(this).closest("tr");
            var dispose_info =  tmpTr.find("td:eq(11)").html();
            $("#dispose_info_reason").html(dispose_info);
            $("#modal_dispose").modal({backdrop: 'static'});
        });

        //一键屏蔽
        $('button.comment_all_sheild').on('click', function () {
            var ids = "";
            $("#comment_inform_table tbody").find('tr').each(function () {
                //获取所选的行
                var tmp = $(this).find("td:eq(0) input[type=checkbox]");
                var checked =  tmp.prop('checked');
                var tr_id = $(this).find("td:eq(1)").html();
                if (checked){
                    ids += tr_id+",";
                }
            });
            $("#status_all").val(1);
            $("#ids").val(ids);
            $("#type").val(type_comment);
            if(ids!=""){
                $("#modal_inform_all").modal({backdrop: 'static'});
            }else{
                $.gritter.add({
                    title: "请选择要屏蔽的举报",
                    time: 2000,
                    class_name: 'gritter-warning gritter-light'
                });
            }

        });
        //一键忽略
        $('button.comment_all_ignore').on('click', function () {
            var ids = "";
            $("#comment_inform_table tbody").find('tr').each(function () {
                //获取所选的行
                var tmp = $(this).find("td:eq(0) input[type=checkbox]");
                var checked =  tmp.prop('checked');
                var tr_id = $(this).find("td:eq(1)").html();
                if (checked){
                    ids += tr_id+",";
                }
            });
            $("#status_all").val(2);
            $("#ids").val(ids);
            $("#type").val(type_comment);
            if(ids!=""){
                $("#modal_inform_all").modal({backdrop: 'static'});
            }else{
                $.gritter.add({
                    title: "请选择要忽略的举报",
                    time: 2000,
                    class_name: 'gritter-warning gritter-light'
                });
            }

        });





/**
 * comment end
 */
        
        
        
        
        
/**
 * content start
 */
    	
        /**
         * 吐槽举报多选框点击事件 start
         */

       $('#content_inform_table tr input[type=checkbox]').removeAttr('checked');
       $('#content_inform_table').on('click', 'tr input[type=checkbox]', function() {
           if(this.checked){
               $(this).closest('tr').addClass('selected1');
           } else {
        	   content_tablebox.display_bar($('#content_inform_table tr input[type=checkbox]:checked').length);
               $(this).closest('tr').removeClass('selected1');
           }
       });


       //content select all
       $('#content_item_all').on('click', function(e) {
           e.preventDefault();
           content_tablebox.select_all();
       });

       //content select none
       $('#content_item_none').on('click', function(e) {
           e.preventDefault();
           content_tablebox.select_none();
       });



       //check/uncheck all tr
       $('#content_toggle_all').removeAttr('checked').on('click', function(){
           if(this.checked) {
        	   content_tablebox.select_all();
           } else content_tablebox.select_none();
       });

       var content_tablebox = {
           select_all : function() {
               var count = 0;
               $('#content_inform_table tr input[type=checkbox]').each(function(){
                   this.checked = true;
                   $(this).closest('tr').addClass('selected1');
                   count++;
               });

               $('#content_toggle_all').get(0).checked = true;


           }
           ,
           select_none : function() {
               $('#content_inform_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
               $('#content_toggle_all').get(0).checked = false;

               content_tablebox.display_bar(0);
           }
       }
       /**
        * 吐槽多选框点击事件 end
        */


       //未处理
       $("#content-status-unchecked").on("click",function(){
    	   content_status=0;
           content_page=0;
           $("#content_more").removeClass("hidden");
           getContentInformData(content_status);
       });
       //已屏蔽
       $("#content-status-shielded").on("click",function(){
    	   content_status=1;
           content_page=0;
           $("#content_more").removeClass("hidden");
           getContentInformData(content_status);
       });
       //已忽略
       $("#content-status-ignored").on("click",function(){
    	   content_status=2;
           content_page=0;
           $("#content_more").removeClass("hidden");
           getContentInformData(content_status);
       });



       /**
        * 异步加载数据 吐槽举报 Start
        */
       
       function getContentInformData(){
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: appName+"/inform/content/list",
               data:{status:content_status,page:content_page},
               success: function (data) {
                   if (data.code == 200) {
                       //清空原有的数据
                       $("#content_inform_table tbody tr").remove();
                       if (data.number > 0) {
                       	content_page = data.now_page ;
                           //加载数据
                           $.each(data.contentInformList, function (index, inform) {
                               var htmlStr = showContentInformData(inform.id,
                               		inform.contain_id,
                               		inform.informer_name,
                               		inform.contain,
                               		inform.user_name,
                               		inform.inform_type,
                               		inform.inform_reason,
                               		inform.total,
                               		inform.update_time,
                               		inform.status,
                               		inform.dispose_info);
                               $("#content_inform_table tbody").append(htmlStr);
                           });
                       } else {
                           $.gritter.add({
                               title: '无数据',
                               time: 2000,
                               class_name: 'gritter-info gritter-light'
                           });
                       }
                   } else {
                       $.gritter.add({
                           title: "出现" + data.code + "异常",
                           time: 2000,
                           class_name: 'gritter-error gritter-light'
                       });
                       if (data.msg != "") {
                           $.gritter.add({
                               title: data.msg,
                               time: 2000,
                               class_name: 'gritter-error gritter-light'
                           });
                       } else {
                           $.gritter.add({
                               title: "出现未知异常",
                               time: 2000,
                               class_name: 'gritter-error gritter-light'
                           });
                       }
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
       }

       function showContentInformData(id,
           contain_id,
           informer_name,
           contain,
           user_name,
           inform_type,
           inform_reason,
           total,
           update_time,
           status,
           dispose_info
           ) {
       	update_time=new Date(update_time).pattern("yyyy-MM-dd HH:mm:ss");
       	if(inform_reason==""||inform_reason==null){
       		inform_reason="无";
       	}
       	switch(inform_type){
	        	case 0:
	        		inform_type="其他";
                   break;
	        	case 1:
	        		inform_type="淫秽色情";
                   break;
	        	case 2:
	        		inform_type="垃圾广告";
                   break;
	        	case 3:
	        		inform_type="恶意咒骂";
                   break;
	        	case 4:
	        		inform_type="政治敏感";
                   break;
       	}
       	if(status==1){
       		status="<button class='btn btn-xs btn-danger content_sheild_dispose'>已屏蔽</button>";
       	}else if(status==2) {
       		status="<button class='btn btn-xs btn-success content_ignore_dispose'>已忽略</button>";
       	}else if(status==-1){
       		status="<button class='btn btn-xs btn-danger'>已删除</button>";
       	}else{
       		status="<button class='btn btn-xs btn-danger content_sheild'>屏蔽</button>&nbsp;" +
				"<button class='btn btn-xs btn-success content_ignore'>忽略</button>"
       	}
           var htmlStr = "<tr>"+
                   "<td class='center'>"+
                   "                                        <label class='inline'>"+
                   "                                            <input type='checkbox' class='ace'/>"+
                   "                                            <span class='lbl'></span>"+
                   "                                        </label>"+
                   "                                    </td>"+
                   "<td class='center'>"+id+"</td>"+
                   "<td class='center'>"+contain_id+"</td>"+
                   "<td class='center'>"+informer_name+"</td>"+
                   "<td class='center contain'>"+contain+"</td>"+
                   "<td class='center'>"+user_name+"</td>"+
                   "<td class='center'>"+inform_type+"</td>"+
                   "<td class='center inform_reason'>"+inform_reason+"</td>"+
                   "<td class='center'>"+total+"</td>"+
                   "<td class='center'>"+update_time+"</td>"+
                   "<td class='center'>"+status+"</td>"+
                   "<td style='display:none'>"+dispose_info+"</td>"+
                   
                   "</tr>" ;
           return htmlStr ;
       }

       /**
        * 异步加载数据 吐槽举报 end
        */




       //向下加载吐槽举报数据
       $('#content_more').on(ace.click_event, function(){
           if(content_page>0){
           	$.ajax({
                   type: 'POST',
                   dataType: 'json',
                   url: appName+"/inform/content/list",
                   data:{start_id:content_page,status:content_status},
                   success: function (data) {
                       if (data.code == 200) {
                           if (data.number > 0) {
                        	   content_page = data.now_page;
                               //加载数据
                               $.each(data.contentInformList, function (index, inform) {
                                   var htmlStr = showContentInformData(inform.id,
                                   		inform.contain_id,
                                   		inform.informer_name,
                                   		inform.contain,
                                   		inform.user_name,
                                   		inform.inform_type,
                                   		inform.inform_reason,
                                   		inform.total,
                                   		inform.update_time,
                                   		inform.status,
                                   		inform.dispose_info);
                                   $("#content_inform_table tbody").append(htmlStr);
                               });
                           } else {
                               $.gritter.add({
                                   title: '无更多举报信息',
                                   time: 2000,
                                   class_name: 'gritter-info gritter-light'
                               });
                               //设置加载按钮消失
                               $("#content_more").addClass("hidden");
                           }
                       } else {
                           $.gritter.add({
                               title: "出现" + data.code + "异常",
                               time: 2000,
                               class_name: 'gritter-error gritter-light'
                           });
                           if (data.msg != "") {
                               $.gritter.add({
                                   title: data.msg,
                                   time: 2000,
                                   class_name: 'gritter-error gritter-light'
                               });
                           } else {
                               $.gritter.add({
                                   title: "出现未知异常",
                                   time: 2000,
                                   class_name: 'gritter-error gritter-light'
                               });
                           }
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
           }else{
           	$.gritter.add({
                   title: '无更多举报信息',
                   time: 2000,
                   class_name: 'gritter-info gritter-light'
               });
               //设置加载按钮消失
               $("#content_more").addClass("hidden");
           }

           return false;
       });
       
       //屏蔽
       $('#content_inform_table tbody').on('click', 'button.content_sheild', function () {
           var tmpTr = $(this).closest("tr");
           var id =  tmpTr.find("td:eq(1)").html();
           var inform_reason=tmpTr.find("td:eq(7)").html();
           var user_name=tmpTr.find("td:eq(5)").html();
           var contain=tmpTr.find("td:eq(4)").html();
           var status=1;
           $("#inform_title").html("举报屏蔽处理");
           $("#id").html(id);
           $("#user_name").html(user_name);
           $("#contain").html(contain);
           $("#inform_reason").html(inform_reason);
           $("#status").val(status);
           $("#type").val(type_content);
           $("#modal_inform").modal({backdrop: 'static'});
       });
       //忽略
       $('#content_inform_table tbody').on('click', 'button.content_ignore', function () {
           var tmpTr = $(this).closest("tr");
           var id =  tmpTr.find("td:eq(1)").html();
           var inform_reason=tmpTr.find("td:eq(7)").html();
           var user_name=tmpTr.find("td:eq(5)").html();
           var contain=tmpTr.find("td:eq(4)").html();
           var status=2;

           $("#inform_title").html("举报忽略处理");
           $("#id").html(id);
           $("#user_name").html(user_name);
           $("#contain").html(contain);
           $("#inform_reason").html(inform_reason);
           $("#status").val(status);
           $("#type").val(type_content);
           $("#modal_inform").modal({backdrop: 'static'});
       });
       
       
       //显示处理信息
       $('#content_inform_table tbody').on('click', 'button.content_sheild_dispose', function () {
           var tmpTr = $(this).closest("tr");
           var dispose_info =  tmpTr.find("td:eq(11)").html();
           $("#dispose_info_reason").html(dispose_info);
           $("#modal_dispose").modal({backdrop: 'static'});
       });
       $('#content_inform_table tbody').on('click', 'button.content_ignore_dispose', function () {
           var tmpTr = $(this).closest("tr");
           var dispose_info =  tmpTr.find("td:eq(11)").html();
           $("#dispose_info_reason").html(dispose_info);
           $("#modal_dispose").modal({backdrop: 'static'});
       });

       //一键屏蔽
       $('button.content_all_sheild').on('click', function () {
           var ids = "";
           $("#content_inform_table tbody").find('tr').each(function () {
               //获取所选的行
               var tmp = $(this).find("td:eq(0) input[type=checkbox]");
               var checked =  tmp.prop('checked');
               var tr_id = $(this).find("td:eq(1)").html();
               if (checked){
                   ids += tr_id+",";
               }
           });
           $("#status_all").val(1);
           $("#ids").val(ids);
           $("#type").val(type_content);
           if(ids!=""){
               $("#modal_inform_all").modal({backdrop: 'static'});
           }else{
               $.gritter.add({
                   title: "请选择要屏蔽的举报",
                   time: 2000,
                   class_name: 'gritter-warning gritter-light'
               });
           }

       });
       //一键忽略
       $('button.content_all_ignore').on('click', function () {
           var ids = "";
           $("#content_inform_table tbody").find('tr').each(function () {
               //获取所选的行
               var tmp = $(this).find("td:eq(0) input[type=checkbox]");
               var checked =  tmp.prop('checked');
               var tr_id = $(this).find("td:eq(1)").html();
               if (checked){
                   ids += tr_id+",";
               }
           });
           $("#status_all").val(2);
           $("#ids").val(ids);
           $("#type").val(type_content);
           if(ids!=""){
               $("#modal_inform_all").modal({backdrop: 'static'});
           }else{
               $.gritter.add({
                   title: "请选择要忽略的举报",
                   time: 2000,
                   class_name: 'gritter-warning gritter-light'
               });
           }

       });
/**
 * content end
 */


    	
       
/**
* im start
*/
       
       
       /**
        * im举报多选框点击事件 start
        */

      $('#im_inform_table tr input[type=checkbox]').removeAttr('checked');
      $('#im_inform_table').on('click', 'tr input[type=checkbox]', function() {
          if(this.checked){
              $(this).closest('tr').addClass('selected1');
          } else {
       	   im_tablebox.display_bar($('#im_inform_table tr input[type=checkbox]:checked').length);
              $(this).closest('tr').removeClass('selected1');
          }
      });


      //im select all
      $('#im_item_all').on('click', function(e) {
          e.preventDefault();
          im_tablebox.select_all();
      });

      //im select none
      $('#im_item_none').on('click', function(e) {
          e.preventDefault();
          im_tablebox.select_none();
      });



      //check/uncheck all tr
      $('#im_toggle_all').removeAttr('checked').on('click', function(){
          if(this.checked) {
        	  im_tablebox.select_all();
          } else im_tablebox.select_none();
      });

      var im_tablebox = {
          select_all : function() {
              var count = 0;
              $('#im_inform_table tr input[type=checkbox]').each(function(){
                  this.checked = true;
                  $(this).closest('tr').addClass('selected1');
                  count++;
              });

              $('#im_toggle_all').get(0).checked = true;

          }
          ,
          select_none : function() {
              $('#im_inform_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
              $('#im_toggle_all').get(0).checked = false;

              im_tablebox.display_bar(0);
          }
      }
      /**
       * im多选框点击事件 end
       */


      //未处理
      $("#im-status-unchecked").on("click",function(){
    	  im_status=0;
    	  im_page=0;
          $("#im_more").removeClass("hidden");
          getIMInformData(im_status);
      });
      //已屏蔽
      $("#im-status-shielded").on("click",function(){
    	  im_status=1;
    	  im_page=0;
          $("#im_more").removeClass("hidden");
          getIMInformData(im_status);
      });
      //已禁言
      $("#im-status-gag").on("click",function(){
    	  im_status=3;
    	  im_page=0;
          $("#im_more").removeClass("hidden");
          getIMInformData(im_status);
      });
      //已忽略
      $("#im-status-ignored").on("click",function(){
    	  im_status=2;
    	  im_page=0;
          $("#im_more").removeClass("hidden");
          getIMInformData(im_status);
      });



      /**
       * 异步加载数据 im举报 Start
       */
      
      function getIMInformData(){
          $.ajax({
              type: 'POST',
              dataType: 'json',
              url: appName+"/inform/im/list",
              data:{status:im_status,page:im_page},
              success: function (data) {
                  if (data.code == 200) {
                      //清空原有的数据
                      $("#im_inform_table tbody tr").remove();
                      if (data.number > 0) {
                    	  im_page = data.page_num ;
                          //加载数据
                          $.each(data.imInformList, function (index, inform) {
                              var htmlStr = showIMInformData(inform.id,
                              		inform.contain_id,
                              		inform.informer_name,
                              		inform.contain,
                                    inform.image,
                              		inform.user_name,
                              		inform.inform_type,
                              		inform.inform_reason,
                              		inform.total,
                              		inform.update_time,
                              		inform.status,
                              		inform.dispose_info,
                                    inform.user_id
                              );
                              $("#im_inform_table tbody").append(htmlStr);
                          });
                      } else {
                          $.gritter.add({
                              title: '无数据',
                              time: 2000,
                              class_name: 'gritter-info gritter-light'
                          });
                      }
                  } else {
                      $.gritter.add({
                          title: "出现" + data.code + "异常",
                          time: 2000,
                          class_name: 'gritter-error gritter-light'
                      });
                      if (data.msg != "") {
                          $.gritter.add({
                              title: data.msg,
                              time: 2000,
                              class_name: 'gritter-error gritter-light'
                          });
                      } else {
                          $.gritter.add({
                              title: "出现未知异常",
                              time: 2000,
                              class_name: 'gritter-error gritter-light'
                          });
                      }
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
      }

      function showIMInformData(id,
          contain_id,
          informer_name,
          contain,
          image,
          user_name,
          inform_type,
          inform_reason,
          total,
          update_time,
          status,
          dispose_info, user_id
          ) {
      	update_time=new Date(update_time).pattern("yyyy-MM-dd HH:mm:ss");
      	if(inform_reason==""||inform_reason==null){
      		inform_reason="无";
      	}
      	switch(inform_type){
	        	case 0:
	        		inform_type="其他";
                  break;
	        	case 1:
	        		inform_type="淫秽色情";
                  break;
	        	case 2:
	        		inform_type="垃圾广告";
                  break;
	        	case 3:
	        		inform_type="恶意咒骂";
                  break;
	        	case 4:
	        		inform_type="政治敏感";
                  break;
      	}
        if(image!="无"){
            if(image.indexOf("http:")<0){
                contain="<img width='300' height='300' class='nav-user-photo' src='" +content_image+ image + "'/>";
            }else{
                contain="<img width='300' height='300' class='nav-user-photo' src='" + image + "'/>";
            }
        }
      	if(status==1){
      		status="<button class='btn btn-xs btn-success im_ungag'>解禁</button>";
      	}else if(status==2) {
      		status="<button class='btn btn-xs btn-success im_ignore_dispose'>已忽略</button>";
      	}else if(status==-1){
      		status="<button class='btn btn-xs btn-danger'>已删除</button>";
      	}else if (status==3){
			status="<button class='btn btn-xs btn-success im_ungag'>解禁</button>";
      	}else if(status==0) {
      		status="<button class='btn btn-xs btn-danger im_sheild'>屏蔽</button>&nbsp;" +
      		"<button class='btn btn-xs btn-danger im_gag'>禁言</button>&nbsp;" +
				"<button class='btn btn-xs btn-success im_ignore'>忽略</button>"
      	}
          var htmlStr = "<tr>"+
                  "<td class='center'>"+
                  "                                        <label class='inline'>"+
                  "                                            <input type='checkbox' class='ace'/>"+
                  "                                            <span class='lbl'></span>"+
                  "                                        </label>"+
                  "                                    </td>"+
                  "<td class='center'>"+id+"</td>"+
                  "<td class='center'>"+contain_id+"</td>"+
                  "<td class='center'>"+informer_name+"</td>"+
                  "<td class='center contain'>"+contain+"</td>"+
                  "<td class='center'>"+user_name+"</td>"+
                  "<td class='center'>"+inform_type+"</td>"+
                  "<td class='center inform_reason'>"+inform_reason+"</td>"+
                  "<td class='center'>"+total+"</td>"+
                  "<td class='center'>"+update_time+"</td>"+
                  "<td class='center sub'>"+status+"</td>"+
                  "<td style='display:none'>"+dispose_info+"</td>"+
                  "<td style='display:none'>"+user_id+"</td>"+
                  "</tr>" ;
          return htmlStr ;
      }

      /**
       * 异步加载数据 im举报 end
       */




      //向下加载im举报数据
      $('#im_more').on(ace.click_event, function(){
          if(im_page>0){
          	$.ajax({
                  type: 'POST',
                  dataType: 'json',
                  url: appName+"/inform/im/list",
                  data:{page:im_page,status:im_status},
                  success: function (data) {
                      if (data.code == 200) {
                          if (data.number > 0) {
                        	  im_page = data.page_num;
                              //加载数据
                              $.each(data.imInformList, function (index, inform) {
                                  var htmlStr = showIMInformData(inform.id,
                                  		inform.contain_id,
                                  		inform.informer_name,
                                  		inform.contain,
                                  		inform.image,
                                  		inform.user_name,
                                  		inform.inform_type,
                                  		inform.inform_reason,
                                  		inform.total,
                                  		inform.update_time,
                                  		inform.status,
                                  		inform.dispose_info,
                                        inform.user_id);
                                  $("#im_inform_table tbody").append(htmlStr);
                              });
                          } else {
                              $.gritter.add({
                                  title: '无更多举报信息',
                                  time: 2000,
                                  class_name: 'gritter-info gritter-light'
                              });
                              //设置加载按钮消失
                              $("#im_more").addClass("hidden");
                          }
                      } else {
                          $.gritter.add({
                              title: "出现" + data.code + "异常",
                              time: 2000,
                              class_name: 'gritter-error gritter-light'
                          });
                          if (data.msg != "") {
                              $.gritter.add({
                                  title: data.msg,
                                  time: 2000,
                                  class_name: 'gritter-error gritter-light'
                              });
                          } else {
                              $.gritter.add({
                                  title: "出现未知异常",
                                  time: 2000,
                                  class_name: 'gritter-error gritter-light'
                              });
                          }
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
          }else{
          	$.gritter.add({
                  title: '无更多举报信息',
                  time: 2000,
                  class_name: 'gritter-info gritter-light'
              });
              //设置加载按钮消失
              $("#im_more").addClass("hidden");
          }

          return false;
      });
      
      //屏蔽
      $('#im_inform_table tbody').on('click', 'button.im_sheild', function () {
      	         $("#inform_time_div").removeClass("hidden");
          var tmpTr = $(this).closest("tr");
          var id =  tmpTr.find("td:eq(1)").html();
          var user_id=tmpTr.find("td:eq(12)").html();
          var inform_reason=tmpTr.find("td:eq(7)").html();
          var user_name=tmpTr.find("td:eq(5)").html();
          var contain=tmpTr.find("td:eq(4)").html();
          var status=1;
          $("#modal_inform_reason").removeClass("hidden");
          $("#inform_title").html("举报屏蔽处理");
          $("#id").html(id);
          $("#user_id").html(user_id);
          $("#user_name").html(user_name);
          $("#contain").html(contain);
          $("#inform_reason").html(inform_reason);
          $("#status").val(status);
          $("#type").val(type_im);
          $("#modal_inform").modal({backdrop: 'static'});
      });
      //禁言
      $('#im_inform_table tbody').on('click', 'button.im_gag', function () {
      	$("#inform_time_div").removeClass("hidden");
          var tmpTr = $(this).closest("tr");
          var id =  tmpTr.find("td:eq(1)").html();
          var user_id=tmpTr.find("td:eq(12)").html();
          var inform_reason=tmpTr.find("td:eq(7)").html();
          var user_name=tmpTr.find("td:eq(5)").html();
          var contain=tmpTr.find("td:eq(4)").html();
          var status=3;
          $("#inform_title").html("举报禁言处理");
          $("#id").html(id);
          $("#user_id").html(user_id);
          $("#user_name").html(user_name);
          $("#contain").html(contain);
          $("#inform_reason").html(inform_reason);
          $("#status").val(status);
          $("#type").val(type_im);
          $("#modal_inform").modal({backdrop: 'static'});
      });
      //忽略
      $('#im_inform_table tbody').on('click', 'button.im_ignore', function () {
          var tmpTr = $(this).closest("tr");
          var id =  tmpTr.find("td:eq(1)").html();
          var user_id=tmpTr.find("td:eq(12)").html();
          var inform_reason=tmpTr.find("td:eq(7)").html();
          var user_name=tmpTr.find("td:eq(5)").html();
          var contain=tmpTr.find("td:eq(4)").html();
          var status=2;
          $("#modal_inform_reason").removeClass("hidden");
          $("#inform_title").html("举报忽略处理");
          $("#id").html(id);
          $("#user_id").html(user_id);
          $("#user_name").html(user_name);
          $("#contain").html(contain);
          $("#inform_reason").html(inform_reason);
          $("#status").val(status);
          $("#type").val(type_im);
         $("#inform_time_div").addClass("hidden");

          $("#modal_inform").modal({backdrop: 'static'});
      });
        //解禁
        $('#im_inform_table tbody').on('click', 'button.im_ungag', function () {
            var tmpTr = $(this).closest("tr");
            var id =  tmpTr.find("td:eq(1)").html();
            var user_id=tmpTr.find("td:eq(12)").html();
            var inform_reason=tmpTr.find("td:eq(6)").html();
            var user_name=tmpTr.find("td:eq(3)").html();
            var status=2;
            $("#modal_inform_reason").removeClass("hidden");
            $("#ungag_id").html(id);
            $("#ungag_user_id").html(user_id);
            $("#ungag_name").html(user_name);
            $("#ungag_contain").html("无");
            $("#ungag_inform_reason").html(inform_reason);
            $("#status").val(status);
            $("#ungag_type").val(type_im);
            $("#inform_time_div").addClass("hidden");
            $("#modal_ungag").modal({backdrop: 'static'});
        });
      
      
/*      //显示处理信息
      $('#im_inform_table tbody').on('click', 'button.im_sheild_dispose', function () {
          var tmpTr = $(this).closest("tr");
          var dispose_info =  tmpTr.find("td:eq(11)").html();
          $("#dispose_info_reason").html(dispose_info);
          $("#modal_dispose").modal({backdrop: 'static'});
      });
      $('#im_inform_table tbody').on('click', 'button.im_ignore_dispose', function () {
          var tmpTr = $(this).closest("tr");
          var dispose_info =  tmpTr.find("td:eq(11)").html();
          $("#dispose_info_reason").html(dispose_info);
          $("#modal_dispose").modal({backdrop: 'static'});
      });*/

/*      //一键屏蔽
      $('button.im_all_sheild').on('click', function () {
          var ids = "";
          $("#im_inform_table tbody").find('tr').each(function () {
              //获取所选的行
              var tmp = $(this).find("td:eq(0) input[type=checkbox]");
              var checked =  tmp.prop('checked');
              var tr_id = $(this).find("td:eq(1)").html();
              if (checked){
                  ids += tr_id+",";
              }
          });
          $("#status_all").val(1);
          $("#ids").val(ids);
          $("#type").val(type_im);
          if(ids!=""){
              $("#modal_inform_all").modal({backdrop: 'static'});
          }else{
              $.gritter.add({
                  title: "请选择要屏蔽的举报",
                  time: 2000,
                  class_name: 'gritter-warning gritter-light'
              });
          }

      });*/
      //一键忽略
/*      $('button.im_all_ignore').on('click', function () {
          var ids = "";
          $("#im_inform_table tbody").find('tr').each(function () {
              //获取所选的行
              var tmp = $(this).find("td:eq(0) input[type=checkbox]");
              var checked =  tmp.prop('checked');
              var tr_id = $(this).find("td:eq(1)").html();
              if (checked){
                  ids += tr_id+",";
              }
          });
          $("#status_all").val(2);
          $("#ids").val(ids);
          $("#type").val(type_im);
          if(ids!=""){
              $("#modal_inform_all").modal({backdrop: 'static'});
          }else{
              $.gritter.add({
                  title: "请选择要忽略的举报",
                  time: 2000,
                  class_name: 'gritter-warning gritter-light'
              });
          }

      });*/
       
/**    
 * im end
 */
      
   
      
      
/**
 * user start
 */
      
      
      /**
       * 用户举报多选框点击事件 start
       */

     $('#user_inform_table tr input[type=checkbox]').removeAttr('checked');
     $('#user_inform_table').on('click', 'tr input[type=checkbox]', function() {
         if(this.checked){
             $(this).closest('tr').addClass('selected1');
         } else {
        	 user_tablebox.display_bar($('#user_inform_table tr input[type=checkbox]:checked').length);
             $(this).closest('tr').removeClass('selected1');
         }
     });


     //user select all
     $('#user_item_all').on('click', function(e) {
         e.preventDefault();
         user_tablebox.select_all();
     });

     //user select none
     $('#user_item_none').on('click', function(e) {
         e.preventDefault();
         user_tablebox.select_none();
     });



     //check/uncheck all tr
     $('#user_toggle_all').removeAttr('checked').on('click', function(){
         if(this.checked) {
        	 user_tablebox.select_all();
         } else user_tablebox.select_none();
     });

     var user_tablebox = {
         select_all : function() {
             var count = 0;
             $('#user_inform_table tr input[type=checkbox]').each(function(){
                 this.checked = true;
                 $(this).closest('tr').addClass('selected1');
                 count++;
             });

             $('#user_toggle_all').get(0).checked = true;

         }
         ,
         select_none : function() {
             $('#user_inform_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
             $('#user_toggle_all').get(0).checked = false;

             user_tablebox.display_bar(0);
         }
     }
     /**
      * user多选框点击事件 end
      */


     //未处理
     $("#user-status-unchecked").on("click",function(){
    	 user_status=0;
    	 user_page=0;
         $("#user_more").removeClass("hidden");
         getUserInformData(user_status);
     });
     //已屏蔽
     $("#user-status-shielded").on("click",function(){
    	 user_status=1;
    	 user_page=0;
         $("#user_more").removeClass("hidden");
         getUserInformData(user_status);
     });
     //已禁言
     $("#user-status-gag").on("click",function(){
    	 user_status=3;
    	 user_page=0;
         $("#user_more").removeClass("hidden");
         getUserInformData(user_status);
     });
     //已忽略
     $("#user-status-ignored").on("click",function(){
    	 user_status=2;
    	 user_page=0;
         $("#user_more").removeClass("hidden");
         getUserInformData(user_status);
     });



     /**
      * 异步加载数据 用户举报 Start
      */
     
     function getUserInformData(){
         $.ajax({
             type: 'POST',
             dataType: 'json',
             url: appName+"/inform/user/list",
             data:{status:user_status,page:user_page},
             success: function (data) {
                 if (data.code == 200) {
                     //清空原有的数据
                     $("#user_inform_table tbody tr").remove();
                     if (data.number > 0) {
                    	 user_page = data.page_num ;
                         //加载数据
                         $.each(data.userInformList, function (index, inform) {
                             var htmlStr = showUserInformData(inform.id,
                             		inform.contain_id,
                             		inform.contain,
                             		inform.informer_name,
                             		inform.inform_type,
                             		inform.inform_reason,
                             		inform.total,
                             		inform.update_time,
                             		inform.status,
                             		inform.dispose_info);
                             $("#user_inform_table tbody").append(htmlStr);
                         });
                     } else {
                         $.gritter.add({
                             title: '无数据',
                             time: 2000,
                             class_name: 'gritter-info gritter-light'
                         });
                     }
                 } else {
                     $.gritter.add({
                         title: "出现" + data.code + "异常",
                         time: 2000,
                         class_name: 'gritter-error gritter-light'
                     });
                     if (data.msg != "") {
                         $.gritter.add({
                             title: data.msg,
                             time: 2000,
                             class_name: 'gritter-error gritter-light'
                         });
                     } else {
                         $.gritter.add({
                             title: "出现未知异常",
                             time: 2000,
                             class_name: 'gritter-error gritter-light'
                         });
                     }
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
     }

     function showUserInformData(id,
      		contain_id,
     		contain,
     		informer_name,
     		inform_type,
     		inform_reason,
     		total,
     		update_time,
     		status,
     		dispose_info
         ) {
     	update_time=new Date(update_time).pattern("yyyy-MM-dd HH:mm:ss");
     	if(inform_reason==""||inform_reason==null){
     		inform_reason="无";
     	}
     	switch(inform_type){
	        	case 0:
	        		inform_type="其他";
                 break;
	        	case 1:
	        		inform_type="淫秽色情";
                 break;
	        	case 2:
	        		inform_type="垃圾广告";
                 break;
	        	case 3:
	        		inform_type="恶意咒骂";
                 break;
	        	case 4:
	        		inform_type="政治敏感";
                 break;
     	}
     	if(status==1){
     		status="<button class='btn btn-xs btn-danger user_ungag'>解禁</button>";
     	}else if(status==2) {
     		status="<button class='btn btn-xs btn-success user_ignore_dispose'>已忽略</button>";
     	}else if(status==-1){
     		status="<button class='btn btn-xs btn-danger'>已删除</button>";
     	}else if(status==3){
     		status="<button class='btn btn-xs btn-danger user_ungag'>解禁</button>";
     	}else if(status==0){
     		status="<button class='btn btn-xs btn-danger user_sheild'>屏蔽</button>&nbsp;" +
     				"<button class='btn btn-xs btn-danger user_gag'>禁言</button>&nbsp;"+
     				"<button class='btn btn-xs btn-success user_ignore'>忽略</button>"
     	}
         var htmlStr = "<tr>"+
                 "<td class='center'>"+
                 "                                        <label class='inline'>"+
                 "                                            <input type='checkbox' class='ace'/>"+
                 "                                            <span class='lbl'></span>"+
                 "                                        </label>"+
                 "                                    </td>"+
                 "<td class='center'>"+id+"</td>"+
                 "<td class='center'>"+contain_id+"</td>"+
                 "<td class='center'>"+contain+"</td>"+
                 "<td class='center'>"+informer_name+"</td>"+
                 "<td class='center'>"+inform_type+"</td>"+
                 "<td class='center inform_reason'>"+inform_reason+"</td>"+
                 "<td class='center'>"+total+"</td>"+
                 "<td class='center'>"+update_time+"</td>"+
                 "<td class='center'>"+status+"</td>"+
                 "<td style='display:none'>"+dispose_info+"</td>"+

                 "</tr>" ;
         return htmlStr ;
     }

     /**
      * 异步加载数据 用户举报 end
      */




     //向下加载用户举报数据
     $('#user_more').on(ace.click_event, function(){
         if(user_page>0){
         	$.ajax({
                 type: 'POST',
                 dataType: 'json',
                 url: appName+"/inform/user/list",
                 data:{page:user_page,status:user_status},
                 success: function (data) {
                     if (data.code == 200) {
                         if (data.number > 0) {
                        	 user_page = data.page_num;
                             //加载数据
                             $.each(data.userInformList, function (index, inform) {
                                 var htmlStr = showUserInformData(inform.id,
                                  		inform.contain_id,
                                 		inform.contain,
                                 		inform.informer_name,
                                 		inform.inform_type,
                                 		inform.inform_reason,
                                 		inform.total,
                                 		inform.update_time,
                                 		inform.status,
                                 		inform.dispose_info);
                                 $("#user_inform_table tbody").append(htmlStr);
                             });
                         } else {
                             $.gritter.add({
                                 title: '无更多举报信息',
                                 time: 2000,
                                 class_name: 'gritter-info gritter-light'
                             });
                             //设置加载按钮消失
                             $("#user_more").addClass("hidden");
                         }
                     } else {
                         $.gritter.add({
                             title: "出现" + data.code + "异常",
                             time: 2000,
                             class_name: 'gritter-error gritter-light'
                         });
                         if (data.msg != "") {
                             $.gritter.add({
                                 title: data.msg,
                                 time: 2000,
                                 class_name: 'gritter-error gritter-light'
                             });
                         } else {
                             $.gritter.add({
                                 title: "出现未知异常",
                                 time: 2000,
                                 class_name: 'gritter-error gritter-light'
                             });
                         }
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
         }else{
         	$.gritter.add({
                 title: '无更多举报信息',
                 time: 2000,
                 class_name: 'gritter-info gritter-light'
             });
             //设置加载按钮消失
             $("#user_more").addClass("hidden");
         }

         return false;
     });
     //屏蔽
     $('#user_inform_table tbody').on('click', 'button.user_sheild', function () {
     	$("#inform_time_div").removeClass("hidden");
     	$("#modal_user_id").removeClass("hidden");
         var tmpTr = $(this).closest("tr");
         var id =  tmpTr.find("td:eq(1)").html();
         var user_id=tmpTr.find("td:eq(2)").html();
         var inform_reason=tmpTr.find("td:eq(6)").html();
         var user_name=tmpTr.find("td:eq(3)").html();
         var status=1;
         $("#modal_inform_reason").removeClass("hidden");
         $("#inform_title").html("举报屏蔽处理");
         $("#id").html(id);
         $("#user_id").html(user_id);
         $("#user_name").html(user_name);
         $("#contain").html("无");
         $("#inform_reason").html(inform_reason);
         $("#status").val(status);
         $("#type").val(type_user);
         $("#modal_inform").modal({backdrop: 'static'});
     });
     //禁言
     $('#user_inform_table tbody').on('click', 'button.user_gag', function () {
     	$("#inform_time_div").removeClass("hidden");
     	$("#modal_user_id").removeClass("hidden");
         var tmpTr = $(this).closest("tr");
         var id =  tmpTr.find("td:eq(1)").html();
         var user_id=tmpTr.find("td:eq(2)").html();
         var inform_reason=tmpTr.find("td:eq(6)").html();
         var user_name=tmpTr.find("td:eq(3)").html();
         var status=3;
         $("#modal_inform_reason").removeClass("hidden");
         $("#inform_title").html("举报禁言处理");
         $("#id").html(id);
         $("#user_id").html(user_id);
         $("#user_name").html(user_name);
         $("#contain").html("无");
         $("#inform_reason").html(inform_reason);
         $("#status").val(status);
         $("#type").val(type_user);
         $("#modal_inform").modal({backdrop: 'static'});
     });
     //忽略
     $('#user_inform_table tbody').on('click', 'button.user_ignore', function () {
         var tmpTr = $(this).closest("tr");
         var id =  tmpTr.find("td:eq(1)").html();
         var user_id=tmpTr.find("td:eq(2)").html();
         var inform_reason=tmpTr.find("td:eq(6)").html();
         var user_name=tmpTr.find("td:eq(3)").html();
         var status=2;
         $("#modal_inform_reason").removeClass("hidden");
         $("#inform_title").html("举报忽略处理");
         $("#id").html(id);
         $("#user_id").html(user_id);
         $("#user_name").html(user_name);
         $("#contain").html("无");
         $("#inform_reason").html(inform_reason);
         $("#status").val(status);
         $("#ungag_type").val(type_user);
         $("#modal_user_id").removeClass("hidden");
         $("#inform_time_div").addClass("hidden");
         $("#modal_inform").modal({backdrop: 'static'});
     });
        //解禁
        $('#user_inform_table tbody').on('click', 'button.user_ungag', function () {
            var tmpTr = $(this).closest("tr");
            var id =  tmpTr.find("td:eq(1)").html();
            var user_id=tmpTr.find("td:eq(2)").html();
            var inform_reason=tmpTr.find("td:eq(6)").html();
            var user_name=tmpTr.find("td:eq(3)").html();
            var status=2;
            $("#modal_inform_reason").removeClass("hidden");
            $("#ungag_id").html(id);
            $("#ungag_user_id").html(user_id);
            $("#ungag_name").html(user_name);
            $("#ungag_contain").html("无");
            $("#ungag_inform_reason").html(inform_reason);
            $("#status").val(status);
            $("#ungag_type").val(type_user);
            $("#modal_user_id").removeClass("hidden");
            $("#inform_time_div").addClass("hidden");
            $("#modal_ungag").modal({backdrop: 'static'});
        });

     
/*     //显示处理信息
     $('#user_inform_table tbody').on('click', 'button.user_sheild_dispose', function () {
         var tmpTr = $(this).closest("tr");
         var dispose_info =  tmpTr.find("td:eq(10)").html();
         $("#dispose_info_reason").html(dispose_info);
         $("#modal_dispose").modal({backdrop: 'static'});
     });
     $('#user_inform_table tbody').on('click', 'button.user_ignore_dispose', function () {
         var tmpTr = $(this).closest("tr");
         var dispose_info =  tmpTr.find("td:eq(10)").html();
         $("#dispose_info_reason").html(dispose_info);
         $("#modal_dispose").modal({backdrop: 'static'});
     });*/

/*     //一键屏蔽
     $('button.user_all_sheild').on('click', function () {
         var ids = "";
         $("#user_inform_table tbody").find('tr').each(function () {
             //获取所选的行
             var tmp = $(this).find("td:eq(0) input[type=checkbox]");
             var checked =  tmp.prop('checked');
             var tr_id = $(this).find("td:eq(1)").html();
             if (checked){
                 ids += tr_id+",";
             }
         });
         $("#status_all").val(1);
         $("#ids").val(ids);
         $("#type").val(type_im);
         if(ids!=""){
             $("#modal_inform_all").modal({backdrop: 'static'});
         }else{
             $.gritter.add({
                 title: "请选择要屏蔽的举报",
                 time: 2000,
                 class_name: 'gritter-warning gritter-light'
             });
         }

     });*/
     //一键忽略
/*     $('button.user_all_ignore').on('click', function () {
         var ids = "";
         $("#user_inform_table tbody").find('tr').each(function () {
             //获取所选的行
             var tmp = $(this).find("td:eq(0) input[type=checkbox]");
             var checked =  tmp.prop('checked');
             var tr_id = $(this).find("td:eq(1)").html();
             if (checked){
                 ids += tr_id+",";
             }
         });
         $("#status_all").val(2);
         $("#ids").val(ids);
         $("#type").val(type_im);
         if(ids!=""){
             $("#modal_inform_all").modal({backdrop: 'static'});
         }else{
             $.gritter.add({
                 title: "请选择要忽略的举报",
                 time: 2000,
                 class_name: 'gritter-warning gritter-light'
             });
         }

     });*/
      
      
/**
 * user end
 */

/**
 * news start
 */

        /**
         * 新闻评论举报多选框点击事件 start
         */

        $('#news_inform_table tr input[type=checkbox]').removeAttr('checked');
        $('#news_inform_table').on('click', 'tr input[type=checkbox]', function() {
            if(this.checked){
                $(this).closest('tr').addClass('selected1');
            } else {
                content_tablebox.display_bar($('#news_inform_table tr input[type=checkbox]:checked').length);
                $(this).closest('tr').removeClass('selected1');
            }
        });


        //news select all
        $('#news_item_all').on('click', function(e) {
            e.preventDefault();
            news_tablebox.select_all();
        });

        //news select none
        $('#news_item_none').on('click', function(e) {
            e.preventDefault();
            news_tablebox.select_none();
        });



        //check/uncheck all tr
        $('#news_toggle_all').removeAttr('checked').on('click', function(){
            if(this.checked) {
                news_tablebox.select_all();
            } else news_tablebox.select_none();
        });

        var news_tablebox = {
            select_all : function() {
                var count = 0;
                $('#news_inform_table tr input[type=checkbox]').each(function(){
                    this.checked = true;
                    $(this).closest('tr').addClass('selected1');
                    count++;
                });

                $('#news_toggle_all').get(0).checked = true;


            }
            ,
            select_none : function() {
                $('#news_inform_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
                $('#news_toggle_all').get(0).checked = false;

                news_tablebox.display_bar(0);
            }
        }
        /**
         * 新闻评论多选框点击事件 end
         */


        //未处理
        $("#news-status-unchecked").on("click",function(){
            news_status=0;
            news_page=0;
            $("#news_more").removeClass("hidden");
            getNewsInformData(news_status);
        });
        //已屏蔽
        $("#news-status-shielded").on("click",function(){
            news_status=1;
            news_page=0;
            $("#news_more").removeClass("hidden");
            getNewsInformData(news_status);
        });
        //已忽略
        $("#news-status-ignored").on("click",function(){
            news_status=2;
            news_page=0;
            $("#news_more").removeClass("hidden");
            getNewsInformData(news_status);
        });



        /**
         * 异步加载数据 新闻评论举报 Start
         */

        function getNewsInformData(){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/inform/news/list",
                data:{status:news_status,page:news_page},
                success: function (data) {
                    if (data.code == 200) {
                        //清空原有的数据
                        $("#news_inform_table tbody tr").remove();
                        if (data.number > 0) {
                            news_page = data.now_page ;
                            //加载数据
                            $.each(data.newsInformList, function (index, inform) {
                                var htmlStr = showNewsInformData(inform.id,
                                    inform.contain_id,
                                    inform.contain,
                                    inform.user_name,
                                    inform.informer_name,
                                    inform.inform_type,
                                    inform.total,
                                    inform.update_time,
                                    inform.status,
                                    inform.dispose_info);
                                $("#news_inform_table tbody").append(htmlStr);
                            });
                        } else {
                            $.gritter.add({
                                title: '无数据',
                                time: 2000,
                                class_name: 'gritter-info gritter-light'
                            });
                        }
                    } else {
                        $.gritter.add({
                            title: "出现" + data.code + "异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                        } else {
                            $.gritter.add({
                                title: "出现未知异常",
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                        }
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
        }

        function showNewsInformData(id,
                                    contain_id,
                                    contain,
                                    user_name,
                                    informer_name,
                                    inform_type,
                                    total,
                                    update_time,
                                    status,
                                    dispose_info
        ) {
            update_time=new Date(update_time).pattern("yyyy-MM-dd HH:mm:ss");
            switch(inform_type){
                case 0:
                    inform_type="其他";
                    break;
                case 1:
                    inform_type="淫秽色情";
                    break;
                case 2:
                    inform_type="垃圾广告";
                    break;
                case 3:
                    inform_type="恶意咒骂";
                    break;
                case 4:
                    inform_type="政治敏感";
                    break;
            }
            if(status==1){
                status="<button class='btn btn-xs btn-danger news_sheild_dispose'>已屏蔽</button>";
            }else if(status==2) {
                status="<button class='btn btn-xs btn-success news_ignore_dispose'>已忽略</button>";
            }else if(status==-1){
                status="<button class='btn btn-xs btn-danger'>已删除</button>";
            }else{
                status="<button class='btn btn-xs btn-danger news_sheild'>屏蔽</button>&nbsp;" +
                    "<button class='btn btn-xs btn-success news_ignore'>忽略</button>"
            }
            var htmlStr = "<tr>"+
                "<td class='center'>"+
                "                                        <label class='inline'>"+
                "                                            <input type='checkbox' class='ace'/>"+
                "                                            <span class='lbl'></span>"+
                "                                        </label>"+
                "                                    </td>"+
                "<td class='center'>"+id+"</td>"+
                "<td class='center'>"+contain_id+"</td>"+
                "<td class='center contain'>"+contain+"</td>"+
                "<td class='center'>"+user_name+"</td>"+
                "<td class='center'>"+informer_name+"</td>"+
                "<td class='center'>"+inform_type+"</td>"+
                "<td class='center'>"+total+"</td>"+
                "<td class='center'>"+update_time+"</td>"+
                "<td class='center'>"+status+"</td>"+
                "<td style='display:none'>"+dispose_info+"</td>"+

                "</tr>" ;
            return htmlStr ;
        }

        /**
         * 异步加载数据 新闻评论举报 end
         */




        //向下加载新闻评论举报数据
        $('#news_more').on(ace.click_event, function(){
            if(news_page>0){
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/inform/news/list",
                    data:{start_id:news_page,status:news_status},
                    success: function (data) {
                        if (data.code == 200) {
                            if (data.number > 0) {
                                news_page = data.now_page;
                                //加载数据
                                $.each(data.newsInformList, function (index, inform) {
                                    var htmlStr = showNewsInformData(inform.id,
                                        inform.contain_id,
                                        inform.contain,
                                        inform.user_name,
                                        inform.informer_name,
                                        inform.inform_type,
                                        inform.total,
                                        inform.update_time,
                                        inform.status,
                                        inform.dispose_info);
                                    $("#news_inform_table tbody").append(htmlStr);
                                });
                            } else {
                                $.gritter.add({
                                    title: '无更多举报信息',
                                    time: 2000,
                                    class_name: 'gritter-info gritter-light'
                                });
                                //设置加载按钮消失
                                $("#news_more").addClass("hidden");
                            }
                        } else {
                            $.gritter.add({
                                title: "出现" + data.code + "异常",
                                time: 2000,
                                class_name: 'gritter-error gritter-light'
                            });
                            if (data.msg != "") {
                                $.gritter.add({
                                    title: data.msg,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-light'
                                });
                            } else {
                                $.gritter.add({
                                    title: "出现未知异常",
                                    time: 2000,
                                    class_name: 'gritter-error gritter-light'
                                });
                            }
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
            }else{
                $.gritter.add({
                    title: '无更多举报信息',
                    time: 2000,
                    class_name: 'gritter-info gritter-light'
                });
                //设置加载按钮消失
                $("#news_more").addClass("hidden");
            }

            return false;
        });

        //屏蔽
        $('#news_inform_table tbody').on('click', 'button.news_sheild', function () {
            var tmpTr = $(this).closest("tr");
            var id =  tmpTr.find("td:eq(1)").html();
            var user_name=tmpTr.find("td:eq(4)").html();
            var contain=tmpTr.find("td:eq(3)").html();
            var status=1;
            $("#inform_title").html("举报屏蔽处理");
            $("#id").html(id);
            $("#user_name").html(user_name);
            $("#contain").html(contain);
            $("#status").val(status);
            $("#type").val(type_news);
            $("#modal_user_id").addClass("hidden");
            $("#inform_time_div").addClass("hidden");
            $("#modal_inform_reason").addClass("hidden");
            $("#modal_inform").modal({backdrop: 'static'});
        });
        //忽略
        $('#news_inform_table tbody').on('click', 'button.news_ignore', function () {
            var tmpTr = $(this).closest("tr");
            var id =  tmpTr.find("td:eq(1)").html();
            var user_name=tmpTr.find("td:eq(4)").html();
            var contain=tmpTr.find("td:eq(3)").html();
            var status=2;
            
            $("#inform_title").html("举报忽略处理");
            $("#id").html(id);
            $("#user_name").html(user_name);
            $("#contain").html(contain);
            $("#status").val(status);
            $("#type").val(type_news);
            $("#modal_user_id").addClass("hidden");
            $("#modal_inform_reason").addClass("hidden");
            $("#inform_time_div").addClass("hidden");
            $("#modal_inform").modal({backdrop: 'static'});
        });


/**
 * news end
 */
        
        
        /**
         * news main start
         */

                /**
                 * 新闻举报多选框点击事件 start
                 */

                $('#news_inform_table tr input[type=checkbox]').removeAttr('checked');
                $('#news_inform_table').on('click', 'tr input[type=checkbox]', function() {
                    if(this.checked){
                        $(this).closest('tr').addClass('selected1');
                    } else {
                        content_tablebox.display_bar($('#news_inform_table tr input[type=checkbox]:checked').length);
                        $(this).closest('tr').removeClass('selected1');
                    }
                });


                //news select all
                $('#news_item_all').on('click', function(e) {
                    e.preventDefault();
                    news_tablebox.select_all();
                });

                //news select none
                $('#news_item_none').on('click', function(e) {
                    e.preventDefault();
                    news_tablebox.select_none();
                });



                //check/uncheck all tr
                $('#news_toggle_all').removeAttr('checked').on('click', function(){
                    if(this.checked) {
                        news_tablebox.select_all();
                    } else news_tablebox.select_none();
                });

                var news_tablebox = {
                    select_all : function() {
                        var count = 0;
                        $('#news_inform_table tr input[type=checkbox]').each(function(){
                            this.checked = true;
                            $(this).closest('tr').addClass('selected1');
                            count++;
                        });

                        $('#news_toggle_all').get(0).checked = true;


                    }
                    ,
                    select_none : function() {
                        $('#news_inform_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
                        $('#news_toggle_all').get(0).checked = false;

                        news_tablebox.display_bar(0);
                    }
                }
                /**
                 * 新闻多选框点击事件 end
                 */


                //未处理
                $("#news-main-status-unchecked").on("click",function(){
                    news_main_status=0;
                    news_main_page=0;
                    $("#news_main_more").removeClass("hidden");
                    getNewsMainInformData(news_main_status);
                });
                //已屏蔽
                $("#news-main-status-shielded").on("click",function(){
                    news_main_status=1;
                    news_main_page=0;
                    $("#news_main_more").removeClass("hidden");
                    getNewsMainInformData(news_main_status);
                });
                //已忽略
                $("#news-main-status-ignored").on("click",function(){
                    news_main_status=2;
                    news_main_page=0;
                    $("#news_main_more").removeClass("hidden");
                    getNewsMainInformData(news_main_status);
                });



                /**
                 * 异步加载数据 新闻评论举报 Start
                 */

                function getNewsMainInformData(){
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName+"/inform/news/main/list",
                        data:{status:news_main_status,page:news_main_page},
                        success: function (data) {
                            if (data.code == 200) {
                                //清空原有的数据
                                $("#news_main_inform_table tbody tr").remove();
                                if (data.number > 0) {
                                    news_main_page = data.page_num ;
                                    //加载数据
                                    $.each(data.newsInformList, function (index, inform) {
                                        var htmlStr = showNewsMainInformData(inform.id,
                                            inform.contain_id,
                                            inform.contain,
                                            inform.user_name,
                                            inform.informer_name,
                                            inform.inform_type,
                                            inform.total,
                                            inform.update_time,
                                            inform.status,
                                            inform.dispose_info);
                                        $("#news_main_inform_table tbody").append(htmlStr);
                                    });
                                } else {
                                    $.gritter.add({
                                        title: '无数据',
                                        time: 2000,
                                        class_name: 'gritter-info gritter-light'
                                    });
                                }
                            } else {
                                $.gritter.add({
                                    title: "出现" + data.code + "异常",
                                    time: 2000,
                                    class_name: 'gritter-error gritter-light'
                                });
                                if (data.msg != "") {
                                    $.gritter.add({
                                        title: data.msg,
                                        time: 2000,
                                        class_name: 'gritter-error gritter-light'
                                    });
                                } else {
                                    $.gritter.add({
                                        title: "出现未知异常",
                                        time: 2000,
                                        class_name: 'gritter-error gritter-light'
                                    });
                                }
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
                }

                function showNewsMainInformData(id,
                                            contain_id,
                                            contain,
                                            user_name,
                                            informer_name,
                                            inform_type,
                                            total,
                                            update_time,
                                            status,
                                            dispose_info
                ) {
                    update_time=new Date(update_time).pattern("yyyy-MM-dd HH:mm:ss");
                    switch(inform_type){
                        case 0:
                            inform_type="其他";
                            break;
                        case 1:
                            inform_type="淫秽色情";
                            break;
                        case 2:
                            inform_type="垃圾广告";
                            break;
                        case 3:
                            inform_type="谣言";
                            break;
                        case 4:
                            inform_type="反动";
                            break;
                    }
                    if(status==1){
                        status="<button class='btn btn-xs btn-danger news_main_sheild_dispose'>已屏蔽</button>";
                    }else if(status==2) {
                        status="<button class='btn btn-xs btn-success news_main_ignore_dispose'>已忽略</button>";
                    }else if(status==-1){
                        status="<button class='btn btn-xs btn-danger'>已删除</button>";
                    }else{
                        status="<button class='btn btn-xs btn-danger news_main_sheild'>屏蔽</button>&nbsp;" +
                            "<button class='btn btn-xs btn-success news_main_ignore'>忽略</button>"
                    }
                    var htmlStr = "<tr>"+
                        "<td class='center'>"+
                        "                                        <label class='inline'>"+
                        "                                            <input type='checkbox' class='ace'/>"+
                        "                                            <span class='lbl'></span>"+
                        "                                        </label>"+
                        "                                    </td>"+
                        "<td class='center'>"+id+"</td>"+
                        "<td class='center'>"+contain_id+"</td>"+
                        "<td class='center contain'>"+contain+"</td>"+
                        "<td class='center'>"+user_name+"</td>"+
                        "<td class='center'><a target='_blank' href='http://tiyu.l99.com/content/content_detail?id="+contain_id+"' >链接</a></td>"+
//                        "<td class='center'><a target='_blank' href='http://192.168.2.117:8080/lifeix-tiyu-web/content/content_detail?id="+contain_id+"' >链接</a></td>"+
                        "<td class='center'>"+informer_name+"</td>"+
                        "<td class='center'>"+inform_type+"</td>"+
                        "<td class='center'>"+total+"</td>"+
                        "<td class='center'>"+update_time+"</td>"+
                        "<td class='center'>"+status+"</td>"+
                        "<td style='display:none'>"+dispose_info+"</td>"+

                        "</tr>" ;
                    return htmlStr ;
                }

                /**
                 * 异步加载数据 新闻举报 end
                 */




                //向下加载新闻评论举报数据
                $('#news_main_more').on(ace.click_event, function(){
                    if(news_main_page>0){
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: appName+"/inform/news/main/list",
                            data:{page:news_main_page,status:news_main_status},
                            success: function (data) {
                                if (data.code == 200) {
                                    if (data.number > 0) {
                                        news_main_page = data.page_num;
                                        //加载数据
                                        $.each(data.newsInformList, function (index, inform) {
                                            var htmlStr = showNewsMainInformData(inform.id,
                                                inform.contain_id,
                                                inform.contain,
                                                inform.user_name,
                                                inform.informer_name,
                                                inform.inform_type,
                                                inform.total,
                                                inform.update_time,
                                                inform.status,
                                                inform.dispose_info);
                                            $("#news_main_inform_table tbody").append(htmlStr);
                                        });
                                    } else {
                                        $.gritter.add({
                                            title: '无更多举报信息',
                                            time: 2000,
                                            class_name: 'gritter-info gritter-light'
                                        });
                                        //设置加载按钮消失
                                        $("#news_main_more").addClass("hidden");
                                    }
                                } else {
                                    $.gritter.add({
                                        title: "出现" + data.code + "异常",
                                        time: 2000,
                                        class_name: 'gritter-error gritter-light'
                                    });
                                    if (data.msg != "") {
                                        $.gritter.add({
                                            title: data.msg,
                                            time: 2000,
                                            class_name: 'gritter-error gritter-light'
                                        });
                                    } else {
                                        $.gritter.add({
                                            title: "出现未知异常",
                                            time: 2000,
                                            class_name: 'gritter-error gritter-light'
                                        });
                                    }
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
                    }else{
                        $.gritter.add({
                            title: '无更多举报信息',
                            time: 2000,
                            class_name: 'gritter-info gritter-light'
                        });
                        //设置加载按钮消失
                        $("#news_main_more").addClass("hidden");
                    }

                    return false;
                });

                //屏蔽
                $('#news_main_inform_table tbody').on('click', 'button.news_main_sheild', function () {
                    var tmpTr = $(this).closest("tr");
                    var id =  tmpTr.find("td:eq(1)").html();
                    var user_name=tmpTr.find("td:eq(4)").html();
                    var contain=tmpTr.find("td:eq(3)").html();
                    var status=1;
                    $("#inform_title").html("举报屏蔽处理");
                    $("#id").html(id);
                    $("#user_name").html(user_name);
                    $("#contain").html(contain);
                    $("#status").val(status);
                    $("#type").val(type_news_main);
                    $("#modal_user_id").addClass("hidden");
                    $("#inform_time_div").addClass("hidden");
                    $("#modal_inform_reason").addClass("hidden");
                    $("#modal_inform").modal({backdrop: 'static'});
                });
                //忽略
                $('#news_main_inform_table tbody').on('click', 'button.news_main_ignore', function () {
                    var tmpTr = $(this).closest("tr");
                    var id =  tmpTr.find("td:eq(1)").html();
                    var user_name=tmpTr.find("td:eq(4)").html();
                    var contain=tmpTr.find("td:eq(3)").html();
                    var status=2;
                    
                    $("#inform_title").html("举报忽略处理");
                    $("#id").html(id);
                    $("#user_name").html(user_name);
                    $("#contain").html(contain);
                    $("#status").val(status);
                    $("#type").val(type_news_main);
                    $("#modal_user_id").addClass("hidden");
                    $("#modal_inform_reason").addClass("hidden");
                    $("#inform_time_div").addClass("hidden");
                    $("#modal_inform").modal({backdrop: 'static'});
                });


        /**
         * news main end
         */
      
      
    });
});
