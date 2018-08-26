package com.cbs.manage.util;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.representation.Form;

/**
 * Created by lhx on 15-9-30 下午1:59
 * 
 * @Description
 */
public class ImageApiUtil {

    private Client client;

    private String uri;

    private Boolean debug;

    static class SingletonHolder {
	private static final ImageApiUtil INSTANCE = new ImageApiUtil();
    }

    public static ImageApiUtil getInstance() {
	return SingletonHolder.INSTANCE;
    }

    private ImageApiUtil() {
	client = Client.create();
	client.setConnectTimeout(3000);
	client.setReadTimeout(3000);
    }

    public void initData(final String uri, final Boolean debug) {

	this.debug = debug;

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

    // 获取用户
    private static final String URI_UPLOAD_TOKEN = "rest/upload/token";

    /**
     * 获取上传token 和文件名
     * 
     * @param bucketName
     * @param num
     * @param mimeType
     * @return
     */
    public String getUploadToken(String bucketName, Integer num, Integer mimeType) {
	Form queryParam = new Form();
	queryParam.add("bucketName", bucketName);
	queryParam.add("mime_type", mimeType);
	queryParam.add("num", num);
	WebResource resource = client.resource(uri + URI_UPLOAD_TOKEN);
	return resource.queryParams(queryParam).get(String.class);
    }

    public Boolean getDebug() {
	return debug;
    }

    public void setDebug(Boolean debug) {
	this.debug = debug;
    }
}
