define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.dataTables.bootstrap");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/bootbox.min");

    var page=0;
    var timeType=0;
    getRank();
    
    $("#filter").on('change', function() {
        if($("#filter").val()==0){
        	timeType=0;
        	getRank();
        }else{
        	timeType=1;
        	getRank();
        }
    });
    
    function getRank(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/rank/top",
            data:{type:1,timeType:timeType},
            success: function (data) {
                if (data.code == 200) {
                    //清空原有的数据
                    $("#rank_table tbody tr").remove();
                    if (data.num > 0){
                    	page=data.start_id; 
                        //加载数据
                        $.each(data.rankList, function (index, rank) {
                            var htmlStr = showRank(rank.rank,
                            		rank.user.user_id,
                            		rank.user.long_no,
                            		rank.user.name,
                            		rank.bet_count,
                            		rank.winning);
                            $("#rank_table tbody").append(htmlStr);
                        });
                    } else {
                        $.gritter.add({
                            title: '无数据！',
                            time:2000,
                            class_name: 'gritter-info gritter-light'
                        });
                    }
                } else {
                    $.gritter.add({
                        title: "出现" + data.code + "异常",
                        time:2000,
                        class_name: 'gritter-error gritter-light'
                    });
                    if (data.msg != ""){
                        $.gritter.add({
                            title: data.msg,
                            time:2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    } else {
                        $.gritter.add({
                            title: "出现未知异常",
                            time:2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown){
                $.gritter.add({
                    title: XMLHttpRequest.status,
                    text:XMLHttpRequest.statusText,
                    time:2000,
                    class_name: 'gritter-error gritter-center'
                });
            }

        });
    }
    

    
    function showRank(rank,user_id,long_no,name,bet_count,winning){
        winning=winning*100;
        winning=winning.toFixed(2);
        var htmlStr =
         "<tr>"+
         "<td>"+rank+"</td>"+
         "<td>"+user_id+"</td>"+
         "<td>"+long_no+"</td>"+
         "<td>"+name+"</td>"+
         "<td>"+bet_count+"</td>"+
         "<td>"+winning+"%</td>"+
         "</tr>"
         ;
        return htmlStr ;
    }
    
    //向下加载
    $('#rank_more').on(ace.click_event, function(){
        if(page>0){
        	$.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/rank/top",
                data:{start_id:page,type:1,timeType:timeType},
                success: function (data) {
                    if (data.code == 200) {
                        if (data.num > 0) {
                     	   page = data.start_id;
                            //加载数据
                     	  $.each(data.rankList, function (index, rank) {
                              var htmlStr = showRank(rank.rank,
                            		  rank.user.user_id,
                            		  rank.user.long_no,
                            		  rank.user.name,
                            		  rank.bet_count,
                            		  rank.winning);
                              $("#rank_table tbody").append(htmlStr);
                          });
                        } else {
                            $.gritter.add({
                                title: '无更多',
                                time: 2000,
                                class_name: 'gritter-info gritter-light'
                            });
                            //设置加载按钮消失
                            $("#rank_more").addClass("hidden");
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
                title: '无更多',
                time: 2000,
                class_name: 'gritter-info gritter-light'
            });
            //设置加载按钮消失
            $("#rank_more").addClass("hidden");
        }

        return false;
    });
     
    
    
});