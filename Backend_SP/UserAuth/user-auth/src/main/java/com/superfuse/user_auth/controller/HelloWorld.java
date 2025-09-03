package com.superfuse.user_auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorld
{
    @GetMapping("/")
    public String home()
    {
        return "The backend is running";
    }
}
