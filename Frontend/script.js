/* ------------------------------------------------------------------------------------ */

/* Default in memory data */

/* ------------------------------------------------------------------------------------ */
function User(name, expenses, budget) {
    this.name = name;
    this.expenses = expenses;
    this.budget = budget;
}

function Expense(category, sum, data) {
    this.category = category;
    this.sum = sum;
    this.data = data;
}
var expenses1 = [
    new Expense("Food", 50, new Date("2024-03-24")),
    new Expense("Gym", 80, new Date("2024-03-24")),
    new Expense("Car", 120, new Date("2024-03-24")),
    new Expense("Food", 60, new Date("2024-03-25")),
    new Expense("Gym", 90, new Date("2024-03-21")),
    new Expense("Car", 110, new Date("2024-03-20")),
    new Expense("Food", 55, new Date("2024-03-23")),
    new Expense("Gym", 85, new Date("2024-03-22")),
    new Expense("Car", 125, new Date("2024-03-21")),
    new Expense("Food", 40, new Date("2024-03-10")),
    new Expense("Gym", 70, new Date("2024-03-11")),
    new Expense("Car", 100, new Date("2024-03-12")),
    new Expense("House", 150, new Date("2024-02-15")),
    new Expense("Gym", 200, new Date("2024-02-20")),
    new Expense("Entertainment", 180, new Date("2024-02-29"))
];

var user1 = new User("Luca", expenses1, 300);
var currency = "RON";

var spanUsername = document.getElementById("span-username");
spanUsername.innerHTML = "Hello, " + user1.name;

var spanBudgetValue = document.getElementById('span-budget-value');
spanBudgetValue.innerHTML = user1.budget;
var numberOfCategories = 5;
/* Currency */
var currencyHTML = document.querySelectorAll('.currency');

currencyHTML.forEach(function (currency) {
    currency.innerHTML = this.currency;
})

/* Statistics and categories */
var statisticsProgress = document.querySelectorAll('.progress');
var statisticsAmount = document.querySelectorAll('.statistics-amount');
var statisticsCategory = document.querySelectorAll('.category-name');


var divAddNewExpense = document.getElementById('div-add-new-expense');
var divStatistics = document.getElementById('div-statistics');
var divGroupMiddleSections = document.getElementById('div-group-middle-sections');

var errorMessageSet = false;




/* ------------------------------------------------------------------------------------ */

/* Home button */

/* ------------------------------------------------------------------------------------ */

var buttonHome = document.getElementById('button-home');
buttonHome.addEventListener("click", function () {
    divAddNewExpense.style.display = "block";

    formAddNewCategory.reset();
    buttonAddCategoryClicked = false;
    divAddNewCategory.style.display = "none";
});


/* ------------------------------------------------------------------------------------ */

/* Change budget functionality*/

/* ------------------------------------------------------------------------------------ */


var buttonChangeBudget = document.getElementById('button-change-budget');
var spanBudgetText = document.getElementById('span-budget-text');
var buttonChangeBudgetClicked = false;
var oldBudgetValue = 0;
var newBudgetValue = 0;

