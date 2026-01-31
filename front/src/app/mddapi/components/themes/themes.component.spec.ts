import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesComponent } from './themes.component';
import { provideHttpClient } from '@angular/common/http';
import { FullHeaderComponent } from 'src/app/core/components/headers/full-header/full-header.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { provideRouter, RouterModule } from '@angular/router';

describe('ThemesComponent', () => {
  let component: ThemesComponent;
  let fixture: ComponentFixture<ThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemesComponent, FullHeaderComponent],
      imports:[MatCardModule, MatDividerModule, RouterModule],
      providers: [provideHttpClient(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
