package com.mddapi.controllers;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mddapi.model.dto.ArticleDto;
import com.mddapi.services.ArticleService;

@RestController
@RequestMapping("/api")
public class ArticleController {

    @Autowired
    private ArticleService articleService;
    
    @GetMapping("/article/{id}")
    public ResponseEntity<?> getArticleById(@PathVariable String id){
        return ResponseEntity.ok().body(articleService.getArticleById(id));
    }

    @PostMapping("/article")
    public ResponseEntity<?> createArticle(@RequestBody ArticleDto article) throws ParseException{
        return ResponseEntity.ok().body(articleService.createArticle(article));
    }

    @GetMapping("/articles")
    public ResponseEntity<?> getArticles(){
        return ResponseEntity.ok().body(articleService.getAllArticles());
    }

    @GetMapping("/subscribes")
    public ResponseEntity<?> getAllSubscribes() throws ParseException{
        return ResponseEntity.ok().body(articleService.getAllSubscribes());
    }

    @PostMapping("/subscribe/{id}")
    public ResponseEntity<?> subscribeToArticle(@PathVariable String id) throws ParseException{
        articleService.subscribeToTheme(id);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/subscribe/{id}")
    public ResponseEntity<?> isSubscribedToTheme(@PathVariable String id) throws ParseException{
        return ResponseEntity.ok().body(articleService.isSubscribedToTheme(id));
    }

    @PostMapping("/unsubscribe/{id}")
    public ResponseEntity<?> unsubscribeToArticle(@PathVariable String id) throws ParseException{
        articleService.unsubscribeToTheme(id);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("subscribes/theme/{id}")
    public ResponseEntity<?> getArticlesByThemeId(@PathVariable String id){
        return ResponseEntity.ok().body(articleService.getArticlesByThemeId(id));
    }
}
