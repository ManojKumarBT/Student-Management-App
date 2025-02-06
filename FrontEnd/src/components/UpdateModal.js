import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UpdateModal({ show, handleClose, student, handleUpdate }) {
  const [updatedStudent, setUpdatedStudent] = useState(student);


  useEffect(() => {
    setUpdatedStudent(student);
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleUpdateAndVanish = () => {
    handleUpdate(updatedStudent);
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedStudent.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={updatedStudent.age}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Class</Form.Label>
            <Form.Control
              type="text"
              name="_class"
              value={updatedStudent._class}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={updatedStudent.phone_number}
              onChange={handleChange}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="success" onClick={handleUpdateAndVanish}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
