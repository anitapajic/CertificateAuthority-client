import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneVerificationComponent } from './telephone-verification.component';

describe('TelephoneVerificationComponent', () => {
  let component: TelephoneVerificationComponent;
  let fixture: ComponentFixture<TelephoneVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelephoneVerificationComponent]
    });
    fixture = TestBed.createComponent(TelephoneVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
