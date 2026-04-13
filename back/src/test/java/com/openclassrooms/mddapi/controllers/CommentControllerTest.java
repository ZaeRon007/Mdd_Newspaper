package com.openclassrooms.mddapi.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.Arrays;
import java.util.List;

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

import com.openclassrooms.mddapi.model.CommentEntity;
import com.openclassrooms.mddapi.model.dto.CommentDto;
import com.openclassrooms.mddapi.model.dto.CommentRequestDto;
import com.openclassrooms.mddapi.services.CommentService;

@Tag("CommentController")
@DisplayName("unit test for Comment controller")
@SpringBootTest
@ActiveProfiles("test")
public class CommentControllerTest {
    
    @InjectMocks
    private CommentController commentController;

    @Mock
    private CommentService commentService;

    @Test
    public void shouldCommentArticleById() throws NumberFormatException, ParseException{
        String id = "1";
        CommentDto commentDto = new CommentDto(0, "2", "content");
        CommentRequestDto comment = new CommentRequestDto("comment");
        
        when(commentService.commentArticle(1, comment)).thenReturn(commentDto);

        ResponseEntity<?> response = commentController.commentArticle(id, comment);
        
        assertEquals(response.getBody(), commentDto);
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(commentService).commentArticle(1, comment);
    }

    @Test
    public void shouldgetAllCommentsByArticleId() {
        CommentEntity comment1 = new CommentEntity(0, "content", 1, 2);
        CommentEntity comment2 = new CommentEntity(1, "content", 1, 5);
        CommentEntity comment3 = new CommentEntity(2, "content", 1, 8);

        List<CommentEntity> list = Arrays.asList(comment1, comment2, comment3);

        when(commentService.getCommentsByArticleId(0)).thenReturn(list);

        ResponseEntity<?> response = commentController.getCommentsByArticleId("0");

        assertEquals(response.getBody(), list);
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(commentService).getCommentsByArticleId(0);
    }
}
