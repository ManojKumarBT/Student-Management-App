import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import StudentService from "../service/StudentService";

function AddModal({ viewStudents, show, handleClose}) {
    const navigate = useNavigate();

  // const [show, setShow] = useState(true);

  const [student, setStudent] = useState ({
    name: "",
    age: "10",
    _class: "10",
    phone_number: 9999999999
    // name: "",
    // age: "",
    // _class: "",
    // phone_number: null
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
};

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const clearEntries = () => {
    setStudent({
      name:"",
      age:"",
      _class:"",
      phone_number: null
    })
  }

  useEffect(() => {
    console.log("Success");
  })

  const addStudent = (e) =>{
    e.preventDefault();
    console.log("e.target.id");

    StudentService.addStudent(student)
            .then((response) => {
                console.log(response.data);
                console.log(student.name);
                alert("Added successfully");
                // setRefreshTrigger((prev) => !prev);
                handleClose();
                // setShowAddModal();
                clearEntries();
                viewStudents();
                // navigate("/");
            })
            .catch((error) => {
                // alert(error.response.data);
                console.log(error);
                // console.log(error.response.data);
                if(error.response.data.name){
                    alert(error.response.data.name);
                }
                else if(error.response.data.age){
                    alert(error.response.data.age);
                }
                else if(error.response.data._class){
                    alert(error.response.data._class);
                }
                else if(error.response.data.phone_number){
                    alert(error.response.data.phone_number);
                }
                else{
                    alert(error.response.data);
                }
            });
  }


  return (
    <div>
      {/* <div className="div" style={{display: "flex"}}>
      <button className="btn btn-primary center-btn" style={{alignItems: "center"}} onClick={handleShow}>
        Add Student
      </button>
      </div> */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Fill Your Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter student name" value={student.name} onChange={(e) => handleChange(e)}/>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control name="age" type="text" placeholder="Enter student age" value={student.age} onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Control name="_class" type="text" placeholder="Enter student class" value={student._class} onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone_number" type="tel" placeholder="Enter your phone number" value={student.phone_number} onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Button variant="success" type="submit" onClick={e => addStudent(e)}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddModal;