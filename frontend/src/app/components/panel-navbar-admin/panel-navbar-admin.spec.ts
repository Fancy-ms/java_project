import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelNavbarAdmin } from './panel-navbar-admin';

describe('PanelNavbarAdmin', () => {
  let component: PanelNavbarAdmin;
  let fixture: ComponentFixture<PanelNavbarAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelNavbarAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelNavbarAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
