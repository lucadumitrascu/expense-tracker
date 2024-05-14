// Constructors

function User(id, name, expenses, budget) {
    this.id = id;
    this.name = name;
    this.expenses = expenses;
    this.budget = budget;
}

function Expense(category, sum, date) {
    this.category = category;
    this.sum = sum;
    this.date = date;
}


/* ------------------------------------------------------------------------------------ */

/* Fetch user data*/

/* ------------------------------------------------------------------------------------ */

// Data from login/register
const email = localStorage.getItem("userEmail");
console.log("userEmail:", email);
let userDataFetched = false;

// Fetch user data
fetch(`http://localhost:8080/authentication/getUserDetails?email=${email}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error("Failed to fetch user details");
    }
    return response.json();
})
.then(userData => {
    let user = new User(userData.id, userData.username, [], userData.budget);
    let expenses = userData.expenses.map(expenseData => {
        return new Expense(expenseData.category, expenseData.sum, expenseData.date.substring(0, 10));
    });
    user.expenses = expenses;
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User details:", user);
    localStorage.setItem("userDataFetched", userDataFetched=true);
})
.catch(error => {
    console.error("Error fetching user details:", error);
});



userDataFetched = localStorage.getItem("userDataFetched");
let user = new User();
user = localStorage.getItem("user");
user = JSON.parse(user);

let expenses = [];
expenses = user.expenses;

if(userDataFetched){
console.log(expenses[0].date);    
console.log(userDataFetched); 
let currency = "RON";

let spanUsername = document.getElementById("span-username");
spanUsername.innerHTML = user.name;

let spanBudgetValue = document.getElementById('span-budget-value');
spanBudgetValue.innerHTML = user.budget;
let numberOfCategories = 5;

/* Currency */
let currencyHTML = document.querySelectorAll('.currency');


/* Statistics and categories */
let statisticsProgress = document.querySelectorAll('.progress');
let statisticsAmount = document.querySelectorAll('.statistics-amount');
let statisticsCategory = document.querySelectorAll('.category-name');


let divAddNewExpense = document.getElementById('div-add-new-expense');
let divStatistics = document.getElementById('div-statistics');
let divGroupMiddleSections = document.getElementById('div-group-middle-sections');

let errorMessageSet = false;





/* ------------------------------------------------------------------------------------ */

/* Home button */

/* ------------------------------------------------------------------------------------ */

let buttonHome = document.getElementById('button-home');
buttonHome.addEventListener("click", function () {
    divAddNewExpense.style.display = "block";

    formAddNewCategory.reset();
    buttonAddCategoryClicked = false;
    divAddNewCategory.style.display = "none";
});








/* ------------------------------------------------------------------------------------ */

/* Change name functionality */

/* ------------------------------------------------------------------------------------ */


let buttonChangeName = document.getElementById('button-change-name');
//spanUsername
let buttonChangeNameClicked = false;
let oldName;
buttonChangeName.addEventListener("click", function () {

    if (!buttonChangeNameClicked) {
        buttonChangeNameClicked = true;

        oldName = spanUsername.innerText;
        // Append "editable" styles
        buttonChangeName.style = "color: palegreen;font-weight: bold; border: 1px solid white;";
        buttonChangeName.innerHTML = "<i class='fa fa-usd'style='margin-right: 13px; margin-left: 5px;'></i>Save Name";

        spanUsername.style = "color: grey; border: 1px solid green";
        spanUsername.contentEditable = true;

        spanUsername.addEventListener("keydown", function (event) {

            let keyCode = event.code;

            let isEnter = (keyCode === "Enter");
            let isBackspace = (keyCode === "Backspace");
            let isArrowLeft = (keyCode === "ArrowLeft");
            let isArrowRight = (keyCode === "ArrowRight");

            if (isEnter) {
                event.preventDefault();
            }
            if (spanUsername.innerText.length > 20 && !isBackspace && !isArrowLeft && !isArrowRight) {
                event.preventDefault();
            }
        });
    }
    else {
        buttonChangeNameClicked = false;

        if (spanUsername.innerText.length === 0) {
            spanUsername.innerText = oldName;
        }
        user.name = spanUsername.innerText;
        // Append normal styles
        buttonChangeName.style = "";
        buttonChangeName.innerHTML = "<i class='fa fa-usd'style='margin-right: 13px; margin-left: 5px;'></i>Change Name";
        buttonChangeName.classList.add('vertical-navbar-button');


        spanUsername.style = "";
        spanUsername.classList.add("span-budget-value");

        spanUsername.contentEditable = false;
    }
})











/* ------------------------------------------------------------------------------------ */

/* Change currency functionality */

/* ------------------------------------------------------------------------------------ */

let buttonChangeCurrency = document.getElementById('button-change-currency');
let buttonChangeCurrencyClicked = false;

let buttonCurrencies = document.querySelectorAll('.button-select-currency');
let oldCurrency;
let divCurrencyOptions = document.getElementById('div-currency-options');

buttonChangeCurrency.addEventListener("click", function () {
    if (!buttonChangeCurrencyClicked) {
        buttonChangeCurrencyClicked = true;
        oldCurrency = currency;
        divCurrencyOptions.style = "display: flex; flex-direction: column;";
        buttonChangeCurrency.style.border = "1px solid white";
    }
    else {
        buttonChangeCurrencyClicked = false;
        divCurrencyOptions.style = "display: none";
        buttonChangeCurrency.style = "";
        buttonChangeCurrency.classList.add('vertical-navbar-button');
    }
});
buttonCurrencies[0].addEventListener("click", function () {
    divCurrencyOptions.style = "display: none;";
    buttonChangeCurrencyClicked = false;
    if (oldCurrency != "RON") {
        currency = "RON";
        currencyHTML.forEach(function (currency1) {
            currency1.innerText = currency;
        });
        if (oldCurrency === "$") {
            let newValue = parseFloat(spanBudgetValue.innerText) * 4.59892;
            spanBudgetValue.innerText = newValue.toFixed(2);
            user.expenses.forEach(function (expense) {
                expense.sum = expense.sum * 4.59892;

            });
        }
        if (oldCurrency === "€") {
            let newValue = parseFloat(spanBudgetValue.innerText) * 4.97347;
            spanBudgetValue.innerText = newValue.toFixed(2);
            user.expenses.forEach(function (expense) {
                expense.sum = expense.sum * 4.97347;

            });
        }
        dayClicked = false;
        buttonDay.click();
        oldCurrency = currency;
        buttonChangeCurrency.style = "";
        buttonChangeCurrency.classList.add('vertical-navbar-button');
    }
});

buttonCurrencies[1].addEventListener("click", function () {
    divCurrencyOptions.style = "display: none;";
    buttonChangeCurrencyClicked = false;
    if (oldCurrency != "$") {
        currency = "$";
        currencyHTML.forEach(function (currency1) {
            currency1.innerText = currency;
        });
        if (oldCurrency === "RON") {
            let newValue = parseFloat(spanBudgetValue.innerText) / 4.59892;
            spanBudgetValue.innerText = newValue.toFixed(2);
            user.expenses.forEach(function (expense) {
                expense.sum = expense.sum / 4.59892;

            });
        }
        if (oldCurrency === "€") {
            let newValue = parseFloat(spanBudgetValue.innerText) / 0.924737;
            spanBudgetValue.innerText = newValue.toFixed(2);
            user.expenses.forEach(function (expense) {
                expense.sum = expense.sum / 0.924737;

            });
        }
        dayClicked = false;
        buttonDay.click();
        oldCurrency = currency;
        buttonChangeCurrency.style = "";
        buttonChangeCurrency.classList.add('vertical-navbar-button');
    }
});

buttonCurrencies[2].addEventListener("click", function () {
    divCurrencyOptions.style = "display: none;";
    buttonChangeCurrencyClicked = false;
    if (oldCurrency != "€") {
        currency = "€";
        currencyHTML.forEach(function (currency1) {
            currency1.innerText = currency;
        });
        if (oldCurrency === "RON") {
            let newValue = parseFloat(spanBudgetValue.innerText) / 4.97347;
            spanBudgetValue.innerText = newValue.toFixed(2);
            user.expenses.forEach(function (expense) {
                expense.sum = expense.sum / 4.97347;

            });
        }
        if (oldCurrency === "$") {
            let newValue = parseFloat(spanBudgetValue.innerText) * 0.924737;
            spanBudgetValue.innerText = newValue.toFixed(2);
            user.expenses.forEach(function (expense) {
                expense.sum = expense.sum * 0.924737;

            });
        }
        dayClicked = false;
        buttonDay.click();
        oldCurrency = currency;
        buttonChangeCurrency.style = "";
        buttonChangeCurrency.classList.add('vertical-navbar-button');
    }
});











/* ------------------------------------------------------------------------------------ */

/* Change budget functionality */

/* ------------------------------------------------------------------------------------ */


let buttonChangeBudget = document.getElementById('button-change-budget');
let spanBudgetText = document.getElementById('span-budget-text');
let buttonChangeBudgetClicked = false;
let oldBudgetValue = 0;
let newBudgetValue = 0;

buttonChangeBudget.addEventListener("click", function () {

    if (!buttonChangeBudgetClicked) {
        buttonChangeBudgetClicked = true;

        oldBudgetValue = parseFloat(spanBudgetValue.innerText);

        // Append "editable" styles
        buttonChangeBudget.style = "color: palegreen;font-weight: bold; border: 1px solid white;";
        buttonChangeBudget.innerHTML = "<i class='fa fa-usd'style='margin-right: 13px; margin-left: 5px;'></i>Save Budget";

        spanBudgetText.innerHTML = "Edit Budget: ";

        spanBudgetValue.style = "color: grey; border: 1px solid green";
        spanBudgetValue.contentEditable = true;

        spanBudgetValue.addEventListener("keydown", function (event) {

            // Configurate spanBudgetValue to accept only numbers and needed characters
            let keyCode = event.code;

            let isDigit = (keyCode.startsWith("Digit"));
            let isEnter = (keyCode === "Enter");
            let isBackspace = (keyCode === "Backspace");
            let isArrowLeft = (keyCode === "ArrowLeft");
            let isArrowRight = (keyCode === "ArrowRight");

            if (isEnter) {
                event.preventDefault();
            }
            if (!isDigit && !isBackspace && !isArrowLeft && !isArrowRight) {
                event.preventDefault();
            }
            if (spanBudgetValue.innerText.length > 5 && !isBackspace && !isArrowLeft && !isArrowRight) {
                event.preventDefault();
            }
        });
    }
    else {
        buttonChangeBudgetClicked = false;

        newBudgetValue = spanBudgetValue.innerText;
        if (newBudgetValue === "" || parseFloat(newBudgetValue) === 0) {
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
let categoryList = document.getElementById('form-input-category');

/* Button from vertical navigation bar */
let buttonAddCategory = document.getElementById('button-add-new-category');
let buttonAddCategoryClicked = false;

let divAddNewCategory = document.createElement('div');
let spanAddNewCategory = document.createElement('span');
let formAddNewCategory = document.createElement('form');
let inputNewCategory = document.createElement('input');
let buttonAddNewCategory = document.createElement('button');


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
    divAddNewCategory.style = "display: flex; justify-content:center;"
    spanAddNewCategory.innerText = "Add New Category";
    spanAddNewCategory.classList.add('span-add-new-category');
    divAddNewCategory.appendChild(spanAddNewCategory);

    inputNewCategory.classList.add('input-category');
    inputNewCategory.placeholder = "Food";
    inputNewCategory.required = true;
    inputNewCategory.type = "text";
    inputNewCategory.maxLength = 20;
    inputNewCategory.name = "category";
    inputNewCategory.style.marginTop = "20px";
    formAddNewCategory.appendChild(inputNewCategory);

    buttonAddNewCategory.classList.add('button-add-new-category');
    buttonAddCategory.type = "submit";
    buttonAddNewCategory.innerText = "+";
    buttonAddNewCategory.style = "margin:20px;"
    formAddNewCategory.appendChild(buttonAddNewCategory);

    formAddNewCategory.style = "display: flex; flex-direction: column;";
    divAddNewCategory.appendChild(formAddNewCategory);

    divGroupMiddleSections.insertBefore(divAddNewCategory, divStatistics);
}


/* Return to home and create a new category */

formAddNewCategory.addEventListener("submit", function (event) {
    event.preventDefault();

    // ok means this category doesn't exist
    let ok = true;

    for (let i = 0; i < numberOfCategories; i++) {
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
    let divNewCategoryInStatistics = document.createElement('div');
    divNewCategoryInStatistics.classList.add('div-individual-statistics');

    let spanCategoryName = document.createElement('span');
    spanCategoryName.classList.add('category-name');
    spanCategoryName.innerText = value;
    divNewCategoryInStatistics.appendChild(spanCategoryName);
    divNewCategoryInStatistics.appendChild(document.createTextNode(' '));

    let spanCategoryAmount = document.createElement('span');
    spanCategoryAmount.classList.add('statistics-amount');
    spanCategoryAmount.innerText = "0.00";
    divNewCategoryInStatistics.appendChild(spanCategoryAmount);
    divNewCategoryInStatistics.appendChild(document.createTextNode(' '));

    let spanCurrency = document.createElement('span');
    spanCurrency.classList.add('currency');
    divNewCategoryInStatistics.appendChild(spanCurrency);
    divNewCategoryInStatistics.appendChild(document.createTextNode(' '));


    spanCurrency.innerText = currency;

    let divProgressBox = document.createElement('div');
    divProgressBox.classList.add('progress-box');
    divNewCategoryInStatistics.appendChild(divProgressBox);

    let divProgress = document.createElement('div');
    divProgress.classList.add('progress');
    divProgress.style.width = "0px";
    divProgress.innerHTML = "0%";
    divProgressBox.appendChild(divProgress);

    divStatistics.insertBefore(divNewCategoryInStatistics,
        document.querySelector('.div-statistics-total'));

    currencyHTML = document.querySelectorAll('.currency');
    statisticsCategory = document.querySelectorAll('.category-name');
    statisticsAmount = document.querySelectorAll('.statistics-amount');
    statisticsProgress = document.querySelectorAll('.progress');

    /* Category List (from add new expense) */
    let option = document.createElement('option');
    option.classList.add('form-input-category-option');
    option.innerText = value;

    categoryList.appendChild(option);
}


/* Wrong input function */
function createCategoryExistsErrorMessage() {
    if (!errorMessageSet) {
        errorMessageSet = true;

        let spanCategoryExists = document.createElement('span');
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

let buttonAddNewExpense = document.getElementById('button-add-new-expense');
let formInputAmount = document.getElementById('form-input-amount');
let formInputCategory = document.getElementById('form-input-category');
let formExpense = document.getElementById('form-expense');

// Span Insufficient Funds 
let spanInsufficientFunds = document.createElement('span');

document.getElementById("form-expense").addEventListener("submit", function (event) {
    event.preventDefault();
    let amount = document.getElementById("form-input-amount").value;
    let category = document.getElementById("form-input-category").value;
    let budgetValue = parseFloat(spanBudgetValue.innerText) - parseFloat(amount);

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
        spanBudgetValue.innerHTML = budgetValue.toFixed(2);
        dayClicked = false;
        buttonDay.click();
        document.getElementById("form-expense").reset();
    }
});

function setNewExpenseToList(amount, category) {
    let newExpense = new Expense(category, parseFloat(amount), new Date().toISOString().split('T')[0]);
    user.expenses.push(newExpense);
}















/* ------------------------------------------------------------------------------------ */

/* See expenses by period functionality */

/* ------------------------------------------------------------------------------------ */

let dayClicked = false;
let weekClicked = false;
let monthClicked = false;
let yearClicked = false;

document.addEventListener('DOMContentLoaded', function () {
    buttonDay.classList.add('button-active');
    buttonDay.click();
});

/* TOP BUTTONS */
let buttonDay = document.getElementById("button-day");
let buttonWeek = document.getElementById("button-week");
let buttonMonth = document.getElementById("button-month");
let buttonYear = document.getElementById("button-year");

let spanPeriodStatistics = document.getElementById("span-period");

/* Total money spent */
let totalMoneySpent = document.getElementById("span-total");


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
        let todayExpenses = getTodayExpenses(expenses);
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
        let weekExpenses = getWeekExpenses(expenses);
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
        let monthExpenses = getMonthExpenses(expenses);
        console.log(monthExpenses);
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
        let yearExpenses = getYearExpenses(expenses);
        populateHistory(yearExpenses, 3);
        calculateStatistics(yearExpenses);
    }
});





function populateHistory(expenses, period) {
    let divHistoryList = document.querySelector('.div-history-list');
    divHistoryList.innerHTML = '';

    let periodText = document.querySelector('.span-history-date');

    let divHistoryItem = document.createElement('div');
    divHistoryItem.classList.add('div-history-list');

    let dateSpan = document.createElement('span');
    let today = new Date();
    switch (period) {
        case 0:
            dateSpan.classList.add('history-period');
            dateSpan.textContent = new Date().toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);

            periodText.innerHTML = "Today";
            break;
        case 1:
            dateSpan.classList.add('history-period');
            let lastWeek = new Date(today.setDate(today.getDate() - 6));
            dateSpan.textContent = lastWeek.toLocaleDateString() + " - " + new Date().toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);

            periodText.innerHTML = "This week";
            break;
        case 2:
            dateSpan.classList.add('history-period');
            let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            dateSpan.textContent = firstDayOfMonth.toLocaleDateString() + " - " + lastDayOfMonth.toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);

            periodText.innerHTML = "This month";
            break;
        case 3:
            dateSpan.classList.add('history-period');
            let firstDayOfYear = new Date(today.getFullYear(), 0, 1);
            let lastDayOfYear = new Date(today.getFullYear(), 11, 31);
            dateSpan.textContent = firstDayOfYear.toLocaleDateString() + " - " + lastDayOfYear.toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);

            periodText.innerHTML = "This year";
            break;
        default:
            console.log("Something went wrong!");
    }

    divHistoryList.appendChild(divHistoryItem);

    expenses.reverse().forEach(function (expense) {

        let divHistoryItem = document.createElement('div');
        divHistoryItem.classList.add('div-history-list');

        let expenseSpan = document.createElement('span');
        expenseSpan.textContent = expense.category + ': ' + (expense.sum).toFixed(2) + ' ';

        let currencySpan = document.createElement('span');
        currencySpan.classList.add('currency');
        currencySpan.textContent = currency;

        expenseSpan.appendChild(currencySpan);
        divHistoryItem.appendChild(expenseSpan);

        divHistoryList.appendChild(divHistoryItem);
    });
}

function calculateStatistics(expenses) {

    let categorySumVector = [];
    for (let i = 0; i < numberOfCategories; i++) {
        categorySumVector.push(0);
    }
    let total = 0;


    expenses.forEach(function (expense) {
        for (let i = 0; i < numberOfCategories; i++) {
            if (expense.category === statisticsCategory[i].innerHTML) {
                categorySumVector[i] += expense.sum;
             
            }
        }
        total += expense.sum;
    });

    // Set total money spent and category spent
    totalMoneySpent.innerHTML = total.toFixed(2);
    for (let i = 0; i < numberOfCategories; i++) {
        statisticsAmount[i].innerHTML = categorySumVector[i].toFixed(2);
    }

    if (total === 0) {
        for (let i = 0; i < numberOfCategories; i++) {
            statisticsProgress[i].innerHTML = "0%";
            statisticsProgress[i].style.width = "0px";
        }
    }
    else {

        let percentage = 0;

        for (let i = 0; i < numberOfCategories; i++) {
            percentage = categorySumVector[i] / total * 100;
            statisticsProgress[i].innerHTML = Math.round(percentage) + "%";
            statisticsProgress[i].style.width = percentage.toFixed(2) / 100 * 500 + "px";
        }
    }
}


/* Get expenses by period */

function getTodayExpenses(expenses) {
    let today = new Date();
    let todayExpenses = expenses.filter(function (expense) {
        let expenseDate = new Date(expense.date);
        return expenseDate.getDate() === today.getDate() &&
            expenseDate.getMonth() === today.getMonth() &&
            expenseDate.getFullYear() === today.getFullYear();
    });

    return todayExpenses;
}

function getWeekExpenses(expenses) {
    let today = new Date();
    let lastDayOfWeek = new Date(today.setDate(today.getDate()));
    let firstDayOfWeek = new Date(today.setDate(lastDayOfWeek.getDate() - 6));

    let weekExpenses = expenses.filter(function (expense) {
        let expenseDate = new Date(expense.date);
        return expenseDate >= firstDayOfWeek && expenseDate <= lastDayOfWeek;
    });

    return weekExpenses;
}

function getMonthExpenses(expenses) {
    let today = new Date();
    let firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    let monthExpenses = expenses.filter(function (expense) {
        let expenseDate = new Date(expense.date);
        return expenseDate >= firstDayOfMonth && expenseDate <= lastDayOfMonth;
    });

    return monthExpenses;
}

function getYearExpenses(expenses) {
    let today = new Date();
    let firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    let lastDayOfYear = new Date(today.getFullYear(), 11, 31);

    let yearExpenses = expenses.filter(function (expense) {
        let expenseDate = new Date(expense.date);
        return expenseDate >= firstDayOfYear && expenseDate <= lastDayOfYear;
    });

    return yearExpenses;
}

}