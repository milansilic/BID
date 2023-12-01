import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartOrdersComponent } from './chart-orders.component';

describe('ChartOrdersComponent', () => {
  let component: ChartOrdersComponent;
  let fixture: ComponentFixture<ChartOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
