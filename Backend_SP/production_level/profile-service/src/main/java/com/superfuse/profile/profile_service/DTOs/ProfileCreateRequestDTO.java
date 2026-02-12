package com.superfuse.profile.profile_service.DTOs;

import com.superfuse.profile.profile_service.Enums.Gender;
import com.superfuse.profile.profile_service.Enums.Languages;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ProfileCreateRequestDTO
{
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private Gender gender;
    private String filePictureUrl;
    private String bio;
    private Languages language;
    private String timeZone;
}
