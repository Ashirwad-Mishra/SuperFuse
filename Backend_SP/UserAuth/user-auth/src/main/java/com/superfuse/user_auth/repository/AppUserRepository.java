package com.superfuse.user_auth.repository;
import com.superfuse.user_auth.model.AppUser;
import com.superfuse.user_auth.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
    boolean existsByUsername(String username);
}