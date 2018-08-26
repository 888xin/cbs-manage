//package com.cbs.manage.impl.im;
//
//import java.text.DateFormat;
//import java.text.SimpleDateFormat;
//import java.util.ArrayList;
//import java.util.Calendar;
//import java.util.Date;
//import java.util.List;
//
//import org.json.JSONException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.cbs.common.user.LifeixUserManageApiUtil;
//import com.cbs.common.util.ParamemeterAssert;
//import com.cbs.manage.bean.im.ImUserBlockResponse;
//import com.cbs.manage.dao.im.ImUserBlockDao;
//import com.cbs.manage.dto.im.ImUserBlock;
//import com.cbs.manage.impl.transform.ImUserBlockTransformUtil;
//import com.cbs.manage.service.im.ImUserBlockService;
//import com.lifeix.cbs.api.common.exception.MsgCode.BasicMsg;
//import com.lifeix.exception.service.L99IllegalParamsException;
//import com.lifeix.exception.service.L99NetworkException;
//import com.lifeix.user.beans.account.AccountResponse;
//
///**
// *
// * @author lifeix
// *
// */
//@Service("imUserBlockService")
//public class ImUserBlockServiceImpl implements ImUserBlockService {
//
//    private static final DateFormat dateTimeformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//
//
//    @Autowired
//    private ImUserBlockDao imUserBlockDao;
//
//    @Override
//    public List<ImUserBlockResponse> findImUserBlocks(Integer blockStatu, Long startId, int limit) {
//	String nowDate = dateTimeformat.format(new Date().getTime());
//	List<ImUserBlock> blocks = imUserBlockDao.findImUserBlocks(blockStatu, startId, limit ,nowDate);
//
//	List<ImUserBlockResponse> blockRes = new ArrayList<ImUserBlockResponse>();
//	for (ImUserBlock block : blocks) {
//	    blockRes.add(ImUserBlockTransformUtil.transformImUserBlock(block));
//	}
//	return blockRes;
//    }
//
//    @Override
//    public ImUserBlockResponse selectById(long id) {
//	String nowDate = dateTimeformat.format(new Date().getTime());
//	ImUserBlock imUserBlock = imUserBlockDao.selectById(id ,nowDate);
//	ImUserBlockResponse imUserBlockResponse = ImUserBlockTransformUtil.transformImUserBlock(imUserBlock);
//	return imUserBlockResponse;
//    }
//
//    @Override
//    public boolean deleteByUserId(Long userId) {
//	return imUserBlockDao.deleteByUserId(userId);
//    }
//
//    /**
//     * 持续时间
//     * @param level (0 禁言 1 屏蔽)
//     * @param userId
//     * @param lastTime
//     *            秒
//     * @return
//     * @throws L99IllegalParamsException
//     * @throws JSONException
//     * @throws L99NetworkException
//     */
//    public Boolean insert(Long userId, Long lastTime ,Integer level) throws L99IllegalParamsException,JSONException, L99NetworkException {
//	ParamemeterAssert.assertDataNotNull(userId, lastTime);
//	if(level!=1&&level!=2){
//	    throw new L99IllegalParamsException(BasicMsg.CODE_PARAMEMETER, BasicMsg.KEY_PARAMEMETER);
//	}
//	//对接口和db的差别进行转换
//	if(level==1){
//	    level = 0;
//	}else if(level==2){
//	    level = 1;
//	}
//	Date date = new Date();
//	ImUserBlock imUserBlock = new ImUserBlock();
//	if (lastTime != 0) {
//	    Calendar cal = Calendar.getInstance();
//	    cal.setTime(date);
//	    cal.add(Calendar.SECOND, Integer.valueOf(String.valueOf(lastTime)));
//	    Date removeTime = cal.getTime();
//	    imUserBlock.setRemoveTime(removeTime);
//	}else{
//	    Calendar cal = Calendar.getInstance();
//	    cal.setTime(date);
//	    cal.add(Calendar.YEAR, 1000);//一千年，等于永久
//	    Date removeTime = cal.getTime();
//	    imUserBlock.setRemoveTime(removeTime);
//	}
//	//获取用户信息,如果抛出异常，说明用户已经被屏蔽或不存在
//
//	AccountResponse accountResponse = null;
//
//	accountResponse = LifeixUserManageApiUtil.getInstance().findUser(userId+"", "id", false);
//
//
//	imUserBlock.setUserName(accountResponse.getName());
//	imUserBlock.setUserPath(accountResponse.getPhotoPath());
//	imUserBlock.setUserNo(accountResponse.getLongNO());
//	imUserBlock.setBlockStatu(level);
//	imUserBlock.setUserId(userId);
//	imUserBlock.setCreateTime(date.getTime() / 1000);
//	deleteByUserId(userId);
//	return imUserBlockDao.insert(imUserBlock);
//    }
//
//}
