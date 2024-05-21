package ro.expensestracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.expensestracker.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
