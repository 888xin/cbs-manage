//package com.cbs.manage.controller.community;
//
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.HashMap;
//import java.util.Iterator;
//import java.util.List;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.json.JSONArray;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.util.CollectionUtils;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import com.cbs.common.qiniu.QiniuFileUtil;
//import com.cbs.common.user.LifeixUserManageApiUtil;
//import com.lifeix.community.comment.service.CommentService;
//import com.lifeix.community.community.service.CommunityService;
//import com.lifeix.community.model.Comment;
//import com.lifeix.community.model.Community;
//import com.lifeix.community.model.Page;
//import com.lifeix.community.model.Post;
//import com.lifeix.community.model.Reply;
//import com.lifeix.community.model.User;
//import com.lifeix.community.post.service.PostService;
//import com.lifeix.exception.L99ExceptionBase;
//import com.lifeix.exception.service.L99IllegalDataException;
//import com.lifeix.exception.service.L99IllegalParamsException;
//import com.lifeix.user.beans.account.AccountResponse;
//
///**
// * Created by zenggguangwei on 25-2-16 下午16:20
// *
// * @Description 举报管理
// */
//@Controller
//@RequestMapping("/community/posts")
//public class PostController {
//
//    private static Logger LOG = LoggerFactory.getLogger(PostController.class);
//
//    /**
//     * 配置文件中的马甲ID，以“，”分开
//     */
//    private static String USERID = null;
//
//    /**
//     * 一页显示的评论数目
//     */
//    private static final int PAGESIZE_COMMENT = 20;
//
//    /**
//     * 马甲账号
//     */
//    private List<User> users = new ArrayList<User>();
//
//    @Autowired
//    private PostService postService;
//
//    @Autowired
//    private CommunityService communityService;
//
//    @Autowired
//    private CommentService commentService;
//
//    /**
//     * 初始化马甲Id 在程序初始化的时候会调用此段代码
//     *
//     * @param userIds
//     */
//    public static void initUserIds(String userIds) {
//        USERID = userIds;
//        LOG.info("user ids = {} " + USERID);
//    }
//
//    /**
//     * 跳转到Post详情页面
//     *
//     * @param id
//     * @param page 评论的页码
//     * @param model
//     * @return
//     */
//    @RequestMapping("/detail/{id}")
//    public String detailpage(@PathVariable String id, Integer page, Model model) {
//        LOG.info("detailpage postId = {}  ,page = {} ", id, page);
//        Post post = getPost(id);
//        if (post == null) {
//            LOG.error("post is empty");
//            return "community/post_detail";
//        }
//        /**
//         * page = null 默认获取第一页数据
//         */
//        int pageNum = page == null ? 1 : page;
//        Long pageTotal = 0l;
//        try {
//            /**
//             * 评论总记录数
//             */
//            Long count = commentService.getCommentNum(id);
//            /**
//             * 计算总页数
//             */
//            pageTotal = (count + PAGESIZE_COMMENT - 1) / PAGESIZE_COMMENT;
//        } catch (L99IllegalDataException e) {
//            LOG.error(e.getMessage(), e);
//        }
//        model.addAttribute("post", post);
//        model.addAttribute("page", pageNum);
//        model.addAttribute("pageTotal", pageTotal);
//        model.addAttribute("comments", getComments(id, pageNum));
//        model.addAttribute("users", getUsers());
//        return "community/post_detail";
//    }
//
//    /**
//     * 跳转到Post列表页面
//     *
//     * @param model
//     * @return
//     */
//    @RequestMapping("/show")
//    public String show(Model model) {
//        /**
//         * 传入马甲
//         */
//        model.addAttribute("users", getUsers());
//        /**
//         * 传入社区
//         */
//        model.addAttribute("communities", getCommunities());
//        /**
//         * 传入用于添加Post的社区列表
//         */
//        Integer app = 0;
//        model.addAttribute("addCommunities", getCommunities(app));
//        return "community/post_page";
//    }
//
//    /**
//     * 跳转到回复列表页面，默认将所有的回复都加载到页面
//     *
//     * @param postId
//     * @param commentId
//     * @param page
//     * @param model
//     * @return
//     */
//    @RequestMapping("/showReplies")
//    public String showReplies(String postId, String commentId, Integer page, Model model) {
//        LOG.info("showReplies postId = {} ,commentId = {} ,page = {} ", postId, commentId, page);
//        model.addAttribute("postId", postId);
//        model.addAttribute("commentId", commentId);
//        /**
//         * 传入马甲
//         */
//        model.addAttribute("users", getUsers());
//        /**
//         * 传入回复列表，默认传入所有
//         */
//        model.addAttribute("replies", getReplys(postId, commentId, page, Integer.MAX_VALUE));
//        return "community/replies_page";
//    }
//
//    /**
//     * 添加Post：跳转到列表页
//     *
//     * @param startId
//     * @param status
//     * @param limit
//     * @return
//     */
//    @RequestMapping("/addPost")
//    @ResponseBody
//    public String addPost(String app, String communityId, String title, String content, String userId,
//            int mediaType, HttpServletRequest request) {
//        LOG.info("addPost app = {} ,communityid = {},title = {} ,content = {}, userId = {}", app, communityId,
//                title, content, userId);
//
//        String ERROR = "ERROR";
//        String SUCC = "SUCC";
//        String pageView = "redirect:/community/posts/show";
//        /**
//         * 加载图片
//         */
//        List<String> images = new ArrayList<String>();
//        try {
//            if (mediaType == 0) {// 图片类型
//                images = getImages(request);
//            }
//        } catch (Exception e1) {
//            LOG.error(e1.getMessage(), e1);
//            return ERROR;
//        }
//        List<String> videos = new ArrayList<String>();
//        String videoPreviewUrl = null;
//        try {
//            if (mediaType == 1) {
//                Post temp = getVideoInfo(request);
//                if (temp != null) {
//                    videos = temp.getVideos();
//                    videoPreviewUrl = temp.getVideoPreviewUrl();
//                }
//            }
//        } catch (Exception e1) {
//            LOG.error(e1.getMessage(), e1);
//            return ERROR;
//        }
//        User author = getUserFromCache(userId);
//        if (author == null) {
//            LOG.info("author is empty");
//            return ERROR;
//        }
//        Community community = getCommunityById(communityId);
//        if (community == null) {
//            LOG.info("community is empty");
//            return ERROR;
//        }
//        /**
//         * 创建
//         */
//        Post post = new Post();
//        post.setTitle(title);
//        post.setContent(content);
//        post.setImages(images);
//        post.setAuthor(author);
//        post.setCommunity(community);
//        post.setVideoPreviewUrl(videoPreviewUrl);
//        post.setVideos(videos);
//        post.setVideoTime(1);
//        try {
//            postService.insertPost(post);
//        } catch (L99ExceptionBase e) {
//            LOG.info("创建post失败 ");
//            LOG.error(e.getMessage(), e);
//            return ERROR;
//        }
//        /**
//         * 更新Commuity里面的post数目
//         */
//        try {
//            communityService.increasePostNum(communityId);
//        } catch (Exception e) {
//            LOG.error(e.getMessage(), e);
//        }
//        return SUCC;
//    }
//
//    /**
//     * 获取列表
//     *
//     * @param startId
//     * @param status
//     * @param limit
//     * @return
//     */
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> list(String id, Integer app, Integer status, Integer type, Boolean hot,
//            String communityId, Long authid, String title, String timeRange, Integer iDisplayStart,
//            Integer iDisplayLength, String orderBy, Model model) {
//        LOG.info(
//                "listPost id = {}, app = {},status = {} ,type = {} , hot = {} ,communityId = {} ,title = {} , iDisplayStart = {} , iDisplayLength = {},orderBy = {} ",
//                id, app, status, type, hot, communityId, title, iDisplayStart, iDisplayLength, orderBy);
//        /**
//         * 查单个Post
//         */
//        if (!StringUtils.isEmpty(id)) {
//            Post post = getPost(id);
//            if (post == null) {
//                return getPostsResult(200, null, new ArrayList<Post>(), 0, 0);
//            }
//            return getPostsResult(200, null, Arrays.asList(post), 1, 1);
//        }
//        /**
//         * 查多个Post
//         */
//        Page<Post> page = getPosts(app, status, type, hot, communityId, authid, title, timeRange,
//                iDisplayStart, iDisplayLength, orderBy);
//        return getPostsResult(200, null, page.getData(), page.getCount(), page.getCount());
//    }
//
//    @RequestMapping("/communities")
//    @ResponseBody
//    public Map<String, Object> listCommunities(Integer app) {
//        LOG.info("app = {} ", app);
//        List<Community> result = getCommunities(app);
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        outMap.put("code", 200);
//        outMap.put("communities", result);
//        return outMap;
//    }
//
//    private List<Community> getCommunities(Integer app) {
//        List<Community> communities = getCommunities();
//        if (CollectionUtils.isEmpty(communities)) {
//            return new ArrayList<Community>();
//        }
//        List<Community> result = new ArrayList<Community>();
//        for (Community community : communities) {
//            if (community.getBelongApp().intValue() == 99) {
//                result.add(community);
//            } else if (community.getBelongApp().intValue() == app) {
//                result.add(community);
//            }
//        }
//        return result;
//    }
//
//    /**
//     * 获得List的封装结果
//     *
//     * @param code
//     * @param msg
//     * @param posts
//     * @param iTotalDisplayRecords
//     * @param iTotalRecords
//     * @return
//     */
//    private Map<String, Object> getPostsResult(int code, String msg, List<Post> posts,
//            long iTotalDisplayRecords, long iTotalRecords) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        outMap.put("code", code);
//        outMap.put("msg", msg);
//        outMap.put("posts", posts);
//        // 符合条件的
//        outMap.put("iTotalDisplayRecords", iTotalDisplayRecords);
//        outMap.put("iTotalRecords", iTotalRecords);
//        return outMap;
//    }
//
//    /**
//     * 更新Hot 状态
//     *
//     * @param id
//     * @param hot
//     * @return
//     */
//    @RequestMapping("/hot")
//    @ResponseBody
//    public Map<String, Object> updateHot(String id, Integer hot) {
//        LOG.info("id = {} , hot = {} ", id, hot);
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        int code = 200;
//        String msg = null;
//        try {
//            postService.updatePostHot(id, hot != null && hot == 1);
//        } catch (L99ExceptionBase e) {
//            LOG.error(e.getMessage(), e);
//            code = 400;
//            msg = e.getMessage();
//        }
//        outMap.put("code", code);
//        outMap.put("msg", msg);
//        return outMap;
//    }
//
//    /**
//     * 更新Post类型
//     *
//     * @param id
//     * @param hot
//     * @return
//     */
//    @RequestMapping("/type")
//    @ResponseBody
//    public Map<String, Object> updateType(String id, Integer type) {
//        LOG.info("id = {} , type = {} ", id, type);
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        int code = 200;
//        String msg = null;
//        try {
//            postService.updatePostType(id, type);
//        } catch (L99ExceptionBase e) {
//            LOG.error(e.getMessage(), e);
//            code = 400;
//            msg = e.getMessage();
//        }
//        outMap.put("code", code);
//        outMap.put("msg", msg);
//        return outMap;
//    }
//
//    /**
//     * 删除
//     *
//     * @param id
//     * @param hot
//     * @return
//     */
//    @RequestMapping("/delete")
//    @ResponseBody
//    public Map<String, Object> delete(String id) {
//        LOG.info("id = {}", id);
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        int code = 200;
//        String msg = null;
//        try {
//            List<Post> posts = postService.deletePosts(Arrays.asList(id));
//            /**
//             */
//            if (!CollectionUtils.isEmpty(posts)) {
//                for (Post post : posts) {
//                    communityService.decreasePostNum(post.getCommunity().getId());
//                }
//            }
//        } catch (L99ExceptionBase e) {
//            LOG.error(e.getMessage(), e);
//            code = 400;
//            msg = e.getMessage();
//        }
//        outMap.put("code", code);
//        outMap.put("msg", msg);
//        return outMap;
//    }
//
//    /**
//     * 查询Posts
//     *
//     * @param status
//     * @param type
//     * @param hot
//     * @param communityId
//     * @param authid
//     * @param title
//     * @param timeRange
//     * @param iDisplayStart
//     * @param iDisplayLength
//     * @return
//     */
//    private Page<Post> getPosts(Integer app, Integer status, Integer type, Boolean hot, String communityId,
//            Long authid, String title, String timeRange, Integer iDisplayStart, Integer iDisplayLength,
//            String order_by) {
//        int page = iDisplayStart / iDisplayLength;
//        int limit = iDisplayLength;
//        boolean isAsc = false;
//        String orderBy = null;
//        if ("createtime_desc".equals(order_by)) {
//            orderBy = "createTime";
//            isAsc = false;
//        } else if ("createtime_asc".equals(order_by)) {
//            orderBy = "createTime";
//            isAsc = true;
//        } else if ("commenttime_asc".equals(order_by)) {
//            orderBy = "commentTime";
//            isAsc = true;
//        } else {
//            orderBy = "commentTime";
//            isAsc = false;
//        }
//        Long authorId = null;
//        Page<Post> postPage = new Page<Post>();
//        try {
//            postPage = postService.getPostPage(app, hot, type, authorId, communityId, status, title, page,
//                    limit, orderBy, isAsc);
//        } catch (L99ExceptionBase e) {
//            LOG.error(e.getMessage(), e);
//            postPage.setCount(0);
//            postPage.setData(new ArrayList<Post>());
//        }
//        return postPage;
//    }
//
//    @RequestMapping("/comments")
//    @ResponseBody
//    public Map<String, Object> getCommentsData(String postId, Integer page) {
//        LOG.info("postId = {},page = {}", postId, page);
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        outMap.put("code", 200);
//        outMap.put("comments", getComments(postId, page));
//        return outMap;
//    }
//
//    private List<Comment> getComments(String postId, Integer page) {
//        List<Comment> comments = new ArrayList<Comment>();
//        try {
//            comments = commentService.getCommentsByPostId(postId, page, 20, null, true);
//        } catch (L99IllegalDataException e) {
//            e.printStackTrace();
//        }
//        return comments;
//    }
//
//    @RequestMapping("/replies")
//    @ResponseBody
//    public Map<String, Object> getReplysData(String postId, String commentId, Integer page) {
//        LOG.info("postId = {}, commentId = {} ,page = {}", postId, commentId, page);
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        outMap.put("code", 200);
//        /**
//         * 传入所有回复
//         */
//        outMap.put("comments", getReplys(postId, commentId, page, Integer.MAX_VALUE));
//        return outMap;
//    }
//
//    @RequestMapping("/addComment")
//    public String addComment(String userId, String postId, String content, HttpServletRequest request) {
//        LOG.info("userId = {}, postId = {} , content = {} ", userId, postId, content);
//        Comment comment = new Comment();
//        comment.setPostId(postId);
//        User user = getUserFromCache(userId);
//        comment.setUser(user);
//        comment.setAuthorId(userId);
//        List<String> images = null;
//        try {
//            images = getImages(request);
//        } catch (Exception e) {
//            LOG.error(e.getMessage(), e);
//        }
//        comment.setImages(images);
//        comment.setContent(content);
//        try {
//            commentService.addComment(comment);
//        } catch (Exception e) {
//            LOG.error(e.getMessage(), e);
//        }
//        try {
//            postService.increasePostCommentNum(postId, 1);
//        } catch (Exception e) {
//            LOG.error(e.getMessage(), e);
//        }
//
//        return "redirect:/community/posts/detail/" + postId;
//    }
//
//    @RequestMapping("/addReply")
//    @ResponseBody
//    public Map<String, Object> addCommentReply(String postId, String userId, String toUserId,
//            String commentId, String replyId, String content) {
//        Reply reply = addReply(userId, toUserId, commentId, replyId, content);
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        outMap.put("code", 200);
//        outMap.put("reply", reply);
//        return outMap;
//    }
//
//    private Reply addReply(String userId, String toUserId, String commentId, String replyId, String content) {
//        LOG.info("userId = {}, toUserId = {} ,commentId = {} , replyId = {} ,content = {} ", userId, toUserId,
//                commentId, replyId, content);
//        Reply reply = new Reply();
//        reply.setCommentId(commentId);
//        reply.setContent(content);
//        /**
//         * 获得Target
//         */
//        User toUser = getUserById(toUserId);
//        reply.setToUser(toUser);
//        /**
//         * 获得发表者
//         */
//        User user = getUserFromCache(userId);
//        reply.setUser(user);
//        Reply result = null;
//        try {
//            result = commentService.addReplay(reply);
//        } catch (Exception e) {
//            LOG.error(e.getMessage(), e);
//        }
//        return result;
//    }
//
//    private User getUserById(String userId) {
//        List<AccountResponse> userResponse = null;
//        try {
//            userResponse = LifeixUserManageApiUtil.getInstance().findUserByIds(userId, "id", false);
//        } catch (Exception e) {
//            LOG.error(e.getMessage(), e);
//        }
//        if (CollectionUtils.isEmpty(userResponse)) {
//            return null;
//        }
//        AccountResponse response = userResponse.get(0);
//        User user = new User();
//        user.setAvatarUrl(response.getPhotoPath());
//        user.setId(response.getAccountId());
//        user.setNickname(response.getName());
//        return user;
//    }
//
//    private List<User> getUsers() {
//        /**
//         * 锁定users，保证不被初始化多遍
//         */
//        synchronized (users) {
//            // 已经初始化
//            if (!CollectionUtils.isEmpty(users)) {
//                return users;
//            }
//            // 配置未注入，或者注入错误
//            if (StringUtils.isEmpty(USERID)) {
//                return new ArrayList<User>();
//            }
//            try {
//                List<AccountResponse> userResponse = LifeixUserManageApiUtil.getInstance()
//                        .findUserByIds(USERID, "id", false);
//                if (CollectionUtils.isEmpty(userResponse)) {
//                    return users;
//                }
//                for (AccountResponse response : userResponse) {
//                    User user = new User();
//                    user.setAvatarUrl(response.getPhotoPath());
//                    user.setId(response.getAccountId());
//                    user.setNickname(response.getName());
//                    users.add(user);
//                }
//                LOG.info("users ->" + users);
//            } catch (Exception e) {
//                LOG.error(e.getMessage(), e);
//            }
//        }
//        return users;
//    }
//
//    /**
//     * 从当前用户列表中获取用户
//     *
//     * @param userId
//     * @return
//     */
//    private User getUserFromCache(String userId) {
//        if (StringUtils.isEmpty(userId)) {
//            return null;
//        }
//        synchronized (users) {
//            for (User user : users) {
//                if (userId.equals(String.valueOf(user.getId()))) {
//                    return user;
//                }
//            }
//        }
//        return null;
//    }
//
//    /**
//     * 获取社区
//     *
//     * @param communityId
//     * @return
//     */
//    private Community getCommunityById(String communityId) {
//        if (StringUtils.isEmpty(communityId)) {
//            return null;
//        }
//        try {
//            return communityService.getCommunity(communityId);
//        } catch (L99IllegalParamsException e) {
//            LOG.info("获取社区失败 ");
//            LOG.error(e.getMessage(), e);
//        }
//        return null;
//    }
//
//    /**
//     * 获得社区列表
//     *
//     * @return
//     */
//    public List<Community> getCommunities() {
//        List<Community> communities = communityService.findAllCommunity();
//        return communities;
//    }
//
//    private List<String> getImages(HttpServletRequest request) throws Exception {
//        MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
//        List<String> images = new ArrayList<String>();
//        List<MultipartFile> files = multiRequest.getFiles("post_add_files");
//        Iterator<MultipartFile> iterator = files.iterator();
//        while (iterator.hasNext()) {
//            MultipartFile file = iterator.next();
//            if (file.getSize() > 0) {
//                String imagename = file.getOriginalFilename();
//                // 跳过空文件
//                if (StringUtils.isEmpty(imagename)) {
//                    continue;
//                }
//                String ext = imagename.substring(imagename.lastIndexOf(".")).toLowerCase();
//                String str = QiniuFileUtil.getInstance().uploadPhotoByInputStream(file.getInputStream(), ext,
//                        1, QiniuFileUtil.ImageCategory.COMMUNITY);
//                JSONObject object = new JSONObject(str);
//                String image = object.getString("key");
//                if (!StringUtils.isEmpty(image)) {
//                    images.add(image);
//                }
//            }
//        }
//        return images;
//    }
//
//    private Post getVideoInfo(HttpServletRequest request) throws Exception {
//        MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
//        Iterator<String> iter = multiRequest.getFileNames();
//        String videoFilePath = null;
//        String videoPreviewImagePath = null;
//        while (iter.hasNext()) {
//            String next = iter.next();
//            MultipartFile file = multiRequest.getFile(next);
//            String imagename = file.getOriginalFilename();
//            // 跳过空文件
//            if (StringUtils.isEmpty(imagename)) {
//                continue;
//            }
//            if ("videoFile".equals(next)) {
//                videoFilePath = uploadFiletoQiniu(file);
//            }
//            if ("videoPreviewFile".equals(next)) {
//                String ext = imagename.substring(imagename.lastIndexOf(".")).toLowerCase();
//                String str = QiniuFileUtil.getInstance().uploadPhotoByInputStream(file.getInputStream(), ext,
//                        1, QiniuFileUtil.ImageCategory.COMMUNITY);
//                JSONObject object = new JSONObject(str);
//                videoPreviewImagePath = object.getString("key");
//            }
//        }
//
//        if (StringUtils.isEmpty(videoFilePath)) {
//            return null;
//        }
//
//        /**
//         * 采用Jave获得时长在Linux上不可行，改成ops传入
//         */
//        // String url = "http://7xl7ku.com2.z0.glb.qiniucdn.com/" + videoFilePath;
//        // int videoTime = VideoUtil.getDuration(url);
//        /**
//         * 创建预览图
//         */
//        // String fops = "vframe/jpg/offset/2/w/250/h/200";
//        // String vframeToken = VideoUtil.getVToken(filepath, fops);
//        // String previewImageUrl = QiniuFileUtil.getInstance().getVideoFrame(vframeToken, filepath,
//        // fops);
//        /**
//         * 组装
//         */
//        Post post = new Post();
//        post.setVideoPreviewUrl(videoPreviewImagePath);
//        post.setVideos(Arrays.asList(videoFilePath));
//        return post;
//    }
//
//    private String uploadFiletoQiniu(MultipartFile file) throws Exception {
//        String token = null;
//        String imagename = file.getOriginalFilename();
//        int mimeType = getMediaType(imagename);// 视频文件的类型
//        String tokenStr = QiniuFileUtil.getInstance().getToken(1, mimeType);
//        LOG.info("uploadFiletoQiniu - > tokenStr" + tokenStr);
//        JSONObject jsonObject = new JSONObject(tokenStr);
//        int code = jsonObject.optInt("code");
//        String fileKey = null;
//        if (code == 200) {
//            // 获得Token
//            String data = jsonObject.optString("data");
//            JSONObject jsonData = new JSONObject(data);
//            token = jsonData.optString("token");
//            // 获得文件
//            JSONArray jsonArray = jsonData.optJSONArray("keys");
//            String key = (String) jsonArray.get(0);
//            fileKey = VideoUtil.replaceVideoFileName(mimeType, key);
//        } else {
//            return null;
//        }
//        String str = VideoUtil.uploadFile(token, QiniuFileUtil.ImageCategory.COMMUNITY, fileKey,
//                file.getInputStream());
//        JSONObject json = new JSONObject(str);
//        return json.getString("key");
//    }
//
//    private int getMediaType(String imagename) {
//        String ext = imagename.substring(imagename.lastIndexOf(".")).toLowerCase();
//        int extInt = 0;
//        if (ext.equals(".png")) {
//            extInt = 1;
//        } else if (ext.equals(".gif")) {
//            extInt = 2;
//        } else if (ext.equals(".bmp")) {
//            extInt = 4;
//        } else if (ext.equals(".jpe")) {
//            extInt = 5;
//        } else if (ext.equals(".mp4")) {
//            extInt = 6;
//        } else if (ext.equals(".flv")) {
//            extInt = 7;
//        } else if (ext.equals(".avi")) {
//            extInt = 8;
//        }
//        return extInt;
//    }
//
//    /**
//     * 获取回复
//     *
//     * @param postId
//     * @param commentId
//     * @param page
//     * @param size
//     * @return
//     */
//    private List<Reply> getReplys(String postId, String commentId, Integer page, Integer size) {
//        try {
//            List<Reply> moreReplies = commentService.getMoreReplies(commentId, page, size);
//            return moreReplies;
//        } catch (L99IllegalDataException e) {
//            LOG.error(e.getMessage(), e);
//        }
//        return null;
//    }
//
//    /**
//     * 获取Post
//     *
//     * @param id
//     * @return
//     */
//    private Post getPost(String id) {
//        try {
//            return postService.getPost(id);
//        } catch (L99ExceptionBase e) {
//            LOG.error(e.getMessage(), e);
//        }
//        return null;
//    }
//
//}
