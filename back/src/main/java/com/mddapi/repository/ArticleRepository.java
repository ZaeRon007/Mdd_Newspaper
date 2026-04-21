package com.mddapi.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mddapi.model.ArticleEntity;

@Repository
public interface ArticleRepository extends CrudRepository<ArticleEntity, Integer>{
    Optional<ArticleEntity> findById(Integer id);
    Optional<ArticleEntity[]> findAllByThemeId(Integer id);
}
