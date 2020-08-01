import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";

const SidebarBody = ({ as: As, className, children, ...props }) => {
  return (
    <As className={cn("sidebar", className)} {...props}>
      {children}
    </As>
  );
};

export default SidebarBody;

SidebarBody.propTypes = {
  className: PropTypes.string,
  as: PropTypes.elementType,
};

SidebarBody.defaultProps = {
  as: PerfectScrollbar,
};
