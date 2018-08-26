package com.cbs.manage.bean.im;

import java.io.Serializable;

/**
 * 
 * @author lifeix
 * 
 */
public class ImUserBlockResponse implements Serializable {

    private static final long serialVersionUID = -2070528779652243871L;

    /**
     * 用户Id
     */
    private Long user_id;

    /**
     * 用户姓名
     */
    private String user_name;

    /**
     * 用户头像
     */
    private String user_path;

    /**
     * 用户龙号
     */
    private Long user_no;

    /**
     * 0 禁言 1 屏蔽
     */
    private int block_statu;

    /**
     * 创建时间
     */
    private Long create_time;

    /**
     * 解禁时间
     */
    private String remove_time;

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_path() {
        return user_path;
    }

    public void setUser_path(String user_path) {
        this.user_path = user_path;
    }

    public Long getUser_no() {
        return user_no;
    }

    public void setUser_no(Long user_no) {
        this.user_no = user_no;
    }

    public int getBlock_statu() {
        return block_statu;
    }

    public void setBlock_statu(int block_statu) {
        this.block_statu = block_statu;
    }

    public Long getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Long create_time) {
        this.create_time = create_time;
    }

    public String getRemove_time() {
        return remove_time;
    }

    public void setRemove_time(String remove_time) {
        this.remove_time = remove_time;
    }
 
}
