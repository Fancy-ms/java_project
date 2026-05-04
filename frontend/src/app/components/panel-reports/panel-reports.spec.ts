import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelReports } from './panel-reports';

describe('PanelReports', () => {
  let component: PanelReports;
  let fixture: ComponentFixture<PanelReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelReports],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelReports);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
