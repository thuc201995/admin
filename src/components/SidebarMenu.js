import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
const SidebarMenu = ({ as: As, className, children, ...props }) => {
  return (
    <As className={cn("mt-2", className)} {...props}>
      <ul
        className="nav nav-pills nav-sidebar flex-column"
        data-widget="treeview"
        role="menu"
        data-accordion="false"
      >
        {children}
      </ul>
    </As>
  );
};

export default SidebarMenu;

SidebarMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  as: PropTypes.elementType,
};

SidebarMenu.defaultProps = {
  as: "nav",
};
