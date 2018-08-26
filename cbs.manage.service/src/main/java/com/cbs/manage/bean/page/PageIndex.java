package com.cbs.manage.bean.page;

/**
 * Created by lhx on 15-9-21 上午10:30
 *
 * @Description
 */
public class PageIndex {
    private long startindex;
    private long endindex;

    public PageIndex(long startindex, long endindex) {
        this.startindex = startindex;
        this.endindex = endindex;
    }
    public long getStartindex() {
        return startindex;
    }
    public void setStartindex(long startindex) {
        this.startindex = startindex;
    }
    public long getEndindex() {
        return endindex;
    }
    public void setEndindex(long endindex) {
        this.endindex = endindex;
    }
}
