import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedItemCreateComponent } from './saved-item-create.component';

describe('SavedItemCreateComponent', () => {
  let component: SavedItemCreateComponent;
  let fixture: ComponentFixture<SavedItemCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedItemCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedItemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
