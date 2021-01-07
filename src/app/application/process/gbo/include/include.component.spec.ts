import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GboIncludeComponent } from './include.component';

describe('GboIncludeComponent', () => {
  let component: GboIncludeComponent;
  let fixture: ComponentFixture<GboIncludeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GboIncludeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GboIncludeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
