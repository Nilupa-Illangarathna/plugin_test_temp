
const exclusionClass = "a11y-jimat-container-ignore"; // Class to exclude from clipboard operations
let clipboardData = "";

// Function to copy the entire page text, excluding elements with `a11y-jimat-container-ignore`
function copyPageText() {
    let elements = document.body.querySelectorAll(`*:not(.${exclusionClass})`);
    let pageText = Array.from(elements).map(el => el.innerText.trim()).join("\n");

    clipboardData = pageText;
    navigator.clipboard.writeText(clipboardData).then(() => {
        console.log("Copied entire page text to clipboard.");
    }).catch(err => {
        console.error("Failed to copy text:", err);
    });
}

// Function to copy selected text, excluding elements with `a11y-jimat-container-ignore`
function copySelectedText() {
    let selection = window.getSelection();
    let selectedText = selection.toString();

    if (selectedText) {
        clipboardData = selectedText;
        navigator.clipboard.writeText(clipboardData).then(() => {
            console.log("Copied selected text to clipboard.");
        }).catch(err => {
            console.error("Failed to copy selection:", err);
        });
    } else {
        console.log("No text selected. Copying entire page instead.");
        copyPageText();
    }
}

// Function to paste text into the focused input field, excluding `a11y-jimat-container-ignore` fields
function pasteClipboardText() {
    let active = document.activeElement;

    if (
        active &&
        (active.tagName === "INPUT" || active.tagName === "TEXTAREA") &&
        !active.classList.contains(exclusionClass)
    ) {
        active.value += clipboardData;
        console.log("Pasted clipboard text into input field.");
    } else {
        console.log("No eligible input field is focused to paste.");
    }
}

// Export all functions inline
export {copySelectedText, pasteClipboardText };
