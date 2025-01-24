package com.example.firstapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Paths;

@RestController
public class HelloController {

    @GetMapping("/ping")
    public String ping() {
        // Derive the application name from the folder name
        String appName = Paths.get("").toAbsolutePath().getFileName().toString();
        return "Application '" + appName + "' is up and running!";
    }
}
