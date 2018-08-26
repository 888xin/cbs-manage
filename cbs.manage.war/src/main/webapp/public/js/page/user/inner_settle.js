define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    var moment = require("../../modules/lib/moment.min");
    var dateInit = require("../../modules/lib/datepicker");
    var start=moment().subtract('months',1).format('YYYY-MM-DD');
    var end=moment().format('YYYY-MM-DD');
    
    var now_page=null;
    var loadFlag= false;
    
    if(long_no!=""){
        $("#long_no").val(long_no);
        var astart_time=startTime;
        start=astart_time;
        var aend_time=endTime;
        end=aend_time;
        now_page=null;
        userId=null;
        type=null;
        contestId=null;
        playId=null;
        support=null;
        start_time=start;
        end_time=end;
        getLog(long_no,start_time,end_time,userId,type,contestId,playId,support);
        scrollToLoad();
    }else if(userId!=""){
        long_no=null;
        start_time=null;
        end_time=null;
        getLog(long_no,start_time,end_time,userId,type,contestId,playId,support);
    }else {
        var result=getMonDayAndSunDay(moment().format('YYYY-MM-DD'));
        var start=result[0];
        var end=result[1];
        
        
        
        start_time=start;
        end_time=end;
        
        now_page=null;
        userId=null;
        type=null;
        contestId=null;
        playId=null;
        support=null;
        getLog(long_no,start,end,userId,type,contestId,playId,support);
        scrollToLoad();
    }
    
    
    var start_time;
    var end_time;
    $("#datepicker").dateInit({
        settings: {
            single: false,
            startDate: start,
            endDate:  end,
            dayLimit:366,
            maxDate: moment().add('days',1).format('YYYY-MM-DD'),
            timepicker: false,
            dropdown: false,
        },
        height:30,
        defTime: start + ' - ' + end,
        onPickEnd: function(start, end) {
            start_time=start;
            end_time=end;
        }
    });

    
    //结算记录
    function getLog(long_no,start_time,end_time,userId,type,contestId,playId,support){
        /* if(long_no==""){
            $.gritter.add({
                title: "请输入用户龙号",
                time:2000,
                class_name: 'gritter-error gritter-light'
            });
        }else */{
            if(start_time==""||end_time==""){
                start_time=start;
                end_time=end;
            }
            if(now_page==null||now_page>0){
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/rank/innersettle",
                    data:{long_no:long_no,start_time:start_time,end_time:end_time,userId:userId, type:type,contestId:contestId,playId:playId, support:support,now_page:now_page},
                    success: function (data) {
                        if (data.code == 200) {
                            now_page=data.nowpage;
                            if (data.num > 0){
                                
                                    //加载数据
                                    $.each(data.logList, function (index, settleLog) {
                                        
                                        
                                        var htmlStr =null;
                                        htmlStr = showSettleLog(settleLog.pay_log_id
                                                ,settleLog.id
                                                ,settleLog.long_no
                                                ,settleLog.name
                                                ,settleLog.contest_type
                                                ,settleLog.contest.cup_name
                                                ,settleLog.contest.h_t.name
                                                ,settleLog.contest.h_t.logo
                                                ,settleLog.contest.home_scores
                                                ,settleLog.contest.a_t.name
                                                ,settleLog.contest.a_t.logo
                                                ,settleLog.contest.away_scores
                                                ,settleLog.contest.start_time
                                                ,settleLog.play_id
                                                ,settleLog.support
                                                ,settleLog.longbi
                                                ,settleLog.bet
                                                ,settleLog.odds
                                                ,settleLog.win_gold
                                                ,settleLog.createTime);
                                        
                                        $("#settle_table tbody").append(htmlStr);
                                    });
                                

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
        }
        
    }
        
    
    $("#search_log").on("click",function(){
        var long_no=$("#long_no").val();
        now_page=null;
        userId=null;
        type=null;
        contestId=null;
        playId=null;
        support=null;
        //清空原有的数据
        $("#settle_table tbody tr").remove();
        getLog(long_no,start_time,end_time,null,null,null,null,null);
    })
    
    //加载结算记录
    function showSettleLog(pay_log_id
            ,id
            ,long_no
            ,name
            ,contest_type
            ,cup_name
            ,ht_name
            ,ht_logo
            ,home_scores
            ,at_name
            ,at_logo
            ,away_scores
            ,start_time
            ,play_id
            ,support
            ,longbi
            ,bet
            ,odds
            ,win_gold
            ,createTime){
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
            case 6:
                play_id="胜负";
                break;
            case 7:
                play_id="让球胜负";
                break;
        }
        if(win_gold<0){
            win_gold="<i class='smaller-90 green'>"+win_gold+longbi+"</i>";
            
        }else{
            win_gold="<i class='smaller-90 red'>+"+win_gold+longbi+"</i>";
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
            +"  <p class='versus'>"+home_scores+"："+away_scores+"</p>   </div></div>";
        var userinfo="<p><span class='gray'>龙号：</span>"+long_no+"</p><p><span class='gray'>用户名：</span><span class='name' title='"+name+"'>"+name+"</span></p>";
        var betinfo="<p><span class='gray'>竞猜：</span>"+support+"</p><p><span class='gray'>下注金额：</span>"+bet+longbi+"</p>";
        var endinfo="<p><span class='gray'>赔率：</span>"+odds+"</p><p><span class='gray'>结果：</span>"+win_gold+"</p>";
        start_time=new Date(start_time).pattern("MM-dd HH:mm");
        createTime=new Date(createTime).pattern("MM-dd HH:mm");
        var htmlStr = "<tr>"+
        "<td style='display:none'>"+pay_log_id+"</td>"+
        "<td>"+id+"</td>"+
        "<td>"+"<div class='info'>"+userinfo+"</div>"+"</td>"+
        "<td>"+contest_type+"</td>"+
        "<td>"+vs+"</td>"+
        "<td>"+start_time+"</td>"+
        "<td>"+play_id+"（"+longbi+")</td>"+
        "<td>"+"<div class='info'>"+betinfo+"</div>"+"</td>"+
        "<td class='jiesuan'>"+"<div class='info'>"+endinfo+"</div>"+"</td>"+
        "<td>"+createTime+"</td>"
        if(pay_log_id==""||pay_log_id==null){
            htmlStr+="<td>&nbsp;</td>";
        }else{
            if(longbi=="龙筹"){
                htmlStr+="<td><button class=\"btn btn-xs btn-warning btn-stat btn-gold\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"统计\"><i class=\"icon-bar-chart bigger-150\"></i></button></td>"
            }else{
                htmlStr+="<td><button class=\"btn btn-xs btn-danger btn-stat btn-money\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"统计\"><i class=\"icon-bar-chart bigger-150\"></i></button></td>"
            }
            
        }
        htmlStr+="</tr>";
        ;
        return htmlStr ;
    }   
    
    //跳转至龙筹明细页面
    $('#settle_table tbody').on('click', 'button.btn-gold', function () {
        var tmpTr = $(this).closest("tr");
        var log_id =  tmpTr.find("td:eq(0)").html();
        window.location.href=appName+"/statistic/gold/detail?log_id="+log_id; 
    });    
    //跳转至龙币明细页面
    $('#settle_table tbody').on('click', 'button.btn-money', function () {
        var tmpTr = $(this).closest("tr");
        var log_id =  tmpTr.find("td:eq(0)").html();
        window.location.href=appName+"/statistic/money/detail?log_id="+log_id;
    });
    
    function scrollToLoad() {
        $(window).on("scroll", function() {
            var scrollT = $(window).scrollTop();
            var screenH = $(window).height();
            var clientH = $(document).height();
            if ((scrollT + screenH + 10 >= clientH) && !loadFlag) { //上一次加载已结束才能再请求，避免重复请求
                loadFlag = true;
                var long_no=$("#long_no").val();
                getLog(long_no,start_time,end_time,null,null,null,null,null);
            }
        });
    };
    
    
    /** 
     * 获取日期所在周的周一和周日
     * @param 页面日期控件取得的日期（yyyy-mm-dd） 
     * @author rockjava 
     * @date 2008-12-23 
     * */  
    function getMonDayAndSunDay(datevalue){  
        var dateValue = datevalue; 
        var arr = dateValue.split("-")  
        //月份-1 因为月份从0开始 构造一个Date对象  
        var date = new Date(arr[0],arr[1]-1,arr[2]);  
      
        var dateOfWeek = date.getDay();//返回当前日期的在当前周的某一天（0～6--周日到周一）  
      
        var dateOfWeekInt = parseInt(dateOfWeek,10);//转换为整型  
      
        if(dateOfWeekInt==0){//如果是周日  
            dateOfWeekInt=7;  
        }  
        var aa = 7-dateOfWeekInt;//当前于周末相差的天数  
      
        var temp2 = parseInt(arr[2],10);//按10进制转换，以免遇到08和09的时候转换成0  
        var sunDay = temp2+aa;//当前日期的周日的日期  
        var monDay = sunDay-6//当前日期的周一的日期  
      
        var startDate = new Date(arr[0],arr[1]-1,monDay);  
        var endDate = new Date(arr[0],arr[1]-1,sunDay);  
      
        var sm = parseInt(startDate.getMonth())+1;//月份+1 因为月份从0开始  
        var em = parseInt(endDate.getMonth())+1;  
      
        var start = startDate.getFullYear()+"-"+sm+"-"+startDate.getDate();  //用getYear()会出现显示的年份为115的情况
        var end = endDate.getFullYear()+"-"+em+"-"+endDate.getDate();  
        var result = new Array();  
        result.push(start);  
        result.push(end);  
          
        return result;  
    }  
}); 