buttonChangeBudget.addEventListener("click", function () {

    if (!buttonChangeBudgetClicked) {
        buttonChangeBudgetClicked = true;

        oldBudgetValue = parseInt(spanBudgetValue.innerText);

        // Append "editable" styles
        buttonChangeBudget.style = "color: rgb(0, 198, 0);font-weight: bold; border: 1px solid white;";
        buttonChangeBudget.innerHTML = "<i class='fa fa-usd'style='margin-right: 13px; margin-left: 5px;'></i>Save Budget";

        spanBudgetText.innerHTML = "Edit Budget: ";

        spanBudgetValue.style = "color: grey; border: 1px solid green";
        spanBudgetValue.contentEditable = true;

        spanBudgetValue.addEventListener("keydown", function (event) {

            // Configurate spanBudgetValue to accept only numbers and needed characters
            var keyCode = event.code;

            var isDigit = (keyCode.startsWith("Digit"));
            var isEnter = (keyCode === "Enter");
            var isBackspace = (keyCode === "Backspace");
            var isArrowLeft = (keyCode === "ArrowLeft");
            var isArrowRight = (keyCode === "ArrowRight");

            if (isEnter) {
                event.preventDefault();
            }
            if (!isDigit && !isBackspace && !isArrowLeft && !isArrowRight) {
                event.preventDefault();
            }
        });
    }
    else {
        buttonChangeBudgetClicked = false;

        newBudgetValue = spanBudgetValue.innerText;
        if (newBudgetValue === "" || parseInt(newBudgetValue) === 0 || parseInt(newBudgetValue) > 99999) {
            spanBudgetValue.innerText = oldBudgetValue;
        }
        else {
            spanBudgetValue.innerText = newBudgetValue;
        }

        // Append normal styles
        buttonChangeBudget.style = "";
        buttonChangeBudget.innerHTML = "<i class='fa fa-usd'style='margin-right: 13px; margin-left: 5px;'></i>Change Budget";
        buttonChangeBudget.classList.add('vertical-navbar-button');

        spanBudgetText.innerHTML = "Budget: ";

        spanBudgetValue.style = "";
        spanBudgetValue.classList.add("span-budget-value");

        spanBudgetValue.contentEditable = false;
    }
})









/* ------------------------------------------------------------------------------------ */

/* Add new category functionality */

/* ------------------------------------------------------------------------------------ */
var categoryList = document.getElementById('form-input-category');

/* Button from vertical navigation bar */
var buttonAddCategory = document.getElementById('button-add-new-category');
var buttonAddCategoryClicked = false;

var divAddNewCategory = document.createElement('div');
var spanAddNewCategory = document.createElement('span');
var formAddNewCategory = document.createElement('form');
var inputNewCategory = document.createElement('input');
var buttonAddNewCategory = document.createElement('button');


/* Create the div where user have to enter a new category */
buttonAddCategory.addEventListener("click", function () {
    if (!buttonAddCategoryClicked) {
        buttonAddCategoryClicked = true;
        divAddNewExpense.style.display = 'none';

        createDivAddNewCategory();
    }
});

function createDivAddNewCategory() {
    divAddNewCategory.classList.add('div-add-new-category');
    divAddNewCategory.style.display = "block";

    spanAddNewCategory.innerText = "Add new category";
    spanAddNewCategory.classList.add('span-add-new-category');
    spanAddNewCategory.style.margin = "10px";
    divAddNewCategory.appendChild(spanAddNewCategory);

    inputNewCategory.classList.add('input-category');
    inputNewCategory.placeholder = "Food";
    inputNewCategory.required = true;
    inputNewCategory.type = "text";
    inputNewCategory.maxLength = 20;
    inputNewCategory.name = "category";
    formAddNewCategory.appendChild(inputNewCategory);

    buttonAddNewCategory.classList.add('button-add-new-category');
    buttonAddNewCategory.style.margin = "10px";
    buttonAddCategory.type = "submit";
    buttonAddNewCategory.innerText = "+";
    formAddNewCategory.appendChild(buttonAddNewCategory);

    formAddNewCategory.style = "display: flex; flex-direction: column;";
    divAddNewCategory.appendChild(formAddNewCategory);

    divGroupMiddleSections.insertBefore(divAddNewCategory, divStatistics);
}


/* Return to home page and create a new category */

formAddNewCategory.addEventListener("submit", function (event) {
    event.preventDefault();

    // ok means this category doesn't exist
    var ok = true;

    for (var i = 0; i < numberOfCategories; i++) {
        if (statisticsCategory[i].innerText == inputNewCategory.value) {
            createCategoryExistsErrorMessage();
            ok = false;
            i = numberOfCategories;
        }
    }

    if (ok) {
        divAddNewCategory.style.display = "none";
        divAddNewExpense.style.display = "block";

        numberOfCategories++;

        createNewCategory(inputNewCategory.value);

        buttonAddCategoryClicked = false;

        formAddNewCategory.reset();
    }
});


