package com.example.filedep;

import java.util.*;

public class DependencyResolver {
    public static List<String> topologicalSort(Map<String, List<String>> dependencies) throws Exception {
        List<String> sortedFiles = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        Set<String> recursionStack = new HashSet<>();

        for (String file : dependencies.keySet()) {
            if (!visited.contains(file)) {
                topologicalSortUtil(file, dependencies, visited, recursionStack, sortedFiles);
            }
        }

        return sortedFiles;
    }

    private static void topologicalSortUtil(String file, Map<String, List<String>> dependencies, Set<String> visited, Set<String> recursionStack, List<String> sortedFiles) throws Exception {
        if (recursionStack.contains(file)) {
            throw new Exception("Обнаружена циклическая зависимость: " + file);
        }

        if (!visited.contains(file)) {
            visited.add(file);
            recursionStack.add(file);

            List<String> deps = dependencies.get(file);
            if (deps != null) {
                for (String dep : deps) {
                    topologicalSortUtil(dep, dependencies, visited, recursionStack, sortedFiles);
                }
            }

            recursionStack.remove(file);
            sortedFiles.add(file);
        }
    }
}
