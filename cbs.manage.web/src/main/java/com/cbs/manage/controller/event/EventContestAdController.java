//package com.cbs.manage.controller.event;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Iterator;
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
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import com.cbs.common.qiniu.QiniuFileUtil;
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.contest.ContestAdListResponse;
//import com.lifeix.cbs.contest.bean.contest.ContestAdResponse;
//import com.qiniu.api.auth.AuthException;
//
//@Controller
//@RequestMapping("/event/contest/ad")
//public class EventContestAdController {
//
//    private static final Logger LOG = LoggerFactory.getLogger(EventContestAdController.class);
//
//    // 跳转到显示押押页面
//    @RequestMapping("/show")
//    public String show() {
//	return "event/event_contest_ad_show";
//    }
//
//    // 跳转到隐藏押押页面
//    @RequestMapping("/show/hide")
//    public String showHide() {
//	return "event/event_contest_ad_hide";
//    }
//
//    @RequestMapping("/one")
//    @ResponseBody
//    public Map<String, Object> one(Long id) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().getOneAd(id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		ContestAdResponse bean;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    bean = new Gson().fromJson(data, ContestAdResponse.class);
//		    outMap.put("ad", bean);
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
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> list(Integer contestType, Long startId, Boolean hideFlag, Integer limit) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().getContestAdList(contestType, hideFlag, startId, limit);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		ContestAdListResponse res;
//
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    res = new Gson().fromJson(data, ContestAdListResponse.class);
//		    List<ContestAdResponse> list = res.getAds();
//		    int num = list.size();
//		    outMap.put("ads", list);
//		    outMap.put("number", num);
//		    outMap.put("startId", res.getStartId());
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
//    public Map<String, Object> add(ContestAdResponse bean) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().addContestAd(bean);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    outMap.put("code", code);
//	    outMap.put("msg", ret.optString("msg"));
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> edit(ContestAdResponse bean) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().updateContestAdStat(bean);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    outMap.put("code", code);
//	    outMap.put("msg", ret.optString("msg"));
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//    @RequestMapping("/update")
//    @ResponseBody
//    public Map<String, Object> update(ContestAdResponse bean) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().updateContestAd(bean);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    outMap.put("code", code);
//	    outMap.put("msg", ret.optString("msg"));
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//    /**
//     * 上传照片
//     */
//    @RequestMapping("/add/image")
//    public void addImage(HttpServletRequest request, HttpServletResponse response) throws JSONException, IOException {
//	// 是否成功上传了文件
//	boolean flag = false;
//	JSONObject jsonObject = null;
//	MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
//	Iterator<String> iter = multiRequest.getFileNames();
//	while (iter.hasNext()) {
//	    MultipartFile file = multiRequest.getFile(iter.next());
//	    // 有上传文件的话，容量是大于0的。
//	    if (file.getSize() > 0) {
//		String imagename = file.getOriginalFilename();
//		String ext = imagename.substring(imagename.lastIndexOf(".")).toLowerCase();
//		try {
//		    // 上传到七牛云
//		    String str = QiniuFileUtil.getInstance().uploadPhotoByInputStream(file.getInputStream(), ext, 1,
//			    QiniuFileUtil.ImageCategory.AD);
//		    jsonObject = new JSONObject(str);
//		    flag = true;
//		} catch (AuthException e) {
//		    jsonObject = new JSONObject();
//		    jsonObject.put("msg", "上传照片出现异常：" + e.getMessage());
//		    LOG.error(e.getMessage(), e);
//		} catch (IOException e) {
//		    jsonObject = new JSONObject();
//		    jsonObject.put("msg", "上传照片出现异常：" + e.getMessage());
//		    LOG.error(e.getMessage(), e);
//		}
//	    } else {
//		jsonObject = new JSONObject();
//		jsonObject.put("msg", "上传照片照片无内容！");
//	    }
//	    jsonObject.put("flag", flag);
//	}
//	response.getWriter().print(jsonObject.toString());
//    }
//}
