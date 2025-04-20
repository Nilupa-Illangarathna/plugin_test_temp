

import { actions, resetActions, functionActions } from "../../../util/eventListeners.js";

const accessibilityFeatures = {
    "screen reader": { 
        enable: () => { 
            console.log("Screen Reader Enabled"); 
            functionActions["a11y-jimat-container-screan-reader-function1"]();
        }, 
        disable: () => { 
        } 
    },
    "virtual keyboard": { 
        enable: () => { 
            console.log("Virtual Keyboard Enabled"); 
            functionActions["a11y-jimat-container-virtual-keyboard-function1"]();
        }, 
        disable: () => { 
            console.log("Virtual Keyboard Disabled"); 
            functionActions["a11y-jimat-container-virtual-keyboard-function0"]();
        } 
    },
    "keyboard highlight": { 
        enable: () => { 
            console.log("Keyboard Highlight Enabled"); 
            functionActions["a11y-jimat-container-keyboard-highlights-function1"]();
        }, 
        disable: () => { 
            console.log("Keyboard Highlight Disabled");
            functionActions["a11y-jimat-container-keyboard-highlights-function0"]();
        } 
    },
    "link underline": { 
        enable: () => { 
            console.log("Link Underline Enabled"); 
            functionActions["a11y-jimat-container-link-underline-function1"]();
        }, 
        disable: () => { 
            console.log("Link Underline Disabled"); 
            functionActions["a11y-jimat-container-link-underline-function0"]();
        } 
    },
    "link highlight": { 
        enable: () => { 
            console.log("Link Highlights Enabled"); 
            functionActions["a11y-jimat-container-link-highlight-function1"]();
        }, 
        disable: () => { 
            console.log("Link Highlights Disabled"); 
            functionActions["a11y-jimat-container-link-highlight-function0"]();
        } 
    }
};



function processFeatureCommand(command) {
    let words = command.split(" ");
    let action = words[0].toLowerCase();
    let featureName = words.slice(1).join(" ").trim().toLowerCase(); 

    switch (action) {
        case "enable":
            if (accessibilityFeatures[featureName] && accessibilityFeatures[featureName].enable) {
                console.log(`Enabling: ${featureName}`);
                accessibilityFeatures[featureName].enable(); 
            } else {
                console.log(`Unknown feature: ${featureName}`);
            }
            break;

        case "disable":
            if (accessibilityFeatures[featureName] && accessibilityFeatures[featureName].disable) {
                console.log(`Disabling: ${featureName}`);
                accessibilityFeatures[featureName].disable(); 
            } else {
                console.log(`Unknown feature: ${featureName}`);
            }
            break;

        default:
            console.log(`Invalid command: ${command}`);
    }
}

export { processFeatureCommand };
