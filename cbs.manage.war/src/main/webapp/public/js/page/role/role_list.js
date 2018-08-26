define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/jquery.bootstrap-growl.min");
    var treeDataSource = require("../../modules/plugin/data/fuelux.tree-data");
    require("../../modules/plugin/fuelux/fuelux.tree.min.js");
    require("../../modules/plugin/bootstrap-select.min");
    //角色权限字符串
    var role_authority_str;
    //角色权限数组
    var role_authoritys = new Array();
    //角色id
    var role_id;
    //超级管理员权限代号
    var super_admin_code = "sys_all";
    //树形条目事件名称存储
    //    var tree_item_tmp = $(".tree-item");
    //模态里面的条目是否第一次触发
    var is_first_item_load = true;
    var treeviewEvent = $('#treeview');
    //表格条目点击触发事件，收集该条目角色的信息
    $('#sample-table-1 tbody tr').on('click', function () {
        role_id = this.id;
        role_id = role_id.substr(5, role_id.length - 5);
        role_authority_str = $(this).find('td').next().html();
        role_authoritys = role_authority_str.split(",");
        for (var i = 0; i < role_authoritys.length; i++) {
            role_authoritys[i] = role_authoritys[i].trim();
        }
    });
    $('#modal-table').on('show.bs.modal', function () {
        //清空tree数据
        treeviewEvent.removeData("tree");
        treeviewEvent.unbind("click");
        //加载树形结构数据
        treeviewEvent.ace_tree({
            dataSource: treeDataSource,
            multiSelect: true,
            loadingHTML: '<div class="tree-loading"><i class="icon-refresh icon-spin blue"></i></div>',
            'open-icon': 'icon-minus',
            'close-icon': 'icon-plus',
            'authority': role_authoritys,
            'selectable': true,
            'selected-icon': 'icon-ok',
            'unselected-icon': 'icon-remove'
        });
        $('.tree-folder-header').trigger('click');

//        $("#modal_item_div *").remove();
//
//        $.ajax({
//            type: 'POST',
//            dataType: 'json',
//            url: appName + "/role/get/item",
//            success: function (data) {
//                var option_html = '<label for="modal_item_value" class="green bigger-150">选择对该用户可见的条目：</label>' +
//                    '<select id="modal_item_value" class="show-menu-arrow form-control" multiple>';
//                var admin = false ;
//                $.each(data.keys, function (index, key) {
//
//                    if (role_authoritys[0] == super_admin_code){
//                        admin = true ;
//                    }
//                    if (admin){
//                        if (key.resKey != super_admin_code){
//                            option_html += "<option selected value='" + key.resKey + "'>" + key.name + "</option>";
//                        }
//                    } else {
//                        var flag = true ;
//                        for (var i = 0; i < role_authoritys.length; i++) {
//                            if (role_authoritys[i] == key.resKey){
//                                flag = false ;
//                                option_html += "<option selected value='" + key.resKey + "'>" + key.name + "</option>";
//                                break;
//                            }
//                        }
//                        if (flag){
//                            if (index > 0){
//                                option_html += "<option value='" + key.resKey + "'>" + key.name + "</option>";
//                            }
//                        }
//                    }
//
//
//                });
//                option_html += '</select>';
//                $("#modal_item_div").append(option_html);
//                $("#modal_item_value").selectpicker({
//                    style: 'btn-success'
//                });
//
//            }
//        });




    });


    //编辑权限列表提交
    $('#tree_submit_button').on('click', function () {
        //已经被选中的条目
        var items = $('#treeview').tree('selectedItems');
//        var flag = false ;
//        $("#modal_item_value option:checked").each(function () {
//            flag = true ;
//        });
//        if (items.length > 0 || flag) {
        if (items.length > 0) {
            var num = 0;
            role_authority_str = "";
            for (var i = 0; i < items.length; i++) {
                if (items[i].value == undefined) {
                    continue;
                } else if (num == 0 && items[i].value == super_admin_code) {
                    //超级管理员权限，只要存储一个值就可以了
                    role_authority_str = super_admin_code;
                    break;
                } else {
                    if (i == (items.length - 1)) {
                        role_authority_str += items[i].value;
                    } else {
                        role_authority_str += items[i].value + ", ";
                    }
//                    role_authority_str += items[i].value + ", ";
                    num++;
                }
            }
//            if (role_authority_str != super_admin_code){
//                $("#modal_item_value option:checked").each(function () {
//                    role_authority_str += $(this).val() + ", ";
//                });
//
//            }
//            if (role_authority_str){
//                //去掉最后的逗号
//                role_authority_str = role_authority_str.substring(0,role_authority_str.length-2);
//            }
            //更新角色权限
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/role/modify",
                data: {
                    roleId: role_id,
                    resourceResKeys: role_authority_str
                },
                success: function (data) {
                    $.bootstrapGrowl(data.msg);
                    if (data.flag == true) {
                        //更新角色表格权限栏的内容
                        $("#rolename-" + role_id).next().html(role_authority_str);
                    }
                }
            });
        }
    });

    //设置用户可用
    $('#sample-table-1 tbody tr td:last-child').find("button[title='审核通过']").on('click', function () {
        var role_id_edit = this.id;
        role_id_edit = role_id_edit.substr(12, role_id_edit.length - 12);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/role/modify",
            data: {
                roleId: role_id_edit,
                status: 1
            },
            success: function (data) {
                $.bootstrapGrowl(data.msg);
                if (data.flag == true) {
                    //更新角色表格权限栏的内容
                    $("#rolename-" + role_id_edit).next().next().next().html("<span class='label label-sm label-success'>正常</span>");
                }
            }
        });
    });
    //设置用户不可用role_set_delete_
    $('#sample-table-1 tbody tr td:last-child').find("button[title='审核未通过']").on('click', function () {
        var role_id_edit = this.id;
        role_id_edit = role_id_edit.substr(16, role_id_edit.length - 16);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/role/modify",
            data: {
                roleId: role_id_edit,
                status: 2
            },
            success: function (data) {
                $.bootstrapGrowl(data.msg);
                if (data.flag == true) {
                    //更新角色表格权限栏的内容
                    $("#rolename-" + role_id_edit).next().next().next().html("<span class='label label-sm label-inverse'>删除</span>");
                }
            }
        });
    });
    $('#sample-table-1 tbody tr td:last-child').find("button[title='删除']").on('click', function () {
        var role_id_edit = this.id;
        role_id_edit = role_id_edit.substr(12);

        bootbox.confirm("删除该角色将不可恢复，确定删除?", function (result) {
            if (result) {
                //确认删除
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/role/delete",
                    data: {
                        roleId: role_id_edit
                    },
                    success: function (data) {
                        $.bootstrapGrowl(data.msg);
                        if (data.flag) {
                            //移除
                            $("#role-" + role_id_edit).remove();
                        }
                    }
                });
            }
        });



    });
    treeviewEvent.on('loaded', function () {
        if (role_authoritys.length > 0) {
            if (role_authoritys[0] == super_admin_code) {
                //超级管理员给所有的树形条目打勾
                var tree_item_tmp = $(".tree-folder-content > div");
                tree_item_tmp.addClass("tree-selected");
                tree_item_tmp.find('i').removeClass('icon-remove').addClass('icon-ok');
            }
        }
    });

    $('#sample-table-1 tbody tr').find('td:eq(4)').on('click', function () {
        var tmp = $(this);
        var id_tmp = tmp.closest('tr').attr("id");
        var id = id_tmp.substr(5);
        var td_html = tmp.html();
        if (td_html) {

            var form = $("<span><label>修改描述 &nbsp;</label></span>");
            form.append("<input id='detail_update_input' class='middle' autocomplete=off type=text value='" + td_html + "' /> ");
            form.append("<button id='detail_update_bt' class='btn btn-sm btn-success'><i class='icon-ok'></i> 保存</button>");

            bootbox.dialog({
                message: form,

                buttons: {
                    "delete": {
                        "label": "<i class='icon-trash'></i> 删除描述",
                        "className": "btn-sm btn-danger",
                        "callback": function () {
                            $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                url: appName + "/role/modify",
                                data: {
                                    roleId: id,
                                    desc: ""
                                },
                                success: function (data) {
                                    tmp.html("");
                                    $.bootstrapGrowl(data.msg);
                                }
                            });
                        }
                    },
                    "close": {
                        "label": "<i class='icon-remove'></i> 关闭",
                        "className": "btn-sm"
                    }
                }

            });

            $("#detail_update_bt").on("click", function () {
                var input_val = $("#detail_update_input").val();
                if (td_html == input_val) {
                    return;
                } else {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/role/modify",
                        data: {
                            roleId: id,
                            desc: input_val
                        },
                        success: function (data) {
                            tmp.html(input_val);
                            $.bootstrapGrowl(data.msg);
                            bootbox.hideAll();
                        }
                    });
                }
            })

        } else {
            bootbox.prompt("输入新的描述", function (title) {
                if (title) {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/role/modify",
                        data: {
                            roleId: id,
                            desc: title
                        },
                        success: function (data) {
                            tmp.html(title);
                            $.bootstrapGrowl(data.msg);
                        }
                    });
                }
            });
        }
    });



    $('#sample-table-1 tbody tr').find('td:eq(5)').on('click', function () {
        var tmp = $(this);
        var id_tmp = tmp.closest('tr').attr("id");
        var id = id_tmp.substr(5);
        var td_html = tmp.html();
        if (td_html) {

            var form = $("<span><label>修改手机号码 &nbsp;</label></span>");
            form.append("<input id='phone_update_input' class='middle' autocomplete=off type=text value='" + td_html + "' /> ");
            form.append("<button id='phone_update_bt' class='btn btn-sm btn-success'><i class='icon-ok'></i> 保存</button>");

            bootbox.dialog({
                message: form,

                buttons: {
                    "delete": {
                        "label": "<i class='icon-trash'></i> 删除手机号码",
                        "className": "btn-sm btn-danger",
                        "callback": function () {
                            $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                url: appName + "/role/modify",
                                data: {
                                    roleId: id,
                                    phone: ""
                                },
                                success: function (data) {
                                    tmp.html("");
                                    $.bootstrapGrowl(data.msg);
                                }
                            });
                        }
                    },
                    "close": {
                        "label": "<i class='icon-remove'></i> 关闭",
                        "className": "btn-sm"
                    }
                }

            });

            $("#phone_update_bt").on("click", function () {
                var input_val = $("#phone_update_input").val();
                if (td_html == input_val) {
                    return;
                } else {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/role/modify",
                        data: {
                            roleId: id,
                            phone: input_val
                        },
                        success: function (data) {
                            tmp.html(input_val);
                            $.bootstrapGrowl(data.msg);
                            bootbox.hideAll();
                        }
                    });
                }
            })

        } else {
            bootbox.prompt("输入新的手机号码", function (title) {
                if (title) {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/role/modify",
                        data: {
                            roleId: id,
                            phone: title
                        },
                        success: function (data) {
                            tmp.html(title);
                            $.bootstrapGrowl(data.msg);
                        }
                    });
                }
            });
        }
    });

})
