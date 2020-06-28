import { mount } from './mount.js';
var patch = function (n1, n2) {
  var _a, _b;
  var originalEl = n1.el;
  //check for a different tag
  if (n1.tag === n2.tag) {
    // check for props, props maybe null for either vnode
    var oldProps = (_a = n1.props) !== null && _a !== void 0 ? _a : {};
    var newProps = (_b = n2.props) !== null && _b !== void 0 ? _b : {};
    // diff the two objects
    for (var key in newProps) {
      var oldProp = oldProps[key];
      var newProp = newProps[key];
      if (oldProp !== newProp) {
        originalEl.setAttribute(key, newProp);
      }
    }
    //compare the children of both node
    var oldChildren = n1.children;
    var newChildren = n2.children;
    // for this case, both children are strings
    if (typeof oldChildren === 'string') {
      // if both are string, simply replace text
      if (typeof newChildren === 'string') {
        if (oldChildren !== newChildren) {
          originalEl.innerText = newChildren;
        }
      } else {
        // if the type of newChildren is an array, empty the text and replace the text by appending the new elements to the parent
        originalEl.innerText = '';
        newChildren.forEach(function (node) {
          mount(node, originalEl);
        });
      }
    } else if (typeof newChildren === 'string') {
      // replace nested children with new string
      originalEl.innerText = newChildren;
    } else {
      // diff the children of both elements
      var commonLength = Math.min(oldChildren.length, newChildren.length);
      for (var i = 0; i < commonLength; i++) {
        console.log(oldChildren[i], newChildren[i]);
        patch(oldChildren[i], newChildren[i]);
      }
      // in the case children of the new node has additional children. Append them to the parent
      if (newChildren.length > oldChildren.length) {
        var extraLength = newChildren.length - commonLength;
        for (var i = 0; i < extraLength; i++) {
          mount(newChildren[i], originalEl);
        }
      }
    }
  } else {
    // if the node has a different tag, the entire node must be replaced.
    // method document.replaceNode is not supported by any browser
    var parent_1 = originalEl.parentElement;
    parent_1.removeChild(originalEl);
    mount(n2, parent_1);
  }
};
export { patch };
