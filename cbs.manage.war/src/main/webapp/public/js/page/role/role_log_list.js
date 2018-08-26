define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jqGrid/jquery.jqGrid.min");
    require("../../modules/plugin/jqGrid/i18n/grid.locale-en");
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    jQuery(grid_selector).jqGrid({
        //direction: "rtl",
        url: appName + "/role/log/list",
        datatype: "json",
        height: 720,
        colNames: ['Id', '登陆名', '登陆时间', '登陆IP'],
        colModel: [{
            name: 'loginId',
            index: 'loginId',
            width: 20,
            editable: false
        }, {
            name: 'loginName',
            index: 'loginName',
            width: 90,
            editable: false
        }, {
            name: 'loginTimeStr',
            index: 'loginTimeStr',
            width: 70,
            editable: false
        }, {
            name: 'loginIP',
            index: 'loginIP',
            width: 120,
            editable: false
        }],
        viewrecords: true,
        rowNum: 20, //每页显示记录数
        rowList: [20, 40, 80],
        pager: pager_selector,
        altRows: true,
        multiselect: true,
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
            id: "loginId"
        },
        autowidth: true
    });
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
