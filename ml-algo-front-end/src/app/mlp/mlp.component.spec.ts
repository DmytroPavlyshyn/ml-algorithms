import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlpComponent } from './mlp.component';

describe('MlpComponent', () => {
  let component: MlpComponent;
  let fixture: ComponentFixture<MlpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
