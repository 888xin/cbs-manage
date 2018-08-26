package com.cbs.manage.dao.role.impl;

import com.cbs.manage.dao.base.impl.BaseDaoImpl;
import com.cbs.manage.dao.role.RoleDao;
import com.cbs.manage.dto.role.Role;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by lhx on 15-9-28 上午10:31
 *
 * @Description
 */

@Repository("roleDao")
public class RoleDaoImpl extends BaseDaoImpl<Role> implements RoleDao {


    @Override
    public int insert(Role record) {
        return 0;
    }

//    @Override
//    public int countUser(Role role) {
//        return 0;
//    }

    @Override
    public Role getSingleRole(String rolename) {
        return getSqlSession().selectOne("role.getSingleRole", rolename);
    }

    @Override
    public List<Role> getAllRole() {
        return getSqlSession().selectList("role.getAllRole");
    }

//    @Override
//    public Resources findbyUserRole(int roleId) {
//        return null;
//    }
//
//    @Override
//    public List<Role> findAllRole() {
//        return null;
//    }
}
