export function injectStyles(injectedStyles) {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = injectedStyles;
  document.head.appendChild(styleSheet);
}
