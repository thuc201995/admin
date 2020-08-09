import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Button, Overlay, Popover } from "react-bootstrap";
import ReactDOM from "react-dom";
import { passDataToChildrenProps } from "../utills";
import useOutsideDetecter from "../customHooks/useOutsideDetecter";
import PropTypes from "prop-types";
const Portal = ({ children, id }) => {
  const root = document.getElementById(id || "root");
  const [el] = useState(document.createElement("div"));
  useEffect(() => {
    root.appendChild(el);

    return () => {
      root.removeChild(el);
    };
  }, []);
  return ReactDOM.createPortal(children, el);
};

const MyPopover = forwardRef(
  ({ triggleRef, title, body, style, className }, ref) => {
    const [trigglePosition, setTrigglePosition] = useState({ top: 0, left: 0 });
    const [placement, setPlacement] = useState("top");
    useEffect(() => {
      if (triggleRef.current) {
        handlePopoverPosition(triggleRef.current, ref.current);
      }
    }, [triggleRef.current]);

    const handlePopoverPosition = (triggleElement, popoverElement) => {
      const postion = triggleElement.getBoundingClientRect();
      const popoverPosition = popoverElement
        ? popoverElement.getBoundingClientRect()
        : {};
      const windowWidth = window.innerWidth;

      const { top, right, bottom, left, height, width } = postion;
      const tmp = popoverPosition.height / 3;
      const arrowY = tmp > top ? 0 : tmp;

      let pl = "";
      if (left > popoverPosition.width) {
        pl = "left";
      }
      if (windowWidth - right > popoverPosition.width) {
        pl = "right";
      }
      setPlacement(pl);
      const arrow = popoverElement.getElementsByClassName("arrow");
      arrow[0].style.top = `${arrowY}px`;

      switch (pl) {
        case "left":
          setTrigglePosition({
            top: top + window.scrollY - arrowY,
            left: left - 5 - popoverPosition.width,
          });
          break;
        case "right":
          setTrigglePosition({
            top: top + window.scrollY - arrowY,
            left: left + width,
          });
          break;
      }
    };

    useEffect(() => {
      const ps = document.getElementsByClassName("ps");
      if (ps.length === 0) return;
      let psParentDom = null;
      for (let i = 0; i < ps.length; i++) {
        if (ps[i].contains(triggleRef.current)) {
          psParentDom = ps[i];
        }
      }
      if (psParentDom === null) return;

      const handlerScroll = () => {
        handlePopoverPosition(triggleRef.current, ref.current);
      };
      psParentDom.addEventListener("ps-scroll-y", handlerScroll);
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
      return () => {
        document.getElementsByTagName("body")[0].style.overflow = null;
        psParentDom.removeEventListener("ps-scroll-y", handlerScroll);
      };
    });
    return (
      <Portal>
        <Popover
          style={{
            top: trigglePosition.top,
            left: trigglePosition.left,
            ...style,
          }}
          ref={ref}
          placement={placement}
          className={className}
        >
          <Popover.Title as="h3" className="popover-title">
            {title}
          </Popover.Title>
          <Popover.Content className="popover-content">{body}</Popover.Content>
        </Popover>
      </Portal>
    );
  }
);

const MyTrigglePopover = ({ children, title, body, style, className }) => {
  const [show, setShow] = useState(false);
  const triggleRef = useRef(null);
  const popoverRef = useRef(null);
  const handleClick = () => {
    setShow(!show);
  };
  const childrenWithProps = passDataToChildrenProps(children, {
    onClick: handleClick,
    ref: triggleRef,
  });

  useOutsideDetecter([popoverRef, triggleRef], () => setShow(false));

  return (
    <div id="test">
      {!children && <Button onClick={handleClick}>Holy guacamole!</Button>}
      {children && childrenWithProps}
      {show && (
        <MyPopover
          triggleRef={triggleRef}
          ref={popoverRef}
          title={title}
          body={body}
          style={style}
          className={className}
        />
      )}
    </div>
  );
};
MyTrigglePopover.propTypes = {
  title: PropTypes.string,
  body: PropTypes.element,
  children: PropTypes.element,
  style: PropTypes.object,
  className: PropTypes.string,
};
export default MyTrigglePopover;
