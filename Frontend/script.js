/* ------------------------------------------------------------------------------------ */

/* Default in memory data */

/* ------------------------------------------------------------------------------------ */
function User(name, expenses) {
    this.name = name;
    this.expenses = expenses;
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
    new Expense("Food", 60, new Date("2024-03-22")),
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

var user1 = new User("Luca", expenses1);
var currency = "RON";

var spanUsername = document.getElementById("span-username");
spanUsername.innerHTML = "Hello, "+ user1.name;



/* ------------------------------------------------------------------------------------ */

/* Vertical navigation bar buttons*/

/* ------------------------------------------------------------------------------------ */




/* ------------------------------------------------------------------------------------ */

/* Add new expense functionality */

/* ------------------------------------------------------------------------------------ */





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

/* Objects to be modified on button click */
var spanPeriod = document.getElementById("span-period");

/* Category names */
var firstCategory = document.getElementById("first-category");
var secondCategory = document.getElementById("second-category");
var thirdCategory = document.getElementById("third-category");
var fourthCategory = document.getElementById("fourth-category");
var fifthCategory = document.getElementById("fifth-category");

/* Category amount */
var firstAmount = document.getElementById("first-amount");
var secondAmount = document.getElementById("second-amount");
var thirdAmount = document.getElementById("third-amount");
var fourthAmount = document.getElementById("fourth-amount");
var fifthAmount = document.getElementById("fifth-amount");

/* Category progress */
var firstProgress = document.getElementById("first-progress");
var secondProgress = document.getElementById("second-progress");
var thirdProgress = document.getElementById("third-progress");
var fourthProgress = document.getElementById("fourth-progress");
var fifthProgress = document.getElementById("fifth-progress");

/* Currency */
var currencyHTML = document.querySelectorAll('.currency');

currencyHTML.forEach(function(currency){
    currency.innerHTML = this.currency;
})

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
        spanPeriod.innerHTML = "Today";
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
        spanPeriod.innerHTML = "This Week";
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
        spanPeriod.innerHTML = "This Month";
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
        spanPeriod.innerHTML = "This Year";
        var yearExpenses = getYearExpenses(expenses1);
        populateHistory(yearExpenses, 3);
        calculateStatistics(yearExpenses);
    }
});





function populateHistory(expenses, period) {
    divHistoryList = document.querySelector('.div-history-list');
    divHistoryList.innerHTML ='';

    var periodText = document.querySelector('.span-history-date');
    if (period === 0) {
        periodText.innerHTML = "Today";
    }
    if (period === 1) {
        periodText.innerHTML = "This week";
    }
    if (period === 2) {
        periodText.innerHTML = "This month";
    }
    if (period === 3) {
        periodText.innerHTML = "This year";
    }

    expenses.forEach(function (expense) {

        var divHistoryItem = document.createElement('div');
        divHistoryItem.classList.add('div-history-list');

        if (period === 0) {
            var dateSpan = document.createElement('span');
            dateSpan.classList.add('history-period');
            dateSpan.textContent = expense.data.toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);
            period = 4;
        }
        if (period === 1) {
            var dateSpan = document.createElement('span');
            dateSpan.classList.add('history-period');
            var today = new Date();
            var lastWeek = new Date(today.setDate(today.getDate() - 6));
            dateSpan.textContent = lastWeek.toLocaleDateString() + " - " + new Date().toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);
            period = 4;
        }
        if (period === 2) {
            var dateSpan = document.createElement('span');
            dateSpan.classList.add('history-period');
            var today = new Date();
            var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            dateSpan.textContent = firstDayOfMonth.toLocaleDateString() + " - " + lastDayOfMonth.toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);
            period = 4;
        }
        if (period === 3) {
            var dateSpan = document.createElement('span');
            dateSpan.classList.add('history-period');
            var today = new Date();
            var firstDayOfYear = new Date(today.getFullYear(), 0, 1);
            var lastDayOfYear = new Date(today.getFullYear(), 11, 31);
            dateSpan.textContent = firstDayOfYear.toLocaleDateString() + " - " + lastDayOfYear.toLocaleDateString();
            divHistoryItem.appendChild(dateSpan);
            period = 4;
        }

        var expenseSpan = document.createElement('span');
        expenseSpan.textContent = expense.category + ': ' + expense.sum + ' ';

        var currencySpan = document.createElement('span');
        currencySpan.classList.add('currency');
        currencySpan.textContent = this.currency;

        expenseSpan.appendChild(currencySpan);
        divHistoryItem.appendChild(expenseSpan);

        divHistoryList.appendChild(divHistoryItem);
    });
}

