// saturationController.js

const exclusionClass = "a11y-jimat-container-ignore"; // Class to exclude from saturation effects

// Mock function to simulate setting option values
function setSaturationOption(option, value) {

    // Exclude elements inside `a11y-jimat-container-ignore`
    document.querySelectorAll("body *:not(." + exclusionClass + " *):not(." + exclusionClass + ")").forEach(el => {
        el.dataset[option] = value; // Store saturation setting in dataset
    });
}




function applyFilter(enable, filterValue) {
    const exclusionClass = "a11y-jimat-container-ignore";

    // Apply filter ONLY to elements that are NOT inside `.a11y-jimat-container-ignore`
    document.querySelectorAll("body *:not(." + exclusionClass + " *):not(." + exclusionClass + ")").forEach(el => {
        el.style.filter = enable ? filterValue : "none";
    });

    // Forcefully remove filters from `.a11y-jimat-container-ignore` and its children
    document.querySelectorAll(`.${exclusionClass}, .${exclusionClass} *`).forEach(el => {
        el.style.filter = "none";
        el.style.setProperty("filter", "none", "important"); // Ensures no overrides
    });

    // Ensure the trigger button remains unaffected
    const triggerButton = document.getElementById("a11y-jimat-container-trigger-button");
    if (triggerButton) {
        triggerButton.style.filter = "none";
        triggerButton.style.setProperty("filter", "none", "important");
    }
}













// Function to Reset Saturation Settings
function resetSaturation() {
    setSaturationOption("lowSaturation", false);
    setSaturationOption("highSaturation", false);
    setSaturationOption("blackAndWhite", false);
    applyFilter(false, "none");
}

// Function to Apply Saturation States with an argument
function applySaturationState(state) {
    resetSaturation(); // Clear previous states

    if (state === "low") {
        setSaturationOption("lowSaturation", true);
        applyFilter(true, "saturate(50%)");
    } else if (state === "high") {
        setSaturationOption("highSaturation", true);
        applyFilter(true, "saturate(500%)");
    } else if (state === "bw") {
        setSaturationOption("blackAndWhite", true);
        applyFilter(true, "grayscale(100%)");
    } else {
    }
}

export { applySaturationState, resetSaturation, applyFilter, setSaturationOption };
