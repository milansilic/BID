import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'chart-small-select',
   templateUrl: './chart-small-select.component.html',
   styleUrls: ['./chart-small-select.component.scss']
})
export class ChartSmallSelectComponent implements OnInit {

   @Input() chartTitle = '';
   @Input() selectTitle = '';
   @Input() sum = '';

   ngOnInit(): void { }
}
