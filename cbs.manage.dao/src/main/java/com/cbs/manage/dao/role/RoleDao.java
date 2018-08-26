package com.cbs.manage.dao.role;


import com.cbs.manage.dao.base.BaseDao;
import com.cbs.manage.dto.role.Role;

import java.util.List;

public interface RoleDao extends BaseDao<Role> {


    int insert(Role record);

//    public int countUser(Role role);

    public Role getSingleRole(String rolename) ;

//    public Resources findbyUserRole(int roleId) ;
//
//
    public List<Role> getAllRole() ;


}