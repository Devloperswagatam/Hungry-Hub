package com.foodyexpress.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodyexpress.exception.CustomerException;
import com.foodyexpress.exception.FoodCartException;
import com.foodyexpress.exception.ItemException;
import com.foodyexpress.exception.LoginException;
import com.foodyexpress.model.CustomerDTO;
import com.foodyexpress.model.FoodCart;

import com.foodyexpress.model.ItemDTO;
import com.foodyexpress.service.FoodCartService;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/foodcart")
public class FoodCartController {

	@Autowired
	private FoodCartService foodCartService;

	@PostMapping("/addtocart/{itemId}/{customerId}")
	public ResponseEntity<FoodCart> addItemToCartHandler(
			@PathVariable("customerId") Integer customerId, @PathVariable("itemId") Integer itemId)
			throws ItemException, CustomerException, LoginException {
		System.out.println("The itemid and customerid is "+itemId + customerId);
		FoodCart foodCart = foodCartService.addItemToCart(customerId, itemId);
		return new ResponseEntity<FoodCart>(foodCart, HttpStatus.OK);
	}

	@PutMapping("/increaseQuantity")
	public ResponseEntity<FoodCart> increaseItemQuantityHandler(@RequestParam(required = false) String key,
			@RequestParam Integer cartId, @RequestParam Integer quantity, @RequestParam Integer itemId)
			throws ItemException, CustomerException, FoodCartException, LoginException {
		FoodCart foodCart = foodCartService.increaseItemQuantity(key, cartId, quantity, itemId);
		return new ResponseEntity<FoodCart>(foodCart, HttpStatus.OK);
	}

	@PutMapping("/decreaseQuantity")
	public ResponseEntity<FoodCart> decreaseItemQuantityHandler(@RequestParam(required = false) String key,
			@RequestParam Integer cartId, @RequestParam Integer quantity, @RequestParam Integer itemId)
			throws ItemException, CustomerException, FoodCartException, LoginException {
		FoodCart foodCart = foodCartService.decreaseItemQuantity(key, cartId, quantity, itemId);
		return new ResponseEntity<FoodCart>(foodCart, HttpStatus.OK);
	}

	@DeleteMapping("/{cartId}/{itemId}")
	public ResponseEntity<FoodCart> removeItemHandler(
			@PathVariable("cartId") Integer cartId, @PathVariable("itemId") Integer itemId)
			throws ItemException, CustomerException, FoodCartException, LoginException {
		FoodCart foodCart = foodCartService.removeItem(cartId, itemId);
		return new ResponseEntity<FoodCart>(foodCart, HttpStatus.OK);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<FoodCart> clearCartHandler(@RequestParam(required = false) String key,
			@RequestParam Integer cartId) throws ItemException, CustomerException, FoodCartException, LoginException {
		FoodCart foodCart = foodCartService.removeCart(key, cartId);
		return new ResponseEntity<FoodCart>(foodCart, HttpStatus.OK);
	}

}
