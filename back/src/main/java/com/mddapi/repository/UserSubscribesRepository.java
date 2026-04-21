package com.mddapi.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mddapi.model.UserSubscribesEntity;

@Repository
public interface UserSubscribesRepository extends CrudRepository<UserSubscribesEntity, Integer> {
    Iterable<UserSubscribesEntity> findAllById(int id);
    Iterable<UserSubscribesEntity> findAllByUserId(String id);
    UserSubscribesEntity findByUserIdAndThemeId(String userId, String ThemeId);
    Boolean existsByUserIdAndThemeId(String userId, String ThemeId);
}