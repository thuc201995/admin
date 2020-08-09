import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
const PopoverPaginate = (total, current, nextAction, prevAction) => {
  return (
    <Row className="align-items-center">
      <Col className="text-left">
        <b>total: {total}</b>
      </Col>
      <Col className="text-right">
        <Button onClick={prevAction}>{`<`}</Button>
        <span style={{ padding: 6, border: "solid 1px #777576" }}>
          {current}
        </span>
        <Button onClick={nextAction}>{`>`}</Button>
      </Col>
    </Row>
  );
};

PopoverPaginate.proptypes = {
  total: PropTypes.string,
  current: PropTypes.string,
  nextAction: PropTypes.func,
  prevAction: PropTypes.func,
};
export default PopoverPaginate;
