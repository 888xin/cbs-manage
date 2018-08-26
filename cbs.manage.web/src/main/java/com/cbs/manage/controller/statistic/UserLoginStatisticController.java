//package com.cbs.manage.controller.statistic;
//
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.api.bean.money.MoneyUserStatisticResponse;
//import com.lifeix.cbs.api.bean.user.UserLoginListResponse;
//import com.lifeix.cbs.api.bean.user.UserLoginResponse;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
///**
// * Created by lhx on 16-4-20 上午11:03
// *
// * @Description
// */
//@Controller
//@RequestMapping("/statistic/user/login")
//public class UserLoginStatisticController {
//
//    // 跳转到页面
//    @RequestMapping("/show")
//    public String show() {
//        return "statistic/statistic_user_login";
//    }
//
//
//    @RequestMapping("/get")
//    @ResponseBody
//    public Map<String, Object> data(String date) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().getUserLoginStatistic(date);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                UserLoginListResponse userLoginListResponse;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    userLoginListResponse = new Gson().fromJson(data, UserLoginListResponse.class);
//                    List<UserLoginResponse> userLogin = userLoginListResponse.getUser_login();
//                    outMap.put("user_login", userLogin);
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
//    @RequestMapping("/path")
//    @ResponseBody
//    public Map<String, Object> path() {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().getUserLoginPath();
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                UserLoginResponse userLoginResponse;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    userLoginResponse = new Gson().fromJson(data, UserLoginResponse.class);
//                    outMap.put("path", userLoginResponse);
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
//    @RequestMapping("/set/path")
//    @ResponseBody
//    public Map<String, Object> setPath(String key, String value) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().setUserLoginPath(key, value);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("msg", ret.optString("msg"));
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务出错！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/set/day")
//    @ResponseBody
//    public Map<String, Object> setDay(Long longNo, Integer day) {
//        Map<String, Object> outMap = new HashMap<>();
//
//        Long userId = null ;
//        JSONObject ret = CbsOtherApiUtil.getInstance().getUserSystemUser(Long.valueOf(longNo), null);
//        if (ret != null){
//            int code = ret.optInt("code");
//            if (code == 200){
//                JSONObject jsonObject ;
//                try {
//                    jsonObject = new JSONObject(ret.optString("data"));
//                } catch (JSONException e) {
//                    jsonObject = new JSONObject();
//                }
//                userId = jsonObject.optLong("user_id");
//            }
//        }
//        if (userId == null){
//            outMap.put("msg", "该用户不存在！");
//            outMap.put("code", "10001");
//            return outMap;
//        }
//        ret = CbsOtherApiUtil.getInstance().setUserLoginDay(userId, day);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("msg", ret.optString("msg"));
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务出错！");
//        }
//        return outMap;
//    }
//
//
//    @RequestMapping("/expire")
//    @ResponseBody
//    public Map<String, Object> expire() {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().setUserLoginExpire();
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("msg", ret.optString("msg"));
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务出错！");
//        }
//        return outMap;
//    }
//}
