define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");

    /**
     * 常量值 start
     * */
    //足球tab是否打开
    var isOpenFb = false;
    //篮球tab是否打开
    var isOpenBb = false;
    //记录开始ID
    var fb_start_id ;
    var bb_start_id ;
    //剩余未结束的赛事场数
    var fb_remainder = 0;
    var bb_remainder = 0;
    //是否属于五大
    var is_fb_five = true ;
    var is_bb_five = true ;

    /**
     * 常量值 end
     * */


    /**
     * fb 多选框点击事件 start
     * */
    //fb basic initializations
    $('#fb_settle_table tr input[type=checkbox]').removeAttr('checked');
    $('#fb_settle_table').on('click', 'tr input[type=checkbox]', function() {
        if(this.checked){
            fb_tablebox.display_bar(1);
            $(this).closest('tr').addClass('selected1');
        } else {
            fb_tablebox.display_bar($('#fb_settle_table tr input[type=checkbox]:checked').length);
            $(this).closest('tr').removeClass('selected1');
        }
    });


    //fb select all
    $('#fb_select_item_all').on('click', function(e) {
        e.preventDefault();
        fb_tablebox.select_all();
    });

    //fb select none
    $('#fb_select_item_none').on('click', function(e) {
        e.preventDefault();
        fb_tablebox.select_none();
    });

    /////////


    //check/uncheck all tr
    $('#fb_toggle_all').removeAttr('checked').on('click', function(){
        if(this.checked) {
            fb_tablebox.select_all();
        } else fb_tablebox.select_none();
    });

    var fb_tablebox = {
        //displays a toolbar according to the number of selected messages
        display_bar : function (count) {
            if(count == 0) {
                $('#fb_toggle_all').removeAttr('checked');
                $('#fb_table_toolbar').addClass('hide');
                $('#fb_table_infobar').removeClass('hide');
            }
            else {
                $('#fb_table_infobar').addClass('hide');
                $('#fb_table_toolbar').removeClass('hide');
            }
        }
        ,
        select_all : function() {
            var count = 0;
            $('#fb_settle_table tr input[type=checkbox]').each(function(){
                this.checked = true;
                $(this).closest('tr').addClass('selected1');
                count++;
            });

            $('#fb_toggle_all').get(0).checked = true;

            fb_tablebox.display_bar(count);
        }
        ,
        select_none : function() {
            $('#fb_settle_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
            $('#fb_toggle_all').get(0).checked = false;

            fb_tablebox.display_bar(0);
        }
    }

    /**
     * fb 多选框点击事件 end
     * */




    /**
     * bb 多选框点击事件 start
     * */
        //bb basic initializations
    $('#bb_settle_table tr input[type=checkbox]').removeAttr('checked');
    $('#bb_settle_table').on('click', 'tr input[type=checkbox]', function() {
        if(this.checked){
            bb_tablebox.display_bar(1);
            $(this).closest('tr').addClass('selected1');
        } else {
            bb_tablebox.display_bar($('#bb_settle_table tr input[type=checkbox]:checked').length);
            $(this).closest('tr').removeClass('selected1');
        }
    });


    //bb select all
    $('#bb_select_item_all').on('click', function(e) {
        e.preventDefault();
        bb_tablebox.select_all();
    });

    //bb select none
    $('#bb_select_item_none').on('click', function(e) {
        e.preventDefault();
        bb_tablebox.select_none();
    });

    /////////


    //check/uncheck all tr
    $('#bb_toggle_all').removeAttr('checked').on('click', function(){
        if(this.checked) {
            bb_tablebox.select_all();
        } else bb_tablebox.select_none();
    });

    var bb_tablebox = {
        //displays a toolbar according to the number of selected messages
        display_bar : function (count) {
            if(count == 0) {
                $('#bb_toggle_all').removeAttr('checked');
                $('#bb_table_toolbar').addClass('hide');
                $('#bb_table_infobar').removeClass('hide');
            }
            else {
                $('#bb_table_infobar').addClass('hide');
                $('#bb_table_toolbar').removeClass('hide');
            }
        }
        ,
        select_all : function() {
            var count = 0;
            $('#bb_settle_table tr input[type=checkbox]').each(function(){
                this.checked = true;
                $(this).closest('tr').addClass('selected1');
                count++;
            });

            $('#bb_toggle_all').get(0).checked = true;

            bb_tablebox.display_bar(count);
        }
        ,
        select_none : function() {
            $('#bb_settle_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
            $('#bb_toggle_all').get(0).checked = false;

            bb_tablebox.display_bar(0);
        }
    }

    /**
     * bb 多选框点击事件 end
     * */



    $("#fb_settle_table,#bb_settle_table").tooltip({
        hide: {
            delay: 100
        }
    });

    $('#settle_tab a').click(function (e) {
        e.preventDefault();//阻止a链接的跳转行为
        var href = $(this).attr("href");
        if (href == "#fb_tab"){


        } else if (href == "#bb_tab"){

            //切换到了篮球tab
            //并未加载过数据
            if (!isOpenBb){
                getBbData();
            }
        }

        $(this).tab('show');//显示当前选中的链接及关联的content

    });




    /**
     * ===================
     * 打开页面异步加载数据 足球 Start
     * */

    getFbData();

    function getFbData(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/getSettleData",
            success: function (data) {
                if (data.code == 200) {
                    //清空原有的数据
                    $("#fb_settle_table tbody tr").remove();
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.contests, function (index, contest) {
                            fb_start_id = contest.target_id ;
                            if (!contest.lock_flag){
                                fb_remainder ++ ;
                            }
                            var htmlStr = showFbSettleData(contest.contest_id, contest.color, contest.cup_name,contest.cup_id, contest.h_t.name, contest.a_t.name,
                                    contest.start_time, contest.home_scores, contest.away_scores, contest.status, contest.bet_count, contest.settle,
                                    contest.create_time, contest.lock_flag,contest.belong_five);
                            $("#fb_settle_table tbody").append(htmlStr);
                        });
                        //设置剩余场数
                        $("#fb_remainder_i").html(fb_remainder);
                    } else {
                        $.gritter.add({
                            title: '服务器无数据返回！',
                            time: 2000,
                            class_name: 'gritter-info gritter-light'
                        });
                    }
                } else {
                    $.gritter.add({
                        title: "出现" + data.code + "异常",
                        time: 2000,
                        class_name: 'gritter-error gritter-light'
                    });
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    } else {
                        $.gritter.add({
                            title: "出现未知异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    }
                }
                isOpenFb = true;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.gritter.add({
                    title: XMLHttpRequest.status,
                    text: XMLHttpRequest.statusText,
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
            }

        });
    }

    function getBbData(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/basketball/getSettleData",
            success: function (data) {
                if (data.code == 200) {
                    //清空原有的数据
                    $("#bb_settle_table tbody tr").remove();
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.contests, function (index, contest) {
                            bb_start_id = contest.target_id ;
                            if (!contest.lock_flag){
                                bb_remainder ++ ;
                            }
                            var htmlStr = showBbSettleData(contest.contest_id, contest.color, contest.cup_name, contest.cup_id,contest.h_t.name, contest.a_t.name,
                                    contest.start_time, contest.home_scores, contest.away_scores, contest.status, contest.bet_count, contest.settle,
                                    contest.create_time, contest.lock_flag,contest.belong_five);
                            $("#bb_settle_table tbody").append(htmlStr);
                        });
                        //设置剩余场数
                        $("#bb_remainder_i").html(bb_remainder);
                    } else {
                        $.gritter.add({
                            title: '服务器无数据返回！',
                            time: 2000,
                            class_name: 'gritter-info gritter-light'
                        });
                        //设置加载按钮消失
                        $("#bb_data_more").addClass("hidden");
                    }
                } else {
                    $.gritter.add({
                        title: "出现" + data.code + "异常",
                        time: 2000,
                        class_name: 'gritter-error gritter-light'
                    });
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    } else {
                        $.gritter.add({
                            title: "出现未知异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    }
                }
                isOpenBb = true;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.gritter.add({
                    title: XMLHttpRequest.status,
                    text: XMLHttpRequest.statusText,
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
            }

        });
    }

    function showFbSettleData(contest_id, color, cup_name,cup_id, h_name, a_name, start_time, home_scores, away_scores, status, bet_count, settle, settle_time,lock_flag,is_five) {
        //非五大联赛
        if (is_fb_five && !is_five){
            return "";
        }
        var name = "";
        if (color != null){
            name = "<span style=\"background-color: "+color+" !important;\" class=\"label\" >"+cup_name+"</span>" ;
        } else {
            name = "<span style=\"background-color: #999 !important;\" class=\"label\" >"+cup_name+"</span>" ;
        }
        var vs = "<i class=\"smaller-90 bolder red\">"+h_name+"</i> <i class=\"smaller bolder\">VS</i> <i class=\"smaller-90 bolder green\">"+a_name+"</i>" ;
        var start_time_html = new Date(start_time).pattern("MM-dd HH:mm");
        var scores = home_scores + " : " + away_scores ;
        var status_html ;
        if (status == -1){
            status_html = "<b class=\"green\">完场</b>" ;
        } else if (status == 0){
            status_html = "<b class=\"light-grey\">未开始</b>" ;
        }else if (status == -10){
            status_html = "<b class=\"dark\">取消</b>" ;
        }else if (status == 1){
            status_html = "<b class=\"red\">上半场</b>" ;
        }else if (status == 2){
            status_html = "<b class=\"orange\">中场</b>" ;
        }else if (status == 3){
            status_html = "<b class=\"red\">下半场</b>" ;
        }else if (status == 4){
            status_html = "<b class=\"red\">加时</b>" ;
        }else if (status == -11){
            status_html = "<b class=\"blue\">待定</b>" ;
        }else if (status == -12){
            status_html = "<b class=\"blue\">腰斩</b>" ;
        }else if (status == -13){
            status_html = "<b class=\"blue\">中断</b>" ;
        }else if (status == -14){
            status_html = "<b class=\"blue\">推迟</b>" ;
        }else {
            status_html = "<b class=\"dark\">出错</b>" ;
        }
        var settle_html ;
        var bt_html ;
        if (lock_flag == false){
            settle_time = "结算中" ;
            settle_html = "<i class=\"icon-external-link-sign bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未结算\"></i>" ;
            bt_html = " <button class=\"btn btn-xs btn-purple\"><i class=\"icon-shopping-cart bigger-150\"></i>结算</button>";
        } else {
            settle_time = new Date(settle_time).pattern("MM-dd hh:HH:ss");
            settle_html = "<i class=\"icon-check bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已结算\"></i>" ;
            bt_html = " <button class=\"btn btn-xs btn-purple disabled\"><i class=\"icon-shopping-cart bigger-150\"></i>结算</button>";
        }

        var htmlStr = "<tr>"+
                "                                    <td>"+
                "                                        <label class=\"inline\">"+
                "                                            <input type=\"checkbox\" class=\"ace\"/>"+
                "                                            <span class=\"lbl\"></span>"+
                "                                        </label>"+
                "                                    </td>"+
                "<td>"+contest_id+"</td>"+
                "                                    <td>"+
                name +
                "                                    </td>"+
                "<td>"+cup_id+"</td>"+
                "<td>"+vs+"</td>"+
                "<td>"+start_time_html+"</td>"+
                "                                    <td class=\"center\">"+scores+"</td>"+
                "                                    <td>"+
                status_html +
                "                                    </td>"+
                "                                    <td class=\"center\">"+bet_count+"</td>"+
                "                                    <td class=\"center\">"+
                settle_html +
                "</td>"+
                "                                    <td>"+
                settle_time +
                "                                    </td>"+
                "                                    <td class=\"center\">"+
                "                                        <div>"+
                "                                            <button class=\"btn btn-xs btn-info\">"+
                "                                                <i class=\"icon-edit bigger-150\"></i>"+
                "                                                编辑"+
                "                                            </button>"+
                "                                            <button class=\"btn btn-xs btn-danger\">"+
                "                                                <i class=\"icon-trash bigger-150\"></i>"+
                "                                                删除"+
                "                                            </button>"+
                bt_html +
                "                                        </div>"+
                "                                    </td>"+
                "                                </tr>" ;
        return htmlStr ;
    }

    /**
     * 打开页面异步加载数据 end
     * ===================
     * */


    function showBbSettleData(contest_id, color, cup_name,cup_id, h_name, a_name, start_time, home_scores, away_scores, status, bet_count, settle, settle_time,lock_flag,is_five) {
        //非五大联赛
        if (is_bb_five && !is_five){
            return "";
        }
        var name = "";
        if (color != null){
            name = "<span style=\"background-color: "+color+" !important;\" class=\"label\" >"+cup_name+"</span>" ;
        } else {
            name = "<span style=\"background-color: #999 !important;\" class=\"label\" >"+cup_name+"</span>" ;
        }
        var vs = "<i class=\"smaller-90 bolder red\">"+h_name+"</i> <i class=\"smaller bolder\">VS</i> <i class=\"smaller-90 bolder green\">"+a_name+"</i>" ;
        var start_time_html = new Date(start_time).pattern("MM-dd HH:mm");
        var scores = home_scores + " : " + away_scores ;
        var status_html ;
        if (status == -1){
            status_html = "<b class=\"green\">完场</b>" ;
        } else if (status == 0){
            status_html = "<b class=\"light-grey\">未开始</b>" ;
        }else if (status == 1){
            status_html = "<b class=\"red\">第一节</b>" ;
        }else if (status == 2){
            status_html = "<b class=\"orange\">第二节</b>" ;
        }else if (status == 3){
            status_html = "<b class=\"red\">第三节</b>" ;
        }else if (status == 4){
            status_html = "<b class=\"red\">第四节</b>" ;
        }else if (status == 5){
            status_html = "<b class=\"red\">加时1</b>" ;
        }else if (status == 6){
            status_html = "<b class=\"red\">加时2</b>" ;
        }else if (status == 7){
            status_html = "<b class=\"red\">加时3</b>" ;
        }else if (status == 50){
            status_html = "<b class=\"red\">中场</b>" ;
        }else if (status == -2){
            status_html = "<b class=\"blue\">待定</b>" ;
        }else if (status == -3){
            status_html = "<b class=\"blue\">中断</b>" ;
        }else if (status == -5){
            status_html = "<b class=\"blue\">推迟</b>" ;
        }else if (status == -4){
            status_html = "<b class=\"dark\">取消</b>" ;
        }else {
            status_html = "<b class=\"dark\">出错</b>" ;
        }
        var settle_html ;
        var bt_html ;
        if (lock_flag == false){
            settle_time = "结算中" ;
            settle_html = "<i class=\"icon-external-link-sign bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未结算\"></i>" ;
            bt_html = " <button class=\"btn btn-xs btn-purple\"><i class=\"icon-shopping-cart bigger-150\"></i>结算</button>";
        } else {
            settle_time = new Date(settle_time).pattern("MM-dd HH:mm:ss");
            settle_html = "<i class=\"icon-check bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已结算\"></i>" ;
            bt_html = " <button class=\"btn btn-xs btn-purple disabled\"><i class=\"icon-shopping-cart bigger-150\"></i>结算</button>";
        }

        var htmlStr = "<tr>"+
                "                                    <td>"+
                "                                        <label class=\"inline\">"+
                "                                            <input type=\"checkbox\" class=\"ace\"/>"+
                "                                            <span class=\"lbl\"></span>"+
                "                                        </label>"+
                "                                    </td>"+
                "<td>"+contest_id+"</td>"+
                "                                    <td>"+
                name +
                "                                    </td>"+
                "<td>"+cup_id+"</td>"+
                "<td>"+vs+"</td>"+
                "<td>"+start_time_html+"</td>"+
                "                                    <td class=\"center\">"+scores+"</td>"+
                "                                    <td>"+
                status_html +
                "                                    </td>"+
                "                                    <td class=\"center\">"+bet_count+"</td>"+
                "                                    <td class=\"center\">"+
                settle_html +
                "</td>"+
                "                                    <td>"+
                settle_time +
                "                                    </td>"+
                "                                    <td class=\"center\">"+
                "                                        <div>"+
                "                                            <button class=\"btn btn-xs btn-info\">"+
                "                                                <i class=\"icon-edit bigger-150\"></i>"+
                "                                                编辑"+
                "                                            </button>"+
                "                                            <button class=\"btn btn-xs btn-danger\">"+
                "                                                <i class=\"icon-trash bigger-150\"></i>"+
                "                                                删除"+
                "                                            </button>"+
                bt_html +
                "</div>"+
                "                                    </td>"+
                "                                </tr>" ;
        return htmlStr ;
    }

    //足球赛事过滤
    $("#fb_search_input").keyup(function(){
        $("#fb_settle_table tbody tr").hide().filter(":contains('"+( $(this).val() )+"')").show();
    }).keyup();

    //篮球赛事过滤
    $("#bb_search_input").keyup(function(){
        $("#bb_settle_table tbody tr").hide().filter(":contains('"+( $(this).val() )+"')").show();
    }).keyup();


    //向下加载足球数据
    $('#fb_data_more').on(ace.click_event, function(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/getSettleData",
            data:{settleId:fb_start_id},
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.contests, function (index, contest) {
                            fb_start_id = contest.target_id ;
                            if (!contest.lock_flag){
                                fb_remainder ++ ;
                            }
                            var htmlStr = showFbSettleData(contest.contest_id, contest.color, contest.cup_name,contest.cup_id, contest.h_t.name, contest.a_t.name,
                                    contest.start_time, contest.home_scores, contest.away_scores, contest.status, contest.bet_count, contest.settle,
                                    contest.create_time, contest.lock_flag,contest.belong_five);
                            $("#fb_settle_table tbody").append(htmlStr);
                        });
                        //设置剩余场数
                        $("#fb_remainder_i").html(fb_remainder);
                    } else {
                        $.gritter.add({
                            title: '服务器无更多数据返回！',
                            time: 2000,
                            class_name: 'gritter-info gritter-light'
                        });
                        //设置加载按钮消失
                        $("#fb_data_more").addClass("hidden");
                    }
                } else {
                    $.gritter.add({
                        title: "出现" + data.code + "异常",
                        time: 2000,
                        class_name: 'gritter-error gritter-light'
                    });
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    } else {
                        $.gritter.add({
                            title: "出现未知异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.gritter.add({
                    title: XMLHttpRequest.status,
                    text: XMLHttpRequest.statusText,
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
            }

        });

        return false;
    });

    //向下加载篮球数据
    $('#bb_data_more').on(ace.click_event, function(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/basketball/getSettleData",
            data:{settleId:bb_start_id},
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.contests, function (index, contest) {
                            bb_start_id = contest.target_id ;
                            if (!contest.lock_flag){
                                bb_remainder ++ ;
                            }
                            var htmlStr = showBbSettleData(contest.contest_id, contest.color, contest.cup_name,contest.cup_id, contest.h_t.name, contest.a_t.name,
                                    contest.start_time, contest.home_scores, contest.away_scores, contest.status, contest.bet_count, contest.settle,
                                    contest.create_time, contest.lock_flag,contest.belong_five);
                            $("#bb_settle_table tbody").append(htmlStr);
                        });
                        //设置未结算的比赛场数
                        $("#bb_remainder_i").html(bb_remainder);
                    } else {
                        $.gritter.add({
                            title: '服务器无数据返回！',
                            time: 2000,
                            class_name: 'gritter-info gritter-light'
                        });
                        //设置加载按钮消失
                        $("#bb_data_more").addClass("hidden");
                    }
                } else {
                    $.gritter.add({
                        title: "出现" + data.code + "异常",
                        time: 2000,
                        class_name: 'gritter-error gritter-light'
                    });
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    } else {
                        $.gritter.add({
                            title: "出现未知异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.gritter.add({
                    title: XMLHttpRequest.status,
                    text: XMLHttpRequest.statusText,
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
            }

        });

        return false;
    });


    /**
     * 结算赛事 start
     * =============================
     **/
    //足球
    $('#fb_settle_table tbody').on('click', 'button.btn-purple', function () {
        var tmpTr = $(this).closest("tr");
        var tmpThis = $(this) ;
        var contest_id =  tmpTr.find("td:eq(1)").html();
        var contest_vs =  tmpTr.find("td:eq(3)").html();
        bootbox.confirm("确定结算比赛：“" + contest_vs +"”？", function(result) {
            if(result) {
                //确认推送
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/event/football/settle/add",
                    data: {contestId: contest_id},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '任务提交成功！',
                                time:2000,
                                class_name: 'gritter-info gritter-center gritter-light'
                            });
                            fb_remainder -- ;
                            //设置未结算的比赛场数
                            $("#fb_remainder_i").html(fb_remainder);
                            //设置按钮不可用
                            tmpThis.addClass("disabled");
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
            }
        });
    });


    //篮球
    $('#bb_settle_table tbody').on('click', 'button.btn-purple', function () {
        var tmpTr = $(this).closest("tr");
        var tmpThis = $(this) ;
        var contest_id =  tmpTr.find("td:eq(1)").html();
        var contest_vs =  tmpTr.find("td:eq(3)").html();
        bootbox.confirm("确定结算比赛：“" + contest_vs +"”？", function(result) {
            if(result) {
                //确认推送
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/event/basketball/settle/add",
                    data: {contestId: contest_id},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '任务提交成功！',
                                time:2000,
                                class_name: 'gritter-info gritter-center gritter-light'
                            });
                            bb_remainder -- ;
                            //设置未结算的比赛场数
                            $("#bb_remainder_i").html(bb_remainder);
                            //设置按钮不可用
                            tmpThis.addClass("disabled");
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
            }
        });
    });


    /**
     * 结算赛事 end
     * =============================
     **/



    /**
     * toolbar功能 start
     * =============================
     **/
    //足球的结算任务推送
    $("#fb_settle_toolbar").on("click",function(){

        var num = 0 ;
        var realnum = 0 ;
        var idStr = "";
        $("#fb_settle_table tbody").find('tr').each(function () {
            //获取所选的行
            var checked =  $(this).find("td:eq(0) input[type=checkbox]").prop('checked');
            if (checked){
                var contest_id =  $(this).find("td:eq(1)").html();
                var settle =  $(this).find("td:eq(8)").html().trim();
                if (settle != "<i class=\"icon-check bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已结算\"></i>"){
                    realnum ++ ;
                    idStr += contest_id + ",";
                }
                num ++ ;

            }
        });
        var promptStr = "" ;
        if (realnum == 0){
            promptStr = "所选的"+num+"场比赛都已经结算" ;
        } else if (num != realnum){
            promptStr = "所选的比赛包含已经结算的比赛，确定提交任务后，只提交未结算的比赛，是否确定提交未结算的"+realnum+"场比赛？";
        } else {
            promptStr = "是否确定提交未结算的"+realnum+"场比赛？" ;
        }
        bootbox.confirm(promptStr, function(result) {
            if (realnum == 0){
                result = false ;
            }
            if(result) {
                //确认推送
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/event/football/settle/add",
                    data: {contestStr: idStr},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '任务批量提交成功！',
                                time:2000,
                                class_name: 'gritter-info gritter-center gritter-light'
                            });
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
            }
        });

    });



    //篮球的结算任务推送
    $("#bb_settle_toolbar").on("click",function(){

        var num = 0 ;
        var realnum = 0 ;
        var idStr = "";
        $("#bb_settle_table tbody").find('tr').each(function () {
            //获取所选的行
            var checked =  $(this).find("td:eq(0) input[type=checkbox]").prop('checked');
            if (checked){
                var contest_id =  $(this).find("td:eq(1)").html();
                var settle =  $(this).find("td:eq(8)").html().trim();
                if (settle != "<i class=\"icon-check bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已结算\"></i>"){
                    realnum ++ ;
                    idStr += contest_id + ",";
                }
                num ++ ;

            }
        });
        var promptStr = "" ;
        if (realnum == 0){
            promptStr = "所选的"+num+"场比赛都已经结算" ;
        } else if (num != realnum){
            promptStr = "所选的比赛包含已经结算的比赛，确定提交任务后，只提交未结算的比赛，是否确定提交未结算的"+realnum+"场比赛？";
        } else {
            promptStr = "是否确定提交未结算的"+realnum+"场比赛？" ;
        }
        bootbox.confirm(promptStr, function(result) {
            if (realnum == 0){
                result = false ;
            }
            if(result) {
                //确认推送
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/event/basketball/settle/add",
                    data: {contestStr: idStr},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '任务批量提交成功！',
                                time:2000,
                                class_name: 'gritter-info gritter-center gritter-light'
                            });
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
            }
        });

    });



    //篮球编辑
    $("#bb_edit_toolbar").on("click",function(){

        var num = 0 ;
        var contest_id ;
        var vsStr ;
        $("#bb_settle_table tbody").find('tr').each(function () {
            //获取所选的行
            var checked =  $(this).find("td:eq(0) input[type=checkbox]").prop('checked');
            if (checked){
                contest_id =  $(this).find("td:eq(1)").html();
                vsStr =  $(this).find("td:eq(3)").html();
                num ++ ;
            }
        });
        var promptStr = "确定对ID为：”" + contest_id + "“，赛事为：”"+vsStr+"“的比赛进行编辑吗？" ;
        if (num > 1){
            promptStr = "只能选择一场赛事进行编辑！" ;
        }
        bootbox.confirm(promptStr, function(result) {
            if (num > 1){
                result = false ;
            }
            if(result) {
                //确认
                $.gritter.add({
                    title: '该功能尚未开发！',
                    text: '快点告诉程序员大哥吧！不告诉他的话，他是不会行动的！请点击这个链接告诉他：<a href="#" class="blue">点击</a>',
                    image: appName+'/public/images/dog.gif',
                    sticky: false,
                    time:2000,
                    class_name: 'gritter-success gritter-light'
                });
            }
        });

    });


    //篮球编辑
    $("#fb_edit_toolbar").on("click",function(){

        var num = 0 ;
        var contest_id ;
        var vsStr ;
        $("#fb_settle_table tbody").find('tr').each(function () {
            //获取所选的行
            var checked =  $(this).find("td:eq(0) input[type=checkbox]").prop('checked');
            if (checked){
                contest_id =  $(this).find("td:eq(1)").html();
                vsStr =  $(this).find("td:eq(3)").html();
                num ++ ;
            }
        });
        var promptStr = "确定对ID为：”" + contest_id + "“，赛事为：”"+vsStr+"“的比赛进行编辑吗？" ;
        if (num > 1){
            promptStr = "只能选择一场赛事进行编辑！" ;
        }
        bootbox.confirm(promptStr, function(result) {
            if (num > 1){
                result = false ;
            }
            if(result) {
                //确认
                $.gritter.add({
                    title: '该功能尚未开发！',
                    text: '快点告诉程序员大哥吧！不告诉他的话，他是不会行动的！请点击这个链接告诉他：<a href="#" class="blue">点击</a>',
                    image: appName+'/public/images/dog.gif',
                    sticky: false,
                    time:2000,
                    class_name: 'gritter-success gritter-light'
                });
            }
        });

    });


    //过滤：全部足球赛事
    $("#fb_item_condition_all").on("click",function(){
        $("#fb_item_condition_all_class").removeClass("invisible");
        $("#fb_item_condition_five_class").addClass("invisible");
        $("#fb_title").html("足球全部赛事结算");

        is_fb_five = false ;
        getFbData();
    });

    //五大
    $("#fb_item_condition_five").on("click",function(){
        $("#fb_item_condition_all_class").addClass("invisible");
        $("#fb_item_condition_five_class").removeClass("invisible");
        $("#fb_title").html("足球五大联赛结算");

        is_fb_five = true ;
        getFbData();
    });


    //过滤：全部篮球赛事
    $("#bb_item_condition_all").on("click",function(){
        $("#bb_item_condition_all_class").removeClass("invisible");
        $("#bb_item_condition_five_class").addClass("invisible");
        $("#bb_title").html("篮球全部赛事结算");

        is_fb_five = false ;
        getBbData()
    });

    //五大
    $("#bb_item_condition_five").on("click",function(){
        $("#bb_item_condition_all_class").addClass("invisible");
        $("#bb_item_condition_five_class").removeClass("invisible");
        $("#bb_title").html("篮球五大联赛结算");

        is_fb_five = true ;
        getBbData()
    });

    /**
     * toolbar功能 end
     * =============================
     **/


    /**
     * 编辑功能 start
     * =============================
     **/



    //足球
    $('#fb_settle_table tbody').on('click', 'button.btn-info', function () {
        var tmpTr = $(this).closest("tr");
        var tmpThis = $(this);
        var contest_id = tmpTr.find("td:eq(1)").html();
        var contest_vs = tmpTr.find("td:eq(3)").html();
        $.gritter.add({
            title: '该功能尚未开发！',
            text: '快点告诉程序员大哥吧！不告诉他的话，他是不会行动的！请点击这个链接告诉他：<a href="#" class="blue">点击</a>',
            image: appName+'/public/images/dog.gif',
            sticky: false,
            time: 2000,
            class_name: 'gritter-success gritter-light'
        });

    });

    //篮球
    $('#bb_settle_table tbody').on('click', 'button.btn-info', function () {
        var tmpTr = $(this).closest("tr");
        var tmpThis = $(this);
        var contest_id = tmpTr.find("td:eq(1)").html();
        var contest_vs = tmpTr.find("td:eq(3)").html();
        $.gritter.add({
            title: '该功能尚未开发！',
            text: '快点告诉程序员大哥吧！不告诉他的话，他是不会行动的！请点击这个链接告诉他：<a href="#" class="blue">点击</a>',
            image: appName+'/public/images/dog.gif',
            sticky: false,
            time: 2000,
            class_name: 'gritter-success gritter-light'
        });

    });


    /**
     * 编辑功能 end
     * =============================
     **/


});