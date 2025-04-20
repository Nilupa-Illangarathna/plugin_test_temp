import {
  setOption,
  getOption,
  setOriginalStyles,
  getOriginalStyles,
} from "../util/stateManager.js";

// Get all elements except the control panel
function getFilteredElements() {
  const controlPanel = document.getElementById("a11y-jimat-container-control-panel");
  return Array.from(
    document.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, a, button")
  ).filter((element) => {
    let currentElement = element;
    while (currentElement) {
      if (currentElement === controlPanel) {
        return false;
      }
      currentElement = currentElement.parentElement;
    }
    return true;
  });
}

// Set style and track the original value for resetting
function setStyle(element, styleProperty, newValue) {
  const originalStyles = getOriginalStyles();
  if (!originalStyles.has(element)) {
    originalStyles.set(element, {});
  }

  if (!originalStyles.get(element).hasOwnProperty(styleProperty)) {
    originalStyles.get(element)[styleProperty] =
      window.getComputedStyle(element)[styleProperty];
  }

  element.style[styleProperty] = newValue;
  setOriginalStyles(originalStyles);
}

// Reset styles to their original values
export function resetStyles() {
  const originalStyles = getOriginalStyles();
  for (const [element, styles] of originalStyles) {
    for (const [styleProperty, value] of Object.entries(styles)) {
      element.style[styleProperty] = value;
    }
  }
  setOriginalStyles(new Map()); // Clear saved original styles
}

// Change font size based on the delta value
export function changeFontSize(delta) {
  const filteredElements = getFilteredElements();
  filteredElements.forEach((element) => {
    const currentSize = parseInt(window.getComputedStyle(element).fontSize, 10);
    const newSize = currentSize + delta;
    setStyle(element, "fontSize", `${newSize}px`);
  });
  setOption("fontSize", getOption("fontSize") + delta); // Update state
}

// Change text spacing based on the delta value
export function changeTextSpacing(letterDelta) {
  const filteredElements = getFilteredElements();
  filteredElements.forEach((element) => {
    const currentLetterSpacing =
      parseFloat(window.getComputedStyle(element).letterSpacing) || 0;
    const newLetterSpacing = currentLetterSpacing + letterDelta;
    setStyle(element, "letterSpacing", `${newLetterSpacing}px`);
  });
  setOption("textSpace", getOption("textSpace") + letterDelta); // Update state
}

// Toggle line spacing between predefined values
export function toggleLineSpacing() {
  const filteredElements = getFilteredElements();
  const lineHeights = [1, 1.5, 2.0, 2.5 ,3.0];

  filteredElements.forEach((element) => {
    let currentIndex = parseInt(element.dataset.lineHeightIndex, 10) || 0;
    let nextIndex = (currentIndex + 1) % lineHeights.length;

    setStyle(element, "lineHeight", lineHeights[nextIndex]);
    element.dataset.lineHeightIndex = nextIndex.toString();
  });
  setOption(
    "lineSpace",
    lineHeights[
      (parseInt(filteredElements[0].dataset.lineHeightIndex, 10) + 1) %
        lineHeights.length
    ]
  ); // Update state
}

// Change text alignment across filtered elements
function changeTextAlignment(alignment) {
  const filteredElements = getFilteredElements();
  filteredElements.forEach((element) => {
    setStyle(element, "textAlign", alignment);
  });
}

// Toggle through text alignments (left, center, right, justify)
export function toggleTextAlignment() {
  const filteredElements = getFilteredElements();
  const alignments = ["left", "center", "right", "justify"];
  const currentAlignmentIndex = alignments.indexOf(
    window.getComputedStyle(filteredElements[0]).textAlign
  );
  const nextAlignmentIndex = (currentAlignmentIndex + 1) % alignments.length;
  changeTextAlignment(alignments[nextAlignmentIndex]);
  setOption("alignment", alignments[nextAlignmentIndex]); // Update state
}

// Toggle font between OpenDyslexic and Arial
export function toggleFont() {
  const filteredElements = getFilteredElements();
  const font = window.getComputedStyle(filteredElements[0]).fontFamily;
  const newFont = font === "OpenDyslexic" ? "Arial" : "OpenDyslexic";
  filteredElements.forEach((element) => {
    setStyle(element, "fontFamily", newFont);
  });
  setOption("font", newFont); // Update state
}
