import { Component, ViewChild, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumHelper } from 'src/app/shared/enums/enums';
import { Codebook, DropdownObject } from 'src/app/shared/models/models';
import { ADRClassEnum, BaseInfoModel, ConnectWithTourType, CurrencyEnum, LoadingAndCustomsInfoModel, LoadingInfoModel, OrderFile, OrderGoodsModel, OrderPackagesModel, OrdersModel, OrderStatusEnum, ReloadingAndCustomsInfoModel, TransportInfoCostModel, TransportInfoModel, TransportTypeEnum, TypeOfCustomProcedureEnum, TypeOfPackageEnum, UnloadingAndCustomsInfoModel } from '../orders/orders.model';
import { OrdersService } from '../orders/orders.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CodebookService } from 'src/app/shared/services/codebook.service';

@UntilDestroy()
@Component({
  selector: 'create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  @ViewChild('additionalCostTable') additionalCostTable: MatTable<any>;

  order = new OrdersModel();
  orderId: number;
  addOrder = false;
  editOrder = false;
  deleteOrder = false;
  newOrder = false;
  createTour = false;
  spinner = false;
  scrollFromTop: number = 0;
  showAdditionalCostModal = false;
  showAdditionalPackageModal = false;
  addFilesModal = false;
  showConnectTourModal = false;
  isADR = false;
  vehicleIsAdr = null;
  packagesTotalWeight = 0;

  showForm = false;
  displayedColumns: string[] = ['orderNumber', 'client', 'status', 'orderMaker', 'actions'];
  additionalCostsColumns: string[] = ['clientName', 'supplierName', 'actions'];
  createOrdersForm: UntypedFormGroup;
  createOrdersModel = new OrdersModel();
  baseInfoForm: UntypedFormGroup;
  baseInfoModel = new BaseInfoModel();
  transportInfoForm: UntypedFormGroup;
  transportInfoModel = new TransportInfoModel();
  loadingInfoForm: UntypedFormGroup;
  loadingInfoModel = new LoadingAndCustomsInfoModel();
  reloadingInfoForm: UntypedFormGroup;
  reloadingInfoModel = new ReloadingAndCustomsInfoModel();
  unloadingInfoForm: UntypedFormGroup;
  unloadingInfoModel = new UnloadingAndCustomsInfoModel();
  orderGoodsForm: UntypedFormGroup;
  orderGoodsModel = new OrderGoodsModel();

  clients = new Array<DropdownObject>();
  orderMakers = new Array<DropdownObject>();
  orderStatuses = new Array<DropdownObject>();
  transportTypes = new Array<DropdownObject>();
  currencies = new Array<DropdownObject>();
  dutyAddresses = new Array<DropdownObject>();
  dutyProcedures = new Array<DropdownObject>();
  adrClasses = new Array<DropdownObject>();

  additionalCosts = new Array<TransportInfoCostModel>();
  selectedAdditionalCost = new TransportInfoCostModel();

  additionalPackages = new Array<OrderPackagesModel>();
  selectedAdditionalPackage = new OrderPackagesModel();

  files = new Array<OrderFile>();
  selectedFile: OrderFile = new OrderFile();

  connectWithTourType: ConnectWithTourType;
  connectWithTourTypeEnum = ConnectWithTourType;
  currentUnloadingInfoIndex: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() newOrderOutput = new EventEmitter<string>();

  constructor(
    private ordersService: OrdersService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private codebookService: CodebookService
  ) {

    // get order id query param from url
    this.orderId = +this.route.snapshot.queryParamMap.get('id');
  }

  get f() { return this.createOrdersForm.controls; }

  ngOnInit() {
    document.getElementById('orders')?.classList.add('active');

    this.getData();
    this.setEnumDropdowns();

  }

  calculateAdr() {
    let adrWeight = +this.orderGoodsForm.value.adrWeight;
    let unNumber = this.orderGoodsForm.value.unNumber;

    if (adrWeight > 0 && unNumber) {
      this.ordersService.getAdrCalculatedValues(adrWeight, unNumber)
        .subscribe((response) => {
          if (response.length > 0) {
            this.vehicleIsAdr = response[0].isHighConsequenceDangerousGood;
          } else {
            this.vehicleIsAdr = null;
          }
        });
    } else {
      this.vehicleIsAdr = null;
    }
  }

  ngOnDestroy() {
    document.getElementById('orders')?.classList.remove('active');
  }

  get loadingInfo() {
    return this.loadingInfoForm.controls['loadingInfo'] as FormArray;
  }

  get reloadingInfo() {
    return this.reloadingInfoForm.controls['reloadingInfo'] as FormArray;
  }

  get unloadingInfo() {
    return this.unloadingInfoForm.controls['unloadingInfo'] as FormArray;
  }

  addLoadingInfoForm(loadingInfo?: LoadingAndCustomsInfoModel) {
    if (!loadingInfo) {
      loadingInfo = new LoadingAndCustomsInfoModel();
    }

    this.loadingInfo.push(this.formBuilder.group({
      dateOfLoading: [loadingInfo.loadingInfo.dateOfLoading, Validators.required],
      supplierId: [loadingInfo.loadingInfo.supplierId, Validators.required],
      loadingCompanyId: [loadingInfo.loadingInfo.loadingCompanyId, Validators.required],
      refNumber: [loadingInfo.loadingInfo.refNumber],
      tourNumber: [loadingInfo.loadingInfo.tourNumber],
      tourPercentage: [loadingInfo.loadingInfo.tourPercentage, Validators.required],
      tourId: [loadingInfo.loadingInfo.tourId, Validators.required],
      customsAgentId: [loadingInfo.customsInfo.customsAgentId],
      dutyId: [loadingInfo.customsInfo.dutyId],
      dutyType: [loadingInfo.customsInfo.dutyType, Validators.required]
    }));

  }

  addReloadingInfoForm(reloadingInfo?: ReloadingAndCustomsInfoModel) {
    if (!reloadingInfo) {
      reloadingInfo = new ReloadingAndCustomsInfoModel();
    }

    this.reloadingInfo.push(this.formBuilder.group({
      dateOfUnloading: [reloadingInfo.reloadingInfo.dateOfUnloading, Validators.required],
      dateOfLoading: [reloadingInfo.reloadingInfo.dateOfLoading, Validators.required],
      reloadingCompanyId: [reloadingInfo.reloadingInfo.reloadingCompanyId, Validators.required],
      refNumber: [reloadingInfo.reloadingInfo.refNumber],
      tourNumber: [reloadingInfo.reloadingInfo.tourNumber],
      tourPercentage: [reloadingInfo.reloadingInfo.tourPercentage, Validators.required],
      tourId: [reloadingInfo.reloadingInfo.tourId, Validators.required],
      customsAgentId: [reloadingInfo.customsInfo.customsAgentId],
      dutyId: [reloadingInfo.customsInfo.dutyId],
      dutyType: [reloadingInfo.customsInfo.dutyType, Validators.required]
    }));

  }

  addUnloadingInfoForm(unloadingInfo?: UnloadingAndCustomsInfoModel) {
    if (!unloadingInfo) {
      unloadingInfo = new UnloadingAndCustomsInfoModel();
    }

    this.unloadingInfo.push(this.formBuilder.group({
      dateOfUnloading: [unloadingInfo.unloadingInfo.dateOfUnloading, Validators.required],
      importerId: [unloadingInfo.unloadingInfo.importerId, Validators.required],
      unloadingCompanyId: [unloadingInfo.unloadingInfo.unloadingCompanyId, Validators.required],
      refNumber: [unloadingInfo.unloadingInfo.refNumber],
      tourNumber: [unloadingInfo.unloadingInfo.tourNumber],
      tourPercentage: [unloadingInfo.unloadingInfo.tourPercentage, Validators.required],
      tourId: [unloadingInfo.unloadingInfo.tourId],
      customsAgentId: [unloadingInfo.customsInfo.customsAgentId],
      dutyId: [unloadingInfo.customsInfo.dutyId],
      dutyType: [unloadingInfo.customsInfo.dutyType, Validators.required]
    }));
  }

  initOrdersForm() {

    this.baseInfoForm = this.formBuilder.group({
      clientId: [this.order.baseInfo.clientId, Validators.required],
      status: [this.order.baseInfo.status, Validators.required],
      transportType: [this.order.baseInfo.transportType, Validators.required],
      userId: [this.order.baseInfo.userId, Validators.required],
    });

    this.transportInfoForm = this.formBuilder.group({
      currency: [this.order.transportInfo.currency, Validators.required],
      price: [this.order.transportInfo.price, Validators.required],
    });

    this.orderGoodsForm = this.formBuilder.group({
      goods: [this.order.orderGoods.goods, Validators.required],
      // totalWeight: [this.order.orderGoods.totalWeight, Validators.required],
      loadingMeters: [this.order.orderGoods.loadingMeters, Validators.required],
      currency: [this.order.orderGoods.currency, Validators.required],
      valueOfGoods: [this.order.orderGoods.valueOfGoods, Validators.required],
      isADR: [this.order.orderGoods.isADR, Validators.required],
      adrClass: [this.order.orderGoods.adrClass],
      adrWeight: [this.order.orderGoods.adrWeight],
      unNumber: [this.order.orderGoods.unNumber],
      notes: [this.order.orderGoods.notes],
    });

    this.loadingInfoForm = this.formBuilder.group({
      loadingInfo: this.formBuilder.array([])
    });

    this.reloadingInfoForm = this.formBuilder.group({
      reloadingInfo: this.formBuilder.array([])
    });

    this.unloadingInfoForm = this.formBuilder.group({
      unloadingInfo: this.formBuilder.array([])
    });


    this.order.transportInfo.additionalCosts.forEach(cost => {
      cost.clientName = this.clients.find(x => x.key == cost.outboundClientId).value;
      cost.supplierName = this.clients.find(x => x.key == cost.inboundClientId).value;
      this.additionalCosts.push(cost);
    });

    this.order.orderGoods.orderPackages.forEach(additionalPackage => {
      additionalPackage.typeDisplayLabel = EnumHelper.getEnumString(TypeOfPackageEnum, additionalPackage.type)
      this.additionalPackages.push(additionalPackage);
    });

    this.order.orderFiles.forEach(file => {
      this.files.push(file);
    });

    if (this.orderId) {
      this.order.loadingAndCustomsInfo.forEach(info => {
        this.addLoadingInfoForm(info);
      });

      this.order.reloadingAndCustomsInfo.forEach(info => {
        this.addReloadingInfoForm(info);
      });

      this.order.unloadingAndCustomsInfo.forEach(info => {
        this.addUnloadingInfoForm(info);
      });
    } else {
      this.addLoadingInfoForm();
      this.addUnloadingInfoForm();
    }

    this.calculateAdr();

    this.showForm = true;
  }


  getData() {


    let observable: any[] = [
      this.codebookService.getOrderMakers(),
      this.codebookService.getClientCodebook(),
      this.codebookService.getDutiesCodebook()
    ]

    if (this.orderId) {
      observable.push(this.ordersService.getById(this.orderId));
    }

    combineLatest(observable)
      .pipe(untilDestroyed(this))
      .subscribe((response: any) => {

        const orderMakersCodebook = response[0] as unknown as Codebook[];
        const clientCodebook = response[1] as unknown as Codebook[];
        const dutiesCodebook = response[2];

        this.clients = clientCodebook.map(x => { return { key: x.id, value: x.description } });
        this.orderMakers = orderMakersCodebook.map(x => { return { key: x.id, value: x.description } });
        this.dutyAddresses = dutiesCodebook.map(x => { return { key: x.id, value: x.street } });

        if (this.orderId) {
          this.order = response[3] as unknown as OrdersModel;
        }
        this.showForm = true;
        this.initOrdersForm();
      });

  }


  getOrderInfoById(id: number) {
    console.log()
    this.ordersService.getById(id)
      .subscribe((response: OrdersModel) => {
        this.order = response;
        console.log(this.order);
        this.initOrdersForm();
      });
  }


  setEnumDropdowns() {
    this.orderStatuses = EnumHelper.getEnumDropdown(OrderStatusEnum);
    this.transportTypes = EnumHelper.getEnumDropdown(TransportTypeEnum);
    this.dutyProcedures = EnumHelper.getEnumDropdown(TypeOfCustomProcedureEnum);
    this.currencies = EnumHelper.getEnumDropdown(CurrencyEnum, false);
    this.adrClasses = EnumHelper.getEnumDropdown(ADRClassEnum)
  }

  additionalCostsSaved(newAdditionalCosts: TransportInfoCostModel) {
    //find if there is already a cost with the same id if not add it
    const index = this.additionalCosts.findIndex(x => x.id === newAdditionalCosts.id);
    if (index !== -1) {
      this.additionalCosts[index] = newAdditionalCosts;
    }
    else {
      this.additionalCosts.push(newAdditionalCosts);
    }

    this.closeAddCost();
  }

  updateAdditionalCost(cost: TransportInfoCostModel) {
    this.selectedAdditionalCost = cost;
    this.showAdditionalCostModal = true;
    this.openModalUnified();
  }

  deleteAdditionalCost(cost: TransportInfoCostModel) {
    this.additionalCosts = this.additionalCosts.filter(x => x !== cost);
  }

  additionalPackageSaved(newAdditionalPackage: OrderPackagesModel) {

    newAdditionalPackage.typeDisplayLabel = EnumHelper.getEnumString(TypeOfPackageEnum, newAdditionalPackage.type)
    //find if there is already a package with the same id if not add it
    const index = this.additionalPackages.findIndex(x => x.id === newAdditionalPackage.id);
    if (index !== -1) {
      this.additionalPackages[index] = newAdditionalPackage;

    }
    else {

      this.additionalPackages.push(newAdditionalPackage);
    }

    this.calculatePackagesTotalWeight();
    this.closeAddPackage();
  }

  calculatePackagesTotalWeight() {
    this.packagesTotalWeight = this.additionalPackages.reduce((a, b) => a + (+b.weight || 0), 0);
  }

  updateAdditionalPackage(additionalPackage: OrderPackagesModel) {
    this.selectedAdditionalPackage = additionalPackage;
    this.showAdditionalPackageModal = true;
    this.calculatePackagesTotalWeight();
    this.openModalUnified();
  }

  deleteAdditionalPackage(index) {
    // delete additional package from the list by index
    this.additionalPackages = this.additionalPackages.filter((x, i) => i !== index);
    this.calculatePackagesTotalWeight();
  }


  submitOrdersInfo() {

    // console log all forms
    console.log(this.baseInfoForm);
    console.log(this.transportInfoForm);
    console.log(this.loadingInfoForm);
    console.log(this.unloadingInfoForm);
    console.log(this.reloadingInfoForm);
    console.log(this.orderGoodsForm)

    console.log(this.additionalPackages);
    console.log(this.additionalCosts);
    console.log(this.files)


    //mark all forms as touched
    this.baseInfoForm.markAllAsTouched();
    this.transportInfoForm.markAllAsTouched();
    this.loadingInfoForm.markAllAsTouched();
    this.unloadingInfoForm.markAllAsTouched();
    this.reloadingInfoForm.markAllAsTouched();
    this.orderGoodsForm.markAllAsTouched();


    // check if all forms are valid
    if (!this.baseInfoForm.valid || !this.transportInfoForm.valid ||
      !this.loadingInfoForm.valid || !this.unloadingInfoForm.valid ||
      !this.reloadingInfoForm.valid || !this.orderGoodsForm.valid) {
      this.toastr.error('Please fill all required fields.');
      return;
    }

    this.mapOrderFormInfo();

    // this.createOrdersModel = FormMapHelper.mapOrderFormInfo(this.createOrdersForm)

    // this.ordersService.createOrder(this.createOrdersModel)
    //   .subscribe((response) => {

    //   });
  }


  mapOrderFormInfo() {

    let order = new OrdersModel();
    order.id = this.orderId ? this.orderId : 0;
    order.baseInfo = this.baseInfoForm.value;
    order.transportInfo = this.transportInfoForm.value;
    order.orderGoods = this.orderGoodsForm.value;
    order.transportInfo.additionalCosts = this.additionalCosts;
    order.orderGoods.orderPackages = this.additionalPackages;
    order.orderFiles = this.files;

    order.transportInfo.price = +order.transportInfo.price;

    order.transportInfo.additionalCosts.forEach(additionalCost => {
      additionalCost.id = additionalCost.id;
      additionalCost.outboundPrice = +additionalCost.outboundPrice;
      additionalCost.inboundPrice = +additionalCost.inboundPrice;
      additionalCost.outboundPrice = +additionalCost.outboundPrice;
    });

    this.loadingInfoForm.value.loadingInfo.forEach(loadingandCustomsInfo => {

      let loadingInfo = new LoadingAndCustomsInfoModel();
      loadingInfo.loadingInfo.id = loadingandCustomsInfo.id;
      loadingInfo.loadingInfo.refNumber = loadingandCustomsInfo.refNumber;
      loadingInfo.loadingInfo.tourId = loadingandCustomsInfo.tourId;
      loadingInfo.loadingInfo.tourNumber = loadingandCustomsInfo.tourNumber;
      loadingInfo.loadingInfo.dateOfLoading = loadingandCustomsInfo.dateOfLoading;
      loadingInfo.loadingInfo.supplierId = loadingandCustomsInfo.supplierId;
      loadingInfo.loadingInfo.loadingCompanyId = loadingandCustomsInfo.loadingCompanyId;
      loadingInfo.loadingInfo.tourPercentage = +loadingandCustomsInfo.tourPercentage;

      loadingInfo.customsInfo.customsAgentId = loadingandCustomsInfo.customsAgentId;
      loadingInfo.customsInfo.dutyId = loadingandCustomsInfo.dutyId;
      loadingInfo.customsInfo.dutyType = loadingandCustomsInfo.dutyType;

      order.loadingAndCustomsInfo.push(loadingInfo);

    })

    this.reloadingInfoForm.value.reloadingInfo.forEach(reloadingandCustomsInfo => {

      let reloadingInfo = new ReloadingAndCustomsInfoModel();
      reloadingInfo.reloadingInfo.id = reloadingandCustomsInfo.id;
      reloadingInfo.reloadingInfo.refNumber = reloadingandCustomsInfo.refNumber;
      reloadingInfo.reloadingInfo.tourId = reloadingandCustomsInfo.tourId;
      reloadingInfo.reloadingInfo.tourNumber = reloadingandCustomsInfo.tourNumber;
      reloadingInfo.reloadingInfo.dateOfLoading = reloadingandCustomsInfo.dateOfLoading;
      reloadingInfo.reloadingInfo.dateOfUnloading = reloadingandCustomsInfo.dateOfUnloading;
      reloadingInfo.reloadingInfo.reloadingCompanyId = reloadingandCustomsInfo.reloadingCompanyId;
      reloadingInfo.reloadingInfo.tourPercentage = +reloadingandCustomsInfo.tourPercentage;

      reloadingInfo.customsInfo.customsAgentId = reloadingandCustomsInfo.customsAgentId;
      reloadingInfo.customsInfo.dutyId = reloadingandCustomsInfo.dutyId;
      reloadingInfo.customsInfo.dutyType = reloadingandCustomsInfo.dutyType;

      order.reloadingAndCustomsInfo.push(reloadingInfo);
    })

    this.unloadingInfoForm.value.unloadingInfo.forEach(unloadingandCustomsInfo => {

      let unloadingInfo = new UnloadingAndCustomsInfoModel();
      unloadingInfo.unloadingInfo.id = unloadingandCustomsInfo.id;
      unloadingInfo.unloadingInfo.refNumber = unloadingandCustomsInfo.refNumber;

      unloadingInfo.unloadingInfo.tourNumber = unloadingandCustomsInfo.tourNumber;
      unloadingInfo.unloadingInfo.dateOfUnloading = unloadingandCustomsInfo.dateOfUnloading;
      unloadingInfo.unloadingInfo.importerId = unloadingandCustomsInfo.importerId;
      unloadingInfo.unloadingInfo.unloadingCompanyId = unloadingandCustomsInfo.unloadingCompanyId;
      unloadingInfo.unloadingInfo.tourPercentage = +unloadingandCustomsInfo.tourPercentage;

      unloadingInfo.customsInfo.customsAgentId = unloadingandCustomsInfo.customsAgentId;
      unloadingInfo.customsInfo.dutyId = unloadingandCustomsInfo.dutyId;
      unloadingInfo.customsInfo.dutyType = unloadingandCustomsInfo.dutyType;

      if (order.loadingAndCustomsInfo.length) {
        unloadingInfo.unloadingInfo.tourId = order.loadingAndCustomsInfo[0].loadingInfo.tourId;
      }

      order.unloadingAndCustomsInfo.push(unloadingInfo);
    })

    // order.orderGoods.totalWeight = +order.orderGoods.totalWeight;
    order.orderGoods.loadingMeters = +order.orderGoods.loadingMeters;
    order.orderGoods.valueOfGoods = +order.orderGoods.valueOfGoods;
    order.orderGoods.adrWeight = +order.orderGoods.adrWeight;
    order.orderGoods.isADR = order.orderGoods.isADR;

    if (!order.orderGoods.isADR) {
      order.orderGoods.adrClass = null;
      order.orderGoods.adrWeight = null;
      order.orderGoods.unNumber = null;
    }

    order.orderGoods.orderPackages.forEach(orderedPackage => {
      orderedPackage.number = +orderedPackage.number;
      orderedPackage.rows = +orderedPackage.rows;
      orderedPackage.length = +orderedPackage.length;
      orderedPackage.width = +orderedPackage.width;
      orderedPackage.height = +orderedPackage.height;
      orderedPackage.weight = +orderedPackage.weight;
      orderedPackage.loadingMeters = +orderedPackage.loadingMeters;
    })

    if (order.id) {
      this.updateOrder(order);
    } else {
      this.createOrder(order);
    }

  }

  createOrder(order: OrdersModel) {
    this.ordersService.createOrder(order)
      .subscribe(_response => {
        this.toastr.success("Order saved successfully.")
        this.router.navigate(['/layout/orders']);
      })
  }

  updateOrder(order: OrdersModel) {
    this.ordersService.updateOrder(order)
      .subscribe(_response => {
        this.toastr.success("Order updated successfully.")
        this.router.navigate(['/layout/orders']);
      })
  }


  submitReloadingInfo() {

  }

  submitLoadingInfo() {
    this.loadingInfoForm.markAllAsTouched();
    if (this.loadingInfoForm.invalid) {
      return;
    }
  }

  submitUnloadingInfo() {

  }


  editFileRow(i: number) {
    this.selectedFile = this.files[i];
    this.addFilesModal = true;
    this.openModalUnified();
  }

  deleteUploadRow(i: number) {
    this.files.splice(i, 1);
    // Bug: after we delete a file (an object from array), same file could not be loaded again, 
    // before any other file is loaded or deleted!!!
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

  openConnectWithTour(type: ConnectWithTourType, index = null) {
    this.showConnectTourModal = true;
    this.connectWithTourType = type;

    if (type === ConnectWithTourType.Reloading) {
      this.currentUnloadingInfoIndex = index;
    }

    this.openModalUnified();
  }

  tourSelected(event) {

    if (this.connectWithTourType === ConnectWithTourType.Loading) {
      this.loadingInfoForm.value.loadingInfo.forEach((e, index) => {
        this.loadingInfo.at(index).patchValue({ tourId: event.id, tourNumber: event.number })
      });

      this.unloadingInfoForm.value.unloadingInfo.forEach((e, index) => {
        this.unloadingInfo.at(index).patchValue({ tourId: event.id, tourNumber: event.number })
      });
    } else if (this.connectWithTourType === ConnectWithTourType.Reloading) {
      this.reloadingInfo.at(this.currentUnloadingInfoIndex).patchValue({ tourId: event.id, tourNumber: event.number })
    }


    this.closeConnectTour();
  }

  openAddCost() {
    this.showAdditionalCostModal = true;
    this.openModalUnified();
  }

  closeAddCost() {
    this.closeModalUnified();
    setTimeout(() => { this.showAdditionalCostModal = false; }, 300);
  }

  openAddPackage() {
    this.showAdditionalPackageModal = true;
    this.openModalUnified();
  }

  closeAddPackage() {
    this.selectedAdditionalPackage = new OrderPackagesModel();;
    this.closeModalUnified();
    setTimeout(() => { this.showAdditionalPackageModal = false; }, 300);
  }

  openConnectTour() {
    this.showConnectTourModal = true;
    this.openModalUnified();
  }

  closeConnectTour() {
    this.closeModalUnified();
    setTimeout(() => { this.showConnectTourModal = false; }, 300);
  }

  openAddFiles() {
    this.selectedFile = null;
    this.addFilesModal = true;
    this.openModalUnified();
  }

  closeAddFiles() {
    this.closeModalUnified();
    setTimeout(() => { this.addFilesModal = false; }, 300);
  }

  updateFileObject(value: OrderFile) {
    if (this.files.some(x => x.id === value.id)) {
      this.files[this.files.findIndex(x => x.id === value.id)] = value;
    }
    else {
      this.files.push(value);
    }
  }

  AdrChanged() {
    this.isADR = !this.isADR;
  }

}

