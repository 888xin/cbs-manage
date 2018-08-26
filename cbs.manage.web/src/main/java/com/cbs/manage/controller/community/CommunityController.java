//package com.cbs.manage.controller.community;
//
//import com.cbs.common.qiniu.QiniuFileUtil;
//import com.lifeix.community.common.response.DataResponse;
//import com.lifeix.community.common.response.DataResponseFormat;
//import com.lifeix.community.community.service.CommunityCategoryService;
//import com.lifeix.community.community.service.CommunityService;
//import com.lifeix.community.model.Category;
//import com.lifeix.community.model.Community;
//import com.lifeix.community.post.service.PostService;
//import com.lifeix.exception.L99ExceptionBase;
//import com.lifeix.exception.service.L99IllegalParamsException;
//import com.qiniu.api.auth.AuthException;
//import org.apache.commons.lang3.StringUtils;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.Iterator;
//import java.util.List;
//
///**
// * Created by neoyin on 16/2/25. 社区及分类管理
// */
//@Controller
//@RequestMapping("/community")
//public class CommunityController {
//
//    @Autowired
//    CommunityService communityService;
//    @Autowired
//    CommunityCategoryService communityCategoryService;
//
//    @Autowired
//    private PostService postService;
//
//    @RequestMapping("/list")
//    public String list(ModelMap map){
//
//        List<Community> communityList = communityService.findAllCommunity();
//        List<Category> categoryList = communityCategoryService.getCategories(null);
//
//        map.put("communityList",communityList);
//        map.put("categoryList",categoryList);
//
//        return "community/community_page";
//    }
//    @RequestMapping("/updateCommunity")
//    public String updateCommunity(String communityId,String communityName,HttpServletRequest request){
//        MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
//        MultipartFile icon = multiRequest.getFile("iconUrl");
//        MultipartFile bg = multiRequest.getFile("backgroundUrl");
//        String iconUrl =uploadImg(icon);
//        String bgUrl =uploadImg(bg);
//        try {
//            Community community = communityService.updateCommunity(communityId,communityName,iconUrl,bgUrl);
//
//            /**
//             * community 返回的是旧的对象，所以需要重新查询新数据
//             */
//            Community newCommunity = communityService.getCommunity(community.getId());
//            /**
//             * 更新Post列表中存储的Community
//             * 此处是一个耗时操作，以后需要优化
//             */
//            postService.updatePostCommunity(newCommunity);
//        } catch (L99IllegalParamsException e) {
//            e.printStackTrace();
//        } catch (L99ExceptionBase e) {
//            e.printStackTrace();
//        }
//
//        return "redirect:/community/list";
//    }
//
//    private String uploadImg(MultipartFile file){
//        String imgUrl = "";
//        if (file.getSize()>0){
//            try {
//                String imagename = file.getOriginalFilename();
//                String ext = imagename.substring(imagename.lastIndexOf(".")).toLowerCase();
//                String str = QiniuFileUtil.getInstance().uploadPhotoByInputStream(file.getInputStream(),ext,1,QiniuFileUtil.ImageCategory.COMMUNITY);
//                JSONObject object = new JSONObject(str);
//                imgUrl = object.getString("key");
//            } catch (AuthException e) {
//                e.printStackTrace();
//            } catch (IOException e) {
//                e.printStackTrace();
//            } catch (JSONException e) {
//                e.printStackTrace();
//            }
//
//        }
//        return imgUrl;
//    }
//
//
//    @RequestMapping("/addcommunity")
//    public String addCommunity(String communityName,Boolean recommend,HttpServletRequest request){
//
//        String iconUrl ="";String bgUrl ="";
//        MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
//        Iterator<String> iter = multiRequest.getFileNames();
//        int index =0;
//        while (iter.hasNext()){
//            MultipartFile file = multiRequest.getFile(iter.next());
//
//            if (file.getSize() > 0) {
//                String imagename = file.getOriginalFilename();
//                String ext = imagename.substring(imagename.lastIndexOf(".")).toLowerCase();
//                try {
//                    String str = QiniuFileUtil.getInstance().uploadPhotoByInputStream(file.getInputStream(),ext,1,QiniuFileUtil.ImageCategory.COMMUNITY);
//                    JSONObject object = new JSONObject(str);
//                    if (index ==0){
//                        iconUrl = object.getString("key");
//                    }else {
//                        bgUrl = object.getString("key");
//                    }
//                    index ++;
//
//                }catch (AuthException e) {
//                    e.printStackTrace();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                } catch (JSONException e) {
//                    e.printStackTrace();
//                }
//
//            }
//        }
//
//        try {
//             communityService.createCommuntiy(communityName,null,iconUrl,bgUrl,null,recommend);
//        } catch (L99IllegalParamsException e) {
//            e.printStackTrace();
//        }
//
//        return "redirect:/community/list";
//    }
//
//    @RequestMapping("/delcommunity")
//    @ResponseBody()
//    public void delCommunity(String communityId,HttpServletResponse response){
//        if (!StringUtils.isEmpty(communityId)){
//            try {
//                boolean flag =   communityService.removeCommunity(communityId);
//
//                DataResponse dataResponse = new DataResponse(flag);
//                response.getWriter().print(DataResponseFormat.response(dataResponse));
//            } catch (L99IllegalParamsException e) {
//                e.printStackTrace();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//    }
//    @RequestMapping("/category/changecategorybelong")
//    @ResponseBody()
//    public void changeCategoryBelong(String categoryId,Integer app,HttpServletResponse response){
//        if (!StringUtils.isEmpty(categoryId)){
//            try {
//                Category category = communityCategoryService.updateBelongApp(categoryId,app);
//                DataResponse dataResponse = new DataResponse(DataResponseFormat.response(category));
//                response.getWriter().print(DataResponseFormat.response(dataResponse));
//            } catch (IOException e) {
//                e.printStackTrace();
//            }catch (L99IllegalParamsException e1) {
//                e1.printStackTrace();
//            }
//        }
//    }
//
//    @RequestMapping("/changecommunitybelong")
//    @ResponseBody()
//    public void changeCommunityBelong(String communityId,Integer app,HttpServletResponse response){
//        if (!StringUtils.isEmpty(communityId)){
//            try {
//                Community category = communityService.updateBelongApp(communityId,app);
//                DataResponse dataResponse = new DataResponse(DataResponseFormat.response(category));
//                response.getWriter().print(DataResponseFormat.response(dataResponse));
//            } catch (IOException e) {
//                e.printStackTrace();
//            }catch (L99IllegalParamsException e1) {
//                e1.printStackTrace();
//            }
//        }
//    }
//
//    @RequestMapping("/addcategory")
//    @ResponseBody
//    public void updateCategory(String categoryId,String communityId,HttpServletResponse response){
//
//        if (!StringUtils.isEmpty(categoryId)&&!StringUtils.isEmpty(communityId)){
//            List<String> ids = new ArrayList<String>();
//            ids.add(communityId);
//
//            try {
//                boolean flag = communityCategoryService.addCommunityIds(categoryId,ids);
//                DataResponse dataResponse = new DataResponse(flag);
//                response.getWriter().print(DataResponseFormat.response(dataResponse));
//            } catch (IOException e) {
//                e.printStackTrace();
//            }catch (L99IllegalParamsException e1) {
//                e1.printStackTrace();
//            }
//        }
//    }
//
//    @RequestMapping("/recommend")
//    @ResponseBody
//    public void recommend(String communityId,Boolean recommend,HttpServletResponse response){
//
//        try {
//            boolean flag = communityService.recommendCommunity(communityId,recommend);
//            DataResponse dataResponse = new DataResponse(flag);
//            response.getWriter().print(DataResponseFormat.response(dataResponse));
//        } catch (L99IllegalParamsException e1) {
//            e1.printStackTrace();
//        } catch (IOException e1) {
//            e1.printStackTrace();
//        }
//    }
//
//
//
//
//    @RequestMapping(value = "/category/changeindex",method = RequestMethod.POST)
//    @ResponseBody
//    public void changeCategoryIndex(String categoryId,Integer indexId,HttpServletResponse response){
//        try {
//            Category category = communityCategoryService.updateIndex(categoryId,indexId);
//            DataResponse dataResponse = new DataResponse(category);
//
//            response.getWriter().print(DataResponseFormat.response(dataResponse));
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (L99IllegalParamsException e) {
//            e.printStackTrace();
//        }
//
//    }
//    @RequestMapping("/category/removecommunity")
//    @ResponseBody
//    public void removeCommunityFromCategory(String categoryId,String communityId,HttpServletResponse response){
//
//        List<String> ids = new ArrayList<String>();
//        ids.add(communityId);
//
//        try {
//            boolean flag = communityCategoryService.removeCommunityIds(categoryId,ids);
//            DataResponse dataResponse = new DataResponse(flag);
//            response.getWriter().print(DataResponseFormat.response(dataResponse));
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (L99IllegalParamsException e) {
//            e.printStackTrace();
//        }
//    }
//    @RequestMapping("/category/updatename")
//    @ResponseBody
//    public void updateCategoryName(String categoryId,String categoryName,HttpServletResponse response){
//
//        try {
//            Category category = communityCategoryService.updateName(categoryId,categoryName);
//            DataResponse dataResponse = new DataResponse(category);
//            response.getWriter().print(DataResponseFormat.response(dataResponse));
//        } catch (IOException e) {
//            e.printStackTrace();
//        } catch (L99IllegalParamsException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @RequestMapping("/category/add")
//    @ResponseBody
//    public void addCategory(String categoryName,Integer indexId,HttpServletResponse response){
//
//
//        try {
//            Category category = communityCategoryService.createCategory(categoryName,null,indexId);
//            DataResponse dataResponse = new DataResponse(category);
//            response.getWriter().print(DataResponseFormat.response(dataResponse));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }catch (L99IllegalParamsException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @RequestMapping("/category/del")
//    @ResponseBody
//    public void delCategory(String categoryId,HttpServletResponse response){
//
//        try {
//            boolean flag = communityCategoryService.removeCategory(categoryId);
//            DataResponse dataResponse = new DataResponse(flag);
//            response.getWriter().print(DataResponseFormat.response(dataResponse));
//        } catch (IOException e) {
//            e.printStackTrace();
//        }catch (L99IllegalParamsException e) {
//            e.printStackTrace();
//        }
//    }
//
//
//
//}
