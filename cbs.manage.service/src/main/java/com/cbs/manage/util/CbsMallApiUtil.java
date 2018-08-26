package com.cbs.manage.util;

import com.lifeix.cbs.mall.bean.goods.MallGoodsResponse;
import com.lifeix.cbs.mall.bean.order.MallRecommendResponse;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.representation.Form;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import javax.ws.rs.core.MediaType;

/**
 * 商城接口 Created by lhx on 15-9-30 下午1:59
 *
 * @Description
 */
public class CbsMallApiUtil {

    private static final Logger LOG = LoggerFactory.getLogger(CbsMallApiUtil.class);

    private Client client;

    private String uri;

    static class SingletonHolder {
	private static final CbsMallApiUtil INSTANCE = new CbsMallApiUtil();
    }

    public static CbsMallApiUtil getInstance() {
	return SingletonHolder.INSTANCE;
    }

    private CbsMallApiUtil() {
	client = Client.create();
	client.setConnectTimeout(3000);
	client.setReadTimeout(3000);
    }

    public void initData(final String uri) {
	if (uri == null || uri.isEmpty() || !uri.contains("http://")) {
	    throw new RuntimeException("Uri format wrong,eg. http://host:s8080/cbs");
	}
	int lastIndex = uri.length() - 1;
	if (uri.charAt(lastIndex) != '/') {
	    this.uri = uri + "/";
	} else {
	    this.uri = uri;
	}
    }

    // 商品列表
    private static final String CBS_API_GOODS_LIST = "cbs/inner/mall/goods/list";
    // 商品修改
    private static final String CBS_API_GOODS_EDIT = "cbs/inner/mall/goods/edit";
    // 商品删除
    private static final String CBS_API_GOODS_DELETE = "cbs/inner/mall/goods/delete";
    // 商品照片置顶
    private static final String CBS_API_GOODS_QUEUE = "cbs/inner/mall/goods/queue";
    // 单个商品
    private static final String CBS_API_GOODS_VIEW = "cbs/inner/mall/goods/view";

    // 商品订单列表
    private static final String CBS_API_GOODS_ORDER_LIST = "cbs/inner/mall/order/list";
    // 商品订单快递信息添加
    private static final String CBS_API_GOODS_ORDER_SEND = "cbs/inner/mall/order/send";
    // 查看单个商品订单
    private static final String CBS_API_GOODS_ORDER_VIEW = "cbs/inner/mall/order/view";
    // 查看订单物流信息
    private static final String CBS_API_GOODS_ORDER_EXPRESS = "cbs/inner/mall/express/get";
    // 取消订单
    private static final String CBS_API_GOODS_ORDER_CANCEL = "cbs/inner/mall/order/cancel";

    // 商品推荐列表
    private static final String CBS_API_RECOMMEND_LIST = "cbs/mall/recommend/list";
    // 增加商品推荐
    private static final String CBS_API_RECOMMEND_ADD = "cbs/inner/recommend/add";
    // 修改商品推荐
    private static final String CBS_API_RECOMMEND_UPDATE = "cbs/inner/recommend/update";
    // 删除商品推荐
    private static final String CBS_API_RECOMMEND_DELETE = "cbs/inner/recommend/delete";
    // 保存或修改商品分类
    private static final String CBS_API_CATEGORY_EDIT = "cbs/inner/mall/category/edit";
    // 删除商品分类
    private static final String CBS_API_CATEGORY_DELETE = "cbs/inner/mall/category/delete";
    // 保存规格
    private static final String CBS_API_SPEC_SAVE = "cbs/inner/mall/spec/save";
    // 获得规格Keys
    private static final String CBS_API_SPEC_KEYS = "cbs/inner/mall/spec/keys";
    // 获得某个key下的规格
    private static final String CBS_API_SPEC_KEY = "cbs/inner/mall/spec/get";
    // 获得所有分类
    private static final String CBS_API_CATEGORY_ALL = "cbs/inner/mall/category/all";
    // 获得单个分类
    private static final String CBS_API_CATEGORY_VIEW = "cbs/inner/mall/category/view";
    // 推荐商品到主页
    private static final String CBS_API_GOODS_RECOMMEND = "cbs/inner/mall/recommendId/save";
    // 撤销推荐商品到主页
    private static final String CBS_API_GOODS_RECOMMEND_DELETE = "cbs/inner/mall/recommendId/delete";

