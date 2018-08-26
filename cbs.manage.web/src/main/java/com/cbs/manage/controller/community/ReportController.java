//package com.cbs.manage.controller.community;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import javax.annotation.Resource;
//import javax.servlet.http.HttpServletRequest;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import com.lifeix.community.model.Page;
//import com.lifeix.community.model.Report;
//import com.lifeix.community.report.service.ReportService;
//import com.lifeix.exception.service.L99IllegalDataException;
//import com.lifeix.exception.service.L99RunTimeException;
//
///**
// * Created by gcc on 25-2-16 下午16:20
// *
// * @Description 举报管理
// */
//@Controller
//@RequestMapping("/community/reports")
//public class ReportController {
//
//    protected static Logger logger = LoggerFactory.getLogger(ReportController.class);
//
//    @Resource(name = "reportService")
//    private ReportService reportService;
//
//    // 跳转到列表页面
//    @RequestMapping("/show")
//    public String show() {
//        return "community/report_page";
//    }
//
//    @RequestMapping("/posts/list")
//    @ResponseBody
//    public Map<String, Object> queryPostsByPage(boolean reportTimeDesc, int status, HttpServletRequest request) {
//        int iDisplayStart = Integer.parseInt(request.getParameter("iDisplayStart"));
//        int iDisplayLength = Integer.parseInt(request.getParameter("iDisplayLength"));
//        int pageNo = iDisplayStart / iDisplayLength + 1;
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        Report report = new Report();
//        report.setReportType(1);
//        if (2 != status)
//            report.setStatus(status);
//        Page<Report> reportsPage = null;
//        try {
//            reportsPage = reportService.getReportsPage(report, pageNo, iDisplayLength, reportTimeDesc);
//        } catch (L99IllegalDataException e) {
//            logger.error(e.getMessage(), e);
//        }
//        if (reportsPage != null) {
//            outMap.put("reports", reportsPage.getData());
//            int number = (int) reportsPage.getCount();
//            outMap.put("iTotalRecords", number);
//            outMap.put("iTotalDisplayRecords", number);
//            outMap.put("number", reportsPage.getData().size());
//            outMap.put("msg", "get data success");
//            outMap.put("code", 200);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//            outMap.put("code", 10001);
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/comments/list")
//    @ResponseBody
//    public Map<String, Object> queryCommentsByPage(boolean reportTimeDesc, int status,
//            HttpServletRequest request) {
//        int iDisplayStart = Integer.parseInt(request.getParameter("iDisplayStart"));
//        int iDisplayLength = Integer.parseInt(request.getParameter("iDisplayLength"));
//        int pageNo = iDisplayStart / iDisplayLength + 1;
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        Report report = new Report();
//        report.setReportType(2);
//        if (2 != status)
//            report.setStatus(status);
//        Page<Report> reportsPage = null;
//        try {
//            reportsPage = reportService.getReportsPage(report, pageNo, iDisplayLength, reportTimeDesc);
//        } catch (L99IllegalDataException e) {
//            logger.error(e.getMessage(), e);
//        }
//        if (reportsPage != null) {
//            outMap.put("reports", reportsPage.getData());
//            int number = (int) reportsPage.getCount();
//            outMap.put("iTotalRecords", number);
//            outMap.put("iTotalDisplayRecords", number);
//            outMap.put("number", reportsPage.getData().size());
//            outMap.put("msg", "get data success");
//            outMap.put("code", 200);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//            outMap.put("code", 10001);
//        }
//        return outMap;
//    }
//
//    @RequestMapping("/reply")
//    @ResponseBody
//    public Map<String, Object> replyComment(String id, String reply) {
//        Map<String, Object> outMap = new HashMap<String, Object>();
//        boolean bool = false;
//        try {
//            Report report = new Report();
//            report.setId(id);
//            report = reportService.getReports(report).get(0);
//            report.setReply(reply);
//            bool = reportService.updateReport(report);
//        } catch (L99IllegalDataException e) {
//            logger.error(e.getMessage(), e);
//        } catch (L99RunTimeException e) {
//            logger.error(e.getMessage(), e);
//        }
//        if (bool) {
//            outMap.put("msg", "reply report success");
//            outMap.put("code", 200);
//        } else {
//            outMap.put("msg", "服务器端无数据返回！");
//            outMap.put("code", 10001);
//        }
//        return outMap;
//    }
//
//}
