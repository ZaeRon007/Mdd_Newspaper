import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeComponent } from './me.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FullHeaderComponent } from 'src/app/core/components/headers/full-header/full-header.component';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { ArticleService } from '../../services/articles.service';
import { ThemeService } from '../../services/theme.service';
import { DisplayThemes } from 'src/app/core/models/dto/displayTheme';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  let mockUserService: any;
  let mockArticlesService: any;
  let mockThemeService: any;

  beforeEach(async () => {

    mockUserService = {
      getMe: jest.fn(),
      updateMe: jest.fn(),
    }

    mockArticlesService = {
      setupThemeSubscriptionDisplay: jest.fn(),
    }

    mockThemeService = {
      unSubscribeToTheme: jest.fn(),
    }

    await TestBed.configureTestingModule({
      declarations: [
        MeComponent,
        FullHeaderComponent
      ],
      imports: [
        MatFormFieldModule,
        MatCardModule,
        MatDividerModule,
        FormsModule,
        MatInputModule,
        RouterModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: UserService, useValue: mockUserService },
        { provide: ArticleService, useValue: mockArticlesService },
        { provide: ThemeService, useValue: mockThemeService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user informations and get subscribed themes', async () => {
    const user = {
      name: 'roberto',
      email: 'roberto@gmail.com'
    }

    const themes = [
      {
        id: '1',
        title: 'sport',
        content: 'content',
        subscribed: true
      },
      {
        id: '2',
        title: 'cuisine',
        content: 'content',
        subscribed: true
      }
    ]

    mockUserService.getMe.mockReturnValue(of(user));
    mockArticlesService.setupThemeSubscriptionDisplay.mockReturnValue(of(themes));

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const informations = compiled.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

    expect(informations).not.toBeNull();
    expect(informations[0].value).toBe(user.name);
    expect(informations[1].value).toBe(user.email);

    expect(component.displayThemes$.value).not.toBeNull();
    expect(component.displayThemes$.value.at(0)?.title).toBe('sport');
    expect(component.displayThemes$.value.at(1)?.title).toBe('cuisine');
  });

  it('should update user informations', () => {
    const user = { 
      name: 'roberto', 
      email: 'roberto@gmail.com' 
    };

    mockUserService.getMe.mockReturnValue(of(user));
    mockArticlesService.setupThemeSubscriptionDisplay.mockReturnValue(of());
    mockUserService.updateMe.mockReturnValue(of());

    fixture.detectChanges();

    component.onSubmit();

    expect(component.user.email).toBe('roberto@gmail.com');
    expect(component.user.name).toBe('roberto');
  });

  it('should have user informations', () => {
    const user = { 
      name: 'roberto', 
      email: 'roberto@gmail.com' 
    };
    
    mockUserService.getMe.mockReturnValue(of(user));
    mockArticlesService.setupThemeSubscriptionDisplay.mockReturnValue(of());

    fixture.detectChanges();

    expect(component.user).toBe(user);
    expect(component.originalEmail).toBe(user.email);
    expect(component.originalUsername).toBe(user.name);
  });

  it('should unsubscribe', () => {
    const mockThemes = [
      {
        id: 1,
        title: 'sport',
        content: 'content',
        subscribed: true,
      },
      {
        id: 2,
        title: 'cuisine',
        content: 'content',
        subscribed: true,
      },
      {
        id: 3,
        title: 'actualités',
        content: 'content',
        subscribed: true,
      },
    ] as DisplayThemes[];


    mockUserService.getMe.mockReturnValue(of());
    mockArticlesService.setupThemeSubscriptionDisplay.mockReturnValue(of());
    mockThemeService.unSubscribeToTheme.mockReturnValue(of(mockThemes))

    component.displayThemes$.next(mockThemes);

    fixture.detectChanges();

    component.onClickUnSubscribe(3);

    expect(component.displayThemes$.value.length).toBe(2);
    expect(component.displayThemes$.value.at(0)?.title).toBe('sport')
    expect(component.displayThemes$.value.at(1)?.title).toBe('cuisine')
  });
});
