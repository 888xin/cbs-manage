//package com.cbs.manage.controller.content;
//
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.circle.FriendCircleListResponse;
//import com.lifeix.cbs.contest.bean.circle.FriendCircleResponse;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
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
// * Created by lhx on 15-12-3 上午10:25
// *
// * @Description
// */
//@Controller
//@RequestMapping("/friend/circle")
//public class FriendCircleController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(FrontPageController.class);
//
//    //跳转到展示页面
//    @RequestMapping("/show")
//    public String show() {
//        return "content/friend_circle";
//    }
//
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> list(Long startId, Long endId, Integer iDisplayLength, Integer skip, String sSearch, Boolean next, Boolean previous) {        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = null;
//        if (skip == 0){
//            skip = null ;
//        }
//        if (next) {
//            //下一页
//            ret = CbsOtherApiUtil.getInstance().getFriendCircleInfo(null, endId, sSearch, iDisplayLength, skip);
//        }
//        if (previous) {
//            ret = CbsOtherApiUtil.getInstance().getFriendCircleInfo(startId, null, sSearch, iDisplayLength, skip);
//        }
//        if (!next && !previous) {
//            ret = CbsOtherApiUtil.getInstance().getFriendCircleInfo(null, null, sSearch, iDisplayLength, skip);
//        }
//
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                FriendCircleListResponse frontPageListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    frontPageListResponse = new Gson().fromJson(data, FriendCircleListResponse.class);
//                }
//                int num = 0;
//                if (frontPageListResponse != null) {
//                    List<FriendCircleResponse> frontPageResponseList = frontPageListResponse.getContents();
//                    num = frontPageResponseList.size();
//                    outMap.put("frontpages", frontPageResponseList);
//                    int number = frontPageListResponse.getNumber() == null? 1111 : frontPageListResponse.getNumber();
//                    outMap.put("iTotalRecords", number);
//                    outMap.put("iTotalDisplayRecords", number);
//                }
//                outMap.put("number", num);
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
//    @RequestMapping("/queue")
//    @ResponseBody
//    public Map<String, Object> queue(Long fId, Integer status) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().queueFriendCircle(fId == null ? "0" : fId.toString());
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> edit(Long contestId, Integer contestType, Long fId, String path, String link, String title, String desc,
//                                    Long contentId, Integer type, Integer status, String ids) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        if (!StringUtils.isEmpty(ids)) {
//
//            CbsOtherApiUtil.getInstance().queueFriendCircle(ids);
//            outMap.put("code", 200);
//            return outMap;
//        }
//        JSONObject ret = CbsOtherApiUtil.getInstance().queueFriendCircle(ids);
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
//    }
//
//    @RequestMapping("/view")
//    @ResponseBody
//    public Map<String, Object> view(Long fId) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().viewFriendCircleInfo(fId);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                FriendCircleListResponse frontPageResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    frontPageResponse = new Gson().fromJson(data, FriendCircleListResponse.class);
//                }
//                outMap.put("frontpage", frontPageResponse.getContents().get(0));
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
//    @RequestMapping("/add")
//    @ResponseBody
//    public Map<String, Object> add(Long longNo, String text, Integer pageType, Long contentId, String images) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        Long userId = null;
//        if (!StringUtils.isEmpty(longNo)) {
//            //查询用户
//            JSONObject userRet = CbsOtherApiUtil.getInstance().getUserSystemUser(longNo, null);
//            if (userRet != null) {
//                int code = userRet.optInt("code");
//                if (code == 200) {
//                    JSONObject jsonObject;
//                    try {
//                        jsonObject = new JSONObject(userRet.optString("data"));
//                        userId = jsonObject.optLong("user_id");
//                    } catch (JSONException e) {
//                        LOG.error(e.getMessage(), e);
//                    }
//
//                } else {
//                    outMap.put("code", code);
//                    outMap.put("msg", userRet.optString("msg"));
//                    return outMap;
//                }
//            }
//        }
//        JSONObject ret = CbsOtherApiUtil.getInstance().addFrontPageFromFriendCircle(userId, text, pageType, contentId, images);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    /**
//     * ================================
//     */
//
//    //跳转到猜友圈投注理由展示页面
//    @RequestMapping("/reason/show")
//    public String show2() {
//        return "content/friend_circle_reason";
//    }
//
//    //跳转到猜友圈吐槽展示页面
//    @RequestMapping("/remakes/show")
//    public String show3() {
//        return "content/friend_circle_remakes";
//    }
//
//
//    @RequestMapping("/reason/list")
//    @ResponseBody
//    public Map<String, Object> reasonList(Long startId, Long endId, Integer iDisplayLength, Integer skip, Boolean next, Boolean previous, Integer type) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = null;
//        if (skip == 0){
//            skip = null ;
//        }
//        if (next) {
//            //下一页
//            ret = CbsOtherApiUtil.getInstance().getFriendCircleReasons(null, endId, iDisplayLength, skip, type);
//        }
//        if (previous) {
//            ret = CbsOtherApiUtil.getInstance().getFriendCircleReasons(startId, null, iDisplayLength, skip, type);
//        }
//        if (!next && !previous) {
//            ret = CbsOtherApiUtil.getInstance().getFriendCircleReasons(null, null, iDisplayLength, skip, type);
//        }
//
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                FriendCircleListResponse friendCircleListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    friendCircleListResponse = new Gson().fromJson(data, FriendCircleListResponse.class);
//                }
//                int num = 0;
//                if (friendCircleListResponse != null) {
//                    List<FriendCircleResponse> frontPageResponseList = friendCircleListResponse.getContents();
//                    num = frontPageResponseList.size();
//                    outMap.put("friendCircles", frontPageResponseList);
//                    int number = friendCircleListResponse.getNumber() == null ? 1111 : friendCircleListResponse.getNumber();
//                    outMap.put("iTotalRecords", number);
//                    outMap.put("iTotalDisplayRecords", number);
//                }
//                outMap.put("number", num);
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
//    @RequestMapping("/reason/add")
//    @ResponseBody
//    public Map<String, Object> addReason(Long id, Integer type) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().addFriendCircleReasons(id, type);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//}
