define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    var moment = require("../../modules/lib/moment.min");
    var dateInit = require("../../modules/lib/datepicker");
    var record = {
        init: function() {
            this.url = './detail/log';
            this.date = this.getURLParam('date') ? this.getURLParam('date') : moment().format('YYYY-MM-DD');
            this.log_id = this.getURLParam('log_id') ? this.getURLParam('log_id') : null;
            this.types = '';
            this.longNo = '';
            this.loadFlag = false;
            this.loadAll = false;
            this.start_id = null;
            this.startTime = moment().subtract("months", "1").format('YYYY-MM-DD');
            this.endTime = moment().format('YYYY-MM-DD');
            this.type = this.getURLParam('type') ? this.getURLParam('type') : null;
            this.types = '1,3,5,6,8';
            if (this.type == 1) {
                $("input[name='out'] ").attr("checked", false);
                this.types = '3,6';
            } else if (this.type == 2) {
                $("input[name='income'] ").attr("checked", false);
                this.types = '1,5,8';
            }
            //$('.check').eq(this.type - 1).removeClass('none').siblings('.check').addClass('none');
            this.setDate();
            this.requireAjax();
            //this.selectChange()
            this.sure();
            this.scrollToLoad();
        },
        reset: function() {
            this.loadFlag = false;
            this.loadAll = false;
            this.start_id = null;
            this.log_id = null;
            $('.tbody').html('');
            $('.noData').remove();
        },
        setDate: function() {
            var _this = this;
            $("#datepicker").dateInit({
                settings: {
                    single: false,
                    startDate: this.startTime,
                    endDate: this.endTime,
                    dayLimit: 31,
                    maxDate: moment().add("days", 1).format('YYYY-MM-DD'),
                    timepicker: false,
                    dropdown: false,
                },
                defTime: this.startTime + ' - ' + this.endTime,
                onPickEnd: function(startTime, endTime) {
                    _this.startTime = startTime;
                    _this.endTime = endTime;
                }
            });
        },
        /**
         * 点击切换收入支出
         */
        /*selectChange: function() {
            var _this = this;
            $('.sel').change(function() {
                $('.check').eq($(this).val() - 1).removeClass('none').siblings('.check').addClass('none');
            });
        },*/
        /**
         * 选择完毕确定
         */
        sure: function() {
            var _this = this;
            $('.sure').click(function() {
                _this.reset();
                var checks = $("input[type='checkbox']"); //.find("input[type='checkbox']");
                var types = [];
                var longNo = $.trim($("#user_long_no").val());
                checks.each(function() {
                    if ($(this).prop("checked")) {
                        types.push($(this).val());
                    }
                })
                _this.types = types.join(',');
                if (longNo.length > 0) {
                    if (isNaN(longNo)) {
                        alert("请输入合法的龙号");
                    } else {
                        _this.longNo = longNo;
                        _this.requireAjax();
                    }
                } else {
                    _this.longNo = longNo;
                    _this.requireAjax();
                }
            })
        },
        /**
         * 请求详情数据
         */
        requireAjax: function() {
            var url = this.url;
            var _this = this;
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    limit: 20,
                    time: _this.date,
                    start_time: _this.startTime + " 00:00:00",
                    end_time: _this.endTime + " 23:59:59",
                    types: _this.types,
                    start_id: _this.start_id,
                    long_no: _this.longNo,
                    log_id: _this.log_id
                },
                success: function(res) {
                    var res = JSON.parse(res)
                    if (res.code == 200) {
                        var log = res.data.gold_logs
                        if (log.length == 0) {
                            $('.table').after("<div class='noData'>没有更多数据了</div>");
                            _this.loadAll = true;
                        } else {
                            $.each(log, function(index, val) {
                                var html = [];
                                html.push("<tr><td>" + val.log_id + " </td>");
                                if (val.user) {
                                    html.push("<td>" + val.user.name + "   （龙号："+val.user.long_no+"） </td>");
                                } else {
                                    html.push("<td>noName</td>");
                                }
                                html.push("<td><strong>￥" + val.money + "</strong></td>");
                                html.push("<td>" + val.content + " </td>");
                                html.push("<td>" + moment(val.log_time).format('MM-DD HH:mm') + " </td>");
                                html.push("<td>" + val.ip_address + " </td></tr>");
                                html = html.join('');
                                $('.tbody').append(html);
                            });
                            _this.loadFlag = false; //加载结束
                            _this.start_id = log[log.length - 1].log_id;
                        }
                    } else {
                        $.gritter.add({
                            title: "出现" + res.code + "异常",
                            time: 2000,
                            class_name: 'gritter-error gritter-light'
                        });
                        if (res.msg != "") {
                            $.gritter.add({
                                title: res.msg,
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
                }
            })
        },
        /**
         * 滚动到底部加载更多
         * @return {[type]} [description]
         */
        scrollToLoad: function() {
            var that = this;
            $(window).on("scroll", function() {
                var scrollT = $(window).scrollTop();
                var screenH = $(window).height();
                var clientH = $(document).height();
                if ((scrollT + screenH + 10 >= clientH) && !that.loadFlag && !that.loadAll) { //上一次加载已结束才能再请求，避免重复请求
                    var _this = that;
                    _this.loadFlag = true;
                    _this.requireAjax();
                }
            });
        },
        getURLParam: function(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
        },
    };
    record.init();
})
