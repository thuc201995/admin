import React, { memo, useRef, Suspense, lazy } from "react";
import Navbar from "./features/navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { selectIsOpen, toggleSidebar } from "./features/sidebar/sidebarSlice";
import classnames from "classnames";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useMobileDetecter from "./customHooks/useMobileDetecter";
import Sidebar from "./features/sidebar/Sidebar";
import routers from "./configRouter";
import "react-perfect-scrollbar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./css/all.css";
const App = () => {
  const isOpen = useSelector(selectIsOpen); // is sidebar open
  const isMobile = useMobileDetecter(); // is mobile device
  const sidebarRef = useRef(null); // create sidebar ref
  const dispatch = useDispatch(); // create dispatcher
  const handleClick = (e) => {
    // check and hidden sidebar when click outside in mobile
    if (
      isMobile && // is mobile device
      isOpen && // is sidebar open
      sidebarRef.current && // is sidebar exist
      !sidebarRef.current.contains(e.target) // check is click outside sidebar
    ) {
      dispatch(toggleSidebar()); // dispatch hidden sidebar
    }
  };

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
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {routers.map((item) => (
                  <Route {...item} key={item.name} />
                ))}
              </Switch>
            </Suspense>
            <div id="sidebar-overlay"></div>
          </div>
          <footer className="main-footer">
            <strong>
              Contact
              <a href="https://adminlte.io"> thuc201995@gmail.com</a>.
            </strong>
            <div className="float-right d-none d-sm-inline-block">
              <b>Version</b> 3.1.0-pre
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
};

export default memo(App);
