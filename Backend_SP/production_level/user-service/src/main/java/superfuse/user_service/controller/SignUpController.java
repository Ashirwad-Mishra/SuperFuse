package superfuse.user_service.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import superfuse.user_service.DTOs.APIResponse;
import superfuse.user_service.DTOs.RegisterResponseDTO;
import superfuse.user_service.Model.User;
import superfuse.user_service.services.UserServices;

@RestController
@RequestMapping("/signup")
public class SignUpController
{
    private final UserServices userServices;

    public SignUpController(UserServices userServices)
    {
        this.userServices = userServices;
    }

    @PostMapping("/register")
    public ResponseEntity<APIResponse<RegisterResponseDTO>> register(@RequestBody User user)
    {
        try {
            RegisterResponseDTO createdUser = userServices.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new APIResponse<>("Signup successful!", createdUser));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new APIResponse<>("Signup failed", null));
        }
    }

}
