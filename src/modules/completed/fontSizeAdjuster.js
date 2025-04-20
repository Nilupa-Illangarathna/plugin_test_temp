let currentFontSizeStage = 0; // Keeps track of the current enlargement stage
const maxSize = 4; // Maximum font enlargement stages
const words = ["①", "②", "③", "④"]; // Labels for enlargement levels
const defaultFontSize = 100; // Default font size percentage
const increment = 2; // Percentage increase per stage
const exclusionClass = "a11y-jimat-container-ignore"; // Class to exclude from font size changes

// Cyclic Font Size Adjustment
function adjustFontSize() {
  const bars = document.querySelectorAll("#a11y-jimat-container-increase-font .progress-bar");
  const mainHeading = document.querySelector("#a11y-jimat-container-increase-font .position-word span");
  const subHeading = document.querySelector("#a11y-jimat-container-increase-font .sub-heading");
  const progressContainer = document.querySelector("#a11y-jimat-container-increase-font .progress-bar-container");

  // Hide the sub-heading on the first click
  if (subHeading) {
    subHeading.style.display = "none";
  }

  // Make the progress bar container visible
  progressContainer.style.display = "flex";


  if (currentFontSizeStage === maxSize) {
    resetFontSize(); // If max stage is reached, reset
  } else {
    applyFontSizeStage(currentFontSizeStage); // Apply size step by step
    currentFontSizeStage++; // Move to the next stage
  }
}

// Reset Font Size to Default
function resetFontSize() {
  currentFontSizeStage = 0; // Reset font size stage tracking

  const bars = document.querySelectorAll("#a11y-jimat-container-increase-font .progress-bar");
  const mainHeading = document.querySelector("#a11y-jimat-container-increase-font .position-word span");
  const subHeading = document.querySelector("#a11y-jimat-container-increase-font .sub-heading");
  const progressContainer = document.querySelector("#a11y-jimat-container-increase-font .progress-bar-container");

  // Reset UI elements
  bars.forEach(bar => bar.classList.remove("filled"));
  if (mainHeading) mainHeading.textContent = "文字の拡大";
  if (subHeading) subHeading.style.display = "block";
  if (progressContainer) progressContainer.style.display = "none";

  // Reset font size for all text elements except those in the exclusion class
  document.querySelectorAll("body, body *:not(." + exclusionClass + " *):not(." + exclusionClass + ")").forEach(el => {
    if (el.tagName !== "SCRIPT" && el.tagName !== "STYLE") {
      el.style.fontSize = "";
    }
  });

  document.getElementById("a11y-jimat-container-increase-font").classList.remove("selected", "clicked");
}

// Set Font Size to Stage 1
function applyFontSize1() {
  resetFontSize();
  applyFontSizeStage(0);
  currentFontSizeStage = 1;
}

// Set Font Size to Stage 2
function applyFontSize2() {
  resetFontSize();
  applyFontSizeStage(0);
  applyFontSizeStage(1);
  currentFontSizeStage = 2;
}

// Set Font Size to Stage 3
function applyFontSize3() {
  resetFontSize();
  applyFontSizeStage(0);
  applyFontSizeStage(1);
  applyFontSizeStage(2);
  currentFontSizeStage = 3;
}

// Set Font Size to Stage 4 (Max)
function applyFontSize4() {
  resetFontSize();
  applyFontSizeStage(0);
  applyFontSizeStage(1);
  applyFontSizeStage(2);
  applyFontSizeStage(3);
  currentFontSizeStage = 4;
}

// Helper Function: Apply a Specific Font Size Stage
function applyFontSizeStage(stage) {
  const bars = document.querySelectorAll("#a11y-jimat-container-increase-font .progress-bar");
  const mainHeading = document.querySelector("#a11y-jimat-container-increase-font .position-word span");

  if (stage < maxSize) {
    bars[stage].classList.add("filled");
    mainHeading.textContent = `文字の拡大 ${words[stage]}`;

    // Increase font size for all text elements except those in the exclusion class
    document.querySelectorAll("body, body *:not(." + exclusionClass + " *):not(." + exclusionClass + ")").forEach(el => {
      if (el.tagName !== "SCRIPT" && el.tagName !== "STYLE") {
        const currentSize = window.getComputedStyle(el).fontSize;
        const newSize = parseFloat(currentSize) * (1 + increment / 100);
        el.style.fontSize = `${newSize}px`;
      }
    });
  }
}

export {adjustFontSize, resetFontSize, applyFontSize1, applyFontSize2, applyFontSize3, applyFontSize4};
