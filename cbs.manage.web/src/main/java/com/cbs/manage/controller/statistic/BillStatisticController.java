//package com.cbs.manage.controller.statistic;
//
//import com.cbs.manage.util.CbsOtherApiUtil;
//import com.lifeix.cbs.api.common.util.CbsTimeUtils;
//
//import org.json.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//
//import java.io.BufferedInputStream;
//import java.io.BufferedOutputStream;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.OutputStream;
//import java.util.Calendar;
//import java.util.Date;
//
//import javax.servlet.ServletOutputStream;
//import javax.servlet.http.HttpServletResponse;
//
///**
// * Created by lhx on 15-12-22 上午11:40
// *
// * @Description
// */
//@Controller
//@RequestMapping("/statistic/bill")
//public class BillStatisticController {
//
//    protected static Logger LOG = LoggerFactory.getLogger(BillStatisticController.class);
//
//    // 跳转到页面
//    @RequestMapping("/show")
//    public String show() {
//	return "statistic/statistic_bill_list";
//    }
//
//    /**
//     * 查找球队
//     *
//     * @return
//     *
//     *
//     *         start_time=1464710400 end_time=1467216000 source=CBS
//     */
//    @RequestMapping(value = "/data")
//    @ResponseBody
//    public void search(String source, String start_time, Integer limit, Long start_id, Integer num,HttpServletResponse response) {
//	Date startDate = CbsTimeUtils.getDateByFormatDate(start_time);
//	Date endDate = getEndDate(startDate,limit);
//	Long start = startDate.getTime()/1000;
//	Long end = endDate.getTime()/1000;
//	try {
//	    //把时间转换为需要的格式10位
//	    JSONObject ret = CbsOtherApiUtil.getInstance().billStatistic(source, start, end,start_id,num);
//	    response.getWriter().print(ret.toString());
//	} catch (IOException e) {
//	    LOG.error(e.getMessage(), e);
//	}
//    }
//
//    private Date getEndDate(Date time, Integer limit) {
//	Calendar calendar = Calendar.getInstance();
//	calendar.setTime(time);
//	calendar.add(Calendar.DAY_OF_YEAR, limit);
//	return calendar.getTime();
//    }
//
//}
