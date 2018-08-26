//package com.cbs.manage.controller.statistic;
//
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.statistic.BetStatisticResponse;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.util.HashMap;
//import java.util.Map;
//
///**
// * Created by lhx on 15-12-22 上午11:40
// *
// * @Description 查找同一天出现两次的球队
// */
//@Controller
//@RequestMapping("/statistic/same")
//public class SameStatisticController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(SameStatisticController.class);
//
//
//    @RequestMapping("/view/{type}")
//    @ResponseBody
//    public Map<String, Object> view(@PathVariable Integer type) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getSameStatistic(type);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    String[] strings = new Gson().fromJson(data, String[].class);
//                    outMap.put("info", strings);
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//
//    @RequestMapping("/view/num")
//    @ResponseBody
//    public Map<String, Object> viewNum() {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getSameStatisticNum();
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    Integer[] num = new Gson().fromJson(data, Integer[].class);
//                    outMap.put("nums", num);
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//
//    @RequestMapping("/refresh/{type}")
//    @ResponseBody
//    public Map<String, Object> refresh(@PathVariable Integer type) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().refreshSameStatistic(type);
//        if (ret != null) {
//            outMap.put("code", ret.optInt("code"));
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//}
