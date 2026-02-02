import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegisterComponent } from './user-register.component';
import { provideHttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SimpleHeaderComponent } from '../headers/simple-header/simple-header.component';
import { ActivatedRoute, provideRouter, Router, RouterLinkWithHref } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  let mockAuthService: any;
  let router: Router;

  beforeEach(async () => {

    mockAuthService = {
      registerUser: jest.fn(),
      setToken: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [
        UserRegisterComponent,
        SimpleHeaderComponent
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatCardModule,
        MatIconModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterLinkWithHref
      ],
      providers: [
        provideHttpClient(),
        { provide: AuthService, useValue: mockAuthService },
        { provide: ActivatedRoute, useValue: {} },
        provideRouter([]),
      ]
    }).compileComponents();



    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register user and navigate to ../articles/home', () => {

    const mockTokenResponse = {
      token: 'fake-token'
    }

    mockAuthService.registerUser.mockReturnValue(of(mockTokenResponse));

    component.user = {
      name: 'roberto',
      email: 'roberto@gmail.com',
      password: 'password'
    }

    fixture.detectChanges();
    component.onSubmit();

    expect(mockAuthService.registerUser).toHaveBeenCalledWith(component.user);
    expect(mockAuthService.setToken).toHaveBeenCalledWith(mockTokenResponse.token);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/articles/home');
  });
});
