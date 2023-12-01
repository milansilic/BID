import { AfterViewInit, Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { VehicleGridModel, VehiclesModel } from './vehicles.model';
import { VehiclesService } from './vehicles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, AfterViewInit {
  activeTab: Tabs = Tabs.general;
  tabsRef = Tabs;
  openVehicleModal = false;
  showDeleteModal = false;
  spinner = false;
  modalType: string;
  scrollFromTop: number = 0;
  displayedColumns: string[] = ['plateNumber', 'type', 'reg', 'actions'];
  dataSource = new MatTableDataSource<VehicleGridModel>([]);
  selectedVehicleId: number;
  clickedRow: any;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private vehicleService: VehiclesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getVehicles();

    onkeydown = (e) => {
      switch (e.key) {
        case 'Escape':
          this.closeAddVehicle(false);
          break;
      }
    }
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  openEditModal(vehicle: VehiclesModel): void {
    this.modalType = 'Edit'
    this.openVehicleModal = true;
    this.selectedVehicleId = vehicle.id;
    this.openModalUnified();
  }

  openDeleteModal(vehicle: VehicleGridModel): void {
    this.showDeleteModal = true;
    this.selectedVehicleId = vehicle.id;
  }

  closeModals(): void {
    this.openVehicleModal = false;
    this.showDeleteModal = false;
    this.activeTab = Tabs.general;
  }

  getRecord(rowValue) {
    this.clickedRow = this.clickedRow === rowValue ? null : rowValue;
  }

  getVehicles() {
    this.vehicleService.getAllVehicles()
      .subscribe(response => {
        const formattedData = response.map(vehicle => {
          return new VehicleGridModel(
            vehicle.id,
            vehicle.generalVehicle.plateNumber,
            vehicle.generalVehicle.type,
            vehicle.generalVehicle.regDate
          )
        })
        this.dataSource = new MatTableDataSource(formattedData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  deleteVehicle() {
    this.vehicleService.deleteVehicle(this.selectedVehicleId)
      .subscribe(response => {
        this.showDeleteModal = false;
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== this.selectedVehicleId);
        this.toastr.success('Vehicle deleted successfully.')
      })
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

  openAddVehicle() {
    this.modalType = 'Add';
    this.openVehicleModal = true;
    this.selectedVehicleId = null;
    this.openModalUnified();
  }

  closeAddVehicle(refreshData) {
    this.closeModalUnified();
    if (refreshData) {
      this.getVehicles();
    }
    setTimeout(() => { this.openVehicleModal = false; }, 300);
  }
}

enum Tabs {
  general = "General",
  inspection = "Inspection",
  licenses = "Licenses",
  additionalInfo = "AdditionalInfo",
  insurance = "Insurance",
  property = "Property"
}