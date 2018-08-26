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
            this.status="";
            this.startTime = this.getURLParam('date') ? this.getURLParam('date') : moment().subtract("months", "1").format('YYYY-MM-DD');
            this.endTime = this.getURLParam('date') ? this.getURLParam('date') : moment().format('YYYY-MM-DD');
            this.type = this.getURLParam('type') ? this.getURLParam('type') : null;
            this.types = '31,32,33,34,38';
             if (this.type == 1) {
                    $("input[name='out'] ").attr("checked", false);
                    this.types = '33,34';
                } else if (this.type == 2) {
                    $("input[name='income'] ").attr("checked", false);
                    this.types = '31,32,38';
             }
            this.setDate();
            this.requireAjax();
            //this.selectChange()
            this.sure();
            this.scrollToLoad();
            this.clickevent1();
            this.clickevent2();
            this.clickevent3();
            this.selectChange();
        },
        clickevent1: function() {
        	$("#missing_log").on("click",function(){
        		var _this = this;
        		_this.status=0;
        		$.ajax({
                    url: appName+"/statistic/money/missing/list",
                    type: 'POST',
                    data: {status:_this.status},
                    success: function(data) {
                        var data = JSON.parse(data)
                        if (data.code == 200) {
                            $("#modal_missing tbody tr").remove();
                            if (data.number > 0) {
                                //加载数据
                                $.each(data.list, function (index, moneyMissed) {
                                    var htmlStr = null;
                                	var id=null;
                                    var userId=null;
                                    var money_type=null;
                                    var money_data=null;
                                    var amount=null;
                                    var detail=null;
                                    var status=null;
                                    var btn="";
                                    id=moneyMissed.id;
                                    userId=moneyMissed.userId;
                                    switch(moneyMissed.money_type){
                                    case 1:
                                    	money_type="足球胜平负结算";
                                    	break;
                                    case 2:
                                    	money_type="足球让球胜平负结算";
                                    	break;
                                    case 4:
                                    	money_type="足球大小球结算";
                                    	break;
                                    case 5:
                                    	money_type="足球单双数结算";
                                    	break;
                                    case 6:
                                    	money_type="篮球胜负结算";
                                    	break;
                                    case 7:
                                    	money_type="篮球让球胜负结算";
                                    	break;
                                    case 9:
                                    	money_type="篮球大小球结算";
                                    	break;
                                    case 10:
                                    	money_type="篮球单双数结算";
                                    	break;
                                    case 11:
                                    	money_type="押押结算";
                                    	break;
                                    case 12:
                                    	money_type="活动串结算";
                                    	break;
                                    case 21:
                                    	money_type="商城订单取消";
                                    	break;
                                    }
                                    switch(moneyMissed.status){
                                    case 0:
                                    	status="未处理"
                                    	btn="<button class='btn btn-xs btn-success fix'>处理</button>&nbsp;" +
                                      		"<button class='btn btn-xs btn-danger ignore'>忽略</button>&nbsp;";
                                    	break;
                                    case 1:
                                    	status="已处理"
                                    	break;
                                    case 2:
                                    	status="放弃处理"
                                    	break;
                                    }
                                    money_data=moneyMissed.money_data;
                                    amount=moneyMissed.amount;
                                    detail=moneyMissed.detail;
                                    var create_time=new Date(moneyMissed.create_time).pattern("yyyy-MM-dd");
                                    htmlStr = "<tr>"
                        				+ "<td class=\"center\">"+ id + "</td>"
                        				+ "<td class=\"center\">"+ userId + "</td>"
                        				+ "<td class=\"center\">"+ money_type + "</td>"
                        				+ "<td class=\"center\">"+ money_data + "</td>"
                        				+ "<td class=\"center\">"+ amount + "</td>"
                        				+ "<td class=\"center\">"+ detail + "</td>"
                        				+ "<td class=\"center\">"+ status + "</td>"
                        				+ "<td class=\"center\">"+ create_time + "</td>"
                        				+"<td class=\"center\">"+btn+"</td>"
                        				+ "</tr>";
                                    $("#modal_missing tbody").append(htmlStr);
                                });
                            } else {
                            	$('#modal_missing').after("<div class='noData'>没有更多数据了</div>");
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
                    }
                })
				$("#modal_missing_log").modal({backdrop: 'static'});
			});
        },
        clickevent2: function() {
        	$('#modal_missing tbody').on('click', 'button.fix', function () {
                var tmpTr = $(this).closest("tr");
                var id =  tmpTr.find("td:eq(0)").html();
                var _repairFlag = true;
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/statistic/money/missing/edit",
                    data:{id:id,repairFlag:_repairFlag},
                    success: function (data) {
                        if (data.code == 200) {
                        	$.gritter.add({
                                title: "操作成功",
                                time: 2000,
                                class_name: 'gritter-success gritter-light'
                            });
                        	location.reload();
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
        },
        clickevent3: function() {
        	$('#modal_missing tbody').on('click', 'button.ignore', function () {
                var tmpTr = $(this).closest("tr");
                var id =  tmpTr.find("td:eq(0)").html();
                var _repairFlag=false;
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/statistic/money/missing/edit",
                    data:{id:id,repairFlag:_repairFlag},
                    success: function (data) {
                        if (data.code == 200) {
                        	$.gritter.add({
                                title: "操作成功",
                                time: 2000,
                                class_name: 'gritter-success gritter-light'
                            });
                        	location.reload();
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
        },
        selectChange:function(){
        	var _this = this;
    		_this.status=0;
            $("#filter").on('change', function() {
                if($("#filter").val()==1){
                	_this.status=null;
                }else{
                    filter=false;
                    _this.status=0;
                }
                $.ajax({
                    url: appName+"/statistic/money/missing/list",
                    type: 'POST',
                    data: {status:_this.status},
                    success: function(data) {
                        var data = JSON.parse(data)
                        if (data.code == 200) {
                            $("#modal_missing tbody tr").remove();
                            if (data.number > 0) {
                                //加载数据
                                $.each(data.list, function (index, moneyMissed) {
                                    var htmlStr = null;
                                	var id=null;
                                    var userId=null;
                                    var money_type=null;
                                    var money_data=null;
                                    var amount=null;
                                    var detail=null;
                                    var status=null;
                                    var btn="";
                                    id=moneyMissed.id;
                                    userId=moneyMissed.userId;
                                    switch(moneyMissed.money_type){
                                    case 1:
                                    	money_type="足球胜平负结算";
                                    	break;
                                    case 2:
                                    	money_type="足球让球胜平负结算";
                                    	break;
                                    case 4:
                                    	money_type="足球大小球结算";
                                    	break;
                                    case 5:
                                    	money_type="足球单双数结算";
                                    	break;
                                    case 6:
                                    	money_type="篮球胜负结算";
                                    	break;
                                    case 7:
                                    	money_type="篮球让球胜负结算";
                                    	break;
                                    case 9:
                                    	money_type="篮球大小球结算";
                                    	break;
                                    case 10:
                                    	money_type="篮球单双数结算";
                                    	break;
                                    case 11:
                                    	money_type="押押结算";
                                    	break;
                                    case 12:
                                    	money_type="活动串结算";
                                    	break;
                                    case 21:
                                    	money_type="商城订单取消";
                                    	break;
                                    }
                                    switch(moneyMissed.status){
                                    case 0:
                                    	status="未处理"
                                    	btn="<button class='btn btn-xs btn-success fix'>处理</button>&nbsp;" +
                                      		"<button class='btn btn-xs btn-danger ignore'>忽略</button>&nbsp;";
                                    	break;
                                    case 1:
                                    	status="已处理"
                                    	break;
                                    case 2:
                                    	status="放弃处理"
                                    	break;
                                    }
                                    money_data=moneyMissed.money_data;
                                    amount=moneyMissed.amount;
                                    detail=moneyMissed.detail;
                                    var create_time=new Date(moneyMissed.create_time).pattern("yyyy-MM-dd");
                                    htmlStr = "<tr>"
                        				+ "<td class=\"center\">"+ id + "</td>"
                        				+ "<td class=\"center\">"+ userId + "</td>"
                        				+ "<td class=\"center\">"+ money_type + "</td>"
                        				+ "<td class=\"center\">"+ money_data + "</td>"
                        				+ "<td class=\"center\">"+ amount + "</td>"
                        				+ "<td class=\"center\">"+ detail + "</td>"
                        				+ "<td class=\"center\">"+ status + "</td>"
                        				+ "<td class=\"center\">"+ create_time + "</td>"
                        				+"<td class=\"center\">"+btn+"</td>"
                        				+ "</tr>";
                                    $("#modal_missing tbody").append(htmlStr);
                                });
                            } else {
                            	$('modal_missing').after("<div class='noData'>没有更多数据了</div>");
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
                    }
                })
			
            });
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
                $('.check').eq($(this).val()-1).removeClass('none').siblings('.check').addClass('none');
            });
        },*/
        /**
         * 选择完毕确定
         */
        sure: function() {
            var _this = this;
            $('.sure').click(function() {
                _this.reset();
                var checks = $("input[type='checkbox']") //.find("input[type='checkbox']");
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
                type: 'GET',
                data: {
                    limit: 20,
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
