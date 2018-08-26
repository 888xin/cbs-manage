package com.cbs.manage.controller.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cbs.manage.bean.role.RoleResponse;
import com.cbs.manage.util.CbsOtherApiUtil;
import com.google.gson.Gson;
import com.lifeix.cbs.api.bean.coupon.CouponUserListResponse;
import com.lifeix.cbs.api.bean.coupon.CouponUserResponse;
import com.lifeix.cbs.api.bean.user.CbsUserListResponse;
import com.lifeix.cbs.api.bean.user.CbsUserResponse;
import com.lifeix.common.utils.RegexUtil;

/**
 * Created by lhx on 15-10-26 上午10:19
 * 
 * @Description
 */
@Controller
@RequestMapping("/user")
public class UserController {

    // 跳转到页面

    @RequestMapping("/show")
    public String getlist(HttpServletRequest request, Model model) {
	Set<String> resKeys = (Set<String>) request.getSession().getAttribute("resKeys");
	if (resKeys.contains("sys_admin_money")) {
	    model.addAttribute("admin_money", 1);
	} else {
	    model.addAttribute("admin_money", 0);
	}
	return "user/cbs_users";
    }

    @RequestMapping(value = "/search")
    @ResponseBody
    public Map<String, Object> search(String searchKey, Long startId, Integer limit) throws JSONException {

	Map<String, Object> outMap = new HashMap<String, Object>();

	// 这里进行判断，是否龙号，如果是的，直接查询龙号接口

	boolean longNoFlag = RegexUtil.hasMatche(searchKey, RegexUtil.LONGNO_REG);

	if (longNoFlag) {

	    JSONObject ret = CbsOtherApiUtil.getInstance().getUserSystemUser(Long.parseLong(searchKey), null);
	    if (ret != null) {
		int code = ret.optInt("code");
		if (code == 200) {
		    CbsUserResponse cbsUserResponse = null;
		    String data = ret.optString("data");
		    if (!StringUtils.isEmpty(data)) {
			cbsUserResponse = new Gson().fromJson(data, CbsUserResponse.class);
		    }
		    List<CbsUserResponse> users = new ArrayList<CbsUserResponse>();

		    users.add(cbsUserResponse);
		    int num = users.size();
		    if (num > 0) {
			for (int i = 0; i < num; i++) {
			    double money = CbsOtherApiUtil.getInstance().getUserMoney(users.get(i).getUser_id());
			    users.get(i).setAvailableMoney(money);
			}
		    }
		    outMap.put("users", users);
		    outMap.put("number", num);
		} else {
		    outMap.put("msg", ret.optString("msg"));
		}
		outMap.put("code", code);
	    } else {
		outMap.put("msg", "服务器端无数据返回！");
	    }
	} else {
	    JSONObject ret = CbsOtherApiUtil.getInstance().searchUsers(searchKey, startId, limit);
	    if (ret != null) {
		int code = ret.optInt("code");
		if (code == 200) {
		    CbsUserListResponse cbsUserListResponse = null;
		    String data = ret.optString("data");
		    if (!StringUtils.isEmpty(data)) {
			cbsUserListResponse = new Gson().fromJson(data, CbsUserListResponse.class);
		    }
		    List<CbsUserResponse> users = cbsUserListResponse.getUsers();
		    int num = users.size();
		    if (num > 0) {
			for (int i = 0; i < num; i++) {
			    double money = CbsOtherApiUtil.getInstance().getUserMoney(users.get(i).getUser_id());
			    users.get(i).setAvailableMoney(money);
			}
		    }
		    outMap.put("users", users);
		    outMap.put("number", num);
		} else {
		    outMap.put("msg", ret.optString("msg"));
		}
		outMap.put("code", code);
	    } else {
		outMap.put("msg", "服务器端无数据返回！");
	    }
	}

	return outMap;

    }

    /**
     * 后台增加用户龙币
     * 
     * @param user_id
     * @param amount
     * @param request
     * @return
     */
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/editmoney", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> editMoney(Long user_id, double amount, HttpServletRequest request) {
	Map<String, Object> outMap = new HashMap<String, Object>();
	Set<String> resKeys = (Set<String>) request.getSession().getAttribute("resKeys");
	if (!resKeys.contains("sys_admin_money")) {
	    outMap.put("msg", "你没有修改龙币的权限！");
	    return outMap;
	}

