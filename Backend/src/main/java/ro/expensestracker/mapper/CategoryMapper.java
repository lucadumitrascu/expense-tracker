package ro.expensestracker.mapper;

import org.springframework.stereotype.Component;
import ro.expensestracker.dto.CategoryDto;
import ro.expensestracker.entity.Category;

@Component
public class CategoryMapper {

    public static Category toCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setId(categoryDto.getId());
        category.setName(categoryDto.getName());

        return category;
    }

    public static CategoryDto toCategoryDto(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId());
        categoryDto.setName(category.getName());
        categoryDto.setUserId(category.getUser().getId());

        return categoryDto;
    }
}
