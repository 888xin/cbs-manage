package com.cbs.manage.bean.role;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by lhx on 15-9-30 下午4:46
 *
 * @Description
 */
public class AliasesResponse implements Serializable {

    private Integer roleId ;
    private Long accountId ;
    private Long longNO ;
    private String name ;
    private String head ;
    private Integer type ;
    private Date addTime ;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getLongNO() {
        return longNO;
    }

    public void setLongNO(Long longNO) {
        this.longNO = longNO;
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

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Date getAddTime() {
        return addTime;
    }

    public void setAddTime(Date addTime) {
        this.addTime = addTime;
    }
}
