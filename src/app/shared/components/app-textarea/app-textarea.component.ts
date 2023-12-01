import { Component, OnInit, Input, NgZone, ViewChild, forwardRef } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './app-textarea.component.html',
  styleUrls: ['./app-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppTextareaComponent),
      multi: true
    }
  ]
})
export class AppTextareaComponent implements OnInit {
  @Input() placeholderName = '';
  @Input() formGroup: any;
  @Input() formControlName: any;
  @Input() placeholderText: string = ""

  private value: any;

  constructor(private _ngZone: NgZone) { }

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

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

}