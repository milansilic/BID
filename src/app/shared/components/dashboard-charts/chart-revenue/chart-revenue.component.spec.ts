import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRevenueComponent } from './chart-revenue.component';

describe('ChartRevenueComponent', () => {
  let component: ChartRevenueComponent;
  let fixture: ComponentFixture<ChartRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartRevenueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
