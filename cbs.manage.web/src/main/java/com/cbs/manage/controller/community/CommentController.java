//package com.cbs.manage.controller.community;
//
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.Map;
//
//import javax.annotation.Resource;
//import javax.servlet.http.HttpServletRequest;
//
//import org.apache.commons.lang.StringUtils;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.lifeix.community.comment.service.CommentService;
//import com.lifeix.community.model.Comment;
//import com.lifeix.community.model.Page;
//import com.lifeix.exception.service.L99IllegalDataException;
//
///**
// * Created by gcc on 25-2-16 下午16:20
// *
// * @Description 评论管理
// */
//@Controller
//@RequestMapping("/community/comments")
//public class CommentController {
//    protected static Logger logger = LoggerFactory.getLogger(CommentController.class);
//
//    @Resource(name = "commentService")
//    private CommentService commentService;
//
//    // 跳转到列表页面
//    @RequestMapping("/show")
//    public String show() {
//        return "community/comment_page";
//    }
//
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> queryPostsByPage(String userId, String postId, String commentId,
//            String orderItem, HttpServletRequest request) {
//        orderItem = StringUtils.isBlank(orderItem) ? null : orderItem;
//        // 组装comment
//        Comment comment = new Comment();
//        comment.setUserId(StringUtils.isBlank(userId) ? null : userId);
//        comment.setPostId(StringUtils.isBlank(postId) ? null : postId);
//        comment.setId(StringUtils.isBlank(commentId) ? null : commentId);
//        // 避免出现使用空的replies作为查询条件
//        comment.setReplies(null);
//        int iDisplayStart = Integer.parseInt(request.getParameter("iDisplayStart"));
//        int iDisplayLength = Integer.parseInt(request.getParameter("iDisplayLength"));
//        int pageNo = iDisplayStart / iDisplayLength + 1;
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        Page<Comment> commentsPage = null;
//        try {
//            commentsPage = commentService.getCommentsPage(comment, pageNo, iDisplayLength, orderItem);
//        } catch (L99IllegalDataException e) {
//            logger.error(e.getMessage(), e);
//        }
//        if (commentsPage != null) {
//            outMap.put("comments", commentsPage.getData());
//            int number = (int) commentsPage.getCount();
//            outMap.put("iTotalRecords", number);
//            outMap.put("iTotalDisplayRecords", number);
//            outMap.put("number", commentsPage.getData().size());
//            outMap.put("msg", "get data success");
//            outMap.put("code", 200);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//            outMap.put("code", 10001);
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/detail")
//    @ResponseBody
//    public Map<String, Object> getComment(String commentId) {
//        // 组装comment
//        Comment comment = new Comment();
//        comment.setId(StringUtils.isBlank(commentId) ? null : commentId);
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        try {
//            comment = commentService.getCommentWithReplies(commentId);
//        } catch (L99IllegalDataException e) {
//            logger.error(e.getMessage(), e);
//        }
//        if (comment != null) {
//            outMap.put("comment", comment);
//            outMap.put("msg", "get data success");
//            outMap.put("code", 200);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//            outMap.put("code", 10001);
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/deactive")
//    @ResponseBody
//    public String deactiveComments(String commentIds) {
//        try {
//            commentService.deactiveCommentStatus(Arrays.asList(commentIds.split(",")));
//            return "success";
//        } catch (Exception e) {
//            logger.error(e.getMessage(), e);
//            return "failed";
//        }
//    }
//
//}
