import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesContainerComponent } from './notes-container.component';

describe('NotesContainerComponent', () => {
  let component: NotesContainerComponent;
  let fixture: ComponentFixture<NotesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
