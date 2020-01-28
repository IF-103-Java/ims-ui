import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssociateComponent } from './form-associate.component';

describe('AddAssociateComponent', () => {
  let component: FormAssociateComponent;
  let fixture: ComponentFixture<FormAssociateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
