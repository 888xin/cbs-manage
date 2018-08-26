///**
// *
// */
//package com.cbs.manage.controller.event;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.json.JSONObject;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.fb.CupListResponse;
//import com.lifeix.cbs.contest.bean.fb.CupResponse;
//
///**
// * 更改球队名称
// *
// * @author lifeix
// *
// */
//@Controller
//@RequestMapping("/event/cup")
//public class EventCupController {
//
//    @RequestMapping("/show")
//    public String show() {
//	return "event/event_cup_edit";
//    }
//
//    /**
//     * 篮球联赛列表
//     *
//     * @return
//     */
//    @RequestMapping(value = "/list")
//    @ResponseBody
//    public Map<String, Object> search(Integer type) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret;
//	if(type==0){
//	   ret = CbsContestlApiUtil.getInstance().fbCupList();
//	}else{
//	   ret = CbsContestlApiUtil.getInstance().bbCupList();
//	}
//
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		CupListResponse cup = null;
//		List<CupResponse> cupList = null;
//		int number = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    cup = new Gson().fromJson(data, CupListResponse.class);
//		}
//		if (cup.getCups()!= null) {
//		    cupList = cup.getCups();
//		    number = cupList.size();
//		    outMap.put("cupList", cupList);
//		}
//		outMap.put("number", number);
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
//
//
//
//
//    /**
//     * 修改球队（球队名）
//     *
//     * @return
//     */
//    @RequestMapping(value = "/edit", method = RequestMethod.POST)
//    @ResponseBody
//    public Map<String, Object> editTeam(Integer type, Long id, String name) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().editCup(type, id, name);
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
//}
