package com.syfassignment.studentmanagementapp.exception;

//Exception if Student data is not present
public class StudentNotFoundException extends RuntimeException {
    public StudentNotFoundException(String message) {
        super(message);
    }
}
