//package com.cbs.manage.impl.im;
//
//import java.util.List;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import com.cbs.manage.bean.im.ImChat;
//import com.cbs.manage.bean.im.ImRoom;
//import com.google.gson.Gson;
//import com.google.gson.reflect.TypeToken;
//import com.lifeix.cbs.api.common.user.LifeixUserApiUtil;
//import com.sun.jersey.api.client.Client;
//import com.sun.jersey.api.client.WebResource;
//import com.sun.jersey.api.representation.Form;
//
///**
// * 新版IM工具类
// *
// * @author lifeix
// *
// */
//public class LifeixImApiUtil {
//
//    protected static final Logger LOG = LoggerFactory.getLogger(LifeixImApiUtil.class);
//
//    static class SingletonHolder {
//	private static final LifeixImApiUtil INSTANCE = new LifeixImApiUtil();
//    }
//
//    public static LifeixImApiUtil getInstance() {
//	return SingletonHolder.INSTANCE;
//    }
//
//    private LifeixImApiUtil() {
//	client = Client.create();
//	client.setConnectTimeout(new Integer(3000));
//	client.setReadTimeout(new Integer(3000));
//    }
//
//    /**
//     * 服务初始化
//     *
//     * @param uri
//     */
//    public void initData(final String uri) {
//	if (uri == null || uri.isEmpty() || !uri.contains("http://")) {
//	    throw new RuntimeException("uri is wrong, please check it");
//	}
//	int lastIndex = uri.length() - 1;
//	if (uri.charAt(lastIndex) != '/') {
//	    this.uri = uri + "/";
//	} else {
//	    this.uri = uri;
//	}
//    }
//
//    private Client client;
//
//    private String uri;
//
//    private final static String URL_ROOM_INFO = "getRoomInfos";
//
//    private final static String URL_CHAT_INFO = "getMessageLog";
//    // 删除单条聊天记录
//    private final static String URL_CHAT_DELETE = "deleteMessage";
//    // 用户禁用或者屏蔽
//    private final static String URL_GAG_USER = "gagUser";
//    // 解除屏蔽
//    private final static String URL_UNGAG_USER = "unGagUser";
//
//    /**
//     * 房间信息
//     *
//     * @param roomId
//     *            -1 所有房间
//     * @param day
//     *            多少天以内的房间
//     * @return
//     * @throws JSONException
//     */
//    public List<ImRoom> getRoomInfos(Long roomId, int day) throws JSONException {
//	Form queryParam = new Form();
//	queryParam.add("roomId", roomId);
//	queryParam.add("day", day);
//
//	WebResource resource = client.resource(uri + URL_ROOM_INFO);
//	String json = resource.queryParams(queryParam).get(String.class);
//	List<ImRoom> ir = new Gson().fromJson(json, new TypeToken<List<ImRoom>>() {
//	}.getType());
//	return ir;
//    }
//
//    /**
//     * 获取单个房间聊天记录
//     *
//     * @param roomId
//     * @return
//     * @throws JSONException
//     */
//    public List<ImChat> getRoomChat(Long roomId) throws JSONException {
//	Form queryParam = new Form();
//	queryParam.add("roomId", roomId);
//	WebResource resource = client.resource(uri + URL_CHAT_INFO);
//	String json = resource.queryParams(queryParam).get(String.class);
//	List<ImChat> ir = new Gson().fromJson(json, new TypeToken<List<ImChat>>() {
//	}.getType());
//	return ir;
//    }
//
//    /**
//     * 获取单个用户聊天纪录||获取单间房间聊天纪录
//     *
//     * @param roomId
//     * @param senderId
//     *
//     * @return
//     * @throws JSONException
//     */
//    public List<ImChat> getChat(Long roomId, Long senderId) throws JSONException {
//	Form queryParam = new Form();
//	if (roomId != null) {
//	    queryParam.add("roomId", roomId);
//	}
//
//	if (senderId != null) {
//	    queryParam.add("senderId", senderId);
//	}
//	WebResource resource = client.resource(uri + URL_CHAT_INFO);
//	String json = resource.queryParams(queryParam).get(String.class);
//	List<ImChat> ir = new Gson().fromJson(json, new TypeToken<List<ImChat>>() {
//	}.getType());
//	return ir;
//    }
//
//    /**
//     * 删除聊天信息
//     *
//     * @param roomId
//     * @param msgId
//     * @return
//     */
//    public JSONObject deleteChatMes(Long roomId, Long msgId) {
//	Form queryParam = new Form();
//	WebResource resource = client.resource(uri + URL_CHAT_DELETE);
//	queryParam.add("msgId", msgId);
//	queryParam.add("roomId", roomId);
//
//	String str = resource.queryParams(queryParam).get(String.class);
//	JSONObject ret = null;
//	try {
//	    ret = new JSONObject(str);
//	} catch (JSONException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//	return ret;
//    }
//
//    /**
//     * 屏蔽或者禁言
//     *
//     * @param userId
//     * @param level
//     * @return
//     */
//    public JSONObject gagUser(Long userId, Integer level, Long seconds) {
//	Form queryParam = new Form();
//	WebResource resource = client.resource(uri + URL_GAG_USER);
//	queryParam.add("id", userId);
//	queryParam.add("level", level);
//	queryParam.add("seconds", seconds); // 持续时间
//	String str = resource.queryParams(queryParam).get(String.class);
//	JSONObject ret = null;
//	try {
//	    ret = new JSONObject(str);
//	} catch (JSONException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//	return ret;
//    }
//
//    /**
//     * 解除屏蔽
//     *
//     * @param userId
//     * @return
//     */
//    public JSONObject unGagUser(Long userId) {
//	Form queryParam = new Form();
//	WebResource resource = client.resource(uri + URL_UNGAG_USER);
//	queryParam.add("id", userId);
//	String str = resource.queryParams(queryParam).get(String.class);
//	JSONObject ret = null;
//	try {
//	    ret = new JSONObject(str);
//	} catch (JSONException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//	return ret;
//    }
//
//}
