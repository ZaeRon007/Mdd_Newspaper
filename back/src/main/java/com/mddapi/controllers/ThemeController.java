package com.mddapi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mddapi.services.ThemeService;

@RestController
@RequestMapping("/api")
public class ThemeController {
    

    @Autowired
    private ThemeService themeService;

    @GetMapping("/themes")
    public ResponseEntity<?> getThemes(){
        return ResponseEntity.ok().body(themeService.getThemes());
    }

    @GetMapping("/theme/{id}")
    public ResponseEntity<?> getThemeById(@PathVariable String id){
        return ResponseEntity.ok().body(themeService.getThemeById(Integer.parseInt(id)));
    }
}
