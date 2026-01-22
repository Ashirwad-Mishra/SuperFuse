package superfuse.user_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import superfuse.user_service.DTOs.LogInRequest;
import superfuse.user_service.DTOs.LogInResponse;
import superfuse.user_service.Model.User;
import superfuse.user_service.Repos.UserRepos;
import superfuse.user_service.services.UserServices;

@RestController
@RequestMapping("login")
public class LogInController
{
    private UserServices userServices;
    @Autowired
    private  UserRepos userRepos;
    public LogInController (UserServices userServices)
    {
        this.userServices = userServices;
    }

    @PostMapping("username")
    public LogInResponse LoginService(LogInRequest request)
    {
        User user = userRepos.findByUserName(request.getData())
                .orElseThrow(() -> new RuntimeException("User not found.........."));

    }
}
