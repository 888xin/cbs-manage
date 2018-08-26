package com.cbs.manage.dto.log;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by lhx on 15-9-30 上午9:53
 *
 * @Description
 */
public class RoleLogin implements Serializable {

    private Integer loginId ;
    private String loginName ;
    private Date loginTime ;
    private String loginIP ;

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public Integer getLoginId() {
        return loginId;
    }

    public void setLoginId(Integer loginId) {
        this.loginId = loginId;
    }

    public Date getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Date loginTime) {
        this.loginTime = loginTime;
    }

    public String getLoginIP() {
        return loginIP;
    }

    public void setLoginIP(String loginIP) {
        this.loginIP = loginIP;
    }
}
