define(function (require, exports, module) {

    var title = $(document)[0].title;

    //激活菜单栏显示标志
    $("#menu_list li").each(function () {
        $(this).removeClass("active");

        switch (title){
            case "主页" :
                $("#main").addClass("active");
                break ;
            case "角色列表" :
                $("#authority_item").addClass("active open");
                $("#role").addClass("active");
                break;
            case "权限管理" :
                $("#authority_item").addClass("active open");
                $("#authority").addClass("active");
                break;
            case "登陆日志" :
                $("#authority_item").addClass("active open");
                $("#role_log").addClass("active");
                break;
            case "马甲管理" :
                $("#authority_item").addClass("active open");
                $("#aliases").addClass("active");
                break;
            case "足球赛事管理" :
                $("#event_item").addClass("active open");
                $("#event_fb").addClass("active");
                break;
            case "篮球赛事管理" :
                $("#event_item").addClass("active open");
                $("#event_bb").addClass("active");
                break;
            case "赛事结算管理" :
                $("#event_item").addClass("active open");
                $("#event_settle").addClass("active");
                break;
            case "赔率管理" :
                $("#event_item").addClass("active open");
                $("#event_odds_manage").addClass("active");
                break;
            case "异常赛事管理" :
                $("#event_item").addClass("active open");
                $("#event_abnormal").addClass("active");
                break;
            case "投注回滚" :
                $("#event_item").addClass("active open");
                $("#event_rollback").addClass("active");
                break;
                
            case "球队管理" :
                $("#event_item").addClass("active open");
                $("#event_team_edit").addClass("active");
                break;
                
            case "联赛管理" :
                $("#event_item").addClass("active open");
                $("#event_cup_edit").addClass("active");
                break;
           
            case "球员管理" :
                $("#event_item").addClass("active open");
                $("#event_player_edit").addClass("active");
                break;
            case "比赛模式管理" :
                $("#event_item").addClass("active open");
                $("#event_module").addClass("active");
                break;
            case "显示的押押" :
                $("#event_item").addClass("active open");
                $("#event_yy_show").addClass("active");
                $("#event_yy_item").addClass("active open");
                break;
            case "隐藏的押押" :
                $("#event_item").addClass("active open");
                $("#event_yy_hide").addClass("active");
                $("#event_yy_item").addClass("active open");
                break;
            case "押押下注记录" :
                $("#event_item").addClass("active open");
                $("#event_yy_bet").addClass("active");
                $("#event_yy_item").addClass("active open");
                break;
            case "赛事广告" :
                $("#event_item").addClass("active open");
                $("#event_contest_ad_list").addClass("active");
                break;
            /*case "日排行榜" :
                $("#rank_item").addClass("active open");
                $("#event_inner_rank_day").addClass("active");
                break;
            case "周排行榜" :
                $("#rank_item").addClass("active open");
                $("#event_inner_rank_week").addClass("active");
                break;*/
            case "胜率榜" :
                $("#rank_item").addClass("active open");
                $("#rankwinning").addClass("active");
                break;
            case "盈利榜" :
                $("#rank_item").addClass("active open");
                $("#rankroi").addClass("active");
                break;
            case "龙筹富豪榜" :
                $("#rank_item").addClass("active open");
                $("#rankgold").addClass("active");
                break;
            case "龙币富豪榜" :
                $("#rank_item").addClass("active open");
                $("#rankmoney").addClass("active");
                break;
            case "用户搜索" :
                $("#cbs_user_item").addClass("active open");
                $("#event_inner_gold").addClass("active");
                break;
            case "用户结算记录" :
                $("#cbs_user_item").addClass("active open");
                $("#event_inner_settle").addClass("active");
                break;
            case "猜友圈结算" :
                $("#cbs_user_item").addClass("active open");
                $("#event_friend_circle_settle").addClass("active");
                break;
            case "用户下注记录":
                $("#cbs_user_item").addClass("active open");
                $("#event_inner_bet").addClass("active");
                break;
            case "用户推荐管理":
                $("#cbs_user_item").addClass("active open");
                $("#user_star").addClass("active");
                break;
            case "用户龙筹券管理":
                $("#cbs_user_item").addClass("active open");
                $("#user_coupons").addClass("active");
                break;
            case "充值卡管理":
                $("#cbs_user_item").addClass("active open");
                $("#user_moneycard").addClass("active");
                break;
            case "龙筹/龙币统计":
                $("#statistic_item").addClass("active open");
                $("#statistic_gold").addClass("active");
                break;
            case "下注统计":
                $("#statistic_item").addClass("active open");
                $("#statistic_bet").addClass("active");
                break;
            case "用户每日龙币明细":
                $("#statistic_item").addClass("active open");
                $("#statistic_user_money").addClass("active");
                break;
            case "用户每月登陆":
                $("#statistic_item").addClass("active open");
                $("#statistic_user_login").addClass("active");
                break;
            case "账单对账":
                $("#statistic_item").addClass("active open");
                $("#statistic_bill").addClass("active");
                break;
            case "短信余量":
                $("#statistic_item").addClass("active open");
                $("#statistic_message").addClass("active");
                break;
            case "商品展示":
                $("#goods_item").addClass("active open");
                $("#goods").addClass("active");
                break;
            case "商品订单":
                $("#goods_item").addClass("active open");
                $("#goods_order").addClass("active");
                break;
            case "商品添加":
                $("#goods_item").addClass("active open");
                $("#goods_add").addClass("active");
                break;
            case "商品导航":
                $("#goods_item").addClass("active open");
                $("#goods_nav").addClass("active");
                break;
            case "用户龙筹明细":
                $("#cbs_user_item").addClass("active open");
                $("#user_gold_detail").addClass("active");
                break;
            case "用户龙币明细":
                $("#cbs_user_item").addClass("active open");
                $("#user_money_detail").addClass("active");
                break;
            case "公告管理":
                $("#content_item").addClass("active open");
                $("#placard").addClass("active");
                break;
            case "头版管理":
                $("#content_item").addClass("active open");
                $("#front_page").addClass("active");
                break;
            case "举报管理":
                $("#content_item").addClass("active open");
                $("#inform").addClass("active");
                break;
            case "猜友圈管理":
                $("#content_item").addClass("active open");
                $("#friend_circle").addClass("active");
                break;
            case "赛事新闻":
                $("#content_item").addClass("active open");
                $("#contest_news").addClass("active");
                break;
            case "猜友圈投注理由" :
                $("#content_item").addClass("active open");
                $("#friend_circle_reason").addClass("active");
                $("#content_recommed_item").addClass("active open");
                break;
            case "猜友圈吐槽" :
                $("#content_item").addClass("active open");
                $("#friend_circle_remakes").addClass("active");
                $("#content_recommed_item").addClass("active open");
                break;
            case "广告管理":
                $("#content_item").addClass("active open");
                $("#boot_info").addClass("active");
                break;
            case "缓存清理":
                $("#content_item").addClass("active open");
                $("#memcache").addClass("active");
                break;
            case "评论管理":
                $("#content_item").addClass("active open");
                $("#commend").addClass("active");
                break;
            case "im房间管理":
                $("#im_item").addClass("active open");
                $("#im_room").addClass("active");
                break;
            case "聊天记录管理":
                $("#im_item").addClass("active open");
                $("#im_chat").addClass("active");
                break;
            case "禁言屏蔽管理":
                $("#im_item").addClass("active open");
                $("#im_banned").addClass("active");
                break;
            case "社区管理":
                $("#community_item").addClass("active open");
                $("#community_list").addClass("active");
                break;
             case "社区举报管理":
                $("#community_item").addClass("active open");
                $("#community_report").addClass("active");
                break;
             case "帖子管理":
                $("#community_item").addClass("active open");
                $("#community_post").addClass("active");
                break;
             case "社区评论管理":
                $("#community_item").addClass("active open");
                $("#community_comment").addClass("active");
                break;
            case "赛事串":
                $("#activity_item").addClass("active open");
                $("#bunch").addClass("active");
                break;
            case "任务积分":
                $("#activity_item").addClass("active open");
                $("#mission").addClass("active");
                break;
            default :
                break;
        }
    });

    /**
     * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
     * 可以用 1-2 个占位符 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg: (new
     * Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
     * Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04 (new
     * Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04 (new
     * Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04 (new
     * Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
     */
    Date.prototype.pattern = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, // 小时
            "H+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds()
            // 毫秒
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt
                .replace(
                    RegExp.$1,
                    ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f"
                        : "/u5468")
                        : "")
                        + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
                    : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    //未处理信息
    //$("#header_name").text(yy_un_settle_num + "条通知");
    $("#header_num").html(yy_un_settle_num);
    $("#yy_num").html("+" + yy_un_settle_num);
    // $("#header_bet_num").html(contest_un_settle_num);
    // $("#bet_num").html("+" + contest_un_settle_num);
});
