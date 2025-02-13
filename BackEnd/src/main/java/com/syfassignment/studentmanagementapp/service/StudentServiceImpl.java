package com.syfassignment.studentmanagementapp.service;

import com.syfassignment.studentmanagementapp.entity.Student;
import com.syfassignment.studentmanagementapp.exception.StudentAlreadyExistsException;
import com.syfassignment.studentmanagementapp.exception.StudentNotFoundException;
import com.syfassignment.studentmanagementapp.repository.StudentRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.SpringVersion;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentRepository studentRepository;

    public StudentServiceImpl() {
    }


    //Viewing all Students
    public List<Student> getAllStudents() {
        return this.studentRepository.findAll();
    }


    //Searching a Student by Name
    public Student getStudentByName(String name) {
        Optional<Student> optional = this.studentRepository.findStudentByName(name);
        if (optional.isPresent()) {
            return (Student)optional.get();
        } else {
            throw new StudentNotFoundException("Student not found with the Name: " + name);
        }
    }


    //Searching a Student by ID
    public Student getUserById(int id) {
        Optional<Student> optional = this.studentRepository.findById(id);
        if (optional.isPresent()) {
            return (Student)optional.get();
        } else {
            throw new StudentNotFoundException("Student not found with the ID: " + id);
        }
    }


    //Adding a Student
    public Student addStudent(Student student) {
        Optional<Student> studentExist = this.studentRepository.findStudentByName(student.getName());
        if (!studentExist.isPresent()) {
            Student updatedStudent = (Student)this.studentRepository.save(student);
            return student;
        } else {
            throw new StudentAlreadyExistsException("Student already present with the Name: " + student.getName());
        }
    }


    //Updating a Student
//    public String updateStudent(Student student) {
//        Optional<Student> studentExist = this.studentRepository.findStudentByName(student.getName());
//        if (studentExist.isPresent()) {
//            Student updateStudent = (Student)studentExist.get();
////            updateStudent.setId(student.getId());
//            updateStudent.setName(student.getName());
//            updateStudent.setAge(student.getAge());
//            updateStudent.set_class(student.get_class());
//            updateStudent.setPhone_number(student.getPhone_number());
//            Student updatedStudent = (Student)this.studentRepository.save(updateStudent);
//            return "User Details Updated Successfully";
//        } else {
//            throw new StudentNotFoundException("User not found with the Name: " + student.getName());
//        }
//    }


    //Updating a Student
    public String updateStudent(Student student){
        return studentRepository.findStudentByName(student.getName())
                .map(existingStudent -> updateExistingStudent(existingStudent, student))
                .orElseThrow(() -> new StudentNotFoundException("Student not found with the Name: " + student.getName()));
    }

    private String updateExistingStudent(Student existingStudent, Student newStudent){
        existingStudent.setName(newStudent.getName());
        existingStudent.setAge(newStudent.getAge());
        existingStudent.set_class(newStudent.get_class());
        existingStudent.setPhone_number(newStudent.getPhone_number());

        studentRepository.save(existingStudent);
        return "Student Details Updated Successfully";
    }




    //Deleting a Student
    public String deleteStudent(String name) {
        return studentRepository.findStudentByName(name)
                .map(existingStudent -> deleteExistingStudent(existingStudent))
                .orElseThrow(() -> new StudentNotFoundException("Student not found with the Name: " + name));
    }

    private String deleteExistingStudent(Student existingStudent){
        studentRepository.deleteStudentByName(existingStudent.getName());
        return "Deleted the student with name: " + existingStudent.getName();
    }
}
