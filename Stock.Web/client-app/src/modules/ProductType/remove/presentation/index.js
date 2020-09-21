import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ElementRemove = ({ remove, goBack }) => {
  return (
    <Modal isOpen>
      <ModalHeader>Eliminar tipo de producto</ModalHeader>
      <ModalBody>¿Desea eliminar este tipo de producto?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={remove}>
          Si
        </Button>
        <Button color="secondary" onClick={goBack}>
          No
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ElementRemove.propTypes = {
  remove: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
};

ElementRemove.displayName = "ProductTypeRemove";

export default ElementRemove;
