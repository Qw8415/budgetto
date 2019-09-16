export class Ui {
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