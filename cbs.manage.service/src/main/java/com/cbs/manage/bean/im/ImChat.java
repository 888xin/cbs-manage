package com.cbs.manage.bean.im;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.lifeix.user.beans.Response;

public class ImChat implements JsonSerializer<ImChat>, Response {

    private static final long serialVersionUID = -1864367054317421900L;

    private String appendix;

    private String body;

    private long createTime;

    private Integer intParam1;

    private Integer intParam2;

    private Integer longParam1;

    private Integer mainType;

    private String msgId;

    private Long receiverId;

    private Long senderId;

    private String senderInfoStr;

    private Integer sonType;

    private String strParam1;

    private String strParam2;
    /**
     * 标志用户是否被屏蔽
     */
    private Integer userStatu;

    // 用户信息
    private Long long_no;
    private String name;
    private String head;
    private Integer gender;

    public String getAppendix() {
	return appendix;
    }

    public void setAppendix(String appendix) {
	this.appendix = appendix;
    }

    public String getBody() {
	return body;
    }

    public void setBody(String body) {
	this.body = body;
    }

    public long getCreateTime() {
	return createTime;
    }

    public void setCreateTime(long createTime) {
	this.createTime = createTime;
    }

    public Integer getIntParam1() {
	return intParam1;
    }

    public void setIntParam1(Integer intParam1) {
	this.intParam1 = intParam1;
    }

    public Integer getIntParam2() {
	return intParam2;
    }

    public void setIntParam2(Integer intParam2) {
	this.intParam2 = intParam2;
    }

    public Integer getLongParam1() {
	return longParam1;
    }

    public void setLongParam1(Integer longParam1) {
	this.longParam1 = longParam1;
    }

    public Integer getMainType() {
	return mainType;
    }

    public void setMainType(Integer mainType) {
	this.mainType = mainType;
    }

    public String getMsgId() {
	return msgId;
    }

    public void setMsgId(String msgId) {
	this.msgId = msgId;
    }

    public Long getReceiverId() {
	return receiverId;
    }

    public void setReceiverId(Long receiverId) {
	this.receiverId = receiverId;
    }

    public Long getSenderId() {
	return senderId;
    }

    public void setSenderId(Long senderId) {
	this.senderId = senderId;
    }

    public String getSenderInfoStr() {
	return senderInfoStr;
    }

    public void setSenderInfoStr(String senderInfoStr) {
	this.senderInfoStr = senderInfoStr;
    }

    public Integer getSonType() {
	return sonType;
    }

    public void setSonType(Integer sonType) {
	this.sonType = sonType;
    }

    public String getStrParam1() {
	return strParam1;
    }

    public void setStrParam1(String strParam1) {
	this.strParam1 = strParam1;
    }

    public String getStrParam2() {
	return strParam2;
    }

    public void setStrParam2(String strParam2) {
	this.strParam2 = strParam2;
    }

    public Integer getUserStatu() {
	return userStatu;
    }

    public void setUserStatu(Integer userStatu) {
	this.userStatu = userStatu;
    }

    public Long getLong_no() {
	return long_no;
    }

    public void setLong_no(Long long_no) {
	this.long_no = long_no;
    }

    public String getName() {
	return name;
    }

    public void setName(String name) {
	this.name = name;
    }

    public String getHead() {
	return head;
    }

    public void setHead(String head) {
	this.head = head;
    }

    public Integer getGender() {
	return gender;
    }

    public void setGender(Integer gender) {
	this.gender = gender;
    }

    @Override
    public String getObjectName() {
	return null;
    }

    @Override
    public JsonElement serialize(ImChat arg0, Type arg1, JsonSerializationContext arg2) {
	return null;
    }

}
