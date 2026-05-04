import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAddEmployee } from './panel-add-employee';

describe('PanelAddEmployee', () => {
  let component: PanelAddEmployee;
  let fixture: ComponentFixture<PanelAddEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAddEmployee],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelAddEmployee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
