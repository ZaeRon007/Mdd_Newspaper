package com.openclassrooms.mddapi.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.openclassrooms.mddapi.services.UserService;

@SpringBootTest
@Tag("ArticleControllerIntegrationTest")
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
@ActiveProfiles("test")
public class ArticleControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @Test
    @DisplayName("should return an article")
    @WithMockUser(username = "pedro@gmail.com")
    public void shoudlReturnArticle() throws Exception {
        mockMvc.perform(get("/api/article/5"))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.id").value(5))
                        .andExpect(jsonPath("$.title").value("title5"))
                        .andExpect(jsonPath("$.createdAt").value("2026-02-02T16:25:19.000+00:00"))
                        .andExpect(jsonPath("$.content").value("content"))
                        .andExpect(jsonPath("$.themeId").value(1))
                        .andExpect(jsonPath("$.userId").value(3));
    }

    @Test
    @DisplayName("should get all articles and post a new one")
    @WithMockUser(username = "pedro@gmail.com")
    public void shouldReturnAllArticlesAndPostNewArticle() throws Exception {
        mockMvc.perform(get("/api/articles"))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.[0].id").value(5))
                        .andExpect(jsonPath("$.[0].title").value("title5"))
                        .andExpect(jsonPath("$.[0].createdAt").value("2026-02-02T16:25:19.000+00:00"))
                        .andExpect(jsonPath("$.[0].content").value("content"))
                        .andExpect(jsonPath("$.[1].id").value(6))
                        .andExpect(jsonPath("$.[1].title").value("title6"))
                        .andExpect(jsonPath("$.[1].createdAt").value("2026-02-02T16:25:19.000+00:00"))
                        .andExpect(jsonPath("$.[1].content").value("content"));


        String postRequest = "{" + 
                            "\"themeId\": \"3\"," + 
                            "\"title\": \"superTitle\"," + 
                            "\"content\": \"content\"" + 
                            "}";

        mockMvc.perform(post("/api/article")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postRequest))
                        .andExpect(status().isOk());
    }

    @Test
    @DisplayName("should return all subscribes")
    @WithMockUser(username = "pedro@gmail.com")
    public void shouldReturnSubscribes() throws Exception {
        mockMvc.perform(get("/api/subscribes"))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.[0].id").value(1))
                        .andExpect(jsonPath("$.[0].userId").value(3))
                        .andExpect(jsonPath("$.[0].themeId").value(1))
                        .andExpect(jsonPath("$.[1].id").value(2))
                        .andExpect(jsonPath("$.[1].userId").value(3))
                        .andExpect(jsonPath("$.[1].themeId").value(2));
    }

    @Test
    @DisplayName("should subscribe then unsubscribe to theme")
    @WithMockUser(username = "pedro@gmail.com")
    public void shouldSubscribeToTheme() throws Exception {
        mockMvc.perform(post("/api/subscribe/3"))
                        .andExpect(status().isOk());

        mockMvc.perform(post("/api/unsubscribe/3"))
                        .andExpect(status().isOk());
    }

    @Test
    @DisplayName("should return a boolean according to subscribed state")
    @WithMockUser(username = "pedro@gmail.com")
    public void shouldReturnTrueIfSubscribed() throws Exception {

    mockMvc.perform(get("/api/subscribe/1"))
                        .andExpect(status().isOk())
                        .andExpect(content().string("true"));
    }

    @Test
    @DisplayName("should get articles for a theme id")
    @WithMockUser(username = "pedro@gmail.com")
    public void shouldReturnArticlesByThemeId() throws Exception {
        mockMvc.perform(get("/api/subscribes/theme/1"))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.[0].id").value(5))
                        .andExpect(jsonPath("$.[0].title").value("title5"))
                        .andExpect(jsonPath("$.[0].content").value("content"));
    }

}
