package com.superfuse.profile.profile_service.Services;

import com.superfuse.profile.profile_service.DTOs.ProfileCreateRequestDTO;
import com.superfuse.profile.profile_service.DTOs.ProfileResponseDTO;
import com.superfuse.profile.profile_service.Entities.Profile;
import com.superfuse.profile.profile_service.Repos.ProfileRepo;
import com.superfuse.profile.profile_service.Utils.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService
{
    @Autowired
    private ProfileRepo profileRepo;

    public ProfileResponseDTO createProfile(ProfileCreateRequestDTO profileCreateRequestDTO)
    {
        String user = SecurityUtil.getCurrentUser();

        Profile profile = new Profile();

        profile.setUserId(user);
        profile.setFirstName(profileCreateRequestDTO.getFirstName());
        profile.setLastName(profileCreateRequestDTO.getLastName());
        profile.setGender(profileCreateRequestDTO.getGender());
        profile.setLanguage(profileCreateRequestDTO.getLanguage());
        profile.setBio(profileCreateRequestDTO.getBio());
        profile.setFilePictureUrl(profileCreateRequestDTO.getFilePictureUrl());
        profile.setDateOfBirth(profileCreateRequestDTO.getDateOfBirth());
        profile.setTimeZone(profileCreateRequestDTO.getTimeZone());

        Profile saved = profileRepo.save(profile);

        return new ProfileResponseDTO(
                "Your profile has been created.\nHere, are the details:-",
                saved.getUserId(),
                saved.getFirstName(),
                saved.getLastName(),
                saved.getDateOfBirth(),
                saved.getGender(),
                saved.getFilePictureUrl(),
                saved.getBio(),
                saved.getLanguage(),
                saved.getTimeZone()
        );
    }


    public ProfileResponseDTO updateProfile(ProfileCreateRequestDTO profileCreateRequestDTO)
    {
        String user = SecurityUtil.getCurrentUser();

        Profile profile = profileRepo.findById(user)
                .orElseThrow(()-> new RuntimeException("User couldn't be verified.\n" +
                        "This can be due to following reasons:-\n" +
                        "1. Token is expired, You should try logging in again.\n" +
                        "The user profile does not exist, create profile first"));

        if(profileCreateRequestDTO.getFirstName() != null)
        {
            profile.setFirstName(profileCreateRequestDTO.getFirstName());
        }

        if(profileCreateRequestDTO.getLastName() != null)
        {
            profile.setLastName(profileCreateRequestDTO.getLastName());
        }

        if(profileCreateRequestDTO.getDateOfBirth() != null)
        {
            profile.setDateOfBirth(profileCreateRequestDTO.getDateOfBirth());
        }

        if (profileCreateRequestDTO.getGender() != null)
        {
            profile.setGender(profileCreateRequestDTO.getGender());
        }

        if(profileCreateRequestDTO.getFilePictureUrl() != null)
        {
            profile.setFilePictureUrl(profileCreateRequestDTO.getFilePictureUrl());
        }

        if(profileCreateRequestDTO.getBio() != null)
        {
            profile.setBio(profileCreateRequestDTO.getBio());
        }

        if(profileCreateRequestDTO.getLanguage() != null)
        {
            profile.setLanguage(profileCreateRequestDTO.getLanguage());
        }

        if(profileCreateRequestDTO.getTimeZone() != null)
        {
            profile.setTimeZone(profileCreateRequestDTO.getTimeZone());
        }

        Profile saved = profileRepo.save(profile);

        return new ProfileResponseDTO(
                "Your profile has been updated.\nHere, are the details:-",
                saved.getUserId(),
                saved.getFirstName(),
                saved.getLastName(),
                saved.getDateOfBirth(),
                saved.getGender(),
                saved.getFilePictureUrl(),
                saved.getBio(),
                saved.getLanguage(),
                saved.getTimeZone()
        );
    }
}