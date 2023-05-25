import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterRequestComponent } from './shelter-request.component';

describe('ShelterRequestComponent', () => {
  let component: ShelterRequestComponent;
  let fixture: ComponentFixture<ShelterRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelterRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
