import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChartService } from 'src/app/services/chart.service';
Chart.register(...registerables);

@Component({
   selector: 'chart-average-km',
   templateUrl: './chart-average-km.component.html',
   styleUrls: ['./chart-average-km.component.scss']
})
export class ChartAverageKmComponent implements OnInit {
   maxValue: any = '';
   colHigh: any = 'rgba(238, 67, 192, 1)';
   colMed: any = 'rgba(156, 0, 255, 1)';
   colLow: any = 'rgba(55, 214, 140, 1)';
   xAxsisValues: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
   dataValues = [3000, 8875, 5000, 6900, 8000, 1700, 11000, 4100, 5500, 8500, 5800, 7300];
   lineColors: any = [];
   maxTicksLimit: number = 5;
   stepSize: number = 4000;

   constructor(private chart: ChartService) { }

   ngOnInit(): void {

      this.maxValue = Math.max(...this.dataValues);

      this.dataValues.forEach(dv => {
         if (dv <= this.maxValue * 0.33) { this.lineColors.push(this.colLow); }
         else if (dv <= this.maxValue * 0.66) { this.lineColors.push(this.colMed); }
         else { this.lineColors.push(this.colHigh); }
      });

      this.chart.myBarChart(
         'average-km',
         this.xAxsisValues,
         this.dataValues,
         this.lineColors,
         4000, // stepSize
         5, // maxTicksLimit
         function (label: any) { return label + ' km'; }
      );
   }
}