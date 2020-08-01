import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
const SidebarHeader = ({ as: As, className, children, ...props }) => {
  return (
    <As className={cn("nav-header", className)} {...props}>
      {children}
    </As>
  );
};

export default SidebarHeader;

SidebarHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType,
};

SidebarHeader.defaultProps = {
  as: "li",
};
