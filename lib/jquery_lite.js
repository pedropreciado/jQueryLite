/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);

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
  options.method = options.method,toUpperCase();

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
  
}

window.$l = $l

document.addEventListener("DOMContentLoaded", () => {
  _docReady = true;
  _docReadyCallbacks.forEach((callback) => callback());
})


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  contructor(nodes) {
    this.nodes = nodes;
  }

  each(callback) {
    this.nodes.forEach(callback);
  }

  html(html) {
    if (typeof html === "string") {
      this.each((node) => {
        node.innerHTML = html;
      });
    } else if (this.nodes.length > 0){
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html = ""
  }

  append(children) {

    if (this.nodes.length === 0) return;

    if (typeof children === "string") {
      this.each((node) => {
        node.innerHTML += children;
      });
    } else if (children instanceof DOMNodeCollection) {
      this.each((node) => {
        children.each((childNode) => {
          node.appendChild(childNode.cloneNode(true));
        })
      })
    }
  }

  attr(key, value) {
    if (typeof val === "string") {
      this.each((node) => {
        node.setAttribute(key, val)
      })
    } else {
      this.nodes[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.each((node) => {
      node.classList.add(newClass);
    })
  }

  removeClass(oldClass) {
    this.each((node) => {
      node.classList.remove(oldClass);
    })
  }

  children(node) {
    childNodes = [];
    this.each((node) => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });

    return new DOMNodeCollection(childNodes);
  }

  parent(node) {
    let parentNodes = [];
    this.each((node) => {
      if (node.parentNode.visited) {
        parentNodes.push(node.parentNode);
        node.parentNode.visited = true;
      }

    })

    parentNodes.forEach((node) => {
      node.visited = false;
    })

    return new DOMNodeCollection(parentNodes);
  }

  find(selector) {
    let foundNodes = [];
    this.each((node) => {
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNodes.concat(Array.from(nodeList));
    })

    return new DOMNodeCollection(foundNodes);
  }

  remove() {
    this.each((node) => {
      node.parentNode.removeChild(node);
    })
  }

  on(eventName, callback) {
    this.each((node) => {
      node.addEventListener(eventName, callback);
      const eventKey = `jqliteEvent-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.each((node) => {
      const eventKey = `jqlite-${eventName}`
      if (node[eventKey]) {
        node[eventKey].forEach((callback) => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    })
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);