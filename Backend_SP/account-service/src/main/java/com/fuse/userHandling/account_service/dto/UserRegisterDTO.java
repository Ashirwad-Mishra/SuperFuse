package com.fuse.userHandling.account_service.dto;

import lombok.Data;

@Data
public class UserRegisterDTO
{
    private String name;
    private String email;
    private String password;
    private String username;
    private String mobile;
    private String gender;
    private String bio;
    private String profilePictureUrl;
    private String dob; // Stored as String, will parse later
}
