//package com.cbs.manage.controller.content;
//
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.content.bean.contest.ContestNewsListResponse;
//import com.lifeix.cbs.content.bean.contest.ContestNewsResponse;
//import com.lifeix.cbs.content.bean.frontpage.FrontPageListResponse;
//import com.lifeix.cbs.content.bean.frontpage.FrontPageResponse;
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
//@RequestMapping("/contest/news")
//public class ContestNewsController {
//
//    // 跳转到列表页面
//    @RequestMapping("/show")
//    public String show() {
//        return "content/contest_news";
//    }
//
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> list(Long startId, Long endId, Integer status, Integer iDisplayLength,
//                                    Integer skip, Boolean next, Boolean previous) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = null;
//        if (skip == 0) {
//            skip = null;
//        }
//        if (next) {
//            // 下一页
//            ret = CbsOtherApiUtil.getInstance().getContestNewsInfo(startId, null, status, iDisplayLength, skip);
//        }
//        if (previous) {
//            ret = CbsOtherApiUtil.getInstance().getContestNewsInfo(null, endId, status, iDisplayLength, skip);
//        }
//        if (!next && !previous) {
//            ret = CbsOtherApiUtil.getInstance().getContestNewsInfo(null, null, status, iDisplayLength, skip);
//        }
//
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                ContestNewsListResponse contestNewsListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    contestNewsListResponse = new Gson().fromJson(data, ContestNewsListResponse.class);
//                }
//                int num = 0;
//                if (contestNewsListResponse != null) {
//                    List<ContestNewsResponse> news = contestNewsListResponse.getContest_news();
//                    num = news.size();
//                    outMap.put("news", news);
//                    int number = contestNewsListResponse.getNumber();
//                    outMap.put("iTotalRecords", number);
//                    outMap.put("iTotalDisplayRecords", number);
//                }
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
//    @RequestMapping("/add")
//    @ResponseBody
//    public Map<String, Object> add(ContestNewsResponse contestNewsResponse) {
//        Map<String, Object> outMap = new HashMap<>();
//
//        JSONObject ret = CbsOtherApiUtil.getInstance().addContestNews(contestNewsResponse);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> edit(ContestNewsResponse contestNewsResponse) {
//        Map<String, Object> outMap = new HashMap<>();
//
//        JSONObject ret = CbsOtherApiUtil.getInstance().editContestNews(contestNewsResponse);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//}
