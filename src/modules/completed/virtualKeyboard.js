import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

// Global variables
let keyboardInstance;
let modalElement;
let isKeyboardEnabled = false;
let activeInput = null;
let offsetX = 0;
let offsetY = 0;
let preventImmediateClose = false;
let capsLockActive = false;
let currentLayout = "default";

// Universal init to cover early/late script loading
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initKeyboardPlugin);
} else {
  initKeyboardPlugin();
}

// Entry point
function initKeyboardPlugin() {
  createKeyboardModal();
  attachInputFocusListeners();
  document.getElementById("openKeyboardButton")?.addEventListener("click", startKeyboard);
  document.getElementById("closeKeyboardButton")?.addEventListener("click", stopKeyboard);
}

// External control
function startKeyboard() {
  isKeyboardEnabled = true;
}
function stopKeyboard() {
  isKeyboardEnabled = false;
  if (modalElement) modalElement.style.display = "none";
}

// Core UI creation
function createKeyboardModal() {
  if (modalElement) return;
  modalElement = document.createElement("div");
  modalElement.id = "keyboardModal";
  Object.assign(modalElement.style, {
    position: "fixed",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255,255,255,0.95)",
    padding: "15px",
    zIndex: "999999",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    cursor: "move",
    display: "none",
    maxWidth: "95vw"
  });

  modalElement.innerHTML = `
    <div id="keyboardContainer" class="simple-keyboard"></div>
    <button id="switchLayoutButton" style="
      background: none; border: none; font-size: 20px; margin-top: 10px; cursor: pointer;
    " title="Switch Layout">🌐</button>
  `;
  document.body.appendChild(modalElement);
  makeDraggable(modalElement);
  initializeKeyboard();
  document.getElementById("switchLayoutButton").addEventListener("click", switchKeyboardLayout);
}

// Init keyboard instance
function initializeKeyboard() {
  const container = document.getElementById("keyboardContainer");
  if (!container) return;
  keyboardInstance = new Keyboard(container, {
    onChange: input => updateTextAtCursor(input),
    onKeyPress: handleKeyPress,
    layout: {
      default: [
        "あ い う え お か き く け こ さ し す せ そ",
        "た ち つ て と な に ぬ ね の は ひ ふ へ ほ {bksp}",
        "ま み む め も や ゆ よ ら り る れ ろ {enter}",
        "{caps} わ を ん ゛ ゜ ー 、 。 {space}"
      ],
      shift: [
        "ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ",
        "タ チ ツ テ ト ナ ニ ヌ ネ ノ ハ ヒ フ ヘ ホ {bksp}",
        "マ ミ ム メ モ ヤ ユ ヨ ラ リ ル レ ロ {enter}",
        "{caps} ワ ヲ ン ゛ ゜ ー 、 。 {space}"
      ],
      romaji: [
        "q w e r t y u i o p {bksp}",
        "a s d f g h j k l ; {enter}",
        "{caps} z x c v b n m , . / {caps}",
        "{space}"
      ],
      romajiCaps: [
        "Q W E R T Y U I O P {bksp}",
        "A S D F G H J K L ; {enter}",
        "{caps} Z X C V B N M , . / {caps}",
        "{space}"
      ]
    },
    theme: "hg-theme-default hg-layout-default",
    layoutName: "default"
  });
}

// Key logic
function handleKeyPress(button) {
  if (!activeInput) return;
  const isContentEditable = activeInput.isContentEditable;
  const cursorPos = isContentEditable ? getCaretPosition(activeInput) : activeInput.selectionStart;
  const text = isContentEditable ? activeInput.innerText : activeInput.value;

  if (button === "{bksp}") {
    const newText = text.slice(0, cursorPos - 1) + text.slice(cursorPos);
    updateInputText(newText, cursorPos - 1);
  } else if (button === "{enter}") {
    const newText = text.slice(0, cursorPos) + "\n" + text.slice(cursorPos);
    updateInputText(newText, cursorPos + 1);
  } else if (button === "{caps}") {
    capsLockActive = !capsLockActive;
    if (currentLayout === "romaji")
      keyboardInstance.setOptions({ layoutName: capsLockActive ? "romajiCaps" : "romaji" });
    else
      keyboardInstance.setOptions({ layoutName: capsLockActive ? "shift" : "default" });
  } else if (button === "{space}") {
    const newText = text.slice(0, cursorPos) + " " + text.slice(cursorPos);
    updateInputText(newText, cursorPos + 1);
  } else {
    const newText = text.slice(0, cursorPos) + button + text.slice(cursorPos);
    updateInputText(newText, cursorPos + 1);
  }
}

// Handle input changes
function updateInputText(newText, newCursorPos) {
  if (!activeInput) return;
  if (activeInput.isContentEditable) {
    activeInput.innerText = newText;
    setCaretPosition(activeInput, newCursorPos);
  } else {
    activeInput.value = newText;
    activeInput.setSelectionRange(newCursorPos, newCursorPos);
  }
}

// Layout switch
function switchKeyboardLayout() {
  const layouts = ["default", "shift", "romaji"];
  currentLayout = layouts[(layouts.indexOf(currentLayout) + 1) % layouts.length];
  keyboardInstance.setOptions({ layoutName: currentLayout });
  capsLockActive = false;
}

// Listeners
function attachInputFocusListeners() {
  document.addEventListener("focusin", event => {
    if (!isKeyboardEnabled) return;
    const target = event.target;
    if (isValidTextInput(target)) {
      activeInput = target;
      modalElement.style.display = "block";
      preventImmediateClose = true;
      setTimeout(() => preventImmediateClose = false, 300);
    }
  });

  document.addEventListener("click", event => {
    if (!isKeyboardEnabled || preventImmediateClose) return;
    const isClickInsideInput = isValidTextInput(event.target);
    const isClickInsideKeyboard = modalElement.contains(event.target);
    if (!isClickInsideInput && !isClickInsideKeyboard) {
      modalElement.style.display = "none";
      activeInput = null;
    }
  });
}

// Input validation
function isValidTextInput(element) {
  if (!element || !(element instanceof HTMLElement)) return false;
  const validTypes = ["text", "email", "password", "search", "tel", "url"];
  return (
    (element.tagName === "INPUT" && validTypes.includes(element.type)) ||
    element.tagName === "TEXTAREA" ||
    element.isContentEditable
  );
}

// Drag logic
function makeDraggable(el) {
  el.addEventListener("mousedown", e => {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    const onMove = e => {
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    e.preventDefault();
  });
}

// Utilities for contenteditable caret
function getCaretPosition(editableDiv) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return 0;
  const range = sel.getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(editableDiv);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
}

function setCaretPosition(el, pos) {
  const setPos = (node, remaining) => {
    for (let child of node.childNodes) {
      if (child.nodeType === 3) {
        if (child.length >= remaining) {
          const range = document.createRange();
          const sel = window.getSelection();
          range.setStart(child, remaining);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          return true;
        } else {
          remaining -= child.length;
        }
      } else {
        if (setPos(child, remaining)) return true;
      }
    }
    return false;
  };
  setPos(el, pos);
}

export { startKeyboard, stopKeyboard };
