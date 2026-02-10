package com.openclassrooms.mddapi.services;

import java.util.ArrayList;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.model.UserEntity;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    CustomUserDetailsService(UserRepository userRepositoryInput) {
        userRepository = userRepositoryInput;
    }

    /**
     * load a user from database by it's email
     * 
     * @param email
     * @return UserDetails
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + email);
        }
        return new User(user.getEmail(),
                user.getPassword(),
                new ArrayList<>());
    }
}
