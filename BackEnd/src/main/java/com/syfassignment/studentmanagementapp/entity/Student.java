package com.syfassignment.studentmanagementapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(
        name = "studentTable",
        uniqueConstraints = {@UniqueConstraint(
                columnNames = {"name"}
        )}
)
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @NotNull(message = "Name is mandatory")
    @Pattern(
            regexp = "^[A-Za-z ]{2,30}$",
            message = "Name must contain only letters and spaces and length should be min=2, max= 30"
    )
    private String name;

    @NotNull(message = "Age is mandatory")
    @Pattern(
            regexp = "^[1-9][0-9]?$",
            message = "Age must be between 1 and 99"
    )
    private String age;

    @NotNull(message = "Class is mandatory")
    @Pattern(
            regexp = "^[1-9]$|^10$",
            message = "Class must be between 1 and 10"
    )
    private String _class;

    @NotNull(message = "Phone Number is mandatory")
    @Min(
            value = 1000000000L,
            message = "Phone number must be at least 10 digits"
    )
    @Max(
            value = 9999999999L,
            message = "Phone number must be at most 10 digits"
    )
    private Long phone_number;

    
    //No Args Constructor
    public Student() {
    }

    //Constructor with args
    public Student(String name, String age, String _class, Long phone_number) {
        this.name = name;
        this.age = age;
        this._class = _class;
        this.phone_number = phone_number;
    }

    //Constructor with args along with Id
    public Student(int id, String name, String age, String _class, Long phone_number) {
        this.id = id;
        this.name = name;
        this.age = age;
        this._class = _class;
        this.phone_number = phone_number;
    }
        
    //Getter for the ID of the student
    public int getId() {
        return this.id;
    }

    //Setter for the ID of the student
    public void setId(int id) {
        this.id = id;
    }

    //Getter for the Name of the student
    public String getName() {
        return this.name;
    }

    //Setter for the Name of the student
    public void setName(String name) {
        this.name = name;
    }

    //Getter for the age of the student
    public String getAge() {
        return this.age;
    }

    //Setter for the age of the student
    public void setAge(String age) {
        this.age = age;
    }

    //Getter for the class of the student
    public String get_class() {
        return this._class;
    }

    //Setter for the class of the student
    public void set_class(String _class) {
        this._class = _class;
    }

    //Getter for the Phone Number of the student
    public Long getPhone_number() {
        return this.phone_number;
    }

    //Setter for the Phone Number of the student
    public void setPhone_number(Long phone_number) {
        this.phone_number = phone_number;
    }
}
