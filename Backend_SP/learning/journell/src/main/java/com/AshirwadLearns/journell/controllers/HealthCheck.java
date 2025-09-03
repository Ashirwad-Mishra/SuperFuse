package com.AshirwadLearns.journell.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheck
{

    @GetMapping("/healthCheck")
    public String HealthCheck()
    {
        return "The Application is running";
    }
}
