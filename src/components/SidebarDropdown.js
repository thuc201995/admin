import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
const SidebarDropdown = ({
  as: As,
  className,
  isActive,
  iconCN,
  icon,
  href,
  title,
  children,
  badgeTile,
  badgeVariant,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      className={cn("nav-item has-treeview", className, {
        "menu-open": isOpen,
      })}
      onClick={() => setIsOpen(!isOpen)}
    >
      <As
        href="javascript:void(0)"
        className={cn("nav-link", { active: isActive })}
        {...props}
        onClick={(e) => e.preventDefault()}
      >
        {!icon && (
          <i
            className={cn(
              "nav-icon",
              { "fas fa-tachometer-alt": !iconCN },
              iconCN
            )}
          ></i>
        )}
        {icon && icon}
        <p>
          {title}
          <i className="right fas fa-angle-left"></i>
          {badgeTile && (
            <span
              className={cn("right badge", {
                "badge-primary": !badgeVariant,
                [`badge-${badgeVariant}`]: badgeVariant,
              })}
            >
              {badgeTile}
            </span>
          )}
        </p>
      </As>
      <ul className="nav nav-treeview" onClick={(e) => e.stopPropagation()}>
        {children}
      </ul>
    </li>
  );
};

export default SidebarDropdown;

SidebarDropdown.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
  as: PropTypes.elementType,
  badgeVariant: PropTypes.string,
  badgeTile: PropTypes.string,
};

SidebarDropdown.defaultProps = {
  as: "a",
};
