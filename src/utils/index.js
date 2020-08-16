import { Children, isValidElement, cloneElement } from "react";

export const passDataToChildrenProps = (children, props) => {
  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });
};

export const findChildrenByClassName = (children, className) => {
  let entities = {};
  let ids = [];
  let data = [];
  Children.forEach(children, (child, idx) => {
    if (child.props && child.props.className === className) {
      entities = {
        ...entities,
        [idx]: { ...child, _owner: { ...child._owner, idx: idx } },
      };
      ids = [...ids, idx];
      data = Object.keys(entities).map((item) => entities[item]);
    }
  });
  return { entities, ids, childs: data };
};
