package com.example.students;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.io.InputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.List;

public class StudentApi {

    public static void main(String[] args) {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
            server.createContext("/addStudent", new AddStudentHandler());
            server.createContext("/deleteStudent", new DeleteStudentHandler());
            server.createContext("/listStudents", new ListStudentsHandler());
            server.setExecutor(null);
            server.start();
            System.out.println("Сервер запущен на порту 8080...");
        } catch (IOException e) {
            System.err.println("Ошибка запуска сервера: " + e.getMessage());
        }
    }

    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
    }

    static class AddStudentHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                handleOptionsRequest(exchange);
            } else if ("POST".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);
                
                InputStream inputStream = exchange.getRequestBody();
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.registerModule(new JavaTimeModule());

                try {
                    Student student = objectMapper.readValue(inputStream, Student.class);

                    StudentDatabase db = new StudentDatabase();
                    db.addStudent(student);

                    String response = "Студент добавлен!";
                    exchange.sendResponseHeaders(200, response.getBytes().length);
                    OutputStream os = exchange.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                } catch (Exception e) {
                    e.printStackTrace();
                    exchange.sendResponseHeaders(500, -1);
                }
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        }

        private void handleOptionsRequest(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            exchange.sendResponseHeaders(204, -1);
        }
    }

   static class DeleteStudentHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        if ("OPTIONS".equals(exchange.getRequestMethod())) {
            handleOptionsRequest(exchange);
        } else if ("DELETE".equals(exchange.getRequestMethod())) {
            addCorsHeaders(exchange);

            try {
                String query = exchange.getRequestURI().getQuery();
                if (query == null || !query.startsWith("studentId=")) {
                    throw new IllegalArgumentException("Параметр studentId отсутствует или некорректен");
                }

                String[] params = query.split("=");
                if (params.length < 2) {
                    throw new IllegalArgumentException("Параметр studentId отсутствует или некорректен");
                }

                int studentId;
                try {
                    studentId = Integer.parseInt(params[1]);
                } catch (NumberFormatException e) {
                    throw new IllegalArgumentException("Параметр studentId должен быть целым числом");
                }

                StudentDatabase db = new StudentDatabase();
                boolean success = db.deleteStudent(studentId);

                String response = success ? "Студент удалён!" : "Не удалось удалить студента.";
                exchange.sendResponseHeaders(success ? 200 : 400, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } catch (IllegalArgumentException e) {
                String response = "Ошибка запроса: " + e.getMessage();
                exchange.sendResponseHeaders(400, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } catch (Exception e) {
                e.printStackTrace();
                exchange.sendResponseHeaders(500, -1);
            }
        } else {
            exchange.sendResponseHeaders(405, -1);
        }
    }

    private void handleOptionsRequest(HttpExchange exchange) throws IOException {
        addCorsHeaders(exchange);
        exchange.sendResponseHeaders(204, -1);
    }
}



    static class ListStudentsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equals(exchange.getRequestMethod())) {
                handleOptionsRequest(exchange);
            } else if ("GET".equals(exchange.getRequestMethod())) {
                addCorsHeaders(exchange);

                StudentDatabase db = new StudentDatabase();
                List<Student> students = db.listStudents();

                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.registerModule(new JavaTimeModule());
                String response = objectMapper.writeValueAsString(students);

                exchange.sendResponseHeaders(200, response.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        }

        private void handleOptionsRequest(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            exchange.sendResponseHeaders(204, -1);
        }
    }
}