/* Add the new category in statistics and category list divs */
function createNewCategory(value) {

    // Statistics
    var divNewCategoryInStatistics = document.createElement('div');
    divNewCategoryInStatistics.classList.add('div-individual-statistics');

    var spanCategoryName = document.createElement('span');
    spanCategoryName.classList.add('category-name');
    spanCategoryName.innerText = value;
    divNewCategoryInStatistics.appendChild(spanCategoryName);
    divNewCategoryInStatistics.appendChild(document.createTextNode(' '));

    var spanCategoryAmount = document.createElement('span');
    spanCategoryAmount.classList.add('statistics-amount');
    spanCategoryAmount.innerText = "0";
    divNewCategoryInStatistics.appendChild(spanCategoryAmount);
    divNewCategoryInStatistics.appendChild(document.createTextNode(' '));

    var spanCurrency = document.createElement('span');
    spanCurrency.classList.add('currency');
    spanCurrency.innerText = currency;
    divNewCategoryInStatistics.appendChild(spanCurrency);
    divNewCategoryInStatistics.appendChild(document.createTextNode(' '));

    var divProgressBox = document.createElement('div');
    divProgressBox.classList.add('progress-box');
    divNewCategoryInStatistics.appendChild(divProgressBox);

    var divProgress = document.createElement('div');
    divProgress.classList.add('progress');
    divProgress.style.width = "0px";
    divProgress.innerHTML = "0%";
    divProgressBox.appendChild(divProgress);

    divStatistics.insertBefore(divNewCategoryInStatistics,
        document.querySelector('.div-statistics-total'));

    statisticsCategory = document.querySelectorAll('.category-name');
    statisticsAmount = document.querySelectorAll('.statistics-amount');
    statisticsProgress = document.querySelectorAll('.progress');

    /* Category List (from add new expense) */
    var option = document.createElement('option');
    option.classList.add('form-input-category-option');
    option.innerText = value;

    categoryList.appendChild(option);
}


/* Wrong input function */
function createCategoryExistsErrorMessage() {
    if (!errorMessageSet) {
        errorMessageSet = true;

        var spanCategoryExists = document.createElement('span');
        spanCategoryExists.classList.add('span-category-exists');
        spanCategoryExists.innerText = "This category already exists!";
        formAddNewCategory.insertBefore(spanCategoryExists, formAddNewCategory.firstChild);

        setTimeout(function () {
            spanCategoryExists.remove();
            errorMessageSet = false;
        }, 5000);
    }
}





/* ------------------------------------------------------------------------------------ */

/* Add new expense functionality */

/* ------------------------------------------------------------------------------------ */

var buttonAddNewExpense = document.getElementById('button-add-new-expense');
var formInputAmount = document.getElementById('form-input-amount');
var formInputCategory = document.getElementById('form-input-category');
var formExpense = document.getElementById('form-expense');

// Span Insufficient Funds 
var spanInsufficientFunds = document.createElement('span');

document.getElementById("form-expense").addEventListener("submit", function (event) {
    event.preventDefault();
    var amount = document.getElementById("form-input-amount").value;
    var category = document.getElementById("form-input-category").value;
    var budgetValue = parseInt(spanBudgetValue.innerText) - parseInt(amount);

    if (budgetValue < 0) {
        if (!errorMessageSet) {
            errorMessageSet = true;

            spanInsufficientFunds.classList.add('span-insufficient-funds');
            spanInsufficientFunds.innerText = "Insufficent Funds!";
            formExpense.insertBefore(spanInsufficientFunds, formExpense.firstChild);
            setTimeout(function () {
                spanInsufficientFunds.remove();
                errorMessageSet = false;
            }, 5000);
        }
    }
    else {
        setNewExpenseToList(amount, category);
        if (spanInsufficientFunds != undefined) {
            spanInsufficientFunds.remove();
        }
        spanBudgetValue.innerHTML = budgetValue;
        dayClicked = false;
        buttonDay.click();
        document.getElementById("form-expense").reset();
    }
});

