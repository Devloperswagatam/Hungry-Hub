package com.foodyexpress.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodyexpress.exception.LoginException;
import com.foodyexpress.model.LoginDTO;
import com.foodyexpress.service.LoginService;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/app")
public class LoginLogoutController {

	@Autowired
	private LoginService loginService;

	@PostMapping("/login")
	public ResponseEntity<String> logIn(@RequestBody LoginDTO loginDTO) throws LoginException {
		String key = loginService.loginAccount(loginDTO);
		System.out.println("The key is "+key);
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("key", key);
		headers.add("Access-Control-Expose-Headers", "key");
		
		return new ResponseEntity<>(key,headers ,HttpStatus.OK);
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestHeader String role,
			@RequestHeader String key) throws LoginException {
		String result = loginService.logoutAccount(role, key);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

}
