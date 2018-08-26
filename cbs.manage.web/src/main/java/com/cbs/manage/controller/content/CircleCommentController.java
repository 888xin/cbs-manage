//package com.cbs.manage.controller.content;
//
//import java.io.IOException;
//
//import javax.servlet.http.HttpServletResponse;
//
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.cbs.manage.util.CbsOtherApiUtil;
//
///**
// * 猜友圈评论
// *
// * @author jacky
// *
// */
//@Controller
//@RequestMapping("/circlecomment")
//public class CircleCommentController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(CircleCommentController.class);
//
//    // 跳转评论管理列表页面
//    @RequestMapping("/show")
//    public String show() {
//	return "content/comment_page";
//    }
//
//    @RequestMapping("/list")
//    @ResponseBody
//    public void list(Long userId, Long endId, Integer limit, HttpServletResponse response) {
//	JSONObject ret = null;
//	try {
//	    ret = CbsOtherApiUtil.getInstance().getCircleCommentList(userId, endId, limit);
//	    response.getWriter().print(ret.toString());
//	} catch (IOException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//
//    }
//
//    @RequestMapping("/shield")
//    @ResponseBody
//    public void shield(String ids, HttpServletResponse response) {
//	JSONObject ret = null;
//	ret = CbsOtherApiUtil.getInstance().shiedlCircleComment(ids);
//	try {
//	    response.getWriter().print(ret.toString());
//	} catch (IOException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//    }
//
//}
