import { resetAllButtonStates, setMultipleButtonStates } from "../stateManager.js";
import { toggleButtonActive } from "./toggle_state.js";
import { actions, resetActions, functionActions } from "../../util/eventListeners.js";

function enableA11yOption7() {

    resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option7", "add", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option7", 1]
    ]);


    //  Call activation actions
    functionActions["a11y-jimat-container-virtual-keyboard-function1"]();
}

function disableA11yOption7() {

    resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option7", "remove", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option7", 0]
    ]);

    //  Call reset actions
    functionActions["a11y-jimat-container-virtual-keyboard-function0"]();
}


export {enableA11yOption7, disableA11yOption7}