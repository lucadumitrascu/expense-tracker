package ro.expensestracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ro.expensestracker.dto.CategoryDto;
import ro.expensestracker.entity.Category;
import ro.expensestracker.entity.User;
import ro.expensestracker.mapper.CategoryMapper;
import ro.expensestracker.repository.CategoryRepository;
import ro.expensestracker.repository.UserRepository;

import java.util.Optional;

@Service
public class CategoryService {

    CategoryRepository categoryRepository;
    UserRepository userRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository,
                           UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }


    public ResponseEntity<CategoryDto> createCategory(CategoryDto categoryDto) {
        Category category = CategoryMapper.toCategory(categoryDto);
        category.setUser(getAuthenticatedUser());
        Category categoryWithUpdatedId = categoryRepository.save(category);
        categoryDto.setId(categoryWithUpdatedId.getId());
        return new ResponseEntity<>(categoryDto,HttpStatus.CREATED);
    }

    public ResponseEntity<String> deleteCategory(Long id) {
        categoryRepository.deleteById(id);
        return new ResponseEntity<>("Category was deleted successfully!",HttpStatus.OK);
    }

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<User> userOptional = userRepository.findByUsername(authentication.getName());
        return userOptional.orElse(null);
    }
}
