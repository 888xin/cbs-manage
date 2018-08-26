//package com.cbs.manage.controller.mall;
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
//import com.cbs.manage.util.CbsMallApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.mall.bean.order.MallRecommendListResponse;
//import com.lifeix.cbs.mall.bean.order.MallRecommendResponse;
//
///**
// * Created by yis on 16-3-23
// *
// * @Description
// */
//@Controller
//@RequestMapping("/goods/recommend")
//public class GoodsRecommendController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(GoodsRecommendController.class);
//
//    // 跳转到商品订单列表页面
//    @RequestMapping("/show")
//    public String show() {
//	return "goods/goods_recommend";
//    }
//
//    /**
//     * 查看商品导航列表
//     * @return
//     */
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> list() {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsMallApiUtil.getInstance().getRecommendsInfo();
//
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		MallRecommendListResponse mallRecommendListResponse = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    mallRecommendListResponse = new Gson().fromJson(data, MallRecommendListResponse.class);
//		}
//		int num = 0;
//		if (mallRecommendListResponse != null) {
//		    List<MallRecommendResponse> mallRecommendResponseList = mallRecommendListResponse.getMallRecommends();
//		    num = mallRecommendResponseList.size();
//		    outMap.put("recommends", mallRecommendResponseList);
//		}
//	        outMap.put("number", num);
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
//     * 删除商品导航
//     * @return
//     */
//    @RequestMapping("/delete")
//    @ResponseBody
//    public Map<String, Object> deleteRecommend(Long id) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	boolean flag = false;
//	JSONObject ret;
//	    // 进行删除操作
//	    if (id != null) {
//		ret = CbsMallApiUtil.getInstance().deleteRecommend(id);
//		if (ret != null) {
//		    int code = ret.optInt("code");
//		    if (code == 200) {
//			flag = true;
//		    }
//		}
//	    }
//	    if (flag) {
//		outMap.put("msg", "商品导航删除成功！");
//	    } else {
//		outMap.put("msg", "商品导航删除失败！");
//	    }
//	outMap.put("flag", flag);
//	return outMap;
//    }
//
//
//    /**
//     * 编辑商品导航列表
//     * @return
//     */
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> editRecommend(MallRecommendResponse mallRecommendResponse, String oper, Long id) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	boolean flag = false;
//	JSONObject ret;
//	if ("add".equals(oper)) {
//	    ret = CbsMallApiUtil.getInstance().addRecommend(mallRecommendResponse);
//	    if (ret != null) {
//		int code = ret.optInt("code");
//		if (code == 200) {
//		    flag = true;
//		}
//	    }
//	    if (flag) {
//		outMap.put("msg", "商品导航添加成功！");
//	    } else {
//		outMap.put("msg", "商品导航添加失败！");
//	    }
//	} else if ("edit".equals(oper)) {
//	    ret = CbsMallApiUtil.getInstance().updateRecommend(mallRecommendResponse);
//
//	    if (ret != null) {
//		int code = ret.optInt("code");
//		if (code == 200) {
//		    flag = true;
//		}
//	    }
//	    if (flag) {
//		outMap.put("msg", "商品导航修改成功！");
//	    } else {
//		outMap.put("msg", "商品导航修改失败！");
//	    }
//	}
//
//	outMap.put("flag", flag);
//	return outMap;
//    }
//
//}
