package com.example.students;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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

    public boolean deleteStudent(int studentId) {
        String sql = "DELETE FROM students WHERE student_id = ?";

        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, studentId);
            int affectedRows = pstmt.executeUpdate();
            return affectedRows > 0;

        } catch (SQLException e) {
            System.out.println("Ошибка при удалении студента: " + e.getMessage());
            return false;
        }
    }

    public List<Student> listStudents() {
        List<Student> students = new ArrayList<>();
        String sql = "SELECT * FROM students";

        try (Connection conn = connect();
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                Student student = new Student();
                student.setName(rs.getString("name"));
                student.setSurname(rs.getString("surname"));
                student.setPatronymic(rs.getString("patronymic"));
                student.setBirthDate(rs.getDate("birth_date").toLocalDate());
                student.setGroupName(rs.getString("group_name"));
                students.add(student);
            }

        } catch (SQLException e) {
            System.out.println("Ошибка при получении списка студентов: " + e.getMessage());
        }

        return students;
    }
}
