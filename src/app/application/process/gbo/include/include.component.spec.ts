import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IncludeGboComponent } from './include.component';

describe('IncludeGboComponent', () => {
  let component: IncludeGboComponent;
  let fixture: ComponentFixture<IncludeGboComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IncludeGboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludeGboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
