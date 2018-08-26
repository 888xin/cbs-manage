package com.cbs.manage.controller.user;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cbs.manage.util.CbsContestlApiUtil;
import com.google.gson.Gson;
import com.lifeix.cbs.api.bean.user.UserGraphListResponse;
import com.lifeix.cbs.api.bean.user.UserStatisticsResponse;

@Controller
@RequestMapping("/user")
public class UserGraphAction {

    /**
     * 个人统计曲线
     * 
     * @throws JSONException
     * @throws IOException
     */
    @RequestMapping(value = "/graph")
    @ResponseBody
    public Map<String, Object> view(Long user_id, String start_time, String end_time) throws JSONException, IOException {

	Map<String, Object> outMap = new HashMap<String, Object>();

	JSONObject ret = CbsContestlApiUtil.getInstance().getUserGraph(user_id, start_time, end_time);
	if (ret != null) {
	    int code = ret.optInt("code");
	    if (code == 200) {
		UserGraphListResponse cbsUserListResponse = null;
		String data = ret.optString("data");
		if (!StringUtils.isEmpty(data)) {
		    cbsUserListResponse = new Gson().fromJson(data, UserGraphListResponse.class);
		}
		List<UserStatisticsResponse> users = cbsUserListResponse.getRanks();
		int num = users.size();
		outMap.put("users", users);
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

}
