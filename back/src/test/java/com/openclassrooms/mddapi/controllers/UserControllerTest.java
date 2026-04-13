package com.openclassrooms.mddapi.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.text.ParseException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import com.openclassrooms.mddapi.model.dto.UserDto;
import com.openclassrooms.mddapi.model.dto.UserRegisterAndLoginDto;
import com.openclassrooms.mddapi.model.responses.simpleToken;
import com.openclassrooms.mddapi.services.UserService;

@SpringBootTest
@Tag("UserController")
@DisplayName("unit test for user controller")
@ActiveProfiles("test")
public class UserControllerTest {
    @InjectMocks
    private UserController userController;
    
    @Mock
    private UserService userService;

    @Test
    public void shouldRegisterUser(){
        String token = "supertoken";
        UserRegisterAndLoginDto userRegisterAndLoginDto = new UserRegisterAndLoginDto("name", "email", "password");

        when(userService.register(userRegisterAndLoginDto)).thenReturn(token);

        ResponseEntity<?> response = userController.userRegister(userRegisterAndLoginDto);

        assertEquals(response.getBody(), new simpleToken(token));
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(userService).register(userRegisterAndLoginDto);
    }

    @Test
    public void shouldNotRegisterUser(){
        UserRegisterAndLoginDto userRegisterAndLoginDto = new UserRegisterAndLoginDto("name", "email", "password");

        when(userService.register(userRegisterAndLoginDto)).thenReturn("");

        ResponseEntity<?> response = userController.userRegister(userRegisterAndLoginDto);

        assertEquals(response.getBody(), "Username already exist !");
        assertEquals(response.getStatusCode(), HttpStatus.BAD_REQUEST);

        Mockito.verify(userService).register(userRegisterAndLoginDto);
    }

    @Test
    public void shouldLoginUser(){
        String token = "supertoken";
        UserRegisterAndLoginDto userRegisterAndLoginDto = new UserRegisterAndLoginDto("name", "email", "password");

        when(userService.login(userRegisterAndLoginDto)).thenReturn(token);

        ResponseEntity<?> response = userController.userlogin(userRegisterAndLoginDto);

        assertEquals(response.getBody(), new simpleToken(token));
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(userService).login(userRegisterAndLoginDto);
    }

    @Test
    public void shouldNotLoginUser(){
        UserRegisterAndLoginDto userRegisterAndLoginDto = new UserRegisterAndLoginDto("name", "email", "password");

        when(userService.login(userRegisterAndLoginDto)).thenReturn("");

        ResponseEntity<?> response = userController.userlogin(userRegisterAndLoginDto);

        assertEquals(response.getBody(), "Username or Password is invalid !");
        assertEquals(response.getStatusCode(), HttpStatus.BAD_REQUEST);

        Mockito.verify(userService).login(userRegisterAndLoginDto);
    }

    @Test
    public void shouldReturnConnectedUser() throws ParseException{
        UserDto userDto = new UserDto(0, "name", "email");

        when(userService.getMe()).thenReturn(userDto);

        ResponseEntity<?> response = userController.getMe();

        assertEquals(response.getBody(), userDto);
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(userService).getMe();
    }

    @Test
    public void shouldReturnPutUser() throws ParseException{
        UserDto userDto = new UserDto(0, "name", "email");

        when(userService.putUser(userDto)).thenReturn(userDto);

        ResponseEntity<?> response = userController.putUser(userDto);

        assertEquals(response.getBody(), userDto);
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(userService).putUser(userDto);
    }

    @Test
    public void shouldReturnUserDtoById() throws ParseException{
        UserDto userDto = new UserDto(0, "name", "email");

        when(userService.getUserDtoById("0")).thenReturn(userDto);

        ResponseEntity<?> response = userController.getUserDtoById("0");

        assertEquals(response.getBody(), userDto);
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(userService).getUserDtoById("0");
    }


}
