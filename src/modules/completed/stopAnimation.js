let animationStyle = null;
let storedIntervals = new Set();
let pausedVideos = [];
let debounceTimeout = null;
let animationDisabled = false; // Keeps track of animation state

/**
 * Debounce function to delay execution.
 * Ensures only the last action detected within 500ms is executed.
 */
function debounce(func) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        func();
    }, 500);
}

/**
 * Handles toggling animations with debounce.
 * Prevents redundant calls when the state is already set.
 * @param {boolean} shouldEnable - True to enable animations, false to disable
 */
function toggleAnimations(shouldEnable) {
    if (shouldEnable === animationDisabled) {
        return; // Skip execution if already in the desired state
    }
    
    debounce(() => {
        animationDisabled = !shouldEnable;
        shouldEnable ? enableAnimations() : disableAnimations();
    });
}

/**
 * Disables all animations (CSS-based and JavaScript-based) globally.
 * Also pauses all videos on the page.
 */
export function disableAnimations() {
    if (animationDisabled) {
        return;
    }

    animationDisabled = true;

    if (!animationStyle) {
        animationStyle = document.createElement("style");
        animationStyle.id = "disableAnimationsStyle";
        animationStyle.innerHTML = `
            * {
                animation: none !important;
                transition: none !important;
            }
            @keyframes none { from { opacity: 1; } to { opacity: 1; } }
        `;
        document.head.appendChild(animationStyle);
    }

    stopJSAnimations();
    pauseAllVideos();
}

/**
 * Enables all animations globally by removing the style block and resuming paused videos.
 */
export function enableAnimations() {
    if (!animationDisabled) {
        return;
    }

    animationDisabled = false;

    if (animationStyle) {
        animationStyle.remove();
        animationStyle = null;
    }

    resumeJSAnimations();
    resumeAllVideos();
}

/**
 * Stops JavaScript-based animations like requestAnimationFrame & setInterval.
 */
function stopJSAnimations() {
    
    storedIntervals.forEach(clearInterval);
    storedIntervals.clear();

    let highestIntervalId = setInterval(() => {}, 0);
    while (highestIntervalId > 0) {
        clearInterval(highestIntervalId);
        storedIntervals.add(highestIntervalId);
        highestIntervalId--;
    }

    // Disable requestAnimationFrame without overriding original functionality
    window.cancelAnimationFrame = function () {};
}

/**
 * Resumes JavaScript-based animations by restoring requestAnimationFrame and intervals.
 */
function resumeJSAnimations() {

    storedIntervals.forEach(clearInterval);
    storedIntervals.clear();

    // Restore requestAnimationFrame functionality
    window.cancelAnimationFrame = window.requestAnimationFrame;
}

/**
 * Pauses all playing videos on the page and stores them in an array.
 */
function pauseAllVideos() {
    pausedVideos = [];
    document.querySelectorAll("video").forEach(video => {
        if (!video.paused) {
            video.pause();
            pausedVideos.push(video);
        }
    });
}

/**
 * Resumes all videos that were paused by the disableAnimations function.
 */
function resumeAllVideos() {
    pausedVideos.forEach(video => {
        video.play().catch(err => {
            console.warn('Video could not be resumed:', err);
        });
    });
    pausedVideos = [];
}


