package com.superfuse.user_auth.service;

import com.superfuse.user_auth.dto.LoginRequest;
import com.superfuse.user_auth.dto.SignupRequest;
import com.superfuse.user_auth.model.AppUser;
import com.superfuse.user_auth.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AppUserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return "Username already taken.";
        }

        AppUser user = new AppUser(
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                request.getEmail()
        );

        userRepository.save(user);
        return "User registered successfully.";
    }

    public String loginUser(LoginRequest request) {
        AppUser user = userRepository.findByUsername(request.getUsername()).orElse(null);
        if (user == null) return "User not found.";

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Incorrect password.";
        }

        return "Login successful.";
    }
}