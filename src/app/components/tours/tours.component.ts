import { Component, ViewChild, HostListener, Output, EventEmitter, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ToursModel } from './tours.model';
import { ToursService } from './tours.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.scss']
})
export class ToursComponent implements OnInit {
  addTour = false;
  editTour = false;
  deleteTour = false;
  spinner = false;
  showDeleteOrderModal = false;
  selectedTourId: number;
  displayedColumns: string[] = ['number', 'actions'];
  dataSource = new MatTableDataSource<ToursModel>([]);

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() newOrderOutput = new EventEmitter<string>();

  constructor(
    private tourService: ToursService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {

    this.getTours();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getTours() {
    this.tourService.getTours()
      .subscribe((res: Array<ToursModel>) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  createTour() {
    this.router.navigate(['/layout/tour-details']);
  }

  openTourDetails(tour: ToursModel): void {
    this.router.navigate(['/layout/tour-details'], { queryParams: { id: tour.id } });
  }

  openDeleteModal(order: ToursModel): void {
    this.showDeleteOrderModal = true;
    this.selectedTourId = order.id;
  }

  deleteOrder() {
    this.tourService.deleteTour(this.selectedTourId)
      .subscribe((response) => {
        this.showDeleteOrderModal = false;
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== this.selectedTourId);
        this.toastr.success('Order deleted successfully.')
      });
  }

}