function setNewExpenseToList(amount, category) {
    var newExpense = new Expense(category, parseInt(amount), new Date());
    expenses1.push(newExpense);
}





/* ------------------------------------------------------------------------------------ */

/* See expenses by period functionality */

/* ------------------------------------------------------------------------------------ */

var dayClicked = false;
var weekClicked = false;
var monthClicked = false;
var yearClicked = false;

document.addEventListener('DOMContentLoaded', function () {
    buttonDay.classList.add('button-active');
    buttonDay.click();
});

/* TOP BUTTONS */
var buttonDay = document.getElementById("button-day");
var buttonWeek = document.getElementById("button-week");
var buttonMonth = document.getElementById("button-month");
var buttonYear = document.getElementById("button-year");

var spanPeriodStatistics = document.getElementById("span-period");

/* Total money spent */
var totalMoneySpent = document.getElementById("span-total");


/* Button onclick functions */
buttonDay.addEventListener("click", function () {
    if (!dayClicked) {
        buttonDay.classList.add('button-active');
        buttonWeek.classList.remove('button-active');
        buttonMonth.classList.remove('button-active');
        buttonYear.classList.remove('button-active');
        dayClicked = true;
        weekClicked = false;
        monthClicked = false;
        yearClicked = false;
        spanPeriodStatistics.innerHTML = "Today";
        var todayExpenses = getTodayExpenses(expenses1);
        populateHistory(todayExpenses, 0);
        calculateStatistics(todayExpenses);
    }
});

buttonWeek.addEventListener("click", function () {
    if (!weekClicked) {
        buttonWeek.classList.add('button-active');
        buttonMonth.classList.remove('button-active');
        buttonYear.classList.remove('button-active');
        buttonDay.classList.remove('button-active');
        weekClicked = true;
        dayClicked = false;
        monthClicked = false;
        yearClicked = false;
        spanPeriodStatistics.innerHTML = "This Week";
        var weekExpenses = getWeekExpenses(expenses1);
        populateHistory(weekExpenses, 1);
        calculateStatistics(weekExpenses);
    }
});

buttonMonth.addEventListener("click", function () {
    if (!monthClicked) {
        buttonMonth.classList.add('button-active');
        buttonWeek.classList.remove('button-active');
        buttonYear.classList.remove('button-active');
        buttonDay.classList.remove('button-active');
        monthClicked = true;
        dayClicked = false;
        weekClicked = false;
        yearClicked = false;
        spanPeriodStatistics.innerHTML = "This Month";
        var monthExpenses = getMonthExpenses(expenses1);
        populateHistory(monthExpenses, 2);
        calculateStatistics(monthExpenses);
    }
});

buttonYear.addEventListener("click", function () {
    if (!yearClicked) {
        buttonYear.classList.add('button-active');
        buttonWeek.classList.remove('button-active');
        buttonMonth.classList.remove('button-active');
        buttonDay.classList.remove('button-active');
        yearClicked = true;
        dayClicked = false;
        weekClicked = false;
        monthClicked = false;
        spanPeriodStatistics.innerHTML = "This Year";
        var yearExpenses = getYearExpenses(expenses1);
        populateHistory(yearExpenses, 3);
        calculateStatistics(yearExpenses);
    }
});





