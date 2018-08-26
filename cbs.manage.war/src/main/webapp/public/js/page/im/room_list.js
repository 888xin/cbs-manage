define(function(require, exports, module) {
require("../common/common");
require("../../modules/plugin/datepicker.zh-CN.js");
require("../../modules/plugin/jquery.gritter.min");
require("../../modules/plugin/bootbox.min");
require("../../modules/plugin/jquery.hotkeys.min");
require("../../modules/plugin/bootstrap-wysiwyg.min");

        /**
         * ===================
         * 打开页面异步加载数据 Start
         * */
         $.ajax({
            type: 'GET',
            dataType: 'json',
            url: appName+"/im/getAsyData",
            success: function (data) {
                if (data!=null) {
                    //清空原有的数据
                    $("#placard_table tbody tr").remove();
                    if (data.rooms.length > 0){
                        //加载数据
                        $.each(data.rooms, function (index, room) {
                            var htmlStr = showRoomData(room.id,room.name,room.userCount,room.createTime);
                            $("#placard_table tbody").append(htmlStr);
                           
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
         
         //动态加载公告数据
         function showRoomData(room_id,room_name,room_userCount,room_createTime ){            
          
             disable = "<i class=\"icon-ok green bigger-150\"></i>";
             var btn_html = "<button id='room_chat_"+room_id+"' class=\"btn btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"跳转到聊天纪录\"><i class=\"icon-share-alt bigger-150\">聊天纪录</i></button>";
       
             var htmlStr = "<tr id='table_placard_"+room_id+"'>"+
                     "                                    <td class=\"center\">"+room_id+"</td>"+
                     "                                    <td class=\"center\">"+
                     room_name +
                     "</td>"+
                     "                                    <td class=\"center\">"+room_userCount+"</td>"+
                     "                                    <td class=\"center\">"+room_createTime+"</td>"+                     
                     //编辑按钮
                     "                                    <td class=\"center\">"+
                     "                                        <div>"+
                     btn_html+ 
                     "                                        </div>"+
                     "                                    </td>"+
                     "                                </tr>";
             return htmlStr ;
         }
         
         
         //跳转至聊天详情
         $('#placard_table tbody').on('click', 'button.btn-success', function () {
        	 roomId = $(this).attr("id").substring(10);
             window.location.href = appName + "/im/chat?room_id=" + roomId;
         }).tooltip({
             hide: {
                 delay: 100
             }
         });


    });