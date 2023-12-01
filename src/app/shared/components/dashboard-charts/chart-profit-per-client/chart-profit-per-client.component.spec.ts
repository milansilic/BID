import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartProfitPerClientComponent } from './chart-profit-per-client.component';

describe('ChartProfitPerClientComponent', () => {
  let component: ChartProfitPerClientComponent;
  let fixture: ComponentFixture<ChartProfitPerClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartProfitPerClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartProfitPerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
