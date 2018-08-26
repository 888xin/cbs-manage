//package com.cbs.manage.controller.bet;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//
//import com.lifeix.cbs.api.bean.mission.MissionUserResponse;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.cbs.manage.bean.role.RoleResponse;
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.bet.BetLogListResponse;
//import com.lifeix.cbs.contest.bean.bet.BetLogResponse;
//
///**
// * Created by lhx on 15-11-24 上午11:10
// *
// * @Description
// */
//@Controller
//@RequestMapping("/bet")
//public class BetController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(BetController.class);
//
//    // 跳转到页面
//    @RequestMapping("/show")
//    public String show() {
//	return "user/bet_list";
//    }
//
//    @RequestMapping("/fb/get")
//    @ResponseBody
//    public Map<String, Object> getFb(Long startId, Integer type, Long contestId, Long longNo, Boolean settle, Integer limit,
//	    String startTime, String endTime) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	if (!StringUtils.isEmpty(startTime)) {
//	    startTime += " 00:00:00";
//	}
//	if (!StringUtils.isEmpty(endTime)) {
//	    endTime += " 23:59:59";
//	}
//	Long userId = null;
//	if (!StringUtils.isEmpty(longNo)) {
//	    // 查询用户
//	    JSONObject userRet = CbsOtherApiUtil.getInstance().getUserSystemUser(longNo, null);
//	    if (userRet != null) {
//		int code = userRet.optInt("code");
//		if (code == 200) {
//		    JSONObject jsonObject = null;
//		    try {
//			jsonObject = new JSONObject(userRet.optString("data"));
//			userId = jsonObject.optLong("user_id");
//		    } catch (JSONException e) {
//			LOG.error(e.getMessage(), e);
//		    }
//
//		} else {
//		    outMap.put("number", 0);
//		    outMap.put("code", code);
//		    outMap.put("msg", userRet.optString("msg"));
//		    return outMap;
//		}
//	    }
//	}
//	JSONObject ret = CbsContestlApiUtil.getInstance().getFbBetsInfo(startId, type, contestId, userId, settle, limit,
//	        startTime, endTime);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		BetLogListResponse betLogListResponse = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    betLogListResponse = new Gson().fromJson(data, BetLogListResponse.class);
//		}
//		int num = 0;
//		if (betLogListResponse != null) {
//		    List<BetLogResponse> betLogResponseList = betLogListResponse.getBets();
//		    num = betLogResponseList.size();
//		    outMap.put("bets", betLogResponseList);
//		    outMap.put("start_id", betLogListResponse.getStartId());
//		}
//		outMap.put("number", num);
//	    } else {
//		outMap.put("msg", ret.optString("msg"));
//	    }
//	    outMap.put("code", code);
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//    @RequestMapping("/bb/get")
//    @ResponseBody
//    public Map<String, Object> getBb(Long startId, Integer type, Long contestId, Long longNo, Boolean settle, Integer limit,
//	    String startTime, String endTime) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	if (!StringUtils.isEmpty(startTime)) {
//	    startTime += " 00:00:00";
//	}
//	if (!StringUtils.isEmpty(endTime)) {
//	    endTime += " 23:59:59";
//	}
//	Long userId = null;
//	if (!StringUtils.isEmpty(longNo)) {
//	    // 查询用户
//	    JSONObject userRet = CbsOtherApiUtil.getInstance().getUserSystemUser(longNo, null);
//	    if (userRet != null) {
//		int code = userRet.optInt("code");
//		if (code == 200) {
//		    JSONObject jsonObject = null;
//		    try {
//			jsonObject = new JSONObject(userRet.optString("data"));
//			userId = jsonObject.optLong("user_id");
//		    } catch (JSONException e) {
//			LOG.error(e.getMessage(), e);
//		    }
//		} else {
//		    outMap.put("number", 0);
//		    outMap.put("code", code);
//		    outMap.put("msg", userRet.optString("msg"));
//		    return outMap;
//		}
//	    }
//	}
//	JSONObject ret = CbsContestlApiUtil.getInstance().getBbBetsInfo(startId, type, contestId, userId, settle, limit,
//	        startTime, endTime);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		BetLogListResponse betLogListResponse = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    betLogListResponse = new Gson().fromJson(data, BetLogListResponse.class);
//		}
//		int num = 0;
//		if (betLogListResponse != null) {
//		    List<BetLogResponse> betLogResponseList = betLogListResponse.getBets();
//		    num = betLogResponseList.size();
//		    outMap.put("bets", betLogResponseList);
//		    outMap.put("start_id", betLogListResponse.getStartId());
//		}
//		outMap.put("number", num);
//	    } else {
//		outMap.put("msg", ret.optString("msg"));
//	    }
//	    outMap.put("code", code);
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//    /**
//     * 取消单个下注
//     *
//     * @return
//     */
//    @RequestMapping(value = "/cancle", method = RequestMethod.POST)
//    @ResponseBody
//    public Map<String, Object> cancleBet(Integer type, Long id, String reason, HttpServletRequest request) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = null;
//	if (type == null) {
//	    outMap.put("msg", "参数错误");
//	} else if (type >= 1 && type <= 5) {
//	    RoleResponse role = (RoleResponse) request.getSession().getAttribute("roleSession");
//	    ret = CbsContestlApiUtil.getInstance().cancleFbBet(type, id, reason, role.getRolename());
//	} else if (type >= 6 && type <= 10) {
//	    RoleResponse role = (RoleResponse) request.getSession().getAttribute("roleSession");
//	    ret = CbsContestlApiUtil.getInstance().cancleBbBet(type, id, reason, role.getRolename());
//	}
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code != 200) {
//		outMap.put("msg", ret.optString("msg"));
//	    }
//	    outMap.put("code", code);
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//
//    @RequestMapping("/repair")
//    @ResponseBody
//    public Map<String, Object> repair(Long id, Integer type, Double roi, String reason) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().repairBet(id, type, roi, reason);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                BetLogResponse betLogResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    betLogResponse = new Gson().fromJson(data, BetLogResponse.class);
//                    outMap.put("log", betLogResponse);
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        }
//        return outMap;
//    }
//}
