define(function(require, exports, module) {
    require("../common/common");
 require("../../modules/plugin/jquery-ui-1.10.3.full.min.js");
    require("../../modules/plugin/jquery.gritter.min");
        /**
         * 常量值 start
         * */
        //足球让球是否打开
        var isOpenFbOddsJc = false;
        //此刻显示的是否为胜平负表格数据 1胜平负 2让球胜平负
        var fb_open_status = 1 ;
        var bb_open_status = 1 ;
        //篮球tab是否打开
        var isOpenFb = false;
        var isOpenBb = false;
        var isOpenOdds = false;
        //记录开始ID
        var fb_op_start_id ;
        var fb_jc_start_id ;
        var bb_op_start_id ;
        var bb_jc_start_id ;
        //剩余未锁定的赛事场数
        var fb_op_remainder = 0;
        var fb_jc_remainder = 0;
        var bb_op_remainder = 0;
        var bb_jc_remainder = 0;
        //记录球赛的contestId和oddId
        var constant_contest_id ;
        var constant_odds_id ;
        //是否五大
        var is_fb_five = true ;
        var is_bb_five = false ;
        //按什么排序 2表示按contestId倒序排序，1表示oddsId倒序排序
        var fb_by_order = 2 ;
        var bb_by_order = 2 ;
        
        var odds_warn_start;
        var odds_warn_status;

        /**
         * 常量值 end
         * */




        /**
         * fb op 多选框点击事件 start
         * */
            //fb basic initializations
        $('#fb_odd_op_table tr input[type=checkbox]').removeAttr('checked');
        $('#fb_odd_op_table').on('click', 'tr input[type=checkbox]', function() {
            if(this.checked){
                fb_tablebox.display_bar(1);
                $(this).closest('tr').addClass('selected1');
            } else {
                fb_tablebox.display_bar($('#fb_odd_op_table tr input[type=checkbox]:checked').length);
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
                $('#fb_odd_op_table tr input[type=checkbox]').each(function(){
                    this.checked = true;
                    $(this).closest('tr').addClass('selected1');
                    count++;
                });

                $('#fb_toggle_all').get(0).checked = true;

                fb_tablebox.display_bar(count);
            }
            ,
            select_none : function() {
                $('#fb_odd_op_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
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
        $('#bb_odd_op_table tr input[type=checkbox]').removeAttr('checked');
        $('#bb_odd_op_table').on('click', 'tr input[type=checkbox]', function() {
            if(this.checked){
                bb_tablebox.display_bar(1);
                $(this).closest('tr').addClass('selected1');
            } else {
                bb_tablebox.display_bar($('#bb_odd_op_table tr input[type=checkbox]:checked').length);
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
                $('#bb_odd_op_table tr input[type=checkbox]').each(function(){
                    this.checked = true;
                    $(this).closest('tr').addClass('selected1');
                    count++;
                });

                $('#bb_toggle_all').get(0).checked = true;

                bb_tablebox.display_bar(count);
            }
            ,
            select_none : function() {
                $('#bb_odd_op_table tr input[type=checkbox]').removeAttr('checked').closest('tr').removeClass('selected1');
                $('#bb_toggle_all').get(0).checked = false;

                bb_tablebox.display_bar(0);
            }
        }

        /**
         * bb 多选框点击事件 end
         * */





        /**
         * 足球数据加载 start
         * =================================================
         * */

            //打开页面默认异步加载足球胜平负数据
        getFbOpData(null,true);

        //获取足球胜平负数据
        function getFbOpData(odd_start_id,is_five){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/football/getOddsData",
                data:{type:1,oddsId:odd_start_id,isFive:is_five,byOrder:fb_by_order},
                success: function (data) {
                    if (data.code == 200) {
                        if (data.number > 0) {
                            //加载数据
                            $.each(data.odds, function (index, odd) {
                                if(fb_by_order == 2){
                                    fb_op_start_id = odd.contest.contest_id ;
                                } else if (fb_by_order == 1){
                                    fb_op_start_id = odd.odds_id ;
                                }
                                if (!odd.lock_flag){
                                    fb_op_remainder ++ ;
                                }
                                var htmlStr = showFbOpData(odd.contest.contest_id, odd.odds_id, odd.contest.color, odd.contest.cup_name,odd.contest.cup_id, odd.contest.h_t.name, odd.contest.a_t.name,
                                        odd.contest.start_time, odd.init_home_roi, odd.home_roi, odd.init_draw_roi, odd.draw_roi, odd.init_away_roi,
                                        odd.away_roi, odd.company,odd.close_flag,odd.lock_flag);
                                $("#fb_odd_op_table tbody").append(htmlStr);
                            });
                            //设置剩余场数
                            $("#fb_odd_remainder_i").html(fb_op_remainder);
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



        //添加足球胜平负数据
        function showFbOpData(contest_id, id, color, cup_name,cup_id, h_name, a_name, start_time, init_home,home,init_draw,draw,init_away,away,company,close,lock) {
            var name = "";
            if (color != null){
                name = "<span style=\"background-color: "+color+" !important;\" class=\"label\" >"+cup_name+"</span>" ;
            } else {
                name = "<span style=\"background-color: #999 !important;\" class=\"label\" >"+cup_name+"</span>" ;
            }
            var vs = "<i class=\"smaller-90 bolder red\">"+h_name+"</i> <i class=\"smaller bolder\">VS</i> <i class=\"smaller-90 bolder green\">"+a_name+"</i>" ;

            var start_time_html = new Date(start_time).pattern("MM-dd HH:mm");
            var close_html ;
            if (close){
                close_html = "<i class=\"icon-check bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已封盘\"></i>" ;
            } else {
                close_html = "<i class=\"icon-external-link-sign bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未封盘\"></i>" ;
            }
            var lock_html ;
            if (lock){
                lock_html = "<i class=\"icon-lock bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已锁定，后台系统不再更新比分和状态\"></i>" ;
            } else {
                lock_html = "<i class=\"icon-unlock bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未锁定\"></i>" ;
            }
            var company_html = "";
            if (company == 8){
                company_html = "韦德";
            } else if (company == 9){
                company_html = "立博";
            } else if (company == 74){
                company_html = "Bet365";
            } else {
                company_html = "未知";
            }
            var htmlStr = "<tr><td><label class=\"inline\"><input type=\"checkbox\" class=\"ace\"/><span class=\"lbl\"></span></label></td>"+
                    "<td hidden=\"true\">"+contest_id+"</td>"+
                    "<td>"+id+"</td>"+
                    "<td>"+name+"</td>"+
                    "<td>"+cup_id+"</td>"+
                    "<td>"+vs+"</td>"+
                    "<td>"+start_time_html+"</td>"+
                    "<td class=\"center\"><b class=\"red\"><div class=\"col-sm-2\"></div><div class=\"col-sm-3\">"+home+"</div><div class=\"col-sm-3\">"+draw+"</div><div class=\"col-sm-3\">"+away+"</div></b></td>"+
                    "<td class=\"center\"><b class=\"grey\"><div class=\"col-sm-2\"></div><div class=\"col-sm-3\">"+init_home+"</div><div class=\"col-sm-3\">"+init_draw+"</div><div class=\"col-sm-3\">"+init_away+"</div></b></td>"+
                    "<td class=\"center\">"+company_html+"</td>"+
                    "<td class=\"center\">"+close_html+"</td>"+
                    "<td class=\"center\">"+lock_html+"</td>"+
                    "<td class=\"center\"><div><button class=\"btn btn-xs btn-info\"><i class=\"icon-edit bigger-150\"></i>编辑</button></div></td></tr>";
            return htmlStr ;
        }


        //获取足球让球胜平负数据
        function getFbJcData(odd_start_id,is_five){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/football/getOddsData",
                data:{type:2,oddsId:odd_start_id,isFive:is_five,byOrder:fb_by_order},
                success: function (data) {
                    if (data.code == 200) {
                        if (data.number > 0) {
                            //加载数据
                            $.each(data.odds, function (index, odd) {
                                if(fb_by_order == 2){
                                    fb_jc_start_id = odd.contest.contest_id ;
                                } else if (fb_by_order == 1){
                                    fb_jc_start_id = odd.odds_id ;
                                }
                                if (!odd.lock_flag){
                                    fb_jc_remainder ++ ;
                                }
                                var htmlStr = showFbJcData(odd.contest.contest_id, odd.odds_id, odd.contest.color, odd.contest.cup_name,odd.contest.cup_id, odd.contest.h_t.name, odd.contest.a_t.name,
                                        odd.contest.start_time, odd.init_home_roi, odd.home_roi, odd.init_draw_roi, odd.draw_roi, odd.init_away_roi,
                                        odd.away_roi, odd.init_handicap,odd.handicap, odd.company,odd.close_flag,odd.lock_flag);
                                $("#fb_odd_jc_table tbody").append(htmlStr);
                            });
                            //设置剩余场数
                            $("#fb_odd_remainder_i").html(fb_jc_remainder);
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

        //添加足球让球胜平负数据
        function showFbJcData(contest_id, id, color, cup_name,cup_id, h_name, a_name, start_time, init_home,home,init_draw,draw,init_away,away,init_handicap,handicap,company,close,lock) {
            var name = "";
            if (color != null){
                name = "<span style=\"background-color: "+color+" !important;\" class=\"label\" >"+cup_name+"</span>" ;
            } else {
                name = "<span style=\"background-color: #999 !important;\" class=\"label\" >"+cup_name+"</span>" ;
            }
            var vs = "<i class=\"smaller-90 bolder red\">"+h_name+"</i> <i class=\"smaller bolder\">VS</i> <i class=\"smaller-90 bolder green\">"+a_name+"</i>" ;

            var start_time_html = new Date(start_time).pattern("MM-dd HH:mm");
            var close_html ;
            if (close){
                close_html = "<i class=\"icon-check bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已封盘\"></i>" ;
            } else {
                close_html = "<i class=\"icon-external-link-sign bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未封盘\"></i>" ;
            }
            var lock_html ;
            if (lock){
                lock_html = "<i class=\"icon-lock bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已锁定，后台系统不再更新比分和状态\"></i>" ;
            } else {
                lock_html = "<i class=\"icon-unlock bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未锁定\"></i>" ;
            }
            var company_html = "";
            if (company == 8){
                company_html = "韦德";
            } else if (company == 9){
                company_html = "立博";
            } else if (company == 74){
                company_html = "Bet365";
            } else {
                company_html = "未知";
            }
            var htmlStr = "<tr><td><label class=\"inline\"><input type=\"checkbox\" class=\"ace\"/><span class=\"lbl\"></span></label></td>"+
                    "<td hidden=\"true\">"+contest_id+"</td>"+
                    "<td>"+id+"</td>"+
                    "<td>"+name+"</td>"+
                    "<td>"+cup_id+"</td>"+
                    "<td>"+vs+"</td>"+
                    "<td>"+start_time_html+"</td>"+
                    "<td class=\"center\"><b class=\"red\"><div class=\"col-sm-2\"></div><div class=\"col-sm-3\">"+home+"</div><div class=\"col-sm-3\">"+draw+"</div><div class=\"col-sm-3\">"+away+"</div></b></td>"+
                    "<td class=\"center\"><b class=\"grey\"><div class=\"col-sm-2\"></div><div class=\"col-sm-3\">"+init_home+"</div><div class=\"col-sm-3\">"+init_draw+"</div><div class=\"col-sm-3\">"+init_away+"</div></b></td>"+
                    "<td class=\"center\"><b class=\"red\">"+handicap+"</b></td>"+
                    "<td class=\"center\"><b class=\"grey\">"+init_handicap+"</b></td>"+
                    "<td class=\"center\">"+company_html+"</td>"+
                    "<td class=\"center\">"+close_html+"</td>"+
                    "<td class=\"center\">"+lock_html+"</td>"+
                    "<td class=\"center\"><div><button class=\"btn btn-xs btn-info\"><i class=\"icon-edit bigger-150\"></i>编辑</button></div></td></tr>";
            return htmlStr ;
        }


        /**
         * 足球数据加载 start
         * =================================================
         * */



        /**
         * 篮球数据加载 start
         * =================================================
         * */


            //获取篮球胜平负数据
        function getBbOpData(odd_start_id,is_five){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/basketball/getOddsData",
                data:{type:1,oddsId:odd_start_id,isFive:is_five,byOrder:bb_by_order},
                success: function (data) {
                    if (data.code == 200) {
                        if (data.number > 0) {
                            //加载数据
                            $.each(data.odds, function (index, odd) {
                                if(bb_by_order == 2){
                                    bb_op_start_id = odd.contest.contest_id ;
                                } else if (bb_by_order == 1){
                                    bb_op_start_id = odd.odds_id ;
                                }
                                if (!odd.lock_flag){
                                    bb_op_remainder ++ ;
                                }
                                var htmlStr = showBbOpData(odd.contest.contest_id, odd.odds_id, odd.contest.color, odd.contest.cup_name,odd.contest.cup_id, odd.contest.h_t.name, odd.contest.a_t.name,
                                        odd.contest.start_time, odd.init_home_roi, odd.home_roi, odd.init_away_roi,odd.away_roi, odd.company,odd.close_flag,odd.lock_flag);
                                $("#bb_odd_op_table tbody").append(htmlStr);
                            });
                            //设置剩余场数
                            $("#bb_odd_remainder_i").html(bb_op_remainder);
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

        //添加篮球胜平负数据
        function showBbOpData(contest_id, id, color, cup_name,cup_id, h_name, a_name, start_time, init_home,home,init_away,away,company,close,lock) {
            var name = "";
            if (color != null){
                name = "<span style=\"background-color: "+color+" !important;\" class=\"label\" >"+cup_name+"</span>" ;
            } else {
                name = "<span style=\"background-color: #999 !important;\" class=\"label\" >"+cup_name+"</span>" ;
            }
            var vs = "<i class=\"smaller-90 bolder red\">"+h_name+"</i> <i class=\"smaller bolder\">VS</i> <i class=\"smaller-90 bolder green\">"+a_name+"</i>" ;

            var start_time_html = new Date(start_time).pattern("MM-dd HH:mm");
            var close_html ;
            if (close){
                close_html = "<i class=\"icon-check bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已封盘\"></i>" ;
            } else {
                close_html = "<i class=\"icon-external-link-sign bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未封盘\"></i>" ;
            }
            var lock_html ;
            if (lock){
                lock_html = "<i class=\"icon-lock bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已锁定，后台系统不再更新比分和状态\"></i>" ;
            } else {
                lock_html = "<i class=\"icon-unlock bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未锁定\"></i>" ;
            }
            var company_html = "";
            if (company == 8){
                company_html = "韦德";
            } else if (company == 9){
                company_html = "立博";
            } else if (company == 74){
                company_html = "Bet365";
            } else {
                company_html = "未知";
            }
            var htmlStr = "<tr><td><label class=\"inline\"><input type=\"checkbox\" class=\"ace\"/><span class=\"lbl\"></span></label></td>"+
                    "<td hidden=\"true\">"+contest_id+"</td>"+
                    "<td>"+id+"</td>"+
                    "<td>"+name+"</td>"+
                    "<td>"+cup_id+"</td>"+
                    "<td>"+vs+"</td>"+
                    "<td>"+start_time_html+"</td>"+
                    "<td class=\"center\"><b class=\"red\"><div class=\"col-sm-3\"></div><div class=\"col-sm-3\">"+home+"</div><div class=\"col-sm-3\">"+away+"</div></b></td>"+
                    "<td class=\"center\"><b class=\"grey\"><div class=\"col-sm-3\"></div><div class=\"col-sm-3\">"+init_home+"</div><div class=\"col-sm-3\">"+init_away+"</div></b></td>"+
                    "<td class=\"center\">"+company_html+"</td>"+
                    "<td class=\"center\">"+close_html+"</td>"+
                    "<td class=\"center\">"+lock_html+"</td>"+
                    "<td class=\"center\"><div><button class=\"btn btn-xs btn-info\"><i class=\"icon-edit bigger-150\"></i>编辑</button></div></td></tr>";
            return htmlStr ;
        }


        //获取篮球让球胜平负数据
        function getBbJcData(odd_start_id,is_five){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/basketball/getOddsData",
                data:{type:2,oddsId:odd_start_id,isFive:is_five,byOrder:bb_by_order},
                success: function (data) {
                    if (data.code == 200) {
                        if (data.number > 0) {
                            //加载数据
                            $.each(data.odds, function (index, odd) {
                                if(bb_by_order == 2){
                                    bb_jc_start_id = odd.contest.contest_id ;
                                } else if (bb_by_order == 1){
                                    bb_jc_start_id = odd.odds_id ;
                                }
                                if (!odd.lock_flag){
                                    bb_jc_remainder ++ ;
                                }
                                var htmlStr = showBbJcData(odd.contest.contest_id, odd.odds_id, odd.contest.color, odd.contest.cup_name,odd.contest.cup_id, odd.contest.h_t.name, odd.contest.a_t.name,
                                        odd.contest.start_time, odd.init_home_roi, odd.home_roi, odd.init_away_roi, odd.away_roi, odd.init_handicap,odd.handicap, odd.company,odd.close_flag,odd.lock_flag);
                                $("#bb_odd_jc_table tbody").append(htmlStr);
                            });
                            //设置剩余场数
                            $("#bb_odd_remainder_i").html(bb_jc_remainder);
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

        //添加篮球让球胜平负数据
        function showBbJcData(contest_id, id, color, cup_name,cup_id, h_name, a_name, start_time, init_home,home,init_away,away,init_handicap,handicap,company,close,lock) {
            var name = "";
            if (color != null){
                name = "<span style=\"background-color: "+color+" !important;\" class=\"label\" >"+cup_name+"</span>" ;
            } else {
                name = "<span style=\"background-color: #999 !important;\" class=\"label\" >"+cup_name+"</span>" ;
            }
            var vs = "<i class=\"smaller-90 bolder red\">"+h_name+"</i> <i class=\"smaller bolder\">VS</i> <i class=\"smaller-90 bolder green\">"+a_name+"</i>" ;

            var start_time_html = new Date(start_time).pattern("MM-dd HH:mm");
            var close_html ;
            if (close){
                close_html = "<i class=\"icon-check bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已封盘\"></i>" ;
            } else {
                close_html = "<i class=\"icon-external-link-sign bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未封盘\"></i>" ;
            }
            var lock_html ;
            if (lock){
                lock_html = "<i class=\"icon-lock bigger-120 btn-xs btn-success\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"已锁定，后台系统不再更新比分和状态\"></i>" ;
            } else {
                lock_html = "<i class=\"icon-unlock bigger-120 btn-xs btn-light\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"未锁定\"></i>" ;
            }
            var company_html = "";
            if (company == 8){
                company_html = "韦德";
            } else if (company == 9){
                company_html = "立博";
            } else if (company == 74){
                company_html = "Bet365";
            } else {
                company_html = "未知";
            }
            var htmlStr = "<tr><td><label class=\"inline\"><input type=\"checkbox\" class=\"ace\"/><span class=\"lbl\"></span></label></td>"+
                    "<td hidden=\"true\">"+contest_id+"</td>"+
                    "<td>"+id+"</td>"+
                    "<td>"+name+"</td>"+
                    "<td>"+cup_id+"</td>"+
                    "<td>"+vs+"</td>"+
                    "<td>"+start_time_html+"</td>"+
                    "<td class=\"center\"><b class=\"red\"><div class=\"col-sm-3\"></div><div class=\"col-sm-3\">"+home+"</div><div class=\"col-sm-3\">"+away+"</div></b></td>"+
                    "<td class=\"center\"><b class=\"grey\"><div class=\"col-sm-3\"></div><div class=\"col-sm-3\">"+init_home+"</div><div class=\"col-sm-3\">"+init_away+"</div></b></td>"+
                    "<td class=\"center\"><b class=\"red\">"+handicap+"</b></td>"+
                    "<td class=\"center\"><b class=\"grey\">"+init_handicap+"</b></td>"+
                    "<td class=\"center\">"+company_html+"</td>"+
                    "<td class=\"center\">"+close_html+"</td>"+
                    "<td class=\"center\">"+lock_html+"</td>"+
                    "<td class=\"center\"><div><button class=\"btn btn-xs btn-info\"><i class=\"icon-edit bigger-150\"></i>编辑</button></div></td></tr>";
            return htmlStr ;
        }


        /**
         * 篮球数据加载 end
         * ============================================
         * */

        
        /**
         * ============================================
         * 异常赔率列表  start
         * 
         * ============================================
         */

        function getOddsWarnData(){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/match/odds/warn/list",
                data:{status:odds_warn_status,startId:odds_warn_start},
                success: function (data) {
                    if (data.code == 200) {
                        if (data.number > 0) {
                            //加载数据
                            $.each(data.oddsWarnList, function (index, odd) {
                                var htmlStr = showOddsWarnData(odd.id, odd.contest.cup_id,odd.contest.cup_name, odd.contest.color, odd.contest.contest_id,odd.contest.h_t.name,odd.contest.h_t.t_id, odd.contest.a_t.name,
                                		odd.contest.a_t.t_id,odd.contest.start_time,odd.playType, odd.initHandicap,odd.handicap,odd.initHomeRoi,odd.initDrawRoi,odd.initAwayRoi,odd.homeRoi,odd.drawRoi,odd.awayRoi,odd.company,odd.createTime);
                                $("#odds_warn_table tbody").append(htmlStr);
                            });
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

        
        function showOddsWarnData(id,cup_id,cup_name,color,contest_id,h_name,h_id,a_name,a_id,start_time,playType,initHandicap,handicap,initHomeRoi,initDrawRoi,initAwayRoi,homeRoi,drawRoi,awayRoi,company,createTime) {
            var name = "";
            if (color != null){
                name = "<span style=\"background-color: "+color+" !important;\" class=\"label\" >"+cup_name+"（id："+cup_id+"）</span>" ;
            } else {
                name = "<span style=\"background-color: #999 !important;\" class=\"label\" >"+cup_name+"（id："+cup_id+"）</span>" ;
            }
            var vs = "<i class=\"smaller-90 bolder red\">"+h_name+"（id："+h_id+"）</i> <i class=\"smaller bolder\">VS</i> <i class=\"smaller-90 bolder green\">"+a_name+"（id："+a_id+"）</i>" ;
            switch(playType){
	            case 1:
	            	playType="足球  胜平负";
	            	break;
	            case 2:
	            	playType="足球  让球胜平负";
	            	break;
	            case 6:
	            	playType="篮球  胜负";
	            	break;
	            case 7:
	            	playType="篮球  让球胜负";
	            	break;
            }
            var handicap_html="<div>当前盘口：<b class=\"red\">"+handicap+"</b></div>"
            				  +"<div>初始盘口：<b class=\"grey\">"+initHandicap+"</b></div>";
            if(drawRoi==null){
            	drawRoi="";
            	initDrawRoi="";
            }
            var roi_html="<div>当前赔率：<b class=\"red\">"+homeRoi+"&nbsp;&nbsp;"+drawRoi+"&nbsp;&nbsp;"+awayRoi+"</b></div>"
            			 +"<div>初始赔率：<b class=\"grey\">"+initHomeRoi+"&nbsp;&nbsp;"+initDrawRoi+"&nbsp;&nbsp;"+initAwayRoi+"</b></div>";
            var start_time_html = new Date(start_time).pattern("MM-dd HH:mm");
            var create_time_html = new Date(createTime).pattern("MM-dd HH:mm");
            var company_html = "";
            if (company == 8){
                company_html = "韦德";
            } else if (company == 9){
                company_html = "立博";
            } else if (company == 74){
                company_html = "Bet365";
            } else {
                company_html = "未知";
            }
            var htmlStr = "<tr>"+
                    "<td hidden=\"true\">"+id+"</td>"+
                    "<td class=\"center\">"+name+"</td>"+
                    "<td class=\"center\">"+contest_id+"</td>"+
                    "<td class=\"center\">"+vs+"</td>"+
                    "<td class=\"center\">"+start_time_html+"</td>"+
                    "<td class=\"center\">"+playType+"</td>"+
                    "<td class=\"center\">"+handicap_html+"</td>"+
                    "<td class=\"center\">"+roi_html+"</td>"+
                    "<td class=\"center\">"+company_html+"</td>"+
                    "<td class=\"center\">"+create_time_html+"</td>"+
                    "<td class=\"center\"><div><button class=\"btn btn-xs btn-info edit\"><i class=\"icon-edit bigger-150\"></i>编辑</button></div></td></tr>";
            return htmlStr ;
        }
        
        /**
         * ============================================
         * 异常赔率列表  end
         * 
         * ============================================
         */


        /**
         * 点击按钮编辑赔率 足球 start
         * ============================================
         * */
        var fb_odds_op_home_spinner_value = 1.00 ;
        var fb_odds_op_draw_spinner_value = 1.00 ;
        var fb_odds_op_away_spinner_value = 1.00 ;

        $('#fb_odd_op_table tbody').on('click', 'button.btn-info', function () {
            var tmpTr = $(this).closest("tr");
            constant_contest_id =  tmpTr.find("td:eq(1)").html();
            constant_odds_id =  tmpTr.find("td:eq(2)").html();
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
                        if (oddsInfo.status != 0){
                            team_scores = oddsInfo.contest.home_scores + ":" + oddsInfo.contest.away_scores ;
                        }
                        //胜平负
                        if (oddsInfo.op != null){
                            fb_odds_op_home_spinner_value = oddsInfo.op.home_roi ;
                            fb_odds_op_draw_spinner_value = oddsInfo.op.draw_roi ;
                            fb_odds_op_away_spinner_value = oddsInfo.op.away_roi ;
                        }

                        //窗口打开前赋予值
                        $("#odds_modal_scores_p").html(team_scores);
                        $("#odds_modal_home_p").html(home_team_name);
                        $("#odds_modal_away_p").html(home_away_name);

                        $("#fb_odds_op_home_spinner").val(fb_odds_op_home_spinner_value);
                        $("#fb_odds_op_draw_spinner").val(fb_odds_op_draw_spinner_value);
                        $("#fb_odds_op_away_spinner").val(fb_odds_op_away_spinner_value);

                        //胜平负 按钮样式变化
                        if (oddsInfo.op != null){
                            $("#fb_odds_op_history_bt").removeClass("hidden");
                            $("#fb_odds_op_edit_bt").removeClass("hidden");
                            $("#fb_odds_op_add_bt").addClass("hidden");
                        } else {
                            $("#fb_odds_op_history_bt").addClass("hidden");
                            $("#fb_odds_op_edit_bt").addClass("hidden");
                            $("#fb_odds_op_add_bt").removeClass("hidden");
                        }

                        //modal窗口打开
                        $("#modal_fb_odds_op").modal({backdrop: 'static'});

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



        var fb_odds_jc_home_spinner_value = 1.00 ;
        var fb_odds_jc_draw_spinner_value = 1.00 ;
        var fb_odds_jc_away_spinner_value = 1.00 ;
        var fb_odds_jc_handicap_spinner_value = -1.00 ;

        $('#fb_odd_jc_table tbody').on('click', 'button.btn-info', function () {
            var tmpTr = $(this).closest("tr");
            constant_contest_id =  tmpTr.find("td:eq(1)").html();
            constant_odds_id =  tmpTr.find("td:eq(2)").html();
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
                        if (oddsInfo.status != 0){
                            team_scores = oddsInfo.contest.home_scores + ":" + oddsInfo.contest.away_scores ;
                        }
                        //让球胜平负
                        if (oddsInfo.jc != null){
                            fb_odds_jc_home_spinner_value = oddsInfo.jc.home_roi ;
                            fb_odds_jc_draw_spinner_value = oddsInfo.jc.draw_roi ;
                            fb_odds_jc_away_spinner_value = oddsInfo.jc.away_roi ;
                            fb_odds_jc_handicap_spinner_value = oddsInfo.jc.handicap ;
                        }

                        //窗口打开前赋予值
                        $("#modal_fb_odds_jc_scores_p").html(team_scores);
                        $("#modal_fb_odds_jc_home_p").html(home_team_name);
                        $("#modal_fb_odds_jc_away_p").html(home_away_name);

                        $("#fb_odds_jc_home_spinner").val(fb_odds_jc_home_spinner_value);
                        $("#fb_odds_jc_draw_spinner").val(fb_odds_jc_draw_spinner_value);
                        $("#fb_odds_jc_away_spinner").val(fb_odds_jc_away_spinner_value);
                        $("#fb_odds_jc_handicap_spinner").val(fb_odds_jc_handicap_spinner_value);

                        //胜平负 按钮样式变化
                        if (oddsInfo.op != null){
                            $("#fb_odds_jc_history_bt").removeClass("hidden");
                            $("#fb_odds_jc_edit_bt").removeClass("hidden");
                            $("#fb_odds_jc_add_bt").addClass("hidden");
                        } else {
                            $("#fb_odds_jc_history_bt").addClass("hidden");
                            $("#fb_odds_jc_edit_bt").addClass("hidden");
                            $("#fb_odds_jc_add_bt").removeClass("hidden");
                        }

                        //modal窗口打开
                        $("#modal_fb_odds_jc").modal({backdrop: 'static'});

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
         * 微调按钮初始化 start
         * ============================================
         * */

        //足球op

         $( "#fb_odds_op_home_spinner" ).spinner({
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

        $( "#fb_odds_op_draw_spinner" ).spinner({
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

        $( "#fb_odds_op_away_spinner" ).spinner({
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




        //==========================


        //足球jc

        $( "#fb_odds_jc_home_spinner" ).spinner({
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

        $( "#fb_odds_jc_draw_spinner" ).spinner({
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

        $( "#fb_odds_jc_away_spinner" ).spinner({
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

        $( "#fb_odds_jc_handicap_spinner" ).spinner({
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
         * 点击按钮编辑 足球 end
         * ============================================
         * */



        /**
         * 点击按钮编辑赔率 篮球 start
         * ============================================
         * */
        var bb_odds_op_home_spinner_value = 1.00 ;
        var bb_odds_op_away_spinner_value = 1.00 ;

        $('#bb_odd_op_table tbody').on('click', 'button.btn-info', function () {
            var tmpTr = $(this).closest("tr");
            constant_contest_id =  tmpTr.find("td:eq(1)").html();
            constant_odds_id =  tmpTr.find("td:eq(2)").html();
            //请求赔率数据
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/basketball/getAsyOddsData",
                data: {contestId:constant_contest_id},
                success: function (data) {
                    if (data.code == 200) {
                        var oddsInfo = data.oddsInfo ;
                        //球队比分
                        var home_team_name = oddsInfo.contest.h_t.name ;
                        var home_away_name = oddsInfo.contest.a_t.name ;
                        var team_scores = "--:--" ;
                        if (oddsInfo.status != 0){
                            team_scores = oddsInfo.contest.home_scores + ":" + oddsInfo.contest.away_scores ;
                        }
                        //胜平负
                        if (oddsInfo.op != null){
                            bb_odds_op_home_spinner_value = oddsInfo.op.home_roi ;
                            bb_odds_op_away_spinner_value = oddsInfo.op.away_roi ;
                        }

                        //窗口打开前赋予值
                        $("#modal_bb_odds_op_scores_p").html(team_scores);
                        $("#modal_bb_odds_op_home_p").html(home_team_name);
                        $("#modal_bb_odds_op_away_p").html(home_away_name);

                        $("#bb_odds_op_home_spinner").val(bb_odds_op_home_spinner_value);
                        $("#bb_odds_op_away_spinner").val(bb_odds_op_away_spinner_value);

                        //胜平负 按钮样式变化
                        if (oddsInfo.op != null){
                            $("#bb_odds_op_history_bt").removeClass("hidden");
                            $("#bb_odds_op_edit_bt").removeClass("hidden");
                            $("#bb_odds_op_add_bt").addClass("hidden");
                        } else {
                            $("#bb_odds_op_history_bt").addClass("hidden");
                            $("#bb_odds_op_edit_bt").addClass("hidden");
                            $("#bb_odds_op_add_bt").removeClass("hidden");
                        }

                        //modal窗口打开
                        $("#modal_bb_odds_op").modal({backdrop: 'static'});
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



        var bb_odds_jc_home_spinner_value = 1.00 ;
        var bb_odds_jc_away_spinner_value = 1.00 ;
        var bb_odds_jc_handicap_spinner_value = -1.00 ;

        $('#bb_odd_jc_table tbody').on('click', 'button.btn-info', function () {
            var tmpTr = $(this).closest("tr");
            constant_contest_id =  tmpTr.find("td:eq(1)").html();
            constant_odds_id =  tmpTr.find("td:eq(2)").html();
            //请求赔率数据
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/basketball/getAsyOddsData",
                data: {contestId:constant_contest_id},
                success: function (data) {
                    if (data.code == 200) {
                        var oddsInfo = data.oddsInfo ;
                        //球队比分
                        var home_team_name = oddsInfo.contest.h_t.name ;
                        var home_away_name = oddsInfo.contest.a_t.name ;
                        var team_scores = "--:--" ;
                        if (oddsInfo.status != 0){
                            team_scores = oddsInfo.contest.home_scores + ":" + oddsInfo.contest.away_scores ;
                        }
                        //让球胜平负
                        if (oddsInfo.jc != null){
                            bb_odds_jc_home_spinner_value = oddsInfo.jc.home_roi ;
                            bb_odds_jc_away_spinner_value = oddsInfo.jc.away_roi ;
                            bb_odds_jc_handicap_spinner_value = oddsInfo.jc.handicap ;
                        }

                        //窗口打开前赋予值
                        $("#modal_bb_odds_jc_scores_p").html(team_scores);
                        $("#modal_bb_odds_jc_home_p").html(home_team_name);
                        $("#modal_bb_odds_jc_away_p").html(home_away_name);

                        $("#bb_odds_jc_home_spinner").val(bb_odds_jc_home_spinner_value);
                        $("#bb_odds_jc_away_spinner").val(bb_odds_jc_away_spinner_value);
                        $("#bb_odds_jc_handicap_spinner").val(bb_odds_jc_handicap_spinner_value);

                        //胜平负 按钮样式变化
                        if (oddsInfo.op != null){
                            $("#bb_odds_jc_history_bt").removeClass("hidden");
                            $("#bb_odds_jc_edit_bt").removeClass("hidden");
                            $("#bb_odds_jc_add_bt").addClass("hidden");
                        } else {
                            $("#bb_odds_jc_history_bt").addClass("hidden");
                            $("#bb_odds_jc_edit_bt").addClass("hidden");
                            $("#bb_odds_jc_add_bt").removeClass("hidden");
                        }

                        //modal窗口打开
                        $("#modal_bb_odds_jc").modal({backdrop: 'static'});
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
         * 微调按钮初始化 start
         * ============================================
         * */

            //篮球op

        $( "#bb_odds_op_home_spinner" ).spinner({
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


        $( "#bb_odds_op_away_spinner" ).spinner({
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




        //==========================


        //篮球jc

        $( "#bb_odds_jc_home_spinner" ).spinner({
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

        $( "#bb_odds_jc_away_spinner" ).spinner({
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

        $( "#bb_odds_jc_handicap_spinner" ).spinner({
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
         * 点击按钮编辑 篮球 end
         * ============================================
         * */

            //提示信息
        $( "#fb_odd_op_table,#fb_odd_jc_table,#bb_odd_op_table,#bb_odd_jc_table" ).tooltip({
            hide: {
                delay: 100
            }
        });

        $('#odd_tab a').click(function (e) {
            e.preventDefault();//阻止a链接的跳转行为
            var href = $(this).attr("href");
            if (href == "#fb_tab"){

            } else if (href == "#bb_tab"){
                //切换到了篮球tab
                if (!isOpenBb){
                    if(is_bb_five){
                        getBbOpData(null,true);
                    } else {
                        getBbOpData(null,null);
                    }
                }
                isOpenBb = true ;

            } else if(href == "#odds_tab"){
            	$("#odds_warn_table tbody tr").remove();
            	getOddsWarnData();

            
            }
            $(this).tab('show');//显示当前选中的链接及关联的content

        });

        //胜平负和让球胜平负切换
        $('#fb_dropdown_op').on('click', function(e){
            e.preventDefault();
            fb_open_status = 1 ;
            $('#fb_dropdown_info').html('胜平负');
            $("#fb_odd_jc_table").attr("hidden",true);
            $("#fb_odd_op_table").removeAttr("hidden");
        });
        $('#fb_dropdown_jc').on('click', function(e){
            e.preventDefault();
            fb_open_status = 2 ;
            $('#fb_dropdown_info').html('让球胜平负');
            $("#fb_odd_op_table").attr("hidden",true);
            $("#fb_odd_jc_table").removeAttr("hidden");
            //让球加载数据
            getFbJcData(null);
        });
        $('#bb_dropdown_op').on('click', function(e){
            e.preventDefault();
            bb_open_status = 1 ;
            $('#bb_dropdown_info').html('胜平负');
            $("#bb_odd_jc_table").attr("hidden",true);
            $("#bb_odd_op_table").removeAttr("hidden");
        });
        $('#bb_dropdown_jc').on('click', function(e){
            e.preventDefault();
            bb_open_status = 2 ;
            $('#bb_dropdown_info').html('让球胜平负');
            $("#bb_odd_op_table").attr("hidden",true);
            $("#bb_odd_jc_table").removeAttr("hidden");
            //让球加载数据
            getBbJcData(null);
        });

        /**
         * ======================================================
         * 向下加载数据 start
         */

        $("#fb_data_more").on("click",function(){
            if (fb_open_status == 1){
                //胜平负向下加载数据
                if (is_fb_five){
                    getFbOpData(fb_op_start_id,true);
                } else {
                    getFbOpData(fb_op_start_id,null);
                }

            } else if (fb_open_status == 2){
                //让球胜平负向下加载数据
                if (is_fb_five){
                    getFbJcData(fb_jc_start_id,true);
                } else {
                    getFbJcData(fb_jc_start_id,null);
                }

            }
        });

        $("#bb_data_more").on("click",function(){
            if (bb_open_status == 1){
                //胜平负向下加载数据
                if (is_bb_five){
                    getBbOpData(bb_op_start_id,true);
                } else {
                    getBbOpData(bb_op_start_id,null);
                }

            } else if (bb_open_status == 2){
                //让球胜平负向下加载数据
                if (is_bb_five){
                    getBbJcData(bb_jc_start_id,true);
                } else {
                    getBbJcData(bb_jc_start_id,null);
                }

            }
        });

        /**
         * 向下加载数据 end
         * ======================================================
         */




        /**
         * 编辑赔率提交 start
         * ======================================================
         */

        //足球（胜平负）
        $("#fb_odds_op_edit_bt").on("click",function(){
            var home = $("#fb_odds_op_home_spinner").val();
            var draw = $("#fb_odds_op_draw_spinner").val();
            var away = $("#fb_odds_op_away_spinner").val();
            //修改赔率
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/football/odds/op/update",
                data: {contest_id:constant_contest_id,odds_id:constant_odds_id,home_roi:home,draw_roi:draw,away_roi:away},
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
        $("#fb_odds_jc_edit_bt").on("click",function(){
            var home = $("#fb_odds_jc_home_spinner").val();
            var draw = $("#fb_odds_jc_draw_spinner").val();
            var away = $("#fb_odds_jc_away_spinner").val();
            var handicap = $("#fb_odds_jc_handicap_spinner").val();

            //修改赔率
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/football/odds/jc/update",
                data: {contest_id:constant_contest_id,odds_id:constant_odds_id,home_roi:home,draw_roi:draw,away_roi:away,handicap:handicap},
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


        //篮球（胜平负）
        $("#bb_odds_op_edit_bt").on("click",function(){
            var home = $("#bb_odds_op_home_spinner").val();
            var away = $("#bb_odds_op_away_spinner").val();
            //修改赔率
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/basketball/odds/op/update",
                data: {contest_id:constant_contest_id,odds_id:constant_odds_id,home_roi:home,away_roi:away},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "赔率更改成功",
                            text: '主胜为：<h4><b class="red">'+home+'</b></h4><br/>主赔为：<h4><b class="red">'+away+'</b></h4>',
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


        //篮球(让球胜平负)
        $("#bb_odds_jc_edit_bt").on("click",function(){
            var home = $("#bb_odds_jc_home_spinner").val();
            var away = $("#bb_odds_jc_away_spinner").val();
            var handicap = $("#bb_odds_jc_handicap_spinner").val();

            //修改赔率
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName+"/event/basketball/odds/jc/update",
                data: {contest_id:constant_contest_id,odds_id:constant_odds_id,home_roi:home,away_roi:away,handicap:handicap},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "赔率更改成功",
                            text: '主胜为：<h4><b class="red">'+home+'</b></h4><br/>主赔为：<h4><b class="red">'+away+'</b></h4><br/>盘口为：<h4><b class="red">'+handicap+'</b></h4>',
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
         * 编辑赔率提交 end
         * ======================================================
         */




        /**
         * toolbar start
         * ======================================================
         */

        $("#fb_item_condition_five").on("click",function(){
            $("#fb_item_condition_five_class").removeClass("invisible");
            $("#fb_item_condition_all_class").addClass("invisible");
            $("#fb_title").html("足球五大联赛赔率列表");
            is_fb_five = true ;
            if (fb_open_status == 1){
                //清空原有的数据
                $("#fb_odd_op_table tbody tr").remove();
                getFbOpData(null,true);
            } else if(fb_open_status == 2){
                //清空原有的数据
                $("#fb_odd_jc_table tbody tr").remove();
                getFbJcData(null,true);
            }
        });

        $("#fb_item_condition_all").on("click",function(){
            $("#fb_item_condition_five_class").addClass("invisible");
            $("#fb_item_condition_all_class").removeClass("invisible");
            $("#fb_title").html("足球全部联赛赔率列表");
            is_fb_five = false ;
            if (fb_open_status == 1){
                //清空原有的数据
                $("#fb_odd_op_table tbody tr").remove();
                getFbOpData(null,null);
            } else if(fb_open_status == 2){
                //清空原有的数据
                $("#fb_odd_jc_table tbody tr").remove();
                getFbJcData(null,null);
            }
        });


        $("#bb_item_condition_five").on("click",function(){
            $("#bb_item_condition_five_class").removeClass("invisible");
            $("#bb_item_condition_all_class").addClass("invisible");
            $("#bb_title").html("篮球全部联赛赔率列表");
            is_bb_five = true ;
            if (bb_open_status == 1){
                //清空原有的数据
                $("#bb_odd_op_table tbody tr").remove();
                getBbOpData(null,true);
            } else if(bb_open_status == 2){
                //清空原有的数据
                $("#bb_odd_jc_table tbody tr").remove();
                getBbJcData(null,true);
            }
        });

        $("#bb_item_condition_all").on("click",function(){
            $("#bb_item_condition_five_class").addClass("invisible");
            $("#bb_item_condition_all_class").removeClass("invisible");
            $("#bb_title").html("篮球五大联赛赔率列表");
            is_bb_five = false ;
            if (bb_open_status == 1){
                //清空原有的数据
                $("#bb_odd_op_table tbody tr").remove();
                getBbOpData(null,null);
            } else if(bb_open_status == 2){
                //清空原有的数据
                $("#bb_odd_jc_table tbody tr").remove();
                getBbJcData(null,null);
            }
        });

        //足球按赛事Id排序
        $("#fb_select_item_order_cid").on("click",function(e){
            e.preventDefault();
            $("#fb_select_item_order_cid_i").removeClass("invisible");
            $("#fb_select_item_order_oid_i").addClass("invisible");
            fb_by_order = 2 ;
            if (fb_open_status == 1){
                //清空原有的数据
                $("#fb_odd_op_table tbody tr").remove();
                if (is_fb_five){
                    getFbOpData(null,true);
                } else {
                    getFbOpData(null,null);
                }
            } else if(fb_open_status == 2){
                //清空原有的数据
                $("#fb_odd_jc_table tbody tr").remove();
                if (is_fb_five){
                    getFbJcData(null,true);
                } else {
                    getFbJcData(null,null);
                }

            }
        });

        //足球按赔率Id排序
        $("#fb_select_item_order_oid").on("click",function(e){
            e.preventDefault();
            $("#fb_select_item_order_oid_i").removeClass("invisible");
            $("#fb_select_item_order_cid_i").addClass("invisible");
            fb_by_order = 1 ;
            if (fb_open_status == 1){
                //清空原有的数据
                $("#fb_odd_op_table tbody tr").remove();
                if (is_fb_five){
                    getFbOpData(null,true);
                } else {
                    getFbOpData(null,null);
                }
            } else if(fb_open_status == 2){
                //清空原有的数据
                $("#fb_odd_jc_table tbody tr").remove();
                if (is_fb_five){
                    getFbJcData(null,true);
                } else {
                    getFbJcData(null,null);
                }

            }
        });


        //篮球按赛事Id排序
        $("#bb_select_item_order_cid").on("click",function(e){
            e.preventDefault();
            $("#bb_select_item_order_cid_i").removeClass("invisible");
            $("#bb_select_item_order_oid_i").addClass("invisible");
            bb_by_order = 2 ;
            if (bb_open_status == 1){
                //清空原有的数据
                $("#bb_odd_op_table tbody tr").remove();
                if (is_bb_five){
                    getBbOpData(null,true);
                } else {
                    getBbOpData(null,null);
                }
            } else if(bb_open_status == 2){
                //清空原有的数据
                $("#bb_odd_jc_table tbody tr").remove();
                if (is_bb_five){
                    getBbJcData(null,true);
                } else {
                    getBbJcData(null,null);
                }
            }
        });

        //篮球按赔率Id排序
        $("#bb_select_item_order_oid").on("click",function(e){
            e.preventDefault();
            $("#bb_select_item_order_oid_i").removeClass("invisible");
            $("#bb_select_item_order_cid_i").addClass("invisible");
            bb_by_order = 1 ;
            if (bb_open_status == 1){
                //清空原有的数据
                $("#bb_odd_op_table tbody tr").remove();
                if (is_bb_five){
                    getBbOpData(null,true);
                } else {
                    getBbOpData(null,null);
                }
            } else if(bb_open_status == 2){
                //清空原有的数据
                $("#bb_odd_jc_table tbody tr").remove();
                if (is_bb_five){
                    getBbJcData(null,true);
                } else {
                    getBbJcData(null,null);
                }
            }
        });



        /**
         * toolbar end
         * ======================================================
         */

            //赛事过滤
        $("#fb_search_input").keyup(function(){
            $("#fb_odd_op_table tbody tr,#fb_odd_jc_table tbody tr").hide().filter(":contains('"+( $(this).val() )+"')").show();
        }).keyup();
        $("#bb_search_input").keyup(function(){
            $("#bb_odd_op_table tbody tr,#bb_odd_jc_table tbody tr").hide().filter(":contains('"+( $(this).val() )+"')").show();
        }).keyup();



    });