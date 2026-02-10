package com.openclassrooms.mddapi.services;

import java.text.ParseException;
import java.util.Date;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.openclassrooms.mddapi.model.ArticleEntity;
import com.openclassrooms.mddapi.model.UserSubscribesEntity;
import com.openclassrooms.mddapi.model.dto.ArticleDto;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.UserSubscribesRepository;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final UserSubscribesRepository userSubscribesRepository;
    private final UserService userService;

    ArticleService(ArticleRepository articleRepositoryInput,
            UserSubscribesRepository userSubscribesRepositoryInput,
            UserService userServiceInput) {
        articleRepository = articleRepositoryInput;
        userSubscribesRepository = userSubscribesRepositoryInput;
        userService = userServiceInput;
    }

    /**
     * Create an article
     * 
     * @param article a model containing required informations
     * @return ArticleEntity : an article
     * @throws ParseException
     */
    public ArticleEntity createArticle(ArticleDto article) throws ParseException {
        int userId = userService.getMe().getId();
        ArticleEntity articleToSave = new ArticleEntity(article.getTitle(),
                article.getThemeId(),
                article.getContent(),
                userId);
        articleToSave.setCreatedAt(new Date());
        articleRepository.save(articleToSave);
        return articleToSave;
    }

    /**
     * Get an article by its id
     * 
     * @param id
     * @return ArticleEntity : the wanted article
     */
    public Optional<ArticleEntity> getArticleById(String id) {
        return articleRepository.findById(Integer.parseInt(id));
    }

    /**
     * Get all articles
     * 
     * @return a list of ArticleEntity
     */
    public Iterable<ArticleEntity> getAllArticles() {
        return articleRepository.findAll();
    }

    /**
     * Get all subscribes for logged user
     * 
     * @return a list of UserSubscribesEntity
     * @throws ParseException
     */
    public Iterable<UserSubscribesEntity> getAllSubscribes() throws ParseException {
        int userId = userService.getMe().getId();
        return userSubscribesRepository.findAllByUserId(String.valueOf(userId));
    }

    /**
     * Permit to subscribe to a theme
     * 
     * @param id theme id
     * @throws ParseException
     */
    public void subscribeToTheme(String id) throws ParseException {
        int userId = userService.getMe().getId();
        UserSubscribesEntity userSubscribesEntity = new UserSubscribesEntity();
        userSubscribesEntity.setUserId(String.valueOf(userId));
        userSubscribesEntity.setThemeId(id);
        userSubscribesRepository.save(userSubscribesEntity);
    }

    /**
     * Permit to unsubscribe to a theme
     * 
     * @param id theme id
     * @throws ParseException
     */
    public void unsubscribeToTheme(String id) throws ParseException {
        int userId = userService.getMe().getId();
        userSubscribesRepository.delete(userSubscribesRepository.findByUserIdAndThemeId(String.valueOf(userId), id));
    }

    /**
     * Get all articles corresponding to a theme id
     * 
     * @param id theme id
     * @return Optional<ArticleEntity[]> : a list of ArticleEntity
     */
    public Optional<ArticleEntity[]> getArticlesByThemeId(String id) {
        return articleRepository.findAllByThemeId(Integer.parseInt(id));
    }

    /**
     * Get a boolean showing if user susbcribed to a theme
     * 
     * @param id theme id
     * @return boolean
     * @throws ParseException
     */
    public boolean isSubscribedToTheme(String id) throws ParseException {
        int userId = userService.getMe().getId();
        return userSubscribesRepository.existsByUserIdAndThemeId(String.valueOf(userId), id);
    }

}
