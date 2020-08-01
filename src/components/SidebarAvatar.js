import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
const SidebarAvatar = ({ as: As, className, img, name, ...props }) => {
  return (
    <As
      className={cn("user-panel mt-3 pb-3 mb-3 d-flex", className)}
      {...props}
    >
      <div className="image">
        <img src={img} className="img-circle elevation-2" alt="User" />
      </div>
      <div className="info">
        <a href="#" className="d-block">
          {name}
        </a>
      </div>
    </As>
  );
};

export default SidebarAvatar;

SidebarAvatar.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  as: PropTypes.elementType,
};

SidebarAvatar.defaultProps = {
  as: "div",
};
