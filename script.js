const amount = document.querySelector(".amount");
const coefficient = document.querySelector(".coefficient");
const button = document.querySelector(".bet-slip__button ");
const total = document.querySelector(".total");
const totalAmount = document.querySelector(".total__amount");
const totalCoefficient = document.querySelector(".total__coefficient");
const typeBet = document.querySelector(".select");
const tbody = document.querySelector("tbody");

const updateValues = () => {
  const calculateBet = amount.value * coefficient.value;

  total.textContent = calculateBet;
  totalAmount.textContent = amount.value || 0;
  totalCoefficient.textContent = coefficient.value || 0;
};

amount.addEventListener("input", updateValues);
coefficient.addEventListener("input", updateValues);

button.addEventListener("click", () => {
  if (!validateBet()) {
    return
  };

  const bet = {
    date: new Date().toLocaleDateString(),
    amount: amount.value,
    coefficient: coefficient.value,
    total: total.textContent,
    typeBet: typeBet.value,
  };

  if (amount.value !== "" && coefficient.value !== "" && typeBet.value !== "") {
    const history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(bet);

    localStorage.setItem("history", JSON.stringify(history));

    addBet(bet);
  }
});

const addBet = (bet) => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
      <td>${bet.date}</td>
      <td>${bet.typeBet}</td>
      <td>${bet.amount}</td>
      <td>${bet.coefficient}</td>
      <td>${bet.total}</td>
    `;

  tbody.appendChild(tr);
};

document.addEventListener("DOMContentLoaded", () => {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  history.forEach((bet) => addBet(bet));
});

function validateBet() {
  if (isNaN(amount.value) || amount.value <= 0) {
    alert("Please enter a valid number");
  }

  if (isNaN(coefficient.value) || coefficient.value <= 0) {
    alert("Please enter a valid number");
  }

  if (!amount.value || !coefficient.value || !typeBet.value) {
    alert("Please fill in all bid fields!");
    return false;
  }

  if (amount.value <= 0) {
    alert("The bet amount must be greater than 0");
    return false;
  }

  if (coefficient.value <= 0) {
    alert("The bet odd must be greater than 0");
    return false;
  }

  return true;
}
