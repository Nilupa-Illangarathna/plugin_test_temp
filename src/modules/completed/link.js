// linkStyleController.js

const exclusionClass = "a11y-jimat-container-ignore"; // Class to exclude from link styling

// Stores the state of underline and highlight globally
let isUnderlineEnabled = false;
let isHighlightEnabled = false;

// Function to apply underline to links
function enableUnderline() {
    isUnderlineEnabled = true;
    updateStyles();
}

// Function to apply highlight to links
function enableHighlight() {
    isHighlightEnabled = true;
    updateStyles();
}

// Function to remove only underline from links
function removeUnderline() {
    isUnderlineEnabled = false;
    updateStyles();
}

// Function to remove only highlight from links
function removeHighlight() {
    isHighlightEnabled = false;
    updateStyles();
}

// Core function that updates styles based on states
function updateStyles() {

    let styleType = "";

    if (isUnderlineEnabled && isHighlightEnabled) {
        styleType = "underlined_highlight";
    } else if (isUnderlineEnabled) {
        styleType = "underline";
    } else if (isHighlightEnabled) {
        styleType = "highlight";
    } else {
        styleType = ""; // If neither is selected, remove all
    }

    toggleHighlightLinks(styleType);
}

// Function to inject styles dynamically
function toggleHighlightLinks(styleType) {

    // Remove all previously injected styles
    document.querySelectorAll("style[data-highlight-style]").forEach((styleTag) => {
        styleTag.remove();
    });

    // Remove previous highlight class
    document.querySelectorAll("a, area").forEach((link) => {
        link.classList.remove("highlight");
    });

    // If styleType is empty, stop here (no styles to apply)
    if (!styleType) {
        return;
    }

    // Define styles based on the styleType
    let injectedStyles = "";

    if (styleType === "underline") {
        injectedStyles = `
        a:not(.${exclusionClass} *):not(.${exclusionClass}) {
            text-decoration: underline !important;
            text-decoration-color: blue !important;
            text-decoration-thickness: 6px !important;
        }
        `;
    } else if (styleType === "highlight") {
        injectedStyles = `
        a:not(.${exclusionClass} *):not(.${exclusionClass}) {
            background-color: yellow !important;
            color: red !important;
        }
        `;
    } else if (styleType === "underlined_highlight") {
        injectedStyles = `
        a:not(.${exclusionClass} *):not(.${exclusionClass}) {
            background-color: yellow !important;
            color: red !important;
            text-decoration: underline !important;
            text-decoration-color: blue !important;
            text-decoration-thickness: 6px !important;
        }
        `;
    }

    // Inject new styles dynamically
    const styleTag = document.createElement("style");
    styleTag.setAttribute("data-highlight-style", "true");
    styleTag.textContent = injectedStyles;
    document.head.appendChild(styleTag);

    // Add the highlight class to valid links (excluding elements inside `a11y-jimat-container-ignore`)
    document.querySelectorAll(
        `a:not([role='button']):not(.styled-button):not(.styled-link):not(.cta-button):not(button):not(.${exclusionClass} *):not(.${exclusionClass}),
         area:not(.${exclusionClass} *):not(.${exclusionClass}),
         nav a:not(.${exclusionClass} *):not(.${exclusionClass})`
    ).forEach((link) => {
        link.classList.add("highlight");
    });
}

export { enableUnderline, enableHighlight, removeUnderline, removeHighlight };
