import { actions, resetActions, functionActions } from "../util/eventListeners.js";
import { state_actions_enable, state_actions_disable, executePredefinedStateKeys } from "../util/state_util.js";
import { enableAnimations, disableAnimations, toggleAnimations, getOption } from "../modules/completed/stopAnimation.js";
import { getButtonState, setMultipleButtonStates, resetBatchSettingsStates, printAllButtonStates, resetAllButtonStatesToZero } from "./stateManager.js";
import { startKeyboard, stopKeyboard } from '../modules/completed/virtualKeyboard.js';
import { enableVoiceCommands, disableVoiceCommands } from "../modules/completed/voiceCommands.js";
import "../assets/style.css";
import dotenv from 'dotenv';
dotenv.config();


let SERVER_URL = "";
let API_KEY = "";

// Function to validate domain and API key
async function validateAndLoadPlugin(domain) {

  if (!SERVER_URL) {
    return;
  }

  try {
    const response = await fetch(`${SERVER_URL}/validate-domain`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ domain })
    });

    const result = await response.json();
    const returnedApiKey = response.headers.get("x-api-key");


    if (returnedApiKey !== API_KEY) {
      return;
    }

    if (result.success) {

      isAllowed = true;
      createTriggerButton();
    } else {
      isAllowed = false;
    }
  } catch (error) {
  }
}




// Initialize with domain validation
let isAllowed = false;


