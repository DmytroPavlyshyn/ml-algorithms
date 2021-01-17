import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaBoostComponent } from './ada-boost.component';

describe('AdaBoostComponent', () => {
  let component: AdaBoostComponent;
  let fixture: ComponentFixture<AdaBoostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdaBoostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaBoostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
