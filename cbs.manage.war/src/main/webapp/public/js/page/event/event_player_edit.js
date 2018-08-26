define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    $("#search_player").on("click",function(){
        $("#teamId").val(0);
        var name = $("#player_name").val().trim();
        if (name == ""){
            $.gritter.add({
                title: "请输入球员名",
                time:2000,
                class_name: 'gritter-error gritter-light'
            });
        } else {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/player/bb/search",
                data:{name:name},
                success: function (data) {
                    if (data.code == 200) {
                        //清空原有的数据
                        $("#player_table tbody tr").remove();
                        if (data.number > 0){
                            //加载数据
                            $.each(data.playerList, function (index, player) {
                                var htmlStr = showPlayerData(player.id,
                                		player.player_id,
                                		player.name,
                                		player.team_info.name,
                                        player.team_info.logo,
                                		player.first_name,
                                		player.last_name);
                                $("#player_table tbody").append(htmlStr);
                            });
                        } else {
                            $.gritter.add({
                                title: '未找到球员',
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

    });

    var teamId=null;

    $("#teamId").change(function(){
        $("#player_name").val("");
        teamId=$("#teamId").val();
        if(teamId!=0){
            getPlayer(null,teamId);
        }

    })
    
    function showPlayerData(id,
    		player_id,
    		name,
    		teamname,
            logo,
    		first_name,
    		last_name){
    	
        var htmlStr =
        	"<tr>"+ 
            "<td>"+id+"</td>"+
            "<td class='player_id'>"+player_id+"</td>"+
            "<td>"+name+"</td>"+
            "<td>"/*+"<img class=\"nav-user-photo\" src='http://ls.betradar.com/ls/crest/big/"+logo+"' />"*/+teamname+"</td>"+
            "<td style='display:none'>"+first_name+"</td>"+
            "<td style='display:none'>"+last_name+"</td>"+
            "<td><button class=\"btn btn-xs btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"编辑\"> <i class=\"icon-edit bigger-150\"></i></button></td>"
            +"</tr>";
            return htmlStr ;
    }


    $('#player_table tbody').on('click', 'button.btn-info', function () {
        var tmpTr = $(this).closest("tr");
        var player_id =  tmpTr.find("td:eq(0)").html();
        var player_team =  tmpTr.find("td:eq(3)").html();
        var player_name =  tmpTr.find("td:eq(2)").html();
        var first_name =  tmpTr.find("td:eq(4)").html();
        var last_name =  tmpTr.find("td:eq(5)").html();
        $("#player_id").html(player_id);
        $("#player_team").html(player_team);
        $("#edit_name").val(player_name);
        $("#player_first").val(first_name);
        $("#player_last").val(last_name);
        $("#modal_player_edit").modal({backdrop: 'static'});

    });
    
    function getPlayer(name,teamId){
    	$.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/player/bb/search",
            data:{name:name,teamId:teamId},
            success: function (data) {
                if (data.code == 200) {
                    //清空原有的数据
                    $("#player_table tbody tr").remove();
                    if (data.number > 0){
                        //加载数据
                    	$.each(data.playerList, function (index, player) {
                            var htmlStr = showPlayerData(player.id,
                            		player.player_id,
                            		player.name,
                            		player.team_info.name,
                                    player.team_info.logo,
                            		player.first_name,
                            		player.last_name);
                            $("#player_table tbody").append(htmlStr);
                        });
                    } else {
                        $.gritter.add({
                            title: '未找到球员', 
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


     //更改球员名字
    $("#modal_player_edit_button").on("click",function(){
        //获得输入的值
    	var id=$("#player_id").html();
        var name=$("#edit_name").val();
        var first_name=$("#player_first").val();
        var last_name=$("#player_last").val();
        //异步提交
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/player/bb/edit",
            data: {id:id, name:name, first_name:first_name, last_name:last_name},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '修改成功！',
                        time:2000,
                        class_name: 'gritter-info gritter-light'
                    });

                    if($("#teamId").val()!=0){
                        var teamId=$("#teamId").val();
                        getPlayer(null,teamId)
                    }else{
                        var key=name;
                        $("#player_name").val(name);
                        getPlayer(key,null);
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
    });
    
    
});