function populateHistory(expenses, period) {
    var divHistoryList = document.querySelector('.div-history-list');
    divHistoryList.innerHTML = '';

    var periodText = document.querySelector('.span-history-date');

    var divHistoryItem = document.createElement('div');
    divHistoryItem.classList.add('div-history-list');

    switch (period) {
        case 0:
            var dateSpan = document.createElement('span');
            dateSpan.classList.add('history-period');
            dateSpan.textContent = new Date().toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);

            periodText.innerHTML = "Today";
            break;
        case 1:
            var dateSpan = document.createElement('span');
            dateSpan.classList.add('history-period');
            var today = new Date();
            var lastWeek = new Date(today.setDate(today.getDate() - 6));
            dateSpan.textContent = lastWeek.toLocaleDateString() + " - " + new Date().toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);

            periodText.innerHTML = "This week";
            break;
        case 2:
            var dateSpan = document.createElement('span');
            dateSpan.classList.add('history-period');
            var today = new Date();
            var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            dateSpan.textContent = firstDayOfMonth.toLocaleDateString() + " - " + lastDayOfMonth.toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);

            periodText.innerHTML = "This month";
            break;
        case 3:
            var dateSpan = document.createElement('span');
            dateSpan.classList.add('history-period');
            var today = new Date();
            var firstDayOfYear = new Date(today.getFullYear(), 0, 1);
            var lastDayOfYear = new Date(today.getFullYear(), 11, 31);
            dateSpan.textContent = firstDayOfYear.toLocaleDateString() + " - " + lastDayOfYear.toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);

            periodText.innerHTML = "This year";
            break;
        default:
            console.log("Something went wrong!");
    }

    divHistoryList.appendChild(divHistoryItem);

    expenses.forEach(function (expense) {

        var divHistoryItem = document.createElement('div');
        divHistoryItem.classList.add('div-history-list');

        var expenseSpan = document.createElement('span');
        expenseSpan.textContent = expense.category + ': ' + expense.sum + ' ';

        var currencySpan = document.createElement('span');
        currencySpan.classList.add('currency');
        currencySpan.textContent = currency;

        expenseSpan.appendChild(currencySpan);
        divHistoryItem.appendChild(expenseSpan);

        divHistoryList.appendChild(divHistoryItem);
    });
}

function calculateStatistics(expenses) {

    var categorySumVector = [];
    for (var i = 0; i < numberOfCategories; i++) {
        categorySumVector.push(0);
    }
    var total = 0;

    expenses.forEach(function (expense) {
        for (var i = 0; i < numberOfCategories; i++) {
            if (expense.category === statisticsCategory[i].innerHTML) {
                categorySumVector[i] += expense.sum;
            }
        }
        total += expense.sum;
    });

    // Set total money spent and category spent
    totalMoneySpent.innerHTML = total;
    for (var i = 0; i < numberOfCategories; i++) {
        statisticsAmount[i].innerHTML = categorySumVector[i];
    }

    if (total === 0) {
        for (var i = 0; i < numberOfCategories; i++) {
            console.log("TOTAL");
            this.statisticsProgress[i].innerHTML = "0%";
            this.statisticsProgress[i].style.width = "0px";
        }
    }
    else {

        var percentage = 0;

        for (var i = 0; i < numberOfCategories; i++) {
            percentage = categorySumVector[i] / total * 100;
            statisticsProgress[i].innerHTML = Math.round(percentage) + "%";
            statisticsProgress[i].style.width = percentage / 100 * 500 + "px";
        }
    }
}



/* Get expenses by period */

function getTodayExpenses(expenses) {

    var today = new Date();
    var todayExpenses = expenses.filter(function (expense) {
        return expense.data.getDate() === today.getDate() &&
            expense.data.getMonth() === today.getMonth() &&
            expense.data.getFullYear() === today.getFullYear();
    });

    return todayExpenses;
}

function getWeekExpenses(expenses) {

    var today = new Date();
    var lastDayOfWeek = new Date(today.setDate(today.getDate()));
    var firstDayOfWeek = new Date(today.setDate(lastDayOfWeek.getDate() - 6));

    var weekExpenses = expenses.filter(function (expense) {
        return expense.data >= firstDayOfWeek && expense.data <= lastDayOfWeek;
    });


    return weekExpenses;
}


function getMonthExpenses(expenses) {
    var today = new Date();
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    var monthExpenses = expenses.filter(function (expense) {
        return expense.data >= firstDayOfMonth && expense.data <= lastDayOfMonth;
    });

    return monthExpenses;
}

function getYearExpenses(expenses) {
    var today = new Date();
    var firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    var lastDayOfYear = new Date(today.getFullYear(), 11, 31);

    var yearExpenses = expenses.filter(function (expense) {
        return expense.data >= firstDayOfYear && expense.data <= lastDayOfYear;
    });

    return yearExpenses;
}
