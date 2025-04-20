
let searchResults = [];
let currentSearchIndex = -1;

// Function to inject CSS dynamically
function injectSearchStyles() {
    if (!document.getElementById("searchHighlightStyles")) {
        const style = document.createElement("style");
        style.id = "searchHighlightStyles";
        style.innerHTML = `
            .highlight-search {
                background-color: yellow !important;
                color: black !important;
                font-weight: bold;
                padding: 2px;
                border-radius: 3px;
            }
            .highlight-current {
                background-color: orange !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Function to highlight all occurrences of a search term
function highlightSearch(term) {
    if (!term) return;

    injectSearchStyles(); // Ensure styles are injected

    // Reset previous highlights
    clearHighlights();

    searchResults = [];

    // Find all visible text nodes and highlight matches
    let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let nodesToReplace = [];

    while (walker.nextNode()) {
        let node = walker.currentNode;
        let parent = node.parentNode;

        // Skip script, style, hidden, and excluded elements
        if (["SCRIPT", "STYLE"].includes(parent.tagName) || parent.classList.contains("a11y-jimat-container-ignore") || window.getComputedStyle(parent).display === "none") {
            continue;
        }

        let regex = new RegExp(`(${term})`, "gi");
        if (regex.test(node.nodeValue)) {
            nodesToReplace.push({ node, regex });
        }
    }

    nodesToReplace.forEach(({ node, regex }) => {
        let span = document.createElement("span");
        span.innerHTML = node.nodeValue.replace(regex, `<span class="highlight-search">$1</span>`);
        node.replaceWith(span);
    });

    searchResults = [...document.querySelectorAll(".highlight-search")];

    if (searchResults.length > 0) {
        currentSearchIndex = 0;
        focusSearchResult();
    } else {
        console.log(`No results found for: ${term}`);
    }
}

// Function to focus on the current search result
function focusSearchResult() {
    if (searchResults.length > 0) {
        searchResults.forEach(el => el.classList.remove("highlight-current")); // Reset all
        searchResults[currentSearchIndex].classList.add("highlight-current"); // Highlight current
        searchResults[currentSearchIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

// Function to clear previous highlights
function clearHighlights() {
    document.querySelectorAll(".highlight-search").forEach(el => {
        el.replaceWith(el.innerText);
    });

    searchResults = [];
    currentSearchIndex = -1;
}

// Function to move to the next search result
function findNext() {
    if (searchResults.length > 0) {
        currentSearchIndex = (currentSearchIndex + 1) % searchResults.length;
        focusSearchResult();
    } else {
        console.log("No search results to navigate.");
    }
}

// Function to move to the previous search result
function findPrevious() {
    if (searchResults.length > 0) {
        currentSearchIndex = (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
        focusSearchResult();
    } else {
        console.log("No search results to navigate.");
    }
}

// Export all functions in an inline manner
export { highlightSearch, findNext, findPrevious, clearHighlights };
