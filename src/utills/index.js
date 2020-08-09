import { Children, isValidElement, cloneElement } from "react";

export const passDataToChildrenProps = (children, props) => {
  return Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });
};
