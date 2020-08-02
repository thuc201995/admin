import React, { memo, useEffect, Fragment, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  groupSelector,
  groupReceived,
  menusReceived,
  selectMenus,
} from "./sidebarSlice";
import { Sidebar } from "../../components";
import { menuGroups, menus } from "./data";
import { NavLink, Link } from "react-router-dom";
import AdminLTELogo from "../../img/AdminLTELogo.png";
import Avatar from "../../img/avatar.png";
const SidebarContainer = (props, ref) => {
  const dispatch = useDispatch();
  const groupIds = useSelector((state) => groupSelector.selectIds(state));
  const groupEntities = useSelector((state) =>
    groupSelector.selectEntities(state)
  );
  const {
    groupByParentId,
    entities: menusEntities,
    groupByGroupId,
  } = useSelector(selectMenus);

  useEffect(() => {
    dispatch(groupReceived(menuGroups));
    dispatch(menusReceived(menus));
  }, [dispatch]);

  const renderGroupItem = ({ title, groupId }) => {
    if (!title) return "";
    return (
      <Sidebar.Header key={`sidebar-menu-group-${groupId}`}>
        {title}
      </Sidebar.Header>
    );
  };
  const renderMenuItem = ({ data }) => {
    return (
      <Sidebar.Item
        title={data.title}
        badgeTile={data.badgeTile}
        badgeVariant={data.badgeVariant}
        as={NavLink}
        to={data.link}
        exact
        key={`menu-${data.id}`}
        iconCN={data.iconCN}
      />
    );
  };
  const renderMenuDropdown = ({ data, childMenuIds, menusEntities }) => {
    return (
      <Sidebar.Dropdown
        as={NavLink}
        to={data.link}
        title={data.title}
        iconCN={data.iconCN}
        key={`menu-${data.id}`}
        badgeTile={data.badgeTile}
        badgeVariant={data.badgeVariant}
      >
        {childMenuIds &&
          childMenuIds.map((id) =>
            renderMenuItem({
              data: {
                ...menusEntities[id],
                link: `${data.link}${menusEntities[id].link}`,
              },
            })
          )}
      </Sidebar.Dropdown>
    );
  };
  return (
    <Sidebar ref={ref}>
      <Sidebar.Brand img={AdminLTELogo} as={Link} to="/" title="AdminLTE" />
      <Sidebar.Body>
        <Sidebar.Avatar img={Avatar} name="Alexander Pierce" />
        <Sidebar.Menu key="menus">
          {groupIds &&
            groupIds.map((groupId) => {
              const { title } = groupEntities[groupId];
              return (
                <Fragment key={`menu-group-id-${groupId}`}>
                  {renderGroupItem({ title, groupId })}
                  {groupByGroupId &&
                    groupByGroupId[groupId] &&
                    groupByGroupId[groupId].map((menuId) => {
                      const menuGroups = groupByParentId[menuId];
                      if (menuGroups) {
                        return renderMenuDropdown({
                          data: menusEntities[menuId],
                          childMenuIds: menuGroups,
                          menusEntities,
                        });
                      }
                      return renderMenuItem({
                        data: menusEntities[menuId],
                      });
                    })}
                </Fragment>
              );
            })}
        </Sidebar.Menu>
      </Sidebar.Body>
    </Sidebar>
  );
};

export default memo(forwardRef(SidebarContainer));
