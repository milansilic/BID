import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLicencesComponent } from './chart-licences.component';

describe('ChartLicencesComponent', () => {
  let component: ChartLicencesComponent;
  let fixture: ComponentFixture<ChartLicencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartLicencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartLicencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
