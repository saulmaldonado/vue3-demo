/**
 * Appends a vnode to the container as a child
 * @param vnode
 * @param container
 */
var mount = function (vnode, container) {
    // creates new node
    var element = (vnode.el = document.createElement(vnode.tag));
    // if any, props are added to the new node
    if (vnode.props) {
        for (var prop in vnode.props) {
            element.setAttribute(prop, vnode.props[prop]);
        }
    }
    // if any, children are added to the node
    if (vnode.children) {
        // if children is text, add to innerText of node
        if (typeof vnode.children === 'string') {
            element.innerText = vnode.children;
        }
        else {
            // if children is an array, recursively add every nested node
            vnode.children;
            for (var i = 0; i < vnode.children.length; i++) {
                mount(vnode.children[i], element);
            }
        }
    }
    // mounts node to root node
    container.appendChild(element);
};
export { mount };
