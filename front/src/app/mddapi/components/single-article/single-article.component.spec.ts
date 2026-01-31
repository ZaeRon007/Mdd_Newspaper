import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleArticleComponent } from './single-article.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FullHeaderComponent } from 'src/app/core/components/headers/full-header/full-header.component';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('SingleArticleComponent', () => {
  let component: SingleArticleComponent;
  let fixture: ComponentFixture<SingleArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleArticleComponent, FullHeaderComponent],
      imports:[MatIconModule, MatCardModule, MatIconModule, MatDividerModule, MatFormFieldModule],
      providers: [provideHttpClient(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SingleArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
