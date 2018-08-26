//package com.cbs.manage.controller.content;
//
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.content.bean.boot.BootInfoListResponse;
//import com.lifeix.cbs.content.bean.boot.BootInfoResponse;
//
//import org.json.JSONObject;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
///**
// * Created by lhx on 16-4-15 下午2:44
// *
// * @Description
// */
//@Controller
//@RequestMapping("/boot")
//public class BootController {
//
//    // 跳转到列表页面
//    @RequestMapping("/list")
//    public String show() {
//	return "boot/boot_list";
//    }
//
//    @RequestMapping("/data")
//    @ResponseBody
//    public Map<String, Object> list(Long start_id) {
//	int listSize = 10;
//	Map<String, Object> outMap = new HashMap<>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getBootListInfo(start_id, listSize);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		BootInfoListResponse bootInfoListResponse = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    bootInfoListResponse = new Gson().fromJson(data, BootInfoListResponse.class);
//		}
//		if (bootInfoListResponse != null) {
//
//		    if (bootInfoListResponse.getBoots() != null && bootInfoListResponse.getBoots().size() > 0) {
//			List<BootInfoResponse> boots = bootInfoListResponse.getBoots();
//			outMap.put("boots", boots);
//			outMap.put("number", boots.size());
//
//		    } else {
//			outMap.put("msg", "服务器端无数据返回！");
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
//    @RequestMapping("/add")
//    @ResponseBody
//    public Map<String, Object> add(BootInfoResponse bootInfoResponse) {
//	Map<String, Object> outMap = new HashMap<>();
//
//	JSONObject ret = CbsOtherApiUtil.getInstance().addboot(bootInfoResponse);
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
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> edit(BootInfoResponse bootInfoResponse) {
//	Map<String, Object> outMap = new HashMap<>();
//
//	JSONObject ret = CbsOtherApiUtil.getInstance().editboot(bootInfoResponse);
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
//    @RequestMapping("/view")
//    @ResponseBody
//    public Map<String, Object> view(Long id) {
//	Map<String, Object> outMap = new HashMap<>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getBootInfo(id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		BootInfoResponse bootInfoResponse = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    bootInfoResponse = new Gson().fromJson(data, BootInfoResponse.class);
//		}
//		if (bootInfoResponse != null) {
//		    outMap.put("boot", bootInfoResponse);
//		    outMap.put("number", 1);
//		} else {
//		    outMap.put("msg", "服务器端无数据返回！");
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
//    @RequestMapping("/able")
//    @ResponseBody
//    public Map<String, Object> able(Long id) {
//	Map<String, Object> outMap = new HashMap<>();
//
//	JSONObject ret = CbsOtherApiUtil.getInstance().ableBoot(id);
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
//    @RequestMapping("/disable")
//    @ResponseBody
//    public Map<String, Object> disable(Long id) {
//	Map<String, Object> outMap = new HashMap<>();
//
//	JSONObject ret = CbsOtherApiUtil.getInstance().disableBoot(id);
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
//    @RequestMapping("/drop")
//    @ResponseBody
//    public Map<String, Object> delete(Long id) {
//	Map<String, Object> outMap = new HashMap<>();
//
//	JSONObject ret = CbsOtherApiUtil.getInstance().deleteBoot(id);
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
