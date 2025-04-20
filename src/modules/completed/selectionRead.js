import { setOption, getOption } from "../../util/stateManager.js";

let voices = [];
let isSpeaking = false;
let isSelectionReaderEnabled = false;
let lastSelectedText = "";



let lastSelectedTextforFunc = "";
let isSelecting = false; // Tracks whether a selection is in progress
let isDetecting = false; // Tracks whether detection is enabled
/**
 * Loads the available speech synthesis voices.
 * @returns {Promise<void>}
 */
async function loadVoices() {
    return new Promise((resolve) => {
        voices = window.speechSynthesis.getVoices();
        if (voices.length) {
            resolve();
        } else {
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                resolve();
            };
        }
    });
}

/**
 * Speaks the provided text using SpeechSynthesis.
 * @param {string} text - The text to be spoken.
 */
async function speakSelectedText(text) {
    if (!text || !isSelectionReaderEnabled) return;

    window.speechSynthesis.cancel(); // Stop any previous speech
    isSpeaking = true;
    await loadVoices();

    const detectedLang = detectLanguage(text);
    const selectedVoice = voices.find((voice) => voice.lang.startsWith(detectedLang)) || voices.find((voice) => voice.lang.startsWith("en"));
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
        isSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
}

/**
 * Detects the language of the given text.
 * @param {string} text - The text to analyze.
 * @returns {string} - The detected language code.
 */
function detectLanguage(text) {
    if (/[඀-෿]/.test(text)) return "si";
    if (/[஀-௿]/.test(text)) return "ta";
    if (/[ぁ-んァ-ン一-龥]/.test(text)) return "ja";
    if (/[一-鿿]/.test(text)) return "zh";
    return "en";
}

/**
 * Handles text selection and starts reading the selected text.
 */
function handleSelection() {
    if (!isSelectionReaderEnabled) return;

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (!selectedText) return;

    // Check if the selection is inside an element with the exclusion class
    let isExcluded = false;
    for (let i = 0; i < selection.rangeCount; i++) {
        const range = selection.getRangeAt(i);
        const commonAncestor = range.commonAncestorContainer;
        if (commonAncestor.closest && commonAncestor.closest(".a11y-jimat-container-ignore")) {
            isExcluded = true;
            break;
        }
    }

    if (isExcluded) {
        return;
    }

    if (selectedText !== lastSelectedText) {
        lastSelectedText = selectedText;
        speakSelectedText(selectedText);
    }
}

/**
 * Handles deselection and stops reading the text,
 * excluding deselections inside elements with the "a11y-jimat-container-ignore" class.
 */
function handleDeselection() {
    if (!isSelectionReaderEnabled) return;

    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // If there is no selected text, check if the last selection was inside an excluded element
    if (!selectedText && lastSelectedText) {
        let isExcluded = false;

        for (let i = 0; i < selection.rangeCount; i++) {
            const range = selection.getRangeAt(i);
            const commonAncestor = range.commonAncestorContainer;
            if (commonAncestor.closest && commonAncestor.closest(".a11y-jimat-container-ignore")) {
                isExcluded = true;
                break;
            }
        }

        if (isExcluded) {
            return;
        }

        lastSelectedText = "";
        window.speechSynthesis.cancel();
    }
}

/**
 * Starts the selection-based reading functionality.
 */
function startSelectionReading() {
    if (isSelectionReaderEnabled) return; // Avoid enabling multiple times

    isSelectionReaderEnabled = true;
    setOption("selectionReader", isSelectionReaderEnabled);

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("selectionchange", handleDeselection);

    // Check for already selected text
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        speakSelectedText(selectedText);
    }
}

/**
 * Stops the selection-based reading functionality.
 */
function stopSelectionReading() {
    if (!isSelectionReaderEnabled) return; // Avoid disabling if not enabled

    isSelectionReaderEnabled = false;
    setOption("selectionReader", isSelectionReaderEnabled);

    document.removeEventListener("mouseup", handleSelection);
    document.removeEventListener("selectionchange", handleDeselection);

    // Stop any ongoing speech
    if (isSpeaking) {
        window.speechSynthesis.cancel();
        isSpeaking = false;
    }
}


/**
 * Toggles selection and deselection detection.
 * @param {boolean} enable - If true, enables detection; if false, disables it.
 */
function toggleSelectionDetection(enable) {
    if (enable && !isDetecting) {
        startSelectionReading();
        isDetecting = true;
        document.addEventListener("selectionchange", handleSelectionChange);

        // Check for any existing selection when enabling detection
        const existingSelection = window.getSelection().toString().trim();
        if (existingSelection.length > 0) {
            startSelectionReading();
            lastSelectedTextforFunc = existingSelection;
        }
    } else if (!enable && isDetecting) {
        stopSelectionReading();
        isDetecting = false;
        document.removeEventListener("selectionchange", handleSelectionChange);
    }
}

/**
 * Handles selection and deselection events, ensuring proper logging.
 */
function handleSelectionChange() {
    if (!isDetecting) return; // Stop processing if detection is disabled

    const selectedText = window.getSelection().toString().trim();

    if (selectedText.length > 0 && selectedText !== lastSelectedTextforFunc) {
        // If there's a previous selection, log its deselection
        if (lastSelectedTextforFunc.length > 0) {
        }
        // Log the new selection
        lastSelectedTextforFunc = selectedText;
    } else if (selectedText.length === 0 && lastSelectedTextforFunc.length > 0) {
        // Log deselection when nothing is selected anymore
        lastSelectedTextforFunc = "";
    }
}



// Export the functions
export { startSelectionReading, stopSelectionReading, toggleSelectionDetection };


