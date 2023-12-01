import { Component, HostListener, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ADRClassEnum, InsuranceTypeEnum, ProprietorshipTypeEnum, VehiclesModel, VehicleTypeEnum } from 'src/app/components/vehicles/vehicles.model';
import { VehiclesService } from 'src/app/components/vehicles/vehicles.service';
import { EnumHelper } from 'src/app/shared/enums/enums';
import { FormMapHelper } from 'src/app/shared/helpers/form-map-helper';
import { ValidationFormHelper } from 'src/app/shared/helpers/validation-form-helper';
import { DropdownObject } from 'src/app/shared/models/models';


enum Tabs {
  general = "General",
  inspection = "Inspection",
  licenses = "Licences",
  additionalInfo = "Additional Info",
  insurance = "Insurance",
  property = "Property"
}
@Component({
  selector: 'vehicle-modal',
  templateUrl: './vehicle-modal.component.html',
  styleUrls: ['./vehicle-modal.component.scss']
})
export class VehicleModalComponent implements OnInit {
  @Input() vehicleId: number;
  @Input() modalType: string;
  @Output() closeEvent = new EventEmitter<any>();
  vehicle = new VehiclesModel();
  createVehicleForm: UntypedFormGroup;
  createVehicleModel = new VehiclesModel();
  vehicleTypes = new Array<DropdownObject>();
  adrClasses = new Array<DropdownObject>();
  propertyTypes = new Array<DropdownObject>();
  insuranceCompanies = new Array<DropdownObject>();
  showCasco = false;
  showForm = false;
  activeTab: Tabs = Tabs.general;
  tabsRef = Tabs;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private vehiclesService: VehiclesService,
    private toastr: ToastrService,
  ) { }

  get f() { return this.createVehicleForm.controls; }

  ngOnInit() {
    this.setDropdowns();
    console.log('test')

    if (this.vehicleId) {
      this.getVehicle(this.vehicleId);
    } else {
      this.vehicle = new VehiclesModel();
      this.initVehicleForm();
    }
  }

  initVehicleForm() {

    const mandatoryInsurance = this.vehicle.insurances.find(insurance => insurance.type === InsuranceTypeEnum.Mandatory);
    const cascoInsurance = this.vehicle.insurances.find(insurance => insurance.type === InsuranceTypeEnum.Casco);
    if (cascoInsurance) {
      this.showCasco = true;
    }
    console.log(mandatoryInsurance)
    this.showForm = true;


    this.createVehicleForm = this.formBuilder.group({
      plateNumber: [this.vehicle.generalVehicle.plateNumber, Validators.required],
      regDate: [this.vehicle.generalVehicle.regDate, Validators.required],
      regPlace: [this.vehicle.generalVehicle.regPlace, Validators.required],
      type: [this.vehicle.generalVehicle.type, Validators.required],
      capacity: [this.vehicle.generalVehicle.capacity, Validators.required], // sta je capacity a sta carryCapacity?
      carryCapacity: [this.vehicle.generalVehicle.carryCapacity, Validators.required],
      regExpiryDate: [this.vehicle.generalVehicle.regExpiryDate, Validators.required],
      licenseNumber: [this.vehicle.generalVehicle.licenseNumber, Validators.required],

      tehnicalInspectionDate: [this.vehicle.inspectionVehicle.tehnicalInspectionDate],
      tehnicalInspectionExpiryDate: [this.vehicle.inspectionVehicle.tehnicalInspectionExpiryDate],
      sixMonthInspectionDate: [this.vehicle.inspectionVehicle.sixMonthInspectionDate],
      sixMonthInspectionExpiryDate: [this.vehicle.inspectionVehicle.sixMonthInspectionExpiryDate],
      ppdeviceSertificateExpiryDate: [this.vehicle.inspectionVehicle.ppdeviceSertificateExpiryDate],
      ppdeviceSertificateIiexpiryDate: [this.vehicle.inspectionVehicle.ppdeviceSertificateIiexpiryDate],
      tachographCertificateExpiryDate: [this.vehicle.inspectionVehicle.tachographCertificateExpiryDate],
      firstAidexpiryDate: [this.vehicle.inspectionVehicle.firstAidexpiryDate],

      whiteCertificateNumber: [this.vehicle.licenceVehicle.whiteCertificateNumber],
      whiteCertificateExpiryDate: [this.vehicle.licenceVehicle.whiteCertificateExpiryDate],
      tirnumber: [this.vehicle.licenceVehicle.tirnumber],
      tirexpiryDate: [this.vehicle.licenceVehicle.tirexpiryDate],

      producer: [this.vehicle.additionalInfoVehicle.producer],
      model: [this.vehicle.additionalInfoVehicle.model],
      color: [this.vehicle.additionalInfoVehicle.color],
      chassisNumber: [this.vehicle.additionalInfoVehicle.chassisNumber],
      engineNumber: [this.vehicle.additionalInfoVehicle.engineNumber],
      yearOfProduction: [this.vehicle.additionalInfoVehicle.yearOfProduction],
      tireDimensions: [this.vehicle.additionalInfoVehicle.tireDimensions],
      numberOfAxle: [this.vehicle.additionalInfoVehicle.numberOfAxle],
      garageNumber: [this.vehicle.additionalInfoVehicle.garageNumber],
      tankCapacity: [this.vehicle.additionalInfoVehicle.tankCapacity],
      adrclassId: [this.vehicle.additionalInfoVehicle.adrclassId],

      termoKingMark: [this.vehicle.termoKingVehicle.termoKingMark],
      termoKingType: [this.vehicle.termoKingVehicle.termoKingType],

      length: [this.vehicle.dimensionOfVehicle.length],
      width: [this.vehicle.dimensionOfVehicle.width],
      height: [this.vehicle.dimensionOfVehicle.height],

      mandatoryPremiumGrade: [mandatoryInsurance?.premiumGrade, Validators.required],
      mandatoryPolicyNumber: [mandatoryInsurance?.policyNumber, Validators.required],
      mandatoryInsuranceCompanyId: [mandatoryInsurance?.insuranceCompanyId, Validators.required],
      mandatoryExpiryDate: [mandatoryInsurance?.expiryDate, Validators.required],
      mandatoryValueOfPremium: [mandatoryInsurance?.valueOfPremium, Validators.required],

      cascoPremiumGrade: [cascoInsurance?.premiumGrade],
      cascoPolicyNumber: [cascoInsurance?.policyNumber],
      cascoInsuranceCompanyId: [cascoInsurance?.insuranceCompanyId],
      cascoExpiryDate: [cascoInsurance?.expiryDate],
      cascoValueOfPremium: [cascoInsurance?.valueOfPremium],

      purchasedFrom: [this.vehicle.proprietorship.purchasedFrom],
      monthlyPayment: [this.vehicle.proprietorship.monthlyPayment],
      purchaseDate: [this.vehicle.proprietorship.purchaseDate],
      kilometersGuarantyExpiry: [this.vehicle.proprietorship.kilometersGuarantyExpiry],
      value: [this.vehicle.proprietorship.value],
      valueWithoutVat: [this.vehicle.proprietorship.valueWithoutVat],
      guarantyExpiryDate: [this.vehicle.proprietorship.guarantyExpiryDate],
      serviceCompanyName: [this.vehicle.proprietorship.serviceCompanyName],
      warranty: [this.vehicle.proprietorship.warranty],
      warrantyNumberOfMonth: [this.vehicle.proprietorship.warrantyNumberOfMonth],
      contractNumber: [this.vehicle.proprietorship.contractNumber],
      contractExpiryDate: [this.vehicle.proprietorship.contractExpiryDate]
    });

  }

  getInsuranceCompanyDropdown() {
    this.vehiclesService.getInsuranceCompanyDropdown()
      .subscribe(response => {
        this.insuranceCompanies = response.map(item => {
          return { key: item.id, value: item.name };
        });
      })
  }

  getVehicle(id: number) {
    this.vehiclesService.getVehicle(id)
      .subscribe(response => {
        this.vehicle = response;
        this.initVehicleForm();
      })
  }

  submitVehicleInfo() {
    this.createVehicleForm.markAllAsTouched();
    if (this.createVehicleForm.invalid) {
      return;
    }


    this.createVehicleModel = FormMapHelper.mapVehicleFormInfo(this.createVehicleForm)

    this.mapVehicleData();


    if (!this.createVehicleModel.id) {
      this.vehiclesService.createVehicle(this.createVehicleModel)
        .subscribe((response) => {
          this.toastr.success('Vehicle saved sucessfully.');
          this.closeModal(true);
        });
    } else {
      this.vehiclesService.updateVehicle(this.createVehicleModel)
        .subscribe((response) => {
          this.toastr.success('Vehicle updated sucessfully.');
          this.closeModal(true);
        });
    }

  }

  mapVehicleData() {
    this.createVehicleModel.id = this.vehicle.id ? this.vehicle.id : 0;
    this.createVehicleModel.insurances.forEach(insurance => {
      insurance.dateCreated = new Date();
      insurance.dateModified = new Date();
    })
    this.createVehicleModel.proprietorship.dateCreated = new Date();
    this.createVehicleModel.proprietorship.dateModified = new Date();
  }

  nextClicked() {
    const enumValues = Object.values(Tabs);
    this.changeCard(enumValues[enumValues.indexOf(this.activeTab) + 1]);
  }

  clearInsuranceFields() {
    this.createVehicleForm.controls.mandatoryInsuranceCompanyId.setValue('');
    this.createVehicleForm.controls.mandatoryPolicyNumber.setValue('');
    this.createVehicleForm.controls.mandatoryPremiumGrade.setValue('');
    this.createVehicleForm.controls.mandatoryExpiryDate.setValue('');
    this.createVehicleForm.controls.mandatoryValueOfPremium.setValue('');
  }

  clearCasco(clearOnlyForm: boolean = false) {
    this.createVehicleForm.controls.cascoPremiumGrade.setValue('');
    this.createVehicleForm.controls.cascoPolicyNumber.setValue('');
    this.createVehicleForm.controls.cascoInsuranceCompanyId.setValue('');
    this.createVehicleForm.controls.cascoExpiryDate.setValue('');
    this.createVehicleForm.controls.cascoValueOfPremium.setValue('');
    if (!clearOnlyForm) {
      this.showCasco = false;
    }
  }

  changeCard(tab) {

    if (ValidationFormHelper.validateVehiclesGeneralInfo(this.createVehicleForm)) {
      this.activeTab = tab;
    } else {
      this.toastr.warning('Please populate all fields on this tab to proceed.');
    }
  }

  setDropdowns() {
    this.vehicleTypes = EnumHelper.getEnumDropdown(VehicleTypeEnum);
    this.adrClasses = EnumHelper.getEnumDropdown(ADRClassEnum);
    this.propertyTypes = EnumHelper.getEnumDropdown(ProprietorshipTypeEnum);
    this.getInsuranceCompanyDropdown();
  }

  validateContractInfo() {
    return true;
  }

  closeModal(value: any) {
    this.closeEvent.emit(value);
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.closeModal(false);
  }
}