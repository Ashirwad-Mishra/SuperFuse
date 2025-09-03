package com.fuse.userHandling.account_service.controller;

import com.fuse.userHandling.account_service.dto.UserDTO;
import com.fuse.userHandling.account_service.dto.UserRegisterDTO;
import com.fuse.userHandling.account_service.dto.UserUpdateDTO;
import com.fuse.userHandling.account_service.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fuse.userHandling.account_service.model.User;


import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users") // Using a versioned API path is a good practice
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // Mapper method to convert a User entity to a UserDTO
    private UserDTO convertToDto(User user)
    {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail()) // Be careful about exposing emails
                .username(user.getUsername())
                .mobile(user.getMobile())
                .profilePictureUrl(user.getProfilePictureUrl())
                .gender(user.getGender())
                .dob(user.getDob())
                .bio(user.getBio())
                .createdAt(user.getCreatedAt())
                .build();
    }

    /**
     * POST /api/v1/users/register : Registers a new user.
     */
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@Valid @RequestBody UserRegisterDTO userRegisterDTO) {
        User savedUser = userService.registerUser(userRegisterDTO);
        return new ResponseEntity<>(convertToDto(savedUser), HttpStatus.CREATED);
    }

    /**
     * GET /api/v1/users/{id} : Gets a single user by their ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable UUID id) {
        User user = userService.findUserById(id);
        // In a real app, a global exception handler would catch the "not found" exception
        return ResponseEntity.ok(convertToDto(user));
    }

    /**
     * GET /api/v1/users : Gets a list of all users.
     */
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<User> users = userService.findAllUsers();
        List<UserDTO> userDtos = users.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }

    /**
     * PUT /api/v1/users/{id} : Updates an existing user's information.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable UUID id,
                                              @Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        User updatedUser = userService.updateUser(id, userUpdateDTO);
        return ResponseEntity.ok(convertToDto(updatedUser));
    }

    /**
     * DELETE /api/v1/users/{id} : Deletes a user by their ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        userService.deleteUserById(id);
        // Return 204 No Content for successful deletion with no body
        return ResponseEntity.noContent().build();
    }
}