const panel = document.createElement("div");
  panel.id = "a11y-jimat-container-control-panel";

  panel.innerHTML = `
 <style>
      <script src="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css">

      /* Include Google Fonts */
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap');
      /* Apply the fonts */
      .a11y-jimat-container-panel {
          font-family: "Noto Sans JP", serif;
       
}
    </style>
        <div class="a11y-jimat-container-ignore">
          <div class="a11y-jimat-container-panel">
              <!-- Header -->
            
              <div class="a11y-jimat-container-header">
                  <span>アクセシビリティ設定</span>
                  <button id="a11y-jimat-container-close-panel" ">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2064_657)">
                      <path d="M7 7L17 17" stroke="#190DED" stroke-width="2"/>
                      <path d="M17 7L7 17" stroke="#190DED" stroke-width="2"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_2064_657">
                        <rect width="24" height="24" fill="white"/>
                      </clipPath>
                    </defs>
                    </svg>
                  閉じる</button>
              </div>

                <!-- Toggle Section -->
                <div class="a11y-jimat-container-section">
                    <button id="a11y-jimat-container-toggle" class="a11y-jimat-container-toggle">
                      <span>一括設定</span>
                        <span>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_115_1040)">
                            <path d="M16.59 15.4099L12 10.8299L7.41 15.4099L6 13.9999L12 7.99991L18 13.9999L16.59 15.4099Z" fill="#190DED"/>
                            </g>
                            <defs>
                              <clipPath id="clip0_115_1040">
                                <rect width="24" height="24" fill="white" transform="matrix(1 0 0 -1 0 24)"/>
                              </clipPath>
                            </defs>
                          </svg>
                      </span>
                    </button>

                <!-- Presets section -->  
                <div id="a11y-jimat-container-preset-options" class="a11y-jimat-container-options hidden">
                    <button class="a11y-jimat-container-option1" style="font-family: font-size: 16px; font-weight: 500;">てんかん</button>
                    <button class="a11y-jimat-container-option2" style="font-family: font-size: 16px; font-weight: 500;">ADHD</button>
                    <button class="a11y-jimat-container-option3"  style="font-family: font-size: 16px; font-weight: 500;">色覚異常</button>
                    <button class="a11y-jimat-container-option4" style="font-family: font-size: 16px; font-weight: 500;">ブラインド</button>
                    <button class="a11y-jimat-container-option5" style="font-family: font-size: 16px; font-weight: 500;">低視力</button>
                    <button class="a11y-jimat-container-option6" style="font-family: font-size: 16px; font-weight: 500;">失読症</button>
                    <button class="a11y-jimat-container-option7" style="font-family: font-size: 16px; font-weight: 500;">運動障害</button>
                    <button class="a11y-jimat-container-option8" style="font-family: font-size: 16px; font-weight: 500;">限局性学習症</button>
                </div>
        
                </div>
                <div class="line">
                <div class="horizontal-line"> </div> </div>
                <!-- Settings -->
                <div class="a11y-jimat-container-settings">
                <div class="setting-heading"> 個別設定</div>

                <button id="a11y-jimat-container-screen-reader-btn" class="a11y-jimat-container-screen-reader" style="height: 72px;">
                  <div style="margin-right: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 13C11.2091 13 13 11.2091 13 9C13 6.79086 11.2091 5 9 5C6.79086 5 5 6.79086 5 9C5 11.2091 6.79086 13 9 13Z" fill="#190DED"/>
                      <path d="M9 15C6.33 15 1 16.34 1 19V21H17V19C17 16.34 11.67 15 9 15ZM16.76 5.36L15.08 7.05C15.92 8.23 15.92 9.76 15.08 10.94L16.76 12.63C18.78 10.61 18.78 7.56 16.76 5.36ZM20.07 2L18.44 3.63C21.21 6.65 21.21 11.19 18.44 14.37L20.07 16C23.97 12.11 23.98 6.05 20.07 2Z" fill="#190DED"/>
                    </svg>
                  </div>
                  <div class="position-word">
                    <span style="font-size: 16px; font-weight: bold;">スクリーンリーダー</span>
                    <span style="font-size: 10px;" class="sub-heading">サイト内の文章を音声で読み上げ</span>
                  </div>
                </button>

                <button id="a11y-jimat-container-text-reader-btn" class="a11y-jimat-container-text-reader" style="height: 72px;">
                  <div style="margin-right: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="5" width="22" height="14" fill="#190DED"/>
                      <path d="M11.8619 6.73779C11.8299 6.85553 11.7979 6.97327 11.7659 7.09101C11.7419 7.20033 11.7179 7.30546 11.6939 7.40637C11.6218 7.80163 11.5538 8.25576 11.4898 8.76876C11.4258 9.27335 11.3737 9.80316 11.3337 10.3582C11.2937 10.9048 11.2737 11.4431 11.2737 11.9729C11.2737 12.6288 11.3057 13.2344 11.3697 13.7894C11.4338 14.336 11.5218 14.8448 11.6339 15.3158C11.7539 15.7783 11.882 16.2198 12.018 16.6403L10.6375 17.0818C10.5174 16.7034 10.4014 16.2535 10.2893 15.7321C10.1853 15.2107 10.0972 14.6514 10.0252 14.0543C9.95318 13.4488 9.91717 12.8391 9.91717 12.2252C9.91717 11.8047 9.92917 11.3842 9.95318 10.9637C9.98519 10.5348 10.0172 10.1143 10.0492 9.70224C10.0812 9.28176 10.1172 8.88229 10.1573 8.50385C10.2053 8.117 10.2453 7.76799 10.2773 7.45683C10.2853 7.33909 10.2933 7.21295 10.3013 7.07839C10.3093 6.93543 10.3093 6.80928 10.3013 6.69995L11.8619 6.73779ZM9.72509 8.13802C10.4854 8.13802 11.1977 8.12121 11.8619 8.08757C12.5342 8.05393 13.1785 7.99506 13.7947 7.91096C14.419 7.82686 15.0392 7.70492 15.6555 7.54513L15.6675 9.00844C15.2513 9.08413 14.7911 9.15561 14.2869 9.22289C13.7907 9.28176 13.2705 9.33221 12.7263 9.37426C12.1901 9.41631 11.6619 9.44995 11.1417 9.47518C10.6214 9.492 10.1333 9.50041 9.67707 9.50041C9.46899 9.50041 9.23289 9.49621 8.96879 9.4878C8.71269 9.47939 8.45658 9.47098 8.20048 9.46257C7.95238 9.44575 7.73629 9.43313 7.55222 9.42472L7.51621 7.96142C7.65226 7.97824 7.84834 8.00347 8.10444 8.03711C8.36054 8.06234 8.63265 8.08757 8.92077 8.11279C9.21689 8.12961 9.48499 8.13802 9.72509 8.13802ZM14.8992 9.97977C14.8752 10.0555 14.8391 10.1606 14.7911 10.2951C14.7431 10.4297 14.6951 10.5685 14.6471 10.7114C14.607 10.8544 14.575 10.9679 14.551 11.052C14.3189 11.8089 14.0348 12.5027 13.6987 13.1334C13.3705 13.7558 13.0144 14.3024 12.6303 14.7733C12.2461 15.2359 11.8659 15.6143 11.4898 15.9087C11.0976 16.2198 10.6495 16.4931 10.1453 16.7286C9.64106 16.9557 9.13285 17.0692 8.62065 17.0692C8.33253 17.0692 8.06443 17.0061 7.81633 16.88C7.56823 16.7538 7.36815 16.5562 7.21609 16.2871C7.07203 16.0096 7 15.6606 7 15.2401C7 14.786 7.08804 14.3402 7.26411 13.9029C7.44018 13.4656 7.68427 13.0493 7.9964 12.6541C8.30852 12.2588 8.67267 11.9098 9.08884 11.6071C9.505 11.2959 9.95318 11.052 10.4334 10.8754C10.8255 10.724 11.2537 10.6021 11.7179 10.5096C12.1901 10.4171 12.6543 10.3708 13.1104 10.3708C13.8547 10.3708 14.519 10.5138 15.1032 10.7997C15.6955 11.0857 16.1597 11.4767 16.4958 11.9729C16.8319 12.4691 17 13.0493 17 13.7137C17 14.1594 16.932 14.5967 16.7959 15.0256C16.6599 15.4461 16.4358 15.8372 16.1236 16.1988C15.8195 16.5604 15.4154 16.8716 14.9112 17.1323C14.407 17.393 13.7867 17.5822 13.0504 17.7L12.2581 16.3754C13.0264 16.2829 13.6507 16.1021 14.1309 15.833C14.611 15.5555 14.9592 15.2233 15.1753 14.8364C15.3994 14.4496 15.5114 14.0501 15.5114 13.638C15.5114 13.268 15.4154 12.9358 15.2233 12.6415C15.0392 12.3471 14.7591 12.1116 14.383 11.935C14.0148 11.75 13.5586 11.6575 13.0144 11.6575C12.4702 11.6575 11.982 11.7206 11.5498 11.8467C11.1257 11.9729 10.7695 12.1074 10.4814 12.2504C10.0812 12.4522 9.72509 12.7087 9.41297 13.0199C9.10084 13.3227 8.85674 13.6422 8.68067 13.9786C8.5046 14.315 8.41657 14.6262 8.41657 14.9121C8.41657 15.1139 8.46058 15.2695 8.54862 15.3789C8.63665 15.4798 8.77671 15.5302 8.96879 15.5302C9.2569 15.5302 9.58904 15.4335 9.96519 15.2401C10.3413 15.0383 10.7135 14.7565 11.0816 14.3949C11.5138 13.9744 11.922 13.4698 12.3061 12.8811C12.6903 12.2925 13.0064 11.5608 13.2545 10.6862C13.2785 10.6021 13.3025 10.4928 13.3265 10.3582C13.3505 10.2237 13.3705 10.0891 13.3866 9.95454C13.4106 9.81157 13.4266 9.69804 13.4346 9.61394L14.8992 9.97977Z" fill="white"/>
                    </svg>
                  </div>
                  <div class="position-word">
                    <span style="font-size: 16px; font-weight: bold;">テキストリーダー</span>
                    <span style="font-size: 10px;" class="sub-heading">選択した文章を音声で読み上げ</span>
                  </div>
                </button>

                <!-- Virtual keypode button -->
                <button id="a11y-jimat-container-virtual-keyboard-btn" class="a11y-jimat-container-virtual-keyboard" style="height: 72px;">
                  <div style="margin-right: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 5H4C2.9 5 2.01 5.9 2.01 7L2 17C2 18.1 2.9 19 4 19H20C21.1 19 22 18.1 22 17V7C22 5.9 21.1 5 20 5ZM11 8H13V10H11V8ZM11 11H13V13H11V11ZM8 8H10V10H8V8ZM8 11H10V13H8V11ZM7 13H5V11H7V13ZM7 10H5V8H7V10ZM16 17H8V15H16V17ZM16 13H14V11H16V13ZM16 10H14V8H16V10ZM19 13H17V11H19V13ZM19 10H17V8H19V10Z" fill="#190DED"/>
                    </svg>
                  </div>
                  <div class="position-word">
                    <span style="font-size: 16px; font-weight: bold;">仮想キーボード</span>
                    <span style="font-size: 10px;" class="sub-heading">フォーム入力でキーボードを表示</span>
                  </div>
                </button>


                <!-- Keyboard operation highlights button -->
                <button id="a11y-jimat-container-keyboard-highlight-btn" class="a11y-jimat-container-keyboard-highlight" style="height: 72px;">
                    <div style="margin-right: 10px;">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 22L19 11L17 11L17 22L19 22Z" fill="#190DED"/>
                        <path d="M9.86195 11.0378C9.82993 11.1556 9.79792 11.2733 9.76591 11.3911C9.7419 11.5004 9.71789 11.6055 9.69388 11.7064C9.62185 12.1017 9.55382 12.5558 9.4898 13.0688C9.42577 13.5734 9.37375 14.1032 9.33373 14.6583C9.29372 15.2049 9.27371 15.7431 9.27371 16.2729C9.27371 16.9289 9.30572 17.5344 9.36975 18.0894C9.43377 18.6361 9.52181 19.1449 9.63385 19.6158C9.7539 20.0784 9.88195 20.5199 10.018 20.9404L8.63746 21.3819C8.51741 21.0034 8.40136 20.5535 8.28932 20.0321C8.18527 19.5107 8.09724 18.9515 8.02521 18.3544C7.95318 17.7489 7.91717 17.1391 7.91717 16.5252C7.91717 16.1047 7.92917 15.6843 7.95318 15.2638C7.98519 14.8349 8.01721 14.4144 8.04922 14.0023C8.08123 13.5818 8.11725 13.1823 8.15726 12.8039C8.20528 12.417 8.2453 12.068 8.27731 11.7569C8.28531 11.6391 8.29332 11.513 8.30132 11.3784C8.30932 11.2355 8.30932 11.1093 8.30132 11L9.86195 11.0378ZM7.72509 12.4381C8.48539 12.4381 9.19768 12.4213 9.86195 12.3876C10.5342 12.354 11.1785 12.2951 11.7947 12.211C12.419 12.1269 13.0392 12.005 13.6555 11.8452L13.6675 13.3085C13.2513 13.3842 12.7911 13.4557 12.2869 13.5229C11.7907 13.5818 11.2705 13.6323 10.7263 13.6743C10.1901 13.7164 9.66187 13.75 9.14166 13.7752C8.62145 13.792 8.13325 13.8005 7.67707 13.8005C7.46899 13.8005 7.23289 13.7963 6.96879 13.7878C6.71269 13.7794 6.45658 13.771 6.20048 13.7626C5.95238 13.7458 5.73629 13.7332 5.55222 13.7248L5.51621 12.2615C5.65226 12.2783 5.84834 12.3035 6.10444 12.3372C6.36054 12.3624 6.63265 12.3876 6.92077 12.4128C7.21689 12.4297 7.48499 12.4381 7.72509 12.4381ZM12.8992 14.2798C12.8752 14.3555 12.8391 14.4606 12.7911 14.5952C12.7431 14.7297 12.6951 14.8685 12.6471 15.0115C12.607 15.1544 12.575 15.268 12.551 15.3521C12.3189 16.1089 12.0348 16.8028 11.6987 17.4335C11.3705 18.0558 11.0144 18.6024 10.6303 19.0734C10.2461 19.5359 9.86595 19.9144 9.4898 20.2087C9.09764 20.5199 8.64946 20.7932 8.14526 21.0287C7.64106 21.2557 7.13285 21.3693 6.62065 21.3693C6.33253 21.3693 6.06443 21.3062 5.81633 21.18C5.56823 21.0539 5.36815 20.8563 5.21609 20.5872C5.07203 20.3096 5 19.9606 5 19.5401C5 19.086 5.08804 18.6403 5.26411 18.203C5.44018 17.7657 5.68427 17.3494 5.9964 16.9541C6.30852 16.5589 6.67267 16.2099 7.08884 15.9071C7.505 15.5959 7.95318 15.3521 8.43337 15.1755C8.82553 15.0241 9.2537 14.9021 9.71789 14.8096C10.1901 14.7171 10.6543 14.6709 11.1104 14.6709C11.8547 14.6709 12.519 14.8138 13.1032 15.0998C13.6955 15.3857 14.1597 15.7768 14.4958 16.2729C14.8319 16.7691 15 17.3494 15 18.0138C15 18.4595 14.932 18.8968 14.7959 19.3257C14.6599 19.7462 14.4358 20.1372 14.1236 20.4989C13.8195 20.8605 13.4154 21.1716 12.9112 21.4323C12.407 21.693 11.7867 21.8823 11.0504 22L10.2581 20.6755C11.0264 20.583 11.6507 20.4021 12.1309 20.133C12.611 19.8555 12.9592 19.5233 13.1753 19.1365C13.3994 18.7496 13.5114 18.3502 13.5114 17.9381C13.5114 17.568 13.4154 17.2359 13.2233 16.9415C13.0392 16.6472 12.7591 16.4117 12.383 16.2351C12.0148 16.0501 11.5586 15.9576 11.0144 15.9576C10.4702 15.9576 9.98199 16.0206 9.54982 16.1468C9.12565 16.2729 8.76951 16.4075 8.48139 16.5505C8.08123 16.7523 7.72509 17.0088 7.41297 17.32C7.10084 17.6227 6.85674 17.9423 6.68067 18.2787C6.5046 18.6151 6.41657 18.9262 6.41657 19.2122C6.41657 19.414 6.46058 19.5696 6.54862 19.6789C6.63665 19.7798 6.77671 19.8303 6.96879 19.8303C7.2569 19.8303 7.58904 19.7336 7.96519 19.5401C8.34134 19.3383 8.71349 19.0566 9.08163 18.695C9.51381 18.2745 9.92197 17.7699 10.3061 17.1812C10.6903 16.5925 11.0064 15.8609 11.2545 14.9862C11.2785 14.9021 11.3025 14.7928 11.3265 14.6583C11.3505 14.5237 11.3705 14.3891 11.3866 14.2546C11.4106 14.1116 11.4266 13.9981 11.4346 13.914L12.8992 14.2798Z" fill="#190DED"/>
                        <path d="M11 2L11 8L13 8L13 2L11 2Z" fill="#190DED"/>
                        <path d="M2.66797 5.22388L6.91061 9.46652L8.32482 8.0523L4.08218 3.80966L2.66797 5.22388Z" fill="#190DED"/>
                        <path d="M19.9102 3.80957L15.6675 8.05221L17.0817 9.46642L21.3244 5.22378L19.9102 3.80957Z" fill="#190DED"/>
                      </svg>
                    </div>
                    <div class="position-word">
                      <span style="font-size: 16px; font-weight: bold;">キーボード操作ハイライト</span>
                      <span style="font-size: 10px;" class="sub-heading">キーボードで操作中の要素を強調表示</span>
                    </div>
                  </button>

                <!-- Voice Operation -->
                <button id="a11y-jimat-container-voice-control-btn" class="a11y-jimat-container-voice-control" style="height: 72px;">
                  <div style="margin-right: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 24H9V22H7V24ZM12 13C13.66 13 14.99 11.66 14.99 10L15 4C15 2.34 13.66 1 12 1C10.34 1 9 2.34 9 4V10C9 11.66 10.34 13 12 13ZM11 24H13V22H11V24ZM15 24H17V22H15V24ZM19 10H17.3C17.3 13 14.76 15.1 12 15.1C9.24 15.1 6.7 13 6.7 10H5C5 13.41 7.72 16.23 11 16.72V20H13V16.72C16.28 16.23 19 13.41 19 10Z" fill="#190DED"/>
                    </svg>
                  </div>
                  <div class="position-word">
                    <span style="font-size: 16px; font-weight: bold;">音声操作</span>
                    <span style="font-size: 10px;  class="sub-heading">音声でサイトを操作（Google Chrome推奨）</span>
                  </div>
                </button>

                <button id="a11y-jimat-container-saturation-control" class="a11y-jimat-container-saturation-control" style="height: 72px;">
                  <div style="margin-right: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C12.83 21 13.5 20.33 13.5 19.5C13.5 19.11 13.35 18.76 13.11 18.49C12.88 18.23 12.73 17.88 12.73 17.5C12.73 16.67 13.4 16 14.23 16H16C18.76 16 21 13.76 21 11C21 6.58 16.97 3 12 3ZM6.5 12C5.67 12 5 11.33 5 10.5C5 9.67 5.67 9 6.5 9C7.33 9 8 9.67 8 10.5C8 11.33 7.33 12 6.5 12ZM9.5 8C8.67 8 8 7.33 8 6.5C8 5.67 8.67 5 9.5 5C10.33 5 11 5.67 11 6.5C11 7.33 10.33 8 9.5 8ZM14.5 8C13.67 8 13 7.33 13 6.5C13 5.67 13.67 5 14.5 5C15.33 5 16 5.67 16 6.5C16 7.33 15.33 8 14.5 8ZM17.5 12C16.67 12 16 11.33 16 10.5C16 9.67 16.67 9 17.5 9C18.33 9 19 9.67 19 10.5C19 11.33 18.33 12 17.5 12Z" fill="#190DED"/>
                    </svg>
                  </div>
                  <div class="position-word">
                    <span style="font-size: 16px; font-weight: bold;">色の彩度</span>
                    <span style="font-size: 10px;" class="sub-heading">低彩度・高彩度・白黒</span>
                    <div class="progress-bar-container">
                      <div class="progress-bar"></div>
                      <div class="progress-bar"></div>
                      <div class="progress-bar"></div>
                    </div>
                  </div>
                </button>

                <button id="a11y-jimat-container-increase-font"  class="a11y-jimat-container-increase-font" style="height: 72px;">
                  <div style="margin-right: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 3H1V6H7V21H10V6H16V3Z" fill="#190DED"/>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M23 9H12V12H16V21H19V12H23V9Z" fill="#190DED"/>
                    </svg>
                  </div>
                  <div class="position-word">
                    <span style="font-size: 16px; font-weight: bold;">文字の拡大</span>
                    <span style="font-size: 10px;"  class="sub-heading">文字サイズを4段階で調整</span>
                    <div class="progress-bar-container">
                      <div class="progress-bar"></div>
                      <div class="progress-bar"></div>
                      <div class="progress-bar"></div>
                      <div class="progress-bar"></div>
                    </div>
                  </div>
                </button>

                <button id="a11y-jimat-container-link-underline-btn" class="a11y-jimat-container-link-underline" style="height: 72px;">
                  <div style="margin-right: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="22" height="2" transform="matrix(1 0 0 -1 1 19)" fill="#190DED"/>
                      <path d="M11.8619 4.73779C11.8299 4.85553 11.7979 4.97327 11.7659 5.09101C11.7419 5.20033 11.7179 5.30546 11.6939 5.40637C11.6218 5.80163 11.5538 6.25576 11.4898 6.76876C11.4258 7.27335 11.3737 7.80316 11.3337 8.35821C11.2937 8.90484 11.2737 9.44307 11.2737 9.97289C11.2737 10.6288 11.3057 11.2344 11.3697 11.7894C11.4338 12.336 11.5218 12.8448 11.6339 13.3158C11.7539 13.7783 11.882 14.2198 12.018 14.6403L10.6375 15.0818C10.5174 14.7034 10.4014 14.2535 10.2893 13.7321C10.1853 13.2107 10.0972 12.6514 10.0252 12.0543C9.95318 11.4488 9.91717 10.8391 9.91717 10.2252C9.91717 9.80469 9.92917 9.3842 9.95318 8.96371C9.98519 8.53481 10.0172 8.11432 10.0492 7.70224C10.0812 7.28176 10.1172 6.88229 10.1573 6.50385C10.2053 6.117 10.2453 5.76799 10.2773 5.45683C10.2853 5.33909 10.2933 5.21295 10.3013 5.07839C10.3093 4.93543 10.3093 4.80928 10.3013 4.69995L11.8619 4.73779ZM9.72509 6.13802C10.4854 6.13802 11.1977 6.12121 11.8619 6.08757C12.5342 6.05393 13.1785 5.99506 13.7947 5.91096C14.419 5.82686 15.0392 5.70492 15.6555 5.54513L15.6675 7.00844C15.2513 7.08413 14.7911 7.15561 14.2869 7.22289C13.7907 7.28176 13.2705 7.33221 12.7263 7.37426C12.1901 7.41631 11.6619 7.44995 11.1417 7.47518C10.6214 7.492 10.1333 7.50041 9.67707 7.50041C9.46899 7.50041 9.23289 7.49621 8.96879 7.4878C8.71269 7.47939 8.45658 7.47098 8.20048 7.46257C7.95238 7.44575 7.73629 7.43313 7.55222 7.42472L7.51621 5.96142C7.65226 5.97824 7.84834 6.00347 8.10444 6.03711C8.36054 6.06234 8.63265 6.08757 8.92077 6.11279C9.21689 6.12961 9.48499 6.13802 9.72509 6.13802ZM14.8992 7.97977C14.8752 8.05546 14.8391 8.16058 14.7911 8.29514C14.7431 8.42969 14.6951 8.56845 14.6471 8.71142C14.607 8.85439 14.575 8.96792 14.551 9.05202C14.3189 9.8089 14.0348 10.5027 13.6987 11.1334C13.3705 11.7558 13.0144 12.3024 12.6303 12.7733C12.2461 13.2359 11.8659 13.6143 11.4898 13.9087C11.0976 14.2198 10.6495 14.4931 10.1453 14.7286C9.64106 14.9557 9.13285 15.0692 8.62065 15.0692C8.33253 15.0692 8.06443 15.0061 7.81633 14.88C7.56823 14.7538 7.36815 14.5562 7.21609 14.2871C7.07203 14.0096 7 13.6606 7 13.2401C7 12.786 7.08804 12.3402 7.26411 11.9029C7.44018 11.4656 7.68427 11.0493 7.9964 10.6541C8.30852 10.2588 8.67267 9.90981 9.08884 9.60706C9.505 9.2959 9.95318 9.05202 10.4334 8.87541C10.8255 8.72403 11.2537 8.60209 11.7179 8.50958C12.1901 8.41708 12.6543 8.37082 13.1104 8.37082C13.8547 8.37082 14.519 8.51379 15.1032 8.79972C15.6955 9.08565 16.1597 9.47671 16.4958 9.97289C16.8319 10.4691 17 11.0493 17 11.7137C17 12.1594 16.932 12.5967 16.7959 13.0256C16.6599 13.4461 16.4358 13.8372 16.1236 14.1988C15.8195 14.5604 15.4154 14.8716 14.9112 15.1323C14.407 15.393 13.7867 15.5822 13.0504 15.7L12.2581 14.3754C13.0264 14.2829 13.6507 14.1021 14.1309 13.833C14.611 13.5555 14.9592 13.2233 15.1753 12.8364C15.3994 12.4496 15.5114 12.0501 15.5114 11.638C15.5114 11.268 15.4154 10.9358 15.2233 10.6415C15.0392 10.3471 14.7591 10.1116 14.383 9.93504C14.0148 9.75003 13.5586 9.65752 13.0144 9.65752C12.4702 9.65752 11.982 9.72059 11.5498 9.84674C11.1257 9.97289 10.7695 10.1074 10.4814 10.2504C10.0812 10.4522 9.72509 10.7087 9.41297 11.0199C9.10084 11.3227 8.85674 11.6422 8.68067 11.9786C8.5046 12.315 8.41657 12.6262 8.41657 12.9121C8.41657 13.1139 8.46058 13.2695 8.54862 13.3789C8.63665 13.4798 8.77671 13.5302 8.96879 13.5302C9.2569 13.5302 9.58904 13.4335 9.96519 13.2401C10.3413 13.0383 10.7135 12.7565 11.0816 12.3949C11.5138 11.9744 11.922 11.4698 12.3061 10.8811C12.6903 10.2925 13.0064 9.56081 13.2545 8.68619C13.2785 8.60209 13.3025 8.49276 13.3265 8.35821C13.3505 8.22365 13.3705 8.08909 13.3866 7.95454C13.4106 7.81157 13.4266 7.69804 13.4346 7.61394L14.8992 7.97977Z" fill="#190DED"/>
                    </svg>
                  </div>
                  <div class="position-word">
                    <span style="font-size: 16px; font-weight: bold;">リンク下線</span>
                    <span style="font-size: 10px;" class="sub-heading">リンクに下線を付与</span>
                  </div>
                </button>

                <button id="a11y-jimat-container-link-highlight-btn" class="a11y-jimat-container-link-highlight" style="height: 72px;">
                  <div style="margin-right: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 22H7C5.61667 22 4.4375 21.5125 3.4625 20.5375C2.4875 19.5625 2 18.3833 2 17C2 15.6167 2.4875 14.4375 3.4625 13.4625C4.4375 12.4875 5.61667 12 7 12H11V14H7C6.16667 14 5.45833 14.2917 4.875 14.875C4.29167 15.4583 4 16.1667 4 17C4 17.8333 4.29167 18.5417 4.875 19.125C5.45833 19.7083 6.16667 20 7 20H11V22ZM8 18V16H16V18H8ZM13 22V20H17C17.8333 20 18.5417 19.7083 19.125 19.125C19.7083 18.5417 20 17.8333 20 17C20 16.1667 19.7083 15.4583 19.125 14.875C18.5417 14.2917 17.8333 14 17 14H13V12H17C18.3833 12 19.5625 12.4875 20.5375 13.4625C21.5125 14.4375 22 15.6167 22 17C22 18.3833 21.5125 19.5625 20.5375 20.5375C19.5625 21.5125 18.3833 22 17 22H13Z" fill="#190DED"/>
                      <rect width="6" height="2" transform="matrix(-4.37114e-08 1 1 4.37114e-08 11 2)" fill="#190DED"/>
                      <rect width="6" height="2" transform="matrix(0.707107 0.707107 0.707107 -0.707107 2.66797 5.22388)" fill="#190DED"/>
                      <rect width="6" height="2" transform="matrix(-0.707107 0.707107 0.707107 0.707107 19.9102 3.80957)" fill="#190DED"/>
                    </svg>
                  </div>
                  <div class="position-word">
                    <span style="font-size: 16px; font-weight: bold;">リンクハイライト</span>
                    <span style="font-size: 10px;"  class="sub-heading">リンクを強調表示</span>
                  </div>
                </button>

                <button id="a11y-jimat-container-stop-animation-btn" class="a11y-jimat-container-stop-animation" style="height: 72px;">
                  <div style="margin-right: 10px;">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" fill="#190DED"/>
                      <rect x="9" y="7" width="2" height="10" fill="white"/>
                      <rect x="13" y="7" width="2" height="10" fill="white"/>
                    </svg>
                  </div>
                  <div class="position-word">
                    <span style="font-size: 16px; font-weight: bold;">アニメーションを停止</span>
                    <span style="font-size: 10px;"  class="sub-heading">動画やアニメーションを一時停止</span>
                  </div>
                </button>


              </div>

              <!-- Footer -->
              <div class="a11y-jimat-container-footer">
                  <button id="a11y-jimat-container-reset"><svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 5.5V2.5L8 6.5L12 10.5V7.5C15.31 7.5 18 10.19 18 13.5C18 16.47 15.83 18.93 13 19.41V21.43C16.95 20.94 20 17.58 20 13.5C20 9.08 16.42 5.5 12 5.5Z" fill="white"/>
  <path d="M6 13.5001C6 11.8501 6.67 10.3501 7.76 9.26009L6.34 7.84009C4.9 9.29009 4 11.2901 4 13.5001C4 17.5801 7.05 20.9401 11 21.4301V19.4101C8.17 18.9301 6 16.4701 6 13.5001Z" fill="white"/>
  </svg>すべての設定をリセット</button>
                  <a href="#">サービス提供会社</a>
                  <a href="#">サービスお問い合わせ先</a>
              </div>
          </div>
        </div>
    `;

