import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArticleComponent } from './single-article.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, provideRouter, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FullHeaderComponent } from 'src/app/core/components/headers/full-header/full-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ArticleService } from '../../services/articlesService';
import { CommentService } from '../../services/commentService';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommentEntity } from 'src/app/core/models/CommentEntity';
import { DisplayComment } from 'src/app/core/models/dto/displayComment';

describe('SingleArticleComponent', () => {
  let component: SingleArticleComponent;
  let fixture: ComponentFixture<SingleArticleComponent>;

  let mockArticlesService: any;
  let mockCommentService: any;

  beforeEach(async () => {

    mockArticlesService = {
      setupSingleArticle: jest.fn(),
    }

    mockCommentService = {
      getCommentsByArticleId: jest.fn(),
      postComment: jest.fn(),
    }

    await TestBed.configureTestingModule({
      declarations: [
        SingleArticleComponent,
        FullHeaderComponent
      ],
      imports: [
        MatIconModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: ArticleService, useValue: mockArticlesService },
        { provide: CommentService, useValue: mockCommentService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleArticleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init component', () => {
    const mockArticle = {
      id: 1,
      title: 'sport',
      date: '02/02/26',
      user: 'test',
      content: 'super content',
      theme: 'sport',
    };

    const mockComments = [{
      user: 'user',
      content: 'content',
    }
    ] as DisplayComment[];

    mockArticlesService.setupSingleArticle.mockReturnValue(of(mockArticle));
    mockCommentService.getCommentsByArticleId.mockReturnValue(of(mockComments));

    fixture.detectChanges();

    expect(component.article).not.toBeNull();
    expect(component.article.title).toBe('sport');

    expect(component.comments$).not.toBeNull();
    expect(component.comments$.value.at(0)?.user).toBe('user');
    expect(component.comments$.value.at(0)?.content).toBe('content');
  });

  it('should push a comment', () => {
    const comment = {
      user: 'user',
      content: 'content'
    };

    mockCommentService.postComment.mockReturnValue(of(comment));
    mockArticlesService.setupSingleArticle.mockReturnValue(of());
    mockCommentService.getCommentsByArticleId.mockReturnValue(of());

    fixture.detectChanges();

    component.comment.content = 'test';
    component.onSubmit();

    expect(component.comments$).not.toBeNull();
    expect(component.comments$.value.at(0)?.user).toBe('user');
    expect(component.comments$.value.at(0)?.content).toBe('content');
  })

});
