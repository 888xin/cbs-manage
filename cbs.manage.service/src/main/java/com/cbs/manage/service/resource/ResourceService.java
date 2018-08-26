package com.cbs.manage.service.resource;

import com.cbs.manage.bean.page.PageView;
import com.cbs.manage.bean.role.ResourcesResponse;

import java.util.List;

/**
 * Created by lhx on 15-9-29 下午1:55
 *
 * @Description
 */
public interface ResourceService {

    public List<ResourcesResponse> getAllResources();

    public List<ResourcesResponse> getResourceItems();

    //分页查询
    public PageView query(PageView pageView);

    public boolean modify(ResourcesResponse resourcesResponse);

    //增加
    public boolean add(ResourcesResponse resourcesResponse);

    //删除
    public boolean delete(int resId);
}
