import React, { lazy } from "react";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const routers = [
  {
    component: () => <Dashboard />,
    exact: false,
    path: "/dashboard/v1",
  },
];

export default routers;
