import { setButtonState, getButtonState, resetAllButtonStates, setMultipleButtonStates, resetBatchSettingsStates, printAllButtonStates, saveState }  from "../stateManager.js";
import { actions, resetActions, functionActions } from "../../util/eventListeners.js";
import { state_actions_enable, state_actions_disable } from "../../util/state_util.js";
import { enableAnimations, disableAnimations, toggleAnimations, getOption } from "../../modules/completed/stopAnimation.js";
import { startKeyboard, stopKeyboard } from '../../modules/completed/virtualKeyboard.js';
import { enableVoiceCommands, disableVoiceCommands } from "../../modules/completed/voiceCommands.js";


// GLOBAL //
function toggleElementSelection(actionKey) {
    functionActions[actionKey]();
}


// Screan read
function setScreenReaderState(stateValue = null) {
    const button = document.getElementById("a11y-jimat-container-screen-reader-btn");

    if (!button) return;

    // Read current state or use provided state
    let currentState = stateValue !== null ? stateValue : getButtonState("a11y-jimat-container-screen-reader-btn");

    // Determine the next state only if stateValue is not manually set
    let nextState = stateValue !== null ? stateValue : (currentState === 0 ? 1 : 0);

    if (nextState === 1) {
        // Activate Screen Reader
        button.classList.add("selected");

        setMultipleButtonStates([["a11y-jimat-container-screen-reader-btn", 1]]);
        toggleElementSelection("a11y-jimat-container-selection-reader-function0");

        let textReaderBtn = document.getElementById('a11y-jimat-container-text-reader-btn');
        if (textReaderBtn) {
            let rectElement = textReaderBtn.querySelector("rect");
            let pathElement = textReaderBtn.querySelector("path");
            rectElement?.setAttribute("fill", "#190DED"); // Default Blue
            pathElement?.setAttribute("fill", "white"); // White
        }

        actions["a11y-jimat-container-text-to-speech"]();

        // Inject checkmark icon
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (!existingSvg) {
            const checkmarkContainer = document.createElement("span");
            checkmarkContainer.classList.add("checkmark-icon-container");
            checkmarkContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"></path>
                </svg>
            `;
            button.appendChild(checkmarkContainer);
        }
    } else {
        // Deactivate Screen Reader
        button.classList.remove("selected");

        setMultipleButtonStates([["a11y-jimat-container-screen-reader-btn", 0]]);
        resetActions["a11y-jimat-container-reset-text-to-speech"]();


        // Remove checkmark icon
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (existingSvg) existingSvg.remove();
    }

    // Save state
    saveState();
}


function setTextSelectionReaderState(stateValue = null) {
    const button = document.getElementById("a11y-jimat-container-text-reader-btn");

    if (!button) return;

    // Read current state or use provided state
    let currentState = stateValue !== null ? stateValue : getButtonState("a11y-jimat-container-text-reader-btn");

    // Determine the next state only if stateValue is not manually set
    let nextState = stateValue !== null ? stateValue : (currentState === 0 ? 1 : 0);

    // Get the SVG elements inside the button
    let rectElement = button.querySelector("rect");
    let pathElement = button.querySelector("path");

    if (nextState === 1) {
        // Activate Text Selection Reader
        button.classList.add("selected");

        setMultipleButtonStates([["a11y-jimat-container-text-reader-btn", 1]]);
        toggleElementSelection("a11y-jimat-container-screan-reader-function0");

        if (rectElement) rectElement.setAttribute("fill", "#FFFFFF"); // White
        if (pathElement) pathElement.setAttribute("fill", "#190DED"); // Default Blue

        actions["a11y-jimat-container-text-selection-reader"]();


        // Inject checkmark icon
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (!existingSvg) {
            const checkmarkContainer = document.createElement("span");
            checkmarkContainer.classList.add("checkmark-icon-container");
            checkmarkContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"></path>
                </svg>
            `;
            button.appendChild(checkmarkContainer);
        }
    } else {
        // Deactivate Text Selection Reader
        button.classList.remove("selected");

        setMultipleButtonStates([["a11y-jimat-container-text-reader-btn", 0]]);
        resetActions["a11y-jimat-container-reset-text-selection-reader"]();

        if (rectElement) rectElement.setAttribute("fill", "#190DED"); // Default Blue
        if (pathElement) pathElement.setAttribute("fill", "white"); // White


        // Remove checkmark icon
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (existingSvg) existingSvg.remove();
    }

    // Save state
    saveState();
}


