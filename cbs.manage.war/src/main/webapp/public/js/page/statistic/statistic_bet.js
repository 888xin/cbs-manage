/**
 * Created by lhx on 15-12-22.
 */
define(function (require) {
    require("../common/common");
    require("../../modules/plugin/jquery.gritter.min");
    var highcharts = require("../../modules/lib/highcharts");
    var moment = require("../../modules/lib/moment.min");
    var dateInit = require("../../modules/lib/datepicker");

    //变量
    var start_date = null ;
    var limit = 14 ;

    var chart_validatestatics ;

    var startTime = moment().subtract("days", "14").format('YYYY-MM-DD');
    var endTime = moment().format('YYYY-MM-DD');
    setDate();
    function setDate() {
        $("#datepicker").dateInit({
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
                start_date = endTime ;
                limit = parseInt(Math.abs(new Date(endTime)  -  new Date(startTime)) / 1000 / 60 / 60 /24) + 1;
                getData($("#stattype").val());
            }
        });
    }

   $("#stattype").change(function() {
             getData($(this).val());     
     });
    //进入页面后马上请求数据
    getData();

    function getData(type){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/statistic/bet/view",
            data: {date: start_date, limit: limit},
            success: function (data) {
                if (data.code == 200) {
                    if(type==0){
                        draw(data, "column");
                    }else{
                        draw(data,"line");
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

function draw(data,type){
      var gragh = {
        chart: {
            renderTo:"graph",
            type: type
        },
        title: {
            text: '下注统计'
        },
        xAxis:{
            categories:data.statistics.categories,
            crosshair: true
        },
        subtitle: {
            text: ''
        },
        yAxis: {
            min: 0,
            title: {
                text: '数量'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:15px">{point.key}</span><table>',
            pointFormat: '<p style="color:{series.color}">{series.name}: {point.y}</p>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series:[
                        {
                            name: '下注数',
                            data: data.statistics.bets

                        },
                        {
                            name: '下注人数',
                            data: data.statistics.people

                        },
                        {
                            name: '胜平负投注数',
                            data: data.statistics.op

                        },
                        {
                            name: '让球胜平负投注数',
                            visible: false,
                            data: data.statistics.jc

                        },
                        {
                            name: '足球投注数',
                            visible: false,
                            data: data.statistics.fb

                        },
                        {
                            name: '篮球投注数',
                            visible: false,
                            data: data.statistics.bb

                        }
                    ],
        credits: {
                       enabled: false
                   }
    }  
    new Highcharts.Chart(gragh)
}




});