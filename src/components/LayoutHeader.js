import React from "react";
import PropTypes from "prop-types";

const LayoutHeader = ({ title, as: As, ...props }) => {
  return (
    <div className="content-header" {...props}>
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 text-dark">{title}</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
LayoutHeader.propTypes = {
  title: PropTypes.string,
  as: PropTypes.elementType,
};

LayoutHeader.defaultProps = {
  as: "div",
};
export default LayoutHeader;
