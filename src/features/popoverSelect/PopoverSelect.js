import React, { memo } from "react";
import Popover from "./MyPopover";
import { Button, Row, Col } from "react-bootstrap";
const PopoverSelect = () => {
  const renderBody = () => {
    return (
      <Row>
        <Col>1</Col>
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
