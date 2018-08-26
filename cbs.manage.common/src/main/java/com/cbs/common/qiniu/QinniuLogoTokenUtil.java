//package com.cbs.common.qiniu;
//
//import org.json.JSONException;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//import com.qiniu.api.auth.AuthException;
//import com.qiniu.api.auth.digest.Mac;
//import com.qiniu.api.rs.PutPolicy;
//
///**
// * 球队LOGO上传token
// *
// * @author lifeix
// *
// */
//public class QinniuLogoTokenUtil {
//
//    private static final Logger LOG = LoggerFactory.getLogger(QinniuLogoTokenUtil.class);
//
//    private static final String ACCESS_KEY = "t9NZXPGfQqoapRzW-QVy5F0x5xkMAR9r0CPnfB2n";
//
//    private static final String SECRET_KEY = "a5Dyw47BTbGOLyKPeRiTepEfo7ueMaR0qKQUF4B1";
//
//    private static final String BUCKET_ROI = "lifeixroi";
//
//    /**
//     * 设置token过期时间
//     */
//    private static final Long EXPIRES = 2 * 3600L;
//
//    private static final Long MAX_FILE_SIZE = 10 * 1024 * 1024L;
//
//    private static final String MIME_LIMIT = "image/*;audio/*;video/*";
//
//    /**
//     * 自定义返回数据格式，注意如果指定了回调，则该设置不起作用
//     */
//    private static final String RETURN_BODY = "{\"key\": $(key),\"width\": $(imageInfo.width),\"height\": $(imageInfo.height)}";
//
//    public static String getLogoToken(String fileName) {
//	Mac mac = new Mac(ACCESS_KEY, SECRET_KEY);
//
//	// PutPolicy putPolicy = new PutPolicy(String.format("%s:%s",
//	// BUCKET_ROI, fileName));
//	PutPolicy putPolicy = new PutPolicy(BUCKET_ROI);
//	// // 设置返回
//	// putPolicy.returnBody = RETURN_BODY;
//	// // 设置有效期
//	// putPolicy.expires = EXPIRES;
//	// // 设置只能新增
//	// putPolicy.insertOnly = 0;
//	// putPolicy.fsizeLimit = MAX_FILE_SIZE;
//	// putPolicy.mimeLimit = MIME_LIMIT;
//	try {
//	    return putPolicy.token(mac);
//	} catch (AuthException e) {
//	    LOG.error(e.getMessage(), e);
//	} catch (JSONException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//	return null;
//    }
//
//}
