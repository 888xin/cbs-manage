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
//import javax.servlet.http.HttpSession;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import com.cbs.common.qiniu.QiniuFileUtil;
//import com.cbs.manage.util.CbsContestlApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.contest.bean.yy.YyBetListResponse;
//import com.lifeix.cbs.contest.bean.yy.YyBetResponse;
//import com.lifeix.cbs.contest.bean.yy.YyContestListResponse;
//import com.lifeix.cbs.contest.bean.yy.YyContestResponse;
//import com.lifeix.cbs.contest.bean.yy.YyCupListResponse;
//import com.lifeix.cbs.contest.bean.yy.YyCupResponse;
//import com.qiniu.api.auth.AuthException;
//
///**
// * Created by lhx on 16-1-5 上午10:16
// *
// * @Description
// */
//@Controller
//@RequestMapping("/event/yy")
//public class EventYyController {
//
//    private static final Logger LOG = LoggerFactory.getLogger(EventYyController.class);
//
//    // 跳转到显示押押页面
//    @RequestMapping("/show")
//    public String show() {
//	return "event/event_yy_show";
//    }
//
//    // 跳转到隐藏押押页面
//    @RequestMapping("/show/hide")
//    public String showHide() {
//	return "event/event_yy_hide";
//    }
//
//    @RequestMapping("/cup")
//    @ResponseBody
//    public Map<String, Object> getYayaCupData() {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().viewYyCupinfos();
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		YyCupListResponse yyCupListResponse;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    yyCupListResponse = new Gson().fromJson(data, YyCupListResponse.class);
//		    List<YyCupResponse> cups = yyCupListResponse.getCups();
//		    outMap.put("cups", cups);
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
//    public Map<String, Object> list(Boolean type, Long cupId, Long startIdShow, Long startIdHide, boolean hideFlag) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	Long startId;
//	if (hideFlag) {
//	    startId = startIdHide;
//	} else {
//	    startId = startIdShow;
//	}
//	JSONObject ret = CbsContestlApiUtil.getInstance().getYaListInfos(type, cupId, startId, hideFlag);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		YyContestListResponse yyContestListResponse;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    yyContestListResponse = new Gson().fromJson(data, YyContestListResponse.class);
//		    List<YyContestResponse> yyContestResponseList = yyContestListResponse.getContests();
//		    int num = yyContestResponseList.size();
//		    outMap.put("yys", yyContestResponseList);
//		    outMap.put("number", num);
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
//    public Map<String, Object> addYaya(YyContestResponse yyContestResponse) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().addYy(yyContestResponse);
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
//    @RequestMapping("/one")
//    @ResponseBody
//    public Map<String, Object> one(Long id) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().getOneYy(id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		YyContestResponse YyContestResponse;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    YyContestResponse = new Gson().fromJson(data, YyContestResponse.class);
//		    outMap.put("yy", YyContestResponse);
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
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> editYaya(YyContestResponse yyContestResponse) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().editYy(yyContestResponse);
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
//    @RequestMapping("/settle")
//    @ResponseBody
//    public Map<String, Object> settleYaya(Long contest_id, Integer support, Integer status, HttpServletRequest request) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().settleYy(contest_id, support, status);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    outMap.put("code", code);
//	    outMap.put("msg", ret.optString("msg"));
//	    if (code == 200) {
//		HttpSession session = request.getSession();
//		Integer num = (Integer) session.getAttribute("yy_un_settle_num");
//		session.setAttribute("yy_un_settle_num", --num);
//	    }
//	} else {
//	    outMap.put("msg", "服务器端无数据返回！");
//	}
//	return outMap;
//    }
//
//    @RequestMapping("/add/cup")
//    @ResponseBody
//    public Map<String, Object> addYayaCup(String cupName) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().addYyCup(cupName);
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
//			    QiniuFileUtil.ImageCategory.YY);
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
//
//    // 跳转到押押下注页面
//    @RequestMapping("/show/bet")
//    public String showBet(Long id, Model model) {
//	if (id != null) {
//	    model.addAttribute("yy_id", id);
//	} else {
//	    model.addAttribute("yy_id", 0);
//	}
//
//	return "event/event_yy_bets";
//    }
//
//    @RequestMapping("/bet/list")
//    @ResponseBody
//    public Map<String, Object> betList(Long id, Long startId) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//
//	JSONObject ret = CbsContestlApiUtil.getInstance().getYyBetsList(startId, id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		YyBetListResponse yyBetListResponse;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    yyBetListResponse = new Gson().fromJson(data, YyBetListResponse.class);
//		    List<YyBetResponse> bets = yyBetListResponse.getBets();
//		    int num = bets.size();
//		    outMap.put("bets", bets);
//		    outMap.put("number", num);
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
//    @RequestMapping("/get/settle/num")
//    @ResponseBody
//    public Map<String, Object> getYySettleNum() {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().getYySettleNum();
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		YyContestListResponse yyContestListResponse;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    yyContestListResponse = new Gson().fromJson(data, YyContestListResponse.class);
//		    outMap.put("number", yyContestListResponse.getNumber());
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
//    @RequestMapping("/add/option/image")
//    @ResponseBody
//    public Map<String, Object> addOptionImage(String name, String path) {
//	Map<String, Object> outMap = new HashMap<>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().addYyOptionImage(name, path);
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
//    @RequestMapping("/delete/option/image")
//    @ResponseBody
//    public Map<String, Object> deleteOptionImage(String name) {
//	Map<String, Object> outMap = new HashMap<>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().deleteYyOptionImage(name);
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
//    @RequestMapping("/get/option/image")
//    @ResponseBody
//    public Map<String, Object> getOptionImage() {
//	Map<String, Object> outMap = new HashMap<>();
//	JSONObject ret = CbsContestlApiUtil.getInstance().getYyOptionImage();
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		YyContestResponse yyContestResponse;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    yyContestResponse = new Gson().fromJson(data, YyContestResponse.class);
//		    outMap.put("images", yyContestResponse.getImages());
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
//
//    @RequestMapping("/edit/good")
//    @ResponseBody
//    public Map<String, Object> goodEdit(Long yyId) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsContestlApiUtil.getInstance().editYyToGood(yyId);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//}