// Saturation 
function setSaturationState(stateValue = null) {

    const bars = document.querySelectorAll("#a11y-jimat-container-saturation-control .progress-bar");
    const mainHeading = document.querySelector("#a11y-jimat-container-saturation-control .position-word span");
    const subHeading = document.querySelector("#a11y-jimat-container-saturation-control .sub-heading");
    const progressContainer = document.querySelector("#a11y-jimat-container-saturation-control .progress-bar-container");
    const fontControl = document.getElementById("a11y-jimat-container-saturation-control");

    const words = ["（低）", "（中）", "（白黒）"];

    // Read the current state or use provided value
    let currentState = stateValue !== null ? stateValue : getButtonState("a11y-jimat-container-saturation-control");

    // Determine the next state only if stateValue is not manually set
    let nextState = stateValue !== null ? stateValue : (currentState + 1) % 4;

    // Remove existing checkmark
    const existingCheckmark = fontControl.querySelector(".checkmark-icon-container");
    if (existingCheckmark) existingCheckmark.remove();

    if (nextState === 0) {
        // Reset state
        bars.forEach((bar) => bar.classList.remove("filled"));
        mainHeading.textContent = "色の彩度";
        progressContainer.style.display = "none";
        if (subHeading) subHeading.style.display = "block";

        fontControl.classList.remove("selected");
        setMultipleButtonStates([["a11y-jimat-container-saturation-control", 0]]);
        resetActions["a11y-jimat-container-reset-saturation-control"]();
        fontControl.classList.remove("active", "selected", "clicked");

    } else {
        // Update UI for the current state
        progressContainer.style.display = "flex";
        if (subHeading) subHeading.style.display = "none";

        // Update the progress bars
        bars.forEach((bar, index) => {
            bar.classList.toggle("filled", index < nextState);
        });

        // Update text
        mainHeading.textContent = "彩度の調整 " + words[nextState - 1];

        // Apply effects based on state
        if (nextState === 1) {
            setMultipleButtonStates([["a11y-jimat-container-saturation-control", 1]]);
            actions["a11y-jimat-container-saturation-control-low"]();
        } else if (nextState === 2) {
            setMultipleButtonStates([["a11y-jimat-container-saturation-control", 2]]);
            actions["a11y-jimat-container-saturation-control-high"]();
        } else if (nextState === 3) {
            setMultipleButtonStates([["a11y-jimat-container-saturation-control", 3]]);
            actions["a11y-jimat-container-saturation-control-bw"]();
        }

        // Inject checkmark icon
        const checkmarkContainer = document.createElement("span");
        checkmarkContainer.classList.add("checkmark-icon-container");
        checkmarkContainer.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"></path>
            </svg>
        `;
        fontControl.appendChild(checkmarkContainer);

        const btn = document.getElementById("a11y-jimat-container-saturation-control");
        btn.classList.add("clicked");
    }

    // Save the new state
    saveState();
}

//  Font Size
function setFontSizeState(stateValue = null) {
    const bars = document.querySelectorAll("#a11y-jimat-container-increase-font .progress-bar");
    const mainHeading = document.querySelector("#a11y-jimat-container-increase-font .position-word span");
    const subHeading = document.querySelector("#a11y-jimat-container-increase-font .sub-heading");
    const progressContainer = document.querySelector("#a11y-jimat-container-increase-font .progress-bar-container");
    const button = document.getElementById("a11y-jimat-container-increase-font");

    const words = ["①", "②", "③", "④"];
    const maxSize = 4;
    const increment = 0.05;
    const exclusionClass = "a11y-jimat-container-ignore";

    const nextState = stateValue !== null
        ? stateValue
        : (getButtonState("a11y-jimat-container-increase-font") + 1) % (maxSize + 1);

    const elements = document.querySelectorAll(`body *:not(script):not(style):not(.${exclusionClass}):not(.${exclusionClass} *)`);

    console.group(`🟦 Font Size Scaling: State Level ${nextState}`);
    elements.forEach(el => {
        const tag = el.tagName;
        const id = el.id ? `#${el.id}` : "";
        const classes = el.className ? `.${el.className.toString().replace(/\s+/g, ".")}` : "";
        const descriptor = `${tag}${id}${classes}`;

        const computedSize = parseFloat(window.getComputedStyle(el).fontSize);
        const originalAttr = el.getAttribute("data-original-font-size");

        if (!originalAttr) {
            el.setAttribute("data-original-font-size", computedSize);
        }

        const originalSize = parseFloat(el.getAttribute("data-original-font-size"));

        if (!isNaN(originalSize)) {
            if (nextState === 0) {
                el.style.fontSize = "";
                console.log(`🔁 Reset: ${descriptor} → Original=${originalSize}px | Computed=${computedSize}px → style.fontSize = ""`);
            } else {
                const newSize = originalSize * (1 + increment * nextState);
                el.style.fontSize = `${newSize}px`;
                console.log(`📏 Scaled: ${descriptor} → Original=${originalSize}px | Computed=${computedSize}px → New=${newSize.toFixed(2)}px`);
            }
        }
    });
    console.groupEnd();

    // UI updates
    bars.forEach((bar, index) => bar.classList.toggle("filled", index < nextState));
    if (mainHeading) mainHeading.textContent = nextState === 0 ? "文字の拡大" : `文字の拡大 ${words[nextState - 1]}`;
    if (progressContainer) progressContainer.style.display = nextState === 0 ? "none" : "flex";
    if (subHeading) subHeading.style.display = nextState === 0 ? "block" : "none";

    if (button) {
        button.classList.toggle("selected", nextState !== 0);
        button.classList.toggle("clicked", nextState !== 0);

        const existing = button.querySelector(".checkmark-icon-container");
        if (existing) existing.remove();

        if (nextState !== 0) {
            const checkmarkContainer = document.createElement("span");
            checkmarkContainer.classList.add("checkmark-icon-container");
            checkmarkContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"></path>
                </svg>
            `;
            button.appendChild(checkmarkContainer);
        }
    }

    setMultipleButtonStates([["a11y-jimat-container-increase-font", nextState]]);
    saveState();
}




function setLinkUnderlineState(stateValue = null) {

    const button = document.getElementById("a11y-jimat-container-link-underline-btn");
    if (!button) return;

    // Read current state or use provided state
    let currentState = stateValue !== null ? stateValue : getButtonState("a11y-jimat-container-link-underline-btn");

    // Determine the next state only if stateValue is not manually set
    let nextState = stateValue !== null ? stateValue : (currentState === 0 ? 1 : 0);

    let rectElement = button.querySelector("rect");
    let pathElement = button.querySelector("path");
    let svg = button.querySelector("svg");

    if (nextState === 1) {
        // Activate Link Underline
        button.classList.add("selected");

        setMultipleButtonStates([["a11y-jimat-container-link-underline-btn", 1]]);

        if (rectElement) rectElement.setAttribute("fill", "#190DED"); // Default Blue
        if (pathElement) pathElement.setAttribute("fill", "#190DED"); // Default Blue

        actions["a11y-jimat-container-link-underline"]();

        // Inject checkmark icon when active
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (!existingSvg) {
            const checkmarkContainer = document.createElement("span");
            checkmarkContainer.classList.add("checkmark-icon-container");
            checkmarkContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"></path>
                </svg>
            `;
            button.appendChild(checkmarkContainer);
        }
    } else {
        // Deactivate Link Underline
        button.classList.remove("selected");

        setMultipleButtonStates([["a11y-jimat-container-link-underline-btn", 0]]);
        resetActions["a11y-jimat-container-reset-link-underline"]();

        if (rectElement) rectElement.setAttribute("fill", "#190DED"); // Default Blue
        if (pathElement) pathElement.setAttribute("fill", "#190DED"); // Default Blue
    

        // Remove checkmark icon
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (existingSvg) existingSvg.remove();
    }

    // Update SVG fill color based on selection
    if (svg) {
        let svgPath = svg.querySelector("path");
        if (svgPath) {
            svgPath.setAttribute("fill", button.classList.contains("selected") ? "white" : "#190DED");
        }
    }

    // Save state
    saveState();
}


