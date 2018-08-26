//package com.cbs.manage.controller.content;
//
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.message.bean.placard.PlacardTempletListResponse;
//import com.lifeix.cbs.message.bean.placard.PlacardTempletResponse;
//
//import org.json.JSONObject;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
///**
// * Created by lhx on 15-10-19 下午7:01
// *
// * @Description
// */
//
//@Controller
//@RequestMapping("/placard")
//public class PlacardController {
//
//    //跳转到公告管理页面
//    @RequestMapping("/show")
//    public String getlist(){
//        return "content/placard_list";
//    }
//
//    @RequestMapping("/getAsyData")
//    @ResponseBody
//    public Map<String, Object> getAsyData(Integer startId, Integer limit){
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().getPlacardInfo(startId,limit);
//        if (ret != null){
//            int code = ret.optInt("code");
//            if (code == 200){
//                PlacardTempletListResponse placardTempletListResponse = null ;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)){
//                    placardTempletListResponse = new Gson().fromJson(data, PlacardTempletListResponse.class);
//                    List<PlacardTempletResponse> placardTempletResponses = placardTempletListResponse.getPlacard_templets() ;
//                    int num = placardTempletResponses.size() ;
//                    outMap.put("placards", placardTempletResponses);
//                    outMap.put("number", num);
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap ;
//    }
//
//
//
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> edit(PlacardTempletResponse placardTempletResponse){
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().editPlacardInfo(placardTempletResponse);
//        if (ret != null){
//            int code = ret.optInt("code");
//            if (code != 200){
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap ;
//    }
//
//    @RequestMapping("/push")
//    @ResponseBody
//    public Map<String, Object> push(Long templetId, String templetIdStr){
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = null ;
//        if (templetId != null){
//            //单个推送
//            ret = CbsOtherApiUtil.getInstance().pushPlacard(templetId);
//        } else if (templetIdStr != null){
//            //批量推送
//            String[] templetIds = templetIdStr.split(",");
//            for (String id : templetIds) {
//                ret = CbsOtherApiUtil.getInstance().pushPlacard(Long.valueOf(id));
//                int code = ret.optInt("code");
//                if (code != 200){
//                    outMap.put("msg", ret.optString("msg")+"推送到id为："+id + "时失败");
//                    outMap.put("code", code);
//                    return outMap ;
//                }
//            }
//        } else {
//            outMap.put("msg", "请求ID为null");
//        }
//        if (ret != null){
//            int code = ret.optInt("code");
//            if (code != 200){
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap ;
//    }
//
//    @RequestMapping("/delete")
//    @ResponseBody
//    public Map<String, Object> delete(Long templet_id){
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().deletePlacard(templet_id);
//        if (ret != null){
//            int code = ret.optInt("code");
//            if (code != 200){
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap ;
//    }
//}
