import React, { memo, useRef, useEffect } from "react";
import Navbar from "./features/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsOpen,
  toggleSidebar,
  setIsOpen,
} from "./features/sidebar/sidebarSlice";
import classnames from "classnames";
import { BrowserRouter as Router } from "react-router-dom";
import useMobileDetecter from "./customHooks/useMobileDetecter";
import Sidebar from "./features/sidebar/Sidebar";
import useOutsideDetecter from "./customHooks/useOutsideDetecter";
import "react-perfect-scrollbar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./css/all.css";

const App = () => {
  const isOpen = useSelector(selectIsOpen);
  const isMobile = useMobileDetecter();
  const sidebarRef = useRef(null);
  const isClickOutSide = useOutsideDetecter(sidebarRef);
  const dispatch = useDispatch();
  const handleClick = () => {
    if (isClickOutSide && isMobile && isOpen) {
      dispatch(toggleSidebar());
    }
  };
  useEffect(() => {
    if (isMobile) dispatch(setIsOpen(false));
  }, []);
  return (
    <div onClick={handleClick}>
      <Router>
        <div
          className={classnames("sidebar-mini layout-fixed", {
            "sidebar-collapse": !isOpen,
            "sidebar-closed": !isOpen && isMobile,
            "sidebar-open": isOpen && isMobile,
          })}
        >
          <div className="wrapper">
            <Navbar />
            <Sidebar ref={sidebarRef} />
            <div className="content-wrapper">
              <section className="content">
                <div className="container-fluid">dsfasdf</div>
              </section>
              <div id="sidebar-overlay"></div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default memo(App);
