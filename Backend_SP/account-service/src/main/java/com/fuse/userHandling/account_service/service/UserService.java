package com.fuse.userHandling.account_service.service;

import com.fuse.userHandling.account_service.dto.UserRegisterDTO;
import com.fuse.userHandling.account_service.model.User;  // ✅ important
import com.fuse.userHandling.account_service.dto.UserUpdateDTO;

import java.util.List;
import java.util.UUID;

public interface UserService
{
    User registerUser(UserRegisterDTO userRegisterDTO);
    User findUserById(UUID id);
    List<User> findAllUsers();
    User updateUser(UUID id, UserUpdateDTO userUpdateDTO);
    void deleteUserById(UUID id);
}