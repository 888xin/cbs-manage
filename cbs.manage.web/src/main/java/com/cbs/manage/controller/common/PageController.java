package com.cbs.manage.controller.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by lhx on 15-9-24 下午1:58
 *
 * @Description
 */
@Controller
@RequestMapping("/gotopage")
public class PageController {

    //跳转到主页
    @RequestMapping("/main")
    public String index(){
        return "common/manage_main";
    }

    @RequestMapping("/role")
    public String role(){
        return "role/role";
    }

    @RequestMapping("/denied")
    public String denied(){
        return "common/manage_denied";
    }

    //跳转到设置页面
    @RequestMapping("/setting")
    public String setting(){
        return "role/role_setting";
    }

    @RequestMapping("/test")
    public String test(){
        return "role/manage_main";
    }

    //跳转到赔率界面
    @RequestMapping("/show/odds")
    public String showOdds(){
        return "event/event_odds_manage";
    }

    //跳转到结算界面
    @RequestMapping("/show/settle")
    public String showSettle(){
        return "event/event_settle";
    }
}
