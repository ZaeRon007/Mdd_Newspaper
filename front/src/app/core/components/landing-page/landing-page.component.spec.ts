import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { Router } from '@angular/router';


describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /auth', () => {
    component.start();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth');
  });
});
