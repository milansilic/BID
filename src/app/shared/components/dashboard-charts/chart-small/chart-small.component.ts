import { Component, Input } from '@angular/core';

@Component({
  selector: 'chart-small',
  templateUrl: './chart-small.component.html',
  styleUrls: ['./chart-small.component.scss']
})
export class ChartSmallComponent {

  @Input() iconImgSrc = '';
  @Input() number: any = '';
  @Input() title: any = '';
  
}
