package ro.expensestracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ro.expensestracker.dto.ExpenseDto;
import ro.expensestracker.entity.Expense;
import ro.expensestracker.entity.User;
import ro.expensestracker.mapper.ExpenseMapper;
import ro.expensestracker.repository.ExpenseRepository;
import ro.expensestracker.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;
    private final UserRepository userRepository;

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository, ExpenseMapper expenseMapper, UserRepository userRepository) {
        this.expenseRepository = expenseRepository;
        this.expenseMapper = expenseMapper;
        this.userRepository = userRepository;
    }

    public List<ExpenseDto> getAllExpenses() {
        List<Expense> expenses = expenseRepository.findAll();
        return expenses.stream()
                .map(expenseMapper::toExpenseDto)
                .collect(Collectors.toList());
    }

    public Optional<ExpenseDto> getExpenseById(Long id) {
        Optional<Expense> expenseOptional = expenseRepository.findById(id);
        return expenseOptional.map(expenseMapper::toExpenseDto);
    }

    public ExpenseDto createExpense(ExpenseDto expenseDto) {
        Expense expense = ExpenseMapper.toExpense(expenseDto);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        Optional<User> currentUserOptional = userRepository.findByEmail(currentUsername);
        if (currentUserOptional.isPresent()) {
            User currentUser = currentUserOptional.get();
            expense.setUser(currentUser);
        }

        Expense savedExpense = expenseRepository.save(expense);
        return expenseMapper.toExpenseDto(savedExpense);
    }

    public ExpenseDto updateExpense(Long id, ExpenseDto expenseDto) {
        Expense expense = ExpenseMapper.toExpense(expenseDto);
        expense.setId(id);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        Optional<User> currentUserOptional = userRepository.findByEmail(currentUsername);
        if (currentUserOptional.isPresent()) {
            User currentUser = currentUserOptional.get();
            expense.setUser(currentUser);
        }

        Expense updatedExpense = expenseRepository.save(expense);
        return expenseMapper.toExpenseDto(updatedExpense);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}
