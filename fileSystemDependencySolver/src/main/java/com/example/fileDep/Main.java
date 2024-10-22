package com.example.filedep;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

public class Main {

    public static void main(String[] args) {
        Path rootPath = Paths.get("src", "main", "resources", "root").toAbsolutePath();
        System.out.println("Абсолютный путь к директории: " + rootPath);

        File rootDirectory = new File(rootPath.toString());
        if (!rootDirectory.exists() || !rootDirectory.isDirectory()) {
            System.out.println("Указанная директория не существует или не является папкой.");
            return;
        }

       
        List<File> textFiles = FileFinder.findTextFiles(rootDirectory);
        System.out.println("Найденные текстовые файлы:");
        for (File file : textFiles) {
            System.out.println(file.getPath());
        }

   
        Map<String, List<String>> dependencies = DependencyExtractor.extractDependencies(textFiles);
        System.out.println("\nЗависимости файлов:");
        for (Map.Entry<String, List<String>> entry : dependencies.entrySet()) {
            System.out.println("Файл: " + entry.getKey());
            for (String dependency : entry.getValue()) {
                System.out.println("  Зависит от: " + dependency);
            }
        }

      
        try {
            List<String> sortedFiles = DependencyResolver.topologicalSort(dependencies);
            System.out.println("\nУпорядоченные файлы для конкатенации:");
            for (String file : sortedFiles) {
                System.out.println(file);
            }

            
            concatenateFiles(sortedFiles, rootDirectory + "/result.txt");
            System.out.println("\nФайлы успешно объединены в 'result.txt'");

        } catch (Exception e) {
            System.out.println("\nОшибка: " + e.getMessage());
        }
    }

   
    private static void concatenateFiles(List<String> sortedFiles, String resultFilePath) {
        try (FileWriter writer = new FileWriter(resultFilePath)) {
            for (String filePath : sortedFiles) {
                File file = new File(filePath);
                writer.write("\n--- Содержимое файла: " + file.getName() + " ---\n");
                writer.write(java.nio.file.Files.readString(file.toPath()));
                writer.write("\n");
            }
        } catch (IOException e) {
            System.out.println("Ошибка при записи в файл: " + e.getMessage());
        }
    }
}
