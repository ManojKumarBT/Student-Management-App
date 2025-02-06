import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import UpdateModal from "./UpdateModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

function StudentTable({ students, onUpdate, onDelete, isSearchingStudent }) {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // console.log(isSearchingStudent);
  // console.log(students);

  return (
    <div className="container mt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>phone_number</th>
          </tr>
        </thead>
        <tbody>
          {!isSearchingStudent && students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student._class}</td>
              <td>{student.phone_number}</td>
              <td>
                <Button
                  variant="warning"
                  className="m-1"
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowUpdateModal(true);
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  className="m-1"
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>

        <tbody>
          {isSearchingStudent && (
            <tr key={students.id}>
              <td>{students.id}</td>
              <td>{students.name}</td>
              <td>{students.age}</td>
              <td>{students._class}</td>
              <td>{students.phone_number}</td>
              <td>
                <Button
                  variant="warning"
                  className="m-1"
                  onClick={() => {
                    setSelectedStudent(students);
                    setShowUpdateModal(true);
                  }}
                >
                  Update
                </Button>

                
                <Button
                  variant="danger"
                  className="m-1"
                  onClick={() => {
                    setSelectedStudent(students);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>


      {selectedStudent && (
        <UpdateModal
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          student={selectedStudent}
          handleUpdate={onUpdate}
        />
      )}


      {selectedStudent && (
        <DeleteConfirmationModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          student={selectedStudent}
          handleDelete={onDelete}
        />
      )}
    </div>
  );
}

export default StudentTable;
