import React, { forwardRef } from "react";
import { breadCrumbs } from "../configRouter";
import PropTypes from "prop-types";
import { Button, Container } from "react-bootstrap";
import Sortable from "./Sortable";
import StaffPopover from "./StaffPopover";
import Scrollbar from "react-perfect-scrollbar";
const Layout = forwardRef((props, ref) => {
  const { title } = props;

  return (
    <div className="content-wrapper" suppressscrollx="true">
      <Container style={{ minHeight: "200vh" }}>
        {/* <Sortable>
          <button className="connect-sortable">1q</button>
          <button className="2">2</button>
          <button className="connect-sortable">3</button>
          <button className="4">4</button>
          <button className="connect-sortable">5</button>
          <button className="6">6</button>
        </Sortable> */}

        <StaffPopover></StaffPopover>
      </Container>
    </div>
  );
});

Layout.propTypes = {
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: "Home",
};

export default Layout;
