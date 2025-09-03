package com.AshirwadLearns.journell.controllers;


import com.AshirwadLearns.journell.Entity.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/SignUp")
public class SignUp
{
    private HashMap <Integer , UserDetails> users = new HashMap<>();

    @GetMapping()
    public HashMap <Integer , UserDetails> getUsers()
    {
        return this.users;
    }

    @PostMapping()
    public String signUp(@RequestBody UserDetails userDetails)
    {
        int id = getUsers().size();
        users.put(id + 1 , userDetails);
        return "Congratulations Mr. " + userDetails.getName() + "! You are signed up for the website.";
    }
}
