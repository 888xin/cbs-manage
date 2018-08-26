//package com.cbs.common.qiniu;
//
//import java.io.File;
//import java.io.IOException;
//import java.io.InputStream;
//
//import org.apache.http.HttpStatus;
//import org.json.JSONArray;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import com.cbs.manage.util.ImageApiUtil;
//import com.qiniu.api.auth.AuthException;
//import com.qiniu.api.io.IoApi;
//import com.qiniu.api.io.PutExtra;
//import com.qiniu.api.io.PutRet;
//import com.sun.jersey.api.client.Client;
//import com.sun.jersey.api.client.WebResource;
//import com.sun.jersey.api.representation.Form;
//
///**
// * Created by lhx on 15-11-11 下午4:27
// *
// * @Description
// */
//public class QiniuFileUtil {
//
//    protected static Logger LOG = LoggerFactory.getLogger(QiniuFileUtil.class);
//
//    private static final String BUCKET_NAME = "lifeixroi";
//
//    private static final class InstanceHolder {
//	private static QiniuFileUtil INSTANCE = new QiniuFileUtil();
//    }
//
//    public static QiniuFileUtil getInstance() {
//	return InstanceHolder.INSTANCE;
//    }
//
//    // 文件上传
//    public String uploadPhotoByFile(File file, String ext, int num, String prefix) throws AuthException {
//	int extInt = 0;
//	if (ext.equals(".png")) {
//	    extInt = 1;
//	} else if (ext.equals(".gif")) {
//	    extInt = 2;
//	} else if (ext.equals(".bmp")) {
//	    extInt = 4;
//	} else if (ext.equals(".jpe")) {
//	    extInt = 5;
//	}
//	String token = null;
//	String imageKey = null;
//	String tokenStr = ImageApiUtil.getInstance().getUploadToken(BUCKET_NAME, num, extInt);
//	try {
//	    JSONObject jsonObject = new JSONObject(tokenStr);
//	    int code = jsonObject.optInt("code");
//	    if (code == 200) {
//		String data = jsonObject.optString("data");
//		JSONObject jsonData = new JSONObject(data);
//		token = jsonData.optString("token");
//		JSONArray jsonArray = jsonData.optJSONArray("keys");
//		imageKey = (String) jsonArray.get(0);
//	    } else {
//		return null;
//	    }
//	} catch (JSONException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//	PutExtra extra = new PutExtra();
//	PutRet ret = IoApi.putFile(token, prefix + imageKey, file, extra);
//	if (ret.getStatusCode() == HttpStatus.SC_OK) {
//	    return ret.getResponse();
//	}
//	throw new AuthException(ret.getStatusCode() + "");
//    }
//
//    /**
//     * 上传球队Logo 可覆盖
//     *
//     * @param inputStream
//     * @param ext
//     * @param num
//     * @param prefix
//     * @param fileName
//     * @return
//     * @throws AuthException
//     */
//    public String uploadContestTeamLogo(InputStream inputStream, String fileName) throws AuthException {
//
//	Boolean debug = ImageApiUtil.getInstance().getDebug();
//
//	String path = "";
//	if (debug) {
//	    path = ImageCategory.LOGO_DEBUG;
//	} else {
//	    path = ImageCategory.LOGO;
//	}
//
//	String token = QinniuLogoTokenUtil.getLogoToken(path + fileName);
//	if (token == null) {
//	    return null;
//	}
//	try {
//	    PutExtra extra = new PutExtra();
//
//	    PutRet ret = IoApi.Put(token, path + fileName, inputStream, extra);
//	    if (ret.getStatusCode() == HttpStatus.SC_OK) {
//		return ret.getResponse();
//	    }
//	    throw new AuthException(ret.getStatusCode() + "");
//	} finally {
//	    if (inputStream != null) {
//		try {
//		    inputStream.close();
//		} catch (IOException e) {
//		    e.printStackTrace();
//		}
//	    }
//	}
//    }
//
//    // 流上传
//    public String uploadPhotoByInputStream(InputStream inputStream, String ext, int num, String prefix) throws AuthException {
//	int extInt = 0;
//	if (ext.equals(".png")) {
//	    extInt = 1;
//	} else if (ext.equals(".gif")) {
//	    extInt = 2;
//	} else if (ext.equals(".bmp")) {
//	    extInt = 4;
//	} else if (ext.equals(".jpe")) {
//	    extInt = 5;
//	}
//	String token = null;
//	String imageKey = null;
//	String tokenStr = ImageApiUtil.getInstance().getUploadToken(BUCKET_NAME, num, extInt);
//	try {
//	    JSONObject jsonObject = new JSONObject(tokenStr);
//	    int code = jsonObject.optInt("code");
//	    if (code == 200) {
//		String data = jsonObject.optString("data");
//		JSONObject jsonData = new JSONObject(data);
//		token = jsonData.optString("token");
//		JSONArray jsonArray = jsonData.optJSONArray("keys");
//		imageKey = (String) jsonArray.get(0);
//	    } else {
//		return null;
//	    }
//	} catch (JSONException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//	try {
//	    PutExtra extra = new PutExtra();
//
//	    PutRet ret = IoApi.Put(token, prefix + imageKey, inputStream, extra);
//	    if (ret.getStatusCode() == HttpStatus.SC_OK) {
//		return ret.getResponse();
//	    }
//	    throw new AuthException(ret.getStatusCode() + "");
//	} finally {
//	    if (inputStream != null) {
//		try {
//		    inputStream.close();
//		} catch (IOException e) {
//		    e.printStackTrace();
//		}
//	    }
//	}
//    }
//
//    public static String getToken(int num, int extInt) {
//	String tokenStr = ImageApiUtil.getInstance().getUploadToken(BUCKET_NAME, num, extInt);
//	return tokenStr;
//    }
//
//    /**
//     * 曾光伟 截取视频第一帧返回
//     *
//     * @param vedioPath
//     *            视频相对路径
//     * @param w
//     * @param h
//     * @return
//     */
//    public static String getVideoFrame(String token, String videoPath, String fops) {
//	Client client = new Client();
//	Form params = new Form();
//	params.add("bucket", BUCKET_NAME);
//	params.add("key", videoPath);
//	params.add("fops", fops);
//	WebResource resource = client.resource("http://api.qiniu.com/pfop");
//	resource.header("Authorization", token).header("Host", "api.qiniu.com")
//	        .header("Content-Type", "application/x-www-form-urlencoded");
//	return resource.queryParams(params).post(String.class);
//    }
//
//    /**
//     * 曾光伟 截取视频第一帧返回
//     *
//     * @param vedioPath
//     *            视频相对路径
//     * @param w
//     * @param h
//     * @return
//     */
//    public static String getVideoFrame(String token, String videoPath, int w, int h) {
//	Client client = new Client();
//	Form params = new Form();
//	// params.add("w", w);
//	// params.add("h", h);
//	params.add("bucket", BUCKET_NAME);
//	params.add("key", videoPath);
//	params.add("fops", "vframe/jpg/offset/1/w/250/h/200");
//	WebResource resource = client.resource("http://api.qiniu.com/pfop");
//	resource.header("Authorization", token).header("Host", "api.qiniu.com")
//	        .header("Content-Type", "application/x-www-form-urlencoded");
//	return resource.queryParams(params).post(String.class);
//    }
//
//    public static interface ImageCategory {
//	final static String GOODS = "goods/";
//	final static String AVATAR = "avatar/";
//	final static String CONTENT = "content/";
//	final static String YY = "yy/";
//	final static String COMMUNITY = "co/";
//	final static String LOGO = "logo/";
//	final static String LOGO_DEBUG = "logo/inner/";
//	final static String AD = "ad/";
//    }
//
//}
