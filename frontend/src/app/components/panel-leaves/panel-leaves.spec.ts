import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelLeaves } from './panel-leaves';

describe('PanelLeaves', () => {
  let component: PanelLeaves;
  let fixture: ComponentFixture<PanelLeaves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelLeaves],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelLeaves);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
