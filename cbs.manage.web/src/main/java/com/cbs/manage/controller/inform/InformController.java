///**
// *
// */
//package com.cbs.manage.controller.inform;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.cbs.manage.bean.role.RoleResponse;
//import com.cbs.manage.impl.im.LifeixImApiUtil;
//import com.cbs.manage.service.im.ImUserBlockService;
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import com.lifeix.cbs.api.common.util.ContentConstants.InformStatus;
//import com.lifeix.cbs.content.bean.inform.InformListResponse;
//import com.lifeix.cbs.content.bean.inform.InformResponse;
//import com.lifeix.exception.service.L99IllegalParamsException;
//import com.lifeix.exception.service.L99NetworkException;
//
///**
// * @author lifeix
// *
// */
//@Controller
//@RequestMapping("/inform")
//public class InformController {
//
//    @Autowired
//    private ImUserBlockService imUserBlockService;
//
//    /**
//     * 跳转到举报管理页面
//     *
//     * @return
//     */
//    @RequestMapping("/show")
//    public String show() {
//	return "/inform/inform_manage";
//    }
//
//    /**
//     * 获取评论举报列表
//     *
//     * @param page
//     * @param limit
//     * @param status
//     * @param comment_id
//     * @return
//     * @throws JSONException
//     */
//    @RequestMapping("/comment/list")
//    @ResponseBody
//    public Map<String, Object> commentInformList(Integer page, Integer limit, Integer status, Long comment_id)
//	    throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getCommentInformList(page, limit, status, comment_id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		InformListResponse listResponse = null;
//		List<InformResponse> response = null;
//		int number = 0;
//		int startId = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    Gson gson = new GsonBuilder().setDateFormat("E MMM dd HH:mm:ss ZZZZ yyyy").create();
//		    listResponse = gson.fromJson(data, InformListResponse.class);
//		}
//		if (listResponse.getInforms() != null) {
//		    response = listResponse.getInforms();
//		    number = response.size();
//		    outMap.put("commInformList", response);
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
//    /**
//     * 获取吐槽举报列表
//     *
//     * @param page
//     * @param limit
//     * @param status
//     * @param content_id
//     * @return
//     * @throws JSONException
//     */
//    @RequestMapping("/content/list")
//    @ResponseBody
//    public Map<String, Object> contentInformList(Integer page, Integer limit, Integer status, Long content_id)
//	    throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getContentInformList(page, limit, status, content_id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		InformListResponse listResponse = null;
//		List<InformResponse> response = null;
//		int number = 0;
//		int startId = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    Gson gson = new GsonBuilder().setDateFormat("E MMM dd HH:mm:ss ZZZZ yyyy").create();
//		    listResponse = gson.fromJson(data, InformListResponse.class);
//		}
//		if (listResponse.getInforms() != null) {
//		    response = listResponse.getInforms();
//		    number = response.size();
//		    outMap.put("contentInformList", response);
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
//    /**
//     * 获取IM举报列表
//     *
//     * @param page
//     * @param limit
//     * @param status
//     * @param im_id
//     * @return
//     * @throws JSONException
//     */
//    @RequestMapping("/im/list")
//    @ResponseBody
//    public Map<String, Object> imInformList(Integer page, Integer limit, Integer status, Long im_id) throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getIMInformList(page, limit, status, im_id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		InformListResponse listResponse = null;
//		List<InformResponse> response = null;
//		int number = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    Gson gson = new GsonBuilder().setDateFormat("E MMM dd HH:mm:ss ZZZZ yyyy").create();
//		    listResponse = gson.fromJson(data, InformListResponse.class);
//		}
//		if (listResponse.getInforms() != null) {
//		    response = listResponse.getInforms();
//		    number = response.size();
//		    outMap.put("imInformList", response);
//		}
//		outMap.put("number", number);
//		JSONObject dataJson = ret.getJSONObject("data");
//		page = dataJson.optInt("page_num");
//		outMap.put("page_num", page);
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
//     * 获取用户举报列表
//     *
//     * @param page
//     * @param limit
//     * @param status
//     * @param user_id
//     * @return
//     * @throws JSONException
//     */
//    @RequestMapping("/user/list")
//    @ResponseBody
//    public Map<String, Object> userInformList(Integer page, Integer limit, Integer status, Long user_id)
//	    throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getUserInformList(page, limit, status, user_id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		InformListResponse listResponse = null;
//		List<InformResponse> response = null;
//		int number = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    Gson gson = new GsonBuilder().setDateFormat("E MMM dd HH:mm:ss ZZZZ yyyy").create();
//		    listResponse = gson.fromJson(data, InformListResponse.class);
//		}
//		if (listResponse.getInforms() != null) {
//		    response = listResponse.getInforms();
//		    number = response.size();
//		    outMap.put("userInformList", response);
//		}
//		outMap.put("number", number);
//		JSONObject dataJson = ret.getJSONObject("data");
//		page = dataJson.optInt("page_num");
//		outMap.put("page_num", page);
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
//     * 获取新闻评论举报列表
//     *
//     * @param page
//     * @param limit
//     * @param status
//     * @return
//     * @throws JSONException
//     */
//    @RequestMapping("/news/list")
//    @ResponseBody
//    public Map<String, Object> newsInformList(Integer page, Integer limit, Integer status) throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getNewsInformList(page, limit, status);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		InformListResponse listResponse = null;
//		List<InformResponse> response = null;
//		int number = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    Gson gson = new GsonBuilder().setDateFormat("E MMM dd HH:mm:ss ZZZZ yyyy").create();
//		    listResponse = gson.fromJson(data, InformListResponse.class);
//		}
//		if (listResponse.getInforms() != null) {
//		    response = listResponse.getInforms();
//		    number = response.size();
//		    outMap.put("newsInformList", response);
//		}
//		outMap.put("number", number);
//		JSONObject dataJson = ret.getJSONObject("data");
//		page = dataJson.optInt("page_num");
//		outMap.put("page_num", page);
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
//     * 获取新闻举报列表
//     *
//     * @param page
//     * @param limit
//     * @param status
//     * @return
//     * @throws JSONException
//     */
//    @RequestMapping("/news/main/list")
//    @ResponseBody
//    public Map<String, Object> newsMainInformList(Integer page, Integer limit, Integer status) throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getNewsMainInformList(page, limit, status);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		InformListResponse listResponse = null;
//		List<InformResponse> response = null;
//		int number = 0;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    Gson gson = new GsonBuilder().setDateFormat("E MMM dd HH:mm:ss ZZZZ yyyy").create();
//		    listResponse = gson.fromJson(data, InformListResponse.class);
//		}
//		if (listResponse.getInforms() != null) {
//		    response = listResponse.getInforms();
//		    number = response.size();
//		    outMap.put("newsInformList", response);
//		}
//		outMap.put("number", number);
//		JSONObject dataJson = ret.getJSONObject("data");
//		page = dataJson.optInt("page_num");
//		outMap.put("page_num", page);
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
//     * 更新举报处理状态
//     *
//     * @param id
//     *            单条举报
//     * @param ids
//     *            多条举报
//     * @param status
//     * @param dispose_info
//     * @param type
//     *            举报类型
//     * @param request
//     * @return
//     */
//    @RequestMapping("/updatestatus")
//    @ResponseBody
//    public Map<String, Object> updateContentInformStatus(Long id, /* String ids, */Integer status, String dispose_info,
//	    Integer type, Long last_time, HttpServletRequest request) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	RoleResponse o = (RoleResponse) request.getSession().getAttribute("roleSession");
//	if (StringUtils.isEmpty(dispose_info)) {
//	    dispose_info = "无";
//	}
//	String dis = null;
//	if (status == 1) {
//	    dis = "屏蔽";
//	} else if (status == 2) {
//	    dis = "忽略";
//	}
//	dispose_info = "处理：" + dis + "，处理人：" + o.getRolename() + "，处理理由：" + dispose_info;
//	JSONObject ret = null;
//	// 不同的举报类型
//	switch (type) {
//	case 1:// 评论及吐槽先不作处理
//	    ret = CbsOtherApiUtil.getInstance().updateCommentInformStatus(id, null, status, dispose_info);
//	    break;
//	case 2:
//	    ret = CbsOtherApiUtil.getInstance().updateContentInformStatus(id, null, status, dispose_info);
//	    break;
//	case 3:// im
//	    ret = CbsOtherApiUtil.getInstance().updateIMInformStatus(id, status, dispose_info, last_time);
//	    break;
//	case 4:// 新闻评论
//	    ret = CbsOtherApiUtil.getInstance().updateNewsInformStatus(id, status, dispose_info);
//	    break;
//	case 5:// 新闻
//	    ret = CbsOtherApiUtil.getInstance().updateNewsMainInformStatus(id, status, dispose_info);
//	    break;
//	case 10:// 用户
//	    ret = CbsOtherApiUtil.getInstance().updateUserInformStatus(id, status, dispose_info, last_time);
//	    break;
//	}
//
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
//    /**
//     * 禁言或者屏蔽用户
//     *
//     * @param userId
//     * @param level
//     *            1 禁言，2 屏蔽
//     * @return
//     * @throws L99IllegalParamsException
//     * @throws JSONException
//     * @throws L99NetworkException
//     */
//    @RequestMapping("/gagUser")
//    @ResponseBody
//    public Map<String, Object> gagUser(Long id, Long user_id, Long last_time, Integer status, String dispose_info,
//	    Integer type, HttpServletRequest request) throws L99IllegalParamsException, JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = null;
//	RoleResponse o = (RoleResponse) request.getSession().getAttribute("roleSession");
//	Integer level = 0;
//	if (StringUtils.isEmpty(dispose_info)) {
//	    dispose_info = "无";
//	}
//	String dis = null;
//	if (status == 2) {
//	    dis = "忽略";
//	    last_time = -1L;
//	    switch (type) {// 忽略则直接更新cbs数据库
//	    case 3:
//		ret = CbsOtherApiUtil.getInstance().updateIMInformStatus(id, status, dispose_info, last_time);
//		break;
//	    case 10:
//		ret = CbsOtherApiUtil.getInstance().updateUserInformStatus(id, status, dispose_info, last_time);
//		break;
//	    }
//	} else if (status == 1) {
//	    dis = "屏蔽";
//	    level = 2;
//	    ret = LifeixImApiUtil.getInstance().gagUser(user_id, level, last_time);
//	} else if (status == 3) {
//	    dis = "禁言";
//	    level = 1;
//	    ret = LifeixImApiUtil.getInstance().gagUser(user_id, level, last_time);
//	}
//	dispose_info = "处理：" + dis + "，处理人：" + o.getRolename() + "，处理理由：" + dispose_info;
//
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 1000) {
//		// 屏蔽成功，同步cbs的数据库
//		switch (type) {
//		case 3:
//		    ret = CbsOtherApiUtil.getInstance().updateIMInformStatus(id, status, dispose_info, last_time);
//		    break;
//		case 10:
//		    ret = CbsOtherApiUtil.getInstance().updateUserInformStatus(id, status, dispose_info, last_time);
//		    break;
//		}
//		outMap.put("code", 200);
//	    } else {
//		if (level == 1) {
//		    outMap.put("msg", ret.optString("禁言失败"));
//		} else if (level == 2) { // 2是屏蔽
//		    outMap.put("msg", ret.optString("屏蔽失败"));
//		}
//		outMap.put("code", code);
//	    }
//	} else {
//	    outMap.put("code", 1004);
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//    @RequestMapping("/unGagUser")
//    @ResponseBody
//    public Map<String, Object> unGagUser(Long id, Long user_id, String dispose_info, Integer type, HttpServletRequest request) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	RoleResponse o = (RoleResponse) request.getSession().getAttribute("roleSession");
//	if (StringUtils.isEmpty(dispose_info)) {
//	    dispose_info = "无";
//	}
//	String dis = "解禁";
//	dispose_info = "处理：" + dis + "，处理人：" + o.getRolename() + "，处理理由：" + dispose_info;
//	JSONObject ret = LifeixImApiUtil.getInstance().unGagUser(user_id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//
//	    if (code == 1000) {
//		// 解除屏蔽成功，同步cbs的数据库
//		switch (type) {
//		case 3:
//		    ret = CbsOtherApiUtil.getInstance().updateIMInformStatus(id, InformStatus.IGNORED, dispose_info, -1L);
//		    break;
//		case 10:
//		    ret = CbsOtherApiUtil.getInstance().updateUserInformStatus(id, InformStatus.IGNORED, dispose_info, -1L);
//		    break;
//		}
//		outMap.put("code", 200);
//	    } else {
//		outMap.put("msg", ret.optString("删除失败"));
//		outMap.put("code", code);
//	    }
//	} else {
//	    outMap.put("code", 1004);
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//}
