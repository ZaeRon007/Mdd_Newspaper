import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { provideHttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FullHeaderComponent } from 'src/app/core/components/headers/full-header/full-header.component';
import { MatDividerModule } from '@angular/material/divider';
import { provideRouter, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent, FullHeaderComponent],
      imports:[MatCardModule, MatIconModule, MatSelectModule, MatDividerModule, RouterModule, FormsModule],
      providers: [provideHttpClient(), provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
