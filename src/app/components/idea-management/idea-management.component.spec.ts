import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaManagementComponent } from './idea-management.component';

describe('IdeaManagementComponent', () => {
  let component: IdeaManagementComponent;
  let fixture: ComponentFixture<IdeaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdeaManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdeaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
