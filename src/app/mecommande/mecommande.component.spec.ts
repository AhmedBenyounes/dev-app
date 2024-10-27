import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecommandeComponent } from './mecommande.component';

describe('MecommandeComponent', () => {
  let component: MecommandeComponent;
  let fixture: ComponentFixture<MecommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MecommandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
