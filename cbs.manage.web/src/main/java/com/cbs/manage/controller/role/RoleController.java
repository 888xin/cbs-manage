package com.cbs.manage.controller.role;

import com.cbs.common.qiniu.QiniuFileUtil;
import com.cbs.common.util.CommonUtil;
import com.cbs.common.util.MD5;
import com.cbs.manage.bean.log.RoleLoginResponse;
import com.cbs.manage.bean.page.PageView;
import com.cbs.manage.bean.role.AliasesResponse;
import com.cbs.manage.bean.role.ResourcesResponse;
import com.cbs.manage.bean.role.RoleResponse;
import com.cbs.manage.dto.role.Role;
import com.cbs.manage.service.log.LogService;
import com.cbs.manage.service.resource.ResourceService;
import com.cbs.manage.service.role.RoleService;
import com.cbs.manage.util.CbsContestlApiUtil;
import com.google.gson.Gson;
import com.lifeix.cbs.contest.bean.yy.YyContestListResponse;
import com.lifeix.email.service.SmsDubboService;
import com.lifeix.user.beans.CustomResponse;
import com.qiniu.api.auth.AuthException;

import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sun.misc.BASE64Decoder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * Created by lhx on 15-9-24 下午7:41
 *
 * @Description
 */
@Controller
@RequestMapping("role")
public class RoleController {

    protected static Logger LOG = LoggerFactory.getLogger(RoleController.class);

    //该角色下的马甲存储到session中
    public final static String ALIASES_LIST = "aliasesList";

    @Resource(name = "roleService")
    private RoleService roleService;

    @Resource(name = "resourceService")
    private ResourceService resourceService ;

    @Autowired
    private LogService logService;

    @Autowired
    private AuthenticationManager myAuthenticationManager;

    @Autowired
    private SmsDubboService smsDubboService;

    @RequestMapping("/getlist")
    public String getlist(Model model) {
        List<RoleResponse> roleList = roleService.getAllRole();
        model.addAttribute("roleList", roleList);
        return "role/role_list";
    }

    @RequestMapping("/logout")
    public String toLogin(HttpServletRequest request) {
        //退出登录时销毁该用户的Session
        Object o = request.getSession().getAttribute("SPRING_SECURITY_CONTEXT");
        if (null != o) {
            request.getSession().removeAttribute("SPRING_SECURITY_CONTEXT");
        }
        request.getSession().invalidate();
        return "redirect:/login.jsp";
    }

    @RequestMapping("/check")
    public String loginCheck(String username, String password, HttpServletRequest request) throws JSONException {
        try {
            if (!request.getMethod().equals("POST")) {
                request.setAttribute("error", "支持POST方法提交！");
            }
            if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)) {
                request.setAttribute("error", "用户名或密码不能为空！");
                return "forward:/login.jsp";
            }
            // 验证用户账号与密码是否正确
            RoleResponse role = this.roleService.getSingleRole(username);
            if (role == null) {
                request.setAttribute("error", "用户不存在！");
                return "forward:/login.jsp";
            }
            Authentication authentication = myAuthenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            SecurityContext securityContext = SecurityContextHolder.getContext();
            //securityContext.setAuthentication(authentication);
            //session.setAttribute("SPRING_SECURITY_CONTEXT", securityContext);
            HttpSession session = request.getSession(true);
            // 当验证都通过后，把用户信息放在session里
            session.setAttribute("roleSession", role);
            session.setAttribute("ROLE_AUTH", authentication);

            // 记录登录信息
            RoleLoginResponse roleLogin = new RoleLoginResponse();
            roleLogin.setLoginName(role.getRolename());
            String loginIp = request.getRemoteAddr();
            roleLogin.setLoginIP(loginIp);
            //LOG.info("用户："+role.getRoleId()+" ip:"+ loginIp);
            logService.addRoleLoginLog(roleLogin);
            // 把权限resKey放到session中，用于页面控制
            String[] resKeys = role.getResourceResKeys().split(",");
            Set<String> stringSet = new HashSet<String>();
            for (String resKey : resKeys) {
                stringSet.add(resKey.trim());
            }
            session.setAttribute("resKeys", stringSet);
            //把该角色下的马甲放到session中
            List<AliasesResponse> aliasesList = roleService.getAliasesByRoleId(role.getRoleId());
            if (aliasesList != null) {
                session.setAttribute(ALIASES_LIST, aliasesList);
            }

