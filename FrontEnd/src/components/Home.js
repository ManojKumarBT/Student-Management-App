import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Table, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormModal from "./FormModal";
import StudentService from "../service/StudentService";
import ModalComponant from "./Modalcomponant";
import StudentTable from "./StudentTable";


export default function Home() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    useEffect(() => {
        StudentService.getStudents()
            .then((response) => {
                console.log(response.data);
                setStudents(response.data);
            })
    }, [])

    const handleUpdate = (updatedStudent) => {
        StudentService.updateStudent(updatedStudent)
            .then((response) => {
                alert(response.data);
                // setModalInfo({ show: false, title: "", body: "" });
            })
            .catch((error) => {
                console.log(error);
                if (error.response.data.name) {
                    alert(error.response.data.name);
                }
                else if (error.response.data.age) {
                    alert(error.response.data.age);
                }
                else if (error.response.data._class) {
                    alert(error.response.data._class);
                }
                else if (error.response.data.phone_number) {
                    alert(error.response.data.phone_number);
                }
                else {
                    alert(error.response.data);
                }
                // setModalInfo({ show: false, title: "", body: "" });
            })
        setStudents((prev) =>
            prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
        );
    };

    const handleDelete = (name) => {
        StudentService.deleteStudent(name)
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data);
            })
        setStudents((prev) => prev.filter((s) => s.name !== name));
    };


    const [searchingName, setSearchingName] = useState("");
    const [searchingStudent, setSearchingStudent] = useState(false);

    const handleChange = (e) => {
        setSearchingName(e.target.value);
    }

    const searchStudent = () => {
        StudentService.getStudentByName(searchingName)
            .then((response) => {
                console.log(response.data);
                // setStudents([]);
                // setStudents([...students, response.data]);
                console.log(students);
                setStudents(response.data);
                setSearchingStudent(true);
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data);
            })
    }


    return (
        <>

            <Header />

            <div style={{ textAlign: "center", marginTop: "20px", borderRadius: "200px" }}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={searchingName}
                    onChange={handleChange}
                    style={{ padding: "8px", fontSize: "16px" }}
                />
                <button
                    onClick={searchStudent}
                    style={{
                        marginLeft: "10px",
                        padding: "8px 12px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    Search Student
                </button>
            </div>
            {/* <button className="btn btn-primary w-100" onClick={searchStudent}>Search a Student</button> */}
            <br />

            <div className="div" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <FormModal />
            </div>


            <div className="App">
                <h2 className="text-center mt-4">Students Details</h2>
                <StudentTable students={students} onUpdate={handleUpdate} onDelete={handleDelete} searchingStudent={searchingStudent} />
            </div>

        </>
    )
}