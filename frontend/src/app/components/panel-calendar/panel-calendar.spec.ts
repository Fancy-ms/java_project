import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelCalendar } from './panel-calendar';

describe('PanelCalendar', () => {
  let component: PanelCalendar;
  let fixture: ComponentFixture<PanelCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
