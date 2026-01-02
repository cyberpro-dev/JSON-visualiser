import { buildTree, maxDepth } from "./system.js";
import { searchTree } from "./search_helper.js";

const input = document.getElementById("input");
const treeView = document.getElementById("treeView");
const rawView = document.getElementById("rawView");
const depthInfo = document.getElementById("depthInfo");
const search = document.getElementById("search");

const searchModeLabel = document.getElementById("searchModeLabel");
const searchDropdown = document.getElementById("searchDropdown");

const modeButtons = document.querySelectorAll(".modes button");

let tree = null;
let visualMode = "visual";
let searchMode = "entry";

// Visual mode buttons
modeButtons.forEach(btn => {
  btn.onclick = () => {
    modeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    visualMode = btn.dataset.mode;
    render();
  };
});

// Search dropdown
searchModeLabel.addEventListener("click", () => {
  searchDropdown.style.display = searchDropdown.style.display === "block" ? "none" : "block";
});

searchDropdown.querySelectorAll("div").forEach(div => {
  div.addEventListener("click", () => {
    searchMode = div.dataset.mode;
    searchModeLabel.textContent = `${div.textContent} ▾`;
    searchDropdown.style.display = "none";
    render();
  });
});

// Input JSON
input.addEventListener("input", () => {
  try {
    const json = JSON.parse(input.value);
    rawView.textContent = JSON.stringify(json, null, 2);
    tree = buildTree(json);
    depthInfo.textContent = `Max depth: ${maxDepth(tree)}`;
    render();
  } catch {
    treeView.innerHTML = "";
    rawView.textContent = "";
    depthInfo.textContent = "";
  }
});

// Search
search.addEventListener("input", render);

function render() {
  if (!tree) return;

  treeView.style.display = visualMode === "raw" ? "none" : "block";
  rawView.style.display = visualMode === "raw" ? "block" : "none";

  if (visualMode === "raw") return;

  treeView.innerHTML = "";
  const term = search.value.trim();
  const matches = searchTree(tree, term, searchMode);

  renderNode(tree, treeView, 0, matches);
}

function renderNode(node, container, depth = 0, matches = []) {
  node.children?.forEach(child => {
    const el = document.createElement("div");
    el.className = "node";

    const toggle = document.createElement("span");
    toggle.className = "toggle";
    toggle.textContent = child.children.length > 0 ? "▸" : " ";
    el.appendChild(toggle);

    const key = document.createElement("span");
    key.className = "key";

    // Determine visual mode text
    if (visualMode === "types") key.textContent = `${child.key} : ${child.valueType}`;
    else if (visualMode === "visualValue") key.textContent = child.children.length === 0 ? `${child.key} : ${child.value}` : child.key;
    else key.textContent = child.key;

    // Highlight search matches
    if (matches.length && matches.some(path => path.includes(child.path.join(".")))) key.classList.add("highlight");

    el.appendChild(key);

    const childContainer = document.createElement("div");
    childContainer.className = "children";
    el.appendChild(childContainer);
    container.appendChild(el);

    const isMatchOrAncestor = matches.some(path => path.includes(child.path.join(".")));
    if (matches.length > 0) {
      childContainer.style.display = isMatchOrAncestor ? "block" : "none";
      toggle.textContent = childContainer.style.display === "block" ? "▾" : "▸";
    } else {
      childContainer.style.display = child.depth < 3 ? "block" : "none";
      toggle.textContent = childContainer.style.display === "block" ? "▾" : "▸";
    }

    toggle.addEventListener("click", () => {
      if (childContainer.style.display === "none") {
        childContainer.style.display = "block";
        toggle.textContent = "▾";
      } else {
        childContainer.style.display = "none";
        toggle.textContent = "▸";
      }
    });

    renderNode(child, childContainer, depth + 1, matches);
  });
}