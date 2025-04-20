import { resetAllButtonStates, setMultipleButtonStates } from "../stateManager.js";
import { toggleButtonActive } from "./toggle_state.js";
import { actions, resetActions, functionActions } from "../../util/eventListeners.js";


function enableA11yOption4() {
    
    resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option4", "add", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option4", 1]
    ]);

    //  Call activation actions
    functionActions["a11y-jimat-container-screan-reader-function1"]();
}

function disableA11yOption4() {

    resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option4", "remove", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option4", 0]
    ]);

    //  Call reset actions
    functionActions["a11y-jimat-container-screan-reader-function0"]();
}



export {enableA11yOption4, disableA11yOption4}