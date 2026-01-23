package superfuse.user_service.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import superfuse.user_service.DTOs.LogInRequest;
import superfuse.user_service.DTOs.LogInResponse;
import superfuse.user_service.services.AuthServices;

@RestController
@RequestMapping("login")
public class LogInController
{
    private final AuthServices authServices;

    public LogInController (AuthServices authServices)
    {
        this.authServices = authServices;
    }

    @PostMapping("/username")
    public ResponseEntity<LogInResponse> logIn(@Valid @RequestBody LogInRequest request)
    {
        LogInResponse logInResponse = authServices.logInByUserName(request);

        return ResponseEntity.ok(logInResponse);
    }
}
