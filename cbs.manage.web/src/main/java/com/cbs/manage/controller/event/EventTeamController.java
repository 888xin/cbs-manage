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
//import com.lifeix.cbs.contest.bean.fb.TeamListResponse;
//import com.lifeix.cbs.contest.bean.fb.TeamResponse;
//
///**
// * 更改球队名称
// *
// * @author lifeix
// *
// */
//@Controller
//@RequestMapping("/event/editteam")
//public class EventTeamController {
//
//    @RequestMapping("/show")
//    public String show() {
//	return "event/event_team_edit";
//    }
//
//    /**
//     * 查找球队
//     *
//     * @return
//     */
//    @RequestMapping(value = "/search")
//    @ResponseBody
//    public Map<String, Object> search(Integer type, String key) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().searchTeam(type, key);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		TeamListResponse team = null;
//		List<TeamResponse> teamList = null;
//		int number = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    team = new Gson().fromJson(data, TeamListResponse.class);
//		}
//		if (team.getTeams() != null) {
//		    teamList = team.getTeams();
//		    number = teamList.size();
//		    outMap.put("teamList", teamList);
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
//    /**
//     * 修改球队（球队名）
//     *
//     * @return
//     */
//    @RequestMapping(value = "/edit", method = RequestMethod.POST)
//    @ResponseBody
//    public Map<String, Object> editTeam(Integer type, Long id, String name, String logo) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	if (logo.indexOf("fail:") > -1) {
//	    logo = "";
//	}
//	JSONObject ret = CbsContestlApiUtil.getInstance().editTeam(type, id, name, logo);
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
//}
