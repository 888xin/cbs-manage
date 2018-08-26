//package com.cbs.manage.controller.money;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
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
//import com.lifeix.cbs.api.bean.money.MoneyCardListResponse;
//import com.lifeix.cbs.api.bean.money.MoneyCardResponse;
//
///**
// * Created by lhx on 16-2-25 下午4:57
// *
// * @Description
// */
//@Controller
//@RequestMapping("/moneycard")
//public class MoneyCardController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(MoneyCardController.class);
//
//    // 跳转到页面
//    @RequestMapping("/show")
//    public String show() {
//	return "moneycard/moneycard_list";
//    }
//
//    /**
//     * 获取列表数据
//     */
//    @RequestMapping("/data")
//    @ResponseBody
//    public Map<String, Object> data(Integer deleteFlag) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().cardList(deleteFlag);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		MoneyCardListResponse response;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    response = new Gson().fromJson(data, MoneyCardListResponse.class);
//		    List<MoneyCardResponse> moneycards = response.getMoney_cards();
//		    outMap.put("moneycards", moneycards);
//		    if (moneycards == null) {
//			outMap.put("number", 0);
//		    } else {
//			outMap.put("number", moneycards.size());
//		    }
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
//     * 充值卡状态编辑
//     *
//     * @return
//     */
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> edit(MoneyCardResponse moneyCardResponse) {
//
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = null;
//	if (moneyCardResponse.getId() > 0) {
//	    ret = CbsOtherApiUtil.getInstance().cardUpdate(moneyCardResponse);
//	} else {
//	    ret = CbsOtherApiUtil.getInstance().cardInsert(moneyCardResponse);
//	}
//
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    outMap.put("code", code);
//	    outMap.put("msg", ret.optString("msg"));
//	} else {
//	    outMap.put("msg", "服务器端无反馈！");
//	}
//	return outMap;
//    }
//
//    /**
//     * 充值卡状态重置
//     *
//     * @return
//     */
//    @RequestMapping("/delete")
//    @ResponseBody
//    public Map<String, Object> deleteRecommend(Long id, Integer deleteFlag) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	boolean flag = false;
//	JSONObject ret;
//	// 进行删除操作
//	if (id != null) {
//	    ret = CbsOtherApiUtil.getInstance().cardDelete(id, deleteFlag);
//	    if (ret != null) {
//		int code = ret.optInt("code");
//		if (code == 200) {
//		    flag = true;
//		}
//	    }
//	}
//	if (flag) {
//	    outMap.put("msg", "充值卡状态重置成功！");
//	} else {
//	    outMap.put("msg", "充值卡状态重置失败！");
//	}
//	outMap.put("flag", flag);
//	return outMap;
//    }
//
//}