    /**
     * 推荐商品到主页
     *
     * @param id
     * @return
     */
    public JSONObject saveRecommendId(String id) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	WebResource resource = client.resource(uri + CBS_API_GOODS_RECOMMEND);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 撤销推荐商品到主页
     *
     * @param id
     * @return
     */
    public JSONObject deleteRecommendId(String id) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	WebResource resource = client.resource(uri + CBS_API_GOODS_RECOMMEND_DELETE);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获得单个分类
     *
     * @return
     */
    public JSONObject viewCategory(String name) {
	Form queryParam = new Form();
	queryParam.add("name", name);
	WebResource resource = client.resource(uri + CBS_API_CATEGORY_VIEW);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获得所有分类
     *
     * @return
     */
    public JSONObject getCategorys() {
	WebResource resource = client.resource(uri + CBS_API_CATEGORY_ALL);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 保存规格
     */
    public JSONObject saveSpec(String key, String value) {
	Form queryParam = new Form();
	queryParam.add("key", key);
	queryParam.add("value", value);
	WebResource resource = client.resource(uri + CBS_API_SPEC_SAVE);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获得规格Keys
     */
    public JSONObject getSpecKeys() {
	WebResource resource = client.resource(uri + CBS_API_SPEC_KEYS);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 根据key来获得规格
     *
     * @param key
     * @return
     */
    public JSONObject getSpec(String key) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_SPEC_KEY);
	queryParam.add("key", key);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 保存商品分类
     */
    public JSONObject saveOrUpdateCategory(Long id, String name, String path, String descr, Integer sortIndex, Integer status) {
	Form queryParam = new Form();

	if (id != null) {
	    queryParam.add("id", id);
	} else {
	    queryParam.add("num", 0);
	}
	if (!StringUtils.isEmpty(name)) {
	    queryParam.add("name", name);
	}
	if (!StringUtils.isEmpty(path)) {
	    queryParam.add("path", path);
	}
	if (!StringUtils.isEmpty(descr)) {
	    queryParam.add("descr", descr);
	}
	queryParam.add("sort_index", sortIndex);
	queryParam.add("status", status);
	WebResource resource = client.resource(uri + CBS_API_CATEGORY_EDIT);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    public JSONObject deleteCategory(Long id) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	WebResource resource = client.resource(uri + CBS_API_CATEGORY_DELETE);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 删除单个商品推荐
     *
     * @param id
     */
    public JSONObject deleteRecommend(Long id) {
	Form queryParam = new Form();
	queryParam.add("id", id);
	WebResource resource = client.resource(uri + CBS_API_RECOMMEND_DELETE);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 修改商品推荐
     *
     * @return
     */
    public JSONObject updateRecommend(MallRecommendResponse bean) {
	Form queryParam = new Form();
	queryParam.add("id", bean.getId());
	if (!StringUtils.isEmpty(bean.getImage())) {
	    queryParam.add("image", bean.getImage());
	}
	if (!StringUtils.isEmpty(bean.getTitle())) {
	    queryParam.add("title", bean.getTitle());
	}
	if (!StringUtils.isEmpty(bean.getLink())) {
	    queryParam.add("link", bean.getLink());
	}
	queryParam.add("type", bean.getType());
	queryParam.add("sort", bean.getSort());

	WebResource resource = client.resource(uri + CBS_API_RECOMMEND_UPDATE);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 新增商品推荐
     *
     * @return
     */
    public JSONObject addRecommend(MallRecommendResponse bean) {
	Form queryParam = new Form();
	queryParam.add("id", bean.getId());
	queryParam.add("image", bean.getImage());
	queryParam.add("title", bean.getTitle());
	queryParam.add("type", bean.getType());
	queryParam.add("link", bean.getLink());
	queryParam.add("sort", bean.getSort());

	WebResource resource = client.resource(uri + CBS_API_RECOMMEND_ADD);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取商品推荐列表
     *
     * @return
     */
    public JSONObject getRecommendsInfo() {
	WebResource resource = client.resource(uri + CBS_API_RECOMMEND_LIST);
	String str = resource.get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 浏览单个订单
     *
     * @param orderId
     */
    public JSONObject viewMallOrder(Long orderId) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_GOODS_ORDER_VIEW);
	queryParam.add("order_id", orderId);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取订单物流信息
     *
     * @param orderId
     */
    public JSONObject viewOrderExpress(Long orderId) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_GOODS_ORDER_EXPRESS);
	queryParam.add("order_id", orderId);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 订单发货操作
     *
     * @param orderId
     * @param expressType
     * @param expressNo
     * @return
     */
    public JSONObject sendMallOrders(Long orderId, Integer expressType, String expressNo) {
	Form queryParam = new Form();
	queryParam.add("order_id", orderId);
	if (expressType != null) {
	    queryParam.add("express_type", expressType);
	}
	if (!StringUtils.isEmpty(expressNo)) {
	    queryParam.add("express_no", expressNo);
	}
	WebResource resource = client.resource(uri + CBS_API_GOODS_ORDER_SEND);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 取消订单
     */
    public JSONObject cancelOrders(Long orderId) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_GOODS_ORDER_CANCEL);
	queryParam.add("order_id", orderId);
	String str = resource.queryParams(queryParam).accept(MediaType.APPLICATION_JSON_TYPE).post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 商品订单列表
     *
     * @param userId
     * @param status
     * @param startId
     * @return
     */
    public JSONObject listMallOrders(Long userId, Integer status, Long startId) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_GOODS_ORDER_LIST);

	if (userId != null) {
	    queryParam.add("user_id", userId);
	}
	if (status != null) {
	    queryParam.add("status", status);
	}
	if (startId != null) {
	    queryParam.add("start_id", startId);
	}

	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 浏览单个商品
     */
    public JSONObject viewGoodsInfo(Integer goodsId) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_GOODS_VIEW);
	queryParam.add("id", goodsId);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 商品照片是否置顶
     */
    public JSONObject queueGoods(Integer goodsId, String path) {
	Form queryParam = new Form();
	queryParam.add("goods_id", goodsId);
	queryParam.add("path", path);
	WebResource resource = client.resource(uri + CBS_API_GOODS_QUEUE);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 商品删除
     *
     * @param goodsId
     * @return
     */
    public JSONObject deleteGoods(Integer goodsId) {
	Form queryParam = new Form();
	queryParam.add("id", goodsId);
	WebResource resource = client.resource(uri + CBS_API_GOODS_DELETE);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 编辑商品（含有添加操作）
     *
     * @param goodsResponse
     * @return
     */
    public JSONObject editGoods(MallGoodsResponse goodsResponse) {
	Form queryParam = new Form();
	queryParam.add("id", goodsResponse.getId());
	queryParam.add("category_id", goodsResponse.getCategory_id());
	if (goodsResponse.getName() != null) {
	    queryParam.add("name", goodsResponse.getName());
	}
	queryParam.add("price", goodsResponse.getPrice());
	if (goodsResponse.getPath() != null) {
	    queryParam.add("path", goodsResponse.getPath());
	}
	queryParam.add("sales", goodsResponse.getSales());
	queryParam.add("stock", goodsResponse.getStock());
	if (goodsResponse.getDescr() != null) {
	    queryParam.add("descr", goodsResponse.getDescr());
	}
	if (goodsResponse.getPath_more() != null) {
	    queryParam.add("path_more", goodsResponse.getPath_more());
	}
	if (goodsResponse.getEx_prop() != null) {
	    queryParam.add("ex_prop", goodsResponse.getEx_prop());
	}
	queryParam.add("status", goodsResponse.getStatus());
	queryParam.add("type", goodsResponse.getType());
	queryParam.add("postage", goodsResponse.getPostage());
	queryParam.add("sort_index", goodsResponse.getSort_index());
	queryParam.add("original", goodsResponse.getOriginal());
	WebResource resource = client.resource(uri + CBS_API_GOODS_EDIT);
	String str = resource.type(MediaType.WILDCARD).accept(MediaType.APPLICATION_JSON_TYPE)
	        .post(String.class, queryParam);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }

    /**
     * 获取商品列表
     *
     * @param startId
     * @param status
     * @param limit
     * @return
     */
    public JSONObject getGoodsInfo(Integer startId, Integer status, Integer limit, Integer category) {
	Form queryParam = new Form();
	WebResource resource = client.resource(uri + CBS_API_GOODS_LIST);
	queryParam.add("start_id", startId);
	queryParam.add("status", status);
	queryParam.add("limit", limit);
	queryParam.add("category_id", category);
	String str = resource.queryParams(queryParam).get(String.class);
	JSONObject ret = null;
	try {
	    ret = new JSONObject(str);
	} catch (JSONException e) {
	    LOG.error(e.getMessage(), e);
	}
	return ret;
    }
}
