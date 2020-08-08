import React, { memo } from "react";
import { toggleSidebar } from "../sidebar/sidebarSlice";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <button className="btn" onClick={() => dispatch(toggleSidebar())}>
            <i className="fas fa-bars" />
          </button>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="index3.html" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="index3" className="nav-link">
            Contact
          </a>
        </li>
      </ul>

      <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-navbar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-append">
            <a className="btn btn-navbar" type="submit">
              <i className="fas fa-search"></i>
            </a>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className=" nav-link">
            <i className="far fa-comments"></i>
            <span className="badge badge-danger navbar-badge">3</span>
          </a>
        </li>

        <li className="nav-item dropdown">
          <a className=" nav-link">
            <i className="far fa-bell"></i>
            <span className="badge badge-warning navbar-badge">15</span>
          </a>
        </li>
        <li className="nav-item">
          <a className=" nav-link">
            <i className="fas fa-th-large"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default memo(Navbar);
