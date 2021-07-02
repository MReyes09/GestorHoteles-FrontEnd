import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHotelComponent } from './profile-hotel.component';

describe('ProfileHotelComponent', () => {
  let component: ProfileHotelComponent;
  let fixture: ComponentFixture<ProfileHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileHotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
