package com.openclassrooms.mddapi.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.model.UserEntity;
import com.openclassrooms.mddapi.model.dto.UserDto;
import com.openclassrooms.mddapi.model.dto.UserRegisterAndLoginDto;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final TimeService timeService;
    private final AuthenticationManager authenticationManager;

    UserService(UserRepository userRepositoryInput,
            JwtService jwtServiceInput,
            PasswordEncoder passwordEncoderInput,
            TimeService timeServiceInput,
            AuthenticationManager authenticationManagerInput) {
        userRepository = userRepositoryInput;
        jwtService = jwtServiceInput;
        passwordEncoder = passwordEncoderInput;
        timeService = timeServiceInput;
        authenticationManager = authenticationManagerInput;
        // securityContextHolder = securityContextHolderInput;
    }

    /**
     * create a new user from database
     * 
     * @param userRegisterDto a user to register
     * @return UserEntity the created user
     */
    public UserEntity createUser(UserRegisterAndLoginDto userRegisterDto) {
        UserEntity userToAdd = new UserEntity(userRegisterDto.getName(),
                userRegisterDto.getEmail(),
                timeService.getTime());

        userToAdd.setUpdatedAt(timeService.getTime());
        userToAdd.setPassword(passwordEncoder.encode(userRegisterDto.getPassword()));
        return userToAdd;
    }

    /**
     * add a user to database
     * 
     * @param userEntity user to add
     */
    public void addUser(UserEntity userEntity) {
        userRepository.save(userEntity);
    }

    /**
     * remove a user from database
     * 
     * @param DBuser user to remove
     */
    public void removeUser(UserEntity userEntity) {
        userRepository.delete(userEntity);
    }

    /**
     * register a user to database
     * 
     * @param userRegisterDto user to register
     * @return the generated token for user
     */
    public String register(UserRegisterAndLoginDto userRegisterDto) {
        if (userRepository.existsByEmail(userRegisterDto.getEmail())) {
            return "";
        }
        UserEntity userToAdd = createUser(userRegisterDto);
        userRepository.save(userToAdd);

        return jwtService.generateToken(userToAdd);
    }

    /**
     * authenticate a user
     * 
     * @param userLoginDto user to authenticate
     * @return a new token for user
     */
    public String login(UserRegisterAndLoginDto userLoginDto) {
        String username = "";
        if (userLoginDto.getEmail() == null || userLoginDto.getEmail().isEmpty()) {
            username = userRepository.findByName(userLoginDto.getName()).getEmail();
        } else {
            username = userLoginDto.getEmail();
        }

        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(username, userLoginDto.getPassword()));
            UserEntity userToAdd = userRepository.findByEmail(username);
            userToAdd.setUpdatedAt(timeService.getTime());
            userRepository.save(userToAdd);

            return jwtService.generateToken(userToAdd);
        } catch (Exception e) {
            System.out.printf("Exception: %s\n", e);
            return null;
        }
    }

    /**
     * get the authenticated user from database
     * 
     * @return the authenticated user
     */
    public UserDto getMe() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username).ToUserDto();
    }

    /**
     * get a user by its id from database
     * 
     * @param id the user id
     * @return a user
     */
    public UserDto getUserDtoById(String id) {
        return userRepository.findById(Integer.parseInt(id)).ToUserDto();
    }

    /**
     * update user in database with request user
     * 
     * @param userDto
     * @return userDto
     */
    public UserDto putUser(UserDto userDto) {
        UserEntity userEntity = userRepository.findById(userDto.getId());
        userEntity.setEmail(userDto.getEmail());
        userEntity.setName(userDto.getName());
        userEntity.setUpdatedAt(timeService.getTime());
        return userRepository.save(userEntity).ToUserDto();
    }

}
