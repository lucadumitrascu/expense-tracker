package ro.expensestracker.mapper;

import org.springframework.stereotype.Component;
import ro.expensestracker.dto.ExpenseDto;
import ro.expensestracker.entity.Expense;

@Component
public class ExpenseMapper {


    public static Expense toExpense(ExpenseDto expenseDto) {
        Expense expense = new Expense();
        expense.setId(expenseDto.getId());
        expense.setCategory(expenseDto.getCategory());
        expense.setSum(expenseDto.getSum());
        expense.setDate(expenseDto.getDate());

        return expense;
    }

    public ExpenseDto toExpenseDto(Expense expense) {
        ExpenseDto expenseDto = new ExpenseDto();
        expenseDto.setId(expense.getId());
        expenseDto.setCategory(expense.getCategory());
        expenseDto.setSum(expense.getSum());
        expenseDto.setDate(expense.getDate());
        expenseDto.setUserId(expense.getUser() != null ? expense.getUser().getId() : null);

        return expenseDto;
    }
}
