define(function (require, exports, module) {
    var DataSourceTree = function (options) {
        this._data = options.data;
        this._delay = options.delay;
    }

    DataSourceTree.prototype.data = function (options, callback) {
        var self = this;
        var $data = null;

        if (!("name" in options) && !("type" in options)) {
            $data = this._data;//the root tree
            callback({ data: $data });
            return;
        }
        else if ("type" in options && options.type == "folder") {
            if ("additionalParameters" in options && "children" in options.additionalParameters)
                $data = options.additionalParameters.children;
            else $data = {}//no data
        }

        if ($data != null)//this setTimeout is only for mimicking some random delay
            setTimeout(function () {
                callback({ data: $data });
            }, parseInt(Math.random() * 500) + 100);

        //we have used static data here
        //but you can retrieve your data dynamically from a server using ajax call
        //checkout examples/treeview.html and examples/treeview.js for more info
    };

    var tree_data = {
        'super-admin': {name: '超级管理员', type: 'folder'},
        'sys_authority': {name: '角色管理', type: 'folder'},
        'sys_events': {name: '赛事管理', type: 'folder'},
        'sys_rank': {name: '榜单管理', type: 'folder'},
        'sys_user': {name: '用户管理', type: 'folder'},
        'sys_statistic': {name: '统计管理', type: 'folder'},
        'sys_goods': {name: '商品管理', type: 'folder'},
        'sys_content': {name: '内容管理', type: 'folder'},
        'sys_im': {name: 'IM管理', type: 'folder'},
        'sys_community': {name: '社区管理', type: 'folder'},
        'sys_activity': {name: '活动管理', type: 'folder'}
    }
    tree_data['super-admin']['additionalParameters'] = {
        'children': {
            'all-authority': {value: 'sys_all', name: '赋予全部权限', type: 'item'}
        }
    }
    tree_data['sys_authority']['additionalParameters'] = {
        'children': {
            'authority': {value: 'sys_role', name: '目录可见', type: 'item'},
            'edit-authority': {value: 'sys_authority_operate', name: '权限操作', type: 'item'},
            'edit-role': {value: 'sys_role_operate', name: '角色操作', type: 'item'},
            'edit-aliases': {value: 'sys_aliases_operate', name: '马甲操作', type: 'item'}
        }
    }

    tree_data['sys_events']['additionalParameters'] = {
        'children': {
            'event': {value: 'sys_event', name: '目录可见', type: 'item'},
            'edit-fb': {value: 'sys_event_fb_operate', name: '足球赛事', type: 'item'},
            'edit-bb': {value: 'sys_event_bb_operate', name: '篮球赛事', type: 'item'},
            'edit-settle': {value: 'sys_event_settle_operate', name: '赛事结算', type: 'item'},
            'edit-odds': {value: 'sys_event_odds_operate', name: '赔率管理', type: 'item'},
            'edit-restore': {value: 'sys_event_restore_operate', name: '投注修复', type: 'item'},
            'edit-team': {value: 'sys_event_team_edit', name: '球队管理', type: 'item'},
            'edit-module': {value: 'sys_event_module', name: '比赛模式管理', type: 'item'},
            'edit-yy': {value: 'sys_event_yy_operate', name: '押押管理', type: 'item'}
        }
    }
    tree_data['sys_rank']['additionalParameters'] = {
        'children': {
            'rank': {value: 'sys_rank', name: '目录可见', type: 'item'},
            'edit-inner-rank-day': {value: 'sys_inner_rank', name: '排行榜', type: 'item'}
        }
    }
    tree_data['sys_user']['additionalParameters'] = {
        'children': {
            'user': {value: 'sys_user', name: '目录可见', type: 'item'},
            'edit-user-search': {value: 'sys_user_search', name: '用户搜索', type: 'item'},
            'edit-inner-bet': {value: 'sys_inner_bet_settle', name: '用户下注结算', type: 'item'},
            'edit-inner-gold': {value: 'sys_gold_log', name: '用户龙筹明细', type: 'item'},
            'edit-inner-money': {value: 'sys_inner_rank', name: '用户榜单', type: 'item'},
            'edit-coupons': {value: 'sys_coupons', name: '龙筹券管理', type: 'item'}
        }
    }
    tree_data['sys_statistic']['additionalParameters'] = {
        'children': {
            'statistic': {value: 'sys_statistic', name: '目录可见', type: 'item'},
            'edit-gold-statistic': {value: 'sys_gold_statistic', name: '龙筹/龙币统计', type: 'item'},
            'edit-bet-statistic': {value: 'sys_bet_statistic', name: '下注统计', type: 'item'},
            'edit-login-statistic': {value: 'sys_login_statistic', name: '登陆奖励', type: 'item'},
            'edit-bill-statistic': {value: 'sys_bill_statistic', name: '账单对账', type: 'item'}
        }
    }
    tree_data['sys_goods']['additionalParameters'] = {
        'children': {
            'goods': {value: 'sys_goods', name: '目录可见', type: 'item'},
            'edit-goods': {value: 'sys_goods_operate', name: '商品管理', type: 'item'}
        }
    }
    tree_data['sys_content']['additionalParameters'] = {
        'children': {
            'content': {value: 'sys_content', name: '目录可见', type: 'item'},
            'edit-placard': {value: 'sys_placard_operate', name: '公告操作', type: 'item'},
            'edit-frontpage': {value: 'sys_front_page_operate', name: '头版管理', type: 'item'},
            'edit-friend-circle': {value: 'sys_friend_circle_operate', name: '猜友圈管理', type: 'item'},
            'edit-circle-comment': {value: 'sys_circle_comment_operate', name: '评论管理', type: 'item'},
            'edit-contest-news': {value: 'sys_contest_news_operate', name: '赛事新闻', type: 'item'}
        }
    }

    tree_data['sys_im']['additionalParameters'] = {
        'children': {
            'statistic': {value: 'sys_im', name: '目录可见', type: 'item'},
            'edit-im-room': {value: 'sys_im_room_operate', name: '房间管理', type: 'item'},
            'edit-im-message': {value: 'sys_im_message_operate', name: '消息管理', type: 'item'},
            'edit-im-shutup': {value: 'sys_im_shutup_operate', name: '禁言管理', type: 'item'}
        }
    }

    tree_data['sys_community']['additionalParameters'] = {
        'children': {
            'community': {value: 'sys_community', name: '目录可见', type: 'item'}
        }
    }

    tree_data['sys_activity']['additionalParameters'] = {
        'children': {
            'community': {value: 'sys_activity', name: '目录可见', type: 'item'}
        }
    }


    var treeDataSource = new DataSourceTree({data: tree_data});
    return treeDataSource;
})