import React from "react";
import { Modal, ModalHeader, ModalBody, Button,Col } from "reactstrap";
import InputElement from '../InputElement/InputElement';

const MasterModal = props => {
    //console.log("Statedata", props.stateData);
  return (
    <div>
      <Modal
        isOpen={props.openFlag}
        toggle={props.toggleFunction}
        className={"modal-md "}
      >
        <ModalHeader >{props.header}</ModalHeader>
        <ModalBody>
          <Col xs="12" md="8">
        <InputElement
            name= {props.name}
            label = {props.label}
            onChange = {props.onChange}
            value = {props.value}
        />
        </Col>
        <Col md="6">
        <Button color="success" onClick={props.confirmFunction}>
            Submit
          </Button>
          &nbsp;
          <Button color="danger" onClick={props.toggleFunction}>
            Cancel
          </Button>
        </Col>
        </ModalBody>
        {/* <ModalFooter> */}
          {/* <Button color="success" onClick={props.confirmFunction}>
            Submit
          </Button>
          &nbsp;
          <Button color="danger" onClick={props.toggleFunction}>
            Cancel
          </Button> */}
        {/* </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default MasterModal;
