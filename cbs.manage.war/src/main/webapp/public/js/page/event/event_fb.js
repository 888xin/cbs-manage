define(function(require, exports, module) {
    require("../common/common");
   var highcharts = require("../../modules/lib/highcharts");
    require("../../modules/plugin/datepicker.zh-CN.js");
    require("../../modules/plugin/bootbox.min.js");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/jquery.bootstrap-growl.min");
    //常量
    //存储该页展示的数据来自哪一天
    var page_date = new Date();
    if (page_date.getHours() < 12 && !is_first){
        page_date.setDate(page_date.getDate() - 1);
    }
    //赛事startId
    var const_contest_id ;
    //是否显示全部赛事
    var full_flag = false ;
    //显示的赛事数量
    var contest_num = 0 ;
    //是否有搜索赛事焦点
    var search_focus = false ;
    //搜索赛事开始时间
    var search_start_time = "";
    //搜索关键词
    var search_key = "";
    var is_first = true ;
    $('#date_picker_fb').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        onSelect: function(dateText){
            var date = new Date(dateText) ;
            contest_num = 0;
            getAsyData(date.getTime(), 0);
        }
    });
    $('#date_picker_fb').datepicker('option', {dateFormat: "yy-mm-dd" });
    //页面载入后显示当日日期
    $("#current_date").html(page_date.toLocaleDateString());
    //获取前一天的数据
    $("#yesterday_data").bind("click",function(){
        contest_num = 0;
        getAsyData(null, -1);
    });
    //获取后一天的数据
    $("#tomorrow_date").bind("click",function(){
        contest_num = 0;
        getAsyData(null, 1);
    });
    //加载完页面后加载数据
    getAsyData(page_date.getTime(), 0);
    //异步获取数据
    function getAsyData(timeStamp,day){
        //设置时间
        if (day == 0){
            page_date = new Date(timeStamp);
        } else {
            //改变当前日期
            page_date.setDate(page_date.getDate()+ day);
        }
        //更新页面的时间显示
        $("#current_date").html(page_date.toLocaleDateString());
        //请求数据
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/getAsyData",
            data: {timeStamp:page_date.getTime(),fullFlag:full_flag, isFirst:is_first},
            success: function (data) {
                if (data.code == 200) {
                    //清空原有的数据
                    $("#fb-table tbody tr").remove();
                    if (data.number > 0){
                        $.each(data.contests, function (index, contest) {
                            var htmlStr = showFbData(contest.contest_id, contest.color,contest.cup_name,contest.cup_id,contest.h_t.name,contest.h_t.t_id, contest.a_t.name,contest.a_t.t_id,
                                    contest.start_time, contest.home_scores, contest.away_scores, contest.status, contest.bet_count, contest.settle,
                                    contest.odds_type,contest.lock_flag,false,contest.level, contest.init_count, contest.home_count, contest.away_count);
                            $("#fb-table tbody").append(htmlStr);
                        });
                        if (contest_num == 0){
                            $.gritter.add({
                                title: '<h3>该天无重要赛事！</h3>',
                                text: "<h4>这天无重要赛事，请尝试选择右上角的全部赛事选项，或点击此<a id='fb_a_full"+page_date.getTime()+"' href='#' class='blue'>链接</a></h4>",
                                image: appName+'/public/images/football.jpg',
                                sticky: false,
                                time:2000,
                                class_name: 'gritter-success gritter-light'
                            });
                            $("#fb_a_full"+page_date.getTime()).on('click', function(e){
                                e.preventDefault();
                                $("#yesterday_data").removeClass("disabled");
                                $("#tomorrow_date").removeClass("disabled");
                                $("#date_picker_fb").attr("disabled",false);
                                $("#more_data_p").addClass("hidden");
                                $("#more_data_search").addClass("hidden");
                                full_flag = true ;
                                getAsyData(page_date.getTime(), 0);
                                $('#fb_dropdown_type').html('全部赛事');
                                $('#fb_table_head_title').html('全部赛事列表');
                            });
                        }
                    } else {
                        $.bootstrapGrowl("该天无数据",{type: 'success'});
                    }
                    //设置场数
                    $("#fb_num_i").html(contest_num);
                } else {
                    $.bootstrapGrowl("出现" + data.code + "异常");
                    if (data.msg != ""){
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl("出现未知异常");
                    }
                }
            },
            error: function (XMLHttpRequest){
                $.bootstrapGrowl("出现" + XMLHttpRequest.status + "错误：" + XMLHttpRequest.statusText);
            }
        });
    }
    function showFbData(contest_id, color, cup_name, cup_id, h_name,h_id, a_name,a_id, start_time, home_scores, away_scores, status, bet_count, settle,
                        odds_type,lock_flag,is_abnormal,level,init_count,home_count,away_count) {
        //统计
        contest_num ++ ;
        var name = "";
        if (color != null){
            name = "<span style=\"background-color: "+color+" !important;\" class=\"label\" >"+cup_name+"</span>" ;
        } else {
            name = "<span style=\"background-color: #999 !important;\" class=\"label\" >"+cup_name+"</span>" ;
        }
        var vs = "<i class=\"smaller-90 bolder red\">"+h_name+"(id:"+h_id+")"+"</i> <i class=\"smaller bolder\">VS</i> <i class=\"smaller-90 bolder green\">"+a_name+"(id:"+a_id+")"+"</i>" ;
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
        if (settle > 0 && settle == odds_type){
            settle_html = "<i class=\"icon-check bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已结算\"></i>" ;
        } else {
            settle_html = "<i class=\"icon-external-link-sign bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未结算\"></i>" ;
        }
        var lock ;
        if (lock_flag){
            lock = "<i class=\"icon-lock bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已锁定，后台系统不再更新比分和状态\"></i>" ;
        } else {
            lock = "<i class=\"icon-unlock bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未锁定\"></i>" ;
        }
        var buttonStr = "";
        if (!is_abnormal){
            buttonStr = "<button class=\"btn btn-xs btn-warning\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"赔率\">"+
                    "<i class=\"icon-bar-chart bigger-150\"></i></button> <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>";
            if ((status == -1 || status == -10 || status == -4) && (settle < odds_type)){
                buttonStr += "<button class=\"btn btn-xs btn-purple\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"结算\">"+
                        "                                                    <i class=\"icon-shopping-cart bigger-150\"></i>"+
                        "                                                </button>";
            } else {
                buttonStr += "<button class=\"btn btn-xs btn-purple disabled\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"结算\">"+
                        "                                                    <i class=\"icon-shopping-cart bigger-150\"></i>"+
                        "                                                </button>" ;
            }
        }
        var htmlStr = "<tr id=\"contest_"+contest_id+"\">" +
                "                            <td>" +
                contest_id +
                "</td>" +
                "                            <td>"+
                name +"   （杯赛id："+cup_id+"）"+
                "                            </td>"+
                "                            <td>"+
                vs +
                "                            </td>"+
                "                            <td class='center'>"+
                start_time_html +
                "                            </td>"+
                "                            <td class=\"center\">"+
                scores +
                "                            </td>"+
                "                            <td>"+
                status_html +
                "                            </td>"+
                "                            <td class=\"center\">"+
                bet_count +
                "                            </td>"+
                "<td class=\"center\">" +
                init_count +
                "</td>" +
                "                            <td class=\"center\">"+
                settle_html +
                "                            </td>"+
                "                            <td class=\"center\">"+
                lock +
                "                            </td>"+
                "<td class=\"center\">"+
                level +
                "</td>"+
                "                            <td class=\"center\">"+
                "                                <div>"+
                buttonStr +
                "                                    <button class=\"btn btn-xs btn-info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"编辑\">"+
                "                                        <i class=\"icon-edit bigger-150\"></i>"+
                "                                    </button>"+
                "                                    <button class=\"btn btn-xs btn-danger\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"删除\">"+
                "                                        <i class=\"icon-trash bigger-150\"></i>"+
                "                                    </button>"+
                "                                </div>"+
                "                            </td>"+
                "<td class=\"hidden\">"+
                home_count +
                "</td>"+
                "<td class=\"hidden\">"+
                away_count +
                "</td>"+
                "                        </tr>" ;
        return htmlStr ;
    }
    var modal_fb_event_status = "";
    var modal_fb_event_level = "";
    $('#fb-table tbody').on('click', 'button.btn-info', function () {
        var tmpTr = $(this).closest("tr");
        const_contest_id = tmpTr.find("td:eq(0)").html();
        var modal_fb_cup_name =  tmpTr.find("td:eq(1) span").html();
        var modal_fb_event_team =  tmpTr.find("td:eq(2)").html();
        var modal_fb_event_time =  tmpTr.find("td:eq(3)").html();
        //已结算 未结算
        var modal_fb_event_settle =  tmpTr.find("td:eq(8) i").attr("title");
        //初始下注数
        //var modal_fb_event_initCount = tmpTr.find("td:eq(7)").html();
        var modal_fb_event_homeCount = tmpTr.find("td:eq(12)").html();
        var modal_fb_event_awayCount = tmpTr.find("td:eq(13)").html();
        var modal_fb_event_scores =  tmpTr.find("td:eq(4)").html();
        var scores = modal_fb_event_scores.split(":");
        var h_scores = parseInt(scores[0].trim());
        var a_scores = parseInt(scores[1].trim());
        modal_fb_event_status = tmpTr.find("td:eq(5) b").html();
        var modal_fb_event_lock = tmpTr.find("td:eq(9) i").attr("title");
        modal_fb_event_level = tmpTr.find("td:eq(10)").html();
        //锁定状态只显示文本值
        var appendStr = "";
        var is_lock = false ;
        if (modal_fb_event_lock != "未锁定"){
            //锁定状态不能提交编辑
            //$("#edit_submit_button").addClass("disabled");
            is_lock = true ;
        }
        appendStr = modalEditShowData(modal_fb_cup_name, modal_fb_event_team,modal_fb_event_time,modal_fb_event_settle,
                is_lock);
        $("#modal_content").append(appendStr);
        $( "#h_t_spinner" ).spinner({
            step: 1,
            min:0,
            numberFormat: "n",
            create: function( event, ui ) {
                //add custom classes and icons
                $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                        .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
                //larger buttons on touch devices
                if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
            }
        }).val(h_scores);
        $( "#home_count_spinner" ).spinner({
            step: 1,
            min:0,
            numberFormat: "n",
            create: function( event, ui ) {
                //add custom classes and icons
                $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                        .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
                //larger buttons on touch devices
                if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
            }
        }).val(modal_fb_event_homeCount);
        $( "#away_count_spinner" ).spinner({
            step: 1,
            min:0,
            numberFormat: "n",
            create: function( event, ui ) {
                //add custom classes and icons
                $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                        .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
                //larger buttons on touch devices
                if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
            }
        }).val(modal_fb_event_awayCount);
        $( "#a_t_spinner" ).spinner({
            step: 1,
            min:0,
            numberFormat: "n",
            create: function( event, ui ) {
                //add custom classes and icons
                $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                        .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
                //larger buttons on touch devices
                if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
            }
        }).val(a_scores);
        $("#modal_fb_edit").modal({backdrop: 'static'});
    }).on('click', 'button.btn-purple', function () {
        //结算比赛
        var tmpTr = $(this).closest("tr");
        const_contest_id = tmpTr.find("td:eq(0)").html();

        bootbox.confirm("<b class='red bigger-180'>点击确认，该比赛马上进行结算，请慎重！</b>",
            function (result) {
                if (result) {

                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName+"/event/football/settle",
                        data: {contestId: const_contest_id},
                        success: function (data) {
                            if (data.code == 200) {
                                $.gritter.add({
                                    title: '成功结算',
                                    time: 2000,
                                    class_name: 'gritter-success gritter-light'
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
                }
            });

    });
    $("#modal_fb_edit").on("shown.bs.modal",function(){
        var status_value = "0";
        if (modal_fb_event_status == "完场"){
            status_value = "-1";
        } else if (modal_fb_event_status == "取消"){
            status_value = "-10";
        } else if (modal_fb_event_status == "上半场"){
            status_value = "1";
        } else if (modal_fb_event_status == "中场"){
            status_value = "2";
        } else if (modal_fb_event_status == "下半场"){
            status_value = "3";
        } else if (modal_fb_event_status == "加时"){
            status_value = "4";
        } else if (modal_fb_event_status == "待定"){
            status_value = "-11";
        } else if (modal_fb_event_status == "腰斩"){
            status_value = "-12";
        } else if (modal_fb_event_status == "中断"){
            status_value = "-13";
        } else if (modal_fb_event_status == "推迟"){
            status_value = "-14";
        }
        $('#modal_fb_select_status').find("option[value="+status_value+"]").attr("selected",true);
        $('#modal_fb_select_level').find("option[value="+modal_fb_event_level+"]").attr("selected",true);
    });
    //编辑窗口关闭时，去掉内容
    $('#modal_fb_edit').on('hidden.bs.modal', function () {
        $(".profile-user-info").remove();
        //确认按钮可用
        $("#edit_submit_button").removeClass("disabled");
    });
    //提交编辑赛事按钮
    $("#edit_submit_button").on("click",function(){
        var h_score = $("#h_t_spinner").val();
        var a_score = $("#a_t_spinner").val();
        var lock = $("#modal_fb_lock").prop('checked');
        var now_status = $('#modal_fb_select_status').val();
        var now_status_html = $('#modal_fb_select_status').find("option:selected").text();
        var now_level = $('#modal_fb_select_level').val();
        var cup_name = $('#modal_fb_edit_cup_name').val();
        var home_count = $('#home_count_spinner').val();
        var away_count = $('#away_count_spinner').val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/update",
            data: {contest_id:const_contest_id,home_scores:h_score,away_scores:a_score,status:now_status,lock_flag:lock,
                level:now_level,cup_name:cup_name,home_count:home_count,away_count:away_count},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "赛事信息更改成功",
                        text: '主场分数为：<h4><b class="red">'+h_score+'</b></h4><br/>客场分数为：<h4><b class="red">'+a_score+'</b></h4>' +
                                '<br/>赛事状态为：<h4><b class="red">'+now_status_html+'</b></h4>'+
                                '<br/>赛事是否锁定：<h4><b class="red">'+lock+'</b></h4>'+
                                '<br/>赛事等级：<h4><b class="red">'+now_level+'</b></h4>',
                        time: 2000,
                        class_name: 'gritter-success gritter-center'
                    });
                    //更新成功后更新表格里面的内容 start
                    var tmpTr = $("#contest_"+const_contest_id);
                    tmpTr.find("td:eq(1) span").html(cup_name);
                    var scores_html = h_score + " : " + a_score ;
                    tmpTr.find("td:eq(4)").html(scores_html);
                    var status_html ;
                    if (now_status == -1){
                        status_html = "<b class=\"green\">完场</b>" ;
                    } else if (now_status == 0){
                        status_html = "<b class=\"light-grey\">未开始</b>" ;
                    }else if (now_status == -10){
                        status_html = "<b class=\"dark\">取消</b>" ;
                    }else if (now_status == 1){
                        status_html = "<b class=\"red\">上半场</b>" ;
                    }else if (now_status == 2){
                        status_html = "<b class=\"orange\">中场</b>" ;
                    }else if (now_status == 3){
                        status_html = "<b class=\"red\">下半场</b>" ;
                    }else if (now_status == 4){
                        status_html = "<b class=\"red\">加时</b>" ;
                    }else if (now_status == -11){
                        status_html = "<b class=\"blue\">待定</b>" ;
                    }else if (now_status == -12){
                        status_html = "<b class=\"blue\">腰斩</b>" ;
                    }else if (now_status == -13){
                        status_html = "<b class=\"blue\">中断</b>" ;
                    }else if (now_status == -14){
                        status_html = "<b class=\"blue\">推迟</b>" ;
                    }else {
                        status_html = "<b class=\"dark\">出错</b>" ;
                    }
                    tmpTr.find("td:eq(5)").html(status_html);
                    tmpTr.find("td:eq(7)").html(parseInt(home_count) + parseInt(away_count));
                    var lock_html ;
                    if (lock == true){
                        lock_html = "<i class=\"icon-lock bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已锁定，后台系统不再更新比分和状态\"></i>" ;
                    } else {
                        lock_html = "<i class=\"icon-unlock bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未锁定\"></i>" ;
                    }
                    tmpTr.find("td:eq(9)").html(lock_html);
                    tmpTr.find("td:eq(10)").html(now_level);
                    //更新成功后更新表格里面的内容 end
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
    });
    //赔率编辑
    //赔率数值初始化
    var h_odds_op_win_spinner_value = 1.00 ;
    var h_odds_op_draw_spinner_value = 1.00 ;
    var h_odds_op_lost_spinner_value = 1.00 ;
    var h_odds_jc_win_spinner_value = 1.00 ;
    var h_odds_jc_draw_spinner_value = 1.00 ;
    var h_odds_jc_lost_spinner_value = 1.00 ;
    var h_odds_jc_handicap_spinner_value = 1.00 ;
    var h_odds_size_win_spinner_value = 1.00 ;
    var h_odds_size_lost_spinner_value = 1.00 ;
    var h_odds_size_handicap_spinner_value = 1.00 ;
    var constant_contest_id ;
    var constant_op_odds_id ;
    var constant_jc_odds_id ;
    var constant_size_odds_id ;
    $('#fb-table tbody').on('click', 'button.btn-warning', function () {
        var tmpTr = $(this).closest("tr");
        constant_contest_id =  tmpTr.find("td:eq(0)").html();
        //请求赔率数据
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/getAsyOddsData",
            data: {contestId:constant_contest_id},
            success: function (data) {
                if (data.code == 200) {
                    var oddsInfo = data.oddsInfo ;
                    //球队比分
                    var home_team_name = oddsInfo.contest.h_t.name ;
                    var home_away_name = oddsInfo.contest.a_t.name ;
                    var team_scores = "--:--" ;
                    var fb_status = oddsInfo.status ;
                    if (fb_status != 0){
                        team_scores = oddsInfo.contest.home_scores + ":" + oddsInfo.contest.away_scores ;
                    }
//                    if (fb_status != 0 && fb_status != -10 && fb_status != -11 && fb_status != -12&& fb_status != -14){
//                        //设置赔率编辑里面的按钮不可用
//                        $("#odds_modal_op_edit_bt").addClass("disabled");
//                        $("#odds_modal_op_add_bt").addClass("disabled");
//                        $("#odds_modal_jc_edit_bt").addClass("disabled");
//                        $("#odds_modal_jc_add_bt").addClass("disabled");
//                    } else {
//                        $("#odds_modal_op_edit_bt").removeClass("disabled");
//                        $("#odds_modal_op_add_bt").removeClass("disabled");
//                        $("#odds_modal_jc_edit_bt").removeClass("disabled");
//                        $("#odds_modal_jc_add_bt").removeClass("disabled");
//                    }
                    //胜平负
                    if (oddsInfo.op != null){
                        h_odds_op_win_spinner_value = oddsInfo.op.home_roi ;
                        h_odds_op_draw_spinner_value = oddsInfo.op.draw_roi ;
                        h_odds_op_lost_spinner_value = oddsInfo.op.away_roi ;
                        constant_op_odds_id = oddsInfo.op.odds_id;
                    } else {
                        h_odds_op_win_spinner_value = 1.00 ;
                        h_odds_op_draw_spinner_value = 1.00 ;
                        h_odds_op_lost_spinner_value = 1.00 ;
                    }
                    //让球胜平负
                    if (oddsInfo.jc != null){
                        h_odds_jc_win_spinner_value = oddsInfo.jc.home_roi ;
                        h_odds_jc_draw_spinner_value = oddsInfo.jc.draw_roi ;
                        h_odds_jc_lost_spinner_value = oddsInfo.jc.away_roi ;
                        h_odds_jc_handicap_spinner_value = oddsInfo.jc.handicap ;
                        constant_jc_odds_id = oddsInfo.jc.odds_id
                    } else {
                        h_odds_jc_win_spinner_value = 1.00 ;
                        h_odds_jc_draw_spinner_value = 1.00 ;
                        h_odds_jc_lost_spinner_value = 1.00 ;
                        h_odds_jc_handicap_spinner_value = -1.00 ;
                    }
                    //大小球
                    if (oddsInfo.size != null){
                        h_odds_size_win_spinner_value = oddsInfo.size.big_roi ;
                        h_odds_size_lost_spinner_value = oddsInfo.size.tiny_roi ;
                        h_odds_size_handicap_spinner_value = oddsInfo.size.handicap ;
                        constant_size_odds_id = oddsInfo.size.odds_id;
                    } else {
                        h_odds_size_win_spinner_value = 1.00 ;
                        h_odds_size_lost_spinner_value = 1.00 ;
                        h_odds_size_handicap_spinner_value = 1.00 ;
                    }
                    //窗口赋予值
                    $("#odds_modal_scores_p").html(team_scores);
                    $("#odds_modal_home_p").html(home_team_name);
                    $("#odds_modal_away_p").html(home_away_name);
                    $("#h_odds_op_win_spinner").val(h_odds_op_win_spinner_value);
                    $("#h_odds_op_draw_spinner").val(h_odds_op_draw_spinner_value);
                    $("#h_odds_op_lost_spinner").val(h_odds_op_lost_spinner_value);
                    $("#h_odds_jc_win_spinner").val(h_odds_jc_win_spinner_value);
                    $("#h_odds_jc_draw_spinner").val(h_odds_jc_draw_spinner_value);
                    $("#h_odds_jc_lost_spinner").val(h_odds_jc_lost_spinner_value);
                    $("#h_odds_jc_handicap_spinner").val(h_odds_jc_handicap_spinner_value);
                    $("#h_odds_size_win_spinner").val(h_odds_size_win_spinner_value);
                    $("#h_odds_size_lost_spinner").val(h_odds_size_lost_spinner_value);
                    $("#h_odds_size_handicap_spinner").val(h_odds_size_handicap_spinner_value);
                    $("#modal_contest_id").val(constant_contest_id);
                    //modal窗口打开
                    $("#modal_fb_odds").modal({backdrop: 'static'});
                    //胜平负 按钮样式变化
                    if (oddsInfo.op != null){
                        $("#odds_modal_op_history_bt").removeClass("hidden");
                        $("#odds_modal_op_edit_bt").removeClass("hidden");
                        $("#odds_modal_op_add_bt").addClass("hidden");
                    } else {
                        $("#odds_modal_op_history_bt").addClass("hidden");
                        $("#odds_modal_op_edit_bt").addClass("hidden");
                        $("#odds_modal_op_add_bt").removeClass("hidden");
                    }
                    //让球胜平负 按钮样式变化
                    if (oddsInfo.jc != null){
                        $("#odds_modal_jc_history_bt").removeClass("hidden");
                        $("#odds_modal_jc_edit_bt").removeClass("hidden");
                        $("#odds_modal_jc_add_bt").addClass("hidden");
                    } else {
                        $("#odds_modal_jc_history_bt").addClass("hidden");
                        $("#odds_modal_jc_edit_bt").addClass("hidden");
                        $("#odds_modal_jc_add_bt").removeClass("hidden");
                    }
                    //大小球 按钮样式变化
                    if (oddsInfo.size){
                        $("#odds_modal_size_history_bt").removeClass("hidden");
                        $("#odds_modal_size_edit_bt").removeClass("hidden");
                        $("#odds_modal_size_add_bt").addClass("hidden");
                    } else {
                        $("#odds_modal_size_history_bt").addClass("hidden");
                        $("#odds_modal_size_edit_bt").addClass("hidden");
                        $("#odds_modal_size_add_bt").removeClass("hidden");
                    }
                } else {
                    $.bootstrapGrowl("出现" + data.code + "异常");
                    if (data.msg != ""){
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl("出现未知异常");
                    }
                }
            },
            error: function (XMLHttpRequest){
                $.bootstrapGrowl("出现" + XMLHttpRequest.status + "错误：" + XMLHttpRequest.statusText);
            }
        });
    });
    /**
     * 微调按钮初始化 start
     * ============================================
     * */
        //足球赔率
    $( "#h_odds_op_win_spinner" ).spinner({
        step: 0.01,
        numberFormat: "n",
        create: function( event, ui ) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                    .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });
    $( "#h_odds_op_draw_spinner" ).spinner({
        step: 0.01,
        numberFormat: "n",
        create: function( event, ui ) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                    .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });
    $( "#h_odds_op_lost_spinner" ).spinner({
        step: 0.01,
        numberFormat: "n",
        create: function( event, ui ) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                    .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });
    //===============
    $( "#h_odds_jc_win_spinner" ).spinner({
        step: 0.01,
        numberFormat: "n",
        create: function( event, ui ) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                    .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });
    $( "#h_odds_jc_draw_spinner" ).spinner({
        step: 0.01,
        numberFormat: "n",
        create: function( event, ui ) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                    .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });
    $( "#h_odds_jc_lost_spinner" ).spinner({
        step: 0.01,
        numberFormat: "n",
        create: function( event, ui ) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                    .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });
    $( "#h_odds_jc_handicap_spinner" ).spinner({
        step: 0.01,
        numberFormat: "n",
        create: function( event, ui ) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                    .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });
    //===============
    $( "#h_odds_size_win_spinner" ).spinner({
        step: 0.01,
        numberFormat: "n",
        create: function( event, ui ) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                    .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });
    $( "#h_odds_size_lost_spinner" ).spinner({
        step: 0.01,
        numberFormat: "n",
        create: function( event, ui ) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                    .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });
    $( "#h_odds_size_handicap_spinner" ).spinner({
        step: 0.01,
        numberFormat: "n",
        create: function( event, ui ) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                    .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if(ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });
    /**
     * 微调按钮初始化 end
     * ============================================
     * */
    /**
     * 赔率更改 start
     * ============================================
     * */
    //胜平负赔率修改
    $("#odds_modal_op_edit_bt").on("click",function(){
        var home = $("#h_odds_op_win_spinner").val();
        var draw = $("#h_odds_op_draw_spinner").val();
        var away = $("#h_odds_op_lost_spinner").val();
        //修改赔率
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/odds/op/update",
            data: {contest_id:constant_contest_id,odds_id:constant_op_odds_id,home_roi:home,draw_roi:draw,away_roi:away},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "赔率更改成功",
                        text: '主胜为：<h4><b class="red">'+home+'</b></h4><br/>平局为：<h4><b class="red">'+draw+'</b></h4><br/>主赔为：<h4><b class="red">'+away+'</b></h4>',
                        time: 2000,
                        class_name: 'gritter-success gritter-center'
                    });
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
    });
    //足球(让球胜平负)
    $("#odds_modal_jc_edit_bt").on("click",function(){
        var home = $("#h_odds_jc_win_spinner").val();
        var draw = $("#h_odds_jc_draw_spinner").val();
        var away = $("#h_odds_jc_lost_spinner").val();
        var handicap = $("#h_odds_jc_handicap_spinner").val();
        //修改赔率
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/odds/jc/update",
            data: {contest_id:constant_contest_id,odds_id:constant_jc_odds_id,home_roi:home,draw_roi:draw,away_roi:away,handicap:handicap},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "赔率更改成功",
                        text: '主胜为：<h4><b class="red">'+home+'</b></h4><br/>平局为：<h4><b class="red">'+draw+
                                '</b></h4><br/>主赔为：<h4><b class="red">'+away+'</b></h4><br/>盘口为：<h4><b class="red">'+handicap+'</b></h4>',
                        time: 2000,
                        class_name: 'gritter-success gritter-center'
                    });
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
    });

    //足球(大小球)
    $("#odds_modal_size_edit_bt").on("click",function(){
        var home = $("#h_odds_size_win_spinner").val();
        var away = $("#h_odds_size_lost_spinner").val();
        var handicap = $("#h_odds_size_handicap_spinner").val();
        //修改赔率
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/odds/size/update",
            data: {contest_id: constant_contest_id,odds_id:constant_size_odds_id,big_roi:home,tiny_roi:away,handicap:handicap},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "赔率更改成功",
                        text: '大球为：<h4><b class="red">'+home+'</b></h4><br/>小球为：<h4><b class="red">'+away+'</b></h4><br/>盘口为：<h4><b class="red">'+handicap+'</b></h4>',
                        time: 2000,
                        class_name: 'gritter-success gritter-center'
                    });
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
    });
    /**
     * 赔率更改 end
     * ============================================
     * */
    //==============================赔率历史 start
    $("#odds_modal_op_history_bt").on('click',function(){
        var contest_id=$("#modal_contest_id").val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/odds/history",
            data: {contest_id:contest_id,odds_type:1},
            success: function (data) {
                if (data.code == 200) {
                    $("#modal_odds_history tbody tr").remove();
                    var xData=[];
                    var home_roi=[];
                    var draw_roi=[];
                    var away_roi=[];
                    $.each(data.odds, function (index, odds) {
                        var time=new Date(odds.create_time).pattern("yyyy-MM-dd HH:mm:ss");
                        var htmlStr = "<tr>"+
                            "<td class='center'>"+odds.home_roi+"</td>"+
                            "<td class='center'>"+odds.draw_roi+"</td>"+
                            "<td class='center'>"+odds.away_roi+"</td>"+
                            "<td class='center'>"+odds.company+"</td>"+
                            "<td class='center'>"+time+"</td>"+
                            "</tr>" ;
                        $("#table_handicap").addClass("hidden");
                        $("#modal_odds_history tbody").append(htmlStr);
                        xData.unshift(time);
                        home_roi.unshift(odds.home_roi)
                        draw_roi.unshift(odds.draw_roi);
                        away_roi.unshift(odds.away_roi);
                    });
                    var yData=[{name:'主胜',data:home_roi},{name:'平',data:draw_roi},{name:'客胜',data:away_roi}];
                    var chart = {
                           plotOptions: { 
                                series: { 
                                    cursor: 'pointer', 
                                } 
                            }, 
                            title: {
                               text: '赔率波动统计图',
                               style: {
                                   color: '#666',
                                   fontSize: "16px"
                               }
                           },
                           xAxis: {
                               categories: xData
                           },
                           yAxis: {
                               allowDecimals: false,
                               lineWidth: 1,
                               min: 0,
                               title: {
                                   text: '赔率',
                                   align: 'high',
                                   offset: -10,
                                   rotation: 0,
                                   y: -15
                               }
                           },
                           legend: {

                           },
                           series: yData,
                           credits: {
                               enabled: false
                           }
                       }
                    $("#graph1").show();
                    $("#graph2").hide();
                    $("#graph1").highcharts(chart);
                    $("#modal_fb_odds_history").modal({backdrop: 'static'});
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

    });
    $("#odds_modal_jc_history_bt").on('click',function(){
        var contest_id=$("#modal_contest_id").val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/odds/history",
            data: {contest_id:contest_id,odds_type:2},
            success: function (data) {
                if (data.code == 200) {
                    $("#modal_odds_history tbody tr").remove();
                    var xData=[];
                    var handicap=[];
                    var home_roi=[];
                    var draw_roi=[];
                    var away_roi=[];
                    $.each(data.odds, function (index, odds) {
                        var time=new Date(odds.create_time).pattern("yyyy-MM-dd HH:mm:ss");
                        var htmlStr = "<tr>"+
                            "<td class='center'>"+odds.handicap+"</td>"+
                            "<td class='center'>"+odds.home_roi+"</td>"+
                            "<td class='center'>"+odds.draw_roi+"</td>"+
                            "<td class='center'>"+odds.away_roi+"</td>"+
                            "<td class='center'>"+odds.company+"</td>"+
                            "<td class='center'>"+time+"</td>"+
                            "</tr>" ;
                        $("#table_handicap").removeClass("hidden");
                        $("#modal_odds_history tbody").append(htmlStr);
                        xData.unshift(time);
                        handicap.unshift(odds.handicap);
                        home_roi.unshift(odds.home_roi)
                        draw_roi.unshift(odds.draw_roi);
                        away_roi.unshift(odds.away_roi);
                    });
                    var yData=[{name:'让球',data:handicap},{name:'主胜',data:home_roi},{name:'平',data:draw_roi},{name:'客胜',data:away_roi}];
                    var chart = {
                           plotOptions: { 
                                series: { 
                                    cursor: 'pointer', 
                                } 
                            }, 
                            title: {
                               text: '赔率波动统计图',
                               style: {
                                   color: '#666',
                                   fontSize: "16px"
                               }
                           },
                           xAxis: {
                               categories: xData
                           },
                           yAxis: {
                               allowDecimals: false,
                               lineWidth: 1,
                               title: {
                                   text: '赔率|让球数',
                                   align: 'high',
                                   offset: -10,
                                   rotation: 0,
                                   y: -15
                               }
                           },
                           series: yData,
                           credits: {
                               enabled: false
                           }
                       }
                       if (xData.length < 8) {
                           chart.xAxis.tickInterval = null;
                       } else {
                           chart.xAxis.tickInterval = 2;
                       }
                    $("#graph2").show();
                    $("#graph1").hide();
                    $("#graph2").highcharts(chart);
                    $("#modal_fb_odds_history").modal({backdrop: 'static'});
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

    });
    //赛事过滤
    $("#search_input").keyup(function(){
        $("table tbody tr").hide().filter(":contains('"+( $(this).val() )+"')").show();
    }).keyup();
    //删除赛事
    $('#fb-table tbody').on('click', 'button.btn-danger', function () {
        var tmpTr = $(this).closest("tr");
        var modal_fb_contest_id =  tmpTr.find("td:eq(0)").html();
        bootbox.confirm("确定删除该赛事?删除后无法恢复！", function(result) {
            if(result) {
                //确认删除
                $.gritter.add({
                    title: '数据删除成功！',
                    time:2000,
                    class_name: 'gritter-success gritter-light'
                });
            }
        });
    });
    //记录异常赛事的start_id数据，后续向下加载要用到
    var abnormal_start_id ;
    //赛事类型切换
    $('#fb_dropdown_abnormal').on('click', function(e){
        e.preventDefault();
        is_first = false ;
        $("#yesterday_data").addClass("disabled");
        $("#tomorrow_date").addClass("disabled");
        $("#date_picker_fb").attr("disabled",true);
        $("#more_data_p").removeClass("hidden");
        $("#more_data_search").addClass("hidden");
        //清空原有的数据
        $("#fb-table tbody tr").remove();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/getAbnormalData",
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0){
                        $.each(data.contests, function (index, contest) {
                            //记录异常赛事的start_id
                            abnormal_start_id = contest.contest_id ;
                            var htmlStr = showFbData(contest.contest_id, contest.color,contest.cup_name,contest.cup_id,contest.h_t.name, contest.a_t.name,
                                    contest.start_time, contest.home_scores, contest.away_scores, contest.status, contest.bet_count, contest.settle,
                                    contest.odds_type,contest.lock_flag, true,contest.level, contest.init_count, contest.home_count, contest.away_count);
                            $("#fb-table tbody").append(htmlStr);
                        });
                    } else {
                        $.bootstrapGrowl("没有异常赛事数据！",{type: 'success'});
                    }
                } else {
                    $.bootstrapGrowl("出现" + data.code + "异常");
                    if (data.msg != ""){
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl("出现未知异常");
                    }
                }
            },
            error: function (XMLHttpRequest){
                $.bootstrapGrowl("出现" + XMLHttpRequest.status + "错误：" + XMLHttpRequest.statusText);
            }
        });
        $('#fb_dropdown_type').html('异常赛事');
        $('#fb_table_head_title').html('异常赛事列表');
        $("#toolbar_info").attr("hidden",true);
    });
    $('#fb_dropdown_important').on('click', function(e){
        e.preventDefault();
        is_first = false ;
        $("#yesterday_data").removeClass("disabled");
        $("#tomorrow_date").removeClass("disabled");
        $("#date_picker_fb").attr("disabled",false);
        $("#more_data_p").addClass("hidden");
        $("#more_data_search").addClass("hidden");
        $('#fb_dropdown_type').html('重要赛事');
        $('#fb_table_head_title').html('重要赛事列表');
        full_flag = false ;
        contest_num = 0;
        $("#toolbar_info").attr("hidden",false);
        getAsyData(page_date.getTime(), 0);
    });
    $('#fb_dropdown_no_plate').on('click', function(e){
        e.preventDefault();
        $('#fb_dropdown_type').html('未封盘');
    });
    $('#fb_dropdown_unlock').on('click', function(e){
        e.preventDefault();
        $('#fb_dropdown_type').html('未锁定');
    });
    $('#fb_dropdown_no_settle').on('click', function(e){
        e.preventDefault();
        $('#fb_dropdown_type').html('未结算');
    });
    $('#fb_dropdown_no_start').on('click', function(e){
        e.preventDefault();
        $('#fb_dropdown_type').html('未开始');
    });
    $('#fb_dropdown_first').on('click', function(e){
        e.preventDefault();
        is_first = true ;
        $("#yesterday_data").removeClass("disabled");
        $("#tomorrow_date").removeClass("disabled");
        $("#date_picker_fb").attr("disabled",false);
        $("#more_data_p").addClass("hidden");
        $("#more_data_search").addClass("hidden");
        contest_num = 0;
        $("#toolbar_info").attr("hidden",false);
        getAsyData(page_date.getTime(), 0);
        $('#fb_dropdown_type').html('一级赛事');
        $('#fb_table_head_title').html('一级赛事列表');
    });
    $('#fb_dropdown_all').on('click', function(e){
        e.preventDefault();
        is_first = false ;
        $("#yesterday_data").removeClass("disabled");
        $("#tomorrow_date").removeClass("disabled");
        $("#date_picker_fb").attr("disabled",false);
        $("#more_data_p").addClass("hidden");
        $("#more_data_search").addClass("hidden");
        full_flag = true ;
        contest_num = 0;
        $("#toolbar_info").attr("hidden",false);
        getAsyData(page_date.getTime(), 0);
        $('#fb_dropdown_type').html('全部赛事');
        $('#fb_table_head_title').html('全部赛事列表');
    });
    //刷新页面后可用
    $("#date_picker_fb").attr("disabled",false);
    //异常赛事向下加载
    $("#more_data_p").on("click",function(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/getAbnormalData",
            data:{startId:abnormal_start_id},
            success: function (data) {
                if (data.code == 200) {
                    //清空原有的数据
                    if (data.number > 0){
                        $.each(data.contests, function (index, contest) {
                            //记录异常赛事的start_id
                            abnormal_start_id = contest.contest_id ;
                            var htmlStr = showFbData(contest.contest_id, contest.color,contest.cup_name,contest.cup_id,contest.h_t.name, contest.a_t.name,
                                    contest.start_time, contest.home_scores, contest.away_scores, contest.status, contest.bet_count, contest.settle,
                                    contest.odds_type,contest.lock_flag,true,contest.level, contest.init_count, contest.home_count, contest.away_count);
                            $("#fb-table tbody").append(htmlStr);
                        });
                    } else {
                        $.bootstrapGrowl("已经没有更多数据！",{type: 'success'});
                        //设置按钮消失
                        $("#more_data_p").addClass("hidden");
                    }
                } else {
                    $.bootstrapGrowl("出现" + data.code + "异常");
                    if (data.msg != ""){
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl("出现未知异常");
                    }
                }
            },
            error: function (XMLHttpRequest){
                $.bootstrapGrowl("出现" + XMLHttpRequest.status + "错误：" + XMLHttpRequest.statusText);
            }
        });
    });
    $( "#fb-table tbody" ).tooltip({
        hide: {
            effect: "explode",
            delay: 100
        }
    });
    function modalEditShowData(cup_name, event_team,event_time,event_settle,is_lock) {
        if (is_lock){
            is_lock = "<input id=\"modal_fb_lock\" type=\"checkbox\" checked class=\"ace ace-switch ace-switch-3\" />" ;
        } else {
            is_lock = "<input id=\"modal_fb_lock\" type=\"checkbox\" class=\"ace ace-switch ace-switch-3\" />" ;
        }
        var htmlStr = "<div class=\"profile-user-info profile-user-info-striped\">"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 类型： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                "                                                <input class=\"input-xxlarge\" id=\"modal_fb_edit_cup_name\" type='text' value=\""+cup_name+"\" />"+
                "                                            </div>"+
                "                                        </div>"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 比赛： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                "                                                <span class=\"editable\" > "+event_team+"</span>"+
                "                                            </div>"+
                "                                        </div>"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 时间： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                "                                                <span class=\"editable\" > "+event_time+"</span>"+
                "                                            </div>"+
                "                                        </div>"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 结算： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                "                                                <span class=\"editable\" > "+event_settle+" </span>"+
                "                                            </div>"+
                "                                        </div>"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 主队下注数： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                "                                                <input type=\"text\" class=\"input-mini\" id=\"home_count_spinner\" />" +
                "                                            </div>"+
                "                                        </div>"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 客队下注数： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                "                                                <input type=\"text\" class=\"input-mini\" id=\"away_count_spinner\" />" +
                "                                            </div>"+
                "                                        </div>"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 主队分数： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                "                                                <input type=\"text\" class=\"input-mini\" id=\"h_t_spinner\" />"+
                "                                            </div>"+
                "                                        </div>"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 客队分数： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                "                                                <input type=\"text\" class=\"input-mini\" id=\"a_t_spinner\" />"+
                "                                            </div>"+
                "                                        </div>"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 状态： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                "                                                <select class=\"form-control\" id=\"modal_fb_select_status\" data-placeholder=\"请选择比赛的状态\">"+
                "                                                    <option value=\"0\">未开始</option>"+
                "                                                    <option value=\"-1\">完场</option>"+
                "                                                    <option value=\"-10\">取消</option>"+
                "                                                    <option value=\"1\">上半场</option>"+
                "                                                    <option value=\"2\">中场</option>"+
                "                                                    <option value=\"3\">下半场</option>"+
                "                                                    <option value=\"4\">加时</option>"+
                "                                                    <option value=\"-11\">待定</option>"+
                "                                                    <option value=\"-12\">腰斩</option>"+
                "                                                    <option value=\"-13\">中断</option>"+
                "                                                    <option value=\"-14\">推迟</option>"+
                "                                                </select>"+
                "                                            </div>"+
                "                                        </div>"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 等级： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                "                                                <select class=\"form-control\" id=\"modal_fb_select_level\" data-placeholder=\"请选择比赛的等级\">"+
                "                                                    <option value=\"1\">1</option>"+
                "                                                    <option value=\"2\">2</option>"+
                "                                                    <option value=\"3\">3</option>"+
                "                                                    <option value=\"4\">4</option>"+
                "                                                </select>"+
                "                                            </div>"+
                "                                        </div>"+
                "                                        <div class=\"profile-info-row\">"+
                "                                            <div class=\"profile-info-name\"> 锁定： </div>"+
                "                                            <div class=\"profile-info-value\">"+
                is_lock +
                "                                                <span class=\"lbl\"></span>"+
                "                                            </div>"+
                "                                        </div>"+
                "                                    </div>";
        return htmlStr ;
    }

    //搜索赛事
    $("#event_find").on("focus",function(){
        //获得焦点
        search_focus = true ;
    }).on("blur",function(){
        //失去焦点
        search_focus = false ;
    });

    $("document").ready(function () {
        //按回车键搜索
        $(document).keypress(function (e) {
            if (e.which == 13){
                if (search_focus){
                    search_key = $("#event_find").val();
                    if (search_key == ""){
                        $("#yesterday_data").removeClass("disabled");
                        $("#tomorrow_date").removeClass("disabled");
                        $("#date_picker_fb").attr("disabled",false);
                        $("#more_data_p").addClass("hidden");
                        $("#more_data_search").addClass("hidden");
                        $('#fb_dropdown_type').html('重要赛事');
                        $('#fb_table_head_title').html('重要赛事列表');
                        full_flag = false ;
                        contest_num = 0;
                        $("#toolbar_info").attr("hidden",false);
                        getAsyData(page_date.getTime(), 0);
                    } else {
                        $("#fb_table_head_title").html("搜索赛事结果列表");
                        $("#yesterday_data").addClass("disabled");
                        $("#tomorrow_date").addClass("disabled");
                        $("#date_picker_fb").attr("disabled",true);
                        $("#more_data_p").addClass("hidden");
                        $("#more_data_search").removeClass("hidden");
                        //清空原有的数据
                        $("#fb-table tbody tr").remove();
                        searchContest(search_key,null);
                    }
                }
            }
        });
    });

    function searchContest(key,startTime){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/event/football/search",
            data: {key:key,startTime:startTime,limit:40},
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0){
                        var num_tmp = 1 ;
                        $.each(data.contests, function (index, contest) {
                            if (num_tmp == data.number){
                                search_start_time = new Date(contest.start_time).pattern("yyyy-MM-dd HH:mm:ss");
                            }
                            var htmlStr = showFbData(contest.contest_id, contest.color,contest.cup_name,contest.cup_id,contest.h_t.name,contest.home_team, contest.a_t.name,contest.away_team,
                                    contest.start_time, contest.home_scores, contest.away_scores, contest.status, contest.bet_count, contest.settle,
                                    contest.odds_type,contest.lock_flag,false,contest.level, contest.init_count, contest.home_count, contest.away_count);
                           
                            $("#fb-table tbody").append(htmlStr);
                            num_tmp ++ ;
                        });
                    } else {
                        $.gritter.add({
                            title: '<h3>搜索不出更多结果！</h3>',
                            time:2000,
                            class_name: 'gritter-warning gritter-center'
                        });
                    }
                    //设置场数
                    $("#fb_num_i").html(data.sum);
                } else {
                    $.bootstrapGrowl("出现" + data.code + "异常");
                    if (data.msg != ""){
                        $.bootstrapGrowl(data.msg);
                    } else {
                        $.bootstrapGrowl("出现未知异常");
                    }
                }
            },
            error: function (XMLHttpRequest){
                $.bootstrapGrowl("出现" + XMLHttpRequest.status + "错误：" + XMLHttpRequest.statusText);
            }
        });
    }

    //搜索赛事向下加载
    $("#more_data_search").on("click",function(){
        searchContest(search_key,search_start_time);
    });
});