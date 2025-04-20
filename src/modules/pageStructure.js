const PageStructureAnalyzer = {
  init() {
    this.createStructurePanel();
    this.analyzePageStructure();
  },

  createStructurePanel() {
    // Create the main container
    const container = this.createContainer();

    // Create the header
    const header = this.createHeader();

    // Create the content container
    const content = this.createContentContainer();

    // Create the tabs
    const tabs = this.createTabs();

    // Assemble the panel
    container.appendChild(header);
    container.appendChild(tabs);
    container.appendChild(content);
    document.head.appendChild(this.createTabStyles());
    document.body.appendChild(container);

    // Add event listeners
    this.addCloseListener(container);
    this.addTabSwitchListener(tabs);
    this.addElementClickListeners(content);
  },

  createContainer() {
    const container = document.createElement("div");
    container.id = "page-structure-panel";
    container.style.cssText = `
      position: fixed; 
      top: 50%; 
      left: 50%; 
      transform: translate(-50%, -50%);
      width: 300px; 
      max-height: 80vh; 
      background: white; 
      border: 1px solid #ccc; 
      border-radius: 4px; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
      overflow-y: auto; 
      z-index: 9999;
    `;
    return container;
  },

  createHeader() {
    const header = document.createElement("div");
    header.style.cssText = `
      background: #0066cc;
      color: white;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    header.innerHTML = `
      <span>Page Structure</span>
      <button id="close-structure-panel" style="
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
      ">×</button>
    `;
    return header;
  },

  createContentContainer() {
    const content = document.createElement("div");
    content.id = "structure-content";
    content.style.padding = "15px";
    return content;
  },

  createTabs() {
    const tabs = document.createElement("div");
    tabs.style.cssText = `
      display: flex;
      border-bottom: 1px solid #ccc;
      margin-bottom: 15px;
    `;
    tabs.innerHTML = `
      <button class="structure-tab active" data-tab="headings">Headings</button>
      <button class="structure-tab" data-tab="landmarks">Landmarks</button>
      <button class="structure-tab" data-tab="links">Links</button>
    `;
    return tabs;
  },

  createTabStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .structure-tab {
        padding: 8px 15px;
        border: none;
        background: none;
        cursor: pointer;
      }
      .structure-tab.active {
        border-bottom: 2px solid #0066cc;
        color: #0066cc;
      }
      .structure-section {
        display: none;
      }
      .structure-section.active {
        display: block;
      }
      .element-item {
        padding: 5px 0;
        border-bottom: 1px solid #eee;
      }
      .heading-level {
        display: inline-block;
        padding: 2px 6px;
        background: #e0e0e0;
        border-radius: 3px;
        margin-right: 8px;
        font-size: 12px;
      }
    `;
    return style;
  },

  addCloseListener(container) {
    document
      .getElementById("close-structure-panel")
      .addEventListener("click", () => {
        container.remove();
      });
  },

  addTabSwitchListener(tabs) {
    tabs.addEventListener("click", (e) => {
      if (e.target.classList.contains("structure-tab")) {
        document
          .querySelectorAll(".structure-tab")
          .forEach((tab) => tab.classList.remove("active"));
        e.target.classList.add("active");
        this.analyzePageStructure(e.target.dataset.tab);
      }
    });
  },

  addElementClickListeners(content) {
    content.addEventListener("click", (e) => {
      if (e.target.classList.contains("element-item")) {
        const elementText = e.target.textContent.trim();
        const element = this.findElementByText(elementText);
        
        if (element) {
          // For links, open in new tab
          if (element.tagName.toLowerCase() === 'a') {
            const linkUrl = element.href;
            window.open(linkUrl, '_blank', 'noopener,noreferrer');
          } 
          // For other elements, scroll into view
          else {
            element.scrollIntoView({ 
              behavior: "smooth", 
              block: "center" 
            });
            
            // Optional: Briefly highlight the element
            element.style.transition = 'background-color 0.5s ease';
            element.style.backgroundColor = 'rgba(0, 102, 204, 0.2)';
            setTimeout(() => {
              element.style.backgroundColor = '';
            }, 1000);
          }
        }
      }
    });
  },

  findElementByText(text) {
    const elements = document.body.getElementsByTagName("*");
    for (let element of elements) {
      if (element.textContent.trim() === text.trim()) {
        return element;
      }
    }
    return null;
  },

  analyzePageStructure(activeTab = "headings") {
    const content = document.getElementById("structure-content");
    content.innerHTML = "";

    // Create sections
    const sections = {
      headings: document.createElement("div"),
      landmarks: document.createElement("div"),
      links: document.createElement("div"),
    };

    Object.keys(sections).forEach((key) => {
      sections[key].className = `structure-section ${
        key === activeTab ? "active" : ""
      }`;
    });

    // Analyze the page
    this.processElements(sections);

    // Add sections to content
    Object.values(sections).forEach((section) => content.appendChild(section));
  },

  processElements(sections) {
    const elements = document.body.getElementsByTagName("*");
    const controlPanel = document.getElementById("a11y-jimat-container-control-panel");

    for (let element of elements) {
      // Skip elements inside the control panel
      if (controlPanel && controlPanel.contains(element)) continue;

      // Process headings
      if (/^h[1-6]$/i.test(element.tagName)) {
        this.addHeadingItem(sections.headings, element);
      }

      // Process landmarks
      if (this.isLandmark(element)) {
        this.addLandmarkItem(sections.landmarks, element);
      }

      // Process links
      if (element.tagName.toLowerCase() === "a" && element.href) {
        this.addLinkItem(sections.links, element);
      }
    }
  },

  addHeadingItem(headingsSection, element) {
    const headingItem = document.createElement("div");
    headingItem.className = "element-item";
    headingItem.innerHTML = `
      <span class="heading-level">${element.tagName}</span>
      <span>${element.textContent.trim()}</span>
    `;
    headingsSection.appendChild(headingItem);
  },

  addLandmarkItem(landmarksSection, element) {
    const landmarkItem = document.createElement("div");
    landmarkItem.className = "element-item";
    landmarkItem.textContent = `${element.tagName.toLowerCase()}${
      element.hasAttribute("role")
        ? ` (role="${element.getAttribute("role")}")`
        : ""
    }`;
    landmarksSection.appendChild(landmarkItem);
  },

  addLinkItem(linksSection, element) {
    const linkItem = document.createElement("div");
    linkItem.className = "element-item";
    linkItem.textContent = element.textContent.trim() || element.href;
    linkItem.dataset.href = element.href;
    linksSection.appendChild(linkItem);
  },

  isLandmark(element) {
    return (
      element.hasAttribute("role") ||
      [
        "main",
        "nav",
        "header",
        "footer",
        "aside",
        "article",
        "section",
      ].includes(element.tagName.toLowerCase())
    );
  },
};

export default PageStructureAnalyzer;
