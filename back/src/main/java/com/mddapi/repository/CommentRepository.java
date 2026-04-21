package com.mddapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mddapi.model.CommentEntity;

@Repository
public interface CommentRepository extends CrudRepository<CommentEntity, Integer>{
    Iterable<CommentEntity> findAllByArticleId(int id);
}
