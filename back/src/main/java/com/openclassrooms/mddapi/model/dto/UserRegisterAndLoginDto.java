package com.openclassrooms.mddapi.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterAndLoginDto {
    String name;
    String email;
    String password;
}
