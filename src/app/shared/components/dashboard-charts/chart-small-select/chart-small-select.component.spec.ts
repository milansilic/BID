import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSmallSelectComponent } from './chart-small-select.component';

describe('ChartSmallSelectComponent', () => {
  let component: ChartSmallSelectComponent;
  let fixture: ComponentFixture<ChartSmallSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSmallSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSmallSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
