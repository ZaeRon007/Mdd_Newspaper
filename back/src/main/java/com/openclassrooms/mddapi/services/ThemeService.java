package com.openclassrooms.mddapi.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.ThemeEntity;
import com.openclassrooms.mddapi.repository.ThemeRepository;

@Service
public class ThemeService {
    private final ThemeRepository themeRepository;

    ThemeService(ThemeRepository themeRepositoryInput) {
        themeRepository = themeRepositoryInput;
    }

    /**
     * Get all themes from database
     * 
     * @return Iterable<ThemeEntity> : a list of ThemeEntity
     */
    public Iterable<ThemeEntity> getThemes() {
        return themeRepository.findAll();
    }

    /**
     * Get a specific theme by an id
     * 
     * @param id
     * @return Optional<ThemeEntity> : a specific theme
     */
    public Optional<ThemeEntity> getThemeById(int id) {
        return themeRepository.findById(id);
    }
}
