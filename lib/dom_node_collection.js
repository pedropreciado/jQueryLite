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
