package com.syfassignment.studentmanagementapp.controller;

import com.syfassignment.studentmanagementapp.entity.Student;
import com.syfassignment.studentmanagementapp.exception.StudentAlreadyExistsException;
import com.syfassignment.studentmanagementapp.exception.StudentNotFoundException;
import com.syfassignment.studentmanagementapp.service.StudentService;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping({"/StudentApp/v1"})
public class StudentController {
    @Autowired
    StudentService studentService;

    public StudentController() {
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public Map<String, String> handleValidationException(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError)error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    @ExceptionHandler({StudentNotFoundException.class})
    public ResponseEntity<String> handleUserNotFoundException(StudentNotFoundException ex) {
        return new ResponseEntity(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<String> handleException(Exception ex) {
        return new ResponseEntity("An error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //Exception Handler for the case Student Already Exists
    @ExceptionHandler({StudentAlreadyExistsException.class})
    public ResponseEntity<String> handleUserAlreadyExistsException(StudentAlreadyExistsException ex) {
        return new ResponseEntity(ex.getMessage(), HttpStatus.CONFLICT);
    }


    //API for Adding Student
    @PostMapping({"/addStudent"})
    public ResponseEntity<?> addStudent(@RequestBody @Valid Student student) {
        try {
            Student savedStudent = this.studentService.addStudent(student);
            return new ResponseEntity(savedStudent, HttpStatus.CREATED);
        } catch (StudentAlreadyExistsException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }


    //API for viewing all the students
    @GetMapping({"/students"})
    public ResponseEntity<?> getAllStudent() {
        try {
            List<Student> allUsers = this.studentService.getAllStudents();
            return new ResponseEntity(allUsers, HttpStatus.OK);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }


    //API for searching a student based on ID
    @GetMapping({"/user/{id}"})
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        try {
            Student user = this.studentService.getUserById(id);
            return new ResponseEntity(user, HttpStatus.OK);
        } catch (StudentNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }


    //API for searching a student based on Name
    @GetMapping({"/student"})
    public ResponseEntity<?> getStudentByName(@Param("name") @Valid String name) {
        try {
            Student user = this.studentService.getStudentByName(name);
            return new ResponseEntity(user, HttpStatus.OK);
        } catch (StudentNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }


    //API for Updating student details
    @PutMapping({"/update/student"})
    public ResponseEntity<?> updateStudent(@RequestBody @Valid Student student) {
        try {
            return new ResponseEntity(this.studentService.updateStudent(student), HttpStatus.OK);
        } catch (StudentNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }


    //API for Deleting a student
    @DeleteMapping({"delete/student"})
    public ResponseEntity<?> deleteUserByEmail(@Param("name") @Valid String name) {
        return new ResponseEntity(this.studentService.deleteStudent(name), HttpStatus.OK);
    }
}

