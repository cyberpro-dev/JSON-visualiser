# API Visualiser

An interactive, high-performance JSON visualiser designed to transform complex API responses into navigable, human-readable tree structures.

## 🚀 Project Overview
The **API Visualiser** is a tool built for developers to parse, explore, and debug JSON data with ease. It moves beyond static text, offering a mobile-friendly interface for deep data inspection.

### Key Features
* **Multiple Visual Modes:** Toggle between Raw, Visual, Visual+Value, and Visual+Types.
* **Smart Search:** Multi-mode filtering by Entry (keys), Value, or both.
* **Deep Navigation:** Collapsible/expandable nodes with recursive depth calculation.
* **Responsive UI:** Optimized for both desktop and mobile workflows.
* **Live Feedback:** Tracks maximum JSON depth and complexity in real-time.

---

## 🛠 Technical Architecture

### 1. Structure & Styling
* **HTML5:** Semantic structure using `<header>` for controls and `<main>` for dual-view data rendering.
* **CSS3:** A custom dark-theme interface with responsive layouts. 
    * **Interactive Toggles:** Visual indicators (`▸` vs `▾`) for collapsible states.
    * **Indentation:** Dynamic hierarchy using `margin-left` recursion.
    * **Highlighting:** Dedicated `.highlight` classes for search results.

### 2. Logic Engines
The application is modularized for clarity and performance:

| File | Responsibility |
| :--- | :--- |
| **`system.js`** | **Tree Logic:** Recursively converts JSON into a node object (key, value, type, depth, path). |
| **`script.js`** | **UI & Rendering:** Manages DOM events, recursive node generation, and visual mode switching. |
| **`search_helper.js`** | **Search Logic:** Traverses the tree to find matches and returns path arrays to auto-expand branches. |
| **`system.js`** | **Search Logic:** Handles some internal logic such as JSON parsing. |

---

## 🔍 How It Works

### Data Flow
1.  **Input:** User pastes JSON into the textarea.
2.  **Validation:** `JSON.parse` validates input $\rightarrow$ `buildTree()` creates the internal model.
3.  **Analysis:** `maxDepth()` calculates hierarchy complexity for the UI.
4.  **Rendering:** The `render()` function determines visibility based on search terms and visual modes, generating HTML nodes recursively.

### Search & Interaction
When a search term is entered, the visualiser:
* Collapses all non-matching branches by default.
* Traverses the tree to find keys/values containing the term.
* **Force-expands** only the ancestral paths leading to the matches.
* Applies visual highlighting to the specific matched strings.

---

## 📱 Mobile & UX Considerations
* **Touch Friendly:** Large toggle icons and buttons for mobile users.
* **Responsive Layout:** Textareas resize and mode buttons wrap automatically on small screens.
* **Depth Tracking:** The `#depthInfo` display provides immediate feedback on data complexity.

---

## ⚖️ License
This project is licensed under **AGPLv3**. 
* Any use of a modified version over a network **must** expose the source code.
* Encourages open-source contribution for web-based deployments.

---

## 📦 Getting Started

### Latest Release
Download the latest stable version here:
👉 **[Latest Release - JSON Visualiser](https://github.com/cyberpro-dev/JSON-visualiser/releases/latest)**

### Local Setup
1.  Clone the repository.
2.  Open `index.html` in any modern web browser.
3.  Paste your API response and begin visualising!
