package com.syfassignment.studentmanagementapp.exception;

//Exception if Student Data already present in the DB
public class StudentAlreadyExistsException extends RuntimeException {
    public StudentAlreadyExistsException(String message) {
        super(message);
    }
}
