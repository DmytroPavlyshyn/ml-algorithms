import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrrnComponent } from './grrn.component';

describe('GrrnComponent', () => {
  let component: GrrnComponent;
  let fixture: ComponentFixture<GrrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
