package com.fuse.userHandling.account_service.service;

import com.fuse.userHandling.account_service.dto.UserRegisterDTO;
import com.fuse.userHandling.account_service.dto.UserUpdateDTO;
import com.fuse.userHandling.account_service.model.User;
import com.fuse.userHandling.account_service.repository.UserRepository;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(UserRegisterDTO userRegisterDTO) {
        // Validate unique fields
        if (userRepository.existsByEmail(userRegisterDTO.getEmail())) {
            throw new IllegalStateException("Email already in use.");
        }
        if (userRepository.existsByUsername(userRegisterDTO.getUsername())) {
            throw new IllegalStateException("Username already taken.");
        }
        if (userRegisterDTO.getMobile() != null
                && userRepository.existsByMobile(userRegisterDTO.getMobile())) {
            throw new IllegalStateException("Mobile number already in use.");
        }

        User newUser = User.builder()
                .name(userRegisterDTO.getName())
                .email(userRegisterDTO.getEmail())
                .username(userRegisterDTO.getUsername())
                .password(passwordEncoder.encode(userRegisterDTO.getPassword())) // hash password
                .mobile(userRegisterDTO.getMobile())
                .gender(userRegisterDTO.getGender())
                .dob(userRegisterDTO.getDob() != null
                        ? LocalDate.parse(userRegisterDTO.getDob())
                        : null)
                .bio(userRegisterDTO.getBio())
                .profilePictureUrl(userRegisterDTO.getProfilePictureUrl())
                .build();

        return userRepository.save(newUser);
    }

    @Override
    public User findUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(UUID id, UserUpdateDTO userUpdateDTO) {
        User existingUser = findUserById(id);

        if (userUpdateDTO.getName() != null) {
            existingUser.setName(userUpdateDTO.getName());
        }
        if (userUpdateDTO.getMobile() != null) {
            existingUser.setMobile(userUpdateDTO.getMobile());
        }
        if (userUpdateDTO.getBio() != null) {
            existingUser.setBio(userUpdateDTO.getBio());
        }
        if (userUpdateDTO.getDob() != null) {
            existingUser.setDob(LocalDate.parse(userUpdateDTO.getDob()));
        }
        if (userUpdateDTO.getGender() != null) {
            existingUser.setGender(userUpdateDTO.getGender());
        }
        if (userUpdateDTO.getProfilePictureUrl() != null) {
            existingUser.setProfilePictureUrl(userUpdateDTO.getProfilePictureUrl());
        }

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUserById(UUID id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
}