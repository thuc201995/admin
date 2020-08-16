import React, { memo, useState } from "react";
import Popover from "./MyPopover";
import { Button, Row, Col } from "react-bootstrap";
import Scroll from "react-perfect-scrollbar";
const StaffPopover = () => {
  const [selected, setSelected] = useState([]);
  const [show, setShow] = useState(false);
  const renderBody = () => {
    return (
      <Row>
        <Col style={{ borderRight: "solid 1px" }}>
          <Row style={{ height: 300, overflow: "hidden" }} as={Scroll}>
            <ul>
              {new Array(45).fill(30).map((item, id) => (
                <li onClick={() => setSelected([...selected, item])} key={id}>
                  {item}
                </li>
              ))}
            </ul>
          </Row>
        </Col>
        <Col>
          <ul>
            {selected.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </Col>
      </Row>
    );
  };
  return (
    <Popover
      header={
        <div>
          test <button onClick={() => setShow(false)}>close</button>
        </div>
      }
      body={renderBody()}
      style={{ minWidth: 600 }}
      show={show}
      onHide={() => setShow(false)}
    >
      <Button style={{ marginTop: 600 }} onClick={() => setShow(true)}>
        test
      </Button>
    </Popover>
  );
};
export default memo(StaffPopover);
