package ro.expensestracker.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.expensestracker.dto.UserDto;
import ro.expensestracker.service.UserService;

import java.math.BigDecimal;


@RestController
@RequestMapping("/users")
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/details")
    public ResponseEntity<UserDto> getUserInfo() {
        return userService.getUserDetails();
    }

    @PutMapping("/budget")
    public ResponseEntity<BigDecimal> updateBudget(@RequestBody BigDecimal budget) {
        return userService.updateUserBudget(budget);
    }
}
