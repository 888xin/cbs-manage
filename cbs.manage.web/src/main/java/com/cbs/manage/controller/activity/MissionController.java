//package com.cbs.manage.controller.activity;
//
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.api.bean.mission.MissionResponse;
//import com.lifeix.cbs.api.bean.mission.MissionUserListResponse;
//import com.lifeix.cbs.api.bean.mission.MissionUserResponse;
//import com.lifeix.cbs.api.bean.mission.PointResponse;
//import com.lifeix.cbs.api.common.mission.Mission;
//import com.lifeix.cbs.api.common.mission.MissionConstants;
//import com.lifeix.cbs.contest.bean.bunch.*;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.util.*;
//
///**
// * Created by lhx on 16-5-25 上午11:38
// *
// * @Description
// */
//@Controller
//@RequestMapping("/mission")
//public class MissionController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(MissionController.class);
//
//    // 跳转到页面
//    @RequestMapping("/show")
//    public String show() {
//        return "activity/mission";
//    }
//
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> list(Integer page, Integer limit) {
//        Map<String, Object> outMap = new HashMap<>();
//        if (page != null && page == -1){
//            outMap.put("msg", "服务器无数据返回");
//            return outMap;
//        }
//        JSONObject ret = CbsOtherApiUtil.getInstance().getMissionUsers(page, limit);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                MissionUserListResponse missionUserListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    missionUserListResponse = new Gson().fromJson(data, MissionUserListResponse.class);
//                }
//                if (missionUserListResponse != null) {
//                    List<MissionUserResponse> mission_user = missionUserListResponse.getMission_user();
//                    outMap.put("missions", mission_user);
//                    outMap.put("page", missionUserListResponse.getPage_num());
//                }
//
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/day/user")
//    @ResponseBody
//    public Map<String, Object> day(String day, Long userId) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().getMissionUserDay(day, userId);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                MissionUserResponse missionUserResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    missionUserResponse = new Gson().fromJson(data, MissionUserResponse.class);
//                }
//                if (missionUserResponse != null) {
//                    outMap.put("mission", missionUserResponse);
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/user")
//    @ResponseBody
//    public Map<String, Object> day(Long userLongno) {
//        Map<String, Object> outMap = new HashMap<>();
//        Long userId = null ;
//        JSONObject userRet = CbsOtherApiUtil.getInstance().getUserSystemUser(userLongno, null);
//        if (userRet != null) {
//            int code = userRet.optInt("code");
//            if (code == 200) {
//                JSONObject jsonObject ;
//                try {
//                    jsonObject = new JSONObject(userRet.optString("data"));
//                    userId = jsonObject.optLong("user_id");
//                } catch (JSONException e) {
//                    LOG.error(e.getMessage(), e);
//                }
//            } else {
//                outMap.put("number", 0);
//                outMap.put("code", code);
//                outMap.put("msg", userRet.optString("msg"));
//                return outMap;
//            }
//        }
//        if (userId == null){
//            outMap.put("msg", "无该用户");
//            return outMap;
//        }
//        JSONObject ret = CbsOtherApiUtil.getInstance().getMissionUser(userId);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                MissionUserResponse missionUserResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    missionUserResponse = new Gson().fromJson(data, MissionUserResponse.class);
//                }
//                if (missionUserResponse != null) {
//                    outMap.put("mission", missionUserResponse);
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        }
//        return outMap;
//    }
//
//
//    @RequestMapping("/day/cancel")
//    @ResponseBody
//    public Map<String, Object> dayInfo() {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().getDayCancelMission();
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                String data = ret.optString("data");
//                List<MissionResponse> list = new ArrayList<>();
//                if (StringUtils.isEmpty(data)){
//                    for (Mission mission : Mission.values()) {
//                        if (mission.getType() == MissionConstants.Type.DAY){
//                            MissionResponse missionResponse = new MissionResponse();
//                            missionResponse.setName(mission.getName());
//                            missionResponse.setPoint(mission.getPoint());
//                            missionResponse.setType(mission.getValue());
//                            list.add(missionResponse);
//                        }
//                    }
//                } else {
//                    String[] cancelStr = data.split(",");
//                    for (Mission mission : Mission.values()) {
//                        if (mission.getType() == MissionConstants.Type.DAY){
//                            boolean flag = false ;
//                            for (String s : cancelStr) {
//                                if (mission.getValue() == Integer.valueOf(s)){
//                                    flag = true ;
//                                }
//                            }
//                            MissionResponse missionResponse = new MissionResponse();
//                            missionResponse.setName(mission.getName());
//                            missionResponse.setPoint(mission.getPoint());
//                            missionResponse.setType(mission.getValue());
//                            missionResponse.setFinish(flag);
//                            list.add(missionResponse);
//                        }
//                    }
//                }
//                outMap.put("cancel", list);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        }
//        return outMap;
//    }
//
//
//    @RequestMapping("/day/edit")
//    @ResponseBody
//    public Map<String, Object> dayMissionEdit(Integer value) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().setDayMission(value);
//        if (ret != null) {
//            outMap.put("msg", ret.optString("msg"));
//            outMap.put("code", ret.optInt("code"));
//        }
//        return outMap;
//    }
//
//
//    @RequestMapping("/point/list")
//    @ResponseBody
//    public Map<String, Object> point() {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().getMissionPointToGold();
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                MissionUserResponse missionUserResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    missionUserResponse = new Gson().fromJson(data, MissionUserResponse.class);
//                }
//                if (missionUserResponse != null) {
//                    outMap.put("points", missionUserResponse.getPoint_list());
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        }
//        return outMap;
//    }
//
//
//    @RequestMapping("/edit/point/gold")
//    @ResponseBody
//    public Map<String, Object> missionRewardEdit(Long id, Integer point, Integer gold) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().editPointToGold(id, point, gold);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                PointResponse pointResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    pointResponse = new Gson().fromJson(data, PointResponse.class);
//                }
//                if (pointResponse != null) {
//                    outMap.put("point", pointResponse);
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/delete/point/gold")
//    @ResponseBody
//    public Map<String, Object> missionRewardDelete(Long id) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().deleteDayMission(id);
//        if (ret != null) {
//            outMap.put("msg", ret.optString("msg"));
//            outMap.put("code", ret.optInt("code"));
//        }
//        return outMap;
//    }
//
//}
