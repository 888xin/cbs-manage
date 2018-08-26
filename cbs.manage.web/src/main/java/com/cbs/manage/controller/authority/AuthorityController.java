package com.cbs.manage.controller.authority;

import com.cbs.manage.bean.page.PageView;
import com.cbs.manage.bean.role.ResourcesResponse;
import com.cbs.manage.service.resource.ResourceService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.*;

/**
* Created by lhx on 15-9-24 下午7:41
*
* @Description
*/
@Controller
@RequestMapping("authority")
public class 4AuthorityController {

    @Resource(name = "resourceService")
    private ResourceService resourceService ;

    @RequestMapping("/getlist")
    public String getlist(){
        return "role/authority_list";
    }

    @RequestMapping("/query")
    @ResponseBody
    public PageView queryByPage(Integer page, Integer rows){
//        Map<String, Object> outMap = new HashMap<String, Object>();
        PageView pageInfo = new PageView();
        if (page != null && rows != null){
            pageInfo.setPageSize(rows);
            pageInfo.setPageNow(page);
        }
        PageView pageView = resourceService.query(pageInfo);
        return pageView ;
//        outMap.put("pageView",pageView);
//        return outMap ;
    }

    @RequestMapping("/edit")
    @ResponseBody
    public Map<String, Object> editAuthority(ResourcesResponse resourcesResponse, String oper, Integer deleteId){
        Map<String, Object> outMap = new HashMap<String, Object>();
        boolean flag = false ;
        if ("del".equals(oper)){
            //进行删除操作
            if (deleteId != null){
                flag = resourceService.delete(deleteId);
            }
            if (flag){
                outMap.put("msg","权限删除成功！");
            } else {
                outMap.put("msg","权限删除失败！");
            }
        } else if ("add".equals(oper)){
            //进行添加操作
            flag = resourceService.add(resourcesResponse);
            if (flag){
                outMap.put("msg","权限添加成功！");
            } else {
                outMap.put("msg","权限添加失败！");
            }
        } else if ("edit".equals(oper)){
            flag = resourceService.modify(resourcesResponse);
            if (flag){
                outMap.put("msg","权限修改成功！");
            } else {
                outMap.put("msg","权限修改失败！");
            }
        }
        outMap.put("flag",flag);
        return outMap ;
    }

}
