package com.openclassrooms.mddapi.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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

import com.openclassrooms.mddapi.model.ArticleEntity;
import com.openclassrooms.mddapi.model.UserSubscribesEntity;
import com.openclassrooms.mddapi.model.dto.ArticleDto;
import com.openclassrooms.mddapi.services.ArticleService;

@Tag("ArticleController")
@DisplayName("unit test for Article Controller")
@SpringBootTest
@ActiveProfiles("test")
public class ArticleControllerTest {

    @InjectMocks
    private ArticleController articleController;

    @Mock
    private ArticleService articleService;

    @Test
    public void shouldReturnArticleById(){
        String id = "1";
        ArticleEntity article = new ArticleEntity("title",1,"content", 1);

        when(articleService.getArticleById(id)).thenReturn(Optional.of(article));

        ResponseEntity<?> response = articleController.getArticleById(id);

        assertEquals(Optional.of(article), response.getBody());
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(articleService).getArticleById(id);
    }

    @Test
    public void shouldPostArticle() throws ParseException{
        ArticleDto articleDto = new ArticleDto(0, "title", "content");
        ArticleEntity articleEntity = new ArticleEntity("title", 0, "content", 0);

        when(articleService.createArticle(articleDto)).thenReturn(articleEntity);

        ResponseEntity<?> response = articleController.createArticle(articleDto);

        assertEquals(articleEntity, response.getBody());
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(articleService).createArticle(articleDto);
    }

    @Test
    public void shouldReturnArticles(){
        ArticleEntity article1 = new ArticleEntity("title1", 1, "content", 2);
        ArticleEntity article2 = new ArticleEntity("title2", 2, "content", 2);
        ArticleEntity article3 = new ArticleEntity("title3", 3, "content", 2);

        List<ArticleEntity> list = Arrays.asList(article1, article2, article3);

        when(articleService.getAllArticles()).thenReturn(list);

        ResponseEntity<?> response = articleController.getArticles();

        assertEquals(list, response.getBody());
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(articleService).getAllArticles();
    }

    @Test
    public void shouldReturnSubscribes() throws ParseException{
        UserSubscribesEntity userSubs1 = new UserSubscribesEntity(0, "1", "2");
        UserSubscribesEntity userSubs2 = new UserSubscribesEntity(0, "1", "1");
        UserSubscribesEntity userSubs3 = new UserSubscribesEntity(0, "1", "3");

        List<UserSubscribesEntity> list = Arrays.asList(userSubs1, userSubs2, userSubs3);

        when(articleService.getAllSubscribes()).thenReturn(list);

        ResponseEntity<?> response = articleController.getAllSubscribes();

        assertEquals(list, response.getBody());
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(articleService).getAllSubscribes();
    }

    @Test
    public void shouldSubscribeToThemeId() throws ParseException{
        String id = "1";

        doNothing().when(articleService).subscribeToTheme(id);

        ResponseEntity<?> response = articleController.subscribeToArticle(id);

        assertEquals(response.getBody(), null);
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(articleService).subscribeToTheme(id);
    }

    @Test
    public void shouldReturnBooleanToSubscribedTheme() throws ParseException{
        String id = "1";

        when(articleService.isSubscribedToTheme(id)).thenReturn(true);
        
        ResponseEntity<?> response = articleController.isSubscribedToTheme(id);

        assertEquals(true, response.getBody());
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(articleService).isSubscribedToTheme(id);
    }

    @Test
    public void shouldUnsubscribedToThemeId() throws ParseException{
        String id = "1";

        doNothing().when(articleService).unsubscribeToTheme(id);

        ResponseEntity<?> reponse = articleController.unsubscribeToArticle(id);

        assertEquals(reponse.getBody(), null);
        assertEquals(reponse.getStatusCode(), HttpStatus.OK);

        Mockito.verify(articleService).unsubscribeToTheme(id);
    }

    @Test
    public void shouldReturnArticlesByThemeId(){
        String id = "1";
        ArticleEntity[] articleEntities = {
            new ArticleEntity("title1", 0, "content", 1),
            new ArticleEntity("title2", 0, "content", 2),
            new ArticleEntity("title3", 0, "content",3),
        };

        when(articleService.getArticlesByThemeId(id)).thenReturn(Optional.of(articleEntities));

        ResponseEntity<?> response = articleController.getArticlesByThemeId(id);

        assertEquals(Optional.of(articleEntities), response.getBody());
        assertEquals(response.getStatusCode(), HttpStatus.OK);
        
        Mockito.verify(articleService).getArticlesByThemeId(id);
    }
}
