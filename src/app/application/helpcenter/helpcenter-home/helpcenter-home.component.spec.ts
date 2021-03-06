import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HelpcenterHomeComponent } from './helpcenter-home.component';

describe('HelpcenterHomeComponent', () => {
  let component: HelpcenterHomeComponent;
  let fixture: ComponentFixture<HelpcenterHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpcenterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpcenterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
