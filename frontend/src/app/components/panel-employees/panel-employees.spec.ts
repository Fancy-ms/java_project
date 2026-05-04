import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelEmployees } from './panel-employees';

describe('PanelEmployees', () => {
  let component: PanelEmployees;
  let fixture: ComponentFixture<PanelEmployees>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelEmployees],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelEmployees);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
