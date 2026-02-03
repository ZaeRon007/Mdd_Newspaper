import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { provideHttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FullHeaderComponent } from 'src/app/core/components/headers/full-header/full-header.component';
import { MatDividerModule } from '@angular/material/divider';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticleService } from '../../services/articles.service';
import { of } from 'rxjs';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  let mockArticlesService: any;
  let router: Router;

  beforeEach(async () => {

    mockArticlesService = {
      createArticle: jest.fn(),
    }

    await TestBed.configureTestingModule({
      declarations: [CreateComponent, FullHeaderComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatDividerModule,
        RouterModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: ArticleService, useValue: mockArticlesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an article and navigate to /articles/home', () => {
    const article = {
      themeId: 1,
      title: 'title',
      content: 'content'
    }

    mockArticlesService.createArticle.mockReturnValue(of(article));

    fixture.detectChanges();

    component.onSubmit();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/articles/home');
  })
});
