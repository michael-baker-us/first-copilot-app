package com.example.firstapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Paths;

@RestController
public class HelloController {

    private final String appName;

    public HelloController() {
        this.appName = Paths.get("").toAbsolutePath().getFileName().toString();
    }

    @GetMapping("/ping")
    public String ping() {
        return "Application '" + appName + "' is up and running!";
    }
}
