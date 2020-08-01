import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
const SidebarBrand = ({ as: As, className, img, title, href, ...props }) => {
  return (
    <As href={href} className={cn("brand-link", className)} {...props}>
      <img
        src={img}
        alt={title}
        className="brand-image img-circle elevation-3 op-8"
      />
      <span className="brand-text font-weight-light">{title}</span>
    </As>
  );
};

export default SidebarBrand;

SidebarBrand.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
  as: PropTypes.elementType,
  href: PropTypes.string,
};

SidebarBrand.defaultProps = {
  as: "a",
};