            //先放一个数据，防止出错
            JSONObject ret = CbsContestlApiUtil.getInstance().getYySettleNum();
            if (ret != null) {
                int code = ret.optInt("code");
                if (code == 200) {
                    YyContestListResponse yyContestListResponse;
                    String data = ret.optString("data");
                    if (!StringUtils.isEmpty(data)) {
                        yyContestListResponse = new Gson().fromJson(data, YyContestListResponse.class);
                        session.setAttribute("yy_un_settle_num", yyContestListResponse.getNumber());
                    }
                } else {
                    session.setAttribute("yy_un_settle_num", 0);
                }
            }
//            JSONObject ret2 = CbsContestlApiUtil.getInstance().getContestNotSettleNum();
//            if (ret != null) {
//                int code = ret2.optInt("code");
//                if (code == 200) {
//                    CustomResponse customResponse;
//                    String data = ret2.optString("data");
//                    if (!StringUtils.isEmpty(data)) {
//                        JSONObject jsonObject = new JSONObject(data);
//                        session.setAttribute("contest_un_settle_num", jsonObject.optInt("num"));
//                    }
//                } else {
//                    session.setAttribute("contest_un_settle_num", 0);
//                }
//            }
            //验证是否是公司网络访问
            boolean isInner = CommonUtil.filterManageIPs(loginIp);
            if (isInner) {
                //内部访问
                securityContext.setAuthentication(authentication);
            } else {
                //外网登陆，先不给权限
                session.setAttribute("PHONE", 0);
                String phone = role.getPhone();
                if (!StringUtils.isEmpty(phone)) {
                    try {
                        //给角色手机号码发送验证码
                        String code = CommonUtil.randomCode(6);
                        session.setAttribute("VALIDATE_CODE", code);
                        //smsDubboService.post(phone,"请在管理后台主页面上输入验证码：" + code,"cbs-manage",null);
                        smsDubboService.post(phone, "请在管理后台主页面上输入验证码：" + code, "lifeix-tiyu", null);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }
        } catch (AuthenticationException ae) {
            request.setAttribute("error", "密码错误，请联系管理员！");
            return "forward:/login.jsp";
        }
        return "common/manage_main";
    }


    @RequestMapping("/modify")
    @ResponseBody
    public Map<String, Object> modify(Integer roleId, String resourceResKeys, Integer status, String desc, String phone) {
        Map<String, Object> outMap = new HashMap<String, Object>();
        boolean flag = false;
        if (roleId != null && resourceResKeys != null) {
            RoleResponse roleResponse = new RoleResponse();
            roleResponse.setResourceResKeys(resourceResKeys);
            roleResponse.setRoleId(roleId);
            flag = roleService.modify(roleResponse);
            if (flag) {
                outMap.put("msg", "用户权限更新成功！");
            } else {
                outMap.put("msg", "用户权限更新失败！");
            }
        } else if (roleId != null && status != null) {
            RoleResponse roleResponse = new RoleResponse();
            roleResponse.setStatus(status);
            roleResponse.setRoleId(roleId);
            flag = roleService.modify(roleResponse);
            if (flag) {
                outMap.put("msg", "用户状态更新成功！");
            } else {
                outMap.put("msg", "用户状态更新失败！");
            }
        } else if (roleId != null && desc != null) {
            RoleResponse roleResponse = new RoleResponse();
            roleResponse.setDescription(desc);
            roleResponse.setRoleId(roleId);
            flag = roleService.modify(roleResponse);
            if (flag) {
                outMap.put("msg", "用户描述信息更新成功！");
            } else {
                outMap.put("msg", "用户描述信息更新失败！");
            }
        } else if (roleId != null && phone != null) {
            RoleResponse roleResponse = new RoleResponse();
            roleResponse.setPhone(phone);
            roleResponse.setRoleId(roleId);
            flag = roleService.modify(roleResponse);
            if (flag) {
                outMap.put("msg", "用户手机信息更新成功！");
            } else {
                outMap.put("msg", "用户手机信息更新失败！");
            }
        } else {
            outMap.put("msg", "用户Id或者其他信息为null");
        }
        outMap.put("flag", flag);
        return outMap;
    }

    @RequestMapping("/delete")
    @ResponseBody
    public Map<String, Object> delete(Integer roleId) {
        Map<String, Object> outMap = new HashMap<String, Object>();
        boolean flag = false;
        if (roleId != null) {
            flag = roleService.deleteRole(roleId);
            if (flag) {
                outMap.put("msg", "角色删除成功！");
            } else {
                outMap.put("msg", "角色删除失败！");
            }
        } else {
            outMap.put("msg", "用户Id或者其他信息为null");
        }
        outMap.put("flag", flag);
        return outMap;
    }

