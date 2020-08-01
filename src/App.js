import React, { memo, useState, useLayoutEffect } from "react";
import Navbar from "./features/navbar/Navbar";
import { useSelector } from "react-redux";
import { selectIsOpen } from "./features/sidebar/sidebarSlice";
import classnames from "classnames";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./features/sidebar/Sidebar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./css/all.css";

const App = () => {
  const isOpen = useSelector(selectIsOpen);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateIsMobile = () => {
      console.log(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);
  return (
    <div>
      <Router>
        <div
          className={classnames("sidebar-mini layout-fixed", {
            "sidebar-collapse": !isOpen && !isMobile,
            "sidebar-open": isOpen && isMobile,
          })}
        >
          <div className="wrapper">
            <Navbar />
            <Sidebar />
          </div>
        </div>
      </Router>
    </div>
  );
};

export default memo(App);
