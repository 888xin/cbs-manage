/**
 * Created by jacky
 */
define(function (require) {
    require("../common/common");
    require("../../modules/plugin/jquery.dataTables.bootstrap");
    require("../../modules/plugin/jquery.gritter.min");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/bootbox.min");


    var circlecomment = {

        init: function () {
            //常量设置
            this.url_list = "./list";
            this.url_confirm = "./shield";
            this.head_url = "http://proxy.dev.xy.l99.com/image.php?type=avatar90&ifile=";
            this.content_image = "http://roi.skst.cn/";
            this.limit = 20;
            this.endId = "";

            this.requireAjax();
            this.loadMore();
            this.selectALL();
            this.shield();
            this.shieldByKey();

        },

        /*获取url后的参数*/
        getURLParam: function (name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)', "ig").exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
        },


        /**
         * 全选按钮
         */
        selectALL : function(){
            var _this = this;
            $("#selectAll").on("click",function(){
                var checked = $("#selectAll").prop("checked");

                if(checked){
                    $(".check_select").each(function(){
                        this.checked = true;
                    });
                }else{
                    $(".check_select").each(function(){
                        this.checked = false;
                    });
                }
            });

        },


        /**
         * 切换屏蔽与已屏蔽状态按钮
         */
        shield : function(){
            var _this = this;
            $("tbody").delegate($(".comm_oper a"),"click",function(e){
                var $abtn = $(e.target);
                if($abtn.data("state")=="0"){
                    var id = $abtn.parent().siblings(".comment_id").html();
                    console.log(id);
                    var flag = _this.confirmShield(id,$abtn);
                }
            });

        },

        /**
         * 一键屏蔽
         */
        shieldByKey : function(){
            var _this = this;
            $("#shield_by_key").on("click",function(){
                var $checkbox = $(".comm_select input");
                var ids = [];
                var btnArray = [];
                $checkbox.each(function(){
                    if(this.checked){
                        btnArray.push( $(this).parent().siblings(".comm_oper").find("a"));
                        var id = $(this).parent().siblings(".comment_id").html();
                        ids.push(parseInt(id));
                    }
                });
                _this.confirmShield(ids.join(","),btnArray);


                //屏蔽成功后，将checkbox的勾选去掉
                var $checkbox = $("input[type='checkbox']");
                $checkbox.each(function(){
                    this.checked=false;
                });

            });

        },

        /**
         * 验证屏蔽是否成功
         * @param ids id列表，以逗号隔开
         */
        confirmShield : function(ids,doms){
            var url = this.url_confirm;
            var _this = this;
            $.ajax({
                url: url,
                type: 'GET',
                data: {
                    ids: ids
                },
                success: function (res) {
                    var res = JSON.parse(res);
                    if (res.code == 200) {
                        //修改屏蔽为已屏蔽状态
                        for(var i=0;i<doms.length;i++){
                            var $com_oper = $(doms[i]).parent();
                            doms[i].remove();
                            $com_oper.append("<a href='javascript:void(0);' data-state='1' class='label label-lg label-success'>已屏蔽</a>");
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
                },
                error: function (XMLHttpRequest, textStatus, errorThrown){
                    $.gritter.add({
                        title: XMLHttpRequest.status,
                        text:XMLHttpRequest.statusText,
                        time:2000,
                        class_name: 'gritter-error gritter-center'
                    });
                }
            })
        },

        /**
         * 请求详情数据
         */
        requireAjax: function () {
            var url = this.url_list;
            var _this = this;
            $.ajax({
                url: url,
                type: 'GET',
                data: {
                    limit: _this.limit,
                    endId: _this.endId
                },
                success: function (res) {
                    var res = JSON.parse(res);
                    if (res.code == 200) {
                        var comments = res.data.comments;
                        if (comments.length == 0) {
                            if($(".noData").size()==0){
                                $('.table').after("<div class='noData'>--没有更多数据了--</div>");
                            }

                        } else {
                            $.each(comments, function (index, val) {
                                var html = [];
                                html.push("<tr><td class='center comm_select'><input type='checkbox' class='ace check_select'/><span class='lbl'></span></td>");
                                //console.log(html.join(""));
                                html.push("<td class='comment_id'>" + val.id + " </td>");
                               // html.push("<td>"+"<img src='"+_this.head_url+val.user_avatar+"'>"+val.user_name+"</td>");
                               // html.push("<td class='comm_user'>"+"<img class='user_head' src='"+_this.head_url+"f1/1434426372640_vrgmqy.png"+"'>"+"<br><span class='user_name'>"+val.user_name+"</span>"+"</td>");
                                html.push("<td class='comm_user'>"+"<img class='user_head' src='"+_this.head_url+val.user_avatar+"'>"+"<br><span class='user_name'>"+val.user_name+"</span>"+"</td>");
                                html.push("<td class='comm_content'>"+val.content+"</td>");
                                html.push("<td class='comm_time'>" + val.create_time + " </td>");
                                if(val.status!=2){
                                    html.push("<td class='comm_oper'>" + "<a href='javascript:void(0);' data-state='0' class='btn btn-xs btn-primary'>屏蔽</a>" + "</td></tr>");
                                }else{
                                    html.push("<td class='comm_oper'>" +  "<a href='javascript:void(0);' data-state='1' class='label label-lg label-success'>已屏蔽</a>" + " </td></tr>");
                                }
                                html = html.join('');
                                $('.tbody').append(html);
                            });
                            _this.endId = comments[comments.length - 1].id;

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
                },
                error: function (XMLHttpRequest, textStatus, errorThrown){
                    $.gritter.add({
                        title: XMLHttpRequest.status,
                        text:XMLHttpRequest.statusText,
                        time:2000,
                        class_name: 'gritter-error gritter-center'
                    });
                }

            })
        },

        /**
         * 加载更多数据
         */
        loadMore : function(){
            var that = this;
            $("#comment_data_more").click(function(){
               var _this = that;
                _this.requireAjax();
            });
        }

    };
    circlecomment.init();
})