// Function to create the trigger button
export function createTriggerButton() {
  if (!isAllowed) {
    return;
  }

  const triggerButton = document.createElement("button");
  triggerButton.id = "a11y-jimat-container-trigger-button";
  triggerButton.innerHTML = `  
    <div id="a11y-jimat-container-control-wrapper" class="a11y-jimat-container-ignore">
      <div
        id="accessibility-plugin-btn"
        class="accessibility-button"
        aria-label="Activate Accessibility Plugin"
      >
        <div class="circle">
          <span>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2_405)">
                <path d="M15 6.5625C14.351 6.5625 13.7166 6.37006 13.177 6.00951C12.6374 5.64896 12.2169 5.1365 11.9685 4.53693C11.7202 3.93736 11.6552 3.27761 11.7818 2.64111C11.9084 2.00461 12.2209 1.41995 12.6798 0.961057C13.1387 0.502166 13.7234 0.189658 14.3599 0.0630498C14.9964 -0.063558 15.6561 0.00142174 16.2557 0.249772C16.8553 0.498122 17.3677 0.918688 17.7283 1.45829C18.0888 1.99789 18.2813 2.63228 18.2813 3.28125C18.2803 4.15121 17.9343 4.98527 17.3192 5.60042C16.704 6.21557 15.87 6.56157 15 6.5625Z" fill="white"/>
                <path d="M25.3125 6.60929L25.2861 6.61632L25.2615 6.62394C25.2029 6.64035 25.1443 6.65793 25.0857 6.67609C23.9953 6.99601 18.7031 8.48781 14.9748 8.48781C11.5102 8.48781 6.69667 7.19875 5.15683 6.76105C5.00358 6.70179 4.84708 6.65132 4.68808 6.60988C3.5748 6.31691 2.81308 7.44777 2.81308 8.48136C2.81308 9.505 3.733 9.9925 4.66171 10.3423V10.3587L10.241 12.1013C10.8111 12.3198 10.9635 12.5431 11.0379 12.7364C11.2799 13.3569 11.0865 14.5857 11.018 15.0146L10.6781 17.6513L8.79199 27.9749C8.78613 28.003 8.78085 28.0318 8.77617 28.0611L8.76269 28.1355C8.62675 29.0818 9.32167 29.9999 10.6377 29.9999C11.7861 29.9999 12.293 29.2071 12.5127 28.1284C12.5127 28.1284 14.1533 18.8958 14.9736 18.8958C15.7939 18.8958 17.4838 28.1284 17.4838 28.1284C17.7035 29.2071 18.2103 29.9999 19.3588 29.9999C20.6783 29.9999 21.3732 29.0777 21.2338 28.1284C21.2215 28.0476 21.2068 27.9679 21.1893 27.8905L19.2773 17.6525L18.9381 15.0157C18.6926 13.48 18.89 12.9726 18.9568 12.8536C18.9586 12.8508 18.9602 12.8479 18.9615 12.8448C19.0248 12.7277 19.3131 12.4652 19.9857 12.2126L25.217 10.3839C25.2491 10.3753 25.2808 10.3652 25.3119 10.3534C26.2494 10.0019 27.1869 9.51554 27.1869 8.48253C27.1869 7.44953 26.4258 6.31691 25.3125 6.60929Z" fill="white"/>
              </g>
              <defs>
                <clipPath id="clip0_2_405">
                  <rect width="30" height="30" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </span>
        </div>
      </div>
    </div>
  `;

  


// Create the visibility wrapper
const wrapper = document.createElement("div");
wrapper.classList.add("a11y-jimat-container-panel-visibility", "shrink-hidden");

// Append panel inside wrapper
wrapper.appendChild(panel);

// Finally, append wrapper to the body
document.body.appendChild(wrapper);


// Use requestAnimationFrame to ensure it’s painted/rendered, then start timeout
requestAnimationFrame(() => {
  updateAllButtonStates(); 
  updateAdditionalButtonStates();
  setTimeout(() => {
    panel.remove();
    console.log("🧹 Control panel removed after being in the DOM for 200ms.");
  }, 200); // 0.2 seconds from now
});

  // Add event listener to open the control panel
  triggerButton.addEventListener("click", () => {
    createControlPanel();
  });

  // Append the button to the body
  document.body.appendChild(triggerButton);
  printAllButtonStates();

}


