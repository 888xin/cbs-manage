/**
 * Created by lhx on 16-2-3.
 */
define(function (require) {
    require("../common/common");
    require("../../modules/plugin/jquery.bootstrap-growl.min");



    //变量


    var head_url = "http://proxy.dev.xy.l99.com/image.php?type=avatar90&ifile=";
    //押押下注start_id
    var start_id_bet;


    /**
     * ============================================
     * 押押下注记录
     */

    function getBetData() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/event/yy/bet/list",
            data: {id: yy_bet_id, startId: start_id_bet},
            success: function (data) {
                if (data.code == 200) {
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.bets, function (index, bet) {
                        	var openId="";
                        	var source ="";
                        	if(bet.userWx){
                        		openId= bet.userWx.open_id;
                        		source =bet.userWx.source
                        	}
                            var htmlStr = showBetData(bet.id,bet.user.head,bet.user.name,bet.user.long_no,bet.support,
                                bet.yy_roi,bet.status,bet.bet,bet.create_time,bet.is_longbi,bet.coupon,bet.back,openId,source);
                            $("#yy_bet_table tbody").append(htmlStr);
                            start_id_bet = bet.id ;
                        });
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

    function showBetData(bet_id,head,name,long_no,support,yy_roi,status,bet,create_time,is_longbi,coupon,back,openId,source){
        switch (support){
            case 1:
                support = "A选项";
                break ;
            case 2:
                support = "B选项";
                break ;
            case 3:
                support = "C选项";
                break ;
            case 4:
                support = "D选项";
                break ;
            case 5:
                support = "E选项";
                break ;
            case 6:
                support = "F选项";
                break ;
            case 7:
                support = "G选项";
                break ;
            case 8:
                support = "H选项";
                break ;
            case 9:
                support = "I选项";
                break ;
            case 10:
                support = "J选项";
                break ;
            case 11:
                support = "K选项";
                break ;
            case 12:
                support = "L选项";
                break ;

        }
        var back_html = "";
        if (is_longbi){
            if (coupon > 0){
                bet = '<b class="light-red">龙筹：'+coupon+'</b>&nbsp;<b class="orange2">龙币：'+(bet - coupon)+'</b>';
            } else {
                bet = '<b class="orange2">龙币：'+ bet +'</b>';
            }
            back_html = '<b class="orange2">龙币：'+ 0 +'</b>';
        } else {
            bet = '<b class="light-red">龙筹：'+ bet +'</b>';
            back_html = '<b class="light-red">龙筹：'+ 0 +'</b>';
        }
        if (status == 0){
            status = '<span class="label label-sm label-default">未开奖</span>';
        } else if (status == 1){
            status = '<span class="label label-sm label-success">赢</span>';
            if (is_longbi){
                back_html = '<b class="orange2">龙币：'+ back +'</b>';
            } else {
                back_html = '<b class="light-red">龙筹：'+ back +'</b>';
            }
        } else if (status == 2){
            status = '<span class="label label-sm label-danger">输</span>';
        } else if (status == -1){
            status = '<span class="label label-sm label-warning">走</span>';
            back_html = bet ;
        }
        if (create_time){
            create_time = new Date(create_time).pattern("yyyy-MM-dd HH:mm:ss");
        } else {
            create_time = "无";
        }
        
        var openId_html="无";
        if(openId){
        	openId_html = openId;
        } 
        var source_html="无";
        if(source){
        	source_html = source;
        } 
        
        var html = '<tr>\
            <td class="center">' + bet_id + '</td>\
            <td class="center"><img width="60" height="60" src="' + head_url + head + '"></td>\
            <td class="center">' + name + '</td>\
            <td class="center">' + long_no + '</td>\
            <td class="center">' + support + '</td>\
            <td class="center">' + bet + '</td>\
            <td class="center">' + back_html + '</td>\
            <td class="center">' + yy_roi + '</td>\
            <td class="center">' + create_time + '</td>\
            <td class="center">' + openId_html + '</td>\
            <td class="center">' + source_html + '</td>\
            <td class="center">' + status + '</td>\
            </tr>';
        return html;
    }

    if (yy_bet_id){
        getBetData();
    }

    //加载更多
    $("#yy_bet_data_more").on("click",function(){
        getBetData();
    });

    //具体查询
    $("#bet_search_a").on("click",function(){
        var search_value = $("#bet_search").val().trim();
        if (isNaN(search_value)){
            $.bootstrapGrowl("请输入搜索的押押赛事ID");
            return ;
        }
        yy_bet_id = search_value ;
        start_id_bet = null ;
        $("#yy_bet_table tbody tr").remove();
        getBetData();

    })

});