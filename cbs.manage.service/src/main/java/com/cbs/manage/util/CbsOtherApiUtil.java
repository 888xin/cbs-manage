package com.cbs.manage.util;

import javax.ws.rs.core.MediaType;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import com.google.gson.Gson;
import com.lifeix.cbs.api.bean.coupon.CouponResponse;
import com.lifeix.cbs.api.bean.gold.GoldResponse;
import com.lifeix.cbs.api.bean.money.MoneyCardResponse;
import com.lifeix.cbs.content.bean.boot.BootInfoResponse;
import com.lifeix.cbs.content.bean.contest.ContestNewsResponse;
import com.lifeix.cbs.message.bean.placard.PlacardTempletResponse;
import com.lifeix.exception.service.L99NetworkException;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.representation.Form;

/**
 * 其他接口 Created by lhx on 15-9-30 下午1:59
 * 
 * @Description
 */
public class CbsOtherApiUtil {

    private static final Logger LOG = LoggerFactory.getLogger(CbsOtherApiUtil.class);

    private Client client;

    private String uri;

    static class SingletonHolder {
	private static final CbsOtherApiUtil INSTANCE = new CbsOtherApiUtil();
    }

    public static CbsOtherApiUtil getInstance() {
	return SingletonHolder.INSTANCE;
    }

    private CbsOtherApiUtil() {
	client = Client.create();
	client.setConnectTimeout(3000);
	client.setReadTimeout(3000);
    }

    public void initData(final String uri) {
	if (uri == null || uri.isEmpty() || !uri.contains("http://")) {
	    throw new RuntimeException("Uri format wrong,eg. http://host:s8080/cbs");
	}
	int lastIndex = uri.length() - 1;
	if (uri.charAt(lastIndex) != '/') {
	    this.uri = uri + "/";
	} else {
	    this.uri = uri;
	}
    }

    // 通过龙号获取用户
    private static final String GET_NEW_USER_SYSTEM_USER = "cbs/user/get";
    // 通过龙号和密码获取用户
    private static final String GET_NEW_USER = "cbs/user/login";
    // 查找用户
    private static final String CBS_USER_FIND = "cbs/user/find";

    // 公告列表
    private static final String CBS_API_PLACARD_LIST = "cbs/inner/placard/list";
    // 公告编辑
    private static final String CBS_API_PLACARD_EDIT = "cbs/inner/placard/templet/edit";
    // 公告删除
    private static final String CBS_API_PLACARD_DELETE = "cbs/inner/placard/templet/delete";
    // 公告推送
    private static final String CBS_API_PLACARD_PUSH = "cbs/inner/placard/templet/push";

    // 系统龙筹收入支出统计
    private static final String CBS_API_GOLD_STATISTIC = "cbs/inner/gold/log/statistic";
    // 系统龙币收入支出统计
    private static final String CBS_API_MONEY_STATISTIC = "cbs/inner/money/log/statistic";
    // 系统龙筹收入支出详细
    private static final String CBS_API_GOLD_DEATAIL_LOG = "cbs/inner/gold/log/system/detail";
    // 系统龙币收入支出详细
    private static final String CBS_API_MONEY_DEATAIL_LOG = "cbs/inner/money/log/system/detail";

    // 后台添加用户龙币
    private static final String CBS_API_EDITMONEY = "cbs/inner/money/manage/recharge";
    // 后台扣除户龙币
    private static final String CBS_API_DEDUCTMONEY = "cbs/inner/money/manage/deduction";

    // 获得头版内容
    private static final String CBS_API_FRONTPAGE_LIST = "cbs/inner/frontpage/list";
    // 猜友圈
    private static final String CBS_API_FRIEND_LIST = "cbs/inner/friendCircle/list";
    private static final String CBS_API_FRIEND_REASON_LIST = "cbs/inner/friendCircle/list/reason";
    private static final String CBS_API_FRIEND_REASON_ADD = "cbs/inner/frontpage/add";
    private static final String CBS_API_FRIEND_BLOCK_LIST = "cbs/inner/friendCircle/block";
    private static final String CBS_API_FRIEND_MY = "cbs/friend/circle/my";
    private static final String CBS_API_FRIEND_ADD = "cbs/inner/friendCircle/publish";
    private static final String CBS_API_FRIEND_NO_SETTLE = "cbs/inner/friendCircle/list/nosettle";
    private static final String CBS_API_FRIEND_SETTLE = "cbs/inner/init/settle/circle";

    // 头版queue
    private static final String CBS_API_FRONTPAGE_QUEUE = "cbs/inner/frontpage/queue";

    // 头版编辑（包含添加）
    private static final String CBS_API_FRONTPAGE_EDIT = "cbs/inner/frontpage/edit";
    // 头版查看单个
    private static final String CBS_API_FRONTPAGE_VIEW = "cbs/inner/frontpage/view";
    // 评论列表
    private static final String CBS_API_CIRCLECOMMENT_LIST = "cbs/friend/circle/comment/list";
    // 屏蔽用户评论
    private static final String CBS_API_CIRCLECOMMENT_SHIELD = "cbs/friend/circle/comment/shield";

