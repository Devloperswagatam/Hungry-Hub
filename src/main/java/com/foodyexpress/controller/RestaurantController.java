package com.foodyexpress.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodyexpress.exception.AddressException;
import com.foodyexpress.exception.CustomerException;
import com.foodyexpress.exception.ItemException;
import com.foodyexpress.exception.LoginException;
import com.foodyexpress.exception.RestaurantException;
import com.foodyexpress.model.Customer;
import com.foodyexpress.model.Item;
import com.foodyexpress.model.Restaurant;
import com.foodyexpress.service.AddressService;
import com.foodyexpress.service.RestaurantService;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

	@Autowired
	private RestaurantService resService;

	@PostMapping("/add")
	public ResponseEntity<Restaurant> addRestaurant(@RequestParam(required = false) String key,
			@RequestBody Restaurant res) throws RestaurantException, LoginException {
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("key", key);
		Restaurant restaurant = resService.addRestaurant(key, res);
		return new ResponseEntity<Restaurant>(restaurant,headers, HttpStatus.ACCEPTED);
	}

	@PutMapping("/update/{restaurantId}")
	public ResponseEntity<Restaurant> updateRestaurant(@RequestHeader String key,@PathVariable("restaurantId") Integer restaurantId,
			@RequestBody Restaurant restaurant) throws RestaurantException, LoginException {
		System.out.println("The restaurant id "+restaurantId);
		Restaurant returnRestaurant = resService.updateRestaurant(key,restaurantId ,restaurant);
		return new ResponseEntity<Restaurant>(returnRestaurant, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{restaurantId}")
	public ResponseEntity<Restaurant> deleteRestaurant(@RequestHeader String key, @PathVariable("restaurantId") Integer restaurantId)
			throws RestaurantException, LoginException {
		Restaurant restaurant = resService.removeRestaurant(key, restaurantId);
		return new ResponseEntity<Restaurant>(restaurant, HttpStatus.OK);
	}

	@GetMapping("/view/{id}")
	public ResponseEntity<Restaurant> viewRestaurant(@RequestParam(required = false) String key,
			@PathVariable("id") Integer restaurantId) throws RestaurantException, LoginException {
		Restaurant restaurant = resService.viewRestaurantById(key, restaurantId);
		return new ResponseEntity<Restaurant>(restaurant, HttpStatus.OK);
	}

	@GetMapping("/view")
	public ResponseEntity<List<Restaurant>> viewAllRestaurant(@RequestHeader String key)
			throws RestaurantException, LoginException {
		List<Restaurant> restaurant = resService.getAllRestaurants(key);
		return new ResponseEntity<List<Restaurant>>(restaurant, HttpStatus.OK);
	}

	@GetMapping("/findNearByRestaurantByCity/{city}")
	public ResponseEntity<List<Restaurant>> findNearByRestaurantByCityHandler(
			@RequestParam(required = false) String key, @PathVariable("city") String city)
			throws RestaurantException, AddressException, LoginException {
		List<Restaurant> restaurantList = resService.viewNearByRestaurant(key, city);
		return new ResponseEntity<List<Restaurant>>(restaurantList, HttpStatus.OK);
	}

	@GetMapping("/findNearByRestaurantByItemName/{item}")
	public ResponseEntity<List<Restaurant>> viewRestaurantByItemNameHandler(@RequestParam(required = false) String key,
			@PathVariable("item") String item) throws RestaurantException, ItemException, LoginException {
		List<Restaurant> restaurantList = resService.viewRestaurantByItemName(key, item);
		return new ResponseEntity<List<Restaurant>>(restaurantList, HttpStatus.OK);
	}
	
	@GetMapping("/{restaurantId}/items")
	public ResponseEntity<List<Item>> getRestaurantItemList(@PathVariable Integer restaurantId) throws RestaurantException {
	    List<Item> itemList = resService.getRestaurantItemList(restaurantId);
	    return new ResponseEntity<List<Item>>(itemList, HttpStatus.OK);
	}

}
