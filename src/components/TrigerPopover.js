import React, { useState, useRef, useEffect, forwardRef } from "react";
import { Popover } from "react-bootstrap";
import { passDataToChildrenProps } from "../utils";
import useOutsideDetecter from "../customHooks/useOutsideDetecter";
import PropTypes from "prop-types";
import Portal from "./Portal";
const MyPopover = forwardRef(
  ({ triggerRef, header, body, style, className, id }, ref) => {
    const [popoverTop, setPopoverTop] = useState(0);
    const [popoverLeft, setPopoverLeft] = useState(0);
    const [placement, setPlacement] = useState("top");
    useEffect(() => {
      if (triggerRef.current) {
        handlePopoverPosition(triggerRef.current, ref.current);
      }
    }, [triggerRef, ref]);

    const handlePopoverPosition = (triggerElement, popoverElement) => {
      const triggerPostion = triggerElement.getBoundingClientRect();
      const popoverPosition = popoverElement.getBoundingClientRect();
      let overflowBottom =
        triggerPostion.top + popoverPosition.height / 2 - window.innerHeight;
      overflowBottom = overflowBottom > 0 ? overflowBottom : 0;
      let overflowTop = popoverPosition.height / 2 - triggerPostion.top;
      overflowTop = overflowTop > 0 ? overflowTop : 0;
      const arrow = popoverElement.getElementsByClassName("arrow");

      const top =
        triggerPostion.top +
        window.scrollY -
        overflowBottom -
        popoverPosition.height / 2 +
        overflowTop;
      // right ****
      if (
        triggerPostion.right + window.scrollX + popoverPosition.width <
        window.innerWidth
      ) {
        setPlacement("right");
        setPopoverTop(top);
        setPopoverLeft(triggerPostion.left + triggerPostion.width);
        arrow[0].style.top = `${
          popoverPosition.height / 2 - overflowTop + overflowBottom
        }px`;
        return;
      }
      //  top ***
      if (triggerPostion.top > popoverPosition.height) {
        setPlacement("top");
        setPopoverTop(
          triggerPostion.top + window.scrollY - popoverPosition.height - 6
        );
        arrow[0].style.left = `${
          triggerPostion.left + triggerPostion.width / 2
        }px`;
        return;
      }
      // bottom ***
      if (triggerPostion.top < popoverPosition.height) {
        setPlacement("bottom");
        setPopoverTop(triggerPostion.bottom + window.scrollY);
        arrow[0].style.left = `${
          triggerPostion.left + triggerPostion.width / 2
        }px`;

        return;
      }
      //left *
      if (triggerPostion.left + popoverPosition.width > window.innerWidth) {
        setPlacement("left");
        setPopoverTop(top);
        setPopoverLeft(triggerPostion.left - popoverPosition.width - 6);
        arrow[0].style.top = `${
          popoverPosition.height / 2 - overflowTop + overflowBottom
        }px`;
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
        window.addEventListener("scroll", handlerScroll);
        return () => {
          window.removeEventListener("scroll", handlerScroll);
        };
      }
    }, [triggerRef, ref]);
    return (
      <Portal id={id}>
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

const TrigerPopover = ({
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

  const childrenWithProps = passDataToChildrenProps(children, {
    ref: triggerRef,
  });

  useOutsideDetecter([popoverRef, triggerRef], () => onHide());

  return (
    <div>
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
TrigerPopover.propTypes = {
  header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  body: PropTypes.element,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

TrigerPopover.defaultProps = {
  show: false,
};
export default TrigerPopover;
