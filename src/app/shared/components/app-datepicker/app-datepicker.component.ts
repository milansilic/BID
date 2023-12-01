import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, NgForm, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, ErrorStateMatcher, MatDateFormats, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-datepicker',
  templateUrl: './app-datepicker.component.html',
  styleUrls: ['./app-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDatepickerComponent),
      multi: true
    },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class AppDatepickerComponent implements OnInit, ControlValueAccessor {

  @Input() matDatepicker = '';
  @Input() labelText = '';
  @Input() marker = '';
  @Input() formGroup: any;
  @Input() formControlName: any;

  private value: any;

  constructor(private readonly adapter: DateAdapter<Date>) {
    this.adapter.setLocale("en-EN")
  }

  ngOnInit(): void { }


  onChange = event => { };
  onTouched = () => { };

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  emailFormControl = new UntypedFormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
}
