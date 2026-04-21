package com.mddapi.controllers;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mddapi.model.dto.UserDto;
import com.mddapi.model.dto.UserRegisterAndLoginDto;
import com.mddapi.model.responses.simpleToken;
import com.mddapi.services.UserService;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<?> userRegister(@RequestBody UserRegisterAndLoginDto userRegisterDto){
        String token = userService.register(userRegisterDto);

        if(token.isEmpty())
            return ResponseEntity.badRequest().body("Username already exist !");

        return ResponseEntity.ok().body(new simpleToken(token));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> userlogin(@RequestBody UserRegisterAndLoginDto userLoginDto){
        String token = userService.login(userLoginDto);

        if(token.isEmpty())
            return ResponseEntity.badRequest().body("Username or Password is invalid !");

        return ResponseEntity.ok().body(new simpleToken(token));
    }

    @GetMapping("/auth/me")
    public ResponseEntity<?> getMe() throws ParseException{
        return ResponseEntity.ok().body(userService.getMe());
    }
    
    @PutMapping("/profile/me")
    public ResponseEntity<?> putUser(@RequestBody UserDto user) throws ParseException{
        return ResponseEntity.ok().body(userService.putUser(user));
    }
    
    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserDtoById(@PathVariable String id) throws NumberFormatException, ParseException {
        return ResponseEntity.ok().body(userService.getUserDtoById(id));
    }
}
