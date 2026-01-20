package SuperFuse.profile.user_auth.controllers;

import SuperFuse.profile.user_auth.Model.User;
import SuperFuse.profile.user_auth.service.UserService;
import jakarta.validation.Valid;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class userController
{
    @Autowired
    UserService userService;

    @PostMapping("/signUp")
    ResponseEntity<Object> SignUp(@Valid @RequestBody User user)
    {
        try
        {
            User savedUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch (RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/id/{id}")
    ResponseEntity<Object> getUserById(@PathVariable String id)
    {
        try
        {
            User user = userService.getUserById(id);
            return ResponseEntity.status(HttpStatus.FOUND).body(user);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }

    @GetMapping("/email/{email}")
    ResponseEntity<Object> getByEmail(@PathVariable String email)
    {
        try
        {
            User user = userService.getUserByEmail(email);
            return ResponseEntity.status(HttpStatus.FOUND).body(user);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }

    @GetMapping("/phone/{phone}")
    ResponseEntity<Object> getByPhone(@PathVariable @NotNull String phone)
    {
        if (phone.length() != 10 || !phone.matches("\\d{10}"))
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Enter correct phone number!!!");
        }
        try
        {
            User user = userService.getUserByPhone(phone);
            return ResponseEntity.status(HttpStatus.FOUND).body(user);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
    }

    @PutMapping("/id/{id}/email/{email}")
    ResponseEntity<Object> updateEmail(@PathVariable String id , @PathVariable String email)
    {
        if(email == null || !email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"))
        {
            throw new IllegalArgumentException("Wrong email format!!!");
        }

        try
        {
            User user = userService.getUserById(id);
            user.setEmail(email);
            return ResponseEntity.status(HttpStatus.OK).body(user);
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e);
        }
    }

}
