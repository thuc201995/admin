import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Portal = ({ children, id }) => {
  const root = document.getElementById(id);
  const [el] = useState(document.createElement("div"));
  useEffect(() => {
    root.appendChild(el);

    return () => {
      root.removeChild(el);
    };
  }, [el, root]);
  return ReactDOM.createPortal(children, el);
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

Portal.defaultProps = {
  id: "root",
};
export default Portal;
