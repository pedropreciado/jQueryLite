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

$l.ajax = (options) => {
  const req = new XMLHttpRequest();

  const defaults = {
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  }

  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET") {
    options.url += `?${toQueryString(options.data)}`
  }

  req.open(options.method, options.url, true);
  req.onload = (event) => {
    if (request.status === 200) {
      options.success(req.response);
    } else {
      options.error(req.response)
    }
  }

  req.send(JSON.stringify(options.data))
}

toQueryString = (obj) => {
  let result = "";
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      result += `${prop}=${obj[prop]}&`;
    }
  }

  return result.slice(0, result.length - 1);
}

window.$l = $l

document.addEventListener("DOMContentLoaded", () => {
  _docReady = true;
  _docReadyCallbacks.forEach((callback) => callback());
})
