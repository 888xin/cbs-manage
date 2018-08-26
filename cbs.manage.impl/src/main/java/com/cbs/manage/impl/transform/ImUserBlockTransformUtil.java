//package com.cbs.manage.impl.transform;
//
//import java.text.DateFormat;
//import java.text.SimpleDateFormat;
//
//import com.cbs.manage.bean.im.ImUserBlockResponse;
//import com.cbs.manage.dto.im.ImUserBlock;
//
//public class ImUserBlockTransformUtil {
//    private static final DateFormat dateTimeformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//
//
//    /**
//     * 用户im屏蔽信息
//     * @param imUserBlock
//     * @return
//     */
//    public static ImUserBlockResponse transformImUserBlock(ImUserBlock imUserBlock) {
//	ImUserBlockResponse resp = null;
//	if (imUserBlock != null) {
//	    resp = new ImUserBlockResponse();
//	    resp.setBlock_statu(imUserBlock.getBlockStatu());
//	    resp.setCreate_time(imUserBlock.getCreateTime());
//	    resp.setUser_id(imUserBlock.getUserId());
//	    resp.setUser_name(imUserBlock.getUserName());
//	    resp.setUser_no(imUserBlock.getUserNo());
//	    resp.setUser_path(imUserBlock.getUserPath());
//	    resp.setRemove_time(dateTimeformat.format(imUserBlock.getRemoveTime()));
//	}
//	return resp;
//    }
//}
