import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PpcpmComponent } from './ppcpm.component';

describe('PpcpmComponent', () => {
  let component: PpcpmComponent;
  let fixture: ComponentFixture<PpcpmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PpcpmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PpcpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
