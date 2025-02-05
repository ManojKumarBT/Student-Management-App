package com.syfassignment.studentmanagementapp.service;

import com.syfassignment.studentmanagementapp.entity.Student;
import com.syfassignment.studentmanagementapp.exception.StudentAlreadyExistsException;
import com.syfassignment.studentmanagementapp.exception.StudentNotFoundException;
import com.syfassignment.studentmanagementapp.repository.StudentRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    StudentRepository studentRepository;

    public StudentServiceImpl() {
    }

    public List<Student> getAllStudents() {
        return this.studentRepository.findAll();
    }

    public Student getStudentByName(String name) {
        Optional<Student> optional = this.studentRepository.findStudentByName(name);
        if (optional.isPresent()) {
            return (Student)optional.get();
        } else {
            throw new StudentNotFoundException("Student not found with the Name: " + name);
        }
    }

    public Student getUserById(int id) {
        Optional<Student> optional = this.studentRepository.findById(id);
        if (optional.isPresent()) {
            return (Student)optional.get();
        } else {
            throw new StudentNotFoundException("Student not found with the ID: " + id);
        }
    }

    public Student addStudent(Student student) {
        Optional<Student> studentExist = this.studentRepository.findStudentByName(student.getName());
        if (!studentExist.isPresent()) {
            Student updatedStudent = (Student)this.studentRepository.save(student);
            return student;
        } else {
            throw new StudentAlreadyExistsException("Student already present with the Name: " + student.getName());
        }
    }

    public String updateStudent(Student student) {
        Optional<Student> studentExist = this.studentRepository.findStudentByName(student.getName());
        if (studentExist.isPresent()) {
            Student updateStudent = (Student)studentExist.get();
            updateStudent.setName(student.getName());
            updateStudent.setAge(student.getAge());
            updateStudent.set_class(student.get_class());
            updateStudent.setPhone_number(student.getPhone_number());
            Student updatedStudent = (Student)this.studentRepository.save(updateStudent);
            return "User Details Updated Successfully";
        } else {
            throw new StudentNotFoundException("User not found with the Name: " + student.getName());
        }
    }

    public String deleteStudent(String name) {
        Optional<Student> optional = this.studentRepository.findStudentByName(name);
        if (optional.isPresent()) {
            this.studentRepository.deleteStudentByName(name);
            return "Deleted the student with name: " + name;
        } else {
            throw new StudentNotFoundException("Student not found with the Name: " + name);
        }
    }
}
