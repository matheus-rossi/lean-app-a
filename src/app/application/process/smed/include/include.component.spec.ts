import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmedIncludeComponent } from './include.component';

describe('SmedIncludeComponent', () => {
  let component: SmedIncludeComponent;
  let fixture: ComponentFixture<SmedIncludeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmedIncludeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmedIncludeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