    @RequestMapping("/register")
    @ResponseBody
    public Map<String, Object> register(String username, String password) {
        Map<String, Object> outMap = new HashMap<String, Object>();
        boolean flag = false;
        if (!StringUtils.isEmpty(username) && !StringUtils.isEmpty(password)) {
            RoleResponse roleResponse = this.roleService.getSingleRole(username);
            if (roleResponse != null) {
                outMap.put("msg", "该用户已经存在");
            } else {
                password = MD5.getMD5ofStr(password);
                flag = roleService.addRole(username, password);
            }
        } else {
            outMap.put("msg", "用户名或者密码不能为空");
        }
        outMap.put("flag", flag);
        return outMap;
    }


    @RequestMapping("/update")
    @ResponseBody
    public Map<String, Object> update(RoleResponse roleResponse) {
        Map<String, Object> outMap = new HashMap<String, Object>();
        boolean flag = false;
        if (roleResponse.getRoleId() != null) {
            String password = roleResponse.getPassword();
            if (password != null) {
                roleResponse.setPassword(MD5.getMD5ofStr(password));
            }
            flag = roleService.modify(roleResponse);
            if (!flag) {
                outMap.put("msg", "用户更新失败！");
            }
        } else {
            outMap.put("msg", "用户Id为null");
        }
        outMap.put("flag", flag);
        return outMap;
    }

    @RequestMapping("/get/item")
    @ResponseBody
    public Map<String, Object> getItem() {
        Map<String, Object> outMap = new HashMap<>();
        List<ResourcesResponse> resourcesResponseList = resourceService.getResourceItems();
//        String[] keys = new String[resourcesResponseList.size()];
//        for (int i = 0; i < resourcesResponseList.size(); i++) {
//            keys[i] = resourcesResponseList.get(i).getResKey();
//        }
        outMap.put("keys", resourcesResponseList);
        return outMap;
    }

    @RequestMapping("/add/avatar")
    @ResponseBody
    public Map<String, Object> addvatar(String thumb, Integer roleId) {
        Map<String, Object> outMap = new HashMap<String, Object>();
        boolean flag = false;
        //base64解码
        BASE64Decoder decoder = new BASE64Decoder();
        thumb = thumb.substring(22, thumb.length());
        byte[] decoderBytes = new byte[0];
        try {
            decoderBytes = decoder.decodeBuffer(thumb);
        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }
        //上传到七牛云
        //文件名为：系统时间 + 后缀
        //String fileName = System.currentTimeMillis() + ".png" ;
        //String str = QiniuFileUtil.getInstance().uploadPhotoByBytes(QiniuFileUtil.ImageCategory.AVATAR + fileName, decoderBytes);
        InputStream inputStream = new ByteArrayInputStream(decoderBytes);
        JSONObject jsonObject = null;
        try {
            String str = QiniuFileUtil.getInstance().uploadPhotoByInputStream(inputStream, ".png", 1, QiniuFileUtil.ImageCategory.AVATAR);
            jsonObject = new JSONObject(str);
            String imageUrl = jsonObject.optString("key");
            RoleResponse roleResponse = new RoleResponse();
            roleResponse.setRoleId(roleId);
            roleResponse.setPath(imageUrl);
            flag = roleService.modify(roleResponse);
        } catch (AuthException e) {
            LOG.error(e.getMessage(), e);
        } catch (JSONException e) {
            LOG.error(e.getMessage(), e);
        }

        outMap.put("flag", flag);
        return outMap;

    }


    @RequestMapping("/log/show")
    public String getlist() {
        return "role/role_log_list";
    }

    @RequestMapping("/log/list")
    @ResponseBody
    public PageView queryLogByPage(Integer page, Integer rows) {
        PageView pageInfo = new PageView();
        if (page != null && rows != null) {
            pageInfo.setPageSize(rows);
            pageInfo.setPageNow(page);
        }
        return logService.query(pageInfo);
    }


    @RequestMapping("/phone")
    @ResponseBody
    public Map<String, Object> validatePhone(String code, HttpServletRequest request) {
        Map<String, Object> outMap = new HashMap<String, Object>();
        HttpSession session = request.getSession(true);
        String session_code = (String) session.getAttribute("VALIDATE_CODE");
        if (session_code.equals(code)) {
            outMap.put("flag", true);
            Authentication authentication = (Authentication) session.getAttribute("ROLE_AUTH");
            SecurityContext securityContext = SecurityContextHolder.getContext();
            securityContext.setAuthentication(authentication);
        } else {
            outMap.put("flag", false);
            outMap.put("msg", "验证码输入不正确");
        }
        return outMap;
    }

}
