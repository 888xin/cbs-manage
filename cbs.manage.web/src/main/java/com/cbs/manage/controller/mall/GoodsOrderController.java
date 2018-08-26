//package com.cbs.manage.controller.mall;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.cbs.manage.util.CbsMallApiUtil;
//import com.cbs.manage.util.ExpressConstants;
//import com.google.gson.Gson;
//import com.lifeix.cbs.mall.bean.order.MallExpressResponse;
//import com.lifeix.cbs.mall.bean.order.MallOrderListResponse;
//import com.lifeix.cbs.mall.bean.order.MallOrderResponse;
//
///**
// * Created by lhx on 15-11-5 下午2:06
// *
// * @Description
// */
//@Controller
//@RequestMapping("/goods/order")
//public class GoodsOrderController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(GoodsOrderController.class);
//
//    // 跳转到商品订单列表页面
//    @RequestMapping("/show")
//    public String show() {
//	return "goods/goods_order";
//    }
//
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> list(Long userId, Integer status, Long startId) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsMallApiUtil.getInstance().listMallOrders(userId, status, startId);
//
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		MallOrderListResponse mallOrderListResponse = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    mallOrderListResponse = new Gson().fromJson(data, MallOrderListResponse.class);
//		}
//		int num = 0;
//		if (mallOrderListResponse != null) {
//		    List<MallOrderResponse> mallOrderResponseList = mallOrderListResponse.getOrders();
//		    num = mallOrderResponseList.size();
//		    outMap.put("orders", mallOrderResponseList);
//		}
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
//
//    @RequestMapping("/send")
//    @ResponseBody
//    public Map<String, Object> send(Long orderId, Integer expressType, String expressNo) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsMallApiUtil.getInstance().sendMallOrders(orderId, expressType, expressNo);
//	if (ret != null) {
//	    outMap.put("msg", ret.optString("msg"));
//	    outMap.put("code", ret.optInt("code"));
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//    @RequestMapping("/view")
//    @ResponseBody
//    public Map<String, Object> view(Long orderId) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsMallApiUtil.getInstance().viewMallOrder(orderId);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		MallOrderResponse mallOrderResponse = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    mallOrderResponse = new Gson().fromJson(data, MallOrderResponse.class);
//		}
//		if (mallOrderResponse != null) {
//		    outMap.put("order", mallOrderResponse);
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
//    @RequestMapping("/express")
//    @ResponseBody
//    public Map<String, Object> viewExpress(Long orderId) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsMallApiUtil.getInstance().viewOrderExpress(orderId);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		MallExpressResponse mallExpressResponse = new MallExpressResponse();
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    mallExpressResponse = new Gson().fromJson(data, MallExpressResponse.class);
//		}
//		if (mallExpressResponse != null) {
//		    outMap.put("orderExpress", mallExpressResponse);
//		    String expressCompany = ExpressConstants.shipperCodeMap.get(mallExpressResponse.getExpressType());
//		    String info = "无";
//		    // 转换物流信息输出
//		    if (!StringUtils.isEmpty(mallExpressResponse.getExpressInfo())
//			    && !mallExpressResponse.getExpressInfo().equals("[]")) {
//			info = mallExpressResponse.getExpressInfo();
//			info = info.substring(2, info.length() - 2);
//			info = info.replaceAll("\"", "");
//			info = info.replaceAll("AcceptStation", "<div><i class='red'>信息</i>");
//			info = info.replaceAll(",AcceptTime", "</div>&nbsp;&nbsp;<div><i class='red'>时间</i>");
//			info = info.replace("},{", "</div><hr>");
//		    }
//		    outMap.put("expressInfo", info);
//		    outMap.put("expressCompany", expressCompany);
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
//    @RequestMapping("/cancel")
//    @ResponseBody
//    public Map<String, Object> cancel(Long orderId) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsMallApiUtil.getInstance().cancelOrders(orderId);
//	if (ret != null) {
//	    outMap.put("msg", ret.optString("msg"));
//	    outMap.put("code", ret.optInt("code"));
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//}
