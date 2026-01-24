package superfuse.address_services.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthCheck
{
    @GetMapping
    public String health()
    {
        return "The application is working smoothly.................................";
    }
}
