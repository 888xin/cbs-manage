define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    var highcharts = require("../../modules/lib/highcharts");
    var moment = require("../../modules/lib/moment.min");
    var dateInit = require("../../modules/lib/datepicker");
    var statistic = {
        init: function (user) {
            this.user = user;
            this.api = '../userGraph/user_view';
            this.startTime = moment().subtract("days", "10").format('YYYY-MM-DD');
            this.endTime = moment().subtract("days", "1").format('YYYY-MM-DD');
            this.getData(this.startTime, this.endTime);
            this.setDate();
            this.clickChange();
        },
        setDate: function () {
            var _this = this;
            $("#datepicker").dateInit({
                settings: {
                    single: false,
                    startDate: this.startTime,
                    endDate: this.endTime,
                    dayLimit: 31,
                    maxDate: moment().format('YYYY-MM-DD'),
                    timepicker: false,
                    dropdown: false,
                },
                defTime: this.startTime + ' - ' + this.endTime,
                onPickEnd: function (startTime, endTime) {
                    _this.startTime = startTime;
                    _this.endTime = endTime;
                    _this.getData(startTime, endTime);
                }
            });
        },
        getData: function (start, end) {
            var _this = this;
            var xData = []; //日期
            var ywinning = []; //胜率
            var yloseData = []; //输钱
            var ywinData = []; //赢钱
            var yfinalData = []; //盈利
            var ybetData = []; //投注
            var yloseCount = []; //输次数
            var ywinCount = []; //赢次数
            $.ajax({
                type: "get",
                url: "./graph",
                data: {
                    user_id: _this.user,
                    start_time: start,
                    end_time: end,
                },
                success: function (data) {
                    data = JSON.parse(data)
                    var users = data.users;
                    $.each(users, function (k, v) {
                        xData.push(v.time.substr(5));
                        ywinning.push(parseFloat((v.winning * 100).toFixed(2)));
                        ywinData.push(v.win_gold);
                        yloseData.push(v.loss_gold);
                        yfinalData.push(v.final_gold);
                        ybetData.push(v.bet_gold);
                        yloseCount.push(v.loss_count);
                        ywinCount.push(v.win_count);
                    })
                    _this.draw($('#win'), '输赢胜率', xData, [ywinCount, yloseCount, ywinning]);
                    _this.draw($('#gold'), '收支盈利', xData, [
                        {
                            name: '输钱',
                            data: yloseData
                        },
                        {
                            name: '赢钱',
                            data: ywinData
                        },
                        {
                            name: '盈利',
                            data: yfinalData
                        },
                        {
                            name: '投注',
                            data: ybetData
                        }
                    ]);
                }
            });
        },
        draw: function (nodeId, type, xData, yData) {
            if (xData.length > 0) {
                var chart = {
                    title: {
                        text: type + '统计图',
                    },
                    xAxis: {
                        categories: xData
                    },
                    yAxis: {
                        allowDecimals: false,
                        lineWidth: 1,
                        title: {
                            text: type + '(元)',
                            align: 'high',
                            offset: -10,
                            rotation: 0,
                            y: -15
                        }
                    },
                    tooltip: {
                        valueSuffix: '元'
                    },
                    series: yData,
                    credits: {
                        enabled: false
                    }
                }
                if (type == '输赢胜率') {
                    chart.yAxis = [
                        {
                            allowDecimals: false,
                            lineWidth: 1,
                            min: 0,
                            title: {
                                text: '输赢次数',
                            }
                        },
                        {
                            allowDecimals: false,
                            lineWidth: 1,
                            min: 0,
                            title: {
                                text: '胜率',
                            },
                            labels: {
                                format: '{value}%',
                                style: {
                                    color: '#4572A7'
                                }
                            },
                            opposite: true
                        }
                    ];
                    chart.series = [
                        {
                            type: 'column',
                            name: '赢次数',
                            data: yData[0],
                            tooltip: {
                                valueSuffix: '次'
                            }
                        },
                        {
                            type: 'column',
                            name: '输次数',
                            data: yData[1],
                            tooltip: {
                                valueSuffix: '次'
                            }
                        },
                        {
                            name: '胜率',
                            type: 'spline',
                            yAxis: 1,
                            data: yData[2],
                            tooltip: {
                                valueSuffix: '%'
                            }
                        },
                    ]
                }
                if (xData.length < 20) {
                    chart.xAxis.tickInterval = null;
                } else {
                    chart.xAxis.tickInterval = 3;
                }
                nodeId.highcharts(chart);
            } else {
                nodeId.html('<div class="noData">该时间区间暂无数据</div>')
            }
        },
        clickChange: function () {
            $("#stattype").change(function () {
                $('.chart').children().eq($(this).val()).fadeIn().siblings().fadeOut(0);
            });
        }
    };
    $("#search_user_modal").on("click", function () {
        var user_name = $("#search_user").val().trim();
        if (user_name == "") {
            $.gritter.add({
                title: "请输入用户名",
                time: 2000,
                class_name: 'gritter-error gritter-light'
            });
        } else {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/user/search",
                data: {searchKey: user_name},
                success: function (data) {
                    if (data.code == 200) {
                        //清空原有的数据
                        $("#user_table tbody tr").remove();
                        if (data.number > 0) {
                            //加载数据
                            $.each(data.users, function (index, user) {
                                var htmlStr = showUserData(user.user_id, user.long_no, user.name,user.head, user.gender, user.status,user.availableMoney,user.userStatisticsResponse.bet_count,user.userStatisticsResponse.win_count,user.userStatisticsResponse.draw_count,user.userStatisticsResponse.loss_count,user.userStatisticsResponse.winning,user.userStatisticsResponse.roi);
                                $("#user_table tbody").append(htmlStr);
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
    });
    //动态加载用户数据
    function showUserData(user_id,long_no, user_name,user_head, user_gender, user_status,user_availableMoney,bet_count,win_count,draw_count,loss_count,winning,roi) {
        if (user_status == 1) {
            user_status = "屏蔽";
        } else if (user_status == 2) {
            user_status = "未验证";
        } else if (user_status == 4) {
            user_status = "已验证";
        }
        if (user_gender == 0) {
            user_gender = "女";
        } else if (user_gender == 1) {
            user_gender = "男";
        } else {
            user_gender = "未知";
        }
        winning = winning*100+"%";
        var htmlArray = [];
        htmlArray.push("<tr style='align:left;'>");
        htmlArray.push("<td class='center'><img width='80' height='80' class=\"nav-user-photo\" src='" +"http://proxy.dev.xy.l99.com/image.php?type=avatar50&amp;ifile="+ user_head + "'/></td>");
        htmlArray.push("<td style=' text-align:center;'><div>用户id："+user_id+"</div><div>龙号："+long_no+"</div><div>用户名："+user_name+"</div><div>性别："+user_gender+"</div><div>用户状态："+user_status+"</div></td>");
        htmlArray.push("<td class='center'><div>总场数："+bet_count+"</div><div>赢场数："+win_count+"</div><div>输场数："+loss_count+"</div><div>走盘场数："+draw_count+"</div><div>胜率："+winning+"</div><div>投资回报率："+roi+"</div></td>");
        htmlArray.push("<td class='center'>" + user_availableMoney + "</td>");
        htmlArray.push("<td class='center'><button id=\"coupon_show\" class=\"btn btn-xs btn-info btn-coupon\"  data-toggle=\"popover\" data-placement=\"top\" title=\"龙筹卷\"> <i class=\"icon-edit bigger-150\"></i></button></td>");
        if (admin_money) {
          htmlArray.push("<td class='center'><button class=\"btn btn-xs btn-danger btn-money_add\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"增加\"> <i class=\"icon-edit bigger-150\"></i></button></td>");
          htmlArray.push("<td class='center'><button class=\"btn btn-xs btn-danger btn-money_deduct\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"扣除\"> <i class=\"icon-edit bigger-150\"></i></button></td>");
        } else {
          htmlArray.push("<td class='center'>无权限</td>");
          htmlArray.push("<td class='center'>无权限</td>");
        }
        htmlArray.push("<td class='center'><button class=\"btn btn-xs btn-warning btn-stat info\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"统计\"><i class=\"icon-bar-chart bigger-150\"></i></button></td>");
        htmlArray.push("<td class='hidden'>" + user_id + "</td>");
        htmlArray.push("<td class='hidden'>" + user_name + "</td>");
        htmlArray.push("<td class='hidden'>" + long_no + "</td>");
        htmlArray.push("<td class='center'><button class=\"btn btn-xs btn-info btn-stat prompt\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"消息提醒\"><i class=\"icon-edit bigger-150\"></i></button></td>");
        htmlArray.push("</tr>");
        return htmlArray.join("");
    }



    //增加龙币弹出窗口
    $('#user_table tbody').on('click', 'button.btn-money_add', function () {
        var tmpTr = $(this).closest("tr");
        var user_id = tmpTr.find("td:eq(8)").html();
        var long_no = tmpTr.find("td:eq(10)").html();
        var name = tmpTr.find("td:eq(9)").html();
        $("#user_id_money").html(user_id);
        $("#long_no_money").html(long_no);
        $("#name_money").html(name);
        $("#modal_money_add").modal({backdrop: 'static'});
    });
    //扣除龙币弹出窗口
    $('#user_table tbody').on('click', 'button.btn-money_deduct', function () {
        var tmpTr = $(this).closest("tr");
        var user_id = tmpTr.find("td:eq(8)").html();
        var long_no = tmpTr.find("td:eq(10)").html();
        var name = tmpTr.find("td:eq(9)").html();
        $("#user_id_money_deduct").html(user_id);
        $("#long_no_money_deduct").html(long_no);
        $("#name_money_deduct").html(name);
        $("#modal_money_deduct").modal({backdrop: 'static'});
    });


    //龙币充值
    $("#modal_money_edit_button").on("click", function () {
        //获得输入的值
        var user_id = $("#user_id_money").html();
        var amount = $("#amount_money").val();

        //异步提交
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/user/editmoney",
            data: {user_id: user_id, amount: amount},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '添加成功！',
                        time: 2000,
                        class_name: 'gritter-info gritter-light'
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
    //龙币扣除
    $("#modal_money_deduct_button").on("click", function () {
        //获得输入的值
        var user_id = $("#user_id_money_deduct").html();
        var amount = $("#amount_money_deduct").val();
        //异步提交
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/user/deductmoney",
            data: {user_id: user_id, amount: amount},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '扣除成功！',
                        time: 2000,
                        class_name: 'gritter-info gritter-light'
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


    $('#user_table tbody').on('click', 'button.info', function () {
        var tmpTr = $(this).parents("tr");
        var user = tmpTr.find("td:eq(8)").text();
        $("#modal_stat").modal({backdrop: 'static'});
        statistic.init(user);
    });
    
    $('#user_table tbody').on('click', 'button.prompt', function () {
        var tmpTr = $(this).parents("tr");
        var user_id = tmpTr.find("td:eq(8)").html();
        var long_no = tmpTr.find("td:eq(10)").html();
        var name = tmpTr.find("td:eq(9)").html();
        $("#user_id_prompt").html(user_id);
        $("#long_no_prompt").html(long_no);
        $("#name_prompt").html(name);
        $("#modal_prompt").modal({backdrop: 'static'});
    });
    
    $("#modal_prompt_button").on("click", function () {
        //获得输入的值
        var userId = $("#user_id_prompt").html();
        var content = $("#prompt_info").val();
        if(content.trim()==""){
            $.gritter.add({
                title: "请输入消息内容",
                time: 2000,
                class_name: 'gritter-error gritter-light'
            });
            return;
        }
        //异步提交
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/user/prompt",
            data: {userId: userId, content: content},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '发送成功！',
                        time: 2000,
                        class_name: 'gritter-info gritter-light'
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

    $('#user_table tbody').on('click', 'button.btn-coupon', function () {
        var tmpTr = $(this).parents("tr");
        var user_id = tmpTr.find("td:eq(8)").text();
        var long_no = tmpTr.find("td:eq(10)").text();
        var user_name = tmpTr.find("td:eq(9)").text();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/user/coupon",
            data: {user_id: user_id, limit: 100},
            success: function (data) {
                if (data.code == 200) {
                    $("#user_id_coupon").html(user_id);
                    $("#long_no_coupon").html(long_no);
                    $("#name_coupon").html(user_name);
                    var coupon="";
                    if (data.number > 0) {
                        $.each(data.coupons, function (key, value) {
                            if(value>0){
                            	coupon+="<div>龙筹卷面额：   "+key+"龙筹，拥有量：  "+value+" 张</div>";
                            }
                        });
                    } else {
                        coupon="无可用龙筹卷";
                    }
                    $("#coupon_list").html(coupon);
                    $("#modal_coupon_show").modal({backdrop: 'static'});

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
})