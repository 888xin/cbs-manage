//package com.cbs.manage.controller.content;
//
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.danga.MemCached.MemCachedClient;
//import com.danga.MemCached.SockIOPool;
//import org.json.JSONObject;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.HashMap;
//import java.util.LinkedList;
//import java.util.Map;
//import java.util.Properties;
//
///**
// * Created by lhx on 2016/7/14 15:25
// *
// * @Description
// */
//@Controller
//@RequestMapping("/memcache")
//public class MemcacheController {
//
//    private String memcachedUrl = null;
//
//    private static LinkedList<String> tmpList1 = new LinkedList<>();
//    private static LinkedList<String> tmpList2 = new LinkedList<>();
//    private static LinkedList<String> tmpList3 = new LinkedList<>();
//
//    static {
//        tmpList1.addFirst("com.lifeix.cbs.contest.dao.fb.impl.FbContestDaoImpl");
//        tmpList2.addFirst("com.lifeix.cbs.contest.dao.fb.impl.FbContestDaoImpl");
//        tmpList1.addFirst("com.lifeix.cbs.contest.dao.bb.impl.BbContestDaoImpl");
//        tmpList2.addFirst("com.lifeix.cbs.contest.dao.bb.impl.BbContestDaoImpl");
//    }
//
//    // 跳转到列表页面
//    @RequestMapping("/show")
//    public String show() {
//        return "content/memcache_delete";
//    }
//
//
//    @RequestMapping("/delete/{type}")
//    @ResponseBody
//    public Map<String, Object> delete(String name, String ids, Long idStart, Long idEnd, @PathVariable Integer type) {
//        Map<String, Object> outMap = new HashMap<>();
//        JSONObject ret = CbsOtherApiUtil.getInstance().deleteMemcache(name, ids, idStart, idEnd, type);
//        if (ret != null) {
//            int code = ret.optInt("code");
//            if (code != 200) {
//                outMap.put("msg", ret.optString("msg"));
//            }
//            outMap.put("code", code);
//        } else {
//            outMap.put("msg", "服务器端出错！");
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/delete/local/{type}")
//    @ResponseBody
//    public Map<String, Object> deleteMemcache(String name, String ids, Long idStart, Long idEnd, @PathVariable Integer type, Integer ip) throws IOException {
//        Map<String, Object> outMap = new HashMap<>();
//        if (memcachedUrl == null) {
//            InputStream in = getClass().getResourceAsStream("/conf/settings.properties");
//            Properties p = new Properties();
//            p.load(in);
//            in.close();
//            memcachedUrl = p.getProperty("memcache.url");
//        }
//        if (memcachedUrl == null){
//            outMap.put("msg", "读取memcached地址出错！");
//            outMap.put("code", 500);
//        }
//        String[] urls = memcachedUrl.split(";");
//        String[] addr;
//        if (ip == null) {
//            addr = urls[0].split(",");
//        } else {
//            addr = urls[ip].split(",");
//        }
//
//        MemCachedClient client = new MemCachedClient();
//        SockIOPool pool = SockIOPool.getInstance();
//        pool.setServers(addr);
//        pool.initialize();
//        int num = 0 ;
//        switch (type){
//            case 1:
//                String[] idArray = ids.split(",");
//                for (String s : idArray) {
//                    String idStr = String.format("%s:id:%s", name, s);
//                    boolean flag = client.delete(idStr);
//                    if (flag){
//                        num ++ ;
//                    }
//                }
//                //保存曾经查询过的记录
//                if (!tmpList1.contains(name)){
//                    tmpList1.addFirst(name);
//                    if (tmpList1.size() > 10){
//                        tmpList1.removeLast();
//                    }
//                }
//                break;
//            case 2:
//                for (long i = idStart; i < idEnd + 1; i++) {
//                    String idStr = String.format("%s:id:%s", name, i+"");
//                    boolean flag = client.delete(idStr);
//                    if (flag){
//                        num ++ ;
//                    }
//                }
//                //保存曾经查询过的记录
//                if (!tmpList2.contains(name)){
//                    tmpList2.addFirst(name);
//                    if (tmpList2.size() > 10){
//                        tmpList2.removeLast();
//                    }
//                }
//                break;
//            default:
//                boolean flag = client.delete(name);
//                if (flag){
//                    num ++ ;
//                    //保存曾经查询过的记录
//                    if (!tmpList3.contains(name)){
//                        tmpList3.addFirst(name);
//                        if (tmpList3.size() > 10){
//                            tmpList3.removeLast();
//                        }
//                    }
//                }
//        }
//        outMap.put("msg", "成功删除" + num + "条记录");
//        outMap.put("code", 200);
//        return outMap;
//    }
//
//
//    @RequestMapping("/get/{type}")
//    @ResponseBody
//    public Map<String, Object> get(@PathVariable Integer type) throws IOException {
//        Map<String, Object> outMap = new HashMap<>();
//        switch (type){
//            case 1:
//                outMap.put("list", tmpList1);
//                break;
//            case 2:
//                outMap.put("list", tmpList2);
//                break;
//            default:
//                outMap.put("list", tmpList3);
//        }
//        outMap.put("code", 200);
//        return outMap;
//    }
//
//}
