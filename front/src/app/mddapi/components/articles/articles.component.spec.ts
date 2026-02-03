import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';
import { provideHttpClient } from '@angular/common/http';
import { FullHeaderComponent } from 'src/app/core/components/headers/full-header/full-header.component';
import { MatIconModule } from '@angular/material/icon';
import { provideRouter, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { of } from 'rxjs';
import { ArticleService } from '../../services/articles.service';
import { MatCardModule } from '@angular/material/card';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  let mockArticlesService: any;

  beforeEach(async () => {

    mockArticlesService = {
      setupArticles: jest.fn(),
    }

    await TestBed.configureTestingModule({
      declarations: [
        ArticlesComponent,
        FullHeaderComponent
      ],
      imports: [
        MatIconModule,
        RouterModule,
        MatDividerModule,
        MatCardModule
      ],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: ArticleService, useValue: mockArticlesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sould display articles', () => {

    const mockArticlesResponse = [
      {
        id: 1,
        title: 'Article test1',
        date: '02/02/2026',
        user: '1',
        content: 'ceci est le contenu de l article test',
        theme: 'test'
      },
      {
        id: 2,
        title: 'Article test2',
        date: '01/02/2026',
        user: '1',
        content: 'ceci est le contenu de l article test 2',
        theme: 'test'
      },
      {
        id: 3,
        title: 'Article test3',
        date: '03/02/2026',
        user: '1',
        content: 'ceci est le contenu de l article test 3',
        theme: 'test'
      }
    ]

    mockArticlesService.setupArticles.mockReturnValue(of(mockArticlesResponse));

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const titles = compiled.querySelectorAll('h2');

    expect(titles).not.toBeNull();
    expect(titles[0]!.textContent).toContain('Article test3');
    expect(titles[1]!.textContent).toContain('Article test1');
    expect(titles[2]!.textContent).toContain('Article test2');
  })

  it('sould sort articles ascendant then descendant', () => {

    const mockArticlesResponse = [
      {
        id: 1,
        title: 'Article test1',
        date: '02/02/2026',
        user: '1',
        content: 'ceci est le contenu de l article test',
        theme: 'test'
      },
      {
        id: 2,
        title: 'Article test2',
        date: '01/02/2026',
        user: '1',
        content: 'ceci est le contenu de l article test 2',
        theme: 'test'
      },
      {
        id: 3,
        title: 'Article test3',
        date: '03/02/2026',
        user: '1',
        content: 'ceci est le contenu de l article test 3',
        theme: 'test'
      }
    ]

    mockArticlesService.setupArticles.mockReturnValue(of(mockArticlesResponse));

    fixture.detectChanges();

    expect(component.articles.at(0)?.date).toBe('03/02/2026');
    expect(component.articles.at(1)?.date).toBe('02/02/2026');
    expect(component.articles.at(2)?.date).toBe('01/02/2026');

    component.sortByDate();

    expect(component.articles.at(0)?.date).toBe('01/02/2026');
    expect(component.articles.at(1)?.date).toBe('02/02/2026');
    expect(component.articles.at(2)?.date).toBe('03/02/2026');

  })
});
