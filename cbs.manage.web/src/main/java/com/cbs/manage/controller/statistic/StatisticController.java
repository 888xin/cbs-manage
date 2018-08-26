//package com.cbs.manage.controller.statistic;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import com.cbs.manage.util.CbsContestlApiUtil;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import com.lifeix.cbs.api.bean.money.MoneyMissedListResponse;
//import com.lifeix.cbs.api.bean.money.MoneyMissedResponse;
//
///**
// *
// * @author jacky
// *
// */
//@Controller
//@RequestMapping("/statistic")
//public class StatisticController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(StatisticController.class);
//
//    // 跳转到龙筹统计页面
//    @RequestMapping("/show")
//    public String show() {
//	return "statistic/statistic_gold";
//    }
//
//    // 跳转到龙筹详细页面
//    @RequestMapping("/gold/detail")
//    public String detail() {
//	return "statistic/statistic_gold_detail";
//    }
//
//    // 跳转到龙币详细页面
//    @RequestMapping("/money/detail")
//    public String moneyDetail() {
//	return "statistic/statistic_money_detail";
//    }
//
//    // 返回统计数据结果， 时间格式为：yyyy-MM-dd
//    @RequestMapping(value = "/gold/statistic", method = RequestMethod.POST)
//    public void goldStatistic(String start_time, String end_time, HttpServletResponse response, HttpServletRequest request) {
//	try {
//	    JSONObject ret = CbsOtherApiUtil.getInstance().goldStatistic(start_time, end_time);
//	    response.getWriter().print(ret.toString());
//	} catch (IOException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//
//    }
//
//    // 返回统计数据结果， 时间格式为：yyyy-MM-dd
//    @RequestMapping(value = "/money/statistic", method = RequestMethod.POST)
//    public void moneyStatistic(String start_time, String end_time, HttpServletResponse response, HttpServletRequest request) {
//	try {
//	    JSONObject ret = CbsOtherApiUtil.getInstance().moneyStatistic(start_time, end_time);
//	    response.getWriter().print(ret.toString());
//	} catch (IOException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//
//    }
//
//    // 返回系统详细流水 时间格式为：yyyy-MM-dd
//    @RequestMapping(value = "/gold/detail/log", method = RequestMethod.POST)
//    public void goldLogDetail(Long log_id, Long long_no, String start_time, String end_time, Long start_id, String types,
//	    Integer limit, HttpServletResponse response, HttpServletRequest request) {
//	try {
//
//	    if (log_id != null) {
//		start_time = "";
//		end_time = "";
//		types = "";
//	    }
//	    JSONObject ret = CbsOtherApiUtil.getInstance().goldLogsDetail(log_id, long_no, start_time, end_time, start_id,
//		    types, limit);
//	    response.getWriter().print(ret.toString());
//	} catch (Exception e) {
//	    LOG.error(e.getMessage(), e);
//	}
//    }
//
//    // 返回系统详细流水 时间格式为： yyyy-MM-dd HH:mm:ss
//    @RequestMapping(value = "/money/detail/log", method = RequestMethod.GET)
//    public void moneyLogDetail(Long log_id, Long long_no, String start_time, String end_time, Long start_id, String types,
//	    Integer limit, HttpServletResponse response, HttpServletRequest request) {
//	try {
//	    if (log_id != null) {
//		start_time = "";
//		end_time = "";
//		types = "";
//	    }
//	    JSONObject ret = CbsOtherApiUtil.getInstance().moneyLogsDetail(log_id, long_no, start_time, end_time, start_id,
//		    types, limit);
//	    response.getWriter().print(ret.toString());
//	} catch (Exception e) {
//	    LOG.error(e.getMessage(), e);
//	}
//    }
//
//    @RequestMapping("/money/missing/list")
//    @ResponseBody
//    public Map<String, Object> getMissingList(Integer status, Long startId, Integer limit) throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	if (limit == null) {
//	    limit = 40;
//	}
//	JSONObject ret = CbsOtherApiUtil.getInstance().moneyMissingList(status, startId, limit);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		MoneyMissedListResponse listResponse = null;
//		List<MoneyMissedResponse> response = null;
//		int number = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    Gson gson = new GsonBuilder().setDateFormat("E MMM dd HH:mm:ss ZZZZ yyyy").create();
//		    listResponse = gson.fromJson(data, MoneyMissedListResponse.class);
//		}
//		if (listResponse.getMoney_misseds() != null) {
//		    response = listResponse.getMoney_misseds();
//		    number = response.size();
//		    outMap.put("list", response);
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
//    @RequestMapping("/money/missing/edit")
//    @ResponseBody
//    public Map<String, Object> editMissing(Long id, Boolean repairFlag) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	if (id == null) {
//	    outMap.put("msg", "参数错误！");
//	    return outMap;
//	}
//	if (repairFlag == null) {
//	    outMap.put("msg", "参数错误！");
//	    return outMap;
//	}
//	JSONObject ret = CbsOtherApiUtil.getInstance().moneyMissingEdit(id, repairFlag);
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
//	@RequestMapping("/much/money")
//	@ResponseBody
//	public Map<String, Object> muchMoney() {
//		Map<String, Object> outMap = new HashMap<>();
//		JSONObject ret = CbsContestlApiUtil.getInstance().getBetMuchMoney();
//		if (ret != null) {
//			int code = ret.optInt("code");
//			if (code == 200) {
//				String data = ret.optString("data");
//				if (!StringUtils.isEmpty(data)) {
//					String[] strings = new Gson().fromJson(data, String[].class);
//					outMap.put("bets", strings);
//				}
//			} else {
//				outMap.put("msg", ret.optString("msg"));
//			}
//			outMap.put("code", code);
//		} else {
//			outMap.put("msg", "服务器端无数据返回！");
//		}
//		return outMap;
//	}
//
//
//	@RequestMapping("/much/money/refresh")
//	@ResponseBody
//	public Map<String, Object> refresh() {
//		Map<String, Object> outMap = new HashMap<>();
//		JSONObject ret = CbsContestlApiUtil.getInstance().refreshBetMuchMoney();
//		if (ret != null) {
//			outMap.put("code", ret.optInt("code"));
//			outMap.put("msg", ret.optString("msg"));
//		} else {
//			outMap.put("msg", "服务器端无数据返回！");
//		}
//		return outMap;
//	}
//}
