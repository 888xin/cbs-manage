package com.cbs.manage.dao.im.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.cbs.manage.dao.base.impl.BaseDaoImpl;
import com.cbs.manage.dao.im.ImUserBlockDao;
import com.cbs.manage.dto.im.ImUserBlock;

/**
 * 
 * @author lifeix
 * 
 */
@Repository("imUserBlockDao")
public class ImUserBlockDaoImpl extends BaseDaoImpl<ImUserBlock> implements ImUserBlockDao {

    @Override
    public List<ImUserBlock> findImUserBlocks(Integer blockStatu, Long startId, int limit ,String nowDate) {
	Map<String, Object> params = new HashMap<String, Object>();
	params.put("blockStatu", blockStatu);
	if (startId != null) {
	    params.put("startId", startId);
	}
	params.put("removeTime", nowDate);
	params.put("limit", limit);
	return getSqlSession().selectList("imUserBlock.findImUserBlocks", params);
    }

    @Override
    public ImUserBlock selectById(long id, String nowDate) {
	Map<String, Object> params = new HashMap<String, Object>();
	params.put("userId", id);
	params.put("removeTime", nowDate);
	ImUserBlock imUserBlock = getSqlSession().selectOne("imUserBlock.getById", params);
	return imUserBlock;
    }

    @Override
    public boolean deleteByUserId(Long userId) {
	return getSqlSession().delete("imUserBlock.deleteById", userId) > 0;
    }

    @Override
    public Boolean insert(ImUserBlock imUserBlock) {
	return getSqlSession().insert("imUserBlock.add", imUserBlock) > 0;
    }
}
