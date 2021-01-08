import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParetoIncludeComponent } from './include.component';

describe('ParetoIncludeComponent', () => {
  let component: ParetoIncludeComponent;
  let fixture: ComponentFixture<ParetoIncludeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParetoIncludeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParetoIncludeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
