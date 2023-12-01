import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DriverLicenceCategoryEnum, IdCardModel, RolesEnum, UserDriverLicenceCategory, UserDriverLicenceModel, UserModel } from 'src/app/components/users/users.model';
import { UsersService } from 'src/app/components/users/users.service';
import { EnumHelper } from 'src/app/shared/enums/enums';
import { FormMapHelper } from 'src/app/shared/helpers/form-map-helper';
import { ValidationFormHelper } from 'src/app/shared/helpers/validation-form-helper';
import { DropdownObject } from 'src/app/shared/models/models';

enum Tabs {
  card1 = "Card1",
  card2 = "Card2",
  card3 = "Card3",
  idCard = "IdCard",
  passports = "Passports",
  drivingLicence = "DrivingLicence"
}
@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @ViewChild('table') table: MatTable<any>;

  @Input() userId: number;
  @Output() closeModalEvnt = new EventEmitter();
  user = new UserModel();
  createUserForm: UntypedFormGroup;
  driverCategoryForm: UntypedFormGroup;
  createUserModel = new UserModel();
  roles = new Array<DropdownObject>();
  categories = new Array<DropdownObject>();
  driverCategoryColumns: string[] = ['category', 'dateOfApplication', 'validUntil', 'actions'];
  driverLicenceCategories = new Array<UserDriverLicenceCategory>();
  driverDataSource = new Array<UserDriverLicenceCategory>();
  activeTab: Tabs = Tabs.card1;
  tabsRef = Tabs;
  showForm = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private usersService: UsersService,
    private toastr: ToastrService
  ) { }

  get f() { return this.createUserForm.controls; }

  ngOnInit() {

    if (this.userId) {
      this.getUser(this.userId);
    } else {
      this.user = new UserModel();
      this.showForm = true;
      this.initForms();
    }

    this.roles = EnumHelper.getEnumDropdown(RolesEnum);
    this.categories = EnumHelper.getEnumDropdown(DriverLicenceCategoryEnum);
  }

  getUser(id: number) {
    this.usersService.getUser(id)
      .subscribe(response => {
        this.user = response;
        this.initForms();
      })
  }

  initForms() {
    this.initUserForm();
    this.initDriverCategoryForm();
  }

  initUserForm() {
    console.log(this.user);
    this.createUserForm = this.formBuilder.group({
      userName: [this.user.userBasicInfo.userName, Validators.required],
      dateOfBirth: [this.user.userBasicInfo.dateOfBirth, Validators.required],
      password: [this.user.userBasicInfo.password, this.user.id ? [] : Validators.required],
      role: [this.user.userBasicInfo.role, Validators.required],
      firstName: [this.user.userBasicInfo.firstName, Validators.required],
      lastName: [this.user.userBasicInfo.lastName, Validators.required],
      cellNumber: [this.user.userBasicInfo.cellNumber, Validators.required],
      email: [this.user.userBasicInfo.email, Validators.required],
      parentName: [this.user.userBasicInfo.parentName, Validators.required],
      bankAccount: [this.user.userBasicInfo.bankAccount, Validators.required],
      workingStartDate: [this.user.userContractInfo.workingStartDate],
      contractExpiryDate: [this.user.userContractInfo.contractExpiryDate],
      healthInsuranceNumber: [this.user.userContractInfo.healthInsuranceNumber],
      healthInsuranceDescription: [this.user.userContractInfo.healthInsuranceDescription],
      healthInsuranceExpiryDate: [this.user.userContractInfo.healthInsuranceExpiryDate],
      identificationNumber: [this.user.userPersonalData.identificationNumber],
      placeOfBirth: [this.user.userPersonalData.placeOfBirth],
      municipalityOfBirth: [this.user.userPersonalData.municipalityOfBirth],
      address: [this.user.userPersonalData.address],
      city: [this.user.userPersonalData.city],
      country: [this.user.userPersonalData.country],
      idCardNumber: [this.user.idCard.idCardNumber],
      idCardExpiryDate: [this.user.idCard.idCardExpiryDate],
      passportState: [this.user.passportUser.passportState],
      passportNumber: [this.user.passportUser.passportNumber],
      passportIssuedDate: [this.user.passportUser.passportIssuedDate],
      passportExpiryDate: [this.user.passportUser.passportExpiryDate],
      passportCity: [this.user.passportUser.passportCity],
      driverLicenseNumber: [this.user.userDriverLicense.number],
      driverLicenseIssuedDate: [this.user.userDriverLicense.issuedDate],
      driverLicenseExpiryDate: [this.user.userDriverLicense.expiryDate]
    });
    this.showForm = true;
    this.updateDriversLicenceAsRequired(this.user.userBasicInfo.role === RolesEnum.Driver ? true : false)
  }

  roleChanged(role: RolesEnum) {
    this.updateDriversLicenceAsRequired(role === RolesEnum.Driver ? true : false);
  }

  updateDriversLicenceAsRequired(required: boolean): void {
    const validators = required ? [Validators.required] : null;

    this.createUserForm.get('driverLicenseNumber')?.setValidators(validators);
    this.createUserForm.get('driverLicenseIssuedDate')?.setValidators(validators);
    this.createUserForm.get('driverLicenseExpiryDate')?.setValidators(validators);
    this.createUserForm.get('driverLicenseNumber')?.updateValueAndValidity({ emitEvent: false });
    this.createUserForm.get('driverLicenseIssuedDate')?.updateValueAndValidity({ emitEvent: false });
    this.createUserForm.get('driverLicenseExpiryDate')?.updateValueAndValidity({ emitEvent: false });
  }

  initDriverCategoryForm() {
    this.driverCategoryForm = this.formBuilder.group({
      driverLicenseCategory: ['', Validators.required],
      driverLicenseIssuedDate: ['', Validators.required],
      driverLicenseExpiryDate: ['', Validators.required],
    });

    if (this.user.userDriverLicense.driverLicenseCategories.length) {
      this.driverDataSource = this.user.userDriverLicense.driverLicenseCategories;
      this.driverDataSource.forEach(row => {
        row.categoryLabel = DriverLicenceCategoryEnum[row.category];
      })
    }

  }

  submitUserInfo() {
    if (!this.checkDriverLicence()) {
      return;
    }

    this.createUserForm.markAllAsTouched();
    if (this.createUserForm.invalid) {
      return;
    }

    this.mapUserData();

    if (!this.createUserModel.id) {
      this.usersService.createUser(this.createUserModel)
        .subscribe((_response) => {
          this.toastr.success('User saved sucessfully.');
          this.closeModal(true);
        });
    } else {
      this.usersService.updateUser(this.createUserModel)
        .subscribe(_response => {
          this.toastr.success('User updated sucessfully.');
          this.closeModal(true);
        })
    }
  }

  checkDriverLicence(): boolean {
    const role = +this.createUserForm.value.role;
    let valid = true;

    if (role === RolesEnum.Driver) {
      if (
        this.createUserForm.controls.driverLicenseExpiryDate.status === 'INVALID' ||
        this.createUserForm.controls.driverLicenseNumber.status === 'INVALID' ||
        this.createUserForm.controls.driverLicenseIssuedDate.status === 'INVALID'
      ) {
        valid = false;

        if (this.activeTab !== Tabs.drivingLicence) {
          this.toastr.warning('Please add a valid Drivers licence.');
        }
      } else if (!this.driverDataSource.length) {
        valid = false;
        this.toastr.warning('Please add at least one Driver Licence category.');
      }
    }

    return valid;
  }

  submitDriverCategoryForm() {
    this.driverCategoryForm.markAllAsTouched();
    if (this.driverCategoryForm.invalid) {
      return;
    }

    this.addNewLicenceCategoryRow();
  }

  addNewLicenceCategoryRow() {
    let categoryRow = new UserDriverLicenceCategory();
    categoryRow.category = this.driverCategoryForm.value.driverLicenseCategory;
    categoryRow.expiryDate = this.driverCategoryForm.value.driverLicenseExpiryDate;
    categoryRow.issueDate = this.driverCategoryForm.value.driverLicenseIssuedDate;
    categoryRow.categoryLabel = DriverLicenceCategoryEnum[categoryRow.category];
    this.driverDataSource.push(categoryRow);
    this.table.renderRows();

    this.initDriverCategoryForm();
  }

  nextClicked() {
    const enumValues = Object.values(Tabs);
    this.changeCard(enumValues[enumValues.indexOf(this.activeTab) + 1]);
  }

  changeCard(tab) {
    if (ValidationFormHelper.validateUserBasicInfo(this.createUserForm)) {
      this.activeTab = tab;
    } else {
      this.toastr.warning('Please populate all fields on this tab to proceed.');
    }
  }

  deleteLicenceCategory(rowIndex) {
    this.driverDataSource.splice(rowIndex, 1);
    this.table.renderRows();
  }

  mapUserData() {
    this.createUserModel = FormMapHelper.mapUserFormInfo(this.createUserForm);
    this.createUserModel.userDriverLicense.driverLicenseCategories = this.driverDataSource;
    this.createUserModel.userDriverLicense.id = this.user.userDriverLicense.id;
    this.createUserModel.id = this.user.id ? this.user.id : 0;
    this.createUserModel.dateCreated = this.user.id ? this.user.dateCreated : new Date();
    this.createUserModel.dateModified = this.user.id ? this.user.dateModified : new Date();
    this.createUserModel.userDriverLicense.dateCreated = this.user.userDriverLicense.dateCreated ? this.user.userDriverLicense.dateCreated : new Date();
    this.createUserModel.userDriverLicense.dateModified = this.user.userDriverLicense.dateModified ? this.user.userDriverLicense.dateModified : new Date();
  }

  closeModal(updateData = false) {
    this.closeModalEvnt.next(updateData);
  }
}