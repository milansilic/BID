import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartNumberOfVehiclesComponent } from './chart-number-of-vehicles.component';

describe('ChartNumberOfVehiclesComponent', () => {
  let component: ChartNumberOfVehiclesComponent;
  let fixture: ComponentFixture<ChartNumberOfVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartNumberOfVehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartNumberOfVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
