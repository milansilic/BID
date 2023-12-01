import { AfterViewInit, Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UsersService } from './users.service';
import { UserGridModel, UserModel } from './users.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  tabsRef = Tabs;
  scrollFromTop: number = 0;
  openUsersModal = false;
  showDeleteModal = false;
  spinner = false;
  refreshData: any;
  displayedColumns: string[] = ['name', 'role', 'actions'];
  dataSource = new MatTableDataSource<UserGridModel>([]);
  selectedUser = new UserModel();
  clickedRow: any;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getAllUsers();
    onkeydown = (e) => {
      switch (e.key) {
        case 'Escape':
          this.closeModal(this.refreshData);
          break;
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRecord(rowValue) {
    this.clickedRow = this.clickedRow === rowValue ? null : rowValue;
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

  openAddModal(): void {
    this.selectedUser = new UserModel();
    this.openUsersModal = true;
    this.openModalUnified();
  }

  openEditModal(user: UserModel): void {
    this.selectedUser = user;
    this.openUsersModal = true;
    this.openModalUnified();
  }

  openDeleteModal(user: UserModel): void {
    this.showDeleteModal = true;
    this.selectedUser = user;
  }

  closeModal(refreshData: any) {
    this.closeModalUnified();
    setTimeout(() => {
      this.openUsersModal = false;
      this.showDeleteModal = false;
    }, 300);
    if (refreshData) {
      this.getAllUsers();
    }
  }

  closeModals(): void {
    this.closeModalUnified();
    this.openUsersModal = false;
    this.showDeleteModal = false;
  }

  getAllUsers() {
    this.usersService.getAllUsers()
      .subscribe((response: Array<UserModel>) => {
        const formattedData = response.map(user => {
          return new UserGridModel(
            user.id,
            user.userBasicInfo.firstName,
            user.userBasicInfo.lastName,
            user.userBasicInfo.role
          )
        })
        this.dataSource = new MatTableDataSource(formattedData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  deleteUser() {
    this.usersService.deleteUser(this.selectedUser.id)
      .subscribe(_response => {
        this.showDeleteModal = false;
        this.dataSource.data = this.dataSource.data.filter(user => user.id !== this.selectedUser.id);
        this.toastr.success('User deleted successfully.')
      })
  }
}

enum Tabs {
  card1 = "Card1",
  card2 = "Card2",
  card3 = "Card3",
  idCard = "IdCard",
  passports = "Passports",
  drivingLicence = "DrivingLicence"
}
