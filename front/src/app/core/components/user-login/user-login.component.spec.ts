import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SimpleHeaderComponent } from '../headers/simple-header/simple-header.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;

  let mockAuthService: any;
  let router: Router;

  beforeEach(async () => {

    mockAuthService = {
      loginUser: jest.fn(),
      setToken: jest.fn(),
    }

    await TestBed.configureTestingModule({
      declarations: [ UserLoginComponent, SimpleHeaderComponent],
      imports:[
        RouterModule, 
        MatFormFieldModule, 
        MatDividerModule, 
        MatCardModule, 
        MatIconModule, 
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideHttpClient(), 
        provideRouter([]),
        { provide: AuthService, useValue: mockAuthService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl');
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sould login user and navigate to ../articles/home', () => {
    component.user = {
      email: '',
      name: 'roberto',
      password: 'password'
    }

    const mockTokenResponse = {
      token: 'fake-token'
    }

    mockAuthService.loginUser.mockReturnValue(of(mockTokenResponse));

    fixture.detectChanges();

    component.onSubmit();

    expect(mockAuthService.loginUser).toHaveBeenCalledWith(component.user);
    expect(mockAuthService.setToken).toHaveBeenCalledWith(mockTokenResponse.token);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/articles/home');
  }) 
});
