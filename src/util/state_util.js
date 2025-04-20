import { enableA11yOption1, disableA11yOption1 } from "../util/state_utils/epilepsy.js";
import { enableA11yOption2, disableA11yOption2 } from "../util/state_utils/adhd.js";
import { enableA11yOption3, disableA11yOption3 } from "../util/state_utils/color_blindness.js";
import { enableA11yOption4, disableA11yOption4 } from "../util/state_utils/blind.js";
import { enableA11yOption5, disableA11yOption5 } from "../util/state_utils/low_vision.js";
import { enableA11yOption6, disableA11yOption6 } from "../util/state_utils/dyslexia.js";
import { enableA11yOption7, disableA11yOption7 } from "../util/state_utils/movement_disorder.js";
import { enableA11yOption8, disableA11yOption8 } from "../util/state_utils/focal_learning_disorder.js";
import { functionActions } from "../util/eventListeners.js";
import { getButtonState } from "./stateManager.js";
// Object to Trigger Features
export const state_actions_enable = {

  // Full page read
  "epilepsy_enable": () => enableA11yOption1(),
  "adhd_enable": () => enableA11yOption2(),
  "color_blindness_enable": () => enableA11yOption3(),
  "blind_enable": () => enableA11yOption4(),
  "low_vision_enable": () => enableA11yOption5(),
  "dyslexia_enable": () => enableA11yOption6(),
  "movement_disorder_enable": () => enableA11yOption7(),
  "focal_learning_disorder_enable": () => enableA11yOption8(),
};

export const state_actions_disable = {

  // Full page read
  "epilepsy_disable": () => disableA11yOption1(),
  "adhd_disable": () => disableA11yOption2(),
  "color_blindness_disable": () => disableA11yOption3(),
  "blind_disable": () => disableA11yOption4(),
  "low_vision_disable": () => disableA11yOption5(),
  "dyslexia_disable": () => disableA11yOption6(),
  "movement_disorder_disable": () => disableA11yOption7(),
  "focal_learning_disorder_disable": () => disableA11yOption8(),
};



// Global Set to store dynamic state keys
const dynamicStateKeysSet = new Set();


function executeBasedOnState(stateKey) {
  // Get the state value
  const stateValue = getButtonState(stateKey);

  // If the value is 0, skip execution
  if (stateValue !== 1) {
    return;
  }

  // Execute based on the provided stateKey
  switch (stateKey) {
    case "a11y-jimat-container-option1":
      dynamicStateKeysSet.add("a11y-jimat-container-saturation-function0"); // Add to Set
      dynamicStateKeysSet.add("a11y-jimat-container-animation-stop-function0"); // Add to Set
      break;

    case "a11y-jimat-container-option2":
      dynamicStateKeysSet.add("a11y-jimat-container-selection-reader-function0"); // Add to Set
      dynamicStateKeysSet.add("a11y-jimat-container-animation-stop-function0"); // Add to Set
      break;

    case "a11y-jimat-container-option3":
      dynamicStateKeysSet.add("a11y-jimat-container-saturation-function0"); // Add to Set
      break;

    case "a11y-jimat-container-option4":
      dynamicStateKeysSet.add("a11y-jimat-container-screan-reader-function0"); // Add to Set
      break;

    case "a11y-jimat-container-option5":
      dynamicStateKeysSet.add("a11y-jimat-container-selection-reader-function0"); // Add to Set
      dynamicStateKeysSet.add("a11y-jimat-container-saturation-function0"); // Add to Set
      dynamicStateKeysSet.add("a11y-jimat-container-font-size-function0"); // Add to Set
      break;

    case "a11y-jimat-container-option6":
      dynamicStateKeysSet.add("a11y-jimat-container-animation-stop-function0"); // Add to Set
      break;

    case "a11y-jimat-container-option7":
      dynamicStateKeysSet.add("a11y-jimat-container-virtual-keyboard-function0"); // Add to Set
      break;

    case "a11y-jimat-container-option8":
      dynamicStateKeysSet.add("a11y-jimat-container-selection-reader-function0"); // Add to Set
      break;

    default:
      break;
  }
}

// Function to execute for predefined 8 state keys
export function executePredefinedStateKeys(removeKey) {
  const predefinedStateKeys = [
    "a11y-jimat-container-option1", "a11y-jimat-container-option2", "a11y-jimat-container-option3", "a11y-jimat-container-option4",
    "a11y-jimat-container-option5", "a11y-jimat-container-option6", "a11y-jimat-container-option7", "a11y-jimat-container-option8"
  ];

  // Map through predefined keys and execute function
  predefinedStateKeys.forEach(stateKey => {
    executeBasedOnState(stateKey);
  });

  if (removeKey && dynamicStateKeysSet.has(removeKey)) {
    dynamicStateKeysSet.delete(removeKey);
  }

  // Call functionActions dynamically for each key in the Set
  dynamicStateKeysSet.forEach(setKey => {
    if (functionActions[setKey]) {
      functionActions[setKey](); // Call the function dynamically
    } else {
    }
  });

  resetDynamicStateKeys();
}

// Function to reset the dynamic Set to an empty state
function resetDynamicStateKeys() {
  dynamicStateKeysSet.clear();
}