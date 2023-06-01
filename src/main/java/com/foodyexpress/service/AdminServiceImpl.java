package com.foodyexpress.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodyexpress.exception.AdminException;
import com.foodyexpress.model.Admin;
import com.foodyexpress.repository.AdminRepo;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminRepo adminRepo;

	@Override
	public String createNewAdmin(String email) throws AdminException {
		// TODO Auto-generated method stub

//		String name = "Admin";
//		String email = "admin@gmail.com";
		String password = "password";

		Admin existsAdmin = adminRepo.findByEmail(email);
		if (existsAdmin != null)
			throw new AdminException("Admin Already Exist");

		Admin admin = new Admin();
		admin.setName(admin.getName());
		admin.setEmail(admin.getEmail());
		admin.setPassword(password);
		
		adminRepo.save(admin);

		return "Admin created => Email : " + email + ", Password : " + password;
	}

	@Override
	public List<Admin> getAllAdmin() throws AdminException {
		// TODO Auto-generated method stub
		List<Admin> admins = adminRepo.findAll();
		return admins;
	}

}
