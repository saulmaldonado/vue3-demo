import { h } from './render';
import { mount } from './mount';
import { patch } from './patch';

// My example at recreating render and mounting functions

const vdom1 = h('div', { class: 'red' }, [h('span', null, 'hello')]);
/**
 * result
 * <div id="app">
 *   <div class="red">hello</div>
 * </div>
 */
mount(vdom1, document.getElementById('app'));

//create function that will compare and the two tree and make the changes needed

/* Cases */

const vdom2 = h('div', { class: 'red' }, [h('span', null, 'changed!')]);

/**
 * result
 * <div id="app">
 *   <div class="red">changed!</div>
 * </div>
 */

//-------------------------------------------------------------------------------------------------------

// const vdom2 = h('div', { class: 'red' }, [
//   h('div', null, [h('span', null, 'changed!'), h('span', null, 'changed!2')]),
// ]);

// result
/**
 *
 * <div id="app">
 *    <div class="red">
 *      <div>
 *        <span>changed! 1</span>
 *        <span>changed! 2</span>
 *      </div>
 *    </div>
 * </div>
 */

//-------------------------------------------------------------------------------------------------------

// const vdom2 = h('div', { class: 'red' }, [h('div', null, [h('span', null, 'changed!')])]);
/**
 * result
 * <div id="app">
 *    <div class="red">
 *      <div>
 *        <span>changed! 1</span>
 *      </div>
 *    </div>
 * </div>
 */

//-------------------------------------------------------------------------------------------------------

patch(vdom1, vdom2);
