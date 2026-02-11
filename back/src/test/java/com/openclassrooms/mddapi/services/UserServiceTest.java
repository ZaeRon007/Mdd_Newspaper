package com.openclassrooms.mddapi.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import com.openclassrooms.mddapi.model.UserEntity;
import com.openclassrooms.mddapi.model.dto.UserDto;
import com.openclassrooms.mddapi.model.dto.UserRegisterAndLoginDto;
import com.openclassrooms.mddapi.repository.UserRepository;

@Tag("UserService")
@DisplayName("unit test for userService")
@SpringBootTest
@ActiveProfiles("test")
public class UserServiceTest {
    @InjectMocks
    public UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private TimeService timeService;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    // @Mock
    // private SecurityContextHolder securityContextHolder;

    @Test
    @DisplayName("should create a new user")
    public void createUser() {
        // GIVEN
        UserRegisterAndLoginDto user = new UserRegisterAndLoginDto();
        user.setName("roberto");
        user.setEmail("roberto@gmail.com");
        user.setPassword("password");

        LocalDateTime localDateTime = LocalDateTime.of(2026, 2, 4, 10, 0);

        when(timeService.getTime()).thenReturn(localDateTime.toString());
        when(passwordEncoder.encode("password")).thenReturn("encodedPassword");

        // WHEN
        UserEntity result = userService.createUser(user);

        // THEN
        assertNotNull(result);
        assertEquals(user.getEmail(), result.getEmail());
        assertEquals(user.getName(), result.getName());
        assertEquals("encodedPassword", result.getPassword());

        assertEquals(localDateTime.toString(), result.getCreatedAt());
        assertEquals(localDateTime.toString(), result.getUpdatedAt());

        verify(passwordEncoder).encode("password");
        verify(timeService, times(2)).getTime();
    }

    @Test
    @DisplayName("should add user to database")
    public void addUserToDatabase() {
        // GIVEN
        LocalDateTime localDateTime = LocalDateTime.of(2026, 2, 4, 10, 0);

        UserEntity userEntity = new UserEntity();
        userEntity.setName("roberto");
        userEntity.setEmail("roberto@gmail.com");
        userEntity.setPassword("password");
        userEntity.setCreatedAt(localDateTime.toString());
        userEntity.setUpdatedAt(localDateTime.toString());

        when(userRepository.save(userEntity)).thenReturn(userEntity);
        when(userRepository.findById(1)).thenReturn(userEntity);
        // WHEN
        userService.addUser(userEntity);

        // THEN
        UserEntity userFound = userRepository.findById(1);
        assertEquals(userEntity, userFound);

        verify(userRepository).save(userEntity);
        verify(userRepository).findById(1);
    }

    @Test
    @DisplayName("should remove user from database")
    public void removeUserFromDatabase() {
        // GIVEN
        LocalDateTime localDateTime = LocalDateTime.of(2026, 2, 4, 10, 0);

        UserEntity userEntity = new UserEntity();
        userEntity.setName("roberto");
        userEntity.setEmail("roberto@gmail.com");
        userEntity.setPassword("password");
        userEntity.setCreatedAt(localDateTime.toString());
        userEntity.setUpdatedAt(localDateTime.toString());

        // WHEN
        userRepository.save(userEntity);

        userRepository.delete(userEntity);

        UserEntity foundUser = userRepository.findByEmail(userEntity.getEmail());

        // THEN

        assertNull(foundUser);
        verify(userRepository).save(userEntity);
        verify(userRepository).delete(userEntity);
    }

