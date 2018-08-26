package com.cbs.manage.service.im;

import java.util.List;

import org.json.JSONException;

import com.cbs.manage.bean.im.ImUserBlockResponse;
import com.lifeix.exception.service.L99IllegalParamsException;
import com.lifeix.exception.service.L99NetworkException;

/**
 * 
 * @author lifeix
 * 
 */
public interface ImUserBlockService {

    /**
     * 查询im用户举报列表
     * 
     * @param blockStatu
     * @param startId
     * @param limit
     * @return
     */
    public List<ImUserBlockResponse> findImUserBlocks(Integer blockStatu, Long startId, int limit);
    /**
     * 获取用户屏蔽信息
     * @param id
     * @return
     */
    public ImUserBlockResponse selectById(long id);
    /**
     * 删除用户屏蔽信息
     * @param userId
     * @return
     */
    public boolean deleteByUserId(Long userId);
    /**
     * 添加用户屏蔽信息
     * @param userId
     * @param lastTime
     * @return
     * @throws L99IllegalParamsException
     * @throws JSONException 
     * @throws L99NetworkException 
     */
    public Boolean insert(Long userId, Long lastTime,Integer level) throws L99IllegalParamsException, L99NetworkException, JSONException; 

}
