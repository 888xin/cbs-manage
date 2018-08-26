package com.cbs.manage.impl.role;


import com.cbs.common.util.CommonUtil;
import com.cbs.common.util.TimeUtil;
import com.cbs.manage.bean.role.AliasesResponse;
import com.cbs.manage.bean.role.ResourcesResponse;
import com.cbs.manage.bean.role.RoleResponse;
import com.cbs.manage.dao.role.AliasesDao;
import com.cbs.manage.dao.role.ResourcesDao;
import com.cbs.manage.dao.role.RoleDao;
import com.cbs.manage.dto.role.Aliases;
import com.cbs.manage.dto.role.Resources;
import com.cbs.manage.dto.role.Role;
import com.cbs.manage.service.role.RoleService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by lhx on 15-9-28 下午2:19
 *
 * @Description
 */
@Service("roleService")
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleDao roleDao ;

    @Autowired
    private ResourcesDao resourcesDao ;

    @Autowired
    private AliasesDao aliasesDao ;

    @Override
    public RoleResponse getSingleRole(String rolename) {
        Role role = roleDao.getSingleRole(rolename) ;
        RoleResponse roleResponse = null ;
        if (role != null){
            roleResponse = new RoleResponse();
            BeanUtils.copyProperties(role, roleResponse);
        }
        return roleResponse ;
    }

    @Override
    public List<ResourcesResponse> getResources(String resourceResKeys) {
        String[] resKeys = resourceResKeys.split(",");
        for (int i = 0; i < resKeys.length; i++) {
            resKeys[i] = resKeys[i].trim();
        }
        if (resKeys.length > 0){
            List<Resources> list = null ;
            List<ResourcesResponse> resourcesResponseList = null ;
            if ("sys_all".equals(resKeys[0])){
                list = resourcesDao.findAll();
            } else {
                list = resourcesDao.getResources(resKeys) ;
            }
            if (list != null){
                resourcesResponseList = new ArrayList<ResourcesResponse>();
                for (Resources resources : list) {
                    ResourcesResponse resourcesResponse = new ResourcesResponse();
                    BeanUtils.copyProperties(resources,resourcesResponse);
                    resourcesResponseList.add(resourcesResponse);
                }
            }
            return resourcesResponseList ;

        }
        return null;
    }



    @Override
    public List<RoleResponse> getAllRole() {
        List<Role> roles = roleDao.getAllRole();
        List<RoleResponse> roleResponses = null ;
        if (roles != null && roles.size() > 0){
            roleResponses = new ArrayList<RoleResponse>();
            for (Role role : roles) {
                RoleResponse roleResponse = new RoleResponse();
                BeanUtils.copyProperties(role,roleResponse);
                roleResponse.setRegisterTimeStr(TimeUtil.getStandardDateTime(roleResponse.getRegisterTime()));
                roleResponses.add(roleResponse);
            }
        }
        return roleResponses ;
    }

    @Override
    public boolean addRole(String username, String password) {
        Role role = new Role();
        role.setRolename(username);
        role.setPassword(password);
        role.setResourceResKeys("");
        role.setRegisterTime(new Date());
        return roleDao.add(role);
    }

    @Override
    public boolean deleteRole(Integer roleId) {
        return roleDao.delete(roleId);
    }

    public List<AliasesResponse> getAllAliases(){
        List<Aliases> aliasesList = aliasesDao.queryAll(new Aliases());
        List<AliasesResponse> aliasesResponseList = null ;
        if (aliasesList != null && aliasesList.size() > 0){
            aliasesResponseList = new ArrayList<AliasesResponse>();
            for (Aliases aliases : aliasesList) {
                AliasesResponse aliasesResponse = new AliasesResponse();
                BeanUtils.copyProperties(aliases, aliasesResponse);
                aliasesResponseList.add(aliasesResponse);
            }
        }
        return aliasesResponseList ;
    }

    @Override
    public int addAliase(AliasesResponse aliasesResponse) {
        Aliases aliases = new Aliases();
        BeanUtils.copyProperties(aliasesResponse, aliases);
        //获取操作者Id
        String roleName = CommonUtil.getAuthenticatedUsername();
        Role role = roleDao.getSingleRole(roleName);
        aliases.setRoleId(role.getRoleId());
        //查找该管理员是否已经添加了该用户为马甲
        Aliases aliasesOld = aliasesDao.find(aliases);
        if (aliasesOld != null){
            return -1 ;
        } else {
            boolean flag = aliasesDao.add(aliases);
            if (flag){
                return 1 ;
            } else {
                return 0 ;
            }
        }
    }

    @Override
    public boolean modifyAliase(AliasesResponse aliasesResponse) {
        Aliases aliases = new Aliases();
        aliases.setType(aliasesResponse.getType());
        aliases.setAccountId(aliasesResponse.getAccountId());
        //获取操作者Id
        String roleName = CommonUtil.getAuthenticatedUsername();
        Role role = roleDao.getSingleRole(roleName);
        aliases.setRoleId(role.getRoleId());
        return aliasesDao.modify(aliases);
    }

    @Override
    public boolean deleteAliase(Long accountId) {
        Aliases aliases = new Aliases();
        //获取操作者Id
        String roleName = CommonUtil.getAuthenticatedUsername();
        Role role = roleDao.getSingleRole(roleName);
        aliases.setAccountId(accountId);
        aliases.setRoleId(role.getRoleId());
        return aliasesDao.deleteAliase(aliases);
    }

    @Override
    public List<AliasesResponse> getAliasesByRoleId(int roleId) {
        List<Aliases> aliasesList = aliasesDao.queryByRoleId(roleId);
        List<AliasesResponse> aliasesResponseList = null ;
        if (aliasesList != null && aliasesList.size() > 0){
            aliasesResponseList = new ArrayList<AliasesResponse>();
            for (Aliases aliases : aliasesList) {
                AliasesResponse aliasesResponse = new AliasesResponse();
                BeanUtils.copyProperties(aliases, aliasesResponse);
                aliasesResponseList.add(aliasesResponse);
            }
        }
        return aliasesResponseList ;
    }

    @Override
    public boolean modify(RoleResponse roleResponse) {
        Role role = new Role();
        BeanUtils.copyProperties(roleResponse, role);
        return roleDao.modify(role);
    }
}
