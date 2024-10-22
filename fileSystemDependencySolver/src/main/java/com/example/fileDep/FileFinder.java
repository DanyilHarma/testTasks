package com.example.filedep;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class FileFinder {
    public static List<File> findTextFiles(File directory) {
        List<File> textFiles = new ArrayList<>();
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    textFiles.addAll(findTextFiles(file));
                } else if (file.isFile() && file.getName().endsWith(".txt")) {
                    textFiles.add(file);
                }
            }
        }
        return textFiles;
    }
}
