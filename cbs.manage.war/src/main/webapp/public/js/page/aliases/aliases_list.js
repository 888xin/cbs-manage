define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min.js");
    require("../../modules/plugin/jquery.dataTables.min");
    require("../../modules/plugin/jquery.bootstrap-growl.min");
    require("../../modules/plugin/bootbox.min");

    var head_url = "http://proxy.dev.xy.l99.com/image.php?type=avatar90&ifile=";


    var operateTr = "<div class=\"visible-md visible-lg hidden-sm hidden-xs action-buttons\">" +
        "<a class=\"blue\" href=\"#\" data-toggle='tooltip' title='设为普通马甲'><i class=\"icon-user bigger-130\"></i></a>" +
        " <a class=\"orange\" href=\"#\" data-toggle='tooltip' title='设为精品马甲'><i class=\"icon-user bigger-130\"></i></a>" +
        " <a class=\"red\" href=\"#\" data-toggle='tooltip' title='删除'><i class=\"icon-trash bigger-130\"></i></a>" +
        "</div>";

    $("#aliases_table tbody").tooltip({
        hide: {
            delay: 100
        }
    });

    var aliases_table = $('#aliases_table').dataTable({
        "bJQueryUI": true,
        "bAutoWidth": true,
        "bProcessing": true,
        "bServerSide": true,
        "bStateSave": false,
        "bFilter": false,
        //"sPaginationType": "full_numbers",
        "bLengthChange": false, //改变每页显示数据数量
        "sAjaxDataProp": "aliases",
        "sAjaxSource": appName + '/aliases/getAliasesByRole',
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
                aTargets: ['_all']
            }
        ],
        "aoColumns": [
            {
                "bSortable": false,
                "sClass": "center",
                "fnRender": function (obj) {
                    var sReturn = "<label><input type=\"checkbox\" class=\"ace\"/><span class=\"lbl\"></span></label>";
                    return sReturn;
                }
            },
            {
                "mDataProp": "accountId",
                "bSortable": false
            },
            {
                "mDataProp": "longNO",
                "bSortable": false
            },
            {
                "mDataProp": "name",
                "bSortable": false
            },
            {
                "mDataProp": "head",
                "bSortable": false,
                "fnRender": function (obj) {
                    return "<img width='40' height='40' class=\"nav-user-photo\" src='" + head_url + obj.aData.head + "' />";
                }
            },
            {
                "mDataProp": "addTime",
                "bSortable": false,
                "fnRender": function (obj) {
                    var dataFormat = new Date(obj.aData.addTime).toLocaleString();
                    return dataFormat;
                }
            },
            {
                "mDataProp": "type",
                "bSortable": false,
                "fnRender": function (obj) {
                    var sReturn = "";
                    if (obj.aData.type == 1) {
                        sReturn = "<span class=\"label label-sm label-warning\">精品</span>";
                    } else if (obj.aData.type == 0) {
                        sReturn = "<span class=\"label label-sm label-primary\">普通</span>";
                    } else if (obj.aData.type == 2) {
                        sReturn = "<span class=\"label label-sm label-danger\">删除</span>";
                    }
                    return sReturn;
                }
            },
            {
                "bSortable": false,
                "fnRender": function (obj) {
                    return operateTr;
                }
            }
        ]
    });


    $('table th input:checkbox').on('click', function () {
        var that = this;
        $(this).closest('table').find('tr > td:first-child input:checkbox')
            .each(function () {
                this.checked = that.checked;
                $(this).closest('tr').toggleClass('selected');
            });

    });

    //        $('table tbody tr > td:first-child').addClass('center');


    $('[data-rel="tooltip"]').tooltip({
        placement: tooltip_placement
    });

    function tooltip_placement(context, source) {
        var $source = $(source);
        var $parent = $source.closest('table')
        var off1 = $parent.offset();
        var w1 = $parent.width();

        var off2 = $source.offset();
        var w2 = $source.width();

        if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) return 'right';
        return 'left';
    }

    $("#search_aliases_modal").bind('click', function () {
        var search_content = $("#search-aliases").val().trim();
        var search_content_password = $("#search-aliases-password").val().trim();
        if (search_content == "") {
            $.bootstrapGrowl("请输入龙号");
        } else {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/aliases/get",
                data: {
                    longNo: search_content,
                    password: search_content_password
                },
                success: function (data) {
                    if (data.flag == true && data.code == 200) {
                        user_data = data;
                        var dataFormat = new Date(data.create_time).toLocaleString();
                        var genderTmp = "";
                        if (data.gender == 0) {
                            genderTmp = "女"
                        } else {
                            genderTmp = "男"
                        }
                        var appendStr = addTr(data.account_id, data.long_no, data.user_name, data.head_path, genderTmp,
                            data.status, dataFormat);
                        $("#modal_content").append(appendStr);
                        $("#modal-info").modal();
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
        }
    });

    $('#modal-info').on('hidden.bs.modal', function () {
        $(".profile-user-info").remove();
    });

    //用户数据
    var user_data;
    //确认把当前用户设为马甲
    $("#tree_submit_button").bind('click', function () {
        if (user_data != undefined) {
            if (user_data.code == 200) {
                //有用户数据
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/aliases/edit",
                    data: {
                        oper: "add",
                        accountId: user_data.account_id,
                        longNO: user_data.long_no,
                        name: user_data.user_name,
                        head: user_data.head_path
                    },
                    success: function (data) {
                        $.bootstrapGrowl(data.msg);
                        aliases_table.fnDraw();
                    }
                });
            }
        }
    });


    //删除马甲
    $('#aliases_table tbody').on('click', 'a.red', function () {
        var tmpTr = $(this).closest("tr");
        var del_account_id = tmpTr.find("td:eq(1)").html();
        bootbox.confirm("确定删除该马甲?", function (result) {
            if (result) {
                //确认删除
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/aliases/edit",
                    data: {
                        accountId: del_account_id,
                        oper: "del"
                    },
                    success: function (data) {
                        $.bootstrapGrowl(data.msg);
                        if (data.flag == true) {
                            //删除该行内容
                            //tmpTr.find("td:eq(6)").html("<span class=\"label label-sm label-danger\">删除</span>");
                            aliases_table.fnDraw();
                        }
                    }
                });
            }
        });
    }).on('click', 'a.blue', function () {
        //设为普通
        var tmpTr = $(this).closest("tr");
        var del_account_id = tmpTr.find("td:eq(1)").html();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/aliases/edit",
            data: {
                accountId: del_account_id,
                type:0,
                oper: "edit"
            },
            success: function (data) {
                if (data.flag) {
                    //删除该行内容
                    tmpTr.find("td:eq(6)").html("<span class=\"label label-sm label-primary\">普通</span>");
                } else {
                    $.bootstrapGrowl("设置失败！");
                }
            }
        });
    }).on('click', 'a.orange', function () {
        //设为精品
        var tmpTr = $(this).closest("tr");
        var del_account_id = tmpTr.find("td:eq(1)").html();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/aliases/edit",
            data: {
                accountId: del_account_id,
                type:1,
                oper: "edit"
            },
            success: function (data) {
                if (data.flag) {
                    //删除该行内容
                    tmpTr.find("td:eq(6)").html("<span class=\"label label-sm label-warning\">精品</span>");
                } else {
                    $.bootstrapGrowl("设置失败！");
                }
            }
        });
    });


    function addTr(account_id, long_no, user_name, head_path, gender, status, create_time) {
        var htmlStr = "<div class=\"profile-user-info profile-user-info-striped\">" +
            "                                        <div class=\"profile-info-row\">" +
            "                                            <div class=\"profile-info-name\"> AccountId </div>" +
            "                                            <div class=\"profile-info-value\">" +
            "                                                <span class=\"editable\" id=\"aliases_" + account_id + "\">" + account_id + "</span>" +
            "                                            </div>" +
            "                                        </div>" +

            "                                        <div class=\"profile-info-row\">" +
            "                                            <div class=\"profile-info-name\"> 龙号 </div>" +
            "                                            <div class=\"profile-info-value\">" +
            "                                                <span class=\"editable\" id=\"aliases_" + long_no + "\">" + long_no + "</span>" +
            "                                            </div>" +
            "                                        </div>" +

            "                                        <div class=\"profile-info-row\">" +
            "                                            <div class=\"profile-info-name\"> 用户名 </div>" +
            "                                            <div class=\"profile-info-value\">" +
            "                                                <span class=\"editable\" id=\"aliases_" + user_name + "\">" + user_name + "</span>" +
            "                                            </div>" +
            "                                        </div>" +

            "                                        <div class=\"profile-info-row\">" +
            "                                            <div class=\"profile-info-name\"> 头像 </div>" +
            "                                            <div class=\"profile-info-value\">" +
            "                                                <span class=\"editable\" id=\"aliases_" + head_path + "\"><img class=\"nav-user-photo\" src='" + head_url + head_path + "' /></span>" +
            "                                            </div>" +
            "                                        </div>" +

            "                                        <div class=\"profile-info-row\">" +
            "                                            <div class=\"profile-info-name\"> 性别 </div>" +
            "                                            <div class=\"profile-info-value\">" +
            "                                                <span class=\"editable\" id=\"aliases_" + gender + "\">" + gender + "</span>" +
            "                                            </div>" +
            "                                        </div>" +

            "                                        <div class=\"profile-info-row\">" +
            "                                            <div class=\"profile-info-name\"> 状态 </div>" +
            "                                            <div class=\"profile-info-value\">" +
            "                                                <span class=\"editable\" id=\"aliases_" + status + "\">" + status + "</span>" +
            "                                            </div>" +
            "                                        </div>" +

            "                                        <div class=\"profile-info-row\">" +
            "                                            <div class=\"profile-info-name\"> 创建时间 </div>" +
            "                                            <div class=\"profile-info-value\">" +
            "                                                <span class=\"editable\" id=\"aliases_" + create_time + "\">" + create_time + "</span>" +
            "                                            </div>" +
            "                                        </div>" +

            "                                    </div>";
        return htmlStr;
    }

})
