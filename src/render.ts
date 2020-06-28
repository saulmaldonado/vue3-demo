type vnode = {
  tag: string;
  props: Props | null;
  children: Array<vnode> | string;
  el?: any;
};

type Props = {
  [prop: string]: string;
};

type H = (tag: string, props: Props | null, children: string | vnode[]) => vnode;

const h: H = (tag, props, children) => {
  return {
    tag,
    props,
    children,
  };
};

export { h, vnode };
