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
const SidebarContainer = (_, ref) => {
  const dispatch = useDispatch();
  const groupIds = useSelector((state) => groupSelector.selectIds(state)); // list ids of  menu groups (group menu)
  const groupEntities = useSelector(
    (state) => groupSelector.selectEntities(state) // object data by id of menu groups
  );
  const {
    groupByParentId, // list ids menus group by parent id (menu f1)
    entities: menusEntities, // object data by id of menus
    groupByGroupId, // list ids menus group by group id (menu f0)
  } = useSelector(selectMenus);

  useEffect(() => {
    // fake fetching menu data
    dispatch(groupReceived(menuGroups));
    dispatch(menusReceived(menus));
  }, [dispatch]);

  // render group of menus
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
          // render menu f1
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
                  {/* render  group of menu */}
                  {renderGroupItem({ title, groupId })}
                  {groupByGroupId &&
                    groupByGroupId[groupId] &&
                    // render menu f0
                    groupByGroupId[groupId].map((menuId) => {
                      const childMenuIds = groupByParentId[menuId];
                      if (childMenuIds) {
                        // has child menu (render menu dropdown with child menu)
                        return renderMenuDropdown({
                          data: menusEntities[menuId],
                          childMenuIds,
                          menusEntities,
                        });
                      }
                      // no child menu
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
