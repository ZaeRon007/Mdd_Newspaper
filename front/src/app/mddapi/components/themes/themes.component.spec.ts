import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesComponent } from './themes.component';
import { provideHttpClient } from '@angular/common/http';
import { FullHeaderComponent } from 'src/app/core/components/headers/full-header/full-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { provideRouter, RouterModule } from '@angular/router';
import { ArticleService } from '../../services/articles.service';
import { ThemeService } from '../../services/theme.service';
import { DisplayThemes } from 'src/app/core/models/dto/displayTheme';
import { of } from 'rxjs';

describe('ThemesComponent', () => {
  let component: ThemesComponent;
  let fixture: ComponentFixture<ThemesComponent>;

  let mockArticleService: any;
  let mockThemeService: any;

  beforeEach(async () => {

    mockArticleService = {
      setupDisplayThemes: jest.fn(),
    }

    mockThemeService = {
      subscribeToTheme: jest.fn(),
      unSubscribeToTheme: jest.fn(),
    }

    await TestBed.configureTestingModule({
      declarations: [
        ThemesComponent,
        FullHeaderComponent
      ],
      imports: [
        MatCardModule,
        MatDividerModule,
        RouterModule
      ],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: ArticleService, useValue: mockArticleService },
        { provide: ThemeService, useValue: mockThemeService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init theme list', () => {
    const mockThemes = [
      {
        id: 1,
        title: 'sport',
        content: 'super content',
        subscribed: true,
      },
      {
        id: 2,
        title: 'cuisine',
        content: 'super content',
        subscribed: true,
      },
      {
        id: 3,
        title: 'actualités',
        content: 'super content',
        subscribed: true,
      }] as DisplayThemes [];

      mockArticleService.setupDisplayThemes.mockReturnValue(of(mockThemes));

      fixture.detectChanges();

      expect(component.subscribedThemes$.value).not.toBeNull();
      expect(component.subscribedThemes$.value.at(0)?.title).toBe('sport');
      expect(component.subscribedThemes$.value.at(1)?.title).toBe('cuisine');
      expect(component.subscribedThemes$.value.at(2)?.title).toBe('actualités');

  });

  it('should subscribe then unsubscribe to theme', () => {
    const mockThemes = [
      {
        id: 0,
        title: 'sport',
        content: 'super content',
        subscribed: false,
      },
      {
        id: 1,
        title: 'cuisine',
        content: 'super content',
        subscribed: false,
      },
      {
        id: 2,
        title: 'actualités',
        content: 'super content',
        subscribed: true,
      }];

      mockArticleService.setupDisplayThemes.mockReturnValue(of(mockThemes));
      mockThemeService.subscribeToTheme.mockReturnValue(of(null));
      mockThemeService.unSubscribeToTheme.mockReturnValue(of(null));

      fixture.detectChanges();

      component.onClickSubscribe(0);

      expect(component.subscribedThemes$).not.toBeNull();
      expect(component.subscribedThemes$.value.at(0)?.subscribed).toBe(true);
      expect(component.subscribedThemes$.value.at(1)?.subscribed).toBe(false);
      expect(component.subscribedThemes$.value.at(2)?.subscribed).toBe(true);

      component.onClickUnSubscribe(2);

      expect(component.subscribedThemes$).not.toBeNull();
      expect(component.subscribedThemes$.value.at(0)?.subscribed).toBe(true);
      expect(component.subscribedThemes$.value.at(1)?.subscribed).toBe(false);
      expect(component.subscribedThemes$.value.at(2)?.subscribed).toBe(false);
  })
});
