import { highlightSearch, findNext, findPrevious, clearHighlights } from "./voice_commands_core_utils/searchHighlightController.js";
import { focusFirstInput, focusNextInput, focusPreviousInput, typeInFocusedInput } from "./voice_commands_core_utils/focusInputController.js";
import { copyPageText, copySelectedText, pasteClipboardText } from "./voice_commands_core_utils/clipboardController.js";
import { processFeatureCommand } from "./voice_commands_core_utils/accessibilityFeatureController.js";
import { actions, resetActions, functionActions } from "../../util/eventListeners.js";
import Fuse from 'fuse.js';


let recognition = null;
let isVoiceEnabled = false;

function normalizeText(text) {
    return text.replace(/[^\wぁ-んァ-ンー一-龥]/g, '').trim();
}

function similarity(str1, str2) {
    let matches = 0;
    const minLen = Math.min(str1.length, str2.length);
    for (let i = 0; i < minLen; i++) {
        if (str1[i] === str2[i]) matches++;
    }
    return matches / Math.max(str1.length, str2.length);
}

let fuse = null;

function initializeFuse(commands) {
    fuse = new Fuse(commands, {
        includeScore: true,
        threshold: 0.4,
        distance: 100,
        ignoreLocation: true,
        isCaseSensitive: false,
    });
}

function matchCommand(input, commands) {
    if (!fuse) initializeFuse(commands);
    const results = fuse.search(input);
    return results.length > 0 ? results[0].item : null;
}


const COMMAND_MAP = {
    // Enable Screen Reader
    "スクリーンリーダーを有効にしたいです": () => functionActions["a11y-jimat-container-screan-reader-function1"](),

    // Enable Virtual Keyboard
    "仮想キーボードを表示してください": () => functionActions["a11y-jimat-container-virtual-keyboard-function1"](),
    // Disable Virtual Keyboard
    "仮想キーボードを非表示にしてください": () => functionActions["a11y-jimat-container-virtual-keyboard-function0"](),

    // Enable Keyboard Highlight
    "キーボードのキーを強調表示したいです": () => functionActions["a11y-jimat-container-keyboard-highlights-function1"](),
    // Disable Keyboard Highlight
    "キーボード操作ハイライトを停止してください": () => functionActions["a11y-jimat-container-keyboard-highlights-function0"](),

    // Enable Link Highlight
    "リンクを目立たせる表示をしたいです": () => functionActions["a11y-jimat-container-link-highlight-function1"](),
    // Disable Link Highlight
    "リンクの強調表示を止めてください": () => functionActions["a11y-jimat-container-link-highlight-function0"](),

    // Enable Selection Reader
    "選択したテキストを読み上げてください": () => functionActions["a11y-jimat-container-selection-reader-function1"](),

    // Set Saturation Low
    "画面の彩度を下げたいです": () => functionActions["a11y-jimat-container-saturation-function1"](),
    // Set Saturation None (Grayscale)
    "画面を白黒にしてください": () => functionActions["a11y-jimat-container-saturation-function3"](),
    // Reset Saturation
    "彩度の設定を元に戻してください": () => functionActions["a11y-jimat-container-saturation-function0"](),

    // Reset Font Size
    "文字サイズを元に戻してください": () => functionActions["a11y-jimat-container-font-size-function0"](),
    // Increase Font Size
    "文字を大きく表示したいです": () => functionActions["a11y-jimat-container-font-size-function2"](),

    // Enable Animations
    "画面のアニメーションを再生してください": () => functionActions["a11y-jimat-container-animation-stop-function0"](),
    // Disable Animations
    "アニメーションや動画を止めてください": () => functionActions["a11y-jimat-container-animation-stop-function1"](),

    // Scroll Up
    "上にスクロール": () => window.scrollBy({ top: -200, behavior: "smooth" }),
    // Scroll Down
    "下にスクロール": () => window.scrollBy({ top: 200, behavior: "smooth" }),

    // Copy Selected Text
    "選択中のテキストをコピーしてください": () => copySelectedText(),
    // Paste from Clipboard
    "コピーしたものを貼り付けてください": () => pasteClipboardText(),

    // Zoom In
    "画面を拡大したいです": () => document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) + 0.1).toString(),
    // Zoom Out
    "画面を縮小してください": () => document.body.style.zoom = (parseFloat(document.body.style.zoom || 1) - 0.1).toString(),
};



function executeVoiceCommand(command) {

    const normalized = normalizeText(command);
    const matched = matchCommand(normalized, Object.keys(COMMAND_MAP));

    if (matched) {
        COMMAND_MAP[matched]();
    } else if (normalized.includes("検索したいです")) {
        const query = normalized.replace("検索したいです", "").trim();
        highlightSearch(query);
    } else {
    }
}

function restartRecognition() {
    if (isVoiceEnabled) {
        recognition.stop();
        setTimeout(() => recognition.start(), 500);
    }
}

function enableVoiceCommands() {
    if (!("webkitSpeechRecognition" in window)) {
        console.error("Your browser does not support Speech Recognition.");
        return;
    }

    if (isVoiceEnabled) return;

    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "ja-JP";

    recognition.onresult = (event) => {
        const rawCommand = event.results[event.results.length - 1][0].transcript.trim();
        const cleaned = normalizeText(rawCommand);
        executeVoiceCommand(cleaned);
    };

    recognition.onerror = (event) => {
        restartRecognition();
    };

    recognition.onend = () => {
        restartRecognition();
    };

    recognition.start();
    isVoiceEnabled = true;
    focusFirstInput();
}

function disableVoiceCommands() {
    if (recognition) {
        recognition.stop();
        recognition = null;
        isVoiceEnabled = false;
    }
}

export { enableVoiceCommands, disableVoiceCommands };