package com.example.filedep;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DependencyExtractor {
    public static Map<String, List<String>> extractDependencies(List<File> files) {
        Map<String, List<String>> dependencies = new HashMap<>();
        for (File file : files) {
            String filePath = file.getPath();
            List<String> requires = findDependencies(file);
            dependencies.put(filePath, requires);
        }
        return dependencies;
    }

    private static List<String> findDependencies(File file) {
        List<String> dependencies = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.startsWith("*require")) {
                    int start = line.indexOf('‘') + 1;
                    int end = line.lastIndexOf('’');
                    if (start != -1 && end != -1 && start < end) {
                        String dependencyPath = line.substring(start, end);
                        dependencies.add(Paths.get("src", "main", "resources", "root", dependencyPath).toAbsolutePath().toString());
                    }
                }
            }
        } catch (IOException e) {
            System.out.println("Ошибка при чтении файла: " + file.getPath());
        }
        return dependencies;
    }
}
