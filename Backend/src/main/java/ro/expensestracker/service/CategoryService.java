package ro.expensestracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.expensestracker.dto.CategoryDto;
import ro.expensestracker.entity.Category;
import ro.expensestracker.mapper.CategoryMapper;
import ro.expensestracker.repository.CategoryRepository;

import java.util.List;

@Service
public class CategoryService {

    CategoryRepository categoryRepository;
    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();

        List<CategoryDto> categoryDtos = categories.stream()
                .map(CategoryMapper::toCategoryDto)
                .toList();

        return new ResponseEntity<>(categoryDtos, HttpStatus.OK);
    }

    public ResponseEntity<CategoryDto> createCategory(CategoryDto categoryDto) {
        Category category = CategoryMapper.toCategory(categoryDto);
        categoryRepository.save(category);
        return new ResponseEntity<>(categoryDto,HttpStatus.CREATED);
    }

    public ResponseEntity<String> deleteCategory(Long id) {
        categoryRepository.deleteById(id);
        return new ResponseEntity<>("Category was deleted successfully!",HttpStatus.OK);
    }
}
