package com.cbs.manage.dao.role;

import com.cbs.manage.dao.base.BaseDao;
import com.cbs.manage.dto.role.Resources ;
import java.util.List;

/**
 * Created by lhx on 15-9-21 下午3:30
 *
 * @Description
 */
public interface ResourcesDao extends BaseDao<Resources> {

    //查询所有资源请求
    public List<Resources> findAll() ;

    //<!-- 根据资源Id获取-->
    public List<Resources> getResources(String[] array);

    /**
     * 目录权限
     */
    public List<Resources> getResourcesItem();

}
