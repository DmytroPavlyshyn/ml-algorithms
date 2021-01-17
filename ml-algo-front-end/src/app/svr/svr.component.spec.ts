import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvrComponent } from './svr.component';

describe('SvrComponent', () => {
  let component: SvrComponent;
  let fixture: ComponentFixture<SvrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
