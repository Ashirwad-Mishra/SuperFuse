package com.superfuse.profile.profile_service.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class healthCheck
{
    @GetMapping
    public String health()
    {
        return "This application is working smoothly.....................................";
    }
}
