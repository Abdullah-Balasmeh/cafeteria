import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSysPageComponent } from './login-sys-page.component';

describe('LoginSysPageComponent', () => {
  let component: LoginSysPageComponent;
  let fixture: ComponentFixture<LoginSysPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSysPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSysPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