    // 举报管理
    // 评论举报列表
    private static final String CBS_API_INFORM_COMMENT_LIST = "cbs/inner/inform/comment/list";
    // 评论举报更新处理状态
    private static final String CBS_API_INFORM_COMMENT_UPDATESTATUS = "cbs/inner/inform/comment/updatestatus";
    // 吐槽举报列表
    private static final String CBS_API_INFORM_CONTENT_LIST = "cbs/inner/inform/content/list";
    // 吐槽举报更新处理状态
    private static final String CBS_API_INFORM_CONTENT_UPDATESTATUS = "cbs/inner/inform/content/updatestatus";
    // IM举报列表
    private static final String CBS_API_INFORM_IM_LIST = "cbs/inner/inform/im/list";
    // IM举报更新处理状态
    private static final String CBS_API_INFORM_IM_UPDATESTATUS = "cbs/inner/inform/im/updatestatus";
    // 用户举报列表
    private static final String CBS_API_INFORM_USER_LIST = "cbs/inner/inform/user/list";
    // 用户举报更新处理状态
    private static final String CBS_API_INFORM_USER_UPDATESTATUS = "cbs/inner/inform/user/updatestatus";
    // 新闻评论举报列表
    private static final String CBS_API_INFORM_NEWS_LIST = "cbs/inner/inform/news/list";
    // 新闻评论举报更新处理状态
    private static final String CBS_API_INFORM_NEWS_UPDATESTATUS = "cbs/inner/inform/news/updatestatus";
    // 新闻举报列表
    private static final String CBS_API_INFORM_NEWS_MAIN_LIST = "cbs/inner/inform/news/main/list";
    // 新闻举报更新处理状态
    private static final String CBS_API_INFORM_NEWS_MAIN_UPDATESTATUS = "cbs/inner/inform/news/main/updatestatus";
    // 新增用户举报
    private static final String CBS_API_INFORM_USER_ADD = "cbs/inform/user/add";

    // 券列表
    private static final String CBS_COUPONS_LIST = "cbs/inner/coupon/list";
    // 添加券
    private static final String CBS_COUPONS_ADD = "cbs/inner/coupon/edit";
    // 券激活或失效
    private static final String CBS_COUPONS_VALID = "cbs/inner/coupon/valid";
    // 发放券
    private static final String CBS_COUPONS_GIVE = "cbs/inner/coupon/send";
    // 用户龙筹卷
    private static final String CBS_COUPONS_USER_LIST = "cbs/inner/coupon/user/list";

    // 用户推荐管理
    private static final String CBS_STAR_LIST = "cbs/inner/user/star/list";
    private static final String CBS_STAR_PUT = "cbs/inner/user/star/put";
    private static final String CBS_STAR_ONOFF = "cbs/inner/user/star/onoff";

    // 用户龙币明细
    private static final String CBS_STATISTIC_USER_MONEY = "cbs/inner/statistic/user/money";

    // 用户龙币
    private static final String CBS_USER_MONEY = "cbs/inner/money/view";

    // 用户每月登陆明细
    private static final String CBS_STATISTIC_USER_LOGIN = "cbs/user/inner/get/login/statistic";
    // 登陆奖励路径
    private static final String CBS_STATISTIC_USER_LOGIN_PATH = "cbs/user/inner/get/path";
    // 设置登陆奖励路径
    private static final String CBS_STATISTIC_USER_LOGIN_PATH_SET = "cbs/user/inner/set/path";
    // 设置用户登陆天数
    private static final String CBS_STATISTIC_USER_LOGIN_DAY_SET = "cbs/user/inner/set/reward";
    // 设置用户登陆天数全部注销
    private static final String CBS_STATISTIC_USER_LOGIN_DAY_EXPIRE = "cbs/user/inner/expire";

    // 赛事新闻
    private static final String CBS_CONTEST_NEWS_LIST = "cbs/inner/contest/news/list";
    private static final String CBS_CONTEST_NEWS_ADD = "cbs/inner/contest/news/add";
    private static final String CBS_CONTEST_NEWS_EDIT = "cbs/inner/contest/news/edit";

    // 充值卡相关
    private static final String CBS_API_MONEY_CARD_DELETE = "cbs/inner/money/card/delete";
    private static final String CBS_API_MONEY_CARD_INSERT = "cbs/inner/money/card/insert";
    private static final String CBS_API_MONEY_CARD_UPDATE = "cbs/inner/money/card/update";
    private static final String CBS_API_MONEY_CARD_VIEW = "cbs/inner/money/card/view";
    private static final String CBS_API_MONEY_CARD_LIST = "cbs/money/order/cardlist";

    // 资讯详情
    private static final String CBS_CONTENT_VIEW = "cbs/content/view";

    // 广告
    private static final String CBS_BOOT_ADD = "cbs/inner/boot/add";
    private static final String CBS_BOOT_EDIT = "cbs/inner/boot/edit";
    private static final String CBS_BOOT_DELETE = "cbs/inner/boot/del";
    private static final String CBS_BOOT_ABLE = "cbs/inner/boot/able";
    private static final String CBS_BOOT_DISABLE = "cbs/inner/boot/disable";
    private static final String CBS_BOOT_LIST = "cbs/boot/list";
    private static final String CBS_BOOT_VIEW = "cbs/boot/view";

    /**
     * 龙币结算错误
     */
    private static final String CBS_MONEY_MISS_LIST = "cbs/inner/money/missed/list";
    private static final String CBS_MONEY_MISS_EDIT = "cbs/inner/money/missed/edit";