function calculateStatistics(expenses) {
    var firstCategorySum = 0;
    var secondCategorySum = 0;
    var thirdCategorySum = 0;
    var fourthCategorySum = 0;
    var fifthCategorySum = 0;
    var total = 0;

    expenses.forEach(function (expense) {
        if (expense.category === firstCategory.innerText) {
            firstCategorySum += expense.sum;
            total += expense.sum;
        }
        if (expense.category === secondCategory.innerText) {
            secondCategorySum += expense.sum;
            total += expense.sum;
        }
        if (expense.category === thirdCategory.innerText) {
            thirdCategorySum += expense.sum;
            total += expense.sum;
        }
        if (expense.category === fourthCategory.innerText) {
            fourthCategorySum += expense.sum;
            total += expense.sum;
        }
        if (expense.category === fifthCategory.innerText) {
            fifthCategorySum += expense.sum;
            total += expense.sum;
        }
    });

    if (total === 0) {
        firstProgress.innerHTML = "0%";
        firstProgress.style.width = "0px";
        secondProgress.innerHTML = "0%";
        secondProgress.style.width = "0px";
        thirdProgress.innerHTML = "0%";
        thirdProgress.style.width = "0px";
        fourthProgress.innerHTML = "0%";
        fourthProgress.style.width = "0px";
        fifthProgress.innerHTML = "0%";
        fifthProgress.style.width = "0px";

        firstAmount.innerHTML = firstCategorySum;
        secondAmount.innerHTML = secondCategorySum;
        thirdAmount.innerHTML = thirdCategorySum;
        fourthAmount.innerHTML = fourthCategorySum;
        fifthAmount.innerHTML = fifthCategorySum;
        
        totalMoneySpent.innerHTML = total;
        return 0;
    }


    totalMoneySpent.innerHTML = total;
    firstAmount.innerHTML = firstCategorySum;
    secondAmount.innerHTML = secondCategorySum;
    thirdAmount.innerHTML = thirdCategorySum;
    fourthAmount.innerHTML = fourthCategorySum;
    fifthAmount.innerHTML = fifthCategorySum;

    var percentage = 0;

    percentage = firstCategorySum / total * 100;
    firstProgress.innerHTML = Math.round(percentage) + "%";
    firstProgress.style.width = percentage / 100 * 500 + "px";

    percentage = 0;

    percentage = secondCategorySum / total * 100;
    secondProgress.innerHTML = Math.round(percentage) + "%";
    secondProgress.style.width = percentage / 100 * 500 + "px";

    percentage = 0;

    percentage = thirdCategorySum / total * 100;
    thirdProgress.innerHTML = Math.round(percentage) + "%";
    thirdProgress.style.width = percentage / 100 * 500 + "px";

    percentage = 0;

    percentage = fourthCategorySum / total * 100;
    fourthProgress.innerHTML = Math.round(percentage) + "%";
    fourthProgress.style.width = percentage / 100 * 500 + "px";

    percentage = 0;

    percentage = fifthCategorySum / total * 100;
    fifthProgress.innerHTML = Math.round(percentage) + "%";
    fifthProgress.style.width = percentage / 100 * 500 + "px";

    return 0;
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
    var lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
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
