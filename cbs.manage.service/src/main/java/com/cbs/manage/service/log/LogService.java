package com.cbs.manage.service.log;

import com.cbs.manage.bean.log.RoleLoginResponse;
import com.cbs.manage.bean.page.PageView;

/**
 * Created by lhx on 15-9-30 上午10:14
 *
 * @Description
 */
public interface LogService {

    public void addRoleLoginLog(RoleLoginResponse roleLoginResponse);

    //分页查询
    public PageView query(PageView pageView);

}
