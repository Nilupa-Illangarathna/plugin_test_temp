import { resetAllButtonStates, setMultipleButtonStates } from "../stateManager.js";
import { toggleButtonActive } from "./toggle_state.js";
import { actions, resetActions, functionActions } from "../../util/eventListeners.js";


function enableA11yOption6() {

    resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option6", "add", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option6", 1]
    ]);

    //  Call activation actions
    functionActions["a11y-jimat-container-animation-stop-function1"]();
}

function disableA11yOption6() {

    // resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option6", "remove", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option6", 0]
    ]);

    //  Call reset actions
    functionActions["a11y-jimat-container-animation-stop-function0"]();
}

export {enableA11yOption6, disableA11yOption6}