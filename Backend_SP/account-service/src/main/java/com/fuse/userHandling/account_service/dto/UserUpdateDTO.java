package com.fuse.userHandling.account_service.dto;

import lombok.Data;

@Data
public class UserUpdateDTO
{
    private String name;
    private String username;
    private String mobile;
    private String profilePictureUrl;
    private String gender;
    private String bio;
    private String dob;
}
