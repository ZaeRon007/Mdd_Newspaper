import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeComponent } from './me.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FullHeaderComponent } from 'src/app/core/components/headers/full-header/full-header.component';
import { MatDividerModule } from '@angular/material/divider';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent, FullHeaderComponent],
      imports:[MatFormFieldModule, MatCardModule, MatDividerModule],
      providers: [provideHttpClient(),
        provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
