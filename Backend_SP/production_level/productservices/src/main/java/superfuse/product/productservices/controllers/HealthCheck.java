package superfuse.product.productservices.controllers;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/health")
public class HealthCheck
{
    @GetMapping
    public String getHealth()
    {
        return "The get services are working properly...................................";
    }

    @PostMapping
    public String postHealth(@RequestBody String string)
    {
        return "The post services are running properly" +
                "\nYou sent us this string: " +
                string;
    }
}