	RoleResponse o = (RoleResponse) request.getSession().getAttribute("roleSession");
	String admin = o.getRolename();
	JSONObject ret = CbsOtherApiUtil.getInstance().editMoney(user_id, amount, admin);
	if (ret != null) {
	    int code = ret.optInt("code");
	    if (code != 200) {
		outMap.put("msg", ret.optString("msg"));
	    }
	    outMap.put("code", code);
	} else {
	    outMap.put("msg", "服务器端无数据返回！");
	}
	return outMap;
    }

    /**
     * 后台扣除用户龙币
     * 
     * @param user_id
     * @param amount
     * @param request
     * @return
     */
    @SuppressWarnings("unchecked")
    @RequestMapping(value = "/deductmoney", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deductMoney(Long user_id, Double amount, HttpServletRequest request) {
	Map<String, Object> outMap = new HashMap<String, Object>();
	Set<String> resKeys = (Set<String>) request.getSession().getAttribute("resKeys");
	if (!resKeys.contains("sys_admin_money")) {
	    outMap.put("msg", "你没有修改龙币的权限！");
	    return outMap;
	}

	RoleResponse o = (RoleResponse) request.getSession().getAttribute("roleSession");
	String admin = o.getRolename();
	JSONObject ret = CbsOtherApiUtil.getInstance().deductMoney(user_id, amount, admin);
	if (ret != null) {
	    int code = ret.optInt("code");
	    if (code != 200) {
		outMap.put("msg", ret.optString("msg"));
	    }
	    outMap.put("code", code);
	} else {
	    outMap.put("msg", "服务器端无数据返回！");
	}
	return outMap;
    }

    /**
     * 查找用户可用龙筹卷
     * 
     * @param user_id
     * @param limit
     * @return
     * @throws JSONException
     */
    @RequestMapping(value = "/coupon")
    @ResponseBody
    public Map<String, Object> coupon(Long user_id, Integer limit) throws JSONException {
	Map<String, Object> outMap = new HashMap<String, Object>();
	JSONObject ret = CbsOtherApiUtil.getInstance().userCouponsList(user_id, true, null, limit);
	if (ret != null) {
	    int code = ret.optInt("code");
	    if (code == 200) {
		CouponUserListResponse couponUserListResponse = null;
		String data = ret.optString("data");
		if (!StringUtils.isEmpty(data)) {
		    couponUserListResponse = new Gson().fromJson(data, CouponUserListResponse.class);
		}
		List<CouponUserResponse> couponsList = couponUserListResponse.getCoupons();
		int num = 0;
		if (couponsList != null) {
		    num = couponsList.size();
		}
		Map<Integer, Integer> coupons = new HashMap<Integer, Integer>();
		coupons.put(5, 0);
		coupons.put(10, 0);
		coupons.put(20, 0);
		coupons.put(50, 0);
		coupons.put(100, 0);
		for (int i = 0; i < num; i++) {
		    Integer value = coupons.get(couponsList.get(i).getPrice());
		    coupons.put(couponsList.get(i).getPrice(), value + 1);
		}
		outMap.put("coupons", coupons);
		outMap.put("number", num);
	    } else {
		outMap.put("msg", ret.optString("msg"));
	    }
	    outMap.put("code", code);
	} else {
	    outMap.put("msg", "服务器端无数据返回！");
	}

	return outMap;

    }

    /**
     * 后台发送系统消息提醒
     * 
     * @param userId
     * @param content
     * @return
     */
    @RequestMapping(value = "/prompt", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> prompt(Long userId, String content) {
	Map<String, Object> outMap = new HashMap<String, Object>();

	String params = String.format("{\"content\":%s}", content);

	JSONObject ret = CbsOtherApiUtil.getInstance().addPrompt(18L, userId, userId, params);
	if (ret != null) {
	    int code = ret.optInt("code");
	    if (code != 200) {
		outMap.put("msg", ret.optString("msg"));
	    }
	    outMap.put("code", code);
	} else {
	    outMap.put("msg", "服务器端无数据返回！");
	}
	return outMap;
    }
}