function cacheOriginalFontSizes() {
  const exclusionClass = "a11y-jimat-container-ignore";
  const elements = document.querySelectorAll(`body *:not(script):not(style):not(.${exclusionClass}):not(.${exclusionClass} *)`);

  elements.forEach(el => {
      if (!el.hasAttribute("data-original-font-size")) {
          const computed = window.getComputedStyle(el).fontSize;
          if (computed) el.setAttribute("data-original-font-size", parseFloat(computed));
      }
  });
}

// Call this ONCE on page load
window.addEventListener("DOMContentLoaded", cacheOriginalFontSizes);


// Initialize with domain validation
export async function initializePlugin(serverUrl, apiKey) {
  SERVER_URL = serverUrl;
  API_KEY = apiKey;
  let domain = window.location.origin;
  domain = "https://nilupa-illangarathna.github.io";
  // domain = "https://InvalidDomain";


  await validateAndLoadPlugin(domain);

  if (isAllowed) {
  } else {
  }
}


// Inject styles into the document
const style = document.createElement("style");

document.head.appendChild(style);

export function createControlPanel() {
  


  // Example usage: Call after panel is appended
  document.body.appendChild(panel);


  function toggleButtonActive(buttonClass, action, batch_setting, clicked = false) {
    let attempts = 0;
    const maxAttempts = 50; // Maximum retries to avoid infinite loop
    const interval = 10; // Time between retries (in milliseconds)

    let classToToggle = batch_setting ? "active" : "selected"; // Determine the class

    if (clicked) {
      classToToggle = "clicked"
    }

    const checkExist = setInterval(() => {
      const button = document.querySelector(`.${buttonClass}`);

      if (button) {
        if (action === "add") {
          button.classList.add(classToToggle);
        } else if (action === "remove") {
          button.classList.remove(classToToggle);
        }
        clearInterval(checkExist); // Stop checking once found
      } else if (attempts >= maxAttempts) {
        clearInterval(checkExist); // Stop trying after max attempts
      }
      attempts++;
    }, interval);
  }


  function toggleCheckmark(isActive, componentId) {
    let button = document.getElementById(componentId);
    if (!button) return;

    let existingSvg = button.querySelector(".checkmark-icon-container");

    if (isActive) {
      // Add checkmark if it doesn't exist
      if (!existingSvg) {
        let svgContainer = document.createElement("span");
        svgContainer.classList.add("checkmark-icon-container");
        svgContainer.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"/>
                </svg>
            `;
        button.appendChild(svgContainer);
      }
    } else {
      // Remove checkmark if it exists
      if (existingSvg) {
        existingSvg.remove();
      }
    }
  }


  document.querySelectorAll(".a11y-jimat-container-settings button").forEach((button) => {
    button.addEventListener("click", () => {
      const progressBars = button.querySelectorAll(".progress-bar");
      let clickCount = button.dataset.clickCount ? parseInt(button.dataset.clickCount) : 0;
      let totalBars = progressBars.length;


      if (clickCount < totalBars) {
        button.classList.add("clicked");
      }


      let existingSvg = button.querySelector(".checkmark-icon-container");


      if (totalBars === 0) {
        if (!existingSvg) {
          let svgContainer = document.createElement("span");
          svgContainer.classList.add("checkmark-icon-container");
          svgContainer.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"/>
                    </svg>
                `;
          button.appendChild(svgContainer);
        }
      } else {

        if (button.classList.contains("clicked")) {
          if (!existingSvg) {
            let svgContainer = document.createElement("span");
            svgContainer.classList.add("checkmark-icon-container");
            svgContainer.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM6.66634 11.3333L3.33301 7.99992L4.27301 7.05992L6.66634 9.44659L11.7263 4.38659L12.6663 5.33325L6.66634 11.3333Z" fill="white"/>
                        </svg>
                    `;
            button.appendChild(svgContainer);
          }
        } else {

          if (existingSvg) {
            existingSvg.remove();
          }
        }
      }

      clickCount++;
      button.dataset.clickCount = clickCount;


      if (clickCount <= totalBars) {

        progressBars[clickCount - 1].classList.add("filled");
      }


      if (clickCount === totalBars) {

      } else if (clickCount > totalBars) {

        progressBars.forEach((bar) => bar.classList.remove("filled"));
        button.dataset.clickCount = 0;
        button.classList.remove("clicked");


      }
    });
  });

  // GLOBAL //
  function toggleElementSelection(elementId, state, actionKey) {
    const element = document.getElementById(elementId);

    if (!element) {
      return;
    }

    if (state === "selected") {
      element.classList.add("selected"); // Add selected state
      if (actionKey && actions[actionKey]) {
        actions[actionKey](); // Execute action
      }
    } else if (state === "deselected") {
      element.classList.remove("selected"); // Remove selected state
      if (actionKey && resetActions[actionKey]) {
        resetActions[actionKey](); // Execute reset action
      }

      // Remove the checkmark icon if it exists
      let existingSvg = element.querySelector(".checkmark-icon-container");
      if (existingSvg) {
        existingSvg.remove();
      }
    } else {
    }
  }

  // Close button functionality
  document.getElementById("a11y-jimat-container-close-panel").addEventListener("click", function () {
    const panel = document.getElementById("a11y-jimat-container-control-panel");
    if (panel) {
      panel.remove(); // Remove the control panel from the DOM
    }
  });


  // Toggle visibility of preset options
  document.getElementById("a11y-jimat-container-toggle").addEventListener("click", () => {
    const options = document.getElementById("a11y-jimat-container-preset-options");
    const svgIcon = document.querySelector("#a11y-jimat-container-toggle svg");

    options.classList.toggle("hidden");

    // Add rotation class if the options are visible
    if (options.classList.contains("hidden")) {
      svgIcon.classList.remove("rotated");
    } else {
      svgIcon.classList.add("rotated");
    }
  });


  // Highlight selected option
  document.querySelectorAll(".a11y-jimat-container-option").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".a11y-jimat-container-option")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });


  // Function to reset all buttons and associated controls
  function resetAllButtons() {
    const allButtons = document.querySelectorAll(".a11y-jimat-container-option1, .a11y-jimat-container-option2, .a11y-jimat-container-option3, .a11y-jimat-container-option4, .a11y-jimat-container-option5, .a11y-jimat-container-option6, .a11y-jimat-container-option7, .a11y-jimat-container-option8");

    // Deselect all buttons
    allButtons.forEach((button) => {
      button.classList.remove("active");
      button.classList.remove("selected");
      button.classList.remove("clicked");
    });

    // resetAllButtonStates();

    const allControls = document.querySelectorAll("#a11y-jimat-container-saturation-control, #a11y-jimat-container-text-reader-btn, #a11y-jimat-container-screen-reader-btn, #a11y-jimat-container-stop-animation-btn, #a11y-jimat-container-virtual-keyboard-btn, #a11y-jimat-container-increase-font, #a11y-jimat-container-voice-control-btn");

    allControls.forEach((control) => {
      control.classList.remove("selected", "clicked", "active");

      // Check if the control contains a checkmark icon and remove it
      let existingSvg = control.querySelector(".checkmark-icon-container");
      if (existingSvg) {
        existingSvg.remove();
      }

    });

    // Reset any progress bars or headings
    const bars = document.querySelectorAll("#a11y-jimat-container-saturation-control .progress-bar");
    const fontBars = document.querySelectorAll("#a11y-jimat-container-increase-font .progress-bar");
    const mainHeading = document.querySelector("#a11y-jimat-container-saturation-control .position-word span");
    const subHeading = document.querySelector("#a11y-jimat-container-saturation-control .sub-heading");
    const progressContainer = document.querySelector("#a11y-jimat-container-saturation-control .progress-bar-container");

    bars.forEach((bar) => {
      bar.classList.remove("filled");
      bar.style.backgroundColor = "";
      bar.style.transition = "";
    });

    if (mainHeading) mainHeading.textContent = "彩度の調整";
    if (subHeading) subHeading.style.display = "block";
    if (progressContainer) progressContainer.style.display = "none";

    fontBars.forEach((bar) => {
      bar.classList.remove("filled");
      bar.style.backgroundColor = "";
      bar.style.transition = "";
    });

  }


  // Function to reset all buttons and associated controls
  function resetAllBacthButtons() {
    const allButtons = document.querySelectorAll(".a11y-jimat-container-option1, .a11y-jimat-container-option2, .a11y-jimat-container-option3, .a11y-jimat-container-option4, .a11y-jimat-container-option5, .a11y-jimat-container-option6, .a11y-jimat-container-option7, .a11y-jimat-container-option8");

    // Deselect all buttons
    allButtons.forEach((button) => {
      button.classList.remove("active");
    });
  }








  // Function to handle button clicks
  function handleButtonClick(buttonSelector, additionalActions) {
    document.querySelector(buttonSelector).addEventListener("click", function () {
      // Reset all other buttons and controls
      resetAllSettings();

      // Toggle the current button
      this.classList.toggle("active");
      this.classList.toggle("selected");

      // Perform additional actions for the specific button
      if (typeof additionalActions === "function") {
        additionalActions();
      }
    });
  }



  // Function to disable all accessibility buttons
  function disableAccessibilityButtons() {
    const buttons = document.querySelectorAll("[class^='a11y-jimat-container-option']");

    buttons.forEach(button => {
      if (button.classList.contains("active")) {
        button.classList.remove("active", "selected");
      }
    });
  }

  //Full opage reader
  document.getElementById("a11y-jimat-container-screen-reader-btn").addEventListener("click", function () {
    // resetAllBacthButtons();
    executePredefinedStateKeys("a11y-jimat-container-screan-reader-function0");
    resetBatchSettingsStates();
    functionActions["a11y-jimat-container-screan-reader-function"]();
    printAllButtonStates();
    disableAccessibilityButtons()
  });




  // Selection read
  document.getElementById("a11y-jimat-container-text-reader-btn").addEventListener("click", function () {
    // resetAllBacthButtons();
    executePredefinedStateKeys("a11y-jimat-container-selection-reader-function0");
    resetBatchSettingsStates();
    functionActions["a11y-jimat-container-selection-reader-function"]();
    disableAccessibilityButtons();
    printAllButtonStates();
  });


  document.getElementById("a11y-jimat-container-virtual-keyboard-btn").addEventListener("click", function () {
    // resetAllBacthButtons();
    executePredefinedStateKeys("a11y-jimat-container-virtual-keyboard-function0");
    resetBatchSettingsStates();
    functionActions["a11y-jimat-container-virtual-keyboard-function"]();
    disableAccessibilityButtons();
    printAllButtonStates();
  });


  document.getElementById("a11y-jimat-container-keyboard-highlight-btn").addEventListener("click", function () {
    // resetAllBacthButtons();
    executePredefinedStateKeys();
    resetBatchSettingsStates();
    functionActions["a11y-jimat-container-keyboard-highlights-function"]();
    disableAccessibilityButtons();
    printAllButtonStates();
  });


  document.getElementById("a11y-jimat-container-voice-control-btn").addEventListener("click", function () {
    // resetAllBacthButtons();
    executePredefinedStateKeys();
    resetBatchSettingsStates();
    functionActions["a11y-jimat-container-voice-control-function"]();
    disableAccessibilityButtons();
    printAllButtonStates();
    functionActions["a11y-jimat-container-screan-reader-function0"]();
  });


  document.getElementById("a11y-jimat-container-saturation-control").addEventListener("click", function () {
    // resetAllBacthButtons();
    executePredefinedStateKeys("a11y-jimat-container-saturation-function0");
    resetBatchSettingsStates();
    functionActions["a11y-jimat-container-saturation-function"]();
    disableAccessibilityButtons();
    printAllButtonStates();
  });


  document.getElementById("a11y-jimat-container-increase-font").addEventListener("click", function () {
    // resetAllBacthButtons();
    executePredefinedStateKeys("a11y-jimat-container-font-size-function0");
    // resetBatchSettingsStates();
    functionActions["a11y-jimat-container-font-size-function"]();
    disableAccessibilityButtons();
    printAllButtonStates();
  });


  // Link Underline
  document.getElementById("a11y-jimat-container-link-underline-btn").addEventListener("click", function () {
    // resetAllBacthButtons();
    executePredefinedStateKeys();
    resetBatchSettingsStates();
    functionActions["a11y-jimat-container-link-underline-function"]();
    disableAccessibilityButtons();
    printAllButtonStates();
  });


  // Link Highlights
  document.getElementById("a11y-jimat-container-link-highlight-btn").addEventListener("click", function () {
    // resetAllBacthButtons();
    executePredefinedStateKeys();
    resetBatchSettingsStates();
    functionActions["a11y-jimat-container-link-highlight-function"]();
    disableAccessibilityButtons();
    printAllButtonStates();
  });



  document.getElementById("a11y-jimat-container-stop-animation-btn").addEventListener("click", function () {
    // resetAllBacthButtons();
    executePredefinedStateKeys("a11y-jimat-container-animation-stop-function0");
    resetBatchSettingsStates();
    functionActions["a11y-jimat-container-animation-stop-function"]();
    disableAccessibilityButtons();
    printAllButtonStates();
  });







  function updateButtonStyles(excludeKeys = []) {
    /////////////////////////////////////
    // "a11y-jimat-container-text-reader-btn" condition
    if (!excludeKeys.includes("a11y-jimat-container-text-reader-btn")) {
      const selectionreaderbutton = document.getElementById("a11y-jimat-container-text-reader-btn");
      let selectionreaderrectElement = selectionreaderbutton?.querySelector("rect");
      let selectionreaderpathElement = selectionreaderbutton?.querySelector("path");

      if (selectionreaderrectElement) selectionreaderrectElement.setAttribute("fill", "#190DED"); // Default Blue
      if (selectionreaderpathElement) selectionreaderpathElement.setAttribute("fill", "white"); // White
    }

    // "a11y-jimat-container-keyboard-highlight-btn" condition
    if (!excludeKeys.includes("a11y-jimat-container-keyboard-highlight-btn")) {
      const keyboard_highlight_button = document.getElementById("a11y-jimat-container-keyboard-highlight-btn");
      let keyboard_highlight_svg = keyboard_highlight_button?.querySelector("svg");

      if (keyboard_highlight_svg) {
        let keyboard_highlight_svgPath = keyboard_highlight_svg.querySelector("path");
        if (keyboard_highlight_svgPath) {
          keyboard_highlight_svgPath.setAttribute("fill", "#190DED");
        }
      }
    }

    // "a11y-jimat-container-link-underline-btn" condition
    if (!excludeKeys.includes("a11y-jimat-container-link-underline-btn")) {
      const link_underline_button = document.getElementById("a11y-jimat-container-link-underline-btn");

      let link_underline_rectElement = link_underline_button?.querySelector("rect");
      let link_underline_pathElement = link_underline_button?.querySelector("path");

      if (link_underline_rectElement) link_underline_rectElement.setAttribute("fill", "#190DED"); // Default Blue
      if (link_underline_pathElement) link_underline_pathElement.setAttribute("fill", "#190DED"); // Default Blue
    }

    // "a11y-jimat-container-link-highlight-btn" condition
    if (!excludeKeys.includes("a11y-jimat-container-link-highlight-btn")) {
      const link_highlight_button = document.getElementById("a11y-jimat-container-link-highlight-btn");

      let link_highlight_buttonrectElement = link_highlight_button?.querySelector("rect");
      let link_highlight_buttonpathElement = link_highlight_button?.querySelector("path");

      if (link_highlight_buttonrectElement) link_highlight_buttonrectElement.setAttribute("fill", "#190DED"); // Default Blue
      if (link_highlight_buttonpathElement) link_highlight_buttonpathElement.setAttribute("fill", "#190DED"); // Default Blue
    }

    // "a11y-jimat-container-stop-animation-btn" is not in the exclude list, so always execute
    if (!excludeKeys.includes("a11y-jimat-container-stop-animation-btn")) {
      const button = document.getElementById("a11y-jimat-container-stop-animation-btn");
      let circleElement = button?.querySelector("circle");
      let rectElements = button?.querySelectorAll("rect");

      if (circleElement) circleElement.setAttribute("fill", "#190DED"); // Default Blue
      rectElements?.forEach(rect => rect.setAttribute("fill", "white")); // White
    }
  }




  handleButtonClick(".a11y-jimat-container-option1", () => {



    //  Get the current state
    let currentState = getButtonState("a11y-jimat-container-option1");

    //  Toggle the state (0  1 or 1  0)
    let newState = currentState === 1 ? 0 : 1;


    //  Call the appropriate function
    if (newState === 1) {
      state_actions_enable["epilepsy_enable"]();
    } else {
      state_actions_disable["epilepsy_disable"]();
    }

    //  Verify if the change applied correctly
    let updatedState = getButtonState("a11y-jimat-container-option1");

    //  Ensure state actually changed
    if (updatedState !== newState) {
    }
    updateButtonStyles(["a11y-jimat-container-stop-animation-btn"]);
  });

  handleButtonClick(".a11y-jimat-container-option2", () => {



    //  Get the current state
    let currentState = getButtonState("a11y-jimat-container-option2");

    //  Toggle the state (0  1 or 1  0)
    let newState = currentState === 1 ? 0 : 1;

    //  Call the appropriate function
    if (newState === 1) {
      state_actions_enable["adhd_enable"]();
    } else {
      state_actions_disable["adhd_disable"]();
    }

    //  Verify if the change applied correctly
    let updatedState = getButtonState("a11y-jimat-container-option2");

    //  Ensure state actually changed
    if (updatedState !== newState) {
    }

    updateButtonStyles(["a11y-jimat-container-text-reader-btn", "a11y-jimat-container-stop-animation-btn"]);
  });

  handleButtonClick(".a11y-jimat-container-option3", () => {

    //  Get the current state
    let currentState = getButtonState("a11y-jimat-container-option3");

    //  Toggle the state (0  1 or 1  0)
    let newState = currentState === 1 ? 0 : 1;


    //  Call the appropriate function
    if (newState === 1) {
      state_actions_enable["color_blindness_enable"]();
    } else {
      state_actions_disable["color_blindness_disable"]();
    }

    //  Verify if the change applied correctly
    let updatedState = getButtonState("a11y-jimat-container-option3");

    //  Ensure state actually changed
    if (updatedState !== newState) {
    }

    updateButtonStyles([]);
  });




  handleButtonClick(".a11y-jimat-container-option4", () => {

    //  Get the current state
    let currentState = getButtonState("a11y-jimat-container-option4");

    //  Toggle the state (0  1 or 1  0)
    let newState = currentState === 1 ? 0 : 1;

    //  Call the appropriate function
    if (newState === 1) {
      state_actions_enable["blind_enable"]();
    } else {
      state_actions_disable["blind_disable"]();
    }

    //  Verify if the change applied correctly
    let updatedState = getButtonState("a11y-jimat-container-option4");

    //  Ensure state actually changed
    if (updatedState !== newState) {
    }
    updateButtonStyles([]);
  });


  handleButtonClick(".a11y-jimat-container-option5", () => {

    //  Get the current state
    let currentState = getButtonState("a11y-jimat-container-option5");

    //  Toggle the state (0  1 or 1  0)
    let newState = currentState === 1 ? 0 : 1;


    //  Call the appropriate function
    if (newState === 1) {
      state_actions_enable["low_vision_enable"]();
    } else {
      state_actions_disable["low_vision_disable"]();
    }

    //  Verify if the change applied correctly
    let updatedState = getButtonState("a11y-jimat-container-option5");

    //  Ensure state actually changed
    if (updatedState !== newState) {
    }
    updateButtonStyles(["a11y-jimat-container-text-reader-btn"]);
  });

  handleButtonClick(".a11y-jimat-container-option6", () => {

    //  Get the current state
    let currentState = getButtonState("a11y-jimat-container-option6");

    //  Toggle the state (0  1 or 1  0)
    let newState = currentState === 1 ? 0 : 1;

    //  Call the appropriate function
    if (newState === 1) {
      state_actions_enable["dyslexia_enable"]();
    } else {
      state_actions_disable["dyslexia_disable"]();
    }

    //  Verify if the change applied correctly
    let updatedState = getButtonState("a11y-jimat-container-option6");

    //  Ensure state actually changed
    if (updatedState !== newState) {
    }

    updateButtonStyles(["a11y-jimat-container-stop-animation-btn"]);
  });





  handleButtonClick(".a11y-jimat-container-option7", () => {

    //  Get the current state
    let currentState = getButtonState("a11y-jimat-container-option7");

    //  Toggle the state (0  1 or 1  0)
    let newState = currentState === 1 ? 0 : 1;


    //  Call the appropriate function
    if (newState === 1) {
      state_actions_enable["movement_disorder_enable"]();
    } else {
      state_actions_disable["movement_disorder_disable"]();
    }

    //  Verify if the change applied correctly
    let updatedState = getButtonState("a11y-jimat-container-option7");

    //  Ensure state actually changed
    if (updatedState !== newState) {
    }
    updateButtonStyles([]);
  });




  handleButtonClick(".a11y-jimat-container-option8", () => {




    //  Get the current state
    let currentState = getButtonState("a11y-jimat-container-option8");

    //  Toggle the state (0  1 or 1  0)
    let newState = currentState === 1 ? 0 : 1;

    //  Apply the new state
    setMultipleButtonStates([
      ["a11y-jimat-container-option8", newState],
      ["a11y-jimat-container-text-reader-btn", newState]
    ]);

    //  Call the appropriate function
    if (newState === 1) {
      state_actions_enable["focal_learning_disorder_enable"]();
    } else {
      state_actions_disable["focal_learning_disorder_disable"]();
    }

    //  Verify if the change applied correctly
    let updatedState = getButtonState("a11y-jimat-container-option8");

    //  Ensure state actually changed
    if (updatedState !== newState) {
    }
    updateButtonStyles(["a11y-jimat-container-text-reader-btn"]);
  });






  document.getElementById("a11y-jimat-container-reset").addEventListener("click", function () {
    resetAllButtonStatesToZero();
    resetAllSettings();
    updateButtonStyles([]);
  });


  function resetAllSettings() {
    // resetAllButtonStates();
    resetAllButtons();
    // Reset all buttons
    const allButtons = document.querySelectorAll(
      ".a11y-jimat-container-option1, .a11y-jimat-container-option2, .a11y-jimat-container-option3, .a11y-jimat-container-option4, .a11y-jimat-container-option5, .a11y-jimat-container-option6, .a11y-jimat-container-option7, .a11y-jimat-container-option8"
    );

    allButtons.forEach((button) => {
      button.classList.remove("active", "selected", "clicked");
    });


    // Reset all Action buttons
    // Remove 'selected', 'clicked', 'active' from all action buttons
    const actionButtonIds = [
      "a11y-jimat-container-screen-reader-btn",
      "a11y-jimat-container-text-reader-btn",
      "a11y-jimat-container-saturation-control",
      "a11y-jimat-container-increase-font",
      "a11y-jimat-container-link-underline-btn",
      "a11y-jimat-container-link-highlight-btn",
      "a11y-jimat-container-stop-animation-btn",
      "a11y-jimat-container-virtual-keyboard-btn",
      "a11y-jimat-container-keyboard-highlight-btn",
      "a11y-jimat-container-voice-control-btn"
    ];

    actionButtonIds.forEach((buttonId) => {
      const buttonElement = document.getElementById(buttonId);
      if (buttonElement) {
        buttonElement.classList.remove("selected", "clicked", "active");

        // Remove checkmark icon if it exists
        let existingSvg = buttonElement.querySelector(".checkmark-icon-container");
        if (existingSvg) {
          existingSvg.remove();
        }
      }
    });

    [
      "a11y-jimat-container-reset-text-to-speech",
      "a11y-jimat-container-reset-text-selection-reader",
      "a11y-jimat-container-reset-saturation-control",
      "a11y-jimat-container-reset-font",
      "a11y-jimat-container-reset-link-underline",
      "a11y-jimat-container-reset-link-highlight",
      "a11y-jimat-container-reset-enable-animations",
      "a11y-jimat-container-reset-enable-virtual-keybaord",
      "a11y-jimat-container-reset-enable-keybaord-operation-highlights",
      "a11y-jimat-container-reset-enable-voice-controls"
    ].forEach(actionKey => {
      if (resetActions[actionKey]) {
        resetActions[actionKey]();
      } else {
      }
    });


  }

  /**
   * Resets the font increase settings.
   */
  function resetFontIncrease() {
    const bars = document.querySelectorAll("#a11y-jimat-container-increase-font .progress-bar");
    const mainHeading = document.querySelector("#a11y-jimat-container-increase-font .position-word span");
    const subHeading = document.querySelector("#a11y-jimat-container-increase-font .sub-heading");
    const progressContainer = document.querySelector("#a11y-jimat-container-increase-font .progress-bar-container");
    const fontControl = document.getElementById("a11y-jimat-container-increase-font");

    bars.forEach((bar) => bar.classList.remove("filled")); // Clear progress
    if (mainHeading) mainHeading.textContent = "文字の拡大"; // Reset text
    if (subHeading) subHeading.style.display = "block"; // Show subheading
    if (progressContainer) progressContainer.style.display = "none"; // Hide progress bar

    if (fontControl) {
      fontControl.classList.remove("selected", "clicked");

      // Remove checkmark icon if exists
      const existingSvg = fontControl.querySelector(".checkmark-icon-container");
      if (existingSvg) existingSvg.remove();
    }
  }
}



// Function to update the screen reader button state
function updateScreenReaderButtonState() {
  const stateValue = getButtonState("a11y-jimat-container-screen-reader-btn");

  switch (stateValue) {
    case 0:
      functionActions["a11y-jimat-container-screan-reader-function0"](); 
      break;
    case 1:
      functionActions["a11y-jimat-container-screan-reader-function1"](); 
      break;
    default:
      break;
  }
}


// Function to update the text reader button state
function updateTextReaderButtonState() {
  const stateValue = getButtonState("a11y-jimat-container-text-reader-btn");
  switch (stateValue) {
    case 0:
      functionActions["a11y-jimat-container-selection-reader-function0"](); 
      break;
    case 1:
      functionActions["a11y-jimat-container-selection-reader-function1"](); 
      break;
    default:
      break;
  }
}

// Function to update the virtual keyboard button state
function updateVirtualKeyboardButtonState() {
  const stateValue = getButtonState("a11y-jimat-container-virtual-keyboard-btn");
  switch (stateValue) {
    case 0:
      functionActions["a11y-jimat-container-virtual-keyboard-function0"](); 
      break;
    case 1:
      functionActions["a11y-jimat-container-virtual-keyboard-function1"](); 
      break;
    default:
      break;
  }
}

// Function to update the keyboard highlight button state
function updateKeyboardHighlightButtonState() {
  const stateValue = getButtonState("a11y-jimat-container-keyboard-highlight-btn");
  switch (stateValue) {
    case 0:
      functionActions["a11y-jimat-container-keyboard-highlights-function0"](); 
      break;
    case 1:
      functionActions["a11y-jimat-container-keyboard-highlights-function1"](); 
      break;
    default:
      break;
  }
}

// Function to update the voice control button state
function updateVoiceControlButtonState() {
  const stateValue = getButtonState("a11y-jimat-container-voice-control-btn");
  switch (stateValue) {
    case 0:
      functionActions["a11y-jimat-container-voice-control-function0"](); 
      break;
    case 1:
      functionActions["a11y-jimat-container-voice-control-function1"](); 
      break;
    default:
      break;
  }
}



// Function to update the saturation control button state based on stored state value
function updateSaturationControlButtonState() {
  const stateValue = getButtonState("a11y-jimat-container-saturation-control"); // Read the stored state

  switch (stateValue) {
    case 0:
      functionActions["a11y-jimat-container-saturation-function0"](); break;
    case 1:
      functionActions["a11y-jimat-container-saturation-function1"]();
      break;
    case 2:
      functionActions["a11y-jimat-container-saturation-function2"]();
      break;
    case 3:
      functionActions["a11y-jimat-container-saturation-function3"]();
      break;
    default:
      break;
  }

}

// Function to update the font increase button state based on stored state
function updateIncreaseFontButtonState() {
  const stateValue = getButtonState("a11y-jimat-container-increase-font"); // Read stored state

  switch (stateValue) {
    case 0:
      functionActions["a11y-jimat-container-font-size-function0"]();
      break;
    case 1:
      functionActions["a11y-jimat-container-font-size-function1"]();
      break;
    case 2:
      functionActions["a11y-jimat-container-font-size-function2"]();
      break;
    case 3:
      functionActions["a11y-jimat-container-font-size-function3"]();
      break;
    case 4:
      functionActions["a11y-jimat-container-font-size-function4"]();
      break;

    default:
      break;
  }
}


// Function to update the link underline button state
function updateLinkUnderlineButtonState() {
  const stateValue = getButtonState("a11y-jimat-container-link-underline-btn");
  switch (stateValue) {
    case 0:
      functionActions["a11y-jimat-container-link-underline-function0"]();
      break;
    case 1:
      functionActions["a11y-jimat-container-link-underline-function1"]();
      break;
    default:
      break;
  }
}

// Function to update the link highlight button state
function updateLinkHighlightButtonState() {
  const stateValue = getButtonState("a11y-jimat-container-link-highlight-btn");
  switch (stateValue) {
    case 0:
      functionActions["a11y-jimat-container-link-highlight-function0"]();
      break;
    case 1:
      functionActions["a11y-jimat-container-link-highlight-function1"]();
      break;
    default:
      break;
  }
}

// Function to update the stop animation button state
function updateStopAnimationButtonState() {
  const stateValue = getButtonState("a11y-jimat-container-stop-animation-btn");
  switch (stateValue) {
    case 0:
      functionActions["a11y-jimat-container-animation-stop-function0"]();
      break;
    case 1:
      functionActions["a11y-jimat-container-animation-stop-function1"]();
      break;
    default:
      break;
  }
}


// Function to update all "a11y-jimat-container-option" button states
export function updateAllButtonStates() {


  console.log("first one is got executed");
const buttonKeys = [
  "a11y-jimat-container-option1",
  "a11y-jimat-container-option2",
  "a11y-jimat-container-option3",
  "a11y-jimat-container-option4",
  "a11y-jimat-container-option5",
  "a11y-jimat-container-option6",
  "a11y-jimat-container-option7",
  "a11y-jimat-container-option8"
];

buttonKeys.forEach((buttonKey) => {
  const stateValue = getButtonState(buttonKey); // Read state from localStorage or default
  const button = document.querySelector(`.${buttonKey}`);

  if (!button) return;

  if (stateValue === 1) {
    button.classList.add("active", "selected", "clicked");
  } else {
    button.classList.remove("active", "selected", "clicked");
  }
});



console.log("first one is got Done executed");
}

// Function to update all additional button states
export function updateAdditionalButtonStates() {

  console.log("secoond one is got executed");
updateScreenReaderButtonState();
updateTextReaderButtonState();
updateVirtualKeyboardButtonState();
updateKeyboardHighlightButtonState();
updateVoiceControlButtonState();
updateSaturationControlButtonState();
updateIncreaseFontButtonState();
updateLinkUnderlineButtonState();
updateLinkHighlightButtonState();
updateStopAnimationButtonState();
console.log("second one is got Done executed");
}