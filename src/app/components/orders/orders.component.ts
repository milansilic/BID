import { Component, ViewChild, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrdersGridModel, OrdersModel, OrderStatusEnum } from './orders.model';
import { OrdersService } from './orders.service';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EnumHelper } from 'src/app/shared/enums/enums';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CodebookService } from 'src/app/shared/services/codebook.service';
import { Codebook } from 'src/app/shared/models/models';

@UntilDestroy()
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  addOrder = false;
  editOrder = false;
  showDeleteOrderModal = false;
  spinner = false;
  displayedColumns: string[] = ['orderNumber', 'client', 'status', 'orderMaker', 'actions'];
  dataSource = new MatTableDataSource<OrdersGridModel>([]);
  selectedOrderId: number;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() newOrderOutput = new EventEmitter<string>();

  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private toastr: ToastrService,
    private codebookService: CodebookService
  ) { }

  ngOnInit() {

    this.getData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(rowValue) {
    console.log(rowValue);
  }


  openOrderDetails(order: OrdersGridModel): void {
    this.router.navigate(['/layout/order-details'], { queryParams: { id: order.id } });
  }

  openDeleteModal(order: OrdersGridModel): void {
    this.showDeleteOrderModal = true;
    this.selectedOrderId = order.id;
  }

  createOrder() {
    this.router.navigate(['/layout/order-details']);
  }

  deleteOrder() {
    this.ordersService.deleteOrder(this.selectedOrderId)
      .subscribe((response) => {
        this.showDeleteOrderModal = false;
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== this.selectedOrderId);
        this.toastr.success('Order deleted successfully.')
      });
  }


  closeModals(): void {
    this.editOrder = false;
    this.showDeleteOrderModal = false;
  }

  getData() {
    const observable = [
      this.codebookService.getClientCodebook(),
      this.codebookService.getOrderMakers(),
      this.ordersService.getOrders()
    ];

    combineLatest(observable)
      .pipe(untilDestroyed(this))
      .subscribe((response) => {


        const clientCodebook = response[0] as unknown as Codebook[];
        const orderMakersCodebook = response[1] as unknown as Codebook[];
        const orders = response[2] as unknown as OrdersModel[];
        const orderStatuses = EnumHelper.getEnumDropdown(OrderStatusEnum)


        let ordersGrid = (orders as unknown as OrdersModel[]).map((item: OrdersModel) => {
          return {
            id: item.id,
            orderNumber: item.baseInfo.number,
            client: clientCodebook.find((client: Codebook) => client.id === item.baseInfo.clientId)?.description,
            status: orderStatuses.find((status) => status.key === item.baseInfo.status)?.value,
            orderMaker: orderMakersCodebook.find((orderMaker: Codebook) => orderMaker.id === item.baseInfo.userId)?.description
          }
        });
        console.log(ordersGrid)
        this.dataSource = new MatTableDataSource<OrdersGridModel>(ordersGrid);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }


}
