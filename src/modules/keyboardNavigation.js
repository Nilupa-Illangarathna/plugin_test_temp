import { injectStyles } from "../util/styleInjector.js";

export function handleKeyboardNavigation(event) {
  if (event.key === "Tab") {
    const existingFocus = document.querySelectorAll(".a11y-jimat-container-focus-visible");
    existingFocus.forEach((el) => el.classList.remove("a11y-jimat-container-focus-visible"));

    setTimeout(() => {
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement !== document.body) {
        focusedElement.classList.add("a11y-jimat-container-focus-visible");
      }
    }, 0);
  }
}

const injectedStyles = `
    .a11y-jimat-container-focus-visible {
        outline: 3px solid #4A90E2 !important;
        outline-offset: 2px !important;
    }
`;

injectStyles(injectedStyles);









