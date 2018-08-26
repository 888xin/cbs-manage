package com.cbs.manage.impl.resource;

import com.cbs.manage.bean.page.PageView;
import com.cbs.manage.bean.role.ResourcesResponse;
import com.cbs.manage.dao.role.ResourcesDao;
import com.cbs.manage.dto.role.Resources;
import com.cbs.manage.service.resource.ResourceService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lhx on 15-9-29 下午1:56
 *
 * @Description
 */
@Service("resourceService")
public class ResourceServiceImpl implements ResourceService {

    @Autowired
    private ResourcesDao resourcesDao ;

    @Override
    public List<ResourcesResponse> getAllResources() {
        List<Resources> list = resourcesDao.findAll();
        List<ResourcesResponse> resourcesResponseList = new ArrayList<ResourcesResponse>();
        for (Resources resources : list) {
            ResourcesResponse resourcesResponse = new ResourcesResponse();
            BeanUtils.copyProperties(resources,resourcesResponse);
            resourcesResponseList.add(resourcesResponse);
        }
        return resourcesResponseList ;
    }

    @Override
    public List<ResourcesResponse> getResourceItems() {
        List<Resources> list = resourcesDao.getResourcesItem();
        List<ResourcesResponse> resourcesResponseList = new ArrayList<ResourcesResponse>();
        for (Resources resources : list) {
            ResourcesResponse resourcesResponse = new ResourcesResponse();
            BeanUtils.copyProperties(resources,resourcesResponse);
            resourcesResponseList.add(resourcesResponse);
        }
        return resourcesResponseList ;
    }

    @Override
    public PageView query(PageView pageView) {
        List<Resources> list = resourcesDao.query(pageView, new Resources());
        List<ResourcesResponse> resourcesResponseList = new ArrayList<ResourcesResponse>();
        for (Resources resources : list) {
            ResourcesResponse resourcesResponse = new ResourcesResponse();
            BeanUtils.copyProperties(resources,resourcesResponse);
            resourcesResponseList.add(resourcesResponse);
        }
        pageView.setRecords(resourcesResponseList);
        return pageView;
    }

    @Override
    public boolean modify(ResourcesResponse resourcesResponse) {
        Resources resources = new Resources();
        BeanUtils.copyProperties(resourcesResponse,resources);
        return resourcesDao.modify(resources);
    }

    @Override
    public boolean add(ResourcesResponse resourcesResponse) {
        Resources resources = new Resources();
        BeanUtils.copyProperties(resourcesResponse,resources);
        return resourcesDao.add(resources);
    }

    @Override
    public boolean delete(int resId) {
        return resourcesDao.delete(resId);
    }
}
