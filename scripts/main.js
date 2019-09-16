import {MainController} from "./mainController.js"

class Main {

    static main() {
        const controller = new MainController();

        controller.addFormListeners();
    }
}

Main.main();


