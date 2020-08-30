import React, { memo } from "react";
import { Layout } from "../components";
import CustomerPopover from "../features/customerPopover";
const Dashboard = () => {
  return (
    <Layout style={{ height: "200vh" }}>
      <Layout.Header title="DashBoard"></Layout.Header>
      <Layout.Body>This is Body</Layout.Body>
    </Layout>
  );
};

export default memo(Dashboard);
