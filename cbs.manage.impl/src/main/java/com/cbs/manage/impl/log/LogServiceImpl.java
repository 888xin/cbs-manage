package com.cbs.manage.impl.log;

import com.cbs.common.util.TimeUtil;
import com.cbs.manage.bean.log.RoleLoginResponse;
import com.cbs.manage.bean.page.PageView;
import com.cbs.manage.dao.log.RoleLoginDao;
import com.cbs.manage.dto.log.RoleLogin;
import com.cbs.manage.service.log.LogService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lhx on 15-9-30 上午10:16
 *
 * @Description
 */
@Service("logService")
public class LogServiceImpl implements LogService {

    @Autowired
    private RoleLoginDao roleLoginDao ;

    @Override
    public void addRoleLoginLog(RoleLoginResponse roleLoginResponse) {
        RoleLogin roleLogin = new RoleLogin();
        BeanUtils.copyProperties(roleLoginResponse,roleLogin);
        roleLoginDao.add(roleLogin);
    }

    @Override
    public PageView query(PageView pageView) {
        List<RoleLogin> list = roleLoginDao.query(pageView, new RoleLogin());
        List<RoleLoginResponse> roleLoginResponses = new ArrayList<RoleLoginResponse>();
        for (RoleLogin roleLogin : list) {
            RoleLoginResponse roleLoginResponse = new RoleLoginResponse();
            BeanUtils.copyProperties(roleLogin,roleLoginResponse);
            roleLoginResponse.setLoginTimeStr(TimeUtil.getStandardDateTime(roleLoginResponse.getLoginTime()));
            roleLoginResponses.add(roleLoginResponse);
        }
        pageView.setRecords(roleLoginResponses);
        return pageView;
    }
}
