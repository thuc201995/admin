import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { passDataToChildrenProps, findChildrenByClassName } from "../utils";

const Sortable = ({
  as: As,
  className,
  children,
  connectWith,
  handle,
  ...props
}) => {
  const connetElement = findChildrenByClassName(children, connectWith);
  const passData = passDataToChildrenProps(connetElement.childs, {});
  const childWithProps = children.map((child, idx) => {
    if (connetElement.ids.includes(idx))
      return passData.filter((item) => item._owner.idx === idx);
    return child;
  });

  return (
    <As className={cn("mt-2", className)} {...props}>
      {childWithProps}
    </As>
  );
};

export default Sortable;

Sortable.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType,
  connectWith: PropTypes.string,
};

Sortable.defaultProps = {
  as: "div",
  connectWith: "connect-sortable",
};
