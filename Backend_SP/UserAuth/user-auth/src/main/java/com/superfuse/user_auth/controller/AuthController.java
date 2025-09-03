package com.superfuse.user_auth.controller;

import com.superfuse.user_auth.dto.LoginRequest;
import com.superfuse.user_auth.dto.SignupRequest;
import com.superfuse.user_auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> register(@RequestBody SignupRequest request) {
        String result = authService.registerUser(request);
        return ResponseEntity.ok(Collections.singletonMap("message", result));
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        String result = authService.loginUser(request);
        return ResponseEntity.ok(Collections.singletonMap("message", result));
    }
}