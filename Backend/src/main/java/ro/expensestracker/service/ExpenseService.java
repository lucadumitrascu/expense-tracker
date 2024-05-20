package ro.expensestracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public ResponseEntity<ExpenseDto> createExpense(ExpenseDto expenseDto) {
        Expense expense = ExpenseMapper.toExpense(expenseDto);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        Optional<User> currentUserOptional = userRepository.findByUsername(currentUsername);
        if (currentUserOptional.isPresent()) {
            User currentUser = currentUserOptional.get();
            expense.setUser(currentUser);
            Expense savedExpense = expenseRepository.save(expense);
            return new ResponseEntity<>(expenseMapper.toExpenseDto(savedExpense), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(expenseDto, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ExpenseDto> updateExpense(Long id, ExpenseDto expenseDto) {
        expenseDto.setId(id);
        Expense expense = ExpenseMapper.toExpense(expenseDto);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        Optional<User> currentUserOptional = userRepository.findByUsername(currentUsername);
        if (currentUserOptional.isPresent()) {
            User currentUser = currentUserOptional.get();
            expense.setUser(currentUser);
            return new ResponseEntity<>(expenseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(expenseDto, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<ExpenseDto> deleteExpense(Long id) {
        ExpenseDto expenseDto = new ExpenseDto();
        if (expenseRepository.findById(id).isPresent()) {
            expenseDto = expenseMapper.toExpenseDto(expenseRepository.findById(id).get());
        }
        if (expenseDto.getId() != 0) {
            expenseRepository.deleteById(id);
            return new ResponseEntity<>(expenseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(expenseDto, HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<String> updateAllExpenses(List<ExpenseDto> expenses) {
        Expense expense = new Expense();
        for (ExpenseDto expenseDto : expenses) {
            Optional<Expense> expenseOpt = expenseRepository.findById(expenseDto.getId());
            if (expenseOpt.isPresent()) {
                expense = expenseOpt.get();
                expenseRepository.save(expense);
            } else {
                System.out.println("Invalid expense!");
            }
        }
        return new ResponseEntity<String>("All expenses updated successfully!", HttpStatus.OK);
    }
}
