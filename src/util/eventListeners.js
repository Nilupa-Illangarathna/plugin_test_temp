import { speakWholePage, stopSpeech } from "../modules/completed/textToSpeech.js";
import {applySaturationState, resetSaturation} from '../modules/completed/saturationControler.js';
import {adjustFontSize,resetFontSize, applyFontSize1, applyFontSize2, applyFontSize3, applyFontSize4} from "../modules/completed/fontSizeAdjuster.js";
import { enableUnderline, removeUnderline, enableHighlight, removeHighlight } from "../modules/completed/link.js";
import {toggleSelectionDetection } from "../modules/completed/selectionRead.js";
import { enableAnimations ,disableAnimations } from "../modules/completed/stopAnimation.js";
import { enableFocusHighlight, disableFocusHighlight } from '../modules/completed/focusHighlights.js';
import { 
  setScreenReaderState, 
  setTextSelectionReaderState, 
  setSaturationState, 
  setFontSizeState, 
  setLinkUnderlineState, 
  setLinkHighlightState,
  setAnimationState, 
  setKeyboardHighlightState, 
  setVoiceControlState, 
  setVirtualKeyboardState 
}  from "../util/state_utils/function_buttons.js";


import { startSelectionReading, stopSelectionReading } from "../modules/completed/selectionRead.js";





import {
  changeFontSize,
  changeTextSpacing,
  toggleTextAlignment,
  toggleFont,
  toggleLineSpacing,
} from "../modules/text.js";
import {
  toggleHighContrast,
  toggleInvertFilter,
  toggleSaturationFilter,
  toggleBlackAndWhiteFilter,
  resetAllFilters,
} from "../modules/filter.js";
import { toggleCursorStyle } from "../modules/cursor.js";

import { toggleHideImage } from "../modules/hideImage.js";
import { toggleTooltips } from "../modules/tooltip.js";
import { handleKeyboardNavigation } from "../modules/keyboardNavigation.js";
// import { toggleAnimations } from "../modules/completed/stopAnimation.js";
import PageStructureAnalyzer from "../modules/pageStructure.js";

// Object to Trigger Features
export const actions = {
  //  Accessibility Features

  // Full page read
  "a11y-jimat-container-text-to-speech": () => speakWholePage(),
  // Read selected text
  "a11y-jimat-container-text-selection-reader": () => toggleSelectionDetection(true),
  // Saturation apply
  "a11y-jimat-container-saturation-control-low": () => applySaturationState("low"),
  "a11y-jimat-container-saturation-control-high": () => applySaturationState("high"),
  "a11y-jimat-container-saturation-control-bw": () => applySaturationState("bw"),
  // Font Size Adjustment
  "a11y-jimat-container-increase-font": () => adjustFontSize(),
  "a11y-jimat-container-increase-font-level1": () => applyFontSize1(),
  "a11y-jimat-container-increase-font-level2": () => applyFontSize2(),
  "a11y-jimat-container-increase-font-level3": () => applyFontSize3(),
  "a11y-jimat-container-increase-font-level4": () => applyFontSize4(),
  // Enable Highlight
  "a11y-jimat-container-link-highlight": () => enableHighlight(),
  // Enable Underline
  "a11y-jimat-container-link-underline": () => enableUnderline(), 
  // Enable animations
  "a11y-jimat-container-enable-animations": () => disableAnimations(), 
  // Enable keybaord operation highlights
  "a11y-jimat-container-enable-keybaord-operation-highlights": () => enableFocusHighlight(), 


  // TODO: TO complete
  // Enable virtual keybaord
  "a11y-jimat-container-enable-virtual-keybaord": () => {
  }, 
  // Enable voice controls
  "a11y-jimat-container-enable-voice-controls": () => {
  }, 




  "a11y-jimat-container-increase-text-space": () => changeTextSpacing(2),
  "a11y-jimat-container-decrease-text-space": () => changeTextSpacing(-2),
  "a11y-jimat-container-line-space": () => toggleLineSpacing(),
  "a11y-jimat-container-text-alignment": () => toggleTextAlignment(),
  "a11y-jimat-container-toggle-font": () => toggleFont(),

  //  Filters & Colors
  "a11y-jimat-container-high-contrast": () => toggleHighContrast(),
  "a11y-jimat-container-invert": () => toggleInvertFilter(),
  "a11y-jimat-container-saturation": () => toggleSaturationFilter(),
  "a11y-jimat-container-blackAndWhite": () => toggleBlackAndWhiteFilter(),

  //  Accessibility Features
  "a11y-jimat-container-text-to-speech": () => speakWholePage(),
  "a11y-jimat-container-hide-image": () => toggleHideImage(),

  "a11y-jimat-container-cursor": () => toggleCursorStyle(),
  "a11y-jimat-container-tooltip": () => toggleTooltips(),
  // "a11y-jimat-container-animation": () => toggleAnimations(),
  "a11y-jimat-container-page-structure": () => PageStructureAnalyzer.init(),
};

