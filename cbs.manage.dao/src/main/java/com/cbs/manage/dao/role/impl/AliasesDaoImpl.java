package com.cbs.manage.dao.role.impl;

import com.cbs.manage.dao.base.impl.BaseDaoImpl;
import com.cbs.manage.dao.role.AliasesDao;
import com.cbs.manage.dto.role.Aliases;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by lhx on 15-9-30 上午10:02
 *
 * @Description
 */
@Repository("aliasesDao")
public class AliasesDaoImpl extends BaseDaoImpl<Aliases> implements AliasesDao {

    @Override
    public Aliases find(Aliases aliases) {
        return getSqlSession().selectOne("aliases.find",aliases);
    }

    @Override
    public List<Aliases> queryByRoleId(int roleId) {
        return getSqlSession().selectList("aliases.queryByRoleId", roleId);
    }

    @Override
    public boolean deleteAliase(Aliases aliases) {
        return getSqlSession().delete("aliases.deleteAliase", aliases) > 0;
    }
}
