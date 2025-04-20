import { resetAllButtonStates, setMultipleButtonStates } from "../stateManager.js";
import { toggleButtonActive } from "./toggle_state.js";
import { actions, resetActions, functionActions } from "../../util/eventListeners.js";

function enableA11yOption3() {

    resetAllButtonStates();

    toggleButtonActive("a11y-jimat-container-option3", "add", true);
    
    //  Apply the new state
    setMultipleButtonStates([
        ["a11y-jimat-container-option3", 1]
    ]);

    const saturationControl = document.getElementById("a11y-jimat-container-saturation-control");
    const progressContainer = document.querySelector("#a11y-jimat-container-saturation-control .progress-bar-container");
    const bars = document.querySelectorAll("#a11y-jimat-container-saturation-control .progress-bar");
    const mainHeading = document.querySelector("#a11y-jimat-container-saturation-control .position-word span");
    const subHeading = document.querySelector("#a11y-jimat-container-saturation-control .sub-heading");


    if (saturationControl && progressContainer) {
        saturationControl.classList.add("selected", "clicked");
        progressContainer.style.display = "flex";
        if (bars.length > 0) {
            bars[0].classList.add("filled");
        }
        if (mainHeading) mainHeading.textContent = "彩度の調整 （低）";
        if (subHeading) subHeading.style.display = "none";
    }

    //  Call activation actions
    functionActions["a11y-jimat-container-saturation-function1"]();
}

function disableA11yOption3() {

    resetAllButtonStates();

    setMultipleButtonStates([
        ["a11y-jimat-container-option3", 0]
    ]);

    toggleButtonActive("a11y-jimat-container-option3", "remove", true);

    const saturationControl = document.getElementById("a11y-jimat-container-saturation-control");
    const progressContainer = document.querySelector("#a11y-jimat-container-saturation-control .progress-bar-container");
    const bars = document.querySelectorAll("#a11y-jimat-container-saturation-control .progress-bar");
    const mainHeading = document.querySelector("#a11y-jimat-container-saturation-control .position-word span");
    const subHeading = document.querySelector("#a11y-jimat-container-saturation-control .sub-heading");

    if (saturationControl && progressContainer) {
        saturationControl.classList.remove("selected", "clicked");
        progressContainer.style.display = "none";
        bars.forEach(bar => bar.classList.remove("filled"));
        if (mainHeading) mainHeading.textContent = "色の彩度"; // Default text after reset
        if (subHeading) subHeading.style.display = "block"; // Show again if hidden
    }

    //  Call reset actions
    functionActions["a11y-jimat-container-saturation-function0"]();
}


export {enableA11yOption3, disableA11yOption3}