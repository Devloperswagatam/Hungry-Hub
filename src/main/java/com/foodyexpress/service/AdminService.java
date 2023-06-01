package com.foodyexpress.service;

import java.util.List;

import com.foodyexpress.exception.AdminException;
import com.foodyexpress.model.Admin;

public interface AdminService {

	public String createNewAdmin(String email) throws AdminException;
	
	public List<Admin> getAllAdmin()throws AdminException;

}
