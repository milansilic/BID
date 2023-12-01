import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOrdersPerCarrierComponent } from './chart-orders-per-carrier.component';

describe('ChartOrdersPerCarrierComponent', () => {
  let component: ChartOrdersPerCarrierComponent;
  let fixture: ComponentFixture<ChartOrdersPerCarrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOrdersPerCarrierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartOrdersPerCarrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
