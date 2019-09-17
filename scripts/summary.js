export class Summary {
    constructor() {
        this._budget = 0;
        this._operationsSum = 0;
        this._balance = 0;
    }

    get budget() {
        return this._budget;
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
        this._operationsSum = parseFloat(value);
    }

    addOperation(value) {
        this.operationsSum += parseFloat(value);
    }

    deleteOperation(value) {
        this.operationsSum -= value;
    }

    refreshBalance() {
        this._balance = this.budget + this.operationsSum;
    }


}