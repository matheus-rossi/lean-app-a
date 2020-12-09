import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpcenterComponent } from './helpcenter.component';

describe('HelpcenterComponent', () => {
  let component: HelpcenterComponent;
  let fixture: ComponentFixture<HelpcenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
