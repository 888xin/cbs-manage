//package com.cbs.manage.controller.coupons;
//
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.api.bean.coupon.CouponListResponse;
//import com.lifeix.cbs.api.bean.coupon.CouponResponse;
//import com.lifeix.cbs.api.bean.user.CbsUserStarListResponse;
//import com.lifeix.cbs.api.bean.user.CbsUserStarResponse;
//import com.lifeix.cbs.contest.bean.fb.CupListResponse;
//import com.lifeix.cbs.contest.bean.fb.CupResponse;
//
//import com.lifeix.user.beans.CustomResponse;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.util.*;
//
///**
// * Created by lhx on 16-2-25 下午4:57
// *
// * @Description
// */
//@Controller
//@RequestMapping("/coupons")
//public class CouponsController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(CouponsController.class);
//
//    //跳转到页面
//    @RequestMapping("/show")
//    public String show(){
//        return "coupons/coupons_list";
//    }
//
//
//    /**
//     * 获取列表数据
//     */
//    @RequestMapping("/data")
//    @ResponseBody
//    public Map<String, Object> data(Boolean valid, Long startId) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().couponsList(valid, startId);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                CouponListResponse response;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    response = new Gson().fromJson(data, CouponListResponse.class);
//                    List<CouponResponse> coupons = response.getConpons();
//                    outMap.put("coupons", coupons);
//                    if (coupons == null){
//                        outMap.put("number", 0);
//                    } else {
//                        outMap.put("number", coupons.size());
//                    }
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
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> edit(CouponResponse couponResponse) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().editCoupons(couponResponse);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无反馈！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/invalid")
//    @ResponseBody
//    public Map<String, Object> invalid(Long id, Boolean valid) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().invalidCoupons(id, valid);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无反馈！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/give")
//    @ResponseBody
//    public Map<String, Object> give(Long id, String userIds, Boolean isLongNo, Integer num) throws JSONException {
//
//        Map<String, Object> outMap = new HashMap<String, Object>();
//
//        if (isLongNo){
//            String[] longNos = userIds.split(",");
//            Set<Long> set = new HashSet<Long>();
//            for (String longNo : longNos) {
//                JSONObject ret = CbsOtherApiUtil.getInstance().getUserSystemUser(Long.valueOf(longNo), null);
//                if (ret != null){
//                    int code = ret.optInt("code");
//                    if (code == 200){
//                        JSONObject jsonObject ;
//                        try {
//                            jsonObject = new JSONObject(ret.optString("data"));
//                        } catch (JSONException e) {
//                            jsonObject = new JSONObject();
//                            LOG.error(e.getMessage(), e);
//                        }
//                        set.add(jsonObject.optLong("user_id"));
//                    }
//                }
//            }
//            if (set.size() > 0){
//                StringBuilder stringBuilder = new StringBuilder();
//                for (Long aLong : set) {
//                    stringBuilder.append(aLong + ",");
//                }
//                stringBuilder.deleteCharAt(stringBuilder.length()-1);
//                userIds = stringBuilder.toString();
//            } else {
//                outMap.put("code", 11002);
//                outMap.put("msg", "有不存在的用户");
//                return outMap ;
//            }
//        }
//
//
//        JSONObject ret = CbsOtherApiUtil.getInstance().giveCoupons(id,userIds,num);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    JSONObject jsonObject = new JSONObject(data);
//                    String result = jsonObject.optString("failed");
//                    if (!StringUtils.isEmpty(result) && !"[]".equals(result)){
//                        outMap.put("code", 10001);
//                        outMap.put("msg", "用户："+result+"未能成功获得龙筹券，可能是系统问题，也可能是该用户拥有过该活动龙筹券");
//                    } else {
//                        outMap.put("code", code);
//                    }
//                } else {
//                    outMap.put("code", code);
//                }
//            } else {
//                outMap.put("code", code);
//                outMap.put("msg", ret.optString("msg"));
//            }
//        } else {
//            outMap.put("msg", "服务器端无反馈！");
//        }
//        return outMap;
//    }
//
////    @RequestMapping("/delete")
////    @ResponseBody
////    public Map<String, Object> delete(Long id) {
////        Map<String, Object> outMap = new HashMap<String, Object>();
////        JSONObject ret = CbsOtherApiUtil.getInstance().deleteCoupons(id);
////        if (ret != null) {
////            int code = ret.optInt("code");
////            outMap.put("code", code);
////            outMap.put("msg", ret.optString("msg"));
////        } else {
////            outMap.put("msg", "服务器端无反馈！");
////        }
////        return outMap;
////    }
//
//    /**
//     * 获取联赛名称
//     */
//    @RequestMapping("/cup")
//    @ResponseBody
//    public Map<String, Object> cup(Integer type, Integer level) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getCupsInfo(type, level);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                CupListResponse response;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    response = new Gson().fromJson(data, CupListResponse.class);
//                    List<CupResponse> cups = response.getCups();
//                    outMap.put("cups", cups);
//                    outMap.put("number", cups.size());
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
//}