    @Test
    @DisplayName("sould register user and generate a token")
    public void shouldRegisterUser() {
        // GIVEN
        UserRegisterAndLoginDto user = new UserRegisterAndLoginDto();
        user.setEmail("roberta@gmail.com");
        user.setPassword("password");

        LocalDateTime localDateTime = LocalDateTime.of(2026, 2, 4, 10, 0);

        UserEntity userEntity = new UserEntity();
        userEntity.setName("roberta");
        userEntity.setEmail("roberta@gmail.com");
        userEntity.setPassword("password");
        userEntity.setCreatedAt(localDateTime.toString());
        userEntity.setUpdatedAt(localDateTime.toString());

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPasword");
        when(jwtService.generateToken(any(UserEntity.class))).thenReturn("super-token");

        // WHEN

        String token = userService.register(user);

        // THEN

        assertNotNull(token);
        assertEquals("super-token", token);
        verify(userRepository).existsByEmail(user.getEmail());
    };

    @Test
    @DisplayName("should not register because user exist")
    public void shouldNotRegister() {
        // GIVEN
        UserRegisterAndLoginDto user = new UserRegisterAndLoginDto();
        user.setEmail("roberta@gmail.com");
        user.setPassword("password");

        when(userRepository.existsByEmail(anyString())).thenReturn(false);

        // WHEN

        String token = userService.register(user);

        // THEN
        assertNull(token);
        verify(userRepository).existsByEmail(anyString());
    }

    @Test
    @DisplayName("sould login user")
    public void shouldLoginUser() {
        UserRegisterAndLoginDto user = new UserRegisterAndLoginDto();
        user.setName("roberta");
        user.setEmail("");
        user.setPassword("password");

        LocalDateTime localDateTime = LocalDateTime.of(2026, 2, 4, 10, 0);

        UserEntity user2 = new UserEntity();
        user2.setName("roberta");
        user2.setEmail("roberta@gmail.com");
        user2.setPassword("password");
        user2.setCreatedAt(localDateTime.toString());

        when(userRepository.findByName(user.getName())).thenReturn(user2);
        when(authenticationManager.authenticate(any())).thenReturn(mock(Authentication.class));
        when(userRepository.findByEmail(anyString())).thenReturn(user2);
        when(timeService.getTime()).thenReturn(localDateTime.toString());
        when(jwtService.generateToken(any(UserEntity.class))).thenReturn("super-token");

        String token = userService.login(user);

        assertNotNull(token);
        assertEquals("super-token", token);
        verify(userRepository).findByName(user.getName());
        verify(authenticationManager).authenticate(any());
        verify(userRepository).findByEmail(anyString());
        verify(userRepository).save(any(UserEntity.class));
        verify(jwtService).generateToken(any(UserEntity.class));
    }

    @Test
    @DisplayName("should not login user : BadCredentialException")
    public void shouldNotLoginUser() {
        UserRegisterAndLoginDto user = new UserRegisterAndLoginDto();
        user.setEmail("roberta@gmail.com");
        user.setPassword("password");

        when(authenticationManager.authenticate(any())).thenThrow(BadCredentialsException.class);

        String token = userService.login(user);

        assertNull(token);
    }

    @Test
    @DisplayName("should found user by id")
    public void shouldGetMe() {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail("roberto@gmail.com");
        userEntity.setName("roberto");
        userEntity.setId(0);

        when(userRepository.findById(0)).thenReturn(userEntity);

        UserDto userDto = userService.getUserDtoById("0");

        assertNotNull(userDto);
        assertEquals(userEntity.getEmail(), userDto.getEmail());
    }

    @Test
    @DisplayName("should put user informations")
    public void shouldPutUser() {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail("roberto@gmail.com");
        userEntity.setName("roberto");
        userEntity.setId(0);

        LocalDateTime localDateTime = LocalDateTime.of(2026, 2, 4, 10, 0);

        when(timeService.getTime()).thenReturn(localDateTime.toString());
        when(userRepository.findById(0)).thenReturn(userEntity);
        when(userRepository.save(userEntity)).thenReturn(userEntity);

        UserDto foundUser = userService.putUser(userEntity.ToUserDto());

        assertNotNull(foundUser);
        assertEquals(foundUser.getEmail(), userEntity.getEmail());
    }
}
