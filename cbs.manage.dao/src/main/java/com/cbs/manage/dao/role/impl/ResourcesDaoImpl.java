package com.cbs.manage.dao.role.impl;

import com.cbs.manage.dao.base.impl.BaseDaoImpl;
import com.cbs.manage.dao.role.ResourcesDao;
import com.cbs.manage.dto.role.Resources;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by lhx on 15-9-28 下午12:44
 *
 * @Description
 */
@Repository("resourcesDao")
public class ResourcesDaoImpl extends BaseDaoImpl<Resources> implements ResourcesDao {

    @Override
    public List<Resources> findAll() {
        return getSqlSession().selectList("resources.findAll");
    }

    @Override
    public List<Resources> getResources(String[] array) {
        return getSqlSession().selectList("resources.getResources", array);
    }

    @Override
    public List<Resources> getResourcesItem() {
        return getSqlSession().selectList("resources.getResourcesItem");
    }

}
