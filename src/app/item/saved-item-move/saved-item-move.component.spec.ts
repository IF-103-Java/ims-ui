import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedItemMoveComponent } from './saved-item-move.component';

describe('SavedItemMoveComponent', () => {
  let component: SavedItemMoveComponent;
  let fixture: ComponentFixture<SavedItemMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedItemMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedItemMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
