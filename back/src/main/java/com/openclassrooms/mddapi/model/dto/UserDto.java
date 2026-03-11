package com.openclassrooms.mddapi.model.dto;

import com.openclassrooms.mddapi.model.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    int id;
    String name;
    String email;

    public UserEntity toUserEntity(){
        UserEntity userEntity = new UserEntity();
        userEntity.setId(id);
        userEntity.setName(name);
        userEntity.setEmail(email);
        return userEntity;
    }
}
