package com.foodyexpress.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodyexpress.exception.AdminException;
import com.foodyexpress.model.Admin;
import com.foodyexpress.service.AdminService;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/new")
	public ResponseEntity<String> createAdmin(String email) throws AdminException{
		String result=adminService.createNewAdmin(email);
		return new ResponseEntity<String>(result, HttpStatus.CREATED);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Admin>>  getAllAdmin() throws AdminException{
		List<Admin> list = adminService.getAllAdmin();
		return new ResponseEntity<List<Admin>>(list,HttpStatus.OK);
	}

}
