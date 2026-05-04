import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedEmployeesComponent } from './approved-employees.component';

describe('ApprovedEmployeesComponent', () => {
  let component: ApprovedEmployeesComponent;
  let fixture: ComponentFixture<ApprovedEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovedEmployeesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
