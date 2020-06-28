import { mount } from './mount.js';
import { vnode } from './render.js';

type Patch = (n1: vnode, n2: vnode) => void;

const patch: Patch = (n1, n2) => {
  const originalEl = n1.el;
  //check for a different tag

  if (n1.tag === n2.tag) {
    // check for props, props maybe null for either vnode
    const oldProps = n1.props ?? {};
    const newProps = n2.props ?? {};

    // diff the two objects
    for (let key in newProps) {
      let oldProp = oldProps[key];
      let newProp = newProps[key];

      if (oldProp !== newProp) {
        originalEl.setAttribute(key, newProp);
      }
    }

    //compare the children of both node
    let oldChildren = n1.children;
    let newChildren = n2.children;

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
        newChildren.forEach((node) => {
          mount(node, originalEl);
        });
      }
    } else if (typeof newChildren === 'string') {
      // replace nested children with new string
      originalEl.innerText = newChildren;
    } else {
      // diff the children of both elements
      let commonLength = Math.min(oldChildren.length, newChildren.length);

      for (let i = 0; i < commonLength; i++) {
        console.log(oldChildren[i], newChildren[i]);

        patch(oldChildren[i], newChildren[i]);
      }
      // in the case children of the new node has additional children. Append them to the parent
      if (newChildren.length > oldChildren.length) {
        let extraLength = newChildren.length - commonLength;

        for (let i = 0; i < extraLength; i++) {
          mount(newChildren[i], originalEl);
        }
      }
    }
  } else {
    // if the node has a different tag, the entire node must be replaced.
    // method document.replaceNode is not supported by any browser
    let parent = originalEl.parentElement;
    parent.removeChild(originalEl);
    mount(n2, parent);
  }
};

export { patch };
