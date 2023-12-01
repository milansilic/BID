import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, NgForm, NG_VALUE_ACCESSOR, Validators, ControlValueAccessor } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppInputComponent),
      multi: true
    }
  ]
})
export class AppInputComponent implements OnInit, ControlValueAccessor {

  @Input() placeholderName = '';
  @Input() inputType = '';
  @Input() element = '';
  @Input() marker = '';
  @Input() disabled = false;

  @Input() formGroup: any;
  @Input() formControlName: any;

  private value: any;

  constructor() { }

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
