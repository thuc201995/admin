import React, { memo } from "react";
import Popover from "./MyPopover";
import { Button, Row, Col } from "react-bootstrap";
import Scroll from "react-perfect-scrollbar";
const StaffPopover = () => {
  const renderBody = () => {
    return (
      <Row>
        <Col style={{ borderRight: "solid 1px" }}>
          <Row style={{ height: 300, overflow: "hidden" }} as={Scroll}>
            <ul>
              {new Array(45).fill(30).map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </Row>
          <Row className="align-items-center">
            <Col className="text-left">
              <b>total: 50</b>
            </Col>
            <Col className="text-right">
              <Button>{`<`}</Button>
              <span style={{ padding: 6, border: "solid 1px #777576" }}>
                20
              </span>
              <Button>{`>`}</Button>
            </Col>
          </Row>
        </Col>
        <Col>2</Col>
      </Row>
    );
  };
  return (
    <Popover
      title="Staff popover"
      body={renderBody()}
      style={{ minWidth: 600 }}
    >
      <Button>test </Button>
    </Popover>
  );
};
export default memo(StaffPopover);
