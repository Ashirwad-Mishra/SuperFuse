package superfuse.user_service.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import superfuse.user_service.DTOs.LogInRequest;
import superfuse.user_service.DTOs.LogInResponse;
import superfuse.user_service.Model.User;
import superfuse.user_service.Repos.UserRepos;
import superfuse.user_service.enums.AccountStatus;
import superfuse.user_service.security.JWTService;

@Service
public class AuthServices
{
    @Autowired
    private UserRepos userRepos;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTService jwtService;

    public LogInResponse logInByUserName(LogInRequest logInRequest)
    {
        String userName = logInRequest.getData();
        User user = userRepos.findByUserName(userName)
                .orElseThrow(() -> new RuntimeException("The username doesn't exist.................."));

        AccountStatus accountStatus = user.getAccountStatus();

        if (accountStatus != AccountStatus.ACTIVE)
            throw  new RuntimeException("The account is " + accountStatus);

        if(!passwordEncoder.matches(logInRequest.getPassword() , user.getPassword()))
            throw new RuntimeException("Wrong Password!!!!!!!!!!!");

        String token = jwtService.generateToken(user);

        return new LogInResponse(token , "bearer" , user.getUserId());
    }
}
