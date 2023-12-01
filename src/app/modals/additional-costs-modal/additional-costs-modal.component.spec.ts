import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalCostsModalComponent } from './additional-costs-modal.component';

describe('AdditionalCostsModalComponent', () => {
  let component: AdditionalCostsModalComponent;
  let fixture: ComponentFixture<AdditionalCostsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalCostsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalCostsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
