/**
 * Created by lhx on 16-5-25.
 */
define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/datepicker.zh-CN.js");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/jquery.hotkeys.min");
    require("../../modules/plugin/bootstrap-wysiwyg.min");
    require("../../modules/plugin/bootstrap-select.min.js");


    //常量
    var start_id ;
    var status ;
    var upload_photo ;
    var upload_edit_photo ;
    var bunch_id ;
    var image_pre = "http://roi.skst.cn/";


    $("#bunch_contest_more_bn").on("click",function(){
        $("#bunch_contest_add_div").append('<div class="form-group">\
            <input type="text" class="input-sm" placeholder="赛事ID"/>\
            <select name="bunch_contest_type" title="赛事类型" class="width-30 form-control selectpicker">\
                <option selected value="0">足球</option>\
                <option value="1">篮球</option>\
            </select>\
            <select name="bunch_contest_play_type" title="请选择玩法" class="width-40 form-control selectpicker">\
            <option selected value="1">胜平负</option>\
            <option value="2">让球胜平负</option>\
            <option value="4">大小球</option>\
        <option value="5">单双数</option>\
        </select>\
            <a href="#" data-action="delete" class="middle">\
                <i class="icon-trash red bigger-150 middle"></i>\
            </a>\
        </div>')
            .find('a[data-action=delete]').on('click', function (e) {
                e.preventDefault();
                $(this).closest('.form-group').hide(300, function () {
                    $(this).remove();
                });
            });

        $("#bunch_contest_add_div select").selectpicker({
            style: 'btn-success'
        });
    });

    var header_color = new Array("header-color-orange","header-color-dark","header-color-blue","header-color-green","header-color-grey","header-color-purple","header-color-pink");
    var btn_color = new Array("btn-warning","btn-inverse","btn-primary","btn-success","btn-grey","btn-purple","btn-pink");
    var label_color = new Array("label-warning","label-inverse","label-primary","label-success","label-grey","label-purple","label-pink");

    $("#bunch_prize_more_bn").on("click",function(){
        var index = Math.floor(Math.random()*header_color.length);
        $("#bunch_prize_add_div").append('<div class="col-xs-6 col-sm-4 pricing-box">\
            <div class="widget-box">\
            <div class="widget-header '+header_color[index]+'">\
                <h5 class="bigger lighter">奖品添加</h5>\
            </div>\
            <div class="widget-body">\
            <div class="widget-main">\
                <ul class="list-unstyled spaced2">\
                    <li>\
                        <input name="prize_name" type="text" class="input-xlarge" placeholder="奖品名称"/>\
                    </li>\
                    <li>\
                        <select name="prize_type" title="奖品类型" class="form-control selectpicker">\
                            <option selected value="0">龙筹</option>\
                            <option value="1">龙币</option>\
                            <option value="2">实物</option>\
                        </select>\
                    </li>\
                    <li>\
                        <input name="prize_price" type="text" class="input-xlarge" placeholder="面值（整数），实物为0"/>\
                    </li>\
                    <li>\
                        <input name="prize_num" type="text" class="input-xlarge" placeholder="发放数量"/>\
                    </li>\
                    <li>\
                        <input name="prize_win_num" type="text" class="input-xlarge" placeholder="需要赢的场数"/>\
                    </li>\
                </ul>\
                <hr />\
                <div>\
                    <button name="select_image_bt" class="btn btn-danger btn-sm">选择照片</button>\
                </div>\
            </div>\
            <div>\
            <a name="prize_remove_a" href="#" class="btn btn-block '+btn_color[index]+'">\
                <i class="icon-remove bigger-110"></i>\
                <span>移除</span>\
            </a>\
            </div>\
            </div>\
            </div>\
        </div>')
            .find('a[name=prize_remove_a]').on('click', function (e) {
                e.preventDefault();
                $(this).closest('.pricing-box').hide(300, function () {
                    $(this).remove();
                });
            });

        $("#bunch_prize_add_div select").selectpicker({
            style: 'btn-success'
        });

        show_prize_modal();

    });


    $("#modal_bunch_prize_image").on("shown.bs.modal", function () {

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bunch/get/prize/image",
            success: function (data) {
                if (data.code == 200) {
                    var images = data.images;
                    if (images){
                        var image = images.split(",");
                        $.each(image, function (index, value) {
                            var html = get_prize_image_html(value);
                            $("#bunch_prize_image_div").append(html);
                        });
                    }

                    show_prize_image();

                    delete_prize_image();

                }
            }
        });
    });

    function show_prize_image(){
        $("#bunch_prize_image_div a").on("click",function(){
            var scr = $(this).closest("div").prev().find("img").attr("src");
            var tmp = prize_image_tmp.closest("div");
            tmp.find("img").remove();
            tmp.append('<img class="pull-right" width="60" height="40" src="'+scr+'"/>');
            $("#modal_bunch_prize_image").modal('hide');
        });
    }

    function delete_prize_image(){
        $("#bunch_prize_image_div span[title=prize_delete_span]").on("click",function(){
            var scr = $(this).closest("div").prev().find("img").attr("src");
            var pricing_span_body = $(this).closest(".pricing-span-body");
            bootbox.confirm("确认删除该照片？", function (result) {
                if (result) {
                    //确认
                    var img = scr.substr(19);
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/bunch/delete/prize/image",
                        data: {image: img},
                        success: function (data) {
                            if (data.code == 200) {
                                $.gritter.add({
                                    title: '照片删除成功！',
                                    time: 2000,
                                    class_name: 'gritter-success gritter-light'
                                });
                                pricing_span_body.remove();
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
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            $.gritter.add({
                                title: XMLHttpRequest.status,
                                text: XMLHttpRequest.statusText,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        }

                    });

                }
            });
        });
    }

    function show_prize_modal(){
        $("#bunch_prize_add_div button[name=select_image_bt], #bunch_prize_edit_div button[name=select_image_bt]").on("click", function(){
            prize_image_tmp = $(this);
            $("#modal_bunch_prize_image").modal({backdrop: 'static'});
        });
    }


    $("#modal_bunch_prize_image").on("hidden.bs.modal", function () {
        $("#bunch_prize_image_div *").remove();
    });

    function get_prize_image_html(image){
        var index = Math.floor(Math.random()*btn_color.length);
        var html = '<div class="pricing-span-body">\
            <div class="pricing-span">\
            <div class="widget-box pricing-box-small">\
                <div class="widget-body">\
                    <div class="widget-main no-padding">\
                        <ul class="list-unstyled list-striped pricing-table">\
                            <li>\
                                <img width="100" height="100" src="'+image_pre+image+'"/>\
                            </li>\
                        </ul>\
                        <div class="price">\
                            <span title="prize_delete_span" class="label label-lg '+label_color[index]+' arrowed-in arrowed-in-right">\
                            删除\
                            </span>\
                        </div>\
                    </div>\
                    <div>\
                        <a href="#" class="btn btn-block btn-sm '+btn_color[index]+'">\
                            <span>选择</span>\
                        </a>\
                    </div>\
                </div>\
            </div>\
            </div>\
        </div>';
        return html ;
    }

    var prize_image_tmp ;

    show_prize_modal();


    $("#add_submit_bt").on("click",function(){


        var contest_flag = true ;
        var contest_list = new Array();
        var n = 0;
        $("#bunch_contest_add_div").find('.form-group').each(function () {
            var contest_id = $(this).find('.input-sm').val();
            var contest_type = $(this).find('select[name=bunch_contest_type]').val();
            var play_type = Number($(this).find('select[name=bunch_contest_play_type]').val());
            if (!contest_id || isNaN(contest_id)) {
                contest_flag = false;
                return;
            }
            if (contest_type == 1){
                //篮球，玩法+5
                play_type += 5 ;
            }
            var option = new Object();
            option.index = n;
            option.contest_id = Number(contest_id);
            option.contest_type = Number(contest_type);
            option.play_type = play_type;
            contest_list.push(option);
            n++;
        });
        if (!contest_flag) {
            $.gritter.add({
                title: "赛事选择有问题！",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        var options = JSON.stringify(contest_list);
        var prize_flag = true ;
        var prize_list = new Array();
        $("#bunch_prize_add_div").find('.widget-main').each(function () {
            var prize_name = $(this).find('input[name=prize_name]').val();
            var prize_type = $(this).find('select[name=prize_type]').val();
            var prize_price = $(this).find('input[name=prize_price]').val();
            var prize_num = $(this).find('input[name=prize_num]').val();
            var prize_win_num = $(this).find('input[name=prize_win_num]').val();
            var prize_image = $(this).find('img').attr("src");
            if (!prize_image || !prize_name || isNaN(prize_price) || isNaN(prize_num) || isNaN(prize_win_num)) {
                prize_flag = false;
                return;
            }

            var option = new Object();
            option.name = prize_name;
            option.type = Number(prize_type);
            option.price = Number(prize_price);
            option.num = Number(prize_num);
            option.winNum = Number(prize_win_num);
            option.image = prize_image.substr(19);
            prize_list.push(option);
        });
        if (!prize_flag) {
            $.gritter.add({
                title: "奖品编辑有问题！",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        //[{"name":"5龙筹","price":5,"type":0,"winNum":2,"num":30},{"name":"10龙币","price":10,"type":1,"winNum":4,"num":10},{"name":"娃娃","price":0,"type":2,"winNum":5,"num":1}]
        var prizes = JSON.stringify(prize_list);

        var bunch_name = $("#bunch_name").val();
        var bunch_cost = $("#bunch_cost").val();
        var bunch_longbi = $("#bunch_longbi").prop('checked');
        if (!bunch_name || isNaN(bunch_cost)){
            $.gritter.add({
                title: "名称有问题！",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        if (!upload_photo){
            $.gritter.add({
                title: "串的主图没有上传",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }


        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bunch/add",
            data: {
                name: bunch_name,
                image: upload_photo,
                options: options,
                cost: bunch_cost,
                longbi: bunch_longbi,
                prizes: prizes
            },
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '添加成功！',
                        time: 2000,
                        class_name: 'gritter-success gritter-light'
                    });
                    window.location.reload(true);
                    $("#modal_bunch_add").modal("hide");
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


    $("#modal_bunch_add").on("hidden.bs.modal", function () {
        //清空原来的内容
        $("#image_form").remove();
        var photo_html = "<form id=\"image_form\" action=\"#\" class=\"dropzone\" method=\"post\" enctype=\"multipart/form-data\">" +
            "<div class=\"fallback\">" +
            "<input name=\"file\" type=\"file\"/>" +
            "</div>" +
            "</form>";
        $("#modal_add_image_span").append(photo_html);
        upload_photo = "";
        addImage();
    });



    //继续加载数据
    $('#bunch_data_more').on(ace.click_event, function (e) {
        e.preventDefault();
        getData();
    });



    /**
     * ===================
     * 打开页面异步加载数据 Start
     * */

    getData();

    function getData(){
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bunch/list",
            data: {startId: start_id, status: status},
            success: function (data) {
                if (data.code == 200) {
                    if (data.bunches.length > 0) {
                        //加载数据
                        $.each(data.bunches, function (index, bunch) {
                            start_id = bunch.id;
                            var htmlStr = showData(bunch.id, bunch.name, bunch.image, bunch.cost, bunch.longbi, bunch.status, bunch.start_time, bunch.end_time, bunch.bet_num);
                            $("#bunch_table tbody").append(htmlStr);
                        });
                    } else {
                        $.gritter.add({
                            title: '服务器无数据返回！',
                            time: 2000,
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
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.gritter.add({
                    title: XMLHttpRequest.status,
                    text: XMLHttpRequest.statusText,
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
            }

        });
    }

    //动态加载数据
    function showData(id, name, image, cost, longbi, status, start_time, end_time, bet_num) {
        var start_time = new Date(start_time).pattern("MM-dd HH:mm");
        var end_time = new Date(end_time).pattern("MM-dd HH:mm");
        var btn_html = '';
        if (status == 0){
            status = "<span class='label label-lg label-info'>未开始</span>";
            btn_html += ' <button class="btn btn-info btn-xs">编辑赛事</button> <button class="btn btn-success btn-xs">编辑奖品</button> <button class="btn btn-danger btn-xs">删除</button>';
        } else if (status == 1){
            status = "<span class='label label-lg label-danger'>进行</span>";
            btn_html += ' <button class="btn btn-info btn-xs">查看赛事</button> <button class="btn btn-success btn-xs">查看奖品</button> <button class="btn btn-danger btn-xs">删除</button>';
        } else if (status == 2){
            status = "<span class='label label-lg label-default'>有结果</span>";
            btn_html += ' <button class="btn btn-info btn-xs">查看赛事</button> <button class="btn btn-success btn-xs">查看奖品</button> <button class="btn btn-danger btn-xs">删除</button>';
        } else if (status == 3){
            status = "<span class='label label-lg label-blue'>未派奖</span>";
            btn_html += ' <button class="btn btn-info btn-xs">查看赛事</button> <button class="btn btn-success btn-xs">查看奖品</button> <button class="btn btn-danger btn-xs">删除</button>';
        } else if (status == 4){
            status = "<span class='label label-lg label-yellow'>派奖中</span>";
            btn_html += ' <button class="btn btn-info btn-xs">查看赛事</button> <button class="btn btn-success btn-xs">查看奖品</button> <button class="btn btn-primary btn-xs">派发奖品</button> <button class="btn btn-danger btn-xs">删除</button>';
        } else if (status == -1){
            status = "<span class='label label-lg label-success'>已结算</span>";
            btn_html += ' <button class="btn btn-info btn-xs">查看赛事</button> <button class="btn btn-success btn-xs">查看奖品</button> <button class="btn btn-grey btn-xs">派奖记录</button> <button class="btn btn-danger btn-xs">删除</button>';
        } else if (status == -10){
            status = "<span class='label label-lg label-purple'>已删除</span>";
            btn_html += ' <button class="btn btn-info btn-xs">查看赛事</button> <button class="btn btn-success btn-xs">查看奖品</button>';
        } else {
            status = "<span class='label label-lg label-inverse'>出错</span>";
        }
        if (longbi){
            longbi = "<span class='label label-lg label-danger'>龙币</span>";
        } else if(cost > 0){
            longbi = "<span class='label label-lg label-pink'>龙筹</span>";
        } else {
            longbi = "<span class='label label-lg label-success'>免费</span>";
        }
        var htmlStr = '<tr>\
            <td class="center">'+id+'</td>\
            <td class="center">'+name+'</td>\
            <td class="center"><img width="85" height="50" src="'+image_pre+image+'"></td>\
            <td class="center">'+cost+'</td>\
            <td class="center">'+longbi+'</td>\
            <td class="center">'+bet_num+'</td>\
            <td class="center">'+status+'</td>\
            <td class="center">'+start_time+'</td>\
            <td class="center">'+end_time+'</td>\
            <td class="center"> \
            '+btn_html+'\
            </td>\
            </tr>';
        return htmlStr;
    }

    /**
     * 打开页面异步加载数据 end
     * ===================
     * */



    function showAwardsData(id, name, longno, win_num, status, prizes) {
        var prize_name = "无";
        $.each(prizes, function(index, prize){
            if (prize.win_num == win_num){
                prize_name = prize.name;
            }
        });
        if (status == 2){
            status = "<span class='label label-lg label-danger'>中奖且已派奖</span>";
        } else if (status == 3){
            status = "<span class='label label-lg label-warning'>中奖但未获得派奖</span>";
        } else if (status == 4){
            status = "<span class='label label-lg label-grey'>未中奖</span>";
        } else {
            status = "<span class='label label-lg label-inverse'>出错</span>";
        }
        var htmlStr = '<tr>\
            <td class="center">'+id+'</td>\
            <td class="center">'+name+'</td>\
            <td class="center">'+longno+'</td>\
            <td class="center">'+win_num+'</td>\
            <td class="center">'+status+'</td>\
            <td class="center">'+prize_name+'</td>\
            </tr>';
        return htmlStr;
    }


    $('#bunch_table tbody').on('click', 'button.btn-info', function () {
        //修改
        var btn_content = $(this).html();
        if (btn_content == "编辑赛事"){
            $("#edit_submit_bt").removeClass("disabled");
            $("#modal_add_image_span3").removeClass("hidden");
        } else {
            $("#edit_submit_bt").addClass("disabled");
            $("#modal_add_image_span3").addClass("hidden");
        }
        var tmpTr = $(this).closest("tr");
        bunch_id = tmpTr.find("td:eq(0)").html();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bunch/view",
            data: {id: bunch_id},
            success: function (data) {
                if (data.code == 200) {
                    var bunch = data.bunch;
                    if(bunch){

                        $("#bunch_name_edit").val(bunch.name);
                        $("#bunch_cost_edit").val(bunch.cost);
                        $("#bunch_image").attr("src",image_pre + bunch.image);
                        if (bunch.longbi){
                            $("#bunch_longbi_edit").get(0).checked = true;
                        } else {
                            $("#bunch_longbi_edit").get(0).checked = false;
                        }
                        var options = bunch.options;
                        var options_html = "";
                        function contest_type_fn(type){
                            if (type == 0){
                                return '<select name="bunch_contest_type" title="赛事类型" class="width-30 form-control selectpicker">\
                                    <option selected value="0">足球</option>\
                                    <option value="1">篮球</option>\
                                </select>';
                            } else {
                                return '<select name="bunch_contest_type" title="赛事类型" class="width-30 form-control selectpicker">\
                                    <option value="0">足球</option>\
                                    <option selected value="1">篮球</option>\
                                </select>';
                            }
                        }

                        function play_type_fn(type){
                            if (type == 1){
                                return '<select name="bunch_contest_play_type" title="请选择玩法" class="width-40 form-control selectpicker">\
                                    <option selected value="1">胜平负</option>\
                                    <option value="2">让球胜平负</option>\
                                    <option value="4">大小球</option>\
                                    <option value="5">单双数</option>\
                                    </select>';
                            } else if (type == 2){
                                return '<select name="bunch_contest_play_type" title="请选择玩法" class="width-40 form-control selectpicker">\
                                    <option value="1">胜平负</option>\
                                    <option selected value="2">让球胜平负</option>\
                                    <option value="4">大小球</option>\
                                    <option value="5">单双数</option>\
                                    </select>';
                            } else if (type == 4){
                                return '<select name="bunch_contest_play_type" title="请选择玩法" class="width-40 form-control selectpicker">\
                                    <option value="1">胜平负</option>\
                                    <option value="2">让球胜平负</option>\
                                    <option selected value="4">大小球</option>\
                                    <option value="5">单双数</option>\
                                    </select>';
                            } else if (type == 5){
                                return '<select name="bunch_contest_play_type" title="请选择玩法" class="width-40 form-control selectpicker">\
                                    <option value="1">胜平负</option>\
                                    <option value="2">让球胜平负</option>\
                                    <option value="4">大小球</option>\
                                    <option selected value="5">单双数</option>\
                                    </select>';
                            }
                        }
                        $.each(options, function(index,option){
                            var type = option.contest_type;
                            var play_type = option.play_type;
                            if (type == 1){
                                play_type -= 5 ;
                            }
                            var html = '<div class="form-group">\
                                <input type="text" class="input-sm"  value="'+option.contest_id+'" placeholder="赛事ID"/>\
                                '+contest_type_fn(type)+'\
                                '+play_type_fn(play_type)+'\
                                </div>';
                            options_html += html ;
                        });
                        $("#bunch_contest_edit_div").append(options_html).find("select").selectpicker({
                            style: 'btn-success'
                        });


                        $("#modal_bunch_edit").modal({backdrop: 'static'});


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



    }).on('click', 'button.btn-success', function () {

        //编辑奖品
        var btn_prize = $(this).html();
        var edit_flag = false ;
        if (btn_prize == "编辑奖品"){
            edit_flag = true ;
        }
        var tmpTr = $(this).closest("tr");
        bunch_id = tmpTr.find("td:eq(0)").html();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bunch/view/prize",
            data: {id: bunch_id},
            success: function (data) {
                if (data.code == 200) {
                    var prizes = data.bunch.prize;
                    if(prizes){



                        function prize_type_fn(type){
                            if (type == 0){
                                return '<select name="prize_type" title="奖品类型" class="form-control selectpicker">\
                                            <option selected value="0">龙筹</option>\
                                            <option value="1">龙币</option>\
                                            <option value="2">实物</option>\
                                        </select>';
                            } else if (type == 1){
                                return '<select name="prize_type" title="奖品类型" class="form-control selectpicker">\
                                            <option value="0">龙筹</option>\
                                            <option selected value="1">龙币</option>\
                                            <option value="2">实物</option>\
                                        </select>';
                            } else if (type == 2){
                                return '<select name="prize_type" title="奖品类型" class="form-control selectpicker">\
                                            <option value="0">龙筹</option>\
                                            <option value="1">龙币</option>\
                                            <option selected value="2">实物</option>\
                                        </select>';
                            }
                        }

                        var options_html = "";
                        $.each(prizes, function(index, prize){
                            var index = Math.floor(Math.random()*header_color.length);
                            var html = '<div class="col-xs-6 col-sm-4 pricing-box">\
                                <div class="widget-box">\
                                <div class="widget-header '+header_color[index]+'">\
                                    <h5 class="bigger lighter">奖品修改</h5>\
                                </div>\
                                <div class="widget-body">\
                                <div class="widget-main">\
                                    <ul class="list-unstyled spaced2">\
                                        <li>\
                                            <input name="prize_name" value="'+prize.name+'" type="text" class="input-xlarge" placeholder="奖品名称"/>\
                                        </li>\
                                        <li>\
                                            '+prize_type_fn(prize.type)+'\
                                        </li>\
                                        <li>\
                                            <input name="prize_price" value="'+prize.price+'" type="text" class="input-xlarge" placeholder="面值（整数），实物为0"/>\
                                        </li>\
                                        <li>\
                                            <input name="prize_num" value="'+prize.num+'" type="text" class="input-xlarge" placeholder="发放数量"/>\
                                        </li>\
                                        <li>\
                                            <input name="prize_win_num" disabled value="'+prize.win_num+'" type="text" class="input-xlarge" placeholder="需要赢的场数"/>\
                                        </li>\
                                    </ul>\
                                    <hr />\
                                    <div>\
                                        <button name="select_image_bt" class="btn btn-danger btn-sm">选择照片</button>\
                                        <img class="pull-right" width="60" height="40" src="'+image_pre + prize.image+'"/>\
                                    </div>\
                                </div>\
                                <div>\
                                <a name="prize_edit_a" title="'+prize.id+'" href="#" class="btn btn-block '+btn_color[index]+'">\
                                    <i class="icon-edit bigger-110"></i>\
                                    <span>修改</span>\
                                </a>\
                                </div>\
                                </div>\
                                </div>\
                            </div>';
                            options_html += html ;
                        });
                        $("#bunch_prize_edit_div").append(options_html).find("select").selectpicker({
                            style: 'btn-success'
                        });
                        show_prize_modal();

                        $("#modal_bunch_prize_edit").modal({backdrop: 'static'});

                        if (!edit_flag){
                            $("#bunch_prize_edit_div a[name=prize_edit_a]").addClass("disabled");
                        }

                        //修改单个奖品
                        $("#bunch_prize_edit_div a[name=prize_edit_a]").on("click",function(){
                            var id = $(this).attr("title");
                            var widget_main_tmp = $(this).closest("div").prev() ;
                            var prize_name = widget_main_tmp.find('input[name=prize_name]').val();
                            var prize_type = widget_main_tmp.find('select[name=prize_type]').val();
                            var prize_price = widget_main_tmp.find('input[name=prize_price]').val();
                            var prize_num = widget_main_tmp.find('input[name=prize_num]').val();
                            //var prize_win_num = widget_main_tmp.find('input[name=prize_win_num]').val();
                            var prize_image = widget_main_tmp.find('img').attr("src");
                            if (!prize_image || !prize_name || isNaN(prize_price) || isNaN(prize_num)) {
                                $.gritter.add({
                                    title: "奖品修改有问题！",
                                    time: 2000,
                                    class_name: 'gritter-error gritter-center'
                                });
                                return;
                            }

                            var option = new Object();
                            option.id = id ;
                            option.bunchId = bunch_id ;
                            option.name = prize_name;
                            option.type = Number(prize_type);
                            option.price = Number(prize_price);
                            option.num = Number(prize_num);
                            //option.winNum = Number(prize_win_num);
                            option.image = prize_image.substr(19);
                            var prize = JSON.stringify(option);

                            $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                url: appName + "/bunch/update/prize",
                                data: {prize: prize},
                                success: function (data) {
                                    if (data.code == 200) {
                                        $.gritter.add({
                                            title: '修改成功！',
                                            time: 2000,
                                            class_name: 'gritter-success gritter-light'
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
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    $.gritter.add({
                                        title: XMLHttpRequest.status,
                                        text: XMLHttpRequest.statusText,
                                        time: 2000,
                                        class_name: 'gritter-error gritter-center'
                                    });
                                }

                            });

                        })

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



    }).on('click', 'button.btn-primary', function () {

        //派发奖品
        var tmpTr = $(this).closest("tr");
        bunch_id = tmpTr.find("td:eq(0)").html();


        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bunch/get/user/award",
            data: {id: bunch_id},
            success: function (data) {
                if (data.code == 200) {
                    var prizes = data.bunch.prize;
                    if(prizes){


                        var options_html = "";
                        $.each(prizes, function(index, prize){
                            var type = prize.type ;
                            if (type == 0){
                                type = "龙筹";
                            } else if (type == 1){
                                type = "龙币";
                            } else if (type == 2){
                                type = "实物";
                            }

                            var all = prize.all;
                            if (!all){
                                all = "无";
                            }
                            var maybe = prize.maybe ;
                            if (!maybe){
                                maybe = "";
                            }

                            var html = '<div>\
                                <label class="red bigger-150">奖品：'+prize.name+'&nbsp;&nbsp;'+type+'</label>\
                                </div>\
                                <div>\
                                    <label class="red bigger-150">需要赢的场数：'+prize.win_num+'</label>\
                                </div>\
                                <div>\
                                    <label class="red bigger-150">奖品数量：'+prize.num+'</label>\
                                </div>\
                                <div>\
                                    <label class="red bigger-150">全部中奖ID：'+all+'</label>\
                                </div>\
                                <div>\
                                    <label class="red bigger-150">随机抽取的中奖ID：</label>\
                                </div>\
                                <div>\
                                    <textarea class="form-control">'+maybe+'</textarea>\
                                </div>';
                            options_html += html ;
                        });
                        $("#user_award").append(options_html);


                    } else {
                        $("#user_award").append('<div><label class="green bigger-150">该活动无人中奖，请点击下面的“确认发送”按钮来结束该活动！</label></div>');
                    }

                    $("#modal_award_send").modal({backdrop: 'static'});

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



    }).on('click', 'button.btn-danger', function () {
        //删除
        var tmpTr = $(this).closest("tr");
        bunch_id = tmpTr.find("td:eq(0)").html();

        bootbox.confirm("确认删除该活动？", function (result) {
            if (result) {
                //确认

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName + "/bunch/update",
                    data: {
                        id: bunch_id,
                        status: -10
                    },
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '数据删除成功！',
                                time: 2000,
                                class_name: 'gritter-success gritter-light'
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
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $.gritter.add({
                            title: XMLHttpRequest.status,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    }

                });

            }
        });

    }).on('click', 'button.btn-grey', function () {
        //查看派奖记录
        var tmpTr = $(this).closest("tr");
        bunch_id = tmpTr.find("td:eq(0)").html();


        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bunch/view/user/award",
            data: {id: bunch_id},
            success: function (data) {
                if (data.code == 200) {
                    prize_page = data.page ;
                    if (data.bunchBet.length > 0) {
                        //加载数据
                        $.each(data.bunchBet, function (index, bet) {
                            var htmlStr = showAwardsData(bet.id, bet.user.name, bet.user.long_no, bet.win_num, bet.status, data.prize);
                            $("#bunch_prize_user_table tbody").append(htmlStr);
                        });
                        $("#modal_bunch_prize_user_view").modal({backdrop: 'static'});
                    } else {
                        $.gritter.add({
                            title: '该期活动无人参与！',
                            time: 2000,
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

    $("#modal_bunch_prize_user_view").on("hidden.bs.modal", function () {
        $("#bunch_prize_user_table tbody *").remove();
    });


    $("#modal_award_send").on("hidden.bs.modal", function () {
        $("#user_award *").remove();
    });

    $("#modal_bunch_edit").on("hidden.bs.modal", function () {
        upload_edit_photo = "";
        $("#bunch_contest_edit_div *").remove();
    });


    $("#edit_submit_bt").on("click",function(){


        var contest_flag = true ;
        var contest_list = new Array();
        var n = 0;
        $("#bunch_contest_edit_div").find('.form-group').each(function () {
            var contest_id = $(this).find('.input-sm').val();
            var contest_type = $(this).find('select[name=bunch_contest_type]').val();
            var play_type = Number($(this).find('select[name=bunch_contest_play_type]').val());
            if (!contest_id || isNaN(contest_id)) {
                contest_flag = false;
                return;
            }
            if (contest_type == 1){
                //篮球，玩法+5
                play_type += 5 ;
            }
            var option = new Object();
            option.index = n;
            option.contest_id = Number(contest_id);
            option.contest_type = Number(contest_type);
            option.play_type = play_type;
            contest_list.push(option);
            n++;
        });
        if (!contest_flag) {
            $.gritter.add({
                title: "赛事选择有问题！",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        var options = JSON.stringify(contest_list);


        var bunch_name = $("#bunch_name_edit").val();
        var bunch_cost = $("#bunch_cost_edit").val();
        var bunch_longbi = $("#bunch_longbi_edit").prop('checked');
        if (!bunch_name || isNaN(bunch_cost)){
            $.gritter.add({
                title: "名称有问题！",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        var bunch_people = $("#bunch_people_edit").val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bunch/update",
            data: {
                id: bunch_id,
                name: bunch_name,
                image: upload_edit_photo,
                options: options,
                cost: bunch_cost,
                people: bunch_people,
                longbi: bunch_longbi
            },
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '修改成功！',
                        time: 2000,
                        class_name: 'gritter-success gritter-light'
                    });
                    $("#modal_bunch_edit").modal("hide");
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

    $("#send_bn").on("click", function(){
        $(this).addClass("disabled");
        var user_ids = "";
        var length = $("#user_award *").length ;
        if (length > 0){
            //有人中奖
            var textareas = $("#user_award").find("textarea");
            $.each(textareas, function(index, textarea){
                if ($(this).val().length > 0){
                    user_ids += $(this).val() + ",";
                }
            });
            if (user_ids.length > 0){
                user_ids = user_ids.substring(0, user_ids.length-1);
            }
        }


        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/bunch/send/user/award",
            data: {id:bunch_id, userIds:user_ids},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: '派奖成功！',
                        time: 2000,
                        class_name: 'gritter-success'
                    });
                    $("#modal_award_send").modal("hide");
                }
            }
        });

    });



    $("#modal_award_send").on("hidden.bs.modal", function () {
        $("#send_bn").removeClass("disabled");
    });

    $("#modal_bunch_prize_edit").on("hidden.bs.modal", function () {
        $("#bunch_prize_edit_div *").remove();
    });




    /**
     * ======================================================
     * 添加照片 start
     * */


    function addImage() {
        $("#image_form").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/frontpage/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 上传串封面</span>\
                <span class="smaller-80 grey">(只能上传一张照片)</span> <br /> \
                <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传一张照片！',
            dictFileTooBig: '只能上传不超过10M的照片！',
            dictInvalidInputType: '只能是jpg/jpeg/bmp/gif/png格式的照片！',

            //change the previewTemplate to use Bootstrap progress bars
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
            init: function () {
                this.on("success", function (data) {
                    //当上传完成后的事件，接受的数据为JSON格式
                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                        var res = eval('(' + data.xhr.responseText + ')');
                        if (res.flag) {
                            $.gritter.add({
                                title: "恭喜，已成功上传照片！",
                                time: 2000,
                                class_name: 'gritter-success'
                            });
                            upload_photo = res.key;
                        }
                        else {
                            $.gritter.add({
                                title: "上传失败，失败的原因是：" + res.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        }
                    }
                });
                this.on("addedfile", function (file) {
                });
                this.on("complete", function (data) {
                });
                this.on("removedfile", function (data) {
                    //如果是成功上传的照片，就对七牛云上的照片进行删除
                    if (data.accepted) {

                    }
                });
            }
        });
    }

    function addImage2() {
        $("#image_form2").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/frontpage/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 上传奖品照片 </span>\
                <span class="smaller-80 grey">(只能上传一张照片)</span> <br /> \
                <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传一张照片！',
            dictFileTooBig: '只能上传不超过10M的照片！',
            dictInvalidInputType: '只能是jpg/jpeg/bmp/gif/png格式的照片！',

            //change the previewTemplate to use Bootstrap progress bars
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
            init: function () {
                this.on("success", function (data) {
                    //当上传完成后的事件，接受的数据为JSON格式
                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                        var res = eval('(' + data.xhr.responseText + ')');
                        if (res.flag) {
                            $.gritter.add({
                                title: "恭喜，已成功上传照片！",
                                time: 2000,
                                class_name: 'gritter-success'
                            });
                            var html = get_prize_image_html(res.key);
                            $("#bunch_prize_image_div").append(html);
                            show_prize_image();
                            delete_prize_image();
                            $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                url: appName + "/bunch/add/prize/image",
                                data: {image: res.key}
                            });
                        }
                        else {
                            $.gritter.add({
                                title: "上传失败，失败的原因是：" + res.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        }
                    }
                });
                this.on("addedfile", function (file) {
                });
                this.on("complete", function (data) {
                });
                this.on("removedfile", function (data) {
                    //如果是成功上传的照片，就对七牛云上的照片进行删除
                    if (data.accepted) {

                    }
                });
            }
        });
    }


    function addImage3() {
        $("#image_form3").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/frontpage/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 修改主图照片 </span>\
                <span class="smaller-80 grey">(只能上传一张照片)</span> <br /> \
                <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传一张照片！',
            dictFileTooBig: '只能上传不超过10M的照片！',
            dictInvalidInputType: '只能是jpg/jpeg/bmp/gif/png格式的照片！',

            //change the previewTemplate to use Bootstrap progress bars
            previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-small progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
            init: function () {
                this.on("success", function (data) {
                    //当上传完成后的事件，接受的数据为JSON格式
                    if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
                        var res = eval('(' + data.xhr.responseText + ')');
                        if (res.flag) {
                            $.gritter.add({
                                title: "恭喜，已成功上传照片！",
                                time: 2000,
                                class_name: 'gritter-success'
                            });
                            upload_edit_photo = res.key ;
                            $("#bunch_image").attr("src",image_pre + res.key);

                        }
                        else {
                            $.gritter.add({
                                title: "上传失败，失败的原因是：" + res.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        }
                    }
                });
                this.on("addedfile", function (file) {
                });
                this.on("complete", function (data) {
                });
                this.on("removedfile", function (data) {
                    //如果是成功上传的照片，就对七牛云上的照片进行删除
                    if (data.accepted) {

                    }
                });
            }
        });
    }

    try {
        addImage();
        addImage2();
        addImage3();
    } catch (e) {
        alert('Dropzone.js does not support older browsers!');
    }

    /**
     * ======================================================
     * 添加照片 end
     * */


});