// Object to Reset Features
export const resetActions = {
  // Full opage read stop
  "a11y-jimat-container-reset-text-to-speech": () => stopSpeech(),
  // Read selected text
  "a11y-jimat-container-reset-text-selection-reader": () => toggleSelectionDetection(false),
  // Saturation controler stop
  "a11y-jimat-container-reset-saturation-control": () => resetSaturation(),
  // font size reset
  "a11y-jimat-container-reset-font": () => resetFontSize(),
  // Disable Highlight
  "a11y-jimat-container-reset-link-highlight": () => removeHighlight(),
  // Disable Underline
  "a11y-jimat-container-reset-link-underline": () => removeUnderline(), 
  // Enable animations
  "a11y-jimat-container-reset-enable-animations": () => enableAnimations(), 
  // Enable keybaord operation highlights
  "a11y-jimat-container-reset-enable-keybaord-operation-highlights": () => disableFocusHighlight(), 




  // TODO: TO complete
  // Enable virtual keybaord
  "a11y-jimat-container-reset-enable-virtual-keybaord": () => {
  }, 
  // Enable voice controls
  "a11y-jimat-container-reset-enable-voice-controls": () => {
  }, 




  "a11y-jimat-container-reset-all": () => resetAllSettings(),
  "a11y-jimat-container-reset-filters": () => resetAllFilters(),
  "a11y-jimat-container-reset-contrast": () => resetSpecificSetting("contrast"),
  "a11y-jimat-container-reset-links": () => resetSpecificSetting("links"),
  
};





// Object to Reset Features
export const functionActions = {

"a11y-jimat-container-screan-reader-function": () =>  setScreenReaderState(),
"a11y-jimat-container-screan-reader-function0": () => setScreenReaderState(0),
"a11y-jimat-container-screan-reader-function1": () => setScreenReaderState(1),

"a11y-jimat-container-selection-reader-function": () =>  setTextSelectionReaderState(),
"a11y-jimat-container-selection-reader-function0": () => setTextSelectionReaderState(0),
"a11y-jimat-container-selection-reader-function1": () => setTextSelectionReaderState(1),

"a11y-jimat-container-virtual-keyboard-function": () => setVirtualKeyboardState(),
"a11y-jimat-container-virtual-keyboard-function0": () => setVirtualKeyboardState(0),
"a11y-jimat-container-virtual-keyboard-function1": () => setVirtualKeyboardState(1),

"a11y-jimat-container-keyboard-highlights-function": () => setKeyboardHighlightState(),
"a11y-jimat-container-keyboard-highlights-function0": () => setKeyboardHighlightState(0),
"a11y-jimat-container-keyboard-highlights-function1": () => setKeyboardHighlightState(1),

"a11y-jimat-container-voice-control-function": () => setVoiceControlState(),
"a11y-jimat-container-voice-control-function0": () => setVoiceControlState(0),
"a11y-jimat-container-voice-control-function1": () => setVoiceControlState(1),

"a11y-jimat-container-saturation-function": () => setSaturationState(),
"a11y-jimat-container-saturation-function0": () => setSaturationState(0),
"a11y-jimat-container-saturation-function1": () => setSaturationState(1),
"a11y-jimat-container-saturation-function2": () => setSaturationState(2),
"a11y-jimat-container-saturation-function3": () => setSaturationState(3),

"a11y-jimat-container-font-size-function": () =>  setFontSizeState(),
"a11y-jimat-container-font-size-function0": () => setFontSizeState(0),
"a11y-jimat-container-font-size-function1": () => setFontSizeState(1),
"a11y-jimat-container-font-size-function2": () => setFontSizeState(2),
"a11y-jimat-container-font-size-function3": () => setFontSizeState(3),
"a11y-jimat-container-font-size-function4": () => setFontSizeState(4),

"a11y-jimat-container-link-underline-function": () => setLinkUnderlineState(),
"a11y-jimat-container-link-underline-function0": () => setLinkUnderlineState(0),
"a11y-jimat-container-link-underline-function1": () => setLinkUnderlineState(1),

"a11y-jimat-container-link-highlight-function": () => setLinkHighlightState(),
"a11y-jimat-container-link-highlight-function0": () => setLinkHighlightState(0),
"a11y-jimat-container-link-highlight-function1": () => setLinkHighlightState(1),

"a11y-jimat-container-animation-stop-function": () => setAnimationState(),
"a11y-jimat-container-animation-stop-function0": () => setAnimationState(0),
"a11y-jimat-container-animation-stop-function1": () => setAnimationState(1),
};



// Centralized Event Listener Function
export function setupEventListeners() {
  Object.entries(actions).forEach(([id, action]) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", action);
    }
  });

  document.addEventListener("keydown", handleKeyboardNavigation);
}

// Reset Function
function resetAllSettings() {

  // Reset text size & spacing
  document.querySelectorAll("*").forEach((element) => {
    element.style.fontSize = "";
    element.style.letterSpacing = "";
    element.style.lineHeight = "";
  });

  // Reset filters, contrast, and invert
  resetAllFilters();

  // Reset images
  document.querySelectorAll("img").forEach((img) => {
    img.style.visibility = "visible";
  });

  // Reset animations
  document.querySelectorAll("video, gif, [style*='animation']").forEach((el) => {
    el.style.animation = "";
  });

  // Reset keyboard navigation styles
  const focusElements = document.querySelectorAll(".a11y-jimat-container-focus-visible");
  focusElements.forEach((el) => el.classList.remove("a11y-jimat-container-focus-visible"));

  // Reset text-to-speech
  stopSpeech();
}

// Reset Specific Setting Function
function resetSpecificSetting(setting) {

  if (setting === "font") {
    document.querySelectorAll("*").forEach((element) => {
      element.style.fontSize = "";
      element.style.letterSpacing = "";
      element.style.lineHeight = "";
    });
  }

  if (setting === "contrast") {
    toggleHighContrast(false);
    toggleInvertFilter(false);
  }

  if (setting === "filters") {
    resetAllFilters();
  }

  if (setting === "links") {
    toggleHighlightLinks(false);
  }
}










