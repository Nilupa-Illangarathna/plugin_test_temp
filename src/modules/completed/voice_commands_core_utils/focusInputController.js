

const exclusionClass = "a11y-jimat-container-ignore"; // Class to exclude from focus selection
let focusedElementIndex = -1;

// Function to get focusable elements (inputs, textareas, buttons, select elements)
function getFocusableElements() {
    return [...document.querySelectorAll("input, textarea, button, select")].filter(el => !el.classList.contains(exclusionClass));
}

// Function to focus on the first available input field when activating voice commands
function focusFirstInput() {
    let inputs = getFocusableElements();
    if (inputs.length > 0) {
        focusedElementIndex = 0;
        inputs[focusedElementIndex].focus();
        console.log("Focusing first input field...");
    }
}

// Function to focus next input field
function focusNextInput() {
    let inputs = getFocusableElements();
    if (inputs.length > 0) {
        focusedElementIndex = (focusedElementIndex + 1) % inputs.length;
        inputs[focusedElementIndex].focus();
        console.log("Focusing next input...");
    }
}

// Function to focus previous input field
function focusPreviousInput() {
    let inputs = getFocusableElements();
    if (inputs.length > 0) {
        focusedElementIndex = (focusedElementIndex - 1 + inputs.length) % inputs.length;
        inputs[focusedElementIndex].focus();
        console.log("Focusing previous input...");
    }
}

// Function to type text in the focused input field
function typeInFocusedInput(text) {
    let active = document.activeElement;
    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) {
        active.value = text;
        console.log("Typed:", text);
    } else {
        console.log("No text input field is focused.");
    }
}

// Export all functions in an inline manner
export { focusFirstInput, focusNextInput, focusPreviousInput, typeInFocusedInput };
