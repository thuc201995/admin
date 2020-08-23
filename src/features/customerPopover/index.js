import React, { memo, useState } from "react";
import { TrigerPopover } from "../../components";
import { Button, Row, Col } from "react-bootstrap";

const entities = new Array(2).fill(1).reduce((result, _, id) => {
  return { ...result, [id]: { id, name: `name ${id}` } };
}, {});
const ids = Object.keys(entities);

const CustomerPopover = () => {
  const [show, setShow] = useState(false);
  console.log(ids);
  console.log(entities);
  const renderBody = () => {
    return (
      <Row>
        <Col as="ul">
          {ids.map((id) => {
            const item = entities[id];
            return <li key={`list-customer-${id}`}>{item.name}</li>;
          })}
        </Col>
        <Col>asdfsdfsd</Col>
      </Row>
    );
  };
  return (
    <TrigerPopover
      header="Cusomter Select"
      body={renderBody()}
      style={{ minWidth: 600 }}
      show={show}
      onHide={() => setShow(false)}
    >
      <Button onClick={() => setShow(true)}>customer </Button>
    </TrigerPopover>
  );
};
export default memo(CustomerPopover);
