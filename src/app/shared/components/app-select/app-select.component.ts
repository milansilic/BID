import { Component, OnInit, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, NgForm, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DropdownObject } from '../../models/models';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-select',
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelectComponent),
      multi: true
    }
  ]
})

export class AppSelectComponent implements OnInit {
  @Input() placeholderName = '';
  @Input() inputType = '';
  @Input() element = '';
  @Input() marker = 'false';
  @Input() dropdownValues: Array<DropdownObject>;

  @Input() formGroup: any;
  @Input() formControlName: any;
  @Output() selectionChanged = new EventEmitter<number>();

  private value: any;

  constructor() {}
  ngOnInit(): void {}

  onChange = event => { };
  onTouched = () => { };

  onSelectionChanged(selection): void {
    this.selectionChanged.emit(selection.value);
  }

  keys = Object.keys;
  currencies = Currencies;
  courses = Courses;
  countries = Countries;
  types = Types;
  roles = Roles;
  category = Category;
  vehicleTypes = VehicleTypes;
  regPlace = RegPlace;
  yearOfProduction = YearOfProduction;
  adrClass = AdrClass;
  insuranceType = InsuranceType;
  propertyType = PropertyType;
  client = Client;
  status = Status;
  transportType = TransportType;
  orderMaker = OrderMaker;
  suplier = Suplier;
  loadingCompany = LoadingCompany;
  customsAgent = CustomsAgent;
  customsPlace = CustomsPlace;
  typeOfCustomsProcedure = TypeOfCustomsProcedure;
  financialImpact = FinancialImpact;
  typeOfCost = TypeOfCost;
  documentType = DocumentType;
  carrier = Carrier;
  plateNumber = PlateNumber;
  driver = Driver;
  tourMaker = TourMaker;
  filterBy = FilterBy;
  logistics = Logistics;
  vehicleType = VehicleType;

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  emailFormControl = new UntypedFormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
}

export enum Countries {
  Serbia = "Serbia",
  Croatia = "Croatia",
  Slovenia = "Slovenia",
}

export enum Currencies {
  usd = "USD",
  eur = "EUR"
}

export enum Courses {
  usd = "USD",
  eur = "EUR"
}

export enum Types {
  type1 = "11070",
  type2 = "4791"
}

export enum Roles {
  Admin,
  Mehanic,
  Driver
}

export enum Category {
  cat1 = "B",
  cat2 = "C"
}

export enum VehicleTypes {
  vType1 = "Truck",
  vType2 = "Trailer",
  vType3 = "Van",
  vType4 = "Car",
}

export enum RegPlace {
  regPlace1 = "Beograd",
  regPlace2 = "Novi Sad",
  regPlace3 = "Nis",
  regPlace4 = "Kragujevac",
}

export enum YearOfProduction {
  y1 = "2023",
  y2 = "2022",
  y3 = "2021",
  y4 = "2020",
}

export enum AdrClass {
  adrClass1 = "Explosives",
  adrClass2 = "Have no clue"
}

export enum InsuranceType {
  it1 = "Mandatory Insurance",
}

export enum PropertyType {
  pt1 = "Own",
}

export enum Client {
  cl1 = "Ikea",
  cl2 = "JYSK",
  cl3 = "Wurth",
}

export enum Status {
  st1 = "Planed",
  st2 = "Loaded",
  st3 = "In transit",
  st4 = "Unloaded in bonded warehouse",
  st5 = "Unloaded",
}

export enum TransportType {
  tt1 = "Export",
  tt2 = "Import",
  tt3 = "Transit",
  tt4 = "Domestic",
  tt5 = "Domestic - bonded goods",
}

export enum OrderMaker {
  om1 = "Hugiv",
  om2 = "Radomir",
}

export enum Suplier {
  sp1 = "Ikea",
  sp2 = "JYSK",
  sp3 = "Wurth",
}

export enum LoadingCompany {
  lc1 = "Ikea",
  lc2 = "JYSK",
  lc3 = "Wurth",
}

export enum CustomsAgent {
  ca1 = "Milsped",
  ca2 = "Zilsped",
  ca3 = "Kilsped",
}

export enum CustomsPlace {
  cp1 = "Vojvode Bogdana 134",
  cp2 = "Vojvode Bogdana 136",
  cp3 = "Vojvode Bogdana 138",
}

export enum TypeOfCustomsProcedure {
  tocp1 = "Regular export",
  tocp2 = "Temporary export",
  tocp3 = "Reexport",
  tocp4 = "NT (shipping document)",
}

export enum FinancialImpact {
  fi1 = "Reinvoice",
  fi2 = "financial impact 2",
  fi3 = "financial impact 3",
  fi4 = "financial impact 4",
}

export enum TypeOfCost {
  toc1 = "Insurance",
  toc2 = "financial impact 2",
  toc3 = "financial impact 3",
  toc4 = "financial impact 4",
}

export enum DocumentType {
  dt1 = "Invoice",
  dt2 = "dt 2",
  dt3 = "dt 3",
  dt4 = "dt 4",
}

export enum Carrier {
  carrier1 = "Hit Commerce",
  carrier2 = "carrier 2",
  carrier3 = "carrier 3",
  carrier4 = "carrier 4",
}

export enum Status {
  status1 = "Pending",
  status2 = "status 2",
  status3 = "status 3",
  status4 = "status 4",
}

export enum PlateNumber {
  plateNum1 = "plateNum1",
  plateNum2 = "plateNum2",
}

export enum Driver {
  driver1 = "driver1",
  driver2 = "driver2",
}

export enum TourMaker {
  tourMaker1 = "tour maker 1",
  tourMaker2 = "tour maker 2",
}

export enum FilterBy {
  fb1 = "Week",
  fb2 = "Year"
}

export enum Logistics {
  logistics1 = "All Users",
  logistics2 = "All Users 2",
  logistics3 = "All Users 3"
}

export enum VehicleType {
  vt1 = "Van",
  vt2 = "Truck"
}
