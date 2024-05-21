package ro.expensestracker.service;

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
import ro.expensestracker.entity.Category;
import ro.expensestracker.entity.User;
import ro.expensestracker.mapper.UserMapper;
import ro.expensestracker.repository.CategoryRepository;
import ro.expensestracker.repository.UserRepository;
import ro.expensestracker.security.JwtTokenGenerator;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenGenerator jwtTokenGenerator;
    private final CategoryRepository categoryRepository;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenGenerator jwtTokenGenerator,
                       CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenGenerator = jwtTokenGenerator;
        this.categoryRepository = categoryRepository;
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

        User userFromDB = userRepository.save(user);

        List<Category> categories = new ArrayList<>();
        categories.add(new Category(0L, "Food", userFromDB));
        categories.add(new Category(0L, "Car", userFromDB));
        categories.add(new Category(0L, "House", userFromDB));
        categories.add(new Category(0L, "Gym", userFromDB));
        categories.add(new Category(0L, "Entertainment", userFromDB));

        for (Category category : categories) {
            categoryRepository.save(category);
        }
        System.out.println("Registration successful!");
        return new ResponseEntity<>(new ResponseDto("Registration successful"), HttpStatus.CREATED);
    }

    public ResponseEntity<AuthResponseDto> login(UserDto userDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
    }
}