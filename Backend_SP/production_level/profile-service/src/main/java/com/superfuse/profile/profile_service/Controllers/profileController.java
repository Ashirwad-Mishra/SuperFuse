package com.superfuse.profile.profile_service.Controllers;

import com.superfuse.profile.profile_service.DTOs.ProfileCreateRequestDTO;
import com.superfuse.profile.profile_service.DTOs.ProfileResponseDTO;
import com.superfuse.profile.profile_service.Services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/profile")
public class profileController
{
    @Autowired
    private ProfileService profileService;

    @PostMapping("/create")
    public ResponseEntity<ProfileResponseDTO> createProfile(
            @RequestBody ProfileCreateRequestDTO profileCreateRequestDTO)
    {
        ProfileResponseDTO response =
                profileService.createProfile(profileCreateRequestDTO);

        URI location = URI.create("/profile/" + response.getUserId());

        return ResponseEntity.created(location).body(response);
    }

    @PatchMapping("/update")
    public ResponseEntity<ProfileResponseDTO> updateProfile(
            @RequestBody ProfileCreateRequestDTO profileCreateRequestDTO
        )
    {
        ProfileResponseDTO profileResponseDTO = profileService.updateProfile(profileCreateRequestDTO);

        URI location = URI.create("/profile/" + profileResponseDTO.getUserId());

        return ResponseEntity.ok(profileService.updateProfile(profileCreateRequestDTO));
    }
}