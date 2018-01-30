require("./dom_node_collection");

const $l = (arg) => {
  if (arg instanceof HTMLElement) {
    let arr = [];
    arr.push(arg);
    let nodeCollection = new DOMNodeCollection(arr);
    return nodeCollection;
  }
}

window.$l = $l
