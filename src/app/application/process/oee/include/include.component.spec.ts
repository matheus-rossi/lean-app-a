import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeeIncludeComponent } from './include.component';

describe('IncludeComponent', () => {
  let component: OeeIncludeComponent;
  let fixture: ComponentFixture<OeeIncludeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OeeIncludeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OeeIncludeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
