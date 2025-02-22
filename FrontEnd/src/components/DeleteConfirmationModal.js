import React from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteConfirmationModal({ show, handleClose, handleDelete, student }) {

  const handleDeleteAndVanish = () => {
    handleDelete(student.name);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete <strong>{student?.name}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="danger" onClick={handleDeleteAndVanish}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal;
