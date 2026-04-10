package com.openclassrooms.mddapi.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.openclassrooms.mddapi.model.CommentEntity;
import com.openclassrooms.mddapi.model.dto.CommentDto;
import com.openclassrooms.mddapi.model.dto.CommentRequestDto;
import com.openclassrooms.mddapi.model.dto.UserDto;
import com.openclassrooms.mddapi.repository.CommentRepository;

@Tag("CommentService")
@DisplayName("unit test for CommentService")
@SpringBootTest
@ActiveProfiles("test")
public class CommentServiceTest {
    
    @InjectMocks
    private CommentService commentService;

    @Mock
    private UserService userService;

    @Mock
    private CommentRepository commentRepository;

    @Test
    @DisplayName("should comment article")
    public void shouldCommentArticle() {
        String username = "name";
        CommentRequestDto content = new CommentRequestDto("content");

        UserDto user = new UserDto();
        user.setId(0);
        user.setEmail("email");
        user.setName(username);

        when(userService.getMe()).thenReturn(user);
        when(commentRepository.save(any(CommentEntity.class))).thenReturn(null);

        CommentDto commentDto = commentService.commentArticle(1, content);

        assertNotNull(commentDto);
        assertEquals(commentDto.getContent(), content.getComment());
        assertEquals(commentDto.getUser(), username);

    }
}
