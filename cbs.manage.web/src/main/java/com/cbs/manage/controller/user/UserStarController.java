package com.cbs.manage.controller.user;

import com.cbs.manage.util.CbsOtherApiUtil;
import com.google.gson.Gson;
import com.lifeix.cbs.api.bean.user.CbsUserStarListResponse;
import com.lifeix.cbs.api.bean.user.CbsUserStarResponse;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户推荐管理
 */
@Controller
@RequestMapping("/user/star")
public class UserStarController {

    private static final Logger LOG = LoggerFactory.getLogger(UserStarController.class);

    /**
     * 进入推荐列表页面
     *
     * @return
     */
    @RequestMapping("/show")
    public String getlist() {
        return "user/star_list";
    }

    /**
     * 推荐列表数据
     */
    @RequestMapping("/data")
    @ResponseBody
    public Map<String, Object> data(Boolean hideFlag, Long startId, @RequestParam(defaultValue = "20") Integer limit) {
        Map<String, Object> outMap = new HashMap<String, Object>();
        JSONObject ret = CbsOtherApiUtil.getInstance().userStarList(hideFlag, startId, limit);
        if (ret != null) {
            int code = ret.optInt("code");
            if (code == 200) {
                CbsUserStarListResponse response;
                String data = ret.optString("data");
                if (!StringUtils.isEmpty(data)) {
                    response = new Gson().fromJson(data, CbsUserStarListResponse.class);
                    List<CbsUserStarResponse> stars = response.getUser_stars();
                    outMap.put("stars", stars);
                    outMap.put("number", stars.size());
                }
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
     * 后台更新推荐
     */
    @RequestMapping("/put")
    @ResponseBody
    public Map<String, Object> put(Long longNO, Integer factor) {
        Map<String, Object> outMap = new HashMap<String, Object>();
        // longNO to userId
        Long userId = null ;
        JSONObject ret = CbsOtherApiUtil.getInstance().getUserSystemUser(longNO, null);
        if (ret != null) {
            int code = ret.optInt("code");
            outMap.put("code", ret.optInt("code"));
            if (code == 200) {
                JSONObject jsonObject;
                try {
                    jsonObject = new JSONObject(ret.optString("data"));
                    userId = jsonObject.optLong("user_id") ;
                } catch (JSONException e) {
                    LOG.error(e.getMessage(), e);
                }
            }
        } else {
            outMap.put("msg", "服务器端无该龙号的数据返回！");
            return outMap ;
        }
        if (userId != null){
            JSONObject result = CbsOtherApiUtil.getInstance().putUserStar(userId, factor);
            if (result != null) {
                int code = result.optInt("code");
                if (code != 200) {
                    outMap.put("msg", result.optString("msg"));
                }
                outMap.put("code", code);
            } else {
                outMap.put("msg", "服务器端无数据返回！");
            }
        }
        return outMap;
    }

    /**
     * 后台显示隐藏推荐
     */
    @RequestMapping("/onoff")
    @ResponseBody
    public Map<String, Object> onoff(Long userId, Boolean hideFlag) {
        Map<String, Object> outMap = new HashMap<String, Object>();
        JSONObject ret = CbsOtherApiUtil.getInstance().onoffUserStar(userId, hideFlag);
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
