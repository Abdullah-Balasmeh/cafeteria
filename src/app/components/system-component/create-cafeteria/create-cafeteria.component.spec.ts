import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCafeteriaComponent } from './create-cafeteria.component';

describe('CreateCafeteriaComponent', () => {
  let component: CreateCafeteriaComponent;
  let fixture: ComponentFixture<CreateCafeteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCafeteriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