    /**
     * 后台系统消息提醒
     */
    private static final String CBS_SYSTEM_PROMPT = "cbs/user/inner/prompt";

    // 账单对账列表
    private static final String CBS_BILL_STATISTIC = "cbs/inner/money/order/time";

    /**
     * 任务积分
     */
    private static final String CBS_MISSION_USER_LIST = "cbs/inner/mission/user/list";
    private static final String CBS_MISSION_USER_DAY = "cbs/inner/mission/user/day";
    private static final String CBS_MISSION_USER = "cbs/inner/mission/user";
    private static final String CBS_MISSION_DAY_CANCEL = "cbs/inner/mission/get/cancel";
    private static final String CBS_MISSION_DAY_EDIT = "cbs/inner/mission/oper";
    private static final String CBS_MISSION_POINT_PATH = "cbs/inner/mission/reward/list";
    private static final String CBS_MISSION_POINT_GOLD_EDIT = "cbs/inner/mission/oper/reward";
    private static final String CBS_MISSION_POINT_GOLD_DELETE = "cbs/inner/mission/delete/reward";

    // 清除缓存
    private static final String CBS_MEMCACHE_TYPE_1 = "cbs/inner/operate/memcache/delete";
    private static final String CBS_MEMCACHE_TYPE_2 = "cbs/inner/operate/memcache/delete/more";
    private static final String CBS_MEMCACHE_TYPE_3 = "cbs/inner/operate/memcache/delete/key";

