import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoViewerComponent } from './po-viewer.component';

describe('PoViewerComponent', () => {
  let component: PoViewerComponent;
  let fixture: ComponentFixture<PoViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
