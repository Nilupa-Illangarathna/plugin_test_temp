import { resetAllButtonStates, setMultipleButtonStates } from "../stateManager.js";
import { toggleButtonActive } from "./toggle_state.js";
import { actions, resetActions, functionActions } from "../../util/eventListeners.js";


function enableA11yOption1() {

    resetAllButtonStates();

    //  Apply the new state
    setMultipleButtonStates([
      ["a11y-jimat-container-option1", 1]
    ]);

    toggleButtonActive("a11y-jimat-container-option1", "add", true);

    const saturationControl = document.getElementById("a11y-jimat-container-saturation-control");
    const progressContainer = document.querySelector("#a11y-jimat-container-saturation-control .progress-bar-container");
    const bars = document.querySelectorAll("#a11y-jimat-container-saturation-control .progress-bar");
    const mainHeading = document.querySelector("#a11y-jimat-container-saturation-control .position-word span");
    const subHeading = document.querySelector("#a11y-jimat-container-saturation-control .sub-heading");
    const stopAnimationBtn = document.getElementById("a11y-jimat-container-stop-animation-btn");


    saturationControl.classList.add("selected", "clicked");
    stopAnimationBtn.classList.add("selected");
    if (progressContainer) progressContainer.style.display = "flex";
    bars.forEach(bar => bar.classList.add("filled"));
    if (mainHeading) mainHeading.textContent = "彩度の調整 （低）";
    if (subHeading) subHeading.style.display = "none";

    //  Call activation actions
    functionActions["a11y-jimat-container-saturation-function1"]();
    functionActions["a11y-jimat-container-animation-stop-function1"]();
  }

  function disableA11yOption1() {

    resetAllButtonStates();

    //  Apply the new state
    setMultipleButtonStates([
      ["a11y-jimat-container-option1", 0]
    ]);

    toggleButtonActive("a11y-jimat-container-option1", "remove", true);

    const saturationControl = document.getElementById("a11y-jimat-container-saturation-control");
    const progressContainer = document.querySelector("#a11y-jimat-container-saturation-control .progress-bar-container");
    const bars = document.querySelectorAll("#a11y-jimat-container-saturation-control .progress-bar");
    const mainHeading = document.querySelector("#a11y-jimat-container-saturation-control .position-word span");
    const subHeading = document.querySelector("#a11y-jimat-container-saturation-control .sub-heading");
    const stopAnimationBtn = document.getElementById("a11y-jimat-container-stop-animation-btn");


    saturationControl.classList.remove("selected", "clicked");
    stopAnimationBtn.classList.remove("selected");
    if (progressContainer) progressContainer.style.display = "none";
    bars.forEach(bar => bar.classList.remove("filled"));
    if (mainHeading) mainHeading.textContent = "色の彩度"; // Default text after reset

    if (subHeading) subHeading.style.display = "block"; // Show again if hidden

    functionActions["a11y-jimat-container-saturation-function0"]();
    functionActions["a11y-jimat-container-animation-stop-function0"]();
  }


  export {enableA11yOption1, disableA11yOption1}