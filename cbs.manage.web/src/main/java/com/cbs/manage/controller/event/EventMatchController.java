///**
// *
// */
//package com.cbs.manage.controller.event;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import net.logstash.logback.encoder.org.apache.commons.lang.StringUtils;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.odds.OddsWarnListResponse;
//import com.lifeix.cbs.contest.bean.odds.OddsWarnResponse;
//
///**
// *
// * @author lifeix
// *
// */
//@Controller
//@RequestMapping("/event/match")
//public class EventMatchController {
//
//    // 跳转到比赛模式更改页面
//    @RequestMapping("/module/show")
//    public String showModule() {
//	return "event/event_module";
//    }
//
//    /**
//     * 获取当前比赛模式
//     *
//     * @return
//     */
//    @RequestMapping("/getmodule")
//    @ResponseBody
//    public Map<String, Object> getModule() {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().getModule();
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		try {
//		    JSONObject data = ret.getJSONObject("data");
//		    outMap.put("module_value", data.getInt("module_value"));
//		} catch (JSONException e) {
//		    outMap.put("msg", "出错！" + e.getMessage());
//		}
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
//     * 更改比赛模式
//     *
//     * @param moduleValue
//     * @return
//     */
//    @RequestMapping("/updatemodule")
//    @ResponseBody
//    public Map<String, Object> updateModule(Integer moduleValue) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	if (moduleValue == null) {
//	    outMap.put("msg", "参数错误！");
//	    return outMap;
//	}
//	JSONObject ret = CbsContestlApiUtil.getInstance().changeModule(moduleValue);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		outMap.put("msg", "更新成功");
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
//    @RequestMapping("/odds/warn/list")
//    @ResponseBody
//    public Map<String, Object> oddsWarnList(Integer status, Long startId, Integer limit) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().getOddsWarnList(status, startId, limit);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		OddsWarnListResponse oddsWarnListResponse = new OddsWarnListResponse();
//		String data = ret.optString("data");
//		if (StringUtils.isNotEmpty(data)) {
//		    oddsWarnListResponse = new Gson().fromJson(data, OddsWarnListResponse.class);
//		}
//		List<OddsWarnResponse> oddsWarnList = oddsWarnListResponse.getOddsWarnList();
//		int num = oddsWarnList.size();
//		outMap.put("oddsWarnList", oddsWarnList);
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
//}
