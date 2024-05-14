package ro.expensestracker.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import ro.expensestracker.dto.LoginDto;
import ro.expensestracker.dto.ResponseDto;
import ro.expensestracker.dto.UserDto;
import ro.expensestracker.entity.User;
import ro.expensestracker.mapper.UserMapper;
import ro.expensestracker.repository.UserRepository;

import java.math.BigDecimal;
import java.util.Optional;


@Service
public class UserService {
    private final SecurityContextRepository repository = new HttpSessionSecurityContextRepository();
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    public void register(UserDto userDto) {
        User user = UserMapper.toUser(userDto);
        if(user.getBudget() == null) {
            user.setBudget(BigDecimal.valueOf(300.00));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("Registration successful!");
        userRepository.save(user);
    }

    public ResponseEntity<ResponseDto> login(LoginDto loginDto, HttpServletRequest request, HttpServletResponse response) {
        Optional<User> userOptional = userRepository.findByEmail(loginDto.getEmail());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
                SecurityContext securityContext = SecurityContextHolder.getContext();
                securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(user.getEmail(), null, null));
                repository.saveContext(securityContext, request, response);
                System.out.println("Login successful!");
                return new ResponseEntity<>(new ResponseDto("Login successful"), HttpStatus.OK);

            } else {
                return new ResponseEntity<>(new ResponseDto("Invalid credentials"), HttpStatus.UNAUTHORIZED);

            }
        } else {
            return new ResponseEntity<>(new ResponseDto("User not found"), HttpStatus.NOT_FOUND);

        }
    }

    public boolean isAuthenticated(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication instanceof UsernamePasswordAuthenticationToken;
    }

    public ResponseEntity<UserDto> getUserDetails(String email) {
        if (email == null || email.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        UserDto userDto = new UserDto();
        Optional<User> userOptional = userRepository.findByEmail(email);
        System.out.println(email);
        if (userOptional.isPresent()) {
            userDto = UserMapper.toUserDto(userOptional.get());
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(userDto,HttpStatus.NOT_FOUND);
        }
    }

}