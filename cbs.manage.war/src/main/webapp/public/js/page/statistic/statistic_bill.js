define(function(require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/excel/tableExport.js");
    require("../../modules/plugin/excel/jquery.base64.js");
    var moment = require("../../modules/lib/moment.min");
    var dateInit = require("../../modules/lib/datepicker");
    
    var loadFlag = false;
    var start_id = null;
    
    //变量
    var start_date = moment().subtract("days", "14").format('YYYY-MM-DD'); ;
    var limit = 14 ;

    var startTime = moment().subtract("days", "14").format('YYYY-MM-DD');
    var endTime = moment().format('YYYY-MM-DD');
    setDate();
    scrollToLoad();
    function setDate() {
        $("#datepicker").dateInit({
            settings: {
                single: false,
                startDate: startTime,
                endDate: endTime,
                dayLimit: 365,
                maxDate: moment().format('YYYY-MM-DD'),
                timepicker: false,
                dropdown: false
            },
            height: 30,
            defTime: startTime + ' - ' + endTime,
            onPickEnd: function (startTime, endTime) {
                start_date = startTime ;
                limit = parseInt(Math.abs(new Date(endTime)  -  new Date(startTime)) / 1000 / 60 / 60 /24) + 1;
                start_id = null;
				$("#team_table tbody tr").remove();
                getData(); 
            }
        });
    }
    
    $("#source_type").change(function() {
    	 start_id = null;
		$("#team_table tbody tr").remove();
    	getData();  
      });

	  getData();  
    
    function getData(){
    	var source_type = $("#source_type").val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/statistic/bill/data",
            data: {start_time: start_date, limit: limit ,source:source_type,start_id:start_id,num:40},
            success: function (data) {
                if (data.code == 200) {
                	 
                     //显示新的数据
                	 if (data.data.number> 0){             		
                		 $.each(data.data.orders, function (index, order) {
                			 var account_longNo = "未知";
                			 var account_name = "未知";
                			 if(order.hasOwnProperty("account")){
                				 account_longNo = order.account.longNO;
                				 account_name = order.account.name;
                			 }
                			  
                             var htmlStr = showOrderData(account_longNo,account_name,order.payment_type,order.order_id,order.user_id,order.amount,order.order_no,order.paid_time,order.sourceClient);
                             $("#team_table tbody").append(htmlStr);
                             //修改下载链接的值
                             $("#to_excel").attr("href","./excel?"+"source="+source_type+"&start_time="+start_date+"&limit="+limit);
                         });
                		  loadFlag = false; //加载结束
                          start_id = data.data.orders[data.data.orders.length - 1].order_id;
                	 }else{
                		  $.gritter.add({
                              title: '服务器无数据返回！',
                              time:2000,
                              class_name: 'gritter-info gritter-light'
                          }); 
                	 }
                } else {
                    if (data.msg != "") {
                        $.gritter.add({
                            title: "错误code：" + data.code + ",错误信息：" + data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }
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
    
    
    function getExcel(){
    	var source_type = $("#source_type").val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/statistic/bill/excel",
            data: {start_time: start_date, limit: limit ,source:source_type},
            success: function (data) {
                if (data.code == 200) {
                	
                } else {
                    if (data.msg != "") {
                        $.gritter.add({
                            title: "错误code：" + data.code + ",错误信息：" + data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }
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
    
    
    $("#buttonExportData").click(function(){
    	$('#team_table').tableExport({type:'excel', escape:'true'});
    });
    
    
    function showOrderData(longNO,name,payment_type,order_id,user_id,amount,order_no,paid_time,sourceClient){
    	var client = "其他";
    	if(sourceClient == "CBS"){
    		client = "大赢家";
    	}else if(sourceClient== "BEDLONGBI"){
    		client = "床上";
    	}else if(sourceClient== "WEB"){
    		client = "立方网";
    	}
    	
        var htmlStr =
        	"<tr class='list_class'>"+ 
            "<td >"+longNO+"</td>"+
            "<td >"+name+"</td>"+
            "<td>"+payment_type+"</td>"+
            "<td>"+order_id+"</td>"+
            "<td>"+user_id+"</td>"+
            "<td>"+amount+"</td>"+
           "<td>"+order_no+"</td>"+
            "<td>"+moment(new Date(paid_time*1000)).format("YYYY-MM-DD HH:mm:ss")+"</td>"+
            "<td>"+client+"</td>"+
            "</tr>";
            return htmlStr ;
    }
    
    
    /**
     * 滚动到底部加载更多
     * @return {[type]} [description]
     */
     function  scrollToLoad() {
        $(window).on("scroll", function() {
            var scrollT = $(window).scrollTop();
            var screenH = $(window).height();
            var clientH = $(document).height();
            if ((scrollT + screenH + 10 >= clientH) && !loadFlag) { //上一次加载已结束才能再请求，避免重复请求
                loadFlag = true;
                getData();  
            }
        });
    }
    
    
    });