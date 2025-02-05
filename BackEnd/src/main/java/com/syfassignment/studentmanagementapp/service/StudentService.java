package com.syfassignment.studentmanagementapp.service;

import com.syfassignment.studentmanagementapp.entity.Student;
import java.util.List;

public interface StudentService {
    List<Student> getAllStudents();

    Student getStudentByName(String name);

    Student getUserById(int id);

    Student addStudent(Student student);

    String updateStudent(Student student);

    String deleteStudent(String name);
}
