
const exclusionClass = "a11y-jimat-container-ignore";

let isFocusHighlightEnabled = false;

function enableFocusHighlight() {
    isFocusHighlightEnabled = true;
    updateFocusStyles();
}

function disableFocusHighlight() {
    isFocusHighlightEnabled = false;
    updateFocusStyles();
}

function updateFocusStyles() {

    document.querySelectorAll("style[data-focus-style]").forEach((styleTag) => {
        styleTag.remove();
    });

    document.querySelectorAll("*:focus").forEach((element) => {
        element.classList.remove("focus-highlight");
    });

    if (!isFocusHighlightEnabled) {
        return;
    }

    const injectedStyles = `
        *:focus:not(.${exclusionClass} *):not(.${exclusionClass}) {
            outline: dashed 3px #f00 !important;
        }
    `;

    const styleTag = document.createElement("style");
    styleTag.setAttribute("data-focus-style", "true");
    styleTag.textContent = injectedStyles;
    document.head.appendChild(styleTag);
}

export { enableFocusHighlight, disableFocusHighlight };
