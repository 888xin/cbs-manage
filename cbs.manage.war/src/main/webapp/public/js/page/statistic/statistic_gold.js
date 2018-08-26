define(function(require, exports, module) {
  require("../common/common");
    var highcharts = require("../../modules/lib/highcharts");
    var moment = require("../../modules/lib/moment.min");
    var dateInit = require("../../modules/lib/datepicker");
     var statistic = {
       init: function() {
           this.url="./gold/statistic";
           this.startTime = moment().subtract("months", "1").format('YYYY-MM-DD');
           this.endTime = moment().format('YYYY-MM-DD');
           this.getData(this.startTime, this.endTime);
           this.clickChange();
           this.setDate();
       },
       setDate: function() {
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
               onPickEnd: function(startTime, endTime) {
                   _this.startTime = startTime;
                   _this.endTime = endTime;
                   _this.getData(startTime, endTime);
               }
           });
       },
       getData: function(start, end) {
           var _this = this;
           var xData = [];
           var ywinning = [];
           $.ajax({
               type: "post",
               url: _this.url,
               data: {
                   start_time: start,
                   end_time: end
               },
               success: function(res) {
                res=JSON.parse(res)
                if(res.code==200){
                  var xData=res.data.time_range;
                  yincome=res.data.all_income;
                  youtlay=res.data.all_outlay;
                  var title,href;
                  if($("#stattype").val()==0){
                    title='龙筹收支';
                    href='./gold/detail';
                  }else{
                    title='龙币收支';
                    href='./money/detail';
                  }
                  _this.draw($('#gold'),title,'元',xData,[{name:'收入',data:yincome},{name:'支出',data:youtlay}],href)
                }
               }
           });
       },
      clickChange: function() {
        var _this=this;
           $("#stattype").change(function() {
            if($(this).val()==0){
            _this.url="./gold/statistic";
            }else{
            _this.url="./money/statistic";
            }  
             _this.getData(_this.startTime, _this.endTime);     
           });
       },
       draw: function(nodeId, type, unit,  xData, yData,href) {
           if (xData.length > 0) {
               var chart = {
                   plotOptions: { 
                        series: { 
                            cursor: 'pointer', 
                            events: { 
                                click: function(e) { 
                                    var type;
                                    if(this.name=="收入"){
                                      type=1
                                    }else if(this.name="支出"){
                                      type=2
                                    }
                                    window.location.href=href+'?type='+type+'&date='+e.point.category
                                } 
                            } 
                        } 
                    }, 
                    title: {
                       text: type + '统计图',
                       style: {
                           color: '#666',
                           fontSize: "16px"
                       }
                   },
                   xAxis: {
                       categories: xData
                   },
                   yAxis: {
                       allowDecimals: false,
                       lineWidth: 1,
                       min: 0,
                       title: {
                           text: type + '(' + unit + ')',
                           align: 'high',
                           offset: -10,
                           rotation: 0,
                           y: -15
                       }
                   },
                   tooltip: {
                       valueSuffix: unit
                   },
                   legend: {

                   },
                   series: yData,
                   credits: {
                       enabled: false
                   }
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
       }
   };
   statistic.init();
})
