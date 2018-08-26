///**
// *
// */
//package com.cbs.manage.controller.bet;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
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
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.circle.FriendCircleListResponse;
//import com.lifeix.cbs.contest.bean.circle.FriendCircleResponse;
//
///**
// * 获取未结算猜友圈战绩
// *
// * @author lifeix
// *
// */
//@Controller
//@RequestMapping("/fircirsettle")
//public class FirCirSettleController {
//
//    static Logger LOG = LoggerFactory.getLogger(FirCirSettleController.class);
//
//    @RequestMapping("/show")
//    public String show() {
//	return "user/friend_circle_settle";
//    }
//
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> getList(Long startId, Integer limit) throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getFriCirNoSettle(startId, limit);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		FriendCircleListResponse friendCircleList = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    friendCircleList = new Gson().fromJson(data, FriendCircleListResponse.class);
//		}
//		int num = 0;
//		List<FriendCircleResponse> list = null;
//		if (friendCircleList.getContents() != null) {
//		    list = friendCircleList.getContents();
//		    num = list.size();
//		}
//		JSONObject dataJson = ret.getJSONObject("data");
//		startId = dataJson.optLong("startId");
//		outMap.put("startId", startId);
//		outMap.put("list", list);
//		outMap.put("num", num);
//	    } else {
//		outMap.put("msg", ret.optString("msg"));
//	    }
//
//	    outMap.put("code", code);
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//
//	return outMap;
//    }
//
//    @RequestMapping("/init")
//    @ResponseBody
//    public Map<String, Object> init(String circleIds) throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().initFirSettle(circleIds);
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
