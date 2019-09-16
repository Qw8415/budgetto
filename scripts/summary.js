import {Operation} from "./operation.js";

export class Summary {
    constructor() {
        this._budget = 0;
        this._operations = [];
        this._operationsSum = 0;
        this._balance = 0;
    }

    get budget() {
        return this._budget;
    }

    get operations() {
        return this._operations;
    }

    get operationsSum() {
        return this._operationsSum;
    }

    get balance() {
        this.refreshBalance();
        return this._balance;
    }

    set budget(value) {
        this._budget = parseFloat(value);
    }

    set operationsSum(value) {
        this._operationsSum = value;
    }

    addOperation(title, value) {
        const operation = new Operation(title, value);
        this.operations.push(operation);
        this.operationsSum += operation.value;
    }

    deleteOperation(index) {
        this.operationsSum -= this.operations[index].value;
        this.operations.splice(index, 1);
    }

    refreshBalance() {
        this._balance = this.budget + this.operationsSum;
    }


}