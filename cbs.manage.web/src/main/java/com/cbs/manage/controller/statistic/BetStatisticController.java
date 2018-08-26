//package com.cbs.manage.controller.statistic;
//
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.statistic.BetStatisticResponse;
//
//import com.lifeix.user.beans.CustomResponse;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.util.HashMap;
//import java.util.Map;
//
///**
// * Created by lhx on 15-12-22 上午11:40
// *
// * @Description
// */
//@Controller
//@RequestMapping("/statistic/bet")
//public class BetStatisticController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(BetStatisticController.class);
//
//    //跳转到页面
//    @RequestMapping("/show")
//    public String show(){
//        return "statistic/statistic_bet";
//    }
//
//    @RequestMapping("/view")
//    @ResponseBody
//    public Map<String, Object> view(String date, Integer limit) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getBetsStatistic(date, limit);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                BetStatisticResponse betStatisticResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    betStatisticResponse = new Gson().fromJson(data, BetStatisticResponse.class);
//                }
//                outMap.put("statistics", betStatisticResponse);
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
//    @RequestMapping("/un/num")
//    @ResponseBody
//    public Map<String, Object> refresh() throws JSONException {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getContestNotSettleNum();
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    JSONObject jsonObject = new JSONObject(data);
//                    outMap.put("num", jsonObject.optInt("num"));
//                }
//            } else {
//                outMap.put("num", 0);
//            }
//            outMap.put("code", ret.optInt("code"));
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//}
