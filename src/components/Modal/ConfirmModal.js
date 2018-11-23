import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  ModalFooter
} from "reactstrap";

const ConfirmModal = props => {
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        toggle={props.onModalToggle}
        className={
          props.title === "Deactivate" || props.title === "Delete" ? "modal-danger " : "modal-success "
        }
      >
        <ModalHeader>{props.title}</ModalHeader>
        <ModalBody>{props.message}</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={props.onConfirmDelete}>
            Confirm
          </Button>{" "}
          <Button color="danger" onClick={props.onModalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
