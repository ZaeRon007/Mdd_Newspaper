package com.openclassrooms.mddapi.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import com.jayway.jsonpath.JsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@Tag("UserControllerIntegrationTest")
@ActiveProfiles("test")
@TestInstance(Lifecycle.PER_CLASS)
public class UserControllerIntegrationTest {
        @Autowired
        private MockMvc mockMvc;

        private String token;

        @BeforeAll
        @DisplayName("should login user")
        public void shouldLoginUser() throws Exception {
                String authRequest = "{" +
                                "\"email\": \"pedro@gmail.com\"," +
                                "\"password\": \"test1234!A\"" +
                                "}";
                MvcResult response = mockMvc.perform(post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(authRequest))
                                .andExpect(status().isOk())
                                .andReturn();

                String tokenResponse = response.getResponse().getContentAsString();
                token = JsonPath.parse(tokenResponse).read("$.token");
        }

        @Test
        @DisplayName("should register user")
        public void shouldRegisterUser() throws Exception {
                String authRequest = "{" +
                                "\"name\": \"name\"," +
                                "\"email\": \"email@gmail.com\"," +
                                "\"password\": \"superPassword\"" +
                                "}";

                mockMvc.perform(post("/api/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(authRequest))
                                .andExpect(status().isOk());
        }

        @Test
        @DisplayName("should return logged user")
        public void shouldReturnLoggedUser() throws Exception {
                mockMvc.perform(get("/api/auth/me")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(0))
                                .andExpect(jsonPath("$.name").value("pedro"))
                                .andExpect(jsonPath("$.email").value("pedro@gmail.com"));
        }

        @AfterAll
        @DisplayName("should return put user")
        public void shouldReturnPutUser() throws Exception {
                String body = "{" +
                                "\"id\": 1," +
                                "\"name\": \"anotherName\"," +
                                "\"email\": \"email@yahoo.com\"" +
                                "}";

                mockMvc.perform(put("/api/profile/me")
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(1))
                                .andExpect(jsonPath("$.name").value("anotherName"))
                                .andExpect(jsonPath("$.email").value("email@yahoo.com"));
        }

        @Test
        @DisplayName("should found user by its id")
        public void shouldFoundUserById() throws Exception {
                mockMvc.perform(get("/api/user/" + 0)
                                .header("Authorization", "Bearer " + token)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").value(0))
                                .andExpect(jsonPath("$.name").value("pedro"))
                                .andExpect(jsonPath("$.email").value("pedro@gmail.com"));
        }
}
