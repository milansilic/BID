import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { UserDriverLicenceCategory } from 'src/app/components/users/users.model';
import { UsersService } from 'src/app/components/users/users.service';
import { EnumHelper } from 'src/app/shared/enums/enums';
import { Codebook, DropdownObject } from 'src/app/shared/models/models';
import { CodebookService } from 'src/app/shared/services/codebook.service';

import { CurrencyEnum, OrdersModel, OrderStatusEnum } from '../orders/orders.model';
import { TourExpensesModel, ToursModel } from '../tours/tours.model';
import { ToursService } from '../tours/tours.service';
import { VehiclesModel } from '../vehicles/vehicles.model';
import { VehiclesService } from '../vehicles/vehicles.service';

@UntilDestroy()
@Component({
  selector: 'create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss']
})
export class CreateTourComponent {

  tourId: number;
  createTourForm: UntypedFormGroup;
  carriers = new Array<DropdownObject>();
  statuses = new Array<DropdownObject>();
  tour = new ToursModel();
  driversColumns: string[] = ['fullName', 'startKm', 'endKm', 'startDate', 'endDate'];
  displayedColumns: string[] = ['orderNumber', 'client', 'status', 'orderMaker', 'actions'];
  driverCategoryColumns: string[] = ['category', 'dateOfApplication', 'validUntil', 'actions'];
  expensesColumns: string[] = ['type', 'price', 'quantity', 'actions'];
  driverLicenceCategories = new Array<UserDriverLicenceCategory>();
  driverDataSource = new Array<UserDriverLicenceCategory>();
  dataSource = new MatTableDataSource<OrdersModel>([]);
  showForm = false;
  editOrder = false;
  deleteOrder = false;
  editExpense = false;
  deleteExpense = false;
  spinner = false;
  scrollFromTop = 0;
  addExpenseModal = false;
  addDriverModal = false;

  tourMakers = new Array<DropdownObject>();
  tourStatuses = new Array<DropdownObject>();
  currencies = new Array<DropdownObject>();
  vehicles = new Array<DropdownObject>();

  expenses = new MatTableDataSource<TourExpensesModel>([]);
  orders = new MatTableDataSource<OrdersModel>([]);


  tourDifferenceInKm = 0;


  @ViewChild('expenses-paginator') expensesPaginator: MatPaginator;
  @ViewChild('expenses-sort') expensesSort: MatSort;
  @ViewChild('orders-paginator') ordersPaginator: MatPaginator;
  @ViewChild('orders-sort') ordersSort: MatSort;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private usersService: UsersService,
    private router: Router,
    private codebookService: CodebookService,
    private tourService: ToursService,
    private vehiclesService: VehiclesService,
    private route: ActivatedRoute
  ) {

    this.tourId = +this.route.snapshot.queryParamMap.get('id');
  }

  // get f() { return this.createUserForm.controls; }

  ngOnInit() {
    document.getElementById('tours')?.classList.add('active');

    this.getData();
    this.setEnumDropdowns();
  }

  ngOnDestroy() {
    document.getElementById('tours')?.classList.remove('active');
  }

  setEnumDropdowns() {
    this.statuses = EnumHelper.getEnumDropdown(OrderStatusEnum);
    this.currencies = EnumHelper.getEnumDropdown(CurrencyEnum, false);
  }

  initForm() {

    this.createTourForm = this.formBuilder.group({
      carrierId: [this.tour.carrierId, Validators.required],
      status: [this.tour.status, Validators.required],
      startDate: [this.tour.startDate, Validators.required],
      endDate: [this.tour.endDate, Validators.required],
      tourMakerId: [this.tour.tourMakerId, Validators.required],
      startKm: [this.tour.startKm, Validators.required],
      endKm: [this.tour.endKm, Validators.required],
      vehicleId: [this.tour.vehicleId, Validators.required],
      number: [this.tour.number, Validators.required],
      hasTrailer: [this.tour.hasTrailer, Validators.required],
      vehicleTrailerId: [this.tour.vehicleTrailerId, Validators.required],
      price: [this.tour.price, Validators.required],
      currency: [this.tour.currency, Validators.required],
      notes: [this.tour.notes],
      isSubcontractor: [this.tour.isSubcontractor, Validators.required],
    });


    if (this.tour.tourExpenses) {
      this.mapTourExpenses(this.tour.tourExpenses)
    }

    // if(this.tour.orders) {
    //   this.mapOrders(this.tour.orders)
    // }

    this.showForm = true;

    console.log(this.createTourForm);
    this.getTourDifferenceInKm();
  }


  getTourDifferenceInKm() {
    if (this.createTourForm.value.startKm && this.createTourForm.value.endKm)
      this.tourDifferenceInKm = this.createTourForm.value.endKm - this.createTourForm.value.startKm;
  }

  mapTourExpenses(expenses) {
    this.expenses = new MatTableDataSource<TourExpensesModel>(expenses);
    this.expenses.paginator = this.expensesPaginator;
    this.expenses.sort = this.expensesSort;
  }

  mapOrders(orders) {
    this.orders = new MatTableDataSource<OrdersModel>(orders);
    this.orders.paginator = this.ordersPaginator;
    this.orders.sort = this.ordersSort;
  }

  getData() {


    let observable: any[] = [
      this.codebookService.getOrderMakers(),
      this.codebookService.getClientCodebook(),
      this.vehiclesService.getAllVehicles()
    ]

    if (this.tourId) {
      observable.push(this.tourService.getToursById(this.tourId));
    }

    combineLatest(observable)
      .pipe(untilDestroyed(this))
      .subscribe((response: any) => {

        const orderMakersCodebook = response[0] as unknown as Codebook[];
        const clientCodebook = response[1] as unknown as Codebook[];
        const vehicles = response[2] as unknown as VehiclesModel[];

        this.carriers = clientCodebook.map(x => { return { key: x.id, value: x.description } });
        this.tourMakers = orderMakersCodebook.map(x => { return { key: x.id, value: x.description } });
        this.vehicles = vehicles.map(x => { return { key: x.id, value: x.generalVehicle.plateNumber } });

        if (this.tourId) {
          this.tour = response[3] as unknown as ToursModel;
        }
        this.showForm = true;
        this.initForm();
      });

  }

  openEditOrderModal(): void {
    this.editOrder = true;
  }

  openDeleteOrderModal(): void {
    this.deleteOrder = true;
  }

  openEditExpenseModal(): void {
    this.editExpense = true;
  }

  openDeleteExpenseModal(): void {
    this.deleteExpense = true;
  }


  openModalUnified() {
    this.scrollFromTop = document.documentElement.scrollTop;
    document.body.style.top = -this.scrollFromTop + 'px';
    document.body.classList.remove('hide-modal');
    document.body.classList.add('show-modal');
    if (document.body.scrollHeight > document.body.clientHeight) {
      document.body.classList.add('overscroll');
    }
  }

  closeModalUnified() {
    document.body.classList.remove('show-modal');
    document.body.classList.remove('overscroll');
    document.body.classList.add('hide-modal');
    window.scrollTo({ top: this.scrollFromTop });
  }

  openAddExpense() {
    this.addExpenseModal = true;
    this.openModalUnified();
  }

  closeAddExpense() {
    this.closeModalUnified();
    setTimeout(() => { this.addExpenseModal = false; }, 300);
  }

  openAddDriver() {
    this.addDriverModal = true;
    this.openModalUnified();
  }

  closeAddDriver() {
    this.closeModalUnified();
    setTimeout(() => { this.addDriverModal = false; }, 300);
  }
}
