import {Ui} from "./ui.js";
import {Summary} from "./summary.js";

/**
* TODO:
* refactor this nasty methods!
*/

export class MainController {
    constructor() {
        this.ui = new Ui();
        this.summary = new Summary();
        this.typeOfOperation = "expense";
    }

    addFormListeners() {
        this.ui.budgetForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            this.budgetRefresh();
            this.balanceRefresh();
            this.ui.budgetForm.reset();
        });
        this.ui.operationForm.addEventListener('submit', (ev) => {
            ev.preventDefault();
            if (this.typeOfOperation === "income") {
                this.summary.addOperation(this.ui.operationValue.value);
            } else {
                this.summary.addOperation(-this.ui.operationValue.value);
            }
            this.operationsRefresh();
            this.balanceRefresh();
            this.addTableRow();
            this.ui.operationForm.reset();
        });
        this.ui.expense.addEventListener('change', (ev) => this.typeOfOperation = ev.target.id);
        this.ui.income.addEventListener('change', (ev) => this.typeOfOperation = ev.target.id);
    }

    budgetRefresh() {
        this.summary.budget = this.ui.budgetValue.value;
        this.ui.budgetSummary.innerHTML = this.summary.budget;
        this.setFontColor(this.ui.budgetSummary);
    }

    operationsRefresh() {
        this.ui.operationSummary.innerHTML = this.summary.operationsSum;
        this.setFontColor(this.ui.operationSummary);
    }

    balanceRefresh() {
        this.ui.balanceSummary.innerHTML = this.summary.balance;
        this.setFontColor(this.ui.balanceSummary);
    }

    setFontColor(element) {
        if (element.innerHTML < 0 || element.value) {
            element.classList.remove("positive-font");
            element.classList.add("negative-font");
        } else {
            element.classList.remove("negative-font");
            element.classList.add("positive-font");
        }
    }

    addTableRow() {
        const row = document.createElement('tr');
        const title = document.createElement('td');
        const value = document.createElement('td');
        const options = document.createElement('td');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        const elIndex = this.ui.tBody.childElementCount

        row.id = "row" + elIndex;
        title.innerHTML = this.ui.operationTitle.value;
        value.innerHTML = this.typeOfOperation === "income" ? this.ui.operationValue.value : -this.ui.operationValue.value;
        editButton.classList.add("option", "edit");
        deleteButton.classList.add("option", "delete");

        this.setFontColor(value);

        editButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.editOperation(ev)
        });
        deleteButton.addEventListener('click', ev => {
            ev.preventDefault();
            this.deleteOperation(ev.target.parentElement.parentElement)
        });

        options.append(editButton, deleteButton);
        row.append(title, value, options);
        this.ui.tBody.appendChild(row);
    }

    editOperation(ev) {
        const row = ev.target.parentElement.parentElement;
        this.ui.operationTitle.value = row.childNodes[0].innerHTML;
        this.ui.operationValue.value = row.childNodes[1].innerHTML;
        this.deleteOperation(row);
    }

    deleteOperation(row) {
        this.deleteTableRow(row);
        this.summary.deleteOperation(row.childNodes[1].innerHTML);
        this.operationsRefresh();
        this.balanceRefresh();
    }

    deleteTableRow(row) {
        this.ui.tBody.removeChild(row);
    }
}