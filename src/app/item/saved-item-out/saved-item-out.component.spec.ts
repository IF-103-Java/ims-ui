import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedItemOutComponent } from './saved-item-out.component';

describe('SavedItemOutComponent', () => {
  let component: SavedItemOutComponent;
  let fixture: ComponentFixture<SavedItemOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedItemOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedItemOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
