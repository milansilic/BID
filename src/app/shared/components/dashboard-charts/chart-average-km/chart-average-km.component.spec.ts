import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAverageKmComponent } from './chart-average-km.component';

describe('ChartAverageKmComponent', () => {
  let component: ChartAverageKmComponent;
  let fixture: ComponentFixture<ChartAverageKmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartAverageKmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartAverageKmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
