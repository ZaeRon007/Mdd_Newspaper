package com.openclassrooms.mddapi.controllers;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.model.dto.CommentRequestDto;
import com.openclassrooms.mddapi.services.CommentService;

@RestController
@RequestMapping("/api/comment/article")
public class CommentController {
    
    @Autowired
    private CommentService commentService;

    @PostMapping("/{id}")
    public ResponseEntity<?> commentArticle(@PathVariable String id, @RequestBody CommentRequestDto comment) throws NumberFormatException, ParseException{
        return ResponseEntity.ok().body(commentService.commentArticle(Integer.parseInt(id), comment));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentsByArticleId(@PathVariable String id){
        return ResponseEntity.ok().body(commentService.getCommentsByArticleId(Integer.parseInt(id)));
    }

}
