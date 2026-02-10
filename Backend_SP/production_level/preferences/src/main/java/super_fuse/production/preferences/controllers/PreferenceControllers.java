package super_fuse.production.preferences.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import super_fuse.production.preferences.DTOs.PreferenceDTO;
import super_fuse.production.preferences.Services.PreferenceServices;

@RestController
@RequestMapping("u/notification")
public class PreferenceControllers
{
    @Autowired
    PreferenceServices preferenceServices;

    @GetMapping("/status")
    public ResponseEntity<PreferenceDTO> getNotifications()
    {
        return ResponseEntity.ok(preferenceServices.getPrefernces());
    }
}