function setLinkHighlightState(stateValue = null) {

    const button = document.getElementById("a11y-jimat-container-link-highlight-btn");
    if (!button) return;

    // Read current state or use provided state
    let currentState = stateValue !== null ? stateValue : getButtonState("a11y-jimat-container-link-highlight-btn");

    // Determine the next state only if stateValue is not manually set
    let nextState = stateValue !== null ? stateValue : (currentState === 0 ? 1 : 0);

    let svg = button.querySelector("svg");

    if (nextState === 1) {
        // Activate Link Highlight
        button.classList.add("selected");

        setMultipleButtonStates([["a11y-jimat-container-link-highlight-btn", 1]]);
        actions["a11y-jimat-container-link-highlight"]();

        // Inject checkmark icon when active
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (!existingSvg) {
            const checkmarkContainer = document.createElement("span");
            checkmarkContainer.classList.add("checkmark-icon-container");
            checkmarkContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"></path>
                </svg>
            `;
            button.appendChild(checkmarkContainer);
        }
        
        let link_highlight_buttonrectElement = button.querySelector("rect");
        let link_highlight_buttonpathElement = button.querySelector("path");

        if (link_highlight_buttonrectElement) link_highlight_buttonrectElement.setAttribute("fill", "#190DED"); // Default Blue
        if (link_highlight_buttonpathElement) link_highlight_buttonpathElement.setAttribute("fill", "#190DED"); // Default Blue

    } else {
        // Deactivate Link Highlight
        button.classList.remove("selected");

        setMultipleButtonStates([["a11y-jimat-container-link-highlight-btn", 0]]);
        resetActions["a11y-jimat-container-reset-link-highlight"]();

        let link_highlight_buttonrectElement = button.querySelector("rect");
        let link_highlight_buttonpathElement = button.querySelector("path");

        if (link_highlight_buttonrectElement) link_highlight_buttonrectElement.setAttribute("fill", "#190DED"); // Default Blue
        if (link_highlight_buttonpathElement) link_highlight_buttonpathElement.setAttribute("fill", "#190DED"); // Default Blue

        // Remove checkmark icon
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (existingSvg) existingSvg.remove();
    }

    // Update SVG fill color based on selection
    if (svg) {
        let svgPath = svg.querySelector("path");
        if (svgPath) {
            svgPath.setAttribute("fill", button.classList.contains("selected") ? "white" : "#190DED");
        }
    }

    // Save state
    saveState();
}


function setAnimationState(stateValue = null) {
  
    const button = document.getElementById("a11y-jimat-container-stop-animation-btn");
    if (!button) return;
  
    // Read current state or use provided state
    let currentState = stateValue !== null ? stateValue : getButtonState("a11y-jimat-container-stop-animation-btn");
  
    // Determine the next state only if stateValue is not manually set
    let nextState = stateValue !== null ? stateValue : (currentState === 0 ? 1 : 0);
  
    let circleElement = button.querySelector("circle");
    let rectElements = button.querySelectorAll("rect");
  
    if (nextState === 1) {
        // Disable Animations
        button.classList.add("selected");
  
        if (circleElement) circleElement.setAttribute("fill", "#FFFFFF"); // White
        rectElements.forEach(rect => rect.setAttribute("fill", "#190DED")); // Default Blue
  
        disableAnimations(); // Call function to disable animations
        setMultipleButtonStates([["a11y-jimat-container-stop-animation-btn", 1]]);
  
        // Inject checkmark icon when active
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (!existingSvg) {
            const checkmarkContainer = document.createElement("span");
            checkmarkContainer.classList.add("checkmark-icon-container");
            checkmarkContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"></path>
                </svg>
            `;
            button.appendChild(checkmarkContainer);
        }
    } else {
        // Enable Animations
        button.classList.remove("selected");
  
        if (circleElement) circleElement.setAttribute("fill", "#190DED"); // Default Blue
        rectElements.forEach(rect => rect.setAttribute("fill", "white")); // White
  
        enableAnimations(); // Call function to enable animations
        setMultipleButtonStates([["a11y-jimat-container-stop-animation-btn", 0]]);
  
        // Remove checkmark icon
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (existingSvg) existingSvg.remove();
    }
  
    // Save state
    saveState();
  }
  
  
  function setKeyboardHighlightState(stateValue = null) {
    printAllButtonStates();
  
    const button = document.getElementById("a11y-jimat-container-keyboard-highlight-btn");
    if (!button) return;
  
    // Read current state or use provided state
    let currentState = stateValue !== null ? stateValue : getButtonState("a11y-jimat-container-keyboard-highlight-btn");
  
    // Determine the next state only if stateValue is not manually set
    let nextState = stateValue !== null ? stateValue : (currentState === 0 ? 1 : 0);
  
    let svg = button.querySelector("svg");
  
    if (nextState === 1) {
        // Activate Keyboard Highlight
        button.classList.add("selected");
  
        setMultipleButtonStates([["a11y-jimat-container-keyboard-highlight-btn", 1]]);
        actions["a11y-jimat-container-enable-keybaord-operation-highlights"]();
  
        if (svg) {
            let svgPath = svg.querySelector("path");
            if (svgPath) {
                svgPath.setAttribute("fill", "white");
            }
        }
  
        // Inject checkmark icon when active
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (!existingSvg) {
            const checkmarkContainer = document.createElement("span");
            checkmarkContainer.classList.add("checkmark-icon-container");
            checkmarkContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"></path>
                </svg>
            `;
            button.appendChild(checkmarkContainer);
        }
    } else {
        // Deactivate Keyboard Highlight
        button.classList.remove("selected");
  
        setMultipleButtonStates([["a11y-jimat-container-keyboard-highlight-btn", 0]]);
        resetActions["a11y-jimat-container-reset-enable-keybaord-operation-highlights"]();
  
        if (svg) {
            let svgPath = svg.querySelector("path");
            if (svgPath) {
                svgPath.setAttribute("fill", "#190DED");
            }
        }
  
        // Remove checkmark icon
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (existingSvg) existingSvg.remove();
    }
  
    printAllButtonStates();
    // Save state
    saveState();
  }
  
  
  function setVoiceControlState(stateValue = null) {
  
    const button = document.getElementById("a11y-jimat-container-voice-control-btn");
    if (!button) return;
  
    // Read current state or use provided state
    let currentState = stateValue !== null ? stateValue : getButtonState("a11y-jimat-container-voice-control-btn");
  
    // Determine the next state only if stateValue is not manually set
    let nextState = stateValue !== null ? stateValue : (currentState === 0 ? 1 : 0);
  
    let svg = button.querySelector("svg");
  
    if (nextState === 1) {
        // Activate Voice Control
        button.classList.add("selected");
  
        setMultipleButtonStates([["a11y-jimat-container-voice-control-btn", 1]]);
        enableVoiceCommands();
  
        if (svg) {
            let svgPath = svg.querySelector("path");
            if (svgPath) {
                svgPath.setAttribute("fill", "white");
            }
        }
  
        // Inject checkmark icon when active
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (!existingSvg) {
            const checkmarkContainer = document.createElement("span");
            checkmarkContainer.classList.add("checkmark-icon-container");
            checkmarkContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"></path>
                </svg>
            `;
            button.appendChild(checkmarkContainer);
        }
    } else {
        // Deactivate Voice Control
        button.classList.remove("selected");
  
        setMultipleButtonStates([["a11y-jimat-container-voice-control-btn", 0]]);
        disableVoiceCommands();
  
        if (svg) {
            let svgPath = svg.querySelector("path");
            if (svgPath) {
                svgPath.setAttribute("fill", "#190DED");
            }
        }
  
        // Remove checkmark icon
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (existingSvg) existingSvg.remove();
    }
  
    // Save state
    saveState();
  }
  
  function setVirtualKeyboardState(stateValue = null) {
  
    const button = document.getElementById("a11y-jimat-container-virtual-keyboard-btn");
    if (!button) return;
  
    // Read current state or use provided state
    let currentState = stateValue !== null ? stateValue : getButtonState("a11y-jimat-container-virtual-keyboard-btn");
  
    // Determine the next state only if stateValue is not manually set
    let nextState = stateValue !== null ? stateValue : (currentState === 0 ? 1 : 0);
  
    let svg = button.querySelector("svg");
  
    if (nextState === 1) {
        // Activate Virtual Keyboard
        button.classList.add("selected");
  
        setMultipleButtonStates([["a11y-jimat-container-virtual-keyboard-btn", 1]]);
        startKeyboard();
  
        // Inject checkmark icon when active
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (!existingSvg) {
            const checkmarkContainer = document.createElement("span");
            checkmarkContainer.classList.add("checkmark-icon-container");
            checkmarkContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"></path>
                </svg>
            `;
            button.appendChild(checkmarkContainer);
        }
    } else {
        // Deactivate Virtual Keyboard
        button.classList.remove("selected");
  
        setMultipleButtonStates([["a11y-jimat-container-virtual-keyboard-btn", 0]]);
        stopKeyboard();
  
        // Remove checkmark icon
        let existingSvg = button.querySelector(".checkmark-icon-container");
        if (existingSvg) existingSvg.remove();
    }
  
    // Save state
    saveState();
  }

// Export the function at the end
export { 
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
};
