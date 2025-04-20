import { setOption, getOption } from "../../util/stateManager.js";
import { injectStyles } from "../../util/styleInjector.js";

let voices = [];
let isSpeaking = false;

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

async function speakText(text) {
    if (!text) return;
    window.speechSynthesis.cancel();
    isSpeaking = true;
    await loadVoices();
    
    const sentences = text.split(/([.?!。！？\n])/).filter(s => s.trim().length > 0);

    for (const sentence of sentences) {
        if (!isSpeaking) return;
        const detectedLang = detectLanguage(sentence);
        const selectedVoice = voices.find((voice) => voice.lang.startsWith(detectedLang)) || voices.find(voice => voice.lang.startsWith("en"));
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
        utterance.rate = 1;
        utterance.pitch = 1;
        window.speechSynthesis.speak(utterance);
    }
}

function detectLanguage(text) {
    if (/[඀-෿]/.test(text)) return "si";
    if (/[஀-௿]/.test(text)) return "ta";
    if (/[ぁ-んァ-ン一-龥]/.test(text)) return "ja";
    if (/[一-鿿]/.test(text)) return "zh";
    return "en";
}

function speakSelectedText() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) speakText(selectedText);
}

function speakWholePage() {
    speakText(document.body.innerText);
}

function stopSpeech() {
    isSpeaking = false;
    window.speechSynthesis.cancel();
}

function toggleTextToSpeech() {

    const textToSpeechEnabled = getOption("textToSpeech") || false;
    setOption("textToSpeech", !textToSpeechEnabled);

    if (!textToSpeechEnabled) {
        speakSelectedText();
    } else {
        window.speechSynthesis.cancel();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadVoices();
});

export { speakSelectedText, speakWholePage, stopSpeech, toggleTextToSpeech };