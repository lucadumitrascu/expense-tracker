package ro.expensestracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ro.expensestracker.dto.UserDto;
import ro.expensestracker.entity.User;
import ro.expensestracker.mapper.UserMapper;
import ro.expensestracker.repository.UserRepository;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get user details for current authenticated user
    public ResponseEntity<UserDto> getUserDetails() {
        UserDto userDto = new UserDto();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> userOptional = userRepository.findByUsername(authentication.getName());
        if (userOptional.isPresent()) {
            userDto = UserMapper.toUserDto(userOptional.get());
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(userDto, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<BigDecimal> updateUserBudget(BigDecimal budget) {
        User user;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> userOptional = userRepository.findByUsername(authentication.getName());
        if (userOptional.isPresent()) {
            user = userOptional.get();
            user.setBudget(budget);
            userRepository.save(user);
            return new ResponseEntity<>(budget, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(budget, HttpStatus.NOT_FOUND);
        }
    }
}
