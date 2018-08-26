//package com.cbs.manage.controller.event;
//
//import com.cbs.common.util.TimeUtil;
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.api.common.util.BetConstants;
//import com.lifeix.cbs.api.common.util.ContestConstants;
//import com.lifeix.cbs.contest.bean.fb.ContestListResponse;
//import com.lifeix.cbs.contest.bean.fb.ContestResponse;
//import com.lifeix.cbs.contest.bean.odds.*;
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
// * Created by lhx on 15-10-9 下午4:45
// *
// * @Description
// */
//@Controller
//@RequestMapping("/event/basketball")
//public class EventBasketballController {
//
//    // 跳转到篮球列表页面
//    @RequestMapping("/show")
//    public String show() {
//        return "event/event_bb";
//    }
//
//    // 异步获取球赛数据
//    @RequestMapping("/getAsyData")
//    @ResponseBody
//    public Map<String, Object> getAsyData(Long timeStamp, Boolean fullFlag, Boolean isFirst) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        String date = null;
//        if (timeStamp == null) {
//            // 获取当日日期
//            date = TimeUtil.getCurrentDayStrTime();
//        } else {
//            date = TimeUtil.getCurrentDayStr(timeStamp);
//        }
//        JSONObject ret ;
//        if (isFirst != null && isFirst){
//            ret = CbsContestlApiUtil.getInstance().getContestBbFirstInfo(date);
//        } else {
//            ret = CbsContestlApiUtil.getInstance().getContestBbInfo(date, fullFlag);
//        }
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                ContestListResponse contestListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    contestListResponse = new Gson().fromJson(data, ContestListResponse.class);
//                }
//                List<ContestResponse> contestResponseList = contestListResponse.getContests();
//                int num = contestListResponse.getNumber();
//                outMap.put("contests", contestResponseList);
//                outMap.put("number", num);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    // 获取赔率信息
//    @RequestMapping("/getAsyOddsData")
//    @ResponseBody
//    public Map<String, Object> getAsyOddsData(Long contestId, Integer oddsType, Boolean hasContest) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        if (contestId == null) {
//            outMap.put("msg", "缺少请求参数！");
//            return outMap;
//        }
//        JSONObject ret = CbsContestlApiUtil.getInstance().getContestBbOddsInfo(contestId, oddsType, hasContest);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                OddsResponse oddsResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    oddsResponse = new Gson().fromJson(data, OddsResponse.class);
//                }
//                outMap.put("oddsInfo", oddsResponse);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 获取异常赛事
//     *
//     * @param startId
//     * @param limit
//     * @return
//     */
//    @RequestMapping("/getAbnormalData")
//    @ResponseBody
//    public Map<String, Object> getAbnormalData(Long startId, Integer limit) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getAbContestBbInfo(startId, limit);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                ContestListResponse contestListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    contestListResponse = new Gson().fromJson(data, ContestListResponse.class);
//                }
//                List<ContestResponse> contestResponseList = contestListResponse.getContests();
//                int num = contestListResponse.getNumber();
//                outMap.put("contests", contestResponseList);
//                outMap.put("number", num);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 获取结算赛事
//     *
//     * @return
//     */
//    @RequestMapping("/getSettleData")
//    @ResponseBody
//    public Map<String, Object> getSettleData(Long settleId, Integer limit) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getContestSettleInfo(settleId,
//                ContestConstants.ContestType.BASKETBALL, limit);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                ContestListResponse contestListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    contestListResponse = new Gson().fromJson(data, ContestListResponse.class);
//                }
//                List<ContestResponse> contestResponseList = contestListResponse.getContests();
//                int num = contestListResponse.getNumber();
//                outMap.put("contests", contestResponseList);
//                outMap.put("number", num);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 结算任务添加
//     *
//     * @param contestId
//     * @param type
//     * @param immediate
//     * @return
//     */
//    @RequestMapping("/settle/add")
//    @ResponseBody
//    public Map<String, Object> addSettle(Long contestId, Integer type, Boolean immediate, String contestStr) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = null;
//        if (contestId != null) {
//            // 单个
//            ret = CbsContestlApiUtil.getInstance().addSettle(contestId, ContestConstants.ContestType.BASKETBALL, true);
//        } else if (contestStr != null) {
//            // 批量
//            String[] contestIds = contestStr.split(",");
//            for (String id : contestIds) {
//                ret = CbsContestlApiUtil.getInstance().addSettle(contestId, ContestConstants.ContestType.BASKETBALL, true);
//                int code = ret.optInt("code");
//                if (code != 200) {
//                    outMap.put("msg", ret.optString("msg") + "推送到id为：" + id + "时失败");
//                    outMap.put("code", code);
//                    return outMap;
//                }
//            }
//        } else {
//            outMap.put("msg", "请求ID为null");
//        }
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap;
//    }
//
//
//    /**
//     * 后台立即结算赛事
//     */
//    @RequestMapping("/settle")
//    @ResponseBody
//    public Map<String, Object> settle(Long contestId) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().settleContest(contestId, ContestConstants.ContestType.BASKETBALL);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 篮球赔率列表
//     *
//     * @param oddsId
//     * @param type
//     * @param limit
//     * @return
//     */
//    @RequestMapping("/getOddsData")
//    @ResponseBody
//    public Map<String, Object> getOddsData(Long oddsId, Integer type, Integer limit, Boolean isFive, Integer byOrder) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getContestOddsBbInfo(oddsId, type, limit, isFive, byOrder);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                if (BetConstants.ContestContainOdds_BB.BB_SPF == type) {
//                    OddsOpListResponse oddsOpListResponse = null;
//                    String data = ret.optString("data");
//                    if (!StringUtils.isEmpty(data)) {
//                        oddsOpListResponse = new Gson().fromJson(data, OddsOpListResponse.class);
//                    }
//                    if (oddsOpListResponse != null) {
//                        List<OddsOpResponse> oddsOpResponseList = oddsOpListResponse.getOdds_ops();
//                        int num = oddsOpResponseList.size();
//                        outMap.put("odds", oddsOpResponseList);
//                        outMap.put("number", num);
//                    } else {
//                        outMap.put("number", 0);
//                    }
//                } else if (BetConstants.ContestContainOdds_BB.BB_RQSPF == type) {
//                    OddsJcListResponse oddsJcListResponse = null;
//                    String data = ret.optString("data");
//                    if (!StringUtils.isEmpty(data)) {
//                        oddsJcListResponse = new Gson().fromJson(data, OddsJcListResponse.class);
//                    }
//                    if (oddsJcListResponse != null) {
//                        List<OddsJcResponse> oddsJcResponses = oddsJcListResponse.getOdds_jcs();
//                        int num = oddsJcResponses.size();
//                        outMap.put("odds", oddsJcResponses);
//                        outMap.put("number", num);
//                    } else {
//                        outMap.put("number", 0);
//                    }
//                }
//
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 更新篮球胜平负赔率
//     *
//     * @param oddsOpResponse
//     * @return
//     */
//    @RequestMapping("/odds/op/update")
//    @ResponseBody
//    public Map<String, Object> updateOpOdds(OddsOpResponse oddsOpResponse) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().updateOpOdds(oddsOpResponse,
//                ContestConstants.ContestType.BASKETBALL);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 更新篮球让球胜平负赔率
//     *
//     * @param oddsJcResponse
//     * @return
//     */
//    @RequestMapping("/odds/jc/update")
//    @ResponseBody
//    public Map<String, Object> updateJcOdds(OddsJcResponse oddsJcResponse) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().updateJcOdds(oddsJcResponse,
//                ContestConstants.ContestType.BASKETBALL);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 更新篮球大小球赔率
//     */
//    @RequestMapping("/odds/size/update")
//    @ResponseBody
//    public Map<String, Object> updateSizeOdds(OddsSizeResponse oddsSizeResponse) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().updateSizeOdds(oddsSizeResponse,
//                ContestConstants.ContestType.BASKETBALL);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 更新篮球赛事
//     *
//     * @param contestResponse
//     * @return
//     */
//    @RequestMapping("/update")
//    @ResponseBody
//    public Map<String, Object> updateContest(ContestResponse contestResponse) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().updateContest(contestResponse,
//                ContestConstants.ContestType.BASKETBALL);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 篮球赛事搜索
//     *
//     * @param key
//     * @param startTime
//     * @param limit
//     * @return
//     */
//    @RequestMapping("/search")
//    @ResponseBody
//    public Map<String, Object> search(String key, String startTime, Integer limit) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//
//        JSONObject ret = CbsContestlApiUtil.getInstance().searchContestBbInfo(key, startTime, limit);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                ContestListResponse contestListResponse = null;
//                int num = 0;
//                int number = 0;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    contestListResponse = new Gson().fromJson(data, ContestListResponse.class);
//                    List<ContestResponse> contestResponseList = contestListResponse.getContests();
//                    num = contestListResponse.getNumber();
//                    number = contestResponseList.size();
//                    outMap.put("contests", contestResponseList);
//                }
//                outMap.put("sum", num);
//                outMap.put("number", number);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 篮球赛事赔率历史
//     *
//     * @param start_id
//     * @param limit
//     * @param contest_id
//     * @param odds_type
//     * @return
//     */
//    @RequestMapping("/odds/history")
//    @ResponseBody
//    public Map<String, Object> oddsHistory(Long start_id, Integer limit, Long contest_id, Integer odds_type) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//
//        JSONObject ret = CbsContestlApiUtil.getInstance().getOddsHistory(start_id, limit, contest_id, odds_type,
//                ContestConstants.ContestType.BASKETBALL);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                int number = 0;
//                if (odds_type == 6) {
//                    OddsOpHistListResponse oddsOpHistListRespons = null;
//                    String data = ret.optString("data");
//                    if (!StringUtils.isEmpty(data)) {
//                        oddsOpHistListRespons = new Gson().fromJson(data, OddsOpHistListResponse.class);
//                        List<OddsOpHistResponse> oddsHisList = oddsOpHistListRespons.getOdds_op_hists();
//                        if (oddsHisList != null) {
//                            number = oddsHisList.size();
//                        }
//                        outMap.put("odds", oddsHisList);
//                    }
//                } else if (odds_type == 7) {
//                    OddsJcHistListResponse oddsJcHistListResponse = null;
//                    String data = ret.optString("data");
//                    if (!StringUtils.isEmpty(data)) {
//                        oddsJcHistListResponse = new Gson().fromJson(data, OddsJcHistListResponse.class);
//                        List<OddsJcHistResponse> oddsHisList = oddsJcHistListResponse.getOdds_jc_hists();
//                        if (oddsHisList != null) {
//                            number = oddsHisList.size();
//                        }
//                        outMap.put("odds", oddsHisList);
//                    }
//                }
//
//                outMap.put("number", number);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//}
