import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SgdComponent } from './sgd.component';

describe('SgdComponent', () => {
  let component: SgdComponent;
  let fixture: ComponentFixture<SgdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SgdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SgdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
