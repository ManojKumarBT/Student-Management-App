package com.syfassignment.studentmanagementapp.service;

import com.syfassignment.studentmanagementapp.entity.Student;
import java.util.List;

public interface StudentService {

    //API to get all the Students data
    List<Student> getAllStudents();

    //API to get a student by his name if his data exists
    Student getStudentByName(String name);

    //API to get a student by his ID if his data exists
    Student getUserById(int id);

    Student addStudent(Student student);

    String updateStudent(Student student);

    String deleteStudent(String name);
}
