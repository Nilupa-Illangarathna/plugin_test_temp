export function toggleButtonActive(buttonClass, action, batch_setting = false) {
    let attempts = 0;
    const maxAttempts = 50; // Maximum retries to avoid infinite loop
    const interval = 10; // Time between retries (in milliseconds)

    const classToToggle = batch_setting ? "active" : "selected"; // Determine the class

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
