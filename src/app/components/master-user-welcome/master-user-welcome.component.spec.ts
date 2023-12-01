import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUserWelcomeComponent } from './master-user-welcome.component';

describe('MasterUserWelcomeComponent', () => {
  let component: MasterUserWelcomeComponent;
  let fixture: ComponentFixture<MasterUserWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterUserWelcomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterUserWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
