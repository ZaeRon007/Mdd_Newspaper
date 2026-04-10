package com.openclassrooms.mddapi.controllers;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.Mock;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.openclassrooms.mddapi.model.UserEntity;
import com.openclassrooms.mddapi.repository.UserRepository;

@SpringBootTest
@Tag("CommentControllerIntegrationTest")
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test")
public class CommentControllerIntegrationTest {

        @Autowired
        private MockMvc mockMvc;

        @Test
        @DisplayName("should post a new comment")
        @WithMockUser(username = "pedro@gmail.com")
        public void shouldPostComment() throws Exception {
                String postRequest = "{" +
                                "\"comment\": \"comment\"" +
                                "}";

                mockMvc.perform(post("/api/comment/article/6")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(postRequest))
                                .andExpect(status().isOk());
        }

        @Test
        @DisplayName("should get all comments")
        @WithMockUser(username = "pedro@gmail.com")
        public void shouldGetComments() throws Exception {
                mockMvc.perform(get("/api/comment/article/5")
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.[0].content").value("content1"))
                                .andExpect(jsonPath("$.[1].content").value("content2"))
                                .andExpect(jsonPath("$.[2].content").value("content3"))
                                .andExpect(jsonPath("$.[3].content").value("content4"));
        }
}
