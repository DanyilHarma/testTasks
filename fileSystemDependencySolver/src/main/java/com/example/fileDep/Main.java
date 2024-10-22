package com.example.filedep;
import java.nio.file.Path; 
import java.nio.file.Paths;
import java.io.File;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
       
          Path path = Paths.get("src", "main", "resources", "root").toAbsolutePath();
        System.out.println("Абсолютный путь к директории: " + path);

        String rootDirectoryPath = path.toString();

        File rootDirectory = new File(rootDirectoryPath);

        if (!rootDirectory.exists() || !rootDirectory.isDirectory()) {
            System.out.println("Указанная директория не существует или не является папкой.");
            return;
        }

       
        List<File> textFiles = new ArrayList<>();
        findTextFiles(rootDirectory, textFiles);

        
        System.out.println("Найденные текстовые файлы:");
        for (File file : textFiles) {
            System.out.println(file.getPath());
        }
    }

  
    private static void findTextFiles(File directory, List<File> textFiles) {
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
             
                    findTextFiles(file, textFiles);
                } else if (file.isFile() && file.getName().endsWith(".txt")) {
             
                    textFiles.add(file);
                }
            }
        }
    }
}
