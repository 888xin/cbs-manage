//package com.cbs.manage.controller.event;
//
//
//import com.cbs.manage.util.CbsContestlApiUtil;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.util.HashMap;
//import java.util.Map;
//
//
///**
// * Created by lhx on 15-10-9 下午4:45
// *
// * @Description
// */
//@Controller
//@RequestMapping("/event/restore")
//public class EventRestoreController {
//
//    private static final Logger LOG = LoggerFactory.getLogger(EventRestoreController.class);
//
//    //跳转到赛事修复页面
//    @RequestMapping("/show")
//    public String getlist(Model model){
//        return "event/event_restore";
//    }
//
//    //跳转到赛事回滚页面
//    @RequestMapping("/rollback/show")
//    public String rollback(){
//        return "event/event_rollback";
//    }
//
//    @RequestMapping("/rollback/submit")
//    @ResponseBody
//    public Map<String, Object> submit(Long contestId, Integer contestType) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().rollbackContest(contestId, contestType);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//
//    }
//
//}
