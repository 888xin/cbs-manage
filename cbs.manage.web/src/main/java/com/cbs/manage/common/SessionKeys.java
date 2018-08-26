package com.cbs.manage.common;
/**
 * 
 * @author zhihaoy
 * 通用 session key
 * 
 * common session key
 */
public interface SessionKeys {
    /**
     * 后台 - 管理员
     *  {@link Integer}
     */
    String SESSION_ROLE = "roleSession";

    /**
     * 后台 - 操作反馈信息
     */
    String SESSION_MSG_ERROR = "msg";
   
    String SESSION_MSG_OK = "msg_ok";
}
