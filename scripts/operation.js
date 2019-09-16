export class Operation {
    constructor(title, value) {
        this._title = title;
        this._value = parseFloat(value);
    }

    set title(title) {
        this._title = title;
    }

    set value(value) {
        this._value = parseFloat(value);
    }

    get title() {
        return this._title;
    }

    get value() {
        return this._value;
    }
}