package ro.expensestracker.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.expensestracker.dto.AuthResponseDto;
import ro.expensestracker.dto.ResponseDto;
import ro.expensestracker.dto.UserDto;
import ro.expensestracker.entity.User;
import ro.expensestracker.mapper.UserMapper;
import ro.expensestracker.repository.UserRepository;
import ro.expensestracker.security.JwtTokenGenerator;

import java.math.BigDecimal;


@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenGenerator jwtTokenGenerator;

    @Autowired
    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenGenerator jwtTokenGenerator) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenGenerator = jwtTokenGenerator;
    }


    public ResponseEntity<ResponseDto> register(UserDto userDto) {
        if (userRepository.existsByUsername(userDto.getUsername())) {
            return new ResponseEntity<>(new ResponseDto("Username is taken!"), HttpStatus.BAD_REQUEST);
        }
        User user = UserMapper.toUser(userDto);
        if (user.getBudget() == null) {
            user.setBudget(BigDecimal.valueOf(300.00));
        }
        user.setCurrency("RON");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("Registration successful!");
        userRepository.save(user);
        return new ResponseEntity<>(new ResponseDto("Registration successful"), HttpStatus.CREATED);
    }

    public ResponseEntity<AuthResponseDto> login(UserDto userDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
    }

    public boolean isAuthenticated(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated()
                && authentication instanceof UsernamePasswordAuthenticationToken;
    }
}