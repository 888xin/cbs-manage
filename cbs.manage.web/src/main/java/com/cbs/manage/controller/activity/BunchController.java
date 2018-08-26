//package com.cbs.manage.controller.activity;
//
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.cbs.manage.util.CbsMallApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.bunch.*;
//import com.lifeix.cbs.mall.bean.goods.MallGoodsListResponse;
//import com.lifeix.cbs.mall.bean.goods.MallGoodsResponse;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import javax.ws.rs.DefaultValue;
//import javax.ws.rs.FormParam;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
///**
// * Created by lhx on 16-5-25 上午11:38
// *
// * @Description
// */
//@Controller
//@RequestMapping("/bunch")
//public class BunchController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(BunchController.class);
//
//    // 跳转到页面
//    @RequestMapping("/show")
//    public String show() {
//        return "activity/bunch";
//    }
//
//    @RequestMapping("/add")
//    @ResponseBody
//    public Map<String, Object> add(String name, String image, String options, Integer cost, Boolean longbi, String prizes) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().saveBunch(name, image, options, cost, longbi, prizes);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/update")
//    @ResponseBody
//    public Map<String, Object> update(Long id, String name, String image, String options, Integer status, Integer cost, Integer people, Boolean longbi, String prizes) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().updateBunch(id, name, image, options, cost, longbi, prizes, status, people);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> list(Integer status, Integer startId, Integer limit) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getBunchs(status, startId, limit);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                BunchContestListResponse bunchContestListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    bunchContestListResponse = new Gson().fromJson(data, BunchContestListResponse.class);
//                }
//                if (bunchContestListResponse != null) {
//                    List<BunchContestResponse> bunchContestResponseList = bunchContestListResponse.getBunches();
//                    outMap.put("bunches", bunchContestResponseList);
//                }
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
//    @RequestMapping("/view")
//    @ResponseBody
//    public Map<String, Object> view(Long id) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().viewBunch(id);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                BunchContestResponse bunchContestResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    bunchContestResponse = new Gson().fromJson(data, BunchContestResponse.class);
//                }
//                if (bunchContestResponse != null) {
//                    outMap.put("bunch", bunchContestResponse);
//                }
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
//
//    @RequestMapping("/view/prize")
//    @ResponseBody
//    public Map<String, Object> viewPrize(Long id) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().viewBunchPrize(id);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                BunchContestResponse bunchContestResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    bunchContestResponse = new Gson().fromJson(data, BunchContestResponse.class);
//                }
//                if (bunchContestResponse != null) {
//                    outMap.put("bunch", bunchContestResponse);
//                }
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
//    @RequestMapping("/update/prize")
//    @ResponseBody
//    public Map<String, Object> updatePrize(String prize) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().updateBunchPrize(prize);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/add/prize/image")
//    @ResponseBody
//    public Map<String, Object> addPrizeImage(String image) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().addPrizeImage(image);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/delete/prize/image")
//    @ResponseBody
//    public Map<String, Object> deletePrizeImage(String image) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().deletePrizeImage(image);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/get/prize/image")
//    @ResponseBody
//    public Map<String, Object> getPrizeImage() {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getPrizeImage();
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                BunchPrizeResponse bunchPrizeResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    bunchPrizeResponse = new Gson().fromJson(data, BunchPrizeResponse.class);
//                }
//                if (bunchPrizeResponse != null) {
//                    outMap.put("images", bunchPrizeResponse.getImage());
//                }
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
//
//    @RequestMapping("/get/user/award")
//    @ResponseBody
//    public Map<String, Object> getUserAward(Long id) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().getUserAward(id);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                BunchContestResponse bunchContestResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    bunchContestResponse = new Gson().fromJson(data, BunchContestResponse.class);
//                }
//                if (bunchContestResponse != null) {
//                    outMap.put("bunch", bunchContestResponse);
//                }
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
//
//    @RequestMapping("/send/user/award")
//    @ResponseBody
//    public Map<String, Object> sendUserAward(Long id, String userIds) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().sendUserAward(id, userIds);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/view/user/award")
//    @ResponseBody
//    public Map<String, Object> viewUserAward(Long id) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().viewUserAward(id);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                BunchBetListResponse bunchBetListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    bunchBetListResponse = new Gson().fromJson(data, BunchBetListResponse.class);
//                    List<BunchBetResponse> bunchBet = bunchBetListResponse.getBets();
//                    outMap.put("bunchBet", bunchBet);
//                    List<BunchPrizeResponse> prize = bunchBetListResponse.getPrize();
//                    outMap.put("prize", prize);
//                    outMap.put("page", bunchBetListResponse.getPage_num());
//                }
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
