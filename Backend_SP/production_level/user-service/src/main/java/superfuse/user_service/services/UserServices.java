package superfuse.user_service.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import superfuse.user_service.DTOs.RegisterResponseDTO;
import superfuse.user_service.DTOs.UserProfileResponse;
import superfuse.user_service.Model.User;
import superfuse.user_service.Repos.UserRepos;
import superfuse.user_service.enums.AccountStatus;
import superfuse.user_service.enums.Role;

import java.util.UUID;

@Service
public class UserServices
{
    @Autowired
    private UserRepos userRepos;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public RegisterResponseDTO registerUser(User user)
    {
        String userEmail = user.getEmail();
        String userPhone = user.getPhoneNumber();
        String userName = user.getUserName();
        String password = user.getPassword();
        String newPassword = passwordEncoder.encode(password);
        user.setPassword(newPassword);

        if (userRepos.existsByEmail(userEmail)) throw new RuntimeException();
        if (userRepos.existsByPhoneNumber(userPhone)) throw new RuntimeException();
        if (userRepos.existsByUserName(userName)) throw new RuntimeException();
        user.setAccountStatus(AccountStatus.ACTIVE);
        user.setRole(Role.USER);
        userRepos.save(user);

        RegisterResponseDTO registerResponseDTO = new RegisterResponseDTO(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAccountStatus()
        );

        return registerResponseDTO;
    }
    public UserProfileResponse getProfile(String userName)
    {
        User user = userRepos.findByUserName(userName)
                .orElseThrow(() -> new RuntimeException("User doesn't exist........."));

        return new UserProfileResponse(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }
    public void deleteUser(UUID id) {
        if (!userRepos.existsById(id))
            throw new RuntimeException("User not found");

        userRepos.deleteById(id);
    }
}
