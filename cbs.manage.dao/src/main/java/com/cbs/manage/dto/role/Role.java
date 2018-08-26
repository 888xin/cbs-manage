package com.cbs.manage.dto.role;

import java.util.Date;

/**
 * Created by lhx on 15-9-28 上午11:47
 *
 * @Description 角色
 */
public class Role implements java.io.Serializable {

    private Integer roleId;

    private String rolename;

    private String password;

    private String resourceResKeys;

    private String description;

    private String path;

    private Date registerTime;

    private Date lastLoginTime;

    private Integer status ;

    private String phone ;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getResourceResKeys() {
        return resourceResKeys;
    }

    public void setResourceResKeys(String resourceResKeys) {
        this.resourceResKeys = resourceResKeys;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Date registerTime) {
        this.registerTime = registerTime;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
