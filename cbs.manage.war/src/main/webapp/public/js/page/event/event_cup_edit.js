define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    $("#search_cup").on("click",function(){
        var type=$("#type").val();
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/cup/list",
                data:{type:type},
                success: function (data) {
                    if (data.code == 200) {
                        //清空原有的数据
                        $("#cup_table tbody tr").remove();
                        if (data.number > 0){
                            //加载数据
                            $.each(data.cupList, function (index, cup) {
                                var htmlStr = showCupData(cup.cup_id,cup.target_id,cup.name,cup.name_full,cup.name_en);
                                $("#cup_table tbody").append(htmlStr);
                            });
                        } else {
                            $.gritter.add({
                                title: '服务器无数据返回！',
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

    });


    
    function showCupData(cup_id,target_id,name,name_full,name_en){
    	
        var htmlStr =
        	"<tr class='list_class'>"+ 
            "<td>"+cup_id+"</td>"+
            "<td >"+target_id+"</td>"+
            "<td>"+name+"</td>"+
            "<td>"+name_full+"</td>"+
            "<td>"+name_en+"</td>"+
            "<td><button class=\"btn btn-xs btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"编辑联赛名称\"> <i class=\"icon-edit bigger-150\"></i></button></td>"+
            "</tr>";
            return htmlStr ;
    }
    
    
    $('#cup_table tbody').on('click', 'button.btn-info', function () {
        var tmpTr = $(this).closest("tr");
        var cup_id =  tmpTr.find("td:eq(0)").html();
        var cup_name =  tmpTr.find("td:eq(2)").html();
        $("#cup_name_edit").val(cup_name);
        $("#cup_id_show").html(cup_id);
        $("#modal_cup_edit").modal({backdrop: 'static'});

    });
    
   
     //更改球队名字
    $("#modal_cup_edit_button").on("click",function(){
        //获得输入的值
    	var type=$("#type").val();
        var cup_id = $("#cup_id_show").html();
        var cup_name = $("#cup_name_edit").val();
        //异步提交
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/cup/edit",
            data: {type: type,id:cup_id,name:cup_name},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '修改成功！',
                        time:2000,
                        class_name: 'gritter-info gritter-light'
                    });
                    $('#search_cup').click();
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