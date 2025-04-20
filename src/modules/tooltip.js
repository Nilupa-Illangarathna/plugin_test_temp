import { setOption, getOption } from "../util/stateManager.js";
import { injectStyles } from "../util/styleInjector.js";

export function toggleTooltips() {
  const tooltipsEnabled = getOption("tooltip") || false;

  setOption("tooltip", !tooltipsEnabled);

  document.querySelectorAll("[aria-label]").forEach((element) => {
    if (!tooltipsEnabled) {
      const existingTooltips = element.parentNode.querySelectorAll(".tooltip");
      existingTooltips.forEach((tooltip) => {
        tooltip.remove();
      });
    } else {
      const tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      tooltip.textContent = element.getAttribute("aria-label");

      element.parentNode.insertBefore(tooltip, element.nextSibling);

      element.addEventListener("mouseenter", () => {
        tooltip.style.display = "block";
      });
      element.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
      });
    }
  });
}

const injectedStyles = `
    /* General tooltip styling */

    .tooltip {
      position: absolute;
      background-color: #333;
      color: #fff;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 100;
      display: none;
      pointer-events: none;
  }
`;

injectStyles(injectedStyles);
