package com.syfassignment.studentmanagementapp.exception;

//Exception if the user sends Invalid Input
public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }
}
