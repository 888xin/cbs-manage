/**
 * Created by Lhx on 15-12-03.
 */
define(function (require) {
    require("../common/common");
    require("../../modules/plugin/jquery.dataTables.bootstrap");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/bootbox.min");


    //常量设置
    var xin_start = null;
    var xin_end = null;
    var content_status = null;
    var frontpage_content_type = 100;
    //var head_url = "http://avatar.dev.xy.l99.com/90x90/";
    var head_url = "http://proxy.dev.xy.l99.com/image.php?type=avatar90&ifile=";
    var content_image = "http://roi.skst.cn/";
    var upload_photos = "";
    var order_display_num = 0;

    jQuery(function ($) {

        //常量设置
        var frontpage_content_id;

        function content_fn(queue, fId) {
            var queue_html;
            if (queue) {
                queue_html = "<button class='btn btn-minier btn-warning' id='content" + fId + "'>已屏蔽</button> ";
            } else {
                queue_html = "<button class='btn btn-minier btn-info' id='content" + fId + "'>屏蔽</button> ";
            }
            return queue_html;
        }


        var frontpages_content_table;
        $(function () {

            frontpages_content_table = $('#frontpages_content_table').dataTable({
                "bAutoWidth": true,
                "bProcessing": true,
                "bServerSide": true,
                "bStateSave": false, //是否保存cookie数据
                "bFilter": true,
                "aLengthMenu": [40, 80, 120],
                'iDisplayLength': 40,//每页显示个数
                "sAjaxDataProp": "frontpages",
                "sAjaxSource": appName + '/friend/circle/list',
                "fnServerParams": function (aoData) {  //查询条件
                    aoData.push(
                        { "name": "previous", "value": xin_previous },
                        { "name": "next", "value": xin_next },
                        { "name": "endId", "value": xin_start },
                        { "name": "startId", "value": xin_end },
                        { "name": "status", "value": content_status },
                        { "name": "type", "value": frontpage_content_type },
                        { "name": "skip", "value": xin_skip }
                    );
                },
                "oLanguage": {
                    "sProcessing": "正在加载中......",
                    "sSearch": 
                        '&nbsp;&nbsp;&nbsp;<span class="label label-lg label-info">搜索：</span>',
                    "sLengthMenu": '每页显示条数 _MENU_ ' + '&nbsp;&nbsp;&nbsp;<span class="label label-lg label-danger"><a id="frontpage_one_key_nopass" href="#" class="white">一键屏蔽</a></span>&nbsp;&nbsp;&nbsp;<span class="label label-lg label-success"><a id="friend_circle_post_bn" href="#" class="white">发布</a></span>',
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
                        "bSortable": false,
                        "sClass": "center",
                        "fnRender": function (obj) {

                            var sReturn = "<label><input type='checkbox' class='ace' id='checkbox_" + obj.aData.friend_circle_id + "'/><span class='lbl'></span></label>";
                            return sReturn;
                        }
                    },{
                        "mDataProp": "friend_circle_id",
                        "bSortable": false,
                        "sClass": "center"
                    },
                    {

                        "sClass": "center",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            if (order_display_num == 0) {
                                xin_end = obj.aData.friend_circle_id;
                            }
                            xin_start = obj.aData.friend_circle_id;
                            order_display_num++;
                            if (obj.aData.user != null) {
                                return obj.aData.user.name;
                            } else {
                                return "官方";
                            }

                        }
                    },
                    {
                        "sClass": "center",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            if (obj.aData.user != null) {
                                return "<img width='40' height='40' class=\"nav-user-photo\" src='" + head_url + obj.aData.user.head + "' />";
                            } else {
                                return "";
                            }

                        }
                    },
                    {
                        "mDataProp": "user.long_no",
                        "sClass": "center",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            if (obj.aData.user != null) {
                                return obj.aData.user.long_no;
                            } else {
                                return "";
                            }

                        }
                    },
                    {
                        "mDataProp": "desc",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            var desc = obj.aData.content;
                            var desc_html = "";
                            var btn_html = "";
                            if (desc != null) {
                                if (desc.length > 20) {
                                	 btn_html = "<button type='button' class='btn btn-minier btn-inverse' id='detail" + obj.aData.friend_circle_id + "'><i class='icon-plus'></i></button>&nbsp;&nbsp; ";
                                     desc_html = desc.substr(0, 20) + "……";
                                } else {
                                    desc_html = desc;
                                }
                            }

                            var image_html01 = "";
                            var image_html02 = "";
                            var image_html03 = "";
                            if (obj.aData.images != null){
                                image_html01 = "<img width='40' height='40' class=\"nav-user-photo\" src='" + content_image + obj.aData.images[0] + "'/>&nbsp;&nbsp;";
                                if (obj.aData.images[1] != null){
                                    image_html02 = "<img width='40' height='40' class=\"nav-user-photo\" src='" + content_image + obj.aData.images[1] + "'/>&nbsp;&nbsp;";
                                }
                                if (obj.aData.images[2] != null){
                                    image_html03 = "<img width='40' height='40' class=\"nav-user-photo\" src='" + content_image + obj.aData.images[2] + "'/>&nbsp;&nbsp;";
                                }
                            }
                            
                            if (btn_html == "" && obj.aData.images != null){
                                btn_html = "<button type='button' class='btn btn-minier btn-inverse' id='detail" + obj.aData.friend_circle_id + "'><i class='icon-plus'></i></button>&nbsp;&nbsp; ";
                            }
                            
                            return btn_html + image_html01 +image_html02+ image_html03 + desc_html ;
                        }

                    },
                    {
                        "mDataProp": "createTime",
                        "sClass": "center",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            return new Date(obj.aData.create_time).pattern("yyyy-MM-dd HH:mm:ss");
                        }
                    },
                    {
                        "bSortable": false,
                        "sClass": "center",
                        "fnRender": function (obj) {
                            return content_fn(obj.aData.data_flag, obj.aData.friend_circle_id);
                        }
                    }
                ],
                fnDrawCallback:function(){
                    xin_next = false ;
                    xin_previous = false ;
                    order_display_num = 0 ;
                    xin_skip = 0 ;
                }
            }).on('click', 'button.btn-warning',function () {
            }).on('click', 'button.btn-info',function () {
                //上榜
                var tmp = $(this);
                frontpage_content_id = tmp.attr("id").substring(7);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/friend/circle/queue",
                    data: {fId: frontpage_content_id, status: 1},
                    success: function (data) {
                        if (data.code == 200) {
                            tmp.removeClass("btn-info").addClass("btn-warning").html("已屏蔽");
                            $.gritter.add({
                                title: "该内容已经屏蔽",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                        } else {
                            if (data.msg != "") {
                                $.gritter.add({
                                    title: "错误code：" + data.code + ",错误信息：" + data.msg,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-center'
                                });
                            }
                        }
                    },
                    error: function (XMLHttpRequest) {
                        $.gritter.add({
                            title: XMLHttpRequest.status,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }
                });
            }).on('click', 'button.btn-success',function () {
                //通过
                var tmp = $(this);
                frontpage_content_id = tmp.attr("id").substring(4);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/friend/circle/edit",
                    data: {fId: frontpage_content_id, status: 1},
                    success: function (data) {
                        if (data.code == 200) {
                            var status_td_tmp = tmp.closest('td').prev();
                            status_td_tmp.html("<span class='label label-lg label-success'>审核通过</span>");
                            $.gritter.add({
                                title: "该信息已经审核通过",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                        } else {
                            if (data.msg != "") {
                                $.gritter.add({
                                    title: "错误code：" + data.code + ",错误信息：" + data.msg,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-center'
                                });
                            }
                        }
                    },
                    error: function (XMLHttpRequest) {
                        $.gritter.add({
                            title: XMLHttpRequest.status,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }
                });
            }).on('click', 'button.btn-danger',function () {
                //删除
                var tmp = $(this);
                frontpage_content_id = tmp.attr("id").substring(6);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/friend/circle/edit",
                    data: {fId: frontpage_content_id, status: 2},
                    success: function (data) {
                        if (data.code == 200) {
                            var status_td_tmp = tmp.closest('td').prev();
                            status_td_tmp.html("<span class='label label-lg label-danger'>删除</span>");
                            $.gritter.add({
                                title: "该信息已经审核删除",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                        } else {
                            if (data.msg != "") {
                                $.gritter.add({
                                    title: "错误code：" + data.code + ",错误信息：" + data.msg,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-center'
                                });
                            }
                        }
                    },
                    error: function (XMLHttpRequest) {
                        $.gritter.add({
                            title: XMLHttpRequest.status,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }
                });
            }).on('click', 'button.btn-inverse', function () {
                //展开
                var tmp = $(this);
                frontpage_content_id = tmp.attr("id").substring(6);
                var nTr = tmp.parents('tr')[0];
                //判断是否已打开
                if (frontpages_content_table.fnIsOpen(nTr)) {
                    $(this).addClass("icon-close").removeClass("icon-plus");
                    tmp.html("<i class='icon-plus'></i>");
                    frontpages_content_table.fnClose(nTr);
                } else {
                    tmp.html("<i class='icon-minus'></i>");
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/friend/circle/view",
                        data: {fId: frontpage_content_id},
                        success: function (data) {
                            if (data.code == 200) {
                                var out_html = "";
                                var img_html = "";
                                if (data.frontpage.images != null){
                                    img_html = "<img width='300' height='300' class='nav-user-photo' src='" + content_image + data.frontpage.images[0] + "'/>&nbsp;";
                                    if (data.frontpage.images[1] != null){
                                        img_html += "<img width='300' height='300' class='nav-user-photo' src='" + content_image + data.frontpage.images[1] + "'/>&nbsp;";
                                    }
                                    if (data.frontpage.images[2] != null){
                                        img_html += "<img width='300' height='300' class='nav-user-photo' src='" + content_image + data.frontpage.images[2] + "'/>&nbsp;";
                                    }
                                }
                                var content_html = data.frontpage.content;
                                if(img_html == ""){
                                    out_html = content_html ;
                                } else {
                                    out_html = img_html +"<br>"+ content_html ;
                                }
                                frontpages_content_table.fnOpen(nTr, out_html,"center");
                            } else {
                                if (data.msg != "") {
                                    $.gritter.add({
                                        title: "错误code：" + data.code + ",错误信息：" + data.msg,
                                        time: 2000,
                                        class_name: 'gritter-error gritter-center'
                                    });
                                }
                            }
                        },
                        error: function (XMLHttpRequest) {
                            $.gritter.add({
                                title: XMLHttpRequest.status,
                                text: XMLHttpRequest.statusText,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        }
                    });
                }
            });


            $("#content_table_condition").on("change", function () {
                frontpage_content_type = $(this).val()
                frontpages_content_table.fnDraw();
            });

            $("#content_table_status").on("change", function () {
                content_status = $(this).val()
                frontpages_content_table.fnDraw();
            });

            $("#frontpage_add_a").on("click", function () {
                //打开modal
                $("#frontpage_add_modal").modal({backdrop: "static"});
            });

            //一键通过
            $("#frontpage_one_key_nopass").on("click", function () {
                //ids字符串
                var ids = "";
                $("#frontpages_content_table tbody").find('tr').each(function () {
                    //获取所选的行
                    var tmp = $(this).find("td:eq(0) input[type=checkbox]");
                    var checked =  tmp.prop('checked');
                    var tr_id = tmp.attr("id").substring(9);

                    if (checked){
                        ids += tr_id+",";
                    }
                });
                if (ids == ""){
                    $.gritter.add({
                        title: "至少选择一项",
                        time: 2000,
                        class_name: 'gritter-warning gritter-center'
                    });
                    return ;
                }
                //提交请求
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/friend/circle/edit",
                    data: {ids: ids, status: 1},
                    success: function (data) {
                        if (data.code == 200) {
                            frontpages_content_table.fnDraw();
                            $.gritter.add({
                                title: "信息处理完",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                        }
                    },
                    error: function (XMLHttpRequest) {
                        $.gritter.add({
                            title: XMLHttpRequest.status,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }
                });
            });




            //发布
            $("#friend_circle_post_bn").on("click", function () {
                $("#modal_add").modal({backdrop: 'static'});

            });


            $("#modal_add_button").on("click", function () {
                //获得输入的值
                var long_no = $("#modal_user_id").val();
                if (!long_no){
                    $.gritter.add({
                        title: '必需有用户Id',
                        time: 2000,
                        class_name: 'gritter-warning gritter-light'
                    });
                    return;
                }
                var text = $("#modal_text").val();
                var content_type = $('#modal_content_type input[name="modal_content_type"]:checked ').val();
                var modal_type = $('#modal_type input[name="modal_type"]:checked ').val();
                var friend_circle_id = $("#modal_friend_circle_id").val().trim();

                var images = "";
                if (upload_photos) {
                    images = upload_photos.substr(0, upload_photos.length - 1);
                }
                if (content_type == 2){
                    if (!friend_circle_id || isNaN(friend_circle_id)){
                        $.gritter.add({
                            title: '猜友圈ID必须为数字！',
                            time: 2000,
                            class_name: 'gritter-warning gritter-center'
                        });
                        return;
                    }
                } else {
                    friend_circle_id = "";
                }
                if (modal_type < 0){
                    content_type = -content_type ;
                }

                //添加
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/friend/circle/add",
                    data: {longNo: long_no, text: text, pageType: content_type, contentId: friend_circle_id, images: images},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '添加成功',
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
                            });
                            upload_photos = "" ;
                            frontpages_content_table.fnDraw();
                            $("#modal_add").modal('hide');
                        } else {
                            if (data.msg != "") {
                                $.gritter.add({
                                    title: "错误code：" + data.code + ",错误信息：" + data.msg,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-center'
                                });
                            }
                        }
                    },
                    error: function (XMLHttpRequest) {
                        $.gritter.add({
                            title: XMLHttpRequest.status,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }
                });

            });


            $("#modal_add").on("hidden.bs.modal", function () {
                upload_photos = "";
                $("#modal_text").val("");
                //清空原来的内容
                $("#image_form").remove();
                var photo_html = "<form id='image_form' action='#' class='dropzone' method='post' enctype='multipart/form-data'>" +
                    "<div class='fallback'><input name='file' type='file'/></div></form>";
                $("#modal_add_image_span").append(photo_html);
                addImage();
            });










        });




        $('table th input:checkbox').on('click', function () {
            var that = this;
            $(this).closest('table').find('tr > td:first-child input:checkbox')
                .each(function () {
                    this.checked = that.checked;
                    $(this).closest('tr').toggleClass('selected');
                });

        });



        /**
         * ======================================================
         * 添加照片 start
         * */

        function addImage() {
            $("#image_form").dropzone({
                paramName: "file", // The name that will be used to transfer the file
                maxFilesize: 100, // MB
                url: appName + "/frontpage/add/image",
                maxFiles: 6,
                acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
                uploadMultiple: true,
                addRemoveLinks: true,
                dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传照片</span> \
            <span class="smaller-80 grey">(拖曳或者直接点击上传，每次一张，最多能上传六张)</span> <br /> \
            <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
                dictResponseError: '上传图片出错！',
                dictMaxFilesExceeded: '只能允许上传六张照片！',
                dictFileTooBig: '只能上传不超过100M的照片！',
                dictInvalidInputType: '只能是jpg/jpeg/bmp/gif/png格式的照片！',

                //change the previewTemplate to use Bootstrap progress bars
                previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
                init: function () {
                    this.on("success", function (data) {
                        //当上传完成后的事件，接受的数据为JSON格式
                        if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                            var res = eval('(' + data.xhr.responseText + ')');
                            if (res.flag) {
                                $.gritter.add({
                                    title: "照片上传成功！",
                                    time: 2000,
                                    class_name: 'gritter-success gritter-center'
                                });

                                upload_photos += res.key + ",";
                            }
                            else {
                                $.gritter.add({
                                    title: "上传失败，失败的原因是：" + res.msg,
                                    time: 2000,
                                    class_name: 'gritter-error gritter-center'
                                });
                            }
                        }
                    });
                }
            });
        }


        try {
            addImage();
        } catch (e) {
            alert('Dropzone.js does not support older browsers!');
        }

        /**
         * ======================================================
         * 添加照片 end
         * */



        $("#modal_add").on("shown.bs.modal",function(){
            $("#modal_content_type input[value=1]").get(0).checked = true;
            $("#modal_type input[value=100]").get(0).checked = true;
        });

    });
});
