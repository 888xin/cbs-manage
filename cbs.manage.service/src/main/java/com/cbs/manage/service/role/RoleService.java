package com.cbs.manage.service.role;

import com.cbs.manage.bean.role.AliasesResponse;
import com.cbs.manage.bean.role.ResourcesResponse;
import com.cbs.manage.bean.role.RoleResponse;

import java.util.List;

/**
* Created by lhx on 15-9-24 下午7:44
*
* @Description
*/
public interface RoleService {

    public RoleResponse getSingleRole(String rolename) ;

    public List<ResourcesResponse> getResources(String resourceResKeys);

    public List<RoleResponse> getAllRole();

    public boolean addRole(String username, String password) ;

    public boolean deleteRole(Integer roleId);

    public List<AliasesResponse> getAllAliases();

    public boolean modify(RoleResponse roleResponse);

    public int addAliase(AliasesResponse aliasesResponse);

    public boolean modifyAliase(AliasesResponse aliasesResponse);

    public boolean deleteAliase(Long accountId);

    public List<AliasesResponse> getAliasesByRoleId(int roleId);

}
