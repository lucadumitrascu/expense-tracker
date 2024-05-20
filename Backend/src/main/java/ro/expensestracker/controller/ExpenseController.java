package ro.expensestracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.expensestracker.dto.ExpenseDto;
import ro.expensestracker.service.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<ExpenseDto> createExpense(@RequestBody ExpenseDto expenseDto) {
        return expenseService.createExpense(expenseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDto> updateExpense(@PathVariable Long id, @RequestBody ExpenseDto expenseDto) {
        return expenseService.updateExpense(id, expenseDto);
    }

    @PutMapping
    public ResponseEntity<String> updateAllExpenses(@RequestBody List<ExpenseDto> expenses) {
        return expenseService.updateAllExpenses(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ExpenseDto> deleteExpense(@PathVariable Long id) {
        return expenseService.deleteExpense(id);
    }
}
