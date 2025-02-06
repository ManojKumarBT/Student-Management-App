import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import StudentService from "../service/StudentService";
 

function Search({ setSearchingStudent, setStudents }){


    const [searchingName, setSearchingName] = useState("");

    const handleChange = (e) => {
        setSearchingName(e.target.value);
    }

     const searchStudent = () => {
            StudentService.getStudentByName(searchingName)
                .then((response) => {
                    console.log(response.data);
                    setStudents(response.data);
                    setSearchingStudent();
                })
                .catch((error) => {
                    console.log(error);
                    alert(error.response.data);
                })
        }

    return(
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
    )
}

export default Search;