import React, { lazy } from "react";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const routers = [
  {
    component: () => <div className="content-wrapper">Home page</div>,
    exact: true,
    path: "/",
    name: "Home",
  },
  {
    component: () => <Dashboard />,
    exact: false,
    path: "/dashboard/:v1",
    name: "Dashboard",
  },
  {
    component: () => <div className="content-wrapper">widget</div>,
    exact: true,
    path: "/widgets",
    name: "Widgets",
  },
];

export const breadCrumbs = routers.reduce((result, item) => {
  return { ...result, [item.path]: item.name };
}, {});
export default routers;
