define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    var moment = require("../../modules/lib/moment.min");
    
    var startId=null;

    getLog(startId);

    
    //未结算记录
    function getLog(startId){
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/fircirsettle/list",
                    data:{startId:startId},
                    success: function (data) {
                        if (data.code == 200) {
                            if (data.num > 0){

                                    //加载数据
                                    $.each(data.list, function (index, settle) {
                                        var htmlStr =null;
                                        htmlStr = showSettleLog(settle.friend_circle_id
                                                ,settle.user.user_id
                                                ,settle.user.long_no
                                                ,settle.user.name
                                                ,settle.contest_type
                                                ,settle.params
                                                ,settle.create_time);
                                        
                                        $("#settle_table tbody").append(htmlStr);
                                    });
                                    startId=data.startId;

                            } else {
                                $.gritter.add({
                                    title: '无数据！',
                                    time:2000,
                                    class_name: 'gritter-info gritter-light'
                                });
                            }
                            loadFlag = false;
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
    
    //加载结算记录
    function showSettleLog(friend_circle_id
        ,user_id
        ,long_no
        ,name
        ,contest_type
        ,params
        ,create_time){
        var bet=JSON.parse(params).bet;
        var support=bet.support;
        var longbi=bet.isLongbi;
        var play_id=bet.playId;
        var ht_logo=bet.hl;
        var ht_name=bet.hn;
        var at_logo=bet.al;
        var at_name=bet.an;
        var cup_name=bet.cName;
        var betMoney=bet.bet;
        var start_time=bet.time;
        if(contest_type==0){
            contest_type="足球";
        }
        if(contest_type==1){
            contest_type="篮球";
        }
        if(support==0){
            support="主队胜";
        }
        if(support==1){
            support="客队胜";
        }
        if(support==2){
            support="平局";
        }
        if(longbi){
            longbi="龙币";
        }
        if(!longbi){
            longbi="龙筹";
        }
        switch(play_id){
            case 1:
                play_id="胜平负";
                break;
            case 2:
                play_id="让球胜平负";
                break;
            case 4:
            	play_id="大小球";
            	break;
            case 5:
            	play_id="单双数";
            	break;
            case 6:
                play_id="胜负";
                break;
            case 7:
                play_id="让球胜负";
                break;
            case 9:
            	play_id="大小球";
            	break;
            case 10:
            	play_id="单双数";
            	break;
        }
        var vs = "        <div class='result_contest'>"
            +"<div class='team team_host'>"
            +"  <img src='http://ls.betradar.com/ls/crest/big/"+ht_logo+"'>"
            +"  <p>"+ht_name+"</p>"
            +"</div>"
            +"<div class='team team_away'>"
            +"  <img src='http://ls.betradar.com/ls/crest/big/"+at_logo+"'>"
            +"  <p>"+at_name+"</p>"
            +"</div>"
            +"<div class='contest_info'>"
            +"  <p>"+cup_name+"</p>"
        var userinfo="<p><span class='gray'>用户id：</span>"+user_id+"<p><span class='gray'>龙号：</span>"+long_no+"</p><p><span class='gray'>用户名：</span><span class='name' title='"+name+"'>"+name+"</span></p>";
        var betinfo="<p><span class='gray'>竞猜：</span>"+support+"</p><p><span class='gray'>下注金额：</span>"+betMoney+longbi+"</p>";
        start_time=new Date(start_time).pattern("MM-dd HH:mm");
        createTime=new Date(create_time).pattern("MM-dd HH:mm");
        var htmlStr = "<tr>"+
        "<td>"+friend_circle_id+"</td>"+
        "<td>"+"<div class='info'>"+userinfo+"</div>"+"</td>"+
        "<td>"+contest_type+"</td>"+
        "<td>"+vs+"</td>"+
        "<td>"+start_time+"</td>"+
        "<td>"+play_id+"（"+longbi+")</td>"+
        "<td>"+"<div class='info'>"+betinfo+"</div>"+"</td>"+
        "<td>"+createTime+"</td>"+
        "<td><button class=\"btn btn-xs btn-info btn-stat btn-settle\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"结算\"><i class=\"icon-edit bigger-150\"></i></button></td>"+
        "</tr>";
        return htmlStr ;
    }   
    
    //处理
    $('#settle_table tbody').on('click', 'button.btn-settle', function () {
        var tmpTr = $(this).closest("tr");
        var circleIds =  tmpTr.find("td:eq(0)").html();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName+"/fircirsettle/init",
            data:{circleIds:circleIds},
            success: function (data) {
                if (data.code == 200) {
                	$.gritter.add({
                        title: "操作成功",
                        time: 2000,
                        class_name: 'gritter-success gritter-light'
                    });
                	$("#settle_table tbody tr").remove();
                	startId=null;
                    getLog(startId);
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
    
    
    
    function scrollToLoad() {
        $(window).on("scroll", function() {
            var scrollT = $(window).scrollTop();
            var screenH = $(window).height();
            var clientH = $(document).height();
            if ((scrollT + screenH + 10 >= clientH) && !loadFlag) { //上一次加载已结束才能再请求，避免重复请求
                loadFlag = true;
                getLog(startId);
            }
        });
    };
    
    
}); 