import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelLeavesComponent } from './panel-leaves.component';

describe('PanelLeavesComponent', () => {
  let component: PanelLeavesComponent;
  let fixture: ComponentFixture<PanelLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelLeavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
