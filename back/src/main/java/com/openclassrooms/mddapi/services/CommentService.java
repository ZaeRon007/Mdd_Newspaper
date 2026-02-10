package com.openclassrooms.mddapi.services;

import java.text.ParseException;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.CommentEntity;
import com.openclassrooms.mddapi.model.dto.CommentDto;
import com.openclassrooms.mddapi.repository.CommentRepository;

@Service
public class CommentService {

    private final UserService userService;
    private final CommentRepository commentRepository;

    CommentService(CommentRepository commentRepositoryInput,
            UserService userServiceInput) {
        userService = userServiceInput;
        commentRepository = commentRepositoryInput;
    }

    /**
     * Allow user to comment an Article
     * 
     * @param article_id article id to comment
     * @param content    text to post
     * @return CommentDto : already transformed CommentEntity for front-end
     * @throws ParseException
     */
    public CommentDto commentArticle(int article_id, String content) throws ParseException {
        CommentDto commentToReturn = new CommentDto();
        int userId = userService.getMe().getId();
        CommentEntity commentToSave = new CommentEntity();
        commentToSave.setArticleId(article_id);
        commentToSave.setContent(content);
        commentToSave.setUserId(userId);

        commentToReturn.setContent(content);
        commentToReturn.setUser(userService.getMe().getName());

        commentRepository.save(commentToSave);

        return commentToReturn;
    }

    /**
     * Get all comments from an article id
     * 
     * @param id article id
     * @return Iterable<CommentEntity>: a list of CommentEntity
     */
    public Iterable<CommentEntity> getCommentsByArticleId(int id) {
        return commentRepository.findAllByArticleId(id);
    }

}
