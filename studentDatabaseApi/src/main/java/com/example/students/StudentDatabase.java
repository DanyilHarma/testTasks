package com.example.students;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class StudentDatabase {
    private static final String URL = "jdbc:postgresql://localhost:5432/students_db";
    private static final String USER = "postgres";
    private static final String PASSWORD = "garmonia69";

    public Connection connect() throws SQLException {
      
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

   public void addStudent(Student student) {
    String sql = "INSERT INTO students (name, surname, patronymic, birth_date, group_name) VALUES (?, ?, ?, ?, ?)";


    try (Connection conn = connect();
         PreparedStatement pstmt = conn.prepareStatement(sql)) {

        pstmt.setString(1, student.getName());
        pstmt.setString(2, student.getSurname());
        pstmt.setString(3, student.getPatronymic());
        pstmt.setObject(4, student.getBirthDate());
        pstmt.setString(5, student.getGroupName());
        

        int affectedRows = pstmt.executeUpdate();
        if (affectedRows > 0) {
            System.out.println("Студент успешно добавлен в базу данных.");
        } else {
            System.out.println("Не удалось добавить студента в базу данных.");
        }

    } catch (SQLException e) {
        System.out.println("Ошибка при добавлении студента: " + e.getMessage());
    }
}
}
