import React from "react";
import { Modal, ModalHeader, ModalBody, Button, Col ,ModalFooter} from "reactstrap";
import InputElement from "../InputElement/InputElement";

const ConfirmModal = props => {
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        toggle={props.onModalToggle}
        className={"modal-danger " + props.className}
      >
        <ModalHeader>{props.title}</ModalHeader>
        <ModalBody>{props.message}</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={props.onConfirmDelete}>
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={props.onModalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
