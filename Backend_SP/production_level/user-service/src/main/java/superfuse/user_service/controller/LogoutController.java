package superfuse.user_service.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import superfuse.user_service.services.AuthServices;

@RestController
@RequestMapping("/logout")
public class LogoutController
{
    private final AuthServices authServices;

    public LogoutController(AuthServices authServices)
    {
        this.authServices = authServices;
    }

    @GetMapping
    public ResponseEntity<String> logout()
    {
        return ResponseEntity.ok(authServices.logout());
    }
}
