package ro.expensestracker.dto;

import java.math.BigDecimal;
import java.util.Date;

public class ExpenseDto {
    private Long id;
    private String category;
    private BigDecimal sum;
    private Date date;
    private Long userId;

    public ExpenseDto(Long id, String category, BigDecimal sum, Date date, Long userId) {
        this.id = id;
        this.category = category;
        this.sum = sum;
        this.date = date;
        this.userId = userId;
    }

    public ExpenseDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getSum() {
        return sum;
    }

    public void setSum(BigDecimal sum) {
        this.sum = sum;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}

