define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    var moment = require("../../modules/lib/moment.min");
    var dateInit = require("../../modules/lib/datepicker");

    //常量设置
    //足球胜平负
    var fb_op_start_time = "";
    var fb_op_end_time = "";
    var fb_op_contest_id = "";
    var fb_op_long_no = "";
    var fb_op_start_id = null;
    var fb_op_settle = null;

    //足球让球胜平负
    var fb_jc_start_time = "";
    var fb_jc_end_time = "";
    var fb_jc_contest_id = "";
    var fb_jc_long_no = "";
    var fb_jc_start_id = null;
    var fb_jc_settle = null;
    var fb_jc_open = false ;
    
    
    //足球大小球
    var fb_size_start_time = "";
    var fb_size_end_time = "";
    var fb_size_contest_id = "";
    var fb_size_long_no = "";
    var fb_size_start_id = null;
    var fb_size_settle = null;
    var fb_size_open = false ;
    
    
    //足球单双数
    var fb_dss_start_time = "";
    var fb_dss_end_time = "";
    var fb_dss_contest_id = "";
    var fb_dss_long_no = "";
    var fb_dss_start_id = null;
    var fb_dss_settle = null;
    var fb_dss_open = false ;

    //篮球胜平负
    var bb_op_start_time = "";
    var bb_op_end_time = "";
    var bb_op_contest_id = "";
    var bb_op_long_no = "";
    var bb_op_start_id = null;
    var bb_op_settle = null;
    var bb_op_open = false ;

    //篮球让球胜平负
    var bb_jc_start_time = "";
    var bb_jc_end_time = "";
    var bb_jc_contest_id = "";
    var bb_jc_long_no = "";
    var bb_jc_start_id = null;
    var bb_jc_settle = null;
    var bb_jc_open = false ;

    
    var startTime = moment().subtract("days", "7").format('YYYY-MM-DD');
    var endTime = moment().format('YYYY-MM-DD');
    
    
    /***
     *  足球胜平负 start
     */
    setDate1();
    function setDate1() {
        $("#datepicker").dateInit({
            settings: {
                single: false,
                startDate: startTime,
                endDate: endTime,
                dayLimit: 31,
                maxDate: moment().format('YYYY-MM-DD'),
                timepicker: false,
                dropdown: false
            },
            height: 30,
            defTime: startTime + ' - ' + endTime,
            onPickEnd: function (startTime, endTime) {
                fb_op_start_time = startTime ;
                fb_op_end_time = endTime ;
            }
        });
    }

    getFbOpData();

    //结算记录
    function getFbOpData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bet/fb/get",
            data: {startId: fb_op_start_id, type: 1, contestId: fb_op_contest_id, longNo: fb_op_long_no, settle: fb_op_settle, startTime: fb_op_start_time, endTime: fb_op_end_time},
            success: function (data) {
                if (data.code == 200) {

                    if (data.number > 0) {
                        //加载数据
                        $.each(data.bets, function (index, bet) {
                            fb_op_start_id = bet.b_id ;
                            var htmlStr = showFbOp(bet.b_id, bet.user_id,bet.long_no, bet.user_name, bet.contest.contest_id,bet.contest.cup_name, bet.contest.h_t.name,
                                bet.contest.h_t.logo, bet.contest.home_scores,
                                bet.contest.a_t.name,bet.contest.a_t.logo,
                                bet.contest.away_scores,
                                bet.contest.start_time,
                                bet.longbi,
                                bet.coupon,
                                bet.home_roi,
                                bet.draw_roi,
                                bet.away_roi,
                                bet.support,
                                bet.bet,
                                bet.status,
                                bet.create_time);

                            $("#fb_bet_op_table tbody").append(htmlStr);
                        });
                    } else {
                        $.gritter.add({
                            title: '无数据！',
                            time: 2000,
                            class_name: 'gritter-error gritter-center gritter-light'
                        });
                    }
                } else {
                    $.gritter.add({
                        title: '出现code:' + data.code + ' 错误，详细信息：' + data.msg,
                        text: XMLHttpRequest.statusText,
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
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

    }


    //加载结算记录
    function showFbOp(b_id, user_id, long_no, user_name, contest_id, cup_name, ht_name,ht_logo, home_scores, at_name,at_logo,away_scores,contest_start_time,contest_longbi,coupon,home_roi, draw_roi,away_roi,support,bet,status,create_time) {
        var support_html = "";
        var odds_html = "";
        if (support == 0) {
            support_html = "主队胜";
            odds_html = home_roi;
        }
        if (support == 1) {
            support_html = "客队胜";
            odds_html = away_roi ;
        }
        if (support == 2) {
            support_html = "平局";
            odds_html = draw_roi ;
        }
        var bet_html = "";
        if (contest_longbi) {
            if (coupon > 0){
                bet_html = "<i class='smaller-90 green'> " + coupon + "龙筹</i> <i class='smaller-90 red'>" + (bet-coupon) + "龙币</i>";
            } else {
                bet_html = "<i class='smaller-90 red'>" + bet + "龙币</i>";
            }
        } else {
            bet_html = "<i class='smaller-90 green'> " + bet + "龙筹</i>";
        }
        var vs = "<div class='result_contest'>"
            + "<div class='team team_host'>"
            + "<img src='http://ls.betradar.com/ls/crest/big/" + ht_logo + "'>"
            + "<p>" + ht_name + "</p>"
            + "</div>"
            + "<div class='team team_away'>"
            + "<img src='http://ls.betradar.com/ls/crest/big/" + at_logo + "'>"
            + "<p>" + at_name + "</p>"
            + "</div>"
            + "<div class='contest_info'>"
            + "<p>" + cup_name + "</p>"
            + "<p class='versus'>" + home_scores + "：" + away_scores + "</p></div></div>";
        var userinfo = "<p>龙号：" + long_no + "</p><p>用户名：" + user_name + "</p>";
        var betinfo = "<p>竞猜：" + support_html + "</p><p>赔率：" + odds_html + "</p><p>" + bet_html + "</p>";
        var start_time = new Date(contest_start_time).pattern("MM-dd HH:mm");
        var createTime = new Date(create_time).pattern("MM-dd HH:mm");
        var status_html = "";
        var btn_html = "<button id='"+contest_id+","+user_id+","+support+"' class=\"btn btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"跳转到结算页面\"><i class=\"icon-share-alt bigger-150\"></i></button>";
       
        // 取消下注按钮,点击发出取消单个下注的请求
        var cancel_btn_html = "";
        if (status == 0){
            status_html = "<span class='label label-primary'>初始</span>";
            cancel_btn_html = "<button class=\"cancel_bet btn btn-xs\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"取消下注\"  data-id='"+b_id+"' data-type='1'><i class=\"icon-share-alt bigger-150\" ></i></button>";
            btn_html = "";
        } else if (status == 1){
            status_html = "<span class='label label-success'>赢</span>";
        } else if (status == 2){
            status_html = "<span class='label label-danger'>输</span>";
        } else if (status == -1){
            status_html = "<span class='label label-default'>走</span>";
        }
        var htmlStr = "<tr>" +
            "<td>" + b_id + "</td>" +
            "<td>" + contest_id + "</td>" +
            "<td>" + "<div class='info'>" + userinfo + "</div>" + "</td>" +
            "<td>" + vs + "</td>" +
            "<td>" + start_time + "</td>" +
            "<td>" + "<div class='info'>" + betinfo + "</div>" + "</td>" +
            "<td>" + createTime + "</td>"+
            "<td id='status"+b_id+"'>" + status_html + "</td>"+
            "<td>"+btn_html+"</td>"+
            "<td>"+cancel_btn_html+"</td>"+
            "</tr>";
        return htmlStr;
    }

    //足球胜平负查询
    $("#fb_op_search_bt").on("click",function(){
        fb_op_long_no = $("#fb_op_long_no_input").val().trim();
        fb_op_contest_id = $("#fb_op_contest_id_input").val().trim();
        if (fb_op_start_time == "" && fb_op_end_time == "" && fb_op_long_no == "" && fb_op_contest_id == ""){
            $.gritter.add({
                title: '必需输入一个条件',
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return ;
        }
        fb_op_start_id = null ;
        //清空原有的数据
        $("#fb_bet_op_table tbody tr").remove();
        getFbOpData();
    });

    //足球胜平负全部查询
    $("#fb_op_search_all_bt").on("click",function(){
        fb_op_long_no = "";
        fb_op_start_time = "";
        fb_op_end_time = "";
        fb_op_contest_id = "";
        fb_op_start_id = null ;
        //清空原有的数据
        $("#fb_bet_op_table tbody tr").remove();
        getFbOpData();
    });

    $("#fb_bet_op_more_data_search").on("click",function(){
        getFbOpData();
    });

    //跳转至明细页面
    $('#fb_bet_op_table tbody').on('click', 'button.btn-success', function () {
        var dataVar = $(this).attr("id").split(",");
        var c_id = dataVar[0];
        var u_id = dataVar[1];
        var su = dataVar[2];
        window.location.href = appName + "/rank/innersettleshow/contest?userId=" + u_id + "&type=0&playId=1&contestId=" + c_id +"&support=" +su;
    }).tooltip({
        hide: {
            delay: 100
        }
    });


    /**
     * ====================
     * 足球让球胜平负 start
     */
    setDate2();
    function setDate2() {
        $("#fb_jc_datepicker").dateInit({
            iptId: "#start_time12",
            settings: {
                single: false,
                startDate: startTime,
                endDate: endTime,
                dayLimit: 31,
                maxDate: moment().format('YYYY-MM-DD'),
                timepicker: false,
                dropdown: false
            },
            height: 30,
            defTime: startTime + ' - ' + endTime,
            onPickEnd: function (startTime, endTime) {
                fb_jc_start_time = startTime ;
                fb_jc_end_time = endTime ;
            }
        });
    }


    //结算记录
    function getFbJcData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bet/fb/get",
            data: {startId: fb_jc_start_id, type: 2, contestId: fb_jc_contest_id, longNo: fb_jc_long_no, settle: fb_jc_settle, startTime: fb_jc_start_time, endTime: fb_jc_end_time},
            success: function (data) {
                if (data.code == 200) {

                    if (data.number > 0) {
                        //加载数据
                        $.each(data.bets, function (index, bet) {
                            fb_jc_start_id = bet.b_id ;
                            var htmlStr = showFbJc(bet.b_id, bet.user_id,bet.long_no, bet.user_name, bet.contest.contest_id,bet.contest.cup_name, bet.contest.h_t.name,
                                bet.contest.h_t.logo, bet.contest.home_scores,
                                bet.contest.a_t.name,bet.contest.a_t.logo,
                                bet.contest.away_scores,
                                bet.contest.start_time,
                                bet.longbi,
                                bet.coupon,
                                bet.home_roi,
                                bet.draw_roi,
                                bet.away_roi,
                                bet.support,
                                bet.bet,
                                bet.status,
                                bet.create_time,
                                bet.handicap
                            );

                            $("#fb_bet_jc_table tbody").append(htmlStr);
                        });
                    } else {
                        $.gritter.add({
                            title: '无数据！',
                            time: 2000,
                            class_name: 'gritter-error gritter-center gritter-light'
                        });
                    }
                } else {
                    $.gritter.add({
                        title: '出现code:' + data.code + ' 错误，详细信息：' + data.msg,
                        text: XMLHttpRequest.statusText,
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
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

    }

    //加载结算记录
    function showFbJc(b_id, user_id, long_no, user_name, contest_id, cup_name, ht_name,ht_logo, home_scores,
                      at_name,at_logo,away_scores,contest_start_time,contest_longbi,coupon,home_roi,
                      draw_roi,away_roi,support,bet,status,create_time,handicap) {
        var support_html = "";
        var odds_html = "";
        if (support == 0) {
            support_html = "主队胜";
            odds_html = home_roi;
        }
        if (support == 1) {
            support_html = "客队胜";
            odds_html = away_roi ;
        }
        if (support == 2) {
            support_html = "平局";
            odds_html = draw_roi ;
        }
        var bet_html = "";
        if (contest_longbi) {
            if (coupon > 0){
                bet_html = "<i class='smaller-90 green'> " + coupon + "龙筹</i> <i class='smaller-90 red'>" + (bet-coupon) + "龙币</i>";
            } else {
                bet_html = "<i class='smaller-90 red'>" + bet + "龙币</i>";
            }
        } else {
            bet_html = "<i class='smaller-90 green'> " + bet + "龙筹</i>";
        }
        if (!handicap){
            handicap = "无";
        }
        var vs = "<div class='result_contest'>"
            + "<div class='team team_host'>"
            + "<img src='http://ls.betradar.com/ls/crest/big/" + ht_logo + "'>"
            + "<p>" + ht_name + "</p>"
            + "</div>"
            + "<div class='team team_away'>"
            + "<img src='http://ls.betradar.com/ls/crest/big/" + at_logo + "'>"
            + "<p>" + at_name + "</p>"
            + "</div>"
            + "<div class='contest_info'>"
            + "<p>" + cup_name + "</p>"
            + "<p class='versus'>" + home_scores + "：" + away_scores + "</p></div></div>";
        var userinfo = "<p>龙号：" + long_no + "</p><p>用户名：" + user_name + "</p>";
        var betinfo = "<p>竞猜：" + support_html + "</p><p>赔率：" + odds_html + "&nbsp;&nbsp;&nbsp;盘口："+handicap+"</p><p>" + bet_html + "</p>";
        var start_time = new Date(contest_start_time).pattern("MM-dd HH:mm");
        var createTime = new Date(create_time).pattern("MM-dd HH:mm");
        var status_html = "";
        var btn_html = "<button id='"+contest_id+","+user_id+","+support+"' class=\"btn btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"跳转到结算页面\"><i class=\"icon-share-alt bigger-150\"></i></button>";
        //取消下注按钮,点击出发ajax请求,处于可以取消状态的按钮
        var cancel_btn_html = "";
        if (status == 0){
            status_html = "<span class='label label-primary'>初始</span>";
            cancel_btn_html = "<button class=\"cancel_bet btn btn-xs\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"取消下注\" data-id='"+b_id+"' data-type='2'><i class=\"icon-share-alt bigger-150\" ></i></button>";
            btn_html = "";
        } else if (status == 1){
            status_html = "<span class='label label-success'>赢</span>";
        } else if (status == 2){
            status_html = "<span class='label label-danger'>输</span>";
        } else if (status == -1){
            status_html = "<span class='label label-default'>走</span>";
        }
        var htmlStr = "<tr>" +
            "<td>" + b_id + "</td>" +
            "<td>" + contest_id + "</td>" +
            "<td>" + "<div class='info'>" + userinfo + "</div>" + "</td>" +
            "<td>" + vs + "</td>" +
            "<td>" + start_time + "</td>" +
            "<td>" + "<div class='info'>" + betinfo + "</div>" + "</td>" +
            "<td>" + createTime + "</td>"+
            "<td id='status"+b_id+"'>" + status_html + "</td>"+
            "<td>"+btn_html+"</td>"+
            "<td>"+cancel_btn_html+"</td>"+
            "</tr>";
        return htmlStr;
    }

    //足球胜平负查询
    $("#fb_jc_search_bt").on("click",function(){
        fb_jc_long_no = $("#fb_jc_long_no_input").val().trim();
        fb_jc_contest_id = $("#fb_jc_contest_id_input").val().trim();
        if (fb_jc_start_time == "" && fb_jc_end_time == "" && fb_jc_long_no == "" && fb_jc_contest_id == ""){
            $.gritter.add({
                title: '必需输入一个条件',
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return ;
        }
        fb_jc_start_id = null ;
        //清空原有的数据
        $("#fb_bet_jc_table tbody tr").remove();
        getFbJcData();
    });

    //足球胜平负全部查询
    $("#fb_jc_search_all_bt").on("click",function(){
        fb_jc_long_no = "";
        fb_jc_start_time = "";
        fb_jc_end_time = "";
        fb_jc_contest_id = "";
        fb_jc_start_id = null ;
        //清空原有的数据
        $("#fb_bet_jc_table tbody tr").remove();
        getFbJcData();
    });

    $("#fb_bet_jc_more_data_search").on("click",function(){
        getFbJcData();
    });

    //跳转至明细页面
    $('#fb_bet_jc_table tbody').on('click', 'button.btn-success', function () {
        var dataVar = $(this).attr("id").split(",");
        var c_id = dataVar[0];
        var u_id = dataVar[1];
        var su = dataVar[2];
        window.location.href = appName + "/rank/innersettleshow/contest?userId=" + u_id + "&type=0&playId=2&contestId=" + c_id +"&support=" +su;
    }).tooltip({
        hide: {
            delay: 100
        }
    });

    /**
     * ====================
     * 足球让球胜平负 end
     */
    

    /**
     * =================================
     * 篮球胜负 start
     */


    setDate6();
    function setDate6() {
        $("#bb_op_datepicker").dateInit({
            iptId: "#start_time13",
            settings: {
                single: false,
                startDate: startTime,
                endDate: endTime,
                dayLimit: 31,
                maxDate: moment().format('YYYY-MM-DD'),
                timepicker: false,
                dropdown: false
            },
            height: 30,
            defTime: startTime + ' - ' + endTime,
            onPickEnd: function (startTime, endTime) {
                bb_op_start_time = startTime ;
                bb_op_end_time = endTime ;
            }
        });
    }


    //结算记录
    function getBbOpData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bet/bb/get",
            data: {startId: bb_op_start_id, type: 1, contestId: bb_op_contest_id, longNo: bb_op_long_no, settle: bb_op_settle, startTime: bb_op_start_time, endTime: bb_op_end_time},
            success: function (data) {
                if (data.code == 200) {

                    if (data.number > 0) {
                        //加载数据
                        $.each(data.bets, function (index, bet) {
                            bb_op_start_id = bet.b_id ;
                            var htmlStr = showBbOp(bet.b_id, bet.user_id,bet.long_no, bet.user_name, bet.contest.contest_id,bet.contest.cup_name, bet.contest.h_t.name,
                                bet.contest.h_t.logo, bet.contest.home_scores,
                                bet.contest.a_t.name,bet.contest.a_t.logo,
                                bet.contest.away_scores,
                                bet.contest.start_time,
                                bet.longbi,
                                bet.coupon,
                                bet.home_roi,
                                bet.away_roi,
                                bet.support,
                                bet.bet,
                                bet.status,
                                bet.create_time);

                            $("#bb_bet_op_table tbody").append(htmlStr);
                        });
                    } else {
                        $.gritter.add({
                            title: '无数据！',
                            time: 2000,
                            class_name: 'gritter-error gritter-center gritter-light'
                        });
                    }
                } else {
                    $.gritter.add({
                        title: '出现code:' + data.code + ' 错误，详细信息：' + data.msg,
                        text: XMLHttpRequest.statusText,
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
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

    }


    //加载结算记录
    function showBbOp(b_id, user_id, long_no, user_name, contest_id, cup_name, ht_name,ht_logo, home_scores,
                      at_name,at_logo,away_scores,contest_start_time,contest_longbi,coupon,home_roi,
                      away_roi,support,bet,status,create_time) {
        var support_html = "";
        var odds_html = "";
        if (support == 0) {
            support_html = "主队胜";
            odds_html = home_roi;
        }
        if (support == 1) {
            support_html = "客队胜";
            odds_html = away_roi ;
        }
        var bet_html = "";
        if (contest_longbi) {
            if (coupon > 0){
                bet_html = "<i class='smaller-90 green'> " + coupon + "龙筹</i> <i class='smaller-90 red'>" + (bet-coupon) + "龙币</i>";
            } else {
                bet_html = "<i class='smaller-90 red'>" + bet + "龙币</i>";
            }
        } else {
            bet_html = "<i class='smaller-90 green'> " + bet + "龙筹</i>";
        }
        var vs = "<div class='result_contest'>"
            + "<div class='team team_host'>"
            + "<img src='http://ls.betradar.com/ls/crest/big/" + ht_logo + "'>"
            + "<p>" + ht_name + "</p>"
            + "</div>"
            + "<div class='team team_away'>"
            + "<img src='http://ls.betradar.com/ls/crest/big/" + at_logo + "'>"
            + "<p>" + at_name + "</p>"
            + "</div>"
            + "<div class='contest_info'>"
            + "<p>" + cup_name + "</p>"
            + "<p class='versus'>" + home_scores + "：" + away_scores + "</p></div></div>";
        var userinfo = "<p>龙号：" + long_no + "</p><p>用户名：" + user_name + "</p>";
        var betinfo = "<p>竞猜：" + support_html + "</p><p>赔率：" + odds_html + "</p><p>" + bet_html + "</p>";
        var start_time = new Date(contest_start_time).pattern("MM-dd HH:mm");
        var createTime = new Date(create_time).pattern("MM-dd HH:mm");
        var status_html = "";
        var btn_html = "<button id='"+contest_id+","+user_id+","+support+"' class=\"btn btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"跳转到结算页面\"><i class=\"icon-share-alt bigger-150\"></i></button>";
        //取消下注按钮,点击出发ajax请求,处于可以取消状态的按钮
        var cancel_btn_html = "";
        if (status == 0){
            status_html = "<span class='label label-primary'>初始</span>";
            cancel_btn_html = "<button class=\"cancel_bet btn btn-xs\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"取消下注\" data-id='"+b_id+"' data-type='6'><i class=\"icon-share-alt bigger-150\" ></i></button>";
            btn_html = "";
        } else if (status == 1){
            status_html = "<span class='label label-success'>赢</span>";
        } else if (status == 2){
            status_html = "<span class='label label-danger'>输</span>";
        } else if (status == -1){
            status_html = "<span class='label label-default'>走</span>";
        }
        var htmlStr = "<tr>" +
            "<td>" + b_id + "</td>" +
            "<td>" + contest_id + "</td>" +
            "<td>" + "<div class='info'>" + userinfo + "</div>" + "</td>" +
            "<td>" + vs + "</td>" +
            "<td>" + start_time + "</td>" +
            "<td>" + "<div class='info'>" + betinfo + "</div>" + "</td>" +
            "<td>" + createTime + "</td>"+
            "<td id='status"+b_id+"'>" + status_html + "</td>"+
            "<td>"+btn_html+"</td>"+
            "<td>"+cancel_btn_html+"</td>"+
            "</tr>";
        return htmlStr;
    }

    //篮球胜平负查询
    $("#bb_op_search_bt").on("click",function(){
        bb_op_long_no = $("#bb_op_long_no_input").val().trim();
        bb_op_contest_id = $("#bb_op_contest_id_input").val().trim();
        if (bb_op_start_time == "" && bb_op_end_time == "" && bb_op_long_no == "" && bb_op_contest_id == ""){
            $.gritter.add({
                title: '必需输入一个条件',
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return ;
        }
        bb_op_start_id = null ;
        //清空原有的数据
        $("#bb_bet_op_table tbody tr").remove();
        getBbOpData();
    });

    //篮球胜平负全部查询
    $("#bb_op_search_all_bt").on("click",function(){
        bb_op_long_no = "";
        bb_op_start_time = "";
        bb_op_end_time = "";
        bb_op_contest_id = "";
        bb_op_start_id = null ;
        //清空原有的数据
        $("#bb_bet_op_table tbody tr").remove();
        getBbOpData();
    });

    $("#bb_bet_op_more_data_search").on("click",function(){
        getBbOpData();
    });

    //跳转至明细页面
    $('#bb_bet_op_table tbody').on('click', 'button.btn-success', function () {
        var dataVar = $(this).attr("id").split(",");
        var c_id = dataVar[0];
        var u_id = dataVar[1];
        var su = dataVar[2];
        window.location.href = appName + "/rank/innersettleshow/contest?userId=" + u_id + "&type=1&playId=6&contestId=" + c_id +"&support=" +su;
    }).tooltip({
        hide: {
            delay: 100
        }
    });

    /**
     * =================================
     * 篮球胜平负 end
     */




    /**
     * =================================
     * 篮球让球胜负 start
     */

    setDate7();
    function setDate7() {
        $("#bb_jc_datepicker").dateInit({
            iptId: "#start_time11",
            settings: {
                single: false,
                startDate: startTime,
                endDate: endTime,
                dayLimit: 31,
                maxDate: moment().format('YYYY-MM-DD'),
                timepicker: false,
                dropdown: false
            },
            height: 30,
            defTime: startTime + ' - ' + endTime,
            onPickEnd: function (startTime, endTime) {
                bb_jc_start_time = startTime ;
                bb_jc_end_time = endTime ;
            }
        });
    }


    //结算记录
    function getBbJcData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bet/bb/get",
            data: {startId: bb_jc_start_id, type: 2, contestId: bb_jc_contest_id, longNo: bb_jc_long_no, settle: bb_jc_settle, startTime: bb_jc_start_time, endTime: bb_jc_end_time},
            success: function (data) {
                if (data.code == 200) {

                    if (data.number > 0) {
                        //加载数据
                        $.each(data.bets, function (index, bet) {
                            bb_jc_start_id = bet.b_id ;
                            var htmlStr = showBbJc(bet.b_id, bet.user_id,bet.long_no, bet.user_name, bet.contest.contest_id,bet.contest.cup_name, bet.contest.h_t.name,
                                bet.contest.h_t.logo, bet.contest.home_scores,
                                bet.contest.a_t.name,bet.contest.a_t.logo,
                                bet.contest.away_scores,
                                bet.contest.start_time,
                                bet.longbi,
                                bet.coupon,
                                bet.home_roi,
                                bet.away_roi,
                                bet.support,
                                bet.bet,
                                bet.status,
                                bet.create_time,
                                bet.handicap
                            );

                            $("#bb_bet_jc_table tbody").append(htmlStr);
                        });
                    } else {
                        $.gritter.add({
                            title: '无数据！',
                            time: 2000,
                            class_name: 'gritter-error gritter-center gritter-light'
                        });
                    }
                } else {
                    $.gritter.add({
                        title: '出现code:' + data.code + ' 错误，详细信息：' + data.msg,
                        text: XMLHttpRequest.statusText,
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
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

    }


    //加载结算记录
    function showBbJc(b_id, user_id, long_no, user_name, contest_id, cup_name, ht_name,ht_logo, home_scores,
                      at_name,at_logo,away_scores,contest_start_time,contest_longbi,coupon,home_roi,
                      away_roi,support,bet,status,create_time,handicap) {
        var support_html = "";
        var odds_html = "";
        if (support == 0) {
            support_html = "主队胜";
            odds_html = home_roi;
        }
        if (support == 1) {
            support_html = "客队胜";
            odds_html = away_roi ;
        }
        var bet_html = "";
        if (contest_longbi) {
            if (coupon > 0){
                bet_html = "<i class='smaller-90 green'> " + coupon + "龙筹</i> <i class='smaller-90 red'>" + (bet-coupon) + "龙币</i>";
            } else {
                bet_html = "<i class='smaller-90 red'>" + bet + "龙币</i>";
            }
        } else {
            bet_html = "<i class='smaller-90 green'> " + bet + "龙筹</i>";
        }
        if (!handicap){
            handicap = "无";
        }
        var vs = "<div class='result_contest'>"
            + "<div class='team team_host'>"
            + "<img src='http://ls.betradar.com/ls/crest/big/" + ht_logo + "'>"
            + "<p>" + ht_name + "</p>"
            + "</div>"
            + "<div class='team team_away'>"
            + "<img src='http://ls.betradar.com/ls/crest/big/" + at_logo + "'>"
            + "<p>" + at_name + "</p>"
            + "</div>"
            + "<div class='contest_info'>"
            + "<p>" + cup_name + "</p>"
            + "<p class='versus'>" + home_scores + "：" + away_scores + "</p></div></div>";
        var userinfo = "<p>龙号：" + long_no + "</p><p>用户名：" + user_name + "</p>";
        var betinfo = "<p>竞猜：" + support_html + "</p><p>赔率：" + odds_html + "&nbsp;&nbsp;&nbsp;盘口："+handicap+"</p><p>" + bet_html + "</p>";
        var start_time = new Date(contest_start_time).pattern("MM-dd HH:mm");
        var createTime = new Date(create_time).pattern("MM-dd HH:mm");
        var status_html = "";
        var btn_html = "<button id='"+contest_id+","+user_id+","+support+"' class=\"btn btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"跳转到结算页面\"><i class=\"icon-share-alt bigger-150\"></i></button>";
        //取消下注按钮,点击出发ajax请求,处于可以取消状态的按钮
        var cancel_btn_html = "";
        if (status == 0){
            status_html = "<span class='label label-primary'>初始</span>";
            cancel_btn_html = "<button class=\"cancel_bet btn btn-xs\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"取消下注\" data-id='"+b_id+"' data-type='7'><i class=\"icon-share-alt bigger-150\" ></i></button>";
            btn_html = "";
        } else if (status == 1){
            status_html = "<span class='label label-success'>赢</span>";
        } else if (status == 2){
            status_html = "<span class='label label-danger'>输</span>";
        } else if (status == -1){
            status_html = "<span class='label label-default'>走</span>";
        }
        var htmlStr = "<tr>" +
            "<td>" + b_id + "</td>" +
            "<td>" + contest_id + "</td>" +
            "<td>" + "<div class='info'>" + userinfo + "</div>" + "</td>" +
            "<td>" + vs + "</td>" +
            "<td>" + start_time + "</td>" +
            "<td>" + "<div class='info'>" + betinfo + "</div>" + "</td>" +
            "<td>" + createTime + "</td>"+
            "<td id='status"+b_id+"'>" + status_html + "</td>"+
            "<td>"+btn_html+"</td>"+
            "<td>"+cancel_btn_html+"</td>"+
            "</tr>";
        return htmlStr;
    }
    
    /**
     * 篮球让球胜负 end
     */
    
    $('body').delegate('.cancel_bet i','click',function (e) {
        //当前下注id
        var bet_id = $(this).attr("data-id");
        var bet_type = $(this).attr("data-type");
    	  var bet_show="请选择下注类型";
        if (bet_type == "1"){
          bet_show="胜平负(足球)";
        } else if (bet_type == "2"){
          bet_show="让球胜平负(足球)";
        } else if (bet_type == "3"){
          bet_show="大小球(足球)";
        } else if (bet_type == "4"){
          bet_show="单双数(足球)";
        } else if (bet_type == "5"){
          bet_show="胜负(篮球)";
        } else if (bet_type == "6"){
          bet_show="让球胜负(篮球)";
        } else if (bet_type == "7"){
          bet_show="大小球(篮球)";
        } else if (bet_type == "8"){
          bet_show="单双数(篮球)";
        }

          //弹框填写取消理由
          $("#bet_cancel_type_show").html(bet_show);
          $("#bet_cancel_type").val(bet_type);
	        $("#bet_cancel_id").html(bet_id);
		  
		  $("#bet_cancel_edit").modal({backdrop: 'static'});
          //发起取消下注的请求
          
    });
    

    //足球胜平负查询
    $("#bb_jc_search_bt").on("click",function(){
        bb_jc_long_no = $("#bb_jc_long_no_input").val().trim();
        bb_jc_contest_id = $("#bb_jc_contest_id_input").val().trim();
        if (bb_jc_start_time == "" && bb_jc_end_time == "" && bb_jc_long_no == "" && bb_jc_contest_id == ""){
            $.gritter.add({
                title: '必需输入一个条件',
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return ;
        }
        bb_jc_start_id = null ;
        //清空原有的数据
        $("#bb_bet_jc_table tbody tr").remove();
        getBbJcData();
    });

    //足球胜平负全部查询
    $("#bb_jc_search_all_bt").on("click",function(){
        bb_jc_long_no = "";
        bb_jc_start_time = "";
        bb_jc_end_time = "";
        bb_jc_contest_id = "";
        bb_jc_start_id = null ;
        //清空原有的数据
        $("#bb_bet_jc_table tbody tr").remove();
        getBbJcData();
    });

    $("#bb_bet_jc_more_data_search").on("click",function(){
        getBbJcData();
    });

    //跳转至明细页面
    $('#bb_bet_jc_table tbody').on('click', 'button.btn-success', function () {
        var dataVar = $(this).attr("id").split(",");
        var c_id = dataVar[0];
        var u_id = dataVar[1];
        var su = dataVar[2];
        window.location.href = appName + "/rank/innersettleshow/contest?userId=" + u_id + "&type=1&playId=7&contestId=" + c_id +"&support=" +su;
    }).tooltip({
        hide: {
            delay: 100
        }
    });

    /**
     * =================================
     * 篮球让球胜平负 end
     */


    $('#bet_tab a').click(function (e) {
        e.preventDefault();//阻止a链接的跳转行为
        var href = $(this).attr("href");
        if (href == "#fb_op_tab"){

        } else if (href == "#fb_jc_tab"){
            if(!fb_jc_open){
                getFbJcData();
            }
            fb_jc_open = true ;
        } else if (href == "#fb_size_tab"){
            if(!fb_size_open){
                getFbSizeData();
            }
            fb_size_open = true ;
        } else if (href == "#fb_dss_tab"){
            if(!fb_dss_open){
                getFbDssData();
            }
            fb_dss_open = true ;
        } else if (href == "#bb_op_tab"){
            if(!bb_op_open){
                getBbOpData();
            }
            bb_op_open = true ;
        } else if (href == "#bb_jc_tab"){
            if(!bb_jc_open){
                getBbJcData();
            }
            bb_jc_open = true ;

        } else if (href == "#bb_size_tab"){
            if(!bb_size_open){
                getBbSizeData();
            }
            bb_size_open = true;
        } else if (href == "#bb_dss_tab"){
            if(!bb_dss_open){
                getBbDssData();
            }
            bb_dss_open = true ;
        }
        $(this).tab('show');//显示当前选中的链接及关联的content

    });
    
    
    

    //取消下注提交
   $("#cancel_bet_edit_button").on("click",function(){
       //获得输入的值
       var bet_type = $("#bet_cancel_type").val();
       var bet_id = $("#bet_cancel_id").html();
       var cancel_bet_reason = $("#cancel_reason").val();
       
       //异步提交
       $.ajax({
           type: 'POST',
           dataType: 'json',
           url: appName+"/bet/cancle", //修改为需要提交的路径
           data: {type: bet_type,id:bet_id,reason:cancel_bet_reason},
           success: function (data) {
               if (data.code == 200) {
                   $.gritter.add({
                       title: '取消成功！',
                       time:2000,
                       class_name: 'gritter-info gritter-light'
                   });
                   //修改状态--走盘#status+id
                   $("#status" + bet_id).val("走");
                   
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
   });



});