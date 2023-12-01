import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderPackagesModel, TypeOfPackageEnum } from 'src/app/components/orders/orders.model';
import { EnumHelper } from 'src/app/shared/enums/enums';
import { IdHelper } from 'src/app/shared/helpers/id-helper';
import { DropdownObject } from 'src/app/shared/models/models';
import { CompanyModel } from './additional-package-modal.model';
import { CompanyService } from './additional-package-modal.service';

@Component({
  selector: 'additional-package-modal',
  templateUrl: './additional-package-modal.component.html',
  styleUrls: ['./additional-package-modal.component.scss']
})
export class AdditionalPackageModalComponent {
  @Output() closeModalEvnt = new EventEmitter<any>();
  @Input() additionalPackage = new OrderPackagesModel();
  @Output() additionalPackageSaved = new EventEmitter<OrderPackagesModel>();

  additionalPackageForm: UntypedFormGroup;
  createCompanyModel = new CompanyModel();
  typesOfPackaging = new Array<DropdownObject>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private companyService: CompanyService,
    private router: Router
  ) { }

  get f() { return this.additionalPackageForm.controls; }

  ngOnInit(): void {

    this.additionalPackageForm = this.formBuilder.group({
      type: [this.additionalPackage.type, Validators.required],
      number: [this.additionalPackage.number, Validators.required],
      isStackable: [this.additionalPackage.isStackable],
      rows: [this.additionalPackage.rows, Validators.required],
      length: [this.additionalPackage.length, Validators.required],
      width: [this.additionalPackage.width, Validators.required],
      height: [this.additionalPackage.height, Validators.required],
      weight: [this.additionalPackage.weight, Validators.required],
      loadingMeters: [this.additionalPackage.loadingMeters, Validators.required],
    });

    this.typesOfPackaging = EnumHelper.getEnumDropdown(TypeOfPackageEnum);
  }



  submitAdditionalPackage() {
    this.additionalPackageForm.markAllAsTouched();
    console.log(this.additionalPackageForm);
    if (this.additionalPackageForm.invalid) {
      return;
    }

    // append additionalCost id to additionalCostsForm
    if (this.additionalPackage.id) {
      this.additionalPackageForm.value.id = this.additionalPackage.id;
      this.additionalPackageForm.value.orderId = this.additionalPackage.orderId;
    } else {
      this.additionalPackageForm.value.id = IdHelper.generateTempNumerId();
    }

    this.additionalPackageSaved.emit(this.additionalPackageForm.value);
  }

  closeModal(value: any) {
    this.closeModalEvnt.emit();
  }
}
