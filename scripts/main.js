class UI {
    constructor() {
        this.budgetForm = document.getElementById("budget-form");
        this.budgetValue = document.getElementById("budget-value");
        this.budgetSubmit = document.getElementById("budget-submit");
        this.budgetSummary = document.getElementById("budget-summary");
        this.operationForm = document.getElementById("operation-form");
        this.operationTitle = document.getElementById("operation-title");
        this.operationValue = document.getElementById("operation-value");
        this.operationSubmit = document.getElementById("operation-submit");
        this.operationSummary = document.getElementById("operations-summary");
        this.balanceSummary = document.getElementById("balance-summary");
        this.tBody = document.getElementsByTagName("tbody")[0];
    }
}

class Operation {
    constructor(title, value) {
        this.title = title;
        this.value = value;
    }
}

const ui = new UI();
const operations = [];
let budget = 0;
let balance = 0;

function refreshTable() {
    ui.tBody.innerHTML = "";
    for (let el of operations) {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${el.title}</td>` +
            `<td>${el.value}</td>` +
            `<td><button class="option edit"></button><button class="option delete"></button></td>`;
        ui.tBody.appendChild(row);
    }
}

function setEventsListeners() {
    ui.budgetSubmit.addEventListener('click', ev => {
        ev.preventDefault();
        console.log("Submit budget");
        budget = ui.budgetValue.value || 0;
        ui.budgetSummary.innerHTML = budget + " PLN";
        ui.budgetSummary.style = budget < 0 ?
            "color: var(--negative-color)" : "color: var(--positive-color)";
        ui.budgetForm.reset();
    });
    ui.operationSubmit.addEventListener('click', ev => {
        ev.preventDefault();
        console.log("Submit operation");
        operations.push(new Operation(ui.operationTitle.value, ui.operationValue.value));
        console.log(operations);
        ui.operationForm.reset();
        refreshTable();
    })


}

function main() {
    setEventsListeners();
}

main();