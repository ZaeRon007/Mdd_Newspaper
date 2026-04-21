package com.mddapi.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.mddapi.model.CommentEntity;
import com.mddapi.model.dto.CommentDto;
import com.mddapi.model.dto.CommentRequestDto;
import com.mddapi.model.dto.UserDto;
import com.mddapi.repository.CommentRepository;
import com.mddapi.services.CommentService;
import com.mddapi.services.UserService;

@Tag("CommentService")
@DisplayName("unit test for CommentService")
@ExtendWith(MockitoExtension.class)
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
