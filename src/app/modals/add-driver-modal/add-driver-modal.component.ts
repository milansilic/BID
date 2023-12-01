import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'add-driver-modal',
  templateUrl: './add-driver-modal.component.html',
  styleUrls: ['./add-driver-modal.component.scss']
})
export class AddDriverModalComponent {

  @Output() closeModalEvnt = new EventEmitter<any>();

  showForm: boolean = false;
  driverForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  closeModal() {
    this.closeModalEvnt.emit();
  }

  initForm() {
    this.driverForm = this.formBuilder.group({});

    this.showForm = true;
  }
}
