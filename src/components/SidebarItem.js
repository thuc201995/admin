import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
const SidebarItem = ({
  as: As,
  className,
  href,
  title,
  iconCN,
  icon,
  badgeTile,
  badgeVariant,
  ...props
}) => {
  return (
    <li className={cn("nav-item", className)}>
      <As href={href} className="nav-link" {...props}>
        {!icon && (
          <i
            className={cn(
              "nav-icon",
              { "far fa-circle nav-icon": !iconCN },
              iconCN
            )}
          ></i>
        )}
        {icon && icon}
        <p>
          {title}
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
    </li>
  );
};

export default SidebarItem;

SidebarItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  as: PropTypes.elementType,
  href: PropTypes.string,
  badgeVariant: PropTypes.string,
  badgeTile: PropTypes.string,
  icon: PropTypes.element,
  iconCN: PropTypes.string,
};

SidebarItem.defaultProps = {
  as: "a",
};
