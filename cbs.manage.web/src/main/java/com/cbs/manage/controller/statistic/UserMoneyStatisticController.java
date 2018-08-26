//package com.cbs.manage.controller.statistic;
//
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.cbs.manage.util.RobotMap;
//import com.google.gson.Gson;
//import com.lifeix.cbs.api.bean.money.MoneyUserStatisticListResponse;
//import com.lifeix.cbs.api.bean.money.MoneyUserStatisticResponse;
//
//import org.json.JSONObject;
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
// * Created by lhx on 16-4-13 下午5:45
// *
// * @Description
// */
//@Controller
//@RequestMapping("/statistic/user/money")
//public class UserMoneyStatisticController {
//
//    // 跳转到页面
//    @RequestMapping("/show")
//    public String show() {
//	return "statistic/statistic_user_money";
//    }
//
//    @RequestMapping("/get")
//    @ResponseBody
//    public Map<String, Object> data(String date, Integer type, Integer order, Boolean filter) {
//	if (filter == null) {// 默认过滤
//	    filter = true;
//	}
//	Map<String, Object> outMap = new HashMap<>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getUserMoneyStatistic(date, type, order);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		MoneyUserStatisticListResponse moneyUserStatisticListResponse;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    moneyUserStatisticListResponse = new Gson().fromJson(data, MoneyUserStatisticListResponse.class);
//		    List<MoneyUserStatisticResponse> list = new ArrayList<MoneyUserStatisticResponse>();
//		    List<MoneyUserStatisticResponse> newList = moneyUserStatisticListResponse.getUsers_money();
//		    if (filter) {
//			for (int i = 0; i < newList.size(); i++) {
//			    MoneyUserStatisticResponse res = newList.get(i);
//			    if (!RobotMap.accountList.contains(res.getUser().getUser_id())
//				    && !RobotMap.accountList.contains(res.getUser().getLong_no())) {
//				list.add(res);
//			    }
//			}
//		    } else {
//			list = newList;
//		    }
//		    outMap.put("user_money", list);
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
//}
