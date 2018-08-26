//package com.cbs.manage.controller.aliases;
//
//import com.cbs.manage.bean.role.AliasesResponse;
//import com.cbs.manage.bean.role.RoleResponse;
//import com.cbs.manage.service.role.RoleService;
//import com.cbs.manage.util.CbsOtherApiUtil;
//
//import org.json.JSONException;
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import javax.servlet.http.HttpServletRequest;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
///**
// * Created by lhx on 15-9-30 下午2:16
// *
// * @Description
// */
//@Controller
//@RequestMapping("aliases")
//public class AliasesController {
//
//    private static final Logger LOG = LoggerFactory.getLogger(AliasesController.class);
//
//    @Autowired
//    private RoleService roleService ;
//
//    @RequestMapping("/show")
//    public String getlist(){
//        return "aliases/aliases_list";
//    }
//
//    @RequestMapping("/get")
//    @ResponseBody
//    public Map<String, Object> getUserInfo(Long longNo,String password){
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().getUserSystemUser(longNo, password);
//        if (ret != null){
//            int code = ret.optInt("code");
//            outMap.put("code",ret.optInt("code"));
//            if (code == 200){
//                JSONObject jsonObject ;
//                try {
//                    jsonObject = new JSONObject(ret.optString("data"));
//                } catch (JSONException e) {
//                    jsonObject = new JSONObject();
//                    LOG.error(e.getMessage(), e);
//                }
//                outMap.put("account_id",jsonObject.optLong("user_id"));
//                outMap.put("long_no",jsonObject.optLong("long_no"));
//                outMap.put("user_name",jsonObject.optString("name"));
//                outMap.put("head_path",jsonObject.optString("head"));
//                outMap.put("gender",jsonObject.optInt("gender"));
//                outMap.put("status",jsonObject.optInt("status"));
//                outMap.put("create_time",jsonObject.optLong("create_time"));
//                outMap.put("flag",true);
//            } else {
//                outMap.put("msg",ret.optString("msg"));
//                outMap.put("flag",false);
//                outMap.put("code",code);
//            }
//        } else {
//            outMap.put("flag",false);
//        }
//        return outMap ;
//    }
//
//
//    @RequestMapping("/getAllAliases")
//    @ResponseBody
//    public Map<String, Object> getAllAliases(){
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        List<AliasesResponse> list = roleService.getAllAliases();
//        outMap.put("aliases",list);
//        outMap.put("iTotalRecords",list.size());
//        outMap.put("iTotalDisplayRecords",list.size());
//        return outMap ;
//    }
//
//    @RequestMapping("/getAliasesByRole")
//    @ResponseBody
//    public Map<String, Object> getAliasesByRole(HttpServletRequest request){
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        List<AliasesResponse> aliasesList ;
//        RoleResponse role = (RoleResponse) request.getSession().getAttribute("roleSession");
//        aliasesList = roleService.getAliasesByRoleId(role.getRoleId());
//        if (aliasesList != null){
//            outMap.put("aliases",aliasesList);
//            outMap.put("iTotalRecords",aliasesList.size());
//            outMap.put("iTotalDisplayRecords",aliasesList.size());
//        } else {
//            outMap.put("aliases",new ArrayList<AliasesResponse>());
//            outMap.put("iTotalRecords",0);
//            outMap.put("iTotalDisplayRecords",0);
//        }
//
//        return outMap ;
//    }
//
//    @RequestMapping("/edit")
//    @ResponseBody
//    public Map<String, Object> edit(AliasesResponse aliasesResponse, String oper, HttpServletRequest request){
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        if ("add".equals(oper)){
//            int n = roleService.addAliase(aliasesResponse);
//            if (n == 1){
//                outMap.put("msg", "添加马甲成功！");
//            } else if (n == -1){
//                outMap.put("msg", "您已经添加过该用户了！");
//            } else if (n == 0){
//                outMap.put("msg", "系统出错！");
//            }
//        } else if ("del".equals(oper)){
//            Long accountId = aliasesResponse.getAccountId();
//            if (accountId != null){
//                boolean isdel = roleService.deleteAliase(accountId);
//                if (isdel){
//                    outMap.put("msg", "删除马甲成功！");
//                    outMap.put("flag", true);
//                } else {
//                    outMap.put("msg", "删除马甲失败！");
//                    outMap.put("flag", false);
//                }
//            } else {
//                outMap.put("msg", "无法获取删除的马甲信息！");
//                outMap.put("flag", false);
//            }
//        } else if ("edit".equals(oper)){
//            boolean flag = roleService.modifyAliase(aliasesResponse);
//            outMap.put("flag", flag);
//        }
//        return outMap ;
//    }
//}
