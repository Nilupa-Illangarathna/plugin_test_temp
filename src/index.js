import {
  loadState,
  saveState,
  setOption,
  getOption,
  setOriginalStyles,
  getOriginalStyles,
} from "./util/stateManager.js";
import { initializePlugin , createControlPanel } from "./util/controlPanel.js";
import { setupEventListeners } from "./util/eventListeners.js";
import { injectStyles } from "./util/styleInjector.js";
import { reset } from "./util/reset.js";
import { injectedStyles } from "./util/styles.js";



// Pass dynamic values from index.js
const SERVER_URL = __SERVER_URL__;
const API_KEY = __API_KEY__;

initializePlugin(SERVER_URL, API_KEY);

class AccessibilityPlugin {
  constructor(options = {}) {
    if (!(this instanceof AccessibilityPlugin)) {
      throw new Error('AccessibilityPlugin must be called with new');
    }

    loadState();

    // Apply custom options provided on initialization
    this.options = { ...getOption(), ...options };
    this.originalStyles = getOriginalStyles();

    this.init();
  }

  init() {
    createControlPanel();
    injectStyles(injectedStyles);
    setupEventListeners();
  }

  reset() {
    setOriginalStyles(new Map());
    saveState();
  }
}

// Make sure it's available in all environments
if (typeof window !== 'undefined') {
  window.AccessibilityPlugin = AccessibilityPlugin;
}

export default AccessibilityPlugin;