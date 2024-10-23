package com.example.students;

import java.time.LocalDate;

public class Student {
    private String name;
    private String surname;
    private String patronymic;
    private LocalDate birthDate;
    private String groupName;
    private int studentId;

    public Student() {
    }

    public Student(String name, String surname, String patronymic, LocalDate birthDate, String groupName, int studentId) {
        this.name = name;
        this.surname = surname;
        this.patronymic = patronymic;
        this.birthDate = birthDate;
        this.groupName = groupName;
        this.studentId = studentId;
    }

 
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

 public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

 public String getBirthDateString() {
        return birthDate != null ? birthDate.toString() : null;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
}
