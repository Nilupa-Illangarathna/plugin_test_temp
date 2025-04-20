import { resetAllButtonStates, setMultipleButtonStates } from "../stateManager.js";
import { toggleButtonActive } from "./toggle_state.js";
import { actions, resetActions, functionActions } from "../../util/eventListeners.js";



function enableA11yOption2() {

    resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option2", "add", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option2", 1]
    ]);

    //  Call actions
    functionActions["a11y-jimat-container-selection-reader-function1"]();
    functionActions["a11y-jimat-container-animation-stop-function1"]();
}

function disableA11yOption2() {

    resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option2", "remove", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option2", 0]
    ]);

    //  Call reset actions
    functionActions["a11y-jimat-container-selection-reader-function0"]();
    functionActions["a11y-jimat-container-animation-stop-function0"]();
}


export {enableA11yOption2, disableA11yOption2}