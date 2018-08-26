package com.cbs.manage.util;

import javax.ws.rs.core.MediaType;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import com.lifeix.cbs.api.common.util.ContestConstants;
import com.lifeix.cbs.contest.bean.contest.ContestAdResponse;
import com.lifeix.cbs.contest.bean.fb.ContestResponse;
import com.lifeix.cbs.contest.bean.odds.OddsJcResponse;
import com.lifeix.cbs.contest.bean.odds.OddsOpResponse;
import com.lifeix.cbs.contest.bean.odds.OddsSizeResponse;
import com.lifeix.cbs.contest.bean.yy.YyContestResponse;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.representation.Form;

/**
 * 赛事/结算/押押接口 Created by lhx on 15-9-30 下午1:59
 * 
 * @Description
 */
public class CbsContestlApiUtil {

    private static final Logger LOG = LoggerFactory.getLogger(CbsContestlApiUtil.class);

    private Client client;

    private String uri;

    static class SingletonHolder {
	private static final CbsContestlApiUtil INSTANCE = new CbsContestlApiUtil();
    }

    public static CbsContestlApiUtil getInstance() {
	return SingletonHolder.INSTANCE;
    }

    private CbsContestlApiUtil() {
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

    // 排行榜
    private final static String USER_GRAPH = "cbs/rank/user/graph";
    // 获取大赢家API足球赛事
    private static final String CBS_API_CONTEST_FB = "cbs/fb/contest/time";
    // 获取大赢家API一级足球赛事
    private static final String CBS_API_CONTEST_FB_LIST = "cbs/fb/contest/list";
    // 获取大赢家API篮球赛事
    private static final String CBS_API_CONTEST_BB = "cbs/bb/contest/time";
    // 获取大赢家API一级篮球赛事
    private static final String CBS_API_CONTEST_BB_LIST = "cbs/bb/contest/list";
    // 搜索足球赛事
    private static final String CBS_API_CONTEST_FB_SEARCH = "cbs/fb/contest/search";
    // 搜索篮球赛事
    private static final String CBS_API_CONTEST_BB_SEARCH = "cbs/bb/contest/search";
    // 足球下注记录
    private static final String CBS_API_CONTEST_FB_BET_SEARCH = "cbs/inner/bet/fb/list";
    // 篮球下注记录
    private static final String CBS_API_CONTEST_BB_BET_SEARCH = "cbs/inner/bet/bb/list";
    // 取消足球下注
    private static final String CBS_API_CONTEST_FB_BET_CANCLE = "cbs/inner/bet/fb/cancle";
    // 取消篮球下注
    private static final String CBS_API_CONTEST_BB_BET_CANCLE = "cbs/inner/bet/bb/cancle";
    // 下注修复
    private static final String CBS_API_CONTEST_BET_REPAIR = "cbs/inner/bet/repair";
	// 下注额过大
    private static final String CBS_API_CONTEST_BET_MUCH = "cbs/inner/bet/much/money";
	// 下注额过大刷新
    private static final String CBS_API_CONTEST_BET_MUCH_REFRESH = "cbs/inner/bet/much/money/refresh";
    // 获取联赛名称
    private static final String CBS_API_CONTEST_CUP_LIST = "cbs/inner/contest/cup/list";
    // 获取大赢家足球赛事赔率
    private static final String CBS_API_CONTEST_FB_ODDS = "cbs/fb/odds/contest";
    // 获取大赢家足球异常赛事
    private static final String CBS_API_CONTEST_FB_ABNORMAL = "cbs/inner/contest/fb/abnormal/list";
    // 获取大赢家篮球赛事赔率
    private static final String CBS_API_CONTEST_BB_ODDS = "cbs/bb/odds/contest";
    // 获取大赢家篮球异常赛事
    private static final String CBS_API_CONTEST_BB_ABNORMAL = "cbs/inner/contest/bb/abnormal/list";
    // 回滚赛事任务提交
    private static final String CBS_API_CONTEST_ROLLBACK = "cbs/inner/contest/rollback";
    // 结算列表
    private static final String CBS_API_SETTLE_LIST = "cbs/inner/contest/settle/list";
    // 后台立即结算赛事
    private static final String CBS_API_SETTLE = "cbs/inner/bet/settle";
    // 结算任务添加
    private static final String CBS_API_SETTLE_ADD = "cbs/inner/bet/settle/add";
    // 足球赔率列表
    private static final String CBS_API_ODDS_FB_LIST = "cbs/inner/contest/fb/odds/list";
    // 篮球赔率列表
    private static final String CBS_API_ODDS_BB_LIST = "cbs/inner/contest/bb/odds/list";
    // 胜平负赔率更新
    private static final String CBS_API_ODDS_OP_UPDATE = "cbs/inner/contest/op/odds/update";
    // 让球胜平负赔率更新
    private static final String CBS_API_ODDS_SIZE_UPDATE = "cbs/inner/contest/size/odds/update";
    // 让球胜平负赔率更新
    private static final String CBS_API_ODDS_JC_UPDATE = "cbs/inner/contest/jc/odds/update";
    // 赛事历史赔率
    private static final String CBS_API_ODDS_HISTORY = "cbs/inner/contest/odds/history/list";
    // 异常赔率列表
    private static final String CBS_API_ODDS_WARN_LIST = "cbs/inner/contest/odds/warn/list";
    // 排行榜
    private static final String CBS_API_INNER_RANK = "cbs/user/inner/winning/top";
    // 用户记录
    private static final String CBS_API_INNER_SETTLE = "cbs/user/inner/settle/log";
    // 更改足球赛事信息
    private static final String CBS_API_CONTEST_FB_UPDATE = "cbs/inner/contest/fb/update";
    // 更改篮球赛事信息
    private static final String CBS_API_CONTEST_BB_UPDATE = "cbs/inner/contest/bb/update";
	// 相同一天出现两次的球队错误查找
    private static final String CBS_API_CONTEST_SAME = "cbs/inner/contest/same";
	// 刷新相同一天出现两次的球队错误查找
    private static final String CBS_API_CONTEST_SAME_REFRESH = "cbs/inner/contest/same/refresh";
	// 相同一天出现两次的球队错误查找的数量
    private static final String CBS_API_CONTEST_SAME_NUM = "cbs/inner/contest/same/num";

    // 球队管理搜索球队
    private static final String CBS_API_EVENT_TEAM_SEARCH = "cbs/inner/team/search";
    // 球队管理修改球队名
    private static final String CBS_API_EVENT_TEAM_EDIT = "cbs/inner/team/update";

    // 篮球球员列表
    private static final String CBS_API_CONTEST_PLAYER_LIST = "cbs/inner/player/bb/list";
    // 篮球查找球员
    private static final String CBS_API_CONTEST_PLAYER_SEARCH = "cbs/inner/player/bb/search";
    // 篮球球员姓名修改
    private static final String CBS_API_CONTEST_PLAYER_EDIT = "cbs/inner/player/bb/update";

    // 下注统计
    private static final String CBS_API_STATISTIC_BET = "cbs/inner/statistic/bet/get/all";

    // 押押管理
    // 押押类型
    private static final String CBS_API_YY_CUP = "cbs/yy/contest/cups";
    // 押押列表
    private static final String CBS_API_YY_LIST = "cbs/inner/yy/contest/list";
    // 押押下注记录列表
    private static final String CBS_API_YY_BETS_LIST = "cbs/yy/contest/history";
    // 添加押押
    private static final String CBS_API_YY_ADD = "cbs/inner/yy/contest/add";
    // 添加押押cup
    private static final String CBS_API_YY_CUP_ADD = "cbs/inner/yy/cup/add";
    // 修改押押
    private static final String CBS_API_YY_EDIT = "cbs/inner/yy/contest/edit";
    // 填赛事结果
    private static final String CBS_API_YY_FINISH = "cbs/inner/yy/contest/end";
    // 单个押押
    private static final String CBS_API_YY_VIEW = "cbs/inner/yy/contest/view";
    // 获取应该及时结算的押押数量
    private static final String CBS_API_YY_SETTLE_NUM = "cbs/inner/yy/contest/unsettle";
    // 添加选项照片
    private static final String CBS_API_YY_OPTION_IMAGE_ADD = "cbs/inner/yy/option/image/add";
    // 删除选项照片
    private static final String CBS_API_YY_OPTION_IMAGE_DELETE = "cbs/inner/yy/option/image/delete";
    // 获取选项照片
    private static final String CBS_API_YY_OPTION_IMAGE_GET = "cbs/inner/yy/option/image/get";
    // 精选押押选择和撤销
    private static final String CBS_API_YY_GOOD_EDIT = "cbs/inner/yy/good/edit";

    // 根据房间id获取足球赛事
    private static final String CBS_FB_CONTEST_BY_ROOMID = "cbs/fb/contest/room/contest";
    // 根据房间id获取篮球赛事
    private static final String CBS_BB_CONTEST_BY_ROOMID = "cbs/bb/contest/room/contest";
    // 新排行榜
    private static final String CBS_RANK_TOP = "cbs/rank/top";
    private static final String CBS_RANK_ROI_ALL = "cbs/rank/roi/top";
    private static final String CBS_RANK_ROI_WEEK = "cbs/rank/roi/week";
    private static final String CBS_RANK_WINNING_ALL = "cbs/rank/winning/top";
    private static final String CBS_RANK_WINNING_WEEK = "cbs/rank/winning/week";
    // 比分模式查看
    private static final String CBS_CONTEST_MODE_VIEW = "cbs/inner/score/module/get";
    // 比分模式更改
    private static final String CBS_CONTEST_MODE_CHANGE = "cbs/inner/score/module/update";

    // 保存串
    private static final String CBS_BUNCH_SAVE = "cbs/inner/bunch/add";
    // 修改串
    private static final String CBS_BUNCH_UPDATE = "cbs/inner/bunch/update";
    // 获取串
    private static final String CBS_BUNCH_LIST = "cbs/inner/bunch/list";
    // 获取单个
    private static final String CBS_BUNCH_VIEW = "cbs/inner/bunch/view";
    // 获取奖品
    private static final String CBS_BUNCH_VIEW_PRIZE = "cbs/inner/bunch/view/prize";
    // 修改串奖品
    private static final String CBS_BUNCH_UPDATE_PRIZE = "cbs/inner/bunch/update/prize";
    // 获取可能中奖的用户信息
    private static final String CBS_BUNCH_USER_REWARD = "cbs/inner/bunch/award/user/get";
    // 查看中奖信息
    private static final String CBS_BUNCH_USER_REWARD_VIEW = "cbs/inner/bunch/award/user/view";
    // 派送奖品
    private static final String CBS_BUNCH_USER_REWARD_SEND = "cbs/inner/bunch/award/user/send";
    // 保存奖品照片
    private static final String CBS_BUNCH_PRIZE_ADD = "cbs/inner/bunch/prize/image/add";
    // 删除奖品照片
    private static final String CBS_BUNCH_PRIZE_DELETE = "cbs/inner/bunch/prize/image/delete";
    // 获取奖品照片
    private static final String CBS_BUNCH_PRIZE_GET = "cbs/inner/bunch/prize/image/get";

    // 篮球联赛列表
    private static final String CBS_BB_CUP_LIST = "cbs/bb/cup/list";
    // 足球联赛列表
    private static final String CBS_FB_CUP_LIST = "cbs/fb/cup/list";
    // 修改联赛名次
    private static final String CBS_CUP_EDIT = "cbs/inner/cup/update";
    // 为处理结算记录数目
    private static final String CBS_CONTEST_BET_NOT_SETTLE = "cbs/inner/money/missed/count";

    // 赛事广告列表
    private static final String CBS_API_AD_LIST = "cbs/inner/contest/ad/list";

    // 赛事广告查看
    private static final String CBS_API_AD_VIEW = "cbs/inner/contest/ad/view";

    // 赛事广告状态修改
    private static final String CBS_API_AD_EDIT = "cbs/inner/contest/ad/edit";

    // 赛事广告更新
    private static final String CBS_API_AD_UPDATE = "cbs/inner/contest/ad/update";

    // 赛事广告添加
    private static final String CBS_API_AD_ADD = "cbs/inner/contest/ad/add";

    public JSONObject getUserGraph(Long userId, String startTime, String endTime) throws JSONException {
	Form queryParam = new Form();
	queryParam.add("user_id", userId);
	queryParam.add("start_time", startTime);
	queryParam.add("end_time", endTime);
	String path = USER_GRAPH;
	WebResource resource = client.resource(uri + path);
	String jsonStr = resource.queryParams(queryParam).get(String.class);
	return new JSONObject(jsonStr);
    }

    public JSONObject getContestFbInfo(String date, Boolean fullFlag) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_FB);
	queryParam.add("time", date);
	queryParam.add("full_flag", fullFlag);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getContestFbFirstInfo(String date) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_FB_LIST);
	queryParam.add("start_time", date);
	queryParam.add("end_time", date);
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
     * 获得异常足球赛事列表
     * 
     * @param startId
     * @param limit
     * @return
     */
    public JSONObject getAbContestFbInfo(Long startId, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_FB_ABNORMAL);
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

    public JSONObject getContestBbInfo(String date, Boolean fullFlag) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_BB);
	queryParam.add("time", date);
	queryParam.add("full_flag", fullFlag);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getContestBbFirstInfo(String date) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_BB_LIST);
	queryParam.add("start_time", date);
	queryParam.add("end_time", date);
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
     * 获得异常篮球赛事列表
     * 
     * @param startId
     * @param limit
     * @return
     */
    public JSONObject getAbContestBbInfo(Long startId, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_BB_ABNORMAL);
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

    public JSONObject rollbackContest(Long contestId, Integer contestType) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_ROLLBACK);
	queryParam.add("contest_id", contestId);
	queryParam.add("contest_type", contestType);
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

    public JSONObject getContestFbOddsInfo(Long contestId, Integer oddsType, Boolean hasContest) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_FB_ODDS);
	queryParam.add("contest_id", contestId);
	queryParam.add("has_contest", hasContest);
	queryParam.add("odds_type", oddsType);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getContestBbOddsInfo(Long contestId, Integer oddsType, Boolean hasContest) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_BB_ODDS);
	queryParam.add("contest_id", contestId);
	queryParam.add("has_contest", hasContest);
	queryParam.add("odds_type", oddsType);
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
     * 结算列表
     * 
     * @param settleId
     * @param limit
     * @return
     */
    public JSONObject getContestSettleInfo(Long settleId, Integer type, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_SETTLE_LIST);
	queryParam.add("settle_id", settleId);
	queryParam.add("type", type);
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
     * 结算任务添加
     * 
     * @param contestId
     * @param type
     * @param immediate
     * @return
     */
    public JSONObject addSettle(Long contestId, Integer type, Boolean immediate) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_SETTLE_ADD);
	queryParam.add("contest_id", contestId);
	queryParam.add("type", type);
	queryParam.add("immediate", immediate);
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
     * 后台立即结算赛事
     */
    public JSONObject settleContest(Long contestId, Integer type) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_SETTLE);
	queryParam.add("contest_id", contestId);
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

    /**
     * 足球赔率列表
     * 
     * @param oddsId
     * @param limit
     * @return
     */
    public JSONObject getContestOddsFbInfo(Long oddsId, Integer type, Integer limit, Boolean isFive, Integer byOrder) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_ODDS_FB_LIST);
	queryParam.add("start_id", oddsId);
	queryParam.add("type", type);
	queryParam.add("limit", limit);
	queryParam.add("is_five", isFive);
	queryParam.add("by_order", byOrder);
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
     * 篮球赔率列表
     * 
     * @param oddsId
     * @param limit
     * @return
     */
    public JSONObject getContestOddsBbInfo(Long oddsId, Integer type, Integer limit, Boolean isFive, Integer byOrder) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_ODDS_BB_LIST);
	queryParam.add("start_id", oddsId);
	queryParam.add("type", type);
	queryParam.add("limit", limit);
	queryParam.add("is_five", isFive);
	queryParam.add("by_order", byOrder);
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
     * 胜平负赔率更新
     * 
     * @param oddsOpResponse
     * @param type
     * @return
     */
    public JSONObject updateOpOdds(OddsOpResponse oddsOpResponse, Integer type) {
	Form queryParam = new Form();
	queryParam.add("type", type);
	queryParam.add("odds_id", oddsOpResponse.getOdds_id());
	queryParam.add("contest_id", oddsOpResponse.getContest_id());
	queryParam.add("home_roi", oddsOpResponse.getHome_roi());
	queryParam.add("draw_roi", oddsOpResponse.getDraw_roi());
	queryParam.add("away_roi", oddsOpResponse.getAway_roi());
	queryParam.add("init_home_roi", oddsOpResponse.getInit_home_roi());
	queryParam.add("init_draw_roi", oddsOpResponse.getInit_draw_roi());
	queryParam.add("init_away_roi", oddsOpResponse.getInit_away_roi());
	queryParam.add("close_flag", oddsOpResponse.getClose_flag());
	queryParam.add("lock_flag", oddsOpResponse.getLock_flag());
	WebResource resource = client.resource(uri + CBS_API_ODDS_OP_UPDATE);
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
     * 让球胜平负赔率更新
     * 
     * @param oddsJcResponse
     * @param type
     * @return
     */
    public JSONObject updateJcOdds(OddsJcResponse oddsJcResponse, Integer type) {
	Form queryParam = new Form();
	queryParam.add("type", type);
	queryParam.add("odds_id", oddsJcResponse.getOdds_id());
	queryParam.add("contest_id", oddsJcResponse.getContest_id());
	queryParam.add("home_roi", oddsJcResponse.getHome_roi());
	queryParam.add("draw_roi", oddsJcResponse.getDraw_roi());
	queryParam.add("away_roi", oddsJcResponse.getAway_roi());
	queryParam.add("handicap", oddsJcResponse.getHandicap());
	queryParam.add("init_home_roi", oddsJcResponse.getInit_home_roi());
	queryParam.add("init_draw_roi", oddsJcResponse.getInit_draw_roi());
	queryParam.add("init_away_roi", oddsJcResponse.getInit_away_roi());
	queryParam.add("init_handicap", oddsJcResponse.getInit_handicap());
	queryParam.add("close_flag", oddsJcResponse.getClose_flag());
	queryParam.add("lock_flag", oddsJcResponse.getLock_flag());
	WebResource resource = client.resource(uri + CBS_API_ODDS_JC_UPDATE);
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
     * 让球胜平负赔率更新
     * 
     * @param oddsSizeResponse
     * @param type
     * @return
     */
    public JSONObject updateSizeOdds(OddsSizeResponse oddsSizeResponse, Integer type) {
	Form queryParam = new Form();
	queryParam.add("type", type);
	queryParam.add("contest_id", oddsSizeResponse.getContest_id());
	queryParam.add("odds_id", oddsSizeResponse.getOdds_id());
	queryParam.add("big_roi", oddsSizeResponse.getBig_roi());
	queryParam.add("tiny_roi", oddsSizeResponse.getTiny_roi());
	queryParam.add("handicap", oddsSizeResponse.getHandicap());
	WebResource resource = client.resource(uri + CBS_API_ODDS_SIZE_UPDATE);
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
     * 获取赛事赔率历史
     * 
     * @param start_id
     * @param limit
     * @param contest_id
     * @param odds_type
     * @param type
     * @return
     */
    public JSONObject getOddsHistory(Long start_id, Integer limit, Long contest_id, Integer odds_type, Integer type) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_ODDS_HISTORY);
	if (start_id != null) {
	    queryParam.add("start_id", start_id);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	if (type != null) {
	    queryParam.add("type", type);
	}
	queryParam.add("contest_id", contest_id);
	queryParam.add("odds_type", odds_type);

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
     * 排行榜
     * 
     * @param time
     * @param type
     * @return
     */
    public JSONObject InnerRank(String time, Long startId, Integer limit, Integer type) {
	Form queryParam = new Form();
	if (time != null && time != "") {
	    queryParam.add("time", time);
	}
	if (startId != null && time != "") {
	    queryParam.add("start_id", startId);
	}
	if (limit != null && time != "") {
	    queryParam.add("limit", limit);
	}
	queryParam.add("type", type);
	WebResource resource = client.resource(uri + CBS_API_INNER_RANK);
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
     * 用户结算记录
     * 
     * @param long_no
     *            龙号
     * @param start_time
     * @param end_time
     * @param userId
     * @param type
     *            赛事类型
     * @param contestId
     *            比赛id
     * @param playId
     *            玩法
     * @param support
     *            竞猜
     * @return
     */
    public JSONObject InnerSettle(Long long_no, String start_time, String end_time, Integer now_page, Long userId,
	    Integer type, Long contestId, Integer playId, Integer support) {
	Form queryParam = new Form();
	if (long_no != null) {
	    queryParam.add("long_no", long_no);
	}
	if (start_time != null || start_time != "") {
	    queryParam.add("start_time", start_time);
	}
	if (end_time != null || end_time != "") {
	    queryParam.add("end_time", end_time);
	}
	if (userId != null) {
	    queryParam.add("user_id", userId);
	}
	if (type != null) {
	    queryParam.add("type", type);
	}
	if (contestId != null) {
	    queryParam.add("contest_id", contestId);
	}
	if (playId != null) {
	    queryParam.add("play_id", playId);
	}
	if (support != null) {
	    queryParam.add("support", support);
	}
	queryParam.add("now_page", now_page);
	WebResource resource = client.resource(uri + CBS_API_INNER_SETTLE);
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
     * 更新赛事信息
     * 
     * @param contestResponse
     * @param type
     * @return
     */
    public JSONObject updateContest(ContestResponse contestResponse, Integer type) {
	Form queryParam = new Form();

	queryParam.add("contest_id", contestResponse.getContest_id());
	queryParam.add("h_score", contestResponse.getHome_scores());
	queryParam.add("a_score", contestResponse.getAway_scores());
	queryParam.add("status", contestResponse.getStatus());
	queryParam.add("is_lock", contestResponse.getLock_flag());
	queryParam.add("level", contestResponse.getLevel());
	queryParam.add("cup_name", contestResponse.getCup_name());
	queryParam.add("home_count", contestResponse.getHome_count());
	queryParam.add("away_count", contestResponse.getAway_count());
	String str = null;
	if (type == ContestConstants.ContestType.FOOTBALL) {
	    WebResource resource = client.resource(uri + CBS_API_CONTEST_FB_UPDATE);
	    str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE).post(String.class, queryParam);
	} else if (type == ContestConstants.ContestType.BASKETBALL) {
	    WebResource resource = client.resource(uri + CBS_API_CONTEST_BB_UPDATE);
	    str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE).post(String.class, queryParam);
	}
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 球队管理查找球队
     * 
     * @param type
     * @param key
     * @return
     */
    public JSONObject searchTeam(Integer type, String key) {
	Form queryParam = new Form();
	queryParam.add("type", type);
	queryParam.add("key", key);
	WebResource resource = client.resource(uri + CBS_API_EVENT_TEAM_SEARCH);
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
     * 编辑球队名字
     * 
     * @param type
     * @param id
     * @param name
     * @return
     */
    public JSONObject editTeam(Integer type, Long id, String name, String logo) {
	Form queryParam = new Form();
	queryParam.add("type", type);
	queryParam.add("id", id);
	queryParam.add("name", name);
	queryParam.add("logo", logo);

	WebResource resource = client.resource(uri + CBS_API_EVENT_TEAM_EDIT);
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
     * 足球赛事搜索
     * 
     * @param key
     * @param startTime
     * @param limit
     * @return
     */
    public JSONObject searchContestFbInfo(String key, String startTime, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_FB_SEARCH);
	queryParam.add("search_key", key);
	queryParam.add("start_time", startTime);
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
     * 篮球赛事搜索
     * 
     * @param key
     * @param startTime
     * @param limit
     * @return
     */
    public JSONObject searchContestBbInfo(String key, String startTime, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_BB_SEARCH);
	queryParam.add("search_key", key);
	queryParam.add("start_time", startTime);
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
     * 获取足球下注记录
     * 
     * @param startId
     * @param type
     * @param contestId
     * @param userId
     * @param settle
     * @param limit
     * @param startTime
     * @param endTime
     * @return
     */
    public JSONObject getFbBetsInfo(Long startId, Integer type, Long contestId, Long userId, Boolean settle, Integer limit,
	    String startTime, String endTime) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_FB_BET_SEARCH);
	queryParam.add("start_id", startId);
	queryParam.add("type", type);
	queryParam.add("contest_id", contestId);
	queryParam.add("user_id", userId);
	queryParam.add("settle", settle);
	queryParam.add("end_time", endTime);
	queryParam.add("start_time", startTime);
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
     * 获取篮球下注记录
     * 
     * @param startId
     * @param type
     * @param contestId
     * @param userId
     * @param settle
     * @param limit
     * @param startTime
     * @param endTime
     * @return
     */
    public JSONObject getBbBetsInfo(Long startId, Integer type, Long contestId, Long userId, Boolean settle, Integer limit,
	    String startTime, String endTime) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_BB_BET_SEARCH);
	queryParam.add("start_id", startId);
	queryParam.add("type", type);
	queryParam.add("contest_id", contestId);
	queryParam.add("user_id", userId);
	queryParam.add("settle", settle);
	queryParam.add("end_time", endTime);
	queryParam.add("start_time", startTime);
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
     * 获取篮球下注记录
     */
    public JSONObject getCupsInfo(Integer type, Integer level) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_CUP_LIST);
	queryParam.add("type", type);
	queryParam.add("level", level);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getBetsStatistic(String date, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_STATISTIC_BET);
	queryParam.add("date", date);
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
     * 篮球球员列表
     * 
     * @param start_id
     * @param limit
     * @return
     */
    public JSONObject bbPlayerList(Long start_id, Integer limit) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_PLAYER_LIST);
	if (!StringUtils.isEmpty(start_id)) {
	    queryParam.add("start_id", start_id);
	}
	if (!StringUtils.isEmpty(limit)) {
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

    /**
     * 篮球球员查找
     * 
     * @param name
     * @param team_id
     * @return
     */
    public JSONObject bbPlayerSearch(String name, Long team_id) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_PLAYER_SEARCH);
	if (!StringUtils.isEmpty(name)) {
	    queryParam.add("name", name);
	}
	if (!StringUtils.isEmpty(team_id)) {
	    queryParam.add("team_id", team_id);
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

    /**
     * 修改篮球球员
     * 
     * @param id
     * @param name
     * @param first_name
     * @param last_name
     * @return
     */
    public JSONObject bbPlayerEdit(Long id, String name, String first_name, String last_name) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_CONTEST_PLAYER_EDIT);
	queryParam.add("id", id);
	queryParam.add("name", name);
	if (!StringUtils.isEmpty(first_name)) {
	    queryParam.add("first_name", first_name);
	}
	if (!StringUtils.isEmpty(last_name)) {
	    queryParam.add("last_name", last_name);
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
     * 获取押押类型
     */
    public JSONObject viewYyCupinfos() {
	WebResource resource = client.resource(uri + CBS_API_YY_CUP);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取押押列表
     */
    public JSONObject getYaListInfos(Boolean type, Long cupId, Long startId, boolean hideFlag) {
	Form queryParam = new Form();
	if (type != null) {
	    queryParam.add("type", type);
	}
	if (cupId != null && cupId.longValue() >= 0) {
	    queryParam.add("cup_id", cupId);
	}
	queryParam.add("start_id", startId);
	queryParam.add("hide_flag", hideFlag);
	WebResource resource = client.resource(uri + CBS_API_YY_LIST);
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
     * 获取押押下注列表
     */
    public JSONObject getYyBetsList(Long startId, Long id) {
	Form queryParam = new Form();
	queryParam.add("contest_id", id);
	queryParam.add("start_id", startId);
	WebResource resource = client.resource(uri + CBS_API_YY_BETS_LIST);
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
     * 添加押押
     */
	public JSONObject addYy(YyContestResponse yyContestResponse) {
		Form queryParam = new Form();
		queryParam.add("title", yyContestResponse.getTitle());
		queryParam.add("images", yyContestResponse.getImages());
		queryParam.add("text", yyContestResponse.getText());
		queryParam.add("options", yyContestResponse.getOptions());
		queryParam.add("cup_id", yyContestResponse.getCup_id());
		queryParam.add("start_time", yyContestResponse.getStart_time());
		queryParam.add("end_time", yyContestResponse.getEnd_time());
		queryParam.add("show_type", yyContestResponse.getShow_type());
		queryParam.add("activity_flag", yyContestResponse.getActivity_flag());
		queryParam.add("list_image", yyContestResponse.getList_image());
		WebResource resource = client.resource(uri + CBS_API_YY_ADD);
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
     * 获取单个押押
     */
    public JSONObject getOneYy(Long id) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_YY_VIEW);
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

    /**
     * 获取应该及时结算的押押数量
     */
    public JSONObject getYySettleNum() {
	WebResource resource = client.resource(uri + CBS_API_YY_SETTLE_NUM);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 修改押押
     */
    public JSONObject editYy(YyContestResponse yyContestResponse) {
	Form queryParam = new Form();
	queryParam.add("contest_id", yyContestResponse.getId());
	queryParam.add("title", yyContestResponse.getTitle());
	queryParam.add("images", yyContestResponse.getImages());
	queryParam.add("text", yyContestResponse.getText());
	queryParam.add("options", yyContestResponse.getOptions());
	queryParam.add("cup_id", yyContestResponse.getCup_id());
	queryParam.add("start_time", yyContestResponse.getStart_time());
	queryParam.add("end_time", yyContestResponse.getEnd_time());
	queryParam.add("show_type", yyContestResponse.getShow_type());
	queryParam.add("hide_flag", yyContestResponse.getHide_flag());
	queryParam.add("activity_flag", yyContestResponse.getActivity_flag());
	queryParam.add("list_image", yyContestResponse.getList_image());
	WebResource resource = client.resource(uri + CBS_API_YY_EDIT);
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
     * 结算押押
     */
    public JSONObject settleYy(Long contest_id, Integer support, Integer status) {
	Form queryParam = new Form();
	queryParam.add("contest_id", contest_id);
	queryParam.add("support", support);
	queryParam.add("status", status);
	WebResource resource = client.resource(uri + CBS_API_YY_FINISH);
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
     * 添加押押cup
     */
    public JSONObject addYyCup(String cupName) {
	Form queryParam = new Form();
	queryParam.add("cup_name", cupName);
	WebResource resource = client.resource(uri + CBS_API_YY_CUP_ADD);
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

    public JSONObject getFbContestByRoomId(Long room_id) {
	Form queryParam = new Form();
	queryParam.add("room_id", room_id);
	WebResource resource = client.resource(uri + CBS_FB_CONTEST_BY_ROOMID);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getBbContestByRoomId(Long room_id) {
	Form queryParam = new Form();
	queryParam.add("room_id", room_id);
	WebResource resource = client.resource(uri + CBS_BB_CONTEST_BY_ROOMID);
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
     * 新排行榜
     * 
     * @param type
     * @param start_id
     * @param limit
     * @return
     */
    public JSONObject getRankTop(Integer type, Integer start_id, Integer limit, Integer year, Integer week) {
	Form queryParam = new Form();
	String link = "";
	if (type == 1) {
	    if (year != null) {
		link = CBS_RANK_WINNING_WEEK;
		queryParam.add("year", year);
		queryParam.add("week", week);
	    } else {
		link = CBS_RANK_WINNING_ALL;
	    }
	} else if (type == 2) {
	    if (year != null) {
		link = CBS_RANK_ROI_WEEK;
		queryParam.add("year", year);
		queryParam.add("week", week);
	    } else {
		link = CBS_RANK_ROI_ALL;
	    }
	}
	if (start_id != null) {
	    queryParam.add("now_page", start_id);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	WebResource resource = client.resource(uri + link);
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
     * 查看比分模式
     * 
     * @return
     */
    public JSONObject getModule() {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_CONTEST_MODE_VIEW);
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
     * 更改比分模式
     * 
     * @param moduleValue
     * @return
     */
    public JSONObject changeModule(Integer moduleValue) {
	Form queryParam = new Form();
	queryParam.add("module_value", moduleValue);
	WebResource resource = client.resource(uri + CBS_CONTEST_MODE_CHANGE);
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
     * 取消足球单个下注
     * 
     * @param type
     * @param id
     * @param adminName
     * @return
     */
    public JSONObject cancleFbBet(Integer type, Long id, String reason, String adminName) {
	Form queryParam = new Form();
	queryParam.add("play_type", type);
	queryParam.add("id", id);
	queryParam.add("reason", reason);
	queryParam.add("admin_name", adminName);
	WebResource resource = client.resource(uri + CBS_API_CONTEST_FB_BET_CANCLE);
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
     * 取消篮球单个下注
     * 
     * @param type
     * @param id
     * @param adminName
     * @return
     */
    public JSONObject cancleBbBet(Integer type, Long id, String reason, String adminName) {
	Form queryParam = new Form();
	queryParam.add("play_type", type);
	queryParam.add("id", id);
	queryParam.add("reason", reason);
	queryParam.add("admin_name", adminName);
	WebResource resource = client.resource(uri + CBS_API_CONTEST_BB_BET_CANCLE);
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
     * 保存活动赛事串
     */
    public JSONObject saveBunch(String name, String image, String options, Integer cost, Boolean longbi, String prizes) {
	Form queryParam = new Form();
	queryParam.add("name", name);
	queryParam.add("image", image);
	queryParam.add("options", options);
	queryParam.add("cost", cost);
	queryParam.add("longbi", longbi);
	queryParam.add("prizes", prizes);
	WebResource resource = client.resource(uri + CBS_BUNCH_SAVE);
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
     * 修改活动赛事串
     */
    public JSONObject updateBunch(Long id, String name, String image, String options, Integer cost, Boolean longbi,
	    String prizes, Integer status, Integer people) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	if (!StringUtils.isEmpty(name)) {
	    queryParam.add("name", name);
	}
	if (!StringUtils.isEmpty(image)) {
	    queryParam.add("image", image);
	}
	if (!StringUtils.isEmpty(options)) {
	    queryParam.add("options", options);
	}
	if (people != 0) {
	    queryParam.add("people", people);
	}
	queryParam.add("cost", cost);
	queryParam.add("status", status);
	queryParam.add("longbi", longbi);
	WebResource resource = client.resource(uri + CBS_BUNCH_UPDATE);
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

    public JSONObject updateBunchPrize(String prize) {
	Form queryParam = new Form();
	queryParam.add("prize", prize);
	WebResource resource = client.resource(uri + CBS_BUNCH_UPDATE_PRIZE);
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

    public JSONObject getBunchs(Integer status, Integer startId, Integer limit) {
	Form queryParam = new Form();
	queryParam.add("status", status);
	queryParam.add("start_id", startId);
	queryParam.add("limit", limit);
	WebResource resource = client.resource(uri + CBS_BUNCH_LIST);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject viewBunch(Long id) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	WebResource resource = client.resource(uri + CBS_BUNCH_VIEW);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject viewBunchPrize(Long id) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	WebResource resource = client.resource(uri + CBS_BUNCH_VIEW_PRIZE);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject getUserAward(Long id) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	WebResource resource = client.resource(uri + CBS_BUNCH_USER_REWARD);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject viewUserAward(Long id) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	WebResource resource = client.resource(uri + CBS_BUNCH_USER_REWARD_VIEW);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject sendUserAward(Long id, String userIds) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	queryParam.add("user_ids", userIds);
	WebResource resource = client.resource(uri + CBS_BUNCH_USER_REWARD_SEND);
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

    public JSONObject addPrizeImage(String image) {
	Form queryParam = new Form();
	queryParam.add("image", image);
	WebResource resource = client.resource(uri + CBS_BUNCH_PRIZE_ADD);
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

    public JSONObject deletePrizeImage(String image) {
	Form queryParam = new Form();
	queryParam.add("image", image);
	WebResource resource = client.resource(uri + CBS_BUNCH_PRIZE_DELETE);
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

    public JSONObject getPrizeImage() {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_BUNCH_PRIZE_GET);
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
     * 篮球联赛列表
     * 
     * @return
     */
    public JSONObject bbCupList() {
	WebResource resource = client.resource(uri + CBS_BB_CUP_LIST);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 足球联赛列表
     * 
     * @return
     */
    public JSONObject fbCupList() {
	WebResource resource = client.resource(uri + CBS_FB_CUP_LIST);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 修改联赛名称
     * 
     * @param type
     * @param id
     * @param name
     * @return
     */
    public JSONObject editCup(Integer type, Long id, String name) {
	Form queryParam = new Form();
	queryParam.add("type", type);
	queryParam.add("id", id);
	queryParam.add("name", name);
	WebResource resource = client.resource(uri + CBS_CUP_EDIT);
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
     * 获取未处理结算数目
     */
    public JSONObject getContestNotSettleNum() {
	WebResource resource = client.resource(uri + CBS_CONTEST_BET_NOT_SETTLE);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取异常赔率列表
     * 
     * @param status
     * @param startId
     * @param limit
     * @return
     */
    public JSONObject getOddsWarnList(Integer status, Long startId, Integer limit) {
	Form queryParam = new Form();
	if (status != null) {
	    queryParam.add("status", status);
	}
	if (startId != null) {
	    queryParam.add("start_id", startId);
	}
	if (limit != null) {
	    queryParam.add("limit", limit);
	}
	WebResource resource = client.resource(uri + CBS_API_ODDS_WARN_LIST);
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
     * 下注修复
     */
    public JSONObject repairBet(Long id, Integer type, Double roi, String reason) {
	Form queryParam = new Form();
	queryParam.add("play_type", type);
	queryParam.add("id", id);
	queryParam.add("repair_roi", roi);
	queryParam.add("reason", reason);
	WebResource resource = client.resource(uri + CBS_API_CONTEST_BET_REPAIR);
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

    public JSONObject addYyOptionImage(String name, String path) {
	Form queryParam = new Form();
	queryParam.add("name", name);
	queryParam.add("path", path);
	WebResource resource = client.resource(uri + CBS_API_YY_OPTION_IMAGE_ADD);
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

    public JSONObject deleteYyOptionImage(String name) {
	Form queryParam = new Form();
	queryParam.add("name", name);
	WebResource resource = client.resource(uri + CBS_API_YY_OPTION_IMAGE_DELETE);
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


    public JSONObject editYyToGood(Long yyId) {
        Form queryParam = new Form();
        queryParam.add("id", yyId);
        WebResource resource = client.resource(uri + CBS_API_YY_GOOD_EDIT);
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

    public JSONObject getYyOptionImage() {
	WebResource resource = client.resource(uri + CBS_API_YY_OPTION_IMAGE_GET);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取赛事广告列表
     */
    public JSONObject getContestAdList(Integer contestType, Boolean hideFlag, Long startId, Integer limit) {
	Form queryParam = new Form();
	if (contestType != null) {
	    queryParam.add("contest_type", contestType);
	}

	if (hideFlag != null) {
	    queryParam.add("hide_flag", hideFlag);
	}

	queryParam.add("start_id", startId);
	queryParam.add("limit", limit);
	WebResource resource = client.resource(uri + CBS_API_AD_LIST);
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
     * 添加赛事广告
     */
    public JSONObject addContestAd(ContestAdResponse bean) {
	Form queryParam = new Form();
	queryParam.add("title", bean.getTitle());
	queryParam.add("images", bean.getImages());
	queryParam.add("text", bean.getText());
	queryParam.add("contest_id", bean.getContestId());
	queryParam.add("contest_type", bean.getContestType());
	WebResource resource = client.resource(uri + CBS_API_AD_ADD);
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
     * 修改押押
     */
    public JSONObject updateContestAd(ContestAdResponse bean) {
	Form queryParam = new Form();
	queryParam.add("id", bean.getId());
	queryParam.add("title", bean.getTitle());
	queryParam.add("images", bean.getImages());
	queryParam.add("text", bean.getText());
	queryParam.add("contest_id", bean.getContestId());
	queryParam.add("contest_type", bean.getContestType());
	WebResource resource = client.resource(uri + CBS_API_AD_UPDATE);
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
     * 修改押押
     */
    public JSONObject updateContestAdStat(ContestAdResponse bean) {
	Form queryParam = new Form();
	queryParam.add("id", bean.getId());
	queryParam.add("hide_flag", bean.getHideFlag());
	WebResource resource = client.resource(uri + CBS_API_AD_EDIT);
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
     * 获取单个押押
     */
    public JSONObject getOneAd(Long id) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_AD_VIEW);
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

	/**
	 * 同一天相同球队的出现错误
	 * @param type
	 * @return
     */
	public JSONObject getSameStatistic(Integer type) {
		Form queryParam = new Form();
		WebResource resource = client.resource(uri + CBS_API_CONTEST_SAME);
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

	/**
	 * 刷新同一天相同球队的出现错误
     */
	public JSONObject refreshSameStatistic(Integer type) {
		Form queryParam = new Form();
		queryParam.add("type", type);
		WebResource resource = client.resource(uri + CBS_API_CONTEST_SAME_REFRESH);
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
	 * 同一天相同球队的出现错误的数量
     */
	public JSONObject getSameStatisticNum() {
		WebResource resource = client.resource(uri + CBS_API_CONTEST_SAME_NUM);
		String str = resource.get(String.class);
		JSONObject ret = null;
		try {
			ret = new JSONObject(str);
		} catch (JSONException e) {
			LOG.error(e.getMessage(), e);
		}
		return ret;
	}

	/**
	 * 下注额过大
     */
	public JSONObject getBetMuchMoney() {
		WebResource resource = client.resource(uri + CBS_API_CONTEST_BET_MUCH);
		String str = resource.get(String.class);
		JSONObject ret = null;
		try {
			ret = new JSONObject(str);
		} catch (JSONException e) {
			LOG.error(e.getMessage(), e);
		}
		return ret;
	}

	/**
	 * 刷新下注额过大
	 */
	public JSONObject refreshBetMuchMoney() {
		WebResource resource = client.resource(uri + CBS_API_CONTEST_BET_MUCH_REFRESH);
		String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE).post(String.class);
		JSONObject ret = null;
		try {
			ret = new JSONObject(str);
		} catch (JSONException e) {
			LOG.error(e.getMessage(), e);
		}
		return ret;
	}

}
