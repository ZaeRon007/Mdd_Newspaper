import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';
import { provideHttpClient } from '@angular/common/http';
import { FullHeaderComponent } from 'src/app/core/components/headers/full-header/full-header.component';
import { MatIconModule } from '@angular/material/icon';
import { provideRouter, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesComponent, FullHeaderComponent],
      imports:[MatIconModule, RouterModule, MatDividerModule],
      providers: [provideHttpClient(), provideRouter([])]

    })
      .compileComponents();

    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
