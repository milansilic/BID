import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartProfitComponent } from './chart-profit.component';

describe('ChartProfitComponent', () => {
  let component: ChartProfitComponent;
  let fixture: ComponentFixture<ChartProfitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartProfitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
