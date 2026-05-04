import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDashboard } from './panel-dashboard.component';

describe('PanelDashboard', () => {
  let component: PanelDashboard;
  let fixture: ComponentFixture<PanelDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
