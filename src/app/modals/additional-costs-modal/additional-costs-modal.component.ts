import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrencyEnum, FinancialImpactEnum, TransportInfoCostModel } from 'src/app/components/orders/orders.model';
import { OrdersService } from 'src/app/components/orders/orders.service';
import { EnumHelper } from 'src/app/shared/enums/enums';
import { IdHelper } from 'src/app/shared/helpers/id-helper';
import { Codebook, DropdownObject } from 'src/app/shared/models/models';
import { CodebookService } from 'src/app/shared/services/codebook.service';
import { CompanyModel } from './additional-costs-modal.model';
import { CompanyService } from './additional-costs-modal.service';

@Component({
  selector: 'additional-costs-modal',
  templateUrl: './additional-costs-modal.component.html',
  styleUrls: ['./additional-costs-modal.component.scss']
})
export class AdditionalCostsModalComponent {

  @Output() closeModalEvnt = new EventEmitter<any>();
  @Input() additionalCost = new TransportInfoCostModel();
  @Input() clients = new Array<DropdownObject>();
  @Output() additionalCostsSaved = new EventEmitter<TransportInfoCostModel>();

  additionalCostsForm: UntypedFormGroup;
  currencies = new Array<DropdownObject>();
  financialImpacts = new Array<DropdownObject>();
  costTypes = new Array<DropdownObject>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private orderService: OrdersService,
    private codebookService: CodebookService
  ) { }

  get f() { return this.additionalCostsForm.controls; }

  ngOnInit(): void {
    this.additionalCostsForm = this.formBuilder.group({
      inboundClientId: [this.additionalCost.inboundClientId, Validators.required],
      outboundClientId: [this.additionalCost.outboundClientId, Validators.required],
      costTypeId: [this.additionalCost.costTypeId, Validators.required],
      financialImpactId: [this.additionalCost.financialImpactId, Validators.required],
      inboundCurrency: [this.additionalCost.inboundCurrency, Validators.required],
      outboundCurrency: [this.additionalCost.outboundCurrency, Validators.required],
      inboundPrice: [this.additionalCost.inboundPrice, Validators.required],
      outboundPrice: [this.additionalCost.outboundPrice, Validators.required]
    });

    this.setEnumDropdowns();
    this.getCostTypes();
  }

  submitAdditionalCosts(e) {
    e.preventDefault();

    this.additionalCostsForm.markAllAsTouched();
    if (this.additionalCostsForm.invalid) {
      return;
    }

    // append additionalCost id to additionalCostsForm
    if (this.additionalCost.id) {
      this.additionalCostsForm.value.id = this.additionalCost.id;
    } else {

    }

    // set additionalCost clientName and supplierName
    this.additionalCostsForm.value.clientName = this.clients.find(x => x.key == this.additionalCostsForm.value.outboundClientId).value;
    this.additionalCostsForm.value.supplierName = this.clients.find(x => x.key == this.additionalCostsForm.value.inboundClientId).value;

    this.additionalCostsSaved.emit(this.additionalCostsForm.value);
  }

  getCostTypes() {
    this.codebookService.getCostTypeCodebook().subscribe((response: Array<Codebook>) => {
      this.costTypes = response.map(x => { return { key: x.id, value: x.description } });
    });
  }

  setEnumDropdowns() {
    this.currencies = EnumHelper.getEnumDropdown(CurrencyEnum, false);
    this.financialImpacts = EnumHelper.getEnumDropdown(FinancialImpactEnum);
  }

  closeModal() {
    this.closeModalEvnt.emit();
  }
}