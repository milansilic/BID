import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TourExpensesModel } from 'src/app/components/tours/tours.model';

@Component({
  selector: 'add-expense-modal',
  templateUrl: './add-expense-modal.component.html',
  styleUrls: ['./add-expense-modal.component.scss']
})
export class AddExpenseModalComponent implements OnInit {

  @Output() closeModalEvnt = new EventEmitter<any>();

  expense = new TourExpensesModel();
  expenseForm: UntypedFormGroup;
  showForm: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {

  }

  ngOnInit() {
    this.initForm();
  }

  closeModal() {
    this.closeModalEvnt.emit();
  }

  initForm() {
    this.expenseForm = this.formBuilder.group({
      serviceCompanyId: [this.expense.serviceCompanyId, Validators.required],
      paymentMethod: [this.expense.paymentMethod, Validators.required],
      price: [this.expense.price, Validators.required],
      currency: [this.expense.currency, Validators.required],
      quantity: [this.expense.quantity, Validators.required],
      isApproved: [this.expense.isApproved, Validators.required],
      notes: [this.expense.notes, Validators.required],
      type: [this.expense.type, Validators.required],
      driverId: [this.expense.driverId, Validators.required],
      payTerms: [this.expense.payTerms, Validators.required],
    });

    this.showForm = true;
  }
}
