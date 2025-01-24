package com.example.firstapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.firstapp.controller")
public class FirstAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(FirstAppApplication.class, args);
    }
}
