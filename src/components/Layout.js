import React, { forwardRef } from "react";
import SidebarBrand from "./SidebarBrand";
import SidebarAvatar from "./SidebarAvatar";
import SidebarBody from "./SidebarBody";
import SidebarItem from "./SidebarItem";
import SidebarMenu from "./SidebarMenu";
import SidebarDropdown from "./SidebarDropdown";
import SidebarHeader from "./SidebarHeader";
const Sidebar = (props, ref) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" ref={ref}>
      {props.children}
    </aside>
  );
};

export default Object.assign(forwardRef(Sidebar), {
  Brand: SidebarBrand,
  Avatar: SidebarAvatar,
  Body: SidebarBody,
  Item: SidebarItem,
  Menu: SidebarMenu,
  Dropdown: SidebarDropdown,
  Header: SidebarHeader,
});
