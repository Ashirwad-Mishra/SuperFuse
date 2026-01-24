package superfuse.user_service.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import superfuse.user_service.Model.User;
import superfuse.user_service.Repos.UserRepos;

@Service
public class CustomUserDetailsService implements UserDetailsService
{
    private final UserRepos userRepos;

    public CustomUserDetailsService(UserRepos userRepos)
    {
        this.userRepos = userRepos;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
    {
        User user = userRepos.findByUserName(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUserName())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}
