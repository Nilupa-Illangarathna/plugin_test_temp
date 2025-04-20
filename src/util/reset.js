export function reset() {
  this.originalStyles.forEach((value, element) => {
    element.style.fontSize = `${value}px`;
  });

  if (this.options.highContrast) {
    this.toggleHighContrast();
  }

  if (this.options.invert) {
    this.toggInvertFilter();
  }

  if (this.options.hideImage) {
    this.toggHideImage();
  }

  if (this.options.textToSpeech) {
    window.speechSynthesis.cancel();
  }

  const focusElements = document.querySelectorAll(".a11y-jimat-container-focus-visible");
  focusElements.forEach((el) => el.classList.remove("a11y-jimat-container-focus-visible"));
}
