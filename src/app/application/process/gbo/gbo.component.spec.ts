import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GboComponent } from './gbo.component';

describe('GboComponent', () => {
  let component: GboComponent;
  let fixture: ComponentFixture<GboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
