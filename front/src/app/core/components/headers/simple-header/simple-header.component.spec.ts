import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleHeaderComponent } from './simple-header.component';
import { MatDividerModule } from '@angular/material/divider';
import { provideRouter, RouterModule } from '@angular/router';

describe('SimpleHeaderComponent', () => {
  let component: SimpleHeaderComponent;
  let fixture: ComponentFixture<SimpleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleHeaderComponent ], 
      imports: [MatDividerModule, RouterModule],
      providers:[provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
