import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
Chart.register(...registerables);

@Component({
   selector: 'chart-orders',
   templateUrl: './chart-orders.component.html',
   styleUrls: ['./chart-orders.component.scss']
})
export class ChartOrdersComponent implements OnInit {
   maxValue: any = '';
   colHigh: any = 'rgba(55, 214, 140, 1)';
   colMed: any = 'rgba(70, 222, 255, 1)';
   colLow: any = 'rgba(238, 67, 192, 1)';
   xAxsisValues: string[] = ['Sep 18', 'Sep 19', 'Sep 20', 'Sep 21', 'Sep 22', 'Sep 23', 'Sep 24'];
   dataValues = [36000, 23000, 44000, 32000, 28000, 13000, 26000];
   lineColors: any = [];

   constructor(private chart: ChartService){}

   ngOnInit(): void {
            
      this.maxValue = Math.max(...this.dataValues);

      this.dataValues.forEach(dv => {
         if (dv <= this.maxValue * 0.33) {this.lineColors.push(this.colLow);} 
         else if (dv <= this.maxValue * 0.66) {this.lineColors.push(this.colMed);} 
         else {this.lineColors.push(this.colHigh);}
      });

      this.chart.myBarChart(
         'number-of-orders', 
         this.xAxsisValues, 
         this.dataValues, 
         this.lineColors, 
         15000, // stepSize
         4, // maxTicksLimit
         function (label: any){return label / 1000 + 'k';}
      );
   }
}