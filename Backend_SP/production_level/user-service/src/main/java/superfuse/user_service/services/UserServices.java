package superfuse.user_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.RequestBody;
import superfuse.user_service.Model.User;
import superfuse.user_service.Repos.UserRepos;
import java.util.UUID;

@Service
public class UserServices
{
    @Autowired
    private UserRepos userRepos;

    public User registerUser(User user)
    {
        String userEmail = user.getEmail();
        String userPhone = user.getPhoneNumber();
        String userName = user.getUserName();

        if (userRepos.existsByEmail(userEmail)) throw new RuntimeException();
        if (userRepos.existsByPhoneNumber(userPhone)) throw new RuntimeException();
        if (userRepos.existsByUserName(userName)) throw new RuntimeException();

        userRepos.save(user);
        return user;
    }

    public void deleteUser(UUID id) {
        if (!userRepos.existsById(id))
            throw new RuntimeException("User not found");

        userRepos.deleteById(id);
    }
}
