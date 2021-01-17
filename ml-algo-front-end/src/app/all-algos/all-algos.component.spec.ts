import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAlgosComponent } from './all-algos.component';

describe('AllAlgosComponent', () => {
  let component: AllAlgosComponent;
  let fixture: ComponentFixture<AllAlgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAlgosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAlgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
