/**
 * Created by lhx on 16-4-15.
 */
define(function (require) {
    require("../common/common");
    require("../../modules/plugin/jquery.dataTables.bootstrap");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/x-editable/ace-editable.min.js");
    require("../../modules/plugin/bootbox.min");


    //常量设置
    var xin_start = null;
    var xin_end = null;
    var news_status = null;
    var content_image = "http://roi.skst.cn/";
    var upload_photo_key = "";
    var order_display_num = 0;
    var news_id;

    function content_fn(id, status) {
        if (status == -1) {
            return "";
        }
        var bt_html = "<button class='btn btn-minier btn-grey' id='edit" + id + "'>编辑</button> <button class='btn btn-minier btn-danger' id='delete" + id + "'>删除</button>"
        return bt_html;
    }


    var contest_news_table = $('#contest_news_table').dataTable({
        "bAutoWidth": true,
        "bProcessing": true,
        "bServerSide": true,
        "bStateSave": false, //是否保存cookie数据
        "bFilter": true,
        "aLengthMenu": [40, 80, 120],
        'iDisplayLength': 40,//每页显示个数
        "sAjaxDataProp": "news",
        "sAjaxSource": appName + '/contest/news/list',
        "fnServerParams": function (aoData) {  //查询条件
            aoData.push(
                { "name": "previous", "value": xin_previous },
                { "name": "next", "value": xin_next },
                { "name": "endId", "value": xin_end },
                { "name": "startId", "value": xin_start },
                { "name": "status", "value": news_status },
                { "name": "skip", "value": xin_skip }
            );
        },
        "oLanguage": {
            "sProcessing": "正在加载中......",
            "sSearch": '<span class="label label-lg label-danger">状态：</span><select id="content_table_status"><option value="" selected="selected">全部</option>' +
                '<option value="0">正常</option><option value="-1">删除</option></select>' +
                '&nbsp;&nbsp;&nbsp; <span class="label label-lg label-success"><a id="contest_add_a" href="#" data-toggle="modal" data-target="#modal_news_add" class="white">发布</a></span>',
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

                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    if (order_display_num == 0) {
                        xin_end = obj.aData.id;
                    }
                    xin_start = obj.aData.id;
                    order_display_num++;
                    return obj.aData.id;

                }
            },
            {
                "bSortable": false,
                "fnRender": function (obj) {
                    var title = '<b class="smaller-90">' + obj.aData.title + '</b>';
                    var image = obj.aData.image;
                    image = "<img width='72' height='40' class=\"nav-user-photo\" src='" + content_image + image + "'/>&nbsp;&nbsp;";
                    return image + title;
                }

            },
            {
                "bSortable": false,
                "fnRender": function (obj) {
                    var desc = obj.aData.desc;
                    if (desc){
                        if (desc.length > 60){
                            desc = desc.substring(0,60) + "...";
                        }
                    } else {
                        desc = "无";

                    }
                    return desc;
                }

            },
            {
                "bSortable": false,
                "fnRender": function (obj) {

                    if (obj.aData.contest_type == 0) {
                        return "足球:" + obj.aData.contest_id;
                    } else {
                        return "篮球:" + obj.aData.contest_id;
                    }
                }
            },
            {
                "mDataProp": "content_id",
                "bSortable": false
            },
            {
                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    return new Date(obj.aData.create_time).pattern("yyyy-MM-dd HH:mm:ss");
                }
            },
            {
                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    if (obj.aData.status == 0) {
                        return "<span class='label label-lg label-info'>正常</span>";
                    } else if (obj.aData.status == -1) {
                        return "<span class='label label-lg label-danger'>删除</span>";
                    } else {
                        return "<span class='label label-lg label-inverse'>出错</span>";
                    }
                }
            },
            {
                "bSortable": false,
                "sClass": "center",
                "fnRender": function (obj) {
                    return content_fn(obj.aData.id, obj.aData.status);
                }
            }
        ],
        fnPreDrawCallback: function () {
            $('#contest_news_table_filter input:text').attr('hidden', true);
            return true;
        },
        fnDrawCallback: function () {
            xin_next = false;
            xin_previous = false;
            order_display_num = 0;
            xin_skip = 0;
        }
    }).on('click', 'button.btn-danger',function () {
        //删除
        var tmp = $(this);
        news_id = tmp.attr("id").substring(6);

        bootbox.confirm("确定删除该新闻？", function (result) {
            if (result) {
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/contest/news/edit",
                    data: {id: news_id, status: -1},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: "该信息已经审核删除",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                            tmp.closest("tr").remove();
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
    }).on('click', 'button.btn-grey', function () {
        //修改
        var tr = $(this).closest("tr");
        news_id = tr.find("td:eq(0)").html();
        var title = tr.find("td:eq(1) b").html();
        var desc = tr.find("td:eq(2)").html();
        var contest = tr.find("td:eq(3)").html();
        var contestArr = contest.split(":");
        var content_id = tr.find("td:eq(4)").html();
        $("#modal_edit_title").html(title);
        $("#modal_edit_desc").html(desc);
        $("#modal_edit_content_id").html(content_id);
        $("#modal_edit_contest_id").html(contestArr[1]);
        $("#modal_edit_contest_type").html(contestArr[0]);

        //打开modal
        $("#modal_edit").modal({backdrop: "static"});

    });


    /**
     * ======================================================
     * 添加照片 start
     * */


    function addImage() {
        $("#image_form").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/frontpage/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 拖曳图片到此框内</span> 上传 \
                <span class="smaller-80 grey">(或者直接点击)</span> <br /> \
                <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传一张照片！',
            dictFileTooBig: '只能上传不超过10M的照片！',
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
                                title: "恭喜，已成功上传" + res.image_num + "张照片！",
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
                            });

                            upload_photo_key = res.key;
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
                this.on("addedfile", function (file) {
                });
                this.on("complete", function (data) {
                });
                this.on("removedfile", function (data) {
                    //如果是成功上传的照片，就对七牛云上的照片进行删除
                    if (data.accepted) {

                    }
                });
            }
        });
    }

    function addImage2() {
        $("#image_form2").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/frontpage/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 上传图片成功后自动修改图片</span>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传一张照片！',
            dictFileTooBig: '只能上传不超过10M的照片！',
            dictInvalidInputType: '只能是jpg/jpeg/bmp/gif/png格式的照片！',

            //change the previewTemplate to use Bootstrap progress bars
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
            init: function () {
                this.on("success", function (data) {
                    //当上传完成后的事件，接受的数据为JSON格式
                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                        var res = eval('(' + data.xhr.responseText + ')');
                        if (res.flag) {

                            $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                url: appName + "/contest/news/edit",
                                data: {
                                    id: news_id,
                                    image: res.key
                                },
                                success: function (data) {
                                    if (data.code == 200) {
                                        $.gritter.add({
                                            title: "恭喜您，修改成功！",
                                            time: 2000,
                                            class_name: 'gritter-success'
                                        });
                                        //刷新
                                        contest_news_table.fnDraw();
                                    } else {
                                        if (data.msg != "") {
                                            $.gritter.add({
                                                title: data.msg,
                                                time: 2000,
                                                class_name: 'gritter-error gritter-center'
                                            });
                                        } else {
                                            $.gritter.add({
                                                title: "修改失败，请联系管理员！",
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
                        else {
                            $.gritter.add({
                                title: "上传失败，失败的原因是：" + res.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        }
                    }
                });
                this.on("addedfile", function (file) {
                });
                this.on("complete", function (data) {
                });
                this.on("removedfile", function (data) {
                    //如果是成功上传的照片，就对七牛云上的照片进行删除
                    if (data.accepted) {

                    }
                });
            }
        });
    }

    try {
        addImage();
        addImage2();
    } catch (e) {
        alert('Dropzone.js does not support older browsers!');
    }

    /**
     * ======================================================
     * 添加照片 end
     * */

    $("#modal_add_contest_type input[value=0]").get(0).checked = true;


    //确认添加
    $("#modal_add_bt").on("click", function () {

        var title = $("#modal_add_title").val();
        var desc = $("#modal_add_desc").val();
        var content_id = $("#modal_add_content_id").val();
        var contest_id = $("#modal_add_contest_id").val();
        var contest_type = $("#modal_add_contest_type input:checked").val();
        if (!title) {
            $.gritter.add({
                title: "请输入标题",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        if (isNaN(content_id) || isNaN(contest_id)) {
            $.gritter.add({
                title: "请输入资讯ID和赛事ID",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }

        if (!upload_photo_key) {
            $.gritter.add({
                title: "请上传图片",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/contest/news/add",
            data: {
                contest_id: contest_id,
                contest_type: contest_type,
                title: title,
                desc:desc,
                image: upload_photo_key,
                content_id: content_id
            },
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "恭喜您，添加成功！",
                        time: 2000,
                        class_name: 'gritter-success gritter-center gritter-light'
                    });

                    //刷新
                    contest_news_table.fnDraw();
                    $("#modal_news_add").modal('hide');
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


    //editables on first profile page
    $.fn.editable.defaults.mode = 'inline';
    $.fn.editableform.loading = "<div class='editableform-loading'><i class='light-blue icon-2x icon-spinner icon-spin'></i></div>";
    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="icon-ok icon-white"></i></button>' +
        '<button type="button" class="btn editable-cancel"><i class="icon-remove"></i></button>';

    //修改标题
    $('#modal_edit_title').editable({
        type: 'text',
        name: 'name',
        success: function (response, newValue) {

            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/contest/news/edit",
                data: {
                    id: news_id,
                    title: newValue
                },
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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

    //修改描述
    $('#modal_edit_desc').editable({
        type: 'textarea',
        success: function (response, newValue) {

            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/contest/news/edit",
                data: {
                    id: news_id,
                    desc: newValue
                },
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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

    //修改资讯ID
    $('#modal_edit_content_id').editable({
        type: 'text',
        success: function (response, newValue) {

            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/contest/news/edit",
                data: {
                    id: news_id,
                    content_id: newValue
                },
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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


    //修改赛事ID
    $('#modal_edit_contest_id').editable({
        type: 'text',
        success: function (response, newValue) {

            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/contest/news/edit",
                data: {
                    id: news_id,
                    contest_id: newValue
                },
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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


    //修改赛事类型
    var contest_type = [];
    $.each({ "0": "足球", "1": "篮球"}, function (k, v) {
        contest_type.push({id: k, text: v});
    });

    $('#modal_edit_contest_type').editable({
        type: 'select',
        source: contest_type,
        success: function (response, newValue) {
            var init_type = 0;
            if (newValue == "篮球") {
                init_type = 1;
            }
            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/contest/news/edit",
                data: {
                    id: news_id,
                    contest_type: init_type
                },
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                        if (init_type == 0) {
                            $("#modal_edit_contest_type").html("足球");
                        } else {
                            $("#modal_edit_contest_type").html("篮球");
                        }
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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

});