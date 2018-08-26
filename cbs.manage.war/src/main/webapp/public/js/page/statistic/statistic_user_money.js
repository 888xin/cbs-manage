/**
 * Created by lhx on 16-4-13.
 */
define(function (require) {
    require("../common/common");
    require("../../modules/plugin/datepicker.zh-CN.js");

    //变量
    var date ;
    var type ;
    var order ;
    var head_url = "http://proxy.dev.xy.l99.com/image.php?type=avatar90&ifile=";
    var filter= "";


    $("#filter").on('change', function() {
        if($("#filter").val()==1){
            filter=true;
            getData();
        }else{
            filter=false;
            getData();
        }
    });

    $('#date_search').datepicker({
        showOtherMonths: true,
        selectOtherMonths: false,
        onSelect: function(dateText){
            date = dateText.substr(2) ;
            getData();
        }
    });
    $('#date_search').datepicker('option', {dateFormat: "yymmdd" }).val('今日');



    getData();


    function getData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/statistic/user/money/get",
            data: {
                date: date,
                type: type,
                order: order,
                filter:filter
            },
            success: function (data) {
                if (data.code == 200) {
                    $("#user_money_statistic_table tbody tr").remove();
                    if (data.user_money.length > 0) {
                        var income = 0 ;
                        var outlay = 0 ;
                        var system_income = 0 ;
                        var system_outlay = 0 ;
                        //加载数据
                        $.each(data.user_money, function (index, money) {
                            if (money.user){
                                income += money.income;
                                outlay += money.outlay;
                                system_income += money.system_income;
                                system_outlay += money.system_outlay;
                                var htmlStr = showData(money.user.user_id,money.user.long_no,money.user.name,money.user.head,money.income,money.outlay,money.system_income,money.system_outlay,index);
                                $("#user_money_statistic_table tbody").append(htmlStr);
                            }
                        });
                        var htmlStr = '<tr><td colspan="5" class="center"><b>官方统计</b></td><td class="center"><label class="bigger-120 red">'+income.toFixed(2)+'</label></td>' +
                            '<td class="center"><label class="bigger-120 green">'+outlay.toFixed(2)+'</label></td><td class="center"><label class="bigger-120 red">'+system_income.toFixed(2)+'</label></td>' +
                            '<td class="center"><label class="bigger-120 green">'+system_outlay.toFixed(2)+'</label></td></tr>';
                        $("#user_money_statistic_table tbody").prepend(htmlStr);
                    } else {
                        $.bootstrapGrowl('服务器无数据返回！',{
                            type: 'success' // (null, 'info', 'error', 'success')
                        });
                    }
                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl("错误code：" + data.code + ",错误信息：" + data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错："+XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }

        });
    }

    function showData(user_id,long_no,name,head,income,outlay,system_income,system_outlay,index){
        head = '<img width="40" height="40" class="nav-user-photo" src="' + head_url + head + '" />' ;
        income = '<label class="red">'+income.toFixed(2)+'</label>';
        outlay = '<label class="green">'+outlay.toFixed(2)+'</label>';
        system_income = '<label class="red">'+system_income.toFixed(2)+'</label>';
        system_outlay = '<label class="green">'+system_outlay.toFixed(2)+'</label>';
        var html = '<tr>\
            <td class="center">' + (index+1) + '</td>\
            <td class="center">' + user_id + '</td>\
            <td class="center">' + long_no + '</td>\
            <td class="center">' + name + '</td>\
            <td class="center">' + head + '</td>\
            <td class="center">' + income + '</td>\
            <td class="center">' + outlay + '</td>\
            <td class="center">' + system_income + '</td>\
            <td class="center">' + system_outlay + '</td></tr>';
        return html;
    }

    $("#money_income_down_a").on("click",function(e){
        e.preventDefault();
        order = 0 ;
        $("#money_income_down").removeClass("invisible");
        $("#money_income_up").addClass("invisible");
        $("#money_out_down").addClass("invisible");
        $("#money_out_up").addClass("invisible");
        getData();
    });

    $("#money_income_up_a").on("click",function(e){
        e.preventDefault();
        order = 1 ;
        $("#money_income_down").addClass("invisible");
        $("#money_income_up").removeClass("invisible");
        $("#money_out_down").addClass("invisible");
        $("#money_out_up").addClass("invisible");
        getData();
    });

    $("#money_out_down_a").on("click",function(e){
        e.preventDefault();
        order = 2 ;
        $("#money_income_down").addClass("invisible");
        $("#money_income_up").addClass("invisible");
        $("#money_out_down").removeClass("invisible");
        $("#money_out_up").addClass("invisible");
        getData();
    });

    $("#money_out_up_a").on("click",function(e){
        e.preventDefault();
        order = 3 ;
        $("#money_income_down").addClass("invisible");
        $("#money_income_up").addClass("invisible");
        $("#money_out_down").addClass("invisible");
        $("#money_out_up").removeClass("invisible");
        getData();
    });
});