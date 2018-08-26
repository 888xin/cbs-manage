define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jqGrid/jquery.jqGrid.min");
    require("../../modules/plugin/jqGrid/i18n/grid.locale-en");
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    jQuery(grid_selector).jqGrid({
        //direction: "rtl",
        url: appName + "/authority/query",
        datatype: "json",
        height: 550,
        colNames: ['操作', 'resId', '名称', 'resKey', 'resUrl', '描述', '类型'],
        colModel: [{
            name: '操作',
            index: '',
            width: 80,
            fixed: true,
            sortable: false,
            resize: false,
            formatter: 'actions',
            formatoptions: {
                keys: true,
                delOptions: {
                    recreateForm: true,
                    beforeShowForm: beforeDeleteCallback
                }
            }
        }, {
            name: 'resId',
            index: 'resId',
            width: 20,
            sorttype: "int",
            hidden: true,
            editable: true
        }, {
            name: 'name',
            index: 'name',
            width: 90,
            editable: true
        }, {
            name: 'resKey',
            index: 'resKey',
            width: 70,
            editable: true
        }, {
            name: 'resUrl',
            index: 'resUrl',
            width: 120,
            editable: true
        }, {
            name: 'description',
            index: 'description',
            width: 150,
            sortable: false,
            editable: true,
            edittype: "textarea",
            editoptions: {
                rows: "3",
                cols: "18"
            }
        }, {
            name: 'type',
            index: 'type',
            width: 150,
            sortable: false,
            editable: true,
            edittype: "select",
            editoptions: {
                value: "2:请求权限;1:目录权限"
            }
        }],
        viewrecords: true,
        rowNum: 15, //每页显示记录数
        rowList: [15, 30, 50],
        pager: pager_selector,
        altRows: true,
        //toppager: true,
        multiselect: true,
        //multikey: "ctrlKey",
        multiboxonly: true,
        loadComplete: function() {
            var table = this;
            setTimeout(function() {
                updatePagerIcons(table);
                enableTooltips(table);
            }, 0);
        },
        jsonReader: {
            root: "records",
            page: "pageNow",
            total: "pageCount",
            records: "rowCount",
            repeatitems: true,
            id: "id"
        },
        editurl: appName + "/authority/edit",
        caption: "权限列表操作",
        autowidth: true
    });
    function aceSwitch(cellvalue, options, cell) {
        setTimeout(function() {
            $(cell).find('input[type=checkbox]')
                .wrap('<label class="inline" />')
                .addClass('ace ace-switch ace-switch-5')
                .after('<span class="lbl"></span>');
        }, 0);
    }
    //navButtons
    jQuery(grid_selector).jqGrid('navGrid', pager_selector, { //navbar options
        edit: true,
        editicon: 'icon-pencil blue',
        add: true,
        addicon: 'icon-plus-sign purple',
        del: true,
        delicon: 'icon-trash red',
        search: true,
        searchicon: 'icon-search orange',
        refresh: true,
        refreshicon: 'icon-refresh green',
        view: true,
        viewicon: 'icon-zoom-in grey'
    }, {
        //edit record form
        //closeAfterEdit: true,
        recreateForm: true,
        beforeShowForm: function(e) {
            var form = $(e[0]);
            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
            style_edit_form(form);
        },
        aftersavefunc: function(e) {
        }
    }, {
        //new record form
        closeAfterAdd: true,
        recreateForm: true,
        viewPagerButtons: false,
        beforeShowForm: function(e) {
            var form = $(e[0]);
            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
            style_edit_form(form);
        }
    }, {
        //delete record form
        recreateForm: true,
        beforeShowForm: function(e) {
            var form = $(e[0]);
            if (form.data('styled')) return false;
            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
            style_delete_form(form);
            form.data('styled', true);
        },
        onClick: function(e) {
        }
    }, {
        //search form
        recreateForm: true,
        afterShowSearch: function(e) {
            var form = $(e[0]);
            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
            style_search_form(form);
        },
        afterRedraw: function() {
            style_search_filters($(this));
        },
        multipleSearch: true,
        /**
         multipleGroup:true,
         showQuery: true
         */
    }, {
        //view record form
        recreateForm: true,
        beforeShowForm: function(e) {
            var form = $(e[0]);
            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
        }
    })

    function style_edit_form(form) {
        //update buttons classes
        var buttons = form.next().find('.EditButton .fm-button');
        buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove(); //ui-icon, s-icon
        buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
        buttons.eq(1).prepend('<i class="icon-remove"></i>')
        buttons = form.next().find('.navButton a');
        buttons.find('.ui-icon').remove();
        buttons.eq(0).append('<i class="icon-chevron-left"></i>');
        buttons.eq(1).append('<i class="icon-chevron-right"></i>');
    }

    function style_delete_form(form) {
        var buttons = form.next().find('.EditButton .fm-button');
        buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove(); //ui-icon, s-icon
        buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
        buttons.eq(1).prepend('<i class="icon-remove"></i>')
    }

    function style_search_filters(form) {
        form.find('.delete-rule').val('X');
        form.find('.add-rule').addClass('btn btn-xs btn-primary');
        form.find('.add-group').addClass('btn btn-xs btn-success');
        form.find('.delete-group').addClass('btn btn-xs btn-danger');
    }

    function style_search_form(form) {
        var dialog = form.closest('.ui-jqdialog');
        var buttons = dialog.find('.EditTable')
        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search');
    }

    function beforeDeleteCallback(e) {
        var form = $(e[0]);
        if (form.data('styled')) return false;
        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
        style_delete_form(form);
        form.data('styled', true);
    }

    function beforeEditCallback(e) {
        var form = $(e[0]);
        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
        style_edit_form(form);
    }
    //replace icons with FontAwesome icons like above
    function updatePagerIcons(table) {
        var replacement = {
            'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
            'ui-icon-seek-prev': 'icon-angle-left bigger-140',
            'ui-icon-seek-next': 'icon-angle-right bigger-140',
            'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
        };
        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function() {
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
            if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
        })
    }
    function enableTooltips(table) {
        $('.navtable .ui-pg-button').tooltip({
            container: 'body'
        });
        $(table).find('.ui-pg-div').tooltip({
            container: 'body'
        });
    }
})
