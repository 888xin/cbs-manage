package com.cbs.manage.dao.role;

import com.cbs.manage.dao.base.BaseDao;
import com.cbs.manage.dto.role.Aliases;

import java.util.List;

/**
 * Created by lhx on 15-9-30 上午10:01
 *
 * @Description
 */
public interface AliasesDao extends BaseDao<Aliases> {

    public Aliases find(Aliases Aliases);

    public List<Aliases> queryByRoleId(int roleId);

    public boolean deleteAliase(Aliases aliases);
}
