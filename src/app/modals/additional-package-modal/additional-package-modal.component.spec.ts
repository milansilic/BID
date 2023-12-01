import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalPackageModalComponent } from './additional-package-modal.component';

describe('AdditionalPackageModalComponent', () => {
  let component: AdditionalPackageModalComponent;
  let fixture: ComponentFixture<AdditionalPackageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalPackageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalPackageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
