package com.cbs.manage.lhx;

import com.cbs.manage.bean.role.ResourcesResponse;
import com.cbs.manage.bean.role.RoleResponse;
import com.cbs.manage.dto.role.Resources;
import com.cbs.manage.dto.role.Role;
import com.cbs.manage.service.role.RoleService;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

/**
* Created by lhx on 15-9-28 下午2:33
*
* @Description
*/
public class TestRoleService {

    private RoleService roleService ;

    @Before
    public void before(){
        @SuppressWarnings("resource")
        ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:conf/cbs-manage-spring-dao.xml",
                "classpath:conf/cbs-manage-spring-service.xml"});
        roleService = (RoleService) context.getBean("roleService");
    }

    /**
     * ==============================================================
     */

    @Test
    public void testRole(){
        List<ResourcesResponse> list = roleService.getResources("1,2,3");
        System.out.println(list);
    }

    @Test
    public void testSingleRole(){
        RoleResponse list = roleService.getSingleRole("admin");
        System.out.println(list);
    }

    @Test
    public void testRoleModify(){
        RoleResponse roleResponse = new RoleResponse();
        roleResponse.setRoleId(8);
        roleResponse.setResourceResKeys("");
        boolean flag = roleService.modify(roleResponse);
        System.out.println(flag);
    }


}
