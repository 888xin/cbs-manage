package cbs.manage.dao.test.lhx;

import com.cbs.manage.dao.log.RoleLoginDao;
import com.cbs.manage.dao.role.AliasesDao;
import com.cbs.manage.dao.role.ResourcesDao;
import com.cbs.manage.dao.role.RoleDao;
import com.cbs.manage.dto.log.RoleLogin;
import com.cbs.manage.dto.role.Aliases;
import com.cbs.manage.dto.role.Resources;
import com.cbs.manage.dto.role.Role;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
* Created by lhx on 15-9-28 上午10:25
*
* @Description
*/
public class TestRole {

    private RoleDao roleDao ;
    private ResourcesDao resourcesDao ;
    private RoleLoginDao roleLoginDao ;
    private AliasesDao aliasesDao ;

    @Before
    public void before(){
        @SuppressWarnings("resource")
        ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:conf/cbs-manage-spring-dao.xml"});
        roleDao = (RoleDao) context.getBean("roleDao");
        roleLoginDao = (RoleLoginDao) context.getBean("roleLoginDao");
        resourcesDao = (ResourcesDao) context.getBean("resourcesDao");
        aliasesDao = (AliasesDao) context.getBean("aliasesDao");
    }

    /**
     * ==============================================================
     */

    @Test
    public void testRole(){
        Role role = roleDao.getSingleRole("li");
        System.out.println(role.getResourceResKeys());

//        List<Role> roles = roleDao.getAllRole();
//        System.out.println(roles);
    }

    @Test
    public void testResource(){
        String[] resKeys = {"sys_authority","sys_authority_edit","sys_aliases_edit"};
        List<Resources> list = resourcesDao.getResources(resKeys);
        System.out.println(list.size());

//        List<Resources> list = resourcesDao.findAll();
//        System.out.println(list.size());

//        PageView pageView = new PageView(2,1);
//        List<Resources> list = resourcesDao.query(pageView,new Resources());
//        System.out.println(list.size());

    }

    @Test
    public void testRoleLogin(){
        RoleLogin roleLogin = new RoleLogin();
        roleLogin.setLoginName("admin");
        roleLogin.setLoginIP("127.0.0.1");
        roleLoginDao.add(roleLogin);
    }


    @Test
    public void testRoleModify(){
        Role role = new Role();
        role.setRoleId(8);
        role.setResourceResKeys("sys_all");
        boolean flag = roleDao.modify(role);
        System.out.println(flag);
    }

    @Test
    public void testResourcesUpdate(){
        Resources resources = new Resources();
        resources.setResId(11);
        resources.setName("wer23423wer");
        boolean flag = resourcesDao.modify(resources);
        System.out.println(flag);
    }


    @Test
    public void testfindAliases(){
        Aliases aliases = new Aliases();
        aliases.setAccountId(10000013L);
        aliases.setRoleId(8);
//        Map<String,Object> map = new HashMap<String, Object>();
//        map.put("accountId",10000013L);
//        map.put("roleId",8);
        Aliases aliases1 = aliasesDao.find(aliases);
        System.out.println(aliases1);
    }

    @Test
    public void testqueryByRoleId(){
        List<Aliases> list = aliasesDao.queryByRoleId(1);
        System.out.println(list.size());
    }

}
