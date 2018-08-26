package com.cbs.manage.dao.base;

import com.cbs.manage.bean.page.PageView;

import java.util.List;

/**
 * 集合持久层的公用的增，删，改，查接口
 * <T> 表示传入实体类
 * @param <T>
 */
public interface BaseDao<T> {
	/**
	 * 返回分页后的数据
	 * @param pageView
	 * @param t
	 * @return
	 */
	public List<T> query(PageView pageView, T t);
	/**
	 * 返回所有数据
	 * @param t
	 * @return
	 */
	public List<T> queryAll(T t);
	public boolean delete(long id);
	public boolean modify(T t);
	public T getById(String id);
	public boolean add(T t);
}
