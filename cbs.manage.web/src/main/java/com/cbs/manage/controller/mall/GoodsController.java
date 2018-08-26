//package com.cbs.manage.controller.mall;
//
//import com.cbs.common.qiniu.QiniuFileUtil;
//import com.cbs.manage.util.CbsMallApiUtil;
//import com.google.gson.Gson;
//import com.lifeix.cbs.mall.bean.goods.MallCategoryListResponse;
//import com.lifeix.cbs.mall.bean.goods.MallCategoryResponse;
//import com.lifeix.cbs.mall.bean.goods.MallGoodsListResponse;
//import com.lifeix.cbs.mall.bean.goods.MallGoodsResponse;
//import com.qiniu.api.auth.AuthException;
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.util.StringUtils;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.multipart.MultipartFile;
//import org.springframework.web.multipart.MultipartHttpServletRequest;
//import sun.misc.BASE64Decoder;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.ByteArrayInputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.HashMap;
//import java.util.Iterator;
//import java.util.List;
//import java.util.Map;
//
///**
// * Created by lhx on 16-3-28 下午2:40
// *
// * @Description 商城商品
// */
//@Controller
//@RequestMapping("/goods")
//public class GoodsController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(GoodsController.class);
//
//    // 跳转到商品列表页面
//    @RequestMapping("/show")
//    public String show() {
//        return "goods/goods_list";
//    }
//
//    /**
//     * 获取商品列表
//     *
//     * @param startId
//     * @param status
//     * @param limit
//     * @return
//     */
//    @RequestMapping("/list")
//    @ResponseBody
//    public Map<String, Object> list(Integer startId, Integer status, Integer limit, Integer category) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().getGoodsInfo(startId, status, limit, category);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                MallGoodsListResponse mallGoodsListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    mallGoodsListResponse = new Gson().fromJson(data, MallGoodsListResponse.class);
//                }
//                int num = 0;
//                if (mallGoodsListResponse != null) {
//                    List<MallGoodsResponse> goodsResponseList = mallGoodsListResponse.getGoods_list();
//                    num = goodsResponseList.size();
//                    outMap.put("goodsList", goodsResponseList);
//                }
//                outMap.put("number", num);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 添加商品图片
//     *
//     * @param request
//     * @param response
//     * @throws org.json.JSONException
//     * @throws java.io.IOException
//     */
//    @RequestMapping("/add/image")
//    public void addImage(HttpServletRequest request, HttpServletResponse response) throws JSONException, IOException {
//        // 是否成功上传了文件
//        boolean flag = false;
//        // 成功上传了n个图像
//        int imageNum = 0;
//        JSONObject jsonObject = null;
//        MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
//        Iterator<String> iter = multiRequest.getFileNames();
//        while (iter.hasNext()) {
//            MultipartFile file = multiRequest.getFile(iter.next());
//            // 有上传文件的话，容量是大于0的。
//            if (file.getSize() > 0) {
//                String imagename = file.getOriginalFilename();
//                String ext = imagename.substring(imagename.lastIndexOf(".")).toLowerCase();
//                // 文件名为：系统时间 + 后缀
//                // String fileName = System.currentTimeMillis() + ext;
//                try {
//                    // File uploadFile = new File(fileName);
//                    // file.transferTo(uploadFile);
//                    // 上传到七牛云
//                    String str = QiniuFileUtil.getInstance().uploadPhotoByInputStream(file.getInputStream(), ext, 1,
//                            QiniuFileUtil.ImageCategory.GOODS);
//                    jsonObject = new JSONObject(str);
//                    imageNum++;
//                    flag = true;
//                    jsonObject.put("image_num", imageNum);
//                } catch (AuthException e) {
//                    jsonObject = new JSONObject();
//                    jsonObject.put("msg", "上传照片出现异常：" + e.getMessage());
//                    LOG.error(e.getMessage(), e);
//                } catch (IOException e) {
//                    jsonObject = new JSONObject();
//                    jsonObject.put("msg", "上传照片出现异常：" + e.getMessage());
//                    LOG.error(e.getMessage(), e);
//                }
//            } else {
//                jsonObject = new JSONObject();
//                jsonObject.put("msg", "上传照片照片无内容！");
//            }
//            jsonObject.put("flag", flag);
//        }
//        response.getWriter().print(jsonObject.toString());
//    }
//
//    /**
//     * 编辑接口（包括添加）
//     *
//     * @param goodsResponse
//     * @return
//     */
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> edit(MallGoodsResponse goodsResponse) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().editGoods(goodsResponse);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                String data = ret.optString("data");
//                if (goodsResponse.getId() == null) {
//                    // 添加操作
//                    MallGoodsResponse goodsResponseReturn;
//                    if (!StringUtils.isEmpty(data)) {
//                        goodsResponseReturn = new Gson().fromJson(data, MallGoodsResponse.class);
//                        outMap.put("goods", goodsResponseReturn);
//                    }
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/view")
//    @ResponseBody
//    public Map<String, Object> view(Integer goodsId) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().viewGoodsInfo(goodsId);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                MallGoodsResponse goodsResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    goodsResponse = new Gson().fromJson(data, MallGoodsResponse.class);
//                }
//                outMap.put("goods", goodsResponse);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/edit/image")
//    @ResponseBody
//    public Map<String, Object> editImage(String thumb) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        boolean flag = false;
//        // base64解码
//        BASE64Decoder decoder = new BASE64Decoder();
//        thumb = thumb.substring(22, thumb.length());
//        byte[] decoderBytes = new byte[0];
//        try {
//            decoderBytes = decoder.decodeBuffer(thumb);
//        } catch (IOException e) {
//            LOG.error(e.getMessage(), e);
//        }
//        // 上传到七牛云
//
//        // 文件名为：系统时间 + 后缀
//        // String fileName = System.currentTimeMillis() + ".png" ;
//        InputStream inputStream = null;
//        try {
//            inputStream = new ByteArrayInputStream(decoderBytes);
//            String str = QiniuFileUtil.getInstance().uploadPhotoByInputStream(inputStream, ".png", 1,
//                    QiniuFileUtil.ImageCategory.GOODS);
//            JSONObject jsonObject = new JSONObject(str);
//            String imageUrl = jsonObject.optString("key");
//            // if (imageUrl != null){
//            // //删除旧照片
//            // QiniuFileUtil.getInstance().deletePhotoByFile(oldPath);
//            // }
//            outMap.put("imageUrl", imageUrl);
//            flag = true;
//        } catch (AuthException e) {
//            LOG.error(e.getMessage(), e);
//        } catch (JSONException e) {
//            LOG.error(e.getMessage(), e);
//        }
//
//        outMap.put("flag", flag);
//        return outMap;
//
//    }
//
//    /**
//     * 删除商品
//     *
//     * @param goodsId
//     * @return
//     */
//    @RequestMapping("/delete")
//    @ResponseBody
//    public Map<String, Object> delete(Integer goodsId) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().deleteGoods(goodsId);
//        if (ret != null) {
//            outMap.put("msg", ret.optString("msg"));
//            outMap.put("code", ret.optInt("code"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 商品置顶照片
//     */
////    @RequestMapping("/queue")
////    @ResponseBody
////    public Map<String, Object> queue(Integer goodsId, String path) {
////        Map<String, Object> outMap = new HashMap<String, Object>();
////        JSONObject ret = CbsMallApiUtil.getInstance().queueGoods(goodsId, path);
////        if (ret != null) {
////            outMap.put("msg", ret.optString("msg"));
////            outMap.put("code", ret.optInt("code"));
////        } else {
////            outMap.put("msg", "服务器端无数据返回！");
////        }
////        return outMap;
////    }
//
//    // 跳转到添加商品内容图片跳出页面
//    @RequestMapping("/editor/image")
//    public String image() {
//        return "goods/editor_image";
//    }
//
//
//    // 跳转到商品添加页面
//    @RequestMapping("/show/add")
//    public String showAdd() {
//        return "goods/goods_add";
//    }
//
////    @RequestMapping("/save/category")
////    @ResponseBody
////    public Map<String, Object> saveCategory(String name, String path, String descr, Integer sortIndex) {
////        Map<String, Object> outMap = new HashMap<String, Object>();
////        JSONObject ret = CbsMallApiUtil.getInstance().saveCategory(null, name, path, descr, sortIndex);
////        if (ret != null) {
////            int code = ret.optInt("code");
////            if (code == 200) {
////                MallCategoryResponse mallCategoryResponse = null;
////                String data = ret.optString("data");
////                if (!StringUtils.isEmpty(data)) {
////                    mallCategoryResponse = new Gson().fromJson(data, MallCategoryResponse.class);
////                }
////                outMap.put("category", mallCategoryResponse);
////            } else {
////                outMap.put("msg", ret.optString("msg"));
////            }
////            outMap.put("code", code);
////        } else {
////            outMap.put("msg", "服务器端无数据返回！");
////        }
////        return outMap;
////    }
//
//    @RequestMapping("/get/spec")
//    @ResponseBody
//    public Map<String, Object> getSpecifications(String key) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().getSpec(key);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                MallGoodsResponse goodsResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    goodsResponse = new Gson().fromJson(data, MallGoodsResponse.class);
//                }
//                if (goodsResponse != null) {
//                    outMap.put("values", goodsResponse.getSpec_values());
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/save/spec")
//    @ResponseBody
//    public Map<String, Object> saveSpecifications(String key, String value) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().saveSpec(key, value);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/get/spec/keys")
//    @ResponseBody
//    public Map<String, Object> getSpecificationsKeys() {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().getSpecKeys();
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                MallGoodsResponse goodsResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    goodsResponse = new Gson().fromJson(data, MallGoodsResponse.class);
//                }
//                if (goodsResponse != null) {
//                    outMap.put("keys", goodsResponse.getSpec_keys());
//                }
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/get/categorys")
//    @ResponseBody
//    public Map<String, Object> getCategorys() {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().getCategorys();
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                MallCategoryListResponse mallCategoryListResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    mallCategoryListResponse = new Gson().fromJson(data, MallCategoryListResponse.class);
//                }
//                int num = 0;
//                if (mallCategoryListResponse != null) {
//                    List<MallCategoryResponse> mallCategoryResponseList = mallCategoryListResponse.getCategory();
//                    num = mallCategoryResponseList.size();
//                    outMap.put("categoryList", mallCategoryResponseList);
//                }
//                outMap.put("number", num);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//
//    @RequestMapping("/edit/category")
//    @ResponseBody
//    public Map<String, Object> editCategory(Long id, String name, String path, String descr, Integer sortIndex) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().saveOrUpdateCategory(id, name, path, descr, sortIndex, null);
//        if (ret != null) {
//            outMap.put("msg", ret.optString("msg"));
//            outMap.put("code", ret.optInt("code"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/delete/category")
//    @ResponseBody
//    public Map<String, Object> deleteCategory(Long id) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().deleteCategory(id);
//        if (ret != null) {
//            outMap.put("msg", ret.optString("msg"));
//            outMap.put("code", ret.optInt("code"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/batch/category")
//    @ResponseBody
//    public Map<String, Object> removeBatchCategory(String ids, int status) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = null ;
//        String[] idStrs = ids.split(",");
//        for (String idStr : idStrs) {
//            ret = CbsMallApiUtil.getInstance().saveOrUpdateCategory(Long.valueOf(idStr), null, null, null, null, status);
//        }
//        if (ret != null) {
//            outMap.put("msg", ret.optString("msg"));
//            outMap.put("code", ret.optInt("code"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/get/category")
//    @ResponseBody
//    public Map<String, Object> viewCategory(String name) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().viewCategory(name);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code == 200) {
//                MallCategoryResponse mallCategoryResponse = null;
//                String data = ret.optString("data");
//                if (!StringUtils.isEmpty(data)) {
//                    mallCategoryResponse = new Gson().fromJson(data, MallCategoryResponse.class);
//                }
//                outMap.put("category", mallCategoryResponse);
//            } else {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//
//    /**
//     * 推荐商品到主页
//     *
//     * @param id
//     * @return
//     */
//    @RequestMapping("/save/recommendId")
//    @ResponseBody
//    public Map<String, Object> saveRecommendId(String id) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().saveRecommendId(id);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//    /**
//     * 撤销推荐商品到主页
//     *
//     * @param id
//     * @return
//     */
//    @RequestMapping("/delete/recommendId")
//    @ResponseBody
//    public Map<String, Object> deleteRecommendId(String id) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsMallApiUtil.getInstance().deleteRecommendId(id);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            outMap.put("code", code);
//            outMap.put("msg", ret.optString("msg"));
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//        }
//        return outMap;
//    }
//
//}
