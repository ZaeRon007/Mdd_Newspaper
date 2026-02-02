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
import { UserService } from '../../services/userService';
import { of } from 'rxjs';
import { ArticleService } from '../../services/articlesService';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  let mockUserService: any;
  let mockArticlesService: any;

  beforeEach(async () => {

    mockUserService = {
      getMe: jest.fn(),
    }

    mockArticlesService = {
      setupThemeSubscriptionDisplay: jest.fn(),
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
        { provide: ArticleService, useValue: mockArticlesService }
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
        title:'sport',
        content: 'content',
        subscribed: true
      },
      {
        id: '2',
        title:'cuisine',
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
  })
});
