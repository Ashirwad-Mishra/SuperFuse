package SuperFuse.profile.user_auth.service;

import SuperFuse.profile.user_auth.DAO.UserRepos;
import SuperFuse.profile.user_auth.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService
{
    private final UserRepos userRepos;

    @Autowired
    public UserService(UserRepos userRepos)
    {
        this.userRepos = userRepos;
    }

    public User getUserById(String id)
    {
        return userRepos.findById(id).orElseThrow(() -> new RuntimeException("User not found!!!"));
    }

    public User getUserByEmail(String email)
    {
        return userRepos.findByEmail(String.valueOf(email)).orElseThrow(() ->
                new RuntimeException("User associated with email not found!!!"));
    }

    public User getUserByPhone(String phone)
    {
        return userRepos.findByPhone(phone).orElseThrow(()
                ->new RuntimeException("The user associated with this phone not found!!!!"));
    }

    public User getUserByName(String Name)
    {
        return userRepos.findByName(Name).orElseThrow(()
                ->new RuntimeException("The user associated with this phone not found!!!!"));
    }

    public Optional<User> updateEmail(String id , String newEmail)
    {
        if(newEmail == null || !newEmail.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"))
        {
            throw new IllegalArgumentException("Wrong email format!!!");
        }

        User user = userRepos.findById(id).orElseThrow(() -> new RuntimeException("User not found!!!"));
        user.setEmail(newEmail);
        userRepos.saveAndFlush(user);

        return Optional.of(user);
    }

    public Optional<User> updatePhone(String id , @org.jetbrains.annotations.NotNull String newPhone)
    {
        if(newPhone.length() != 10 || !newPhone.matches("\\\\d{10}"))
        {
            throw new IllegalArgumentException("Wrong phone!!!");
        }

        User user = userRepos.findById(id).orElseThrow(() -> new RuntimeException("The user not found!!!"));
        user.setPhone_no(newPhone);
        userRepos.saveAndFlush(user);
        return Optional.of(user);
    }

    Optional<User>  updateName(String id , String newName)
    {
        User user = userRepos.findById(id).orElseThrow(() -> new RuntimeException("User not found!!!!"));
        user.setFull_name(newName);
        userRepos.saveAndFlush(user);
        return Optional.of(user);
    }
}
