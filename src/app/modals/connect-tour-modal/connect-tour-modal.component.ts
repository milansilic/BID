import { AfterViewInit, Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToursGridModel, ToursModel } from 'src/app/components/tours/tours.model';
import { ToursService } from 'src/app/components/tours/tours.service';

@Component({
  selector: 'connect-tour-modal',
  templateUrl: './connect-tour-modal.component.html',
  styleUrls: ['./connect-tour-modal.component.scss']
})
export class ConnectTourModalComponent {
  displayedColumns: string[] = ['id', 'number', 'startDate'];
  dataSource: MatTableDataSource<ToursModel>;
  clickedRow: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @Output() closeModalEvnt = new EventEmitter<any>();
  @Output() tourSelected = new EventEmitter<any>();
  @Input() tour: ToursModel;

  closeModal() {
    this.closeModalEvnt.emit();
  }

  getRecord(rowValue) {
    this.clickedRow = this.clickedRow === rowValue ? null : rowValue;
  }

  constructor(
    private tourService: ToursService
  ) {
    this.getData();
  }

  selectionChanged(row: ToursModel) {
    this.tour = row;
  }

  connectTour() {
    this.tourSelected.emit(this.tour)
  }

  getData() {

    this.tourService.getTours()
      .subscribe((res: Array<ToursModel>) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

}