import { resetAllButtonStates, setMultipleButtonStates } from "../stateManager.js";
import { toggleButtonActive } from "./toggle_state.js";
import { actions, resetActions, functionActions } from "../../util/eventListeners.js";


function enableA11yOption8() {

    resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option8", "add", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option8", 1]
    ]);

    //  Call activation actions
    functionActions["a11y-jimat-container-selection-reader-function1"]();
}

function disableA11yOption8() {

    resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option8", "remove", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option8", 0]
    ]);

    //  Call reset actions
    functionActions["a11y-jimat-container-selection-reader-function0"]();
}


export {enableA11yOption8, disableA11yOption8}