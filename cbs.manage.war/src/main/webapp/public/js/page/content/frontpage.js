/**
 * Created by Lhx on 15-12-03.
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
    var xin_ad_start = null;
    var xin_ad_end = null;
    var content_status = null;
    var ad_status = null;
    var frontpage_content_type = 100;
    var frontpage_ad_type = -100;
    //var head_url = "http://avatar.dev.xy.l99.com/90x90/";
    var head_url = "http://proxy.dev.xy.l99.com/image.php?type=avatar90&ifile=";
    var content_image = "http://roi.skst.cn/";
    var status_td_tmp = "";
    var upload_photo_key = "";
    var upload_edit_photo_key = "";
    var order_display_num = 0;

    jQuery(function ($) {

        //常量设置
        var frontpage_content_id;
        var frontpage_ad_id;

        function content_fn(queue, fId, status, type) {
            var queue_html;
            if (queue) {
                queue_html = "<button class='btn btn-minier btn-warning' value='content_value_" + type + "' id='content" + fId + "'>撤销</button> ";
            } else {
                queue_html = "<button class='btn btn-minier btn-info' value='content_value_" + type + "' id='content" + fId + "'>上榜</button> ";
            }
            if (status == 2) {
                //删除状态只有上榜
                queue_html = "<button class='btn btn-minier btn-info disabled' id='content" + fId + "'>上榜</button> ";
            }
            if (type == 3) {
                //官方消息没有上榜和撤销
                queue_html = "";
            } else if (status != 2){
                queue_html += " <button class='btn btn-minier btn-purple' id='content" + fId + "'>置顶</button> ";
            }
            //var bt_html = queue_html + "<button class='btn btn-minier btn-success' id='pass" + fId + "'>通过</button> <button class='btn btn-minier btn-danger' id='delete" + fId + "'>删除</button>";
            var bt_html = "";
            if ((type == 4 || type == 5 || type == 6 ) && status != 2) {
                bt_html = queue_html + "<button class='btn btn-minier btn-grey' id='edit" + fId + "'>编辑</button> <button class='btn btn-minier btn-danger' id='delete" + fId + "'>删除</button>";
                //bt_html = bt_html + " <button class='btn btn-minier btn-purple' id='content" + fId + "'>置顶</button>";
            } else {
                bt_html = queue_html + "<button class='btn btn-minier btn-danger' id='delete" + fId + "'>删除</                                                                              button>";
            }
            return bt_html;
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
                "sAjaxSource": appName + '/frontpage/list',
                "fnServerParams": function (aoData) {  //查询条件
                    aoData.push(
                        { "name": "previous", "value": xin_previous },
                        { "name": "next", "value": xin_next },
                        { "name": "endId", "value": xin_end },
                        { "name": "startId", "value": xin_start },
                        { "name": "status", "value": content_status },
                        { "name": "type", "value": frontpage_content_type },
                        { "name": "skip", "value": xin_skip }
                    );
                },
                "oLanguage": {
                    "sProcessing": "正在加载中......",
                    "sSearch": '<span class="label label-lg label-danger">筛选：</span><select id="content_table_condition"><option value="100" selected="selected">全部</option><option value="1">吐槽</option>' +
                        '<option value="2">投注理由</option><option value="3">系统消息</option><option value="7">推荐新闻</option></select>' +
                        '<span class="label label-lg label-danger">状态：</span><select id="content_table_status"><option value="" selected="selected">全部</option>' +
                        '<option value="0">初始</option><option value="1">通过</option><option value="2">删除</option></select>' +
                        '&nbsp;&nbsp;&nbsp; <span class="label label-lg label-success"><a id="frontpage_add_a" href="#" class="white">发布</a></span>' +
                        '&nbsp;&nbsp;&nbsp; <span class="label label-lg label-danger"><a id="frontpage_one_key_pass" href="#" class="white">一键通过</a></span>',
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
                        "bSortable": false,
                        "sClass": "center",
                        "fnRender": function (obj) {

                            var sReturn = "<label><input type='checkbox' class='ace' id='checkbox_" + obj.aData.f_id + "'/><span class='lbl'></span></label>";
                            return sReturn;
                        }
                    },
                    {

                        "sClass": "center",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            if (order_display_num == 0) {
                                xin_end = obj.aData.f_id;
                            }
                            xin_start = obj.aData.f_id;
                            order_display_num++;
                            if (obj.aData.user) {
                                var name = obj.aData.user.name;
                                if (name.length > 6){
                                    return name.substring(0,6) + "...";
                                }
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
                            var desc = obj.aData.desc;
                            var desc_html = "";
                            var btn_html = "";
                            if (desc != null) {
                                if (desc.length > 20) {
                                    btn_html = "<button type='button' class='btn btn-minier btn-inverse' id='detail" + obj.aData.f_id + "'><i class='icon-plus'></i></button>&nbsp;&nbsp; ";
                                    desc_html = desc.substr(0, 20) + "……";
                                } else {
                                    desc_html = desc;
                                }
                            }
                            var image_html = "";
                            if (obj.aData.image != null) {
                                image_html = "<img width='72' height='40' class=\"nav-user-photo\" src='" + content_image + obj.aData.image[0] + "'/>&nbsp;&nbsp;";
                            }
                            if (btn_html == "" && obj.aData.image != null) {
                                btn_html = "<button type='button' class='btn btn-minier btn-inverse' id='detail" + obj.aData.f_id + "'><i class='icon-plus'></i></button>&nbsp;&nbsp; ";
                            }
                            return btn_html + image_html + desc_html;
                        }

                    },
                    {
                        "bSortable": false,
                        "fnRender": function (obj) {
                            var link_html = obj.aData.link;
                            if (link_html) {
                                if (link_html.length > 12) {
                                    return "<button type='button' class='btn btn-minier btn-pink' id='content_td" + obj.aData.f_id + "'><i class='icon-plus'></i></button>&nbsp;&nbsp;" + link_html.substr(0, 12) + "……";
                                } else {
                                    return "网页链接:" + link_html;
                                }
                            } else if (obj.aData.content_id) {
                                if (obj.aData.type == 4){
                                    var html = "资讯id:" + obj.aData.content_id;
                                    if (obj.aData.innner_contest_id){
                                        if (obj.aData.innner_contest_type == 0){
                                            html += "<h6>内嵌赛事id："+obj.aData.innner_contest_id+" 赛事类型：足球</h6>";
                                        } else {
                                            html += "<h6>内嵌赛事id："+obj.aData.innner_contest_id+" 赛事类型：篮球</h6>";
                                        }
                                    }
                                    return html;
                                } else {
                                    return "猜友圈id:" + obj.aData.content_id;
                                }
                            } else if (obj.aData.contest) {
                                var contest_html = "赛事id:" + obj.aData.contest.contest_id;
                                if (obj.aData.contest.contest_type == 0) {
                                    return contest_html + " 类型:足球";
                                } else if (obj.aData.contest.contest_type == 1) {
                                    return contest_html + " 类型:篮球";
                                }
                            }
                        }
                    },
                    {
                        "sClass": "center",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            if (obj.aData.type == 1) {
                                return "<span class='label label-lg label-primary'>用户吐槽</span>";
                            } else if (obj.aData.type == 2) {
                                return "<span class='label label-lg label-success'>投注理由</span>";
                            } else if (obj.aData.type == 3) {
                                return "<span class='label label-lg label-light'>官方消息</span>";
                            } else if (obj.aData.type == 4) {
                                return "<span class='label label-lg label-warning'>推荐资讯</span>";
                            } else if (obj.aData.type == 5) {
                                return "<span class='label label-lg label-warning'>推荐比赛</span>";
                            } else if (obj.aData.type == 6) {
                                return "<span class='label label-lg label-warning'>推荐网页</span>";
                            } else {
                                return "<span class='label label-lg label-inverse'>出错</span>";
                            }
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
                        "sClass": "center",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            if (obj.aData.status == 0) {
                                return "<span class='label label-lg label-info'>初始</span>";
                            } else if (obj.aData.status == 1) {
                                return "<span class='label label-lg label-success'>审核通过</span>";
                            } else if (obj.aData.status == 2) {
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
                            return content_fn(obj.aData.queue, obj.aData.f_id, obj.aData.status, obj.aData.type);
                        }
                    }
                ],
                fnPreDrawCallback: function () {
                    $('#frontpages_content_table_filter input:text').attr('hidden', true);
                    return true;
                },
                fnDrawCallback: function () {
                    xin_next = false;
                    xin_previous = false;
                    order_display_num = 0;
                    xin_skip = 0;
                }
            }).on('click', 'button.btn-warning',function () {
                //撤销
                var tmp = $(this);
                frontpage_content_id = tmp.attr("id").substring(7);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/queue",
                    data: {fId: frontpage_content_id, status: 7, type: frontpage_content_type},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: "该信息已经撤销",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                            tmp.removeClass("btn-warning").addClass("btn-info").html("上榜");
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
            }).on('click', 'button.btn-info',function () {
                //上榜
                var tmp = $(this);
                frontpage_content_id = tmp.attr("id").substring(7);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/queue",
                    data: {fId: frontpage_content_id, status: 8, type: frontpage_content_type},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: "该信息已经上榜",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                            tmp.removeClass("btn-info").addClass("btn-warning").html("撤销");
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
                    url: appName + "/frontpage/edit",
                    data: {fId: frontpage_content_id, status: 1, type: frontpage_content_type},
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
                    url: appName + "/frontpage/edit",
                    data: {fId: frontpage_content_id, status: 2, type: frontpage_content_type},
                    success: function (data) {
                        if (data.code == 200) {
                            //var status_td_tmp = tmp.closest('td').prev();
                            //status_td_tmp.html("<span class='label label-lg label-danger'>删除</span>");
                            $.gritter.add({
                                title: "该信息已经审核删除",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                            tmp.prev().remove();
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
            }).on('click', 'button.btn-inverse',function () {
                //内容展开
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
                        url: appName + "/frontpage/view",
                        data: {fId: frontpage_content_id, type: frontpage_content_type},
                        success: function (data) {
                            if (data.code == 200) {
                                var img_html = "";
                                var content_html = "";
                                var out_html = "";


                                if (data.frontpage.image != null){
                                    img_html = "<img width='444' height='250' class='nav-user-photo' src='" + content_image + data.frontpage.image[0] + "'/>&nbsp;";
                                    if (data.frontpage.image[1]){
                                        img_html += "<img width='444' height='250' class='nav-user-photo' src='" + content_image + data.frontpage.image[1] + "'/>&nbsp;";
                                    }
                                    if (data.frontpage.image[2]){
                                        img_html += "<img width='444' height='250' class='nav-user-photo' src='" + content_image + data.frontpage.image[2] + "'/>&nbsp;";
                                    }
                                }


                                if (data.frontpage.title) {
                                    content_html = "标题：" + data.frontpage.title + " 内容：" + data.frontpage.desc;
                                } else {
                                    content_html = data.frontpage.desc;
                                }
                                if (img_html == "") {
                                    out_html = content_html;
                                } else {
                                    out_html = img_html + "<br>" + content_html;
                                }


                                frontpages_content_table.fnOpen(nTr, out_html, "center");
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
            }).on('click', 'button.btn-pink',function () {
                //展开
                var tmp = $(this);
                frontpage_content_id = tmp.attr("id").substring(10);
                var nTr = tmp.parents('tr')[0];
                //判断是否已打开
                if (frontpages_content_table.fnIsOpen(nTr)) {
                    $(this).addClass("icon-close").removeClass("icon-plus");
                    tmp.html("<i class='icon-plus'></i>");
                    frontpages_content_table.fnClose(nTr);
                } else {
                    tmp.html("<i class='icon-minus'></i>");
                    var out_html = "";
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/frontpage/view",
                        data: {fId: frontpage_content_id, type: frontpage_content_type},
                        success: function (data) {
                            if (data.code == 200) {
                                out_html = data.frontpage.link;
                                frontpages_content_table.fnOpen(nTr, out_html, "center");
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
            }).on('click', 'button.btn-purple', function () {
                //置顶
                var tmp = $(this);
                frontpage_content_id = tmp.attr("id").substring(7);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/queue",
                    data: {fId: frontpage_content_id, status: 9, type: frontpage_content_type},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: "该信息已经置顶",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                            //frontpages_content_table.fnDraw();
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
            }).on('click', 'button.btn-grey', function () {
                //置顶
                var tmp = $(this);
                frontpage_content_id = tmp.attr("id").substring(4);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/view",
                    data: {fId: frontpage_content_id, type: frontpage_content_type},
                    success: function (data) {
                        if (data.code == 200) {

                            $("#modal_edit_title").html(data.frontpage.title);
                            $("#modal_edit_content").html(data.frontpage.desc);
                            if (data.frontpage.type == 4){
                                $("#modal_edit_content_id").closest(".profile-info-row").removeClass("hide");
                                $("#modal_edit_inner_contest_id").closest(".profile-info-row").removeClass("hide");
                                $("#modal_edit_inner_contest_type").closest(".profile-info-row").removeClass("hide");

                                $("#modal_edit_url").closest(".profile-info-row").addClass("hide");
                                $("#modal_edit_contest_id").closest(".profile-info-row").addClass("hide");
                                $("#modal_edit_contest_type").closest(".profile-info-row").addClass("hide");

                                $("#modal_edit_content_id").html(data.frontpage.content_id)
                                if (data.frontpage.innner_contest_id){
                                    $("#modal_edit_inner_contest_id").html(data.frontpage.innner_contest_id);
                                    if (data.frontpage.innner_contest_type == 0){
                                        $("#modal_edit_inner_contest_type").html("足球");
                                    } else {
                                        $("#modal_edit_inner_contest_type").html("篮球");
                                    }

                                } else {
                                    $("#modal_edit_inner_contest_id").html("无");
                                    $("#modal_edit_inner_contest_type").html("无");
                                }

                            } else if (data.frontpage.type == 5){
                                $("#modal_edit_content_id").closest(".profile-info-row").addClass("hide");
                                $("#modal_edit_inner_contest_id").closest(".profile-info-row").addClass("hide");
                                $("#modal_edit_inner_contest_type").closest(".profile-info-row").addClass("hide");

                                $("#modal_edit_url").closest(".profile-info-row").addClass("hide");
                                $("#modal_edit_contest_id").closest(".profile-info-row").removeClass("hide");
                                $("#modal_edit_contest_type").closest(".profile-info-row").removeClass("hide");

                                $("#modal_edit_contest_id").html(data.frontpage.contest.contest_id);
                                if (data.frontpage.contest.contest_type == 0){
                                    $("#modal_edit_contest_type").html("篮球");
                                } else {
                                    $("#modal_edit_contest_type").html("篮球");
                                }
                            } else if (data.frontpage.type == 6){
                                $("#modal_edit_content_id").closest(".profile-info-row").addClass("hide");
                                $("#modal_edit_inner_contest_id").closest(".profile-info-row").addClass("hide");
                                $("#modal_edit_inner_contest_type").closest(".profile-info-row").addClass("hide");

                                $("#modal_edit_url").closest(".profile-info-row").removeClass("hide");
                                $("#modal_edit_contest_id").closest(".profile-info-row").addClass("hide");
                                $("#modal_edit_contest_type").closest(".profile-info-row").addClass("hide");

                                $("#modal_edit_url").html(data.frontpage.link);
                            }
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

                //打开modal
                $("#modal_edit").modal({backdrop: "static"});

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
            $("#frontpage_one_key_pass").on("click", function () {
                //ids字符串
                var ids = "";
                $("#frontpages_content_table tbody").find('tr').each(function () {
                    //获取所选的行
                    var tmp = $(this).find("td:eq(0) input[type=checkbox]");
                    var checked = tmp.prop('checked');
                    var tr_id = tmp.attr("id").substring(9);

                    if (checked) {
                        ids += tr_id + ",";
                    }
                });
                if (ids == "") {
                    $.gritter.add({
                        title: "至少选择一项",
                        time: 2000,
                        class_name: 'gritter-warning gritter-center'
                    });
                    return;
                }
                //提交请求
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/edit",
                    data: {ids: ids, status: 1, type: frontpage_content_type},
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
                maxFiles: 3,
                acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
                addRemoveLinks: true,
                dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 可以上传三张照片</span> \
                <span class="smaller-80 grey">(官方头版照片显示)</span> <br /> \
                <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
                dictResponseError: '上传图片出错！',
                dictMaxFilesExceeded: '只能允许上传三张照片！',
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

                                upload_photo_key += res.key + ",";
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
                            $.gritter.add({
                                title: "由于删掉了一张图片，所有已成功上传的图片都已失效，需全部重新上传",
                                time: 2000,
                                class_name: 'gritter-warning gritter-center'
                            });
                            upload_photo_key = "";
                        }
                    });
                }
            });
        }


        function addImage3() {
            $("#image_form2").dropzone({
                paramName: "file", // The name that will be used to transfer the file
                maxFilesize: 10, // MB
                url: appName + "/frontpage/add/image",
                maxFiles: 3,
                acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
                addRemoveLinks: true,
                dictDefaultMessage: '<span class="bigger-120 bolder"><i class="icon-caret-right red"></i> 支持上传最多3张图片，点下面的“确定”按钮确定更新</span>',
                dictResponseError: '上传图片出错！',
                dictMaxFilesExceeded: '只能允许上传三张照片！',
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

                                upload_edit_photo_key += res.key + ",";

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
            addImage3();
        } catch (e) {
            alert('Dropzone.js does not support older browsers!');
        }

        $("#modal_edit_image_bt").on("click",function(){

            if (upload_edit_photo_key){

                //去掉最后的逗号
                upload_edit_photo_key = upload_edit_photo_key.substring(0, upload_edit_photo_key.length-1);

            } else {
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
                url: appName + "/frontpage/edit",
                data: {
                    fId: frontpage_content_id,
                    type: frontpage_content_type,
                    oper: 11,
                    path: upload_edit_photo_key
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
        });


        //添加窗口关闭后清空
        $("#modal_edit").on("hidden.bs.modal", function () {
            //清空原来的内容
            upload_edit_photo_key = "";
            $("#image_form2").remove();
            var photo_html = "<form id=\"image_form2\" action=\"#\" class=\"dropzone\" method=\"post\" enctype=\"multipart/form-data\">" +
                "<div class=\"fallback\">" +
                "<input name=\"file\" type=\"file\"/>" +
                "</div>" +
                "</form>";
            $("#image_form_after_add2").append(photo_html);
            addImage3();
        });


        /**
         * ======================================================
         * 添加照片 end
         * */


        $("#modal_add_frontpage_is_inner_contest").get(0).checked = false ;
        $("#modal_add_frontpage_type input[value=4]").get(0).checked = true;

        $("#modal_add_frontpage_is_inner_contest").on("change",function(){
            var value = $(this).get(0).checked;
            if (value){
                $("#modal_add_frontpage_inner_fieldset").removeClass("hide");
            } else {
                $("#modal_add_frontpage_inner_fieldset").addClass("hide");
            }

        });

        $("#modal_add_frontpage_type input").on("click", function () {
            var value = $(this).val();
            if(value == 4) {
                $("#modal_add_frontpage_content_id").closest("div").removeClass("hide");
                $("#modal_add_frontpage_is_inner_contest").closest("div").removeClass("hide");
                $("#modal_add_frontpage_inner_fieldset").addClass("hide");
                $("#modal_add_frontpage_contest_fieldset").addClass("hide");
                $("#modal_add_frontpage_url").closest("div").addClass("hide");
            } else if(value == 5) {
                $("#modal_add_frontpage_content_id").closest("div").addClass("hide");
                $("#modal_add_frontpage_is_inner_contest").closest("div").addClass("hide");
                $("#modal_add_frontpage_is_inner_contest").get(0).checked = false ;
                $("#modal_add_frontpage_contest_fieldset").removeClass("hide");
                $("#modal_add_frontpage_inner_fieldset").addClass("hide");
                $("#modal_add_frontpage_url").closest("div").addClass("hide");

            } else if(value == 6){
                $("#modal_add_frontpage_content_id").closest("div").addClass("hide");
                $("#modal_add_frontpage_is_inner_contest").closest("div").addClass("hide");
                $("#modal_add_frontpage_is_inner_contest").get(0).checked = false ;
                $("#modal_add_frontpage_inner_fieldset").addClass("hide");
                $("#modal_add_frontpage_contest_fieldset").addClass("hide");
                $("#modal_add_frontpage_url").closest("div").removeClass("hide");
            }
        });

        $("#modal_add_frontpage_load_content").on("click", function(){
            var content_id = $(this).prev("input").val();
            if (!content_id || isNaN(content_id)){
                $.gritter.add({
                        title: "请填写正确的资讯ID",
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
            }
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/frontpage/view/content",
                data: {
                    id: content_id
                },
                success: function (data) {
                    if (data.code == 200) {
                        $("#modal_add_frontpage_title").val(data.content.title);
                        $("#modal_add_frontpage_content").val(data.content.text);
                        //填充图片
                        var images = data.content.text_images;
                        if (images && images.length > 0){
                            $.each(images,function(n,v){
                                var image_html = '<div class="itemdiv memberdiv">\
                                                        <div class="inline position-relative">\
                                                            <div class="user1">\
                                                                <a href="#">\
                                                                    <img src="'+v+'"/>\
                                                                </a>\
                                                            </div>\
                                                            <div class="body">\
                                                                <div class="name">\
                                                                    <a href="#">\
                                                                        <i class="icon-remove-circle icon-only bigger-150"></i>\
                                                                    </a>\
                                                                </div>\
                                                            </div>\
                                                        </div>\
                                                   </div>';
                                $("#show_img").append(image_html);

                            });

                            $("#show_img .icon-remove-circle").on("click",function(){
                                $(this).closest(".itemdiv").remove();
                            });
                        }
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


        //确认添加
        $("#modal_add_frontpage_button").on("click", function () {

            var title = $("#modal_add_frontpage_title").val();
            var desc = $("#modal_add_frontpage_content").val();
            var type = $("#modal_add_frontpage_type input:checked").val();
            var content_id ;
            var inner_contest_id;
            var inner_contest_type;
            var contest_id ;
            var contest_type;
            var url ;
            if (type == 4) {
                content_id = $("#modal_add_frontpage_content_id").val();
                if (content_id == "") {
                    $.gritter.add({
                        title: "请输入资讯Id",
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
                    return;
                }
                var is_inner = $("#modal_add_frontpage_is_inner_contest").get(0).checked;
                if (is_inner){
                    inner_contest_id = $("#modal_add_frontpage_inner_contest_id").val();
                    inner_contest_type = $("#modal_add_frontpage_inner_contest_type input:checked").val();
                    if (isNaN(inner_contest_id) || isNaN(inner_contest_type)){
                        $.gritter.add({
                            title: "请输入有效的内嵌赛事id和类型",
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                        return;
                    }
                }
            }
            if (type == 5) {
                contest_id = $("#modal_add_frontpage_contest_id").val();
                if (contest_id == "") {
                    $.gritter.add({
                        title: "请输入赛事Id",
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
                    return;
                }
                contest_type = $("#modal_add_frontpage_contest_type input:checked").val();

            }
            if (type == 6) {
                url = $("#modal_add_frontpage_url").val();
                if (url == "") {
                    $.gritter.add({
                        title: "请输入网页链接",
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
                    return;
                }
            }
            var load_image = "";
            $("#show_img .user1").find('img').each(function () {
                load_image += $(this).attr("src") + ",";
            });

            if (!upload_photo_key && !load_image) {
                $.gritter.add({
                    title: "请上传图片",
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            } else if (upload_photo_key){
                //去掉最后的逗号
                upload_photo_key = upload_photo_key.substring(0, upload_photo_key.length-1);
            }

            //提交按钮不可用
            $(this).addClass("disabled");

            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/frontpage/add/images",
                data: {
                    url: load_image,
                    end : upload_photo_key
                },
                success: function (data) {
                    if (data.images) {

                        upload_photo_key = data.images ;


                        //保存
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: appName + "/frontpage/edit",
                            data: {
                                contestId: contest_id,
                                contestType: contest_type,
                                innnerContestId: inner_contest_id,
                                innnerContestType: inner_contest_type,
                                path: upload_photo_key,
                                link: url,
                                title: title,
                                desc: desc,
                                contentId: content_id,
                                type: type
                            },
                            success: function (data) {
                                if (data.code == 200) {
                                    $.gritter.add({
                                        title: "恭喜您，添加成功！",
                                        time: 2000,
                                        class_name: 'gritter-success gritter-center gritter-light'
                                    });

                                    //刷新
                                    frontpages_content_table.fnDraw();
                                    $("#frontpage_add_modal").modal('hide');
                                    //按钮可用
                                    $("#modal_add_frontpage_button").removeClass('disabled');
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

        //添加窗口关闭后清空
        $("#frontpage_add_modal").on("hidden.bs.modal", function () {
            //清空原来的内容
            upload_photo_key = "";
            $("#image_form").remove();
            var photo_html = "<form id=\"image_form\" action=\"#\" class=\"dropzone\" method=\"post\" enctype=\"multipart/form-data\">" +
                "<div class=\"fallback\">" +
                "<input name=\"file\" type=\"file\"/>" +
                "</div>" +
                "</form>";
            $("#image_form_after_add").append(photo_html);
            $("#modal_add_frontpage_title").val("");
            $("#modal_add_frontpage_content").val("");
            $("#modal_add_frontpage_content_id").val("");
            $("#modal_add_frontpage_contest_id").val("");
            $("#modal_add_frontpage_url").val("");
            $("#modal_add_frontpage_type").val("");
            $("#modal_add_frontpage_contest_type").val("");
            addImage();
            //清除append的内容
            $("#show_img *").remove();
        });


        $('table th input:checkbox').on('click', function () {
            var that = this;
            $(this).closest('table').find('tr > td:first-child input:checkbox')
                .each(function () {
                    this.checked = that.checked;
                    $(this).closest('tr').toggleClass('selected');
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
                    url: appName + "/frontpage/edit",
                    data: {
                        fId: frontpage_content_id,
                        type: frontpage_content_type,
                        oper: 11,
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


        //修改内容
        $('#modal_edit_content').editable({
            type: 'textarea',
            success: function (response, newValue) {

                //修改提交
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/edit",
                    data: {
                        fId: frontpage_content_id,
                        type: frontpage_content_type,
                        oper: 11,
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
                    url: appName + "/frontpage/edit",
                    data: {
                        fId: frontpage_content_id,
                        type: frontpage_content_type,
                        oper: 11,
                        contentId: newValue
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


        //修改内嵌赛事ID
        $('#modal_edit_inner_contest_id').editable({
            type: 'text',
            success: function (response, newValue) {

                //修改提交
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/edit",
                    data: {
                        fId: frontpage_content_id,
                        type: frontpage_content_type,
                        oper: 11,
                        innnerContestId: newValue
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


        //修改内嵌赛事类型
        var inner_contest_type = [];
        $.each({ "0": "足球", "1": "篮球"}, function (k, v) {
            inner_contest_type.push({id: k, text: v});
        });

        $('#modal_edit_inner_contest_type').editable({
            type: 'select',
            source: inner_contest_type,
            success: function (response, newValue) {
                var init_inner_type = 0;
                if (newValue == "篮球") {
                    init_inner_type = 1;
                }
                //修改提交
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/edit",
                    data: {
                        fId: frontpage_content_id,
                        type: frontpage_content_type,
                        oper: 11,
                        innnerContestType: init_inner_type
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: "恭喜您，修改成功！",
                                time: 2000,
                                class_name: 'gritter-success'
                            });
                            if (init_inner_type == 0) {
                                $("#modal_edit_inner_contest_type").html("足球");
                            } else {
                                $("#modal_edit_inner_contest_type").html("篮球");
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


        //修改URL
        $('#modal_edit_url').editable({
            type: 'text',
            success: function (response, newValue) {

                //修改提交
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/edit",
                    data: {
                        fId: frontpage_content_id,
                        type: frontpage_content_type,
                        oper: 11,
                        link: newValue
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
                    url: appName + "/frontpage/edit",
                    data: {
                        fId: frontpage_content_id,
                        type: frontpage_content_type,
                        oper: 11,
                        contestId: newValue
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
        $('#modal_edit_contest_type').editable({
            type: 'select',
            source: inner_contest_type,
            success: function (response, newValue) {
                var init_inner_type = 0;
                if (newValue == "篮球") {
                    init_inner_type = 1;
                }
                //修改提交
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/edit",
                    data: {
                        fId: frontpage_content_id,
                        type: frontpage_content_type,
                        oper: 11,
                        contestType: init_inner_type
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: "恭喜您，修改成功！",
                                time: 2000,
                                class_name: 'gritter-success'
                            });
                            if (init_inner_type == 0) {
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


        /**
         * 内容区
         * ====================================================================
         * ********************************************************************
         * ====================================================================
         * 广告区
         */



        var frontpages_ad_table;
        $(function () {
            frontpages_ad_table = $('#frontpages_ad_table').dataTable({
                "bAutoWidth": true,
                "bProcessing": true,
                "bServerSide": true,
                "bStateSave": false, //是否保存cookie数据
                "bFilter": true,
                "aLengthMenu": [40, 80, 120],
                'iDisplayLength': 40,//每页显示个数
                "sAjaxDataProp": "frontpages",
                "sAjaxSource": appName + '/frontpage/list',
                "fnServerParams": function (aoData) {  //查询条件
                    aoData.push(
                        { "name": "previous", "value": xin_previous },
                        { "name": "next", "value": xin_next },
                        { "name": "endId", "value": xin_ad_end },
                        { "name": "startId", "value": xin_ad_start },
                        { "name": "status", "value": ad_status },
                        { "name": "type", "value": frontpage_ad_type },
                        { "name": "skip", "value": xin_skip }
                    );
                },
                "oLanguage": {
                    "sProcessing": "正在加载中......",

                    "sSearch": '<span class="label label-lg label-danger">筛选：</span><select id="ad_table_condition"><option value="-100" selected="selected">全部</option><option value="-1">吐槽</option>' +
                        '<option value="-2">投注理由</option><option value="-4">推荐资讯</option><option value="-5">推荐赛事</option>' +
                        '<option value="-6">推荐网页</option></select>' +
                        '<span class="label label-lg label-danger">状态：</span><select id="ad_table_status"><option value="" selected="selected">全部</option>' +
                        '<option value="0">初始</option><option value="1">通过</option><option value="2">删除</option></select>' +
                        '&nbsp;&nbsp;&nbsp; <span class="label label-lg label-success"><a id="frontpage_ad_add_a" href="#" class="white">发布</a></span>' +
                        '&nbsp;&nbsp;&nbsp; <span class="label label-lg label-danger"><a id="frontpage_ad_one_key_pass" href="#" class="white">一键通过</a></span>',
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
                        "bSortable": false,
                        "sClass": "center",
                        "fnRender": function (obj) {

                            var sReturn = "<label><input type='checkbox' class='ace' id='checkbox_" + obj.aData.f_id + "'/><span class='lbl'></span></label>";
                            return sReturn;
                        }
                    },
                    {

                        "sClass": "center",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            if (order_display_num == 0) {
                                xin_ad_end = obj.aData.f_id;
                            }
                            xin_ad_start = obj.aData.f_id;
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
                            var desc = obj.aData.desc;
                            var desc_html = "";
                            var btn_html = "";
                            if (desc != null) {
                                if (desc.length > 13) {
                                    btn_html = "<button type='button' class='btn btn-minier btn-inverse' id='detail" + obj.aData.f_id + "'><i class='icon-plus'></i></button>&nbsp;";
                                    desc_html = desc.substr(0, 13) + "……";
                                } else {
                                    desc_html = desc;
                                }
                            }
                            var image_html01 = "";
                            var image_html02 = "";
                            var image_html03 = "";
                            if (obj.aData.image != null) {
                                image_html01 = "<img width='72' height='40' class=\"nav-user-photo\" src='" + content_image + obj.aData.image[0] + "'/> ";
                                if (obj.aData.image[1] != null) {
                                    image_html02 = "<img width='72' height='40' class=\"nav-user-photo\" src='" + content_image + obj.aData.image[1] + "'/> ";
                                }
                                if (obj.aData.image[2] != null) {
                                    image_html03 = "<img width='72' height='40' class=\"nav-user-photo\" src='" + content_image + obj.aData.image[2] + "'/> ";
                                }
                            }
                            if (btn_html == "" && obj.aData.image != null) {
                                btn_html = "<button type='button' class='btn btn-minier btn-inverse' id='detail" + obj.aData.f_id + "'><i class='icon-plus'></i></button>&nbsp;";
                            }
                            return btn_html + image_html01 + image_html02 + image_html03 + desc_html;
                        }

                    },
                    {
                        "bSortable": false,
                        "fnRender": function (obj) {
                            var link_html = obj.aData.link;
                            if (link_html) {
                                if (link_html.length > 15) {
                                    return "<button type='button' class='btn btn-minier btn-pink' id='content_td" + obj.aData.f_id + "'><i class='icon-plus'></i></button>&nbsp;&nbsp;" + link_html.substr(0, 15) + "……";
                                } else {
                                    return "网页链接:" + link_html;
                                }
                            } else if (obj.aData.content_id) {
                                if (obj.aData.type == -4){
                                    var html = "资讯id:" + obj.aData.content_id;
                                    if (obj.aData.innner_contest_id){
                                        if (obj.aData.innner_contest_type == 0){
                                            html += "<h6>内嵌赛事id："+obj.aData.innner_contest_id+" 赛事类型：足球</h6>";
                                        } else {
                                            html += "<h6>内嵌赛事id："+obj.aData.innner_contest_id+" 赛事类型：篮球</h6>";
                                        }
                                    }
                                    return html;
                                } else {
                                    return "猜友圈id:" + obj.aData.content_id;
                                }
                            } else if (obj.aData.contest) {
                                var contest_html = "赛事id:" + obj.aData.contest.contest_id;
                                if (obj.aData.contest.contest_type == 0) {
                                    return contest_html + " 类型:足球";
                                } else if (obj.aData.contest.contest_type == 1) {
                                    return contest_html + " 类型:篮球";
                                }
                            }
                        }
                    },
                    {
                        "sClass": "center",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            if (obj.aData.type == -1) {
                                return "<span class='label label-lg label-primary'>用户吐槽</span>";
                            } else if (obj.aData.type == -2) {
                                return "<span class='label label-lg label-success'>投注理由</span>";
                            } else if (obj.aData.type == -4) {
                                return "<span class='label label-lg label-warning'>推荐资讯</span>";
                            } else if (obj.aData.type == -5) {
                                return "<span class='label label-lg label-warning'>推荐比赛</span>";
                            } else if (obj.aData.type == -6) {
                                return "<span class='label label-lg label-warning'>推荐网页</span>";
                            } else {
                                return "<span class='label label-lg label-inverse'>出错</span>";
                            }
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
                        "sClass": "center",
                        "bSortable": false,
                        "fnRender": function (obj) {
                            if (obj.aData.status == 0) {
                                return "<span class='label label-lg label-info'>初始</span>";
                            } else if (obj.aData.status == 1) {
                                return "<span class='label label-lg label-success'>审核通过</span>";
                            } else if (obj.aData.status == 2) {
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
                            return content_fn(obj.aData.queue, obj.aData.f_id, obj.aData.status, obj.aData.type);
                        }
                    }
                ],
                fnPreDrawCallback: function () {
                    $('#frontpages_ad_table_filter input:text').attr('hidden', true);
                    return true;
                },
                fnDrawCallback: function () {
                    xin_next = false;
                    xin_previous = false;
                    order_display_num = 0;
                    xin_skip = 0;
                }
            }).on('click', 'button.btn-warning',function () {
                //撤销
                var tmp = $(this);
                frontpage_ad_id = tmp.attr("id").substring(7);
                var type_tmp = tmp.val().substring(14);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/queue",
                    data: {fId: frontpage_ad_id, status: 7, type: type_tmp},
                    success: function (data) {
                        if (data.code == 200) {
                            //tmp.removeClass("btn-warning").addClass("btn-info").html("上榜");
                            $.gritter.add({
                                title: "该信息已经撤销",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                            //刷新
                            frontpages_ad_table.fnDraw();
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
            }).on('click', 'button.btn-info',function () {
                //上榜
                var tmp = $(this);
                frontpage_ad_id = tmp.attr("id").substring(7);
                var type_tmp = tmp.val().substring(14);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/queue",
                    data: {fId: frontpage_ad_id, status: 8, type: type_tmp},
                    success: function (data) {
                        if (data.code == 200) {
                            //tmp.removeClass("btn-info").addClass("btn-warning").html("撤销");
                            $.gritter.add({
                                title: "该信息已经上榜",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                            //刷新
                            frontpages_ad_table.fnDraw();
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
                frontpage_ad_id = tmp.attr("id").substring(4);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/edit",
                    data: {fId: frontpage_ad_id, status: 1, type: frontpage_ad_type},
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
                frontpage_ad_id = tmp.attr("id").substring(6);

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/edit",
                    data: {fId: frontpage_ad_id, status: 2, type: frontpage_ad_type},
                    success: function (data) {
                        if (data.code == 200) {
                            //var status_td_tmp = tmp.closest('td').prev();
                            //status_td_tmp.html("<span class='label label-lg label-danger'>删除</span>");
                            $.gritter.add({
                                title: "该信息已经审核删除",
                                time: 2000,
                                class_name: 'gritter-success gritter-center gritter-light'
                            });
                            //刷新
                            frontpages_ad_table.fnDraw();
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
            }).on('click', 'button.btn-inverse',function () {
                //内容展开
                var tmp = $(this);
                frontpage_ad_id = tmp.attr("id").substring(6);
                var nTr = tmp.parents('tr')[0];
                //判断是否已打开
                if (frontpages_ad_table.fnIsOpen(nTr)) {
                    $(this).addClass("icon-close").removeClass("icon-plus");
                    tmp.html("<i class='icon-plus'></i>");
                    frontpages_ad_table.fnClose(nTr);
                } else {
                    tmp.html("<i class='icon-minus'></i>");
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/frontpage/view",
                        data: {fId: frontpage_ad_id, type: frontpage_ad_type},
                        success: function (data) {
                            if (data.code == 200) {
                                var out_html = "";
                                var img_html = "";
                                var content_html = "";
                                if (data.frontpage.image != null) {
                                    img_html = "<img width='480' height='300' class='nav-user-photo' src='" + content_image + data.frontpage.image[0] + "'/>&nbsp;";
                                    if (data.frontpage.image[1] != null) {
                                        img_html += "<img width='480' height='300' class='nav-user-photo' src='" + content_image + data.frontpage.image[1] + "'/>&nbsp;";
                                    }
                                    if (data.frontpage.image[2] != null) {
                                        img_html += "<img width='480' height='300' class='nav-user-photo' src='" + content_image + data.frontpage.image[2] + "'/>&nbsp;";
                                    }
                                }
                                if (data.frontpage.title != undefined || data.frontpage.title != null) {
                                    content_html = "标题：" + data.frontpage.title + " 内容：" + data.frontpage.desc;
                                } else {
                                    content_html = data.frontpage.desc;
                                }
                                if (img_html == "") {
                                    out_html = content_html;
                                } else {
                                    out_html = img_html + "<br>" + content_html;
                                }

                                frontpages_ad_table.fnOpen(nTr, out_html, "center");
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
            }).on('click', 'button.btn-pink', function () {
                //展开
                var tmp = $(this);
                frontpage_ad_id = tmp.attr("id").substring(10);
                var nTr = tmp.parents('tr')[0];
                //判断是否已打开
                if (frontpages_ad_table.fnIsOpen(nTr)) {
                    $(this).addClass("icon-close").removeClass("icon-plus");
                    tmp.html("<i class='icon-plus'></i>");
                    frontpages_ad_table.fnClose(nTr);
                } else {
                    tmp.html("<i class='icon-minus'></i>");
                    var out_html = "";
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/frontpage/view",
                        data: {fId: frontpage_ad_id, type: frontpage_ad_type},
                        success: function (data) {
                            if (data.code == 200) {
                                out_html = data.frontpage.link;
                                frontpages_ad_table.fnOpen(nTr, out_html, "center");
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

            $("#ad_table_condition").on("change", function () {
                frontpage_ad_type = $(this).val();
                frontpages_ad_table.fnDraw();
            });

            $("#ad_table_status").on("change", function () {
                ad_status = $(this).val()
                frontpages_ad_table.fnDraw();
            });

            $("#frontpage_ad_add_a").on("click", function () {
                //打开modal
                $("#frontpage_ad_add_modal").modal({backdrop: "static"});
            });

            //一键通过
            $("#frontpage_ad_one_key_pass").on("click", function () {
                //ids字符串
                var ids = "";
                $("#frontpages_ad_table tbody").find('tr').each(function () {
                    //获取所选的行
                    var tmp = $(this).find("td:eq(0) input[type=checkbox]");
                    var checked = tmp.prop('checked');
                    var tr_id = tmp.attr("id").substring(9);

                    if (checked) {
                        ids += tr_id + ",";
                    }
                });
                if (ids == "") {
                    $.gritter.add({
                        title: "至少选择一项",
                        time: 2000,
                        class_name: 'gritter-warning gritter-center'
                    });
                    return;
                }
                //提交请求
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/frontpage/edit",
                    data: {ids: ids, status: 1, type: frontpage_ad_type},
                    success: function (data) {
                        if (data.code == 200) {
                            frontpages_ad_table.fnDraw();
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


        });


        /**
         * ======================================================
         * 添加照片 start
         * */


        function addImage2() {
            $("#image_form_ad").dropzone({
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

                                upload_photo_key += res.key + ",";
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
                            $.gritter.add({
                                title: "由于删掉了一张图片，所有已成功上传的图片都已失效，需全部重新上传",
                                time: 2000,
                                class_name: 'gritter-warning gritter-center'
                            });
                            upload_photo_key = "";
                        }
                    });
                }
            });
        }

        try {
            addImage2();
        } catch (e) {
            alert('Dropzone.js does not support older browsers!');
        }

        /**
         * ======================================================
         * 添加照片 end
         * */



        $("#modal_add_frontpage_ad_is_inner_contest").get(0).checked = false ;
        $("#modal_add_frontpage_ad_type input[value='-4']").get(0).checked = true;

        $("#modal_add_frontpage_ad_is_inner_contest").on("change",function(){
            var value = $(this).get(0).checked;
            if (value){
                $("#modal_add_frontpage_ad_inner_fieldset").removeClass("hide");
            } else {
                $("#modal_add_frontpage_ad_inner_fieldset").addClass("hide");
            }

        });

        $("#modal_add_frontpage_ad_type input").on("click", function () {
            var value = $(this).val();
            if(value == -4) {
                $("#modal_add_frontpage_ad_content_id").closest("div").removeClass("hide");
                $("#modal_add_frontpage_ad_is_inner_contest").closest("div").removeClass("hide");
                $("#modal_add_frontpage_ad_inner_fieldset").addClass("hide");
                $("#modal_add_frontpage_ad_contest_fieldset").addClass("hide");
                $("#modal_add_frontpage_ad_url").closest("div").addClass("hide");
            } else if(value == -5) {
                $("#modal_add_frontpage_ad_content_id").closest("div").addClass("hide");
                $("#modal_add_frontpage_ad_is_inner_contest").closest("div").addClass("hide");
                $("#modal_add_frontpage_ad_is_inner_contest").get(0).checked = false ;
                $("#modal_add_frontpage_ad_contest_fieldset").removeClass("hide");
                $("#modal_add_frontpage_ad_inner_fieldset").addClass("hide");
                $("#modal_add_frontpage_ad_url").closest("div").addClass("hide");

            } else if(value == -6){
                $("#modal_add_frontpage_ad_content_id").closest("div").addClass("hide");
                $("#modal_add_frontpage_ad_is_inner_contest").closest("div").addClass("hide");
                $("#modal_add_frontpage_ad_is_inner_contest").get(0).checked = false ;
                $("#modal_add_frontpage_ad_inner_fieldset").addClass("hide");
                $("#modal_add_frontpage_ad_contest_fieldset").addClass("hide");
                $("#modal_add_frontpage_ad_url").closest("div").removeClass("hide");
            }
        });


        $("#modal_add_frontpage_ad_load_content").on("click", function(){
            var content_id = $(this).prev("input").val();
            if (!content_id || isNaN(content_id)){
                $.gritter.add({
                    title: "请填写正确的资讯ID",
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
            }
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/frontpage/view/content",
                data: {
                    id: content_id
                },
                success: function (data) {
                    if (data.code == 200) {
                        $("#modal_add_frontpage_ad_title").val(data.content.title);
                        $("#modal_add_frontpage_ad_content").val(data.content.text);
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

        //确认添加
        $("#modal_add_frontpage_ad_button").on("click", function () {

            var title = $("#modal_add_frontpage_ad_title").val();
            var desc = $("#modal_add_frontpage_ad_content").val();
            var type = $("#modal_add_frontpage_ad_type input:checked").val();
            var content_id ;
            var inner_contest_id;
            var inner_contest_type;
            var contest_id ;
            var contest_type;
            var url ;
            if (type == -4) {
                content_id = $("#modal_add_frontpage_ad_content_id").val();
                if (content_id == "") {
                    $.gritter.add({
                        title: "请输入资讯Id",
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
                    return;
                }
                var is_inner = $("#modal_add_frontpage_ad_is_inner_contest").get(0).checked;
                if (is_inner){
                    inner_contest_id = $("#modal_add_frontpage_ad_inner_contest_id").val();
                    inner_contest_type = $("#modal_add_frontpage_ad_inner_contest_type input:checked").val();
                    if (isNaN(inner_contest_id) || isNaN(inner_contest_type)){
                        $.gritter.add({
                            title: "请输入有效的内嵌赛事id和类型",
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                        return;
                    }
                }
            }
            if (type == -5) {
                contest_id = $("#modal_add_frontpage_ad_contest_id").val();
                if (contest_id == "") {
                    $.gritter.add({
                        title: "请输入赛事Id",
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
                    return;
                }
                contest_type = $("#modal_add_frontpage_ad_contest_type input:checked").val();

            }
            if (type == -6) {
                url = $("#modal_add_frontpage_ad_url").val();
                if (url == "") {
                    $.gritter.add({
                        title: "请输入网页链接",
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
                    return;
                }
            }
            if (upload_photo_key == "") {
                $.gritter.add({
                    title: "请上传图片",
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            } else {
                //去掉最后的逗号
                upload_photo_key = upload_photo_key.substring(0, upload_photo_key.length-1);
            }
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/frontpage/edit",
                data: {
                    contestId: contest_id,
                    contestType: contest_type,
                    innnerContestId: inner_contest_id,
                    innnerContestType: inner_contest_type,
                    path: upload_photo_key,
                    link: url,
                    title: title,
                    desc: desc,
                    contentId: content_id,
                    type: type
                },
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，添加成功！",
                            time: 2000,
                            class_name: 'gritter-success gritter-center gritter-light'
                        });

                        //刷新
                        frontpages_ad_table.fnDraw();
                        $("#frontpage_ad_add_modal").modal('hide');
                        //同时发到赛事新闻中
//                        if (inner_contest_id && inner_contest_type){
//                            $.ajax({
//                                type: 'POST',
//                                dataType: 'json',
//                                url: appName + "/contest/news/add",
//                                data: {
//                                    contest_id: inner_contest_id,
//                                    contest_type: inner_contest_type,
//                                    title: title,
//                                    image: upload_photo_key,
//                                    content_id: content_id
//                                }
//                            });
//                        }
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

        //添加窗口关闭后清空
        $("#frontpage_ad_add_modal").on("hidden.bs.modal", function () {
            //清空原来的内容
            upload_photo_key = "" ;
            $("#image_form_ad").remove();
            var photo_html = "<form id=\"image_form_ad\" action=\"#\" class=\"dropzone\" method=\"post\" enctype=\"multipart/form-data\">" +
                "<div class=\"fallback\">" +
                "<input name=\"file\" type=\"file\"/>" +
                "</div>" +
                "</form>";
            $("#image_form_after_ad_add").append(photo_html);
            $("#modal_add_frontpage_ad_title").val("");
            $("#modal_add_frontpage_ad_content").val("");
            $("#modal_add_frontpage_ad_content_id").val("");
            $("#modal_add_frontpage_ad_contest_id").val("");
            $("#modal_add_frontpage_ad_url").val("");
            $("#modal_add_frontpage_ad_type").val("");
            $("#modal_add_frontpage_ad_contest_type").val("");
            addImage2();
        });


    });


});
