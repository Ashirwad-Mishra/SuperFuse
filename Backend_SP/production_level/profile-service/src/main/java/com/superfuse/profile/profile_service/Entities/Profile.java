package com.superfuse.profile.profile_service.Entities;

import com.superfuse.profile.profile_service.Enums.Gender;
import com.superfuse.profile.profile_service.Enums.Languages;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(
        name = "user_profile"
)
public class Profile
{
    @Id
    @Column(name = "user_id", nullable = false , updatable = false)
    private String userId; //foreign key + primary key

    @Column(name = "first_name", nullable = false, updatable = true)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "profile_picture_url")
    private String filePictureUrl;

    @Column(name = "bio" , length = 500)
    private String bio;

    @Column(name = "language")
    @Enumerated(EnumType.STRING)
    private Languages language;

    @Column(name = "time_zone")
    private String timeZone;
}