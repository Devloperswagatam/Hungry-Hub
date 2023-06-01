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

import com.foodyexpress.exception.CategoryException;
import com.foodyexpress.exception.FoodCartException;
import com.foodyexpress.exception.ItemException;
import com.foodyexpress.exception.LoginException;
import com.foodyexpress.model.CategoryDTO;
import com.foodyexpress.model.Item;
import com.foodyexpress.model.ItemDTO;
import com.foodyexpress.service.ItemService;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/items")
public class ItemController {

	@Autowired
	private ItemService itemService;

	@GetMapping("/all")
	public ResponseEntity<List<Item>> getAllItem(@RequestHeader String key)
			throws ItemException, LoginException {
		List<Item> itemList = itemService.getAllItem(key);
		return new ResponseEntity<List<Item>>(itemList, HttpStatus.OK);
	}
	
	@GetMapping("/view/{cartId}")
	public ResponseEntity<List<Item>> getItemsByCartIdHandler(@PathVariable("cartId") Integer cartId)
	        throws FoodCartException,ItemException,LoginException {
	    List<Item> items = itemService.getItemsByCartId(cartId);
	    return new ResponseEntity<List<Item>>(items, HttpStatus.OK);
	}


	@GetMapping("/category")
	public ResponseEntity<List<Item>> getAllItemByCategory(@RequestParam(required = false) String key,
			@RequestBody CategoryDTO categoryDTO) throws ItemException, CategoryException, LoginException {
		List<Item> itemList = itemService.getAllItemByCategory(key, categoryDTO);
		return new ResponseEntity<List<Item>>(itemList, HttpStatus.OK);
	}

	@GetMapping("/get/{categoryName}")
	public ResponseEntity<List<Item>> getAllItemByCategoryName(@RequestParam(required = false) String key,
			@PathVariable String categoryName) throws ItemException, CategoryException, LoginException {
		List<Item> itemList = itemService.getAllItemByCategoryName(key, categoryName);
		return new ResponseEntity<List<Item>>(itemList, HttpStatus.OK);
	}

	@PostMapping("/add")
	public ResponseEntity<Item> addItem(@RequestParam(required = false) String key, @RequestBody Item item)
			throws ItemException, CategoryException, LoginException {
		
		HttpHeaders headers = new HttpHeaders();
		headers.add("key", key);
		Item savedItem = itemService.addItem(key, item);

		return new ResponseEntity<Item>(savedItem,headers, HttpStatus.CREATED);
	}

	@PutMapping("/update/{itemId}")
	public ResponseEntity<Item> updateItem(@RequestHeader String key, @PathVariable("itemId") Integer itemId,
			@RequestBody ItemDTO itemDTO)
			throws ItemException, CategoryException, LoginException {
		System.out.println("In controller the id is: "+itemId);
		Item updatedItem = itemService.updateItem(key, itemId, itemDTO);

		return new ResponseEntity<Item>(updatedItem, HttpStatus.OK);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<Item> removeItem(@RequestParam(required = false) String key, @RequestBody ItemDTO itemDTO)
			throws ItemException, LoginException {
		Item deletedItem = itemService.removeItem(key, itemDTO);

		return new ResponseEntity<Item>(deletedItem, HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Item> removeItemById(@RequestParam(required = false) String key,
			@PathVariable("id") Integer id) throws ItemException, LoginException {
		Item deletedItem = itemService.removeItemById(key, id);

		return new ResponseEntity<Item>(deletedItem, HttpStatus.OK);
	}
	

}
