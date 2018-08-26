define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");
    var moment = require("../../modules/lib/moment.min");
    var dateInit = require("../../modules/lib/datepicker");
    var _ = require("../../modules/lib/underscore-min");
    var bet_html = $("#bet_html").html();
    var startTime = moment().subtract("days", "7").format('YYYY-MM-DD');
    var endTime = moment().format('YYYY-MM-DD');

    var bet_list = {
        urlPrefix: appName + "/bet/fb/get",
        start_time: "",// 下注开始时间
        end_time: "",// 下注结束时间
        contest_id: "",// 赛事过滤条件
        long_no: "",// 龙号过滤条件
        start_id: null,// 向下加载起始Id
        type: 1,// 当前加载的下注类型
        settle: null,// 是否是只查询结算的下注
        limit: 40,
        init: function () {
            this.requireAjax();
            this.scrollToLoad();
            this.tabSwitch();
            this.timePick();
            this.searchEvent();
            this.cancleBet();
        },
        /**
         * 请求数据
         */
        requireAjax: function () {
            var url = this.urlPrefix;
            var _this = this;
            if (_this.start_id == -1) { //  已经没有数据
                return;
            }
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: {
                    startId: _this.start_id,
                    type: _this.type,
                    contestId: _this.contest_id,
                    longNo: _this.long_no,
                    settle: _this.settle,
                    startTime: _this.start_time,
                    endTime: _this.end_time
                },
                success: function (data) {
                    if (data.code == 200) {
                        var result = data.bets;
                        var tpl = _.template(bet_html);
                        var betlist = tpl({
                            data: result,
                            moment: moment,
                            type: _this.type
                        });
                        $('#bet_data_wrap').append(betlist);
                        _this.loadFlag = false; //加载结束
                        _this.start_id = data.start_id;
                    } else {
                        $.gritter.add({
                            title: '出现code:' + data.code + ' 错误，详细信息：' + data.msg,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }
                }
            })
        },
        /**
         * 滚动到底部加载更多
         * @return {[type]} [description]
         */
        scrollToLoad: function () {
            var that = this;
            $(window).on("scroll", function () {
                var scrollT = $(window).scrollTop();
                var screenH = $(window).height();
                var clientH = $(document).height();
                if ((scrollT + screenH >= clientH) && !that.loadFlag && that.startId != -1) { //上一次加载已结束才能再请求，避免重复请求
                    that.loadFlag = true;
                    that.requireAjax();
                }
            });
        },
        /**
         * 注册Tab点击
         */
        tabSwitch: function () {
            var _this = this;
            $('#bet_tab a').click(function (e) {
                e.preventDefault();//阻止a链接的跳转行为
                $(this).tab('show');//显示当前选中的链接及关联的content
                _this.type = $(this).attr("data-type");
                if (Number(_this.type) > 5) {
                    _this.urlPrefix = appName + "/bet/bb/get";
                } else {
                    _this.urlPrefix = appName + "/bet/fb/get";
                }
                $("#bet_data_wrap").empty();
                _this.start_id = null;
                _this.requireAjax();

            });
        },
        /**
         * 注册时间切换
         */
        timePick: function () {
            var _this = this;
            _this.time_obj = $("#datepicker").dateInit({
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
                    _this.start_time = startTime;
                    _this.end_time = endTime;
                }
            });
        },
        /**
         * 注册条件查询
         */
        searchEvent: function () {
            var _this = this;
            $("#search_bt").on("click", function () {
                _this.long_no = $("#long_no_input").val().trim();
                _this.contest_id = $("#contest_id_input").val().trim();
                if (_this.start_time == "" && _this.end_time == "" && _this.long_no == "" && _this.contest_id == "") {
                    $.gritter.add({
                        title: '必需输入一个条件',
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
                    return;
                }
                //清空原有的数据
                $("#bet_data_wrap").empty();
                _this.start_id = null;
                _this.requireAjax();
            });

            //足球胜平负全部查询
            $("#search_all_bt").on("click", function () {
                $("#bet_data_wrap").empty();
                $("#long_no_input").val("");
                $("#contest_id_input").val("");
                _this.start_id = null;
                _this.long_no = "";
                _this.start_time = "";
                _this.end_time = "";
                _this.contest_id = "";
                _this.requireAjax();
            });
        },
        /**
         * 取消单个下注
         */
        cancleBet: function () {
            var _this = this;
            $('body').delegate('.cancel_bet', 'click', function (e) {
                //当前下注id
                var bet_id = $(this).attr("data-id");
                var bet_type = $(this).attr("data-type");
                var bet_show = "请选择下注类型";
                if (bet_type == "1") {
                    bet_show = "胜平负(足球)";
                } else if (bet_type == "2") {
                    bet_show = "让球胜平负(足球)";
                } else if (bet_type == "3") {
                    bet_show = "大小球(足球)";
                } else if (bet_type == "4") {
                    bet_show = "单双数(足球)";
                } else if (bet_type == "5") {
                    bet_show = "胜负(篮球)";
                } else if (bet_type == "6") {
                    bet_show = "让球胜负(篮球)";
                } else if (bet_type == "7") {
                    bet_show = "大小球(篮球)";
                } else if (bet_type == "8") {
                    bet_show = "单双数(篮球)";
                }

                //弹框填写取消理由
                $("#bet_cancel_type_show").html(bet_show);
                $("#bet_cancel_type").val(bet_type);
                $("#bet_cancel_id").html(bet_id);

                $("#bet_cancel_edit").modal({backdrop: 'static'});

            });

            //取消下注提交
            $("#cancel_bet_edit_button").on("click", function () {
                //获得输入的值
                var bet_type = $("#bet_cancel_type").val();
                var bet_id = $("#bet_cancel_id").html();
                var cancel_bet_reason = $("#cancel_reason").val();

                //异步提交
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/bet/cancle", //修改为需要提交的路径
                    data: {type: bet_type, id: bet_id, reason: cancel_bet_reason},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '取消成功！',
                                time: 2000,
                                class_name: 'gritter-info gritter-light'
                            });
                            //修改状态--走盘#status+id
                            $("#bet_status_" + bet_id).html('<span class="label label-default">走</span>');

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
        }
    }
    bet_list.init();


    var roi ;
    var repair_bet_id;
    var repair_bet_play_type;
    $('#bet_data_wrap').on('click', 'button.btn-warning', function () {
        repair_bet_id = $(this).attr("data-id");
        repair_bet_play_type = $(this).attr("data-type");
        var tmpTr = $(this).closest("tr");
        roi = tmpTr.find("td:eq(2) ul li:eq(1) span:eq(1)").html();

        $("#repair_roi").val(roi);
        $("#modal_repair").modal({backdrop: 'static'});


    });

    $("#repair_submit_bt").on("click",function(){

        var new_roi = $("#repair_roi").val();
        var repair_reason = $("#repair_reason").val();
        var flag = (new_roi > roi) ;

        bootbox.confirm("确定由原来的<b class='green'>"+roi + "</b>赔率修改为<b class='red'>"+new_roi+"</b>?已经结算的比赛，" +
            "如果是返回纯龙筹的，不作处理。返回龙币，需扣除或加上缺失的龙币，够不够扣除都会有提示信息", function (result) {
            if (result) {
                //确认修复
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/bet/repair", //修改为需要提交的路径
                    data: {type: repair_bet_play_type, id: repair_bet_id, reason: repair_reason, roi:new_roi},
                    success: function (data) {

                        if (data.code == 200) {
                            if (data.log.longbi){
                                var msg ;
                                if (flag){
                                    msg = "战绩等记录已经修改成功！给用户增加了"+data.log.back.toFixed(2) + "龙币";
                                } else {
                                    msg = "战绩等记录已经修改成功！给用户扣除了"+data.log.back.toFixed(2) + "龙币";
                                }
                                $.gritter.add({
                                    title: msg,
                                    time: 2000,
                                    class_name: 'gritter-info gritter-light'
                                });
                            } else {
                                $.gritter.add({
                                    title: '纯龙筹下注，不做任务处理',
                                    time: 2000,
                                    class_name: 'gritter-info gritter-light'
                                });
                            }
                            $("#modal_repair").modal("hide");
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
    });

});