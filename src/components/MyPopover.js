import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Button, Overlay, Popover } from "react-bootstrap";
import ReactDOM from "react-dom";
import { passDataToChildrenProps } from "../utils";
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
  ({ triggerRef, header, body, style, className }, ref) => {
    const [triggerPosition, settriggerPosition] = useState({ top: 0, left: 0 });
    const [popoverTop, setPopoverTop] = useState(0);
    const [popoverLeft, setPopoverLeft] = useState(0);
    const [placement, setPlacement] = useState("top");
    useEffect(() => {
      if (triggerRef.current) {
        handlePopoverPosition(triggerRef.current, ref.current);
      }
    }, [triggerRef.current]);

    const handlePopoverPosition1 = (triggerElement, popoverElement) => {
      const postion = triggerElement.getBoundingClientRect();
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
          settriggerPosition({
            top: top + window.scrollY - arrowY,
            left: left - 5 - popoverPosition.width,
          });
          break;
        case "right":
          settriggerPosition({
            top: top + window.scrollY - arrowY,
            left: left + width,
          });
          break;
      }
    };
    const handlePopoverPosition = (triggerElement, popoverElement) => {
      const triggerPostion = triggerElement.getBoundingClientRect();
      const popoverPosition = popoverElement.getBoundingClientRect();
      let overflowBottom =
        triggerPostion.top + popoverPosition.height / 2 - window.innerHeight;
      overflowBottom = overflowBottom > 0 ? overflowBottom : 0;
      let overflowTop = popoverPosition.height / 2 - triggerPostion.top;
      overflowTop = overflowTop > 0 ? overflowTop : 0;
      const arrow = popoverElement.getElementsByClassName("arrow");
      arrow[0].style.top = `${
        popoverPosition.height / 2 - overflowTop + overflowBottom
      }px`;
      // triggerPostion.left + popoverPosition.width <  window.innerWidth -> right ****
      if (
        triggerPostion.left + window.scrollX + popoverPosition.width <
        window.innerWidth
      ) {
        setPlacement("right");
        const top =
          triggerPostion.top +
          window.scrollY -
          overflowBottom -
          popoverPosition.height / 2 +
          overflowTop;
        setPopoverTop(top);
        setPopoverLeft(triggerPostion.left + triggerPostion.width);
        return;
      }
      // triggerPostion.top + popoverPosition.height <  window.innerHeight -> bottom ***
      if (triggerPostion.top + popoverPosition.height < window.innerHeight) {
        setPlacement("bottom");
      }
      // triggerPostion.top + popoverPosition.height >  window.innerHeight -> top ***
      if (triggerPostion.top + popoverPosition.height > window.innerHeight) {
        setPlacement("top");
      }
      // triggerPostion.left + popoverPosition.width >  window.innerWidth  -> left *
      if (triggerPostion.left + popoverPosition.width > window.innerWidth) {
        console.log(
          triggerPostion.left + popoverPosition.width,
          window.innerWidth
        );
        setPlacement("left");
        const top =
          triggerPostion.top +
          window.scrollY -
          overflowBottom -
          popoverPosition.height / 2 +
          overflowTop;
        setPopoverTop(top);
        setPopoverLeft(triggerPostion.left - popoverPosition.width - 6);
        return;
      }
    };
    useEffect(() => {
      const ps = document.getElementsByClassName("ps");
      if (ps.length === 0) return;
      let psParentDom = null;
      for (let i = 0; i < ps.length; i++) {
        if (ps[i].contains(triggerRef.current)) {
          psParentDom = ps[i];
        }
      }

      const handlerScroll = (e) => {
        console.log(e.scrollY);
        handlePopoverPosition(triggerRef.current, ref.current);
      };
      if (psParentDom !== null) {
        psParentDom.addEventListener("ps-scroll-y", handlerScroll);
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        return () => {
          document.getElementsByTagName("body")[0].style.overflow = null;
          psParentDom.removeEventListener("ps-scroll-y", handlerScroll);
        };
      } else {
        // window.addEventListener("scroll", handlerScroll);
        return () => {
          // window.removeEventListener("scroll", handlerScroll);
        };
      }
    });
    return (
      <Portal>
        <Popover
          style={{
            top: popoverTop,
            left: popoverLeft,
            ...style,
          }}
          ref={ref}
          placement={placement}
          className={className}
        >
          <Popover.Title as="h3" className="popover-title">
            {header}
          </Popover.Title>
          <Popover.Content className="popover-content">{body}</Popover.Content>
        </Popover>
      </Portal>
    );
  }
);

const MytriggerPopover = ({
  children,
  header,
  body,
  style,
  className,
  show,
  onHide,
}) => {
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const handleClick = () => {
    onHide();
  };
  const childrenWithProps = passDataToChildrenProps(children, {
    ref: triggerRef,
  });

  useOutsideDetecter([popoverRef, triggerRef], () => onHide());

  return (
    <div id="test">
      {!children && <Button onClick={handleClick}>Holy guacamole!</Button>}
      {children && childrenWithProps}
      {show && (
        <MyPopover
          triggerRef={triggerRef}
          ref={popoverRef}
          header={header}
          body={body}
          style={style}
          className={className}
        />
      )}
    </div>
  );
};
MytriggerPopover.propTypes = {
  header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  body: PropTypes.element,
  children: PropTypes.element,
  style: PropTypes.object,
  className: PropTypes.string,
};
export default MytriggerPopover;
