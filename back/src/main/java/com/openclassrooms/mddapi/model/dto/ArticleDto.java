package com.openclassrooms.mddapi.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ArticleDto {
    int themeId;
    String title;
    String content;
}
