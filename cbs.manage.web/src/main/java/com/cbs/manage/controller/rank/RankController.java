///**
// *
// */
//package com.cbs.manage.controller.rank;
//
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.Calendar;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Locale;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
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
//import com.lifeix.cbs.api.bean.user.UserStatisticsListResponse;
//import com.lifeix.cbs.api.bean.user.UserStatisticsResponse;
//import com.lifeix.cbs.contest.bean.settle.UserSettleLogListResponse;
//import com.lifeix.cbs.contest.bean.settle.UserSettleLogResponse;
//
///**
// * @author lifeix
// *
// */
//@Controller
//@RequestMapping("/rank")
//public class RankController {
//
//    @RequestMapping(value = "/innersettleshow")
//    public String showSettle() {
//	return "/user/inner_settle";
//    }
//
//    // 新排行榜
//    @RequestMapping(value = "/rankshow/winning")
//    public String showRankWinning() {
//	return "/rank/inner_rank_winning";
//    }
//
//    @RequestMapping(value = "/rankshow/roi")
//    public String showRankRoi() {
//	return "/rank/inner_rank_roi";
//    }
//
//    /**
//     * 结算记录
//     *
//     * @return
//     * @throws JSONException
//     */
//    @RequestMapping(value = "/innersettle")
//    @ResponseBody
//    public Map<String, Object> showSettleList(Long long_no, String start_time, String end_time, Integer now_page,
//	    Long userId, Integer type, Long contestId, Integer playId, Integer support) throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	/*
//	 * if (long_no == null) { outMap.put("msg", "龙号参数错误！"); }
//	 */
//	if (start_time == null) {
//	    outMap.put("msg", "起始时间参数错误！");
//	}
//	if (end_time == null) {
//	    outMap.put("msg", "终止时间参数错误！");
//	}
//	if (userId != null) {
//	    start_time = "";
//	    end_time = "";
//	    long_no = null;
//	}
//	JSONObject ret = CbsContestlApiUtil.getInstance().InnerSettle(long_no, start_time, end_time, now_page, userId, type,
//	        contestId, playId, support);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		UserSettleLogListResponse settleLogList = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    settleLogList = new Gson().fromJson(data, UserSettleLogListResponse.class);
//		}
//		int num = 0;
//		List<UserSettleLogResponse> logList = null;
//		if (settleLogList.getLogs() != null) {
//		    logList = settleLogList.getLogs();
//		    num = logList.size();
//		}
//		int new_now_page = -1;
//		JSONObject dataJson = ret.getJSONObject("data");
//		new_now_page = dataJson.optInt("now_page");
//		outMap.put("nowpage", new_now_page);
//		outMap.put("logList", logList);
//		outMap.put("num", num);
//	    } else {
//		outMap.put("msg", ret.optString("msg"));
//	    }
//
//	    outMap.put("code", code);
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//    /**
//     * 日榜周榜跳转至结算详情
//     *
//     * @param long_no
//     * @param time
//     * @param type
//     * @return
//     * @throws ParseException
//     */
//    @RequestMapping(value = "/innersettleshow/user")
//    public String getUserSettle(Long long_no, String time, Integer type, HttpServletRequest request) throws ParseException {
//	String start_time = "";
//	String end_time = "";
//	if (type == 1) {
//	    start_time = time;
//	    end_time = time;
//	} else if (type == 2) {
//	    Calendar cal = Calendar.getInstance(Locale.CHINA);
//	    /**
//	     * new 设定一周的第一天为周一
//	     */
//	    cal.setFirstDayOfWeek(Calendar.MONDAY);
//	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.CHINA);
//	    Date date = sdf.parse(time);
//	    cal.setTime(date);
//	    cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
//	    start_time = sdf.format(cal.getTime());
//	    cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
//	    end_time = sdf.format(cal.getTime());
//	} else {
//	    request.setAttribute("msg", "参数错误！");
//	}
//	request.setAttribute("long_no", long_no);
//	request.setAttribute("start_time", start_time);
//	request.setAttribute("end_time", end_time);
//	return "/user/inner_settle";
//    }
//
//    /**
//     * 单条结算信息
//     *
//     * @param userId
//     * @param type
//     * @param contestId
//     * @param playId
//     * @param support
//     * @param request
//     * @return
//     */
//    @RequestMapping(value = "/innersettleshow/contest")
//    public String getContestSettle(Long userId, Integer type, Long contestId, Integer playId, Integer support,
//	    HttpServletRequest request) {
//	request.setAttribute("userId", userId);
//	request.setAttribute("type", type);
//	request.setAttribute("contestId", contestId);
//	request.setAttribute("playId", playId);
//	request.setAttribute("support", support);
//	return "/user/inner_settle";
//    }
//
//    /**
//     * 新排行榜
//     *
//     * @param type
//     *            1：胜率，2：盈利
//     * @param start_id
//     * @param limit
//     * @return
//     * @throws JSONException
//     */
//    @RequestMapping(value = "/top")
//    @ResponseBody
//    public Map<String, Object> getRankTop(Integer type, Integer start_id, Integer limit, Integer timeType)
//	    throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	Integer year = null;
//	Integer week = null;
//	if (timeType != 0) {// 0为总榜
//	    Calendar cal = Calendar.getInstance();
//	    year = cal.get(Calendar.YEAR);
//	    week = cal.get(Calendar.WEEK_OF_YEAR);
//	}
//	JSONObject ret = CbsContestlApiUtil.getInstance().getRankTop(type, start_id, limit, year, week);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		UserStatisticsListResponse rankListResponse = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    rankListResponse = new Gson().fromJson(data, UserStatisticsListResponse.class);
//		}
//		int num = 0;
//		List<UserStatisticsResponse> rankList = null;
//		if (rankListResponse.getRanks() != null) {
//		    rankList = rankListResponse.getRanks();
//		    num = rankList.size();
//		}
//		JSONObject dataJson = ret.getJSONObject("data");
//		start_id = dataJson.optInt("startId");
//		outMap.put("start_id", start_id);
//		outMap.put("rankList", rankList);
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
//}
