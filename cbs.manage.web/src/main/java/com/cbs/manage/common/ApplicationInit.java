package com.cbs.manage.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.cbs.manage.controller.community.PostController;
import com.cbs.manage.impl.im.LifeixImApiUtil;
import com.cbs.manage.util.CbsContestlApiUtil;
import com.cbs.manage.util.CbsMallApiUtil;
import com.cbs.manage.util.CbsOtherApiUtil;
import com.cbs.manage.util.ImageApiUtil;

/**
 * Created by lhx on 15-9-30 上午11:43
 * 
 * @Description
 */
public class ApplicationInit {

    private static final Logger LOG = LoggerFactory.getLogger(ApplicationInit.class);

    /**
     * 新版大赢家API地址
     */
    private String cbsNewApiUri;

    /**
     * 图片中心地址
     */
    private String imageApiUri;

    /**
     * 用于Post系统的用户列表
     */
    private String postUserIds;

    /**
     * IM服务地址
     */
    private String imUri;

    private Boolean debug;

    public void init() {
	/** IP filter **/
//	LOG.info("Init cbs.manage portal");
//	CbsContestlApiUtil.getInstance().initData(cbsNewApiUri);
//	CbsOtherApiUtil.getInstance().initData(cbsNewApiUri);
//	CbsMallApiUtil.getInstance().initData(cbsNewApiUri);
//
//	LOG.info("Init cbs.manage.image portal");
//	ImageApiUtil.getInstance().initData(imageApiUri, debug);
//
//	LOG.info("Init cbs.manage.im portal");
//	// IM 服务初始化
//	LifeixImApiUtil.getInstance().initData(imUri);
//	// 初始化Post系统的用户列表
//	PostController.initUserIds(postUserIds);
    }

    public void setCbsNewApiUri(String cbsNewApiUri) {
	this.cbsNewApiUri = cbsNewApiUri;
    }

    public void setImageApiUri(String imageApiUri) {
	this.imageApiUri = imageApiUri;
    }

    public void setImUri(String imUri) {
	this.imUri = imUri;
    }

    public void setPostUserIds(String postUserIds) {
	this.postUserIds = postUserIds;
    }

    public void setDebug(Boolean debug) {
	this.debug = debug;
    }

}
