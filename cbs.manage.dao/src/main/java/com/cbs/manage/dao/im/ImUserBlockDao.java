package com.cbs.manage.dao.im;

import java.util.List;

import com.cbs.manage.dao.base.BaseDao;
import com.cbs.manage.dto.im.ImUserBlock;

/**
 * 
 * @author lifeix
 * 
 */
public interface ImUserBlockDao extends BaseDao<ImUserBlock> {

    /**
     * 查询im用户举报列表
     * 
     * @param blockStatu
     * @param startId
     * @param limit
     * @return
     */
    public List<ImUserBlock> findImUserBlocks(Integer blockStatu, Long startId, int limit,String nowDate);
    /**
     * 根据用户id获取用户屏蔽禁言信息
     * @param id
     * @return
     */
    public ImUserBlock selectById(long id,String nowDate);
    /**
     * 根据userId删除屏蔽信息
     * @param userId
     * @return
     */
    public boolean deleteByUserId(Long userId);
    /**
     * 添加屏蔽用户信息
     * @param imUserBlock
     * @return
     */
    public Boolean insert(ImUserBlock imUserBlock);

}
