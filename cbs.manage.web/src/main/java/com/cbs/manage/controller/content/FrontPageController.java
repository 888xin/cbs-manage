//package com.cbs.manage.controller.content;
//
//import java.io.ByteArrayInputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.net.URL;
//import java.util.HashMap;
//import java.util.Iterator;
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.apache.commons.io.IOUtils;
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
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.google.gson.Gson;
//import com.l99.common.utils.StringUtil;
//import com.lifeix.cbs.content.bean.frontpage.FrontPageListResponse;
//import com.lifeix.cbs.content.bean.frontpage.FrontPageResponse;
//import com.lifeix.tiyu.content.bean.main.cbs.CbsContentResponse;
//import com.qiniu.api.auth.AuthException;
//
///**
// * Created by lhx on 15-12-3 上午10:25
// *
// * @Description
// */
//@Controller
//@RequestMapping("/frontpage")
//public class FrontPageController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(FrontPageController.class);
//
//    // 跳转到列表页面
//    @RequestMapping("/show")
//    public String show() {
//	return "content/front_page";
//    }
//
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> list(Long startId, Long endId, Integer type, Integer status, Integer iDisplayLength,
//	    Integer skip, Boolean next, Boolean previous) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = null;
//	if (skip == 0) {
//	    skip = null;
//	}
//	if (next) {
//	    // 下一页
//	    ret = CbsOtherApiUtil.getInstance().getFrontPagesInfo(startId, null, type, status, iDisplayLength, skip);
//	}
//	if (previous) {
//	    ret = CbsOtherApiUtil.getInstance().getFrontPagesInfo(null, endId, type, status, iDisplayLength, skip);
//	}
//	if (!next && !previous) {
//	    ret = CbsOtherApiUtil.getInstance().getFrontPagesInfo(null, null, type, status, iDisplayLength, skip);
//	}
//
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		FrontPageListResponse frontPageListResponse = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    frontPageListResponse = new Gson().fromJson(data, FrontPageListResponse.class);
//		}
//		int num = 0;
//		if (frontPageListResponse != null) {
//		    List<FrontPageResponse> frontPageResponseList = frontPageListResponse.getFrontpages();
//		    num = frontPageResponseList.size();
//		    outMap.put("frontpages", frontPageResponseList);
//		    int number = frontPageListResponse.getNumber();
//		    outMap.put("iTotalRecords", number);
//		    outMap.put("iTotalDisplayRecords", number);
//		}
//		outMap.put("number", num);
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
//    @RequestMapping("/queue")
//    @ResponseBody
//    public Map<String, Object> queue(Long fId, Integer status, Integer type) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().queueFrontPage(fId, status, type);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code != 200) {
//		outMap.put("msg", ret.optString("msg"));
//	    }
//	    outMap.put("code", code);
//	} else {
//	    outMap.put("msg", "服务器端出错！");
//	}
//	return outMap;
//    }
//
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> edit(Long contestId, Integer contestType, Long innnerContestId, Integer innnerContestType,
//	    Long fId, String path, String link, String title, String desc, Long contentId, Integer type, Integer status,
//	    String ids, Integer oper) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	if (!StringUtils.isEmpty(ids)) {
//	    String[] idStrs = ids.split(",");
//	    for (String idStr : idStrs) {
//		CbsOtherApiUtil.getInstance().editFrontPage(null, null, null, null, Long.valueOf(idStr), null, null, null,
//		        null, null, type, status, null);
//	    }
//	    outMap.put("code", 200);
//	    return outMap;
//	}
//	JSONObject ret = CbsOtherApiUtil.getInstance().editFrontPage(contestId, contestType, innnerContestId,
//	        innnerContestType, fId, path, link, title, desc, contentId, type, status, oper);
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
//    @RequestMapping("/view")
//    @ResponseBody
//    public Map<String, Object> view(Long fId, Integer type) {
//	Map<String, Object> outMap = new HashMap<String, Object>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().viewFrontPageInfo(fId, type);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		FrontPageResponse frontPageResponse = null;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    frontPageResponse = new Gson().fromJson(data, FrontPageResponse.class);
//		}
//		outMap.put("frontpage", frontPageResponse);
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
//    @RequestMapping("/add/image")
//    public void addImage(HttpServletRequest request, HttpServletResponse response) throws JSONException, IOException {
//	// 是否成功上传了文件
//	boolean flag = false;
//	// 成功上传了n个图像
//	int imageNum = 0;
//	JSONObject jsonObject = null;
//	MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
//	Iterator<String> iter = multiRequest.getFileNames();
//	while (iter.hasNext()) {
//	    MultipartFile file = multiRequest.getFile(iter.next());
//	    // 有上传文件的话，容量是大于0的。
//	    if (file.getSize() > 0) {
//		String imagename = file.getOriginalFilename();
//		String ext = imagename.substring(imagename.lastIndexOf(".")).toLowerCase();
//		// 文件名为：系统时间 + 后缀
//		try {
//		    // 上传到七牛云
//		    String str = QiniuFileUtil.getInstance().uploadPhotoByInputStream(file.getInputStream(), ext, 1,
//			    QiniuFileUtil.ImageCategory.CONTENT);
//		    jsonObject = new JSONObject(str);
//		    imageNum++;
//		    flag = true;
//		    jsonObject.put("image_num", imageNum);
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
//    @RequestMapping("/add/images")
//    @ResponseBody
//    public Map<String, Object> addImages(String url, String end) throws JSONException {
//	Map<String, Object> outMap = new HashMap<>();
//	// 成功上传了n个图像
//	int imageNum = 0;
//	String images = "";
//	if (!StringUtils.isEmpty(url)) {
//	    String[] urls = url.split(",");
//	    try {
//		// 上传到七牛云
//		for (String image : urls) {
//		    InputStream in = new URL(image).openStream();
//		    byte[] jpg = IOUtils.toByteArray(in);
//		    InputStream inputStream = new ByteArrayInputStream(jpg);
//		    String str = QiniuFileUtil.getInstance().uploadPhotoByInputStream(inputStream, ".jpg", 1,
//			    QiniuFileUtil.ImageCategory.CONTENT);
//		    JSONObject jsonObject = new JSONObject(str);
//		    String key = jsonObject.optString("key");
//		    if (!StringUtils.isEmpty(key)) {
//			imageNum++;
//			images += key + ",";
//		    }
//
//		}
//	    } catch (AuthException | IOException e) {
//		LOG.error(e.getMessage(), e);
//	    }
//	}
//
//	if (!StringUtils.isEmpty(end)) {
//	    images = images + end;
//	} else {
//	    if (!StringUtils.isEmpty(images)) {
//		images = images.substring(0, images.length() - 1);
//	    }
//	}
//
//	outMap.put("num", imageNum);
//	outMap.put("images", images);
//
//	return outMap;
//    }
//
//    @RequestMapping("/view/content")
//    @ResponseBody
//    public Map<String, Object> viewContent(Long id) {
//	Map<String, Object> outMap = new HashMap<>();
//	JSONObject ret = CbsOtherApiUtil.getInstance().getContentNews(id);
//	if (ret != null) {
//	    int code = ret.optInt("code");
//	    if (code == 200) {
//		CbsContentResponse cbsContentResponse;
//		String data = ret.optString("data");
//		if (!StringUtils.isEmpty(data)) {
//		    cbsContentResponse = new Gson().fromJson(data, CbsContentResponse.class);
//		    outMap.put("content", cbsContentResponse);
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
//    /**
//     * 球队图片管理
//     *
//     * @param request
//     * @param response
//     * @throws JSONException
//     * @throws IOException
//     */
//    @RequestMapping("/add/logo")
//    public void addLogo(HttpServletRequest request, HttpServletResponse response) throws JSONException, IOException {
//	JSONObject jsonObject = null;
//	MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
//	String logo_name = request.getParameter("logo_name");
//	if (StringUtils.isEmpty(logo_name)) {
//	    response.getWriter().print("<script>parent.callback('" + "fail:获取图片名出错" + "')</script>");
//	    return;
//	}
//	Iterator<String> iter = multiRequest.getFileNames();
//	if (iter.hasNext()) {
//	    MultipartFile file = multiRequest.getFile(iter.next());
//	    // 有上传文件的话，容量是大于0的。
//	    if (file.getSize() > 0) {
//		String imagename = file.getOriginalFilename();
//		// 图片重命名
//		String filename = StringUtil.createRandom(false, 8);
//		String ext = imagename.substring(imagename.lastIndexOf(".")).toLowerCase();
//
//		if (!ext.toLowerCase().contains("png")) {
//		    response.getWriter().print("<script>parent.callback('" + "fail:图片格式必须为png" + "')</script>");
//		    return;
//		}
//		// 文件名为：系统时间 + 后缀
//		try {
//		    // 上传到七牛云
//		    String str = QiniuFileUtil.getInstance().uploadContestTeamLogo(file.getInputStream(), filename + ext);
//		    jsonObject = new JSONObject(str);
//		    // 获取图片路径
//		    if (jsonObject.has("key")) {
//			response.getWriter()
//			        .print("<script>parent.callback('" + jsonObject.getString("key") + "')</script>");
//			return;
//		    }
//		} catch (AuthException e) {
//		    response.getWriter().print("<script>parent.callback('" + "fail:上传图片出现异常" + "')</script>");
//		    LOG.error(e.getMessage(), e);
//		} catch (IOException e) {
//		    response.getWriter().print("<script>parent.callback('" + "fail:上传图片出现异常" + "')</script>");
//		    LOG.error(e.getMessage(), e);
//		}
//	    } else {
//		response.getWriter().print("<script>parent.callback('" + "fail:上传照片照片无内容" + "')</script>");
//		return;
//	    }
//	}
//    }
//
//}
