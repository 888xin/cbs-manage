package com.cbs.manage.bean.im;

import java.lang.reflect.Type;

import com.google.gson.JsonElement;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.lifeix.user.beans.Response;

public class ImRoom implements JsonSerializer<ImRoom>, Response {
    /**
     * 
     */
    private static final long serialVersionUID = 4032873953363651905L;
    private String createTime;
    private String description;
    private Long id;
    
    private String identifier;
    private String name;
   
    private Integer statu;
    private Integer touristCount;
    private Integer userCount;

    
    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStatu() {
        return statu;
    }

    public void setStatu(Integer statu) {
        this.statu = statu;
    }

    public Integer getTouristCount() {
        return touristCount;
    }

    public void setTouristCount(Integer touristCount) {
        this.touristCount = touristCount;
    }

    public Integer getUserCount() {
        return userCount;
    }

    public void setUserCount(Integer userCount) {
        this.userCount = userCount;
    }

    @Override
    public String getObjectName() {
	return null;
    }

    @Override
    public JsonElement serialize(ImRoom arg0, Type type, JsonSerializationContext arg2) {
	return null;
    }

}
