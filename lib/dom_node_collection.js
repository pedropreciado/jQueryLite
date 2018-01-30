class DOMNodeCollection {

  contructor(nodes) {
    this.nodes = nodes;
  }

  each(callback) {
    this.nodes.forEach(callback);
  }

  html(html) {
    if (typeof html == "string") {
      this.each((node) => {
        node.innerHTML = html;
      })
    } else if (this.nodes.length > 0){
      return this.nodes[0].innerHTML;
    }
  }

}

module.exports = DOMNodeCollection;
