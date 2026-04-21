package com.mddapi.model;

import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "ARTICLE")
@NoArgsConstructor
public class ArticleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "date")
    private Date createdAt;
    
    @Column(name = "content", length = 5000)
    private String content;

    @Column(name = "theme_id")
    private int themeId;

    @Column(name = "user_id")
    private int userId;

    public ArticleEntity(String title, int themeId, String content, int userId){
        this.title = title;
        this.themeId = themeId;
        this.content = content;
        this.userId = userId;
    }
}
