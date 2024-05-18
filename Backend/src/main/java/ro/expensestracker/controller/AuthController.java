package ro.expensestracker.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ro.expensestracker.dto.AuthResponseDto;
import ro.expensestracker.dto.ResponseDto;
import ro.expensestracker.dto.UserDto;
import ro.expensestracker.service.AuthService;

@RestController
@Validated
@RequestMapping("/authentication")
public class AuthController {

    AuthService authService;

    @Autowired
    AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDto> register(@Valid @RequestBody UserDto userDto) {
        return authService.register(userDto);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@Valid @RequestBody UserDto userDto) {
        return authService.login(userDto);
    }

    @GetMapping("/checkAuthentication")
    public ResponseEntity<Boolean> checkAuthentication(HttpServletRequest request) {
        if (authService.isAuthenticated(request))
            return new ResponseEntity<>(true, HttpStatus.OK);
        else return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);

    }
}
