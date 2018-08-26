define(function (require, exports, module) {
    require("../common/common");
    require("../../modules/plugin/jquery-ui-1.10.3.full.min");
    require("../../modules/plugin/bootbox.min");
    require("../../modules/plugin/jquery.gritter.min");
    //require("../../modules/plugin/jquery.colorbox-min.js");
    require("../../modules/plugin/dropzone.min.js");
    require("../../modules/plugin/x-editable/ace-editable.min.js");
    require("../../modules/plugin/jquery.hotkeys.min");
    require("../../modules/plugin/bootstrap-wysiwyg.min");
    //常量设置
    var image_url = "http://roi.skst.cn/";
    //var image_url = "http://7xo8gu.com1.z0.glb.clouddn.com/";
    var status = 1;
    //上传文件的key(后缀)
    var upload_photo_key = "";
    //滚播图片
    var upload_photo_roll_key = "";
    //内容图片
    //var upload_photo_content_key = "";
    var goods_start_id;
    //编辑商品id
    var goods_edit_id;
    // 编辑商品旧的照片路径
    var old_photo_path;
    // 初始商品价格类型
    //var init_goods_price_type = 0;
    // 商品排序
    var order_by = null;
    // 显示图片到编辑文本器中
    var show_image = "";
    //商品显示数量
    var goods_limit = 200;
    //分类
    var category = null;
    //分类数组
    var modal_goods_category = [];

    //页面进入后加载数据
    getAsyData();


    //异步获取数据
    function getAsyData() {

        //请求数据
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/list",
            data: {
                status: status,
                category: category,
                limit: goods_limit},
            success: function (data) {
                if (data.code == 200) {
                    $("#goods_thumbnails > li").remove();
                    if (data.number > 0) {
                        //加载数据
                        $.each(data.goodsList, function (index, goods) {
                            goods_start_id = goods.id;
                            var htmlStr = showGoodsData(goods.id, goods.name, goods.price, goods.sort_index, goods.path, goods.sales,
                                goods.stock, goods.create_time, goods.update_time, goods.status, goods.type, goods.recommend);
                            $("#goods_thumbnails").append(htmlStr);
                        });

                        $("#goods_thumbnails").on("click", ">li a", function (e) {
                            e.preventDefault();
                            goods_edit_id = $(this).parent().attr("id").substr(9);
                            //模态窗口打开
                            $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                url: appName + "/goods/view",
                                data: {goodsId: goods_edit_id},
                                success: function (data) {
                                    if (data.code == 200) {
                                        $("#modal_edit_goods_content").html(data.goods.descr);
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
                            $("#modal_goods_edit_content").modal({backdrop: 'static'});
                        });


//                        var colorbox_params = {
//                            reposition:true,
//                            scalePhotos:true,
//                            scrolling:false,
//                            previous:'<i class="icon-arrow-left"></i>',
//                            next:'<i class="icon-arrow-right"></i>',
//                            close:'&times;',
//                            current:'{current} of {total}',
//                            maxWidth:'100%',
//                            maxHeight:'100%',
//                            onOpen:function(){
//                                document.body.style.overflow = 'hidden';
//                            },
//                            onClosed:function(){
//                                document.body.style.overflow = 'auto';
//                            },
//                            onComplete:function(){
//                                $.colorbox.resize();
//                            }
//                        };
//
//                        $('.ace-thumbnails [data-rel="colorbox"]').colorbox(colorbox_params);
//                        $("#cboxLoadingGraphic").append("<i class='icon-spinner orange'></i>");//let's add a custom loading icon
                    }
                } else {
                    $.gritter.add({
                        title: '出现code:' + data.code + ' 错误，详细信息：' + data.msg,
                        text: XMLHttpRequest.statusText,
                        time: 2000,
                        class_name: 'gritter-error gritter-center'
                    });
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

    function showGoodsData(goods_id, goods_name, goods_price, sort_index, goods_path, goods_sales, goods_stock, goods_create_time, goods_update_time, goods_status, goods_type, recommend) {
        if (goods_name.length > 12) {
            goods_name = goods_name.substring(0, 11) + "...";
        }
//        goods_create_time = new Date(goods_create_time).pattern("yyyy-MM-dd");
        goods_update_time = new Date(goods_update_time).pattern("yyyy-MM-dd");
        //图片路径
        goods_path = image_url + goods_path;
        //虚拟或实物
//        var goods_type_html = "";
//        if (goods_type >= 1){
//            goods_type_html = "<img class='watermark' src='"+appName+"/public/images/virtual.png' />";
//        } else {
//            goods_type_html = "<img class='watermark' src='"+appName+"/public/images/kind.png' />";
//        }

//        if (goods_price_type == 0){
//            //龙筹购买
//            goods_price = "龙筹：<b class='light-red'>"+goods_price+"</b>" ;
//        } else if (goods_price_type == 1){
//            //龙币购买
//            goods_price = "龙币：<b class='orange2'>"+goods_price+"</b>" ;
//        }
        goods_price = "龙币：<b class='orange2'>" + goods_price + "</b>";
        var goods_bt_html = "";
        var show_time_html = "";
        if (goods_status == 1) {
            //上架状态 有下架按钮
            goods_bt_html = "<button id='bt_down_" + goods_id + "' class=\"btn btn-minier btn-danger\"><i class=\"icon-arrow-down\"></i>下架</button>";
            show_time_html = "上架时间：<b class=\"light-green\">" + goods_update_time + "</b>";
        } else if (goods_status == 0) {
            //下架状态 有上架按钮
            goods_bt_html = "<button id='bt_up_" + goods_id + "' class=\"btn btn-minier btn-success\"><i class=\"icon-arrow-up\"></i>上架</button>";
            show_time_html = "下架时间：<b class='grey'>" + goods_update_time + "</b>";
        }
        //是否在队列中
        //var queue_html = "";
        //是否被推荐到主页
        if (recommend) {
            //queue_html = "<div class='tools tools-right'><a href='#' id='queue_"+goods_id+"'><i  class='icon-arrow-down green'></i></a></div>";
            recommend = "<img class='watermark' src='" + appName + "/public/images/recommend.png' />";
        } else {
            //queue_html = "<div class='tools tools-right'><a href='#' id='queue_"+goods_id+"'><i class='icon-arrow-up grey'></i></a></div>";
            recommend = "";
        }


        var html = "<li id='li_goods_" + goods_id + "'>" +
            "<a href='#'>" +
            recommend +
            "<img width=\"230\" height=\"230\" src='" + goods_path + "' />" +
            "<div class=\"text\">" +
            "<div class=\"inner\">" +
            "<span>点击编辑商品图文内容</span>" +
            "</div></div>" +
            "</a>" +
            //queue_html +
            "<div>" +
            "<h4>" + goods_name + "</h4>" +
//            "<div>" +
//            "商品ID：<b class=\"light-red\">" + goods_id + "</b>" +
//            "</div>" +
            "商品ID：<b class=\"light-red\">" + goods_id + "</b>" +
            "<div class=\"pull-right\">排序值：<b class=\"pink\">" + sort_index + "</b></div>" +
            "</div>" +
            "销量：<b class=\"green\">" + goods_sales + "</b>" +
            "<div class=\"pull-right\">库存：<b class=\"red\">" + goods_stock + "</b></div>" +
            "</div>" +
//            "<div>" +
//            "创建时间：<b class=\"red\">" + goods_create_time + "</b>" +
//            "</div>" +
            "<div>" +
            show_time_html +
            "</div>" +
            goods_price +
            "<div class=\"pull-right\">" +
            "<a href=\"#\">" +
            "<button id='bt_edit_" + goods_id + "' class=\"btn btn-minier btn-info\">" +
            "<i class=\"icon-edit\"></i>编辑</button>" +
            "</a>" +
            " <a href=\"#\">" +
            goods_bt_html +
            "</a>" +
            "</div></li>";
        return html;
    }


    //选择上架
    $("#goods_title_up_a").on("click", function () {
        $("#goods_title_up").removeClass("invisible");
        $("#goods_title_down").addClass("invisible");
        $("#goods_title_all").addClass("invisible");
        $("#goods_title_name").html("全部上架商品列表");

        status = 1;
        //$("#cboxLoadingGraphic i").remove();//let's remove a custom loading icon
        getAsyData();
        //商品处于上架状态不可删除
        $("#modal_goods_delete_bt").addClass("disabled");
    });
    //选择下架
    $("#goods_title_down_a").on("click", function () {
        $("#goods_title_up").addClass("invisible");
        $("#goods_title_down").removeClass("invisible");
        $("#goods_title_all").addClass("invisible");
        $("#goods_title_name").html("全部下架商品列表");

        status = 0;
        //$("#cboxLoadingGraphic i").remove();//let's remove a custom loading icon
        getAsyData();
        //商品处于下架状态可以删除
        $("#modal_goods_delete_bt").removeClass("disabled");

    });

    //选择全部
    $("#goods_title_all_a").on("click", function () {
        $("#goods_title_up").addClass("invisible");
        $("#goods_title_down").addClass("invisible");
        $("#goods_title_all").removeClass("invisible");
        $("#goods_title_name").html("全部商品列表");

        status = null;
        //$("#cboxLoadingGraphic i").remove();//let's remove a custom loading icon
        getAsyData();
        //商品不可删除
        $("#modal_goods_delete_bt").addClass("disabled");
    });


    /**
     * ================================================
     * 条件搜索 start
     */
//
//
//    //选择按时间升序 1
//    $("#goods_time_up_a").on("click",function(){
//        $("#goods_time_up").removeClass("invisible");
//        $("#goods_time_down").addClass("invisible");
//        $("#goods_num_up").addClass("invisible");
//        $("#goods_num_down").addClass("invisible");
//        $("#goods_price_up").addClass("invisible");
//        $("#goods_price_down").addClass("invisible");
//
//        order_by = 1 ;
//        //$("#cboxLoadingGraphic i").remove();//let's remove a custom loading icon
//        getAsyData();
//    });
//    //选择按时间降序 0
//    $("#goods_time_down_a").on("click",function(){
//        $("#goods_time_up").addClass("invisible");
//        $("#goods_time_down").removeClass("invisible");
//        $("#goods_num_up").addClass("invisible");
//        $("#goods_num_down").addClass("invisible");
//        $("#goods_price_up").addClass("invisible");
//        $("#goods_price_down").addClass("invisible");
//
//        order_by = 0 ;
//        //$("#cboxLoadingGraphic i").remove();//let's remove a custom loading icon
//        getAsyData();
//    });
//    //按销量降序 2
//    $("#goods_num_down_a").on("click",function(){
//        $("#goods_time_up").addClass("invisible");
//        $("#goods_time_down").addClass("invisible");
//        $("#goods_num_up").addClass("invisible");
//        $("#goods_num_down").removeClass("invisible");
//        $("#goods_price_up").addClass("invisible");
//        $("#goods_price_down").addClass("invisible");
//
//        order_by = 2 ;
//        //$("#cboxLoadingGraphic i").remove();//let's remove a custom loading icon
//        getAsyData();
//    });
//    //按销量升序 3
//    $("#goods_num_up_a").on("click",function(){
//        $("#goods_time_up").addClass("invisible");
//        $("#goods_time_down").addClass("invisible");
//        $("#goods_num_up").removeClass("invisible");
//        $("#goods_num_down").addClass("invisible");
//        $("#goods_price_up").addClass("invisible");
//        $("#goods_price_down").addClass("invisible");
//
//        order_by = 3 ;
//        //$("#cboxLoadingGraphic i").remove();//let's remove a custom loading icon
//        getAsyData();
//    });
//    //按价格降序 4
//    $("#goods_price_down_a").on("click",function(){
//        $("#goods_time_up").addClass("invisible");
//        $("#goods_time_down").addClass("invisible");
//        $("#goods_num_up").addClass("invisible");
//        $("#goods_num_down").addClass("invisible");
//        $("#goods_price_up").addClass("invisible");
//        $("#goods_price_down").removeClass("invisible");
//
//        order_by = 4 ;
//        //$("#cboxLoadingGraphic i").remove();//let's remove a custom loading icon
//        getAsyData();
//    });
//    //按价格升序 5
//    $("#goods_price_up_a").on("click",function(){
//        $("#goods_time_up").addClass("invisible");
//        $("#goods_time_down").addClass("invisible");
//        $("#goods_num_up").addClass("invisible");
//        $("#goods_num_down").addClass("invisible");
//        $("#goods_price_up").removeClass("invisible");
//        $("#goods_price_down").addClass("invisible");
//
//        order_by = 5 ;
//        //$("#cboxLoadingGraphic i").remove();//let's remove a custom loading icon
//        getAsyData();
//    });

    /**
     * 条件搜索 end
     * ======================================================
     */

    /**
     * 按分类搜索 start
     * ======================================================
     */


//    $("#goods_category_all_a").on("click", function () {
//        $("#goods_category_all").removeClass("invisible");
//        $("#goods_category_1").addClass("invisible");
//        $("#goods_category_2").addClass("invisible");
//        $("#goods_category_3").addClass("invisible");
//        $("#goods_category_4").addClass("invisible");
//
//        category = null;
//        getAsyData();
//    });
//
//    $("#goods_category_1_a").on("click", function () {
//        $("#goods_category_1").removeClass("invisible");
//        $("#goods_category_all").addClass("invisible");
//        $("#goods_category_2").addClass("invisible");
//        $("#goods_category_3").addClass("invisible");
//        $("#goods_category_4").addClass("invisible");
//
//        category = 1;
//        getAsyData();
//    });
//
//    $("#goods_category_2_a").on("click", function () {
//        $("#goods_category_2").removeClass("invisible");
//        $("#goods_category_all").addClass("invisible");
//        $("#goods_category_1").addClass("invisible");
//        $("#goods_category_3").addClass("invisible");
//        $("#goods_category_4").addClass("invisible");
//
//        category = 2;
//        getAsyData();
//    });
//
//    $("#goods_category_3_a").on("click", function () {
//        $("#goods_category_3").removeClass("invisible");
//        $("#goods_category_all").addClass("invisible");
//        $("#goods_category_2").addClass("invisible");
//        $("#goods_category_1").addClass("invisible");
//        $("#goods_category_4").addClass("invisible");
//
//        category = 3;
//        getAsyData();
//    });
//
//    $("#goods_category_4_a").on("click", function () {
//        $("#goods_category_4").removeClass("invisible");
//        $("#goods_category_all").addClass("invisible");
//        $("#goods_category_2").addClass("invisible");
//        $("#goods_category_3").addClass("invisible");
//        $("#goods_category_1").addClass("invisible");
//
//        category = 4;
//        getAsyData();
//    });

    getCategorys();

    function getCategorys() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/get/categorys",
            success: function (data) {
                if (data.code == 200) {

                    //var modal_goods_category = [];
                    var dropdown_menu_html = "";
                    if (data.number > 0) {
                        $.each(data.categoryList, function (k, category) {
                            modal_goods_category.push({id: category.id, text: category.name});
                            dropdown_menu_html += '<li><a id="goods_category_'+category.id+'_a" href="#"><i id="goods_category_'+category.id+'" class="icon-ok green invisible"></i>'+category.name+'</a></li>';
                        });
                        $("#dropdown_menu_category").append(dropdown_menu_html);


                        $.each(modal_goods_category, function (k, v1) {

                            $("#goods_category_"+v1.id+"_a").on("click", function () {
                                $("#goods_category_"+v1.id).removeClass("invisible");
                                $("#goods_category_all").addClass("invisible");
                                category = v1.id;
                                getAsyData();

                                $.each(modal_goods_category, function (index, v2) {
                                    if(v1.id != v2.id){
                                        $("#goods_category_"+v2.id).addClass("invisible");
                                    }
                                });

                            });

                        });

                        $("#goods_category_all_a").on("click", function () {
                            $("#goods_category_all").removeClass("invisible");
                            $.each(modal_goods_category, function (index, v2) {
                                $("#goods_category_"+v2.id).addClass("invisible");
                            });
                            category = null;
                            getAsyData();
                        });
                    }


                    $('#modal_edit_goods_category').editable({
                        type: 'select',
                        source: modal_goods_category,
                        success: function (response, newValue) {
                            var init_goods_category = 0;
                            $.each(modal_goods_category, function (k, category) {
                                if (category.text == newValue) {
                                    init_goods_category = category.id;
                                }
                            });
                            //修改提交
                            $.ajax({
                                type: 'POST',
                                dataType: 'json',
                                url: appName + "/goods/edit",
                                data: {id: goods_edit_id, category_id: init_goods_category},
                                success: function (data) {
                                    if (data.code == 200) {
                                        $.gritter.add({
                                            title: "恭喜您，修改成功！",
                                            time: 2000,
                                            class_name: 'gritter-success'
                                        });
                                        $("#modal_edit_goods_category").html(newValue);
                                    } else {
                                        if (data.msg != "") {
                                            $.gritter.add({
                                                title: data.msg,
                                                time: 2000,
                                                class_name: 'gritter-error gritter-center'
                                            });
                                        } else {
                                            $.gritter.add({
                                                title: "修改失败，请联系管理员！",
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
                    });


                } else {
                    if (data.msg != "") {
                        $.bootstrapGrowl("错误code：" + data.code + ",错误信息：" + data.msg);
                    }
                }
            },
            error: function (XMLHttpRequest) {
                $.bootstrapGrowl("服务器出错：" + XMLHttpRequest.status + "===" + XMLHttpRequest.statusText);
            }
        });
    }


    /**
     * 按分类搜索 end
     * ======================================================
     */


    /**
     * ======================================================
     * 修改商品信息 start
     * */


    $('#goods_thumbnails').on('click', 'button.btn-info',function (e) {
        //阻止a标签起作用
        e.preventDefault();
        //阻止冒泡
        e.stopPropagation();
        //编辑按钮
        goods_edit_id = $(this).attr("id").substring(8);


        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/view",
            data: {goodsId: goods_edit_id},
            success: function (data) {
                if (data.code == 200) {
                    $("#modal_edit_name").html(data.goods.name);
                    $("#modal_edit_price").html(data.goods.price);
                    $("#modal_edit_original").html(data.goods.original);
                    $("#modal_edit_postage").html(data.goods.postage);
                    //init_goods_price_type = data.goods.price_type;
//                    if (init_goods_price_type == 0){
//                        $("#modal_edit_type").html("龙筹");
//                    } else if (init_goods_price_type == 1){
//                        $("#modal_edit_type").html("龙币");
//                    }
                    var init_goods_category_id = data.goods.category_id;
//                    if (init_goods_category_id == 1) {
//                        $("#modal_edit_goods_category").html("球鞋");
//                    } else if (init_goods_category_id == 2) {
//                        $("#modal_edit_goods_category").html("球衣");
//                    } else if (init_goods_category_id == 3) {
//                        $("#modal_edit_goods_category").html("运动智能产品");
//                    } else if (init_goods_category_id == 4) {
//                        $("#modal_edit_goods_category").html("时尚电子产品");
//                    } else {
//                        $("#modal_edit_goods_category").html(init_goods_category_id);
//                    }
                    $.each(modal_goods_category, function (k, category) {
                        if (category.id == init_goods_category_id) {
                            $("#modal_edit_goods_category").html(category.text);
                        }
                    });
                    $("#modal_edit_sales").html(data.goods.sales);
                    $("#modal_edit_stock").html(data.goods.stock);
                    $("#modal_edit_sort_index").html(data.goods.sort_index);
                    if (data.goods.ex_prop) {
                        $("#modal_edit_exprop").html(data.goods.ex_prop);
                    } else {
                        $("#modal_edit_exprop").html("无");
                    }
                    var ex_image = data.goods.path_more;
                    if (ex_image) {
                        $("#modal_edit_eximage").html(ex_image);
                        var images_tmp = ex_image.split(",");
                        var images_html = "";
                        for (var i = 0; i < images_tmp.length; i++) {
                            images_html += "<img width='60' height='40' src='" + image_url + images_tmp[i] + "' /> ";
                        }
                        $("#modal_edit_eximage_show").html(images_html);
                    } else {
                        $("#modal_edit_eximage").html("无");
                        $("#modal_edit_eximage_show").html("无");
                    }
//                    if (data.goods.exParam){
//                        $("#modal_edit_exparam").html(data.goods.exParam);
//                    } else {
//                        $("#modal_edit_exparam").html("无");
//                    }
                    old_photo_path = data.goods.path;
                    $("#modal_edit_image").html(data.goods.path);
                    $("#modal_edit_photo").attr("src", image_url + data.goods.path);
                    if (data.goods.type == 0) {
                        $("#modal_edit_exchange_d").addClass("hidden");
                        $("#modal_edit_goods_type").html("实物商品");
                    }
//                    else if(data.goods.type == 1){
//                        $("#modal_edit_exchange").addClass("editable").html(data.goods.exchange_num);
//                        $("#modal_edit_exchange_d").removeClass("hidden");
//                        $("#modal_edit_goods_type").html("龙筹换龙币");
//                    }
                    else if (data.goods.type == 1) {
                        $("#modal_edit_exchange_d").addClass("hidden");
                        $("#modal_edit_goods_type").html("手机充值卡");
                    }

                    //模态窗口打开
                    $("#modal_goods_edit").modal({backdrop: 'static'});

                } else {
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    } else {
                        $.gritter.add({
                            title: "未知错误！",
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


    }).on('click', 'button.btn-success',function (e) {
        //阻止a标签起作用
        e.preventDefault();
        //阻止冒泡
        e.stopPropagation();
        //上架按钮
        var goods_id = $(this).attr("id").substring(6);

        //修改提交
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/edit",
            data: {id: goods_id, status: 1},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "该商品已成功上架！",
                        time: 2000,
                        class_name: 'gritter-success'
                    });
                    //移除元素
                    $("#li_goods_" + goods_id).remove();
                } else {
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    } else {
                        $.gritter.add({
                            title: "修改失败，请联系管理员！",
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

    }).on('click', 'button.btn-danger', function (e) {
        //阻止a标签起作用
        e.preventDefault();
        //阻止冒泡
        e.stopPropagation();
        //下架按钮
        var goods_id = $(this).attr("id").substring(8);


        //修改提交
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/edit",
            data: {id: goods_id, status: 0},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "该商品已成功下架！",
                        time: 2000,
                        class_name: 'gritter-success'
                    });
                    //移除元素
                    $("#li_goods_" + goods_id).remove();
                    //从主页推荐上退下来（不用判断是否存在，直接删redis缓存）
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: appName + "/goods/delete/recommendId",
                        data: {id: goods_id}
                    });
                } else {
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    } else {
                        $.gritter.add({
                            title: "修改失败，请联系管理员！",
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

    //商品推荐
    $("#modal_recommend_bt").on("click", function () {

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/save/recommendId",
            data: {id: goods_edit_id},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "恭喜您，推荐成功！",
                        time: 2000,
                        class_name: 'gritter-success'
                    });
                } else {
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    } else {
                        $.gritter.add({
                            title: "修改失败，请联系管理员！",
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

    $("#modal_recommend_delete_bt").on("click", function () {

        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/delete/recommendId",
            data: {id: goods_edit_id},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "恭喜您，撤销推荐成功！",
                        time: 2000,
                        class_name: 'gritter-success'
                    });
                } else {
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    } else {
                        $.gritter.add({
                            title: "修改失败，请联系管理员！",
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


    //商品删除
    $("#modal_goods_delete_bt").on("click", function () {
        bootbox.confirm("确定删除该商品？", function (result) {
            if (result) {
                //确认删除
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    url: appName+"/goods/delete",
                    data:{goodsId:goods_edit_id},
                    success: function (data) {
                        if (data.code == 200) {
                            $.gritter.add({
                                title: '删除成功！',
                                time: 2000,
                                class_name: 'gritter-success'
                            });
                            //关闭modal窗口
                            $("#modal_goods_edit").modal('hide');
                            //移除元素
                            $("#li_goods_"+goods_edit_id).remove();
                        } else {
                            $.gritter.add({
                                title: '出现code:'+data.code+' 错误，详细信息：'+data.msg,
                                text: XMLHttpRequest.statusText,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
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
        });
    });


    //editables on first profile page
    $.fn.editable.defaults.mode = 'inline';
    $.fn.editableform.loading = "<div class='editableform-loading'><i class='light-blue icon-2x icon-spinner icon-spin'></i></div>";
    $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="icon-ok icon-white"></i></button>' +
        '<button type="button" class="btn editable-cancel"><i class="icon-remove"></i></button>';

    //editables
    $('#modal_edit_name').editable({
        type: 'text',
        name: 'name',
        success: function (response, newValue) {

            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, name: newValue},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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
    });

    //价格修改
    $('#modal_edit_price').editable({
        type: 'text',
        name: 'price',
        success: function (response, newValue) {

            newValue = newValue.trim();
            if (isNaN(newValue)) {
                $.gritter.add({
                    title: '请输入数字！',
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            }
            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, price: newValue},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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

    });

    //原价修改
    $('#modal_edit_original').editable({
        type: 'text',
        name: 'price',
        success: function (response, newValue) {

            newValue = newValue.trim();
            if (isNaN(newValue)) {
                $.gritter.add({
                    title: '请输入数字！',
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            }
            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, original: newValue},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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

    });


    //邮费修改
    $('#modal_edit_postage').editable({
        type: 'text',
        name: 'postage',
        success: function (response, newValue) {

            newValue = newValue.trim();
            if (isNaN(newValue)) {
                $.gritter.add({
                    title: '请输入数字！',
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            }
            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, postage: newValue},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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

    });


//    var price_type_select = [];
//    $.each({ "0": "龙筹", "1": "龙币"}, function(k, v) {
//        price_type_select.push({id: k, text: v});
//    });
//
//    $('#modal_edit_type').editable({
//        type: 'select',
//        source: price_type_select,
//        success: function(response, newValue) {
//            if (newValue == "龙筹"){
//                init_goods_price_type = 0 ;
//            } else if (newValue == "龙币"){
//                init_goods_price_type = 1 ;
//            }
//            //修改提交
//            $.ajax({
//                type: 'POST',
//                dataType: 'json',
//                url: appName+"/goods/edit",
//                data: {id:goods_edit_id,price_type:init_goods_price_type},
//                success: function (data) {
//                    if (data.code == 200) {
//                        $.gritter.add({
//                            title: "恭喜您，修改成功！",
//                            time: 2000,
//                            class_name: 'gritter-success'
//                        });
//                        if (init_goods_price_type == 0){
//                            $("#modal_edit_type").html("龙筹");
//                        } else if (init_goods_price_type == 1){
//                            $("#modal_edit_type").html("龙币");
//                        }
//                    } else {
//                        if (data.msg != "") {
//                            $.gritter.add({
//                                title: data.msg,
//                                time: 2000,
//                                class_name: 'gritter-error gritter-center'
//                            });
//                        } else {
//                            $.gritter.add({
//                                title: "修改失败，请联系管理员！",
//                                time: 2000,
//                                class_name: 'gritter-error gritter-center'
//                            });
//                        }
//                    }
//                },
//                error: function (XMLHttpRequest) {
//                    $.gritter.add({
//                        title: XMLHttpRequest.status,
//                        text: XMLHttpRequest.statusText,
//                        time: 2000,
//                        class_name: 'gritter-error gritter-center'
//                    });
//                }
//            });
//        }
//    });


    var goods_type_select = [];
    $.each({ "0": "实物商品", "1": "手机充值卡"}, function (k, v) {
        goods_type_select.push({id: k, text: v});
    });

    $('#modal_edit_goods_type').editable({
        type: 'select',
        source: goods_type_select,
        success: function (response, newValue) {
            var init_goods_type = 0;
            if (newValue == "手机充值卡") {
                init_goods_type = 1;
            }
            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, type: init_goods_type},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                        if (init_goods_type == 0) {
                            $("#modal_edit_goods_type").html("实物商品");
                        }
//                        else if (init_goods_type == 1){
//                            $("#modal_edit_goods_type").html("龙筹换龙币");
//                        }
                        else if (init_goods_type == 1) {
                            $("#modal_edit_goods_type").html("手机充值卡");
                        }
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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
    });


    //库存修改
    $('#modal_edit_stock').editable({
        type: 'text',
        name: 'number',
        success: function (response, newValue) {

            newValue = newValue.trim();
            if (isNaN(newValue)) {
                $.gritter.add({
                    title: '请输入数字！',
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            }
            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, stock: newValue},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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
    });

    //销量修改
    $('#modal_edit_sales').editable({
        type: 'text',
        name: 'number',
        success: function (response, newValue) {

            newValue = newValue.trim();
            if (isNaN(newValue)) {
                $.gritter.add({
                    title: '请输入数字！',
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            }
            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, sales: newValue},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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
    });

    //排序值修改
    $('#modal_edit_sort_index').editable({
        type: 'text',
        name: 'number',
        success: function (response, newValue) {

            newValue = newValue.trim();
            if (isNaN(newValue)) {
                $.gritter.add({
                    title: '请输入数字！',
                    time: 2000,
                    class_name: 'gritter-error gritter-center'
                });
                return;
            }
            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, sort_index: newValue},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        if (data.msg != "") {
                            $.gritter.add({
                                title: data.msg,
                                time: 2000,
                                class_name: 'gritter-error gritter-center'
                            });
                        } else {
                            $.gritter.add({
                                title: "修改失败，请联系管理员！",
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
    });


    //修改虚拟兑换量
//    $('#modal_edit_exchange').editable({
//        type: 'text',
//        name : 'number',
//        success: function(response, newValue) {
//
//            newValue = newValue.trim();
//            if (isNaN(newValue)){
//                $.gritter.add({
//                    title: '请输入数字！',
//                    time: 2000,
//                    class_name: 'gritter-error gritter-center'
//                });
//                return ;
//            }
//            //修改提交
//            $.ajax({
//                type: 'POST',
//                dataType: 'json',
//                url: appName+"/goods/edit",
//                data: {id:goods_edit_id,exchange_num:newValue},
//                success: function (data) {
//                    if (data.code == 200) {
//                        $.gritter.add({
//                            title: "恭喜您，修改成功！",
//                            time: 2000,
//                            class_name: 'gritter-success'
//                        });
//                    } else {
//                        $.gritter.add({
//                            title: '出现code:'+data.code+' 错误，详细信息：'+data.msg,
//                            text: XMLHttpRequest.statusText,
//                            time: 2000,
//                            class_name: 'gritter-error gritter-center'
//                        });
//                    }
//                },
//                error: function (XMLHttpRequest) {
//                    $.gritter.add({
//                        title: XMLHttpRequest.status,
//                        text: XMLHttpRequest.statusText,
//                        time: 2000,
//                        class_name: 'gritter-error gritter-center'
//                    });
//                }
//            });
//        }
//    });

    //修改商品参数
    $('#modal_edit_exprop').editable({
        type: 'textarea',
        success: function (response, newValue) {

            newValue = newValue.trim();

            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, ex_prop: newValue},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        $.gritter.add({
                            title: '出现code:' + data.code + ' 错误，详细信息：' + data.msg,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
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
    });

    //修改商品主图
    $('#modal_edit_image').editable({
        type: 'text',
        success: function (response, newValue) {

            newValue = newValue.trim();
            if (!newValue) {
                return;
            }
            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, path: newValue},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        $.gritter.add({
                            title: '出现code:' + data.code + ' 错误，详细信息：' + data.msg,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
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
    });

    //修改商品属性
//    $('#modal_edit_exparam').editable({
//        type: 'textarea',
//        success: function(response, newValue) {
//
//            newValue = newValue.trim();
//
//            //修改提交
//            $.ajax({
//                type: 'POST',
//                dataType: 'json',
//                url: appName+"/goods/edit",
//                data: {id:goods_edit_id,exParam:newValue},
//                success: function (data) {
//                    if (data.code == 200) {
//                        $.gritter.add({
//                            title: "恭喜您，修改成功！",
//                            time: 2000,
//                            class_name: 'gritter-success'
//                        });
//                    } else {
//                        $.gritter.add({
//                            title: '出现code:'+data.code+' 错误，详细信息：'+data.msg,
//                            text: XMLHttpRequest.statusText,
//                            time: 2000,
//                            class_name: 'gritter-error gritter-center'
//                        });
//                    }
//                },
//                error: function (XMLHttpRequest) {
//                    $.gritter.add({
//                        title: XMLHttpRequest.status,
//                        text: XMLHttpRequest.statusText,
//                        time: 2000,
//                        class_name: 'gritter-error gritter-center'
//                    });
//                }
//            });
//        }
//    });

    //修改商品轮播照片
    $('#modal_edit_eximage').editable({
        type: 'textarea',
        success: function (response, newValue) {

            newValue = newValue.trim();

            //修改提交
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: appName + "/goods/edit",
                data: {id: goods_edit_id, path_more: newValue},
                success: function (data) {
                    if (data.code == 200) {
                        $.gritter.add({
                            title: "恭喜您，修改成功！",
                            time: 2000,
                            class_name: 'gritter-success'
                        });
                    } else {
                        $.gritter.add({
                            title: '出现code:' + data.code + ' 错误，详细信息：' + data.msg,
                            text: XMLHttpRequest.statusText,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
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
    });


//    $('#modal_edit_queue').editable({
//        type: 'text',
//        success: function(response, newValue) {
//
//            newValue = newValue.trim();
//            //修改提交
//            $.ajax({
//                type: 'POST',
//                dataType: 'json',
//                url: appName+"/goods/queue",
//                data: {goodsId:goods_edit_id,path:newValue},
//                success: function (data) {
//                    if (data.code == 200) {
//                        $.gritter.add({
//                            title: "添加成功！",
//                            time: 2000,
//                            class_name: 'gritter-success'
//                        });
//                    } else {
//                        if (data.msg != "") {
//                            $.gritter.add({
//                                title: "错误code：" + data.code + ",错误信息：" + data.msg,
//                                time: 2000,
//                                class_name: 'gritter-error gritter-center'
//                            });
//                        }
//                    }
//                },
//                error: function (XMLHttpRequest) {
//                    $.gritter.add({
//                        title: XMLHttpRequest.status,
//                        text: XMLHttpRequest.statusText,
//                        time: 2000,
//                        class_name: 'gritter-error gritter-center'
//                    });
//                }
//            });
//        }
//    });


    //描述信息修改
    $("#modal_edit_goods_content_button").on("click", function () {
        var newValue = $("#modal_edit_goods_content").html();
        if (!newValue) {
            return;
        }
        //修改提交
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/edit",
            data: {id: goods_edit_id, descr: newValue},
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "恭喜您，修改成功！",
                        time: 2000,
                        class_name: 'gritter-success'
                    });
                    $("#modal_goods_edit_content").modal('hide');
                } else {
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    } else {
                        $.gritter.add({
                            title: "修改失败，请联系管理员！",
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


    // *** editable photo *** //
    try {//ie8 throws some harmless exception, so let's catch it

        //it seems that editable plugin calls appendChild, and as Image doesn't have it, it causes errors on IE at unpredicted points
        //so let's have a fake appendChild for it!
        if (/msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase())) Image.prototype.appendChild = function (el) {
        }

        var last_gritter
        $('#modal_edit_photo').editable({
            type: 'image',
            name: 'avatar',
            value: null,
            image: {
                //specify ace file input plugin's options here
                btn_choose: '修改照片',
                droppable: true,
                //and a few extra ones here
                name: 'avatar',//put the field name here as well, will be used inside the custom plugin
                max_size: 210000,//~100Kb
                on_error: function (code) {//on_error function will be called when the selected file has a problem
                    if (last_gritter) $.gritter.remove(last_gritter);
                    if (code == 1) {//file format error
                        last_gritter = $.gritter.add({
                            title: 'File is not an image!',
                            text: 'Please choose a jpg|gif|png image!',
                            class_name: 'gritter-error gritter-center'
                        });
                    } else if (code == 2) {//file size rror
                        last_gritter = $.gritter.add({
                            title: 'File too big!',
                            text: 'Image size should not exceed 200Kb!',
                            class_name: 'gritter-error gritter-center'
                        });
                    }
                    else {//other error
                    }
                },
                on_success: function () {
                    $.gritter.removeAll();
                }
            },
            url: function (params) {

                var deferred = new $.Deferred

                //if value is empty, means no valid files were selected
                //but it may still be submitted by the plugin, because "" (empty string) is different from previous non-empty value whatever it was
                //so we return just here to prevent problems
                var value = $('#modal_edit_photo').next().find('input[type=hidden]:eq(0)').val();
                if (!value || value.length == 0) {
                    deferred.resolve();
                    return deferred.promise();
                }


                //dummy upload
                setTimeout(function () {
                    if ("FileReader" in window) {
                        //for browsers that have a thumbnail of selected image
                        var thumb = $('#modal_edit_photo').next().find('img').data('thumb');
                        if (thumb) $('#modal_edit_photo').get(0).src = thumb;

                        //上传照片
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: appName + "/goods/edit/image",
                            data: {thumb: thumb},
                            success: function (data) {
                                if (data.flag) {

                                    //图片路径修改到数据库中
                                    $.ajax({
                                        type: 'POST',
                                        dataType: 'json',
                                        url: appName + "/goods/edit",
                                        data: {id: goods_edit_id, path: data.imageUrl},
                                        success: function (data) {
                                            if (data.code == 200) {
                                                $.gritter.add({
                                                    title: "恭喜您，照片修改成功",
                                                    time: 2000,
                                                    class_name: 'gritter-success'
                                                });
                                            } else {
                                                if (data.msg != "") {
                                                    $.gritter.add({
                                                        title: data.msg,
                                                        time: 2000,
                                                        class_name: 'gritter-error gritter-center'
                                                    });
                                                } else {
                                                    $.gritter.add({
                                                        title: "注册失败，请联系管理员！",
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

                                    deferred.resolve({'status': 'OK'});

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
                }, parseInt(Math.random() * 800 + 800))

                return deferred.promise();
            },

            success: function (response, newValue) {
            }
        })
    } catch (e) {
    }


    /**
     * ======================================================
     * 修改商品信息 end
     * */


    /**
     * ======================================================
     * 添加商品照片 start
     * */

    function addImage() {
        $("#image_form").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 10, // MB
            url: appName + "/goods/add/image",
            maxFiles: 1,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
//            uploadMultiple:false,
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传商品主图（一张）</span> \
                <span class="smaller-80 grey">(拖曳或者直接点击上传)</span> <br /> \
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
                                title: "恭喜，已成功上传" + res.image_num + "张照片！",
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
                            });

                            upload_photo_key = res.key;
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
                    alert();
                    //如果是成功上传的照片，就进行相关的操作
                    if (data.accepted) {
                    }
                });
            }
        });
    }

    function addImage2() {
        $("#image_form2").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 100, // MB
            url: appName + "/goods/add/image",
            maxFiles: 5,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传商品滚播图（最多五张）</span> \
            <span class="smaller-80 grey">(拖曳或者直接点击上传)</span> <br /> \
            <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传五张照片！',
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
                                text: "图片地址：" + image_url + res.key,
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
                            });
                            upload_photo_roll_key += res.key + ",";
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
            }
        });
    }

    function addImage3() {
        $("#image_form3").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 150, // MB
            url: appName + "/goods/add/image",
            maxFiles: 10,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i>上传商品介绍图（最多十张）</span> \
            <span class="smaller-80 grey">(拖曳或者直接点击上传)</span> <br /> \
            <i class="upload-icon icon-cloud-upload blue icon-3x"></i>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传十张照片！',
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
                                text: "图片地址：" + image_url + res.key,
                                //sticky: true,
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
                            });
                            show_image += "<img _moz_dirty='' src='" + image_url + res.key + "' _moz_resizing='true'><br>";
                            $("#modal_add_goods_editor").html(show_image);
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
            }
        });
    }

    function addImage4() {
        $("#image_form4").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 150, // MB
            url: appName + "/goods/add/image",
            maxFiles: 10,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 上传图片获取地址插入到商品详情中</span>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传十张照片！',
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
                                text: "图片地址：" + image_url + res.key,
                                sticky: true,
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
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
            }
        });
    }

    function addImage5() {
        $("#image_form5").dropzone({
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 150, // MB
            url: appName + "/goods/add/image",
            maxFiles: 10,
            acceptedFiles: ".jpg,.gif,.png,.jpeg,.bmp",
            addRemoveLinks: true,
            dictDefaultMessage: '<span class="bigger-150 bolder"><i class="icon-caret-right red"></i> 上传图片获取地址</span>',
            dictResponseError: '上传图片出错！',
            dictMaxFilesExceeded: '只能允许上传十张照片，把已经上传的清除掉就能继续上传了',
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
                                text: "图片地址：" + res.key,
                                sticky: true,
                                time: 2000,
                                class_name: 'gritter-success gritter-center'
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
            }
        });
    }

    try {
        addImage();
        addImage2();
        addImage3();
        addImage4();
        addImage5();
    } catch (e) {
        alert('Dropzone.js does not support older browsers!');
    }

    /**
     * ======================================================
     * 添加商品照片 end
     * */


    /**
     * =======================
     * 商品添加 start
     **/
        //模态窗口打开
    $("#goods_add_bt").on("click", function () {
        $("#modal_goods_add").modal({backdrop: 'static'});
    });


    //点击add提交
    $('#modal_add_goods_button').on("click", function () {
        if (upload_photo_key == "") {
            $.gritter.add({
                title: "没有添加商品照片",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        var goods_name = $("#modal_add_goods_title").val();
        var goods_descr = $("#modal_add_goods_editor").html();
        var goods_price = $("#modal_add_goods_price").val();
        var goods_price_type = $("#modal_add_goods_price_type").val();
        var goods_type = $("#modal_add_goods_type").val();
        var goods_stock = $("#modal_add_goods_stock").val();
        var goods_original_price = $("#modal_add_goods_original_price").val();
        var goods_postage = $("#modal_add_goods_postage").val();
        if (goods_name == "") {
            $.gritter.add({
                title: "请添加商品标题",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        if (goods_price == "") {
            $.gritter.add({
                title: "请添加商品单价",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        if (goods_stock == "") {
            $.gritter.add({
                title: "请添加商品库存",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        var prop = "";
        var prop_flag = true;
        $("#modal_add_goods_prop").find('.col-sm-10').each(function () {
            var key = $(this).find('.col-xs-4').val();
            var value = $(this).find('.col-xs-5').val();
            if ((key && !value) || (!key && value)) {
                prop_flag = false;
                return;
            }
            prop += key + ":" + value + ";";
        });
        var length = prop.length;
        var tmp_prop = prop.substring(length - 2, length);
        if (tmp_prop == ":;") {
            prop = prop.substring(0, length - 2);
        }
        if (!prop_flag) {
            $.gritter.add({
                title: "额外参数名或值不能缺一！",
                time: 2000,
                class_name: 'gritter-error gritter-center'
            });
            return;
        }
        if (upload_photo_roll_key) {
            upload_photo_roll_key = upload_photo_roll_key.substr(0, upload_photo_roll_key.length - 1);
        }

        //添加提交
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: appName + "/goods/edit",
            data: {name: goods_name, price: goods_price, price_type: goods_price_type, path: upload_photo_key,
                stock: goods_stock, descr: goods_descr, type: goods_type, exProp: prop, exImage: upload_photo_roll_key,
                original_price: goods_original_price, postage: goods_postage
            },
            success: function (data) {
                if (data.code == 200) {
                    $.gritter.add({
                        title: "恭喜您，添加成功！",
                        time: 2000,
                        class_name: 'gritter-success'
                    });
                    var goods = data.goods;
                    var htmlStr = showGoodsData(goods.id, goods.name, goods.price, goods.price_type, goods.path, 0,
                        goods.stock, new Date(), goods.update_time, goods.status, goods.type, goods.queue);
                    $("#goods_thumbnails").append(htmlStr);
                    $("#modal_goods_add").modal('hide');
                } else {
                    if (data.msg != "") {
                        $.gritter.add({
                            title: data.msg,
                            time: 2000,
                            class_name: 'gritter-error gritter-center'
                        });
                    } else {
                        $.gritter.add({
                            title: "修改失败，请联系管理员！",
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

    $("#modal_goods_add").on("hidden.bs.modal", function () {
        //清空原来的内容
        $("#image_form").remove();
        $("#image_form2").remove();
        $("#image_form3").remove();
        var photo_html = "<form id=\"image_form\" action=\"#\" class=\"dropzone\" method=\"post\" enctype=\"multipart/form-data\">" +
            "<div class=\"fallback\">" +
            "<input name=\"file\" type=\"file\"/>" +
            "</div>" +
            "</form>";
        var photo_html2 = "<form id='image_form2' action='#' class='dropzone' method='post' enctype='multipart/form-data'>" +
            "<div class='fallback'><input name='file' type='file'/></div></form>";
        var photo_html3 = "<form id='image_form3' action='#' class='dropzone' method='post' enctype='multipart/form-data'>" +
            "<div class='fallback'><input name='file' type='file'/></div></form>";
        $("#image_form_after_add").append(photo_html);
        $("#image_form_after_add2").append(photo_html2);
        $("#image_form_after_add3").append(photo_html3);
        $("#modal_add_goods_title").val("");
        $("#modal_add_goods_editor").html("");
        $("#modal_add_goods_price").val("");
        $("#modal_add_goods_price_type").val("");
        $("#modal_add_goods_stock").val("");
        $("#modal_add_goods_original_price").val("");
        $("#modal_add_goods_postage").val("");

        upload_photo_roll_key = "";
        $("#modal_add_goods_prop").find(".col-sm-10").remove();
        $("#modal_add_goods_prop").append('<div class="col-sm-10"><div> \
            <input type="text" class="col-xs-4" placeholder="商品属性名称（比如：尺寸 颜色）"/><span class="col-xs-1"></span> \
            <input type="text" class="col-xs-5" placeholder="商品属性值，多个值用英文逗号隔开（比如：红色,蓝色,绿色）" /></div></div>');
        addImage();
        addImage2();
        addImage3();
        show_image = "";
    });

//    $("#modal_goods_edit").on("hidden.bs.modal",function(){
//        $("#modal_edit_queue").html("请选择");
//    });


    $('#modal_add_goods_editor').ace_wysiwyg({
        toolbar: [
            'font',
            null,
            'fontSize',
            null,
            {name: 'bold', className: 'btn-info'},
            {name: 'italic', className: 'btn-info'},
            {name: 'strikethrough', className: 'btn-info'},
            {name: 'underline', className: 'btn-info'},
            null,
            {name: 'insertunorderedlist', className: 'btn-success'},
            {name: 'insertorderedlist', className: 'btn-success'},
            {name: 'outdent', className: 'btn-purple'},
            {name: 'indent', className: 'btn-purple'},
            null,
            {name: 'justifyleft', className: 'btn-primary'},
            {name: 'justifycenter', className: 'btn-primary'},
            {name: 'justifyright', className: 'btn-primary'},
            {name: 'justifyfull', className: 'btn-inverse'},
            null,
            {name: 'createLink', className: 'btn-pink'},
            {name: 'unlink', className: 'btn-pink'},
            null,
            {name: 'insertImage', className: 'btn-success'},
            null,
            'foreColor',
            null,
            {name: 'undo', className: 'btn-grey'},
            {name: 'redo', className: 'btn-grey'}
        ],
        'wysiwyg': {
            fileUploadError: showErrorAlert
        }
    }).prev().addClass('wysiwyg-style3');

    $('#modal_edit_goods_content').ace_wysiwyg({
        toolbar: [
            'font',
            null,
            'fontSize',
            null,
            {name: 'bold', className: 'btn-info'},
            {name: 'italic', className: 'btn-info'},
            {name: 'strikethrough', className: 'btn-info'},
            {name: 'underline', className: 'btn-info'},
            null,
            {name: 'insertunorderedlist', className: 'btn-success'},
            {name: 'insertorderedlist', className: 'btn-success'},
            {name: 'outdent', className: 'btn-purple'},
            {name: 'indent', className: 'btn-purple'},
            null,
            {name: 'justifyleft', className: 'btn-primary'},
            {name: 'justifycenter', className: 'btn-primary'},
            {name: 'justifyright', className: 'btn-primary'},
            {name: 'justifyfull', className: 'btn-inverse'},
            null,
            {name: 'createLink', className: 'btn-pink'},
            {name: 'unlink', className: 'btn-pink'},
            null,
            {name: 'insertImage', className: 'btn-success'},
            null,
            'foreColor',
            null,
            {name: 'undo', className: 'btn-grey'},
            {name: 'redo', className: 'btn-grey'}
        ],
        'wysiwyg': {
            fileUploadError: showErrorAlert
        }
    }).prev().addClass('wysiwyg-style2');


    if (typeof jQuery.ui !== 'undefined' && /applewebkit/.test(navigator.userAgent.toLowerCase())) {

        var lastResizableImg = null;

        function destroyResizable() {
            if (lastResizableImg == null) return;
            lastResizableImg.resizable("destroy");
            lastResizableImg.removeData('resizable');
            lastResizableImg = null;
        }

        var enableImageResize = function () {
            $('.wysiwyg-editor')
                .on('mousedown', function (e) {
                    var target = $(e.target);
                    if (e.target instanceof HTMLImageElement) {
                        if (!target.data('resizable')) {
                            target.resizable({
                                aspectRatio: e.target.width / e.target.height
                            });
                            target.data('resizable', true);

                            if (lastResizableImg != null) {//disable previous resizable image
                                lastResizableImg.resizable("destroy");
                                lastResizableImg.removeData('resizable');
                            }
                            lastResizableImg = target;
                        }
                    }
                })
                .on('click', function (e) {
                    if (lastResizableImg != null && !(e.target instanceof HTMLImageElement)) {
                        destroyResizable();
                    }
                })
                .on('keydown', function () {
                    destroyResizable();
                });
        }

        enableImageResize();

    }

    function showErrorAlert(reason, detail) {
        var msg = '';
        if (reason === 'unsupported-file-type') {
            msg = "Unsupported format " + detail;
        }
        else {
            console.log("error uploading file", reason, detail);
        }
        $('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>' +
            '<strong>File upload error</strong> ' + msg + ' </div>').prependTo('#alerts');
    }


    /**
     * =======================
     * 商品添加 end
     **/

    $("#modal_add_goods_price").spinner({
        min: 0,
        step: 10,
        numberFormat: "n",
        create: function (event, ui) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if (ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });


    $("#modal_add_goods_stock").spinner({
        min: 0,
        step: 10,
        numberFormat: "n",
        create: function (event, ui) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if (ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });

    $("#modal_add_goods_original_price").spinner({
        min: 0,
        step: 20,
        numberFormat: "n",
        create: function (event, ui) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if (ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });

    $("#modal_add_goods_postage").spinner({
        min: 0,
        step: 20,
        numberFormat: "n",
        create: function (event, ui) {
            //add custom classes and icons
            $(this).next().addClass('btn btn-success').html('<i class="icon-plus"></i>')
                .next().addClass('btn btn-danger').html('<i class="icon-minus"></i>')
            //larger buttons on touch devices
            if (ace.click_event == "tap") $(this).closest('.ui-spinner').addClass('ui-spinner-touch');
        }
    });


    //the button to add a new prop input
    $('#id-add-attachment').on('click', function () {
        $("#modal_add_goods_prop").append('<div class="col-sm-10">\
            <div><input type="text" class="col-xs-4" placeholder="商品属性名称（如：尺寸 颜色）"/><span class="col-xs-1"></span>\
            <input type="text" class="col-xs-5" placeholder="商品属性值，多个值用英文逗号隔开（如：红色,蓝色,绿色）" />\
            </div><a href="#" data-action="delete" class="middle"><i class="icon-trash red bigger-130 middle"></i></a></div>')
            .find('a[data-action=delete]').on('click', function (e) {
                e.preventDefault();
                $(this).closest('.col-sm-10').hide(300, function () {
                    $(this).remove();
                });
            });
    });


    $("#modal_goods_edit_content").on("hidden.bs.modal", function () {
        //清空原来的内容
        $("#image_form4").remove();
        var photo_html4 = "<form id='image_form4' action='#' class='dropzone' method='post' enctype='multipart/form-data'>" +
            "<div class='fallback'><input name='file' type='file'/></div></form>";
        $("#image_form_after_add4").append(photo_html4);
        addImage4();
    });


});