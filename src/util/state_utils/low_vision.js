import { resetAllButtonStates, setMultipleButtonStates } from "../stateManager.js";
import { toggleButtonActive } from "./toggle_state.js";
import { actions, resetActions, functionActions } from "../../util/eventListeners.js";


function enableA11yOption5() {

    resetAllButtonStates();
    
    toggleButtonActive("a11y-jimat-container-option5", "add", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option5", 1]
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

    const fontControl = document.getElementById("a11y-jimat-container-increase-font");
    const progressContainerFont = document.querySelector("#a11y-jimat-container-increase-font .progress-bar-container");
    const barsFont = document.querySelectorAll("#a11y-jimat-container-increase-font .progress-bar");
    const mainHeadingFont = document.querySelector("#a11y-jimat-container-increase-font .position-word span");
    const subHeadingFont = document.querySelector("#a11y-jimat-container-increase-font .sub-heading");

    if (fontControl && progressContainerFont) {
        fontControl.classList.add("selected", "clicked");
        progressContainerFont.style.display = "flex";
        if (barsFont.length > 0) {
            barsFont[0].classList.add("filled"); // Start from the first progress bar
        }
        if (mainHeadingFont) mainHeadingFont.textContent = "文字の拡大①"; // First level font size indicator
        if (subHeadingFont) subHeadingFont.style.display = "none"; // Hide the subheading
    }

    //  Call activation actions
    functionActions["a11y-jimat-container-selection-reader-function1"]();
    functionActions["a11y-jimat-container-saturation-function1"]();
    functionActions["a11y-jimat-container-font-size-function1"]();
}

function disableA11yOption5() {

    resetAllButtonStates();
    
    toggleButtonActive("a11y-jimat-container-option5", "remove", true);

    setMultipleButtonStates([
        ["a11y-jimat-container-option5", 0]
    ]);

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

        if (subHeading) subHeading.style.display = "block";
    }

    const fontControl = document.getElementById("a11y-jimat-container-increase-font");
    const progressContainerFont = document.querySelector("#a11y-jimat-container-increase-font .progress-bar-container");
    const barsFont = document.querySelectorAll("#a11y-jimat-container-increase-font .progress-bar");
    const mainHeadingFont = document.querySelector("#a11y-jimat-container-increase-font .position-word span");
    const subHeadingFont = document.querySelector("#a11y-jimat-container-increase-font .sub-heading");

    if (fontControl && progressContainerFont) {
        fontControl.classList.remove("selected", "clicked");
        progressContainerFont.style.display = "none";
        barsFont.forEach(bar => bar.classList.remove("filled"));
        if (mainHeadingFont) mainHeadingFont.textContent = "";
        if (subHeadingFont) subHeadingFont.style.display = "block";
    }

    //  Call reset actions
    functionActions["a11y-jimat-container-selection-reader-function0"]();
    functionActions["a11y-jimat-container-saturation-function0"]();
    functionActions["a11y-jimat-container-font-size-function0"]();
}


export {enableA11yOption5, disableA11yOption5}