import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmedComponent } from './smed.component';

describe('SmedComponent', () => {
  let component: SmedComponent;
  let fixture: ComponentFixture<SmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
