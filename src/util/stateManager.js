const STATE_KEY = "accessibilityPluginState";

let state = {
  options: {
    fontSize: 16,
    textSpace: 2,
    lineSpace: 1.5,
    highContrast: false,
    invert: false,
    saturation: false,
    blackAndWhite: false,
    hideImage: false,
    focusIndicator: true,
    textToSpeech: false,
    font: false,
    alignment: false,
    linkHighlight: false,
    cursor: false,
    tooltip: false,
    animations: true,
  },
  buttonStates: { // Added structure for two-state buttons
    "a11y-jimat-container-option1": 0,
    "a11y-jimat-container-option2": 0,
    "a11y-jimat-container-option3": 0,
    "a11y-jimat-container-option4": 0,
    "a11y-jimat-container-option5": 0,
    "a11y-jimat-container-option6": 0,
    "a11y-jimat-container-option7": 0,
    "a11y-jimat-container-option8": 0,
    "a11y-jimat-container-screen-reader-btn":  0, //a11y-jimat-container-screen-reader
    "a11y-jimat-container-text-reader-btn":         0, //a11y-jimat-container-text-reader
    "a11y-jimat-container-virtual-keyboard-btn":    0, //a11y-jimat-container-virtual-keyboard
    "a11y-jimat-container-keyboard-highlight-btn":  0,//a11y-jimat-container-keyboard-highlight-btn
    "a11y-jimat-container-voice-control-btn":       0, //a11y-jimat-container-voice-control-btn
    "a11y-jimat-container-saturation-control": 0, //0, 1, 2, 3 a11y-jimat-container-saturation-control
    "a11y-jimat-container-increase-font":      0, // 0, 1, 2, 3, 4 a11y-jimat-container-increase-font
    "a11y-jimat-container-link-underline-btn": 0, //a11y-jimat-container-link-underline-btn
    "a11y-jimat-container-stop-animation-btn": 0, //a11y-jimat-container-stop-animation-btn
    "a11y-jimat-container-link-highlight-btn": 0, //a11y-jimat-container-link-highlight-btn
  
  },
  originalStyles: new Map(),
};

const loadState = () => {
  const savedState = localStorage.getItem(STATE_KEY);
  if (savedState) {
    state = JSON.parse(savedState);
    state.originalStyles = new Map(state.originalStyles);
  }
};

const saveState = () => {
  const stateToSave = {
    ...state,
    originalStyles: Array.from(state.originalStyles.entries()), // Convert Map to Array for storage
  };
  localStorage.setItem(STATE_KEY, JSON.stringify(stateToSave));
};

const setOption = (key, value) => {
  state.options[key] = value;
  saveState();
};

const getOption = (key) => state.options[key];
const getOptions = () => state.options;
const getOriginalStyles = () => state.originalStyles;
const setOriginalStyles = (newStyles) => {
  state.originalStyles = newStyles;
  saveState();
};


// const getButtonState = (buttonKey) => {
//   return state.buttonStates[buttonKey] || 0;
// };

const getButtonState = (buttonKey) => {
  try {
    let savedState = JSON.parse(localStorage.getItem(STATE_KEY));

    // If nothing is saved or buttonStates is missing, initialize and save default
    if (!savedState || !savedState.buttonStates) {
      console.warn("🔁 Initializing default state in localStorage...");

      // Create fresh default
      saveState();
      savedState = JSON.parse(localStorage.getItem(STATE_KEY));
    }

    // Return the specific button key's value
    if (savedState.buttonStates.hasOwnProperty(buttonKey)) {
      return savedState.buttonStates[buttonKey];
    } else {
      console.warn(`⚠️ Key "${buttonKey}" not found in buttonStates.`);
    }
  } catch (e) {
    console.error("❌ Failed to read or parse localStorage state:", e);
  }

  return 0; // fallback default
};

const resetAllButtonStatesToZero = () => {
  Object.keys(state.buttonStates).forEach(key => {
    state.buttonStates[key] = 0;
  });

  saveState();
  console.log("🧹 All buttonStates reset to 0 and saved.");
};


const resetBatchSettingsStates = () => {
  const specificKeys = [
    "a11y-jimat-container-option1", "a11y-jimat-container-option2", "a11y-jimat-container-option3", "a11y-jimat-container-option4",
    "a11y-jimat-container-option5", "a11y-jimat-container-option6", "a11y-jimat-container-option7", "a11y-jimat-container-option8"
  ];
  specificKeys.forEach(key => {
    if (state.buttonStates.hasOwnProperty(key)) {
      state.buttonStates[key] = 0;
    }
  });
  saveState();
};

const resetAllButtonStates = () => {
  Object.keys(state.buttonStates).forEach(key => state.buttonStates[key] = 0);
  saveState();
};

const resetAllButtonStatesExcept = (excludeKey) => {
  Object.keys(state.buttonStates).forEach(key => {
    if (key !== excludeKey) {
      state.buttonStates[key] = 0;
    }
  });
  saveState();
};


const setMultipleButtonStates = (buttonStatePairs) => {
  // Load saved state from localStorage
  const savedState = JSON.parse(localStorage.getItem(STATE_KEY));

  if (savedState && savedState.buttonStates) {
    // Update our in-memory state to match savedState before applying changes
    Object.keys(state.buttonStates).forEach(key => {
      if (savedState.buttonStates.hasOwnProperty(key)) {
        state.buttonStates[key] = savedState.buttonStates[key];
      }
    });
  }

  // Apply only the new values
  buttonStatePairs.forEach(([key, value]) => {
    if (state.buttonStates.hasOwnProperty(key)) {
      state.buttonStates[key] = value;
    }
  });

  // Save and print the updated snapshot
  saveState();
  printAllButtonStates();
};



// const printAllButtonStates = () => {
//   Object.entries(state.buttonStates).forEach(([key, value]) => {
//   });
// };
const printAllButtonStates = () => {
  const savedState = JSON.parse(localStorage.getItem(STATE_KEY));
  
  if (!savedState || !savedState.buttonStates) {
    console.warn("⚠️ No saved buttonStates in localStorage.");
    return;
  }

  const entries = Object.entries(savedState.buttonStates)
    .map(([key, value]) => `${key} - ${value}`)
    .join(', ');

  console.log(`🧠 Button States (from localStorage): ${entries}`);
};



export {
  loadState,
  saveState,
  setOption,
  getOption,
  getOptions,
  getOriginalStyles,
  setOriginalStyles,
  setMultipleButtonStates,
  getButtonState,
  resetAllButtonStates,
  resetBatchSettingsStates,
  printAllButtonStates,
  resetAllButtonStatesExcept,
  resetAllButtonStatesToZero
};