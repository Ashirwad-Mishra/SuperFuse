package com.fuse.userHandling.account_service.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class UserDTO
{
    private UUID id;
    private String name;
    private String email;
    private String username;
    private String mobile;
    private String profilePictureUrl;
    private String gender;
    private LocalDate dob;
    private String bio;
    private LocalDateTime createdAt;
}