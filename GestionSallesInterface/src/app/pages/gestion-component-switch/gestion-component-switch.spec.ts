import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionComponentSwitch } from './gestion-component-switch';

describe('GestionComponentSwitch', () => {
  let component: GestionComponentSwitch;
  let fixture: ComponentFixture<GestionComponentSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionComponentSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionComponentSwitch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
