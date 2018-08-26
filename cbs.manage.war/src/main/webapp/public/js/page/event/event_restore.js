define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");
    //basic initializations
    $('#fb_settle_table tr input[type=checkbox]').removeAttr('checked');
    $('#fb_settle_table tr').on('click', function() {
        $(this).toggleClass('selected1');
        if (this.checked) tablebox.display_bar(1); //display action toolbar when a message is selected
        else {
            tablebox.display_bar($('#fb_settle_table tr input[type=checkbox]:checked').length);
            //determine number of selected messages and display/hide action toolbar accordingly
        }
    });


    //select all
    $('#fb_select_item_all').on('click', function(e) {
        e.preventDefault();
        tablebox.select_all();
    });

    //select none
    $('#fb_select_item_none').on('click', function(e) {
        e.preventDefault();
        tablebox.select_none();
    });

    //check/uncheck all tr
    $('#fb_toggle_all').removeAttr('checked').on('click', function() {
        if (this.checked) {
            tablebox.select_all();
        } else tablebox.select_none();
    });

    var tablebox = {
        //displays a toolbar according to the number of selected messages
        display_bar: function(count) {
            if (count == 0) {
                $('#fb_toggle_all').removeAttr('checked');
                $('#fb_table_toolbar').addClass('hide');
                $('#fb_table_infobar').removeClass('hide');
            } else {
                $('#fb_table_infobar').addClass('hide');
                $('#fb_table_toolbar').removeClass('hide');
            }
        },
        select_all: function() {
            var count = 0;
            $('tr input[type=checkbox]').each(function() {
                this.checked = true;
                $(this).closest('tr').addClass('selected1');
                count++;
            });

            $('#fb_toggle_all').get(0).checked = true;

            tablebox.display_bar(count);
        },
        select_none: function() {
            $('tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
            $('#fb_toggle_all').get(0).checked = false;

            tablebox.display_bar(0);
        },
        select_read: function() {
            $('.message-unread input[type=checkbox]').removeAttr('checked').closest('.message-item').removeClass('selected');

            var count = 0;
            $('.message-item:not(.message-unread) input[type=checkbox]').each(function() {
                this.checked = true;
                $(this).closest('.message-item').addClass('selected');
                count++;
            });
            tablebox.display_bar(count);
        },
        select_unread: function() {
            $('.message-item:not(.message-unread) input[type=checkbox]').removeAttr('checked').closest('.message-item').removeClass('selected');

            var count = 0;
            $('.message-unread input[type=checkbox]').each(function() {
                this.checked = true;
                $(this).closest('.message-item').addClass('selected');
                count++;
            });

            tablebox.display_bar(count);
        }
    }


    $("#fb_settle_table tr").tooltip({
        hide: {
            delay: 100
        }
    });

    $('#settle_tab a').click(function(e) {
        e.preventDefault(); //阻止a链接的跳转行为
        var href = $(this).attr("href");
        if (href == "#fb_tab") {
            //切换到了篮球tab
        } else if (href == "#bb_tab") {

        }

        $(this).tab('show'); //显示当前选中的链接及关联的content

    })


    //赛事过滤
    $("#fb_search_input").keyup(function() {
        $("#fb_settle_table tbody tr").hide().filter(":contains('" + ($(this).val()) + "')").show();
    }).keyup();


    $('#fb_data_more').on(ace.click_event, function() {
        $.gritter.add({
            title: '温馨提示',
            text: '数据加载成功',
            time: 1000,
            class_name: 'gritter-success gritter-center gritter-light'
        });

        return false;
    });


    //一键修复赛事
    $('#one_restore_a').on('click', function() {
        bootbox.confirm("确定一键修复所选赛事？", function(result) {
            if (result) {
                $.gritter.add({
                    title: '任务提交成功！',
                    time: 2000,
                    class_name: 'gritter-success gritter-light'
                });
            }
        });
    });



});
