import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Header from "./LayoutHeader";
import Body from "./LayoutBody";
const Layout = forwardRef(({ children, as: As, props }, ref) => {
  return (
    <As {...props} ref={ref} className="content-wrapper">
      {children}
    </As>
  );
});

Layout.propTypes = {
  children: PropTypes.node,
  as: PropTypes.elementType,
};

Layout.defaultProps = {
  as: "div",
};

export default Object.assign({ Header, Body }, Layout);
