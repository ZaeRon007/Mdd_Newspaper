import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthenticationComponent } from './user-authentication.component';
import { Router } from '@angular/router';

describe('UserAuthenticationComponent', () => {
  let component: UserAuthenticationComponent;
  let fixture: ComponentFixture<UserAuthenticationComponent>;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAuthenticationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserAuthenticationComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl');
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /auth/register', () => {
    component.register();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/register');
  });

  it('should navigate to /auth/login', () => {
    component.login();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/login');
  });
});
