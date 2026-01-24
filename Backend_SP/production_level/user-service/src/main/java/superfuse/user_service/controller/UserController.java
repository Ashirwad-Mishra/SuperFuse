package superfuse.user_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import superfuse.user_service.DTOs.ChangeRoleRepo;
import superfuse.user_service.DTOs.UserProfileResponse;
import superfuse.user_service.security.JWTService;
import superfuse.user_service.services.UserServices;

import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController
{

    private final UserServices userServices;

    public UserController(UserServices userServices)
    {
        this.userServices = userServices;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable UUID id)
    {
        return ResponseEntity.ok(userServices.suspendUser(id));
    }

    @GetMapping("/u")
    public ResponseEntity<UserProfileResponse> userProfile(Authentication auth)
    {
        return ResponseEntity.ok(userServices.getProfile(auth.getName()));
    }

    @PutMapping("/to/be/admin/{/id}")
    public ResponseEntity<ChangeRoleRepo> beComeAdmin(@PathVariable UUID id)
    {
        return ResponseEntity.ok(userServices.becomeAnAdmin(id));
    }
}