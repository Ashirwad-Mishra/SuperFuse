package com.fuse.userHandling.account_service.repository;
import java.util.Optional;
import java.util.UUID;
import com.fuse.userHandling.account_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID>
{
    boolean existsByEmail(String email);
    boolean existsByMobile(String mobile);
    boolean existsByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findByMobile(String mobile);
}