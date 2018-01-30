require("./dom_node_collection");

const _docReadyCallbacks = [];
const _docReady = false;

const $l = (arg) => {
  if (arg instanceof HTMLElement) {
    let arr = [];
    arr.push(arg);
    let nodeCollection = new DOMNodeCollection(arr);
    return nodeCollection;
  } else if (typeof arg === "function") {
    if (!_docReady) {
      _docReadyCallbacks.push(arg);
    } else {
      arg();
    }
  }
}

$l.extend = (base, ...otherObjs) => {
  otherObjs,forEach((obj) => {
    for (const prop in obj) {
      base[prop] = obj[prop];
    }
  });

  return base;
}

window.$l = $l

document.addEventListener("DOMContentLoaded", () => {
  _docReady = true;
  _docReadyCallbacks.forEach((callback) => callback());
})
