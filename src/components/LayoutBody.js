import React from "react";
import PropTypes from "prop-types";
const LayoutBody = ({ as: As, children, ...props }) => {
  return (
    <As className="content" {...props}>
      <div className="container-fluid">{children}</div>
    </As>
  );
};

LayoutBody.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
};

LayoutBody.defaultProps = {
  as: "section",
};
export default LayoutBody;
