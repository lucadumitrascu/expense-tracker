package ro.expensestracker.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ro.expensestracker.dto.LoginDto;
import ro.expensestracker.dto.ResponseDto;
import ro.expensestracker.dto.UserDto;
import ro.expensestracker.service.UserService;

@RestController
@Validated
@RequestMapping("/authentication")
public class UserController {

    UserService userService;

    @Autowired
    UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> register(@RequestBody UserDto userDto) {
        userService.register(userDto);
        return new ResponseEntity<>(new ResponseDto("The account has been successfully created"), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDto> login(@RequestBody LoginDto loginDto, HttpServletRequest request, HttpServletResponse response) {
        userService.login(loginDto, request, response);
        return new ResponseEntity<>(new ResponseDto("you have been successfully logged in"), HttpStatus.OK);
    }

    @GetMapping("/checkAuthentication")
    public ResponseEntity<Boolean> checkAuthentication(HttpServletRequest request) {
        if (userService.isAuthenticated(request))
            return new ResponseEntity<>(true, HttpStatus.OK);
        else return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);

    }
}
