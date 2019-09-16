import {Ui} from "./ui.js";
import {Summary} from "./summary.js";

export class MainController {
    constructor() {
        this.ui = new Ui();
        this.summary = new Summary();
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
            this.operationsRefresh()
            this.balanceRefresh();
            this.addTableRow();
            this.ui.operationForm.reset();
        });
    }

    budgetRefresh() {
        this.summary.budget = this.ui.budgetValue.value;
        this.ui.budgetSummary.innerHTML = this.summary.budget;
    }

    operationsRefresh() {
        this.summary.addOperation(this.ui.operationTitle.value, this.ui.operationValue.value);
        this.ui.operationSummary.innerHTML = this.summary.operationsSum;
    }

    balanceRefresh() {
        this.ui.balanceSummary.innerHTML = this.summary.balance;
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
        title.innerHTML = this.summary.operations[elIndex].title;
        value.innerHTML = this.summary.operations[elIndex].value;
        editButton.classList.add("option", "edit");
        deleteButton.classList.add("option", "delete");


        editButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this.editOperation(ev)
        } );

        options.append(editButton, deleteButton);
        row.append(title, value, options);
        this.ui.tBody.appendChild(row);
    }

    editOperation(ev) {
        ev.preventDefault();
        const row = ev.target.parentElement.parentElement;
        const operation = this.summary.operations[row.id[3]];
        this.ui.operationTitle.value = operation.title;
        this.ui.operationValue.value = operation.value;
        this.deleteOperation(row);
    }

    deleteOperation(row) {
        this.deleteTableRow(row);
        this.summary.deleteOperation(row.id[3]);
    }

    deleteTableRow(row) {
        this.ui.tBody.removeChild(row);
    }
}