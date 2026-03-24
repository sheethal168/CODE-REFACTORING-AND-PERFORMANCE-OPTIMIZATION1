// Cache DOM elements (performance improvement)
const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const totalDisplay = document.getElementById("total");
const listContainer = document.getElementById("list");

// Store expenses
let expenses = [];

// Handle form submission
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);

  // Validation
  if (!title || isNaN(amount)) {
    alert("Please enter valid expense details");
    return;
  }

  addExpense(title, amount);

  // Clear inputs
  titleInput.value = "";
  amountInput.value = "";
});

// Add expense function
function addExpense(title, amount) {
  const expense = {
    id: Date.now(),
    title: title,
    amount: amount,
  };

  expenses.push(expense);
  renderExpenses();
}

// Render expenses list
function renderExpenses() {
  listContainer.innerHTML = "";

  let total = 0;

  expenses.forEach((expense) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.title} - ₹${expense.amount}
      <button onclick="deleteExpense(${expense.id})">X</button>
    `;

    listContainer.appendChild(li);
  });

  totalDisplay.textContent = total;
}

// Delete expense
function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  renderExpenses();
}