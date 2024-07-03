import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineSchedulesComponent } from './airline-schedules.component';

describe('AirlineSchedulesComponent', () => {
  let component: AirlineSchedulesComponent;
  let fixture: ComponentFixture<AirlineSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirlineSchedulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AirlineSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
