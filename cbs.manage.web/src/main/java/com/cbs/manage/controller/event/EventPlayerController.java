///**
// *
// */
//package com.cbs.manage.controller.event;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.bb.ext.BbPlayerListResponse;
//import com.lifeix.cbs.contest.bean.bb.ext.BbPlayerResponse;
//
///**
// * @author lifeix
// *
// */
//@Controller
//@RequestMapping("/event/player")
//public class EventPlayerController {
//
//    @RequestMapping("/show")
//    public String view() {
//	return "event/event_player_edit";
//    }
//
//    @RequestMapping("/bb/list")
//    @ResponseBody
//    public Map<String, Object> bbPlayerList(Long start_id, Integer limit) throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().bbPlayerList(start_id, limit);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		List<BbPlayerResponse> playerList = new ArrayList<BbPlayerResponse>();
//		BbPlayerListResponse responseList = new BbPlayerListResponse();
//		int number = 0;
//		int startId = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    responseList = new Gson().fromJson(data, BbPlayerListResponse.class);
//		    playerList = responseList.getPlayers();
//		    if(playerList!=null){
//			number = playerList.size();
//		    }
//		    outMap.put("playerList", playerList);
//		}
//		outMap.put("number", number);
//		JSONObject dataJson = ret.getJSONObject("data");
//		startId = dataJson.optInt("startId");
//		outMap.put("startId", startId);
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
//    @RequestMapping("/bb/search")
//    @ResponseBody
//    public Map<String, Object> bbPlayerSearch(String name,Long teamId) throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().bbPlayerSearch(name,teamId);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		List<BbPlayerResponse> playerList = new ArrayList<BbPlayerResponse>();
//		BbPlayerListResponse responseList = new BbPlayerListResponse();
//		int number = 0;
//		int startId = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    responseList = new Gson().fromJson(data, BbPlayerListResponse.class);
//		    playerList = responseList.getPlayers();
//		    if(playerList!=null){
//			number = playerList.size();
//		    }
//		    outMap.put("playerList", playerList);
//		}
//		outMap.put("number", number);
//		JSONObject dataJson = ret.getJSONObject("data");
//		startId = dataJson.optInt("startId");
//		outMap.put("startId", startId);
//	    } else {
//		outMap.put("msg", ret.optString("msg"));
//	    }
//	    outMap.put("code", code);
//	} else {
//	    outMap.put("msg", "没有找到该球员");
//	}
//	return outMap;
//    }
//
//    @RequestMapping("/bb/edit")
//    @ResponseBody
//    public Map<String, Object> bbPlayerEdit(Long id, String name, String first_name, String last_name) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().bbPlayerEdit(id, name, first_name, last_name);
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
//
//    }
//
//}
