//package com.cbs.manage.controller.im;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.cbs.manage.bean.im.ImChat;
//import com.cbs.manage.bean.im.ImRoom;
//import com.cbs.manage.bean.im.ImUserBlockResponse;
//import com.cbs.manage.impl.im.LifeixImApiUtil;
//import com.cbs.manage.service.im.ImUserBlockService;
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.google.gson.GsonBuilder;
//import com.lifeix.cbs.api.common.util.ContentConstants.InformStatus;
//import com.lifeix.cbs.content.bean.inform.InformListResponse;
//import com.lifeix.cbs.content.bean.inform.InformResponse;
//import com.lifeix.cbs.contest.bean.fb.ContestResponse;
//import com.lifeix.exception.service.L99IllegalParamsException;
//import com.lifeix.exception.service.L99NetworkException;
//
//@Controller
//@RequestMapping("/im")
//public class ImController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(ImController.class);
//
//    @Autowired
//    private ImUserBlockService imUserBlockService;
//
//    // 跳转到房间管理页面
//    @RequestMapping("/roomlist")
//    public String getlist() {
//	return "im/room_list";
//    }
//
//    // 解除禁言屏蔽页面
//    @RequestMapping("/banned")
//    public String getbannedList() {
//	return "im/banned_list";
//    }
//
//    // 所有聊天信息列表
//    @RequestMapping("/message")
//    public String getchatList(HttpServletRequest request) {
//	request.setAttribute("roomId", -1);
//	return "im/room_chat";
//    }
//
//    @RequestMapping("/getAsyData")
//    @ResponseBody
//    public Map<String, Object> getRoomList(HttpServletRequest request, HttpServletResponse response) throws JSONException,
//	    IOException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	try {
//	    List<ImRoom> ret = LifeixImApiUtil.getInstance().getRoomInfos(-1L, 16);
//
//	    if (ret != null) {
//		outMap.put("rooms", ret);
//	    } else {
//		outMap.put("msg", "聊天室列表无数据返回！");
//	    }
//	} catch (JSONException e) {
//	    outMap.put("msg", "聊天室列表服务！" + e.getMessage());
//
//	}
//	return outMap;
//    }
//
//    /**
//     * 加载被禁言和屏蔽的用户列表
//     *
//     * @param endId
//     *            被禁言的按照createTime（long类型）时间排序
//     * @param endId
//     *            先返回大的，加载更多请求小的
//     * @param limit
//     * @param response
//     * @return
//     * @throws JSONException
//     * @throws IOException
//     */
//    @RequestMapping("/getAsyBanned")
//    @ResponseBody
//    public Map<String, Object> getBannedList(Integer limit, Integer page, Integer status) throws JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	if (limit == null) {
//	    limit = 100;
//	}
//	JSONObject ret = CbsOtherApiUtil.getInstance().getUserInformList(page, limit, status, null);
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
//		    outMap.put("blocks", response);
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
//     * 如果带有senderId则返回用户的所有聊天纪录 没有senderId则返回聊天室聊天纪录
//     *
//     * @param roomId
//     * @param senderId
//     * @param request
//     * @return
//     */
//    @RequestMapping("/chat")
//    public String getOne(String room_id, String sender_id, HttpServletRequest request) {
//	if (room_id != null) {
//	    request.setAttribute("roomId", Long.parseLong(room_id));
//	} else {
//	    request.setAttribute("roomId", room_id);
//	}
//
//	if (sender_id != null && !sender_id.equals("")) {
//	    request.setAttribute("senderId", Long.parseLong(sender_id));
//	} else {
//	    request.setAttribute("senderId", null);
//	}
//	return "im/room_chat";
//    }
//
//    /**
//     * 获取单间房间或者单个用户的聊天纪录
//     *
//     *
//     *
//     * @param room_id
//     *            -1获取所有聊天记录
//     * @param sender_id
//     * @return
//     * @throws JSONException
//     * @throws IOException
//     */
//    @RequestMapping("/view")
//    @ResponseBody
//    public Map<String, Object> getChat(Long room_id, Long sender_id) throws JSONException, IOException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	try {
//
//	    List<ImChat> chats = LifeixImApiUtil.getInstance().getChat(room_id, sender_id);
//	    // 使用map保存用户信息
//	    HashMap<Long, Integer> userStatus = new HashMap<Long, Integer>();
//	    // 获取用户信息，判断用户是否被屏蔽
//	    for (ImChat chat : chats) {
//		if (userStatus.get(chat.getSenderId()) != null) {
//		    chat.setUserStatu(userStatus.get(chat.getSenderId()));
//		} else {
//		    // 通过id获取用户基本信息
//		    ImUserBlockResponse imUserBlockResponse = imUserBlockService.selectById(chat.getSenderId());
//		    if (imUserBlockResponse != null) {
//			// 0是被禁言 1非禁言
//			if (imUserBlockResponse.getBlock_statu() == 0) {
//			    chat.setUserStatu(0);
//			    userStatus.put(imUserBlockResponse.getUser_id(), 0);
//			} else {
//			    chat.setUserStatu(1);
//			    userStatus.put(imUserBlockResponse.getUser_id(), 1);
//			}
//		    }
//		}
//
//		// 解析用户对象
//		String senderInroStr = chat.getSenderInfoStr();
//		if (senderInroStr.startsWith("{") && senderInroStr.endsWith("}")) {
//		    JSONObject userObj = new JSONObject(chat.getSenderInfoStr());
//		    if (userObj.has("name")) {
//			chat.setName(userObj.getString("name"));
//		    }
//		    if (userObj.has("photoPath")) {
//			chat.setHead(userObj.getString("photoPath"));
//		    }
//		    if (userObj.has("longNo")) {
//			chat.setLong_no(userObj.getLong("longNo"));
//		    }
//		    if (userObj.has("gender")) {
//			chat.setGender(userObj.getInt("gender"));
//		    }
//		}
//	    }
//	    outMap.put("chats", chats);
//	    outMap.put("sender_id", sender_id);
//	    outMap.put("room_id", room_id);
//
//	    // 获取赛事信息
//
//	    if (room_id != null && room_id > 0) {
//		// 通过rootId查找赛事消息
//		JSONObject ret = CbsContestlApiUtil.getInstance().getBbContestByRoomId(room_id);
//		ContestResponse contestResponse = null;
//		int code = 0;
//		if (ret != null) {
//		    code = ret.optInt("code");
//		    if (code == 200) {
//			String data = ret.optString("data");
//			if (!StringUtils.isEmpty(data)) {
//			    contestResponse = new Gson().fromJson(data, ContestResponse.class);
//			}
//		    }
//		}
//
//		if (contestResponse == null) {
//		    ret = CbsContestlApiUtil.getInstance().getFbContestByRoomId(room_id);
//		}
//		if (contestResponse == null && ret != null) {
//		    code = ret.optInt("code");
//		    if (code == 200) {
//			String data = ret.optString("data");
//			if (!StringUtils.isEmpty(data)) {
//			    contestResponse = new Gson().fromJson(data, ContestResponse.class);
//			}
//		    }
//		}
//		outMap.put("contest", contestResponse);
//		outMap.put("code", code);
//	    } else {
//		outMap.put("contest", null);
//	    }
//	} catch (JSONException e) {
//	    outMap.put("msg", "聊天记录服务！" + e.getMessage());
//	}
//	return outMap;
//    }
//
//    @RequestMapping("/delete")
//    @ResponseBody
//    public Map<String, Object> delete(Long room_id, Long msg_id) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//
//	JSONObject ret = LifeixImApiUtil.getInstance().deleteChatMes(room_id, msg_id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//
//	    if (code == 1000) {
//
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
//    public Map<String, Object> gagUser(Long id, Integer level, Long seconds) throws L99IllegalParamsException, JSONException {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//
//	JSONObject ret = LifeixImApiUtil.getInstance().gagUser(id, level, seconds);
//
//	if (ret != null) {
//	    int code = ret.optInt("code");
//
//	    if (code == 1000) {
//		int status = 0;
//
//		if (level == 1) {// 禁言
//		    status = 3;
//		} else if (level == 2) {// 屏蔽
//		    status = 1;
//		}
//		// 屏蔽成功，同步cbs的数据库
//		// 先插入后更新
//		try {
//		    Long gagId = CbsOtherApiUtil.getInstance().addUserInform(id);
//		    if (gagId > 0) {
//			ret = CbsOtherApiUtil.getInstance().updateUserInformStatus(gagId, status, "", seconds);
//			outMap.put("code", 200);
//		    }
//		} catch (L99NetworkException e) {
//		    outMap.put("code", 1004);
//		    outMap.put("msg", "举报失败");
//		}
//
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
//    public Map<String, Object> unGagUser(Long id) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//
//	JSONObject ret = LifeixImApiUtil.getInstance().unGagUser(id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//
//	    if (code == 1000) {
//		// 解除屏蔽成功，同步cbs的数据库
//		ret = CbsOtherApiUtil.getInstance().updateUserInformStatus(id, InformStatus.IGNORED, "", -1L);
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
//    /**
//     * 通过龙号禁言或屏蔽单个用户
//     *
//     * @param longno
//     * @param level
//     * @param seconds
//     * @return
//     */
//    @RequestMapping("/gagByLongNo")
//    @ResponseBody
//    public Map<String, Object> gagUserByLongNo(Long longno, Integer level, Long seconds) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getUserSystemUser(longno, null);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    JSONObject jsonObject;
//		    try {
//			jsonObject = new JSONObject(ret.optString("data"));
//			Long userId = jsonObject.optLong("user_id");
//			ret = LifeixImApiUtil.getInstance().gagUser(userId, level, seconds);
//			if (code == 1000) {
//			    int status = 0;
//
//			    if (level == 1) {// 禁言
//				status = 3;
//			    } else if (level == 2) {// 屏蔽
//				status = 1;
//			    }
//			    // 屏蔽成功，同步cbs的数据库
//			    // 先插入后更新
//			    try {
//				Long gagId = CbsOtherApiUtil.getInstance().addUserInform(userId);
//				if (gagId > 0) {
//				    ret = CbsOtherApiUtil.getInstance().updateUserInformStatus(gagId, status, "", seconds);
//				    outMap.put("code", 200);
//				}
//			    } catch (L99NetworkException e) {
//				outMap.put("code", 1004);
//				outMap.put("msg", "举报失败");
//			    }
//
//			} else {
//			    if (level == 1) {
//				outMap.put("msg", ret.optString("禁言失败"));
//			    } else if (level == 2) { // 2是屏蔽
//				outMap.put("msg", ret.optString("屏蔽失败"));
//			    }
//			    outMap.put("code", code);
//			}
//		    } catch (JSONException e) {
//			LOG.error(e.getMessage(), e);
//		    }
//
//		}
//	    }
//	} else {
//	    outMap.put("code", 1004);
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//
//	return outMap;
//    }
//
//}
