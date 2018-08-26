//package com.cbs.manage.controller.statistic;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.lifeix.email.service.SmsDubboService;
//
//@Controller
//@RequestMapping("/statistic/massage")
//public class MessageStatisticController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(MessageStatisticController.class);
//
//    @Autowired
//    private SmsDubboService smsDubboService;
//
//    // 跳转到页面
//    @RequestMapping("/show")
//    public String show() {
//	return "statistic/statistic_message_show";
//    }
//
//    /**
//     * 查找球队
//     *
//     * @return
//     *
//     *
//     *         start_time=1464710400 end_time=1467216000 source=CBS
//     */
//    @RequestMapping(value = "/search")
//    @ResponseBody
//    public String search(String type) {
//	String result = "-1";
//	try {
//	    JSONObject ret = new JSONObject(smsDubboService.queryRemain(type));
//	    if (ret != null) {
//		int code = ret.optInt("status");
//		if (code == 1) {
//		    result = ret.optString("msg");
//		}
//	    }
//	} catch (JSONException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//	return result;
//    }
//}
