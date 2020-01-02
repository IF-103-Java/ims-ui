import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSigningComponent } from './user-signing.component';

describe('UserSigninComponent', () => {
  let component: UserSigningComponent;
  let fixture: ComponentFixture<UserSigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
