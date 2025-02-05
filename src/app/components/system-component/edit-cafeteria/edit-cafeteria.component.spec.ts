import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCafeteriaComponent } from './edit-cafeteria.component';

describe('EditCafeteriaComponent', () => {
  let component: EditCafeteriaComponent;
  let fixture: ComponentFixture<EditCafeteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCafeteriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCafeteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
