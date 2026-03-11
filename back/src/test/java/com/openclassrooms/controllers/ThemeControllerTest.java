package com.openclassrooms.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.openclassrooms.mddapi.controllers.ThemeController;
import com.openclassrooms.mddapi.model.ThemeEntity;
import com.openclassrooms.mddapi.services.ThemeService;

@Tag("ThemeController")
@DisplayName("unit test for theme controller")
@ExtendWith(MockitoExtension.class)
public class ThemeControllerTest {
    @InjectMocks
    private ThemeController themeController;

    @Mock
    private ThemeService themeService;

    @Test
    public void shouldReturnThemes(){
        ThemeEntity theme1 = new ThemeEntity(0, "sport", "content");
        ThemeEntity theme2 = new ThemeEntity(1, "cuisine", "content");
        ThemeEntity theme3 = new ThemeEntity(5, "actualités", "content");

        List<ThemeEntity> list = Arrays.asList(theme1, theme2, theme3);

        when(themeService.getThemes()).thenReturn(list);

        ResponseEntity<?> response = themeController.getThemes();

        assertEquals(response.getBody(), list);
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(themeService).getThemes();
    }

    @Test
    public void shouldReturnThemeById(){
        ThemeEntity theme1 = new ThemeEntity(0, "sport", "content");

        when(themeService.getThemeById(0)).thenReturn(Optional.of(theme1));

        ResponseEntity<?> response = themeController.getThemeById("0");

        assertEquals(response.getBody(), Optional.of(theme1));
        assertEquals(response.getStatusCode(), HttpStatus.OK);

        Mockito.verify(themeService).getThemeById(0);
    }
}
