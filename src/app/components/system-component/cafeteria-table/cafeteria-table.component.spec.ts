import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CafeteriaTableComponent } from './cafeteria-table.component';

describe('CafeteriaTableComponent', () => {
  let component: CafeteriaTableComponent;
  let fixture: ComponentFixture<CafeteriaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CafeteriaTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CafeteriaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