    public JSONObject deletePlacard(Long templet_id) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_PLACARD_DELETE);
	queryParam.add("templet_id", templet_id);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 公告推送
     * 
     * @return
     */
    public JSONObject pushPlacard(Long templetId) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_PLACARD_PUSH);
	queryParam.add("templet_id", templetId);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取龙筹系统收入支出统计
     * 
     * @param startTime
     * @param endTime
     * @return
     */
    public JSONObject goldStatistic(String startTime, String endTime) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_GOLD_STATISTIC);
	JSONObject ret = null;
	queryParam.add("start_time", startTime);
	queryParam.add("end_time", endTime);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取龙筹详细流水
     * 
     * @param startId
     * @param limit
     * @return
     */
    public JSONObject goldLogsDetail(Long logId, Long longNo, String startTime, String endTime, Long startId, String types,
	    Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_GOLD_DEATAIL_LOG);
	JSONObject ret = null;
	if (!StringUtils.isEmpty(startTime) && !StringUtils.isEmpty(endTime)) {
	    queryParam.add("start_time", startTime);
	    queryParam.add("end_time", endTime);
	}
	queryParam.add("start_id", startId);
	if (types != null && !types.trim().equals("")) {
	    queryParam.add("type", types);
	}
	if (logId != null) {
	    queryParam.add("log_id", logId);
	}
	if (longNo != null) {
	    queryParam.add("long_no", longNo);
	}
	queryParam.add("limit", limit);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取龙币系统收入支出统计
     * 
     * @param startTime
     * @param endTime
     * @return
     */
    public JSONObject moneyStatistic(String startTime, String endTime) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_MONEY_STATISTIC);
	JSONObject ret = null;
	queryParam.add("start_time", startTime);
	queryParam.add("end_time", endTime);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取龙币详细流水
     * 
     * @param startId
     * @param limit
     * @return
     */
    public JSONObject moneyLogsDetail(Long logId, Long longNo, String startTime, String endTime, Long startId, String types,
	    Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_MONEY_DEATAIL_LOG);
	JSONObject ret = null;
	if (startTime != null && !startTime.trim().equals("") && endTime != null && !endTime.trim().equals("")) {
	    queryParam.add("start_time", startTime);
	    queryParam.add("end_time", endTime);
	}
	if (startId != null) {
	    queryParam.add("start_id", startId);
	}
	if (types != null && !types.trim().equals("")) {
	    queryParam.add("type", types.trim());
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	if (logId != null) {
	    queryParam.add("log_id", logId);
	}
	if (longNo != null) {
	    queryParam.add("long_no", longNo);
	}
	String str = resource.queryParams(queryParam).get(String.class);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 后台增加用户龙币
     * 
     * @param user_id
     * @param amount
     * @param admin
     * @return
     */
    public JSONObject editMoney(Long user_id, double amount, String admin) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_EDITMONEY);
	JSONObject ret = null;
	queryParam.add("user_id", user_id);
	queryParam.add("amount", amount);
	queryParam.add("admin", admin);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 后台扣除用户龙币
     * 
     * @param user_id
     * @param amount
     * @param admin
     * @return
     */
    public JSONObject deductMoney(Long user_id, double amount, String admin) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_DEDUCTMONEY);
	JSONObject ret = null;
	queryParam.add("user_id", user_id);
	queryParam.add("amount", amount);
	queryParam.add("admin", admin);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取头版列表
     */
    public JSONObject getFrontPagesInfo(Long startId, Long endId, Integer type, Integer status, Integer limit, Integer skip) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_FRONTPAGE_LIST);

	queryParam.add("type", type);
	queryParam.add("start_id", startId);
	queryParam.add("end_id", endId);
	queryParam.add("status", status);
	queryParam.add("limit", limit);
	queryParam.add("skip", skip);

	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 评论举报列表
     * 
     * @param page
     * @param limit
     * @param status
     * @param comment_id
     * @return
     */
    public JSONObject getCommentInformList(Integer page, Integer limit, Integer status, Long comment_id) {
	Form queryParam = new Form();
	if (page != null) {
	    queryParam.add("page", page);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	if (status != null) {
	    queryParam.add("status", status);
	}
	if (comment_id != null) {
	    queryParam.add("comment_id", comment_id);
	}
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_COMMENT_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 更新评论举报处理状态
     * 
     * @param id
     * @param ids
     * @param status
     * @param dispose_info
     * @return
     */
    public JSONObject updateCommentInformStatus(Long id, String ids, Integer status, String dispose_info) {
	Form queryParam = new Form();
	if (id != null) {
	    queryParam.add("id", id);
	}
	if (!StringUtils.isEmpty(dispose_info)) {
	    queryParam.add("dispose_info", dispose_info);
	}
	queryParam.add("status", status);
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_COMMENT_UPDATESTATUS);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 吐槽举报列表
     * 
     * @param page
     * @param limit
     * @param status
     * @param content_id
     * @return
     */
    public JSONObject getContentInformList(Integer page, Integer limit, Integer status, Long content_id) {
	Form queryParam = new Form();
	if (page != null) {
	    queryParam.add("page", page);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	if (status != null) {
	    queryParam.add("status", status);
	}
	if (content_id != null) {
	    queryParam.add("content_id", content_id);
	}
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_CONTENT_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 更新吐槽举报处理状态
     * 
     * @param id
     * @param ids
     * @param status
     * @param dispose_info
     * @return
     */
    public JSONObject updateContentInformStatus(Long id, String ids, Integer status, String dispose_info) {
	Form queryParam = new Form();
	if (id != null) {
	    queryParam.add("id", id);
	}
	if (!StringUtils.isEmpty(ids)) {
	    queryParam.add("ids", ids);
	}
	if (!StringUtils.isEmpty(dispose_info)) {
	    queryParam.add("dispose_info", dispose_info);
	}
	queryParam.add("status", status);
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_CONTENT_UPDATESTATUS);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * IM举报列表
     * 
     * @param page
     * @param limit
     * @param status
     * @param im_id
     * @return
     */
    public JSONObject getIMInformList(Integer page, Integer limit, Integer status, Long im_id) {
	Form queryParam = new Form();
	if (page != null) {
	    queryParam.add("page", page);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	if (status != null) {
	    queryParam.add("status", status);
	}
	if (im_id != null) {
	    queryParam.add("im_id", im_id);
	}
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_IM_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 更新IM举报处理状态
     * 
     * @param id
     * @param status
     * @param dispose_info
     * @return
     */
    public JSONObject updateIMInformStatus(Long id, Integer status, String dispose_info, Long last_time) {
	Form queryParam = new Form();
	if (id != null) {
	    queryParam.add("id", id);
	}
	if (!StringUtils.isEmpty(dispose_info)) {
	    queryParam.add("dispose_info", dispose_info);
	}
	if (!StringUtils.isEmpty(last_time)) {
	    queryParam.add("last_time", last_time);
	}
	queryParam.add("status", status);
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_IM_UPDATESTATUS);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 用户举报列表
     * 
     * @param page
     * @param limit
     * @param status
     * @param user_id
     * @return
     */
    public JSONObject getUserInformList(Integer page, Integer limit, Integer status, Long user_id) {
	Form queryParam = new Form();
	if (page != null) {
	    queryParam.add("page", page);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	if (status != null) {
	    queryParam.add("status", status);
	}
	if (user_id != null) {
	    queryParam.add("user_id", user_id);
	}
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_USER_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 更新用户举报处理状态
     * 
     * @param id
     * @param status
     * @param dispose_info
     * @return
     */
    public JSONObject updateUserInformStatus(Long id, Integer status, String dispose_info, Long last_time) {
	Form queryParam = new Form();
	if (id != null) {
	    queryParam.add("id", id);
	}
	if (!StringUtils.isEmpty(dispose_info)) {
	    queryParam.add("dispose_info", dispose_info);
	}
	if (!StringUtils.isEmpty(last_time)) {
	    queryParam.add("last_time", last_time);
	}
	queryParam.add("status", status);
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_USER_UPDATESTATUS);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 新闻评论举报列表
     * 
     * @param page
     * @param limit
     * @param status
     * @return
     */
    public JSONObject getNewsInformList(Integer page, Integer limit, Integer status) {
	Form queryParam = new Form();
	if (page != null) {
	    queryParam.add("page", page);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	if (status != null) {
	    queryParam.add("status", status);
	}
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_NEWS_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 更新新闻评论举报处理状态
     * 
     * @param id
     * @param status
     * @param dispose_info
     * @return
     */
    public JSONObject updateNewsInformStatus(Long id, Integer status, String dispose_info) {
	Form queryParam = new Form();
	if (id != null) {
	    queryParam.add("id", id);
	}
	if (!StringUtils.isEmpty(dispose_info)) {
	    queryParam.add("dispose_info", dispose_info);
	}
	queryParam.add("status", status);
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_NEWS_UPDATESTATUS);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 新闻举报列表
     * 
     * @param page
     * @param limit
     * @param status
     * @return
     */
    public JSONObject getNewsMainInformList(Integer page, Integer limit, Integer status) {
	Form queryParam = new Form();
	if (page != null) {
	    queryParam.add("page", page);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	if (status != null) {
	    queryParam.add("status", status);
	}
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_NEWS_MAIN_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 更新新闻举报处理状态
     * 
     * @param id
     * @param status
     * @param dispose_info
     * @return
     */
    public JSONObject updateNewsMainInformStatus(Long id, Integer status, String dispose_info) {
	Form queryParam = new Form();
	if (id != null) {
	    queryParam.add("id", id);
	}
	if (!StringUtils.isEmpty(dispose_info)) {
	    queryParam.add("dispose_info", dispose_info);
	}
	queryParam.add("status", status);
	JSONObject ret = null;
	WebResource resource = client.resource(uri + CBS_API_INFORM_NEWS_MAIN_UPDATESTATUS);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 新增用户举报
     * 
     * @param user_id
     * @return
     * @throws JSONException
     * @throws L99NetworkException
     */
    public Long addUserInform(Long user_id) throws JSONException, L99NetworkException {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_INFORM_USER_ADD);
	queryParam.add("user_id", user_id);
	queryParam.add("inform_type", 0);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = new JSONObject(str);
	if (ret.getInt("code") == 200) {
	    return ret.getLong("data");
	} else {
	    throw new L99NetworkException(ret.optString("code"), ret.optString("msg"));
	}
    }

    /**
     * 获取猜友圈列表
     */
    public JSONObject getFriendCircleInfo(Long startId, Long endId, String searchKey, Integer limit, Integer skip) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_FRIEND_LIST);
	queryParam.add("start_id", startId);
	queryParam.add("end_id", endId);
	queryParam.add("search_key", searchKey);
	queryParam.add("limit", limit);
	queryParam.add("skip", skip);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取猜友圈投注理由列表
     */
    public JSONObject getFriendCircleReasons(Long startId, Long endId, Integer limit, Integer skip, Integer type) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_FRIEND_REASON_LIST);
	queryParam.add("start_id", startId);
	queryParam.add("end_id", endId);
	queryParam.add("limit", limit);
	queryParam.add("skip", skip);
	queryParam.add("type", type);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject addFriendCircleReasons(Long id, Integer type) {
	Form queryParam = new Form();
	queryParam.add("circle_id", id);
	queryParam.add("type", type);
	WebResource resource = client.resource(uri + CBS_API_FRIEND_REASON_ADD);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject queueFrontPage(Long fId, Integer status, Integer type) {
	Form queryParam = new Form();
	queryParam.add("fid", fId);
	queryParam.add("status", status);
	queryParam.add("type", type);
	WebResource resource = client.resource(uri + CBS_API_FRONTPAGE_QUEUE);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject queueFriendCircle(String ids) {
	Form queryParam = new Form();
	queryParam.add("ids", ids);
	WebResource resource = client.resource(uri + CBS_API_FRIEND_BLOCK_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取评论列表
     * 
     * @param userId
     * @param endId
     * @param limit
     * @return
     */
    public JSONObject getCircleCommentList(Long userId, Long endId, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CIRCLECOMMENT_LIST);
	queryParam.add("user_id", userId);
	queryParam.add("end_id", endId);
	queryParam.add("limit", limit);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 屏蔽评论
     * 
     * @param ids
     * @return
     */
    public JSONObject shiedlCircleComment(String ids) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CIRCLECOMMENT_SHIELD);
	queryParam.add("ids", ids);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject editFrontPage(Long contestId, Integer contestType, Long innnerContestId, Integer innnerContestType,
	    Long fId, String path, String link, String title, String desc, Long contentId, Integer type, Integer status,
	    Integer oper) {
	Form queryParam = new Form();

	queryParam.add("fid", fId);
	if (link != null) {
	    queryParam.add("link", link);
	}
	if (desc != null) {
	    queryParam.add("desc", desc);
	}
	if (path != null) {
	    queryParam.add("path", path);
	}
	if (title != null) {
	    queryParam.add("title", title);
	}
	queryParam.add("content_id", contentId);
	queryParam.add("contest_id", contestId);
	queryParam.add("contest_type", contestType);
	queryParam.add("innner_contest_id", innnerContestId);
	queryParam.add("innner_contest_type", innnerContestType);
	queryParam.add("type", type);
	queryParam.add("status", status);
	queryParam.add("oper", oper);
	WebResource resource = client.resource(uri + CBS_API_FRONTPAGE_EDIT);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject viewFrontPageInfo(Long id, Integer type) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_FRONTPAGE_VIEW);
	queryParam.add("fid", id);
	queryParam.add("type", type);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject viewFriendCircleInfo(Long id) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_FRIEND_MY);
	queryParam.add("friend_circle_id", id);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject addFrontPageFromFriendCircle(Long userId, String text, Integer pageType, Long contentId, String images) {
	Form queryParam = new Form();

	queryParam.add("user_id", userId);
	queryParam.add("content", text);
	queryParam.add("images", images);
	queryParam.add("type", pageType);
	queryParam.add("content_id", contentId);
	WebResource resource = client.resource(uri + CBS_API_FRIEND_ADD);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 用户推荐列表
     * 
     * @param hideFlag
     * @param startId
     * @param limit
     * @return
     */
    public JSONObject userStarList(Boolean hideFlag, Long startId, Integer limit) {
	Form queryParam = new Form();
	if (hideFlag != null) {
	    queryParam.add("hide_flag", hideFlag);
	}
	if (startId != null) {
	    queryParam.add("start_id", startId);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	WebResource resource = client.resource(uri + CBS_STAR_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 更新用户推荐
     * 
     * @param userId
     * @param factor
     * @return
     */
    public JSONObject putUserStar(Long userId, Integer factor) {
	Form queryParam = new Form();
	queryParam.add("user_id", userId);
	queryParam.add("factor", factor);
	WebResource resource = client.resource(uri + CBS_STAR_PUT);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 显示或隐藏推荐
     * 
     * @param userId
     * @param hideFlag
     * @return
     */
    public JSONObject onoffUserStar(Long userId, Boolean hideFlag) {
	Form queryParam = new Form();
	queryParam.add("user_id", userId);
	queryParam.add("hide_flag", hideFlag);
	WebResource resource = client.resource(uri + CBS_STAR_ONOFF);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 代金券列表
     */
    public JSONObject couponsList(Boolean valid, Long startId) {
	Form queryParam = new Form();
	if (valid != null) {
	    queryParam.add("valid", valid);
	}
	if (startId != null) {
	    queryParam.add("start_id", startId);
	}
	WebResource resource = client.resource(uri + CBS_COUPONS_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 添加
     */
    public JSONObject editCoupons(CouponResponse couponResponse) {
	Form queryParam = new Form();

	String name = couponResponse.getName();
	if (!StringUtils.isEmpty(name)) {
	    queryParam.add("name", name);
	}
	queryParam.add("type", couponResponse.getType());
	queryParam.add("hour", couponResponse.getHour());
	queryParam.add("price", couponResponse.getPrice());
	queryParam.add("range_key", couponResponse.getRange_key());
	String rangeValue = couponResponse.getRange_value();
	if (!StringUtils.isEmpty(rangeValue)) {
	    queryParam.add("range_value", rangeValue);
	}
	queryParam.add("sum", couponResponse.getSum());
	Long id = couponResponse.getId();
	if (id == null) {
	    queryParam.add("num", 0);
	    queryParam.add("valid", true);
	} else {
	    queryParam.add("id", id);
	}
	queryParam.add("proportion", couponResponse.getProportion());
	String descr = couponResponse.getDescr();
	if (!StringUtils.isEmpty(descr)) {
	    queryParam.add("descr", descr);
	}
	WebResource resource = client.resource(uri + CBS_COUPONS_ADD);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 失效或激活
     */
    public JSONObject invalidCoupons(Long id, Boolean valid) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	queryParam.add("valid", valid);
	WebResource resource = client.resource(uri + CBS_COUPONS_VALID);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 发放
     */
    public JSONObject giveCoupons(Long id, String userIds, Integer num) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	queryParam.add("user_ids", userIds);
	queryParam.add("num", num);
	WebResource resource = client.resource(uri + CBS_COUPONS_GIVE);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 用户龙筹券列表
     */
    public JSONObject userCouponsList(Long user_id, Boolean active, Long start_id, Integer limit) {
	Form queryParam = new Form();
	if (active != null) {
	    queryParam.add("active", active);
	}
	if (start_id != null) {
	    queryParam.add("start_id", start_id);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	queryParam.add("user_id", user_id);
	WebResource resource = client.resource(uri + CBS_COUPONS_USER_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 公告修改或添加，当templet_id为null时就是添加
     * 
     * @param placardTempletResponse
     * @return
     */
    public JSONObject editPlacardInfo(PlacardTempletResponse placardTempletResponse) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_PLACARD_EDIT);
	queryParam.add("templet_id", placardTempletResponse.getTemplet_id());
	queryParam.add("title", placardTempletResponse.getTitle());
	queryParam.add("content", placardTempletResponse.getContent());
	queryParam.add("end_time", placardTempletResponse.getEnd_time());
	queryParam.add("disable_flag", placardTempletResponse.getDisable_flag());
	queryParam.add("link_type", placardTempletResponse.getLink_type());
	queryParam.add("link_data", placardTempletResponse.getLink_data());
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getPlacardInfo(Integer startId, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_PLACARD_LIST);
	queryParam.add("start_id", startId);
	queryParam.add("limit", limit);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 查找用户
     * 
     * @param searchKey
     * @param startId
     * @param limit
     * @return
     */
    public JSONObject searchUsers(String searchKey, Long startId, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_USER_FIND);
	JSONObject ret = null;
	queryParam.add("search_key", searchKey);
	queryParam.add("start_id", startId);
	queryParam.add("limit", limit);
	String str = resource.queryParams(queryParam).get(String.class);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getUserSystemUser(Long longNo, String password) {
	Form queryParam = new Form();
	WebResource resource;
	if (StringUtils.isEmpty(password)) {
	    queryParam.add("long_no", longNo);
	    resource = client.resource(uri + GET_NEW_USER_SYSTEM_USER);
	} else {
	    queryParam.add("username", longNo + "");
	    queryParam.add("type", 1);
	    queryParam.add("password", password);
	    resource = client.resource(uri + GET_NEW_USER);
	}
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	// String str =
	// "{\"code\":200,\"data\":{\"user_id\":10000013,\"user_no\":3592964,\"user_name\":\"cbs1\",\"user_path\":\"avatar1.png\",\"gender\":1,\"status\":4,\"create_time\":1442567131000}}";
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getUserMoneyStatistic(String date, Integer type, Integer order) {
	Form queryParam = new Form();
	if (date != null) {
	    queryParam.add("date", date);
	}
	queryParam.add("type", type);
	queryParam.add("order", order);
	WebResource resource = client.resource(uri + CBS_STATISTIC_USER_MONEY);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getUserLoginStatistic(String date) {
	Form queryParam = new Form();
	queryParam.add("time", date);
	WebResource resource = client.resource(uri + CBS_STATISTIC_USER_LOGIN);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getUserLoginPath() {
	WebResource resource = client.resource(uri + CBS_STATISTIC_USER_LOGIN_PATH);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject setUserLoginPath(String key, String value) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_STATISTIC_USER_LOGIN_PATH_SET);
	queryParam.add("days", key);
	queryParam.add("amounts", value);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject setUserLoginDay(Long userId, Integer day) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_STATISTIC_USER_LOGIN_DAY_SET);
	queryParam.add("user_id", userId);
	queryParam.add("days", day);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject setUserLoginExpire() {
	WebResource resource = client.resource(uri + CBS_STATISTIC_USER_LOGIN_DAY_EXPIRE);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE).post(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取赛事新闻列表
     */
    public JSONObject getContestNewsInfo(Long startId, Long endId, Integer status, Integer limit, Integer skip) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_CONTEST_NEWS_LIST);

	queryParam.add("start_id", startId);
	queryParam.add("end_id", endId);
	queryParam.add("status", status);
	queryParam.add("limit", limit);
	queryParam.add("skip", skip);

	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject addContestNews(ContestNewsResponse contestNewsResponse) {

	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_CONTEST_NEWS_ADD);
	queryParam.add("contest_id", contestNewsResponse.getContest_id());
	queryParam.add("contest_type", contestNewsResponse.getContest_type());
	queryParam.add("content_id", contestNewsResponse.getContent_id());
	queryParam.add("image", contestNewsResponse.getImage());
	queryParam.add("title", contestNewsResponse.getTitle());
	queryParam.add("desc", contestNewsResponse.getDesc());
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject editContestNews(ContestNewsResponse contestNewsResponse) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_CONTEST_NEWS_EDIT);
	queryParam.add("id", contestNewsResponse.getId());
	queryParam.add("contest_id", contestNewsResponse.getContest_id());
	queryParam.add("contest_type", contestNewsResponse.getContest_type());
	queryParam.add("content_id", contestNewsResponse.getContent_id());
	queryParam.add("status", contestNewsResponse.getStatus());
	if (!StringUtils.isEmpty(contestNewsResponse.getImage())) {
	    queryParam.add("image", contestNewsResponse.getImage());
	}
	if (!StringUtils.isEmpty(contestNewsResponse.getTitle())) {
	    queryParam.add("title", contestNewsResponse.getTitle());
	}
	if (!StringUtils.isEmpty(contestNewsResponse.getDesc())) {
	    queryParam.add("desc", contestNewsResponse.getDesc());
	}
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;

    }

    /**
     * 获取用户龙币
     */
    public double getUserMoney(Long user_id) {
	double money = 0;
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_USER_MONEY);
	queryParam.add("user_id", user_id);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	    return money;
	}
	int code = ret.optInt("code");
	if (code == 200) {
	    String data = ret.optString("data");
	    if (!StringUtils.isEmpty(data)) {
		GoldResponse resp = new Gson().fromJson(data, GoldResponse.class);
		money = resp.getBalance();
	    }
	}
	return money;
    }

    /**
     * 获取单篇资讯
     */
    public JSONObject getContentNews(Long id) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	WebResource resource = client.resource(uri + CBS_CONTENT_VIEW);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 后台充值卡记录删除
     * 
     * @param id
     * @return
     */
    public JSONObject cardDelete(Long id, Integer deleteFlag) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_MONEY_CARD_DELETE);
	JSONObject ret = null;
	queryParam.add("id", id);
	queryParam.add("deleteFlag", deleteFlag);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 后台充值卡记录查看
     * 
     * @param id
     * @return
     */
    public JSONObject cardView(Long id) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_MONEY_CARD_VIEW);
	JSONObject ret = null;
	queryParam.add("id", id);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 后台充值卡记录插入
     */
    public JSONObject cardInsert(MoneyCardResponse bean) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_MONEY_CARD_INSERT);
	JSONObject ret = null;
	queryParam.add("name", bean.getName());
	queryParam.add("detail", bean.getDetail());
	queryParam.add("price", bean.getPrice());
	queryParam.add("amount", bean.getAmount());
	queryParam.add("type", bean.getType());
	queryParam.add("handsel", bean.getHandsel());
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 后台充值卡记录更新
     */
    public JSONObject cardUpdate(MoneyCardResponse bean) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_MONEY_CARD_UPDATE);
	JSONObject ret = null;
	queryParam.add("id", bean.getId());
	queryParam.add("name", bean.getName());
	queryParam.add("detail", bean.getDetail());
	queryParam.add("price", bean.getPrice());
	queryParam.add("amount", bean.getAmount());
	queryParam.add("type", bean.getType());
	queryParam.add("handsel", bean.getHandsel());
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取后台充值卡记录列表
     */
    public JSONObject cardList(Integer deleteFlag) {
	Form queryParam = new Form();
	if (deleteFlag != null) {
	    queryParam.add("deleteFlag", deleteFlag);
	}

	WebResource resource = client.resource(uri + CBS_API_MONEY_CARD_LIST);
	JSONObject ret = null;
	String str = resource.queryParams(queryParam).get(String.class);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取启动动画列表
     */
    public JSONObject getBootListInfo(Long startId, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_BOOT_LIST);

	queryParam.add("start_id", startId);
	queryParam.add("limit", limit);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject addboot(BootInfoResponse bootInfoResponse) {

	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_BOOT_ADD);
	queryParam.add("info_key", bootInfoResponse.getInfo_key());
	queryParam.add("type", bootInfoResponse.getType());
	queryParam.add("adv_time", bootInfoResponse.getAdv_time());
	queryParam.add("data_link", bootInfoResponse.getData_link());
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject deleteBoot(Long id) {

	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_BOOT_DELETE);
	queryParam.add("id", id);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject ableBoot(Long id) {

	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_BOOT_ABLE);
	queryParam.add("id", id);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject disableBoot(Long id) {

	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_BOOT_DISABLE);
	queryParam.add("id", id);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getBootInfo(Long id) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_BOOT_VIEW);

	queryParam.add("id", id);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject editboot(BootInfoResponse bootInfoResponse) {

	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_BOOT_EDIT);
	queryParam.add("id", bootInfoResponse.getId());
	queryParam.add("info_key", bootInfoResponse.getInfo_key());
	queryParam.add("type", bootInfoResponse.getType());
	queryParam.add("adv_time", bootInfoResponse.getAdv_time());
	queryParam.add("data_link", bootInfoResponse.getData_link());
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getFriCirNoSettle(Long startId, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_FRIEND_NO_SETTLE);
	if (startId != null) {
	    queryParam.add("start_id", startId);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject initFirSettle(String circleIds) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_FRIEND_SETTLE);
	queryParam.add("circle_ids", circleIds);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject moneyMissingList(Integer status, Long startId, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_MONEY_MISS_LIST);
	if (status != null) {
	    queryParam.add("status", status);
	}
	if (startId != null) {
	    queryParam.add("start_id", startId);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject moneyMissingEdit(Long id, Boolean repairFlag) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_MONEY_MISS_EDIT);
	queryParam.add("id", id);
	queryParam.add("repair_flag", repairFlag);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取账单列表
     * 
     * @param sourceType
     * @param startTime
     * @param endTime
     * @return
     */
    public JSONObject billStatistic(String sourceType, Long startTime, Long endTime, Long startId, Integer num) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_BILL_STATISTIC);
	JSONObject ret = null;
	queryParam.add("start_time", startTime);
	queryParam.add("end_time", endTime);
	if (!StringUtils.isEmpty(sourceType)) {
	    queryParam.add("source", sourceType);
	}
	if (startId != null) {
	    queryParam.add("start_id", startId);
	}
	queryParam.add("limit", num);

	String str = resource.queryParams(queryParam).get(String.class);
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject addPrompt(Long templetId, Long userId, Long targetId, String params) {

	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_SYSTEM_PROMPT);
	queryParam.add("templet_id", templetId);
	queryParam.add("user_id", userId);
	queryParam.add("target_id", targetId);
	queryParam.add("params", params);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getMissionUsers(Integer page, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_MISSION_USER_LIST);
	queryParam.add("page", page);
	queryParam.add("limit", limit);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getMissionUserDay(String day, Long userId) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_MISSION_USER_DAY);
	queryParam.add("day", day);
	queryParam.add("user_id", userId);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getMissionUser(Long userId) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_MISSION_USER);
	queryParam.add("user_id", userId);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getDayCancelMission() {
	WebResource resource = client.resource(uri + CBS_MISSION_DAY_CANCEL);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getMissionPointToGold() {
	WebResource resource = client.resource(uri + CBS_MISSION_POINT_PATH);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject setDayMission(Integer value) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_MISSION_DAY_EDIT);
	queryParam.add("value", value);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject editPointToGold(Long id, Integer point, Integer gold) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_MISSION_POINT_GOLD_EDIT);
	queryParam.add("id", id);
	queryParam.add("point", point);
	queryParam.add("gold", gold);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject deleteDayMission(Long id) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_MISSION_POINT_GOLD_DELETE);
	queryParam.add("id", id);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject deleteMemcache(String name, String ids, Long idStart, Long idEnd, Integer type) {
	Form queryParam = new Form();
	WebResource resource;
	switch (type) {
	case 1:
	    resource = client.resource(uri + CBS_MEMCACHE_TYPE_1);
	    break;
	case 2:
	    resource = client.resource(uri + CBS_MEMCACHE_TYPE_2);
	    break;
	default:
	    resource = client.resource(uri + CBS_MEMCACHE_TYPE_3);
	}
	queryParam.add("name", name);
	queryParam.add("ids", ids);
	queryParam.add("min", idStart);
	queryParam.add("max", idEnd);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }
}
