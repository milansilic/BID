import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectTourModalComponent } from './connect-tour-modal.component';

describe('ConnectTourModalComponent', () => {
  let component: ConnectTourModalComponent;
  let fixture: ComponentFixture<ConnectTourModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectTourModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectTourModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
