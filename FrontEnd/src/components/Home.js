import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import FormModal from "./AddModal";
import StudentService from "../service/StudentService";
import StudentTable from "./StudentTable";
import Search from "./Search";
import AddModal from "./AddModal";


export default function Home() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [refreshTrigger, setRefreshTrigger] = useState(false);

    const [isSearchingStudent, setIsSearchingStudent] = useState(false);

    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        StudentService.getStudents()
            .then((response) => {
                console.log(response.data);
                setStudents(response.data);
                // console.log("Inside viewStudents UseEffect");
            })
    }, [refreshTrigger])

    const viewStudents = () => {

        setRefreshTrigger((prev) => !prev);

        // setTimeout(() => {
            // console.log("Before RT:" , refreshTrigger);
            // console.log("Inside ViewStudentss");
            // setIsSearchingStudent(false);
            // setRefreshTrigger((prev) => {
                // console.log("After RT:", refreshTrigger);
                // console.log("After prev:", !prev);
            //     return !prev;
            // });
            // console.log("After RT outside:" , refreshTrigger);
        // }, 100);
    }

    const handleUpdate = (updatedStudent) => {
        StudentService.updateStudent(updatedStudent)
            .then((response) => {
                alert(response.data);
                // setStudents((prev) =>
                //     prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
                // );
                viewStudents();
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
            })
    };

    const handleDelete = (name) => {
        StudentService.deleteStudent(name)
            .then((response) => {
                alert(response.data);
                viewStudents();
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data);
            })
        // setStudents((prev) => prev.filter((s) => s.name !== name));
    };


    return (
        <>
            <Header />

            <Search setSearchingStudent={() => setIsSearchingStudent(true)} setStudents={setStudents} />

            <br />

            <div className="div" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Add Student</button>
                {/* {isSearchingStudent && (
                    <button className="btn btn-success" onClick={viewStudents}>viewStudents</button>
                )} */}
            </div>

            {showAddModal && (
                <AddModal viewStudents={viewStudents} show={showAddModal} handleClose={() => setShowAddModal(false)} />
            )}


            <div className="StudentTable">
                <h2 className="text-center mt-4">Students Details</h2>
                <StudentTable students={students} onUpdate={handleUpdate} onDelete={handleDelete} isSearchingStudent={isSearchingStudent} />
            </div>

        </>
    )
}