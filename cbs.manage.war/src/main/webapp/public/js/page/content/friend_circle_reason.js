/**
 * Created by lhx on 16-5-3.
 */
/**
 * Created by Lhx on 15-12-03.
 */
define(function (require) {
    require("../common/common");
    require("../../modules/plugin/jquery.dataTables.bootstrap");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/bootbox.min");


    //常量设置
    var xin_start = null;
    var xin_end = null;
    var content_status = null;
    var frontpage_content_type = 1;
    var head_url = "http://proxy.dev.xy.l99.com/image.php?type=avatar90&ifile=";
    var content_image = "http://roi.skst.cn/";
    var upload_photos = "";
    var order_display_num = 0;
    var friend_id;


    var frontpages_content_table = $('#friend_circle_reason_table').dataTable({
        "bAutoWidth": false,
        "bProcessing": false,
        "bServerSide": true,
        "bStateSave": false, //是否保存cookie数据
        "bFilter": false,
        "bLengthChange": false, //改变每页显示数据数量
        'iDisplayLength': 40,//每页显示个数
        "sAjaxDataProp": "friendCircles",
        "sAjaxSource": appName + '/friend/circle/reason/list',
        "fnServerParams": function (aoData) {  //查询条件
            aoData.push(
                { "name": "previous", "value": xin_previous },
                { "name": "next", "value": xin_next },
                { "name": "endId", "value": xin_start },
                { "name": "startId", "value": xin_end },
                { "name": "status", "value": content_status },
                { "name": "type", "value": frontpage_content_type },
                { "name": "skip", "value": xin_skip }
            );
        },
        "oLanguage": {
            "sProcessing": "正在加载中......",
            //"sSearch": '&nbsp;&nbsp;&nbsp;<span class="label label-lg label-info">搜索：</span>',
            "sLengthMenu": '每页显示条数 _MENU_ ' ,
            "sZeroRecords": "没有数据！",
            "sEmptyTable": "表中无数据存在！",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoEmpty": "显示0到0条记录",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "末页"
            }
        },
        "aoColumnDefs": [
            {
                sDefaultContent: '',
                aTargets: [ '_all' ]
            }
        ],
        "aoColumns": [
            {
                "mDataProp": "",
                "bSortable": false,
                "sClass": "center",
                "fnRender": function (obj) {
                    var id = obj.aData.friend_circle_id ;
                    if (order_display_num == 0) {
                        xin_end = id;
                    }
                    xin_start = id;
                    order_display_num++;
                    return id ;
                }
            },
            {

                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    var name = obj.aData.user.name;
                    if (name.length > 6) {
                        name = name.substring(0, 5) + "...";
                    }
                    return "<p>龙号：" + obj.aData.user.long_no + "</p><p>用户：" + name + "</p>";
                }
            },
            {
                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    var content_html = "";
                    var image_html01 = "";
                    var image_html02 = "";
                    var image_html03 = "";
                    var image_html04 = "";
                    var image_html05 = "";
                    var image_html06 = "";
                    if (obj.aData.params){
                        var params = JSON.parse(obj.aData.params);
                        if (params.images) {
                            var imageArray = params.images.split(",");
                            image_html01 = "<img width='80' height='45' class=\"nav-user-photo\" src='" + content_image + imageArray[0] + "'/>&nbsp;&nbsp;";
                            if (imageArray[1]) {
                                image_html02 = "<img width='80' height='45' class=\"nav-user-photo\" src='" + content_image + imageArray[1] + "'/>&nbsp;&nbsp;";
                            }
                            if (imageArray[2]) {
                                image_html03 = "<img width='80' height='45' class=\"nav-user-photo\" src='" + content_image + imageArray[2] + "'/>&nbsp;&nbsp;";
                            }
                            if (imageArray[3]) {
                                image_html04 = "<img width='80' height='45' class=\"nav-user-photo\" src='" + content_image + imageArray[3] + "'/>&nbsp;&nbsp;";
                            }
                            if (imageArray[4]) {
                                image_html05 = "<img width='80' height='45' class=\"nav-user-photo\" src='" + content_image + imageArray[4] + "'/>&nbsp;&nbsp;";
                            }
                            if (imageArray[5]) {
                                image_html06 = "<img width='80' height='45' class=\"nav-user-photo\" src='" + content_image + imageArray[5] + "'/>&nbsp;&nbsp;";
                            }
                        }
                    }
                    var image_html = image_html01 + image_html02 +image_html03 + image_html04 + image_html05 + image_html06;

                    var content = obj.aData.content;
                    if (content) {
                        if (content.length > 50){
                            while(content.length > 0){
                                content_html += content.substring(0,50) + " ";
                                content = content.substr(50);
                            }
                        } else {
                            content_html = content;
                        }
                    }

                    return  image_html + content_html;

                    if (obj.aData.content) {
                        return obj.aData.content;
                    } else {
                        return "无";
                    }
                }
            },
            {
                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    if (obj.aData.contest_type == 0) {
                        return "<label class='label label-sm label-success arrowed arrowed-right'>足球</label>";
                    } else if (obj.aData.contest_type == 1) {
                        return "<label class='label label-sm label-primary arrowed arrowed-right'>篮球</label>";
                    } else if (obj.aData.contest_type == 10) {
                        return "<label class='label label-sm label-warning arrowed arrowed-right'>押押</label>";
                    } else {
                        return "<label class='label label-sm label-inverse arrowed arrowed-right'>未知</label>";
                    }
                }
            },
            {
                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {

                    if (obj.aData.params) {
                        var bet = JSON.parse(obj.aData.params).bet;
                        if (obj.aData.type == 10) {
                            return bet.title;
                        }
                        var vs = "<div class='result_contest'>"
                            + "<div class='team team_host'>"
                            + "<img src='http://ls.betradar.com/ls/crest/big/" + bet.hl + "'>"
                            + "<p>" + bet.hn + "</p>"
                            + "</div>"
                            + "<div class='team team_away'>"
                            + "<img src='http://ls.betradar.com/ls/crest/big/" + bet.al + "'>"
                            + "<p>" + bet.an + "</p>"
                            + "</div>"
                            + "<div class='contest_info'>"
                            + "<p>" + bet.cName + "</p>";
                        return vs;
                    }

                }
            },
            {
                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    var object = JSON.parse(obj.aData.params);
                    var bet = object.bet;
                    var support_html = "";
                    var odds_html = "";

                    if (bet.support == 0) {
                        support_html = "主队胜";
                        odds_html = bet.r1;

                    }
                    if (bet.support == 1) {
                        support_html = "客队胜";
                        odds_html = bet.r3;
                    }
                    if (bet.support == 2) {
                        support_html = "平局";
                        odds_html = bet.r2;
                    }
                    if (obj.aData.type == 10) {
                        support_html = "第" + bet.support + "选项";
                        odds_html = bet.roi;
                    }
                    var play_html = "";
                    if (bet.playId == 1 || bet.playId == 6) {
                        play_html = "胜负";
                    } else if (bet.playId == 2 || bet.playId == 7) {
                        play_html = "让球";
                    } else if (bet.playId == 4 || bet.playId == 9) {
                        play_html = "大小球";
                    } else if (bet.playId == 5 || bet.playId == 10) {
                        play_html = "大双数";
                    } else {
                        play_html = "押押";
                    }
                    var bet_html = "";
                    if (bet.isLongbi) {
                        if (obj.aData.coupon > 0) {
                            bet_html = "<i class='smaller-90 green'> " + obj.aData.coupon + "龙筹</i> <i class='smaller-90 red'>" + (bet.bet - obj.aData.coupon) + "龙币</i>";
                        } else {
                            bet_html = "<i class='smaller-90 red'>" + bet.bet + "龙币</i>";
                        }
                    } else {
                        bet_html = "<i class='smaller-90 green'> " + bet.bet + "龙筹</i>";
                    }
                    return "<p>竞猜：" + support_html + "</p><p>玩法：" + play_html + "</p><p>赔率：" + odds_html + "</p><p>" + bet_html + "</p>";
                }
            },
            {
                "sClass": "center",
                "bSortable": false,
                "fnRender": function (obj) {
                    return new Date(obj.aData.create_time).pattern("MM-dd HH:mm");
                }
            },
            {
                "bSortable": false,
                "sClass": "center",
                "fnRender": function (obj) {
                    return "<button class='btn btn-minier btn-warning' id='recommend" + obj.aData.friend_circle_id + "'>推荐到头版</button>";
                }
            }
        ],
        fnDrawCallback: function () {
            xin_next = false;
            xin_previous = false;
            order_display_num = 0;
            xin_skip = 0;
        }
    }).on('click', 'button.btn-warning', function () {

        //推荐
        var tmp = $(this);
        friend_id = tmp.attr("id").substring(9);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/friend/circle/reason/add",
            data: {id: friend_id},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "推荐成功",
                        time: 2000,
                        class_name: 'gritter-success gritter-center gritter-light'
                    });
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
    });



});
