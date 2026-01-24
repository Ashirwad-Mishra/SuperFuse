package superfuse.user_service.Repos;
import org.springframework.data.jpa.repository.JpaRepository;
import superfuse.user_service.Model.User;
import java.util.Optional;
import java.util.UUID;

public interface UserRepos extends JpaRepository<User, UUID>
{
    public boolean existsByEmail(String email);
    public boolean existsByPhoneNumber(String phoneNumber);
    public boolean existsByUserName(String userName);
    public Optional<User> findByUserName(String userName);
    public Optional<User> getUserById(UUID id);
}