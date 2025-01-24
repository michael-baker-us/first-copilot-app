package com.example.firstapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.nio.file.Paths;

@Controller
public class IndexController {

    @GetMapping("/")
    public String index(Model model) {
        // Derive the application name from the folder name
        String appName = Paths.get("").toAbsolutePath().getFileName().toString();
        model.addAttribute("appName", appName);
        return "index";
    }
}