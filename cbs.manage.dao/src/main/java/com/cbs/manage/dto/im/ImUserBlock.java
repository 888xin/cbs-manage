package com.cbs.manage.dto.im;

import java.io.Serializable;
import java.util.Date;

/**
 * IM用户屏蔽信息
 * 
 * @author lifeix
 * 
 */
public class ImUserBlock implements Serializable {

    private static final long serialVersionUID = -1647377885920048096L;

    /**
     * 用户Id
     */
    private Long userId;

    /**
     * 用户姓名
     */
    private String userName;

    /**
     * 用户头像
     */
    private String userPath;

    /**
     * 用户龙号
     */
    private Long userNo;

    /**
     * 0 禁言 1 屏蔽 
     */
    private int blockStatu;

    /**
     * 创建时间
     */
    private Long createTime;

    /**
     * 解禁时间
     */
    private Date removeTime;

    public Long getUserId() {
	return userId;
    }

    public void setUserId(Long userId) {
	this.userId = userId;
    }

    public String getUserName() {
	return userName;
    }

    public void setUserName(String userName) {
	this.userName = userName;
    }

    public String getUserPath() {
	return userPath;
    }

    public void setUserPath(String userPath) {
	this.userPath = userPath;
    }

    public Long getUserNo() {
	return userNo;
    }

    public void setUserNo(Long userNo) {
	this.userNo = userNo;
    }

    public int getBlockStatu() {
	return blockStatu;
    }

    public void setBlockStatu(int blockStatu) {
	this.blockStatu = blockStatu;
    }

    public Long getCreateTime() {
	return createTime;
    }

    public void setCreateTime(Long createTime) {
	this.createTime = createTime;
    }

    public Date getRemoveTime() {
	return removeTime;
    }

    public void setRemoveTime(Date removeTime) {
	this.removeTime = removeTime;
    }

}
