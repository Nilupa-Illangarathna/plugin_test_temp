import {
  setOption,
  getOption,
  setOriginalStyles,
  getOriginalStyles,
  saveState,
} from "../util/stateManager.js";

// Get all elements with images, excluding control panel
function getElementsWithImages() {
  const controlPanel = document.getElementById("a11y-jimat-container-control-panel");
  const allElements = document.querySelectorAll("*");
  const imageElements = [];

  allElements.forEach((element) => {
    // Exclude control panel and its children
    let currentElement = element;
    let isExcluded = false;
    while (currentElement) {
      if (currentElement === controlPanel) {
        isExcluded = true;
        break;
      }
      currentElement = currentElement.parentElement;
    }
    if (isExcluded) return;

    // Check if element is an image or has background image
    const computedStyle = window.getComputedStyle(element);
    const isImg = element.tagName.toLowerCase() === 'img';
    const hasBackgroundImage = computedStyle.backgroundImage !== 'none';

    if (isImg || hasBackgroundImage) {
      imageElements.push(element);
    }
  });

  return imageElements;
}

export function toggleHideImage() {
  // Get the current state
  const hideImages = getOption("hideImage");
  
  // Toggle the state
  setOption("hideImage", !hideImages);
  
  // Get or initialize the stored styles
  let originalStyles = getOriginalStyles();

  // Get all elements with images
  const imageElements = getElementsWithImages();

  if (hideImages) {
    // Hide images and store original values
    imageElements.forEach((element) => {
      const computedStyle = window.getComputedStyle(element);
      const isImg = element.tagName.toLowerCase() === 'img';
      
      // Store styles for this element
      if (!originalStyles.hasOwnProperty('images')) {
        originalStyles.images = {
          elements: []
        };
      }

      // Check if element styles are already stored
      const existingElementIndex = originalStyles.images.elements.findIndex(
        item => item.element === element
      );

      if (existingElementIndex === -1) {
        // Store new element styles
        originalStyles.images.elements.push({
          element: element,
          styles: {
            display: isImg ? computedStyle.display : null,
            backgroundImage: isImg ? null : computedStyle.backgroundImage
          }
        });
      }

      // Hide images
      if (isImg) {
        element.style.display = "none";
      } else {
        element.style.backgroundImage = "none";
      }
    });
  } else {
    // Re-enable images using stored values
    if (originalStyles.images && originalStyles.images.elements) {
      originalStyles.images.elements.forEach(item => {
        if (item.element && item.styles) {
          if (item.styles.display) {
            item.element.style.display = item.styles.display;
          } else if (item.styles.backgroundImage) {
            item.element.style.backgroundImage = item.styles.backgroundImage;
          }
        }
      });
    }
  }

  // Update stored styles
  setOriginalStyles(originalStyles);
  
  // Save the state
  saveState();
}
