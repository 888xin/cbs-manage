package com.cbs.common.util;

import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.encoding.PasswordEncoder;

/**
 * Created by xin on 14-5-8.
 */
public class MD5Encoder implements PasswordEncoder {
    @Override
    public String encodePassword(String origPwd, Object salt) throws DataAccessException {
        return MD5.getMD5ofStr(origPwd);
    }

    @Override
    public boolean isPasswordValid(String encPwd, String origPwd, Object salt) throws DataAccessException {
        return encPwd.equals(encodePassword(origPwd, salt));
    }
}
