package SuperFuse.profile.user_auth.DAO;

import SuperFuse.profile.user_auth.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepos extends JpaRepository<User , String>
{
    @Override
    Optional<User> findById(String s);
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);
    Optional<User> findByName (String full_name);
}
