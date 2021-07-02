import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileServiceComponent } from './profile-service.component';

describe('ProfileServiceComponent', () => {
  let component: ProfileServiceComponent;
  let fixture: ComponentFixture<ProfileServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
